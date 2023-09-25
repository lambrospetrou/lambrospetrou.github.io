---
title: "Writing docs"
description: "I like writing detailed documentation. This article explains why you should too."
---

**Table of contents**

- [Context](#context)
- [Future me will thank me](#future-me-will-thank-me)
- [Onboarding new joiners](#Onboarding-new-joiners)
- [Asked twice - asked often](#asked-twice---asked-often)
- [Conclusion](#conclusion)

## Context

> what’s your motivation to create such good docs?

A couple of days ago, a colleague asked me the above question.
That was the 4th person commenting positively within the same week about that specific wiki I wrote, so I decided to write down an article about my thinking.

A bit of background, to set the stage right.

I personally **love writing detailed documentation** about the projects I do.

By "writing docs" I refer to:
- Commenting code with explanation and reasoning for things that are not obvious.
- Putting plenty of information in issue tracking tools (e.g. Jira, Github Issues), and pull-request descriptions, such that there is clear trail of what I researched, what I did (even if it didn't work out), and what's remaining.
- Writing comprehensive wikis and runbooks for the bigger type of projects I work on.

This article is not an exchaustive list of benefits for having good documentation.
Plenty of longer posts do that, and thousands of debates took place regarding source code comments, in favor and against.

The rest of the article enumerates the key reasons why I like writing docs, and hopefully they will convince you to do so as well.

## Future me will thank me

Reason #1 is myself.
How selfish am I, right?

I first and foremost, write these docs for myself.
After a few weeks of not working on a project, I always forget things. 

Such things include:
- System architecture of the service, which services it interacts with upstream/downstream, and what are the key properties of the service.
- Key project/service references to documents, issues/tasks, dashboards, oncall handles.
- How do certain intricacies of the system work? Wiki sub-pages for important topics that I will almost definitely forget in 6 months, and I will need to remember when debugging a service at 03:00 in the morning after getting paged.
- Common operations like building and deploying the service artifacts. I know we all wish that all services had a single command, and that command was the same across all codebases. Unfortunately in the real world things are hairy. Jumping from project to project, in different languages, and using different tooling makes it harder to remember everything. Give me copy-pasteable commands any day of the week!

There are many more things that I document, but these should already make it clear that there are plenty of things you need as an engineer that you will inevitably forget after a few months.

Having detailed and clear step-by-step docs is the easiest way for me to ramp up again on the project's main aspects when coming back to it after a while.

## Onboarding new joiners

No matter how junior or senior someone is, when you join a new team or an existing long-running project you have to spend a lot of time building up context.

There is a lot of tribal knowledge that someone working on a project builds up, and someone new joining the project doesn't have.
It's awesome when you have nice colleagues that can answer all your questions promptly, but we are not always so lucky.

Many projects are single-person projects, so even though a team has several folks, only that person knows most of the project's specifics. If that person is unavailable, good luck to you 😅

I witnessed a project where the main engineer was on vacation for a few weeks, and nobody else knew much about the project, so the project was put on-hold until they returned. To me, this is a huge no-no, and a red-flag!

This is common, and works fine in scrappy small startups where each engineer is essentially a department on their own, but as you grow, and as more folks join a team, it's important to increase the [bus factor of the team](https://en.wikipedia.org/wiki/Bus_factor).

I personally treat documentation as my always-available assistant to explain things and provide handy tips.
Thus, I always put effort in keeping docs updated.

Even basic operations like compiling code, running tests, and which dashboards to explore, are a great initial boost.

Having nice runbooks makes the onboarding process smoother, and you can focus more on the core parts of your onboarding, eg. understanding the business aspect of the product.

## Asked twice - asked often

When I work on a project where more than 2-3 people are involved on a daily basis, it's almost certain that every few days someone will ask the same question as someone else did before.

Some will even ask the same thing multiple times spread out across days.
People forget easily.

My strategy is that if someone asks me the same thing twice, or I get the same question from two different people, I quickly write it down in our wiki so that the next time someone asks, I can just deeplink them to the wiki entry.

This not only wastes less time in the future by not typing the answer over and over again, but it also pushes more people into the wiki.

My grand-plan is that gradually folks will put the wiki into their own daily workflow as well.
They will use it first to search for what they want, and ideally they will also start contributing to it their own tribal knowledge.

Even if I turn 1 person per month to improve our wiki, I consider it a win.

## Conclusion

The main drawback of writing docs is that someone spends time doing it.
But, in my experience, once you make wiki-writing just another item in your daily workflow, it becomes invisible.
It's not a chore that you do separately, you do it continuously in small amounts.

**Taking notes and writing detailed docs is my superpower.**

I use my personal notes tens of times per day, and I use internal wikis as my entrypoints to most things.
You should start too.

If you want to read more about my personal notes, and the format I use, checkout the following articles I wrote in the past:
- [Best tip I received — The worklog](https://www.lambrospetrou.com/articles/best-tip-the-worklog/)
- [The worklog format 1.0](https://www.lambrospetrou.com/articles/the-worklog-format-1/)
