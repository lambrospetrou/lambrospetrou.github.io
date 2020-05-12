---
title: The worklog format 1.0
description: I briefly describe the structure of my worklog file and why it works for me.
---

Last week I wrote about [note taking being my productivity tool](https://www.lambrospetrou.com/articles/digital-braindump-and-productivity-tools/), and then about [the worklog](https://www.lambrospetrou.com/articles/best-tip-the-worklog/) being my most important daily document.

Since then, I had several friends and colleagues reaching out asking specifics about the worklog's format and how I structure its content. I will try to briefly describe what I use hoping that it can help others as well.

Before we dive in, I would like to reiterate once again that I don't really believe in the **one size fits all** idea, and what works for me might not work for you. However, seeing the structure I use might inspire you to find one that works for you.

## What?

First of all, I urge you to read [the original article explaining what the worklog is](https://www.lambrospetrou.com/articles/best-tip-the-worklog/) to better understand the rest of this article.

The worklog contains essentially three things:

1. Meeting notes
  - Who was in the meeting
  - When was the meeting
  - What was said during the meeting
2. Activity log
  - What did I do in each day
3. Todo items 
  - Tasks for the next 1-3 weeks (quite fine-grained)
  - Couple of long-term things that I need to break down

## How?

I use the following format for my worklog file:

```markdown
# Worklog 2020-01-01 to present

## Meetings

### 1:1 with manager <userxxx@abc.com> @ 2020-05-10

- topic 1
- topic 2
- action item A
- action item B
- ...

### Meeting for feature XXX @ 2020-04-29

- Who
  + nameA <usera@abc.com>
  + nameB <userb@abc.com>
- thing 1
- thing 2
- action item A
- agreements
  + a
  + b
- open questions...

## Activity log

- Meeting for XXX (2020-04-29)
- Worked on feature Y (2020-04-30)
  + <Task URL> 
  + <Code review URL> implements ZZZ
- Watched training videos
  + infra (2020-05-02)
  + networking (2020-05-03)
- Investigated YYY (2020-05-03)
  + <link to the file containing details or to the internal issue>

## TODO

- implement DDD
  + <internal issue link>
- training videos
  + <link>
- do a deep dive on XXX
```

As you see, it's quite simple, three separate ordered lists.

You will notice that the meetings section orders the meetings by date in descending order (latest at the top), whereas the activity log section orders items by date in ascending order (latest at the bottom). This is super handy for me because over time the file grows, and in my productive months it can get hundreds of lines—each worklog file spans a period of 6 months. This structure allows me to instantly scroll to the top and start writing about the current meeting, or scroll to the bottom and start writing about today's activities, without wasting time figuring out where I need to write. Almost all the text editors and IDEs have shortcuts to move at the top and bottom of a file which makes this approach efficient.

Regarding the todo section, I try to keep it short and not have more than 10 items, since at that point it becomes a backlog. I want items that I will work on during the next 2-3 weeks ordered in priority, with top being the next one to be done. Having said that, I almost always find myself having 1-2 items that are long-term oriented, for which I need to do some kind of investigation. It's useful to have them here to remind myself to do a bit of work every day.

Every morning, I open the worklog, remind myself what needs to be done by going over the todo section, and I make sure it is synced with my team's backlog in case priorities shifted.

That's it folks, I hope this is helpful!
