package com.bonc.dataVisualization.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.github.pagehelper.Page;

public interface DataVisualizationMapper2 {
	/**
	 * 获取指标大类
	 * 
	 * @return
	 */
	public List<Map<String, Object>> getBigType();

	/**
	 * 获取指标小类
	 * 
	 * @param kpiType
	 * @return
	 */
	public List<Map<String, Object>> getSmallType(@Param("kpiType") String kpiType);

	/**
	 * 网格规模
	 * 
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> getGridScale(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel);

	/**
	 * 渠道规模
	 * 
	 * @param orgId
	 * @param parentId
	 * @return
	 */
	public Map<String, Object> getChnlScale(@Param("orgId") String orgId, @Param("parentId") String parentId);

	/**
	 * 基站规模
	 * 
	 * @param orgId
	 * @param parentId
	 * @return
	 */
	public List<Map<String, Object>> getStationScale(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel);

	/**
	 * kpi指标量 同比 环比
	 * 
	 * @param orgIds
	 * @param orgCode
	 * @param statisDate
	 * @param kpiCode
	 * @return
	 */
	public List<Map<String, Object>> getKpiRatio(@Param("orgId") String orgId, @Param("kpiCode") String kpiCode, @Param("rangeId") String rangeId,
			@Param("statisDate") String statisDate);

	/**
	 * 语音用户规模
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public Map<String, Object> getVoiceScale(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel);

	/**
	 * 流量用户规模
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public Map<String, Object> getFlowScale(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel);

	/**
	 * 获取某组织机构+某类型的网格信息
	 * 
	 * @param orgId
	 * @param gridTypeId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getGridInfoByType(@Param("orgId") String orgId, @Param("gridTypeId") String gridTypeId,
			@Param("orgLevel") String orgLevel);

	/**
	 * 获取网格规模top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getGridTop(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取渠道规模top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getChnlTop(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取基站规模top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getStatTop(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	/**
	 * 获取语音规模top数据
	 * 
	 * @param orgId
	 * @param orgLevel
	 * @return
	 */
	public List<Map<String, Object>> getVoiceTop(@Param("orgId") Integer orgId, @Param("orgLevel") String orgLevel, @Param("gridType") String gridType);

	public List<Map<String, Object>> getGridTableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType,
			@Param("orgLevel") String orgLevel);

	public List<Map<String, Object>> getChnlTableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType,
			@Param("orgLevel") String orgLevel);

	public List<Map<String, Object>> getStatTableInfo(@Param("orgId") String orgId, @Param("smallScaleType") String smallScaleType,
			@Param("orgLevel") String orgLevel);

	public Page<Map<String, Object>> getMapTableInfo(@Param("orgId") String orgId, @Param("incomeId") String incomeId, @Param("orgLevel") String orgLevel,
			@Param("sidx") String sidx, @Param("sord") String sord);

	public List<Map<String, Object>> getMapTableInfo01(@Param("orgId") String orgId, @Param("incomeId") String incomeId, @Param("orgLevel") String orgLevel,
			@Param("sidx") String sidx, @Param("sord") String sord);

}
