package com.bonc.gridinfo.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.BasicUnitInfo;

/**
 * 基础单元信息mapper
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public interface BasicUnitInfoMapper {

	/**
	 * 查询基础单元信息
	 * 
	 * @return
	 */
	public List<BasicUnitInfo> getBasicUnitInfo(BasicUnitInfo basicUnitInfo);

	/**
	 * 根据id查询单条信息
	 * 
	 * @return
	 */
	public BasicUnitInfo selectBasicUnitInfoById(String physicalGridCode);

	public List<BasicUnitInfo> selectAll(@Param("gridCode") String gridCode, @Param("physicalName") String physicalName, @Param("bigType") String bigType,
			@Param("physicalType") String physicalType);

	public List<BasicUnitInfo> getTypeInfo(String gridCode);

	public List<BasicUnitInfo> getTypeRatioInfo(@Param("gridCode") String gridCode, @Param("bigType") String bigType);

	public List<BasicUnitInfo> getBigTypeInfo(String gridCode);

	public List<Map<String, Object>> getFirstType();

	public List<Map<String, Object>> getSecondType(String conditionCode);

	/**
	 * 查询所有商场信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectMallAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectMallAll(@Param("orgId") String orgId);

	/**
	 * 查询小区信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectCommunityAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectCommunityAll(@Param("orgId") String orgId);

	/**
	 * 查询校园信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectSchoolAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectSchoolAll(@Param("orgId") String orgId);

	/**
	 * 查询村庄信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectVillageAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectVillageAll(@Param("orgId") String orgId);

	/**
	 * 查询乡镇信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectTownAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectTownAll(@Param("orgId") String orgId);

	/**
	 * 查询市场信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectMarketAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectMarketAll(@Param("orgId") String orgId);

	/**
	 * 根据physicalId查询信息
	 * 
	 * @Title selectBasicUnitInfoByPhysicalId
	 * @Author xiaogaoxiang
	 * @param physicalId
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectBasicUnitInfoByPhysicalId(String physicalId);
}
