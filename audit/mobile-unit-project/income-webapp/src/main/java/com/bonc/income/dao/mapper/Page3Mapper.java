package com.bonc.income.dao.mapper;

import java.util.List;
import java.util.Map;

public interface Page3Mapper {
	
	List<Map<String,Object>> selectTable(Map<String,Object> param);
	
	List<Map<String,Object>> echart1(Map<String,Object> param);
	
	List<Map<String,Object>> echart2(Map<String,Object> param);
	
	List<Map<String,Object>> echart3(Map<String,Object> param);
	
	List<Map<String,Object>> echart4(Map<String,Object> param);
	
	List<Map<String,Object>> echart5(Map<String,Object> param);
}
