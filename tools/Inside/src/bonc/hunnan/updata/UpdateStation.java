package bonc.hunnan.updata;

import java.io.FileInputStream;
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

public class UpdateStation {

	private double x_PI = 3.14159265358979324 * 3000.0 / 180.0;
	private double PI = 3.1415926535897932384626;
	private double a = 6378245.0;
	private double ee = 0.00669342162296594323;
	private List<Map<String,Object>> gridList = new ArrayList<Map<String,Object>>();
	private static String statis_date = null;
	
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
	
	public static void main(String[] args) throws Exception{
		cfgFile = args[0];
		statis_date = args[1];
		UpdateStation updateStation = new UpdateStation();
		updateStation.getGridShape();
		updateStation.insertStation();
	}
	
	

	public String sql_polygon(){
		return "SELECT A.ORG_ID AS GRID_CODE,B.SHAPE,B.MAXLNG,B.MINLNG,B.MAXLAT,B.MINLAT FROM SYS_ORG A,"
				+ "GRID_DETAIL B WHERE A.ORG_ID = B.ORG_ID AND A.ORGLEVEL = 4 AND A.ORG_ID IS NOT NULL";
	}
	
	public String sql_point(){
		return "SELECT TOWN_DESC AS AREA_NAME,CNTY_ID AS ORG_ID,LAC_CELL_ID AS STATION_CODE,CELL_NAME AS STATION_NAME"
				+ ",TYP AS STATION_TYPE,GEOG_LONG AS STATION_LON,GEOG_LAT AS STATION_LAT,NULL GRID_CODE,LAC_ID AS LAC_ID"
				+ ",CELL_ID AS CELL_ID,AREA_ID AS CITY_ID,AREA AS CITY_NAME,BTS_ATTR AS BTS_ATTR,LIFE_CYC_STATS AS IS_ONNET "
				+ "FROM MASARP.DIM_LAC_CELL_D WHERE LIFE_CYC_STATS LIKE '%在网%' AND STATIS_DATE =  ${STATIS_DATE}";
//		return "SELECT AREA_NAME, ORG_ID, STATION_CODE, STATION_NAME, STATION_TYPE, STATION_LON, STATION_LAT, GRID_CODE, LAC_ID, CELL_ID, CITY_ID, CITY_NAME, BTS_ATTR, IS_ONNET, VOICE_USER_NUM, AVG_DOU, NEW_VOICE_USER, AVG_MOU, COMPARE_LAST, COMPARE_YES, TOTAL_FEE, HOME_NUM, WORK_NUM "
//		+ "FROM STATION_INFO";
	}

	public String sql_update(){
		return prop().getProperty("sql_update");
	}
	
	
	 /**
	    * WGS84 转换为 BD-09 谷歌地球经纬度转百度地图经纬度
	    * @param lng
	    * @param lat
	    * @returns {*[]}
	    * 
	    */
	@SuppressWarnings("unused")
	private double[]  wgs84tobd09(double lng, double lat){
        //第一次转换
        double dlat = transformlat(lng - 105.0, lat - 35.0);
        double dlng = transformlng(lng - 105.0, lat - 35.0);
        double radlat = lat / 180.0 * PI;
        double magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        double sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        double mglat = lat + dlat;
        double mglng = lng + dlng;

        //第二次转换
        double z = Math.sqrt(mglng * mglng + mglat * mglat) + 0.00002 * Math.sin(mglat * x_PI);
        double theta = Math.atan2(mglat, mglng) + 0.000003 * Math.cos(mglng * x_PI);
        double[] bd_lng_lat = {z * Math.cos(theta) + 0.0065,z * Math.sin(theta) + 0.006};
        //double bd_lat = z * Math.sin(theta) + 0.006;
        return bd_lng_lat;
	}
	
	 private double transformlat(double lng,double lat){
	       double ret= -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
	       ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	       ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
	       ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
	       return ret;
	   }

	   private double transformlng(double lng,double lat){
	       double ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
	       ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	       ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
	       ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
	       return ret;
	   }
	
	
	   
//	public void isNUll(Object o){
//		return o == null?null:o.toString();
//	}
	   
