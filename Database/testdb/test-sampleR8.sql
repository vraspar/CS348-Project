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
