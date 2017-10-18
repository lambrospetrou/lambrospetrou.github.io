---
title: npm package to easily run arbitrary compiled binaries in your applications or AWS Lambda
description: Brief description of my npm package that makes it easier to run compiled binaries on AWS Lambda or in your server applications.
---

I recently posted a detailed article on [how to efficiently run Racket compiled native binaries on AWS Lambda](/articles/aws-lambda-meets-racket/), and the same process can be used for any compiled binary that runs on Amazon Linux (including binaries from languages like Go, Racket, OCaml, Rust, C/C++, etc.).

The Lambda wrapper code was very easy to understand but a bit long, and if you have lots of lambdas using binaries you might end up copy-pasting those lines, which as we know is not good. Remember the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle?

As a result, to make it easier for me, and anyone implementing the solution described in that article, I created an npm package to help you reduce the boilerplate of your Lambda wrapper code significantly.

## AWS-Lambda-Binary npm package

You can find the package at https://www.npmjs.com/package/aws-lambda-binary

Its usage is very easy and the package itself provides sufficient documentation of the API. In addition, couple of ready-to-upload AWS Lambda examples are provided inside the ```_examples``` folder.

In a nutshell, the following describes how to use this package to start the Linux command [cat](https://ss64.com/bash/cat.html) which will be used as an echo-back process.

First of all if you don't have an existing lambda project, just create one using the following commands:

```bash
mkdir lambda-test && cd lambda-test
npm init -y
```

Now that you have a project, install the npm package:

```bash
npm install aws-lambda-binary
```

Copy and paste the following code into a file named ```wrapper.js```.

```javascript
const application = require('aws-lambda-binary').spawnLineByLine({
    spawn: { command: 'cat' }
});

exports.handler = function (event, context) {
    application.ensureIsRunning();

    application.stdout(result => context.done(null, result));

    application.stdin(JSON.stringify({event, context}));
};
```

Finally, prepare the zip file to upload to AWS Lambda by running the command below:

```bash
zip -r bundle.zip wrapper.js node_modules/
```

In the [AWS Lambda console](https://console.aws.amazon.com/lambda/home), create a new function with **Runtime** ```Node.js 6.10``` (or higher), and with **Handler** ```wrapper.handler```.

Upload the ```bundle.zip``` file you created above and **Save and Test**. The above lamba code takes the **event** of the lambda invocation, along with the **context** object which contains some metadata, serialises them into JSON string and sends them to the ```cat``` process through standard input. The process returns the result back through standard output and we successfully finish the lambda invocation passing the line of text received as the result.

There are more examples in the npm package but as you can see above, once you have all your logic into a compiled binary, starting the binary and communicating with it is a matter of ~5 lines.

Enjoy, and feel free to contribute to the package.

SEO tags: AWS, AWSLambda, binary, racket, go, ocaml, rust