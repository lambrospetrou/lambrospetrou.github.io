---
title: Serverless platforms into 2022 — AWS, Cloudflare Workers, Netlify, Vercel, Fly.io
description: "A quick comparison of available serverless platforms going into 2022."
---

I love **#serverless** platforms 🚀 I have used most of the public offerings over the years, and I always keep an eye out for new services.
In this article I explain the different types of compute, edge vs regional, and make a comparison among the most popular providers. I know there are more providers out there offering serverless products but I included the ones I personally tried. Anything else can be mapped to one of these anyway for comparison.

_Disclaimer: All data shown below is as of Jan 20, 2022._

## Compute @ Edge vs Regional

There are a few confusing terms floating around, not uncommon for our industry unfortunately, so let's try to clarify things.
One of the most important differences among the different platforms is their answer to the question **where does my code run?**

Check [Amazon CloudFront's presence map](https://aws.amazon.com/cloudfront/features/#Global_Edge_Network):

![Amazon CloudFront presence map](/articles-data/2022-01-20-serverless-platforms-2022/Cloudfront-Map.png)

Looking at the legend, and then the map, we can immediately see that the most important distinction between Edge locations and Regions is how many there are of each. We have 300+ **Edge** locations, or Points of Presence (PoP), and 13 **Regional Caches** (bigger orange circles). The Regional Caches are mostly backed by standard [AWS regions](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/).

For comparison let's look at [Cloudflare's global map](https://www.cloudflare.com/en-gb/network/) of more than 250 **edge** locations:

![Cloudflare presence map](/articles-data/2022-01-20-serverless-platforms-2022/Cloudflare-Map.png)

So, what's the main difference between an edge location, and a regional location? Well, there are a lot more edge locations, and they are more spread around the world. This means that users are more likely to be closer to an edge location rather than a regional location.

- **Compute - Edge**: When platforms say they offer edge compute, the reasonable assumption is that they run our code in all of these edge locations in their underlying CDN infrastructure.
- **Compute - Regional**: When we have the traditional regional compute it means that we decide which region will run our code, and then all users have to reach that single region.
- **Compute - Multi-regional**: We also have the middle ground where our code runs in the regional locations, but we don't explicitly specify which one. This implies that the provider will run our code in the region that is the closest to the user making the request.

Now that the terms are understood, let's see how the different platforms compare.

## The platforms

In this section I will briefly enumerate all the platforms, and what they offer.
AWS has multiple serverless products, each with different features, so I will list them separately.

### AWS Lambda - Regional

> Run code without thinking about servers or clusters

- https://aws.amazon.com/lambda/

The service that started it all in 2014! Easily the most popular serverless product, and with the most available integrations both inside the AWS ecosystem, but also with other SaaS products.
AWS Lambda over the years got many features, and at the moment it [supports many runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html).

- **Languages (natively)**: Go, Node.js, Python, Ruby, Java, C#, PowerShell
- **Languages (custom runtime)**: Any language as long as you implement the [custom runtime API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) (since 2018)
- **Containers**: Any [Docker container](https://docs.aws.amazon.com/lambda/latest/dg/lambda-images.html) implementing the [Runtime API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html), [Extensions API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html), and [Logs API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-logs-api.html) (since 2020)
- **Memory**: 128MB up to 10GB
- **Runtime**: 29s (HTTP integration with API Gateway), 15min (anything else)
- **Uploaded Bundle size**: 50MB (zipped), 250MB (unzipped), 10GB (container image)

Looking at the above features, it's quite clear that AWS Lambda can run pretty much anything now 🚀 But you should be aware of the [cold starts...](https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-1/)

### AWS Lambda@Edge - Multi-regional

> Run your code closer to your users

- https://aws.amazon.com/lambda/edge/

Lambda@Edge launched soon after Cloudflare Workers (see below) came out so many consider this a rushed response to Workers. Its goal is to run our code in the region closest to the user making the request. Therefore, despite its name containing the word **edge**, it's not an edge compute product as per our above definition. Yes, this definitely has many people fooled.

Lambda@Edge is a product that can be used only with a CloudFront distribution, and you specify which events to handle while the request flows through the CloudFront cache systems, e.g. before checking the cache, or after the origin returned a response. [Read the docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-cloudfront-trigger-events.html) for details about the different integration triggers.

- **Languages**: Node.js, Python
- **Memory**: 128MB (Viewer triggers), 10GB (Origin triggers - same as AWS Lambda)
- **Runtime**: 5s (Viewer triggers), 30s (Origin triggers)
- **Uploaded Bundle size**: 1MB (Viewer triggers), 50MB (Origin triggers)

I have used Lambda@Edge extensively while working at Amazon/AWS and it's great. The `1MB` bundle size limitation was the only issue we bumped into until we minified our JavaScript.

### Amazon CloudFront Functions - Edge

> lightweight functions in JavaScript for high-scale, latency-sensitive CDN customizations

- https://aws.amazon.com/cloudfront/features/#Edge_Computing

CloudFront Functions launched last year in 2021 as one yet another competitor to Cloudflare Workers, but yet again a limited one in my opinion.
CloudFront Functions is a proper edge compute product, since our code runs in all of CloudFront's edge locations. I do use it in my own website (the one you are reading now) and it does the job, but its runtime restrictions limit the potential use-cases, especially since you are not allowed to make any external API calls or even access a filesystem.

- **Languages**: Custom [JavaScript runtime](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html)
- **Memory**: 2MB
- **Runtime**: 5s (Viewer triggers)
- **Uploaded Bundle size**: 10KB

It's clear this is a pretty restricted environment, which to be fair is implicitly acknowledged by AWS judging by [the use-cases they list](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) as ideal for the product.

### Cloudflare Workers - Edge

> Deploy serverless code instantly across the globe to give it exceptional performance, reliability, and scale.

- https://workers.cloudflare.com/

Workers was one of the first true edge compute offerings and pushed the whole industry forward. The main differentiator is that Workers run in [V8 isolates](https://developers.cloudflare.com/workers/learning/how-workers-works) eliminating cold starts completely, and allowing near-instantaneous execution very close to users. Note that the V8 environment is not a full [Node.js](https://nodejs.org/en/) runtime which means it's not possible to run everything.

- **Languages**: JavaScript/TypeScript, WebAssembly
- **Memory**: 128MB
- **Runtime**: 50ms (Bundled Plan), 30s (Unbundled Plan - HTTP), 15min (Unbundled Plan - Cron trigger)
- **Uploaded Bundle size**: 1MB

One important feature of Cloudflare Workers is that the runtime is measured in [CPU consumption](https://developers.cloudflare.com/workers/platform/limits#cpu-runtime) for the Bundled Usage plan, meaning that external API requests ([`fetch` requests](https://developers.cloudflare.com/workers/runtime-apis/fetch)) do not count towards the limit. However, for the Unbundled Usage plan the runtime is [measured in wall-clock time](https://developers.cloudflare.com/workers/platform/limits#duration), so we are charged for the whole duration of the worker running, including external calls.

The biggest advantage of Workers over its competitors is that it's extremely nicely integrated with the rest of Cloudflare. It natively supports [accessing and updating the CDN cache](https://developers.cloudflare.com/workers/runtime-apis/cache), it provides [Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects) which are very powerful, and it has a [Key-Value store](https://developers.cloudflare.com/workers/runtime-apis/kv) built-in. 

Another recent addition is the native integration of [Workers with Cloudflare Pages](https://developers.cloudflare.com/pages/platform/functions) which enable full-stack application development completely on Cloudflare. With [Cloudflare R2 Storage](https://blog.cloudflare.com/introducing-r2-object-storage/) around the corner this is going to be a very big threat to AWS Lambda dominance.

## Netlify / Vercel - Edge + Regional

> Develop. Preview. Ship.

- https://www.netlify.com/
- https://vercel.com/

Netlify and Vercel are the most popular serverless products among the frontend community. Their focus is entirely on improving the developer experience for frontend developers, and they are doing an incredibly amazing job.
Vercel standardised the phrase **Develop. Preview. Ship.** and Netlify straight up competes with them at that.

I have been using both of them on-and-off for several years and honestly feature-wise they are identical. From my perspective the differences between them are in their satellite (or secondary) features. Vercel focuses on extending their platform's features (e.g. [Next.js Live](https://vercel.com/live)), and adding native optimisations for [Next.js](https://nextjs.org/) (their amazing React-based framework) e.g. [Image Optimization](https://vercel.com/docs/concepts/next.js/image-optimization). Netlify on the other hand provides several features that are complementary to a frontend application, like [Identity](https://docs.netlify.com/visitor-access/identity/), [Forms](https://www.netlify.com/products/forms/), [Split Testing](https://docs.netlify.com/site-deploys/split-testing) and more.

The interesting fact about these platforms is that they are built on-top of the products I went through above.

Their **serverless functions** products ([Netlify](https://docs.netlify.com/functions/overview/), [Vercel](https://vercel.com/docs/concepts/functions/serverless-functions)) are directly build on-top of AWS Lambda, and their **edge functions** are built on-top of Cloudflare Workers ([Netlify](https://docs.netlify.com/edge-handlers/overview/), [Vercel](https://vercel.com/docs/concepts/functions/edge-functions)). Weirdly though, Netlify lists their edge handlers memory limit as 256MB, whereas Cloudflare Workers tops at 128MB, so I am not sure what's going on there, if there is a special agreement between them, or if they actually run these on their own network!

So, are Netlify and Vercel the best products to use? Should everyone migrate their AWS (or other) serverless apps to them since they combine both? Well... Nope 😅

These products provide top-notch developer experience but it comes at a cost. Their serverless offerings are more limited than their native counterparts:
- Serverless functions:
  + Netlify limits: only `us-east-1` region, 1GB of memory, 10s synchronous execution
  + Vercel limits: only `IAD1` region, 1GB of memory, 5s synchronous execution (15s on Pro, 30s on Enterprise)
- Edge functions:
  + Netlify limits: 256MB of memory, 50ms runtime
  + Vercel: 1.5s runtime (after returning response it can still run up to 30s)

Some of the above limits can be lifted for their paid plans, but mostly the Enterprise ones.

[Cloudflare Pages](https://pages.cloudflare.com/) gets an honorary mention in this section since it now competes in this space by offering a seamless integration with source code repositories, and serving Jamstack websites, while at the same time having built-in integration with Cloudflare Workers.

The above limitations are why I personally still use AWS Lambda directly when I want an API, and combine it with Cloudflare Pages for the frontend. However, if your application does not need more resources than what these platforms offer, which to be fair most websites don't, then you are fine just using them and focus on your application.

## Fly.io - Multi-regional

> Fly keeps your performance up by sending users on the shortest, fastest path to where your application is running.

- https://fly.io/docs/introduction/

Fly.io is a relatively new player (launched in 2020) but it definitely attracted many people already. It currently has [20 regions](https://fly.io/docs/reference/regions/) and the selling pitch is that you specify a Docker image for your application and depending on where the user is they will spin up an instance of it to the closest region and serve the request. Very similar to how Lambda@Edge works, but incredibly more flexible!

- **Containers**: [Docker images](https://fly.io/docs/reference/builders/), [Cloud Buildpacks](https://fly.io/docs/reference/builders/#buildpacks)
- **Memory**: 256MB-2GB (shared-cpu), 2-64GB (dedicated-cpu)
- **Runtime**: No limit, pay per second
- **Uploaded Bundle size**: n/a

This is more like a traditional container product, but I included it because they do offer the multi-regional flavor, and they even have [multi-region Postgres databases](https://fly.io/docs/getting-started/multi-region-databases/) with a nice architecture. If their scaling is fast enough not to have long cold-starts then this should be a very nice middle-ground between fully edge or fully single-regional.

I haven't used Fly.io a lot but I do like its approach and based on the feedback from others I definitely plan to give it a go with one of my side projects.

Fun fact: While writing this post, [Fly.io announced free 3GB Postgres or persisted volumes](https://twitter.com/flydotio/status/1484278935726788608) in the free tier 🥳

## Conclusion

![Serverless Platforms 2022](/articles-data/2022-01-20-serverless-platforms-2022/serverless-platforms-2022.png)

The diagram above summarises the platforms we discussed. Each one has its benefits and drawbacks, but the choice we have nowadays is amazing! I am pretty sure things will continue to evolve, improve, and we will see a lot more innovation in this space.

I have my favourites, you have yours, so let's just keep on building 😉
