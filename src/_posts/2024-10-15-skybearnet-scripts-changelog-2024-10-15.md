---
title: "Skybear.NET Scripts secret variables, HTTP triggers, and replacing AWS Lambda with Fly.io - Changelog 2024-10-15"
description: "Skybear.NET Scripts platform changelog update for August and September 2024."
og_image: "/articles-data/2024-07-21-skybearnet-scripts-changelog-2024-07-21/20240718T0924-landing-banner.png"
---

**Table of contents**

- [HTTP Hook Trigger](#http-hook-trigger)
- [Secret Hurl variables](#secret-hurl-variables)
- [Out of AWS Lambda into Fly.io](#out-of-aws-lambda-into-fly-io)
- [Response bodies automatically persisted](#response-bodies-automatically-persisted)
- [Docs](#docs)
- [Conclusion and feedback](#conclusion-and-feedback)

--------

[<span class="skybear-name">Skybear<span>.NET</span></span>](https://www.skybear.net) is a managed platform automating your HTTP API testing using [Hurl.dev](https://hurl.dev/) plain text scripts.
You can run your scripts on-demand through the API, or periodically based on a cron expression.

It's been a few months since the last changelog article ([see last update in July](https://www.lambrospetrou.com/articles/skybearnet-scripts-changelog-2024-07-21/)), but it doesn't mean there wasn't any work done.
On the contrary, the features shipped since then are quite the bangers!

Let's dive into them. 👇🏼

## HTTP Hook Trigger

In a past update ([see article](/articles/skybearnet-scripts-changelog-2024-05-28/)) I introduced the script triggers, specifically the scheduled cron trigger.
Scheduled triggers allow you to configure a script to run periodically every few minutes based on a cron expression.

However, in order to properly integrate with Continuous Integration (CI) systems running scripts periodically doesn't work.
We want to be able to run scripts on-demand, wait for the results, and then accordingly progress or abort the deployment.

Back in August ([see changelog](https://about.skybear.net/docs/support/changelog/#2024-aug-11--http-trigger)) I shipped a key feature, the **HTTP hook trigger**.

In addition to the Scheduled Cron trigger, you can now configure your scripts to be invokable through an HTTP `POST` request.

The request is blocking, and does not return until your script execution is complete.
This allows you to run your scripts in your CI, and make sure any code changes you shipped are actually correct.

<figure>
  <img src="/articles-data/2024-10-15-skybearnet-scripts-changelog-2024-10-15/script-settings-http-trigger.jpg" title="Skybear.NET http trigger settings" alt="Skybear.NET http trigger settings"/>
  <figcaption>Skybear.NET script HTTP hook trigger settings.</figcaption>
</figure>

You can see above the new script setting to enable your script's HTTP hook trigger.

_**Please note that this URL should be treated as a secret, since anyone with that URL can send an HTTP `POST` request to it and trigger a run of your script.**_

Script runs triggered by the new HTTP hook trigger have a new indicator:

<figure>
  <img src="/articles-data/2024-10-15-skybearnet-scripts-changelog-2024-10-15/run-results-http-manual.png" title="Skybear.NET http trigger run result" alt="Skybear.NET http trigger run result"/>
  <figcaption>Skybear.NET script HTTP hook trigger run result.</figcaption>
</figure>

## Secret Hurl variables

Hurl scripts are very flexible, and they support variables in order to allow dynamic scripting.
For example, the following script defines the variable `BASE_HOST` that needs to be provided at execution time.

```
GET https://{{ BASE_HOST }}/some-api
HTTP 200
```

With the release of the HTTP hook triggers, it was only natural that folks wanted a way to provide Hurl variables to their scripts since now they could run either through the UI, through their CI, or just manually through the HTTP trigger.

<span class="skybear-name">Skybear<span>.NET</span></span> shipped support for Hurl variables as part of the request to the HTTP hook trigger URL ([see changelog](https://about.skybear.net/docs/support/changelog/#2024-aug-17--pass-hurl-variables-to-http-trigger-runs)), enabling fully dynamic scripts.

An example `POST` request to the HTTP hook trigger of a script:
```
curl --request POST \
  --header "Content-Type: application/json" \
  --data '{"hurlVariables":{"BASE_HOST": "skybear.net"}}' \
  https://api.skybear.net/v1/integrations/triggers/http/s_nkjfLc27FDb1dRz7rZ95zcc/strig_http_l9qRWlr16M3jm1LnbTzM7XtSNcGKShGtq:sync
```

A few days later, I fully integrated Hurl variables into the <span class="skybear-name">Skybear<span>.NET</span></span> platform and built a UI to manage these variables through the UI ([see changelog](https://about.skybear.net/docs/support/changelog/#2024-sep-01--manage-hurl-variables-natively-in-the-ui)).

You can define them in your [<span class="skybear-name">Skybear<span>.NET</span></span> account secrets page](https://www.skybear.net/account/secrets), and use them across all your scripts.

<figure>
  <img src="/articles-data/2024-10-15-skybearnet-scripts-changelog-2024-10-15/account-secrets.png" title="Skybear.NET account secrets and variables" alt="Skybear.NET account secrets and variables"/>
  <figcaption>Skybear.NET account secrets and variables.</figcaption>
</figure>

**All Hurl variables are being treated as sensitive secrets. Never logged or stored in plaintext. 🔐 Script run reports are also encrypted.**

I do envelope encryption. Each variable is encrypted with its own Data encryption key (DEK), that itself is encrypted with a different Key Encryption Key (KEK) for each account, and that KEK finally {en,de}crypted by AWS KMS!

I will write up a more detailed article on how envelope encryption is implemented.

With Hurl variables integrated natively, you can literally take your local scripts, put them in <span class="skybear-name">Skybear<span>.NET</span></span>, run them in the UI, configure them to run automatically every few minutes, or even get an HTTP URL that you can invoke in your CI and have them running in the Skybear platform remotely.

Full script compatibility with local Hurl CLI. 👌

## Out of AWS Lambda into Fly.io

Back in September, a user reported that their script sending requests to an IPv6 origin was failing.

At the time, the script execution was done inside [AWS Lambda](https://aws.amazon.com/lambda/).
After a bit of research and testing, it turns out that AWS Lambda does not natively support outgoing IPv6 connections, therefore all scripts attempting to do that were failing.

I immediately created a "known issue" in our documentation ([see issue entry](https://about.skybear.net/docs/support/known-issues/#ipv6-addresses)) for this so that I can share it with other customers in case they encounter this.

I went through a few solutions, and decided that it was not worth the effort to fiddle with AWS networking shenanigans, having to move my AWS Lambda functions inside a VPC, creating and proxying all traffic through NAT gateways, etc.

After 2 days, all of the script executions were moved out of AWS Lambda into [Fly.io](https://fly.io) ([see changelog](https://about.skybear.net/docs/support/changelog/#2024-sep-10--script-executors-moved-out-of-aws-lambda)).

The transition was trivial, uneventful, and has been running smooth since then! 🥳

I have used Fly.io in the past, so I was familiar with it, and since the execution server was already an HTTP API written in Go it was trivial to migrate it from AWS Lambda into Fly.io with a tiny Docker container.

As a fun side-effect, I now use 3 regions on Fly.io instead of just one I previously had with AWS Lambda, therefore there is more resiliency in case any of their datacenters goes down.

And soon, I will enable users to select the location(s) where their scripts will be running. 🥳

## Response bodies automatically persisted

Another huge upgrade in September was the upgrade of Hurl to version `5.0.1` ([see changelog](https://about.skybear.net/docs/support/changelog/#2024-sep-08--hurl-upgrade-to-501)) that added the `--report-json` argument.

Before that upgrade, you had to use the `output: <filename.extension>` option in order to persist responses in your script run reports.

With the new Hurl option `--report-json`, the platform now automatically persists every* single response body received while executing your script, uploads it to durable object storage, and makes it available to you for download later ([see changelog](https://about.skybear.net/docs/support/changelog/#2024-sep-21--all-response-bodies-automatically-persisted-and-available)).

The `output` option continues to work, but you shouldn't need to use it.

Debugging your scripts and APIs was never easier 🙃

ps. * There is a limit on how much storage each script run can use at the moment, but I plan on extending this based on the active billing plan.

## Docs

Finally, last month I released the initial documentation website for <span class="skybear-name">Skybear<span>.NET</span></span>.

Visit <https://about.skybear.net/docs/> and let me know what you think.

It's quite barebones at the moment, but I will be adding a lot of content over the next few weeks.
Tutorials, existing feature descriptions, and plenty of examples for Hurl scripts.

Keep an eye on the [Changelog](https://about.skybear.net/docs/support/changelog/) page listing major and highlighted releases.

## Conclusion and feedback

Check out <span class="skybear-name">Skybear<span>.NET</span></span> and let me know if you have specific feature requests.

If you have any questions, email me, or reach out at [@lambrospetrou](https://twitter.com/LambrosPetrou). 🙏🏼
