---
title: Battle of the Jamstack platforms — Netlify, Vercel, AWS
description: A quick overview of three Jamstack platforms, Netlify, Vercel (formerly Zeit Now), and AWS.
---

## Overview

If you [follow me](https://twitter.com/LambrosPetrou) online you probably know that I ike serverless platforms a lot. Serverless nowadays is a pretty ambiguous term and can mean anything; from [SQLite coining the term](https://www.sqlite.org/serverless.html) to [AWS enumerating their serverless offerings](https://aws.amazon.com/serverless/).

In this article, serverless corresponds to a single page application (SPA) website that is accompanied by a lightweight API. This setup exploded in popularity recently, and it even got a name, [Jamstack](https://jamstack.org/), for **J**avaScript, **A**PIs, and **M**arkup.

I experimented with many platforms over the past few years and I am going to briefly go over my current top 3 platforms to deploy your application, Netlify, Vercel, and AWS.

### TL;DR

All three platforms are great and I recommend all of them, depending on how much time you are willing to spend, and how much extensibility you think you might need in the future.

## Netlify

Website: <https://netlify.com>

I discovered Netlify couple of years ago, and have been tracking their progress ever since. The first time I saw it, I was simply stunned by how simple and fun it was to use while at the same time having powerful features.

Netlify has a lot of features and it feels more like an ecosystem of pluggable functionality (what they call add-ons), with flexible pricing.

Most notable add-on features:
- Serverless Functions
- Instant-forms
- Identity
- Analytics

The core product of the Netlify Platform is the combination of **Netlify Build** and **Netlify Edge**. Netlify Build is the ability to easily connect your Netlify project to your code repository (Github, Gitlab, BitBucket) and deploy your changes after every commit with a unique URL for each deployment. Netlify Edge is the application delivery network (ADN) which propagates the project's artifacts in locations across the globe, similar to a normal content delivery network (CDN) but much smarter, and faster.

The whole process to get started is so simple that you can [just drag-and-drop](https://app.netlify.com/drop) your project folder onto their website and deploy it in seconds!

I cannot possibly enumerate all the features Netlify provides but for the sake of this article we will focus on the core platform and the [Serverless Functions add-on](https://docs.netlify.com/functions/overview/).

Serverless functions use [AWS Lambda](https://aws.amazon.com/lambda/) behind the scenes, but abstract it away so that we don't have to fiddle with API Gateway, IAM role permissions, and all the nitty gritty AWS boilerplate.

For example, if we take JavaScript as an example, simply creating a file `functions/hello-world.js` with the content below will create an API accessible at `/.netlify/functions/hello-world`.

```javascript
exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  });
}
```

That's it for Netlify, let's move on to the next one.

## Vercel

Website: <https://vercel.com>

Vercel was [until recently known as Zeit Now](https://vercel.com/blog/zeit-is-now-vercel), and is extremely similar to Netlify in terms of target audience. Vercel however puts a lot of emphasis on their **zero config** deployments, and you can see it mentioned all over their website and docs. By zero-config deployment we mean that their system is [trying to be smart and guess the build system or framework that your project is using](https://vercel.com/docs/v2/build-step) based on your files and automatically do what it needs to do without you specifying anything. It works very well most of the time, apart from a [small issue](https://github.com/zeit/now/discussions/4132) I discovered with the custom build system.

Vercel provides a similar experience as Netlify, where you can connect your repository and instantly build and deploy your project after every commit, and also includes a delivery network.

A big feature is once again their [Serverless Functions](https://vercel.com/docs/v2/serverless-functions/introduction) offering, which is also using AWS Lambda under the covers. However, Vercel is a step up from Netlify, with [more languages](https://vercel.com/docs/v2/serverless-functions/supported-languages) and [more regions supported](https://vercel.com/docs/v2/edge-network/regions).

Its delivery network is also quite powerful, and more feature-rich than Netlify's, since apart from the static assets, it can also [cache serverless function responses](https://vercel.com/docs/v2/serverless-functions/edge-caching).

Just for completeness, a serverless function example in JavaScript requires the following content in the file `api/hello.js` in order to expose the API at `/api/hello?name=xxx`.

```javascript
module.exports = (req, res) => {
  const { name = 'World' } = req.query
  res.status(200).send(`Hello ${name}!`)
}
```

As you can see, even though it's based on AWS Lambda, Vercel decided to use custom function signatures for the handler in contrary to Netlify which is using AWS's format.

Before we finish with Vercel, I would like to briefly mention [Next.js](https://nextjs.org/), the React framework they developed which is **simply amazing**. I recently migrated my blog to use this and I cannot emphasize [how great it is](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support), and in conjunction with Vercel's platform they make a killer combination 🚀

## Amazon Web Services (AWS)

Even though AWS does not provide a nice coherent Jamstack platform (I don't like [AWS Amplify](https://aws.amazon.com/amplify/) at all), it provides all the necessary services to build your application.

For the past 5 years I have been using this myself, and the main services we need are [Amazon S3](https://aws.amazon.com/s3/) for storage of the static assets, [Amazon CloudFront](https://aws.amazon.com/cloudfront/) as our CDN, and [AWS Lambda](https://aws.amazon.com/lambda/) with [API Gateway](https://aws.amazon.com/api-gateway/) for our serverless functions API.

AWS has an advantage over both Netlify and Vercel, because of [Lambda@Edge](https://aws.amazon.com/lambda/edge/) which is basically a slightly restricted version of AWS Lambda running on the edge locations of Amazon CloudFront, so much closer to the customers compared to the normal Lambda functions which are in the regional datacenters. I have been using Lambda@Edge for years now, both in personal projects but also while I was working at Amazon and I love it!

As you can see, it involves more moving pieces but they are all super robust services used by thousands of customers, serving billions of requests every year without issues. Some of the AWS services themselves are being built on-top of these services, which proves their reliability and that AWS bets on them working as expected!

Finally, I would strongly recommend using [AWS CDK](https://aws.amazon.com/cdk/) to provision your resources for all the above services in code, referred to as Infrastructure as Code (remember CloudFormation?).

## Conclusion

I only scratched the surface of each platform's feature set, however it's quite clear that some are better at something and worse at something else.

If you focus only on Jamstack applications, my recommendation would be to go with Vercel. It has amazing performance, and the zero-config approach really does wonders for the majority of the popular frameworks. Recommending [Next.js](https://nextjs.org/) for one more time 😃

If you are going to find uses for Netlify's add-ons, then it's a great choice as well! Really, Netlify and Vercel are very similar and you cannot go wrong with either. They even published an article yesterday on [how to deploy a Next.js application on Netlify](https://www.netlify.com/blog/2020/05/04/building-a-markdown-blog-with-next-9.3-and-netlify/).

Finally, if your application is going to need additional cloud infrastructure to support it, like queueing systems, databases, detailed monitoring, or anything else not provided by these Jamstack oriented platforms, then AWS is probably your best bet. You can always make requests from Netlify/Vercel's serverless functions to other AWS resources, but it's a matter of control.

That's it for this article, maybe I will do a deep-dive in the future for certain features...
