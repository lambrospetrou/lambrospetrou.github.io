---
title: Run multiple services on a single EC2 instance using AWS Elastic Beanstalk (Go and Multicontainer Docker platforms)
description: A tutorial explaining how to run multiple services on the same instance using AWS Elastic Beanstalk. The Go and Multicontainer platforms are examined.
---

## Problem

Many times I want to run multiple services on the same EC2 instance. Sometimes I am doing a toy project and I don't want to pay for resources just hosting each project on its own, and other times, even in production systems, I need to deploy multiple microservices on the same instance, e.g. Nginx proxy, the application web service, and maybe some other monitoring service.

I am a huge fan of [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) and I will explain how we can achieve multi-service on same instance setup using the [Go Platform](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/go-environment.html) and the more flexible [Multicontainer Docker Platform](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecs.html).

### Desired result

The example application I will deploy has two Go web services running which just serve some static HTML and an Nginx proxy doing the routing between them.

**Web service 2** handles any request under the `/web2` path, and **Web Service 1** handles everything else.

```sh
> curl http://multiplegoservices-env.mzkfjw36fh.eu-west-1.elasticbeanstalk.com/web2
Service 2 Path, "/web2"

> curl http://multiplegoservices-env.mzkfjw36fh.eu-west-1.elasticbeanstalk.com/web1
Service 1 Path, "/web1"

> curl http://multiplegoservices-env.mzkfjw36fh.eu-west-1.elasticbeanstalk.com/
Service 1 Path, "/"
```

The code for our services is **exactly the same** between the two platforms, and the only difference is among the files specific for each platform configuration.

## Go Platform

The Go Platform in Elastic Beanstalk is pretty simple, with the most important concepts being the [Procfile](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/go-procfile.html), the [Buildfile](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/go-buildfile.html), and the special `.ebextensions` folder which we will use to provide [custom configuration to the Nginx proxy](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/go-nginx.html) deployed automatically on the instances.

