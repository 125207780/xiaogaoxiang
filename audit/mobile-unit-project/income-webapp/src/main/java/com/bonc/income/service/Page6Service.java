package com.bonc.income.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.income.dao.mapper.Page6Mapper;

@Service
public class Page6Service {

	@Resource
	private Page6Mapper mapper;

	public List<Map<String, Object>> selectDay(Integer feeDate, Integer areaId) {
		Map<String, Object> param = new HashMap<>();
		param.put("feeDate", feeDate);
		param.put("areaId", areaId);
		return mapper.selectDay(param);
	}

	public List<Map<String, Object>> selectMonth(Integer feeDate, Integer areaId, Integer statisMonth, String feeType) {
		Map<String, Object> param = new HashMap<>();
		param.put("feeDate", feeDate);
		param.put("areaId", areaId);
		param.put("statisMonth", statisMonth);
		param.put("feeType", feeType);
		return mapper.selectMonth(param);
	}

	public List<Map<String, Object>> getFreeType() {
		return mapper.getFreeType();
	}

}
