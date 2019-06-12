package com.bonc.gridinfo.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.BuildingInfo;

/**
 * 楼宇信息mapper
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public interface BuildingInfoMapper {

	/**
	 * 查询楼宇信息
	 * 
	 * @return
	 */
	public List<BuildingInfo> getBuildingInfo(BuildingInfo buildingInfo);

	public List<BuildingInfo> selectAll(@Param("gridCode") String gridCode, @Param("buildingName") String buildingName);
}
