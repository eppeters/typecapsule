#!/bin/bash
# infinitely post fake start and end times (these are actually just random
# 32-bit unsigned ints, so don't use them for their time values), as well
# as fake text from fake_text.txt
#set -x

FAKE_TIME1=0
FAKE_TIME2=1
FAKE_TEXT=$(<fake_text.txt)
#FAKE_TEXT="This is a test."
COUNTER=0

while :
do
	FAKE_TIME1=`(od -vAn -N4 -tu4 < /dev/urandom) | tr -d ' \n'`
	FAKE_TIME2=`(od -vAn -N4 -tu4 < /dev/urandom) | tr -d ' \n'`
	curl -d "s=$FAKE_TIME1&r=$FAKE_TIME2&t=$FAKE_TEXT" http://localhost:8080/seal
	((COUNTER=COUNTER+1))
	echo "$COUNTER submissions of the Decl. of Independence"
done
