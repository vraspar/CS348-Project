#!/bin/sh

rm -f *.csv
wget -r -nd --reject "index.html*" "https://ryanlarkin.github.io/cs348-data/"
rm -f index.html.tmp
