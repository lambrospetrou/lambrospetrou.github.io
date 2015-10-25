---
title: After-school effect
description: School is finally history freeing up more time to do exciting and interesting things.
url: after-school-effect
---

Time passes and goes at amazing speed. Finally, after twenty-five years, school has reached its end. I still don't know if this is bad or good, since I am now thrown into the wild jungle known as *life*.

Anyway, enough with the philosophical talk. Now that I graduated from university I have some time to revisit some of my old projects and refactor them. As always, when I want to try something new I re-write my website. During last week I completely re-written my website and blog from scratch, ```lambrospetrou.com```.

As I described in my last article, dated in 2014-July-20, I am in love with Go aka [#golang](http://golang.org) so it was a natural choice to use it again. I decided to go away from the dynamic nature of a blog and revert to a static blog with dynamic content ;) Well, let's just say that whenever I create write an article I regenerate the website. Static Site Generators have seen a lot of popularity increase in the last couple of months, maybe because they are easy to use or because the site is easier to deploy than messing around with Wordpress, Joomla, plugins and all the sh\*\*t brought with them. Additionally, as a Software Engineer I am always fond of my own creations. You can find the generator for this blog at Github: [Micro-blog generator repository](https://github.com/lambrospetrou/gomicroblog). I have to warn you that it is not exactly designed for generic usage. However, if you like its simplicity and want to try it just check out the source code of this blog at [Lambros Petrou blog source code](https://github.com/lambrospetrou/lambrospetrou.github.io) and replace it with your own content.

Apart from my website and blog, another important project I had in pending state was [Spi.To](http://spi.to), my own custom URL shortener and text share tool. During last year, I was experimenting with Polymer and Paper elements to give it a material design makeover. However, I found it to be pretty unstable (it was still in development stages so it might have fixed its issues with its current stable version) and very heavy for the simple and minimalistic product I wanted. I ported most of the stuff I needed into native [Dart](https://www.dartlang.org/) and now I find it to be much more responsive.

I plan to add more features to *Spi.to* during the coming months and I really want to replace the back-end with a server-less infrastructure at Amazon Web Services (AWS). **AWS** is among my top priorities in the **To-Learn** list for this year and I would love to create more projects utilizing the myriad services available by Amazon, especially the new **API Gateway**, **Lambda functions** and of course the awesome **Simple Storage Service (S3)**.

One thing I wanted to do for a long time was to find a way to edit my CV (resume) easily without booting into Windows just to use Microsoft Word and without searching for a Latex template that would most probably not match the design I wanted. I decided to turn to the easiest platform for customizations and easy updates, the web. I replicated the design of my old CV using only HTML and CSS, leading to a pixel-perfect document which is amazingly easy to update and also customize its appearance in-detail. You can find my new CV version at [lambrospetrou.com/cv/](https://lambrospetrou.com/cv/).

In conclusion, I would like to take advantage of my time working at Amazon and be certified as an [AWS Certified Professional](https://aws.amazon.com/certification/), which will boost my knowledge and skills around cloud computing and at the same time open many more doors career-wise. As it seems **AWS** is the dominant cloud computing provider and it has no plans to cease existing for the foreseeable future.

It is nice to be in production mode again :)
