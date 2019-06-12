package com.bonc.common.utils;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * 
 * @FileName JsonUtil.java
 * @Author xiaogaoxiang
 * @At 2018年12月27日 上午10:27:58
 * @Desc 自定义响应结构
 */
public class JsonUtil {

	// 定义jackson对象
	private static final ObjectMapper MAPPER = new ObjectMapper();

	/**
	 * 将对象转换成json字符串。
	 * 
	 * @Title objectToJson
	 * @Author xiaogaoxiang
	 * @param data
	 * @return String
	 */
	public static String objectToJson(Object data) {
		try {
			String string = MAPPER.writeValueAsString(data);
			return string;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 将json结果集转化为对象
	 * 
	 * @Title jsonToPojo
	 * @Author xiaogaoxiang
	 * @param jsonData
	 * @param beanType
	 * @return T
	 */
	public static <T> T jsonToPojo(String jsonData, Class<T> beanType) {
		try {
			T t = MAPPER.readValue(jsonData, beanType);
			return t;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 将json数据转换成pojo对象list
	 * 
	 * @Title jsonToList
	 * @Author xiaogaoxiang
	 * @param jsonData
	 * @param beanType
	 * @return List<T>
	 */
	public static <T> List<T> jsonToList(String jsonData, Class<T> beanType) {
		JavaType javaType = MAPPER.getTypeFactory().constructParametricType(List.class, beanType);
		try {
			List<T> list = MAPPER.readValue(jsonData, javaType);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * 将json字符串转换为List<Map<String, Object>>格式
	 * 
	 * @Title jsonToListMap @Author hubinbin @return
	 * List<Map<String,Object>> @throws
	 */
	public static List<Map<String, Object>> jsonToListMap(String json) {
		return new Gson().fromJson(json, new TypeToken<List<Map<String, String>>>() {
		}.getType());
	}

	public static <T> Map<String, List<T>> jsonToMapList(String json, Class<T> beanType) {
		JavaType javaType = MAPPER.getTypeFactory().constructParametricType(List.class, beanType);
		try {
			Map<String, List<T>> list = MAPPER.readValue(json, javaType);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
