package com.bonc.report.dao.mapper;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import org.json.JSONException;

import com.alibaba.fastjson.JSONObject;

/**
 * 
 * @FileName RptFirstPageThreeMapperSql.java
 * @Author xiaogaoxiang
 * @At 2019年4月17日 下午6:13:03
 * @Desc 首页自助分析工具导出MapperSql类
 */
public class RptFirstPageThreeMapperSql {

	public String selectSelfHelpReportInfo(Map<String, Object> params) throws JSONException {
		String sql = "SELECT " + params.get("tableColumn").toString();
		sql += " FROM " + params.get("tableName").toString()+ " WHERE 1 = 1 ";
		if (null != params.get("grid") && !"".equals(params.get("grid"))) {
			sql += " AND GRID_CODE = '" + params.get("grid")+"'";
		} else if (null != params.get("town") && !"".equals(params.get("town"))) {
			sql += " AND CNTY_CODE = '" + params.get("town")+"'";
		} else if (null != params.get("city") && !"".equals(params.get("city"))) {
			sql += " AND CITY_CODE = '" + params.get("city")+"'";
		}
		if(params.get("selfParams")!=null){
			try {
				Map<String, Object> paramMap = new HashMap<>();
				paramMap = (Map<String, Object>) JSONObject.parseObject(params.get("selfParams").toString());
				Iterator<Entry<String, Object>> it = paramMap.entrySet().iterator();
				Entry<String, Object> entry = null;
				String conditionOne = null;
				String conditionTwo = null;
				while (it.hasNext()) {
					entry = (Entry<String, Object>) it.next();
					if (null != entry.getValue() && !"".equals(entry.getValue())) {
						conditionOne = entry.getKey().split("&")[0];
						conditionTwo = entry.getKey().split("&")[1];
						sql += " AND " + conditionOne;
						if("NUM".equals(conditionTwo)) {
							sql += " = " + entry.getValue();
						} else if("LIKE".equals(conditionTwo)) {
							sql += " LIKE '%" + entry.getValue() + "%' ";
						} else {
							sql += " = '" + entry.getValue() + "' ";
						}
					}
				}
			} catch (Exception e) {
			}
		}
		sql += " ORDER BY ORG_LEVEL, CITY_NAME, CNTY_CODE, GRID_CODE ";
		return sql;
	}
}
