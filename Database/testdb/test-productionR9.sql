-- Get # winning games for Celtics(1610612738)
-- when playing home against Hawks(1610612737)
	
SELECT COUNT(*)
FROM Game 
WHERE HOME_TEAM_ID = 1610612738 AND 
    VISITOR_TEAM_ID = 1610612737 AND 
    PTS_home > PTS_away;

SELECT COUNT(*)
FROM Game 
WHERE HOME_TEAM_ID = 1610612737 AND 
    VISITOR_TEAM_ID = 1610612738 AND 
    PTS_home > PTS_away;
