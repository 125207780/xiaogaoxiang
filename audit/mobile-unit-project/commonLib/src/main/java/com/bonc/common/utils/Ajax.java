package com.bonc.common.utils;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * 
* @ClassName: AjaxUtils
* @Description: Ajax前后台交互方法
* @author 李博强  liboqiang@bonc.com.cn
* @date 2016年3月21日 下午8:43:21
*
 */
public class Ajax {

	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param msg 消息
	* @param object 返回前台的数据
	* @return
	 */
	public static String responseString(String code,String msg,Object object){
		return responseString(code,msg,object,false);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param msg 消息
	* @param object 返回前台的数据
	* @param addAllFlg 是否作为同一级别的key追加到key-->data之后(true:追加到data节点之后 false：添加到data节点下)
	* @return
	 */
	@SuppressWarnings("unchecked")
	public static String responseString(String code,String msg,Object object,boolean addAllFlg){
		Map<String,Object> res=new HashMap<String,Object>();
		res.put("code", code);
		res.put("msg", msg);
		if(addAllFlg){
			try{
				res.putAll((Map<? extends String, ? extends Object>) object);
			}
			catch(ClassCastException e){
				String json=JSON.toJSONString(object);
				Map<String,Object> map=(Map<String, Object>) JsonUtils.json2Java(json);
				res.putAll(map);
			}
		}
		else{
			res.put("data", object);
		
		}
		return JSON.toJSONString(res);
	}
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param object 返回前台的数据
	* @param addAllFlg 是否作为同一级别的key追加到key-->data之后
	* @return
	 */
	public static String responseString(String code,Object object,boolean addAllFlg){
		return responseString(code,null,object,addAllFlg);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param msg 消息
	* @return
	 */
	public static String responseString(String code,String msg){
		return responseString(code,msg,null);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param object 返回前台的数据
	* @return
	 */
	public static String responseString(String code,Object object){
		return responseString(code,null,object);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @return
	 */
	public static String responseString(String code){
		return responseString(code,null,null);
	}
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param msg 消息
	* @param object 返回前台的数据
	* @return
	 */
	public static JSONObject responseJson(String code,String msg,Object object){
		return responseJson(code,msg,object,false);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param msg 消息
	* @param object 返回前台的数据
	* @param addAllFlg 是否作为同一级别的key追加到key-->data之后
	* @return
	 */
	@SuppressWarnings("unchecked")
	public static JSONObject responseJson(String code,String msg,Object object,boolean addAllFlg){
		JSONObject jso = new  JSONObject();
		jso.put("code", code);
		jso.put("msg", msg);
		if(addAllFlg){
			jso.putAll((Map<? extends String, ? extends Object>) object);
		}
		else{
			jso.put("data", object);
		
		}
		return jso;
	}
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param object 返回前台的数据
	* @param addAllFlg 是否作为同一级别的key追加到key-->data之后
	* @return
	 */
	public static JSONObject responseJson(String code,Object object,boolean addAllFlg){
		return responseJson(code,null,object,addAllFlg);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param msg 消息
	* @return
	 */
	public static JSONObject responseJson(String code,String msg){
		return responseJson(code,msg,null);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @param object 返回前台的数据
	* @return
	 */
	public static JSONObject responseJson(String code,Object object){
		return responseJson(code,null,object);
	}
	
	
	/**
	* @Title: responseBody
	* @Description: 返回前台
	* @param code 状态码：0(成功)  -1(系统异常)  1,2......n(业务异常)
	* @return
	 */
	public static JSONObject responseJson(String code){
		return responseJson(code,null,null);
	}
}
