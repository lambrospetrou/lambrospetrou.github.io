---
title: "Building a feature flags service with Cloudflare Workers and Durable Objects"
description: "Exploit the Cloudflare Developer Platform for infinite scale."
isDraft: true
---

**Table of contents**

- [Problem definition](#problem-definition)
- [Conclusion](#conclusion)

Feature flags are one of my favourite practices in software engineering.
I [wrote a detailed article about their use-cases](https://www.lambrospetrou.com/articles/cicd-feature-flags/) and how I consider them a superpower!

In this article, we are going to build a feature flag service on-top of the Cloudflare Developer Platform, specifically [Cloudflare Workers](https://www.cloudflare.com/en-gb/developer-platform/workers/) and [Durable Objects](https://www.cloudflare.com/en-gb/developer-platform/durable-objects/).

I recently [wrote about Durable Objects](https://www.lambrospetrou.com/articles/durable-objects-cloudflare/), in my opinion the most underrated compute and storage offering by Cloudflare.
If you don't know what Durable Objects are, go read that article first, otherwise you can simply imagine them as **"Same as Workers; with durable storage that is persisted across requests"**.

## Problem definition

Before we dive into the implementation specifics, let's define first what we want to build.

A feature flag service usually boils down to a function `isEnabled(featureName: string, identifiers: Map<string, string>): boolean`.
The `featureName` denotes the feature flag we want to check, and `identifiers` denote the specific resource(s) we want the feature flag for.
The return value is simply a boolean `true` or `false`, where `true` indicates that the resource(s) specified by the collection of identifiers has the given feature flag enabled.

Examples of identifiers most often used in feature flag systems: account ID, user ID, request country/location, server host name, server region/availability-zone/datacenter, and more.

Some feature flag services support more complex use-cases like [A/B Testing](https://www.lambrospetrou.com/articles/cicd-feature-flags/#ab-testing-and-experiments), but to keep the scope of the article small, we are only going to focus on the above use-case of enabling and disabling features.

### Technical requirements

I will just define some requirements for the service, just to have something concrete to model our system around, but these can be as you like in your own systems.

1. Feature names are strings up to 1,000 alphanumeric characters.
2. Each identifier is a string up to 100 alphanumeric characters.
3. The service should be accessible from anywhere in the world over an API.
4. Latency of the service should be low.
    - Our Javascript UI code running in users' browsers anywhere in the world is using this service.
    - Our server-side code running in our datacenters/cloud is using this service.
5. We have users spread around the world, US, Europe, Australia, etc.
6. We read feature flags 100x more often than writing or updating them
7. We support at least 10,000 requests per second, and a peak of 500 requests per second per feature flag.
8. We want at most 15 seconds of latency for updates to propagate everywhere. Useful for immediate disabling of features (i.e. [kill-switches](https://www.lambrospetrou.com/articles/cicd-feature-flags/#kill-switch)).

## Examples of feature flags

TODO

## Traditional system design

### Option 1 - Object Storage

In my [feature flags article](https://www.lambrospetrou.com/articles/cicd-feature-flags/#dynamic-configuration) I describe one of the most common, and to be fair, simplest implementations of a feature flag service.

I love this solution because it's extremely simple, but battle-tested and robust. We used this exact approach for several services in AWS.
You configure all your feature flags in a source code repository, and every time you push a new change the whole repository is stored on a cloud object storage system like [Amazon S3](https://aws.amazon.com/s3/) or [Cloudflare R2](https://www.cloudflare.com/en-gb/developer-platform/r2/).
Then, all the clients periodically fetch those files locally and update their internal states.

DIAGRAM TODO

**Drawbacks**

- Clients need to download and parse all the feature flags set, or at least everything that could be queried by the local applications on the same machine.
- Works only for server-side applications, or other long-running services.
- Updates are periodic usually every 1-5 minutes to reduce costs.

### Option 2 - Centralized database application

Another very common approach is to have a traditional server application in one location that holds all the feature flags, and exposes an API any client can use.

DIAGRAM TODO

**Drawbacks**

- Latency accessing the service from around the world will be slow, 100ms+ depending on the region of the users.
- Everyone is connecting to the same application, so availability and performance of the service will hurt as you scale up usage.

### Option 3 - CDN caching

Same as Option 2, but add a global CDN in front of it with 15 seconds of caching.
All the identifiers have to be part of the cache key to avoid incorrect results.

DIAGRAM TODO

**Drawbacks**

- Depending on the identifiers we use caching can be useless for a long tail of feature flags. For example, if most of the identifier combinations are not popular enough to have cache HITs, then all of them will have the same drawbacks as in Option 2.

### Option 4 - Application replicas

The next logical evolution of the service is to replicate the feature flag database, or even the whole appication, in more than one locations.

Imagine you have the same application running in US, in Europe, and in Australia.
These applications can use database replication (or something like [Amazon DynamoDB Global Tables](https://aws.amazon.com/dynamodb/global-tables/)), or deploy multiple independent instances of the application.

All traffic will be routed to the application closest to it.
We will need a new routing layer at the edge (CDN) so that all requests go to the closest application servers.

This extra layer can be **Cloudflare Workers**, that runs on every single Cloudflare location at the edge, with zero coldstarts, and can do the routing of the requests based on user's location.

DIAGRAM TODO

**Drawbacks**

- Consistency across these systems will be complex, or feature flags will need to be sharded in a way that every single query will not need to access another instance's data.
- Better latencies than previous options, but still can be slow for many locations. Otherwise, the cost will be high by deploying many of these server applications.
- Management and deployment of all the instances of the application becomes heavier and more complex.
- Each indepedent instance of the application needs to scale to handle all the requests of its "region".

### Option 5 - Database replicas

Similar to Option 4, but instead of having multiple application instances, we have a central application and multiple database replicas spread around the world.

There is only one application handling all writes, therefore consistency is trivial, and it replicates its updates across multiple other locations.
To satisfy our requirements, the replication delay cannot be more than 15 seconds.

Assuming that we have a smart edge layer, like **Cloudflare Workers**, we can directly access the closest database replica.
Therefore, all queries will be able to query the whole dataset.

DIAGRAM TODO

**Drawbacks**

- Better latencies than previous options, but still can be slow for many locations depending on number of replica locations.
- Management and deployment of all the datastore replicas is complex and costly.
- Each replica datastore needs to scale to handle all the requests of its "region".

### Option 6 - Workers KV

If you search for feature flag implementations on-top of Cloudflare's Developer Platform, most of the solutions are using [Workers KV](https://www.cloudflare.com/en-gb/developer-platform/workers-kv/) as their database.

Workers KV is Cloudflare's low latency key-value datastore with global caching, and completely serverless.
There is nothing to manage, and you just write data into your database.

The internal architecture of Workers KV is very similar (at high level) to Option 5 above (read more in ["How KV works"](https://developers.cloudflare.com/kv/concepts/how-kv-works/)).

There are a few central datastores across the world replicating data between them, and the Workers at the edge access the closest one to the user's requests.
Workers KV by default will cache the most read items in order to achieve very low latencies.

**Drawbacks**

- Propagation of updates/writes across all locations can take up to 60 seconds.
- Caching HIT only works for very popular items, therefore many queries will have to go to one of the central datastores.

### Option N

There are infinite number of iterations to do to improve the system's architecture, but we already covered most of the approaches implemented in practice.

The rest of the article will showcase how you can use the Cloudflare Developer Platform to implement an even better system, with much less overhead and complexity!

## What if

Option 5 above is really good, almost great, but its drawbacks are important:
- Better latencies than previous options, but still can be slow for many locations depending on number of replica locations.
- Management and deployment of all the datastore replicas is complex and costly.

What if we could have as many copies of our datastore replicas without most of the complexity, **hence removing the second drawback above**.

Now that we removed the complexity of maintaining the datastore replicas, could we add more?
Instead of having 2-3 replicas, what if we had 10?

By having more replicas, we can get the data closer to more users requesting them, **hence reducing the latencies and removing the first drawback**.

We need to keep in mind though that the more replicas we have, the more updates we need to replicate across all of them, and the more complex it is to maintain them.
This is the main reason most common implementations of Options 4 and 5 above only maintain a small amount of replicas or independent instances of the whole application.

## Durable Objects

> Durable Objects (DO) are built ontop of Cloudflare Workers. Each DO instance has its own durable (persisted across requests) key-value storage, its own in-memory state, executes in single-threaded fashion, and you can programmatically create unlimited of them, each in its own location.
>
> _From my [article describing Durable Objects](https://www.lambrospetrou.com/articles/durable-objects-cloudflare/)_.

**Durable Objects make the "what ifs" reality.**

You can have unlimited number of Durable Object instances without any maintenance overhead or significantly extra costs ([see docs](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-from-a-worker/#derive-ids-from-names))!

You can place Durable Object instances in specific locations, among all of the supported regions ([see docs](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint))!

Each Durable Object supports the same code as any Worker, with the additional superpower that it has locally persistent durable storage.
This means that you can keep state across all requests handled by that object instance, and you can even use in-memory state to significantly speed up certain operations that can be cached in memory.

Finally, combining Workers that run at the edge (every Cloudflare location) with Durable Objects running close to the Workers, you have an amazing platform to spread your data and load across the world.

### Unlimited sharding

The fact that you can control the location of a Durable Object instance, and that you can create as many as you want, with exactly zero extra effort or cost, enables some new system design approaches.

In traditional sharding approaches, you are limited in how many shards you create due to the high cost of each additional shard.

Durable Objects allow you to shard infinitely with tiny shards of a few bytes, a few hundred shards of bigger capacity, and everything in-between.

For example, in our feature flag service, we could have each Durable Object (DO) own any of the following aspects of our data.
- Each DO instance owns a specific feature flag name (all its identifiers).
- Each DO instance owns a specific feature flag name and a subset of the identifiers.
- Each DO instance handles all feature flag requests originated from a geographical area (e.g. city level).

All of the above approaches have their own tradeoffs, how you replicate data among DO instances if necessary, how you coordinate reads and writes, how many of them do you need, etc.

The criteria we use to decide the sharding dimensions are:
- Geographical proximity of the DO instance handling a request
- Throughput we need to support per DO instance (limit of 1000 RPS per DO instance)

### Option - DO 1

We have one Durable Object instance for each single feature flag and all of its identifiers.

This is similar to Option 1 above, albeit easier to maintain.

### Option - DO 2

We have one primary Durable Object instance for each single feature flag and all of its identifiers that processes all writes and updates of that feature flag.

We also have one replica Durable Object instance placed in every single of the other locations Durable Objects are available.

**Write flow**

1. Edge worker receives the write request.
2. Write request is sent to the nearest replica DO instance.
3. Replica DO instance sends the write request to the primary DO instance.
4. Primary DO instance applies the write to its local durable storage, caches in-memory, and returns its latest value.
5. Replica DO instance applies the latest value locally.
6. Primary DO instance schedules an alarm ([see docs](https://developers.cloudflare.com/durable-objects/api/alarms/)) a few seconds after the write to broadcast the latest value to all replicas.
7. Primary DO instance wakes from the alarm and sends in parallel a request to all replicas. The replication across all replicas can also be done using a Gossip protocol (link to MARTIN KLEPMANNS youtube talk with this).

The gossip protocol or broadcast is not across thousands of nodes, it's across a few tens, so it should be relatively fast and efficient.
Also, since we sharded our data a lot, the expectation (or assumption really) is that only a small minority of the features flags will have often updates that would need to run this replication flow.

**Read flow**

1. Edge worker receives read request.
2. Read request is sent to the nearest replica DO instance.
3. Replica DO instance returns its latest local value.
4. Edge Worker uses the CDN Cache to cache the value for a few seconds.

**Drawbacks**

If a region is partitioned from the rest of Cloudflare network, the replication protocol might not reach the replica DO instances in that region, hence it will be returning stale values.

Since all the reads will go to the same DO instance it's always going to be returning the latest value it knows, and it will also respect read after writes for writes originating from that region.

### Option - DO 3

We have one primary Durable Object instance for each single feature flag and the main identifier combination that processes all writes and updates of that combination.
For example, we have one DO instance for each feature flag + account ID combination.

We also have one replica Durable Object instance placed in every single of the other locations Durable Objects are available.

The flows are similar to Option - DO 2 but with extra sharding based on the account ID.

This allows us to scale out to much higher throughput, especially when we have accounts doing much more writes compared to other accounts, which is pretty much the case for every single SaaS out there.

#### Hot partitions

It's not uncommon for a whale customer to saturate a system's throughput limits and causing issues.

With the design of sharding at the feature flag + account ID dimension, we have a limit of 1000 requests per second since a single DO instance will own each combination.

If we have an account that wants to be making more than 1k/s writes, which is **extremely weird** if you ask me, then we would need to further shard that DO instance.

A common approach used in databases that we can borrow here is to "split" the combination into N instances, and we pick one of them to handle each write (usually using some hashing technique or randomly if possible), but on every read we have to query all N instances to get the full value.

Or we split by another identifier to further scale out, but this won't always be possible.

Going deep into more complex scaling approaches will be addressed in a future article.

### Durable Objects system design

DIAGRAM TODO

```
Worker
-> Edge Cache
-> DO replica
|
|
-> DO primary
```



