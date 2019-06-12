package com.bonc.gridinfo.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.bonc.common.utils.DateUtil;
import com.bonc.gridinfo.dao.entity.OrgGridDepartment;
import com.bonc.gridinfo.dao.mapper.GridBusinessDepartmentMapper;

@Service
public class GridBusinessDepartmentService {

	@Resource
	private GridBusinessDepartmentMapper mapper;

	public GridBusinessDepartmentMapper getMapper() {
		return mapper;
	}

	public void CallDb2GXWH(String orgId) {
		Map<String, Object> paramCusKey = new HashMap<String, Object>();
		paramCusKey.put("orgId", orgId);
		this.mapper.CallDb2GXWH(paramCusKey);
	}

	public List<OrgGridDepartment> getGridDeptInfo(String orgId, String saleDeptCode) {
		List<OrgGridDepartment> listOgd = mapper.getGridDeptInfo(orgId, saleDeptCode);
		return listOgd;
	}

	public List<OrgGridDepartment> getGridDeptInfoByName(String orgId, String saleDeptName) {
		List<OrgGridDepartment> listOgd = mapper.getGridDeptInfoByName(orgId, saleDeptName);
		return listOgd;
	}

	@SuppressWarnings("unchecked")
	public void removeAllGrid(String data) {
		List<Map<String, String>> updateList = (List<Map<String, String>>) JSON.parse(data);
		String updateDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
		for (int i = 0; i < updateList.size(); i++) {
			String orgId = updateList.get(i).get("orgId");
			String gridCode = updateList.get(i).get("gridCode");
			String saleDeptCode = updateList.get(i).get("saleDeptCode");
			this.mapper.removeSingleGrid(updateDate, orgId, gridCode, saleDeptCode);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void addSingleGrid(OrgGridDepartment orgGridDepartment) {
		Map<String, Object> parentOrg = this.mapper.getParenOrg(orgGridDepartment.getOrgId());
		orgGridDepartment.setAreaCode((String) parentOrg.get("areaCode"));
		orgGridDepartment.setAreaName((String) parentOrg.get("areaName"));
		orgGridDepartment.setCountyName((String) parentOrg.get("countyName"));
		this.mapper.addSingleGrid(orgGridDepartment);
	}

	@SuppressWarnings("unchecked")
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void addAllGrid(String orgId, String gridInfo, String saleDeptCode, String saleDeptName) {
		Map<String, Object> parentOrg = this.mapper.getParenOrg(orgId);
		List<Map<String, String>> gridList = (List<Map<String, String>>) JSON.parse(gridInfo);
		String joinDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
		OrgGridDepartment orgGridDepartment = new OrgGridDepartment();
		for (int i = 0; i < gridList.size(); i++) {
			orgGridDepartment.setAreaCode((String) parentOrg.get("AREACODE"));
			orgGridDepartment.setAreaName((String) parentOrg.get("AREANAME"));
			orgGridDepartment.setCountyName((String) parentOrg.get("COUNTYNAME"));
			orgGridDepartment.setOrgId(orgId);
			orgGridDepartment.setJoinDate(joinDate);
			orgGridDepartment.setGridCode(gridList.get(i).get("gridCode"));
			orgGridDepartment.setGridName(gridList.get(i).get("gridName"));
			orgGridDepartment.setGridType(gridList.get(i).get("gridType"));
			orgGridDepartment.setStatus("A");
			orgGridDepartment.setUpdateDate(null);
			orgGridDepartment.setSaleDeptCode(saleDeptCode);
			orgGridDepartment.setSaleDeptName(saleDeptName);
			this.mapper.addSingleGrid(orgGridDepartment);
		}
	}
}
