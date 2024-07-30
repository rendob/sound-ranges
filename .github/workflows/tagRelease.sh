#!/bin/bash

set -eu

echo "***** Getting version... *****"
FILE_PATH=package.json
VERSION_TAG=$(jq -r '.version' "$FILE_PATH")

echo "***** Adding tag... *****"
git config --local user.name "actions-user"
git config --local user.email "action@github.com"
git tag -a "$VERSION_TAG" -m "$VERSION_TAG"
git push origin "$VERSION_TAG"

echo "***** Creating release... *****"
LATEST_RELEASE_TAG=$(gh release view --json name --jq ".name" || :) # ignore error
if [[ -z $LATEST_RELEASE_TAG ]]; then
    gh release create "$VERSION_TAG" --generate-notes --verify-tag
else
    gh release create "$VERSION_TAG" --generate-notes --verify-tag --notes-start-tag "$LATEST_RELEASE_TAG"
fi
