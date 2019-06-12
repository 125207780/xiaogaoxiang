package com.bonc.dataVisualization.action;

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
import com.bonc.dataVisualization.service.DataVisualizationService2;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.Page;

/**
 * 数据可视化控制层
 * 
 * @author yangdong@bonc.com.cn
 *
 */
@Controller
@RequestMapping(value = "/dataVisualization2")
public class DataVisualizationAction2 {

	@Resource
	private DataVisualizationService2 dataVisualizationService2;

	@Resource
	private KpiManagerService kpiManagerService;

	@Resource
	private SysOrgService sysOrgService;

	@RequestMapping(value = "/getBigType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getBigType(String gridCode) {
		try {
			List<Map<String, Object>> bigType = this.dataVisualizationService2.getMapper().getBigType();
			return Ajax.responseString(CST.RES_SECCESS, bigType);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getSmallType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getSmallType(String kpiType) {
		try {
			List<Map<String, Object>> smallType = this.dataVisualizationService2.getMapper().getSmallType(kpiType);
			return Ajax.responseString(CST.RES_SECCESS, smallType);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	// 需测试 @@@@@@@@@@@@@@@@@@@
	@RequestMapping(value = "/initOrg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
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
	 * 网格规模
	 * 
	 * @Title getGridScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getGridScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getGridScale(String orgId) {
		try {
			// 查询网格规模
			Map<String, Object> gridScale = dataVisualizationService2.getGridScale(orgId);
			return Ajax.responseString(CST.RES_SECCESS, gridScale);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 渠道规模
	 * 
	 * @Title getChnlScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getChnlScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getChnlScale(String orgId) {
		try {
			// 查询渠道规模
			Map<String, Object> chnlScale = this.dataVisualizationService2.getChnlScale(orgId);
			return Ajax.responseString(CST.RES_SECCESS, chnlScale);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 基站规模
	 * 
	 * @Title getStationScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getStationScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getStationScale(String orgId) {
		try {
			// 查询基站规模
			List<Map<String, Object>> stationScale = this.dataVisualizationService2.getStationScale(orgId);
			return Ajax.responseString(CST.RES_SECCESS, stationScale);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 语音用户规模
	 * 
	 * @Title getVoiceScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getVoiceScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getVoiceScale(String orgId) {
		try {
			// 查询语音用户规模
			Map<String, Object> stationScale = this.dataVisualizationService2.getVoiceScale(orgId);
			return Ajax.responseString(CST.RES_SECCESS, stationScale);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	/**
	 * 流量用户规模
	 * 
	 * @Title getFlowScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return String
	 */
	@RequestMapping(value = "/getFlowScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getFlowScale(String orgId) {
		try {
			// 查询流量用户规模
			Map<String, Object> flowScale = this.dataVisualizationService2.getFlowScale(orgId);
			return Ajax.responseString(CST.RES_SECCESS, flowScale);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	// page类型 未加缓存
	@RequestMapping(value = "/getKpiRatio", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getKpiRatio(int page, int rows, String orgId, String kpiCode, String rangeId, String statisDate,
			HttpSession session) {
		// 查询orgId下一级的子节点信息
		/*
		 * List<SysOrg> sysOrgList =
		 * sysOrgService.selectNextChildrenSysOrg(orgId); List<String> orgIds =
		 * new ArrayList<>(); for (SysOrg so : sysOrgList) {
		 * orgIds.add(so.getOrgId()); }
		 */
		Page<Map<String, Object>> kpiRadio = (Page<Map<String, Object>>) this.dataVisualizationService2.getKpiRatio(page, rows, orgId, kpiCode, rangeId,
				statisDate);
		PageJqGrid<Map<String, Object>> kpiRadioJq = new PageJqGrid<>(kpiRadio);
		return kpiRadioJq;
	}

	@RequestMapping(value = "/getGridInfoByType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getGridInfoByType(String orgId, String gridTypeId) {
		try {
			List<Map<String, Object>> gridInfo = this.dataVisualizationService2.getGridInfoByType(orgId, gridTypeId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getTopScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getTopScale(String orgId, String scaleType, String smallScaleType) {
		try {
			List<Map<String, Object>> gridInfo = this.dataVisualizationService2.getTopScale(orgId, scaleType, smallScaleType);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getTableDataByScaleType", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getTableDataByScaleType(int page, int rows, String orgId, String scaleType, String smallScaleType) {
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) this.dataVisualizationService2.getTableDataByScaleType(page, rows, orgId, scaleType,
				smallScaleType, sysOrg);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	@RequestMapping(value = "/getMapTableInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getMapTableInfo(int page, int rows, String orgId, String incomeId, String sidx, String sord) {
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) this.dataVisualizationService2.getMapTableInfo(page, rows, orgId, incomeId, sidx,
				sord);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	@RequestMapping(value = "/addGridScale", method = RequestMethod.POST)
	public void expertGridScaleExcel(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String orgId = request.getParameter("orgId");
		String scaleType = request.getParameter("scaleType");
		String smallScaleType = request.getParameter("smallScaleType");
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		/*
		 * String cityInfo = request.getParameter("cityInfo"); String areaInfo =
		 * request.getParameter("areaInfo"); String deptInfo =
		 * request.getParameter("deptInfo"); String girdInfo =
		 * request.getParameter("gridInfo");
		 */
		try {
			List<Map<String, Object>> gridScaleList = this.dataVisualizationService2.getTableDataByScaleType1(orgId, scaleType, smallScaleType, sysOrg);
			response.reset();
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename=" + new String(("网格规模信息" + ".xls").getBytes(), "iso-8859-1"));
			response.setContentType("application/octet-stream;charset=UTF-8");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			this.dataVisualizationService2.exportStationExcel(gridScaleList, outputStream, scaleType);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/exportGridTable", method = RequestMethod.POST)
	public void exportGridTable(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String orgId = request.getParameter("orgId");
		String incomeId = request.getParameter("incomeId");
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String sidx = "";
		String sord = "desc";
		try {
			List<Map<String, Object>> mapTableList = this.dataVisualizationService2.getMapper().getMapTableInfo01(orgId, incomeId, sysOrg.getOrgLevel(), sidx,
					sord);
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename=" + new String(("网格信息" + ".xls").getBytes(), "iso-8859-1"));
			response.setContentType("application/octet-stream;charset=UTF-8");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			this.dataVisualizationService2.exportTableExcel(mapTableList, outputStream, incomeId);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
