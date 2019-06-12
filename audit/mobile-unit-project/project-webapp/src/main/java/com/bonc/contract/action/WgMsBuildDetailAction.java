package com.bonc.contract.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.contract.dao.entity.WgMsBuildDetail;
import com.bonc.contract.service.WgMsBuildDetailService;
import com.bonc.contract.service.contractPaneService;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/wgMsBuildDetail")
public class WgMsBuildDetailAction {

	@Resource
	private WgMsBuildDetailService wgMsBuildDetailService;

	@Resource
	private KpiManagerService kpiManagerService;

	@Resource
	private contractPaneService contractPaneService;

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
			Map<String, List<OrgSearch>> orgInfo = this.wgMsBuildDetailService.initSeletOrg(orgId);
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
			Map<String, List<OrgSearch>> orgInfo = this.wgMsBuildDetailService.getChildrenOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, sysOrg.getOrgLevel(), orgInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/selectBigType")
	@ResponseBody
	public List<Map<String, String>> selectTypeOne() {
		List<Map<String, String>> result = this.contractPaneService.selectTypeOne();
		return result;
	}

	@RequestMapping(value = "/selectSmallType")
	@ResponseBody
	public List<Map<String, String>> selectTypeTwo(String code) {
		List<Map<String, String>> result = this.contractPaneService.selectTypeTwo(code);
		return result;
	}

	@RequestMapping(value = "/getWgMsBuildDetailInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<WgMsBuildDetail> getWgMsBuildDetailInfo(WgMsBuildDetail wgMsBuildDetail, Integer page, Integer rows, String orgId) {

		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
			List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
			OrgSearch orgSearch = new OrgSearch();
			orgSearch.setGridCode(orgId);
			gridInfoList.add(orgSearch);
			gridInfoList.get(0).setGridCode(orgId);
			PageHelper.startPage(page, rows);
			Page<WgMsBuildDetail> gridWgMsBuildDetailUnit = (Page<WgMsBuildDetail>) this.wgMsBuildDetailService.getWgMsBuildDetailInfo(wgMsBuildDetail,
					gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (WgMsBuildDetail rowNum : gridWgMsBuildDetailUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<WgMsBuildDetail> gridWgMsBuildDetailUnitJqGrid = new PageJqGrid<>(gridWgMsBuildDetailUnit);
			return gridWgMsBuildDetailUnitJqGrid;
		} else {
			Map<String, List<OrgSearch>> orgInfo = this.wgMsBuildDetailService.initSeletOrg(orgId);
			List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
			PageHelper.startPage(page, rows);
			Page<WgMsBuildDetail> gridWgMsBuildDetailUnit = (Page<WgMsBuildDetail>) this.wgMsBuildDetailService.getWgMsBuildDetailInfo(wgMsBuildDetail,
					gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (WgMsBuildDetail rowNum : gridWgMsBuildDetailUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<WgMsBuildDetail> gridWgMsBuildDetailUnitJqGrid = new PageJqGrid<>(gridWgMsBuildDetailUnit);
			return gridWgMsBuildDetailUnitJqGrid;
		}
	}

	@RequestMapping(value = "/getChannelInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChannelInfo(Integer page, Integer rows, String orgId) {
		try {
			SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
			if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
				List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
				OrgSearch orgSearch = new OrgSearch();
				orgSearch.setGridCode(orgId);
				gridInfoList.add(orgSearch);
				gridInfoList.get(0).setGridCode(orgId);
				List<Map<String, Object>> channelInfo = wgMsBuildDetailService.getChannelInfo(gridInfoList);
				return Ajax.responseString(CST.RES_SECCESS, channelInfo);
			} else {
				Map<String, List<OrgSearch>> orgInfo = this.wgMsBuildDetailService.initSeletOrg(orgId);
				List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
				List<Map<String, Object>> channelInfo = wgMsBuildDetailService.getChannelInfo(gridInfoList);
				return Ajax.responseString(CST.RES_SECCESS, channelInfo);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getBuildingInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBuildingInfo(Integer page, Integer rows, String orgId) {
		try {
			SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
			if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
				List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
				OrgSearch orgSearch = new OrgSearch();
				orgSearch.setGridCode(orgId);
				gridInfoList.add(orgSearch);
				gridInfoList.get(0).setGridCode(orgId);
				List<Map<String, Object>> buildingInfo = wgMsBuildDetailService.getBuildingInfo(gridInfoList);
				return Ajax.responseString(CST.RES_SECCESS, buildingInfo);
			} else {
				Map<String, List<OrgSearch>> orgInfo = this.wgMsBuildDetailService.initSeletOrg(orgId);
				List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
				List<Map<String, Object>> buildingInfo = wgMsBuildDetailService.getBuildingInfo(gridInfoList);
				return Ajax.responseString(CST.RES_SECCESS, buildingInfo);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/export", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public void exportExcel(HttpServletResponse response, WgMsBuildDetail wgMsBuildDetail, String orgId) {
		try {
			String chnlCode = java.net.URLDecoder.decode(wgMsBuildDetail.getChnlCode(), "UTF-8");
			String buildingCode = java.net.URLDecoder.decode(wgMsBuildDetail.getBuildingCode(), "UTF-8");
			wgMsBuildDetail.setChnlCode(chnlCode);
			wgMsBuildDetail.setBuildingCode(buildingCode);
			SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
			if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
				List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
				OrgSearch orgSearch = new OrgSearch();
				orgSearch.setGridCode(orgId);
				gridInfoList.add(orgSearch);
				gridInfoList.get(0).setGridCode(orgId);
				List<WgMsBuildDetail> empList = wgMsBuildDetailService.getWgMsBuildDetailInfo(wgMsBuildDetail, gridInfoList);
				// 使用response对象输入到excel中(固定格式)
				response.setContentType("application/x-execl");
				// 设置头
				response.setHeader("Content-Disposition", "attachment;filename=" + new String("包保小区楼宇明细列表.xls".getBytes(), "ISO-8859-1"));
				// 输出流
				ServletOutputStream outputStream = response.getOutputStream();
				// supplierService.exportExcel(userList, outputStream);
				wgMsBuildDetailService.exportExcel(empList, outputStream);
				if (outputStream != null) {
					outputStream.close();
				}
			} else {
				Map<String, List<OrgSearch>> orgInfo = this.wgMsBuildDetailService.initSeletOrg(orgId);
				List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
				List<WgMsBuildDetail> empList = wgMsBuildDetailService.getWgMsBuildDetailInfo(wgMsBuildDetail, gridInfoList);
				// 使用response对象输入到excel中(固定格式)
				response.setContentType("application/x-execl");
				// 设置头
				response.setHeader("Content-Disposition", "attachment;filename=" + new String("包保小区楼宇明细列表.xls".getBytes(), "ISO-8859-1"));
				// 输出流
				ServletOutputStream outputStream = response.getOutputStream();
				// supplierService.exportExcel(userList, outputStream);
				wgMsBuildDetailService.exportExcel(empList, outputStream);
				if (outputStream != null) {
					outputStream.close();
				}
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

}
