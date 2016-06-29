---
title: Wordpress permissions guide
description: Fix the permissions of your own wordpress installation.
url: wordpress-permissions
---


If you have ever installed wordpress on your own server, at some time you faced permissions problems. Especially when you are migrating a wordpress blog from one host to another and there is file copying involvement through ftp, scp etc.

If not, lucky you! :)

## Scenario

| Description | Value |
|-------------|------|
| username | lpuser |
| apache2 groupname | www-data |
| wordpress dir | /home/lpuser/wordpress/ |

Let's say you are ```lpuser``` and your server that runs the wordpress blog belongs to the ```www-data``` permissions group.

## Wordpress Permissions

Everything should have the ```0755``` permission for the user, apart from the *.htaccess* files and the *wp-admin/index.php* file that need to have ```0644```.

Let's do this:

```bash
sudo chmod -R 0755 /home/lpuser/wordpress/
sudo chmod 0644 /home/lpuser/wordpress/.htaccess
sudo chmod 0644 /home/lpuser/wordpress/wp-admin/index.php
```

Now if you execute the following command you should verify that everything has ```rwxr-xr-x```, and the two other files ```rw-r--r--```.

If you try now to make changes to your theme through the wordpress editor then you won't be able to save since the server does not have write permissions.
We can find that apache runs under the user ```www-data``` and the same group, as seen by the following commands:

```bash
ps aux | grep apache
groups www-data
```

So an easy solution to fix the problems is to add ourselves to the group ```www-data``` and then make the files to be owned by us, and the new group we belong.

This can be achieved with the following commands:

```bash
sudo usermod -a -G www-data lpuser
sudo chown -R lpuser:www-data /home/lpuser/wordpress/wp-content/themes
chmod -R 0775 /home/lpuser/wordpress/wp-content/themes
```

The last command allows the group to read/write/execute on the **themes** folder only.

If you have another way don't hesitate to share it. The scenario is that we have a username different than the server's that runs the wordpress blog.
