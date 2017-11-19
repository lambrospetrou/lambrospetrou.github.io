---
title: Windows Subsystem for Linux - Editor (GUI) Setup
description: In this tutorial I describe how to setup Sublime Text 3 editor with Linux Subsystem in Windows 10 to run it from inside the Ubuntu system.
---

## Problem

While I was testing out the [Windows Subsystem for Linux - WSL](https://msdn.microsoft.com/en-gb/commandline/wsl/install_guide) I setup all my favourite programming languages inside the Linux system instead of Windows. Everything was working smoothly until I had to use an editor to work on some projects.

I initially installed [Visual Studio Code](https://code.visualstudio.com/) in my Windows system but realised that I don't have access to the ```PATH``` or the binaries of my languages installed inside WSL. The solution is to have an X-server running in Windows and then run the editor from inside the WSL but rendering to the X-server display (easier than it sounds).

BTW, if you are a VIM user you can stop reading right now since VIM works out of the box.

## Solution

Firstly, we need to install an X-server in Windows. I installed [Xming X Server for Windows](https://sourceforge.net/projects/xming/) and it works like a charm, with all the default options. Just download, install, and run!

If the server is running successfully, you should see an icon in the notification area of the taskbar that says **Xming Server:0.0**.

Once the X-server is running we are ready to go. In order to start an application with a GUI from inside WSL and have it render in Windows we need to set the environment variable ```DISPLAY=:0``` and then run the command.

```bash
# Either set it right before the command
DISPLAY=:0 command-with-a-gui

# or set it for the whole terminal session
export DISPLAY=:0
command-with-a-gui
```

### Visual Studio Code

I started using Visual Studio Code for the most part of last year and I was really happy with it, but it seems that it cannot properly run through an X server and it is [not a priority of its team to get it working](https://github.com/Microsoft/vscode/issues/13138).

Not a huge issue since my previously favourite editor is perfectly working, but still a bummer since Microsoft's own editor does not work with their system!

### Sublime Text 3

The [Sublime Text 3 installation instructions](https://www.sublimetext.com/docs/3/linux_repositories.html) are straightforward but I copy the commands needed here to make the article more complete.

```bash
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt-get update && sudo apt-get install sublime-text
```

The command to run Sublime Text 3 is ```subl```. So in conjunction with the X-server display variable we can run Sublime using the following command:

```bash
DISPLAY=:0 subl
```

The above command should open a window of Sublime Text inside Windows, and if you try to **Open folder** you should be seeing the Linux subsystem file-system.

The next step is to [install the package control](https://packagecontrol.io/installation) for Sublime so that we can install our favourite plugins.

## Next steps

The font I use for all my text editors, and IDEs, is [Source Code Pro](https://github.com/adobe-fonts/source-code-pro/), which in Ubuntu-like systems can be installed easily using the following commands:

```bash
git clone --depth 1 --branch release https://github.com/adobe-fonts/source-code-pro.git ~/.fonts/adobe-fonts/source-code-pro
fc-cache -f -v ~/.fonts/adobe-fonts/source-code-pro
```

In addition, there are some Sublime options that is good to change from the start. Below you can see the changes I did to my User settings file (**Preferences** -> **Settings**).

```javascript
{
	"font_face": "Source Code Pro",
	"font_size": 10,
	"spell_check": true,
   	"always_show_minimap_viewport": true,
   	"highlight_line": true,

   	"trim_trailing_white_space_on_save": true,
   	"show_encoding": true,
   	"show_line_endings": true,

   	"dictionary": "Packages/Language - English/en_GB.dic",
}
```

## Conclusion

I am really impressed by the work Microsoft did with the **Windows Subsystem for Linux**. I am a Linux user for almost a decade but I always had those days that I had to access a Windows system, either for Microsoft Office, or a BIOS update, or something else. As a result, I always setup my machines to dual-boot Windows and Linux.

With WSL, I have a good feeling that it could be a nice alternative to dual boot. Apart from some limitations with GUI applications not running through an X-server, I didn't have any problem running my favourite languages and tools in WSL. Including Node.js, Racket, Go, Elixir and Erlang, and of course native Linux tools like SSH.

In conclusion, nicely done by Microsoft, and I really hope that this will continue to improve and get polished in order to reach the stability levels we require for day-to-day usage. This could be what Microsoft needed to make Windows a viable option for developers loving their Linux!