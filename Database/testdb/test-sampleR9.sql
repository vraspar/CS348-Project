-- Get # winning games for Warriors(1610612744)
-- when playing home against Lakers(1610612747)
	
SELECT COUNT(*)
FROM Game 
WHERE HOME_TEAM_ID = 1610612744 AND 
    VISITOR_TEAM_ID = 1610612747 AND 
    PTS_home > PTS_away;

SELECT COUNT(*)
FROM Game 
WHERE HOME_TEAM_ID = 1610612747 AND 
    VISITOR_TEAM_ID = 1610612744 AND 
    PTS_home > PTS_away;
