package com.bonc.channelinfo.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.channelinfo.dao.mapper.ChannelInfoMapper;

@Service
public class ChannelInfoService {

	@Resource
	private ChannelInfoMapper mapper;

	public ChannelInfoMapper getMapper() {
		return mapper;
	}

	/**
	 * 查询所有渠道信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectAll
	 * @Author xiaogaoxiang
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectAll(String orgId) {
		return mapper.selectAll(orgId);
	}
}
