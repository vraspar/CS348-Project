CREATE TABLE Team(
   LEAGUE_ID          INTEGER  NOT NULL 
  ,ID                 INTEGER  NOT NULL PRIMARY KEY
  ,MIN_YEAR           INTEGER  NOT NULL
  ,MAX_YEAR           INTEGER  NOT NULL
  ,ABBREVIATION       VARCHAR(3) NOT NULL
  ,NICKNAME           VARCHAR(13) NOT NULL
  ,YEARFOUNDED        INTEGER  NOT NULL
  ,CITY               VARCHAR(13) NOT NULL
  ,ARENA              VARCHAR(26) NOT NULL
  ,ARENACAPACITY      INTEGER 
  ,OWNER              VARCHAR(35) NOT NULL
  ,GENERALMANAGER     VARCHAR(15) NOT NULL
  ,HEADCOACH          VARCHAR(16) NOT NULL
  ,DLEAGUEAFFILIATION VARCHAR(33) NOT NULL
);

CREATE TABLE Player(
   PLAYER_NAME VARCHAR(24) NOT NULL
  ,TEAM_ID     INTEGER  NOT NULL, FOREIGN KEY(TEAM_ID) References Team(ID) 
  ,ID          INTEGER  NOT NULL
  ,season_id      INTEGER  NOT NULL
  -- add later ,PRIMARY KEY (ID, season_id)
);

CREATE TABLE Game(
   GAME_DATE_EST    DATE  NOT NULL
  ,ID          INTEGER  NOT NULL PRIMARY KEY
  ,GAME_STATUS_TEXT VARCHAR(5) NOT NULL
  ,HOME_TEAM_ID     INTEGER  NOT NULL, FOREIGN KEY(HOME_TEAM_ID) References Team(ID)
  ,VISITOR_TEAM_ID  INTEGER  NOT NULL, FOREIGN KEY(VISITOR_TEAM_ID) References Team(ID)
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

CREATE TABLE Player_season_stat(
   PLAYER_ID     INTEGER  NOT NULL-- need to add reference statement here
  ,Player_name   VARCHAR(24) NOT NULL
  ,Pos      VARCHAR(5) NOT NULL
  ,Age      INTEGER  NOT NULL
  ,Tm       VARCHAR(3) NOT NULL
  ,G        INTEGER  NOT NULL
  ,GS       INTEGER  NOT NULL
  ,MP       NUMERIC(4,1) NOT NULL
  ,FG       NUMERIC(4,1) NOT NULL
  ,FGA      NUMERIC(4,1) NOT NULL
  ,FG_2     NUMERIC(5,3)
  ,ThreeP   NUMERIC(3,1) NOT NULL
  ,ThreePA  NUMERIC(4,1) NOT NULL
  ,ThreeP_Percentage     NUMERIC(5,3)
  ,TwoP     NUMERIC(4,1) NOT NULL
  ,TwoPA    NUMERIC(4,1) NOT NULL
  ,TwoP_Percentage     NUMERIC(5,3)
  ,eFG    NUMERIC(5,3)
  ,FT     NUMERIC(4,1) NOT NULL
  ,FTA    NUMERIC(4,1) NOT NULL
  ,FT_2   NUMERIC(5,3)
  ,ORB    NUMERIC(3,1) NOT NULL
  ,DRB    NUMERIC(4,1) NOT NULL
  ,TRB    NUMERIC(4,1) NOT NULL
  ,AST    NUMERIC(4,1) NOT NULL
  ,STL    NUMERIC(3,1) NOT NULL
  ,BLK    NUMERIC(3,1) NOT NULL
  ,TOV    NUMERIC(3,1) NOT NULL
  ,PF     NUMERIC(3,1) NOT NULL
  ,PTS    NUMERIC(4,1) NOT NULL
  ,season_id   VARCHAR(9) NOT NULL
  ,PRIMARY KEY(PLAYER_ID, season_id) --references
);

CREATE TABLE Player_in_game_stat(
   GAME_ID           INTEGER  NOT NULL, FOREIGN KEY(GAME_ID) References Game(ID) 
  ,TEAM_ID           INTEGER NOT NULL, FOREIGN KEY(TEAM_ID) References Team(ID)
  ,TEAM_ABBREVIATION VARCHAR(3)
  ,TEAM_CITY         VARCHAR(11) 
  ,PLAYER_ID         INTEGER NOT NULL --add later, FOREIGN KEY(PLAYER_ID) References Player(ID)
  ,PLAYER_NAME       VARCHAR(14) 
  ,NICKNAME          VARCHAR(6) 
  ,START_POSITION    VARCHAR(1)
  ,COMMENT           VARCHAR(30)
  ,MIN               VARCHAR(5)
  ,FGM               NUMERIC(3,1)
  ,FGA               NUMERIC(4,1)
  ,FG_PCT            NUMERIC(5,3)
  ,FG3M              NUMERIC(3,1)
  ,FG3A              NUMERIC(3,1)
  ,FG3_PCT           NUMERIC(3,1)
  ,FTM               NUMERIC(3,1)
  ,FTA               NUMERIC(4,1)
  ,FT_PCT            NUMERIC(3,1)
  ,OREB              NUMERIC(3,1)
  ,DREB              NUMERIC(3,1)
  ,REB               NUMERIC(3,1)
  ,AST               NUMERIC(3,1)
  ,STL               NUMERIC(3,1)
  ,BLK               NUMERIC(3,1)
  ,TOV               NUMERIC(3,1)
  ,PF                NUMERIC(3,1)
  ,PTS               NUMERIC(4,1)
  ,PLUS_MINUS        NUMERIC(5,1)
  ,PRIMARY KEY(GAME_ID, TEAM_ID, PLAYER_ID)
);

CREATE TABLE Played_at(
  PLAYER_ID     INTEGER  NOT NULL --add it later, FOREIGN KEY(PLAYER_ID) References Player(ID) 
  ,TEAM_ID      INTEGER  NOT NULL, FOREIGN KEY(TEAM_ID) References Team(ID)
  ,season_id    VARCHAR(9) NOT NULL
  ,PRIMARY KEY(PLAYER_ID, TEAM_ID, season_id)
);