	 /**
	  * 获取基站信息
	  * @return
	  * @throws ClassNotFoundException
	  * @throws SQLException
	  */
	public List<Map<String,Object>> sql_station_list() throws ClassNotFoundException, SQLException{
		long currentTimeMillis = System.currentTimeMillis();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		Connection c= connect();
		String getStation = sql_point();
		getStation = getStation.replace("${STATIS_DATE}", statis_date);
		System.out.println(getStation);
		PreparedStatement pstmt = c.prepareStatement(getStation);
		ResultSet rs = pstmt.executeQuery();
		 while (rs.next()) {
			 Map<String,Object> map = new HashMap<String,Object>();
			 map.put("AREA_NAME", rs.getString("AREA_NAME"));
			 map.put("ORG_ID", rs.getString("ORG_ID"));
			 map.put("STATION_CODE", rs.getString("STATION_CODE"));
			 map.put("STATION_NAME", rs.getString("STATION_NAME"));
			 map.put("STATION_TYPE", rs.getString("STATION_TYPE"));
			 map.put("STATION_LON", rs.getDouble("STATION_LON"));
			 map.put("STATION_LAT", rs.getDouble("STATION_LAT"));
			 map.put("GRID_CODE", rs.getString("GRID_CODE"));
			 map.put("LAC_ID", rs.getString("LAC_ID"));
			 map.put("CELL_ID", rs.getString("CELL_ID"));
			 map.put("CITY_ID", rs.getString("CITY_ID"));
			 map.put("CITY_NAME", rs.getString("CITY_NAME"));
			 map.put("BTS_ATTR", rs.getString("BTS_ATTR"));
			 map.put("IS_ONNET", rs.getString("IS_ONNET"));
			 //System.out.println(rs.getFloat("STATION_LON") + ":" + rs.getFloat("STATION_LAT"));
			 list.add(map);
		 }
		 rs.close();
		 pstmt.close();
		 c.close();
		 System.out.println("获取基站信息时间:" + (System.currentTimeMillis() - currentTimeMillis));
		return list;
	}
	
	/**
	 * 获取网格轮廓
	 * @throws Exception
	 */
	public void getGridShape() throws Exception{
		long currentTimeMillis = System.currentTimeMillis();
		Connection c= connect();
		System.out.println(sql_polygon());
		PreparedStatement pstmt = c.prepareStatement(sql_polygon());
		ResultSet rs = pstmt.executeQuery();
		 while (rs.next()) {
			 Map<String,Object> map = new HashMap<String,Object>();
			 map.put("GRID_CODE", rs.getString("GRID_CODE"));
			 map.put("SHAPE", JSONArray.parseArray(rs.getString("SHAPE")));
			 map.put("MAXLNG", rs.getDouble("MAXLNG"));
			 map.put("MINLNG", rs.getDouble("MINLNG"));
			 map.put("MAXLAT", rs.getDouble("MAXLAT"));
			 map.put("MINLAT", rs.getDouble("MINLAT"));
			 gridList.add(map);
		 }
		 rs.close();
		 pstmt.close();
		 c.close();
		 System.out.println("获取网格轮廓时间:" + (System.currentTimeMillis() - currentTimeMillis));
	}
	
