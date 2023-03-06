-- inserting values to relationship tables
INSERT INTO Played_at(PLAYER_ID, TEAM_ID, season_id)
SELECT Player.ID as PLAYER_ID, TEAM_ID, season_id
FROM Player;

-- dropping redudant columns
ALTER TABLE Player
DROP COLUMN season_id;

-- select only the last team they played for
DELETE FROM Player WHERE (PLAYER_NAME, ID, TEAM_ID) NOT IN ( SELECT PLAYER_NAME, ID, TEAM_ID  FROM Player GROUP BY PLAYER_NAME HAVING MAX(season_id) = Player.season_id)

ALTER TABLE Game
DROP COLUMN TEAM_ID_home;

ALTER TABLE Game
DROP COLUMN TEAM_ID_away;

ALTER TABLE Player_season_stat
DROP COLUMN Player_name;

ALTER TABLE Player_season_stat
DROP COLUMN Player_name;

ALTER TABLE Player_season_stat
DROP COLUMN Player_name;

ALTER TABLE Player_in_game_stat
DROP COLUMN TEAM_ABBREVIATION;

ALTER TABLE Player_in_game_stat
DROP COLUMN PLAYER_NAME;

ALTER TABLE Player_in_game_stat
DROP COLUMN NICKNAME;