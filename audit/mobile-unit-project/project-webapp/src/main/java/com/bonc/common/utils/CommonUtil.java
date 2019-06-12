package com.bonc.common.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.TypeReference;
import com.bonc.common.bean.BaseBean;

/**
 * 
 * 类名: CommonUtil <br/>
 * 说明: 通用工具类. <br/>
 * 
 * @author sunce@bonc.com.cn
 * @version 1.0
 * @since JDK 1.6
 */
public class CommonUtil {

	/**
	 * 将MAP中的key转换为List<String>对象. <br/>
	 * 
	 * @param map
	 *            key为String类型，E为任意对象的Map对象。
	 * @return List<String> key的列表对象
	 */
	public static <E> List<String> convertMapKeyToStringList(Map<String, E> map) {
		Set<String> set = map.keySet();
		Iterator<String> i = set.iterator();
		List<String> result = new ArrayList<String>();
		while (i.hasNext()) {
			Object obj = i.next();
			result.add(obj.toString());
		}
		return result;
	}

	/**
	 * 将Json转换为指定的对象. <br/>
	 * 
	 * @param jsonString
	 *            json类型的字符串对象
	 * @param clz
	 *            将要转换为的对象。
	 * @return BaseBean<T> 返回BaseBean对象，其中T为传入的clz对象
	 */
	public static <T> BaseBean<T> getObject(String jsonString, Class<T> clz) {
		BaseBean<T> bb = JSON.parseObject(jsonString, new TypeReference<BaseBean<T>>() {
		});
		// 泛型类型调用paseObject的时候，使用parseObject可以转换Class，
		// 但是后边传TypeReference或者Type就解析不出泛型类型了，需要再转换一次
		List<T> list = JSONArray.parseArray(bb.getData().toString(), clz);
		bb.setData(list);
		return bb;
	}

	/**
	 * 判断输入的字符串是否为数字<br/>
	 * 
	 * @param str
	 *            输入字符串参数
	 * @return Boolean
	 */
	public static boolean isNumeric(String str) {
		Pattern pattern = Pattern.compile("[0-9]+");
		Matcher isNum = pattern.matcher(str);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}
}
