package com.bonc.login.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

/**
 * 趋势图 Mapper
 * 
 * @author 祝正佳
 *
 */
public interface IndexMapper {
	/**
	 * 获取进一年线索 涉及金额 数据
	 * 
	 * @param prmMap
	 * @return
	 */
	// List<Map<String,String>> selectTrend(Map<String, String> prmMap);

	/**
	 * 获取涉及机构数量
	 * 
	 * @param prmMap
	 * @return
	 */
	Map<String, String> selectOrgCount(Map<String, String> prmMap);

	/**
	 * 按月获取线索排序数据
	 * 
	 * @param prmMap
	 * @return
	 */
	List<Map<String, String>> selectAuditByCule(Map<String, String> prmMap);

	/**
	 * 按月获取违规金额排序数据
	 * 
	 * @param prmMap
	 * @return
	 */
	List<Map<String, String>> selectAuditByAmount(Map<String, String> prmMap);

	/**
	 * 获取地图 （13个地市数据 线索排序）
	 * 
	 * @param prmMap
	 * @return
	 */
	List<Map<String, Object>> selectMapData(Map<String, String> prmMap);

	/**
	 * 获取线索排名第一的模型的数据
	 * 
	 * @param prmMap
	 * @return
	 */
	Map<String, String> selectTopModel(Map<String, String> prmMap);

	/**
	 * 按月获取模型线索数据
	 * 
	 * @param prmMap
	 * @return
	 */
	Map<String, String> selectUpTopModel(Map<String, String> prmMap);

	/**
	 * 获取一年线索模型数据
	 * 
	 * @param upPrmMap
	 * @return
	 */
	List<Map<String, String>> selectYearTopModel(Map<String, String> upPrmMap);

	/**
	 * 获取线索排名第一的机构数据
	 * 
	 * @param prmMap
	 * @return
	 */
	Map<String, String> selectTopOrg(Map<String, String> prmMap);

	/**
	 * 按月获取机构线索数据
	 * 
	 * @param upOrgPrmMap
	 * @return
	 */
	Map<String, String> selectUpTopOrg(Map<String, String> upOrgPrmMap);

	/**
	 * 获取一年线索机构数据
	 * 
	 * @param yearOrgPrmMap
	 * @return
	 */
	List<Map<String, String>> selectYearTopOrg(Map<String, String> yearOrgPrmMap);

	/**
	 * 获取审计类型下所有模型
	 * 
	 * @param auditType
	 * @return
	 */
	List<Map<String, String>> selectAuditModel(@Param("auditType") String auditType);

	/**
	 * 获取所有审计类型
	 * 
	 * @return
	 */
	List<Map<String, String>> selectAuditTypes();

	/**
	 * 查询处理工单效率最低的机构
	 * 
	 * @param date
	 * @return
	 */
	Map<String, String> selectInefficiencyOrg(Map<String, String> prmMap);

	/**
	 * 获取机构未处理工单数量
	 * 
	 * @param crMonOrgPrmMap
	 * @return
	 */
	Map<String, String> selectInefficiencyOrgUntreatedWorkorder(Map<String, String> crMonOrgPrmMap);

	/**
	 * 获取一年内每个月未处理工单数量
	 * 
	 * @param yearOrderPrmMap
	 * @return
	 */
	List<Map<String, String>> selectYearTopOrder(Map<String, String> yearOrderPrmMap);

	/**
	 * 获取审计模型当月所有线索数量
	 * 
	 * @param prmMap
	 * @return
	 */
	Integer selectAuditModelCule(Map<String, String> prmMap);
}
