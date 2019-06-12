package com.bonc.common.utils;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;



/**
 * 
 * 类名: HttpInvokeService <br/>  
 * 说明: Http调用类. <br/>  
 * 
 * @author liboqiang@bonc.com.cn
 * @version 1.0
 * @since JDK 1.6
 */
public class HttpInvoker {
	
	/**
	 * 媒体类型
	 */
	private String contentType=null;
	
	/**
	 * 数据类型
	 */
	private String dataType=null;
	
	
	/**
	 * 令牌
	 */
	private String token=null;
	
	
	/**
	 * 数据类型JSON
	 */
	public static final String DATA_TYPE_JSON="json";  
	
	/**
	 * 媒体类型"application/json"
	 */
	public static final String CONTENT_TYPE_JSON="application/json";
	
	
	/**
	 * 
	 * post:(调用Post方法，获取返回值). <br/> 
	 * 
	 * @author liboqiang
	 * @param urlStr:URL地址
	 * @return
	 * @throws Exception 
	 * @since JDK 1.6
	 */
	public String post(String urlStr) throws Exception {
		return execPost(urlStr,new HashMap<String,String>());
	}
	
	
	/**
	 * 
	 * post:(调用Post方法，获取返回值). <br/> 
	 * 
	 * @author liboqiang
	 * @param urlStr
	 * @param prmObj
	 * @return
	 * @throws Exception 
	 * @since JDK 1.6
	 */
	public String post(String urlStr, Object prmObj) throws Exception{
		return execPost(urlStr,prmObj);
	}
	

	/**
	 * 
	 * 调用Post方法，获取返回值<br/> 
	 * 
	 * @param urlStr:URL地址
	 * @param requestParamsMap:参数
	 * @throws Exception 
	 * @return String 返回字符串
	 */
	public String post(String urlStr, Map<String, String> requestParamsMap) throws Exception{
		return execPost(urlStr,requestParamsMap);
	}
	
