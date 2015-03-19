package DBconnect;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionPool {

	public Connection getConnection() {
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("MySQL JDBC Driver Not found");
			e.printStackTrace();
			return null;
		}

		Connection connection = null;

		try {
			connection = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/visualizer", "root", "");

		} catch (SQLException e) {
			System.out.println("Connection Failed!");
			e.printStackTrace();
			return null;
		}

		if (connection != null) {
			System.out.println("Connected to the database");
			
			return connection;

		} else {
			System.out.println("Failed to make connection!");
			return null;
		}
	}

	public void freeConnection(Connection connection) {
		
		System.out.println("Database connection closed");
		try {
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
