---
title: "Merge two directories recursively"
description: "How to properly merge two directories or folders recursively, even subfolders, on Linux/Unix systems."
---

## Problem

I want to copy all the contents of a directory (or folder) named `source-folder` into another directory named `destination-folder`.

Let's walk-through an example below.

Assume `source-folder` contains:
```
file1.txt
file2.txt
directory1/file3.txt
directory2/file4.txt
```

And `destination-folder` contains:
```
file5.txt
directory1/filexyz.txt
directory2/file4.txt
```

The final structure I want in `destination-folder` should be:
```
file1.txt
file2.txt
file5.txt
directory1/file3.txt
directory1/filexyz.txt
directory2/file4.txt
```

- The `directory2/file4.txt` will be the original that was already in `destination-folder`, hence ignoring the one from the `source-folder`.

## Solution

An easy solution is to use the [`rsync`](https://linux.die.net/man/1/rsync) command line tool, available in most Linux/Unix systems.

```sh
rsync -av --ignore-existing source-folder/* destination-folder/
```

Without the `/*` it just copies the source folder itself into the destination!
So, you would end up with `source-folder` under the `destination-folder/`.

**Note:** According to https://unix.stackexchange.com/a/149986 the wildcard is not needed, but the trailing slash is.

## Detailed explanation

- `rsync`: This is the command-line utility used for synchronizing files and directories between different locations, either on the same system or between different systems.
- `-av`: Combines the following two options:
    - `-a` (or `--archive`): This option is used to achieve archive mode, which is essentially a combination of several other options like `-r` (recursive), `-l` (copy symlinks as symlinks), `-p` (preserve permissions), `-t` (preserve modification times), and more. It's a convenient way to ensure that files are copied with their metadata and properties preserved.
    - `-v` (or `--verbose`): This option enables verbose mode, meaning that rsync will display detailed information about the files being transferred and the progress of the synchronization.
- `--ignore-existing`: This option tells rsync to skip copying files that already exist in the destination folder. If a file with the same name exists in the destination, it won't be overwritten or updated.
