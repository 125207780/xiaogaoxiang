package com.bonc.income.dao.mapper;

import java.util.List;
import java.util.Map;

public interface Page2Mapper {
	
	List<Map<String,Object>> selectTable(Map<String,Object> param);
	
	List<Map<String,Object>> getCharts1(Map<String,Object> param);
	
	List<Map<String,Object>> getCharts2(Map<String,Object> param);
	
	List<Map<String,Object>> getCharts3(Map<String,Object> param);
	
	List<Map<String,Object>> getCharts4(Map<String,Object> param);
}
