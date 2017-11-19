---
title: Export environment variables from multiple files using Bash on Linux
description: Easy way to export environment variables defined in multiple files inside a directory, using Bash or any other Linux shell.
---

## Problem

Recently, I have updated the [deployment scripts of my website](https://github.com/lambrospetrou/lambrospetrou.github.io) and for some tasks I wanted to have certain environment variables available in my scripts. For example, I wanted to [invalidate the Cloudfront distribution](http://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html) so that I don't have to wait for the cache to expire before serving the new content, and I needed the `--distribution-id`.

I looked for the easiest way to export environment variables from key-value pairs in a file, and I was delighted to see that the Linux command line tools allow you to do this in 1 line!

## Solution

The solution is based on [this StackOverflow answer](https://stackoverflow.com/a/36456837/1066790).

Assuming the following `aws.environment` file:

```bash
DISTRIBUTION_ID=xxxxxxxxx
S3_BUCKET=www.example.com
```

The following script will export the above key-value pairs as environment variables.

```bash
#!/usr/bin/env bash

source <(sed -E -n 's/[^#]+/export &/ p' aws.environment)

# ... Commands that use the above variables i.e. echo "$DISTRIBUTION_ID"
```

In addition, I didn't want to limit myself only to one file of environment variables because I would like to version control some of them in git. So, I wanted to scan and export variables from all the files in a given directory. This can be done using the following script.

```bash
#!/usr/bin/env bash

source <(find ./build-tool/env/ -type f -exec sed -E -n 's/[^#]+/export &/ p' {} +)

# ... Commands that use the above variables
```

This final adaptation uses the [find command](https://ss64.com/bash/find.html) to read all files in the `./build-tool/env` directory and for each one exports its key-value pairs as environment variables.

That's it! Once again, knowledge of some nifty Linux commands saves the day.