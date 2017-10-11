---
title: Transfer your contacts to an old Nokia Symbian S40 mobile phone
description: A tutorial on how to copy your contacts to an old Nokia S40 phone.
url: nokia-symbian-s40-contacts-transfer
---

Every now and then we have to change phones and transfer contacts from one device to another. It's a trivial thing to do nowadays with Android, iOS and Windows Phone, but try to do it on an old Nokia Symbian S40 phone. It's 2016 and this simple thing is just **fuxxing too complex**. And it's standards inconsistencies and Nokia to blame!

## Problem

I have my contacts in [Google Contacts](https://contacts.google.com), how they got there from an older S40 device is an even more fascinating story but let's leave it for another post. Now I just want to import these contacts into a [Nokia 301](http://www.gsmarena.com/nokia_301-5323.php), which runs Nokia Symbian S40, and yes some people still use this kind of phones, obviously not me :)

## Solution 1 - Nokia PC Suite

Nokia PC Suite was a nice tool by Nokia, **if and only if** it worked with your phone. In order to make it to recognise the device I had to install specific versions of the software (Nokia PC Suite version 7.1.180.94) and specific version of the Nokia Connectivity Cable driver (version 7.1.182.0).

OK, we are connected and we can manage the device through the PC suite. Now, what?

First of all, I needed to have the contacts in a form that can be imported somehow by the PC suite, so I exported all the contacts from Google to **.csv** and **.vcf** formats just in case one did not work.

There is a handy option in PC suite when you open the contacts section:

```
File => Import
```

which allows you to select any .csv, .vcf file to directly import into your phone. Of course this would be too easy :) so neither the .csv nor the .vcf import worked using the files from Google Export.

The problem with **.csv** is that Google's csv format follows a different structure compared to Nokia's PC suite so that's a **no-go**. The problem with **.vcf** is that this one file was containing ~1000 contacts but the import functionality was only importing 1 contact (the same happens when you send this .vcf file directly to the phone via Bluetooth).

After spending several hours going through myriads of forums with people asking for a solution I found [this article](http://blog.gluga.com/2009/11/import-google-contacts-to-nokia-pc.html) written in 2009 that provides a solution to split this single .vcf file into multiple .vcf files, one for each contact. The tool mentioned in the article, which I also used is [vCard Split](http://www.philipstorry.net/software/vcardsplit) by [Philip Storry](http://www.philipstorry.net/).

**Very important**

* In step 3 (see screenshot below) you have to select **Force version 2.1** otherwise Nokia PC suite will complain and fail to import the contacts. And also select/check the **Remove Type information** option because Google puts a TYPE section in each .vcf which is again not recognizable by PC suite.

![vCard Split screenshot](/articles/nokia-symbian-s40-contacts-transfer/vcard-screenshot.png "vCard Split screenshot")

Awesome, we have all our contacts splitted in a single .vcf file per contact. Now the last thing to do is just select all these .vcf files, COPY them (CTRL + C) and then PASTE them (CTRL + V) into the PC suite contacts section, or simply use the **File => Import** wizard and select all the .vcf files from the opened window.

Great, the tool seems to be importing the files and finishes successfully. **But**, there is a catch :) It seems that Nokia only cares about english/latin characters and any Greek character is converted into a weird symbol which makes your contacts **useless**. 

I searched for quite some time to find a way to bypass this limitation but it's not possible, so PC suite is out of the question. If you want Greek contact names, Nokia PC suite is a **BIG FAIL**.

## Solution 2 - Nokia Transfer app and an Android phone

To be honest this was the first solution I tried but it instantly failed so I went on with PC suite, until that one also failed and I returned to this one. This time I noticed that it was just a small step missing to make it work.

Nokia bundles with the Nokia 301 an application named **Tansfer** which you can also manually install on your own by downloading the **.jar/.jad** setup files and using PC suite to install them on the device. I manually installed the latest version **Transfer 1.0.11**.

This application's functionality is transferring data from **some** phones over to your device via **bluetooth**. I have a Motorolla Moto X and Moto G3 so I tried to use this and transfer the contacts directly from the Android phone to the Nokia phone. The problem was that I was always getting the error **This service is not supported by the phone** with both Androids, which was weird.

Then I went with PC suite route but we know how that ended up. So I decided to give another go on this simple method. This time, the magic was that I deleted the **bluetooth pairing** between the phones on both of them. 

The following steps did the job:

1. Turn on bluetooth on Moto G3
2. Turn on bluetooth on Nokia 301
3. On Nokia 301 go to bluetooth trusted devices and search for new one. Select the Moto G3 and accept the prompts in both phones, **checking/selecting** the option shown in Moto G3 which says **Allow Nokia 301 to read contact information**.
4. Open **Nokia Transfer** app on Nokia 301 (inside the Applications menu option)
5. Select **Add new device** and wait until Moto G3 appears and select it
6. Select Moto G3 from the populated list
7. Select **Import contacts**
8. Wait for the import to finish :)

And now I finally have all the contacts from Google into the Nokia 301.

## Conclusion

If you have a compatible device with Nokia Transfer app it is by far the easiest way to import your contacts into a new Nokia S40 phone, but remember to delete the pairing and then do it properly allowing access to contacts.

If you want to use PC Suite, unfortunately you cannot import contacts with Greek names, and most probably any contact name with non-ANSI characters.

**But please**, upgrade your phones to something modern, preferably Android :) 

## References

* [Import Google Contacts to Nokia PC Suite](http://blog.gluga.com/2009/11/import-google-contacts-to-nokia-pc.html)
* [vCard Split](http://www.philipstorry.net/software/vcardsplit)
* [Nokia Suite Support for Nokia 301 - Microsoft Answers](http://answers.microsoft.com/en-us/mobiledevices/forum/mdasha/nokia-suite-support-for-nokia-301/58a39104-d1ff-4ff1-91af-983ded51ea27)
