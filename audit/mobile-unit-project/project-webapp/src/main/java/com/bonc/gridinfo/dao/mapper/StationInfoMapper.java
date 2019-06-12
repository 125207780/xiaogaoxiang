package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.StationInfo;

/**
 * 基站信息mapper
 * 
 * @author liulin@bonc.com.cn
 *
 */
public interface StationInfoMapper {
	public List<Map<String, Object>> getStationInfo(String stationId);

	public List<StationInfo> getStationInfoList(@Param("stationCodeList") List<String> stationCodeList);

	public void updateStationInfoGridCode(@Param("si") StationInfo si);

	/**
	 * 查询所有基站信息
	 * 
	 * @Title selectAll
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<StationInfo>
	 */
	public List<StationInfo> selectAll(String orgId);

	public Map<String, Object> getImportantAreaInfo(@Param("importantId") String importantId);

}
