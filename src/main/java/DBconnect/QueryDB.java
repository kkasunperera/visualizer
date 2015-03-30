package DBconnect;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

public class QueryDB {

	public JSONArray getFromDB(String query, Connection connection) {

		JSONArray jsonArray = new JSONArray();

		try {
			java.sql.Statement statment = connection.createStatement();
			ResultSet resultSet = statment.executeQuery(query);

			while (resultSet.next()) {
				int total_rows = resultSet.getMetaData().getColumnCount();
				JSONObject obj = new JSONObject();
				for (int i = 0; i < total_rows; i++) {
					obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
							.toLowerCase(), resultSet.getObject(i + 1));
				}
				jsonArray.put(obj);
			}

			// System.out.println("llll");
			// System.out.println(resultSet.toString());
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return jsonArray;
	}
	public JSONArray getFromDB_Links(String query, Connection connection) {

		JSONArray jsonArray = new JSONArray();

		try {
			java.sql.Statement statment = connection.createStatement();
			ResultSet resultSet = statment.executeQuery(query);

			while (resultSet.next()) {
				int total_rows = resultSet.getMetaData().getColumnCount();
				JSONObject obj = new JSONObject();
				for (int i = 0; i < total_rows; i++) {
					obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
							.toLowerCase(), resultSet.getObject(i + 1));
				}
				jsonArray.put(obj);
			}

			// System.out.println("llll");
			// System.out.println(resultSet.toString());
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return jsonArray;
	}
}
