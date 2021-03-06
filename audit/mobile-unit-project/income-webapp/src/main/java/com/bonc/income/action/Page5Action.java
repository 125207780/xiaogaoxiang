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
import com.bonc.income.service.Page5Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/page5")
public class Page5Action {
	
	@Resource
	private Page5Service Page5Service;	

	
	@RequestMapping(value = "/selectTable")
	@ResponseBody
	public PageJqGrid<Map<String,Object>> selectTable(Integer statisMonth,Integer areaId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String,Object>> pageList = (Page<Map<String, Object>>) Page5Service.selectTable(statisMonth,areaId);
		PageJqGrid<Map<String,Object>> pageJqGrid = new PageJqGrid<Map<String,Object>>(pageList);
		return pageJqGrid;
	}
	
	//当月新增订购成本与收入
	@RequestMapping(value = "/getCharts1")
	@ResponseBody
	public List<Map<String,Object>> getCharts1(String param){
		JSONObject jobject=  JSON.parseObject(param);
		return  Page5Service.getCharts1(jobject);
	}
	
}
