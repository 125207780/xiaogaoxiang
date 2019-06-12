package com.bonc.income.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.bonc.income.dao.mapper.Page1Mapper;
import com.bonc.income.dao.mapper.Page2Mapper;

@Service
public class Page1Service {

	@Resource
	private Page1Mapper mapper;
	
	public List<Map<String,Object>> getTable(Integer statisMonth,String areaId ){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", statisMonth);
		param.put("areaId", areaId);
		return mapper.getTable(param);
	}
	
	public Map<String,Object> getDataInfo(Integer date,Integer area ,String prodId,String packageId){
		Map<String,Object> param = new HashMap<>();
		param.put("statisMonth", date);
		param.put("areaId", area);
		param.put("prodId", prodId);
		param.put("packageId", packageId);
		return mapper.getDataInfo(param);
	}
	
	public Map<String,Object> echart1 (JSONObject jobject){
		Map<String,Object> paramMap= new HashMap<String,Object>();
		paramMap.put("areaId", jobject.getInteger("areaId"));
		paramMap.put("statisMonth", jobject.getInteger("statisMonth"));
		paramMap.put("PROD_ID", jobject.getString("PROD_ID"));
		paramMap.put("PACKAGE_ID", jobject.getString("PACKAGE_ID"));
		return this.mapper.echart1(paramMap);
	}
	
	public List<Map<String,Object>> echart2 (JSONObject jobject){
		Map<String,Object> paramMap= new HashMap<String,Object>();
		paramMap.put("areaId", jobject.getInteger("areaId"));
		paramMap.put("statisMonth", jobject.getInteger("statisMonth"));
		paramMap.put("PROD_ID", jobject.getString("PROD_ID"));
		paramMap.put("PACKAGE_ID", jobject.getString("PACKAGE_ID"));
		return this.mapper.echart2(paramMap);
	}
	
	public List<Map<String,Object>> echart3 (JSONObject jobject){
		Map<String,Object> paramMap= new HashMap<String,Object>();
		paramMap.put("areaId", jobject.getInteger("areaId"));
		paramMap.put("statisMonth", jobject.getInteger("statisMonth"));
		paramMap.put("PROD_ID", jobject.getString("PROD_ID"));
		paramMap.put("PACKAGE_ID", jobject.getString("PACKAGE_ID"));
		return this.mapper.echart3(paramMap);
	}
	
	public List<Map<String,Object>> echart4 (JSONObject jobject){
		Map<String,Object> paramMap= new HashMap<String,Object>();
		paramMap.put("areaId", jobject.getInteger("areaId"));
		paramMap.put("statisMonth", jobject.getInteger("statisMonth"));
		paramMap.put("PROD_ID", jobject.getString("PROD_ID"));
		paramMap.put("PACKAGE_ID", jobject.getString("PACKAGE_ID"));
		return this.mapper.echart4(paramMap);
	}
	
	public List<Map<String,Object>> echart5 (JSONObject jobject){
		Map<String,Object> paramMap= new HashMap<String,Object>();
		paramMap.put("areaId", jobject.getInteger("areaId"));
		paramMap.put("statisMonth", jobject.getInteger("statisMonth"));
		paramMap.put("PROD_ID", jobject.getString("PROD_ID"));
		paramMap.put("PACKAGE_ID", jobject.getString("PACKAGE_ID"));
		return this.mapper.echart5(paramMap);
	}
}
