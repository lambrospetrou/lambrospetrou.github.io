---
title: A journey through email providers (Zoho Mail, Private Email, Gmail, HEY, Google Domains)
description: "My journey through several email providers during the last 12 months. I tried Zoho Mail, Namechep's Private Email, and ended up back to Gmail with Google Domains."
---

## Context

I use several domains for my websites and side projects, and for some of them I want to have email addresses that use the correspoding domains, instead of advertising a Gmail address. For example, I want my personal domain to use the `@lambrospetrou.com` domain, instead of `@gmail.com`.

There are hundreds of email providers available, and over the past year I tried a couple of them, and read about tens more.

The process setting up the custom domain email is roughly the same across all providers:
1. You signup and pay for their service.
2. The service provider gives you their [MX records](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/) to put in your domain's DNS configuration.
3. You update your domain's DNS and boom, your custom domain email address is ready.

However, the email experience you get from each provider differs substantially...

## Namecheap Private Email

Almost a year ago I decided to go with the cheapest option, whilst also having good ratings.
For my personal domain (this website 👋) I used [Namecheap Private Email](https://www.namecheap.com/hosting/email/) since I was happy with Namecheap as a domain registrar a couple of times.

The offering cannot be simpler for around £9 ($12) per year 🤯:
- 1 free mailbox included
- 5GB for emails
- 2GB for files

I only used [Private Email's website](http://privateemail.com/), and even though it did not dazzle me, it was also not missing something important. Apart from one thing...

The spam filter algorithm is horrible, entirely inexistent. I have a few articles about AWS Lambda, Amazon S3, and AWS in general, and since they got picked up by some spammers, I am getting tens of emails that can be considered poster emails for testing spam algorithms.

So, since the year is almost up, I decided to not renew again. Next one...

## Zoho Mail

For a different domain, a side project, I used [Zoho Mail](https://www.zoho.com/mail/). The Zoho Suite is sometimes referred to as the cheaper Google G-Suite, since it is a collection of services and email is just one of them.

Similar to the other domain, I used the cheapest plan offered, [Zoho Mail Lite](https://www.zoho.com/mail/zohomail-pricing.html?src=hd) at £12 ($16):
- 5GB total
- Up to 250MB attachments
- Lots of other stuff I don't care...

I will be honest, this email is of very low use, and I didn't publish it in any way so I cannot directly compare it with Private Email in terms of spam filters. However, in roughly 6 months I haven't seen a spam email at all.

![Zoho Mail screenshot](/articles-data/2021-03-07-a-journey-through-email-providers/zoho-mail-screenshot-min.png)

Once again, I only used the website to access this email. The email view is quite standard, but I found the rest UI too complicated, and I got the sense that Zoho tries too much to look like a toolbox rather than a focused tool. Especially when I was navigating through the settings in the first few days to setup everything I got lost more times than I would like to admit... I haven't used any of the Calendar, Tasks, Notes, and other services, so cannot comment on those.

Overall, I have mixed feelings for Zoho Mail. It's cheap, simple for just email, but I have to use it more often to see if the rest of the services in the package make up for the intrinsic complexity.

## Google Workspace - G-Suite

[Google Workspace](https://workspace.google.com/) is what is famously known as G-Suite until last year when Google did a rebranding.
G-Suite is probably the most popular among professional email providers, due to Gmail's popularity, and the rest of the Google services (Docs, Drive, Calendar, etc.). The only one close in my opinion is the [Microsoft 365](https://www.microsoft.com/en-gb/microsoft-365) family of services. I personally hate Microsoft's plan breakdown, and I don't find Outlook to be on par with Gmail.

![Google Workspace - GSuite home page](/articles-data/2021-03-07-a-journey-through-email-providers/google-workspace-gsuite-min.png)

I have considered subscribing to the [Business Starter](https://workspace.google.com/pricing.html) plan for Google Workspace for months now (still haven't):
- 30GB cloud storage per user
- £4.60 (~$6.50) per month
- Integration with all the Google services with some business oriented features (e.g. for Google Meet)

One thing that holds me back is that some of the business versions of the services lack certain features that are available in the corresponding consumer versions. Since I am mostly interested in Gmail, it's not an actual issue to be honest, especially when compared with other email providers. But if I would be paying that monthly amount then I would like to use all the features I get with that. At times I would probably get into conflict, between my personal Google account and the business one, having to choose which one to use since I am a heavy Google services user.

Google Workspace (G-Suite) is my top choice so far for a dedicated email provider, and I am sure I will find a way to juggle my data between my personal and the business account.

## HEY for You

[HEY for You](https://hey.com/) is a brand new email service provided by the great team at [Basecamp](http://basecamp.com/). HEY's price is almost double than Google Workspace's at roughly £87 ($120 - $99 + 20% VAT) per year. The big promise from HEY justifying the high price is that it revolutionizes how you use email, taking some modern techniques cued from social media services (e.g. [The Feed](https://hey.com/features/the-feed/), the [Just let it flow](https://hey.com/flow/) philosophy), and avoids adding "management features" in an effort to make email simple.

![HEY for You home page](/articles-data/2021-03-07-a-journey-through-email-providers/hey-homepage.png)

I read through the whole [feature list](https://hey.com/features/) and watched the [YouTube videos presenting HEY](https://www.youtube.com/watch?v=UCeYTysLyGI), and it's quite intriguing. Having said that, I think that one of the reasons I am even considering this product at such a steep price is just because of Basecamp, the team, the company. Last year I read three of the [books they wrote](https://basecamp.com/books) (Getting Real, REWORK, Shape Up) and loved them, so I might be biased thinking I would like their email product too 😅

I am definitely going to at least signup for the trial and give this a go in the next few days. I haven't yet pulled the trigger because custom domain support is still only available for Hey for Work, the business version of the service, which is even more expensive.

## Google Domains

I stumbled upon this solution today, out of nowhere, while reading some Reddit comments.

[Google Domains](https://domains.google) is Google's new domain registrar service, still carrying the `BETA` status. However, today I was pleasantly surprised when I found out that it also [provides a free email forwarding service](https://domains.google/intl/en_uk/learn/how-to-use-email-forwarding/).

As it turns out, you can have up to 100 aliases per registered domain, and each can be forwarded to a different email address, including personal Gmail accounts. I immediately transferred two of my domains to Google Domains and tried the email forwarding feature, and it actually works great 🥳

In addition, according to the docs, email forwarding can also work alongside G-Suite so you can have both enabled at the same time if needed for the same domain.

Email forwarding is obviously not an apples-to-apples comparison to all the services I previously mentioned, but since the original goal was custom domain email address, it fully satisfies my needs. I just forward my domain's email addresses to my personal Gmail address and boom, everything ends up in the same account which is easy to manage, and with the ability to [send and reply emails using the domain address](https://support.google.com/domains/answer/9437157) it's complete.

## Conclusion

Google Domains solved my immediate problem in the best way possible since I don't have to login and use any other mediocre email provider, I have an amazing spam filter, and it's all within Gmail which I love.

Having said that, I am still in search for a dedicated offering for my non-personal domains used for some side projects, future mini-businesses. Google Workspaces and HEY are my top two finalists, and I guess I will have to finally tryout HEY before picking the winner.
