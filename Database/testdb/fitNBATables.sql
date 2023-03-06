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

create table player_season_stat as 
(select Player.ID as Player_ID, POS, AGE, TEAM, G, GS,   MP,   FG,   FGA,  FG_2,  THREEP, THREEPA, THREEP_PERCENTAGE,
 TWOP,   TWOPA,  TWOP_PERCENTAGE, EFG,     FT,     FTA,    FT_2,    ORB,   DRB,    TRB,    AST,    STL,   BLK,   
 TOV, PF ,PTS , raw_Player_season_stat.SEASON_ID from player, raw_player_season_stat  
 WHERE raw_PLAYER_SEASON_STAT.PLAYER_NAME = PLAYER.PLAyER_NAME) with data; 
ALTER TABLE player_season_stat ADD FOREIGN KEY (PLAYER_ID) References Player(ID);
-- TODO add primary key constraints to the player_season_stat

-- dropping redudant columns
ALTER TABLE Player DROP COLUMN season_id;

ALTER TABLE Game DROP COLUMN TEAM_ID_home;
ALTER TABLE Game DROP COLUMN TEAM_ID_away;

-- ALTER TABLE Player_season_stat DROP COLUMN Player.Player_name;
ALTER TABLE Player_season_stat DROP COLUMN Team;

ALTER TABLE Player_in_game_stat DROP COLUMN TEAM_ABBREVIATION;
ALTER TABLE Player_in_game_stat DROP COLUMN PLAYER_NAME;
ALTER TABLE Player_in_game_stat DROP COLUMN NICKNAME;