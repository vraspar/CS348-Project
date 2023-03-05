package cs348.backend

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
class Cs348BackendApplication

fun main(args: Array<String>) {
	runApplication<Cs348BackendApplication>(*args)
}

@RestController
class TestController(val jdbcTemplate: JdbcTemplate) {
	@GetMapping("/")
	fun index(@RequestParam("name") name: String) = "Hello, $name!"

	@GetMapping("/test")
	fun test() = jdbcTemplate.query("SELECT * FROM STUDENT") { rs, _ -> rs.getString("SNAME") }
}
