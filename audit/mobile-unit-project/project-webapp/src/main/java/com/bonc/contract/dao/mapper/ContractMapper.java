package com.bonc.contract.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ContractMapper {

	List<Map<String, Object>> getIndexGridList(String pid);

	List<Map<String, Object>> getIndexChannelList(String gridCode);

	List<Map<String, Object>> getIndexTable(Map<String, Object> param);

	/**
	 * 初始化查询渠道包保信息
	 * 
	 * @Title initContractInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> initContractInfo(Map<String, Object> params);

	/**
	 * 初始化包保小区统计查询
	 * 
	 * @Title initContractAnalysis
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> initContractAnalysis(Map<String, Object> params);

	/**
	 * 初始化包保小区统计饼图查询
	 * 
	 * @Title initContractEchart
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	Map<String, Object> initContractEchart(Map<String, Object> params);

	/**
	 * 根据当前登录用户的组织编码，查询对应的渠道信息
	 * 
	 * @Title selectChannelInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectChannelInfoByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据当前登录用户的组织编码，查询对应的宽带小区信息
	 * 
	 * @Title selectCellInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectCellInfoByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据当前登录用户的组织编码，查询对应的宽带小区信息
	 * 
	 * @Title selectCellInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> exportContractAnalysis(@Param("orgId") String orgId, @Param("orgLevel") int orgLevel);

	/**
	 * 小区编码查询是否有重复记录
	 * 
	 * @Title selectRpGridResponsibilityByCellCode
	 * @Author xiaogaoxiang
	 * @param cellCode
	 * @return Map<String,Object>
	 */
	Map<String, Object> selectRpGridResponsibilityByCellCode(@Param("cellCode") String cellCode);

	/**
	 * 新增宽带小区渠道信息
	 * 
	 * @Title insertRpGridResponsibility
	 * @Author xiaogaoxiang
	 * @param m
	 *            void
	 */
	void insertRpGridResponsibility(Map<String, String> m);

	/**
	 * 修改宽带小区渠道信息
	 * 
	 * @Title updateRpGridResponsesibility
	 * @Author xiaogaoxiang
	 * @param m
	 *            void
	 */
	void updateRpGridResponsesibility(Map<String, String> m);

	/**
	 * 查询渠道包保明细
	 * 
	 * @Title getContractDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getContractDetail(Map<String, Object> params);

	/**
	 * 根据基站小区编码，查询基站小区信息
	 * 
	 * @Title selectStationCellByCellCode
	 * @Author xiaogaoxiang
	 * @param cellCode
	 * @return Map<String,Object>
	 */
	List<String> selectStationCellByCellCode(@Param("cellCode") String cellCode);

}
