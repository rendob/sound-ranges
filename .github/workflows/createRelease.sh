#!/bin/bash

set -eu

echo "***** Getting version... *****"
VERSION_TAG=$(git tag --sort=-creatordate | head -n 1)

echo "***** Creating release... *****"
LATEST_RELEASE_TAG=$(gh release view --json name --jq ".name" || :) # ignore error
if [[ -z $LATEST_RELEASE_TAG ]]; then
    gh release create "$VERSION_TAG" --generate-notes --verify-tag
else
    gh release create "$VERSION_TAG" --generate-notes --verify-tag --notes-start-tag "$LATEST_RELEASE_TAG"
fi
