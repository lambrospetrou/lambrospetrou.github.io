#!/bin/bash

# Run this script giving the number of commits to compare against.
# By default it will compare with the previous commit and upload the diff.
# For example: ```./deploy.sh 2``` will diff against the HEAD~3 and upload.

set -ex

if [ -n "$1" ]; then
    COMMITS="$1"
else
    COMMITS="1"
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#REPO="$(pwd)"
REPO="$(dirname "$SCRIPT_DIR")"

TMP_DIR="/tmp/lp-website-s3"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
pushd "$TMP_DIR"
git clone "$REPO"
cd $(basename "$REPO")

# make sure we are clean
git reset --hard HEAD

# build the latest version
gomicroblog -site ./
mv _site _site.latest

# build the previous version
git reset --hard "HEAD~$COMMITS"
gomicroblog -site ./

pushd _site
git init . && git add --all . && git commit -m 'previous'

git checkout -b latest
find ./ -maxdepth 1 -not -path "./.git*" -not -iname "." -exec rm -rf {} \;
cp -r ../_site.latest/* .

# Run the script from my article https://www.lambrospetrou.com/articles/aws-s3-sync-git-status/
"$SCRIPT_DIR/"./git-changes-upload-s3.sh

# Exit the _site and then return to current working directory
popd
popd

# Invalidate the cloudfront distribution
read -p "Enter a cloudfront distribution id to invalidate: " CLOUDFRONT_ID
if [ -n "$CLOUDFRONT_ID" ]; then
    aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*"
fi