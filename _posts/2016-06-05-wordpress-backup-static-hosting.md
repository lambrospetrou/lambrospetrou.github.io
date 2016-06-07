---
title: Backup your Wordpress and serve it as a static website
description: An easy way to backup your Wordpress installation and serve it as a static website.
url: wordpress-backup-static-hosting
---

A few months ago I started migrating all my projects and websites into AWS. The last thing standing was my old wordpress blog (hosted at **mastergenius.net**, not alive anymore). Today, I decided to make a final backup and create a static version out of it and ditch the VPS I have running just for that.

It turned out to be extremely easy :) 

## Backup all content

Apart from serving the content as static website I wanted to have the posts in a form that can be easily imported later back in Wordpress and also a format which is easy to parse and read using a text editor.

I just wanted the **text**, which is the heart of any article anyway, so I just did the usual **export** feature of Wordpress as described in the [official export documentation](https://en.support.wordpress.com/export/).

A full folder copy is recommended too, you know just in case I want to revisit any files, images or code!

## Serve as static website

There are a lot of ways to dump an active wordpress installation and several plugins that allow you to do this conversion easily. I just took the simplest way and used the well-known **wget** Linux command line tool (original Quora question link with the command is in the References section).

```bash
wget -k -K  -E -r -l 10 -p -N -F --restrict-file-names=windows -nH http://active-wordpress.domain.com
```

After executing the above command I deleted all the unnecessary files, stripping down the whole site in some MBs.

I just uploaded the static files to [Amazon Simple Storage Service - S3](http://aws.amazon.com/s3/) and that's all!

Zero-cost hosting :)

## References

* [How do you export a WordPress site to a static HTML?](https://www.quora.com/How-do-you-export-a-WordPress-site-to-a-static-HTML)
* [Wordpress export documentation](https://en.support.wordpress.com/export/)