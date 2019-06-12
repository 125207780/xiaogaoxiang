package com.bonc.compositeview.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.compositeview.service.CompositeViewService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 
 * @FileName CompositeViewAction.java
 * @Author xiaogaoxiang
 * @At 2019年3月3日 下午8:18:43
 * @Desc 综合视图Action
 */
@Controller
@RequestMapping(value = "/compositeView")
public class CompositeViewAction {
	@Resource
	private CompositeViewService compositeViewService;

	/**
	 * 查询综合视图网格信息概述和网格分类规模数据
	 * 
	 * @Title getGridInfoAndGridType
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getGridInfoAndGridType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getGridInfoAndGridType(String orgId) {
		try {
			Map<String, Object> returninfo = compositeViewService.getGridInfoAndGridType(orgId);
			return Ajax.responseString(CST.RES_SECCESS, returninfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 查询综合视图渠道基站信息和指标资源概况
	 * 
	 * @Title getChannelStationAndIndicators
	 * @Author hubinbin
	 * @return String
	 */
	@RequestMapping("/getChannelStationAndIndicators")
	@Transactional(propagation = Propagation.REQUIRED)
	public @ResponseBody String getChannelStationAndIndicators(String orgId) {
		try {
			List<Map<String, String>> result = compositeViewService.getChannelStationAndIndicators(orgId);
			return Ajax.responseString(CST.RES_SECCESS, result);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询综合视图用户规模概览和运营监控一览
	 * 
	 * @Title getScaleAndMonitoring
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getScaleAndMonitoring", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getScaleAndMonitoring(String orgId) {
		try {
			Map<String, Object> returninfo = compositeViewService.getScaleAndMonitoring(orgId);
			return Ajax.responseString(CST.RES_SECCESS, returninfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 查询综合视图考核得分和任务资源概况
	 * 
	 * @Title getIndicatorsAndTasks
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getTaskSituationAndAssessmentScore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getTaskSituationAndAssessmentScore(String orgId, String orgLevel) {
		try {
			Map<String, Object> returninfo = compositeViewService.getTaskSituationAndAssessmentScore(orgId, orgLevel);
			return Ajax.responseString(CST.RES_SECCESS, returninfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 获取排名前五和后五
	 * 
	 * @Title getTopScale
	 * @Author hubinbin
	 * @return String
	 */
	@RequestMapping(value = "/getTopScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getTopScale(String orgId, String hexagonType) {
		try {
			List<Map<String, Object>> gridInfo = this.compositeViewService.getTopScale(orgId, hexagonType);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 获取网格信息更多
	 * 
	 * @Title getGridInfoMore
	 * @Author caoxiaojuan
	 * @return String
	 */
	@RequestMapping(value = "/getGridInfoMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getGridInfoMore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> gridInfo = (Page<Map<String, Object>>) compositeViewService.getGridInfoMore(params);

		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (gridInfo == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(gridInfo);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取网格分类信息更多
	 * 
	 * @Title getGridTypeMore
	 * @Author caoxiaojuan
	 * @return String
	 */
	@RequestMapping(value = "/getGridTypeMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getGridTypeMore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> gridInfo = (Page<Map<String, Object>>) compositeViewService.getGridTypeMore(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (gridInfo == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(gridInfo);
		}
		return tableInfoJqGrid;

	}

	/**
	 * 网格信息数据查询
	 * 
	 * @Title gridInfos
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/gridInfos", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String gridInfos(String orgId) {
		try {
			if (null == orgId || "".equals(orgId)) {
				return Ajax.responseString(CST.RES_SECCESS, null);
			} else {
				Map<String, Object> gridInfo = compositeViewService.gridInfos(orgId);
				return Ajax.responseString(CST.RES_SECCESS, gridInfo);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 地市信息数据查询
	 * 
	 * @Title cityInfos
	 * @Author caoxiaojuan
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/cityInfos", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String cityInfos(String orgId,String orgLevel) {
		try {
			if (null == orgId || "".equals(orgId)) {
				return Ajax.responseString(CST.RES_SECCESS, null);
			} else {
				Map<String, Object> gridInfo = compositeViewService.cityInfos(orgId,orgLevel);
				return Ajax.responseString(CST.RES_SECCESS, gridInfo);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}
	
	/**
	 * 获取网格分类信息更多
	 * 
	 * @Title getGridTypeMore
	 * @Author caoxiaojuan
	 * @return String
	 */
	@RequestMapping(value = "/channelStationInfoMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> channelStationInfoMore(String json, int page, int rows) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> channelStationInfo = (Page<Map<String, Object>>) compositeViewService.channelStationInfoMore(params);

		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (channelStationInfo == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(channelStationInfo);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取任务详细信息
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getTaskInfoMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getTaskInfoMore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) compositeViewService.getTaskSituationDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取用户规模概况
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/customersMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> customersMore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) compositeViewService.customersMore(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取指标资源情况
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/indicatorsMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> IndicatorsMore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) compositeViewService.IndicatorsMore(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取运营监控一览more
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/monitoringMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> monitoringMore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) compositeViewService.monitoringMore(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 考核得分more
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/assessmentScoreMore", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> assessmentScoreMore(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) compositeViewService.assessmentScoreMore(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 获取地区信息（包括网格）或者渠道信息
	 * 
	 * @param orgLevel
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getAreaOrChnlInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getAreaOrChnlInfo(String orgLevel, String orgId) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			List<Map<String, Object>> list = compositeViewService.getAreaOrChnlInfo(orgLevel, orgId);
			resultMap.put("childList", list);
			if ("2".equals(orgLevel)) {
				Map<String, Object> pAreaInfoMap = compositeViewService.getAreaInfoById(orgId);
				resultMap.put("parentMap", pAreaInfoMap);
			}

			return Ajax.responseString(CST.RES_SECCESS, resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "获取级联数据失败！");
		}
	}

	/**
	 * 根据当前区县id,查询出现浮动框：网格名称、客户数、收入、渠道数、基站数、小区数、AB集团数、
	 * CD集团数、重点小区数、端口数、分纤箱数、光交箱数等信息
	 * 
	 * @Title initAreaDataByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/initAreaDataByOrgId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> initAreaDataByOrgId(String orgId) {
		List<Map<String, Object>> list = compositeViewService.initAreaDataByOrgId(orgId);
		return list;
	}
}
