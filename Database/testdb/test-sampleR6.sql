select player.player_name as player_name, PLUS_MINUS, team.ABBREVIATION as team_name
from player_in_game_stat, player, team
WHERE player.ID = player_in_game_stat.player_ID
and team.id = player_in_game_stat.team_ID
AND  PLUS_MINUS = (
    SELECT MAX(PLUS_MINUS) FROM player_in_game_stat as p2 WHERE team.id = p2.team_id);
