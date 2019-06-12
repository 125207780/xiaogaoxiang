package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.system.dao.entity.SysOrg;

public interface GridCommonMapper {

	List<SysOrg> selectList(SysOrg po);

	List<MapInfo> selectSysOrgPolygon(String orgId);

	/**
	 * 得到该区县下的所有小区轮廓
	 * 
	 * @Title getCommunityShapeByGriCode
	 * @Author xiaogaoxiang
	 * @param paramMap
	 * @return List<MapInfo>
	 */
	List<MapInfo> getCommunityShapeByGriCode(Map<String, String> map);

	/**
	 * 得到该区县下所有网格轮廓
	 * 
	 * @Title getShapeByGriCode
	 * @Author xiaogaoxiang
	 * @param map
	 * @return List<MapInfo>
	 */
	List<MapInfo> getShapeByGriCode(Map<String, String> map);

	/**
	 * 初始化查询所有渠道信息（本地数据库查询）
	 * 
	 * @Title selectAllChannelByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllChannelByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有基站信息（本地数据库查询）
	 * 
	 * @Title selectAllStationByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllStationByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有超市，商铺信息（本地数据库查询）
	 * 
	 * @Title selectAllMallByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllMallByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有校园信息（本地数据库查询）
	 * 
	 * @Title selectAllNewSchoolByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllNewSchoolByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有村庄信息（本地数据库查询）
	 * 
	 * @Title selectAllVillageByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllVillageByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有乡镇信息（本地数据库查询）
	 * 
	 * @Title selectAllTownByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllTownByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有聚类市场信息（本地数据库查询）
	 * 
	 * @Title selectAllMarketByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllMarketByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有AB集团
	 * 
	 * @Title selectAllAbGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */

	List<MapPoi> selectAllAbGroupByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有CD集团
	 * 
	 * @Title selectAllCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllCdGroupByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有入格小区
	 * 
	 * @Title selectAllCommunityInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllCommunityInfoByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有未入格小区
	 * 
	 * @Title selectAllNonCommunityInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllNonCommunityInfoByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有未入格AB集团
	 * 
	 * @Title selectAllNonAbGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllNonAbGroupByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有未入格CD集团
	 * 
	 * @Title selectAllNonCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllNonCdGroupByOrgId(@Param("orgIds") List<String> orgIds);
	/**
	 * 初始化查询所有写字楼信息
	 * 
	 * @Title selectAllNonCdGroupByOrgId
	 * @Author caoxiaojuan
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllOfficeBuildingOrgId(@Param("orgIds") List<String> orgIds);
	/**
	 * 初始化查询所有政府单位信息
	 * 
	 * @Title selectAllGovernmentUnitOrgId
	 * @Author caoxiaojuan
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllGovernmentUnitOrgId(@Param("orgIds") List<String> orgIds);
	/**
	 * 初始化查询重点小区信息
	 * 
	 * @Title selectAllNonCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllImportantCommunityByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 初始化查询所有网格学校
	 * 
	 * @Title selectGridSchoolOrgId
	 * @Author caoxiaojuan
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectGridSchoolOrgId(@Param("orgIds") List<String> orgIds);

	List<String> initSearchName(String orgId);

	List<String> initSearchPlaceName(Map<String, String> ParamMap);

	List<MapPoi> selectSearchList(Map<String, String> map);

	List<MapPoi> selectAllPoiByOrgId(String orgId);

	/**
	 * 查询所有基础单元信息
	 * 
	 * @Title selectAllPoiByOrgIds
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllPoiByOrgIds(String orgId);

	/**
	 * 查询小区信息
	 * 
	 * @Title selectCommunityPoiByOrgIds
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectCommunityPoiByOrgIds(String orgId);

	List<MapPoi> selectAreaShape(String orgId);

	Map<String, String> selectHouse(String physical_id);

	Map<String, String> selectSchool(String physical_id);

	Map<String, String> selectSchoolOrHouse(String uid);

	MapPoi selectPoiByUid(String uid);

	List<MapPoi> selectSchoolPoi(Map<String, String> map);

	List<MapPoi> selectAoiIdxNum(Map<String, String> map);

	/**
	 * 当选择的网格信息为全部时，则根据当前登录人orgId查询所有网格信息
	 * 
	 * @Title selectGridInfoByPid
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<SysOrg>
	 */
	List<SysOrg> selectGridInfoByPid(@Param("orgId") String orgId);

