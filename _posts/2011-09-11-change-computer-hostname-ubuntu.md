---
title: Change your Computer Name (hostname) inside your network - Ubuntu
description: Change the hostname of your PC.
---

Your *hostname* or otherwise Computer Name is the name that your computer uses inside the network it is connected to in order to distinguish itself. Usually you setup your own during the setup of the Operating System but if for any reason you want to change it check out the guide below.

- Open a terminal ```CRTL + ALT + T```

- Execute:

    ```bash
    sudo vim /etc/hostname
    ```

- Change it to whatever you want your name to be, *Save* and *Close* the file

- Now we have to update our *hosts* file in order to route ourselves.

    ```bash
    sudo vim /etc/hosts
    ```

- Find the line where it says: **127.0.1.1 usernameHere** and change it to what you entered above and then *Save* and *Close* the file.

Enjoy your new Computer Name :)
