package com.bonc.common.utils;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
* @ClassName: JsonUtils
* @Description: JSON工具类
* @author 李博强  liboqiang@bonc.com.cn
* @date 2016年3月21日 下午8:48:02
*
 */
public class JsonUtils {
	
	/**
	 * 
	* @Title: java2json
	* @Description: Java对象转Json
	* @param obj
	* @return
	 */
	public static String java2json(Object obj){
		ObjectMapper mapper = new ObjectMapper(); 
		String json="";
		try {
			json = mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} 
		return json;
	} 
	
	
	/**
	 * 
	* @Title: json2Java
	* @Description: Json对象转Java对象
	* @param json
	* @return
	 */
	public static Object json2Java(String json){
		ObjectMapper mapper = new ObjectMapper(); 
		Object javaObj=new Object();
		try {
			javaObj= mapper.readValue(json, Object.class);
		} catch (IOException e) {
			e.printStackTrace();
		} 
		return javaObj;
	} 
}
