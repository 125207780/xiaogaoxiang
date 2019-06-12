package com.bonc.dataVisualization.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.dataVisualization.dao.mapper.DataVisualizationMapper;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;

@Service
public class DataVisualizationService {

	@Resource
	private DataVisualizationMapper mapper;

	@Resource
	private KpiManagerService kpiManagerService;

	public DataVisualizationMapper getMapper() {
		return mapper;
	}

	public List<Map<String, Object>> getBigTypePie(String orgId, String firstCode) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgCode = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "GRID_CODE";
		}
		return this.mapper.getBigTypePie(orgId, orgCode, firstCode);
	}

	public List<Map<String, Object>> getSmallTypePie(String orgId, String secondCode) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgCode = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "GRID_CODE";
		}
		return this.mapper.getSmallTypePie(orgId, orgCode, secondCode);
	}

	public List<Map<String, Object>> getLeftBar(String orgId, String firstCode) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgCode = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "AREA_ID";
		}
		return this.mapper.getLeftBar(orgId, orgCode, firstCode);
	}

	public List<Map<String, Object>> getTopRightBar(String orgId, String firstCode) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgCode = "";
		String orgName = "";
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
		}
		return this.mapper.getTopRightBar(orgId, orgCode, firstCode, orgName, parentId);
	}

	public List<Map<String, Object>> getRightTotalPie(String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgCode = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "AREA_ID";
		}
		return this.mapper.getRightTotalPie(orgId, orgCode);
	}

	public List<Map<String, Object>> getMapLine(String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgCode = "";
		String orgName = "";
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
		}
		return this.mapper.getMapLine(orgId, orgCode, orgName, parentId);
	}

}
