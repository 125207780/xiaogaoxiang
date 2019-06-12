package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface GridUsrInfoMapper {

	/**
	 * 初始化查询区域总监信息
	 * 
	 * @Title initDirectInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> initDirectInfo(Map<String, Object> params);

	/**
	 * 初始化查询组织机构信息
	 * 
	 * @param string
	 * 
	 * @Title selectOrgnization
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectOrgnization(@Param("orgId") String orgId);

	/**
	 * 初始化查询网格人员信息
	 * 
	 * @Title initGridUsrInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> initGridUsrInfo(Map<String, Object> params);

	/**
	 * 删除网格区域总监信息
	 * 
	 * @Title deleteGridDirectorInfoRepair
	 * @Author xiaogaoxiang
	 * @param params
	 *            void
	 */
	void deleteGridDirectorInfoRepair(Map<String, String> params);

	/**
	 * 新增网格区域总监信息
	 * 
	 * @Title insertGridDirectorInfoRepair
	 * @Author xiaogaoxiang
	 * @param params
	 *            void
	 */
	void insertGridDirectorInfoRepair(Map<String, String> params);

	/**
	 * 新增网格区域总监记录信息
	 * 
	 * @Title insertGridDirectorInfoRecord
	 * @Author xiaogaoxiang
	 * @param gdirMap
	 *            void
	 */
	void insertGridDirectorInfoRecord(Map<String, String> params);

	/**
	 * 查询网格区域总监列表信息
	 * 
	 * @Title getDirectDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getDirectDetail(Map<String, Object> params);

	/**
	 * 查询网格人员列表信息
	 * 
	 * @Title getGridUsrDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getGridUsrDetail(Map<String, Object> params);

	/**
	 * 根据网格类人员Boss工号查询网格人员信息
	 * 
	 * @Title selectGridUsrInfoRepairByUsrBoosCode
	 * @Author xiaogaoxiang
	 * @param string
	 * @return Map<String,Object>
	 */
	Map<String, Object> selectGridUsrInfoRepairByUsrBoosCode(@Param("bossCode") String bossCode);

	/**
	 * 新增网格人员信息
	 * 
	 * @Title insertGridUsrInfoRepair
	 * @Author xiaogaoxiang
	 * @param map
	 *            void
	 */
	void insertGridUsrInfoRepair(Map<String, String> map);

	/**
	 * 根据GRID_CODE查询GRID_DIRECTOR_INFO_REPAIR表中区域总监名称
	 * 
	 * @Title selectGridDirectorInfoRepairByOrgId
	 * @Author xiaogaoxiang
	 * @param string
	 * @return String
	 */
	String selectGridDirectorInfoRepairByOrgId(@Param("orgId") String orgId);

	/**
	 * 修改网格人员信息
	 * 
	 * @Title updateGridUsrInfoRepair
	 * @Author xiaogaoxiang
	 * @param map
	 *            void
	 */
	void updateGridUsrInfoRepair(Map<String, String> map);

	/**
	 * 新增网格人员信息记录表
	 * 
	 * @Title insertGridUsrInfoRecord
	 * @Author xiaogaoxiang
	 * @param gdirMap
	 *            void
	 */
	void insertGridUsrInfoRecord(Map<String, String> gdirMap);

	/**
	 * 根据网格类人员BOSS工号，查询BOSS渠道关联表，将渠道编码，渠道类型重新赋值
	 * 
	 * @Title selectGridUsrChnlInfo
	 * @Author xiaogaoxiang
	 * @param string
	 * @return Map<String,Object>
	 */
	Map<String, Object> selectGridUsrChnlInfo(@Param("bossCode") String bossCode);

}
