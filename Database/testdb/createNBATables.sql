CREATE TABLE raw_games(
   GAME_DATE_EST    DATE  NOT NULL
  ,GAME_ID          INTEGER  NOT NULL PRIMARY KEY
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

CREATE TABLE raw_player(
   ID      INTEGER  NOT NULL PRIMARY KEY 
  ,Player      VARCHAR(24) NOT NULL
  ,height      INTEGER 
  ,weight      INTEGER 
  ,collage     VARCHAR(58)
  ,born        INTEGER 
  ,birth_city  VARCHAR(25)
  ,birth_state VARCHAR(32)
);

CREATE TABLE raw_player_stats(
   FIELD1 INTEGER  NOT NULL PRIMARY KEY 
  ,Year   INTEGER 
  ,Player VARCHAR(24)
  ,Pos    VARCHAR(5)
  ,Age    INTEGER 
  ,Tm     VARCHAR(3)
  ,G      INTEGER 
  ,GS     INTEGER 
  ,MP     INTEGER 
  ,PER    NUMERIC(5,1)
  ,TS     NUMERIC(5,3)
  ,ThreePAr   NUMERIC(5,3)
  ,FTr    NUMERIC(5,3)
  ,ORB    NUMERIC(4,1)
  ,DRB    NUMERIC(4,1)
  ,TRB    NUMERIC(4,1)
  ,AST    NUMERIC(4,1)
  ,STL    NUMERIC(4,1)
  ,BLK    NUMERIC(4,1)
  ,TOV    NUMERIC(4,1)
  ,USG    NUMERIC(4,1)
  ,blanl  VARCHAR(30)
  ,OWS    NUMERIC(4,1)
  ,DWS    NUMERIC(4,1)
  ,WS     NUMERIC(4,1)
  ,WS48   NUMERIC(6,3)
  ,blank2 VARCHAR(30)
  ,OBPM   NUMERIC(5,1)
  ,DBPM   NUMERIC(5,1)
  ,BPM    NUMERIC(5,1)
  ,VORP   NUMERIC(4,1)
  ,FG_INT     INTEGER 
  ,FGA    INTEGER 
  ,FG     NUMERIC(5,3)
  ,Three_P_INT     INTEGER 
  ,Three_PA    INTEGER 
  ,Three_P     NUMERIC(5,3)
  ,Second_P_INT     INTEGER 
  ,Second_PA    INTEGER 
  ,Second_P     NUMERIC(5,3)
  ,eFG    NUMERIC(5,3)
  ,FT_INT     INTEGER 
  ,FTA    INTEGER 
  ,FT     NUMERIC(5,3)
  ,ORB_INT    INTEGER 
  ,DRB_INT   INTEGER 
  ,TRB_INT    INTEGER 
  ,AST_INT    INTEGER 
  ,STL_INT    INTEGER 
  ,BLK_INT    INTEGER 
  ,TOV_INT    INTEGER 
  ,PF     INTEGER 
  ,PTS    INTEGER 
);