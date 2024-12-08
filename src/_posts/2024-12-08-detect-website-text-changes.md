---
title: "How to detect website text content changes with Skybear.NET"
description: "Use Skybear.NET and Hurl to get notified when some text changes on a website."
canonical_url: https://www.skybear.net/docs/how-to/detect-website-text-changes/
---

**Table of contents**

-   [Real world scenario to detect PagerDuty vCard updates](#real-world-scenario-to-detect-pagerduty-vcard-updates)
-   [Script to detect vCard updates](#script-to-detect-vcard-updates)
-   [Scheduled runs](#scheduled-runs)

[Hurl](https://hurl.dev) is a CLI tool that makes testing and automating HTTP APIs easy and enjoyable.
For the past year, I have been building a managed platform to run Hurl scripts for you ([<span class="skybear-name">Skybear<span>.NET</span></span>](https://www.skybear.net/)), automatically scaling the underlying infrastructure and providing useful execution reports.

The following article is a copy of the [<span class="skybear-name">Skybear<span>.NET</span></span> corresponding How-to Guide](https://www.skybear.net/docs/how-to/detect-website-text-changes/), posting it here for my records (canonical URL properly used😉), and its content is as of 2024-Dec-08.

---

In this article I will use <span class="skybear-name">Skybear<span>.NET</span></span> to continuously check a website's text content and notify me when a specific text changes.

## Real world scenario to detect PagerDuty vCard updates

As part of being oncall at work, we use PagerDuty for alerting the oncall engineers when a team gets paged.

However, the PagerDuty app has several issues depending on the device you use and the OS version regarding things like Do not Disturb mode, leading to missed page calls.
What's the point of being oncall and not getting alerted😅

One easy (and maybe dumb) solution I have been doing for a few years to always guarantee that the phone calls by PagerDuty always "make a sound" is to import the PagerDuty vCard directly into my contacts.
Therefore, even if I don't have the PagerDuty app installed, as long as I allowlist the PagerDuty contact entry to always alert regardless of silent mode, I will always get alerted.

The website [PagerDuty vCard Updates](https://support.pagerduty.com/main/docs/notification-phone-numbers#pagerduty-vcard) has a section listing the latest version of the PagerDuty vCard Update as a date, e.g. `2024-11-13`.

![PagerDuty vCard Updates website](/articles-data/2024-12-08-detect-website-text-changes/2024-12-08-pagerduty-vcard-website.png)

In this guide we will periodically fetch the above website, detect changes in the specific version date of the latest vCard update, and notify us in case it changes so that we can download the new vCard.

If you want to play with the final script, [run it with the Open Editor](https://www.skybear.net/scripts/open-editor/#openEditorSrcText=IyBQYWdlckR1dHkgdkNhcmQgdXBkYXRlIGRldGVjdGlvbgpHRVQgaHR0cHM6Ly9zdXBwb3J0LnBhZ2VyZHV0eS5jb20vbWFpbi9kb2NzL25vdGlmaWNhdGlvbi1waG9uZS1udW1iZXJzI3BhZ2VyZHV0eS12Y2FyZApIVFRQIDIwMApbQXNzZXJ0c10KeHBhdGggIm5vcm1hbGl6ZS1zcGFjZShzdHJpbmcoLy9oM1suLy8qW0BpZD0nbGF0ZXN0LXZjYXJkLXVwZGF0ZSddXS9mb2xsb3dpbmctc2libGluZzo6dWxbMV0pKSIgPT0gIjIwMjQtMTEtMTMi).
No signup required, and you can play with it for FREE.

Note that as of the time of writing this guide, the latest vCard update date is `2024-11-13`.

## Script to detect vCard updates

Since we will be doing HTML inspection we will be using the [Hurl's XPATH assertion capabilities](https://hurl.dev/docs/asserting-response.html#xpath-assert).
A nice cheatsheet for XPath can be found at https://devhints.io/xpath.

Let's take a look at the HTML section we care about on the PagerDuty website:

```html
<!-- more content -->
<h3 class="heading heading-3 header-scroll" align="">
    <div class="heading-anchor anchor waypoint" id="latest-vcard-update"></div>
    <div class="heading-text">
        <div id="section-latest-v-card-update" class="heading-anchor_backwardsCompatibility"></div>
        Latest vCard Update
    </div>
    <a
        aria-label="Skip link to Latest vCard Update"
        class="heading-anchor-icon fa fa-anchor"
        href="#latest-vcard-update"
    ></a>
</h3>
<ul>
    <li>2024-11-13</li>
</ul>
<!-- more content -->
```

As you see from the HTML snippet above, we will need to find the `<h3>` element that has a child element with the ID `latest-vcard-update` (the first `<div>` child above).
Once we have the `<h3>` element, we will find the immediate sibling `<ul>`, and its text content will be the vCard latest update date we are interested in.

Let's breakdown our XPath query:

1. Get the `<h3>` element that has a child with the expected ID:
    ```
    //h3[.//*[@id='latest-vcard-update']]
    ```
2. Get the first `<ul>` sibling of the `<h3>` element from step 1:
    ```
    //h3[.//*[@id='latest-vcard-update']]/following-sibling::ul[1]
    ```
3. We will normalize the text content of the `<ul>` element and its children to remove leading and trailing whitespace simplifying our assertion ([see `normalize-space()` docs](https://developer.mozilla.org/en-US/docs/Web/XPath/Functions/normalize-space)):
    ```
    normalize-space(string( ... ))
    ```

The full XPath selector we will use is:

```
normalize-space(string(//h3[.//*[@id='latest-vcard-update']]/following-sibling::ul[1]))
```

For comparison, the corresponding JavaScript query selector would be:

```js
document.querySelector("h3:has(#latest-vcard-update) + ul").textContent.trim();
```

We have done the hard part now🎉
Let's write our Hurl script to periodically fetch the website, extract the vCard update date, and compare the vCard update date against the last date we have downloaded the vCard.

```http
// detect-pagerduty-vcard-changes.hurl
# PagerDuty vCard updates detection
GET https://support.pagerduty.com/main/docs/notification-phone-numbers#pagerduty-vcard
HTTP 200
[Asserts]
xpath "normalize-space(string(//h3[.//*[@id='latest-vcard-update']]/following-sibling::ul[1]))" == "2024-11-13"
```

-   [Run this script with the Open Editor](https://www.skybear.net/scripts/open-editor/#openEditorSrcText=IyBQYWdlckR1dHkgdkNhcmQgdXBkYXRlIGRldGVjdGlvbgpHRVQgaHR0cHM6Ly9zdXBwb3J0LnBhZ2VyZHV0eS5jb20vbWFpbi9kb2NzL25vdGlmaWNhdGlvbi1waG9uZS1udW1iZXJzI3BhZ2VyZHV0eS12Y2FyZApIVFRQIDIwMApbQXNzZXJ0c10KeHBhdGggIm5vcm1hbGl6ZS1zcGFjZShzdHJpbmcoLy9oM1suLy8qW0BpZD0nbGF0ZXN0LXZjYXJkLXVwZGF0ZSddXS9mb2xsb3dpbmctc2libGluZzo6dWxbMV0pKSIgPT0gIjIwMjQtMTEtMTMi) (no signup required)

As of the time of writing this guide, the latest vCard update date is `2024-11-13`.

The moment that PagerDuty will update their vCard, the assertion above will fail and if you have configured email notifications <span class="skybear-name">Skybear<span>.NET</span></span> will notify you immediately.

Below you can see an example of how the assertion failure would look like if our assertion was expecting `2024-11-10`:

```
error: Assert failure
  --> ./s_nsFlFDlJkX54hqRSFFhGkf7-5srrVV5lz1Pq.hurl:5:0
   |
   | GET https://support.pagerduty.com/main/docs/notification-phone-numbers#pagerduty-vcard
   | ...
 5 | xpath "normalize-space(string(//h3[.//*[@id='latest-vcard-update']]/following-sibling::ul[1]))" == "2024-11-10"
   |   actual:   string <2024-11-13>
   |   expected: string <2024-11-10>
   |
```

## Scheduled runs

Now that we have a script to monitor content changes, we can create a [scheduled cron trigger](https://www.skybear.net/docs/features/trigger-cron/) to make sure it runs continuously every day and sends us an email when the content changes.

After you [create the <span class="skybear-name">Skybear<span>.NET</span></span> script](https://www.skybear.net/scripts) with the appropriate content, navigate to its **Settings** tab, and configure a Scheduled Cron trigger with the cron expression `0 1 * * *` so that it runs every day at 01:00, forever.

You can configure the trigger to notify you by email when the content changes are detected.
