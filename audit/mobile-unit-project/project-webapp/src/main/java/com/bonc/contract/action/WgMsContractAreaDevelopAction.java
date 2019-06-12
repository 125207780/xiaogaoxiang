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
import com.bonc.contract.dao.entity.WgMsContractAreaDevelop;
import com.bonc.contract.service.WgMsContractAreaDevelopService;
import com.bonc.contract.service.contractPaneService;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/wgMsContractAreaDevelop")
public class WgMsContractAreaDevelopAction {

	@Resource
	private WgMsContractAreaDevelopService wgMsContractAreaDevelopService;

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
			Map<String, List<OrgSearch>> orgInfo = this.wgMsContractAreaDevelopService.initSeletOrg(orgId);
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
			Map<String, List<OrgSearch>> orgInfo = this.wgMsContractAreaDevelopService.getChildrenOrg(orgId);
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

	@RequestMapping(value = "/getWgMsContractAreaDevelopInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<WgMsContractAreaDevelop> getWgMsContractAreaDevelopInfo(WgMsContractAreaDevelop wgMsContractAreaDevelop, Integer page, Integer rows,
			String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
			List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
			OrgSearch orgSearch = new OrgSearch();
			orgSearch.setGridCode(orgId);
			gridInfoList.add(orgSearch);
			gridInfoList.get(0).setGridCode(orgId);
			PageHelper.startPage(page, rows);
			Page<WgMsContractAreaDevelop> gridWgMsContractAreaDevelopUnit = (Page<WgMsContractAreaDevelop>) this.wgMsContractAreaDevelopService
					.getWgMsContractAreaDevelopInfo(wgMsContractAreaDevelop, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (WgMsContractAreaDevelop rowNum : gridWgMsContractAreaDevelopUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<WgMsContractAreaDevelop> gridWgMsContractAreaDevelopUnitJqGrid = new PageJqGrid<>(gridWgMsContractAreaDevelopUnit);
			return gridWgMsContractAreaDevelopUnitJqGrid;
		} else {
			Map<String, List<OrgSearch>> orgInfo = this.wgMsContractAreaDevelopService.initSeletOrg(orgId);
			List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
			PageHelper.startPage(page, rows);
			Page<WgMsContractAreaDevelop> gridWgMsContractAreaDevelopUnit = (Page<WgMsContractAreaDevelop>) this.wgMsContractAreaDevelopService
					.getWgMsContractAreaDevelopInfo(wgMsContractAreaDevelop, gridInfoList);
			int num = 1 + (page - 1) * rows;
			for (WgMsContractAreaDevelop rowNum : gridWgMsContractAreaDevelopUnit) {
				rowNum.setRowNum(num++);
			}
			PageJqGrid<WgMsContractAreaDevelop> gridWgMsContractAreaDevelopUnitJqGrid = new PageJqGrid<>(gridWgMsContractAreaDevelopUnit);
			return gridWgMsContractAreaDevelopUnitJqGrid;
		}
	}

	@RequestMapping(value = "/export", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public void exportExcel(HttpServletResponse response, WgMsContractAreaDevelop wgMsContractAreaDevelop, String orgId) {
		try {
			String bigType = java.net.URLDecoder.decode(wgMsContractAreaDevelop.getBigType(), "UTF-8");
			String smallType = java.net.URLDecoder.decode(wgMsContractAreaDevelop.getSmallType(), "UTF-8");
			String statisDate = java.net.URLDecoder.decode(wgMsContractAreaDevelop.getStatisDate(), "UTF-8");
			wgMsContractAreaDevelop.setBigType(bigType);
			wgMsContractAreaDevelop.setSmallType(smallType);
			wgMsContractAreaDevelop.setStatisDate(statisDate);
			SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
			if (sysOrg != null && sysOrg.getOrgLevel().equals("4")) {
				List<OrgSearch> gridInfoList = new ArrayList<OrgSearch>();
				OrgSearch orgSearch = new OrgSearch();
				orgSearch.setGridCode(orgId);
				gridInfoList.add(orgSearch);
				gridInfoList.get(0).setGridCode(orgId);
				List<WgMsContractAreaDevelop> empList = wgMsContractAreaDevelopService.getWgMsContractAreaDevelopInfo(wgMsContractAreaDevelop, gridInfoList);
				// 使用response对象输入到excel中(固定格式)
				response.setContentType("application/x-execl");
				// 设置头
				response.setHeader("Content-Disposition", "attachment;filename=" + new String("包保区域业务发展列表.xls".getBytes(), "ISO-8859-1"));
				// 输出流
				ServletOutputStream outputStream = response.getOutputStream();
				// supplierService.exportExcel(userList, outputStream);
				wgMsContractAreaDevelopService.exportExcel(empList, outputStream);
				if (outputStream != null) {
					outputStream.close();
				}
			} else {
				Map<String, List<OrgSearch>> orgInfo = this.wgMsContractAreaDevelopService.initSeletOrg(orgId);
				List<OrgSearch> gridInfoList = orgInfo.get("gridInfo");
				List<WgMsContractAreaDevelop> empList = wgMsContractAreaDevelopService.getWgMsContractAreaDevelopInfo(wgMsContractAreaDevelop, gridInfoList);
				// 使用response对象输入到excel中(固定格式)
				response.setContentType("application/x-execl");
				// 设置头
				response.setHeader("Content-Disposition", "attachment;filename=" + new String("包保区域业务发展列表.xls".getBytes(), "ISO-8859-1"));
				// 输出流
				ServletOutputStream outputStream = response.getOutputStream();
				// supplierService.exportExcel(userList, outputStream);
				wgMsContractAreaDevelopService.exportExcel(empList, outputStream);
				if (outputStream != null) {
					outputStream.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
