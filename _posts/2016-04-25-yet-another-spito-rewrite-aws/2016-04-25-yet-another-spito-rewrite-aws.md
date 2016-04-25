---
title: Yet another Spito re-write, on the Cloud (AWS)
description: This is an update explaining how I re-wrote Spito to be fully cloud based using AWS. Technologies used include Elastic Beanstalk, Route 53, Cloudfront, S3, and DynamoDB.
url: yet-another-spito-rewrite-aws
---

Finally, I found some time to re-write my super-duper URL shortener yet once again :)

As part of my preparation for the [AWS Certifications](https://aws.amazon.com/certification/) I plan on taking, I wanted to make an architectural re-design of **Spi.to** completely cloud-based on AWS. Last weekend, I finally convinced myself to stop watching shows on [Amazon Video](https://www.amazon.co.uk/av) and did it.

## Architecture overview

In the following diagram we can see an overview of the application's architecture. It is is one of the simplest applications you can make in a weekend but at the same time it allows you to use many cloud services following best-practices in order to achieve fault-tolerance, high availability and durability, which is similar to what you would do in a real super-scalable service.

![Spito Architecture Overview on AWS](/articles/yet-another-spito-rewrite-aws/spito-architecture.png "Spito Architecture Overview on AWS")

You can see that it is a pretty basic setup but without sacrificing performance, availability or durability!

## Services

The services I use in this application can be identified from the diagram above but read below for a small description as to the **why** use each service.

For more information about **Route 53**, **Cloudfront**, and **S3** regarding hosting a static website on AWS you can [read my previous article](/articles/migrate-to-aws-static-website/).

### Amazon Route 53

[Route 53](https://aws.amazon.com/route53/) is a cloud-based DNS management service which I use to manage my domain **spi.to**. I do not use advanced features of the service for this application but you should check it out because it is simply awesome.

### Amazon Cloudfront

[Cloudfront](https://aws.amazon.com/cloudfront/) is one of those services that once you understand how it works and play a little with it, you just love it. It is Amazon's CDN solution but at the same time can act as a reverse proxy to your backend or as a faster gateway to your services instead of going throughout the public network.

I use it in front of my static website server (explained in S3 section) and my REST API service (explained in Elastic Beanstalk section) which are the two origins servicing my application. 

In cloudfront I specify certain behaviors for caching depending on the files but I also include some path patterns to direct each request to the appropriate backend (S3 or API). You can see below a snapshot of the rules I have at the moment.

![Cloudfront behavior rules](/articles/yet-another-spito-rewrite-aws/cloudfront-behavior-rules.png "Cloudfront behavior rules")

The above rules are evaluated top-down until the path matches one rule and that rule is applied without going further down the rule-chain.

You can observe that the first rule ensures that all ```/api/``` calls are going to our **API backend** whilst whatever request comes with ```.``` (dots) or ```/``` (slashes) will go to the **website client** backend. The fourth rule ensures that whatever request comes with **at least** one character, I want to match the **hash ids** now, will go to the API backend. The last rule ensures that the root path ```spi.to/``` without any path (since we covered all other cases) will go to the **website client**, which the homepage.

There might be a simpler solution, but I could not find a way to use classes of characters in path patterns. If you find one or I missed something in the documentation please contact me :)

Also, another important thing with Cloudfront that a **lot** of people ignore is that you **CAN** use it with dynamic services. In my case the API is strictly dynamic since the spits have expiration dates and they cannot be just cached. You can specify that a path will have no caching, which means that you will just use Cloudfront as a proxy to your service, and as I said before it might be beneficial to your users because the communication to your servers will be done inside the AWS network which has all sorts of optimizations.

### Amazon S3 - Simple Storage Service

I use [Amazon S3](https://aws.amazon.com/s3/) in order to serve the web client (website) which you can access by visiting [http://Spi.to](http://spi.to). The client is a static web application written in Dart which consumes the **Spito API** (REST API explained below).

Amazon S3 as discussed in my previous article, [Hosting a static website at AWS](https://lambrospetrou.com/articles/migrate-to-aws-static-website/), is just amazing for static content (especially when combined with Amazon Cloudfront).

### Amazon DynamoDB

[Amazon DynamoDB](https://aws.amazon.com/dynamodb/) is used to store the text or the URL that you upload to the service. I was considering to use S3 again for that but Dynamo is much faster for small texts. I will update the API in the future and use S3 for large-sized text (now the service only allows you to post text up to 128KB).

DynamoDB has very low latency and allows the service to provide super-fast retrieval of the so-called **Spits** (my naming for the uploaded text) and also provides durability and high-availability of the data.

### AWS Elastic Beanstalk

[Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) is a tool that I just learnt recently, and I loved it instantly. Super-easy to use and you get all the benefits of autoscaling and custom bootstrapping out-of-the-box. You, as a user, just need to upload your source code or binary of the application.

Beanstalk handles the **Spito API** servers inside a managed auto-scaling group which by its turn is behind a managed elastic load balancer, all handled by beanstalk itself.

For this service I use **T2.nano** instances in order to keep the costs at a minimal, in case you were interested :)

The Spito API is written in [#Go](https://golang.org/) (source code found in _Conclusion_ section).

### AWS CloudFormation

[AWS Cloud Formation](https://aws.amazon.com/cloudformation/) is a **future** feature I will add to the project in order to automate the infrastructure creation. As developers we love code, so everything needs to be in code :)

_Coming soon_

## Conclusion

Through this project I learnt a ton about **Elastic Beanstalk** and how to use **Cloudfront** even for dynamic requests, and also re-used the knowledge and tricks from my last project (the aforementioned article about static websites).

I open-sourced the application, both the website and the REST API, but keep in mind that this is **only** the application. I still haven't added the CloudFormation template which creates and bootstraps the required AWS services in an automated way.

Source code

* [Spitoweb client](https://github.com/lambrospetrou/spitoweb)
* [Spito API](https://github.com/lambrospetrou/spito)

_**Warning**: The client (spitoweb) has been written a long time ago so it clearly does not follow Dart best-practices, however it could be useful to read if you are into Dart too :)_

**Ah,** and before I forget, you can find **Spito** at [http://spi.to](http://spi.to).

Any comment or feedback is appreciated. 

## References

* [Migrate to AWS - Make a static website using S3, Cloudfront and Route 53](https://lambrospetrou.com/articles/migrate-to-aws-static-website/)
* [Deploying Applications on the Go Platform](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/go-environment.html)
* [Configure the EB CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html)
* [Whitepaper - Hosting Static Websites on AWS](https://d0.awsstatic.com/whitepapers/Building%20Static%20Websites%20on%20AWS.pdf)
* [Whitepaper - Overview of Deployment Options on AWS](https://d0.awsstatic.com/whitepapers/overview-of-deployment-options-on-aws.pdf)
