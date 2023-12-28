---
title: "Template for writing technical RFC docs"
description: "A battle-tested template I have been using for writing technical RFC documents."
---

**Table of contents**

- [A. Get the template](#a-get-the-template)
- [B. Sections overview](#b-sections-overview)
- [B. Template preview](#c-template-preview)

## A. Get the template

Download or copy the full template at [this Google Document](https://docs.google.com/document/d/1W5VkHlFxqwZ0b80IDayO1D73ECAxGM-DzCwvoZNygzk/). Use it as you wish 😉

Once you [open the template](https://docs.google.com/document/d/1W5VkHlFxqwZ0b80IDayO1D73ECAxGM-DzCwvoZNygzk/):
- To use it with Google Docs: **File** (top left) > **Make a copy**
- To use it with Microsoft Word: **File** (top left) > **Download** > **Microsoft Word (.docx)**

## B. Sections overview

### 1. Title and reviewers

At the top of the template, you should have a clear title of the proposal.
I usually prefix it with `RFC - <title>` to make it easier to search later in Google Drive.

After the title there is information about the state of the RFC, followed by required and optional reviewers status.

The state of the RFC can be one of: `Draft`, `Under-review`, `Approved`, `In-progress`, `Completed`

The first three states are used during the review of the RFC, and once approved we proceed to the next two states which refer to its implementation and rollout.

The list of reviewers should include:
- Name or email of reviewer
- Team name of reviewer
- Review status: `not-reviewed`, `in-progress`, `approved`, `declined`
- Review date (date when the final decision was taken)

<figure>
  <img src="/articles-data/2023-11-18-rfc-template/title-reviewers.png" title="RFC template title and reviewers section" alt="RFC template title and reviewers section" />
  <figcaption>RFC document title and reviewers section.</figcaption>
</figure>

### 2. Table of Contents

I always include a table of contents to make it easy to jump to sections, and give an overview of what's in the document.

**Note:** In Google Docs, make sure you "refresh" the table of contents widget after adding/removing sections in the document because it doesn't auto-update. You can refresh it by clicking anywhere inside the table of contents, and clicking the "refresh" icon at its left side that will appear.

### 3. Overview and context

In this section you should describe the problem the RFC is addressing, and provide necessary context so that people unfamiliar with it can understand the benefits of implementing the RFC.
There can be sub-sections to give more detailed information.

#### Glossary and terms (optional)

Provide some explanation of terms that will be used later in the doc.

#### Customer/Business impact (optional)
Provide evidence of customer impact or business impact that justify working on this RFC.

### 4. Goals and Requirements

Explicitly mention what is in-scope and out-of-scope for this RFC.

### 5. Timeline and Milestones

Provide rough estimates and track key milestones for the RFC and its implementation, including its rollout. This section is to be updated over time as the RFC progresses from review, to approval, to implementation, and to its rollout.

### 6. Proposal solution

#### High-level overview

This section describes the proposed solution. It should be enough for everyone to understand what the RFC is proposing, and how it’s solving the problem while satisfying the goals and the requirements mentioned above.

This section should not go into all the technical details (see relevant section below), since some stakeholders (e.g. product managers, directors, VPs) might not be technical.
It should however provide enough details to be complete on its own, so it’s not just a vague description of a solution.

Put 1-2 high-level diagrams explaining the solution, but not too many, and describe the key components and the core process/flow of the solution.

Most of the non-technical folks can stop reading here. Maybe they can also read the questions section at the end, but they shouldn’t need to read the technical details section below.

#### Technical details

This is the meat of the RFC for the technical folks. There should be sub-sections for all key aspects of the proposed solution.

Each sub-section should cover one key component of the solution and give details to fully understand how it will be implemented. Include diagrams, code snippets, schema definitions, and decisions taken with their reasoning tradeoffs.

#### Open Questions (optional)

This section contains open questions about the technical implementation that are yet to be investigated or decided, but won’t materially change the proposed solution itself, so it doesn’t block its review and approval.

### 7. Alternative options (optional)

This section should give some details about alternative options that were researched and rejected.
You might not need this section, if the proposed solution is straightforward or it doesn’t really have many different alternatives worth mentioning.

There can always be discussion and changes in the technical implementation in the previous section, but this section is for significantly different approaches to solving the original problem.

### 8. Frequently Asked Questions

This section should contain questions that you expect folks to ask, or are being asked a few times after publishing the RFC so that you don’t repeat yourself in comments, and can just point folks to this section.

I usually prewrite some questions I expect that colleagues will have, and populate it with more as people review the document.

### 9. Appendix (optional)

I rarely put an appendix into my RFCs because usually I see other folks abusing it by putting too many unnecessary details.

The appendix can be used for more detailed diagrams, screenshots, tables of data, and in general secondary information that supports the rest of the RFC.

Depending on how many implementation details you need in the RFC you usually don’t need to even have an appendix, since it leads to annoyingly long documents.

When you need it though, include it at the end of the document and keep it tidy with sub-sections.

## C. Template preview

Download or copy the full template at [this Google Document](https://docs.google.com/document/d/1W5VkHlFxqwZ0b80IDayO1D73ECAxGM-DzCwvoZNygzk/). Use it as you wish 😉

<br/>
<iframe width="100%" height="600px" src="https://docs.google.com/document/d/e/2PACX-1vSum2Rt8nnPsC7BzKUccYU1wjqiEZmlg7x75oRPf6mYJDilwGSBE96mzUrAHvQaK3Tdgq6RLVQzYpMi/pub?embedded=true"></iframe>
