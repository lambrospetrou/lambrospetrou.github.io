---
title: Fly.io cloud development environment with Visual Studio Code Remote-SSH
description: "A guide on how to use a Fly.io container as your personal cloud development environment and VSCode with Remote SSH as your editor."
---

For many years now I have been using an [AWS EC2](https://aws.amazon.com/ec2/) `T3.nano` (`T2.nano` previously) instance as my personal VPS server. I mainly host a [Gitea](https://gitea.io/) server, along with some other toy projects, and I sometimes use it as my remote development machine when for some reason I cannot use the local laptop I have at hand. It's been quite reliable honestly, checking its current `uptime` it says it has been up for 850 days now without any issues. And the reason I restarted it back then was to (unsuccessfully) upgrade from Amazon Linux to Amazon Linux 2.

Fast-forward to present, I find myself playing a lot with [Fly.io](https://fly.io/), a new-ish cloud compute provider for server applications (e.g. [Dockerfile](https://fly.io/docs/getting-started/dockerfile/)). I covered it in a [past article about serverless platforms in 2022](https://www.lambrospetrou.com/articles/serverless-platforms-2022/), but in summary I really love the developer experience and the simplicity it provides through its CLI.

In this article I will describe how I now use Fly.io as my development environment in the cloud instead of EC2, without having to remember to update the underlying OS or even worse upgrading to a new major version and having to do annoying file migrations.

## It's all containers

Fly.io is built on top of [Firecracker microVMs](https://fly.io/docs/reference/architecture/#microvms) and supports a [few types of builders](https://fly.io/docs/reference/builders/) that ultimately assemble a container to deploy. In this article I am going to use the [Dockerfile support](https://fly.io/docs/getting-started/dockerfile/) since that's how I prefer to model my development environment.

The benefits of modelling my environment in a Dockerfile:
- Upgrading the operating system (OS), or even changing it, is a single line change and a redeploy (e.g. from `FROM ubuntu:18.04` to `FROM ubuntu:20.04`).
- Installing or uninstalling software and packages from the OS is again trivial using the [`RUN`](https://docs.docker.com/engine/reference/builder/#run) command.
- Define exactly what processes should my server run and never have to worry about manually (re)starting them.
- Have all of the above versioned in Git, so doing any change to it is easy while keeping a historical record in case I need to check how something was setup in the past.
- Have the whole environment recreated in seconds if something goes wrong (Fly.io provides [persistent disk volumes](https://fly.io/docs/reference/volumes/)).

## Cloud Development Environment

For a basic remote development environment I want to be able to do the following:
- SSH into it in case I need to test linux commands.
- Checkout and work with Git repositories.
- Install the several programming languages I work with.
- Have a nice development experience using Visual Studio Code comparable to local development.

The full source code referenced in the following sections is available in [this repository](https://github.com/lambrospetrou/code-playground/tree/master/flyio-cloud-dev-env), and you can [download it as .zip file here](https://downgit.github.io/#/home?url=https://github.com/lambrospetrou/code-playground/tree/master/flyio-cloud-dev-env).

### Dockerfile

This is a simplistic version of the `Dockerfile` I use:

```dockerfile
FROM ubuntu:bionic

RUN apt-get update && apt-get install --no-install-recommends -y \
    ca-certificates curl sudo openssh-server bash git \
    iproute2 apt-transport-https gnupg-agent software-properties-common \
    # Install extra packages you need for your dev environment
    htop make vim && \
    apt autoremove -y

ARG USER="clouddevuser"
RUN test -n "$USER"
# Create the user
RUN adduser --disabled-password --gecos '' --home /data/home ${USER}
# passwordless sudo for your user's group
RUN echo "%${USER} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

ENV USER_ARG=${USER}

# Setup your SSH server daemon, copy pre-generated keys
RUN rm -rf /etc/ssh/ssh_host_*_key*
COPY etc/ssh/sshd_config /etc/ssh/sshd_config

COPY ./entrypoint.sh ./entrypoint.sh
COPY ./docker-entrypoint.d/* ./docker-entrypoint.d/

ENTRYPOINT ["./entrypoint.sh"]
CMD ["/usr/sbin/sshd", "-D"]
```

Let's do a simple breakdown of each Dockerfile instruction.

First, we define the Operating System (OS) to use, in this case [Ubuntu](https://hub.docker.com/_/ubuntu/) version `bionic` (codenamed `18.04`).
```dockerfile
FROM ubuntu:bionic
```

Then we encounter the `RUN` instruction which basically installs additional software to our OS. We can update this list (see relevant line comment) to include more packages as necessary.

The next 8 lines create a new user `clouddevuser` ([customisable argument using `ARG`](https://docs.docker.com/engine/reference/builder/#arg)), sets the necessary permissions, and creates the user's home under `/data/home` (we can change this to `/home/clouddevuser` or anything else). The thing to remember from these lines is that we export an environment variable `USER_ARG` which holds the user name since it will be used by the `entrypoint.sh` script (detailed in the next section).

Then, we have 2 lines essentially making sure the our local SSH configuration is copied into the container and is the one used.

The last lines need some explanation.
```dockerfile
COPY ./entrypoint.sh ./entrypoint.sh
COPY ./docker-entrypoint.d/* ./docker-entrypoint.d/

ENTRYPOINT ["./entrypoint.sh"]
CMD ["/usr/sbin/sshd", "-D"]
```

The two `COPY` instructions copy the local `entrypoint.sh` script and the local directory's `./docker-entrypoint.d/` content to the container's root directory.
The last pair of instructions specify that we want our container to execute `./entrypoint.sh /usr/sbin/sshd -D` using the [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint) and [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd) Dockerfile instructions.

In summary, this Dockerfile selects the OS we want, installs extra software packages, sets up our user, and then runs the `entrypoint.sh` script. Easy.

### entrypoint.sh

```sh
#!/bin/bash

set -euxo pipefail

echo "Creating /run/sshd"
mkdir -p /run/sshd

HOME_DIR=/data/home
SSH_DIR=/data/etc/ssh

echo "Ensure home directory"
mkdir -p $HOME_DIR

echo "Ensure SSH host keys"
mkdir -p $SSH_DIR
ssh-keygen -A -f /data

echo "Setup SSH access for user $USER_ARG"
mkdir -p $HOME_DIR/.ssh
# Append the given keys to the authorised keys and only keep the uniques!
# The `# empty comment` is to avoid an empty file which causes grep to fail.
echo -e "# empty comment\n$HOME_SSH_AUTHORIZED_KEYS" >> $HOME_DIR/.ssh/authorized_keys
cat $HOME_DIR/.ssh/authorized_keys | sort | uniq | grep -v "^$" > /tmp/authorized_keys
mv /tmp/authorized_keys $HOME_DIR/.ssh/authorized_keys

if [ -f "$HOME_DIR/.ssh/id_ed25519" ]; then
    echo "$HOME_DIR/.ssh/id_ed25519 exists, skipping."
    echo ""
    echo "Make sure you add this public key to your Github / Gitlab / other vcs:"
else 
    echo "$HOME_DIR/.ssh/id_ed25519 does not exist, generating."
    ssh-keygen -t ed25519 -f $HOME_DIR/.ssh/id_ed25519 -C "$USER_ARG@fly-vscode" -N ""
    echo ""
    echo "Add this public key to your Github / Gitlab / other vcs:"
fi
cat $HOME_DIR/.ssh/id_ed25519.pub

echo "chowning your home to you"
chown -R $USER_ARG:$USER_ARG $HOME_DIR

if [[ -d "docker-entrypoint.d" ]]
then
    echo "Running docker-entrypoint.d files"
    /bin/run-parts --verbose docker-entrypoint.d
fi

echo "Running $@"
exec "$@"
```

Briefly, the entrypoint script:
1. creates the user's home directory (needs to match the one we used in `Dockerfile`)
2. adds some SSH authorized keys to our configuration to allow remote SSH-ing
3. optionally generates an SSH key that we will use to authenticate this server with services like Github when pulling/pushing Git repositories
4. it runs all the scripts under the `/docker-entrypoint.d/` directory
5. and finally runs the command passed as argument to the script, which as we explained in the previous section it's going to be `/usr/sbin/sshd -D`

**Notes**
- Anything that needs the user uses the environment variable `USER_ARG` that we defined in the `Dockerfile`.
- The content of the environment variable `HOME_SSH_AUTHORIZED_KEYS` is appended to the `$HOME_DIR/.ssh/authorized_keys` file, and then we do some shell shenanigans to only allow unique lines inside that file (to avoid appending the same keys each time our container is started). The value of `HOME_SSH_AUTHORIZED_KEYS` is provided by the `fly.toml` file as you will see below.
- The generated `$HOME_DIR/.ssh/id_ed25519.pub` file is the public key we need to upload to Github or any other service that needs to authenticate its user using SSH keys.
- The `/bin/run-parts --verbose docker-entrypoint.d` conveniently runs any script we put into the `docker-entrypoint.d/` directory, which makes it easy to do any initialisation to the OS at runtime.

After the above script runs, now the container is stuck in the `/usr/sbin/sshd -D` command. This is the SSH daemon that accepts connections from anyone attempting to SSH into our Fly.io server instance, our container. As long as the only thing we want to expose from the server is the SSH port, this is the only thing we need to run as the last command in our `entrypoint.sh`.

if we didn't run this at the end, and the script exited, then the container would complete and exit as well, which would then cause our Fly.io server instance to be marked as failed/unhealthy and would be restarted, leading to a crash-loop (by default it attempts to deploy up to 3 times).

### fly.toml

```toml
app = "<WILL_BE_REPLACE_WITH_GENERATED_NAME>"

[env]
  HOME_SSH_AUTHORIZED_KEYS = '''
'''

[[mounts]]
  # This is the persistent volume mount location, so if you change this
  # you need to also change the Dockerfile and entrypoint.sh wherever "/data" is used.
  destination = "/data"
  source = "clouddevdata"

[[services]]
  internal_port = 22
  protocol = "tcp"

  [[services.ports]]
    port = 10022
```

Fly.io uses the [`fly.toml` configuration file](https://fly.io/docs/reference/configuration/) to configure your application when using the [`flyctl` CLI](https://fly.io/docs/flyctl/).

What happens here?
- The `app` key specifies the name of the Fly.io application after it's created (see below section) and is used by the `flyctl` CLI when issuing commands.
- The `HOME_SSH_AUTHORIZED_KEYS` key can be updated to contain the SSH keys to put into the authorised keys file for our container at runtime. I usually update this with a new SSH key, deploy the application (see section below) which will append it to the `authorized_keys` file, and then remove it from the `fly.toml` file to avoid versioning it in the Git repository.
- The `clouddevdata` persistent volume is mounted on `/data` inside the container.
- We expose port `10022` publicly and route that to port `22` in the container, which is where the SSH daemon we started in our entrypoint script listens.

## Enough! Give me my cloud environment.

OK, after we explained the key parts of the setup, let's see how trivial it is to run this with Fly.io.

### 0. Get the code

The full source code is available in [this repository](https://github.com/lambrospetrou/code-playground/tree/master/flyio-cloud-dev-env), and you can [download it as .zip file here](https://downgit.github.io/#/home?url=https://github.com/lambrospetrou/code-playground/tree/master/flyio-cloud-dev-env).

All `flyctl` commands shown below need to run inside the source code directory.

### 1. Create a Fly.io application (once)

This step only needs to be run once in order to create your Fly.io application.
After [installing the `flyctl` CLI](https://fly.io/docs/flyctl/installing/, run the following:

```sh
flyctl launch --generate-name --no-deploy --copy-config
```

Running the above will give you a prompt to select the region you want to deploy your cloud environment. After selecting the region, the `fly.toml` will also be updated with the autogenerated application name (as specified by `--generate-name`).

If you want to use a specific application name (since it's part of the DNS name you will need to use), then you can use the `--name` argument instead (e.g. `--name lambros-application-1`), but keep in mind that this should be unique across all Fly.io applications globally since it's part of the DNS subdomain you get, e.g. `lambros-application-1.fly.dev`, so there is a high chance your wanted name is taken.

### 2. Create the persistent volume (once)

The main enabler for the cloud development environment is that we can use [persistent disk volumes](https://fly.io/docs/reference/volumes/) to hold our data files while keeping all the OS/packages controlled by the `Dockerfile`. So let's create our volume:

```sh
flyctl volumes create clouddevdata --region lhr --size 10
```

This will create a `10GB` volume in London (`lhr`). You have to create the volume in the same region you selected in the previous step for the application itself! You can also [check the available regions list](https://fly.io/docs/reference/regions/) to find the right value.

### 3. Deploy

This is the only step we need to do every time we change something in our application.

```sh
flyctl deploy
```

This will pick up the `Dockerfile`, check if there are changes and build a new image if necessary, and then trigger a deployment.
Once the deployment is finished you can use the cloud development environment, i.e. SSH into it.

### 4a. Generate SSH keys

**_If you already have your SSH keys you can skip this section and go to [Section 4b](#4b-ssh)._**

To generate your key run the following (replace the `KEY_FILENAME` and the email as necessary):

```sh
ssh-keygen -t ed25519 -f ~/.ssh/<KEY_FILENAME> -C "your_email@example.com"
```

Or use RSA if the Ed25519 algorithm is not supported by your system.

```sh
ssh-keygen -t rsa -b 4096 -f ~/.ssh/<KEY_FILENAME> -C "your_email@example.com"
```

The above command will generate two files:
1. The private key, at `~/.ssh/<KEY_FILENAME>`, which should **never be shared with anyone**.
2. The public key, at `~/.ssh/<KEY_FILENAME>.pub`, which is the one to upload in Github or in our case paste in the `HOME_SSH_AUTHORIZED_KEYS` section as described above.

Common key filenames are `id_<algorithm>`, e.g. `id_rsa`, or `id_ed25519`. In some cases, I generate keys for different purposes so having specific names for the keys is very useful.

You should add the key to the `ssh-agent` for easier use, [following the Github instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent).


### 4b. SSH

The default configuration only allows SSH-ing with authorized keys, and password-based authentication is disabled (see `etc/ssh/sshd_config` in the source code).
Therefore, you need to update the `HOME_SSH_AUTHORIZED_KEYS` value in `fly.toml` with your laptop's SSH key (usually `~/.ssh/id_rsa.pub`), and then deploy once with `flyctl deploy`. Then, you can remove the SSH key from the `HOME_SSH_AUTHORIZED_KEYS` again to keep it safe.

Test that you can SSH into the cloud development environment (assuming application name `lp1111`, and user `clouddevuser`):
```sh
ssh clouddevuser@lp1111.fly.dev -p 10022
```

Now you should be hopefully logged into the remote container, so go nuts, and explore what you can do, do some file changes, and confirm that your changes persist across deployments 🤩

### 5. Visual Studio Code - Remote SSH

VSCode has amazing [remote development capabilities](https://code.visualstudio.com/docs/remote/ssh) which enable full-use of the editor with any remote server accessible over SSH connection.

1. Install the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) from the marketplace.
2. The default configuration only allows SSH-ing with authorized keys, and password-based authentication is disabled (see `etc/ssh/sshd_config` in the source code).
Therefore, you need to update the `HOME_SSH_AUTHORIZED_KEYS` value in `fly.toml` with your laptop's SSH key (usually `~/.ssh/id_rsa.pub`), and then deploy once with `flyctl deploy`. Then, you can remove the SSH key from the `HOME_SSH_AUTHORIZED_KEYS` again to keep it safe.
3. Open the command palette (`CMD+SHIFT+p` on Mac, `CTRL+SHIFT+p` on Windows).
4. Search for the `Remote-SSH: Connect to Host` command and select it.
5. Type your environment details, e.g. `clouddevuser@lp1111.fly.dev:10022`, where `clouddevuser` is the user used in the `Dockerfile`, `lp1111` is the Fly.io application name, and `10022` is the port exported by the `Dockerfile`.

You should then be able to mount any directory on the remote server and use VSCode as if it's working with the local filesystem 🥳

## Conclusion

Fly.io + VSCode Remote-SSH = ❤️ 🚀

### References

- https://code.visualstudio.com/docs/remote/ssh
- https://fly.io/docs/app-guides/vscode-remote/
- https://community.fly.io/t/a-vscode-example-for-fly/460
