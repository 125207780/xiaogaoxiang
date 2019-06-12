package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MapPoi;
import com.bonc.map.dao.entity.OrgDetail;

public interface MapIndexMapper {

	public List<MapPoi> selectByOrgId(String orgId);

	public List<MapPoi> selectByTextLabel(Map<String, String> map);

	public List<MapPoi> selectShapeByOrgId(Map<String, Object> map);

	public List<MapPoi> selectAllShapeByOrgId(String orgId);

	int insertCost(Map<String, Object> map);

	int updataCost(Map<String, Object> map);

	int deleteCost(String orgId);

	List<Map<String, Object>> selectUserByOrgIdAndUserType(Map<String, Object> param);

	List<Map<String, Object>> selectUserByOrgIdAndUserTypeS(Map<String, Object> param);

	List<Map<String, Object>> selectUserOneSale(Map<String, Object> param);

	int selectOrgOrder(String pid);

	List<Map<String, Object>> selectType();

	Map<String, Object> selectOrg(String orgId);

	/**
	 * 插入网格基站信息
	 * 
	 * @param record
	 * @return
	 */
	int insertMapInfo(Map<String, Object> record);

	int insertMapOrg(Map<String, Object> record);

	/**
	 * 查询网格轮廓信息
	 * 
	 * @Title selectGridByPid
	 * @Author xiaogaoxiang
	 * @param pid
	 * @return List<MapInfo>
	 */
	List<MapInfo> selectGridByPid(String pid);

	/**
	 * 查询小区轮廓信息
	 * 
	 * @Title selectCommunityGridByPid
	 * @Author xiaogaoxiang
	 * @param pid
	 * @return List<MapInfo>
	 */
	public List<MapInfo> selectCommunityGridByPid(@Param("pid") String pid);

	int updateMapInfo(Map<String, Object> record);

	int updateMapOrg(Map<String, Object> record);

	int deleteUser(Map<String, Object> record);

	int deleteUserS(Map<String, Object> record);

	int deleteUserOne(String OA_ID, String orgId);

	int updateGridUser(Map<String, Object> record);

	int deleteMapInfo(String orgId);

	int deleteMapOrg(String orgId);

	int deleteMapUser(String orgId);

	int deleteMapRoleSyss(String orgId);

	int deleteSysUser(String orgId);

	/**
	 * 根据小区编码删除小区轮廓信息
	 * 
	 * @Title deleteCommunity
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	public void deleteCommunity(String cellId);

	List<OrgDetail> getOrgDetail(String orgId);

	double selectDayCost(Map<String, Object> param);

	int selectCustomCost(Map<String, Object> param);

	int selectVillageCost(Map<String, Object> param);

	int selectGroupCost(Map<String, Object> param);

	int updateMapBdPoi(Map<String, Object> record);

	int updateChannelInfo(Map<String, Object> record);

	int updateStationInfo(Map<String, Object> record);

	int deleteUpdateMapBdPoi(Map<String, String> record);

	int deleteUpdateChannelInfo(Map<String, String> record);

	int deleteUpdateStationInfo(Map<String, String> record);

	int UpdateCompleteMap(Map<String, Object> map);

	List<Map<String, Object>> getChannelByShape(Map<String, Object> param);

	List<Map<String, Object>> getPoiByShape(Map<String, Object> param);

	List<Map<String, Object>> getStationByShape(Map<String, Object> param);
	
	List<Map<String, Object>> getDataByShapeList(Map<String, Object> param);
	
	List<Map<String, Object>> getImportantCommunityByShape(Map<String, Object> param);

	List<Map<String, Object>> getCommunityByShape(Map<String, Object> param);

	List<Map<String, Object>> getNonCommunityByShape(Map<String, Object> param);

	List<Map<String, Object>> getAllABGroupByShape(Map<String, Object> param);

	List<Map<String, Object>> getAllCDGroupByShape(Map<String, Object> param);

	List<Map<String, Object>> getNonABGroupByShape(Map<String, Object> param);

	List<Map<String, Object>> getNonCDGroupByShape(Map<String, Object> param);

	List<Map<String, Object>> getGridSchoolByShape(Map<String, Object> param);

	List<Map<String, Object>> getOfficeBuildingByShape(Map<String, Object> param);

	List<Map<String, Object>> getGovernmentUnitByShape(Map<String, Object> param);

	Map<String, Object> initPage(@Param("orgId") String orgId);

	List<Map<String, String>> getChannel(Map<String, Object> param);

	List<Map<String, String>> getIncome(Map<String, String[]> param);

	List<Map<String, String>> getCustomer(Map<String, String[]> param);

	List<Map<String, String>> getVillage(Map<String, String[]> param);

	List<Map<String, String>> getVipCustomer(Map<String, String[]> param);

	List<Map<String, String>> getStation(Map<String, String[]> param);

	List<Map<String, String>> getErr(@Param("orgId") String orgId);

	List<Map<String, String>> initName(@Param("orgId") String orgId);

	List<Map<String, String>> getCountryGrid(Map<String, Object> map);

	List<Map<String, Object>> getStationGrid(Map<String, Object> map);

	List<Map<String, Object>> selectUser(Map<String, Object> param);

	List<Map<String, Object>> initsale_user(Map<String, String> param);

	List<Map<String, Object>> selectUsers(Map<String, String> param);

	List<Map<String, Object>> selectUserOne(String OA_ID);

	Map<String, Object> selectUserOnes(String LOGIN_ID);

	Map<String, Object> selectUserBYuid(String UID);

	int deleteMapRoleSys(Map<String, Object> param);

	int deleteMapSYS(Map<String, Object> param);

	int insertSYS(String OA_ID);

	int insertMapSYS(Map<String, Object> record);

	Map<String, Object> selectCountSYS(String OA_ID);

	int insertMapUser(Map<String, Object> record);

	int insertbusiManagerOrg(Map<String, Object> record);

	void CallDb2(Map<String, Object> map);

	List<Map<String, String>> selectGridUserLoginAndOA(Map<String, String> param);

	/**
	 * 根据工号编码查询网格直销经理信息
	 * 
	 * @Title selectDirectSaleByOfficeId
	 * @Author xiaogaoxiang
	 * @param officeId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectDirectSaleByOfficeId(@Param("officeId") String officeId);

	/**
	 * 根据工号编码，修改网格直销经理信息
	 * 
	 * @Title updateDirectSaleByOfficeId
	 * @Author xiaogaoxiang
	 * @param map
	 *            void
	 */
	public void updateDirectSaleByOfficeId(Map<String, Object> map);

