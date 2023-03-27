-- Get list of current teams
SELECT ID, CITY, NICKNAME FROM TEAM
WHERE MAX_YEAR = (select MAX(MAX_YEAR) FROM TEAM)
ORDER BY CITY, NICKNAME, ID;

-- Get players on the selected team (Golden State Warriors in this case)
SELECT PLAYER.PLAYER_NAME, PLAYER_SEASON_STAT.* FROM PLAYED_AT JOIN PLAYER_SEASON_STAT
ON PLAYED_AT.PLAYER_ID = PLAYER_SEASON_STAT.PLAYER_ID
JOIN PLAYER ON PLAYER.ID = PLAYED_AT.PLAYER_ID
JOIN TEAM ON TEAM.ID = PLAYED_AT.TEAM_ID
WHERE PLAYED_AT.TEAM_ID = 1610612744 AND PLAYER_SEASON_STAT.SEASON_ID = (
	SELECT MAX(SEASON_ID) FROM PLAYER_SEASON_STAT)
AND TEAM.ABBREVIATION = PLAYER_SEASON_STAT.TEAM
AND PLAYED_AT.SEASON_ID = (SELECT MAX(SEASON_ID) FROM PLAYED_AT)
ORDER BY PLAYER_NAME, PLAYER.ID;
