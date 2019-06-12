package com.bonc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
 

public class DownloadBD {
	private String inputFile;
	private String outFile ;
	private String outShapeFile ;
	private String outImagePath ; 
	private Map<String, String> cityCodes  = new HashMap<>();
	 
	
	public DownloadBD(String inputFile,String outPath,String index) {
		this.inputFile=inputFile;
		this.outFile = outPath+"/map_bd_search"+index+".sql";
		this.outShapeFile = outPath+"/map_bd_search_shape"+index+".sql";
		this.outImagePath = outPath+"/image";
		   cityCodes.put("娄底市", "221");
		      cityCodes.put("岳阳市", "220");
		      cityCodes.put("常德市", "219");
		      cityCodes.put("张家界市", "312");
		      cityCodes.put("怀化市", "363");
		      cityCodes.put("株洲市", "222");
		      cityCodes.put("永州市", "314");
		      cityCodes.put("湘潭市", "313");
		      cityCodes.put("湘西土家族苗族自治州", "274");
		      cityCodes.put("益阳市", "272");
		      cityCodes.put("衡阳市", "159");
		      cityCodes.put("邵阳市", "273");
		      cityCodes.put("郴州市", "275");
		      cityCodes.put("长沙市", "158");
		File file = new File(this.outImagePath);
		if  (!file .exists()  && !file .isDirectory())      
		{       
//		   System.out.println("创建目录"+file.getPath());
		    file.mkdirs();    
		}
	}
	
	public void download() throws Exception{
		File in = new File(this.inputFile);
		 
		BufferedReader br = new BufferedReader(new FileReader(in));//构造一个BufferedReader类来读取文件
        String s = null;
        File outSqlFile = new File(this.outFile);
   	 outSqlFile.createNewFile();
 	   FileOutputStream fot = new FileOutputStream(outSqlFile);
 	OutputStreamWriter outWriter = new OutputStreamWriter( fot,"UTF-8");
 	  
 	  File outShapeFile = new File(this.outShapeFile);
 	 outShapeFile.createNewFile();
  	   FileOutputStream spfot = new FileOutputStream(outShapeFile);
  	OutputStreamWriter outSpWriter = new OutputStreamWriter( spfot,"UTF-8");
  	  
        int r = 1;
        while((s = br.readLine())!=null){//使用readLine方法，一次读一行
        	if(s.indexOf(",")>0) {
        		String keyWord = s.split(",")[0];
        		String city=s.split(",")[1];
        		if(keyWord.indexOf("厕所")>-1) {
        			continue;
        		}
        		try {
        			System.out.print(r+"-->");
        			r++;
        			downloadKeyWord(city,keyWord,outWriter,outSpWriter);
        			
        		}catch (Exception e) {
					e.printStackTrace();
//					System.err.println("获取百度信息失败:"+s);
				}
        	}
        }
        br.close();    
        outWriter.close();
        outSpWriter.close();
        fot.close();
        spfot.close();
	}
	
	private void downloadKeyWord(String city,String keyWord,OutputStreamWriter sqlWriter,OutputStreamWriter shpWriter) throws Exception {
		//http://api.map.baidu.com/?qt=s&c=131&wd=餐饮&rn=1
		String cityCode = this.cityCodes.get(city);
		if(cityCode==null) {
			return;
		}
		int rn = 20;
		String urlStr = "http://api.map.baidu.com/?qt=s&c="+cityCode+"&wd="+keyWord+"&rn="+rn;
		 URL url   = new URL(urlStr);
		 HttpURLConnection  huc = (HttpURLConnection)url.openConnection(); 
		 huc.setConnectTimeout(10000); 
		 huc.setReadTimeout(10000); 
		 huc.setRequestMethod("GET"); 
		 InputStream   in = url.openStream(); 
		 InputStreamReader inr = new InputStreamReader(in);
		 BufferedReader br = new BufferedReader(inr);
		 StringBuffer sb = new StringBuffer();
		 String tmpline = "";
		 while((tmpline =br.readLine())!=null) {
			  
			 sb.append(tmpline);
		 }
		 
		 inr.close();
		 in.close();
		 
		 String jsonStr = sb.toString();
		 System.out.println(city+":"+keyWord+"#"+jsonStr.toString());
		 int n =0;
		 while(jsonStr.contains("\"ext\"")) {
			 String tmpImage = jsonStr.substring(jsonStr.indexOf("\"image\""));
			 tmpImage =tmpImage.substring(0,tmpImage.indexOf("\",")+2);
	 
			 int ext = jsonStr.indexOf("\"ext\"");
			 int ext_type = jsonStr.indexOf("\"ext_type\"",ext)+10;
			 if(ext<ext_type&&n<rn) {
				 n++;
			     jsonStr = jsonStr.substring(0, ext)+tmpImage+"\"tmpmytype\""+jsonStr.substring(ext_type);
			 }else {
				 break;
			 }
			// System.out.println(jsonStr);   
			 
		 }
	
 
		JSONObject obj = JSONObject.parseObject(jsonStr);
		JSONArray content = (JSONArray)obj.get("content");
		if(content==null) {
			//百度查询不到
			throw new RuntimeException("百度查询不到"+city+":"+keyWord);
		}
		
		 for(int i=0;i<content.size();i++) {
			 JSONObject o =(JSONObject) content.get(i);
			 String uid = o.getString("uid");
			 String image =notNull( o.getString("image"));
			 String x = notNull(o.getString("x"));
			 String y = notNull(o.getString("y"));
			 String name =notNull( o.getString("name"));
			 String addr =notNull( o.getString("addr"));
			 addr = addr.replace("'", "\'");
			
			 
			 if(isNull(uid)||isNull(x)||isNull(y)||isNull(name)) {
				 continue;
			 }
			 double[] point = PointUtil.convertMC2LL(new double[] {Double.parseDouble(x)/100,Double.parseDouble(y)/100}); 
			 String imageUrl =downloadImage(uid, image);
			 String sql = "insert into map_bd_search(TEXTLABEL,CITY,ADDRESS,POINT,UID,IMAGEURL,lng,lat)"
			 		+ " values ('"+name+"','"+city+"','"+addr+"','{\"lng\":"+point[0]+",\"lat\":"+point[1]+"}',"
			 				+ "'"+uid+"','"+imageUrl+"',"+point[0]+","+point[1]+");";
			 sqlWriter.write(sql+"\n");
			 sqlWriter.flush(); 
			 downloadShape(uid,shpWriter);
		 }
		
		 
	}
	 private String notNull(Object o) {
		 if(o==null) {
			 return "";
		 }else {
			 return o.toString().trim();
		 }
	 }
	 
