---
title: "Deploy your applications on a server with zero downtime"
description: "A guide to deploy your applications on servers (e.g. VPS, EC2) with zero downtime."
---

**Table of contents**

-   [Context](#context)
-   [Directory structure](#directory-structure)
-   [Systemd](#systemd)
-   [Caddy](#caddy)
-   [Deploy script](#deploy-script)
-   [Conclusion](#conclusion)

In this guide I will explain the deployment scripts I have been using for several years now for my own applications deployed on actual servers, either VPS on Hetzner and Linode or cloud instances like AWS EC2.

All the scripts below are also available at <https://gist.github.com/lambrospetrou/aaaa13344f0026d810700f1bd2601cfd>.

## Context

Let's clarify what we want to achieve.

**We want to deploy on servers.** Not serverless platforms, not managed container platforms.
We have our application artifact, maybe a Go/Rust binary, maybe a zip/tar/jar file, a Python/Node script, and want to run it on the server.

**We want zero downtime.** This means we can deploy the application without failing in-progress requests or incoming requests while the application is being deployed.

This is important since applications I deploy on my servers are usually SQLite-based and therefore all requests are routed onto that single server.

Lastly, **we want simple deploy scripts** that can run from a CI like Github Actions or AWS CodeBuild and from laptops/machines locally without changes needed.

ℹ️ Note 1: Even though this guide is not for Docker containers, the [Caddy section](#caddy) and the [zero downtime section](#zero-downtime-deployments) actually do apply to Docker containerized applications too.

ℹ️ Note 2: I love the approach explained in this article, because it doesn't depend on language-specific libraries to achieve zero downtime, as long as your application supports graceful shutdowns ([more in Zero downtime deployments section](#zero-downtime-deployments)).

## Directory structure

I like structure in my filesystem.
Inspired from past teams I worked in, articles I read, and from my own needs, this is what I now use across my servers for my applications.

The directory `/opt/apps_workspace/<application-name>` is the "application root directory".

Within the application root directory I have a `versions/` subdirectory that contains all versions of my application deployed (I maintain the N latest versions only, more on that later).

Depending on the application, the contents of the `versions/` directory could just be a list of binaries, or if my application needs multiple files it will be a list of subdirectories, one per version.

Next to the `versions/` directory, there is the `current/` directory that contains anything that is only relevant for the running application, e.g. `.env.local`, SQLite database files, and anything else not tied to a specific version but needed at runtime.

There is a symlink `current/<appname>` pointing to the corresponding binary file (or whatever artifact) under the `versions/` subdirectory.

Live example from my [<span class="skybear-name">Skybear<span>.NET</span></span>](https://about.skybear.net/) staging server:

```sh
$ ll /opt/apps_workspace/monosource-server/**
/opt/apps_workspace/monosource-server/current:
total 12K
drwxr-xr-x 3 appuser appadmins 4.0K Jul 25 23:03 appdata
-rw-r--r-- 1 lambros lambros   1.9K Sep 12 07:51 .env.local
lrwxrwxrwx 1 root    root       224 Sep 12 07:51 monosource-server -> /opt/apps_workspace/monosource-server/versions/monosource-server-20240912_075143-commit_unknown-f6145af482657e71162e0b105b2429fa754a0a5e11cb8d4ebf1ae6220c832a859e8d6d3f9c79fae35fd8ddb929fdb5300e34587bf2035908ef8be17638584fd2

/opt/apps_workspace/monosource-server/versions:
total 690M
-rwxr-xr-x 1 lambros lambros 69M Sep  9 21:57 monosource-server-20240909_215719-commit_unknown-1c0f46816dac2d4c9989b6ae5dbeacadfc95d26fb1d1b3c3476972b73e366a1f70f7857218b1fe8d6cd47a2ca17516193f9311f463e84cfa089e3aa992c3ff0e
-rwxr-xr-x 1 lambros lambros 69M Sep 10 07:23 monosource-server-20240910_072327-commit_unknown-dfe8db0911da484fc9f68c783765752d10b6aa923166829ddc96dc2da89a740134bca2eb30baca2c90b40a11c4ccfc8a1edcd75ca794c19abe27f18640824c42
-rwxr-xr-x 1 lambros lambros 69M Sep 10 07:40 monosource-server-20240910_074005-commit_unknown-3f4165508c7a54c27d43c20cb1417ac276f3e3c882b99bf4ac6f5a24a89283dc0af6185680802516cfb7f00767d68f441be46ff56297ba2296888432eb653fda
-rwxr-xr-x 1 lambros lambros 69M Sep 10 07:49 monosource-server-20240910_074934-commit_unknown-8b987287bfff734ea67d0877d4fe3233bc7f7f02d160437d5e97fc710603c167dafcaf656161f073b6f0cd502031566d9ccf80817a3493ee50f55b6e6617f515
-rwxr-xr-x 1 lambros lambros 69M Sep 10 07:49 monosource-server-20240910_074949-commit_unknown-8b987287bfff734ea67d0877d4fe3233bc7f7f02d160437d5e97fc710603c167dafcaf656161f073b6f0cd502031566d9ccf80817a3493ee50f55b6e6617f515
-rwxr-xr-x 1 lambros lambros 69M Sep 11 00:31 monosource-server-20240911_003106-commit_unknown-4aea354fc94a9137fbffa788892ecfe5dfb54ce2fdbd89b7ca4db15bf2a644aafacb1bfa24f9f858fdcb9108ebede6cbf5b8580afb827985fdc4bb75bae9f4b4
-rwxr-xr-x 1 lambros lambros 70M Sep 11 21:27 monosource-server-20240911_212745-commit_unknown-df30c74a6392ec0d404d77bb0f11512d457d77eba62d26316e1587aee7b1410eed23852cb4b03983f9cc19f6a5f9db8eb464f41dd5d5e5449c3a9913c78c56eb
-rwxr-xr-x 1 lambros lambros 70M Sep 11 22:26 monosource-server-20240911_222551-commit_unknown-496ff2e89f5b13190d2965a7861abdc6924adf3c45e54a5a367a27118703bcff033b402d9e758e3cbe68833e11be60acc7e3efe1fe8e9c27597d020c5b90e52b
-rwxr-xr-x 1 lambros lambros 70M Sep 11 22:38 monosource-server-20240911_223751-commit_unknown-ebd934d5e765b0651a8a045e47d4017365129abded1b02ef8fa8370b909db79fb28e9c2a7591b0adf3eaad6a6cd23f4ba1ea688eccde577ee8375afa6cdef034
-rwxr-xr-x 1 lambros lambros 70M Sep 12 07:51 monosource-server-20240912_075143-commit_unknown-f6145af482657e71162e0b105b2429fa754a0a5e11cb8d4ebf1ae6220c832a859e8d6d3f9c79fae35fd8ddb929fdb5300e34587bf2035908ef8be17638584fd2
```

## Systemd

Systemd (<https://systemd.io>) is the defacto tool to manage processes, e.g. restarting them when they crash, startup on boot, and a LOT more.

We are going to use `systemd` to automatically start our applications on server reboots and on application crashes.
We also use its Journal feature, essentially a component for capturing logs from the application's process standard IO (stdout, stderr).

Each application I deploy has the following service file `/etc/systemd/system/<appname>.service`:

```toml
[Unit]
Description=Monosource Server
After=network.target

[Service]
ExecStart=/opt/apps_workspace/monosource-server/current/monosource-server
User=appuser
Group=appadmins
WorkingDirectory=/opt/apps_workspace/monosource-server/current/
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Notice that the main executable to run is our symlink in the `current/` subdirectory as explained in the previous section.

Also, the app is running under the user `appuser` and the group `appadmins`, just to have some isolation from my own system user.

We specify that we want to always restart the application, and that we want both the standard output and standard error to be logged into systemd's Journal.

To tail the application logs:

```sh
sudo journalctl -u monosource-server -f
```

We are going to see in the [Deploy script](#deploy-script) section when this file is created, updated, and how we notify `systemd` to pickup changes.

## Caddy

Caddy server (<https://caddyserver.com>) is an amazing proxy server written in Go.

Very good performance, with a user-friendly configuration syntax.
We are going to use its `reverse_proxy` feature ([see docs](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)) for proxying all the applications on the server, and its load balancing feature to achieve zero downtime ([see docs](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy#load-balancing)).

We are going to use the **Caddyfile** syntax to configure Caddy.

The main configuration file is in `/etc/caddy/Caddyfile`, and this is its content:

```
import sites-enabled/*
```

Yes, a single line importing all other Caddyfiles from the directory `/etc/caddy/sites-enabled/`.

Each application will have its own `/etc/caddy/sites-enabled/<appname>-Caddyfile` configuration.

This is the configuration I have for [<span class="skybear-name">Skybear<span>.NET</span></span>](https://about.skybear.net/) which is an application serving multiple domains:

```
:80 {
    reverse_proxy http://127.0.0.1:8080 {
        header_up X-Real-IP {remote}

        # This gives 10s of buffering to allow zero downtime restarts of the service.
        lb_try_duration 10s
    }
    request_body {
        max_size 1M
    }
}
```

The above config specifies that Caddy server will listen on port `:80` and act as a reverse proxy forwarding all requests to a process running locally and listening on `http://127.0.0.1:8080` for HTTP requests.

I use Cloudflare as a proxy in front of all my servers, hence I don't need to serve HTTPS from my origin servers (therefore no need to listen on port `:443`).
If you want to go straight to your servers without any proxy CDN, Caddy supports HTTPS out of the box ([see docs](https://caddyserver.com/docs/quick-starts/https)), so you just need to add some extra configuration for the domain(s) to certify.

In the forwarded request the headers `X-Real-IP` will be set appropriately, and the maximum request body we accept is 1MB otherwise the request will be rejected.
Read through <https://caddyserver.com/docs/caddyfile/directives/reverse_proxy#defaults> to see if you really need these headers depending on your CDN used (if any at all).

We are going to see in the [Deploy script](#deploy-script) section when this file is created, updated, and how we notify Caddy to pickup changes.

Let's now explore the `lb_try_duration 10s` configuration.

### Zero downtime deployments

ℹ️ **Assumption: Your application supports graceful shutdowns.** In order for zero downtime to work properly your application has to support graceful shutdown. That means you do not abruptly kill your process during restarts, but instead process in-flight requests without accepting new ones, and then exiting the process. How you do this depends on the language and framework you use. For example here is how it's done in Go servers: <https://pkg.go.dev/net/http#example-Server.Shutdown>

Without the line `lb_try_duration 10s`, everything would still work correctly.

The behavior would be that all requests are received by Caddy, forwarded to the local server, and the server writes its response back.

During deployments, our application will restart, hence any request being forwarded to `http://127.0.0.1:8080` will fail since no server is listening on that port until the application process starts up again.

My applications are usually written in Go, so downtime is only 1-2 second(s) max.
Imagine though that you use something slower (e.g. Python, Ruby) or you have to do a slow initialization in your application.
That would lead to downtime of your service, which is not good.

That's where the magic of `lb_try_duration 10s` comes into play.

With that line we instruct Caddy to keep retrying to reach the "backend" (our application) up to 10 seconds before failing the request.

This is awesome, since it allows our application to restart, do its initialization, and then go online to start serving the "pending" requests.

One line. Really nice 👌

## Deploy script

Now that we explored all individual components of our application, let's see the connecting tissue. The deployment script.

The following deploy script will do the following in order:

1. Generate the application version name based on commit (if it exists) and current time (see example of this in the [Systemd section](#systemd)).
2. Copy all the files the application needs into a temporary directory.
    - This step ensures that all the files are copied on the target server before trying to restart any component to avoid any partial deployment.
3. We send a big shell command over SSH (or Tailscale SSH) that will do the following:
    1. Move all the application files from the temporary directory into the `/opt/apps_workspace/<appname>/versions/` directory accordingly.
    2. Move the [Systemd configuration](#systemd) from the temporary directory to `/etc/systemd/system/<appname>.service`, and trigger its daemon to reload its configuration.
    3. Move the [Caddy configuration](#caddy) from the temporary directory to `/etc/caddy/sites-enabled/<appname>-Caddyfile`, and trigger the Caddy daemon to reload its configuration.
    4. Update the symlink `/opt/apps_workspace/<appname>/current/<appname>` to point to the new version.
    5. Restart the application using `systemctl restart <appname>`.
        - This is the only part that causes downtime, but is mitigated by using Caddy's load balancing feature to buffer requests.
4. Delete older versions to retain only the latest 10 on the server, just in case I need to rollback to a previous version.
    - Rollback is done manually now by recreating the current version symlink to point to a previous version and restarting the application.

Deploy script:

```sh
#!/usr/bin/env bash

set -e

if [ "$#" -ne 1 ]; then
	echo "usage: $0 user@server-address"
	exit 1
fi

SERVER_SSH=$1
SERVER_PATH=/opt/apps_workspace/monosource-server
BINARY_NAME="monosource-server"
SERVER_RESTART_COMMAND="systemctl restart $BINARY_NAME"
SYSTEMD_FILE="monosource-server.service"
SYSTEMD_DAEMONRELOAD_COMMAND="systemctl daemon-reload"

# https://caddyserver.com/docs/running#unit-files
CADDY_RESTART_COMMAND="systemctl reload caddy"
CADDYFILE="monosource-server-Caddyfile"

# Assume the script will be run inside the `src/` directory.
OUTFILE="./build/$BINARY_NAME"
ENVFILENAME=".env.local"
ENVFILE="./build/$ENVFILENAME"
# COMMIT_HASH=$(git rev-parse HEAD)
COMMIT_HASH="commit_unknown"
BUILD_TIMESTAMP=$(TZ=UTC date -u +"%Y%m%d_%H%M%S")
FILE_HASH=$(b2sum $OUTFILE | cut -f1 -d' ')
REMOTE_FILENAME="$BINARY_NAME-$BUILD_TIMESTAMP-$COMMIT_HASH-$FILE_HASH"

echo "Deploying: $REMOTE_FILENAME"

# Copy necessary files from current version.
scp "$OUTFILE" "$SERVER_SSH:/tmp/$REMOTE_FILENAME"
scp "$ENVFILE" "$SERVER_SSH:/tmp/$REMOTE_FILENAME-$ENVFILENAME"
scp "_tools/files/etc/caddy/sites-enabled/$CADDYFILE" "$SERVER_SSH:/tmp/$REMOTE_FILENAME-$CADDYFILE"
scp "_tools/files/etc/systemd/system/$SYSTEMD_FILE" "$SERVER_SSH:/tmp/$REMOTE_FILENAME-$SYSTEMD_FILE"

# Put the latest files in the right directories and restart everything without downtime.
ssh -q -Tt $SERVER_SSH <<EOL
	sudo nohup sh -c "\
	mkdir -p $SERVER_PATH/versions/ $SERVER_PATH/current/ /etc/caddy/sites-enabled/ && \
	mv "/tmp/$REMOTE_FILENAME-$CADDYFILE" "/etc/caddy/sites-enabled/$CADDYFILE" && \
	$CADDY_RESTART_COMMAND && \
	mv "/tmp/$REMOTE_FILENAME-$SYSTEMD_FILE" "/etc/systemd/system/$SYSTEMD_FILE" && \
	$SYSTEMD_DAEMONRELOAD_COMMAND && \
	mv "/tmp/$REMOTE_FILENAME-$ENVFILENAME" "$SERVER_PATH/current/$ENVFILENAME" && \
	mv "/tmp/$REMOTE_FILENAME" "$SERVER_PATH/versions/$REMOTE_FILENAME" && \
	chmod +x "$SERVER_PATH/versions/$REMOTE_FILENAME" && \
	rm -f "$SERVER_PATH/current/$BINARY_NAME" && \
	ln -s "$SERVER_PATH/versions/$REMOTE_FILENAME" "$SERVER_PATH/current/$BINARY_NAME" && \
	$SERVER_RESTART_COMMAND"
EOL

echo "Deleting older versions, retaining the latest 10!"

# Cleanup old versions, and retain the last 10 deployed.
# In order to retain 10x versions we need to keep the top 10 lines when
# sorted with the latest files at the top, and start removing from line 11!
# Attention: If you have less than 10 deployments already this will fail, but it's fine to ignore.
ssh -q -Tt $SERVER_SSH <<EOL
	sudo nohup sh -c "find "$SERVER_PATH/versions/" -type f -exec realpath {} \; | sort -r | tail -n +11 | sudo xargs rm"
EOL
```

## Conclusion

I love serverless platforms (you should use [Cloudflare Workers](https://developers.cloudflare.com/workers/) and [Durable Objects](https://developers.cloudflare.com/durable-objects/) more), but I also love writing small servers in Go and use SQLite 😅

This article describes the deployment script I use to achieve zero downtime deployments across actual servers, VPS, or cloud instances like AWS EC2.

Feel free to copy and modify them to your will, or reach out with questions and/or ways to improve them.
