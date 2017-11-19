---
title: Command prompt alternatives for Windows
description: I wanted a better terminal, or command prompt, for Windows so I installed ConEmu and am really happy with it.
---

Since I have been fiddling around with [Windows Subsystem for Linux](https://msdn.microsoft.com/en-gb/commandline/wsl/install_guide) I realised how bad **Command Prompt** is compared to [Terminator](https://gnometerminator.blogspot.co.uk/p/introduction.html), my go-to terminal solution for Linux.

I wanted to find an alternative which at least offered multiple tabs, proper text selection and in general being a better terminal for Windows.

I tried several ones but for now I settled with [ConEmu](https://conemu.github.io/) which has the extra benefit of being open-source.

One problem I had with it, is that when you go into the WSL mode, using the ```bash``` command, the arrow keys do not work. This was weird and confusing at first since they work if you go into WSL mode using **Command Prompt**.

The solution is to pass an additional argument when entering the WSL mode through ConEmu, as shown below.

```bash
# `p1` refers to tab-1.
# If you are entering this command to a different tab in ConEmu
# you have to use the proper tab-id.
bash -cur_console:p1

# Or you can open a new tab straight into WSL mode and avoid the tab-id
bash -new_console
```

Now all the keys should work properly.

This nice terminal application, along with the ability to use editors straight from the Linux subsystem as described in a [previous article](/articles/windows-linux-subsystem-editor-setup/) make Windows 10 a very viable solution for developers that love the command line.