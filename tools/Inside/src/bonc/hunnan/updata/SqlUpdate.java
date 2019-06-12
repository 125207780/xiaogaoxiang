package bonc.hunnan.updata;
import java.util.regex.*;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.alibaba.fastjson.JSONArray;

public class SqlUpdate {
  
	private static String cfgFile = "";
	public Connection connect() throws SQLException, ClassNotFoundException{
	    Connection connection = null;
		Class.forName(prop().getProperty("class.forName"));
		connection=(Connection)DriverManager.getConnection(prop().getProperty("url"), prop().getProperty("user"), prop().getProperty("pwd"));
	    return connection;
	}
	
	public List<Map<String,Object>> sql_maxmin_list() throws ClassNotFoundException, SQLException{
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		Connection c= connect();
		System.out.println(sql_polygon());
		PreparedStatement pstmt = c.prepareStatement(sql_polygon());
		ResultSet rs = pstmt.executeQuery();
		 while (rs.next()) {
			 Map<String,Object> map = new HashMap<String,Object>();
			 map.put("POLYGON_ID", rs.getString("POLYGON_ID"));
			 map.put("SHAPE", JSONArray.parseArray(rs.getString("SHAPE")));
			 map.put("MAXLNG", rs.getString("MAXLNG"));
			 map.put("MINLNG", rs.getString("MINLNG"));
			 map.put("MAXLAT", rs.getString("MAXLAT"));
			 map.put("MINLAT", rs.getString("MINLAT"));
			 list.add(map);
		 }
		 rs.close();
		 pstmt.close();
		 c.close();
		return list;
	}

	public void sql_point_list() throws ClassNotFoundException, SQLException {
		String sql ="";
		//System.out.println(sql);
		PreparedStatement pstmt =null;
		Connection c1 = connect();
		PreparedStatement pstmtm =null ; c1.prepareStatement(sql_update());
		int i = 0 ;
		for(Map<String,Object> temp : sql_maxmin_list()){
			i++;
		sql= sql_point();
		String MINLNG=	temp.get("MINLNG").toString();
		String MAXLNG=	temp.get("MAXLNG").toString();
		String MINLAT=	temp.get("MINLAT").toString();
		String MAXLAT=	temp.get("MAXLAT").toString();
		sql=sql.replace("${MINLNG}", MINLNG);
		sql=sql.replace("${MAXLNG}", MAXLNG);
		sql=sql.replace("${MINLAT}", MINLAT);
		sql=sql.replace("${MAXLAT}", MAXLAT);
		Connection c = connect();
		pstmt = c.prepareStatement(sql);
		ResultSet re = pstmt.executeQuery();
		while(re.next()) {
			if(PolygonUtil.isInside((JSONArray) temp.get("SHAPE"), Double.parseDouble(re.getString("LNG")), Double.parseDouble(re.getString("LAT")))){
				String sql1 = sql_update();
				sql1=sql1.replace("${POLYGON_ID}", temp.get("POLYGON_ID").toString());
				sql1=sql1.replace("${POINT_ID}", re.getString("POINT_ID"));
				System.out.println(sql1);
				pstmtm=c1.prepareStatement(sql_update());
				pstmtm.executeUpdate();
			 }
		}
		re.close();
		pstmt.close();
		c.close();
		}
		pstmtm.close();
		c1.close();
		System.out.println(i);
	}
	
	public String sql_polygon(){
		return prop().getProperty("sql_polygon");
	}
	
	public String sql_point(){
		return prop().getProperty("sql_point");
	}

	public String sql_update(){
		return prop().getProperty("sql_update");
	}
	 
	
	public Properties prop(){
		Properties prop = new Properties();
	    try{
	    	FileInputStream bufferedReader =  new FileInputStream(cfgFile);
	        prop.load(bufferedReader);
	    }catch(Exception exe){
	    	exe.printStackTrace();
	    }finally{
	    	try{
	    	}catch(Exception exe){}
	    }
	    return prop;
	}
	
	public static void main(String[] args) throws ClassNotFoundException, SQLException{
		cfgFile = args[0];
		SqlUpdate sql = new SqlUpdate();
		sql.sql_point_list();
	}
}
