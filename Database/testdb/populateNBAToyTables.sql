import from teams.csv of del insert into Team;

DELETE FROM Team WHERE Team.NICKNAME NOT IN ('Warriors', 'Lakers', 'Celtics');

import from games.csv of del insert into Game;

DELETE FROM Game WHERE Game.TEAM_ID_home NOT IN (SELECT ID FROM Team);

DELETE FROM Game WHERE Game.TEAM_ID_away NOT IN (SELECT ID FROM Team);

import from NBA_Player_Stats.csv of del insert into raw_Player_season_stat;

DELETE FROM raw_Player_season_stat WHERE raw_Player_season_stat.Player_name NOT IN ('Stephen Curry', 'LeBron James', 'Kevin Garnett');

DELETE FROM raw_Player_season_stat WHERE raw_Player_season_stat.Team NOT IN ('BOS', 'GSW', 'LAL');

import from toy_games_details.csv of del insert into Player_in_game_stat;

DELETE FROM Player_in_game_stat WHERE Player_in_game_stat.Player_name NOT IN ('Stephen Curry', 'LeBron James', 'Kevin Garnett') OR Player_in_game_stat.TEAM_ABBREVIATION NOT IN ('BOS', 'GSW', 'LAL');

INSERT INTO Player (PLAYER_NAME, ID) SELECT Distinct Player_in_game_stat.PLAYER_NAME as PLAYER_NAME, Player_in_game_stat.Player_ID as ID FROM Player_in_game_stat;

DELETE FROM Player_in_game_stat WHERE GAME_ID NOT IN (SELECT GAME_ID FROM Player_in_game_stat LIMIT 50);

DELETE FROM Game WHERE GAME.ID NOT IN (Select GAME_ID From Player_in_game_stat);

-- populate Player table
import from NBA_Finals_and_MVP_2.csv of del insert into raw_nba_finals_awards;