#/bin/bash

mkdir extract
i=0
for link in $(cat ./list/page_*.html | pup '#eventSearch-1-0-result ul.SP-TeaserList__list a[rel=bookmark] attr{href}'); do
 filename=${i}
 ((i++))
 curl "https://www.bonn.de"$link > ./extract/$filename.html &
done
