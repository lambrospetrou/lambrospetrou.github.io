---
title: nVidia Optimus Support in Ubuntu 12.04 LTS - How to get the most of your battery life guide
url: nvidia-optimus-support-ubuntu-12.04
---

Anyone that purchased a laptop with nVidia Optimus is facing problems with Linux support. In a few words, Optimus is not supported officially ( the best project so far is Bumblebee ). As a result the power draw is more than double compared to integrated card-only systems because both cards are enabled and loaded but only one is in use, the Integrated one.

**Bumblebee** is a project that tries to bring Optimus support in Ubuntu and so far it had good results but the battery impact was inevitable.

The latest update though changed that and now linux fans can have their Optimus configuration without the enormous battery draw. Follow the steps below to install bumblebee but please note that I am assuming you removed any nVidia drivers you may installed on your own.

- We must add the repositories for the bumblebee packages so please type the following in your terminal (CRTL + ALT + T)

    ```bash
    sudo add-apt-repository ppa:ubuntu-x-swat/x-updates
    sudo add-apt-repository ppa:bumblebee/stable
    sudo apt-get update
    ```

- Now install the bumblebee:

    ```bash
    sudo apt-get install bumblebee bumblebee-nvidia
    ```

    **NOTE::** If you do not want the discrete card to be enabled at all please use the following command instead:

    ```bash
    sudo apt-get install --no-install-recommends bumblebee
    ```

    This will not install the drivers for your discrete card  but if you want in the future to have it just enter the following and get it installed:

    ```bash
    sudo apt-get install bumblebee-nvidia
    ```

- Some people recommend to *reboot* now although I saw the results without doing so.

- If you installed the nVidia driver too, in order to launch a program and use the discrete card you must use the following command:

    ```bash
    optirun _appnamehere_ &
    ```

In order to get support for 32-bit applications with nVidia you should do the following:

```bash
sudo apt-get install virtualgl-libs-ia32
```

I hope that you will find this guide helpful. I got amazing results with it myself:  
Power draw before: 26-28w  
Power draw after: 11-13w

[Bumblebee Project Website](http://bumblebee-project.org/)
