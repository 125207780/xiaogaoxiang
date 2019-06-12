package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.GridInfo;
import com.bonc.gridinfo.dao.entity.OrgGridStation;

/**
 * 基站与网格信息mapper
 * 
 * @author liulin@bonc.com.cn
 *
 */
public interface GridStationMapper {

	/**
	 * 根据区县机构id查询所有网格信息
	 * 
	 * @param orgId
	 * @return
	 */
	public List<GridInfo> getGridInfo(@Param("areaId") String areaId, @Param("gridName") String gridName);

	/**
	 * 查询当前基站下的网格
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	public List<OrgGridStation> getGridStationtInfo(@Param("areaId") String areaId, @Param("gridCode") String gridCode);

	public List<OrgGridStation> getGridDeptInfoByName(@Param("areaId") String areaId, @Param("stationName") String stationName);

	/**
	 * 根据网格名称查询未加入基站下的网格
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	public List<Map<String, Object>> getNoGridStation(@Param("areaId") String areaId, @Param("stationName") String stationName);

	/**
	 * 移除单个网格
	 * 
	 * @param orgId
	 * @param gridCode
	 * @param saleDeptCode
	 * @return
	 */
	public void removeSingleGrid(@Param("updateDate") String updateDate, @Param("areaId") String areaId, @Param("gridCode") String gridCode,
			@Param("stationCode") String stationCode);

	/**
	 * 获取上一级机构信息
	 * 
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> getParenOrg(String areaId);

	/**
	 * 加入基站
	 * 
	 * @param orgGridDepartment
	 */
	public void addSingleGrid(OrgGridStation OrgGridStation);

	/**
	 * 基站关系维护修改，重跑程序更新数据
	 * 
	 * @param orgGridDepartment
	 */
	void CallDb2GXWH(Map<String, Object> map);

	int saveImportData(@Param(value = "orgGridStation") OrgGridStation orgGridStation);

	int updateImportData(@Param(value = "orgGridStation") OrgGridStation orgGridStation);

	public String findByStationCode(String stationCode);

	public String findByStationInfo(String stationCode);

	public Map<String, String> findGridCodeByName(@Param("gridName") String gridName, @Param("orgId") String orgId);

	public String findStationTypeByStationCode(@Param("stationCode") String stationCode, @Param("orgId") String orgId);

}
