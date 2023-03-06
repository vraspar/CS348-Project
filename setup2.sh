#!/bin/sh

CLASSDIR="$(pwd)"

MTEST1_DATDIR="$(pwd)/Database/testdb/"
cd $MTEST1_DATDIR

db2 -stvf connectCS348.sql
db2 -stvf fitNBATables.sql
