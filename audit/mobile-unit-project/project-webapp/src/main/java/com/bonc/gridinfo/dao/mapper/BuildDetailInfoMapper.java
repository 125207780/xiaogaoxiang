package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.BuildDetailInfo;

/**
 * 楼宇详情信息mapper
 * 
 * @author liulin@bonc.com.cn
 *
 */
public interface BuildDetailInfoMapper {

	/**
	 * 查询楼宇详情信息
	 * 
	 * @return
	 */
	public List<Map<String, Object>> getBuildDetailInfo(@Param("listType") String listType, @Param("gridCode") String gridCode);

	public List<BuildDetailInfo> getBuildDetailInfoType();

	public List<Map<String, Object>> getBroadband(@Param("gridCode") String gridCode);
}
