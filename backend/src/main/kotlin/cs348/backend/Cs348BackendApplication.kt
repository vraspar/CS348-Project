package cs348.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.net.URLDecoder
import java.nio.charset.StandardCharsets
import java.sql.ResultSet

@SpringBootApplication
class Cs348BackendApplication

fun main(args: Array<String>) {
    runApplication<Cs348BackendApplication>(*args)
}

data class PlayerStats(
    val id: String?,
    val name: String,
    val height: Int,
    val weight: Int,
    val college: String?,
    val birthCity: String?,
    val birthState: String?
)

data class AveragePlayerSize(
    val state: String,
    val height: Double,
    val weight: Double,
)

data class PlayerInGameStats(
    val name: String,
    val stat: String,
    val teamName: String,
    val date: String
)

data class QueryResult(
    val headers: List<String>,
    val rows: List<List<String>>,
)

data class Team(
    val id: String,
    val city: String,
    val nickname: String,
)

data class TeamHomeAwayScore(
    val team_abbre: String,
    var home_score_avg: Double,
    var away_score_avg: Double,
)

data class TeamCloseWins(
    val team_abbre: String,
    val home_close_wins: Int,
    val away_close_wins: Int,
)

data class WinnerResults(
    val rank: Int,
    val city: String,
    val nickname: String,
    val numWins: Int,
    val numRunnersUp: Int,
)


open class BadSqlQueryException(message: String) : IllegalArgumentException(message)

class IllegalSqlModificationException(message: String) : BadSqlQueryException(message)

@Service
class NbaStatsService(val db: JdbcTemplate) {
    fun findPlayerStats(): List<PlayerStats> = db.query("SELECT * FROM RAW_PLAYER") { response, _ ->
        PlayerStats(
            response.getString("id"),
            response.getString("player"),
            response.getInt("height"),
            response.getInt("weight"),
            response.getString("collage"),
            response.getString("birth_city"),
            response.getString("birth_state")
        )
    }

    fun findPlayerStatsByState(state: String): List<PlayerStats> =
        db.query("SELECT * FROM RAW_PLAYER WHERE birth_state = ?", { response, _ ->
            PlayerStats(
                response.getString("id"),
                response.getString("player"),
                response.getInt("height"),
                response.getInt("weight"),
                response.getString("collage"),
                response.getString("birth_city"),
                response.getString("birth_state")
            )
        }, state)

    fun findPlayerAverageSizesByState(): List<AveragePlayerSize> =
        db.query(
            """
            SELECT birth_state, AVG(height) as avg_height, AVG(weight) as avg_weight FROM RAW_PLAYER
            GROUP BY birth_state HAVING birth_state IS NOT NULL
            """.trimIndent(),
        ) { response, _ ->
            AveragePlayerSize(
                response.getString("birth_state"),
                response.getDouble("avg_height"),
                response.getDouble("avg_weight")
            )
        }

    fun findPlayerAverageSizesForState(state: String): AveragePlayerSize? =
        db.query(
            "SELECT birth_state, AVG(height) as avg_height, AVG(weight) as avg_weight FROM RAW_PLAYER GROUP BY birth_state HAVING birth_state = ?",
            { response, _ ->
                AveragePlayerSize(
                    response.getString("birth_state"),
                    response.getDouble("avg_height"),
                    response.getDouble("avg_weight")
                )
            },
            state
        ).firstOrNull()

    fun findPossibleStats(): List<String>? =
        db.dataSource?.connection?.metaData?.getColumns(null, null, "PLAYER_IN_GAME_STAT", "%")?.let {
            generateSequence {
                if (it.next()) it.getString("COLUMN_NAME") else null
            }.filterNot(setOf("GAME_ID","TEAM_ID","TEAM_CITY","PLAYER_ID","START_POSITION","COMMENT")::contains).toSet().toList()
        }

