#!/usr/bin/env bash
#
# Approach:
# 1. Find variable declaration in the form of "$my-var: anyvalue"
# 2. Loop through found variables and find occurrences of each variable
# 3. Filter out vars that occurred only once

if [ -z "$1" ]; then
  echo "Please specify a directory as the first argument."
  exit 1
fi
if [ ! -d "$1" ]; then
  echo "Not a valid directory."
  exit 1
fi

echo "Finding unused variables. This might take some time..."

VAR_NAME_CHARS='A-Za-z0-9_-'
find "$1" -type f -name "*.scss" -exec grep -o "\$[$VAR_NAME_CHARS]*" {} ';' | sort | uniq -u
