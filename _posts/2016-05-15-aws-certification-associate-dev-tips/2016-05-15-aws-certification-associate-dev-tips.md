---
title: AWS Certified Developer & Solution Architect Associate Certification Tips
description: Some tips and helpful links for the AWS Developer and Solutions Architect Associate certifications.
url: aws-certification-associate-dev-tips
---

I wanted to write this article for a while now but I waited until I actually passed the certification exam before I started giving tips to others :) 

This article is mostly a reference for myself, but it might also be helpful to anyone preparing for the [AWS Certifications](https://aws.amazon.com/certification/). I used the following resource material myself over the last couple of months and since I passed the exam with a pretty high mark I can assume they are good enough to recommend them :)

First of all, you have to bookmark the official [AWS Certification Preparation Guide](http://aws.amazon.com/certification/certification-prep/).

## AWS videos <a name="aws-videos"></a>

The first thing I started doing when preparing for the exams, [Solutions Architect](http://aws.amazon.com/certification/certified-solutions-architect-associate/) and [Developer](http://aws.amazon.com/certification/certified-developer-associate/), is watching all the re:Invent videos from 2015.

It might seem that they are just too many to watch or that you will spend huge amount of time, but trust me, they are going to help you more than any documentation or tips or online trainings. They will not only give you insights for individual services but also architectural design best-practices which you can apply into your own work environment even if you are not AWS-hosted.

Personally, I watched pretty much all the 2015 re:Invent videos over the span of 3 months, but you can just focus on the **fundamentals** and the **deep dives** and skip the **war stories** from several companies.

Below you will find the links to the **AWS re:Invent 2015** playlist on Youtube and to the **AWS Summit 2016 - Chicago** playlist which is just a few weeks old :)

The re:Invent videos are marked with a department and a 3-digit code denoting the pre-requisite knowledge you need to have in order to being able to follow the speaker. Remember the college course naming scheme? It's the same!

### AWS re:Invent 2015 <a name="aws-reinvent-2016-videos"></a>

You can find the videos at [AWS re:Invent 2015 Youtube playlist](https://www.youtube.com/user/AmazonWebServices/playlists?view=50&shelf_id=15&sort=dd)

Some of my favourites are (no particular order):

* [(SEC302) IAM Best Practices to Live By](https://www.youtube.com/watch?v=_wiGpBQGCjU&list=PLhr1KZpdzukc9aw8-gnLmyralfsBv7zcR&index=11)
* [(SEC305) How to Become an IAM Policy Ninja in 60 Minutes or Less](https://www.youtube.com/watch?v=Du478i9O_mc&list=PLhr1KZpdzukc9aw8-gnLmyralfsBv7zcR&index=13)
* [(STG201) State of the Union: AWS Storage Services](https://www.youtube.com/watch?v=3HDQsW_r1DM&list=PLhr1KZpdzukdTMmq1gkXs7g6WIIXtL5r9&index=1)
* [(STG401) Amazon S3 Deep Dive and Best Practices](https://www.youtube.com/watch?v=1TvJCLl9NNg&list=PLhr1KZpdzukdTMmq1gkXs7g6WIIXtL5r9&index=8)
* [(STG206) Using Amazon CloudFront For Your Websites & Apps](https://www.youtube.com/watch?v=gUAuhdtHacI&list=PLhr1KZpdzukdTMmq1gkXs7g6WIIXtL5r9&index=13)
* [(ARC307) Infrastructure as Code](https://www.youtube.com/watch?v=WL2xSMVXy5w&index=10&list=PLhr1KZpdzukdRxs_pGJm-qSy5LayL6W_Y)
* [(CMP201) All You Need To Know About Auto Scaling](https://www.youtube.com/watch?v=4trGuelatMI&list=PLhr1KZpdzukfVW6NrpDzdT6Sej0p5POkN&index=6)
* [(CMP402) Amazon EC2 Instances Deep Dive](https://www.youtube.com/watch?v=SZAvtbrIBAk&list=PLhr1KZpdzukfVW6NrpDzdT6Sej0p5POkN&index=11)
* [(DAT407) Amazon ElastiCache: Deep Dive](https://www.youtube.com/watch?v=4VfIINg9DYI&index=6&list=PLhr1KZpdzukeMbjRqGswHX38DCqOHZ5GA)
* [(DAT401) Amazon DynamoDB Deep Dive](https://www.youtube.com/watch?v=ggDIat_FZtA&index=16&list=PLhr1KZpdzukeMbjRqGswHX38DCqOHZ5GA)
* [(NET201) VPC Fundamentals and Connectivity Options](https://www.youtube.com/watch?v=5_bQ6Dgk6k8&index=1&list=PLhr1KZpdzukcjwZgFBBTmSNPjf_gImgfx)
* [(NET406) Deep Dive: AWS Direct Connect and VPNs](https://www.youtube.com/watch?v=SMvom9QjkPk&index=2&list=PLhr1KZpdzukcjwZgFBBTmSNPjf_gImgfx)

The above are just a few selections to **start with** and by no means conclusive. I also recommend you watching **re:Invent 2014 and 2013** videos especially **deep-dives**.

### AWS Summit 2016 - Chicago <a name="aws-summit-2016-chicago-videos"></a>

You can find the videos at [AWS Summit 2016 - Chicago]( https://www.youtube.com/playlist?list=PLhr1KZpdzukc2_5o7YTT7e2dlKBEKR1ez)

This videos are not as structured as the re:Invent ones but you can as easily filter out the service-oriented ones from the war-story-oriented ones.

Again a few selections:

* [Deep Dive on Amazon Relational Database Service](https://www.youtube.com/watch?v=9-7azhB27So&list=PLhr1KZpdzukc2_5o7YTT7e2dlKBEKR1ez&index=23)
* [DevOps on AWS](https://www.youtube.com/watch?v=652Wf1KKedk&list=PLhr1KZpdzukc2_5o7YTT7e2dlKBEKR1ez&index=17)
* [Deep Dive on Amazon Elastic Block Store](https://www.youtube.com/watch?v=MDeKncXDAgk&list=PLhr1KZpdzukc2_5o7YTT7e2dlKBEKR1ez&index=41)

There is some overlap with re:Invent videos in most of the summit ones but there is also additional valuable content.

## AWS Whitepapers <a name="aws-whitepapers"></a>

**Whitepapers** are my second favourite resources after the re:Invent videos. They present some of the most important topics of deploying services on AWS and provide best-practices and pitfalls to avoid in the process.

You can find them all at [AWS Whitepapers](http://aws.amazon.com/whitepapers/).

Recommended reading:

* [Building Static Websites on AWS - an Astonishing Modern Architecture](http://d0.awsstatic.com/whitepapers/Building%20Static%20Websites%20on%20AWS.pdf)
* [AWS Cloud Storage Services Overview](http://d0.awsstatic.com/whitepapers/AWS%20Storage%20Services%20Whitepaper-v9.pdf)
* [AWS Well-Architected Framework](http://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf)
* [Architecting for the AWS Cloud: Best Practices](http://d0.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf)
* [Introduction to AWS Security](http://d0.awsstatic.com/whitepapers/Security/Intro_to_AWS_Security.pdf)
* [AWS Security Best Practices](http://d0.awsstatic.com/whitepapers/aws-security-best-practices.pdf)
* [Overview of Deployment Options on AWS](http://d0.awsstatic.com/whitepapers/overview-of-deployment-options-on-aws.pdf)
* [AWS Securing Data at Rest with Encryption](https://d0.awsstatic.com/whitepapers/AWS_Securing_Data_at_Rest_with_Encryption.pdf)

## Documentation and FAQs <a name="doc-faq"></a>

Another great resource is obviously the documentation of each service and its FAQ. I would strongly advise you to go over the **FAQ** of the most important services, depending on your exam, and if you have time then go over the docs. 

I have to warn you :) **FAQs** are a **must!!!**

You can find links to most of the FAQs at https://aws.amazon.com/faqs/
Or you can visit the FAQ of the service you want directly by visiting the appropriate link, **aws.amazon.com/SERVICENAME/faqs/**. For example, the Simple Storage Service (S3) FAQ will be at **aws.amazon.com/s3/faqs/**.

Personally, I read the FAQs while travelling in the aeroplane or in the tube/buses. As a result, I created a small script to extract the main content out of the website of each FAQ and I put them on my Kindle :) resulting in a much better and easier read!

You can find the small script on Github: [AWS FAQ client](https://github.com/lambrospetrou/aws-faq-client/)

## AWS Training classes <a name="aws-training-class"></a>

The official [AWS Certification Preparation Guide](http://aws.amazon.com/certification/certification-prep/) suggests to attend training classes depending on the exam you want to pass.

I attended two of them so far, the [Developing on AWS](http://aws.amazon.com/training/course-descriptions/developing/) and the [System Operations on AWS](http://aws.amazon.com/training/course-descriptions/sysops/). I have to admit that the developing one apart from some advices and tips from the trainer himself it was very basic and I would not recommend it to someone that already uses AWS. However, if you are just starting with AWS it is a **great** introduction to the **core** services. The **SysOps** training on the other hand was **amazing**. I highly recommend this training to anyone because it covers things from advanced monitoring, to tagging, to cost-optimization, to custom AMIs and deployment options and pretty much things that I doubt you will ever do on your own or if you are not already working as a systems administrator.

**Update @2016-05-30**

Last week, I attended the [Architecting on AWS](http://aws.amazon.com/training/course-descriptions/architect/) training course. I would really recommend it to anyone that will attempt the certification exam since it is a very nice overview of all the architectural aspects of AWS. It goes over specific use-cases, optimizes and finds bottlenecks of the architecture for certain scenarios which requires you to know about several services and how they can be used together.

Overall, if money is no problem (most companies cover the expenses anyway), I would really recommend you to attend these 3-day training courses. But, it really depends on your knowledge and expertise level. 

## AWS Qwiklabs <a name="aws-qwiklabs"></a>

I highly recommend you to do as many [AWS Qwiklabs](https://run.qwiklab.com/) as you can. They range from quick to long practical labs on most of the services and basic concepts you will need for the exams and for actual work on AWS.

Start by doing the **free** ones first, but I really encourage you to try some of the advanced ones too. Even better if you could convince your company to pay for them. Not only they cover in-depth concepts but they allow you to use expensive services that would be cost-prohibitive to use and play with using your own personal account. 

## Projects, projects, projects <a name="projects"></a>

**Most Important**

As with anything you want to learn, actual practice provides the best learning experience.

I did several small projects, and wrote about them in previous articles, where I actually used most of the services covered by the exams. This provided me with invaluable knowledge and insights as to how some services work which I could not acquire just by reading stuff. After all, the exam is called **Developer Associate** because you need to be able to develop and build systems, not just know about them :) I can assure you that the exam contains questions that you cannot answer correctly just by reading the docs.

**Qwiklabs** can significantly contribute to this if you opt-in for the advanced labs but again, from personal experience, if you do not build something from scratch on your own you do not really learn.

## Conclusion

I provided the most important resources I used to prepare for the exam and get myself acquainted with most of the AWS services. I am pretty sure if you follow my advices you will have great results, but by no means consider this an exhaustive list of content or tips.

Watch as many videos as you can from all the **re:Invents**, do as many **qwiklabs** as you can, and most importantly try to do small (or big) projects utilising a variety of AWS services.

The content of the different examinations has a significant amount of overlap, **but** focuses on different aspects of each topic. For example, the **developer** exam will concentrate on performance, API, and implementation details of a service whereas the **architect** exam will focus on orchestrating and utilising the correct services to solve a problem.

**Good luck :)**
