package com.bonc.income.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.bonc.income.dao.mapper.Page5Mapper;

@Service
public class Page5Service {

	@Resource
	private Page5Mapper mapper;
	
	public List<Map<String,Object>> selectTable(Integer statisMonth,Integer areaId ){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", statisMonth);
		param.put("areaId", areaId);
		return mapper.selectTable(param);
	}
	
	public List<Map<String,Object>> getCharts1(JSONObject jobject){
		Map<String,Object> paramMap = new HashMap<>();
		paramMap.put("areaId", jobject.getInteger("areaId"));
		paramMap.put("statisMonth", jobject.getInteger("statisMonth"));
		paramMap.put("PROD_ID", jobject.getString("PROD_ID"));
		paramMap.put("PACKAGE_ID", jobject.getString("PACKAGE_ID"));
		return mapper.echart1(paramMap);
	}

}
