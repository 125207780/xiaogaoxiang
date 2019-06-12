package com.bonc.map.dao.mapper;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONException;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * 
 * @FileName FirstPageThreeMapperSql.java
 * @Author xiaogaoxiang
 * @At 2019年4月15日 下午3:14:52
 * @Desc 首页业务MapperSql类
 */
public class FirstPageThreeMapperSql {

	public String selectSelfHelpReportInfoList(String jsonStr) throws JSONException {
		GsonBuilder gsonbuilder = new GsonBuilder().serializeNulls();
		Gson gson = gsonbuilder.create();
		List<Map<String, Object>> mapList = gson.fromJson(jsonStr, new TypeToken<List<Map<String, Object>>>() {
		}.getType());
		Map<String, Object> params = mapList.get(0);
		Map<String, Object> paramsMap = mapList.get(1);
		String sql = "SELECT " + params.get("tableColumn");
		sql += " FROM " + params.get("tableName") + " WHERE 1 = 1 ";
		if ("1".equals(params.get("orgLevel").toString())) {
			sql += " AND ORG_LEVEL = '1' ";
		} else if ("2".equals(params.get("orgLevel").toString())) {
			sql += " AND ORG_LEVEL = '2' ";
			sql += " AND CITY_CODE = '" + params.get("orgId").toString() + "' ";
		} else if ("3".equals(params.get("orgLevel").toString())) {
			sql += " AND ORG_LEVEL = '3' ";
			sql += " AND CNTY_CODE = '" + params.get("orgId").toString() + "' ";
		} else if ("4".equals(params.get("orgLevel").toString())) {
			sql += " AND ORG_LEVEL = '4' ";
			sql += " AND GRID_CODE = '" + params.get("orgId").toString() + "' ";
		}
		if (null != paramsMap && paramsMap.size() > 0) {
			try {
				JSONObject maleArray = new JSONObject(paramsMap);
				Iterator<Entry<String, Object>> it = maleArray.entrySet().iterator();
				Entry<String, Object> entry = null;
				String conditionOne = null;
				String conditionTwo = null;
				while (it.hasNext()) {
					entry = (Entry<String, Object>) it.next();
					if (null != entry.getValue() && !"".equals(entry.getValue())) {
						conditionOne = entry.getKey().split("&")[0];
						conditionTwo = entry.getKey().split("&")[1];
						sql += " AND " + conditionOne;
						if ("NUM".equals(conditionTwo)) {
							sql += " = " + entry.getValue();
						} else if ("LIKE".equals(conditionTwo)) {
							sql += " LIKE '%" + entry.getValue() + "%' ";
						} else {
							sql += " = '" + entry.getValue() + "' ";
						}
					}
				}
			} catch (Exception e) {
			}
		}
		List<String> colList = Arrays.asList(params.get("tableColumn").toString().split(","));
		sql += " ORDER BY ";
		if(colList.contains("ORG_LEVEL")) {
			sql += " ORG_LEVEL, CITY_NAME, CNTY_CODE, GRID_CODE ";
		} else {
			sql += " CITY_NAME, CNTY_CODE, GRID_CODE ";
		}
		return sql;
	}

	/**
	 * 自主分析报表如果有账期，则查询该表的最大账期
	 * 
	 * @Title getSelfHelpReportStatisDate
	 * @Author xiaogaoxiang
	 * @param tableName
	 * @param statisDateCol
	 * @return String
	 */
	public String getSelfHelpReportStatisDate(Map<String, Object> params) {
		String sql = "SELECT MAX(STATIS_DATE) AS STATIS_DATE";
		sql += " FROM " + params.get("tableName").toString();
		return sql;
	}

	/**
	 * 查询指标分析排名sql
	 * 
	 * @Title getBenchmarkingAnalysisOrder
	 * @Author xiaogaoxiang
	 * @param params
	 * @return String
	 */
	public String getBenchmarkingAnalysisOrder(Map<String, Object> params) {
		String sql = this.getBenchmarkingAnalysisSql();
		sql += " WHERE VTYPE = " + params.get("type");
		sql += " AND STATIS_DATE = " + params.get("statisDate");
		if ("ASC".equals(params.get("ascOrDesc"))) {
			sql += " ORDER BY SCORE ASC ";
		} else {
			sql += " ORDER BY SCORE DESC ";
		}
		sql += " FETCH FIRST " + params.get("orderNum") + " ROWS ONLY ";
		return sql;
	}

	/**
	 * 查询指标分析SQL
	 * 
	 * @Title getBenchmarkingAnalysisSql
	 * @Author xiaogaoxiang
	 * @return String
	 */
	private String getBenchmarkingAnalysisSql() {
		String sql = "SELECT VTYPE, ORG_ID, CITY_CODE, CITY_NAME, CNTY_CODE, CNTY_NAME, GRID_CODE, GRID_NAME, INCOME, INCOME_SCORE, "
				+ "ADDCUS_INCOME, ADDCUS_SCORE, TELE_COUNT, TELE_SCORE, BRO_ADD_COUNT, BRO_ADD_SCORE, TERMINAL_COUNT, TERMINAL_SCORE, "
				+ "HOMENET_ADD_COUNT, HOMENET_ADD_SCORE, CELLRATE_ADD_SUM, CELLRATE_ADD_SCORE, ADD_VALUE_COUNT, ADD_VALUE_SCORE, "
				+ "FUSE_RATE, FUSE_SOCRE, ENCLOSURE_COUNT, ENCLOSURE_SCORE, SCORE, STATIS_DATE FROM GRID_COMPARE_ANALYSIS_INDEX";
		return sql;
	}
}
