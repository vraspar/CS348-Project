# CS348-Project
1) connect to one of these two servers: ubuntu2004-002.student.cs.uwaterloo.ca
ubuntu2004-004.student.cs.uwaterloo.ca
2) download the csv file games.csv, Players.csv, game_details.csv from https://www.kaggle.com/datasets/nathanlauga/nba-games
3) scp these 3 csv files to the directory Database/testdb (here is an example of how to do it 
    scp teams.csv dcsena@ubuntu2004-002.student.cs.uwaterloo.ca:cs348/project/CS348-PROJECT/Database/testdb)
4) run manually the commands in manual_setup.txt
5) run ./setup.sh
6) cd Database/testdb
7) db2 -stvf populateNBAGames.sql (for some reason running this on a script doesn't work)

PS: any questions ask on the discord channel
