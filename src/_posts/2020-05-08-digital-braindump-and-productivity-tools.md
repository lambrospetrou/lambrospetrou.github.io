---
title: My digital braindump and productivity tools
description: The best productivity tool I use to hold my digital braindump is plain and simple text files synchronized across devices.
---

I thought about writing this article many times over the years but I always thought it was not really something worthy of writing. However, after I saw the announcement for [Github Codespaces](https://github.com/features/codespaces) a few days ago I decided to write it because that announcement resonated so much with my daily workflow.

I will describe what I have been using for the past 5 years as my **productivity tool**, to keep my thoughts, notes, and ideas organised.

## What do I write down?

See below a non-exchaustive list of things that I take notes for over time:

- I write down everything I do during my day at work (**extremely crucial** and deserves an article on its own)
- Draft articles for my website
- Ideas for side projects
- Business ideas I think (and then reject)
- Material to read, watch or listen for several subjects
- Research I do on investments
- Notes for flats, houses, jobs when I am in the lookout
- Many many more things...

I am pretty sure everyone encounters at least a few of the items listed throughout the day.

There are many productivity tools available, especially mobile apps, that are supposed to simplify your life, but almost everything I used, and I tried hundreds of them, always has something that ruins it for me.

As a software engineer I spend a lot of time in text editors working with source code. At some point I realised that the best productivity tool was sitting right in front of me... That is **text files**.

In the old days people were using pen and paper to take notes, and many still do, including myself! Pen and paper is easy, quick, and everywhere.

In addition, one of the requirements of any productivity workflow is to have your notes available on all of your devices. The best ideas always come at the weirdest time and place.

## What do I use?

A text file is very similar with pen and paper. Text file editing is available on every device type and it's quick and easy to write anything.

File synchronization across devices is a solved problem nowadays with services like [Google Drive](https://drive.google.com/) and [Dropbox](http://dropbox.com/). In the software world we also have source code versioning software like [Git](https://git-scm.com/).

Many of the applications available restrict you in the type of notes you can take, the format to write them in, searchability might be limited, they have size limit restrictions, and they might not even support your device or operating system.

Having said all this... What do I use?

My productivity tool is basically a directory named `notes` consisting of several text files, organized sometimes in other sub-directories. Initially, I had this directory inside Dropbox, then Google Drive, and now in a [self-hosted git repository](https://www.lambrospetrou.com/articles/self-hosted-private-git/).

I love this approach because not only it's extremely easy to write down anything at any time, but I can also put additional files or material inside that directory without any restriction. All text editors provide amazing search capabilities, from simple file name searching, to fuzzy text search of the content of your notes.

You can write your notes in formats like [Markdown](https://guides.github.com/features/mastering-markdown/) or [AsciiDoc](https://asciidoctor.org/docs/what-is-asciidoc/) and have your editor render them nicely. Many editors also support displaying images or PDFs inline, and you have the full power of your device to open any type of file inside this directory. Again, there is no restriction of what files to put in your directory.

So, long story short:

- I use [Visual Studio Code](https://code.visualstudio.com/) as my editor rooted at the `notes` directory.
- I write most of my notes in Markdown (`.md`) format.
- I have one file named `scratchpad.md` which acts as my temporary canvas. This is probably my most edited file. I do anything temporary in here, from drafting medium-to-long emails before putting them in Outlook, writing long messages before pasting them in Slack/Mattermost/Facebook, and whatever else that needs a temporary space.
- I have my passwords inside [encrypted files](https://www.lambrospetrou.com/articles/encrypt-files-with-password-linux/).
- I use a self-hosted git repository, but I am considering moving to a [Github private repository](https://github.blog/2019-01-07-new-year-new-github/). Using git is powerful for me because I can immediately jump to any previous version of any file in the directory from the beginning of time.

### What else?

The approach described above covers almost the entirety of my needs. However, there are two things that I do in other tools.

1. Tiny notes that I need to take while on the move, i.e. walking to the train or the bus, or standing in the elevator, etc. I use [Google Keep](https://keep.google.com/) for this but any other lightweight note taking app with synchronization across devices works absolutely fine. Once I am on my desk, I move things into my `notes` directory as needed.
2. Calendar events. I still believe that events belong into a traditional calendar app providing core features like reminders and recurring events. I use [Google Calendar](http://calendar.google.com/).

## Conclusion

I know there are a million productivity tools, I tried most of them, and I also know that what I described is not rocket science distilled. It's not even something new, people have been using similar approaches for years. For example, I find [this Emacs Org-mode presentation](https://www.youtube.com/watch?v=oJTwQvgfgMM) from 12 years ago fascinating.

However, I do hope that this article will convince you to try a simple approach, or maybe combine 2-3 complimentary tools together to get the most out of your day. There is no need to force yourself to go all-in with an application that puts restrictions on you because it's supposed to be the best productivity tool of the month.

Now you can probably see why Github Codespaces triggerred my brain. My favourite editor will be available across all my devices (laptop, mobile, tablet) through a web browser allowing me to edit my notes directly (assuming I use Github) from anywhere 🚀
