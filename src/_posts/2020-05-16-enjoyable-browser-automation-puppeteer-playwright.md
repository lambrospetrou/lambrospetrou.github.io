---
title: Enjoyable browser automation with Puppeteer and Playwright
description: "I very briefly go through two of the most promising browser automation frameworks, Google's Puppeteer and Microsoft's Playwright."
---

I have been doing a lot of web development over the past few years, both in my own time with my side projects but also at work. One of the things that you need at some point is to write a script to automate some kind of action usually done in the browser. For example, this could be navigating to certain pages and taking screenshots, or automated form submission, or automated UI testing.

One of the simplest use-cases I have for my own website is to generate a PDF version of [my CV page](https://www.lambrospetrou.com/cv/). There are several reasons why a PDF file could be better sometimes than a website, so it's useful to have one in hand. Since I already had the HTML version, what I used to do for several years was to use Chrome's **Print to PDF** functionality.

However, a couple of years ago, Google released [Puppeteer](https://developers.google.com/web/tools/puppeteer) which allows someone to script a headless version of Chromium. From the second I saw it I knew it was going to be big! Easy, simple and headless browser automation through Node. The potential use-cases are infinite 🛸

Since then it has been used by companies to make amazing things.

- Automated robust UI tests inside headless Chrome, instead of the finicky Webdriver approaches that were the standard back then.
- Performance profiling and benchmarking of web applications.
- Scripting of manual tasks that people were doing like form submission.
- Web crawling through a normal browser to avoid issues with previous approaches that were using browser-like fakes.
- Server-side rendering of dynamic single page JavaScript application to avoid SEO issues.
- Many other things that required an actual browser running a website.

One of the problems with Puppeteer is that it only supports Chromium so far.

I was extremely happy to see a few days ago that Microsoft finally released the v1 version of [Playwright](https://playwright.dev/). Playwright is extremely similar to Puppeteer, but it extends its amazing feature-set by supporting all the three major browsers, Chromium, Firefox, and Webkit 😍 Not only that, but they added very cool features like auto-waiting for element selection which greatly simplifies DOM manipulation.

There are a few features that are not supported by all the browsers, so keep that in mind if something fails in your scripts, make sure that the browser you use supports it.

## Code

From the little time I spent with Playwright its API seems extremely similar to Puppeteer's so it's easy for someone to jump between the two or migrate from one to the other.

As an example, see below an excerpt of the code I use to generate the PDF version of my website.

The full code can be found at [my CV repository](https://github.com/lambrospetrou/lpcv/blob/master/html/build-tool/generate-pdf.js).

### Local server

While I am making changes to my CV I want to be able to generate the PDF and test it without having to push my changes to the live website. The following code starts a local server at port `12345` that serves the assets from inside the `build/` directory.

```javascript
const handler = require('serve-handler');
const http = require('http');
const path = require('path');
const WS_BUILD=path.join(__dirname, './build');

const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: WS_BUILD
    });
})
server.listen(12345)
```

### Puppeteer

The following code is what we need to make Puppeteer visit our local server, wait for the page to fully load, and then generate a PDF named `cv.pdf`.

```javascript
const puppeteer = require('puppeteer');

async function generatePdfPuppeteer() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:12345', {waitUntil: 'networkidle2'});
    await page.pdf({
        path: path.join(WS_BUILD, 'cv.pdf'), 
        format: 'A4',
        margin: {
            top: '0.39in',
            left: '0.39in',
            right: '0.38in',
            bottom: '0.38in'
        }
    });
    await browser.close();
}
```

### Playwright

The code for using Playwright is (almost) identical to Puppeteer in our simple use-case.

```javascript
const { chromium } = require('playwright');

async function generatePdfPlaywright() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:12345', {waitUntil: 'networkidle'});
    await page.pdf({
        path: path.join(WS_BUILD, `cv-playwright.pdf`), 
        format: 'A4',
        margin: {
            top: '0.39in',
            left: '0.39in',
            right: '0.38in',
            bottom: '0.38in'
        }
    });
    await browser.close();
}
```

### Issues with WSL on Windows 10

I am using the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about) version 1, and I had issues while running both Puppeteer and PlayWright due to some incompatibilities with the browser binaries.

You can find more information for this issue in these discussions:
- https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
- https://github.com/loteoo/hyperstatic/pull/20/files 

To make Chromium work the arguments `--no-sandbox`, `--disable-setuid-sandbox`, and `--single-process` have to be passed to the `launch()` method. See the modified lines below.

#### Puppeteer

```javascript
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process']});
```

#### Playwright

```javascript
const browser = await chromium.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process']});
```

## Conclusion

Having the ability to write a few simple lines of code and automate a full-blown browser is amazing. What I discussed above only scratches the surface of what can be done and I am always excited to see how people use these stuff.

Enjoy 😉