	/**
	 * 当选择的网格信息不为空时，则根据当前选择的网格编码查询网格信息
	 * 
	 * @Title selectGridInfoByGridCode
	 * @Author xiaogaoxiang
	 * @param gridCode
	 * @return List<SysOrg>
	 */
	List<SysOrg> selectGridInfoByGridCode(@Param("orgId") String gridCode);

	/**
	 * 根据归属网格，查询所有的渠道信息(已入格)
	 * 
	 * @Title selectChannelByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectChannelByGridCodes(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有的渠道信息（未入格）
	 * 
	 * @Title selectChannelByGridCodesNotEnter
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectChannelByGridCodesNotEnter(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有的基站信息（已入格）
	 * 
	 * @Title selectStationByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectStationByGridCodes(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有的基站信息(未入格)
	 * 
	 * @Title selectStationByGridCodesNotEnter
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectStationByGridCodesNotEnter(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有小区信息（已入格）
	 * 
	 * @Title selectCommunityByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectCommunityByGridCodes(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有小区信息(未入格)
	 * 
	 * @Title selectCommunityByGridCodesNotEnter
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectCommunityByGridCodesNotEnter(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有楼宇信息（已入格）
	 * 
	 * @Title selectBuildingByGridCodes
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectBuildingByGridCodes(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有楼宇信息(未入格)
	 * 
	 * @Title selectBuildingByGridCodesNotEnter
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectBuildingByGridCodesNotEnter(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有网格信息（已入格）
	 * 
	 * @param orgIds
	 * @return
	 */
	List<Map<String, Object>> selectGridInfoByGridCodes(Map<String, Object> map);

	/**
	 * 根据归属网格，查询所有网格信息（未入格）
	 * 
	 * @param orgId
	 * @return
	 */
	List<Map<String, Object>> selectGridInfoByGridCodesNotEnter(Map<String, Object> map);

	/**
	 * 查询AB集团或则CD集团信息
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> selectGroupInfoByGridCodes(Map<String, Object> map);
	/**
	 * 查询CD集团信息
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> selectCDGroupInfoByGridCodes(Map<String, Object> map);
	/**
	 * 导出已入格CD集团信息
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> selectZYGLCDGroupInfoByGridCodes(Map<String, Object> map);

	
	/**
	 * 查询AB或集团信息(未入格)
	 * 
	 * @param orgId
	 * @return
	 */
	List<Map<String, Object>> selectABGroupInfoByGridCodesNotEnter(Map<String, Object> map);
	/**
	 * 查询CD集团信息(未入格)
	 * 
	 * @param orgId
	 * @return
	 */
	List<Map<String, Object>> selectCDGroupInfoByGridCodesNotEnter(Map<String, Object> map);

	/**
	 * 根据orgIds查询Shapes (list为多个orgId集合)
	 * 
	 * @Title selectSysOrgPolygons @Author hubinbin @return
	 *        List<List<MapInfo>> @throws
	 */
	List<MapInfo> selectSysOrgPolygons(List<String> list);

	/**
	 * 鍒濆鍖栨煡璇㈡墍鏈夋湭鍏ユ牸灏忓尯淇℃伅锛堟湰鍦版暟鎹簱鏌ヨ锛�
	 * 
	 * @Title selectAllNonCommunityByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllNonCommunityByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 鍒濆鍖栨煡璇㈡墍鏈夋湭鍏ユ牸娓犻亾淇℃伅锛堟湰鍦版暟鎹簱鏌ヨ锛�
	 * 
	 * @Title selectAllNonChannelByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllNonChannelByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 鍒濆鍖栨煡璇㈡墍鏈夋湭鍏ユ牸鍩虹珯淇℃伅锛堟湰鍦版暟鎹簱鏌ヨ锛�
	 * 
	 * @Title selectAllNonStationByOrgId
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<MapPoi>
	 */
	List<MapPoi> selectAllNonStationByOrgId(@Param("orgIds") List<String> orgIds);

	/**
	 * 根据地市新orgId查询其对应老orgId
	 * 
	 * @Title getOldOrgId @Author hubinbin @return String @throws
	 */
	String getOldOrgId(Object orgId);

	/**
	 * 网格划配时判断该网格信息是否被修改
	 * 
	 * @Title selectGridDetail @Author caoxiaojuan @return String @throws
	 */
	List<MapInfo> selectGridDetail(@Param(value = "orgId") String orgId);

	/**
	 * 查询小方格
	 * 
	 * @param orgId
	 * @return
	 */
	List<Map<String, Object>> getSmallArea(String orgId);
}
