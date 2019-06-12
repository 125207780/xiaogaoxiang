package bonc.hunnan.updata;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class MaxMin {
	private static String cfgFile = "";
	
	public Connection connect() throws SQLException, ClassNotFoundException{
	    Connection connection = null;
		Class.forName(prop().getProperty("class.forName"));
		connection=(Connection)DriverManager.getConnection(prop().getProperty("url"), prop().getProperty("user"), prop().getProperty("pwd"));
		return connection;
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
	public String sql_selectList(){
		return prop().getProperty("sql_selectList");
	}


	public void sql_insert() throws ClassNotFoundException, SQLException {
		double maxlng=0;
		double maxlat=0;
		double minlng=Double.MAX_VALUE;
		double minlat=Double.MAX_VALUE;
		String sql_selectList = sql_selectList();
		System.out.println(sql_selectList);
		PreparedStatement pstmt = connect().prepareStatement(sql_selectList);
		ResultSet rs = pstmt.executeQuery();
		PreparedStatement pstms;
		int i=1;
		while(rs.next()) {
			System.out.println(rs.getString("aoistr"));
			if(!rs.getString("aoistr").equals("")) {	
			String aoistr = rs.getString("aoistr");
			//System.out.println(aoistr);
			aoistr =aoistr.substring(1, aoistr.indexOf("]"));
			aoistr=aoistr.replace("\"", "");
			String [] aoistrs=aoistr.split("\\},");
			String [] mmal;
			for(int j=0;j<aoistrs.length;j++) {
				if(j==aoistrs.length-1) {
					aoistrs[j]=aoistrs[j].substring(aoistrs[j].indexOf("{")+1,aoistrs[j].indexOf("}"));
					mmal=aoistrs[j].split(",");	
				}else {
					aoistrs[j]=aoistrs[j].substring(aoistrs[j].indexOf("{")+1);
					mmal= aoistrs[j].split(",");		
				}
				maxlng=(Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1))>maxlng)?Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1)):maxlng;
				maxlat=(Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1))>maxlat)?Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1)):maxlat;
				minlng=(Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1))<minlng)?Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1)):minlng;
				minlat=(Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1))<minlat)?Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1)):minlat;
			}	
			pstms= connect().prepareStatement(prop().getProperty("sql_insert"));
			//System.out.println(prop().getProperty("sql_insert"));
			pstms.setDouble(1, maxlng);
			pstms.setDouble(2, maxlat);
			pstms.setDouble(3, minlng);
			pstms.setDouble(4, minlat);
			pstms.setString(5, rs.getString("uid"));
			pstms.executeUpdate();
		}	
		}
	}
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		cfgFile=args[0];
		MaxMin mm = new MaxMin();
		mm.sql_insert();
		
		/*double maxlng=0;
		double maxlat=0;
		double minlng=Double.MAX_VALUE;
		double minlat=Double.MAX_VALUE;
		String [] mmal;
		String aoistr="[{lng:112.89995,lat:28.12725},{lng:112.898886,lat:28.126578}]";
		aoistr =aoistr.substring(aoistr.indexOf("["), aoistr.indexOf("]"));
		//aoistr=aoistr.replace("\"", "");
		String [] aoistrs=aoistr.split("},");
		for(int j=0;j<aoistrs.length;j++) {
			if(j==aoistrs.length-1) {
				aoistrs[j]=aoistrs[j].substring(aoistrs[j].indexOf("{")+1,aoistrs[j].indexOf("}"));
				mmal=aoistrs[j].split(",");
			}else {
				aoistrs[j]=aoistrs[j].substring(aoistrs[j].indexOf("{")+1);
				mmal= aoistrs[j].split(",");		
			}
			maxlng=(Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1))>maxlng)?Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1)):maxlng;
			maxlat=(Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1))>maxlat)?Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1)):maxlat;
			minlng=(Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1))<minlng)?Double.valueOf(mmal[0].substring(mmal[0].indexOf(":")+1)):minlng;
			minlat=(Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1))<minlat)?Double.valueOf(mmal[1].substring(mmal[1].indexOf(":")+1)):minlat;
			
		}
		System.out.println(maxlng+":"+maxlat+":"+minlng+":"+minlat);*/
	}
}
