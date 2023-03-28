SELECT player.player_name as player_name, $stat, team.ABBREVIATION as team_name, GAME_DATE_EST as date
from player_in_game_stat, player, team, Game 
WHERE player.ID = player_in_game_stat.player_ID and team.id = player_in_game_stat.team_ID and 
Game.ID = player_in_game_stat.GAME_ID and
PLUS_MINUS = (SELECT MAX(PLUS_MINUS) FROM player_in_game_stat as p2 WHERE team.id = p2.team_id)