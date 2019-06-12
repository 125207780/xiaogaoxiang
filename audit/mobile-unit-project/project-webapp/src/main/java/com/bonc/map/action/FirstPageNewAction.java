package com.bonc.map.action;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.map.service.FirstPageNewService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/firstPageNew")
public class FirstPageNewAction {
	@Resource
	private FirstPageNewService firstPageNewService;

	@Resource
	private KpiManagerService kpiManagerService;

	@Resource
	private SysOrgService sysOrgService;

	/**
	 * 根据orgid查询首页网格数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getGridInfoOverView", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String, Object> getGridInfoOverView(String orgId, HttpSession session) {
		if (orgId == null || orgId.trim() == "") {
			SysUser vo = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			orgId = vo.getOrgId();
		}
		Map<String, Object> infoMap = this.firstPageNewService.getGridInfoOverView(orgId);
		return infoMap;
	}

	/**
	 * 点击左侧网格数据时获取前五名和后无名的数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param scaleType
	 * @param smallScaleType
	 * @return
	 */
	@RequestMapping(value = "/getTopScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getTopScale(String orgId, String scaleType, String smallScaleType) {
		try {
			List<Map<String, Object>> gridInfo = this.firstPageNewService.getTopScale(orgId, scaleType, smallScaleType);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 获取点击详情弹出框的地市区县营业部网格选项
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @return
	 */
	public @ResponseBody String initOrg(String orgId) {
		try {
			SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
			Map<String, List<OrgSearch>> initSeletOrg = kpiManagerService.initSeletOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, sysOrg.getOrgLevel(), initSeletOrg);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 详情弹出框的地市区县等选择后获取子选项营业部网格选项
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getChildren", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getChildren(String orgId) {
		try {
			Map<String, List<OrgSearch>> initSeletOrg = kpiManagerService.getChildrenOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, initSeletOrg);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 点击左侧网格数据时根据类型查询网格/渠道/基站的数据
	 * 
	 * @author liupeidong
	 * @param page
	 * @param rows
	 * @param orgId
	 * @param scaleType
	 * @param smallScaleType
	 * @return
	 */
	@RequestMapping(value = "/getTableDataByScaleType", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getTableDataByScaleType(int page, int rows, String orgId, String scaleType, String smallScaleType) {
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) this.firstPageNewService.getTableDataByScaleType(page, rows, orgId, scaleType,
				smallScaleType, sysOrg);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	/**
	 * 根据orgid查询首页任务资源概况
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getTaskInfoOverView", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String, Object> getTaskInfoOverView(String orgId, HttpSession session) {
		if (orgId == null || orgId.trim() == "") {
			SysUser vo = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			orgId = vo.getOrgId();
		}
		Map<String, Object> infoMap = this.firstPageNewService.getTaskInfoOverView(orgId);
		return infoMap;
	}

	/**
	 * 获取考核得分echart数据
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getAssessmentEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getAssessmentEcharts(String orgId) {
		try {
			List<Map<String, Object>> getAssessmentEcharts = this.firstPageNewService.getAssessmentEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getAssessmentEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取汇总信息一类选择数据
	 * 
	 * @author liupeidong
	 * @param gridCode
	 * @return
	 */
	@RequestMapping(value = "/getBigType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getBigType(String gridCode) {
		try {
			List<Map<String, Object>> bigType = this.firstPageNewService.getBigType();
			return Ajax.responseString(CST.RES_SECCESS, bigType);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取汇总信息二类选择数据
	 * 
	 * @author liupeidong
	 * @param kpiType
	 * @return
	 */
	@RequestMapping(value = "/getSmallType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getSmallType(String kpiType) {
		try {
			List<Map<String, Object>> smallType = this.firstPageNewService.getSmallType(kpiType);
			return Ajax.responseString(CST.RES_SECCESS, smallType);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 导出详表数据
	 * 
	 * @param response
	 * @param request
	 * @param session
	 */
	@RequestMapping(value = "/addGridScale", method = RequestMethod.POST)
	public void expertGridScaleExcel(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String orgId = request.getParameter("orgId");
		String scaleType = request.getParameter("scaleType");
		String smallScaleType = request.getParameter("smallScaleType");
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String fileName = "";
		//
		if ("grid".equals(scaleType)) {
			fileName = "网格信息";
		} else if ("stat".equals(scaleType)) {
			fileName = "基站信息";
		} else if ("chnl".equals(scaleType) || "chnlLevel1".equals(scaleType)) {
			fileName = "渠道信息";
		} else if ("staff".equals(scaleType)) {
			fileName = "人员信息";
		}
		try {
			List<Map<String, Object>> gridScaleList = firstPageNewService.getTableDataByScaleType1(orgId, scaleType, smallScaleType, sysOrg);
			String workbookSuff = ".xls";
			int sheetMaxRowNum = 1000000;
			response.reset();
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename=" + new String((fileName + workbookSuff).getBytes(), "iso-8859-1"));
			response.setContentType("application/octet-stream;charset=UTF-8");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			firstPageNewService.exportStationExcel(gridScaleList, outputStream, scaleType, sheetMaxRowNum);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
