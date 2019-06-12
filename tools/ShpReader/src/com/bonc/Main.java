package com.bonc;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.geotools.data.shapefile.ShapefileDataStore;  
import org.geotools.data.shapefile.ShapefileDataStoreFactory;  
import org.geotools.data.simple.SimpleFeatureIterator;  
import org.geotools.data.simple.SimpleFeatureSource;  
import org.opengis.feature.Property;  
import org.opengis.feature.simple.SimpleFeature;
public class Main {
	
	private String inputPath;
	 
 
	private String sql ="insert into map_search(TEXTLABEL,CITY,DISTRICT,PROVINCE,TYPE,SUBTYPE,ADDRESS,POINT) values ('${TEXTLABEL}','${CITY}','${DISTRICT}','${PROVINCE}',${TYPE},${SUBTYPE},'${ADDRESS}','${POINT}');";
 
	private String outPath ; 
	private Map<String, String> cityCodes  = new HashMap<>();
	
	
	public Main(String  inputPath,String outPath) {
	     
	      this.inputPath = inputPath;
	      this.outPath = outPath;
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
	     
	    
	      
	}
	
	 private   List<String> getFileList() throws Exception{
		 List<String> fileList =new ArrayList<>();
		 File filepath = new File(this.inputPath);
		 if(filepath.exists()&&filepath.isDirectory()) {
			 String[] farr =  filepath.list();
			  for(String fname :farr) {
				  if(fname.substring(fname.length()-4).equals(".shp")) {
					  fileList.add(fname);
					 
				  }
			  }
		 }else {
			 throw new RuntimeException(this.inputPath+",路径不存在");
		 }
		 
		 return fileList;
	 }
	
