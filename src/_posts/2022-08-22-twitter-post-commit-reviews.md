---
title: "Twitter 📝 Post-Commit Reviews by Cindy Sridharan"
description: "My notes on the article Post-Commit Reviews by Cindy Sridharan as posted in my Twitter."
---

Check the original Twitter thread at [@lambrospetrou/status/1561752140909002757](https://twitter.com/LambrosPetrou/status/1561752140909002757).

---

**Post-Commit Reviews** - https://copyconstruct.medium.com/post-commit-reviews-b4cc2163ac7a

A great, and IMO controversial, article by [@copyconstruct](https://twitter.com/copyconstruct) on why it's better to code review after a change is merged into trunk. I have my opinions as well, so let's dive in.

I spend a lot of time reviewing my team's diffs, and I am a huge advocate for its benefits. So, this article caught me off-guard. After reading it, though, I see its perspective, but I still think that this can rarely work in practice.

I think the article should first start with the _challenges of post-commit reviews_. Right now, it paints a very nice picture at the beginning, but reading it to the end shows how hard it would be to actually implement.

## 👎 Challenge 1: High-Functioning, High-Trust Environments

Not only do the team members need to fully trust each other in shipping unreviewed code, but they also need to accommodate for onboarding new hires to this way of working.

## 👎 Challenge 2: Investment in Automation

Without great tooling and automation, post-commit reviews cannot work. It has to be trivial to revert commits, especially multiple ones. Doing this in monorepos is even more complicated.

> managing commits becomes a lot easier in non-monorepo environments, since the automation required to revert commits doesn’t require research paper levels of complexity.

+1. This has been my experience as well.

## 👎 Challenge 3: Strong Cultural Scaffolding

This challenge is covered in a pro-point. Quoting the author:

"Getting to a point where post-commit reviews are a reality requires a strong cultural scaffolding. At the very least, it requires:

- a culture of collaborating [...] prior to code implementation via a design document.
- consensus around aspects like style-guide, coding idioms, concurrency primitives etc.
- investment in better automation practices and tooling."

## 👍 Benefit 1: Focus

> Being able to merge pull requests in quick succession ensures that the developer can iterate faster on the feature they are developing

Can't argue with this.

> Another benefit [...] is reviewer focus. [...] being pinged every 10 or 15 minutes for a review can hinder the productivity

This can be fixed. Open a PR, and continue working on the next PR. Or use a stacked-diffs tool like Phabricator.

## 👍 Benefit 2: Encourages Better Development Practices

This is the other side of the same coin as Challenge 3 above. Having a super disciplined team is required for post-commit reviews, so you get that as a benefit too.

## 👍 Benefit 3: Detect More Bugs Before Code Review

Undecided 🤔 I see how post-commit/pre-deploy testing can expose more issues, but I guesstimate them to be the minority. You should anyway test your code before sending it for review/merging.

A concern, fitting the trust point. With post-commit reviews, you need to trust your colleagues to actually go back and change big chunks of code if needed. I worked with a few people that would NEVER do that, and such cases are blockers.

---

In conclusion, I can see how post-commit reviews can speed up a team. But it requires **all** of:

- great tooling
- trust within the team
- pre-commit decision-making processes (e.g. RFCs, design docs)

If you have these, go for it 🚀
