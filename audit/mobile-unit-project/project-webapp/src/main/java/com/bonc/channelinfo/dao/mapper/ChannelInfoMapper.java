package com.bonc.channelinfo.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ChannelInfoMapper {

	/**
	 * 查询渠道基础信息
	 * 
	 * @param channelCode
	 * @return
	 */
	public List<Map<String, Object>> getBaseChannelInfo(String channelId);

	public List<Map<String, Object>> getBaseChannelInfoDay(String channelId);

	/**
	 * 查询所有渠道信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectAll
	 * @Author xiaogaoxiang
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectAll(@Param("orgId") String orgId);
}
