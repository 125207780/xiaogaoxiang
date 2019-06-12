package com.bonc.gisuitl;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import com.ibm.db2.jcc.am.ce;

public class InCircle {
  private String jdbcClassName ="";
  private String jdbcUrl="";
  private String jdbcUser = "";
  private String jdbcPassword = "";
  private String pointSql = "";
  private String insertSql = "";
  private String selectSql = "";
  private FileInputStream file;
  private Connection conn;
  private int radius;
  // 读取配置文件
  public Properties initProperties(FileInputStream file){
		Properties p =new Properties();
		try {
			p.load(file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return p;
	}
  	//初始的一个数据库连接
  public void conn() throws ClassNotFoundException{
	    Class.forName(this.jdbcClassName);
	    try {
			 conn=(Connection)DriverManager.getConnection(this.jdbcUrl, this.jdbcUser,this.jdbcPassword);
			 System.out.println("连接成功！！！！");
	    } catch (SQLException e) {
			e.printStackTrace();
		}
  }
  //构造器
  private InCircle(String configFilePath)  {	
		try {
			this.file = new FileInputStream(configFilePath);
		} catch (FileNotFoundException e) {
			System.out.println("配置文件不存在");
			System.exit(0);
			e.printStackTrace();
		}
	    Properties p = this.initProperties(this.file);
		this.jdbcClassName=p.getProperty("jdbcClassName");
		this.jdbcUrl=p.getProperty("jdbcUrl");
		this.jdbcUser=p.getProperty("jdbcUser");
		this.jdbcPassword=p.getProperty("jdbcPassword");
		this.pointSql=p.getProperty("pointSql");
		this.insertSql=p.getProperty("insertSql");
		this.selectSql=p.getProperty("selectSql");
		this.radius =Integer.parseInt(p.getProperty("radius"));
	}
  
  // 返回外接正方形内的点集合 
  public List pointList(double minlng , double maxlng ,double minlat, double maxlat) throws SQLException{
	  List<Point> pointList = new ArrayList<>();
	    String pointSql = this.pointSql;
	    PreparedStatement pstmt  = conn.prepareStatement(pointSql);
		pstmt.setDouble(1, minlng);
		pstmt.setDouble(2, maxlng);
		pstmt.setDouble(3, minlat);
		pstmt.setDouble(4, maxlat);
		ResultSet rs = pstmt.executeQuery();
		 while(rs.next()){
			 	//double lng = rs.getDouble("lng");
				double lat = rs.getDouble("lat");
		        double lng = rs.getDouble("lng");
		        Point p =new Point (lng,lat);
		        pointList.add(p);
		    }
	 	pstmt.close();
	  return pointList;		
  	}
  //进行插入
  public void InsertSql(int pointID,double lng ,double lat ,int circleID) throws SQLException{
	  String sql = this.insertSql;
	  PreparedStatement	pstm=  this.conn.prepareStatement(sql);
	  pstm.setInt(1, pointID);
	  pstm.setDouble(2, lng);
	  pstm.setDouble(3, lat);
	  pstm.setInt(4, circleID);
	  pstm.executeUpdate();	  
	  pstm.close();
  }
  
	//radius 半径 单位米 经纬度 半径 圆id
  /*
   *		传入经纬度  半径 圆id    
   *		先得到 外接 正方形 的 四个顶点  minlng maxlng minlat maxlat
   *		通过sql 语句进行筛选  条件是 点的经纬度在范围内
   * */
	private void run(double lng,double lat ,double radius, int Pointid) throws ClassNotFoundException, SQLException {
		double  d = radius / 6378800, 
				e = Math.PI / 180 * lat, 
				f = Math.PI / 180 * lng;
		double minlng = 180,maxlng = -180,minlat = 90 ,maxlat =-90;
		for(int g=0;g<360;g+=90) {
			double  i = - Math.PI / 180 * g,
					k = Math.asin(Math.sin(e) * Math.cos(d) + Math.cos(e) * Math.sin(d) * Math.cos(i));
			double tlng = ((f - Math.atan2(Math.sin(i) * Math.sin(d) * Math.cos(e), 
					Math.cos(d) - Math.sin(e) * Math.sin(k)) + Math.PI) % (2 * Math.PI) - Math.PI) * (180 / Math.PI);
			double tlat = k * (180 / Math.PI);
			minlng = Math.min(minlng, tlng); 
			maxlng = Math.max(maxlng, tlng); 
			minlat =Math.min(minlat, tlat); 
			maxlat = Math.max(maxlat, tlat); 
		}
		//查询 minlng+"#"+maxlng+";"+minlat+"#"+maxlat 范围内的所有店      minlng<=pointlng <=maxlng  &&  minlat <= pointlat <=maxlat
		//System.out.println(minlng+"#"+maxlng+";"+minlat+"#"+maxlat);
		
		List<Point> listPoint =this.pointList(minlng,maxlng,minlat,maxlat);
		int num =0;
		for (Point points: listPoint){
			num++;	
			//System.out.println(num);
			double lat1 =points.getLat();
			double lng1 =points.getLng();
			
			if(getDistance(lng1,lat1,lng,lat)<=radius) {
				//System.out.println("144");
				InsertSql(num, lng1, lat1, num);
			}
		} 
	}
 			 
	private   double getDistance(double lng1,double lat1,double lng2,double lat2  ) {
		return 6370996.81 * Math.acos(Math.sin(rad(lat1)) * Math.sin(rad(lat2)) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(rad(lng2) - rad(lng1)));
	 }
	private double rad(double a) {
		return Math.PI * a / 180;
	}
	public List<Point> centerPoint() throws SQLException{
		List<Point> centerpoints = new ArrayList<>();
		 String sql = this.selectSql;
		 PreparedStatement pstm = conn.prepareStatement(sql);
		    ResultSet rs =  pstm.executeQuery();
		    int num =1;
		    while (rs.next()){
		    	num++;
		    	double lat = rs.getDouble("lat");
		        double lng = rs.getDouble("lng");
				Point p = new Point(lng,lat);
				p.setPointID(num);
				centerpoints.add(p);
		    	
		    }
		    pstm.close();
			return centerpoints;
	}
	
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		List<Point> centerpoint = new ArrayList<>();
		//InCircle c = new InCircle("D:/HA/sys2.properties");
			InCircle c = new InCircle("src/com/bonc/gisuitl/sys2.properties");
			c.conn();
		centerpoint=c.centerPoint();
		for (Point centerpoints : centerpoint){
			c.run(centerpoints.getLng(), centerpoints.getLat(), c.radius, centerpoints.getPointID());
		}
		   c.conn.close();
	}
	
}