	 private boolean isNull(Object o) {
		 if(o==null) {
			 return true;
		 }else {
			 if(o.toString().trim().equals("")) {
				 return true;
			 }else {
				 return false;
			 }
		 }
		 
	 }
	 private void downloadShape(String uid ,OutputStreamWriter shpWriter) {
		 try {
		 String urlStr = "http://map.baidu.com/?reqflag=pcmap&from=webmap&qt=ext&uid="+uid+"&ext_ver=new&l=18";
		 URL url   = new URL(urlStr);
		 HttpURLConnection  huc = (HttpURLConnection)url.openConnection(); 
		 huc.setConnectTimeout(10000); 
		 huc.setReadTimeout(10000); 
		 huc.setRequestMethod("GET"); 
		 InputStream   in = url.openStream(); 
		 InputStreamReader inr = new InputStreamReader(in);
		 BufferedReader br = new BufferedReader(inr);
		 StringBuffer sb = new StringBuffer();
		 String tmpline = "";
		 while((tmpline =br.readLine())!=null) {
			  
			 sb.append(tmpline);
		 }
		 
		 inr.close();
		 in.close();
		 
		 JSONObject obj = JSONObject.parseObject(sb.toString());
		 JSONObject content = obj.getJSONObject("content");
		 String geo = content.getString("geo");
		 if(geo!=null) {
			 if(geo.indexOf("|1-")>0) {
				 geo= geo.substring(geo.indexOf("|1-")+3);
				 geo= geo.substring(0, geo.indexOf(";"));
				String[]  pointStrArr = geo.split(",");
				if(pointStrArr.length%2==0) {
					StringBuffer shpStr = new StringBuffer();
					shpStr.append(uid+"#[");
					for(int i =0;i<pointStrArr.length;i+=2) {
						if(i!=0) {
							 
							shpStr.append(",");
						}
						double[] point = PointUtil.convertMC2LL(new double[] {Double.parseDouble(pointStrArr[i]),Double.parseDouble(pointStrArr[i+1])});
						shpStr.append("{\"lng\":"+point[0]+",\"lat\":"+point[1]+"}");
						
					}
					shpStr.append("]\n");
					shpWriter.write(shpStr.toString());
				}
			 }
			 
			 
		 }
		 }catch (Exception e) {
			// TODO: handle exception
		}
	 }
	 
	private String downloadImage(String uid,String imageUrl ) {
		if(isNull(imageUrl)) {
			return "default.jpg";
		}
		
		try {
			 File f  = new File(this.outImagePath+"/"+uid+".jpg") ; 
			 if(!f.exists()) {
		 URL url   = new URL(imageUrl);
		 HttpURLConnection  huc = (HttpURLConnection)url.openConnection(); 
		 huc.setConnectTimeout(10000); 
		 huc.setReadTimeout(10000); 
		 huc.setRequestMethod("GET"); 
		 InputStream   in = url.openStream(); 
	 
		 byte[] buffer = new byte[4096]; 
		   int bytes_read; 
		   
		    f.createNewFile();
		    FileOutputStream   fos  = new FileOutputStream(f); 
		 while ((bytes_read = in.read(buffer)) != -1) 
		   { 
			 fos.write(buffer,0,bytes_read); 
		   }
		 fos.flush();
		  fos.close();
		 in.close();
		 
			 }
		}catch (Exception e) {
			// TODO: handle exception
//			e.printStackTrace();
			return "default.jpg";
		}
		return uid+".jpg";
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub 
		 
		
		
		DownloadBD dd = new DownloadBD("d:/hunan/outText3.sql","d:/hunan","3");
		try {
  			dd.download();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

}
