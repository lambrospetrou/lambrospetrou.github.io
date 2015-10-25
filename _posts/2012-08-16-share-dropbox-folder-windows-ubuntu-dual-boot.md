---
title: Share your Dropbox folder between Windows and Ubuntu on dual-boot system
description: Tutorial on how to share your Dropbox sync folder between  Windows and Linux.
url: share-dropbox-folder-windows-ubuntu-dual-boot
---

Many users are dual booting Windows and Ubuntu for numerous reasons today. Well a problem that may arise is that if you have Dropbox, you should have 2 folders of your Dropbox files, 1 for Windows and 1 for Ubuntu.

Following the guide below you can consolidate them into one and reclaim your wasted space back.

**NOTE**: I am assuming that the Windows partition is mounted at startup when you boot into Ubuntu.

## Guidelines

1. Set up your Dropbox folder inside **Windows** first and verify that it is syncing your files without problems.

2. Boot into Ubuntu and stop Dropbox from syncing.

    ```bash
    pkill dropbox
    ```

3. Delete your Dropbox folder from Ubuntu (the command below assumes it's located in your home directory).

    ```bash
    rm -rf /home/_username_/Dropbox/
    ```

4. Create a symlink to your Windows Dropbox folder (this will create a symbolic link  in your home directory that links to your Dropbox folder in Windows).

    ```bash
    ln -s /media/WindowsOS/User/_username_/Dropbox /home/_username_/Dropbox
    ```

    ```/media/WindowsOS/User/_username_/Dropbox```
    the path to the Dropbox folder in your Windows partition mounted in Ubuntu  

    ```/home/_username_/Dropbox```
    the default folder for Dropbox to synchronize

5. Reboot and you’ re finished. Now you maintain only one copy of your Dropbox folder which needs to be synced only once, no matter which OS is booted at any time.

That's it, I hope you won't find any problems. If you do though, contact me :)
