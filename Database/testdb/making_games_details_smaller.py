import pandas as pd

big = pd.read_csv("games_details.csv")

small = big[(big["TEAM_ABBREVIATION"] == "GSW") | (big["TEAM_ABBREVIATION"] == "BOS") | (big["TEAM_ABBREVIATION"] == "LAL")]
small = small[(small["PLAYER_NAME"] == "LeBron James") | (small["PLAYER_NAME"] == "Kevin Garnett") | (small["PLAYER_NAME"] == "Stephen Curry")]

small.to_csv("toy_games_details.csv", index=False)

size = len(big) // 10

def create_chunk_games_details(k):
    small1 = big.iloc[size*k:size*(k+1)]
    small1.to_csv("games_details_smaller_" + str(k) + ".csv", index=False)


create_chunk_games_details(0)
create_chunk_games_details(1)
create_chunk_games_details(2)
create_chunk_games_details(3)
create_chunk_games_details(4)
create_chunk_games_details(5)
create_chunk_games_details(6)
create_chunk_games_details(7)
create_chunk_games_details(8)
create_chunk_games_details(9)