#!/bin/bash
# use nullglob in case there are no matching files
while IFS= read -r line; do
  if [[ "$line" == *"<span class=\"strong\">"* ]]; then
    temp=${line#*>}
    val=${temp%"."*}
    if [[ "$val" -lt 90 ]]; then
      echo "ERROR code coverage < 90 check coverage $val"
      exit 1
    else
      echo "$val"
    fi
  fi
done < ./coverage/game-room/index.html