    fun bestTeamStatInAllMatches(stat: String): List<PlayerInGameStats> =
        db.query(
            """
            SELECT player.player_name as player_name, $stat, team.ABBREVIATION as team_name, GAME_DATE_EST as date
            from player_in_game_stat, player, team, Game 
            WHERE player.ID = player_in_game_stat.player_ID and team.id = player_in_game_stat.team_ID and 
            Game.ID = player_in_game_stat.GAME_ID and
            $stat = (SELECT MAX($stat) FROM player_in_game_stat as p2 WHERE team.id = p2.team_id)
            """.trimIndent()
        ) { response, _ ->
            PlayerInGameStats(
                response.getString("PLAYER_NAME"),
                response.getString(stat),
                response.getString("team_name"),
                response.getString("date")
            )
        }

    fun findAllTeams(): List<Team> =
        db.query(
            """
                SELECT ID, CITY, NICKNAME FROM TEAM
                WHERE MAX_YEAR = (select MAX(MAX_YEAR) FROM TEAM)
                ORDER BY CITY, NICKNAME, ID
            """.trimIndent()
        ) { response, _ ->
            Team(
                response.getString("ID"),
                response.getString("CITY"),
                response.getString("NICKNAME"),
            )
        }

    private fun makeStatsMapper() = object : RowMapper<List<String>> {
        lateinit var headers: List<String>

        override fun mapRow(rs: ResultSet, rowNum: Int): List<String> {
            if (!::headers.isInitialized) {
                headers = (1..rs.metaData.columnCount).map(rs.metaData::getColumnName)
            }

            return (1..rs.metaData.columnCount).map(rs::getString)
        }
    }

    fun findStatsForTeam(teamId: String): QueryResult {
        val mapper = makeStatsMapper()

        val rows = db.query(
            """
            SELECT PLAYER.PLAYER_NAME, PLAYER_SEASON_STAT.* FROM PLAYED_AT JOIN PLAYER_SEASON_STAT
            ON PLAYED_AT.PLAYER_ID = PLAYER_SEASON_STAT.PLAYER_ID
            JOIN PLAYER ON PLAYER.ID = PLAYED_AT.PLAYER_ID
            JOIN TEAM ON TEAM.ID = PLAYED_AT.TEAM_ID
            WHERE PLAYED_AT.TEAM_ID = ? AND PLAYER_SEASON_STAT.SEASON_ID = (
                SELECT MAX(SEASON_ID) FROM PLAYER_SEASON_STAT)
            AND TEAM.ABBREVIATION = PLAYER_SEASON_STAT.TEAM
            AND PLAYED_AT.SEASON_ID = 2021
            ORDER BY PLAYER_NAME, PLAYER.ID;
        """.trimIndent(), mapper, teamId)

        return QueryResult(mapper.headers, rows)
    }

    fun runRawQuery(query: String) =
        if (!query.trimStart().startsWith("SELECT", ignoreCase = true)) {
            throw IllegalSqlModificationException("")
        } else {
            val mapper = makeStatsMapper()

            val rows = runCatching { db.query(query, mapper) }.getOrElse { throw BadSqlQueryException("") }
            QueryResult(mapper.headers, rows)
        }


    fun findTeamHomeAwayRecord(): List<TeamHomeAwayScore> =
        db.query(
            """
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
            """.trimIndent(),
        ) { response, _ ->
            TeamHomeAwayScore(
                response.getString("ABBREVIATION"),
                response.getDouble("avg_points_home"),
                response.getDouble("avg_points_away")
            )
        }


    fun findTeamCloseWins(): List<TeamCloseWins> =
        db.query(
            """
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
            """.trimIndent(),
        ) { response, _ ->
            TeamCloseWins(
                response.getString("ABBREVIATION"),
                response.getInt("home_close_wins"),
                response.getInt("away_close_wins")
            )
        }

