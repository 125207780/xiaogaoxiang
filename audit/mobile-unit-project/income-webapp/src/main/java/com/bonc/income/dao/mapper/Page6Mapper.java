package com.bonc.income.dao.mapper;

import java.util.List;
import java.util.Map;

public interface Page6Mapper {
	
	List<Map<String, Object>> selectDay(Map<String, Object> param);

	List<Map<String, Object>> selectMonth(Map<String, Object> param);

	List<Map<String, Object>> getFreeType();
}
