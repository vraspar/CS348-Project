#!/bin/sh

python3 -c "import sys, pkgutil; sys.exit(0 if pkgutil.find_loader(sys.argv[1]) else 1)" pandas
if [ "$?" -ne 0 ];
then
    echo "Module pandas not found. Please install or activate venv"
    exit 1
fi

echo "(re)download all required CSV files? (y/n)"
read download

echo "choose the mode you want to use, you have two options: toy or production"
read mode
CLASSDIR="$(pwd)"

MTEST1_DATDIR="$(pwd)/Database/testdb/"
cd $MTEST1_DATDIR

if [ "$download" = "y" ];
then
    ./download_files.sh
fi

db2 -stvf connectCS348.sql
db2 -stvf dropNBAtables.sql
db2 -stvf createNBATables.sql
python3 making_games_details_smaller.py
python3 fitting_teams_and_players_names.py

if [ "$mode" = "toy" ];
then
    db2 -stvf populateNBAToyTables.sql
else
    db2 -stvf populateNBATables.sql
fi
# db2 -stvf connectCS348.sql;db2 -stvf populateNBAGames.sql
db2 -stvf fitNBATables.sql