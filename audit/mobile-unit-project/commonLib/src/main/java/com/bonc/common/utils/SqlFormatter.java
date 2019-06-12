package com.bonc.common.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.engine.jdbc.internal.BasicFormatterImpl;

import com.bonc.common.hibernate.BoncDDLFomatterImpl;

/**
 * SQL Formatter
 * 
 * @author lbqrcy
 *
 */
public class SqlFormatter {

	/**
	 * 格式化SQL文
	 * 
	 * @param sql
	 * @return
	 */
	public static String format(String sql) {
		try {
			return new BasicFormatterImpl().format(sql);
		} catch (Exception e) {
			e.printStackTrace();
			return sql;
		}
	}

	/**
	 * 格式化DDL文
	 * 
	 * @param sql
	 * @return
	 */
	public static String formatDDL(String sql) {
		try {
			return new BoncDDLFomatterImpl().format(sql);
		} catch (Exception e) {
			e.printStackTrace();
			return sql;
		}
	}

	/**
	 * 格式化视图创建语句
	 * 
	 * @param sql
	 * @return
	 */
	public static String formatCreateView(String sql) {
		List<String> repSections = RegUtils.matchs("\\[[^\\]]*]", sql, 0);
		Map<String, String> repMap = new HashMap<String, String>();
		int index = 0;
		for (String str : repSections) {
			String repVar = "special_varable" + index;
			sql = sql.replace(str, repVar);
			repMap.put(repVar,str);
			index++;
		}
		String formated = format(sql);
		for (Map.Entry<String, String> entry : repMap.entrySet()) {
			formated = formated.replace(entry.getKey(), entry.getValue());
		}
		return formated;
	}
}
