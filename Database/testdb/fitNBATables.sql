-- populating tables that are derived from other tables

INSERT INTO Played_at (PLAYER_ID, TEAM_ID, season_id) SELECT Distinct Player_in_game_stat.Player_ID as PLAYER_ID, Player_in_game_stat.TEAM_ID as TEAM_ID, GAME.Season as season_id FROM Player_in_game_stat, Game WHERE Player_in_game_stat.GAME_ID = Game.ID;


-- select * from Player, Player_in_game_stat WHERE Player.ID = Player_in_game_stat.PLAYER_ID LIMIT 5
-- -- select only the last team they played for
-- DELETE FROM Player WHERE (ID, season_id) NOT IN (SELECT ID, MAX(season_id) FROM Player GROUP BY ID);

-- -- TODO need to select the first row and not the one with maximum team id
-- DELETE FROM Player WHERE (ID, TEAM_ID) NOT IN (SELECT ID, MAX(Team_id) FROM Player GROUP BY ID);

-- adding key constraints

-- DELETE FROM Player_in_game_stat WHERE Player_ID NOT IN (SELECT ID FROM Player);
ALTER TABLE Player_in_game_stat ADD FOREIGN KEY (PLAYER_ID) REFERENCES Player(ID);

DELETE FROM Played_at WHERE Player_ID NOT IN (SELECT ID FROM Player);
ALTER TABLE Played_at ADD FOREIGN KEY (PLAYER_ID) REFERENCES Player(ID);

create table player_season_stat as 
(select Player.ID as Player_ID, POS, AGE, TEAM, G, GS,   MP,   FG,   FGA,  FG_2,  THREEP, THREEPA, THREEP_PERCENTAGE,
 TWOP,   TWOPA,  TWOP_PERCENTAGE, EFG,     FT,     FTA,    FT_2,    ORB,   DRB,    TRB,    AST,    STL,   BLK,   
 TOV, PF ,PTS , raw_Player_season_stat.SEASON_ID from player, raw_player_season_stat  
 WHERE raw_PLAYER_SEASON_STAT.PLAYER_NAME = PLAYER.PLAyER_NAME) with data; 
ALTER TABLE player_season_stat ADD FOREIGN KEY (PLAYER_ID) References Player(ID);
ALTER TABLE player_season_stat ADD PRIMARY KEY (PLAYER_ID, season_id, Team);
-- TODO add primary key constraints to the player_season_stat

create table nba_finals as 
(
    select Year, T1.ID as Champion, T2.ID as Vice_Champion, Result
    from raw_nba_finals_awards, Team as T1, Team as T2
    where raw_nba_finals_awards.NBA_Champion = T1.NICKNAME and raw_nba_finals_awards.NBA_ViceChampion = T2.NICKNAME
) with data;

ALTER TABLE nba_finals ADD PRIMARY KEY (Year);

create table raw_nba_awards as 
(
    select Year, MVP_Name as Player_name
    from raw_nba_finals_awards
) with data;

ALTER TABLE raw_nba_awards ADD Award_name VARCHAR(22) NOT NULL DEFAULT 'Regular Season MVP';

INSERT INTO raw_nba_awards (YEAR, Player_name, Award_name)
VALUES (2022, 'Stephen Curry', 'Finals MVP');

INSERT INTO raw_nba_awards (YEAR, Player_name, Award_name)
VALUES (2021, 'Giannis Antetokounmpo', 'Finals MVP');

INSERT INTO raw_nba_awards (YEAR, Player_name, Award_name)
VALUES (2020, 'Lebron James', 'Finals MVP');


create table nba_awards as 
(
    select Year, Player.ID, Award_name
    from raw_nba_awards, Player
    WHERE Player.PLAYER_NAME = raw_nba_awards.Player_name
) with data;

-- dropping redudant columns

-- ALTER TABLE Game DROP COLUMN TEAM_ID_home;
-- ALTER TABLE Game DROP COLUMN TEAM_ID_away;

-- ALTER TABLE Player_season_stat DROP COLUMN Player.Player_name;

ALTER TABLE Player_in_game_stat DROP COLUMN TEAM_ABBREVIATION;
ALTER TABLE Player_in_game_stat DROP COLUMN PLAYER_NAME;
ALTER TABLE Player_in_game_stat DROP COLUMN NICKNAME;