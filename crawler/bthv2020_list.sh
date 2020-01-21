#/bin/bash

page_template="PAGE_NUMBER"
url='https://www.bonn.de/bonn-erleben/beethoven/veranstaltungen-bthvn-2020.php?form=eventSearch-1.form&sp%3Afulltext%5B%5D=&sp%3Acategories%5B60427%5D%5B%5D=-&sp%3Acategories%5B60427%5D%5B%5D=__last__&sp%3Acategories%5B1530%5D%5B%5D=-&sp%3Acategories%5B1530%5D%5B%5D=__last__&sp%3AdateFrom%5B%5D=&sp%3AdateTo%5B%5D=&sp%3Apage%5BeventSearch-1.form%5D%5B0%5D=PAGE_NUMBER&action=submit'

mkdir list/
for i in {1..34};do
   curl "${url/$page_template/$i}" > ./list/page_$i.html
done
