package com.bonc.common.utils;

import java.util.List;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;

/**
 * 
 * ClassName: Properties <br/>
 * Function: 配置文件工具类. <br/>
 * 
 * @author liboqiang
 * @version
 * @since JDK 1.6
 */
public class PropUtil {

	/**
	 * 
	 * get:(获取配置文件). <br/>
	 * 
	 * @author liboqiang
	 * @param properties
	 * @param key
	 * @return
	 * @since JDK 1.6
	 */
	public static String get(java.util.Properties properties, String key) {
		String proVal = properties.getProperty(key);
		if(StringUtils.isEmpty(proVal)) {
			return "";
		}
		return doGet(properties, proVal);
	}

	/**
	 * 
	 * doGet:(私有方法获取配置). <br/> 
	 * 
	 * @author liboqiang
	 * @param properties
	 * @param proVal
	 * @return 
	 * @since JDK 1.6
	 */
	private static String doGet(Properties properties, String proVal) {
		String elReg = "\\$\\s*\\{\\s*[^\\}]*\\s*\\}";
		String keyReg = "\\$\\s*\\{\\s*([^\\}]*)\\s*\\}";
		List<String> elList = RegUtils.matchs(elReg, proVal, 0);
		for (String el : elList) {
			String subKey = RegUtils.match(keyReg, el, 1);
			String realVal = properties.getProperty(subKey);
			if (RegUtils.isMatch(elReg, realVal)) {
				realVal=doGet(properties, realVal);
			}
			proVal = proVal.replace(el, realVal);
		}
		return proVal;
	}
}
