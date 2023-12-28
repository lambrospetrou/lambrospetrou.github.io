---
title: "Hurl Webscripts v0.0.1"
description: "Initial version of a managed platform to run Hurl scripts."
---

[Hurl Webscripts](https://webscripts.lambrospetrou.com) is a managed platform to execute [Hurl.dev scripts](https://hurl.dev/). Hurl scripts do a lot, but to keep it short, they send HTTP/cURL requests, do assertions on the responses, and pipeline consecutive requests using previous responses.

- Test it at <https://webscripts.lambrospetrou.com>

I don't want this to be a generic compute platform (e.g. [AWS Lambda](https://aws.amazon.com/lambda/)). I do want it though to grow into more use-cases, and if all goes well and according to plans, there are lots of exciting directions.

See a small showcase of the tool as of today. This is mostly for my historical records 😅

-------

<!-- https://youtube.com/watch?v=GiC-xoPKc08 -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/GiC-xoPKc08?si=rfI6f8MU5HsgqG2f" title="YouTube video for Hurl Webscripts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## v0.0.1

I just released the very first version of the platform a few days ago ([see tweet](https://twitter.com/LambrosPetrou/status/1734778332950962255)).

<figure>
  <img src="/articles-data/2023-12-28-hurl-webscripts/2023_12_13-tweet_initial_release.jpg" title="Initial version v0.0.1" alt="Initial version v0.0.1" />
  <figcaption>Tweet of the initial version v0.0.1 release.</figcaption>
</figure>

It only allowed you to type a Hurl script, run it, and see the generated reports as-is from the Hurl CLI. Albeit with some modifications and cleanup to make them to render well on my website.

A few improvements quickly followed up.

**Shareable links** ([see tweet](https://twitter.com/LambrosPetrou/status/1735489774570369355)) allowing you to share the authored script with anyone so that you can share your masterpieces with more folks, on social media, or in your team's Slack channels.

<!-- https://youtube.com/watch?v=QVwaLr3KOec -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/QVwaLr3KOec?si=-d5A72JTmLhlSVy_" title="YouTube video for Hurl Webscripts shareable links" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

A new **network requests timeline visual** ([see tweet](https://twitter.com/LambrosPetrou/status/1739660004980850871)) explaining the time each network operation took for every HTTP request of the script. You can clearly see how much time was spent in DNS Lookup, TCP Handshake, SSL handshake, waiting for server response, and transferring data.

<figure>
  <img src="/articles-data/2023-12-28-hurl-webscripts/2023_12_26-network_requests_timeline_expanded.jpg" title="Network requests timeline visualization" alt="Network requests timeline visualization" />
  <figcaption>Network requests timeline visualization.</figcaption>
</figure>

All code editors, at some point introduce some kind of split screen mode with multiple panes to allow for more things to be shown at once.

I implemented such side-by-side mode ([see tweet](https://twitter.com/LambrosPetrou/status/1740027623731060798)), with the Hurl script code being on the left side, and the output on the right side. Size of each pane is configurable, and my underlying implementation supports arbitrary number of panes on each axis, so I will be doing a lot more enhancements in the layout department over time.

<figure>
  <img src="/articles-data/2023-12-28-hurl-webscripts/2023_12_27-mobile_landscape_splitscreen.jpg" title="Side-by-side mode in mobile landscape" alt="Side-by-side mode in mobile landscape" />
  <figcaption>Side-by-side mode in mobile landscape.</figcaption>
</figure>

## Going forward

Now that the first initial version is up and running, I am able to ship smaller incremental improvements continuously.
I have lots of ideas about features and different major directions this platform could go.

I will try a few things and see what will stick with the market.

There are some features I will be implementing either way:
- Support for more Hurl options ([see docs](https://hurl.dev/docs/manual.html)).
- AI assistant and plenty of examples to help you write Hurl scripts.
- Scheduled execution of scripts (e.g. run this every Tuesday at 09:00 and notify "this" email).
- Unique invoking endpoint that will execute the script by just calling that endpoint.
- Managing a collection of scripts and running them all together.
- Source control versioned scripts (e.g. Github integration).
- and many more...

I am not sure yet which major direction I will pick, but some areas I want to explore include:
- Webhook integrations
- Website and API scraping
- API end-to-end testing
- Adhoc HTTP testing
- more to discover...

I am having lots of fun with this platform, and the more I build, the more fun it gets.
Each feature I ship enables more use-cases, and makes the user-experience better, and this gives me joy.

Looking forward to productizing this soon! 💪😉
