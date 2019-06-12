package com.bonc.gridinfo.action;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.DateUtil;
import com.bonc.gridinfo.dao.entity.OrgGridDepartment;
import com.bonc.gridinfo.dao.entity.SaleDeptInfo;
import com.bonc.gridinfo.service.GridBusinessDepartmentService;

@Controller
@RequestMapping(value = "/gridBusinessDepartment")
public class GridBusinessDepartmentAction {

	@Resource
	private GridBusinessDepartmentService gridBusinessDepartmentService;

	/**
	 * 获取当前机构下的营业部信息
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getDepartment", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getDepartment(String orgId, String saleDeptName) {
		try {
			List<SaleDeptInfo> departmentList = gridBusinessDepartmentService.getMapper().getDepartment(orgId, saleDeptName);
			return Ajax.responseString(CST.RES_SECCESS, departmentList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取当前营业部下的网格信息
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	@RequestMapping(value = "/getGridDeptInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridDeptInfo(String orgId, String saleDeptCode) {
		try {
			List<OrgGridDepartment> listOgd = this.gridBusinessDepartmentService.getGridDeptInfo(orgId, saleDeptCode);
			return Ajax.responseString(CST.RES_SECCESS, listOgd);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取当前营业部下的网格信息
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	@RequestMapping(value = "/getGridDeptInfoByName", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridDeptInfoByName(String orgId, String saleDeptName) {
		try {
			List<OrgGridDepartment> listOgd = this.gridBusinessDepartmentService.getGridDeptInfo(orgId, saleDeptName);
			return Ajax.responseString(CST.RES_SECCESS, listOgd);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询未加入营业部的网格
	 * 
	 * @param orgId
	 * @param gridName
	 * @return
	 */
	@RequestMapping(value = "/getNoGridDept", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getNoGridDept(String orgId, String gridName) {
		try {
			List<Map<String, Object>> listNgd = this.gridBusinessDepartmentService.getMapper().getNoGridDept(orgId, gridName);
			return Ajax.responseString(CST.RES_SECCESS, listNgd);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 移除单个网格
	 * 
	 * @param orgId
	 * @param gridCode
	 * @param saleDeptCode
	 * @return
	 */
	@RequestMapping(value = "/removeSingleGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String removeSingleGrid(String orgId, String gridCode, String saleDeptCode) {
		try {
			String updateDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
			this.gridBusinessDepartmentService.getMapper().removeSingleGrid(updateDate, orgId, gridCode, saleDeptCode);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 移除多个网格
	 * 
	 * @param data
	 * @return
	 */
	@RequestMapping(value = "/removeAllGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String removeAllGrid(String data, String orgId) {
		try {
			this.gridBusinessDepartmentService.removeAllGrid(data);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 加入单个网格
	 * 
	 * @param orgGridDepartment
	 * @return
	 */
	@RequestMapping(value = "/addSingleGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addSingleGrid(OrgGridDepartment orgGridDepartment) {
		try {
			String joinDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
			orgGridDepartment.setJoinDate(joinDate);
			orgGridDepartment.setUpdateDate(null);
			this.gridBusinessDepartmentService.addSingleGrid(orgGridDepartment);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgGridDepartment.getOrgId());
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/addAllGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addAllGrid(String orgId, String gridInfo, String saleDeptCode, String saleDeptName) {
		try {
			this.gridBusinessDepartmentService.addAllGrid(orgId, gridInfo, saleDeptCode, saleDeptName);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}
}
