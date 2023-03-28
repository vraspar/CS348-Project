Select ABBREVIATION, home_close_wins, away_close_wins
From Team left join
((SELECT HOME_TEAM_ID, Count(HOME_TEAM_ID) as home_close_wins
FROM Game 
Where PTS_home > PTS_away AND (PTS_home - PTS_away) < 5 AND season = 2022
Group by Home_TEAM_ID)
natural join
(SELECT VISITOR_TEAM_ID, Count(VISITOR_TEAM_ID) as away_close_wins
FROM Game 
Where PTS_away > PTS_home AND (PTS_away - PTS_home) < 5 AND season = 2022
Group by VISITOR_TEAM_ID) on (Home_TEAM_ID = VISITOR_TEAM_ID)) on HOME_TEAM_ID = ID;