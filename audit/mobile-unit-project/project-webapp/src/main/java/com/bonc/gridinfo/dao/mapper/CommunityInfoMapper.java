package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;


public interface CommunityInfoMapper {

	/**
	 * 查询入格小区基础信息
	 * 
	 * @param getBaseCommunityInfo
	 * @return
	 */
	public List<Map<String, Object>> getBaseCommunityInfo(String communityId);

	
}