	 public void read()  throws Exception{
		 File outSqlFile = new File(this.outPath+"/map_search.sql");
		 File outTextFile = new File(this.outPath+"/outText.sql");
   	  // outFile.deleteOnExit();
   	  // outFile.mkdirs();
   	   //outFile.mkdir();
		 outSqlFile.createNewFile();
   	   FileOutputStream fot = new FileOutputStream(outSqlFile);
   	OutputStreamWriter outWriter = new OutputStreamWriter( fot,"UTF-8");
   	  
   	   outTextFile.createNewFile();
 	   FileOutputStream fot2 = new FileOutputStream(outTextFile);
 	  OutputStreamWriter outTextWriter = new OutputStreamWriter( fot2,"UTF-8");
   	   
		 List<String>  fileList =  this.getFileList();
        int all = 0;
 		 for(String file:fileList) {
		  
			 try {  
				
				 ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory();  
				 
		            ShapefileDataStore sds = (ShapefileDataStore)dataStoreFactory.createDataStore(new File(this.inputPath+"/"+file).toURI().toURL());  
		            sds.setCharset(Charset.forName("GBK"));  
		           
		            SimpleFeatureSource featureSource = sds.getFeatureSource();  
		            SimpleFeatureIterator itertor = featureSource.getFeatures().features();  
		           int i = 0;
		            while(itertor.hasNext()) {    
		                SimpleFeature feature = itertor.next();    
		                 
		                if (! (feature.getDefaultGeometry() instanceof com.vividsolutions.jts.geom.Point )) {
		                	System.out.println(file+"存储的不是点数据，不进行处理");
		                	 
		                	  break;
		                }else {
		                
		                String TEXTLABEL = this.notNull(feature.getAttribute("TEXTLABEL"));
		                
		                
		                if(!TEXTLABEL.equals("")) {
		                	
		                	i++;
		                	
			                String point = feature.getDefaultGeometry().toString();
			                String[] lnglat = point.substring(point.indexOf("(")+1,point.indexOf(")")).split(" ");
			                double[] bdlnglat =  GpsUtil.wg_bd_encrypt(Double.parseDouble(lnglat[1]), Double.parseDouble(lnglat[0]));
			                point = "{lng:"+bdlnglat[1]+",lat:"+bdlnglat[0]+"}";
			                
		                	String outStr = this.sql;
		                	outStr=outStr.replace("${POINT}",point);
		                	String CITY = this.notNull(feature.getAttribute("CITY"));
		                	String DISTRICT = this.notNull(feature.getAttribute("DISTRICT"));
		                	String 	PROVINCE = 	this.notNull(feature.getAttribute("PROVINCE"));
		                	String TYPE  = this.notNull(feature.getAttribute("TYPE"));
		                	String SUBTYPE = this.notNull(feature.getAttribute("SUBTYPE"));
		                	String ADDRESS = this.notNull(feature.getAttribute("ADDRESS"));
		                	String UID = this.notNull(feature.getAttribute("UID"));
		                	String IMAGEURL = this.notNull(feature.getAttribute("IMAGEURL"));
		                	 outStr = outStr.replace("${CITY}", CITY);
		                	 outStr = outStr.replace("${DISTRICT}", DISTRICT);
		                	 outStr = outStr.replace("${PROVINCE}", PROVINCE);
		                	 outStr = outStr.replace("${TYPE}", TYPE);
		                	 outStr = outStr.replace("${SUBTYPE}", SUBTYPE);
		                	 outStr = outStr.replace("${ADDRESS}", ADDRESS);
		                	  
		                	 outStr=outStr+"\n";
		                	  outWriter.write(outStr);
		                	  outWriter.flush(); 
		                	 
		                	 String code = this.cityCodes.get(CITY);
		                	 if(TEXTLABEL.length()>2&&code!=null) {//从百度获取
		                		String text=  TEXTLABEL+","+CITY+"\n";
		                		 outTextWriter.write(text);
		                		 outTextWriter.flush();
		                	 }
		                }
		                
		                
		              
		               
		             }
		           
		               
		            }
		            System.out.println("读取"+file+",输出"+i+"条记录");
		           
		            all += i;
		          // itertor.close();  
		        } catch (Exception e) {  
		            e.printStackTrace();  
		            System.exit(0);
		        }  
 	 }
			 
		  outWriter.close();
		  outTextWriter.close();
		  fot2.close();
		  fot.close();
		  System.out.println("总数量"+all);
	 }
	 
	 private String notNull(Object o) {
		 if(o==null) {
			 return "";
		 }else {
			 return o.toString().trim();
		 }
	 }
	 
	 public static void main(String[] args) { 
		 
		 Main main = new Main("D:/hunan/shp","D:/hunan/");
		 try {
     		main.read();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
	      
	        ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory(); 
	        try {  
	            ShapefileDataStore sds = (ShapefileDataStore)dataStoreFactory.createDataStore(new File("D:/hunan/shp2/交通服务设施.shp").toURI().toURL());  
	            sds.setCharset(Charset.forName("GBK"));  
	            
	            
	            SimpleFeatureSource featureSource = sds.getFeatureSource();  
	            SimpleFeatureIterator itertor = featureSource.getFeatures().features();  
	            int i = 0;
	            while(itertor.hasNext()) {    
	                SimpleFeature feature = itertor.next();    
	                Iterator<Property> it = feature.getProperties().iterator();  
               System.out.println(feature.getAttribute("TEXTLABEL")+"#"+feature.getDefaultGeometry());
               String point = feature.getDefaultGeometry().toString();
               point = point.substring(point.indexOf("(")+1,point.indexOf(")"));
               System.out.println(point);
//	                
//	                while(it.hasNext()) {    
//	                    Property pro = it.next();  
//	                    
//	                    System.out.println(pro.getName()+"#"+pro.getValue());   
//	                     
//	                    }  
	                i++;
	                break;
	                }
	            System.out.println(i);
	           
	                itertor.close();    
	        } catch (Exception e) {  
	            e.printStackTrace();  
	            System.exit(0);
	        }  
	    }  
}
