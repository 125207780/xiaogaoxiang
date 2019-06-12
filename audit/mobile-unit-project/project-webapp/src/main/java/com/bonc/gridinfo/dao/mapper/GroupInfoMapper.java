package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;

/**
 * 集团信息mapper
 * @author cj
 *
 */
public interface GroupInfoMapper {
	public List<Map<String, Object>> getGroupInfo(String GCCode);

}
