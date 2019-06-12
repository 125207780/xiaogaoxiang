package com.bonc.income.dao.mapper;

import java.util.List;
import java.util.Map;

public interface Page1Mapper {
	
	List<Map<String,Object>> getTable(Map<String,Object> param);
	
	Map<String,Object> getDataInfo(Map<String,Object> param);
	
	Map<String,Object> echart1(Map<String,Object> param);
	
	List<Map<String,Object>> echart2(Map<String,Object> param);
	
	List<Map<String,Object>> echart3(Map<String,Object> param);
	
	List<Map<String,Object>> echart4(Map<String,Object> param);
	
	List<Map<String,Object>> echart5(Map<String,Object> param);
	
	Map<String,String> IncomPlace(Map<String,Object> paramMap);
}
