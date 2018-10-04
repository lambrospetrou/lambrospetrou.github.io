#!/usr/bin/env bash

set -e

DRYRUN="--dryrun"
if [ "$1" == "--no-dryrun" ]; then
    DRYRUN=""
fi

aws s3 sync _site s3://www.lambrospetrou.com --delete $DRYRUN

#(sed -E -n 's/[^#]+/export &/ p' build-tool/env/aws.env)
source <(find build-tool/env/ -type f -exec sed -E -n 's/[^#]+/export &/ p' {} +)

if [[ -z "$DRYRUN" ]]; then
    echo "Doing invalidation for Cloudfront distribution..."
    echo "CloudfrontId: $CLOUDFRONT_ID"
    
    aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*"
fi