	/**
	 * 新增网格直销经理信息
	 * 
	 * @Title insertDirectSale
	 * @Author xiaogaoxiang
	 * @param map
	 *            void
	 */
	public void insertDirectSale(Map<String, Object> map);

	/**
	 * 查询网格直销经理信息
	 * 
	 * @Title getDirectSaleInfo
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getDirectSaleInfo(@Param("list") List<String> orgIds);

	/**
	 * 更改直销经理状态
	 * 
	 * @Title updateDirectSaleByOfficeId
	 * @Author xiaogaoxiang
	 * @param cntyId
	 *            void
	 * @param statusType
	 */
	public void updateDirectSaleStatus(@Param("officeId") String officeId, @Param("statusType") String statusType);

	/**
	 * 根据CD类政企客户编码查询 @Title selectGovBusByOfficeId @Author hubinbin @return
	 * Map<String,Object> @throws
	 */
	public Map<String, Object> selectGovBusByOfficeId(@Param("gcCode") String gcCode);

	/**
	 * 根据CD类政企客户编码更新 @Title updateGovBusByOfficeId @Author hubinbin @return
	 * void @throws
	 */
	public void updateGovBusByOfficeId(Map<String, Object> map);

	/**
	 * 新增客户信息 @Title insertGovBus @Author hubinbin @return void @throws
	 */
	public void insertGovBus(Map<String, Object> map);

	/**
	 * 查询网格直销经理信息
	 * 
	 * @Title getGovBusInfo
	 * @Author hubinbin
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getGovBusInfo(@Param("orgId") String orgId);

	/**
	 * 根据条件查询直销网格经理信息
	 * 
	 * @param orgId
	 * @param inGrid
	 * @return List<Map<String, Object>>
	 */
	public List<Map<String, Object>> selectDirectSaleInfoByParams(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel,
			@Param("ingrid") String inGrid);

	/**
	 * 移除所有对应officeid的直销人员的网格
	 * 
	 * @Author liupeidong
	 * @param idList
	 */
	public void removeDirectSaleGrid(@Param("ids") List<String> idList);

	/**
	 * 根据orgid查询网格
	 * 
	 * @Author liupeidong
	 * @param orgid
	 * @return
	 */
	public List<Map<String, Object>> selectGridByOrgid(@Param("orgid") String orgid);

	/**
	 * 根据officeid设置人员渠道
	 * 
	 * @author liuepdiong
	 * @param gridname
	 * @param gridcode
	 * @param lat
	 * @param ids
	 */
	public void updateDirectSaleChannel(@Param("gridname") String gridname, @Param("gridcode") String gridcode, @Param("chnlName") String chnlName,
			@Param("chnlCode") String chnlCode, @Param("lon") String lon, @Param("lat") String lat, @Param("ids") List<String> ids);

