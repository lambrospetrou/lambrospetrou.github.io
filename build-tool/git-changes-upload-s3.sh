#!/bin/bash
set -ex

FILES=()
#for i in $( git diff --name-only ); do
for i in $( git status -s | sed 's/\s*[a-zA-Z?]\+ \(.*\)/\1/' ); do
    FILES+=( "$i" )
done
#echo "${FILES[@]}"

CMDS=()
for i in "${FILES[@]}"; do
    CMDS+=("--include=$i""*")
done
#echo "${CMDS[@]}"

echo "${CMDS[@]}" | xargs aws s3 sync . s3://www.lambrospetrou.com --delete --exclude "*" 
#for i in "${FILES[@]}"; do echo "--include=$i""*"; done | xargs aws s3 sync . s3://www.lambrospetrou.com --dryrun --delete --exclude "*" 
