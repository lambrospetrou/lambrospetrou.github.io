---
title: V8 Isolates for fast JavaScript execution in Go
description: "Use V8 isolates to execute JavaScript code efficiently using Go (Golang)."
---

I am working on a side project similar to Leetcode/HackerRank (more on that on another article) where I have to execute some given JavaScript code against hundreds of inputs. The first approach I thought was spawning a subprocess and executing `node -e "<code-to-evaluate>"` directly passing the script I want to run. This works fine and gets the job done in a low throughput scenario.

However, I remembered that [Cloudflare Workers](https://workers.cloudflare.com/), Cloudflare's serverless offering, is using V8 Isolates to execute the submitted JavaScript code [[1](https://developers.cloudflare.com/workers/learning/how-workers-works#isolates)][[2](https://blog.cloudflare.com/cloud-computing-without-containers/)][[3](https://blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/)]. Therefore, I wanted to see how much faster that can be for my usecase.

## Experiment

I have written a very basic experiment where the JavaScript code calculates the sum of a given integer array (and some extra arguments). The code is as simple as below:

```javascript
// f = (a: number[], b: number, c: string) => number
const f = (a, b, c) => {
  return a.reduce((c, acc) => acc + c, b) + c.length;
};
result = f(%+v, %+v, %+v);
result;
```

The weird looking arguments, `%+v`, are just placeholders which will be replaced in my Go program with actual values. Remember, the reason I wanted this in the first place is to run some code (in this case the function `f`) against lots of input arguments.

The last line evaluates to the value of `result`, just imagine that this is interpreted line by line.

### Spawn Node

The simplest approach I thought was to invoke `node` passing the JavaScript code to be evaluated.

```go
func node(script string) string {
  output, e := exec.Command("node", "-e", script+"\nconsole.log(result)").Output()
  if e != nil {
    log.Fatalf("Error: %+v\n", e)
  }
  return string(output)
}
```

The `script+"\nconsole.log(result)"` might seem strange at first. We need to suffix our script with `console.log(result)` since we capture the output of the subprocess.

### V8 Isolates

I won't go into the details of what a V8 Isolate is other than quoting [Cloudflare's documentation](https://developers.cloudflare.com/workers/learning/how-workers-works#isolates)...

>V8 orchestrates isolates: lightweight contexts that group variables with the code allowed to mutate them. You could even consider an isolate a "sandbox" for your function to run in.
>
>A single runtime can run hundreds or thousands of isolates, seamlessly switching between them. Each isolate's memory is completely isolated, so each piece of code is protected from other untrusted or user-written code on the runtime. Isolates are also designed to start very quickly. Instead of creating a virtual machine for each function, an isolate is created within an existing environment. This model eliminates the cold starts of the virtual machine model.

And [Chromium's documentation](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/bindings/core/v8/V8BindingDesign.md).

>An isolate is a concept of an instance in V8. In Blink, isolates and threads are in 1:1 relationship. One isolate is associated with the main thread. One isolate is associated with one worker thread.
>
>A context is a concept of a global variable scope in V8. Roughly speaking, one window object corresponds to one context.

Let's see how we create and use a V8 Isolate in Go, using <https://github.com/rogchap/v8go>.

```go
func v8isolates(script string, isolateOpt ...*v8go.Isolate) string {
  var isolate *v8go.Isolate
  if len(isolateOpt) > 0 {
    isolate = isolateOpt[0]
  }
  ctx, _ := v8go.NewContext(isolate) // Passing `nil` creates a new Isolate
  defer ctx.Close()
  output, e := ctx.RunScript(script, "function.js")
  if e != nil {
    log.Fatalf("Error: %+v\n", e)
  }
  return output.String()
}
```

The main method we use is `ctx.RunScript(script, filename)` which accepts the code to execute (argument `script`), and a (fake) filename. The filename will be used inside the generated error stacktrace in case the execution of the passed script fails for any reason. The filename itself does not need to actually exist on the filesystem. The returned value of `ctx.RunScript(...)` is the last evaluated expression of the given script, which explains the last line in our JavaScript code above which is just `result`.

## Results

Cloudflare makes bold statements about the performance of their Workers due to using Isolates, but I was still mind-blown by how fast they actually work 🤯

I wrote some basic benchmarks for the above two functions and used a simple input for the array (10 to 25 integer numbers).

**Mac 16" 2020 (16-threads)**

```
➜ go test -bench . -benchtime 1s -benchmem
goos: darwin
goarch: amd64
pkg: github.com/lambrospetrou/code-playground/golang-v8isolates
BenchmarkNode-16                              19	  62746119 ns/op     43208 B/op     57 allocs/op
BenchmarkNodeParallel-16                     176	   6861996 ns/op     43142 B/op     55 allocs/op
BenchmarkV8IsolatesReuse-16                 4171	    290742 ns/op        75 B/op      6 allocs/op
BenchmarkV8IsolatesNoReuse-16                823	   1414748 ns/op        88 B/op      7 allocs/op
BenchmarkV8IsolatesReuseParallel-16        30026	     45703 ns/op        75 B/op      6 allocs/op
BenchmarkV8IsolatesNoReuseParallel-16       2079	    983084 ns/op        83 B/op      7 allocs/op
PASS
ok  	github.com/lambrospetrou/code-playground/golang-v8isolates	10.218s
```

**Surface Pro 2017 (4-threads)**

```bash
$ go test -bench . -benchtime 1s -benchmem
goos: linux
goarch: amd64
pkg: github.com/lambrospetrou/code-playground/golang-v8isolates
BenchmarkNode-4                            27    47009289 ns/op      51359 B/op     92 allocs/op
BenchmarkNodeParallel-4                    76    15338893 ns/op      51548 B/op     92 allocs/op
BenchmarkV8IsolatesReuse-4               3342      385395 ns/op         74 B/op      6 allocs/op
BenchmarkV8IsolatesNoReuse-4              692     1956912 ns/op         84 B/op      7 allocs/op
BenchmarkV8IsolatesReuseParallel-4       5684      213542 ns/op         75 B/op      6 allocs/op
BenchmarkV8IsolatesNoReuseParallel-4      303     3631768 ns/op         83 B/op      7 allocs/op
PASS
ok    github.com/lambrospetrou/code-playground/golang-v8isolates      12.725s
```

As you can see, there is a **huge** performance boost when using V8 Isolates, instead of spawning the `node` process. It's not unexpected since spawning a process is a quite expensive but still...

We can do a lot of optimizations to how we use the spawned process as well. For example, we can spawn one `node` process per thread and then communicate with it over standard input/output, and having a small script that reads the standard input, evaluates it, and prints the result on standard output. This will probably be even faster than the V8 Isolates but apart from the fact that we completely lose execution isolation, it's also a lot more work, so it's out of scope.

The difference between `BenchmarkV8IsolatesReuse` and `BenchmarkV8IsolatesNoReuse` is that instead of creating a new Isolate for every single run, we use one Isolate per thread and only create a new context per run. Awesome speed up!

You can find the code for the experiment at <https://github.com/lambrospetrou/code-playground/tree/master/golang-v8isolates>.

## Conclusion

V8 Isolates are amazing 🚀 

However, if you are going to use them on a real production multi-tenant system make sure to secure it further (read references below).

## References

1. https://developers.cloudflare.com/workers/learning/how-workers-works#isolates
2. https://blog.cloudflare.com/cloud-computing-without-containers/
3. https://blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/
