package com.bonc.contract.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.contract.dao.entity.WgMsContractAreaDevelop;
import com.bonc.kpi.dao.entity.OrgSearch;

public interface WgMsContractAreaDevelopMapper {

	public List<WgMsContractAreaDevelop> getWgMsContractAreaDevelopInfo(@Param("wgMsContractAreaDevelop") WgMsContractAreaDevelop wgMsContractAreaDevelop,
			@Param("gridInfoList") List<OrgSearch> gridInfoList, @Param("sql") List<String> gridCodes);
}
