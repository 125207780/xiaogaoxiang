package com.bonc.dataVisualization.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.dataVisualization.service.DataVisualizationService;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 数据可视化控制层
 * 
 * @author yangdong@bonc.com.cn
 *
 */

@Controller
@RequestMapping(value = "/dataVisualization")
public class DataVisualizationAction {

	@Resource
	private DataVisualizationService dataVisualizationService;

	private static Integer KSH_PHYSICALTYPE_CHNL = 0;
	private static String KSH_PHYSICALTYPE_STATION = "0";

	@RequestMapping(value = "/getMapLine", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getMapLine(String orgId) {
		try {
			List<Map<String, Object>> listLine = this.dataVisualizationService.getMapLine(orgId);
			return Ajax.responseString(CST.RES_SECCESS, listLine);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getBigTypePie", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getBigTypePie(String orgId, String firstCode) {
		try {
			List<Map<String, Object>> listBig = this.dataVisualizationService.getBigTypePie(orgId, firstCode);
			return Ajax.responseString(CST.RES_SECCESS, listBig);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getSmallTypePie", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getSmallTypePie(String orgId, String secondCode) {
		try {
			List<Map<String, Object>> listSmall = this.dataVisualizationService.getSmallTypePie(orgId, secondCode);
			return Ajax.responseString(CST.RES_SECCESS, listSmall);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getLeftBar", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getLeftBar(String orgId, String firstCode) {
		try {
			List<Map<String, Object>> listLeftBar = this.dataVisualizationService.getLeftBar(orgId, firstCode);
			return Ajax.responseString(CST.RES_SECCESS, listLeftBar);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getTopRightBar", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody String getTopRightBar(String orgId, String firstCode) {
		try {
			List<Map<String, Object>> listRightBar = this.dataVisualizationService.getTopRightBar(orgId, firstCode);
			return Ajax.responseString(CST.RES_SECCESS, listRightBar);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getRightTotalPie", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody String getRightTotalPie(String orgId) {
		try {
			List<Map<String, Object>> listTotalPie = this.dataVisualizationService.getRightTotalPie(orgId);
			return Ajax.responseString(CST.RES_SECCESS, listTotalPie);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getGridInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<OrgSearch> getGridInfo(int page, int rows, String areaId) {
		PageHelper.startPage(page, rows);
		Page<OrgSearch> grid = (Page<OrgSearch>) this.dataVisualizationService.getMapper().getGridInfo(areaId);
		PageJqGrid<OrgSearch> gridJq = new PageJqGrid<>(grid);
		return gridJq;

	}

	@RequestMapping(value = "/getGridTypeNum", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getGridTypeNum(int page, int rows, String areaId) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> grid = (Page<Map<String, Object>>) this.dataVisualizationService.getMapper().getGridTypeNum(areaId);
		PageJqGrid<Map<String, Object>> gridJq = new PageJqGrid<>(grid);
		return gridJq;

	}

	@RequestMapping(value = "/getGridByType", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getGridByType(int page, int rows, String typeId, String areaId) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> grid = (Page<Map<String, Object>>) this.dataVisualizationService.getMapper().getGridByType(typeId, areaId);
		PageJqGrid<Map<String, Object>> gridJq = new PageJqGrid<>(grid);
		return gridJq;

	}

	@RequestMapping(value = "/getGridByTypeAjax", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getGridByTypeAjax(String typeId, String areaId, String gridCode) {
		try {
			List<Map<String, Object>> grid = this.dataVisualizationService.getMapper().getGridByTypeAjax(typeId, areaId, gridCode);
			return Ajax.responseString(CST.RES_SECCESS, grid);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getTopChnlByKpi", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getTopChnlByKpi(String gridCode, String firstCode) {
		try {
			List<Map<String, Object>> grid = this.dataVisualizationService.getMapper().getTopChnlByKpi(gridCode, KSH_PHYSICALTYPE_CHNL, firstCode);
			return Ajax.responseString(CST.RES_SECCESS, grid);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getTopStationByKpi", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getTopStationByKpi(String gridCode, String firstCode) {
		try {
			List<Map<String, Object>> grid = this.dataVisualizationService.getMapper().getTopStationByKpi(gridCode, KSH_PHYSICALTYPE_STATION, firstCode);
			return Ajax.responseString(CST.RES_SECCESS, grid);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getTopGridByKpi", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getTopGridByKpi(String areaId, String firstCode, String typeId) {
		try {
			List<Map<String, Object>> grid = this.dataVisualizationService.getMapper().getTopGridByKpi(typeId, firstCode, areaId);
			return Ajax.responseString(CST.RES_SECCESS, grid);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getBigTypeChnlGroupByCode", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getBigTypeChnlGroupByCode(String physicalId, String firstCode, String physicalType) {
		try {
			List<Map<String, Object>> gridChnl = this.dataVisualizationService.getMapper().getBigTypeChnlGroupByCode(physicalId, firstCode);
			return Ajax.responseString(CST.RES_SECCESS, gridChnl);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getBigTypeStationGroupByCode", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getBigTypeStationGroupByCode(String physicalId, String firstCode, String physicalType) {
		try {
			List<Map<String, Object>> gridStation = this.dataVisualizationService.getMapper().getBigTypeStationGroupByCode(physicalId, firstCode);
			return Ajax.responseString(CST.RES_SECCESS, gridStation);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getGridPosition", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String getGridPosition(String gridCode) {
		try {
			List<Map<String, Object>> gridPosition = this.dataVisualizationService.getMapper().getGridPosition(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, gridPosition);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getGridTypeLevel4", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getGridTypeLevel4(int page, int rows, String gridCode) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> grid = (Page<Map<String, Object>>) this.dataVisualizationService.getMapper().getGridTypeLevel4(gridCode);
		PageJqGrid<Map<String, Object>> gridJq = new PageJqGrid<>(grid);
		return gridJq;

	}

}
