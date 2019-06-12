package com.bonc.map.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.map.service.GridCommonService;
import com.bonc.netResources.dao.entity.NetResources;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 
 * @FileName FirstPageThreeAction.java
 * @Author xiaogaoxiang
 * @At 2019年3月18日 上午10:09:04
 * @Desc 首页信息Action
 */
@Controller
@RequestMapping(value = "/firstpagethree")
public class FirstPageThreeAction {

	@Resource
	private FirstPageThreeService firstPageThreeService;
	@Resource
	private GridCommonService gridCommonService;

	/**
	 * 初始化左侧查询树
	 * 
	 * @Title getLeftTree
	 * @Author xiaogaoxiang
	 * @return JSONArray
	 */
	@RequestMapping(value = "/getlefttree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public JSONArray getLeftTree(HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		JSONArray treeList = new JSONArray();
		List<NetResources> list = firstPageThreeService.selectNetResourceList(user);
		if (list != null && !list.isEmpty()) {
			JSONObject o = null;
			for (NetResources t : list) {
				o = new JSONObject();
				o.put("id", t.getNetCode());
				o.put("pId", t.getPid());
				o.put("name", t.getNetName());
				o.put("netType", t.getNetType());
				o.put("orglevel", t.getNetLevel());
				o.put("type", t.getType());
				treeList.add(o);
			}
		}
		return treeList;
	}

