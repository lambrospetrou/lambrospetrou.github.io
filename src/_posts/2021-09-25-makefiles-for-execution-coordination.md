---
title: Makefiles for execution coordination
description: "Use 'make' and Makefiles to coordinate simple and complicated processing pipelines, from files to complex programs."
---

As the title implies, this article is about the now ancient tool `make` [[1](https://en.wikipedia.org/wiki/Make_(software))] [[2](https://www.gnu.org/software/make/manual/make.html)]. This little gem of software is used in our industry for at least 45 years now.

To be fair, I haven't personally used it in big projects at work, but I regularly use it for my personal side projects since it gets the job done, and it provides a language agnostic common interface which means I can use it for Javascript projects, Kotlin projects, Golang projects, and others.

Enough with the intro though, in this article I will describe a very simple problem I wanted to solve recently and the good old `make` turned out to be the best solution, versus all the newer, shinier, and way more bloated modern alternatives.

## Problem

The problem at hand is simple, and common to many people. I want a simple workflow tool to run some local programs in a specific order, each one potentially generating some output files to be used as input by subsequent programs in the workflow, and ideally parallel execution for the steps that do not depend on each other. A simple file processing data pipeline, to fully run locally on my laptop.

Simple eh... 🤪 😅

I did spend a few days looking for available tools but I was surprised that most of the modern workflow tooling is extremely bloated, complicated, and most of them made for "web scale distributed systems", even though most people don't really need that.

Candidate solutions:
- <https://snakemake.github.io>
	+ This is the best available tool I found, and if you notice its name it hints to the `make` tool. It has simple declarative way of expressing the workflow steps, their inputs and outputs, and the tool figures out the order in which to execute them. I really liked its documentation but I ended up not using it since it is built ontop of Python, and I don't like Python...
- Do-it-myself
	+ The first thought I actually had was to just write a quick script in [Go](https://golang.org/) and [shell out](https://pkg.go.dev/os/exec@go1.17.1#Cmd.Output) to the programs I wanted to execute, with as much parallelism and dynamism I needed. For a one-time script this is my goto, but I wanted to find a way to define the workflow declaratively, and learn something that could be used in the future for other more complicated flows as well.

## make

I chatted with a friend about this and he instantly said "just use make". I knew `make` was the main built tool for C/C++ projects, with fancy dynamic rules, running only the steps that have to run in the right order, and with good performance. I never used it though solely as an orchestration tool, with nothing to compile...

If you are not familiar with `make`, these are great resources on writing Makefiles:
- https://makefiletutorial.com/
- https://swcarpentry.github.io/make-novice/reference.html
- https://www.gnu.org/software/make/manual/make.html (the actual manual)


## Flow 1 - Parallel File Processing

The first example workflow does the following:
1. Process all JSON files inside a directory `data/`. For each JSON file `F` we want to call some command `C` that will process `F`. This ideally should be done in parallel since there could be lots of files.
2. Once all the files are processed, run another command which can continue the workflow execution.

Even though the workflow is simple, it still showcases how to use all the things we need:
- Parallel execution of independent steps
- Ordered execution of dependent steps

![Makefile parallel files](/articles-data/2021-09-25-makefiles-for-execution-coordination/makefiles-parallel-files.png)

The following Makefile (filename `flow1.mk`) implements the above workflow.

```makefile
MAKEFILE_NAME = flow1.mk
DATAFILES = $(wildcard data/*.json)

default: boom

# Trigger a recursive `make` for the target `datafiles_all`.
# The critical argument is `--always-make` which will force the run all the time, 
# otherwise `make` will not do anything since the data files are not modified!
boom:
	$(MAKE) datafiles_all --always-make -f $(MAKEFILE_NAME)

# A trampoline target that depends on all the data files to force their processing.
datafiles_all: $(DATAFILES)
	@echo :: 'datafiles_all' finished!

# The target that corresponds to each JSON file in the `data/` directory.
data/%.json:
	@echo "processing single file:" $@
	@cat $@
```

If we run the above makefile using `make -f flow1.mk` we get the following output:
```
$ make -f flow1.mk
processing single file:  data/a.json
{"a": 1}
processing single file:  data/b.json
{"b": 2}
processing single file:  data/c.json
"c"
:: datafiles_all finished!
```

Pretty clear output showing that all three files in the `data/` directory were processed.

### Parallelism

If we run the above makefile with the additional `-j 3` arguments, then all three files will be processed in parallel.
This is not clear with the above example, so let's make it a bit more complicated to showcase this as well.

```makefile
# Run with `make -f flow1-parallel.mk -j 3` for parallelism 3
# or with `make -f flow1-parallel.mk -j $(nproc)` to use all processors.
# The default is to process each target one after the other.

MAKEFILE_NAME = flow1-parallel.mk
DATAFILES = $(wildcard data/*.json)

default: boom

# Trigger a recursive `make` for the target `datafiles_all`.
# The critical argument is `--always-make` which will force the run all the time, 
# otherwise `make` will not do anything since the data files are not modified!
boom:
	$(MAKE) datafiles_all --always-make -f $(MAKEFILE_NAME)

# A trampoline target that depends on all the data files to force their processing.
datafiles_all: $(DATAFILES)
	@echo :: 'datafiles_all' finished!

# Special override target for this specific file to simulate a long/slow execution.
data/a.json:
	@echo "processing slow file:" $@
	@sleep 2
	@echo still processing $@ ...
	@sleep 2
	@echo finished processing $@ ...

# The target that corresponds to each JSON file in the `data/` directory.
data/%.json:
	@echo "processing single file:" $@
	@cat $@
```

The only difference in this makefile is the newly added explicit target rule for `data/a.json`.
By explicitly adding that rule, `make` will execute those commands instead of the generic statements defined by the `data/%.json` rule.

Let's see how this runs with the default `make` invocation:
```
$ make -f flow1-parallel.mk
processing slow file: data/a.json
still processing data/a.json ...
finished processing data/a.json ...
processing single file: data/b.json
{"b": 2}
processing single file: data/c.json
"c"
:: datafiles_all finished!
```

As we can see, we need to completely finish the slow processing of `data/a.json` before proceeding with the rest files.
Now let's run it with parallelism `2`:
```
$ make -f flow1-parallel.mk -j 2
processing slow file: data/a.json
processing single file: data/b.json
{"b": 2}
processing single file: data/c.json
"c"
still processing data/a.json ...
finished processing data/a.json ...
:: datafiles_all finished!
```

In this case, we can see that processing for `data/a.json` started as before, but before we even get to see the `still processing data/a.json ...` printout, the other two files are already processed, and then finally `data/a.json` completes.

`make` is smart enough with parallelism and no matter how many files, or target rules, we have in the Makefile it will respect the parallelism we specify with the `-j N` argument and execute the target steps accordingly without exceeding the specified parallelism.

## Flow 2 - DAG

Another simple flow I want to show is how to make a pipeline of processes where some depend on each other, and some use local files/pipes as their communication mechanism.

![Makefiles - DAG execution](/articles-data/2021-09-25-makefiles-for-execution-coordination/makefiles-dag.png)

What the diagram above means in plain English?
1. Initially we start with the `t1` and `t2` targets executing in parallel.
2. `t1` writes an output file `f1.txt` and then proceeds to execute `t3` which will read the `f1.txt` file as input (`t3` depends on `t6` though, so cannot start until `t6` finishes as well).
3. In parallel to `t1/t3`'s execution flow, once `t2` completes it will trigger `t6`, but `t6` depends on `t4` and `t5` targets to have been completed first.
4. `t4` and `t5` execute in parallel, and the output of `t4` is being read by `t5` through the file pipe `/tmp/comm.fifo`. Note that this is blocking communication, meaning that in order for `t4` to manage to finish, `t5` must also run in parallel to consume the content produced by `t4`.
5. Once `t6` finishes, `t3` can execute.
6. Once both `t6` and `t3` are complete, `t7` will execute and complete our workflow.

The above workflow is modelled by the following makefile (`flow2-dag.mk`).
Note how each target defines the dependencies it needs in order to properly coordinate the execution.

```makefile
.PHONY: t1 t2 t3 t4 t5 t6 t7
default: t7

t1:
	@echo "t1"
	@echo "t1-content-output" > f1.txt
	@echo "t1 output file written!"

t2:
	@echo "t2"

t3: t1 t6
	@echo "t3"
	@cat f1.txt
	@echo "t1 output file printed!"

t4_5_setup:
	@rm -f /tmp/comm.fifo
	@mkfifo /tmp/comm.fifo

t4: t4_5_setup
	@echo "t4"
	@cat /usr/share/dict/words > /tmp/comm.fifo

t5: t4_5_setup
	@echo "t5"
	@echo "Total lines: " && wc -l < /tmp/comm.fifo

t6: t2 t4 t5
	@echo "t6"

t7: t3 t6
	@echo "t7"
```

Let's run it and see if it works.

```
$ make -f flow2-dag.mk -j 4
t1
t4
t2
t5
Total lines:
t1 output file written!
  235886
t6
t3
t1-content-output
t1 output file printed!
t7
```

Boom 🥳 It works as expected 🚀 (exercise to the reader to confirm...)

**Note:** This workflow requires parallelism of at least `2`, otherwise targets `t4` and `t5` will deadlock. Target `t4` will be the only one running, and once it fills up the file pipe it will block until someone consumes it. But since `t5` is not running the workflow will be stuck. In scenarios like this, either always make sure to run this with some parallelism, or use normal files as communication, as we did between `t1` and `t3`.

## Conclusion

There is no doubt that `make` is amazingly powerful and flexible enough to achieve any kind of workflow execution. I barely even covered its functionality. I expected it to be much more cumbersome to use due to the complexity I see in how most of the C/C++ projects are using it.

I was pleasantly surprised! For these use-cases when I don't want complicated bloated tools, `make` fits the bill perfectly!
The fact that `make` is available on almost any system, with super fast execution, makes it a great tool in my toolkit.
