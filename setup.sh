#!/bin/sh

CLASSDIR="$(pwd)"

MTEST1_DATDIR="$(pwd)/Database/testdb/"
cd $MTEST1_DATDIR

db2 -stvf connectCS348.sql
db2 -stvf dropNBAtables.sql
db2 -stvf createNBATables.sql
db2 -stvf populateNBATables.sql

python3 making_games_details_smaller.py