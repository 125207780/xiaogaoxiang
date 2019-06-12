package com.bonc.report.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.report.service.RptCompositeService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 
 * @FileName RptCompositeAction.java
 * @Author xiaogaoxiang
 * @At 2019年3月8日 下午4:35:54
 * @Desc 报表专区Action
 */
@Controller
@RequestMapping(value = "/rptcomposite")
public class RptCompositeAction {

	@Resource
	private RptCompositeService rptCompositeService;

	@Resource
	private FirstPageThreeService firstPageThreeService;
	/**
	 * 查询放号报表
	 * 
	 * @Title getTaskInfoMore
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/formteleno", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> selectformTeleNo(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.selectformTeleNo(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 查询新增宽带报表
	 * 
	 * @Title selectformBroadBandAdd
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/formbroadbandadd", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> selectformBroadBandAdd(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.selectformBroadBandAdd(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/***
	 * 个人/新增客户总计费收入
	 * 
	 * @param page
	 * @param rows
	 * @param taskBase
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getFormCustomerFeeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getFormCustomerFeeInfo(int page, int rows, String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getFormCustomerFeeInfo(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;

	}

	/**
	 * 个人/新增客户总计费收入汇总
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/totalFormCustomerFeeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String totalFormCustomerFeeInfo(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		try {
			Map<String, Object> returninfo = rptCompositeService.totalFormCustomerFeeInfo(params);
			return Ajax.responseString(CST.RES_SECCESS, returninfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取头部客户固移融合率信息
	 * 
	 * @Title selectFormCustomerFusion
	 * @Author
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/formcustomerfusion", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectFormCustomerFusion(String json, Integer page, Integer rows) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.selectFormCustomerFusion(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取头部客户整体情况
	 * 
	 * @Title selectFormCustomerFusion
	 * @Author
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/formcustomeroverall", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectFormCustomerOverall(String json, Integer page, Integer rows) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
			// 日改成月
			if (StringUtils.isNotBlank((CharSequence) params.get("statisDate"))) {
				String statisDate = params.get("statisDate").toString().substring(0, 6);
				params.put("statisDate", statisDate);
			}
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.selectFormCustomerOverall(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取头部客户整理情况
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getSumFormCustomerOverall", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> getSumFormCustomerOverall(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
			// 日改成月
			if (StringUtils.isNotBlank((CharSequence) params.get("statisDate"))) {
				String statisDate = params.get("statisDate").toString().substring(0, 6);
				params.put("statisDate", statisDate);
			}
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		Map<String, Object> resultMap = rptCompositeService.getSumFormCustomerOverall(params);
		return resultMap;
	}

	/**
	 * 获取校园客户
	 * 
	 * @Title selectFormCustomerFusion
	 * @Author
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/formSchoolCustomer", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectFormSchoolCustomer(String json, Integer page, Integer rows) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
			// 日改成月
			if (StringUtils.isNotBlank((CharSequence) params.get("statisDate"))) {
				String statisDate = params.get("statisDate").toString().substring(0, 6);
				params.put("statisDate", statisDate);
			}
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.selectFormSchoolCustomer(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取校园客户目标值
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getSumFormSchoolCustomer", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> getSumFormSchoolCustomer(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
			// 日改成月
			if (StringUtils.isNotBlank((CharSequence) params.get("statisDate"))) {
				String statisDate = params.get("statisDate").toString().substring(0, 6);
				params.put("statisDate", statisDate);
			}
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		Map<String, Object> resultMap = rptCompositeService.getSumFormSchoolCustomer(params);
		return resultMap;
	}

	/**
	 * 获取小微市场
	 * 
	 * @Title selectFormCustomerFusion
	 * @Author
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/formSmallMarket", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectFormSmallMarket(String json, Integer page, Integer rows) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.selectFormSmallMarket(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取小微市场
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getSumFormSmallMarket", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> getSumFormSmallMarket(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		Map<String, Object> resultMap = rptCompositeService.getSumFormSmallMarket(params);
		return resultMap;
	}

	/**
	 * 获取中小微企业圈地行动信息
	 * 
	 * @Title selectFormCustomerFusion
	 * @Author
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/formenclosuresum", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectFormEnclosureSum(String json, Integer page, Integer rows) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.selectFormEnclosureSum(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取不同地区的高价值低占小区渗透提升数据
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getInfiltrationCellGroupByArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getInfiltrationCellGroupByArea(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getInfiltrationCellGroupByArea(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<Map<String, Object>>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取不同地区的高价值低占小区渗透提升数据版本1
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getInfiltrationCellGroupByArea1", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getInfiltrationCellGroupByArea1(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getInfiltrationCellGroupByArea1(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<Map<String, Object>>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 90后客户规模提升
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getFormCusaddAfterNinety", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getFormCusaddAfterNinety(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getFormCusaddAfterNinety(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<Map<String, Object>>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取不同地区的新增价值洼地数据
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getDepressionAddGroupByArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getDepressionAddGroupByArea(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getDepressionAddGroupByArea(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<Map<String, Object>>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 汇总信息
	 * 
	 * @Title totalinfo
	 * @Author xiaogaoxiang
	 * @param json
	 * @return String
	 */
	@RequestMapping(value = "/totalinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String totalinfo(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		try {
			Map<String, Object> returninfo = rptCompositeService.totalinfo(params);
			return Ajax.responseString(CST.RES_SECCESS, returninfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取高价值低占小区渗透提升汇总数据
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getInfiltrationCellSummary", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getInfiltrationCellSummary(String json) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			if (json != null && !"".equals(json)) {
				params = (Map<String, Object>) JSONObject.parseObject(json);
			}
			// 当选择的是地市
			if (params.get("orgLevel").equals("2")) {
				// 将地市编码5位转为3位
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
				params.remove("orgId");
				params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
			}
			Map<String, Object> resultMap = rptCompositeService.getInfiltrationCellSummary(params);
			return Ajax.responseString(CST.RES_SECCESS, resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取90后客户宽带新增
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getFormCusaddAfterNinetySummary", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getFormCusaddAfterNinetySummary(String json) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			if (json != null && !"".equals(json)) {
				params = (Map<String, Object>) JSONObject.parseObject(json);
			}
			// 当选择的是地市
			if (params.get("orgLevel").equals("2")) {
				// 将地市编码5位转为3位
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
				params.remove("orgId");
				params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
			}
			Map<String, Object> resultMap = rptCompositeService.getFormCusaddAfterNinetySummary(params);
			return Ajax.responseString(CST.RES_SECCESS, resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取高价值低占小区渗透提升汇总数据*版本1
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getInfiltrationCellSummary1", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getInfiltrationCellSummary1(String json) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			if (json != null && !"".equals(json)) {
				params = (Map<String, Object>) JSONObject.parseObject(json);
			}
			// 当选择的是地市
			if (params.get("orgLevel").equals("2")) {
				// 将地市编码5位转为3位
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
				params.remove("orgId");
				params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
			}
			Map<String, Object> resultMap = rptCompositeService.getInfiltrationCellSummary1(params);
			return Ajax.responseString(CST.RES_SECCESS, resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取新增价值洼地汇总数据
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getDepressionAddSummary", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getDepressionAddSummary(String json) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			if (json != null && !"".equals(json)) {
				params = (Map<String, Object>) JSONObject.parseObject(json);
			}
			// 当选择的是地市
			if (params.get("orgLevel").equals("2")) {
				// 将地市编码5位转为3位
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
				params.remove("orgId");
				params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
			}
			Map<String, Object> resultMap = rptCompositeService.getDepressionAddSummary(params);
			return Ajax.responseString(CST.RES_SECCESS, resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取终端合约
	 * 
	 * @Title getformbroadbandadd
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getformterminalcontract", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getTaskSituationAndAssessmentScore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getformterminalcontract(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<Map<String, Object>>(tableInfoList);
		}
		return tableInfoJqGrid;

	}

