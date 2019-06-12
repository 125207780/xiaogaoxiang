package com.bonc.income.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.income.service.Page1Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/page1")
public class Page1Action {
	@Resource
	private Page1Service page1Service;	

	
	@RequestMapping(value = "/getTable")
	@ResponseBody
	public PageJqGrid<Map<String,Object>> getTable(Integer statisMonth,String areaId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String,Object>> pageList = (Page<Map<String, Object>>) page1Service.getTable(statisMonth,areaId);
		PageJqGrid<Map<String,Object>> pageJqGrid = new PageJqGrid<Map<String,Object>>(pageList);
		return pageJqGrid;
	}
	
	@RequestMapping(value = "/getDataInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getDataInfo(Integer date, Integer area,String prodId,String packageId) {
		try {
			Map<String,Object> gridInfo= page1Service.getDataInfo(date,area,prodId,packageId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}
	
	@RequestMapping(value = "/echart1")
	@ResponseBody
	public Map<String,Object> echart1(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page1Service.echart1(jobject);
	}
	
	@RequestMapping(value = "/echart2")
	@ResponseBody
	public List<Map<String,Object>> echart2(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page1Service.echart2(jobject);
	}
	
	@RequestMapping(value = "/echart3")
	@ResponseBody
	public List<Map<String,Object>> echart3(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page1Service.echart3(jobject);
	}
	
	@RequestMapping(value = "/echart4")
	@ResponseBody
	public List<Map<String,Object>> echart4(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page1Service.echart4(jobject);
	}
	
	@RequestMapping(value = "/echart5")
	@ResponseBody
	public List<Map<String,Object>> echart5(String param){
		JSONObject jobject = JSON.parseObject(param);
		return this.page1Service.echart5(jobject);
	}
}
