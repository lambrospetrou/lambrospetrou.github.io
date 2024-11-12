---
title: "Skybear.NET Scripts landing page and Business plan - Changelog 2024-07-21"
description: "Skybear.NET Scripts platform changelog update for July 2024."
og_image: "/articles-data/2024-07-21-skybearnet-scripts-changelog-2024-07-21/20240718T0924-landing-banner.png"
---

**Table of contents**

-   [Run types](#run-types)
-   [Landing page](#landing-page)
-   [Business plan](#business-plan)
-   [Continuous Integration use-case](#continuous-integration-use-case)
-   [Conclusion and feedback](#conclusion-and-feedback)

---

[Skybear.NET](https://about.skybear.net/) is a managed platform to automate your HTTP API synthetics testing using [Hurl.dev](https://hurl.dev/) plain text scripts.

Use it for testing your HTTP APIs on-demand or periodically, or use it as a complex orchestrator for a sequence of HTTP requests that need to be executed in order using data from previous ones at specific times of the day.

The past two months was a lot of work, but also a few weeks of holidays to recharge.
Let's dive into the changes that happened.

## Run types

In the last update ([see post](/articles/skybearnet-scripts-changelog-2024-05-28/)) I introduced the script triggers, specifically the scheduled cron trigger.
This type of trigger allows you to configure a script to run periodically every few minutes.

I also introduced the historical script runs listing page where you can see all the invocations of your script, either manually triggerred through the UI, or due to the scheduled cron trigger.

For this changelog, I did a small user-experience improvement to denote the type of each run.

<figure>
  <img src="/articles-data/2024-07-21-skybearnet-scripts-changelog-2024-07-21/GQSWCLoXoAAt-rh.png" title="Skybear.NET script run invocation type in list runs page" alt="Skybear.NET script run invocation type in list runs page" />
  <figcaption>Script run invocation type in list runs page.</figcaption>
</figure>

A small indicator now exists in the scripts list page that is awesome in quickly checking out which of your scripts are scheduled to run periodically, and how often.

<figure>
  <img src="/articles-data/2024-07-21-skybearnet-scripts-changelog-2024-07-21/GQSWCLiWAAAd3ps.jpg" title="Skybear.NET script cron trigger configuration in scripts list page" alt="Skybear.NET script cron trigger configuration in scripts list page"/>
  <figcaption>Script cron trigger configuration in scripts list page.</figcaption>
</figure>

## Landing page

I finally launched the product's landing page. 🥳 Check it out at <https://about.skybear.net/>.

I spent some time working on the landing page's copy, trying to emphasize what Skybear.NET is about, what you can use it for, and why it's not simply yet another uptime checker.

This is only the beginning though, and I have a lot of changes coming up soon that will enrich the landing page even more.
Take a look, and let me know if I can improve something!

<figure>
  <img src="/articles-data/2024-07-21-skybearnet-scripts-changelog-2024-07-21/20240721T1135-HoUactheKl.png" title="Skybear.NET product landing page" alt="Skybear.NET product landing page"/>
  <figcaption>Skybear.NET product landing page above-the-fold.</figcaption>
</figure>

While working on the landing page, I used several resources as guidance, especially a few products I love using or following (e.g. Tailscale, Tailwind CSS, Postmark, and anything from Basecamp).
You can spot some of their influence in my landing pages 😅

The most helpful resource though, which I recommend to anyone working on landing pages to read, is this guide by Julian Shapiro: [Resource:
Landing Pages](https://www.julian.com/guide/startup/landing-pages?from=lambrospetrou_com)

Go ahead and read it, now! Thank me later 👌

## Business plan

After a few weeks of holidays, and several days of work, I released the Business pricing plan for Skybear.NET.

I spent more time than I wanted reading about pricing, checking out how competitors price their plans, how multiple other relevant and irrelevant products do their pricing, and went through multiple versions for my own.

A few months ago, I actually [wrote my thoughts on SaaS pricing](/articles/pricing-want-vs-offer/), so I had that as my guarding rails as well.

I decided for now to go with a usage-based pricing using the total number of step requests across all your scripts, combined with a volume-based bulk discount approach.
Instead of going fully usage-based where you pay only what you use, I decided to use 7 price points that I consider sufficient for companies and teams at different growth levels, and apply them a discount as you go higher.

Right now the prices available start from `15 USD/month` and go up to `1100 USD/month`, with an annual plan offering a **whole of 2 months for free**.

There is also a **completely FREE tier**, albeit much restricted, that someone can use to try out the platform before switching to the recurring monthly or annual plans.

<figure>
  <img src="/articles-data/2024-07-21-skybearnet-scripts-changelog-2024-07-21/20240721T1150-dfJVSvJ8QD.png" title="Skybear.NET product pricing plans" alt="Skybear.NET product pricing plans"/>
  <figcaption>Skybear.NET product pricing plans as of 2024-07-21.</figcaption>
</figure>

Are these the final and only plans forever? ... Probably not...
I would lie to myself, and you, if I said pricing won't change (higher or lower) once I start getting customer feedback, or experimenting a bit more with it, adding more features, etc.

Please try out the platform, and let me know if you have suggestions on pricing.

## Continuous Integration use-case

The core platform features, including the landing page, pricing integration and respecting the plan limits, are now implemented.

In the next couple of months I am going to focus on expanding the platform's feature set around Continuous Integration (CI).

Many teams and companies use Synthetic API Tests to verify their code changes before shipping them in production.
There is a big userbase using [Hurl.dev](https://hurl.dev) scripts or similar tools like [Bruno](https://www.usebruno.com/), and many of these teams run their tests in CI jobs in addition to their local tests during development.

I would like to dive into this market base and provide features that would entice these teams to use their existing scripts and test files with the Skybear.NET platform in order to get more visibility into their tests, and other value-adding features.

There is already a big list of ideas I am brewing and will start working on over the next couple of months, but if you are using any of these tools and have specific needs for what you need out of a platform to run your tests, please reach out.

## Conclusion and feedback

[Skybear.NET](https://about.skybear.net/) can already be used for real-world use-cases. 🚀

I use Skybear.NET to test Skybear.NET!
Check it out, try to run your own scripts on-demand or periodically, and let me know if you have specific feature requests.

If you have any questions, email me, or reach out at [@lambrospetrou](https://twitter.com/LambrosPetrou). 🙏🏼
