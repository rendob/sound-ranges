#!/bin/bash

# Usage:
# NEW_VERSION_CODE=$(incrementVersion $CURRENT_VERSION $TYPE $STEP)
function incrementVersion() {
    CURRENT_VERSION=$1
    TYPE=$2
    STEP=$3

    IFS="." read -r -a VERSION_ARRAY <<<"$CURRENT_VERSION"
    MAJOR_VERSION=${VERSION_ARRAY[0]}
    MINOR_VERSION=${VERSION_ARRAY[1]}
    PATCH_VERSION=${VERSION_ARRAY[2]}
    case $TYPE in
    "major")
        MAJOR_VERSION=$((MAJOR_VERSION + STEP))
        MINOR_VERSION=0
        PATCH_VERSION=0
        ;;
    "minor")
        MINOR_VERSION=$((MINOR_VERSION + STEP))
        PATCH_VERSION=0
        ;;
    "patch")
        PATCH_VERSION=$((PATCH_VERSION + STEP))
        ;;
    *)
        printf "Error: invalid type (%s)\n" "$TYPE"
        exit 1
        ;;
    esac

    printf "%d.%d.%d" "$MAJOR_VERSION" "$MINOR_VERSION" "$PATCH_VERSION"
    return
}

# ----- main -----

# exit if error has occurred
set -eu

# parse arguments
FILE_PATH=""
TYPE="" # major | minor | patch
STEP=1  # int
while (($# > 0)); do
    case $1 in
    -h | --help)
        printf "\n"
        printf "Automatically update version.\n"
        printf "\n"
        printf "Args:\n"
        printf "\t-i, --input\tfile to be updated\n"
        printf "\t-t, --type\tversion type to be updated (major, minor, patch)\n"
        printf "\t-s, --step\tthe amount by which the version is incremented (default: 1)\n"
        printf "\n"
        exit 0
        ;;
    -i | --input)
        FILE_PATH=$2
        shift
        ;;
    -t | --type)
        TYPE=$2
        shift
        ;;
    -s | --step)
        STEP=$2
        shift
        ;;
    *)
        printf "Error: unexpected argument (%s)!\n" "$1"
        exit 1
        ;;
    esac
    shift
done

# check arguments
if [ -z "$FILE_PATH" ]; then
    printf "Error: file must be specified!\n"
    exit 1
fi
if [ -z "$TYPE" ]; then
    printf "Error: type must be specified!\n"
    exit 1
fi
if [ "$TYPE" != "major" ] && [ "$TYPE" != "minor" ] && [ "$TYPE" != "patch" ]; then
    printf "Error: invalid type (%s)\n" "$TYPE"
    exit 1
fi

echo "***** Updating version... *****"
CURRENT_VERSION=$(jq -r '.version' "$FILE_PATH")

NEW_VERSION=$(incrementVersion "$CURRENT_VERSION" "$TYPE" "$STEP")
TMP_FILE_PATH="tmp"
jq ".version=\"$NEW_VERSION\"" "$FILE_PATH" >$TMP_FILE_PATH && mv $TMP_FILE_PATH "$FILE_PATH"

echo "***** Exporting values... ***** "
echo "NEW_VERSION=$NEW_VERSION" >>"$GITHUB_ENV"
