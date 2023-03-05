import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.*;


public class QueryDB {

    var conn: Connection? = null;
    
    public fun connectDB() {
        // load the DB driver
        try {
            Class.forName("com.ibm.db2.jcc.DB2Driver");
            
        }
        catch(e: ClassNotFoundException) {
            println("Missing DB2 driver");
            e.printStackTrace()
        }

        try {
            println("Connecting to DB...");
            conn = DriverManager.getConnection("jdbc:db2:CS348");
            println("Connected to DB");
        }
        catch (e: SQLException) {
            println("Failed to connect to DB");
            e.printStackTrace();
        }
 
    }

    public fun executeQuery(query: String): ResultSet? {
        var rs: ResultSet? = null;
        try {
            val stmt = conn?.createStatement();
            rs = stmt?.executeQuery(query);
        }
        catch (e: SQLException) {
            println("Failed to execute query");
            e.printStackTrace();
        
        }
        return rs;
    }

    public fun closeDB() {
        try {
            conn?.close();
            println("DB connection closed");
        }
        catch (e: SQLException) {
            println("Failed to close DB");
            e.printStackTrace();
        }
    }

}