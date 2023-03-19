import from teams.csv of del insert into Team;
-- import from players.csv of del insert into Player;
import from games.csv of del insert into Game;

import from NBA_Player_Stats.csv of del insert into raw_Player_season_stat;
-- import from games_details_smaller.csv of del insert into Player_in_game_stat;
-- import from games_details_smaller_1.csv of del insert into Player_in_game_stat;

import from games_details_smaller_0.csv of del insert into Player_in_game_stat;
import from games_details_smaller_1.csv of del insert into Player_in_game_stat;
import from games_details_smaller_2.csv of del insert into Player_in_game_stat;
import from games_details_smaller_3.csv of del insert into Player_in_game_stat;
import from games_details_smaller_4.csv of del insert into Player_in_game_stat;
import from games_details_smaller_5.csv of del insert into Player_in_game_stat;
import from games_details_smaller_6.csv of del insert into Player_in_game_stat;
import from games_details_smaller_7.csv of del insert into Player_in_game_stat;
import from games_details_smaller_8.csv of del insert into Player_in_game_stat;
import from games_details_smaller_9.csv of del insert into Player_in_game_stat;


DELETE FROM Player_in_game_stat WHERE PLAYER_ID IN (202683, 1628384, 1628388 ,1628408, 1629651, 1629718, 1630288, 1630835);
    --select distinct T1.PLAYER_ID from Player_in_game_stat as T1, Player_in_game_stat as T2 WHERE T1.PLAYER_ID = T2.PLAYER_ID and T1.PLAYER_NAME != T2.PLAYER_NAME);

-- populate Player table
INSERT INTO Player (PLAYER_NAME, ID) SELECT Distinct Player_in_game_stat.PLAYER_NAME as PLAYER_NAME, Player_in_game_stat.Player_ID as ID FROM Player_in_game_stat;

import from NBA_Finals_and_MVP_2.csv of del insert into raw_nba_finals_awards;