	/**
	 * 
	 * 调用GET方法，获取返回值. <br/> 
	 * 
	 * @param urlStr:URL地址
	 * @param requestParamsMap:参数
	 * @return 返回字符串
	 * @throws Exception
	 */
	public String get(String urlStr) throws Exception{
		return execGet(urlStr);
	}
	
	
	/**
	 * 
	 * 执行调用get请求. <br/>
	 * 
	 * @param url:url地址
	 * @return 返回字符串
	 * @throws Exception
	 */
	private String execGet(String urlStr) throws Exception {
		String result = "";
		OutputStream outStrm = null;
		BufferedReader bufferedReader = null;
		HttpURLConnection httpUrlConnection = null;
		try {
			URL url = new URL(urlStr);
			URLConnection rulConnection = url.openConnection();// 此处的urlConnection对象实际上是根据URL的
			// 请求协议(此处是http)生成的URLConnection类
			// 的子类HttpURLConnection,故此处最好将其转化
			// 为HttpURLConnection类型的对象,以便用到
			// HttpURLConnection更多的API.如下:
			httpUrlConnection = (HttpURLConnection) rulConnection;
			// 设定请求的方法
			httpUrlConnection.setRequestMethod("GET");
			bufferedReader = new BufferedReader(new InputStreamReader(httpUrlConnection.getInputStream()));  
            String line;  
            while ((line = bufferedReader.readLine()) != null) {  
            	result += line;  
            }
			httpUrlConnection.disconnect();
		} catch (Exception e) {
			e.printStackTrace();
			if(e instanceof FileNotFoundException) {//判断是不是数据转换异常
				throw new RuntimeException("发送 GET("+urlStr+")请求出现异常,请检URL是否正确！" );
			}
			else{
				throw new RuntimeException("发送 GET请求出现异常！" + e.getMessage());
			}
		} finally {
			try {
				if (outStrm != null) {
					outStrm.close();
				}
				if (bufferedReader != null) {
					bufferedReader.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}
	/**
	 * 
	 * 执行调用，调用方法，获取返回值. <br/>
	 * 
	 * @param urlStr url地址 
	 * @param requestParamsMap 请求参数
	 * @param type 请求类型 post/get
	 * @return 返回字符串
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	private String execPost(String urlStr, Object prmObj) throws Exception {
		String result = "";
		OutputStream outStrm = null;
		BufferedReader bufferedReader = null;
		HttpURLConnection httpUrlConnection = null;
		try {
			URL url = new URL(urlStr);
			URLConnection rulConnection = url.openConnection();// 此处的urlConnection对象实际上是根据URL的
			// 请求协议(此处是http)生成的URLConnection类
			// 的子类HttpURLConnection,故此处最好将其转化
			// 为HttpURLConnection类型的对象,以便用到
			// HttpURLConnection更多的API.如下:
			httpUrlConnection = (HttpURLConnection) rulConnection;
			// 设定请求的方法
			httpUrlConnection.setRequestMethod("POST");
			// 设置是否向httpUrlConnection输出，因为这个是post请求，参数要放在
			// http正文内，因此需要设为true, 默认情况下是false;
			httpUrlConnection.setDoOutput(true);
			// 设置是否从httpUrlConnection读入，默认情况下是true;
			httpUrlConnection.setDoInput(true);
			// Post 请求不能使用缓存
			httpUrlConnection.setUseCaches(false);
			// 设置媒体类型
			if(this.contentType!=null){
				httpUrlConnection.setRequestProperty("Content-type", this.contentType);
			}
			
			outStrm = httpUrlConnection.getOutputStream();
			if(DATA_TYPE_JSON.equals(this.dataType)){
				outStrm.write(JSON.toJSONString(prmObj).getBytes());
			}
			else{
				String params = "";
				Map<String,String> requestParamsMap=(Map<String, String>) prmObj;
				Iterator<Entry<String, String>> it = requestParamsMap.entrySet().iterator();
				while (it.hasNext()) {
					Entry<String, String> element = it.next();
					params += element.getKey();
					params += "=";
					params += element.getValue();
					params += "&";
				}
				outStrm.write(params.getBytes());
			}

			bufferedReader = new BufferedReader(new InputStreamReader(httpUrlConnection.getInputStream()));  
            String line;  
            while ((line = bufferedReader.readLine()) != null) {  
            	result += line;  
            }
			httpUrlConnection.disconnect();
		} catch (Exception e) {
			e.printStackTrace();
			if(e instanceof FileNotFoundException) {//判断是不是数据转换异常
				throw new RuntimeException("发送POST请求("+urlStr+")请求出现异常,请检URL是否正确！" );
			}
			else{
				throw new RuntimeException("发送POST请求出现异常！" + e.getMessage());
			}
		} finally {
			try {
				if (outStrm != null) {
					outStrm.close();
				}
				if (bufferedReader != null) {
					bufferedReader.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}

	/** 
	* contentType. 
	* 
	* @return  the contentType 
	* @since   JDK 1.6 
	*/
	public String getContentType() {
		return contentType;
	}

	/** 
	 * contentType. 
	 * 
	 * @param   contentType    the contentType to set 
	 * @since   JDK 1.6 
	 */
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	/** 
	* dataType. 
	* 
	* @return  the dataType 
	* @since   JDK 1.6 
	*/
	public String getDataType() {
		return dataType;
	}

	/** 
	 * dataType. 
	 * 
	 * @param   dataType    the dataType to set 
	 * @since   JDK 1.6 
	 */
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	/** 
	* token. 
	* 
	* @return  the token 
	* @since   JDK 1.6 
	*/
	public String getToken() {
		return token;
	}

	/** 
	 * token. 
	 * 
	 * @param   token    the token to set 
	 * @since   JDK 1.6 
	 */
	public void setToken(String token) {
		this.token = token;
	}
}
