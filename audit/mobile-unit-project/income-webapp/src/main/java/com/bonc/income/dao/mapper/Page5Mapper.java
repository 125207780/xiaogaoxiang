package com.bonc.income.dao.mapper;

import java.util.List;
import java.util.Map;

public interface Page5Mapper {
	
	List<Map<String,Object>> selectTable(Map<String,Object> param);
	
	List<Map<String,Object>> echart1(Map<String,Object> param);

}
