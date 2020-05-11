---
title: Hobby Languages for 2020
description: The languages I will use for my hobby projects in 2020. ReasonML, ClojureScript and Go.
---

## Overview

Over the past few years I played around with many languages, starting with C/C++ at college to Java and JavaScript professionally, and to many others during my own time out of interest like Go, Scala, Python, Elixir, Clojure, Racket, Ruby and more.

During the last year I wanted to focus more on functional languages, specifically [Elixir](http://elixir-lang.org/) and [Clojure](https://clojure.org/). Unfortunately, I didn't manage to do much due to work and other things taking up my time, but I really loved both languages.

After trying and playing with many languages I realised that there are certain things I am looking for in order to keep me interested for more than a few days.

My hobby language needs to:
- Be fun to write
- Have a good ecosystem to manage projects without a lot of ceremony
- Be general purpose enough to write scripts and CLIs, but also web servers/clients
- Be fast enough
- Optional - Functional programming
- Optional - Concurrency and Parallelism constructs

Based on the above requirements, this year I decided to focus on the following languages, and hopefully I will be able to spend a few months with each one and do some projects with them.

## ReasonML

I had [OCaml](https://ocaml.org/) on my to-dive-deep list for years, but never jumped into it.
When Facebook released [ReasonML](https://reasonml.github.io/) a while ago I thought it was a nice bridge/opportunity to get me into the OCaml world.

It's no secret that I love the [Node](https://nodejs.org/) ecosystem, although it's something most people hate these days. I truly believe that when you learn how to navigate around without getting disoriented by the huge amount of available modules, it provides a lot of things that other languages lack in a simple and easy way to use!

ReasonML [has a fantastic integration with NPM](https://reasonml.github.io/docs/en/installation) which makes things easy.

The first project I am working on with ReasonML is to write an interpreter for the [Monkey language](https://monkeylang.org/), following the book [Writing an Interpreter in Go](https://interpreterbook.com/) by Thorsten Ball. I highly recommend this book, it's simply awesome!


## ClojureScript

Around 2 years ago I played around with Lisps, specifically [Racket](https://racket-lang.org/) and Clojure. 

Racket was surprisingly refreshing and I really enjoyed learning it, with great libraries and amazing documentation. However, it was quite slow for some things I did back then, but I know that some work was done to make it faster nowadays so I need to revisit it at some point.

Clojure, as a language trully impressed me. It has everything a functional language needs, with core and efficient datastructures, and ideas that are very powerful once learnt! However, although I have been using JVM languages professionally at work for 5+ years, I find the ecosystem to require too much ceremony to do the simplest thing, so I avoid it for my hobby projects.

[ClojureScript](https://clojurescript.org/) on the other hand, is the same (almost) language as Clojure, but compiles to JavaScript. This means that you can use the NPM ecosystem to consume and produce software written in ClojureScript alongside JavaScript.

In addition, since [Clojure has a very slow startup](http://clojure-goes-fast.com/blog/clojures-slow-start/) due to the way it handles class loading it's not really suitable for quick scripts I write every now and then, whereas ClojureScript can use Node as its runtime leading to zero startup latency.

There are some amazing projects to make the ClojureScript integration with NPM easier, like [Shadow CLJS](https://shadow-cljs.github.io/docs/UsersGuide.html) which is my go-to; I even wrote a project template generator for it, [create-shadow-cljs-app](https://github.com/lambrospetrou/create-shadow-cljs-app). Coincidentally, David Nollen also wrote an article yesterday about a new [feature in ClojureScript to integrate better with JavaScript bundlers](https://clojurescript.org/guides/webpack) which will hopefully bring more people.

Clojure(Script) is so nice that the community wrote standalone REPLs to make it usable directly from the command line for scripting. My favourite is [planck-repl](https://github.com/planck-repl/planck), but [babashka](https://github.com/borkdude/babashka) has been making the rounds recently as well and I will have to look into it.

I wrote a few small things in ClojureScript but I want to write something bigger to get a better feel of the language itself.

I will definitly have hard time deciding between ReasonML and ClojureScript since they both target Node, both can be used for similar things, and they are both functional languages. However, while they are very similar in some aspects, they are two very different languages, coming from different language families, Lisp vs ML.

## Go

I started writing in [Go](https://golang.org/) back at 2014, and since then I wrote scripts, API servers, several static site generators for my website and other tools.

The language itself has nothing extraordinary, but it really feels nice using it and you can get many things done just by using the standard library, which is amazing on its own.

In addition, being a compiled language means it runs very fast, and it has excellent concurrency constructs that make writing concurrent software very easy, which is nice for the situations where you need to put those CPU cores into work.

I tried replacing Go with some other language over the past few years to be my quick go-to language but I always come back. Maybe ReasonML or ClojureScript will do the trick, but the simplicity, the performance, and the concurrency features are really unmatched so far.

Even though I already wrote several things in Go, I want to get back to it this year since I haven't used it a lot recently.

## Others

As I said in the overview, I really like playing around with many languages. Some of them lose me from the hello world, but many of them end up in my to-dive-deep list.

Other languages I really liked and I would like to spend more time with them, probably not a lot this year, are Elixir and [Rust](https://www.rust-lang.org/).

Elixir has everything I love in a language apart from single-threaded performance really. It's amazing for anything that requires a lot of juggling around since it supports millions of processes running independently, with their own garbage collection, preemptive scheduling, and other great features provided by its runtime, the [BEAM VM](https://blog.stenmans.org/theBeamBook/). As a language, and as an ecosystem it is very high on my list! There is some amazing work being done now [with Phoenix LiveViews](https://www.phoenixframework.org/blog/build-a-real-time-twitter-clone-in-15-minutes-with-live-view-and-phoenix-1-5) which is very interesting, and I am eager to see where it will lead.

Rust is making waves recently a lot! Both in my social circles, but also professionally it gets adopted by many big companies for their performance-critical systems. It has a nice combination of functional programming concepts together with performance oriented features like memory management to avoid runtime issues. In addition, it is among the best languages to use in order to compile to [WebAssembly](https://www.rust-lang.org/what/wasm) which is something I am extremely interested in.

I wish the days were longer :) Much to learn, so little time...
