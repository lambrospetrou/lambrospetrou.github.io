---
title: AWS Lambda meets Racket (or any compiled language)
description: In this tutorial I provide an easy way to run any compiled language with AWS Lambda with communication over standard input and output.
---

## Problem

I recently started learning [Racket](https://racket-lang.org/) and one of the first things I do with a new language is integrating it with [AWS Lambda](https://aws.amazon.com/lambda/).

One of my favourite languages is [Go](https://golang.org/), and since both Racket and Go can be compiled down to self-contained executable binaries we can re-use some of the knowledge running Go on AWS Lambda.

## AWS Lambda Overview

Before delving into the detailed solution that works best for me I will provide the different ways we can run code in Lambda.

### Language natively supported by AWS Lambda

If your language is supported natively by Lambda then it's very easy and you should follow the AWS documentation for the language. As of the time of writing, the [supported languages](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html) include **Node.js**, **Java**, **Python**, and **.NET Core**.

### Language can be compiled to C shared library

If your language of choice can be compiled down to a shared C-library binary, then the most performant way to run on Lambda, is to use a wrapper in Python that loads this library and directly make calls to your shared library.

This is the best way I have found to run Go code so far and I make use of the great library [eawsy/aws-lambda-go](https://github.com/eawsy/aws-lambda-go) (For Go 1.8+ there is a [new version](https://github.com/eawsy/aws-lambda-go-shim) which uses Go plugins).

This approach can be used to run any language compiled down to a C shared library.

### Language can be compiled to standalone binary that runs on Amazon Linux

If your language of choice cannot be compiled to shared library, but can be compiled to standalone binary that can run on the Amazon Linux system (which is the OS AWS Lambda uses behind the scenes) then it's very easy to run the application binary through Lambda.

The easiest and simplest way to run your code is to spawn a new subprocess of your binary using some lambda wrapper code (in Python or Node.js) and pass the ```event``` and/or ```context``` as input to that process. Then, you read the standard output of the subprocess from inside the wrapper code and return it to the caller of your Lambda code.

The only downside of this approach is that each Lambda function invocation is pretty slow, since a new process has to be started every time your function runs.

For example, using the code from [Daniel's Brunner blog post](http://www.dbrunner.net/2015/08/27/running-racket-on-aws-lambda/) each Lambda invocation configured with **128MB** memory has an average runtime of **~450-550ms**. You can boost the performance of this if you increase your Lambda's memory to the maximum of **1536MB**. This will bring the average runtime down to **~50-150ms**.

The reason behind this interesting fact is that increasing your Lambda function's memory, you also increase its CPU power, hence leading to much faster subprocess spawning times.

This spawning per function invocation works fine, but it's still slow for me and I don't want to pay for the maximum Lambda memory to get good performance. My proposed solution is a very simple adaptation of this approach.

Since Lambda has a static initialisation section every time the underlying container is started, I will spawn a process during that time, and then in each function invocation I will communicate over **standard input and output** with the subprocess from inside the lambda wrapper code.

This has a tremendous speedup over creating a new process every time since the average invocation runtime for the **128MB** using this approach is **1-100ms**, and consistently stays under **~10ms** with the **1536MB** memory configuration. This speedup is significant for lambdas that run many times over a period of time because the overhead of spawning a process is only observed the first time our code will run in a specific container instance, and then the same process is re-used leading to these extremely fast times.

See proof below, using the 128MB memory configuration, and runtime of **0.51ms** (yes that's less than a millisecond)!

![AWS Lambda running Racket](/articles/aws-lambda-meets-racket/aws-lambda-racket-128mb.png "AWS Lambda running Racket")

## Solution

As explained in the previous section, my best solution so far which keeps the complexity to a minimum, is to spawn a subprocess of our Racket application binary during the static initialisation of the Lambda function and re-use that process during the individual lambda invocations, by communicating over stdio.

### Racket application

I will use the following Racket code as example, which just echoes back the input of the application.

```scheme
#lang racket/base

;; This is the actual logic of our code!
(define (execute-logic data)
  (display (format "data: ~a~%" data)))

;; The following code waits for one line of input and then dispatches it to the `execute-logic` function.
;; This way we can have full control over what we can do and there can be an arbitrarily complex protocol
;; between the caller and this application over **stdio**.
(define (loopInput)
  (execute-logic (read-line))
  (loopInput))
(loopInput)
```

The last four lines in the code above is just a loop that reads a line from standard input, and then calls our ```execute-logic``` function passing the data received. This is the only boilerplate needed by our application code.

Your logic can do whatever it wants with the input data and then just print the result to standard output. Here we just use the [display](https://docs.racket-lang.org/reference/Writing.html#%28def._%28%28quote._~23~25kernel%29._display%29%29) function to print the input to standard output.

### Wrapper code in Node.js

**Update@2017-10-18:** I created an npm package to significantly reduce the boilerplate code shown below, so **after** you have read this article and understood how the solution works, use the package [AWS-lambda-binary](https://www.npmjs.com/package/aws-lambda-binary) in your production Lambda functions.

The wrapper code will be a bit longer but still remains very simple to understand.

```javascript
const child_process = require('child_process');
const readline = require('readline');

/****************************
 * START OF WRAPPER CODE
 ****************************/
const execPath = './application';

let proc = initProc(execPath);

function initProc(options) {
    options = options || {};
    const p = child_process.spawn(execPath);

    // Add your own custom handler if you want to handle the errors differently.
    p.stderr.on('data', (err) => {
        console.error('proc stderr: ', err);
    });

    // You might want to use ```exit``` event instead of ```close``` if you don't
    // care about the ```stdio streams``` of the subprocess.
    // https://nodejs.org/api/child_process.html#child_process_event_close
    // https://nodejs.org/api/child_process.html#child_process_event_exit
    p.on('close', function (code) {
        if (code !== 0) {
            console.error(new Error(`Process closed with code: ${code}`));
        }
        const {handlerProcCloseCallback} = proc;
        proc = null;
        if (handlerProcCloseCallback) {
            handlerProcCloseCallback(code);
        }
    });

    // This is the part that you get the result back from your Racket application
    // I prefer to receive lines back from the application for simplicity
    // so I use https://nodejs.org/api/readline.html#readline_event_line
    // but you can adapt this to use binary data as well, exactly like we did with
    // `stderr` above.
    const rl = readline.createInterface({ input: p.stdin, output: p.stdout });
    rl.on('line', (line) => {
        const {handlerCallback} = proc;
        if (handlerCallback) {
            handlerCallback(line);
        }
    });

    return {
        p, rl,

        // Will be called for every **line** output from our application.
        handlerCallback: null,

        // Will be called when the application process is closed. You can use
        // this callback to restart it automatically or do something custom.
        handlerProcCloseCallback: null,
    };
}

function ensureProcRuns(options) {
    if (!proc) {
        proc = initProc(options);
    }
    if (options.resetCallbacks) {
        proc.handlerCallback = null;
        proc.handlerProcCloseCallback = null;
    }
}
/**************************
 * END OF WRAPPER CODE
 **************************/

exports.handler = function (event, context) {
    ensureProcRuns({resetCallbacks: true});

    // Register the handler we want for each line response!
    proc.handlerCallback = (result) => {
        console.log(`rkt: ${result}`);
        context.done(null, `result: ${result}`);
    };

    // Send the input to the Racket application
    proc.rl.write(`${JSON.stringify({event, context})}\n`);
};

```

I don't think it needs lots of explanation but I will explain some of the important bits.

Your main focus should be inside the ```exports.handler = function(...) {...}``` section, and everything before that is just the wrapper code around the subprocess spawning.

The first thing we need to do inside our handler code is to call ```ensureProcRuns()``` in order to make sure that there is a running subprocess of our Racket application. Ideally, this should always be instant since we already instantiate a process during the initialisation phase of the container. If the subprocess fails though and exits during an invocation, this will ensure that future invocations will re-spawn the process.

After that first line, we need to register a callback function that will handle the result back from the Racket application. In my case here we just read a single line and then finish the lambda invocation with success ```context.done(...)``` and with return value whatever the line we received was.

It is very important to understand that this solution is not limited to single line responses. You can have your own protocol that spans multiple lines of response from the application, or even going down to binary data instead of line-by-line.

Finally, once we set our handler callback, we write on standard input of the subprocess the input to our Racket application. Here I just pass a JSON serialised object containing both the **event** and the **context** of the lambda invocation, which should cover most of your use-cases. If you want to avoid JSON deserialisation in your Racket code, then you can parse the event in this wrapper code and just pass a line of comma-separated values down to the application. Again, here I use a single line of input, but you can easily adapt this to span multiple lines of input or binary data.

There is also an additional callback that you can set, the ```handlerProcCloseCallback()```. This callback is called every time the subprocess's standard input and output streams are closed (usually when the subprocess terminates). For example, you can use this callback to re-spawn the closed subprocess and speedup future invocations, as shown below.

```javascript
proc.handlerProcCloseCallback = (code) => {
    ensureProcRuns({resetCallbacks: true});
};
```

## Compile and bundle your code

* Copy the Racket code from above and save it in a file named ```application.rkt```
* Compile the Racket code into a standalone binary

    ```bash
    raco exe --orig-exe application.rkt
    ```

* Copy the Node.js code from above and save it in a file named ```wrapper.js```
* Bundle everything together ```zip bundle.zip application wrapper.js```

You can upload ```bundle.zip``` now to your lambda function and test it.

Make sure that your lambda function has the following configuration:

| Configuration Property | Value |
|----------|-------|
|**Runtime**|Node.js 6.10|
|**Handler**|wrapper.handler|

Test around with different memory configuration to find a good balance between latency and cost for your application.

## Conclusion

As you can see, we did not invent quantum computing. We just applied old-fashioned programming principles to AWS Lambda. We have our custom application logic written in Racket, or any other compiled language, that accepts data from standard input, and writes to standard output. Anybody used Linux command line tools before? Yes, it is the same!

This solution is very flexible and allows you to either go with a minimalistic protocol of single line input and single line output as I have done above, or even with a super complicated custom protocol. After all, it's just standard input and standard output.

The most fascinating thing about this approach is that now your custom code can run in AWS Lambda with super low latencies!

SEO tags: #AWS #Racketlang - #AWSLambda #Meets #Racket