	/**
	 * 获取家庭信息网
	 * 
	 * @Title getformhomenetadd
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getformhomenetadd", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getformhomenetadd(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getformhomenetadd(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<Map<String, Object>>(tableInfoList);
		}
		return tableInfoJqGrid;

	}

	/**
	 * 头部客户宽带新增
	 * 
	 * @Title getHeadCustomerAddInfo
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getheadcustomeraddinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getHeadCustomerAddInfo(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) rptCompositeService.getHeadCustomerAddInfo(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<Map<String, Object>>(tableInfoList);
		}
		return tableInfoJqGrid;

	}

	/**
	 * 头部客户宽带新增
	 * 
	 * @Title getHeadCustomerAddInfo
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getheadcustomeraddinfoSummary", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody Map<String, Object> getheadcustomeraddinfoSummary(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		Map<String, Object> resultMap = (Map<String, Object>) rptCompositeService.getheadcustomeraddinfoSummary(params);
		return resultMap;

	}

	/**
	 * 获取汇总家庭新增网一，二
	 * 
	 * @Title getformhomenetadd
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getformhomenetaddsum", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getformhomenetaddsum(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		try {
			Map<String, Object> returninfo = rptCompositeService.getformhomenetaddsum(params);
			return Ajax.responseString(CST.RES_SECCESS, returninfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取终端合约一，二
	 * 
	 * @Title getformhomenetaddsum
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getformterminalcontractsum", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody List<Map<String, Object>> getformterminalcontractsum(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		List<Map<String, Object>> returninfo = rptCompositeService.getformterminalcontractsum(params);
		return returninfo;

	}

	/**
	 * 获取头部客户固移融合率汇总数据
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getSumFormCustomerFusion", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> getSumFormCustomerFusion(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		Map<String, Object> resultMap = rptCompositeService.getSumFormCustomerFusion(params);
		return resultMap;
	}

	/**
	 * 获取中小微企业圈地行动汇总数据
	 * 
	 * @param json
	 * @return
	 */
	@RequestMapping(value = "/getSumFormEnclosureSum", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> getSumFormEnclosureSum(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		Map<String, Object> resultMap = rptCompositeService.getSumFormEnclosureSum(params);
		return resultMap;
	}

	/**
	 * 根据orgId查询网格轮廓
	 * 
	 * @Title getGridInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<MapInfo>
	 */
	@RequestMapping(value = "/getGridInfoByOrgId")
	@ResponseBody
	public List<MapInfo> getGridInfoByOrgId(String orgId) {
		List<MapInfo> list = rptCompositeService.getGridInfoByOrgId(orgId);
		return list;
	}

	/**
	 * 根据登录人的信息，改变orgId
	 * 
	 * @Title changeOrgSysInfo
	 * @Author xiaogaoxiang
	 * @param json
	 * @return String
	 */
	@RequestMapping(value = "/changeOrgSysInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String changeOrgSysInfo(String orgId) {
		try {
			Map<String, Object> resultMap = rptCompositeService.changeOrgSysInfo(orgId);
			return Ajax.responseString(CST.RES_SECCESS, resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询放号报表不分页
	 * 
	 * @Title formtelenoall
	 * @Author caoxiaojuan
	 * @param json
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/allList", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody List<Map<String, Object>> formtelenoall(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		List<Map<String, Object>> tableInfoList = rptCompositeService.allList(params);
		return tableInfoList;
	}

	/**
	 * 获取地区信息（包括网格）或者渠道信息
	 * 
	 * @Title getAreaOrChnlInfo
	 * @Author xiaogaoxiang
	 * @param orgLevel
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getAreaOrChnlInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getAreaOrChnlInfo(String orgLevel, String orgId) {
		try {
			List<Map<String, Object>> sysOrgList = null;
			if ("4".equals(orgLevel)) {
				sysOrgList = rptCompositeService.getSignalAreaOrChnlInfo(orgId);
			} else {
				sysOrgList = rptCompositeService.getAreaOrChnlInfo(orgId);
			}
			return Ajax.responseString(CST.RES_SECCESS, sysOrgList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "获取级联数据失败！");
		}
	}

	/**
	 * 查询SysOrg子节点信息
	 * 
	 * @Title getChildrenSysOrgInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param type
	 * @param areaId
	 * @param orgLevel
	 * @return String
	 */
	@RequestMapping(value = "/getChildrenSysOrgInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getChildrenSysOrgInfo(String orgId, String type, String areaId, String orgLevel) {
		try {
			List<Map<String, Object>> sysOrgList = rptCompositeService.getChildrenSysOrgInfo(orgId, type, areaId, orgLevel);
			return Ajax.responseString(CST.RES_SECCESS, sysOrgList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "获取级联数据失败！");
		}
	}

	/**
	 * 获取报表最大STATIS_DATE
	 * 
	 * @Title getMaxDate
	 * @Author xiaogaoxiang
	 * @param conditionOne
	 * @return String
	 */
	@RequestMapping(value = "/getMaxDate", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getMaxDate(String conditionOne) {
		try {
			Map<String, Object> resultMap = rptCompositeService.getMaxDate(conditionOne);
			return Ajax.responseString(CST.RES_SECCESS, resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 报表导出
	 * 
	 * @Title exportRptInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportRptInfo", method = RequestMethod.POST)
	public void exportRptInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String orgId = request.getParameter("orgId");
		String orgLevel = request.getParameter("orgLevel");
		if(orgLevel.equals("2")){
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(orgId);
			orgId=orgIdMap.get("OLD_ORG_ID").toString();
		} 
		String statisDate = request.getParameter("statisDate");
		String conditionOne = request.getParameter("conditionOne");
		String conditionTwo = request.getParameter("conditionTwo");
		String gcFalg = request.getParameter("gcFalg");
		String exportName = null;
		if ("FH".equals(conditionOne)) {
			exportName = "放号";
		} else if ("XZKD".equals(conditionOne)) {
			exportName = "新增宽带";
		} else if ("ZDHY".equals(conditionOne)) {
			exportName = "终端合约";
		} else if ("JTWXZ".equals(conditionOne)) {
			exportName = "家庭网新增";
		} else if ("GJZDZXQSTTS".equals(conditionOne)) {
			exportName = "高价值低占小区渗透提升";
		} else if ("GJDZXQKDXZ".equals(conditionOne)) {
			exportName = "高价低占小区宽带新增";
		} else if ("90HKHGMTS".equals(conditionOne)) {
			exportName = "90后客户规模提升";
		} else if ("XZJZWD".equals(conditionOne)) {
			exportName = "新增价值洼地";
		} else if ("TBKHGYRHL".equals(conditionOne)) {
			exportName = "头部客户固移融合率";
		} else if ("ZXWQYQDXD".equals(conditionOne)) {
			exportName = "商客拓展";
		} else if ("GRKHZJFSR".equals(conditionOne)) {
			exportName = "个人客户总计费收入";
		} else if ("XZKHZJFSR".equals(conditionOne)) {
			exportName = "新增客户总计费收入";
		} else if ("TBKHZTQK".equals(conditionOne)) {
			exportName = "头部客户整体情况";
		} else if ("XWSC".equals(conditionOne)) {
			exportName = "小微市场";
		} else if ("XYKH".equals(conditionOne)) {
			exportName = "校园客户";
		} else if ("CD-YRG-1".equals(conditionOne)) {
			exportName = "集团CD类已入格";
		} else if ("CD-WRG-2".equals(conditionOne)) {
			exportName = "集团CD类未入格";
		} else if ("AB-YRG-1".equals(conditionOne)) {
			exportName = "集团AB类已入格";
		} else if ("AB-WRG-2".equals(conditionOne)) {
			exportName = "集团AB类未入格";
		} else if ("TBKHKDXZ".equals(conditionOne)) {
			exportName = "头部客户宽带新增";
		}
		try {
			response.reset();
			exportName = exportName + "信息导出";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 根据传入的网格编码和要导出的基础单元，分sheet单元导出
			rptCompositeService.exportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, gcFalg, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
