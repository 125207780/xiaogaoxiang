package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;


/**
 * 基站信息mapper
 * 
 * @author liulin@bonc.com.cn
 *
 */
public interface NonCommunityMapper {
	public List<Map<String, Object>> getNonCommunity(String cellId);

}
