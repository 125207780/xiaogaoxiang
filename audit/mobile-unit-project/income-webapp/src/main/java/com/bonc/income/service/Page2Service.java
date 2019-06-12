package com.bonc.income.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.income.dao.mapper.Page2Mapper;

@Service
public class Page2Service {

	@Resource
	private Page2Mapper mapper;
	
	public List<Map<String,Object>> selectTable(Integer statisMonth,Integer areaId ){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", statisMonth);
		param.put("areaId", areaId);
		return mapper.selectTable(param);
	}
	
	public List<Map<String,Object>> getCharts1(Integer statisMonth,Integer areaId,String prodId,String packageId){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", statisMonth);
		param.put("areaId", areaId);
		param.put("prodId", prodId);
		param.put("packageId", packageId);
		return mapper.getCharts1(param);
	}
	
	public List<Map<String,Object>> getCharts2(Integer statisMonth,Integer areaId,String prodId,String packageId){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", statisMonth);
		param.put("areaId", areaId);
		param.put("prodId", prodId);
		param.put("packageId", packageId);
		return mapper.getCharts2(param);
	}
	
	public List<Map<String,Object>> getCharts3(Integer statisMonth,Integer areaId,String prodId,String packageId){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", statisMonth);
		param.put("areaId", areaId);
		param.put("prodId", prodId);
		param.put("packageId", packageId);
		return mapper.getCharts3(param);
	}
	
	public List<Map<String,Object>> getCharts4(Integer statisMonth,Integer areaId,String prodId,String packageId){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", statisMonth);
		param.put("areaId", areaId);
		param.put("prodId", prodId);
		param.put("packageId", packageId);
		return mapper.getCharts4(param);
	}
}
