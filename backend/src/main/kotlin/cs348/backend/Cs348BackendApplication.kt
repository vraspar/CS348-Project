package cs348.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.jdbc.datasource.init.ScriptUtils
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

data class Player_in_game_stat(
    val name: String?,
    val stat: String?,
    val team_name: String?,
    val date: String?
)

data class QueryResult(
    val headers: List<String>,
    val rows: List<List<String>>,
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

    
    fun bestTeamStatInAllMatches(stat: String): List<Player_in_game_stat> {
        val queryString = """
        select player.player_name as player_name, $stat, team.ABBREVIATION as team_name, GAME_DATE_EST as date
        from player_in_game_stat, player, team, Game 
        WHERE player.ID = player_in_game_stat.player_ID and team.id = player_in_game_stat.team_ID and 
        Game.ID = player_in_game_stat.GAME_ID and
        $stat = (SELECT MAX($stat) FROM player_in_game_stat as p2 WHERE team.id = p2.team_id)
        """;
        return db.query(
            queryString,
            { response, _ ->
                Player_in_game_stat(
                    response.getString("PLAYER_NAME"),
                    response.getString(stat),
                    response.getString("team_name"),
                    response.getString("date")
                )
            }
        );
    }

    fun runRawQuery(query: String) =
        if (!query.trimStart().startsWith("SELECT", ignoreCase = true)) {
            throw IllegalSqlModificationException("")
        } else {
            val mapper = object : RowMapper<List<String>> {
                lateinit var headers: List<String>

                override fun mapRow(rs: ResultSet, rowNum: Int): List<String> {
                    if (!::headers.isInitialized) {
                        headers = (1..rs.metaData.columnCount).map(rs.metaData::getColumnName)
                    }

                    return (1..rs.metaData.columnCount).map(rs::getString)
                }
            }

            val rows = runCatching { db.query(query, mapper) }.getOrElse { throw BadSqlQueryException("") }
            QueryResult(mapper.headers, rows)
        }
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

    @GetMapping("/bestTeamStatInAllMatches")
    fun bestTeamStatInAllMatches(@RequestParam("stat") stat: String) = service.bestTeamStatInAllMatches(stat)

    @ExceptionHandler
    fun handleIllegalSqlModificationException(ex: IllegalSqlModificationException) =
        ResponseEntity("Error: SQL queries must be read-only", HttpStatus.BAD_REQUEST)

    @ExceptionHandler
    fun handleBadSqlQueryException(ex: BadSqlQueryException) =
        ResponseEntity("Error: Bad SQL Query", HttpStatus.BAD_REQUEST)

    @GetMapping("/query")
    fun query(@RequestParam("query") query: String) =
        service.runRawQuery(URLDecoder.decode(query, StandardCharsets.UTF_8))
}