[Source code available on Github](https://github.com/lambrospetrou/aws-playground/tree/master/elastic-beanstalk-multiple-applications).

### Procfile

This file contains a simple enumeration of the services to start (i.e. executables to run). For the example application, `Procfile` contains the following:

```
web_service1: bin/web-service-1
web_service2: bin/web-service-2
```

One thing you need to know is that Elastic Beanstalk will start the first service setting the environment variable `PORT=5000`, and that is the port your service should listen for requests. Each subsequent service will receive `PORT` values in **100 increments** from the last one, i.e. `web-service-2` will have `PORT=5100`.

### Buildfile

This file contains a simple enumeration of commands to run during the deployment artifact build time. This can be used to build your code and generate the executables that `Procfile` will execute, but in my case I like building locally (or in a pipeline) and just deploy the executables as the Elastic Beanstalk artifact.

Just for the sake of using `Buildfile`, I call a bash script that prints `Hello world!`, and it looks like below:

```
command_to_run_during_build: bin/hello.sh
```

As a general guideline, the `Buildfile` can be used for any arbitrary task that needs to run before the services are started.

### Nginx proxy configuration

For the proxy configuration we just need a `server {}` Nginx directive to provide the routing between the two services. To achieve this, we create a **.conf** file inside the `.ebextensions/nginx/conf.d/` directory which will be included by Nginx during startup.

The following configuration is enough to do the job, and is in the file `.ebextensions/nginx/conf.d/01_proxy.conf`.

```
server {
    server_name .elasticbeanstalk.com;
    listen 80;

    location /web2 {
        proxy_pass http://127.0.0.1:5100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Deployment artifact

All the paths used in the files above are based on the following artifact (the `.zip` file) I deploy to Elastic Beanstalk. Full listing of the contents below:

```sh
> unzip -l build/bundle.zip 
Archive:  build/bundle.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
       64  2018-03-11 13:44   Procfile
        0  2018-03-11 13:44   .ebextensions/
        0  2018-03-11 13:44   .ebextensions/nginx/
        0  2018-03-11 13:44   .ebextensions/nginx/conf.d/
      319  2018-03-11 13:44   .ebextensions/nginx/conf.d/01_proxy.conf
        0  2018-03-11 13:44   bin/
  6218916  2018-03-11 13:44   bin/web-service-1
       38  2018-03-11 13:44   bin/hello.sh
  6218916  2018-03-11 13:44   bin/web-service-2
       42  2018-03-11 13:44   Buildfile
---------                     -------
 12438295                     10 files
```

## Multicontainer Docker Platform

The multicontainer Docker platform uses [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) under the covers, but as I said before, deploying through Elastic Beanstalk makes things a lot easier!

There is only one important configuration file in the Multicontainer Docker platform and that is the [Dockerrun.aws.json](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html).

This file contains Docker specific definitions, e.g. the Docker images we want for each service, the volume definitions mapping to source paths in our deployment artifact, etc.

[Source code available on Github](https://github.com/lambrospetrou/aws-playground/tree/master/elastic-beanstalk-multicontainer-docker).

### Dockerrun.aws.json

In order to achieve the same result as with the **Go Platform** I use the following `Dockerrun.aws.json` file.

```json
{
  "AWSEBDockerrunVersion": 2,
  "volumes": [
    {
      "name": "web1",
      "host": {
        "sourcePath": "/var/app/current/web-service-1"
      }
    },
    {
      "name": "web2",
      "host": {
        "sourcePath": "/var/app/current/web-service-2"
      }
    },
    {
      "name": "nginx-proxy-conf",
      "host": {
        "sourcePath": "/var/app/current/proxy/conf.d"
      }
    }
  ],
  "containerDefinitions": [
    {
      "name": "web1",
      "image": "golang:1.10",
      "essential": true,
      "memory": 128,
      "mountPoints": [
        {
          "sourceVolume": "web1",
          "containerPath": "/var/app"
        }
      ],
      "portMappings": [
        {
          "hostPort": 5000,
          "containerPort": 5000
        }
      ],
      "environment": [
        {
          "name": "PORT",
          "value": "5000"
        }
      ],
      "command": ["/var/app/web-service-1"]
    },
    {
      "name": "web2",
      "image": "golang:1.10",
      "essential": true,
      "memory": 128,
      "mountPoints": [
        {
          "sourceVolume": "web2",
          "containerPath": "/var/app"
        }
      ],
      "portMappings": [
        {
          "hostPort": 5100,
          "containerPort": 5100
        }
      ],
      "environment": [
        {
          "name": "PORT",
          "value": "5100"
        }
      ],
      "command": ["/var/app/web-service-2"]
    },
    {
      "name": "nginx-proxy",
      "image": "nginx",
      "essential": true,
      "memory": 128,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        }
      ],
      "links": [
        "web1", "web2"
      ],
      "mountPoints": [
        {
          "sourceVolume": "nginx-proxy-conf",
          "containerPath": "/etc/nginx/conf.d"
        },
        {
          "sourceVolume": "awseb-logs-nginx-proxy",
          "containerPath": "/var/log/nginx"
        }
      ]
    }
  ]
}
```

**Notes**

* `/var/app/current` is the directory on the host machine that contains our deployment artifact, i.e. the `.zip` file unzipped.
* In order to allow the Nginx image to communicate with the two services running we need to **link** those images to the `nginx-proxy` image, and instead of using `http://127.0.0.1` in the Nginx `.conf` file we should use `http://web1` and `http://web2` as shown below.

    ```
    server {
        server_name .elasticbeanstalk.com;
        listen 80;

        location /web2 {
            proxy_pass http://web2:5100;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location / {
            proxy_pass http://web1:5000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```

### Deployment artifact

Full listing of the deployment artifact contents is as follows:

```sh
> unzip -l build/bundle.zip 
Archive:  build/bundle.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
     1960  2018-03-10 19:01   Dockerrun.aws.json
        0  2018-03-10 19:01   proxy/
        0  2018-03-10 19:01   proxy/conf.d/
      326  2018-03-10 19:01   proxy/conf.d/default.conf
        0  2018-03-10 19:01   web-service-1/
  6218916  2018-03-10 19:01   web-service-1/web-service-1
        0  2018-03-10 19:01   web-service-2/
  6218916  2018-03-10 19:01   web-service-2/web-service-2
---------                     -------
 12440118                     8 files
``` 

## Conclusion

AWS Elastic Beanstalk is an amazing service which abstracts a lot of stuff that are not really part of the application, e.g. load balancers, autoscaling groups, logging, alarms, and there is even a super helpful dashboard right out-of-the box.

My simplistic guideline on what platform to use is as follows:

**Go Platform**

* Your services are written in Go
* Your services can be compiled into binary executables that run on Amazon Linux

**Multicontainer Docker Platform**

* Anything else

Have fun microservicing with AWS Elastic Beanstalk!
