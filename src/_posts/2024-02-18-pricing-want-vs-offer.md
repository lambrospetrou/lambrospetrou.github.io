---
title: "SaaS Pricing - What I want vs What I offer"
description: "What pricing model do I like as a customer vs what to offer as a SaaS provider."
isDraft: false
---

**Table of contents**

- [Context](#context)
- [What I want vs What I offer](#what-i-want-vs-what-i-offer)
- [Usage-based pricing](#usage-based-pricing)
- [Per-seat - Recurring pricing](#per-seat---recurring-pricing)
- [Conclusion](#conclusion)
- [References](#references)

--------

Pricing for a SaaS, or online digital products in general, is a hot topic for debate. All the time.

In this article I explain the pricing model I like as a customer of a SaaS product, and then compare that to the model I would (will) offer in my own SaaS product.
Are there any differences? Why?

## Context

Last year I spent several months contemplating starting a PaaS business, a managed infrastructure platform. 
I decided not to in the end, but I decided to [write about several things I noticed in an article](/articles/the-perfect-paas-exists-or-impossible/).

One of the aspects I researched was the pricing models different PaaS businesses used ([see Pricing section](/articles/the-perfect-paas-exists-or-impossible/#pricing)).

> Pricing is a huge thing for any company. Pricing defines, and filters, the customers a company will attract. Do you want the Enterprises, charge thousands. Do you want the indie developers, give stuff for free. The pricing model is what will make a company profitable, or kill it.

The above is very true, and drives the pricing model of a company. 👆🏻

I then elaborated on what I prefer as a user too. 👇🏻

> [...] for me, as a customer, I like it more when pricing starts from zero (`$0`) when I don’t consume any resources, and increases as I use the platform more.

Who would have guessed... Someone that wants to pay as little as possible.

Not really though! I want to pay as close to nothing as possible, when my use of a product is zero.
When I use a product, I want to pay proportionally to that usage.

And then wrote the following two-fold model as my ideal pricing model:

<blockquote>
<div style="text-align:left;">
<p>I thought about pricing a lot. The model I would choose if I ever built it would be two-fold:</p>
 
- Provide usage-based pricing that starts from $0, but with a higher price-per-unit.
- Provide per-seat or volume-discounted pricing for bigger companies.

<p>With the above two-fold model, anyone can start using the platform to make sure it works for them, pay for their usage along the way, and once they settle to use it they could switch to the second pricing plan. Some prefer predictability, some prefer usage-based, so why not both.</p>
</div>
</blockquote>

I read a lot of pricing material over the past few years ([see #References section below for some of my favourites](#references)).
There are people arguing in favor of anything and everything.

## What I want vs What I offer

The above two-fold approach is my personal favourite model, as a consumer, and (I think) as a business.

I have seen folks that complain about fixed high prices for a product, or talk negatively about too many recurring subscriptions, for them as an individual consumer.
But then, their own business only offers those too.
If your own business is not offering to others what you like to get, why do you expect other businesses to do so.

I am just starting a paid product business (see [Skybear.net Scripts](/articles/skybearnet-scripts-changelog-2024-02-18/)), and its pricing will be two-fold as above.
I am putting my skin in the game, or if you prefer, I will be walking my talking.

I want to provide a usage-based/credit-based pricing plan for those that don't want recurring monthly charges.
I also want to offer bundled/tiered plans for those that prefer predictable per-month/per-year charges.
Doing this without confusing users and leading them to comparison math is the interesting bit. To be explored.

Hopefully this article will not age badly 😁

## Usage-based pricing

There are several pricing models that I put into this category, including (and not only):
- prepaid credits (prepay for X credits, and spend them whenever)
- usage metered / pay as you go (pay at the end of the month for how much you used)
- percentage commission (pay a % of some revenue to the service provider)
- more...

Why do I like usage-based pricing as a customer?
- Pay as little as possible when I don't use the product.
- If my use is spiky, I don't want to pay the peak all the time, or getting throttled when the spike happens because I am paying the lower plan.
- I can use the product in the same way, for a toy project, as well as a huge for-profit project.

Drawbacks of usage-based pricing?
- Harder to meter and track, for the provider. Need to find the right dimensions to bill for, without pushing customers to weird usage of the product when cost-cutting.
- Harder to predict, for the customers.

Examples of usage-based pricing models:
- [Amazon Web Services (AWS)](https://aws.amazon.com/pricing/)
  - Although AWS takes it to the extreme often, and makes it impossible to actually calculate your bill. They don't have to. They choose to.
  - AWS CodePipeline charges per active pipeline (v1), or per execution minute(v2).
  - AWS Lambda charges per execution GB-second.
  - Amazon S3 charges per GB-stored, and per request.
- [Upstash](https://upstash.com/pricing)
  - Entirely usage-based on a dimension that makes sense per product (e.g. number of commands for Upstash Redis)
- [Stripe](https://stripe.com/gb/pricing)
  - Commission on every $ they process for you.

## Per-seat - Recurring pricing

Pricing models that I put into this category, including (and not only):
- Per-seat price per month (usually $$ per employee/user)
- Tiered plans with fixed charges per month
- Bundled volume-based plans with fixed charges per month
- Recurring subscription-based with fixed charge per month
- more...

The common aspect in these models is that you choose among a few predefined plans, and then you pay that much per month or per year regardless of how much you used the product.
These plans often have an additional dimension for overages in order to cover unexpected usage that exceeds the allotment of the chosen plan.

Why do companies like to pay or offer predictable/fixed pricing?
- Easier to reason and plan for, considering some providers (e.g. AWS) make it very complex to understand your bills.
- Per-seat plans are often more manageable to manage in terms of licensing, control it over time depending on active employees, etc.
- MRR is trendy.

Drawbacks of recurring pricing?
- See benefits of usage-based pricing above.

Examples of recurring pricing:
- [Tailscale](https://tailscale.com/pricing)
  - Per-seat charge per month according to plan.
- [Google Workspace](https://workspace.google.com/pricing?hl=en_uk)
  - Per-seat charge per month according to plan.
- [Amazon Prime](https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=G34EUPKVMYFW8N2U)
  - Per year fixed fee.

## Conclusion

Both pricing approaches have pros and cons.

I like the flexibility of usage-based pricing, and at the same time I understand that the predictability and easier reasoning of fixed recurring pricing is preferred by larger businesses.

The fixed bundled per-month plans with overages is a hybrid actually, but usually its high floor pricing doesn't bring the benefits of usage-based pricing when your usage is lower than those.

In my opinion, we should do both.

I like for example how [Upstash](https://upstash.com/pricing) does it (as of now at least), with usage-based pricing starting at `$0`, and then becoming more cost-effective to switch to bundled/fixed pricing per month once your usage exceeds a certain threshold.

## References

This section lists some of my favourite material for product pricing.

- [SaaS pricing models 101: your options and how to pick the right one](https://stripe.com/gb/resources/more/saas-pricing-models-101) by Stripe
- [SaaS pricing: models, strategies, and examples](https://www.paddle.com/resources/saas-pricing-models) by Paddle
- [The SaaS business model](https://stripe.com/gb/guides/atlas/business-of-saas) by Stripe, Patrick McKenzie (patio11)
- [Pricing low-touch SaaS](https://stripe.com/gb/guides/atlas/saas-pricing) by Stripe, Patrick McKenzie (patio11)
- [What I Would Do If I Ran Tarsnap](https://www.kalzumeus.com/2014/04/03/fantasy-tarsnap/) by Patrick McKenzie (patio11)
- [Pricing determines your business model](https://longform.asmartbear.com/pricing-determines-your-business-model/) by Jason Cohen
