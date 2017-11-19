---
title: AWS S3 sync - only modified files, using git status
description: An easy script to sync folders with S3 but only the updated, modified, files. I use git to properly handle changes.
---

## Problem

As you know I build this website using my custom site generator builder so the whole website is being re-created every time I change something. Similar tools are widely used by many people, like [Jekyll](https://jekyllrb.com/).

Then I use the [AWS S3 sync](http://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) command to update the public version of the site in my S3 bucket. The only problem with this is that since the local website is fully re-built every time it seems to be **newer** than the remote website in the S3 bucket (due to newer modification timestamps), resulting in extra uploads for all files. 

## Git Solution

The easiest solution to solve this problem is to use **git** to handle diff changes and then just pass along the modified files to the **aws s3 sync** command that will sync them against the remote S3 bucket.

So, long story short, assuming you have the site's directory git-versioned the following script will sync the directory with the remote S3 bucket, including adding new files, removing deleted files, etc.

```bash
#!/bin/bash
set -ex

FILES=()
for i in $( git status -s | sed 's/\s*[a-zA-Z?]\+ \(.*\)/\1/' ); do
    FILES+=( "$i" )
done
#echo "${FILES[@]}"

CMDS=()
for i in "${FILES[@]}"; do
    CMDS+=("--include=$i""*")
done
#echo "${CMDS[@]}"

echo "${CMDS[@]}" | xargs aws s3 sync . s3://www.lambrospetrou.com --dryrun --delete --exclude "*" 
```

**Important**

You have to remove the ```--dryrun``` option in order to actually apply the changes remotely, otherwise it will just fake them.

### Explanation

The important part of the above script is the ```--include``` and ```--exclude``` filters. The order of the filters **matters**, that's why we have the exclude first, and the includes last. In case the exclude was last nothing would be updated.

The two for-loops generate the required ```--include=FileX``` arguments, which are expanded using the ```"${CMDS[@]}"``` trick. Then **xargs** takes care of sending them as last arguments to the aws s3 sync command, also taking care of very long list of files that exceed the command line length limit.

In addition, I have to use ```git status``` instead of ```git diff``` otherwise new files will not be synced, since they are not part of the index tree.

## Conclusion

Using **git** along with **aws CLI** it's very easy to maintain my website and only upload the real **diff**, modified files, each time. One can imagine that this can be used in a much more advanced scenario with [Github webhooks](https://developer.github.com/webhooks/) integrated with [AWS CodePipeline](https://aws.amazon.com/codepipeline/) or any other CI tool that will release your website automatically.

## References

* [AWS S3 sync documentation](http://docs.aws.amazon.com/cli/latest/reference/s3/sync.html)
* [git status documentation](https://git-scm.com/docs/git-status)
