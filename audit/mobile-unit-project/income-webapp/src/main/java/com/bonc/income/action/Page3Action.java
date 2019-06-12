package com.bonc.income.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.income.service.Page3Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/page3")
public class Page3Action {
	
	@Resource
	private Page3Service page3Service;	

	
	@RequestMapping(value = "/selectTable")
	@ResponseBody
	public PageJqGrid<Map<String,Object>> selectTable(Integer statisMonth,String areaId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String,Object>> pageList = (Page<Map<String, Object>>) page3Service.selectTable(statisMonth,areaId);
		PageJqGrid<Map<String,Object>> pageJqGrid = new PageJqGrid<Map<String,Object>>(pageList);
		return pageJqGrid;
	}
	
	@RequestMapping(value = "/echart1")
	@ResponseBody
	public List<Map<String,Object>> echart1(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page3Service.echart1(jobject);
	}
	
	@RequestMapping(value = "/echart2")
	@ResponseBody
	public List<Map<String,Object>> echart2(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page3Service.echart2(jobject);
	}
	
	@RequestMapping(value = "/echart3")
	@ResponseBody
	public List<Map<String,Object>> echart3(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page3Service.echart3(jobject);
	}
	
	@RequestMapping(value = "/echart4")
	@ResponseBody
	public List<Map<String,Object>> echart4(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page3Service.echart4(jobject);
	}
	
	@RequestMapping(value = "/echart5")
	@ResponseBody
	public List<Map<String,Object>> echart5(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page3Service.echart5(jobject);
	}
	
}
