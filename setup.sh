#!/bin/sh

CLASSDIR="$(pwd)"

### Prepareation (same as Assignment 2 Part II)
# You may comment them out if you don't need to use them
MTEST1_DATDIR="$(pwd)/Database/testdb/"
cd $MTEST1_DATDIR

db2 -stvf connectCS348.sql
db2 -stvf createNBATables.sql

db2 -stvf populateNBATables.sql