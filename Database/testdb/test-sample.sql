connect to CS348;

-- R7

-- Get list of current teams
SELECT ID, CITY, NICKNAME FROM TEAM WHERE MAX_YEAR = (select MAX(MAX_YEAR) FROM TEAM) ORDER BY CITY, NICKNAME, ID;


-- Get all teams avg points playing at home and away
Select ABBREVIATION, avg_points_home, avg_points_away
From Team left join
(Select HOME_TEAM_ID as TEAM_ID, avg_points_home, avg_points_away
From (
(Select HOME_TEAM_ID, avg(PTS_home) as avg_points_home 
From Game
Where season = 2022
Group by HOME_TEAM_ID)
left join
(Select VISITOR_TEAM_ID, avg(PTS_away) as avg_points_away
From Game
Where season = 2022
Group by VISITOR_TEAM_ID) on (HOME_TEAM_ID = VISITOR_TEAM_ID)
)) on Team.ID = TEAM_ID


-- Get players on the selected team (Toronto Raptors in this case)
SELECT PLAYER_NAME, POS, AGE, G, GS, MP, FG, FGA, FG_2, THREEP, THREEPA, THREEP_PERCENTAGE, TWOP, TWOPA, TWOP_PERCENTAGE, EFG, FT, FTA, FT_2, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS 
FROM PLAYER JOIN PLAYER_SEASON_STAT ON PLAYER.ID = PLAYER_SEASON_STAT.PLAYER_ID 
WHERE PLAYER.TEAM_ID = 1610612761 AND PLAYER_SEASON_STAT.SEASON_ID = (
	SELECT MAX(SEASON_ID) FROM PLAYER_SEASON_STAT) ORDER BY PLAYER_NAME, PLAYER_ID;
