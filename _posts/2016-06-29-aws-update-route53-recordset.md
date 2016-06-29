---
title: Update Route53 record set with EC2 instance public IP for a DIY load balancer
description: A cool snippet showing how to update a record set in Route53 with a new IP value. This is very helpful in case you want to have an application running on a few instances but you do not want the charge overheads of an Elastic Load Balancer.
url: aws-update-route53-recordset-diy-load-balancer
---

In this small tutorial I provide a code snippet that allows you to update a record set in [Route53](https://aws.amazon.com/route53/) with the public IP of an [EC2](https://aws.amazon.com/ec2/) instance programmatically.

## Why? Just use an Elastic Load Balancer!

[Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/) is an awesome service that handles load balancing of the traffic to your instances very well. But, it comes with a price, literally. An ELB charges a small amount for every hour running, pretty much like a **T2.small** instance (as of time of writing). This is dirty-cheap when you have tens or thousands of instances behind it, but for 1-2 **T2.nano** instances it might seem overkill.

I play around a lot with AWS and I create small projects, websites mostly, where a single node is more than enough to handle all the load, thus paying for an additional load balancer is too much.

Moreover, there are many people that have use cases where ELB is not the right solution and they prefer to have **Route53** act as their load balancer. Loggly team wrote a [very nice article](https://www.loggly.com/blog/why-aws-route-53-over-elastic-load-balancing/) describing this approach and I recommend it for anyone interested in real-world advantages.

## Alternatives?

There are several custom solutions to avoid using an ELB. Most of them take advantage of [Elastic IPs](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) and Route53 API to programmatically update record sets.

### Solution 1 - Elastic IP only

This solution is as simple as possible and only applies to single instance applications. When the EC2 instance boots you provide a user data script which will associate your Elastic IP (you should create this before booting the instance) with the instance.

Find more information for the exact CLI command at the [official EC2 CLI reference](http://docs.aws.amazon.com/cli/latest/reference/ec2/associate-address.html#examples).

I recently discovered that this is how **single-node** configuration of Elastic Beanstalk is implemented (very similar).

### Solution 2 - Route 53 only

This solution requires a bit more work from you in terms of scripting but it is more flexible than having an Elastic IP for each instance. Inside the user data script of your launch-configuration you have full access to the AWS CLI. Therefore, you can pretty much do anything! 

Let's assume that you have an application at **test.lambrospetrou.com** served by a **single** instance. You want to programmatically update the **A** record of this record set to point to any new instance being created by your **max-1-min-1-desired-1** auto-scaling group.

It turns out it is very simple to do :)

First of all we need to find the public IP of the running instance. AWS provides several [metadata information to every EC2 instance](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-retrieval) and public IP is one of them.

```bash
curl http://169.254.169.254/latest/meta-data/public-ipv4
```

The next step is to update the **test.lambrospetrou.com** record set. It is pretty easy to navigate through the [Route53 - 'change-resource-record-sets' documentation](http://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html) which we find that the JSON we need is pretty much the following:

```json
{
  "Comment": "Update the A record set",
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "test.lambrospetrou.com",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "127.0.0.1"
          }
        ]
      }
    }
  ]
}
```

In the above JSON you can see that we want to do an **UPSERT** (update) for the **test.lambrospetrou.com** record set, with type **A** since we want to point to an IP address, and with value 127.0.0.1.

In order to do the record set update you need the following command (assume that the above JSON is the content of a file named **update-route53-A.json**):

```bash
aws route53 change-resource-record-sets --hosted-zone-id "$HOSTED_ZONE_ID" --change-batch file://./update-route53-A.json
```

In the above command you have to put the correct **Hosted zone id** where the record set resides. You can find this in the [Route53 console](https://console.aws.amazon.com/route53/) or with the following command:

```bash
aws route53 list-hosted-zones-by-name
```

If you try and play with the above command you will notice that the update is pretty much instant, which means that as soon as the instance is up and running, your application will be available using the domain.

There is one variation of the above command which accepts a string instead of a file, which makes it easier to use through scripting. The only difference is that the JSON we examined above needs to be enclosed in a field named **ChangeBatch**:

```json
{ "ChangeBatch": { /*INPUT_JSON_LIKE_BEFORE*/ } }
```

and the command to use this JSON string is as follows:

```bash
aws route53 change-resource-record-sets --hosted-zone-id "$HOSTED_ZONE_ID" --cli-input-json "$INPUT_JSON_STR"
```

To summarise, these are the only two commands we need to do what we want:

1. Get the public IP of the running instance

    ```bash
    curl http://169.254.169.254/latest/meta-data/public-ipv4
    ```

2. Update the Route53 record set

    ```bash
    aws route53 change-resource-record-sets --hosted-zone-id "$HOSTED_ZONE_ID" --cli-input-json "$INPUT_JSON_STR"
    ```

Of course you will want to do some more scripting to replace the **127.0.0.1** value with the proper IP and programmatically find the hosted zone id of your domain. The following snippet is a quick/hacky way of accomplishing this. Feel free to use it if you are bored to come up with a better one :)

```bash
#!/bin/sh

if [ -z "$1" ]; then 
    echo "IP not given...trying EC2 metadata...";
    IP=$( curl http://169.254.169.254/latest/meta-data/public-ipv4 )  
else 
    IP="$1" 
fi 
echo "IP to update: $IP"

HOSTED_ZONE_ID=$( aws route53 list-hosted-zones-by-name | grep -B 1 -e "lambrospetrou.com" | sed 's/.*hostedzone\/\([A-Za-z0-9]*\)\".*/\1/' | head -n 1 )
echo "Hosted zone being modified: $HOSTED_ZONE_ID"

INPUT_JSON=$( cat ./update-route53-A.json | sed "s/127\.0\.0\.1/$IP/" )

# http://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html
# We want to use the string variable command so put the file contents (batch-changes file) in the following JSON
INPUT_JSON="{ \"ChangeBatch\": $INPUT_JSON }"

aws route53 change-resource-record-sets --hosted-zone-id "$HOSTED_ZONE_ID" --cli-input-json "$INPUT_JSON"
```

As an additional note, the above example updates the A record with a single IP. You can easily adapt the script to retrieve the current IPs of the record set and append the new one to them. This way you can even achieve simple round robin load balancing between nodes exploiting Route53's weighted routing. Imagination is the limit to what you can achieve :)

### Solution 3 - Route53 & Lambda

Another interesting and even more flexible way of achieving what I explained above, and way much more, is utilising [AWS Lambda](https://aws.amazon.com/lambda/) functions. The combination of Lambda with events and Route53 is **super-powerful** and can implement very complex configuration updates that are usually very difficult.

A lot of people are already playing with Lambda for doing network configuration changes triggered by **autoscaling**. For example, instead of doing the update of the Route53 record set in the user data section of the EC2 launch-configuration, you could setup a Lambda function to be invoked when a new instance has been created (or terminated) and do your changes using the official AWS SDKs available in Lambda functions.

Many AWS tutorials are available in the [AWS blogs](https://aws.amazon.com/blogs/) but you can find some in the References section below.

## Conclusion

The above solution is by no means comprehensive or suitable for everyone and every use-case. Most of the time you will **want** to use Elastic Load Balancing which provides cross-AZ balancing, monitoring, and transparent load balancing in front of several auto-scaling groups.

In some cases though you want to keep it simple or **cheap**, and this is where these solutions are preferred!

Feel free to contact me for any mistakes you find in the snippets above or if you have a better solution for the aforementioned problem.

Happy AWS Clouding :)

## References

* [Why Loggly Chose Amazon Route 53 over Elastic Load Balancing](https://www.loggly.com/blog/why-aws-route-53-over-elastic-load-balancing/)
* [Using AWS Lambda with Auto Scaling Lifecycle Hooks](https://aws.amazon.com/blogs/compute/using-aws-lambda-with-auto-scaling-lifecycle-hooks/)
* [Building a Dynamic DNS for Route 53 using CloudWatch Events and Lambda](https://aws.amazon.com/blogs/compute/building-a-dynamic-dns-for-route-53-using-cloudwatch-events-and-lambda/)
* [Auto Scaling Lifecycle Hooks](http://docs.aws.amazon.com/autoscaling/latest/userguide/lifecycle-hooks.html)
* [Elastic IP Addresses](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)
* [Official EC2 CLI - Associate Address reference](http://docs.aws.amazon.com/cli/latest/reference/ec2/associate-address.html#examples)
