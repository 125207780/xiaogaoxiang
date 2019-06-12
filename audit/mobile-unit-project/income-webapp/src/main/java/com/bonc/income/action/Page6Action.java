package com.bonc.income.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.income.service.Page6Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/page6")
public class Page6Action {
	@Resource
	private Page6Service Page6Service;

	@RequestMapping(value = "/selectDay")
	@ResponseBody
	public List<Map<String, Object>> selectDay(Integer feeDate, Integer areaId) {

		return Page6Service.selectDay(feeDate, areaId);
	}

	@RequestMapping(value = "/selectMonth")
	@ResponseBody
	public List<Map<String, Object>> selectMonth(Integer feeDate, Integer areaId, Integer statisMonth, String feeType) {
		return Page6Service.selectMonth(feeDate, areaId, statisMonth, feeType);
	}

	@RequestMapping(value = "/getFreeType")
	@ResponseBody
	public List<Map<String, Object>> getFreeType() {
		return Page6Service.getFreeType();
	}

	@RequestMapping(value = "/selectDayTable")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectDayTable(Integer feeDate, Integer areaId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> pageList = (Page<Map<String, Object>>) Page6Service.selectDay(feeDate, areaId);

		PageJqGrid<Map<String, Object>> pageJqGrid = new PageJqGrid<Map<String, Object>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/selectMonthTable")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectMonthTable(Integer feeDate, Integer areaId, Integer statisMonth, String feeType, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> pageList = (Page<Map<String, Object>>) Page6Service.selectMonth(feeDate, areaId, statisMonth, feeType);
		PageJqGrid<Map<String, Object>> pageJqGrid = new PageJqGrid<Map<String, Object>>(pageList);
		return pageJqGrid;
	}
}