	/**
	 * 根据GRID_INFO_HOME_PAGE_MAIN查询最大账期
	 * 
	 * @Title initMaxStatisDate
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/initmaxstatisdate", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initMaxStatisDate(String orgId,String orgLevel) {
		try {
			Map<String, Object> gridInfo = firstPageThreeService.initMaxStatisDate(orgId,orgLevel);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 初始化指标信息
	 * 
	 * @Title initMultipleSelectInfo
	 * @Author xiaogaoxiang
	 * @return String
	 */
	@RequestMapping(value = "/initmultipleselectinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initMultipleSelectInfo() {
		try {
			List<Map<String, Object>> gridInfo = firstPageThreeService.initMultipleSelectInfo();
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 初始化指标信息
	 * 
	 * @Title initZBinfo
	 * @Author caoxiaojuan
	 * @return String
	 */
	@RequestMapping(value = "/initZBinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initZBinfo(String orgId, String orgLevel,String statisDate) {
		try {
			
			List<Map<String, Object>> gridInfo = firstPageThreeService.initZBinfo(orgId,orgLevel,statisDate);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}
	
	/**
	 * 查询各项指标信息
	 * 
	 * @Title getTopScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param type
	 * @return String
	 */
	@RequestMapping(value = "/getzbechart", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getZbEchart(String orgId, String orgLevel, String type, String statisDate) {
		try {
			if (orgLevel.equals("2")) {
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(orgId);
				orgId = orgIdMap.get("OLD_ORG_ID").toString();
			}
			List<Map<String, Object>> gridInfo = firstPageThreeService.getZbEchart(orgId, orgLevel, type, statisDate);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询各项指标信息
	 * 
	 * @Title getzbechartInfo
	 * @Author caoxiaojuan
	 * @param orgId
	 * @param type
	 * @return String
	 */
	@RequestMapping(value = "/getzbechartInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getzbechartInfo(String orgId, String orgLevel, String type, String statisDate,String flag) {
		try {
//			if (orgLevel.equals("2")) {
//				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(orgId);
//				orgId = orgIdMap.get("OLD_ORG_ID").toString();
//			}
			List<Map<String, Object>> gridInfo = firstPageThreeService.getzbechartInfo(orgId, orgLevel, type, statisDate,flag);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	
	/**
	 * 获取5个指标的汇总信息
	 * 
	 * @Title getZbEchartSum
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param type
	 * @return String
	 */
	@RequestMapping(value = "/getzbechartsum", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getZbEchartSum(String orgId, String orgLevel, String type, String statisDate) {
		try {
			if (orgLevel.equals("2")) {
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(orgId);
				orgId = orgIdMap.get("OLD_ORG_ID").toString();
			}
			List<Map<String, Object>> zbSumList = firstPageThreeService.getZbEchartSum(orgId, orgLevel, type, statisDate);
			return Ajax.responseString(CST.RES_SECCESS, zbSumList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据父节点查询子节点信息
	 * 
	 * @Title getchildrensysorgbyorgid
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getchildrensysorgbyorgid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChildrenSysOrgByOrgId(String orgId, String orgLevel, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			List<SysOrg> childrenSysOrg = firstPageThreeService.getChildrenSysOrgByOrgId(orgId, orgLevel, user);
			return Ajax.responseString(CST.RES_SECCESS, childrenSysOrg);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据一级菜单，查询二级分类
	 * 
	 * @Title getchildrennetrresourcebyorgId
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return String
	 */
	@RequestMapping(value = "/getchildrennetrresourcebyorgId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChildrenNetRresourceByOrgId(String netCode) {
		try {
			List<NetResources> twoList = firstPageThreeService.getChildrenNetRresourceByOrgId(netCode);
			return Ajax.responseString(CST.RES_SECCESS, twoList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询基础信息头部信息
	 * 
	 * @Title getJcxxHeader
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @return String
	 */
	@RequestMapping(value = "/getjcxxheader", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getJcxxHeader(String orgId, String orgLevel) {
		try {
			Map<String, Object> twoList = firstPageThreeService.getJcxxHeader(orgId, orgLevel);
			return Ajax.responseString(CST.RES_SECCESS, twoList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询基础信息详情列表信息
	 * 
	 * @Title getjcxxinfodetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getjcxxinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getJcxxInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (StringUtils.isNotBlank(params.get("city").toString())) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("city").toString());
			params.remove("city");
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = null;
		if (params.get("twoType").equals("网格基础信息") && params.get("oneType").equals("WGXX")) {
			tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getJcxxInfoWGJCXXDetail(params);
		} else {
			tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getJcxxInfoDetail(params);
		}
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 网格基础信息报表
	 * 
	 * @Title getWgjcxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getwgjcxxinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getWgjcxxInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getWgjcxxInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 重点业务头部两个汇总，一个echart图
	 * 
	 * @Title getZdywHeader
	 * @Author xiaogaoxiang
	 * @param cityCode
	 * @param cntyCode
	 * @param gridCode
	 * @param oneType
	 * @param twoType
	 * @param conditionTwo
	 * @param statisDate
	 * @return String
	 */
	@RequestMapping(value = "/getzdywheader", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getZdywHeader(String city, String town, String grid, String oneType, String twoType, String conditionTwo, String statisDate,
			HttpSession session) {
		try {
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			if (null != twoType && !"".equals(twoType) && null != conditionTwo && !"".equals(conditionTwo) && null != statisDate && !"".equals(statisDate)) {
				Map<String, Object> twoList = firstPageThreeService.getZdywHeader(city, town, grid, oneType, twoType, conditionTwo, statisDate, user);
				return Ajax.responseString(CST.RES_SECCESS, twoList);
			} else {
				return Ajax.responseString(CST.RES_SECCESS, null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询echart图
	 * 
	 * @Title getEchartInfo
	 * @Author xiaogaoxiang
	 * @param city
	 * @param town
	 * @param grid
	 * @param oneType
	 * @param twoType
	 * @param conditionTwo
	 * @param statisDate
	 * @param session
	 * @return List<Map<String,Object>>
	 */
	@RequestMapping(value = "/getechartinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> getEchartInfo(String city, String town, String grid, String oneType, String twoType, String conditionTwo,
			String statisDate, HttpSession session) {
		try {
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			if (null != twoType && !"".equals(twoType) && null != conditionTwo && !"".equals(conditionTwo) && null != statisDate && !"".equals(statisDate)) {
				List<Map<String, Object>> tableInfoList = firstPageThreeService.getEchartInfo(city, town, grid, oneType, twoType, conditionTwo, statisDate,
						user);
				return tableInfoList;
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 客户信息（日）
	 * 
	 * @Title getKhxxmInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getkhxxdinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getKhxxdInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getKhxxdInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 客户信息（月）
	 * 
	 * @Title getKhxxmInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getkhxxminfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getKhxxmInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getKhxxmInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 收入信息报表
	 * 
	 * @Title getSrxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getsrxxinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getSrxxInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getSrxxInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 资源信息列表
	 * 
	 * @Title getZyxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getzyxxinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getZyxxInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		if (StringUtils.isNotEmpty(params.get("city").toString())) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("city").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getZyxxInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 重点小区报表
	 * 
	 * @Title getZdxqInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getzdxqinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getZdxqInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		if (StringUtils.isNotEmpty(params.get("city").toString())) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("city").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getZdxqInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 集团单位报表AB
	 * 
	 * @Title getJtdwInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getjtdwinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getJtdwInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getJtdwInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 集团单位报表CD
	 * 
	 * @Title getJtdwInfoDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/selectZYGLCDGroupInfoByGridCodes", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectZYGLCDGroupInfoByGridCodes(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.selectZYGLCDGroupInfoByGridCodes(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 
	 * 营销任务报表
	 * 
	 * @param json
	 * @param rows
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getyxrwinfodetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getYxrwInfoDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getYxrwInfoDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 网格业务办理（日）报表
	 * 
	 * @Title gridBusinessTargetDoneD
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/gridbusinesstargetdoned", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> gridBusinessTargetDoneD(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.gridBusinessTargetDoneD(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 网格业务办理（日）报表
	 * 
	 * @Title gridBusinessTargetDoneDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/gridbusinesstargetdoneday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> gridBusinessTargetDoneDay(String json,HttpSession session, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.gridBusinessTargetDoneDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 网格业务办理（周）报表
	 * 
	 * @Title gridBusinessTargetDoneW
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/gridbusinesstargetdonew", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> gridBusinessTargetDoneW(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.gridBusinessTargetDoneW(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 网格业务办理（周）报表
	 * 
	 * @Title gridBusinessTargetDoneWeek
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/gridbusinesstargetdoneweek", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> gridBusinessTargetDoneWeek(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.gridBusinessTargetDoneWeek(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 网格业务办理（月）报表
	 * 
	 * @Title gridBusinessTargetDoneM
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/gridbusinesstargetdonem", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> gridBusinessTargetDoneM(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.gridBusinessTargetDoneM(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 网格业务办理（月）报表
	 * 
	 * @Title gridBusinessTargetDoneMonth
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/gridbusinesstargetdonemonth", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> gridBusinessTargetDoneMonth(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.gridBusinessTargetDoneMonth(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 酬金月报报表
	 * 
	 * @Title getCjybDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getcjybdetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getCjybDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").toString().equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getCjybDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 装维信息报表
	 * 
	 * @Title getZwxxDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getzwxxdetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getZwxxDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		if (StringUtils.isNotBlank(params.get("city").toString())) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("city").toString());
			params.remove("city");
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getZwxxDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 任务月报
	 * 
	 * @Title getRwybDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getrwybdetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getRwybDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("city");
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getRwybDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 投诉报表
	 * 
	 * @Title getTsxxDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/gettsxxdetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getTsxxDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (StringUtils.isNotBlank(params.get("city").toString())) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("city").toString());
			params.remove("city");
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getTsxxDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 行销任务报表
	 * 
	 * @Title getXxrwDetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getxxrwdetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getXxrwDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("city");
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getXxrwDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 日月累计报表
	 * 
	 * @Title getryljbbdetail
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getryljbbdetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getRyljbbDetail(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.getRyljbbDetail(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 客户发展日报表
	 * 
	 * @Title customerDevelopDay
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/customerdevelopday", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> customerDevelopDay(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.customerDevelopDay(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 客户发展周报表
	 * 
	 * @Title customerDevelopWeek
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/customerdevelopweek", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> customerDevelopWeek(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.customerDevelopWeek(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 客户发展月报表
	 * 
	 * @Title customerDevelopMonth
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/customerdevelopmonth", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> customerDevelopMonth(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.customerDevelopMonth(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 根据对标类型，查询最大日期
	 * 
	 * @Title getMaxBenchmarkingsnAlysisStatisDate
	 * @Author xiaogaoxiang
	 * @param type
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/getmaxbenchmarkingsnalysisstatisdate", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getMaxBenchmarkingsnAlysisStatisDate(String type, HttpSession session) {
		try {
			Map<String, Object> maxBenchmarkingsnAlysisStatisDate = firstPageThreeService.getMaxBenchmarkingsnAlysisStatisDate(type);
			return Ajax.responseString(CST.RES_SECCESS, maxBenchmarkingsnAlysisStatisDate);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据当前登录人获取到地市信息下拉框
	 * 
	 * @Title getCityInfo
	 * @Author xiaogaoxiang
	 * @return String
	 */
	@RequestMapping(value = "/getcityinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getCityInfo(HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			List<SysOrg> gridInfo = firstPageThreeService.getCityInfo(user);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据当前登录人获取到地市，区县下拉框
	 * 
	 * @Title getTownInfo
	 * @Author xiaogaoxiang
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/gettowninfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getTownInfo(HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			List<SysOrg> gridInfo = firstPageThreeService.getTownInfo(user);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据当前登录人获取到地市，区县，网格下拉框
	 * 
	 * @Title getGridInfo
	 * @Author xiaogaoxiang
	 * @param gridType
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/getgridinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridInfo(String gridType, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			List<SysOrg> gridInfo = firstPageThreeService.getGridInfo(gridType, user);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据地市选择，获取地市下所有区县信息
	 * 
	 * @Title getChildrenInfoByIds
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getchildreninfobyids", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChildrenInfoByIds(String orgId, String gridType) {
		try {
			List<SysOrg> gridInfo = firstPageThreeService.getChildrenInfoByIds(orgId, gridType);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询对标分析内容
	 * 
	 * @Title getBenchmarkingAnalysis
	 * @Author xiaogaoxiang
	 * @param type
	 * @param orgId
	 * @param statisDate
	 * @return String
	 */
	@RequestMapping(value = "/getbenchmarkinganalysis", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBenchmarkingAnalysis(String type, String orgId, String statisDate) {
		try {
			if (null != orgId && !"".equals(orgId)) {
				List<Map<String, Object>> gridInfo = firstPageThreeService.getBenchmarkingAnalysis(type, orgId, statisDate);
				return Ajax.responseString(CST.RES_SECCESS, gridInfo);
			} else {
				return Ajax.responseString(CST.RES_SECCESS, null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据选择的排序类型将指标分析进行排序
	 * 
	 * @Title getBenchmarkingAnalysisOrder
	 * @Author xiaogaoxiang
	 * @param type
	 * @param statisDate
	 * @param orderType
	 * @return String
	 */
	@RequestMapping(value = "/getbenchmarkinganalysisorder", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBenchmarkingAnalysisOrder(String type, String statisDate, String orderType) {
		try {
			if (null != orderType && !"".equals(orderType)) {
				List<Map<String, Object>> gridInfo = firstPageThreeService.getBenchmarkingAnalysisOrder(type, statisDate, orderType);
				return Ajax.responseString(CST.RES_SECCESS, gridInfo);
			} else {
				return Ajax.responseString(CST.RES_SECCESS, null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据对应的条件，查询自助报表的表结构，查询出要展示的字段，要显示的条件信息
	 * 
	 * @Title getSelfHelpReportInfo
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return String
	 */
	@RequestMapping(value = "/getselfhelpreportinfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getSelfHelpReportInfo(String netCode) {
		try {
			List<Map<String, Object>> selfHelpReportMap = firstPageThreeService.getSelfHelpReportInfo(netCode);
			return Ajax.responseString(CST.RES_SECCESS, selfHelpReportMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 自主分析报表如果有账期，则查询该表的最大账期
	 * 
	 * @Title getSelfHelpReportStatisDate
	 * @Author xiaogaoxiang
	 * @param tableName
	 * @return String
	 */
	@RequestMapping(value = "/getselfhelpreportstatisdate", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getSelfHelpReportStatisDate(String tableName) {
		try {
			Map<String, Object> selfHelpReportMap = firstPageThreeService.getSelfHelpReportStatisDate(tableName);
			return Ajax.responseString(CST.RES_SECCESS, selfHelpReportMap);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 自助分析报表查询列表
	 * 
	 * @Title selectSelfHelpReportInfoList
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/selectselfhelpreportinfolist", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectSelfHelpReportInfoList(String json, String param, int rows, int page) {
		List<Map<String, Object>> mapList = new ArrayList<>();
		Map<String, Object> params = new HashMap<>();
		Map<String, Object> paramMap = new HashMap<>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
			mapList.add(params);
		}
		if (null != param && !"".equals(param)) {
			paramMap = (Map<String, Object>) JSONObject.parseObject(param);
			mapList.add(paramMap);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
			mapList.add(params);
		}
		String jsonStr = JSONObject.toJSONString(mapList);
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) firstPageThreeService.selectSelfHelpReportInfoList(jsonStr);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}
}
