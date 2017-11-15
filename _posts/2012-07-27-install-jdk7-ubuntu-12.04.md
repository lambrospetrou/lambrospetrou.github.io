---
title: Install JDK 7 (Java Development Toolkit) on Ubuntu 12.04 LTS
description: Guide explaining how to easily install Java JDK on your Ubuntu 12.04 LTS.
---

Since version 7 of Java Ubuntu no longer has in its packages the required files for the Oracle JDK 7 due to new license terms by Oracle. The default option for Ubuntu is OpenJDK but if you really want the standard Java from Oracle (former Sun) then you have no easy way to do it on your own.

Therefore I prepared a simple script that will install the Java 7 development toolkit on your system with no effort at all.

1. Download the correct package from Oracle website: [JavaSE Downloads](http://www.oracle.com/technetwork/java/javase/downloads/index.html "JavaSE Downloads").  
Choose the JDK version and afterwards **Linux x86** or **Linux x64** depending on your system. It must be the file with the **.tar.gz** extension.

2. Download my script from here: [Oracle-JDK-Installer Repository](https://github.com/lambrospetrou/oracle-jdk-installer)  
Click the button **ZIP** and after downloading it extract it anywhere, and remember the path.

3. Put the package you downloaded at step 1 in the same directory as the **jdk-installer.sh** you downloaded (step 2).

4. Type

    ```bash
    sudo ./jdk-installer.sh PATH_TO_PACKAGE SYSTEM_ARCHITECTURE
    ```
You can read the instructions at my github repository (step 2) for more information.

5. Verify your installation:

    ```bash
    java -version
    ```
    You should get a message mentioning the version you downloaded.

6. Visit [Verify Java Version](http://www.java.com/en/download/installed.jsp) and click **Verify Java version** in order to check that the browser plugin works.

That's it folks!
