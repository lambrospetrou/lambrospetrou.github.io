---
title: AWS Lambda and SQLite3 over Amazon EFS
description: "Use the amazing SQLite3 database with AWS Lambda over an EFS filesystem."
---

I am a huge fan of [AWS Lambda](https://aws.amazon.com/lambda/) and serverless in general. I also love the reliability, speed, and simplicity of [SQLite](https://www.sqlite.org), and I was looking to find a few projects to use it.

The issue was that until recently you could not use AWS Lambda together with SQLite, other than bundling the whole database file into the Lambda bundle zip file itself. In practice this meant you only had a readonly database though, since each concurrent Lambda invocation would have its own copy of the database.

However, last month, AWS released [integration between AWS Lambda and Amazon EFS](https://aws.amazon.com/blogs/compute/using-amazon-efs-for-aws-lambda-in-your-serverless-applications/). Since Amazon EFS already supported [NFSv4 lock upgrading/downgrading](https://aws.amazon.com/about-aws/whats-new/2017/03/amazon-elastic-file-system-amazon-efs-now-supports-nfsv4-lock-upgrading-and-downgrading/) which is needed by SQLite, it means that now we can access an SQLite database file stored on an EFS filesystem through AWS Lambda in a read-write mode 🔥 🚀

## Quick Test

I did a quick test using a Node.js Lambda function and it seems that the EFS connectivity adds around **100ms** of latency overhead to the Lambda invocations when accessing the database over EFS versus a local filesystem. This test is by no means scientific and performance will vary a lot depending on your database file size, the concurrent connections you have, and the number of concurrent writes to the database.

The [simple test application (code available)](https://github.com/lambrospetrou/code-playground/blob/master/aws-lambda-node-sqlite/local.js) executes 100 `insert` statements using a transaction, 1 `select` query with a `where` condition, and then a `select *` query.

**AWS Lambda**

![sqlite-aws-lambda-efs](/articles/aws-lambda-and-sqlite-over-efs/sqlite-lambda-3gb.jpg)

The execution time of the statements accessing the SQLite database is roughly **140ms**. There is some variation but that's what I was averaging after 10+ runs. I also tried several AWS Lambda memory configurations to see if the more powerful CPU would affect the latency in any way but it didn't. This makes me think that the overhead is pure network IO.

**Local - Surface Pro**

![sqlite-local](/articles/aws-lambda-and-sqlite-over-efs/sqlite-local.jpg)

The execution time of the statements accessing the SQLite database is roughly **30-40ms**. Some variation expected here as well albeit lower since it's a local filesystem.

## Is this Production ready?

Most probably not...

The correct answer is **it depends!**

- Accessing an EFS filesystem adds latency to your Lambda invocations just due to the network overhead.
- SQLite was designed to be the best in-process database in the world. SQLite's website itself [describes amazingly well the appropriate uses for SQLite](https://www.sqlite.org/whentouse.html), including the inappropriate ones. Our experiment, since it introduces a network between the application (Lambda code) and the database file (EFS) falls into the inappropriate uses...
- SQLite supports concurrent readers, but only one writer can be writing to the database, therefore only one Lambda invocation will be able to write to the database at any point in time which is going to be a throughput bottleneck.

The above facts make it obvious that using SQLite with AWS Lambda is a very bad idea for production systems with thousands of users, or high-throughput of writes, or any system that needs low latency for that matter.

However, for side projects, small team internal projects, applications where latency is not an issue, or situations when you want to build a quick demo prototype it's probably alright.

I am sure the AWS Lambda users will find **interesting** ways to abuse this integration, but that's expected, and it's half the fun 😜
