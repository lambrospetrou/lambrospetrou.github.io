---
title: Control the fan speed of you Thinkpad T430 running Ubuntu 12.04 LTS
description: Easy way to control the fan speed of your Thinkpad based on the temperatures of its sensors.
url: control-thinkpad-t430-fan-ubuntu-12.04
---

After researching for a few hours online to find a guide on how to control my Thinkpad's fan speed I realized that the new models have some differences from previous models and the guides available are not complete if not wrong. So, I am making this tutorial for anyone that has a new Thinkpad (x30/x20 models) and needs to control his fan in order to keep the noise down and get more battery life.

Every step below uses the terminal so open an instance with the combination ```CRTL + ALT + T```

1. The first thing we will do is to install a program that will provide us information about the sensors of the laptop and their temperatures

    ```bash
    sudo apt-get install lm-sensors
    ```
Configure the application in order to find every available sensor

    ```bash
    sudo sensors-detect
    ```
Answer **Yes** to every question and the last confirmation for saving the changes made.

2. Install **thinkfan** which is our main program:

    ```bash
    sudo apt-get install thinkfan
    ```

3. Add the **coretemp** module to the startup list. It will provide us the temperature inputs.

    ```bash
    echo coretemp >> /etc/modules
    ```

4. Load the **coretemp** module.

    ```bash
    sudo modprobe coretemp
    ```

5. The next step is to find your temperature inputs so take note the results of the following command.

    ```bash
    sudo find /sys/devices -type f -name "temp*_input"
    ```

    If you don't get any outputs ( similar to the next step ) please Reboot and continue from this step.

6. It's time to edit our **thinkfan** configuration

    ```bash
    sudo vim /etc/thinkfan.conf
    ```

    Go to the line where it says **#sensor /proc/acpi/ibm/thermal ...** and below that line (which should be commented since thermal is not supported in the new thinkpads) insert something like the following:

    ```bash
    sensor /sys/devices/platform/coretemp.0/temp1_input
    sensor /sys/devices/platform/coretemp.0/temp2_input
    sensor /sys/devices/platform/coretemp.0/temp3_input
    sensor /sys/devices/virtual/hwmon/hwmon0/temp1_input
    ```
    The above lines are the results from Step 5 prefixed with 'sensor '.

7. Time to set the temperature rules. The format is: ```FAN_LEVEL, LOW_TEMP, HIGH_TEMP``` meaning that each *FAN_LEVEL* will start when the highest temperature reported by all the sensors meets its *LOW_TEMP* and if it surpasses its *HIGH_TEMP* it will go to the next *FAN_LEVEL* rule. If it goes below the *LOW_TEMP* it will fallback to the previous *FAN_LEVEL* rule.

    **Please take notice** that the *HIGH_TEMP* of a rule must be between the *LOW_TEMP* & *HIGH_TEMP* of the rule that follows.

    #### My settings are:

    ```
    #(FAN_LEVEL, LOW, HIGH)
    (0,    0,    60)
    (1,    57,    63)
    (2,    60,    66)
    (3,    64,    68)
    (4,    66,    72)
    (5,    70,    74)
    (7,    72,    32767)
    ```
    **NOTE: I am not responsible for any problems you encounter with these rules. They are fine as per my configuration so please test them before using them and if necessary adjust them to your needs.**

8. Now, we must add a configuration file into the modprobe.d

    ```bash
    sudo echo "options thinkpad_acpi fan_control=1" >> /etc/modprobe.d/thinkpad.conf
    ```

9. If you want to start **thinkfan** automatically at boot-time please type the following:

    ```bash
    sudo vim /etc/default/thinkfan
    ```

    Change the line **START=no** to **START=yes**. If the line does not exist, add it yourself.

10. **RESTART** your laptop and everything should work as expected. Test your laptop's temperatures (using **sensors** command) under different workloads and verify that the fan speed is as per the rules you defined.

If you encounter a typing mistake or a step not working for you please contact me.
