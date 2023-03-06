-- inserting values to relationship tables
INSERT INTO Played_at(PLAYER_ID, TEAM_ID, season_id)
SELECT Player.ID as PLAYER_ID, TEAM_ID, season_id
FROM Player;


-- select only the last team they played for
DELETE FROM Player WHERE (ID, season_id) NOT IN (SELECT ID, MAX(season_id) FROM Player GROUP BY ID);

-- TODO need to select the first row and not the one with maximum team id
DELETE FROM Player WHERE (ID, TEAM_ID) NOT IN (SELECT ID, MAX(Team_id) FROM Player GROUP BY ID);

-- adding key constraints
ALTER TABLE Player ADD PRIMARY KEY (ID);

DELETE FROM Player_in_game_stat WHERE Player_ID NOT IN (SELECT ID FROM Player);
ALTER TABLE Player_in_game_stat ADD FOREIGN KEY (PLAYER_ID) REFERENCES Player(ID);

DELETE FROM Played_at WHERE Player_ID NOT IN (SELECT ID FROM Player);
ALTER TABLE Played_at ADD FOREIGN KEY (PLAYER_ID) REFERENCES Player(ID);

-- dropping redudant columns
ALTER TABLE Player DROP COLUMN season_id;

ALTER TABLE Game DROP COLUMN TEAM_ID_home;

ALTER TABLE Game DROP COLUMN TEAM_ID_away;

ALTER TABLE Player_season_stat DROP COLUMN Player_name;

ALTER TABLE Player_in_game_stat DROP COLUMN TEAM_ABBREVIATION;

ALTER TABLE Player_in_game_stat DROP COLUMN PLAYER_NAME;

ALTER TABLE Player_in_game_stat DROP COLUMN NICKNAME;