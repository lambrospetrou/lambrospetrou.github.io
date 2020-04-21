---
title: Self-hosted git repository for privacy and control
description: I wanted a solution to store private information and projects I didn't want others to see. Self-hosted git repositories are my solution to that.
---

## Problem

Few months ago I started receiving the following warning from [Github](https://github.com), **Your GitHub academic discount coupon has expired**, and if I wanted to continue working with my private repositories I would have to pay.
In addition to this, for the last couple of months I was investigating and trying different products for personal and **private** note taking. I found a lot of interesting products that were integrating with git services like Github, or [Gitlab](https://gitlab.com) and I was really close to settle with them, but I went deeper into their paid offerings and they actually did not provide encryption at rest, so it was a **no-go**.

Of course, someone can say they are used by millions, so why not trust them. Well, I don't, and in conjunction with their availabilities issues I decided to find alternatives. Actually, while I was writing this article Gitlab was **out of service** with the website returning **500 internal server** errors.

My next solution was a custom website I would develop that would have a super-simple UI, including an editor and a list of all my notes, which would use either [Google Drive](https://www.google.com/drive/) or [Amazon S3](https://aws.amazon.com/s3/) as it's backend, and since I would code the whole thing I would add client encryption to my super important notes (like passwords).

I started looking around for websites similar to this, and found plenty, but none provided the privacy I wanted since they would pass my data through their servers, and although they would say they don't look at them, well I was skeptical! I found some very good products though which I would gladly use if it wasn't for the privacy issues, like [Write-box](http://writeboxapps.com/), [Standard Notes](https://app.standardnotes.org/) and [Dynalist](https://dynalist.io/).

So long story short, nothing suited my needs which are summarised below:

* **Privacy** of my data with encryption at rest
* **Accessibility** and **Availability** of my notes from my laptops and my smartphone

I was close to start implementing my solution, but then I looked closely into every coder's friend, [Git](https://git-scm.com/).

## Solution

I decided to use git repositories for storing my notes, and files. After investigating several self-hosted solutions, including gitlab's, and bitbucket's server offerings, I settled on an open source super lightweight self-hosted git server, [Gitea](https://gitea.io/). Gitea is written in [Go](https://golang.org/) which allows for amazingly low resource consumption (it uses less than 0.3% CPU on my T2.nano EC2 instance).

In addition to the self-hosted git server, I found out about the **git bare repos** which basically act like a git server when hosted on a system accessible over SSH. I use these bare repos for super simple stuff where I don't need the accessibility over my phone, like coding side projects.

### Git bare repositories

Due to the design of git, you can have a directory acting as the **remote location** of all your working directories, where you can push and pull your files.

How to setup a git repository which can be used as remote location?

1. On the server (EC2 instance, or any other system accessible through SSH) run the following command to create the git directory:

    ```bash
    mkdir -p $HOME/git-repos/<REPO_NAME>.git && cd $HOME/git-repos/<REPO_NAME>.git
    git init --bare
    ```

    The first command creates an empty directory where our files will be and the second one initialises that directory to hold a git repository. The ```--bare``` argument is the important bit, which tells git to create a repository without a **working directory**, meaning that nobody will use this directory as his workspace to work on the files. It will be simply used as a remote location for other clones of this git repository.

2. On any system that you want to work with the above repository just clone it and work with it as you would with any other git repo.

    ```bash
    git clone username@serverHostname:~/git-repos/<REPO-NAME>.git
    ```

The good thing of git bare repositories is that they can be used from any system that has access to the server hosting them. I know that lots of people are using this approach but instead of hosting their **bare repos** on a server, they store them in Dropbox or Google Drive. They achieve the accessibility and availability aspect as long as they keep their systems in-sync, but the privacy aspect still resides in the amount of trust you have on Dropbox and Google. BTW, I am a huge fan of Google services like Google Drive and Google Keep, which I use for pretty much all my storage and note taking needs. However, there are some stuff for which I need some extra privacy (i.e. nuclear codes)!

### Self hosted git server

As I said, my git server of choice, at least for the time being, is Gitea, especially due to the low resource consumption on my server. It provides a nice Github-like web interface which you can use to read and edit your files using any web browser, and also has simple organisation of the repositories it creates just like any normal git bare repo which you can use like explained above if you want to bypass the server.

It is amazingly simple to setup as described in https://docs.gitea.io/en-us/install-from-binary/.

```bash
# Download the git server
wget -O gitea https://dl.gitea.io/gitea/1.0.1/gitea-1.0.1-linux-amd64 && chmod u+x gitea

# Run the server
./gitea web
# Or Run the server in the background
nohup ./gitea web &
```

Once you have the server running, access it through a web-browser and you will be prompted for the first setup, which will ask you to register a user (automatically becomes the admin user as well), and to choose your database (SQLite3 should be sufficient without other dependencies).

Obviously, you need to have access to your server over HTTP or HTTPS preferably.

As a side note, I have to mention that Gitea stores all the git repositories you create through its web interface in a directory you define during the first setup and these repositories are just like any git bare repository you create on your own. In a nutshell, Gitea is just a web proxy to git bare repos that does user management and provides a web interface to them.

### Backups and encryption

OK, I achieved availability and accessibility since I can access my git server from anywhere using a web browser or over an SSH connection. We achieved incredibly easy management of my files through any editor and any system that can manage git repositories, without forcing us to use a single website UI. But what happens with encryption and privacy?

In my case, I use a T2.nano EC2 instance as my server which I use for personal projects few years now. The [EBS volume](https://aws.amazon.com/ebs/) backing the instance is using [Amazon EBS Encryption](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html) so we achieve our encryption needs. The security of the server itself is another topic but following AWS best-practices around IAM security rules it should be fine.

In addition, just to avoid any problems when that horribly dark day comes when my host will die or stop working, I take backups of all my repos and store them in [S3 with server-side encryption](http://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html) after every ```push``` I do on the repos. I also take weekly backups of the whole EBS which will make it very easy to just spin up another server with the exact configuration if this one fails.

The script I use for my repository backups is as shown below, and it assumes that all the git repositories I create, on my own or through Gitea, are under the ```$HOME/git-repos``` path.

```bash
#!/bin/bash

set -e

GIT_REPO_DIR="git-repos"
S3_BUCKET="s3://your-s3-bucket-name/git-repos/"

TIMENOW="$(date --rfc-3339=seconds | tr ' ' '_' | tr ':' '-' | tr '+' '.')"
FILENAME="git-repos.$TIMENOW.tgz"

DEST_TAR="/tmp/$FILENAME"

tar -cvzf "$DEST_TAR" -C "$HOME" "$GIT_REPO_DIR"

aws s3 cp "$DEST_TAR" "$S3_BUCKET$FILENAME" --storage-class STANDARD_IA --sse
```

If you don't want to get into the trouble of enabling webhooks in Gitea to backup after every push, you can just do periodic backups using cronjobs. Assuming that the above backup script file is located in ```/home/user/bin/backup-git-repos-s3.sh``` a simple cronjob to take a backup every day at 20:00 is shown below.

```bash
crontab -e

0 20 * * * /home/user/bin/backup-git-repos-s3.sh > /tmp/crontab.backup-git-repos.log 2>&1
```

I personally use Amazon S3 for my backups cause I already use it for hosting all my static websites and for general backup storage since it's dirty cheap. You could easily modify the script above to upload the file in Google Drive, or any other preferred service.

## Conclusion

The first initial setup for the Git self hosted server and the backup automation might seem more work than just signing up on an online service, but for me every it totally paid off, especially since I already had a server running. I have a super flexible way to keep track of personal projects I don't want to have public, or to store sensitive information without being afraid of prying employee eyes. And with the backups, in case something goes wrong with my server I have perfectly good archives to work with.

Although I solved my problem, I still wish there was a **completely client-side web application** integrated with Google Drive or Amazon S3, which will provide capability to encrypt my notes before storing them, without transmission of any data to third-parties (apart of course from the storage service itself).

To be honest, I was super amazed that there are so many online products integrating with Github, Dropbox, Google Drive, and others, but still none of them provides privacy and client-side encryption before sending the data over. Therefore, I still plan to implement that super-duper web application, so keep an eye for it over the next coming months :)