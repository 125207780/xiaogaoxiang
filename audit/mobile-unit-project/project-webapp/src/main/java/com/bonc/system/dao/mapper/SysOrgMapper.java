package com.bonc.system.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.system.dao.entity.SysOrg;

public interface SysOrgMapper {

	List<SysOrg> selectList(SysOrg sysOrg);

	SysOrg selectSysOrgById(String orgId);

	Boolean insertSysOrg(SysOrg sysOrg);

	Boolean updateSysOrg(SysOrg sysOrg);

	Boolean deleteSysOrgByTreeCode(String treeCode);

	Integer selectCheck(SysOrg sysOrg);

	String selectSysOrgUserOne(String orgId);

	int deleteSysOrgUser(String orgId);

	int deleteSysOrgUserRole(String userId);

	List<SysOrg> checkGridName(@Param("gridNames") List<String> gridNames);

	/**
	 * 根据组织编码，查询该组织下基站最大排序号的组织信息
	 * 
	 * @param orgId
	 * @return
	 */
	SysOrg selectMaxDisplayOrderSysOrgInfo(@Param("orgId") String orgId);

	/**
	 * 查询orgId下一级的子节点信息
	 * 
	 * @Title selectNextChildrenSysOrg
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<SysOrg>
	 */
	List<SysOrg> selectNextChildrenSysOrg(String orgId);

	/**
	 * 查询市的信息
	 * 
	 * @Title selectCityInfo
	 * @Author xiaogaoxiang
	 * @return List<SysOrg>
	 */
	List<SysOrg> selectCityInfo();

	/**
	 * SYS_ORG_POLYGON表中，根据根据orgid更新shape字段
	 * 
	 * @Title updateSysOrgDetail
	 * @Author xiaogaoxiang
	 * @param si
	 *            void
	 */
	void updateSysOrgDetail(StationInfo si);

	/**
	 * 根据orgId删除对应的行政边界区域信息
	 * 
	 * @Title deleteSysOrgDetailByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 *            void
	 */
	void deleteSysOrgDetailByOrgId(String orgId);

	/**
	 * 新增SYS_ORG_DETAIL信息
	 * 
	 * @Title insertSysOrgDetail
	 * @Author xiaogaoxiang
	 * @param mapInfo
	 *            void
	 */
	void insertSysOrgDetail(Map<String, Object> mapInfo);

	/**
	 * 根据orgId查询SYS_ORG_DETAIL信息f
	 * 
	 * @Title selectSysOrgDetailByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	Map<String, Object> selectSysOrgDetailByOrgId(@Param("orgId") String orgId);

	/**
	 * 查询所有组织信息
	 * 
	 * @Title selectAllSysOrg
	 * @Author xiaogaoxiang
	 * @return List<SysOrg>
	 */
	List<SysOrg> selectAllSysOrg();

	/**
	 * 根据父节点查询子节点信息
	 * 
	 * @Title getChildrenSysOrgByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<SysOrg>
	 */
	List<SysOrg> getChildrenSysOrgByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据子节点查询父节点信息
	 * 
	 * @Title getParentSysOrgByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<SysOrg>
	 */
	List<SysOrg> getParentSysOrgByOrgId(@Param("pid") String pid);

	/**
	 * 获取所有区县信息
	 * 
	 * @Title selectCntySysOrg
	 * @Author xiaogaoxiang
	 * @return List<SysOrg>
	 */
	List<SysOrg> selectCntySysOrg();

	/**
	 * 根据父级id集合，查询子节点集合
	 * 
	 * @Title getChildrenSysOrgByOrgIds
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @param gridType
	 * @return List<SysOrg>
	 */
	List<SysOrg> getChildrenSysOrgByOrgIds(@Param("orgIds") List<String> orgIds, @Param("gridType") String gridType);
}