	/**
	 * 根据条件查询CD政企客户信息
	 * 
	 * @param orgId
	 * @param inGrid
	 * @return List<Map<String, Object>>
	 */
	public List<Map<String, Object>> selectGovBusInfoByParams(@Param("orgId") String orgId, @Param("ingrid") String inGrid);

	/**
	 * 根据gcCode设置人员网格
	 * 
	 * @author hubinbin
	 * @param gridname
	 * @param gridcode
	 * @param ids
	 */
	public void addGovBusGrid(@Param("gridname") String gridname, @Param("gridcode") String gridcode, @Param("ids") List<String> ids);

	/**
	 * 移除所有对应gc_code的直销人员的网格
	 * 
	 * @Author hubinbin
	 * @param idList
	 */
	public void removeGovBusGrid(@Param("ids") List<String> idList);

	/**
	 * 根据渠道编码查询网格名称编码和渠道经纬度
	 * 
	 * @author liupeidong
	 * @param channelCode
	 * @return
	 */
	public Map<String, Object> queryGridNameCodeAndLonLatByCnlCode(@Param("channelCode") String channelCode);

	/**
	 * 根据orgid查询渠道
	 * 
	 * @Author liupeidong
	 * @param orgid
	 * @return
	 */
	public List<Map<String, Object>> selectChannelByOrgid(@Param("orgids") String[] orgids);

	/**
	 * 根据orgId查询基站
	 * 
	 * @Title selectStationByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectStationByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据OrgId查询小区
	 * 
	 * @Title selectCommunityByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectCommunityByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据OrgId查询AB集团
	 * 
	 * @Title selectAbGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectAbGroupByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据OrgId查询CD集团
	 * 
	 * @Title selectCdGroupByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectCdGroupByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据OrgId查询渠道
	 * 
	 * @Title selectChannelByOrgIdNew
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectChannelByOrgIdNew(@Param("orgId") String orgId);

	/**
	 * 根据渠道编码查询渠道信息
	 * 
	 * @Title selectChannelByChannelCode
	 * @Author xiaogaoxiang
	 * @param channelCode
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectChannelByChannelCode(@Param("chnlCode") String channelCode);

	/**
	 * 根据基站名称查询基站信息
	 * 
	 * @Title selectChannelByStationName
	 * @Author xiaogaoxiang
	 * @param stationName
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectChannelByStationName(@Param("stationName") String stationName);

	/**
	 * 根据小区Id查询小区信息
	 * 
	 * @Title selectCommunityByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectCommunityByCellId(@Param("cellId") String cellId);

	/**
	 * 根据AB集团id，查询AB集团信息
	 * 
	 * @Title selectAbGroupByAbId
	 * @Author xiaogaoxiang
	 * @param abId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectAbGroupByAbId(@Param("abId") String abId);

	/**
	 * 根据CD集团id，查询CD集团信息
	 * 
	 * @Title selectCdGroupByCdId
	 * @Author xiaogaoxiang
	 * @param cdId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectCdGroupByCdId(@Param("cdId") String cdId);

	/**
	 * 根据小区的编码查询小区信息
	 * 
	 * @Title selectTaDtCellMGxhByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectTaDtCellMGxhByCellId(@Param("cellId") String cellId);

	/**
	 * 小区轮廓信息保存
	 * 
	 * @Title insertCommunity
	 * @Author xiaogaoxiang
	 * @param record
	 *            void
	 */
	public void insertCommunity(Map<String, Object> map);

	/**
	 * 修改小区轮廓信息
	 * 
	 * @Title updateCommunity
	 * @Author xiaogaoxiang
	 * @param record
	 *            void
	 */
	public void updateCommunity(Map<String, Object> map);

	/**
	 * 根据cellId查询小区信息
	 * 
	 * @Title selectCommunityCreateByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @param statisMonth
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectCommunityCreateByCellId(@Param("cellId") String cellId, @Param("statisMonth") String statisMonth);

	/**
	 * 根据cellId查询小区信息（修改）
	 * 
	 * @Title selectCommunityEditByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> selectCommunityEditByCellId(@Param("cellId") String cellId);

	/**
	 * 根据cellId查询小区shape
	 * 
	 * @Title selectCommunityShapeByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	public String selectCommunityShapeByCellId(@Param("cellId") String cellId);

	/**
	 * 根据cellId查询小区shapeGxh
	 * 
	 * @Title selectCommunityShapeGxhByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	public String selectCommunityShapeGxhByCellId(@Param("cellId") String cellId);

	/**
	 * 更新GridUser信息，条件OrgId和userType=3
	 * 
	 * @Title updateGridUserByOrgIdAndUserType
	 * @Author xiaogaoxiang
	 * @param map
	 *            void
	 */
	public void updateGridUserByOrgIdAndUserType(Map<String, Object> map);

}
