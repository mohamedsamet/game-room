#!/bin/bash
# use nullglob in case there are no matching files

# create an array with all the filer/dir inside ~/myDir
arr=(`find ./src/app -name "*.component.ts" -o -name "*.service.ts" `)
# iterate through array using a counter
for ((i=0; i<${#arr[@]}; i++)); do
    #do something to each element of array
    if ls `dirname ${arr[$i]}`/**.spec.ts; then
      echo "OK"
    else
      echo "ERROR cannot find spec files" `dirname ${arr[$i]}`/**.spec.ts
      exit 1
    fi
done
