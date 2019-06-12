package com.bonc.map.action;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.map.service.FirstPageThreeSchoolService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 
 * @FileName FirstPageThreeSchoolAction.java
 * @Author xiaogaoxiang
 * @At 2019年3月22日 下午3:52:26
 * @Desc 首页校园报表Action
 */
@Controller
@RequestMapping(value = "/firstpagethreeschool")
public class FirstPageThreeSchoolAction {

	@Resource
	private FirstPageThreeSchoolService firstPageThreeSchoolService;

	/**
	 * 校园营销报表-用户表(月)
	 * 
	 * @Title getSchoolUserMonth
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschoolusermonth", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolUserMonth(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolUserMonth(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园用户画像表(月)
	 * 
	 * @Title getSchoolUserPortraitMonth
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschooluserportraitmonth", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolUserPortraitMonth(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolUserPortraitMonth(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园营销报表-校园客户情况(日)
	 * 
	 * @Title getSchoolUserStatusDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschooluserstatusday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolUserStatusDay(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolUserStatusDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园营销报表-校园客户情况(月)
	 * 
	 * @Title getSchoolUserStatusMonth
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschooluserstatusmonth", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolUserStatusMonth(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolUserStatusMonth(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园营销报表-校园重点活动办理情况(日)
	 * 
	 * @Title getSchoolImportantActiveStatusDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschoolimportantactivestatusday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolImportantActiveStatusDay(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolImportantActiveStatusDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园营销报表-校园重点活动办理明细情况(日)
	 * 
	 * @Title getSchoolImportantActiveDetailStatusDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschoolimportantactivedetailstatusday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolImportantActiveDetailStatusDay(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolImportantActiveDetailStatusDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园营销报表-存量校园客户保有情况日报表(日)
	 * 
	 * @Title getSchoolStockUserTenureStatusDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschoolstockusertenurestatusday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolStockUserTenureStatusDay(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolStockUserTenureStatusDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园用户份额分布(日)
	 * 
	 * @Title getSchoolUserShareDistributionDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschoolusersharedistributionday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolUserShareDistributionDay(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolUserShareDistributionDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园用户份额分布(月)
	 * 
	 * @Title getSchoolUserShareDistributionMonth
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschoolusersharedistributionmonth", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolUserShareDistributionMonth(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolUserShareDistributionMonth(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园异网用户表(日)
	 * 
	 * @Title getOutNetUserDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getoutnetuserday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getOutNetUserDay(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getOutNetUserDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 校园信息表(月)
	 * 
	 * @Title getSchoolInfoMonth
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getschoolinfomonth", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSchoolInfoMonth(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeSchoolService.getSchoolInfoMonth(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}
}
