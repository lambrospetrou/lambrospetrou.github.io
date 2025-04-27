---
title: "Cloudflare Durable Objects are Virtual Objects"
description: "How to think about Cloudflare Durable Objects as Virtual Objects and the mindset shift it brings."
---

I have been working a lot with [Durable Objects](https://developers.cloudflare.com/durable-objects/what-are-durable-objects/) as part of my day job at Cloudflare and have been answering questions on the [`#durable-objects` Discord channel](https://discord.com/channels/595317990191398933/773219443911819284) on a daily basis for several months now.

One of the most common things people have trouble wrapping their head around is how to manage and handle the lifecycle of Durable Objects.

They want to do something when a Durable Object (DO) is "created", when it's "destroyed", when it's "hibernating", when it's "evicted from memory", and any variation you can imagine.

The short answer is "you do not do that".

You do not create a Durable Object. You do not destroy a Durable Object. **You just use a Durable Object.**

Let's explore in detail.

## Virtual Objects or Actors

For the rest of this article, "Object" and "Actor" is used interchangeably.

Durable Objects nicely fit into the [Actor programming model](https://developers.cloudflare.com/durable-objects/what-are-durable-objects/#actor-programming-model), built natively into the Cloudflare global network infrastructure.
There are several Actor programming libraries (Akka, Microsoft Orleans) and languages (Erlang, Elixir).

My most favourite description of **Virtual Actors** is from the Microsoft Orleans publication ["Orleans: Distributed Virtual Actors for Programmability and Scalability"](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/Orleans-MSR-TR-2014-41.pdf) back in 2014.

> Actors are the basic building blocks of Orleans applications and are the units of isolation and distribution.
> Every actor has a unique identity, composed of its type and primary key (a 128-bit GUID).
> An actor encapsulates behavior and mutable state, like any object. Its state can be stored using a built-in persistence facility.
> Actors are isolated, that is, they do not share memory. Thus, two actors can interact only by sending messages.

Every sentence from the Orleans Actors description applies to Durable Objects as well, although Durable Object IDs are 32 bytes.

The same section continues to elaborate on the key facets of a Virtual Actor.

### 1. Perpetual existence

> **Perpetual existence:** actors are purely logical entities that always exist, virtually. An actor cannot be explicitly created or destroyed and its virtual existence is unaffected by the failure of a server that executes it. Since actors always exist, they are always addressable.

Durable Objects are the same. You don't create them. You don't destroy them.

You generate a [Durable Object ID](https://developers.cloudflare.com/durable-objects/api/id/) and address the corresponding Durable Object.

### 2. Automatic instantiation

> **Automatic instantiation:** Orleans’ runtime automatically creates in-memory instances of an actor called activations. At any point in time an actor may have zero or more activations. An actor will not be instantiated if there are no requests pending for it.

Durable Objects are an infrastructure primitive, so in constrast to Orleans in-memory instances, they are running on a server within Cloudflare's global infrastructure with attached durable storage for persistence.

Similarly to Orleans though, a single Durable Object can be active and consuming resources on a Cloudflare server, or inactive and consuming zero resources.

As long as there are requests routed to the Durable Object it will be alive and active somewhere.
Once requests stop and enough time passes, the Durable Object will be evicted from memory and eventually removed from its host server.

Your user code **should not care about this**.

When a request routes to a Durable Object, Cloudflare will prepare its durable storage and initialize the Object on a server ready to accept incoming requests.
All of this happens transparently.

### 3. Location transparency

> **Location transparency:** an actor may be instantiated in different locations at different times [...].

Durable Objects by default are created close to the location of the incoming request.
Optionally, you can provide a [regional location hint](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint) to influence where the Durable Object will be created.

Having said that, the user code should not care exactly at which location the DO is created.
It can be on `server-a` at time 10:00, and on `server-b` at time 22:00, where `server-a` is in a different city or country even from `server-b`.

Once again, Cloudflare will make sure the Durable Object will be running on a healthy server somewhere close to the user or within the region specified.
Where that is exactly, can, and will change over time.

## How to think about it

It's understandable that many folks have trouble internalizing the above properties.
The traditional way of doing things in programming languages is to "create and destruct" class objects of sorts, and at the infrastructure level we create and delete server instances.

Fully embracing the "Virtual Object or Actor" paradigm really unlocks the power of these primitives.

My guidelines are:

- On "activation time" (Durable Object class constructor) read the storage and accordingly do any in-memory initialization needed.
- Use explicit actions to do your business logic, and if not possible, use the [Alarms API](https://developers.cloudflare.com/durable-objects/api/alarms/) to schedule work to be done in the future.

Let's explore some common use-cases.

### Access a Durable Object

1. Create the Durable Object ID ([see docs](https://developers.cloudflare.com/durable-objects/api/id/)).
2. Get a stub to the Durable Object ([see docs](https://developers.cloudflare.com/durable-objects/api/stub/)). Keep in mind that creating a stub does not yet attempt to reach out to the addressable Durable Object.
3. Invoke an operation on the Durable Object stub.

The last step is what will actually start the whole flow of figuring out where the Durable Object should be activated, which server should handle the request, send the request there, run the invoked operation, and then return the response back to the caller.

Example from my [Tiddlyflare project](https://github.com/lambrospetrou/tiddlyflare/blob/main/src/durable-objects.ts#L555C1-L560C2):

```typescript
export async function routeListWikis(env: CfEnv, tenantId: string): Promise<ApiListWikisResponse> {
	let id: DurableObjectId = env.TENANT.idFromName(tenantId);
	let tenantStub = env.TENANT.get(id);
	return tenantStub.list();
}
```

Notice that all the 3 properties explained in the previous section apply.

We always just use the Durable Object regardless if it's the first time it's accessed or not, we don't create it explicitly, and we don't care about where it's going to be instantiated.

We just use it.

### Initialize state only once

Say you want to store some information in your Durable Object durable storage only once, and have that in-memory whenever the DO is active for fast access.

Example from my [Tiddlyflare project](https://github.com/lambrospetrou/tiddlyflare/blob/2f6cd98eab2d77f8319cca21922dea3a8ca41d9a/src/durable-objects.ts#L190-L214):

```typescript
export class WikiDO extends DurableObject {
	env: CfEnv;
	sql: SqlStorage;

	wikiId: string = '';
	tenantId: string = '';

	constructor(ctx: DurableObjectState, env: CfEnv) {
		super(ctx, env);
		this.sql = ctx.storage.sql;
        // ...
		const tableExists = this.sql.exec("SELECT name FROM sqlite_master WHERE name = 'wiki_info';").toArray().length > 0;
		if (tableExists) {
			const { tenantId, wikiId } = this.sql
				.exec<{ tenantId: string; wikiId: string }>('SELECT tenantId, wikiId FROM wiki_info LIMIT 1')
				.one();
			this.tenantId = tenantId;
			this.wikiId = wikiId;
		}
	}
```

In the above snippet, I check if a table exists, and if it exists I read the `tenantId` and `wikiId` values and store them in-memory.

This only covers the reading part, though, and the writing is done inside the `create(...)` action ([see code](https://github.com/lambrospetrou/tiddlyflare/blob/2f6cd98eab2d77f8319cca21922dea3a8ca41d9a/src/durable-objects.ts#L216)).

In most applications, there is some specific operation (like `create(...)`) that receives the needed information and writes it to storage.

### Delete all storage after inactivity

Another common use-case is "deleting a Durable Object" after its expected usage is over to avoid paying for storage that is not needed anymore.

If the deletion is tied to a specific operation, then you just invoke the [`storage.deleteAll()` API](https://developers.cloudflare.com/durable-objects/api/storage-api/#deleteall) on the Durable Object storage at the end of that operation and all is good.

The nuanced scenario is when the deletion of storage is tied with the "destruction" of the Durable Object, whatever that means.
But, as we said Durable Objects are never deleted, so what do we do?

The solution to this is the [Alarms API](https://developers.cloudflare.com/durable-objects/api/alarms/).

While processing requests you can set a date in the future to execute the alarm handler, and do the cleanup in the alarm handler.
Every new request postpones the alarm and pushes the cleanup forward (you can use in-memory debouncing to avoid bursts of writes if that's a concern).

## Conclusion

Durable Objects are Virtual Objects.

They are not explicitly created or destroyed.

They are always uniquely globally addressable.

They are activated and deactivated automatically within the Cloudflare global infrastructure on-demand to handle requests.

You just use them.
