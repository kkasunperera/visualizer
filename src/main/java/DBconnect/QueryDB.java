package DBconnect;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
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
					try {
						obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
								.toLowerCase(), resultSet.getObject(i + 1));
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
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
					try {
						obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
								.toLowerCase(), resultSet.getObject(i + 1));
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
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

	public JSONArray getFromDB_QT(String query, Connection connection) {
		
		JSONArray jsonArray = new JSONArray();

		try {
			java.sql.Statement statment = connection.createStatement();
			ResultSet resultSet = statment.executeQuery(query);

			while (resultSet.next()) {
				
				JSONObject obj = new JSONObject();
				
				try {
					obj.put("source", resultSet.getObject(1));
					obj.put("target", resultSet.getObject(2));
					obj.put("YEAR", resultSet.getObject(3));
					obj.put("Q1", resultSet.getObject(4));
					obj.put("Q2", resultSet.getObject(5));
					obj.put("Q3", resultSet.getObject(6));
					obj.put("Q4", resultSet.getObject(7));
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				int yr = Integer.parseInt(resultSet.getObject(3).toString());
				int q1 = Integer.parseInt(resultSet.getObject(4).toString());
				int q2 = Integer.parseInt(resultSet.getObject(5).toString());
				int q3 = Integer.parseInt(resultSet.getObject(6).toString());
				int q4 = Integer.parseInt(resultSet.getObject(7).toString());
				
				try {
					obj.put("type",type_gen(yr,q1,q2,q3,q4));
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				jsonArray.put(obj);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return jsonArray;
	}
	
	public String type_gen(int yr,int q1,int q2,int q3,int q4) {
		String type = null;
		if(yr==1){
			if(q1!=1 & q2!=1 & q3!=1 & q4!=1){
				type = "weak";
			}else if((q1==1 & q2 ==1)|(q2==1 & q3==1)|(q3==1 & q4==1)){
				type = "sustained";
			}else{
				type = "episodic";
			}
		}else{
			type = "episodic";
		}
		return type;
	}
}

/*select y.source,y.target,y.p_value_2005, q.p_value_2005_Q1
from year y
Left join quarter q
on y.source = q.source and y.target = q.target
Union all
select y.source,y.target,y.p_value_2005, q.p_value_2005_Q1 
from year y
right join quarter q
on y.source = q.source and y.target = q.target*/
