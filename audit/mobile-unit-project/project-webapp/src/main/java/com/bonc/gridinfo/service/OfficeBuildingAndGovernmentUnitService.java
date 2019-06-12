package com.bonc.gridinfo.service;


import java.util.Map;


import javax.annotation.Resource;


import org.springframework.stereotype.Service;

import com.bonc.gridinfo.dao.mapper.OfficeBuildingAndGovernmentUnitMapper;


@Service
public class OfficeBuildingAndGovernmentUnitService {

	@Resource
	private OfficeBuildingAndGovernmentUnitMapper officeBuildingAndGovernmentUnitMapper;


	public OfficeBuildingAndGovernmentUnitMapper getMapper() {
		return officeBuildingAndGovernmentUnitMapper;
	}



	public Map<String, Object> getOfficeBuilding(String physicCode) {
		Map<String, Object> resultMap = officeBuildingAndGovernmentUnitMapper.getOfficeBuilding(physicCode);
		return resultMap;
	}
}
