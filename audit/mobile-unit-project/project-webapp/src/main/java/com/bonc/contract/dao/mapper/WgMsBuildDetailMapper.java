package com.bonc.contract.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.contract.dao.entity.WgMsBuildDetail;
import com.bonc.kpi.dao.entity.OrgSearch;

public interface WgMsBuildDetailMapper {

	public List<WgMsBuildDetail> getWgMsBuildDetailInfo(@Param("wgMsBuildDetail") WgMsBuildDetail wgMsBuildDetail,
			@Param("gridInfoList") List<OrgSearch> gridInfoList, @Param("sql") List<String> gridCodes);

	public List<Map<String, Object>> getChannelInfo(@Param("sql") List<String> gridCodes);

	public List<Map<String, Object>> getBuildingInfo(@Param("sql") List<String> gridCodes);

}
