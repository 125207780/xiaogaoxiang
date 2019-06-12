package com.bonc.income.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.income.service.Page2Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/page2")
public class Page2Action {
	
	@Resource
	private Page2Service page2Service;	

	
	@RequestMapping(value = "/selectTable")
	@ResponseBody
	public PageJqGrid<Map<String,Object>> selectTable(Integer statisMonth,Integer areaId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String,Object>> pageList = (Page<Map<String, Object>>) page2Service.selectTable(statisMonth,areaId);
		PageJqGrid<Map<String,Object>> pageJqGrid = new PageJqGrid<Map<String,Object>>(pageList);
		return pageJqGrid;
	}
	//当月新增订购成本与收入
	@RequestMapping(value = "/getCharts1")
	@ResponseBody
	public List<Map<String,Object>> getCharts1(Integer statisMonth,Integer areaId,String prodId,String packageId){
		return  page2Service.getCharts1(statisMonth,areaId,prodId,packageId);
	}
	
	
	//当月新增订购成本与收入
	@RequestMapping(value = "/getCharts2")
	@ResponseBody
	public List<Map<String,Object>> getCharts2(Integer statisMonth,Integer areaId,String prodId,String packageId){
		return  page2Service.getCharts2(statisMonth,areaId,prodId,packageId);
	}
		
	//当月成本构成
	@RequestMapping(value = "/getCharts3")
	@ResponseBody
	public List<Map<String,Object>> getCharts3(Integer statisMonth,Integer areaId,String prodId,String packageId){
		return  page2Service.getCharts3(statisMonth,areaId,prodId,packageId);
	} 
		
	//当月收入构成
	@RequestMapping(value = "/getCharts4")
	@ResponseBody
	public List<Map<String,Object>> getCharts4(Integer statisMonth,Integer areaId,String prodId,String packageId){
		return  page2Service.getCharts4(statisMonth,areaId,prodId,packageId);
	}
	
}
