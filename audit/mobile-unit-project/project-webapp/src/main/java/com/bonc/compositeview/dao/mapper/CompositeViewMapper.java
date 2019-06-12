package com.bonc.compositeview.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

/**
 * 
 * @FileName CompositeViewMapper.java
 * @Author xiaogaoxiang
 * @At 2019年3月3日 下午8:19:05
 * @Desc 综合视图Mapper
 */
public interface CompositeViewMapper {
	/**
	 * 查询综合视图网格信息概述
	 * 
	 * @Title getGridInfo
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getGridInfo(@Param("orgId") String orgId);

	/**
	 * 查询网格分类规模数据
	 * 
	 * @Title getGridType
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getGridType(@Param("orgId") String orgId);

	/**
	 * 查询综合视图渠道基站信息和指标资源情况
	 * 
	 * @Title getChannelStationAndIndicators
	 * @Author hubinbin
	 * @return Map<String,String>
	 */
	Map<String, String> getChannelStation(String orgId);

	Map<String, String> getIndicators(String orgId);

	/**
	 * 查询综合视图用户规模概览
	 * 
	 * @Title getScaleAndMonitoring
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getScale(@Param("orgId") String orgId);

	/**
	 * 查询综合视图运营监控一览
	 * 
	 * @Title getScaleAndMonitoring
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getMonitoring(@Param("orgId") String orgId);

	/**
	 * 查询综合视图任务资源概况
	 * 
	 * @Title getTaskSituation
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getTaskSituation(@Param("orgId") String orgId);

	/**
	 * 查询综合视图考核得分
	 * 
	 * @Title getAssessmentScore
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getAssessmentScore(@Param("orgId") String orgId,
			@Param("orgLevel") String orgLevel);

	/**
	 * 查询前五和后五排名数据
	 * 
	 * @Title getTopScale
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getTopScale(Map<String, Object> params);

	/**
	 * 获取渠道规模top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getChnlTop(@Param("orgId") String orgId,
			@Param("orgLevel") String orgLevel,
			@Param("gridType") String gridType);

	/**
	 * 获取基站规模top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getStatTop(@Param("orgId") String orgId,
			@Param("orgLevel") String orgLevel,
			@Param("gridType") String gridType);

	/**
	 * 获取语音规模top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getVoiceTop(@Param("orgId") Integer orgId,
			@Param("orgLevel") String orgLevel,
			@Param("gridType") String gridType);

	/**
	 * 网格信息数据查询
	 * 
	 * @Title gridInfos
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	Map<String, Object> gridInfos(@Param("orgId") String orgId);
	/**
	 * 地市信息数据查询
	 * 
	 * @Title cityInfos
	 * @Author caoxiaojuan
	 * @param orgId
	 * @return Map<String,Object>
	 */
	Map<String, Object> cityInfos(@Param("orgId") String orgId,@Param("orgLevel") String orgLevel);
	
	/**
	 * 网格信息more
	 * 
	 * @param
	 * @param
	 * @return
	 */
	public List<Map<String, Object>> getGridInfoMore(Map<String, Object> params);

	/**
	 * 获取直销人员信息more
	 * 
	 * @param
	 * @param
	 * @return
	 */
	public List<Map<String, Object>> getDirectorInfofoMore(Map<String, Object> params);

	/**
	 * 获取网格分类信息more
	 * 
	 * @param
	 * @param
	 * @return
	 */
	public List<Map<String, Object>> getGridTypeMore(Map<String, Object> param);

	/**
	 * 获取任务资源概述详情
	 * 
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> getTaskSituationDetail(Map<String, Object> params);
	/**
	 * 获取用户规模概况详情
	 * 
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> customersMore(Map<String, Object> params);
	/**
	 * 获取指标资源情况
	 * 
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> IndicatorsMore(Map<String, Object> params);
	
	/**
	 * 获取运营监控一览More
	 * 
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> monitoringMore(Map<String, Object> params);
	
	/**
	 * 获取考核得分More
	 * 
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> assessmentScoreMore(Map<String, Object> params);
	
	/**
	 * 根据pid查询组织机构信息
	 * 
	 * @param orgId
	 * @return
	 */
	List<Map<String, Object>> getAreaInfoByPId(@Param("orgId") String orgId);

	/**
	 * 根据pid查询组织机构信息
	 * 
	 * @param orgId
	 * @return
	 */
	public List<Map<String, Object>> channelStationInfoMore(Map<String, Object> parm);

	/**
	 * 通过网格编号查询渠道信息
	 * 
	 * @param gridCode
	 * @return
	 */
	List<Map<String, Object>> getChnlInfoByGridCode(
			@Param("gridCode") String gridCode);
	
	/**
	 * 通过id获取地区信息
	 * @param orgId
	 * @return
	 */
	Map<String, Object> getAreaInfoById(@Param("orgId") String orgId);

	/**
	 * 根据当前区县id,查询出现浮动框：网格名称、客户数、收入、渠道数、基站数、小区数、AB集团数、
	 * CD集团数、重点小区数、端口数、分纤箱数、光交箱数等信息
	 * 
	 * @Title initAreaDataByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> initAreaDataByOrgId(String orgId);
}
