---
title: "Durable Objects (DO) — Unlimited single-threaded servers spread across the world"
description: "Understand Cloudflare Durable Objects and use them to simplify your architecture."
isDraft: true
---

**Table of contents**

- [Not just for real-time collaboration](#not-just-for-real-time-collaboration)
- [Workers intro](#workers-intro)
- [Durable Objects intro](#durable-objects-intro)
- [Durable Objects and the Actor model](#durable-objects-and-the-actor-model)
- [Durable Objects use-cases](#durable-objects-use-cases)
- [Limitations](#limitations)
- [Pricing Durable Objects vs Workers](#pricing-durable-objects-vs-workers)
- [Conclusion](#conclusion)

In this article I will showcase Durable Objects (DO), probably the most underrated compute and storage offering by Cloudflare.

I am not going to focus on how you use Durable Objects in code at all, since the goal is to explain why Durable Objects should be used more, but you can find [code examples in the developer docs](https://developers.cloudflare.com/durable-objects/examples/).

> Each Durable Object instance is identified by a user-provided key, has its own throughput limits, its own durable storage, its own in-memory state, executes in single-threaded fashion, and you can influence its location if necessary.

If you don't understand what the above sentence means, reading the article will make it clear.

## Not just for real-time collaboration

As of the time of writing, the Cloudflare developer documentation ([see here](https://developers.cloudflare.com/durable-objects/)) and the Durable Objects landing page ([see here](https://www.cloudflare.com/en-gb/developer-platform/durable-objects/)) describe DOs as follows:

> Real-time, low-latency API coordination and consistent storage
>
> Durable Objects provides a powerful API for coordinating multiple clients and users — helping you build collaborative applications while maintaining strong consistency of state. [...]
> 
> Durable Objects provide a powerful API for coordinating multiple clients or users, each with private, transactional and strongly consistent storage attached.

In my opinion, even though the above is accurate, it focuses too much on the real-time collaboration use-case and throws off customers that are not actually working on real-time collaboration software.

That is a lot of people, including myself when I initially read about Durable Objects (DO).

I will showcase why **Durable Objects are a great fit for a lot more use-cases** than real-time collaboration.

## Workers intro

Durable Objects are super-powered Cloudflare Workers (see docs [[1](https://www.cloudflare.com/en-gb/developer-platform/workers/)] [[2](https://developers.cloudflare.com/workers/)] [[3](https://workers.cloudflare.com/)]).

Workers are Cloudflare's serverless compute platform that:
- Doesn't have cold starts.
- Runs in more than 300 locations across the world.
- Supports Javascript and any WASM-compiled language.
- Has direct access to all of Cloudflare's infrastructure ([see all Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)).

You can read more on how Workers are implemented on-top of V8 isolates in the excellent ["How Workers works"](https://developers.cloudflare.com/workers/reference/how-workers-works/) page.

The things we care about for this article is that Workers:
- Are limited at 128MB of memory, therefore hard to do in-memory caching for anything significant.
- Concurrently handle many requests on a single Worker instance (V8 isolate).
- Are stateless across requests, and each request can potentially be routed to a different machine in Cloudflare's network.
- They can be destroyed and recreated whenever, therefore user code should have no assumptions about affinity (i.e. where it runs) or longevity (i.e. how long each worker instance runs).

## Durable Objects intro

Now that we know what Workers are, we can better understand Durable Objects.

In my mind, Durable Objects (DO) are **Workers with durable storage**, but there are some important differences from Workers.

Firstly, let's go through some key properties of DOs:
- Built on-top of Workers, so they support exactly the same code (Javascript+WASM), with the same memory limits.
- Each Durable Object instance stays alive for several seconds before hibernating, hence allowing in-memory caching to boost performance ([see docs](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/)).
- Each Durable Object instance has its own local durable storage that only that specific instance can access (read/write) ([see docs](https://developers.cloudflare.com/durable-objects/api/transactional-storage-api/)).
- Each Durable Object instance has an identifier, either randomly-generated or user-generated, allowing you to "select" which Durable Object instance should handle a specific request or action by providing this identifier ([see docs](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-from-a-worker/#1-create-durable-object-ids)).
- They are not available in every location like Workers, but are still spread around the world (see the [where.durableobjects.live](https://where.durableobjects.live/) project for live locations), and most importantly you can influence where each instance should be located ([see Location hints docs](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint)).
- They provide an Alarms API that allows you to schedule an execution of your Durable Object instance any time in the future with millisecond-granularity ([see docs](https://developers.cloudflare.com/durable-objects/api/alarms/)).
- They are effectively single-threaded; when a request execution causes any side-effects (e.g. durable storage reads/writes) other requests to that specific DO instance are blocked until the request completes. Read more details on how this is implemented in the blog post ["Durable Objects: Easy, Fast, Correct — Choose three"](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).
- Each Durable Object "type" (or "binding" in Cloudflare terms) maps 1-to-1 with a Javascript class implementing the business logic. **You can create unlimited instances of each Durable Object type**.

There are more things to know, but I listed the key features I care about.

You probably already spotted some important differences between Workers and Durable Objects:
- Fully stateless (Worker) vs In-memory state (DO)
- No instance affinity (Worker) vs Affinity by an identifier (DO)
- Always near the request (Worker) vs Ability to influence location (DO)
- No storage (Worker) vs Durable storage (DO)
- Concurrent execution (Worker) vs Single-threaded execution (DO)

## Durable Objects and the Actor model

Another way of describing and thinking about Durable Objects is through the lens of the [Actor programming model](https://en.wikipedia.org/wiki/Actor_model) (🧍🏼‍♂️↔🧍🏻).

There are several popular examples of the Actor model supported at the programming language level through runtimes or library frameworks:
- [Erlang OTP](https://www.erlang.org/doc/system/conc_prog.html) used by Erlang and Elixir, probably among the oldest and most feature-rich Actor runtimes.
- [Akka](https://doc.akka.io/docs/akka/current/typed/guide/actors-intro.html) for Java, Scala, and later .NET.
- [Microsoft Orleans](https://learn.microsoft.com/en-us/dotnet/orleans/) for .NET.
- more...

**Each Durable Object instance can be seen as an Actor instance**, receiving messages (incoming HTTP/RPC requests), executing some logic in its own single-threaded context using local durable storage or in-memory state, and finally sending messages to the outside world (outgoing HTTP/RPC requests or responses, even to another Durable Object instance).

The Actor model simplifies a lot of problems in distributed systems because it abstracts away the communication between actors using RPC calls that could be implemented on-top of any transport protocol, and it avoids all of the concurrency pitfalls you get when doing concurrency through shared memory (e.g. race conditions when multiple processes/threads access the same data in-memory).

The most astonishing feature of Durable Objects, and the super differentiator from the above Actor frameworks, is that with Durable Objects you get all of the above, built-in, while having a huge distributed network to spread your actors across. 🤯

When I was at WhatsApp a few years ago, I was really amazed by how the Erlang runtime simplified and solved many distributed systems problems for us. Each chat (e.g. between 2 people) was handled by a single Erlang process (a single actor), and all messages of that chat were routed to that specific process using the Erlang runtime primitives for routing. This meant that all the logic for each chat was running in a single-threaded process with normal sequential code. Easy to reason about. We also had tens of thousands of servers across the US and Europe connected in a mesh so that the Erlang runtime can route messages across them.

With Durable Objects you get all of that 💪🏼 But with orders of magnitude more power and much less effort than if you had to build all this infrastructure yourself!

Your system now comprises of Cloudflare's whole network. Even though Durable Objects are not in every location of the CDN like Workers, they are in more than 25 cities across the world as of today (see [where.durableobjects.live](https://where.durableobjects.live/)) and they will keep expanding over time.

As mentioned above, you can create unlimited instances of Durable Object types (or bindings), therefore if you design your Actor model well, you can scale across the whole of Cloudflare's edge network.

## Durable Objects use-cases

Now that we know all about Durable Objects, let's see how they can be used to simplify your architecture.

As a guideline, if you have any use-case where there is a clear boundary between some or all of your resources, you can use Durable Objects to simplify your logic when processing and storing each of those resources.

It can be per user, per chat channel, per factory warehouse, per object storage bucket, per workflow, per tenant in a multi-tenant SaaS, etc.

If all your database queries have a `WHERE resourceID = 'abc'` in order to restrict your queries to the correct subset of your data with that resource identifier, then Durable Objects could potentially simplify your life. It always depends on the concrete use-case obviously, but this is the starting point to see if they can benefit you.

### Real-time collaboration

If it's not yet clear, the reason DOs are awesome for real-time collaboration, is that you need "total order of events" such that all the "actors" collaborating end up in the same final state.

#### Chat systems

Each chat channel (e.g. Lambros talking with Ben) is one DO instance, therefore all messages go through the same instance and processed sequentially.

The volume for a single channel is relatively very low, but the volume of all messages across channels is usually humongous.
This is perfect for Durable Objects, since you can have unlimited DO instances spread across the world (closer to each chat channel's members).

Imagine that the Durable object instance responsible for the chat between Lambros and Ben is in London/UK, but the instance for the chat between Paul and Jasmine is in Portland/US.

#### Online document live-editing

Each document is one DO instance, therefore all edits of the document are processed sequentially by the same DO instance and stored in the instance's durable storage.

With unlimited Durable Object instances, you essentially support unlimited number of documents.

### Multi-tenant SaaS

Imagine you are building a restaurant booking system, or any other booking system.

You need to process bookings in-order to avoid double-booking tables, and usually you do this with database transactions.

If your volume is low, then a single-server database is fine, and you should go with that. But what if you want to grow and expand your service to thousands of restaurants, or even across the world and you want to be local to each of those regions (latency, jurisdiction regulations, etc).

Durable Objects can help you. Each Durable Object instance can handle all bookings for a single restaurant, and you can have unlimited number of DO instances hence support for unlimited number of restaurants.

### CI/CD pipelines

Imagine you are building a Continuous Integration (CI) and Continuous Deployment (CD) service.

You need total ordering not only across pipeline executions, but also durable state persistence for each individual execution in case they can be paused and resumed later or just to keep track of progress and reference artifacts.

If you want to have parallel independent executions of a pipeline, each pipeline execution can be represented by a Durable Object instance that keeps track of each execution, and one instance that just keeps track of all the execution IDs and maybe coordinate them (e.g. restrict how many parallel executions you can have).

Alternatively, if you want to restrict only one execution at a time for each pipeline stage, but want to allow multiple executions to exist in different stages of the pipeline ([similar to Amazon's Pipelines](https://aws.amazon.com/builders-library/cicd-pipeline/#Multiple_inflight_releases)) you can model your pipeline as a Durable Object instance that keeps track of all the pipeline executions of the pipeline.

The actual modelling depends on your requirements, but you can see where this is going.

### So many more

I cannot enumerate every single use-case out there...

The gist is that if you can think of a nice boundary across your resources, there is a high chance for Durable Objects to be very useful to you.

In Cloudflare we use Durable Objects for a lot of the internal and external products and more are adopting them every day.

## Limitations

You can find all the limits in the [Durable Objects documentation](https://developers.cloudflare.com/durable-objects/platform/limits/), but the main things to keep in mind are:
- Throughput of each Durable Object instance ([see docs](https://developers.cloudflare.com/durable-objects/platform/limits/#how-much-work-can-a-single-durable-object-do)).
- Total storage per account (can be raised by contacting support).
- Size limits for the storage's keys and values.

Most Worker limits apply too ([see docs](https://developers.cloudflare.com/workers/platform/limits/)).

## Pricing Durable Objects vs Workers

Just pointing out that pricing for Durable Objects is different than Workers.

Workers are charged purely on CPU time ([see docs](https://developers.cloudflare.com/workers/platform/pricing/)), whereas Durable Objects are charged on number of requests and duration ([see docs](https://developers.cloudflare.com/durable-objects/platform/pricing/)).

As mentioned previously, Durable Objects can stay alive and have in-memory state, hence why the duration dimension is taken into account for pricing.

Almost every serverless compute provider is also charging by duration so it shouldn't be surprising, but something to keep in mind when comparing with Workers, famous for CPU-only pricing.

## Conclusion

Durable Objects (DO) are a super powerful tool.
When they fit a use-case, they can simplify so many things while keeping the developer experience great and operational overhead low.

If you can think of a nice boundary across your resources or users, there is a high chance that Durable Objects will be very useful to you.

**Each Durable Object instance is identified by a user-provided key, has its own throughput limits, its own durable storage, its own in-memory state, executes in single-threaded fashion, and you can influence its location if necessary.**

Oh, and BTW, there is nothing blocking you from using Durable Objects for the resources that fit that model, and another storage product (e.g. [D1 SQL database](https://developers.cloudflare.com/d1/)) for your highly relational resources.

You can find a few select [Durable Object examples on the developer docs](https://developers.cloudflare.com/durable-objects/examples/) as well.

If you have feedback about the article, or Durable Objects, feel free to reach out 😉
