package updata;
import java.util.regex.*;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Updata {
	public Properties initProperties(FileInputStream file){
		Properties p =new Properties();
		try {
			p.load(file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return p;
	}
	
	public Map<String,String> repalceSQL(String sql){
		System.out.println(sql );
		HashMap<String,String> map =new  HashMap<String,String>(); 
		int count =0;
		 String re = "\\$\\{\\d+\\}";
		 Pattern parttern = Pattern.compile(re,Pattern.CASE_INSENSITIVE);
		 Matcher m = parttern.matcher(sql);
		 StringBuffer sb = new StringBuffer();
		    while(m.find()){
		          count ++;	
		         // System.out.println(m.group());
		          String matchStr = m.group();  
			        matchStr = matchStr.replaceAll("\\$\\{\\d+\\}", "?");  
			        m.appendReplacement(sb, matchStr); 
		    }
		    m.appendTail(sb);
		sql =sb.toString();
	 
		map.put("sql", sql);
	
		return map;
	}
	
	public Map<String,String> Msql(String sql){
		HashMap<String,String> map = new HashMap<>();
		int count=0;
		 String re = "\\$\\{\\d+\\}";
		 Pattern parttern = Pattern.compile(re,Pattern.CASE_INSENSITIVE);
		 Matcher m = parttern.matcher(sql);
		 StringBuffer sb = new StringBuffer();
		 while(m.find()){
			 sb.append(m.group()+",");
		}
		     String vv= sb.toString();
			 String rex = "\\d+";
			 Pattern parttern1 = Pattern.compile(rex,Pattern.CASE_INSENSITIVE); 
			 Matcher m1 = parttern.matcher(vv);
			 StringBuffer sb1= new StringBuffer();
			 while(m1.find()){
				sb1.append(m1.group()+",");
			 }
			 //System.out.println(sb1.toString()+"sb11111");
			  count=  sb1.toString().split(",").length;
			  String vvv[] =sb1.toString().split(",");
			  map.put("count", String.valueOf(count));
			  for(int i=0;i<count;i++){
				  //System.out.println(vvv[i].substring(vvv[i].indexOf("{")+1, vvv[i].indexOf("}")));
				  map.put(String.valueOf(i), vvv[i].substring(vvv[i].indexOf("{")+1, vvv[i].indexOf("}")));
			  }
			  return map; 
			}
		
public static void main(String[] args) throws FileNotFoundException, IOException, ClassNotFoundException, SQLException {
	Updata up = new Updata();
	//Properties p =up.initProperties(new FileInputStream(args[1]));
	int count1=0;
	Properties p =up.initProperties(new FileInputStream("D:/hunan/sys.properties"));
	Class.forName(p.getProperty("class.forName"));
	Connection conn = null;
    try {
		 conn=(Connection)DriverManager.getConnection(p.getProperty("url"), p.getProperty("user"), p.getProperty("pwd"));
	} catch (SQLException e) {
		e.printStackTrace();
	}
	
	FileReader fr = new FileReader("d:/hunan/INSERT.txt");
	BufferedReader  br = new BufferedReader (fr);
	String st ="";
	while ((st=br.readLine())!=null){
		String str [] =st.split("#");
		String sql= p.getProperty("sql_Update");
		/* System.out.println(new Updata().Msql(sql).get("count")+"////////////////////////////"); 
	 	 System.out.println("��һ��"+);*/
	
		 count1=Integer.valueOf(new Updata().Msql(sql).get("count"));
		 System.out.println(count1);
		
		 String replaceSql= new Updata().repalceSQL(sql).get("sql");
		 System.out.println(replaceSql);
		// int count =Integer.valueOf(new Updata().repalceSQL(sql).get("count"));
		 PreparedStatement pstmt = conn.prepareStatement(replaceSql);
		 for(int i=0;i<count1;i++){
	 		 String vi =new Updata().Msql(sql).get(String.valueOf(i));
	 		
	 		 pstmt.setString(i+1,str[Integer.valueOf(vi)]);
	 		 System.out.println(i+1+"************"+str[Integer.valueOf(vi)]);
	 	 }
	 	 
		 	 pstmt.executeUpdate();
		 	 pstmt.close();
	}
}
}
