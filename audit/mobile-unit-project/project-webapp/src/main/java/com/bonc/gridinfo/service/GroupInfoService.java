package com.bonc.gridinfo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import javax.annotation.Resource;


import org.springframework.stereotype.Service;


import com.bonc.gridinfo.dao.mapper.GroupInfoMapper;


@Service
public class GroupInfoService {

	@Resource
	private GroupInfoMapper groupInfoMapper;

	public GroupInfoMapper getMapper() {
		return groupInfoMapper;
	}

	/**
	 * 获取集团详细信息
	 * @param groupId
	 * @return
	 */
	public List<Map<String,Object>> getGroupInfo(String groupId) {
		List<Map<String,Object>> groups=new ArrayList<Map<String,Object>>();
		groups=groupInfoMapper.getGroupInfo(groupId);
		return groups;
	}

	
}
