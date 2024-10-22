---
title: "Building a global TiddlyWiki hosting platform with Cloudflare Durable Objects and Workers — Tiddlyflare"
description: "A hosting platform for TiddlyWikis of any size, anywhere in the world."
---

**Table of contents**

- [Context](#context)
    - [TiddlyWiki](#tiddlywiki)
    - [Durable Objects](#durable-objects)
- [Requirements](#requirements)
- [High-level architecture](#high-level-architecture)
- [CreateWiki data flow](#create-wiki-data-flow)
- [GetWiki data flow](#get-wiki-data-flow)
- [Location hints](#location-hints)
- [OK. So what.](#ok-so-what)
- [Mindset shift](#mindset-shift)
- [Conclusion](#conclusion)


[Tiddlyflare](https://tiddly.lambros.dev) is an open source [TiddlyWiki](https://tiddlywiki.com/) hosting platform built with Cloudflare's SQLite [Durable Objects](https://developers.cloudflare.com/durable-objects/) and [Workers](https://developers.cloudflare.com/workers/).

It supports multiple users, each with their own collection of TiddlyWikis, and each user's data is automatically placed in a Cloudflare region close to them.
Each TiddlyWiki hosted by Tiddlyflare can be up to 1GB (limits will be raised to 10GB soon).

This article goes into the architecture behind Tiddlyflare, and showcases the power and flexibility you get from Durable Objects (DO), and the Workers platform overall, without you really doing much more work.

You can find the actual source code for Tiddlyflare implementing everything described in this article at <https://github.com/lambrospetrou/tiddlyflare>. It works.

## Context

Let's introduce some useful background context.

### TiddlyWiki

> _TiddlyWiki is a unique non-linear notebook for capturing, organising and sharing complex information_
> — `tiddlywiki.com`

TiddlyWiki is an amazing open-source tool created more than a decade ago by [Jeremy Ruston](https://github.com/Jermolene), and as the quote above mentions can be used for note-taking, information and knowledge organization, and much more.

For the purposes of this article, you only need to know that by default **each wiki stores all of its data in a single HTML file**. 😅

When you load that HTML file into a browser you get a UI, and the data is embedded into the HTML file itself.

There are a million ways to persist your changes ([see Saving wiki section](https://tiddlywiki.com/#Saving) for supported plugins), but in this article we will focus on the **PutSaver** saving mode.

#### Automatically saving changes with PutSaver

We will build a platform to host TiddlyWikis. While editing our wikis we want the changes to be automatically saved remotely on the platform.

Conveniently, TiddlyWiki has a very basic but super flexible API interface named **PutSaver** that we will implement ([see PutSaver code](https://github.com/TiddlyWiki/TiddlyWiki5/blob/646f5ae7cf2a46ccd298685af3228cfd14760e25/core/modules/savers/put.js#L46)).

PutSaver is very simple.
Once the TiddlyWiki HTML file is loaded in a browser, it sends an `OPTIONS` request to the current URL location, and based on the response it decides if PutSaver is supported.

If the response contains a header named `dav` with any value, and a success response status code (`200 >= status < 300`), then we are good to go.

From that point on, any changes you make to your wiki are automatically propagated with a `PUT` request to the current URL location and the request body is the whole HTML file.
Not only the changes, but the whole file!

We don't care if this is efficient or not, that's how PutSaver works, and that's what we will use.

### Durable Objects

I already wrote an [article introducing Durable Objects](https://www.lambrospetrou.com/articles/durable-objects-cloudflare/) a few weeks ago, so keeping this short.

> Durable Objects (DO) are built ontop of Cloudflare Workers (edge compute). Each DO instance has its own durable storage persisted across requests, in-memory state, executes in single-threaded fashion, and you decide its location. You can create millions of them!

I said it before, and saying it again. Durable Objects is the most underrated compute and storage product by Cloudflare.

It's so different than other platforms that it's not easy to realize its power initially.
Once you get it though, it's a game changer! 🤯

## Requirements

Let's get started with the requirements of our platform.

1. We want to support multiple users, each with their own collection of TiddlyWikis, and the usual CRUD functionality (create/read/update/delete).
2. Each user's data should be isolated from each other, i.e. user A only has access to their own TiddlyWikis.
3. Each TiddlyWiki created on the platform gets its own URL, and visiting that URL responds with the latest version of the wiki HTML file.
4. The PutSaver saving mechanism should be supported for all wikis by default.
5. We want all user data to be close to the user's location. A user in Portland has their data near Portland, and a user in London has their data close to London.
6. Support scale (intentionally leaving this open-ended to your imagination limits).

Requirement 5 is where things get hairy, really fast, with traditional hosting/cloud/infrastructure platforms.

## High-level architecture

There are many approaches to implement this and satisfy the requirements. Some are complex, others are complicated, and others are just pain in the ass.

The following design exploits and showcases the goodies of Durable Objects, satisfying all the requirements, without the code getting complex or our mental reasoning having trouble.

<figure>
  <img src="/articles-data/2024-10-22-tiddlyflare/tiddlyflare-arch.png" title="Tiddlyflare high level architecture diagram" alt="Tiddlyflare high level architecture diagram"/>
  <figcaption>Tiddlyflare high-level architecture diagram.</figcaption>
</figure>

Let's break down the above diagram.

- **User 1**
    - First user is in Portland, US.
- **User 2**
    - Second user is in London, UK.
- **Traffic to Cloudflare network (B)**
    - The traffic from all users is routed to the nearest Cloudflare datacenter using [Anycast](https://www.cloudflare.com/en-gb/learning/cdn/glossary/anycast-network/).
- **Workers fleet (B)**
    - The Workers are stateless, and each user request goes to any available machine inside a datacenter close to the user request's location. Not necessarily the same machine each time.
- **Durable Object with ID `TENANT_1` (C)**
    - A Durable Object (DO) instance is created the first time a user attempts to create a wiki, placed in a location near the user's request, under the [Durable Object Namespace](https://developers.cloudflare.com/durable-objects/api/namespace/) `TENANT`.
    - `TENANT_1` is the specific DO instance created for User 1, and is placed inside a datacenter near the Portland region, close to User 1 location.
    - The tenant Durable Objects hold data about the user itself, and a metadata record for each wiki created for that user.
    - The tenant Durable Object does NOT manage any of the wiki data (i.e. the wiki HTML).
- **Durable Objects with IDs `WIKI_1` and `WIKI_2` (D)**
    - A Durable Object (DO) instance is created when a wiki is created, placed in a location near the `TENANT_1` DO location, under the namespace `WIKI`.
    - `WIKI_1` and `WIKI_2` are the specific DO instances created for User 1's wikis.
    - We are going to understand later why the `TENANT_1` location is used here instead of the User 1's location.
- **Durable Object with ID `TENANT_2` (E)**
    - `TENANT_2` is the specific DO instance created for User 2 information, and is placed inside a datacenter near the London region, close to User 2 location.
- **Durable Object with ID `WIKI_3` (F)**
    - `WIKI_3` is the DO instance created for User 2's wiki, near the location of `TENANT_2` Durable Object instance.
- **Cloudflare network (N)**
    - Each Worker and Durable Object instance can communicate with other instances across Cloudflare's network without going to the public internet (most of the time).
    - This can be used to efficiently communicate between DO instances, or other Cloudflare services.

## CreateWiki data flow

Let's now explore a concrete example of how data flows through the above diagram when User 1 creates their first wiki.

1. User 1 opens Tiddlyflare (e.g. on [tiddly.lambros.dev](https://tiddle.lambros.dev)), logs in, and clicks the button to create a TiddlyWiki.
2. The `POST` request triggered flows to the nearest Workers fleet within a datacenter in Portland.
3. The Worker code attempts to create a [Durable Object Stub](https://developers.cloudflare.com/durable-objects/api/stub/) for User 1's tenant ID.
    - Since this is the first time we attempt that, there is no Durable Object instance with that ID, therefore the platform will create one in the closest datacenter with Durable Object support, often in the same region.
    - The Worker code doesn't need to check anything to see if a `TENANT` DO already exists and worry about all that. When you create a reference to the DO you want to use, if it doesn't already exist it gets created, and then you just get routed to it.
    - Reference code to get access a DO instance: `const doStub = env.TENANT.idFromName(tenantId).get();`
    - The above line will return a [Durable Object Stub](https://developers.cloudflare.com/durable-objects/api/stub/) which allows us to call methods on the DO instance directly.
    - This stub can reference a DO instance in the same datacenter, on the same machine, or in the other side of the world.
4. Now that the `TENANT_1` DO stub is created, we call `doStub.createWiki(...)` to create the first TiddlyWiki.
5. The Durable Object `TENANT_1` now receives the request, initiates its local SQLite storage with the appropriate SQL tables for the user information (remember-this is the first time the user did anything), and subsequently attempts to create the Durable Object that will manage the wiki's data.
6. Similar to step 3, we now attempt to get a stub on the wiki DO `WIKI_1`.
    - Generate a random ID for the wiki (i.e. `WIKI_1`): `const doId = env.WIKI.newUniqueId();`
    - Get the DO stub: `const wikiStub = await env.WIKI.get(doId);`
    - Create the wiki: `await wikiStub.create(tenantId, wikiId, name, wikiType);`
    - The `WIKI_1` DO instance is created near the `TENANT_1` location because that's the origin of the request to the `WIKI_1` DO instance.
7. The `WIKI_1` DO instance initializes its own local SQLite database with the right tables to store wiki data, and stores the default TiddlyWiki HTML file.
8. The `TENANT_1` DO instance receives the successful response from `WIKI_1`, writes in its own SQLite database that `WIKI_1` was created successfully, and returns the information about the newly created wiki back to User 1.
    - The URL of a wiki includes the `WIKI_1` ID, therefore just having the URL is enough to be able to reference the `WIKI_1` DO instance without having to access `TENANT_1` at all.
    - Alternatively, if you want to expose "names" instead of IDs through URLs, you can use the `idFromName(name)` function to create your DO ID ([see docs](https://developers.cloudflare.com/durable-objects/api/namespace/#idfromname)).

_Are you starting to see the magic?_ 👁️

## GetWiki data flow

We have a wiki created now so let's see the much simpler wiki data flow now.

1. User 1 opens the Tiddlyflare URL returned by the creation flow.
2. The `GET` request flows to the nearest Workers fleet within a datacenter in Portland.
3. This time the Workers code attempts to create a Durable Object Stub straight to `WIKI_1`, and bypasses the `TENANT_1` DO, since the URL encodes the DO instance ID.
    - Reference the wiki DO instance: `const wikiStub = env.WIKI.idFromString(extractWikiId(requestUrl)).get();`
    - As before, `WIKI_1` is probably in the same region as `TENANT_1` or even same datacenter.
4. The worker now calls the DO stub to return the wiki content.
    - Code: `return wikiStub.getFileSrc(wikiId);`
5. The `WIKI_1` DO instance will wake up, if not already running, read from its local SQLite database the contents of the wiki HTML file, and stream it back to the Worker.
6. The Worker simply forwards the stream of the DO response back to User 1, without any intermediate buffering for no added overhead.

> In summary, all GET requests for a wiki flow through the nearest worker to the user location, they then get routed to the corresponding `WIKI` Durable Object instance holding that wiki's data (could be on the other side of the world), and the content is streamed back to the user.

That's it.

### User 2 accessing User 1 wiki

Can you guess what the read flow looks like for User 2 trying to read `WIKI_1` from User 1? For simplicity let's assume all wikis are publicly accessible to anyone with the URL at hand (in reality we have actual auth).

Go ahead and try to see which step of the previous section would be different.

OK.

The differences are steps 2 and 3.

The request from User 2 will go to the Workers fleet nearby User 2's location, somewhere in London.

The `WIKI_1` Durable Object instance doesn't move after creation, therefore in step 3 the Worker will create a `WIKI_1` DO stub that will reach out to the Portland region to access the `WIKI_1` DO instance, and then continue with the wiki reading as usual.

## Location hints

There was a subtle difference between **step 3** and **step 6** in the creation flow (User 1).

In step 3, the `TENANT_1` Durable Object (DO) instance is created in the nearest datacenter to the user location. Whereas, in step 6, the `WIKI_1` Durable Object instance is created in the nearest datacenter to the `TENANT_1` DO instance's location.

In general, the location considered when creating a Durable Object instance is the location of the running code that attempts to create the Durable Object Stub.

In step 3, the stub creator is the Worker code running closest to the user, whereas in step 6 it's the code running inside the `TENANT_1` DO instance.

In this specific example, both Durable Object instances are going to end up in the same region since they are all close by, maybe even the same datacenter/machine, but in other scenarios this might be different. See the example where User 2 attempts to access `WIKI_1`.

In cases where you want to influence the location of a Durable Object instance, ignoring the location of the stub creator, you can use [Location Hints](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint) and provide explicitly the region you want to place the Durable Object instance.

```javascript
let durableObjectStub = OBJECT_NAMESPACE.get(id, { locationHint: "eeur" });

// Supported locations as of 2024-Oct-22
wnam    Western North America
enam    Eastern North America
sam     South America
weur    Western Europe
eeur    Eastern Europe
apac    Asia-Pacific
oc      Oceania
afr     Africa
me      Middle East
```

👉🏼 _Tip:_ <https://where.durableobjects.live> is an amazing little website showing all the Cloudflare locations with Durable Object support.

## OK. So what.

You might be wondering, apart from the fact that we used Cloudflare proprietary technology, **why this, and not use a VPS, or AWS Lambda, or anything else really.**

This is why I love Durable Objects and what made the Workers platform really click for me.

1. You are not tied down to a single location. It's _TRIVIAL_ to put data in any of the Cloudflare regions supporting Durable Objects. **Create a Stub to the Durable Object you want, in the location you want, and get to work.**
    - Imagine having to write a Cloudformation stack to deploy across 10+ regions, and communicate within those regions from your application. All the configuration needed, managing all those regional endpoints. My god! 🤬
    - For anyone saying skill issue right now, I worked at AWS. I have been using AWS for almost a decade. I have implemented CI/CD pipelines to deploy across all its regions (with AWS SAM, AWS CDK, Terraform).
    - The difference is night and day. It doesn't even come close!

2. Scale to hundreds, thousands, hundreds of millions of Durable Object instances.
    - A Durable Object is a mini server with local, durable, actual disk storage (10GB).
    - With just a name or ID, you summon a tiny server instantly at the location you want.
    - No other platform allows you to horizontally scale so trivially. Not at this scale.
    - Fly.io is in my opinion the only other platform that has a nice UX doing similar kind of horizontal scaling with their Machines API offering. However, even in that case, managing the exact location of each instance, creating and tearing them down instantly, referencing them by a constant name/ID throughout the whole lifetime of your application (e.g. across blue/green deployments), and doing all of that transparently within my code without a lot of boilerplate, is not as seamless as just creating a Durable Object Stub.

3. The Cloudflare Developer Platform.
    - I only used Workers and Durable Objects for the whole Tiddlyflare product.
    - There is so much you can do within the platform, and everything integrates with Workers through Bindings so nicely (and will get even more seamless).
    - Workers KV, R2, Workers AI, Cache API, Rate Limiters, upcoming Containers, and so much more.
    - Example: Adding a global cache to Tiddlyflare is simply `env.KV.put(wikiId, src)`. This will now allow fast reads from any Worker processing requests for that `wikiId`, without having to even reach the DO instance. 1 line!

```javascript
env.WIKI.get(extractDOID(wikiUrl)).deleteWiki(wikiId);
```

That's all it takes. 🚀

## Mindset shift

Having said all that, I want to point out an adoption issue with a platform like Workers and Durable Objects.
We are transparent grown up adults, after all.

Durable Objects have been public for several years now, but most developers have no clue what they are, and what they can do.

That's because it's a radically different **combination of compute and storage infrastructure product** compared to existing platforms.

I [mentioned before](https://www.lambrospetrou.com/articles/durable-objects-cloudflare/#durable-objects-and-the-actor-model) that someone familiar with any Actor programming model (Elrang, Elixir, Akka) will **feel right at home** with Durable Objects.

> It's the Actor model with infinite scale built natively into the global Cloudflare network itself.

In the end, this boils down to having to think about the main entities of your application as separate "things" that communicate with each other.

Each entity has their own memory, their own local storage, and their own lifecycle. In our example above, we have two main entities, the tenant (user information), and the wikis (versions of HTML content).

At the application level we have 1 `TENANT` instance per user, and unlimited amount of `WIKI` instances per user.

You could model all the wikis to be managed by a single Durable Object instance, or further merging the two and only having one Durable Object instance for each user with all their information including wiki content.

The problem with that design is that all requests and all operations for a user, including all the operations for all of their wikis, would be handled by a single Durable Object instance. What if a single wiki gets DDoSed and then blocks all others? What if the machine hosting that single Durable Object instance goes down? What if...?

Durable Objects are a very, very powerful programming model. However, a single Durable Object instance is a tiny server of 128GB memory and 10GB disk space. There is only so much it can do for you and requests it can handle ([up to 1 thousand per second](https://developers.cloudflare.com/durable-objects/platform/limits/#how-much-work-can-a-single-durable-object-do)).

I previously described a bunch of other [example cases and how Durable Objects can influence their architecture](https://www.lambrospetrou.com/articles/durable-objects-cloudflare/#durable-objects-use-cases).

In summary, the main hurdle of adopting the Workers platform is that you need to start designing your applications with this isolation in mind.

> What if every core entity in your application had its own server?

That's Durable Objects.

## Conclusion

You made it. Awesome. Thank you. 🙏🏻

I hope you now know what Durable Objects are, understand why they are powerful.

If you want to use them in your applications, and have more questions, please, please reach out.
If you have feedback to improve the platform, please reach out.
