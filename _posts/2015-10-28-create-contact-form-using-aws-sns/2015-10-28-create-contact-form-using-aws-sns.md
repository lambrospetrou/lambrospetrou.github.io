---
title: Create a contact form using Amazon Web Services (AWS) Simple Notification Service (SNS)
description: Guide that describes how you create a contact form for your website using Amazon Web Services (AWS) Simple Notification Service (SNS) without any server.
url: create-contact-form-using-aws-sns
---

A common feature all websites have (or at least *should* have) is a way to contact the owner for any comments or feedback (or complaints ;p). In previous versions of my website and blog I used several techniques to provide a contact me form. In almost all the cases one has to implement the actual email submission on the website's hosting server or nowadays you can use a 3rd party service to provide you this functionality by querying an HTTP endpoint they give to you with the actual message and they send the email for you, to you.

As I mentioned in a previous article, I will extensively investigate Amazon Web Services (AWS) this year. Therefore today I wanted to roll out my own contact-form service using AWS. It turned out to be amazingly easy to setup and you just need 15 minutes from the moment you sign up for the free-tier account to the point where you have an active form sending you emails. **Awesome times we live!**

## Assumptions

- You have an active AWS account (if not do yourself a favor and register for the 1-year free tier at [AWS](https://aws.amazon.com/)).
- You have a website somewhere or you know how to use Simple Storage Service (S3) from AWS to host your website files.

## Services

In order to implement the contact form we are gong to use two services from AWS.

1. **Simple Notification Service (SNS)** ([SNS service](https://aws.amazon.com/sns/))
    Amazon SNS is a fast, flexible, fully managed pub-sub messaging service. Use it as a cloud-based mobile app notification service to send push notifications, email, and SMS messages; or as an enterprise-messaging infrastructure. _(description as per AWS documentation)_

2. **Amazon Cognito** ([Cognito service](https://aws.amazon.com/cognito/))
    Amazon Cognito gives you unique identifiers for your end users and then lets you securely store and sync user app data in the AWS Cloud across multiple devices and OS platforms. You can do this with just a few lines of code, and your app can work the same, regardless of whether a user’s devices are online or offline. When new data is available in the sync store, a user’s devices can be alerted by a silent push notification so that your app can sync the new data automatically. _(description as per AWS documentation)_