    fun findWinners(startSeason: Int, endSeason: Int): List<WinnerResults> =
        db.query(
            """
                SELECT TEAM.CITY, TEAM.NICKNAME, RANK() OVER (ORDER BY ISNULL(WINS, 0) DESC) AS RANK,
                ISNULL(WINS, 0) AS NUM_WINS, ISNULL(RUNNERS_UP, 0) AS NUM_RUNNERS_UP FROM (
                    SELECT CHAMPION, COUNT(*) AS WINS
                    FROM NBA_FINALS WHERE YEAR BETWEEN ? AND ? GROUP BY CHAMPION
                ) AS WINNER FULL OUTER JOIN (
                    SELECT VICE_CHAMPION, COUNT(*) AS RUNNERS_UP
                FROM NBA_FINALS WHERE YEAR BETWEEN ? AND ? GROUP BY VICE_CHAMPION
                ) AS RUNNER_UP ON (WINNER.CHAMPION = RUNNER_UP.VICE_CHAMPION)
                JOIN TEAM ON (COALESCE(WINNER.CHAMPION, RUNNER_UP.VICE_CHAMPION) = TEAM.ID)
                ORDER BY NUM_WINS DESC, NUM_RUNNERS_UP DESC, TEAM.CITY, TEAM.NICKNAME
            """.trimIndent(),
            { response, _ ->
                WinnerResults(
                    response.getInt("RANK"),
                    response.getString("CITY"),
                    response.getString("NICKNAME"),
                    response.getInt("NUM_WINS"),
                    response.getInt("NUM_RUNNERS_UP")
                )
            },  startSeason, endSeason, startSeason, endSeason)
}


@RestController
@CrossOrigin
class StatsController(val service: NbaStatsService) {
    @GetMapping("/")
    fun index(@RequestParam("name") name: String) = "Hello, $name!"

    @GetMapping("/players")
    fun players(@RequestParam("state") state: String?) =
        state?.let(service::findPlayerStatsByState) ?: service.findPlayerStats()

    @GetMapping("/averages/{state}")
    fun averages(@PathVariable("state") state: String) = service.findPlayerAverageSizesForState(state)

    @GetMapping("/averages")
    fun averages() = service.findPlayerAverageSizesByState()

    @GetMapping("/statNames")
    fun bestTeamStatInAllMatches() = service.findPossibleStats()

    @GetMapping("/bestTeamStatInAllMatches")
    fun bestTeamStatInAllMatches(@RequestParam("stat") stat: String) = service.bestTeamStatInAllMatches(stat)

    @GetMapping("/teams")
    fun teams() = service.findAllTeams()

    @GetMapping("/teams/{teamId}")
    fun statsForTeam(@PathVariable("teamId") teamId: String) = service.findStatsForTeam(teamId)

    @ExceptionHandler
    fun handleIllegalSqlModificationException(ex: IllegalSqlModificationException) =
        ResponseEntity("Error: SQL queries must be read-only", HttpStatus.BAD_REQUEST)

    @ExceptionHandler
    fun handleBadSqlQueryException(ex: BadSqlQueryException) =
        ResponseEntity("Error: Bad SQL Query", HttpStatus.BAD_REQUEST)

    @ExceptionHandler
    fun handleInvalidRequest(ex: MissingServletRequestParameterException) =
        ResponseEntity("Error: Missing query body", HttpStatus.BAD_REQUEST)

    @GetMapping("/query")
    fun query(@RequestParam("query") query: String) =
        service.runRawQuery(URLDecoder.decode(query, StandardCharsets.UTF_8))

    @GetMapping("/teamHomeAwayRecords")
    fun teamHomeAwayRecord() = service.findTeamHomeAwayRecord()

    @GetMapping("/teamCloseWins")
    fun teamCloseWins() = service.findTeamCloseWins()

    @GetMapping("/championships")
    fun championships(@RequestParam("startSeason") startSeason: Int?, @RequestParam("endSeason") endSeason: Int?) =
        service.findWinners(startSeason ?: 1900, endSeason ?: 2100)
}
