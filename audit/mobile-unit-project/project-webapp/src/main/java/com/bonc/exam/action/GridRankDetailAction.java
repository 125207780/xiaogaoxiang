package com.bonc.exam.action;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.bonc.exam.dao.entity.EvaluationKpi;
import com.bonc.exam.dao.entity.GridRankDetail;
import com.bonc.exam.service.GridRankDetailService;
import com.bonc.exam.service.GridRankService;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/gridRankDetail")
public class GridRankDetailAction {

	@Resource
	private GridRankDetailService gridRankDetailService;

	@Resource
	private GridRankService gridRankService;
	@Resource
	private KpiManagerService kpiManagerService;

	@RequestMapping(value = "/getGridRankDetailInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridRankDetail> getGridRankDetailInfo(GridRankDetail gridRankDetail, Integer page, Integer rows, String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
			List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
			OrgSearch orgSearch = new OrgSearch();
			orgSearch.setGridCode(orgId);
			gridInfoList.add(orgSearch);
			gridInfoList.get(0).setGridCode(orgId);
			PageHelper.startPage(page, rows);
			Page<GridRankDetail> gridRankDetailUnit = (Page<GridRankDetail>) this.gridRankDetailService.getGridRankDetailInfo(gridRankDetail, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRankDetail rowNum : gridRankDetailUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRankDetail> gridRankDetailUnitJqGrid = new PageJqGrid<>(gridRankDetailUnit);
			return gridRankDetailUnitJqGrid;
		} else {
			Map<String, List<OrgSearch>> orgInfo = this.gridRankService.initSeletOrg(orgId);
			List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
			PageHelper.startPage(page, rows);
			Page<GridRankDetail> gridRankDetailUnit = (Page<GridRankDetail>) this.gridRankDetailService.getGridRankDetailInfo(gridRankDetail, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRankDetail rowNum : gridRankDetailUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRankDetail> gridRankDetailUnitJqGrid = new PageJqGrid<>(gridRankDetailUnit);
			return gridRankDetailUnitJqGrid;
		}
	}

	@RequestMapping(value = "/getGridRankDetailInfoModify", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridRankDetail> getGridRankDetailInfoModify(GridRankDetail gridRankDetail, Integer page, Integer rows, String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		if (sysOrg != null && "4".equals(sysOrg.getOrgLevel())) {
			List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
			OrgSearch orgSearch = new OrgSearch();
			orgSearch.setGridCode(orgId);
			gridInfoList.add(orgSearch);
			gridInfoList.get(0).setGridCode(orgId);
			PageHelper.startPage(page, rows);
			Page<GridRankDetail> gridRankDetailUnit = (Page<GridRankDetail>) this.gridRankDetailService.getGridRankDetailInfoModify(gridRankDetail,
					gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRankDetail rowNum : gridRankDetailUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRankDetail> gridRankDetailUnitJqGrid = new PageJqGrid<>(gridRankDetailUnit);
			return gridRankDetailUnitJqGrid;
		} else {
			Map<String, List<OrgSearch>> orgInfo = this.gridRankService.initSeletOrg(orgId);
			List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
			if (gridInfoList == null || gridInfoList.size() == 0) {
				gridInfoList = new ArrayList<>();
				OrgSearch orgSearch = new OrgSearch();
				// gridInfo为空时 将会产生错误 in（） 所以将setGridCode设置一个不可能的值 数据库就会 正常运行
				orgSearch.setGridCode("99999999999999");
				gridInfoList.add(orgSearch);
			}
			PageHelper.startPage(page, rows);
			Page<GridRankDetail> gridRankDetailUnit = (Page<GridRankDetail>) this.gridRankDetailService.getGridRankDetailInfoModify(gridRankDetail,
					gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRankDetail rowNum : gridRankDetailUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRankDetail> gridRankDetailUnitJqGrid = new PageJqGrid<>(gridRankDetailUnit);
			return gridRankDetailUnitJqGrid;
		}
	}

	@RequestMapping(value = "/evaluationKpilInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getEvaluationKpilInfo() {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			List<GridRankDetail> evaluateCycle = gridRankDetailService.getMapper().getEvaluateCycle();
			List<EvaluationKpi> evaluationKpiInfo = gridRankDetailService.getEvaluationKpilMapper().getEvaluationKpiInfo();
			map.put("evaluateCycle", evaluateCycle);
			map.put("evaluationKpiInfo", evaluationKpiInfo);
			return Ajax.responseString(CST.RES_SECCESS, map);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

}