	@SuppressWarnings("unused")
	public String isInGridShape(double lng,double lat){
//		long currentTimeMillis = System.currentTimeMillis();
		for(Map<String,Object> gridInfo:  gridList){
			String GRID_CODE = gridInfo.get("GRID_CODE").toString();
//			String SHAPE = gridInfo.get("SHAPE").toString();
			if(PolygonUtil.isInside((JSONArray) gridInfo.get("SHAPE"), lng, lat)){
//				System.out.println("判断是否在网格内的时间:" + (System.currentTimeMillis() - currentTimeMillis));
				return GRID_CODE;
			 }
		}
//		System.out.println("判断是否在网格内的时间:" + (System.currentTimeMillis() - currentTimeMillis));
		return null;
	}
	
	
	public void insertStation() throws Exception {
		   String sql ="";
		   //System.out.println(sql);
		   PreparedStatement pstmt =null;
		   Connection c1 = null;
		   	try {
		   		c1 = connect();
		   		c1.setAutoCommit(false);
		   		int i = 1 ;
		   		long currentTimeMillis = System.currentTimeMillis();
		   		for(Map<String,Object> temp : sql_station_list()){
		   			String AREA_NAME = ((Object)temp.get("AREA_NAME") == null)?null:temp.get("AREA_NAME").toString();
		   			String ORG_ID = ((Object)temp.get("ORG_ID") == null)?null:temp.get("ORG_ID").toString();
		   			String STATION_CODE = ((Object)temp.get("STATION_CODE") == null)?null:temp.get("STATION_CODE").toString();
		   			String STATION_NAME = ((Object)temp.get("STATION_NAME") == null)?null:temp.get("STATION_NAME").toString();
		   			String STATION_TYPE = ((Object)temp.get("STATION_TYPE") == null)?null:temp.get("STATION_TYPE").toString();
		   			double STATION_LON = ((Object)temp.get("STATION_LON") == null)?null:(double) temp.get("STATION_LON");
		   			double STATION_LAT = ((Object)temp.get("STATION_LAT") == null)?null:(double) temp.get("STATION_LAT");
		   			String GRID_CODE = null;
		   			if(isNotNull((Object)STATION_LON)&&isNotNull(STATION_LAT)){
		   				double[] bd_lng_lat = wgs84tobd09(STATION_LON,STATION_LAT);
		   				STATION_LON = bd_lng_lat[0];
		   				STATION_LAT = bd_lng_lat[1];
		   				GRID_CODE = isInGridShape(STATION_LON,STATION_LAT);
		   			}		   			
		   			String LAC_ID = ((Object)temp.get("LAC_ID") == null)?null:temp.get("LAC_ID").toString();
		   			String CELL_ID = ((Object)temp.get("CELL_ID") == null)?null:temp.get("CELL_ID").toString();
		   			String CITY_NAME = ((Object)temp.get("CITY_NAME") == null)?null:temp.get("CITY_NAME").toString();
		   			String CITY_ID = ((Object)temp.get("CITY_ID") == null)?null:temp.get("CITY_ID").toString();
		   			String BTS_ATTR = ((Object)temp.get("BTS_ATTR") == null)?null:temp.get("BTS_ATTR").toString();
		   			String IS_ONNET = ((Object)temp.get("IS_ONNET") == null)?null:temp.get("IS_ONNET").toString();
		   			sql = "INSERT INTO GRID.STATION_INFO_CS (AREA_NAME, ORG_ID, STATION_CODE, STATION_NAME, STATION_TYPE, STATION_LON, STATION_LAT, GRID_CODE, LAC_ID, CELL_ID, CITY_ID, CITY_NAME, BTS_ATTR, IS_ONNET)"
		   					+ " VALUES (" + isNUll(AREA_NAME) + "," + isNUll(ORG_ID) + "," + isNUll(STATION_CODE) + "," + isNUll(STATION_NAME) + "," + isNUll(STATION_TYPE)
		   					+ "," + STATION_LON + "," + STATION_LAT + "," + isNUll(GRID_CODE) + "," + isNUll(LAC_ID) + "," + isNUll(CELL_ID) + "," + isNUll(CITY_ID) + "," + isNUll(CITY_NAME) + "," + 
		   							isNUll(BTS_ATTR) + "," + isNUll(IS_ONNET) + ")";
		   			pstmt = c1.prepareStatement(sql);
//		   			pstmt.addBatch();   			
		   			if(i%1000==0){
		   				pstmt.executeBatch();
		   				c1.commit();
		   				System.out.println("插入" + i + "条数据的时间:" + (System.currentTimeMillis() - currentTimeMillis)/1000/60 + "分钟");
//		   				i=0;
		   			}
//		   			pstmt.execute();
		   			i++;
		   		}
//		   		pstmt.close();	
		   		pstmt.executeBatch();
		   		c1.commit();
   				  		   				
			} catch (Exception e) {
				System.out.println(sql);
				e.printStackTrace();
			}finally {
				pstmt.close();
		   		c1.close();	
			}
	   }
	
	public boolean isNotNull(Object o){
		return o==null?false:true;
	}
	
	public String isNUll(String s){
		return s==null?null:"'" + s + "'";
	}
	
}
