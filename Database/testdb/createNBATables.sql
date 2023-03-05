CREATE TABLE raw_games(
   GAME_DATE_EST    DATE  NOT NULL PRIMARY KEY
  ,GAME_ID          INTEGER  NOT NULL
  ,GAME_STATUS_TEXT VARCHAR(5) NOT NULL
  ,HOME_TEAM_ID     INTEGER  NOT NULL
  ,VISITOR_TEAM_ID  INTEGER  NOT NULL
  ,SEASON           INTEGER  NOT NULL
  ,TEAM_ID_home     INTEGER  NOT NULL
  ,PTS_home         NUMERIC(5,1)
  ,FG_PCT_home      VARCHAR(18)
  ,FT_PCT_home      VARCHAR(18)
  ,FG3_PCT_home     VARCHAR(18)
  ,AST_home         NUMERIC(4,1)
  ,REB_home         NUMERIC(4,1)
  ,TEAM_ID_away     INTEGER  NOT NULL
  ,PTS_away         NUMERIC(5,1)
  ,FG_PCT_away      VARCHAR(18)
  ,FT_PCT_away      VARCHAR(18)
  ,FG3_PCT_away     VARCHAR(18)
  ,AST_away         NUMERIC(4,1)
  ,REB_away         NUMERIC(4,1)
);