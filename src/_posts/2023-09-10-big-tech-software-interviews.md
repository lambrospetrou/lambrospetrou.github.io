---
title: "How to pass the interview for software engineering roles in Big Tech"
description: "Practical information and guidelines in how to prepare, and pass, the software engineering interviews in Big Tech companies."
---

Over the past decade, I have gone through tens of interviews myself as an interviewee at small companies, startups, and Big Tech companies, from junior to Principal level roles. I also completed more than a hundred interviews as an interviewer during my time at Amazon/AWS, Meta, and Datadog.

Recently, I had discussions with several friends and colleagues about interviewing for software engineering roles, from entry level to senior levels. Some of them were going through interviews right now, and others asking about how to get better in interviewing in general.

So, I decided that instead of copy pasting resources every time, and having the same discussions repeatedly, I should write an article putting down all the generic advice I would give them. This way, our 1:1 discussions could focus on the specifics of their role, company, and skill-set instead.

This is NOT an exchaustive reference of interview preparation material.
This is the advice I give to friends and colleagues, and how I personally prepare for interviews.

It works for me, it worked for some of my friends, so it might work for you too.

**Table of contents**
- [Proper preparation is worth it](#proper-preparation-is-worth-it)
- [Interview process](#interview-process)
- [Coding](#coding)
- [System Design](#system-design)
- [Behavorial](#behavorial)
- [Conclusion](#conclusion)

<div class="upsell-section">
    <p>Prefer a personalized 1:1 session for tips, or a mock interview?</p>
    <div class="consulting-cta-container">
        <!-- <a class="cta-interview" href="https://cal.com/lambrospetrou/interview-preparation-1h" target="_blank" rel="noopener noreferrer"> -->
        <a class="cta-interview" href="https://go.lambros.dev/book-interview-prep" target="_blank" rel="noopener">
        Book interview preparation session
        <small>1:1 mock interview (coding or system design)</small>
        </a>
    </div>
</div>

## Proper preparation is worth it

There are myriad of angry engineers online crying out loud that the current state of software engineering interviews is a mess. Some excuses they usually use against the coding interviews (which I do not agree with - I am pro-interviews!):

- Why would you ever put a tenured engineer, writing code for years, sometimes decades, through a 40-minute process writing code in a collaboration doc or a whiteboard...
- Why would you ask interviewees to explain and describe systems that they would probably never built in their day to day job...
- Why would you not just believe that if someone says they are ninja coders, they can actually write code...
- Why would someone even spend 1-2 months preparing for a stupid interview just to get into a big tech company, if they never use any of that knowledge day to day...

I am **not** going to debate the pros and cons of the interview process in this article, although I should write one in the future.

🙏🏼 For now, get over it! Big Tech companies, and even smaller ones, follow a pretty much standardised hiring process.

**And that's a good thing! As long as you can devote some time to prepare.**

Preparing for the interviews, and actually [getting a job in a big tech company often means 3-10x times higher total compensation versus a local small company](https://blog.pragmaticengineer.com/software-engineering-salaries-in-the-netherlands-and-europe/) 💰💶 

For me, and I am sure most people out there, this is effing important.

Do you not care for money, or getting a job in Big Tech, fine, stop reading now, close the tab, and/or [send me an angry tweet how much you disagree](https://twitter.com/LambrosPetrou).

Note: Big Tech means [FAANG](https://www.investopedia.com/terms/f/faang-stocks.asp) in some circles, but in this article I refer to most multi-billion-dollar-revenue tech companies (e.g. Datadog, Cloudflare, Meta, Google, Stripe, Shopify).

## Interview process

The interview process in these companies is (mostly) the same.
There are small (or big) differences at the behavorial aspect of the interviews, and the difficulty of questions asked. Other than that, preparing for the top-tier companies will make your interviews with smaller companies a walk in the park. 

Usually the whole interview pipeline consists of:
1. Coding (2-3x)
2. System Design - Architecture (1-2x) &mdash; for Senior+ levels
3. Behavorial (1-2x)

I am going to focus on the above parts of the interview process.
Each interview usually lasts 45 minutes, with some companies extending it to an hour.

Some companies might have interviews that are more conversational, or oriented around specific technologies (e.g. Java and JVM internals, machine learning algorithms and frameworks).
Those need dedicated preparation and it really depends on the company you are interviewing with, so I am not going to get into those.

## Coding

Coding interviews are the ones getting the most backlash by interviewees. Unless you are working in some deeply technical core Computer Science role, you are probably not exercising your coding problem solving skills at the level required for these interviews.

Therefore, you need to dedicate time preparing for this interview.

How much, depends solely on your skill, experience, and how often you practice.

As an example, after 5 years of working at Amazon/AWS, even though I worked at a technical product (lots of tree traversals, data transformations), I had to spend about 1 month practicing problem solving (almost) daily.
This is because for 5 years, I had **zero practice** in coding interviews.

Next time I switched jobs was 2.5 years later, and that time I only needed about 2 weeks of preparation, mostly reading past material to refresh my memory.
That's because I had been doing 1-2 interviews every year just for practice, and was solving a few problems every couple months.

### Coding - during the interview

During this interview, you will usually use a coding collaboration tool like [Coderpad](https://coderpad.io/) or [HackerRank](https://www.hackerrank.com/) where both you, and your interviewer can collaborate on the code.

Initially, the interviewer will paste (or just verbally explain) the problem statement.

Once they give you the problem, this is where the "dance" starts, and it's your turn to shine 😉

#### 1. Ask clarification questions

As straightforward as it sounds, I interviewed many candidates that completely skipped this step and jumped into the code.
Needless to say that most of those candidates failed spectacularly.

**You have to ask clarification questions.**
It's literally an evaluation checkbox in the interviewer's handbook for your feedback.

Ask questions.
- edge cases
- size of the data
- invalid inputs
- input and output formats expected

Keep asking questions until the problem is 100% clear in your mind!

#### 2. Explain your solution with examples before code

Another mistake candidates often do is not explaining their full solution before coding it.

There are several benefits in explaining your solution verbally, and actually testing it with at least one example input.
- It's important that you show how you think. How you approach a problem and walk through different solutions until you find the correct one.
- If you missed something in your solution, explaining it might reveal it.
- If you run out of time coding the solution, your interviewer will still know that you actually did think of a correct solution.
- If you run out of time and cannot test your code at the end, you still need to show your interviewer that you can test an input with your solution and prove that it works. Do it early to get it out of the way.

This shouldn't be a 10-minute discussion.
It has to be a very short illustration, max 2-3 minutes, of how the solution works with an example input.

If you cannot find a solution within the first 2-3 minutes, it's crucial that you keep talking.

Keep talking your thoughts, what do you have trouble with, which part of the solution works, and at which part are you stuck.
You need to keep the interviewer engaged and in-sync with your thinking.

This not only gives you points in working-together and collaboration, but more importantly makes it trivial for the interviewer to steer you in the right direction in case your partial solution is completely the wrong one, or to give you the hint missing to fully solve the problem.

Don't take the above point to the extreme either.
If you need 1-2 minutes to think for yourself, that's totally fine.
Tell the interviewer that you want 2 minutes to think of it, or write some notes down.
You just need to **keep the interviewer in the loop**.

Before moving on, I also ask the candidates to tell me the complexity of their approach in terms of time and space.
After writing the code, I ask them again to reason about its complexity and compare it with the original answer.

#### 3. Write the code

At this point you should have a clear idea of the solution you want to code.
You should never start coding before you have a crystal clear understanding of the problem, and its potential solution.

Throughout the session, remember that you need to keep the interviewer in-sync with what you are thinking and doing.

While you write the code, say the highlights of what you are doing.
For example, if you are going to iterate a list and do some transformation, say that and then write the code for it.

Many candidates have trouble knowing what to say and when while coding.
One easy way for me to think about this, is that if I would write a comment in the code normally, that's what I say out loud.

Random tips:
- In these 10-15 minutes you usually just write 10-30 lines of code. You don't need fancy classes, and hierarchies of inheritance. However, you do need to write simple and clean code that is easy to understand.
- Write small functions to abstract away complexity from the function that solves the main problem. For example, if you need to iterate a string and parse something as part of a bigger solution, move the iteration and parsing in its own function to keep the main business logic simple.
- If you forget about a specific language method name, or what the arguments are, don't panic. Tell the interviewer something like _"I know that there exists a method YYY, but cannot remember its definition. Can I write XXX to represent that method and come back to it later?"_. Almost always the answer will be yes. If the tool supports running and evaluating the code, then this problem goes away since you can try and find the right method. Also, some interviewers will allow you to even google the method name (make sure to ask if you can do that though!).
- If you are able to run the code written, then put `print/console.log` statements in your code and run it judiciously to make sure it works.
- Don't spend more than 2-3 minutes at the same line of code, typing and deleting without progress. Stop and think if needed. Ask the interviewer a question. Try to get out of your blackout.

Typing the code of the solution is usually the easiest part.
You understand the problem.
You thought of the solution.
You just translate words into code at this point.

Remember to be friendly, engaging, and talk to the interviewer.
If you do this, they will consiously, and unconsiously, help you.
Either giving you a hint when they see you stuck, or just being there acting as your [rubber duck](https://en.wikipedia.org/wiki/Rubber_duck_debugging).

#### 4. Walk through the code and test it

Hopefully, you still have time after writing the code.

It's important that you now do a quick walk through the code written, verbally explaining what each step does, and making sure it implements the previously discussed solution.

If you want to get all your points, you should also do a run-through with an example input.
Show how the input will be processed at each line, similar to how a debugger in an IDE would work in a step-by-step execution.

Before moving on to the next problem, assuming the tool supports it, make sure to run your code and confirm that it does the right thing.

This can be done trivially by just calling your function with sample inputs and printing out the returned values.
No need for fancy test frameworks to remember. For example, in Javascript this is how I do it:
```javascript
function solve_problem_xxx(input) {
    // ...
}

console.log(solve_problem_xxx(/* input 1 */))
console.log(solve_problem_xxx(/* input 2 */))
console.log(solve_problem_xxx(/* input 3 */))
```

#### 5. The interviewer interrupts you to move on

There are cases where the interviewer will interrupt you after 15-20 minutes to move on to a different problem.

This usually happens when they have more questions to ask you, and in the interest of time they want to move on to cover more topics.
I usually tell the candidates how many questions we will do right at the beginning, so if your interviewer doesn't say anything, it might be good to ask them yourself so that you can plan your time.

If you did all the above steps, you might not lose any points even if the code is not fully finished.
You clarified the problem, explained the solution, reasoned about its complexity, showcased that you can do a dryrun, and you proved that you can write simple and clean code.

Having said that, if you only wrote very few lines of code, you will lose points.

This is a coding and problem solving skills interview, so you need to prove that you can solve problems, and write the code for their solution.

So, move with urgency, be fast, and be methodical.
Follow the above steps, and practice.

### Coding - preparation before the interview

There are myriads of coding interview books, like [Elements of Programming Interviews in Python](https://www.amazon.co.uk/Elements-Programming-Interviews-Python-Insiders/dp/1537713949/) and [Cracking the coding interview](https://www.amazon.co.uk/Cracking-Coding-Interview-6th-Programming/dp/0984782850). There are also hundreds of online coding platforms dedicated to coding interviews like [HackerRank](https://www.hackerrank.com/), [Leetcode](https://leetcode.com/) (probably most famous). 

I never liked Leetcode, and only use HackerRank from time to time to get some practice using an online evaluation tool instead of coding locally on my laptop.

After reading tons of books and trying these platforms, I personally wholeheartedly recommend to everyone that asks me how to prepare, to buy the [Elements of Programming Interviews in Python](https://www.amazon.co.uk/Elements-Programming-Interviews-Python-Insiders/dp/1537713949/) book.

It has versions in other languages (e.g. [C++](https://www.amazon.co.uk/Elements-Programming-Interviews-Insiders-Guide/dp/1479274836), [Java](https://www.amazon.co.uk/Elements-Programming-Interviews-Java-Insiders/dp/1517671272)), but I always recommend the Python version since the answers are very simple Python code that most programmers should understand and be able to translate in the language they use.

This book contains a lot of problems for every category of questions used in the interviews.
The problem difficutly ranges from easy to super hard.

There is even a sample guide at the front pages that suggests problems to solve from each category depending on how much time you can spend on preparation.
This is super useful to give you an idea of which problems are really core, and which ones can be left for later.

What I like the most about this book, is that there is an explanation of the solution, and the solutions are often small and clean. 
This is in stark contrast to the "Cracking the coding inteview" book that used to have tens of lines of Java classes that just take away focus from the actual problem being solved.

Disclosure: I am not affiliated with the authors of this book, nor do I get any commission promoting it. I honestly just love it, and use it as my sole preparation material for coding interviews for the past 4 years, with success.

#### Need to practice

No matter the book, or the platform, or any other resource you use preparing for the coding interview, the only constant is that **you need to practice**.

Unfortunately, these problems are not something you do on a daily basis (in most roles), and therefore you need to spend time practicing in order to get good at them.

You need to solve a few problems of each category, so that later you can pattern match any given problem to something you previously did.
Even if you don't get identical questions in the interview, you will most likely use techniques that you came across while preparing, which makes a huge difference.

**Put the time. Practice daily, or multiple times per week, for 2-5 weeks depending on your skills.**

## System Design

System design interviews are usually done only for the Senior level and beyond.

These are discussion oriented interviews where you are given a vague problem statement, and you need to come up with a design of a system architecture that solves that problem, and go deep into the technical details of the system.

For example, a common question is asking you to design [YouTube](https://www.youtube.com/).

Of course, you cannot just implement YouTube or come up with the absolute best architecture for it in 40-50 minutes.
However, you need to show your skills in thinking about systems, limitations, constraints, and making reasonable assumptions.

During this interview you will use an online whiteboarding tool like [Excalidraw](https://excalidraw.com/), or if the interview is onsite a real-life whiteboard ✍🏼

There are different variations of this interview.
There is the traditional backend/distributed systems interview, the mobile app design interview, the machine learning system design interview, and others.

Even though I am focusing mostly on the backend system design interview below, everything applies to the rest as well.
The steps, the area of focus, and the tips apply to all the variations.

### System Design - during the interview

Similarly to the coding interview, the system design interview can be tackled systematically, making it easier for you to prepare and handle the interview without depending too much on the interviewer steering of the conversation.

#### 1. Explore the problem and ask questions

Once you get the problem statement, you have to spend the next 5-10 minutes asking questions.

You need to explore the problem as deep and as broad as possible. There are two kinds of questions you should do:
1. Business requirements (also known as functional requirements)
2. Technical requirements (also known as non-functional requirements)

**Business requirements**

This is where you will define the exact problem you will solve, what use-cases to support, what functionality to provide.
Example questions (assuming the YouTube scenario):
- Who is the user of the product?
    - viewers, video editors, ad publishers, ...
- How often and when do they use it?
    - 24/7 vs business hours, timezone based, global, ...
- What can they do with it?
    - upload/view/edit video, comments, download video, like/dislike, playlists, ...

**Technical requirements**

This is where you will understand the scale and constraints of the system you should design.
Example questions (assuming the YouTube scenario):
- How many users per second?
- How many videos "actioned" by each user?
- Size limit per video?
- Acceptable latency per operation?
- Eventual consistency vs synchronous actions

Overall, after this series of questions you should know exactly what the product should do, and the constraints.

The interviewer might tell you to make assumptions instead of answering with a concrete value in some of your questions. 
In that case, try to give a reasonable guess based on products you know in real life (e.g. Facebook users around 2 billion).

The functional requirements are usually a much more limited set of the products you know and use, you would never propose a design for the whole of YouTube.
But you can design a system for uploading, and viewing videos.

The non-functional requirements almost always revolve around the following dimensions:
- Data size (ingestion, storage, processing)
- Throughput (requests per second, number of users, read vs write ratio)
- Latency and consistency (eventual vs synchronous consistency, asynchronous vs synchronous operations)
- Cost (efficiency of the design)

It might be necessary, and almost always suggested, to do some back of the napkin math to estimate number of requests per second, storage needed, and other numbers throughout the session.

For latency-related estimations, use the handy comparison table in "[Latency Numbers Every Programmer Should Know](https://gist.github.com/jboner/2841832)", and during your calculations use rounded numbers to simplify.

#### 2. Provide a high-level end-to-end design

Once you know what the system should do, for the following 5-10 minutes, the goal is to put some high-level design down.

This is important, and I have seen many candidates skip this step, and failing the interview in the end because they ran out of time without having an end-to-end system in-place due to spending too much time in a few components.

Here, you start talking about the main parts of the system.
You are not going into technical details now.
You describe the inputs of the system, main components of the system, and then the output of the system.

For example, for the YouTube scenario, assuming we only need an upload video and a view video page, this could be an initial high-level diagram.

![High level architecture](/articles-data/2023-09-10-big-tech-software-interviews/post-high-level-min.png)

You should not spend more than 10 minutes in this step.

The goal is not to cover every nitty gritty detail of the system, but to show that you understood the problem, you know the main components of the system, and the flow of data from input to output is clear.

#### 3. Flesh out details for each component

This step should take roughly 1/3-1/2 of the interview duration, 20-25 minutes.

You now have to take each component of the high-level design and go one step deeper, fleshing out enough technical details, such that if someone took your diagram and notes after this step they would have a good idea how to start implementing your system.

I recommend you start from the input of the system, and walking through to the outputs, so that you stay focused.
Do not jump from one component to another without being methodical, otherwise you will get confused and leave important things out.

For example, start by introducing load balancers in front of users.

Discuss the routing technique you use if there is any specific requirement.
Do you need any stateful load balancing, e.g. sticky sessions, or is it purely stateless?
Talk about these things as you draw.

Then, you move to the next component in our diagram above, the upload service.

How does the video uploading work?
Probably you need be able to handle GBs of data being uploaded.
Do you have a way to do it in parallel by splitting the video client-side, or is it all uploaded at once, or is it a multi-part upload?

Then, how does the video move to the transcoding service.
Does the upload service store it temporarily somewhere else like [Amazon S3](https://aws.amazon.com/s3/), and only pass the object key to the transcording service?
What's the output of the transcoding service?

I hope it's clear that in this section you go much deeper.
You discuss many technical details as you progress through the system.

General tips
- You should drive the interview. Don't stop talking unless the interviewer interrupts you or asks you something. Show that you can control the interview and know how to describe a system. Do not just wait for them to ask questions and steer you towards a specific path.
- Mention anything that comes to mind, but only draw and focus on main technical details and say that you will revisit the extra specific details in a follow-up round of deep-dives.
    - For example, you shouldn't spend 10 minutes discussing load balancing algorithms if that's not the main problem being solved.
- You again need to cover the system end-to-end. The steps after this one will give you extra points, but this step is the meat of the interview.
- Remember to justify your decisions as you go.
    - For example, if you say that you use Amazon S3 for storing the video, explain the properties it provides and why it suits your needs.
- There are things that you probably won't have expertise. You should still cover what you know, and explicitly mention what you don't know.
    - For example, one time I told the interviewer I didn't know about exact streaming algorithms for videos, but I know they exist, so I would use one of those. I explained that I knew that videos are delivered in chunks, and that there are some manifest lists for the chunks of a video and the player requests the right chunks, etc.

Important aspects to flesh out:
- Load balancers and stateful/stateless scaling.
- Databases used and why, e.g. NoSQL vs SQL RDBMS, data schemas.
- Caching and database sharding.
- Data flow from one component to the next one.
- Point out explicitly if there are message queues (e.g. [Amazon SQS](https://aws.amazon.com/sqs/)), event streaming like [Kafka](https://kafka.apache.org/), or synchronous gRPC calls.

#### 4. Discuss about constraints - limitations - special considerations

At this point, the system should be well-defined with enough detail, and all the components are fleshed out.

For the next 5-10 minutes, you should start discussing about constraints of the system, its limitations, and single points of failure.

Examples:
- If you use a cache what happens if it crashes?
- Can the database selected handle the expected load?
- How is the system impacted if each component fails, i.e. which parts are single points of failure?
- What does recovery look like when a server crashes during video transcoding?
- Discuss optimizations needed at scale, e.g. using a Content Delivery Network (CDN) to offload the delivery of the video parts from your servers.
- What if we want to support 2x the load, or 10x the customers?

#### 5. Deep dive into specific components

At this point, I usually have about 5 minutes remaining, and I ask the interviewer if they need me to go deeper in a specific component or if they have specific questions.

If they say no, don't finish it here.
Show your expertise in building systems, and pick a component and go deeper.

Focus on some of the aspects you brought up in the previous section and explain how you would tackle them.

If they say yes, then focus on that component and open up the discussion to them at this point, making it a dialogue.

#### Guidelines

The following table provides a summary of how you should approach the system design interview, based on the previous sections.

You can of course deviate depending on the company-specific details, but you should still apply the same structured thinking, methodical end-to-end designing, and deep dives into key components to showcase your technical depth.

<br/>

| <span style="white-space:nowrap;">Time spent</span> | Notes |
| ---------- | --------------------- |
| <span style="white-space:nowrap;">5-10 minutes</span> | Explore the problem and ask questions. Focus on business requirements (functional) and technical requirements (non-functional). |
| <span style="white-space:nowrap;">5 minutes</span> | Provide a high-level end-to-end design. The flow of data and actions should be clear end-to-end without too many technical details. |
| <span style="white-space:nowrap;">25 minutes</span> | Flesh out all technical details for all the components. Start from the input of the system, all the way to the outputs. If someone took your diagram and notes after this step they would have a good idea how to start implementing your system. |
| <span style="white-space:nowrap;">5-10 minutes</span> |  Discuss about constraints, limitations, crash recovery and fault-tolerance, special considerations depending on the problem. |
| <span style="white-space:nowrap;">5-10 minutes</span> | Deep dive into specific components if there is enough time. This section can be skipped if the previous one justifies taking more time. |

Overall, keep in mind you will be evaluated for the following criteria:
- Problem exploration and navigating ambiguity.
- Understanding requirements and providing a high-level solution.
- Showcase technical depth and broad knowledge. How well do you know the technologies you choose and how well do you justify using them.
- Ability to communicate clearly when describing technical solutions.

### System Design - preparation before the interview

Preparing for the system design interview doesn't have a single approach.
It's not as simple as the coding interview, which boils down to practicing more questions.

Practicing system design questions helps, but if you don't know much, then you won't know what you don't know 🤯

What I recommend, and what I personally do is the following:
- Look into how your existing company implements a lot of their complex systems. You probably have access to all the internal implementation details, even the people working on them, so you can ask questions. Looking at real systems and how they are implemented is tremendously useful. I personally learnt a lot by researching how several AWS systems are implemented.
- Read engineering blogs from well-known tech companies. This is very vague, I know, and I also have trouble following blogs outside a couple. The following is what I study religiously and then search around in more companies depending on topic.
    - [The Amazon Builders' Library](https://aws.amazon.com/builders-library/): This is one of my favourite resources for learning about distributed systems. These are technical articles taken out from actual Amazon/AWS systems. I actually saw many of the techniques described in these articles in real-life during my time at AWS, and that's why I love them. It's not just marketing bullshit.
    - [Meta engineering blog](https://engineering.fb.com/): Meta's engineering blog is among my favourites. It spans things from AI, to developer tooling, to core infrastructure platforms, to web-scale metric systems. Some of them are high-level and not very technical, but some are super nice.
    - [Cloudflare engineering blog](https://blog.cloudflare.com/): Cloudflare writes amazing technical blog posts about lots of their infrastructure and products. They range from super deeply technical network solutions to high-level architecture designs.
    - Other company blogs: [Datadog](https://www.datadoghq.com/blog/engineering/), [Stripe](https://stripe.com/blog/engineering), pick your favourite tech company.
- Watch the [Systems Architecture Interview](https://www.youtube.com/playlist?list=PLeNDQKdre0oEzLXh8Ksl2Ocoeltx0gD8-) videos by Jackson Gabbard.
- [Understanding Distributed Systems, Second Edition: What every developer should know about large distributed applications](https://www.amazon.co.uk/gp/product/1838430210)
    - I love this book. It does NOT go deep into the topics discussed, but it gives you a very broad coverage of many aspects around distributed systems.
    - This can be a great starting book that will expose you to the many topics you should be aware when designing systems, and then get other resources to go deeper in the topics you feel you have a gap.
- Watch the [Distributed Systems lecture series](https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB) by Martin Kleppmann.
    - Amazing playlist by the author of "Designing Data-Intensive Applications" (DDIA).
    - This series covers core distributed systems concepts (e.g. logical clocks, consensus, replication, quorums) with crystal clear explanations.
- [Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems](https://www.amazon.co.uk/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/B08VKMNDBN/)
    - At this point, this is the bible of distributed systems.
    - This book is not for beginners, or for spending a few days to quickly go over topics. This is an in-depth technical book, focused on the data aspects of applications and database concepts in general.
    - I recommend you leave this last, unless it's really matching the role you are interviewing for. But, you should definitely read it if you have the time.
- [The System Design Primer](https://github.com/donnemartin/system-design-primer)
    - Has a lot of information, examples of questions, and links to lots of other content to help with the system design interview.
- After you have read the above (or even during), it's time to practice more. Just pick any product you use on a daily basis, pick a specific subset of its functionality, and start brainstorming how you would design it.
    - Doing this a few times will help you develop intuition in common solutions and techniques as most system designs have similar components.
    - Try to first think a solution on your own before googling to find out information about the actual implementation.

#### Other resources

The above material should be more than enough to prepare for the System Design interview, but if you want more material, the following are some resources I used a bit (definitely not exchaustively).

- Articles related to distributed systems by Murat Demirbas: http://muratbuffalo.blogspot.com/
- Articles by Marc Brooker: https://brooker.co.za/blog/
- The morning paper: https://blog.acolyer.org/
- The [Preparing for the Systems Design and Coding Interview](https://blog.pragmaticengineer.com/preparing-for-the-systems-design-and-coding-interviews/) article by Gergely Orosz has a lot of references on books, courses, and material to study.
- Free online course: https://www.hiredintech.com/classrooms/system-design/
- Preparation links and resources for system design questions: https://github.com/shashank88/system_design
- System design interview for IT companies: https://github.com/checkcheckzz/system-design-interview

## Behavorial

This interview varies a lot company to company.

Some companies focus on project work, digging into specific work you did, extracting information about your contribution, project complexity, etc.

Other companies focus on the people aspect of things, extracting information about your decision making, conflict resolution, and collaboration skills.

Most companies focus on both 😅

### Behavorial - during the interview

The behavorial interviews are not as straight-cut as the technical interviews explored above.
Therefore, I will just focus on things that apply in general, and things you should be prepared for anyway.

- Be honest. Do not lie that you did things you didn't do. If they actually use your provided references, they might reveal your lies. In most cases though, if the interviewer is experienced, they will pick up your lying and will ask follow-up questions that either you will have to lie even more, or you won't know the answer to. In either case, you lose.
- Be clear and use simple language. Big companies have employees from countries all around the world, and even though English is probably the language used daily, most people have accents. Speak in simple terms so that you are always understood, and keep an ear out if the interviewer asks you the same thing multiple times throughout the interview, since it might be an indication that communication is not clear.
- Don't be an arrogant jerk. Some folks think they are gods of engineering. Even if you are, don't put it in your interviewer's face and show-off. Showcase your skills with concrete data, examples, deep technical explanations, without insulting your interviewer.
- Be specific in your contributions. There are very few products or projects that are delivered end-to-end by a single engineer. When describing some work you did, make sure to explain the overall situation with the product/project, the team, but emphasize on what you did as well. As an interviewer I have to know what your contribution is to the project. I don't care about the project you worked on per se, but about the work you did, or you didn't.
- Use the [STAR method](https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/) when talking about past projects. Explain the **Situation** of the project, the **Task** to complete, the **Actions** you took, and finally the **Result**.
- If you get a question that you have no idea what to answer, say it. Don't stay there hanging or saying something completely irrelevant. Help yourself by letting the interviewer know. If they insist, then try to ask questions to get more specific, until it's something you can answer.

Overall, these interviews have the following goals:
- Did the candidate contribute in a project in a significant way, and knows how to quantify that, and describe their work to someone?
- Is the candidate someone that can collaborate in a team, and be a good colleague to the rest of the company?

**Be honest, be clear and specific, and showcase your skills without arrogance.**

### Behavorial - preparation before the interview

- Go down memory lane and find at least two projects you are proud of. Be able to answer any question around them. You should be able to use the STAR method to describe the project, what problem it solved and what was your contribution. You should be able to answer technical questions about the project too, so spend some time reminding yourself about specifics of the project.
- Prepare answers for the most common behavorial interview questions. Some of these questions are horrible, I hate them myself too, but many companies ask them. So, prepare before hand. These are the known "Tell me about a time" questions ([1](https://www.themuse.com/advice/behavioral-interview-questions-answers-examples), [2](https://hbr.org/2023/01/how-to-answer-tell-me-about-a-time-you-failed-in-a-job-interview)). Some examples:
    - Tell me about a time you had a conflict with a colleague and how you resolved it.
    - Tell me about a time you had to solve a complex problem.
    - Tell me about a time your actions led to a negative outcome, and how did you recover.
    - Tell me what your colleagues would say as your best quality.
    - Which soft or hard skills would you like to improve on.
- Study the company you are interviewing with, and try to sell yourself in a way that makes sense for them. For example, if the company is an analytics company, try to talk about a project or something you did and how it impacted the analytics of your product, or talk about work you did to improve the analytics you gathered to improve decision making.
- Watch this [Intro to Behavioural Interviews](https://www.youtube.com/watch?v=PJKYqLP6MRE) video by Jackson Gabbard.

## Conclusion

I hope the above information helps even a tiny bit your preparation for the interviews.

This is my approach, and how I prepare for interviews.
It has worked well for me so far, so I am confident you can get something valuable out of it.

Good luck 💪🏼 and [let me know](https://twitter.com/LambrosPetrou) if you found this useful or if it helped you get that job!

<div class="upsell-section">
    <p>Prefer a personalized 1:1 session for tips, or a mock interview?</p>
    <div class="consulting-cta-container">
        <!-- <a class="cta-interview" href="https://cal.com/lambrospetrou/interview-preparation-1h" target="_blank" rel="noopener noreferrer"> -->
        <a class="cta-interview" href="https://go.lambros.dev/book-interview-prep" target="_blank" rel="noopener">
        Book interview preparation session
        <small>1:1 session &mdash; coding or system design interviews.</small>
        </a>
    </div>
</div>
