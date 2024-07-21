---
title: "Skybear.NET Scripts response bodies and cron triggers - Changelog 2024-05-28"
description: "Skybear.NET Scripts platform changelog update for May 2024."
og_image: "/articles-data/2024-05-28-skybearnet-scripts-changelog-2024-05-28/2024_05_28-skybearnet-response-outputs.png"
---

**Table of contents**

- [Full CRUD](#full-crud)
- [Hurl 4.3.0](#hurl-4-3-0)
- [Response outputs](#response-outputs)
- [Historical script runs](#historical-script-runs)
- [Script triggers - Scheduled Cron](#script-triggers-scheduled-cron)
- [Conclusion and feedback](#conclusion-and-feedback)

--------

[Skybear.net Scripts](https://www.skybear.net) is a managed platform to automate your HTTP website and API tests using [Hurl.dev](https://hurl.dev/) scripts. I like to call them HTTP workflows.

Use it for testing your HTTP APIs periodically, use it as a website uptime checker, or use it as a complex orchestrator for a sequence of HTTP requests that need to be executed in order using data from previous ones at specific times of the day.

Let's dive into the changes of the past few months.

## Full CRUD

In the last update ([see post](https://www.lambrospetrou.com/articles/skybearnet-scripts-changelog-2024-02-18/)) I introduced the management of Skybear.net scripts: creating, updating, and listing.

A few days later, the delete functionality was completed and rolled out as well ([see tweet](https://x.com/LambrosPetrou/status/1759697290057363532)).

<figure>
  <img src="/articles-data/2024-05-28-skybearnet-scripts-changelog-2024-05-28/2024_05_28-skybearnet-delete-script.png" title="Delete script action" alt="Skybear.net Scripts Delete script action" />
  <figcaption>Delete script action.</figcaption>
</figure>

## Hurl 4.3.0

I updated the Hurl version used for running the scripts from `4.1.0` to `4.2.0` ([see tweet](https://x.com/LambrosPetrou/status/1761432414981685350) - [see changelog](https://github.com/Orange-OpenSource/hurl/releases/tag/4.2.0)), and a few weeks later again to `4.3.0` ([see tweet](https://x.com/LambrosPetrou/status/1784183159992504705) - [see changelog](https://github.com/Orange-OpenSource/hurl/releases/tag/4.3.0)).

Staying up-to-date with `hurl` means more features and bug fixes to all Skybear.net users.

## Response outputs

Starting with Hurl `4.3.0`, there is a new `output: <filename>` option for each "entry" in the Hurl script, denoting the filename into which to save the **full response body** of the request.

You can now have full end-to-end introspection of the request and its response, including status code, headers, and body.

As an example, the following snippet will query the `httpbin.org/headers` endpoint, and save its response into the `headers.json` file.

```hurl
GET https://httpbin.org/headers
[Options]
output:headers.json
```

The screenshot below shows a more complicated workflow involving 4 HTTP requests, each with its own resource output file.
Clicking any of the four filenames (see **Output resources** section) opens the corresponding file as-returned in the original response.

<figure>
  <img src="/articles-data/2024-05-28-skybearnet-scripts-changelog-2024-05-28/2024_05_28-skybearnet-response-outputs.png" title="Skybear.net script with multiple requests saving their responses using the `output` option" alt="Skybear.net script with multiple requests saving their responses using the `output` option" />
  <figcaption>Multiple requests saving their responses using the `output` option.</figcaption>
</figure>

## Historical script runs

Skybear.net scripts are now powerful enough to cover complex scenarios and use-cases.
Many times, it's useful to access past runs of a script and examine its results, either for comparing with a more recent run, or just as a reference during incident investigations.

You are now able to access the full script run reports from the past 30 days.
This retention period will be configurable with upcoming paid plans (get in touch if you have special needs).

<figure>
  <img src="/articles-data/2024-05-28-skybearnet-scripts-changelog-2024-05-28/2024_05_28-skybearnet-historical-runs.png" title="Skybear.net View past script run results actions" alt="Skybear.net View past script run results actions" />
  <figcaption>View past script run results actions.</figcaption>
</figure>

## Script triggers - Scheduled Cron

All the above improvements led to the new **script triggers** feature.
Triggers are numerous mechanisms leading to an execution (aka "run") of your scripts.

Last week I released the first among many, the **scheduled cron trigger**.

You can now specify how often to run your scripts, with 1-minute granularity.

For now, you cannot configure a script to run more often than every 10-minutes, but upcoming paid plans will allow you to run scripts as often as every few seconds! 🤯

This feature was built ontop of [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) allowing for fine-grained second level granularity which provides plenty of flexibility for future extensions!

<figure>
  <img src="/articles-data/2024-05-28-skybearnet-scripts-changelog-2024-05-28/2024_05_19-skybearnet-cloudflare-cron-triggers.jpg" title="Cloudflare Durable Object logs for Skybear.net scripts cron triggers" alt="Cloudflare Durable Object logs for Skybear.net scripts cron triggers" />
  <figcaption>Cloudflare Durable Object logs for Skybear.net scripts cron triggers.</figcaption>
</figure>


Soon, there will be a built-in notification mechanism as well to notify you when the script fails to successfully complete execution.

Check out the video below for a showcase of configuring a scheduled cron trigger.

<figure>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/HvJsYbtgHr0?si=WTd6osXYk2SjrC3m" title="Skybear.net Scripts Scheduled Cron Triggers" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Video showcasing the Skybear.net Scheduled Cron Triggers feature.</figcaption>
</figure>

## Conclusion and feedback

[Skybear.net Scripts](https://www.skybear.net) can already be used for real-world use-cases. 🚀

I use Skybear.net to test Skybear.net!

If you have any questions, email me, or reach out at [@lambrospetrou](https://twitter.com/LambrosPetrou). 🙏🏼
