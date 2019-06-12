package com.bonc.exam.action;

import java.util.ArrayList;
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
import com.bonc.exam.dao.entity.GridRank;
import com.bonc.exam.dao.entity.GridRankDetail;
import com.bonc.exam.service.GridRankDetailService;
import com.bonc.exam.service.GridRankService;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 
 * @FileName GridRankAction.java
 * @Author liulin@bonc.com.cn
 * @At 2018年11月17日 下午5:22:20
 * @Desc
 */
@Controller
@RequestMapping(value = "/gridRank")
public class GridRankAction {

	@Resource
	private GridRankService gridRankService;

	@Resource
	private GridRankDetailService gridRankDetailService;

	@Resource
	private KpiManagerService kpiManagerService;

	/**
	 * 初始化下拉条
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/initSeletOrg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initSeletOrg(String orgId) {
		try {
			Map<String, List<OrgSearch>> orgInfo = this.gridRankService.initSeletOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, orgInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取当前机构下所有组织机构
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getChildrenOrg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChildrenOrg(String orgId) {
		try {
			SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
			Map<String, List<OrgSearch>> orgInfo = this.gridRankService.getChildrenOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, sysOrg.getOrgLevel(), orgInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getGridRankInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridRank> getGridRanInfo(GridRank gridRank, Integer page, Integer rows, String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
			List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
			OrgSearch orgSearch = new OrgSearch();
			orgSearch.setGridCode(orgId);
			gridInfoList.add(orgSearch);
			gridInfoList.get(0).setGridCode(orgId);
			PageHelper.startPage(page, rows);
			Page<GridRank> gridRankUnit = (Page<GridRank>) this.gridRankService.getGridRankInfo(gridRank, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRank rowNum : gridRankUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRank> gridRankUnitJqGrid = new PageJqGrid<>(gridRankUnit);
			return gridRankUnitJqGrid;
		} else {
			Map<String, List<OrgSearch>> orgInfo = this.gridRankService.initSeletOrg(orgId);
			List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
			PageHelper.startPage(page, rows);
			Page<GridRank> gridRankUnit = (Page<GridRank>) this.gridRankService.getGridRankInfo(gridRank, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRank rowNum : gridRankUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRank> gridRankUnitJqGrid = new PageJqGrid<>(gridRankUnit);
			return gridRankUnitJqGrid;
		}
	}

	@RequestMapping(value = "/getGridRankInfoModify", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridRankDetail> getGridRankInfoModify(GridRankDetail gridRankDetail, Integer page, Integer rows, String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		if (sysOrg != null && "4".equals(sysOrg.getOrgLevel())) {
			List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
			OrgSearch orgSearch = new OrgSearch();
			orgSearch.setGridCode(orgId);
			gridInfoList.add(orgSearch);
			gridInfoList.get(0).setGridCode(orgId);
			PageHelper.startPage(page, rows);
			Page<GridRankDetail> gridRankDetailUnit = (Page<GridRankDetail>) this.gridRankService.getGridRankInfoModify(gridRankDetail, gridInfoList);
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
				// gridInfo为空时 将会产生错误 in() 所以将setGridCode设置一个不可能的值 数据库就会 正常运行
				orgSearch.setGridCode("99999999999999");
				gridInfoList.add(orgSearch);
			}
			PageHelper.startPage(page, rows);
			Page<GridRankDetail> gridRankDetailUnit = (Page<GridRankDetail>) this.gridRankService.getGridRankInfoModify(gridRankDetail, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRankDetail rowNum : gridRankDetailUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRankDetail> gridRankDetailUnitJqGrid = new PageJqGrid<>(gridRankDetailUnit);
			return gridRankDetailUnitJqGrid;
		}
	}

	/**
	 * 指标得分明细
	 * 
	 * @param gridRank
	 * @param page
	 * @param rows
	 * @param orgId
	 * @param gridCode
	 * @return
	 */
	@RequestMapping(value = "/getRankDetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridRankDetail> getRankDetail(GridRankDetail gridRank, Integer page, Integer rows, String orgId, String id, String ect, String et,
			String ot) {
		PageHelper.startPage(page, rows);
		Page<GridRankDetail> gridRankDetailUnit = (Page<GridRankDetail>) this.gridRankDetailService.getMapper().getRankDetail(id, ect, et, ot);
		int num = 1 + (page - 1) * rows;
		for (GridRankDetail rowNum : gridRankDetailUnit) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<GridRankDetail> gridRankDetailUnitJqGrid = new PageJqGrid<>(gridRankDetailUnit);
		return gridRankDetailUnitJqGrid;
	}

	/**
	 * 结果发布
	 * 
	 * @param gridRank
	 * @param page
	 * @param rows
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getResultReleaseInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridRank> getResultReleaseInfo(GridRank gridRank, Integer page, Integer rows, String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
			List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
			OrgSearch orgSearch = new OrgSearch();
			orgSearch.setGridCode(orgId);
			gridInfoList.add(orgSearch);
			gridInfoList.get(0).setGridCode(orgId);
			PageHelper.startPage(page, rows);
			Page<GridRank> gridRankUnit = (Page<GridRank>) this.gridRankService.getResultReleaseInfo(gridRank, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRank rowNum : gridRankUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRank> gridRankUnitJqGrid = new PageJqGrid<>(gridRankUnit);
			return gridRankUnitJqGrid;
		} else {
			Map<String, List<OrgSearch>> orgInfo = this.gridRankService.initSeletOrg(orgId);
			List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
			PageHelper.startPage(page, rows);
			Page<GridRank> gridRankUnit = (Page<GridRank>) this.gridRankService.getResultReleaseInfo(gridRank, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (GridRank rowNum : gridRankUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<GridRank> gridRankUnitJqGrid = new PageJqGrid<>(gridRankUnit);
			return gridRankUnitJqGrid;
		}
	}

	@RequestMapping(value = "/getStauts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getStauts(String ids) {
		try {
			String setStautsInfo = gridRankService.updateStautsInfo(ids.replaceAll(" ", ""));
			return Ajax.responseString(CST.RES_SECCESS, setStautsInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "状态更新失败");
		}
	}

}