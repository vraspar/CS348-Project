# CS348-Project
1) connect to one of these two servers: ubuntu2004-002.student.cs.uwaterloo.ca, ubuntu2004-004.student.cs.uwaterloo.ca
2) clone the repository into the school server
3) download the csv file games.csv, Players.csv, game_details.csv, teams.csv from https://www.kaggle.com/datasets/nathanlauga/nba-games
4) download the csv file NBA_Player_stats.csv from https://data.world/etocco/nba-player-stats
5) scp these 4 csv files to the directory Database/testdb (here is an example of how to do it 
    scp teams.csv dcsena@ubuntu2004-002.student.cs.uwaterloo.ca:cs348/project/CS348-PROJECT/Database/testdb)
6) run manually the commands in manual_setup.txt
7) run ./setup.sh
----------------------------------------------------------------------------------------
1) For front-end, navigate to the front end directory in the terminal and run npm start
2) We have designed a basic frontend application that is capable of taking string input and preserves line integrity. 
    It is connected to backend but, this is a WIP for Milestone 2
3) Since it is a WIP it may crash sometimes

PS: any questions ask on the discord channel
