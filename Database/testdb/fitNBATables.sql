-- inserting values to relationship tables
INSERT INTO Played_at(PLAYER_ID, TEAM_ID, season_id)
SELECT Player.ID as PLAYER_ID, TEAM_ID, season_id
FROM Player;

INSERT INTO Plays_for(PLAYER_ID, TEAM_ID)
SELECT P1.ID as PLAYER_ID, P1.TEAM_ID as TEAM_ID 
FROM Player as P1 
LEFT JOIN Player as P2 ON P1.season_id < P2.season_id 
WHERE P2.ID IS NULL;

-- dropping redudant columns
ALTER TABLE Player
DROP COLUMN season_id;

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