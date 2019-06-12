package com.bonc.compositeview.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.compositeview.dao.mapper.CompositeViewMapper;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;

/**
 * 
 * @FileName CompositeViewService.java
 * @Author xiaogaoxiang
 * @At 2019年3月3日 下午8:18:52
 * @Desc 综合视图Service
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class CompositeViewService {

	@Resource
	private CompositeViewMapper compositeViewMapper;

	@Resource
	private KpiManagerService kpiManagerService;

	/**
	 * 查询综合视图网格信息概述和网格分类规模数据
	 * 
	 * @Title getGridInfoAndGridType
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	public Map<String, Object> getGridInfoAndGridType(String orgId) {
		List<Map<String, Object>> getGridInfo = compositeViewMapper
				.getGridInfo(orgId);
		List<Map<String, Object>> getGridType = compositeViewMapper
				.getGridType(orgId);
		Map<String, Object> returnMaps = new HashMap<String, Object>();
		returnMaps.put("GridInfo", getGridInfo);
		returnMaps.put("GridType", getGridType);
		return returnMaps;
	}

	/**
	 * 查询综合视图渠道基站信息和考核得分
	 * 
	 * @Title getChannelStationAndGrade
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, String>> getChannelStationAndIndicators(String orgId) {
		Map<String, String> channelStationMap = compositeViewMapper
				.getChannelStation(orgId);
		Map<String, String> gradeMap = compositeViewMapper.getIndicators(orgId);
		List<Map<String, String>> channelStationAndIndicators = new ArrayList<Map<String, String>>();
		channelStationAndIndicators.add(channelStationMap);
		channelStationAndIndicators.add(gradeMap);
		return channelStationAndIndicators;
	}

	/**
	 * 查询综合视图用户规模概览和运营监控一览
	 * 
	 * @Title getScaleAndMonitoring
	 * @Author hubinbin
	 * @return List<Map<String,Object>>
	 */
	public Map<String, Object> getScaleAndMonitoring(String orgId) {
		List<Map<String, Object>> getScale = compositeViewMapper
				.getScale(orgId);
		List<Map<String, Object>> getMonitoring = compositeViewMapper
				.getMonitoring(orgId);
		Map<String, Object> returnMaps = new HashMap<String, Object>();
		returnMaps.put("getScale", getScale);
		returnMaps.put("getMonitoring", getMonitoring);
		return returnMaps;

	}

	/**
	 * 查询综合视图指标资源概况和任务资源概况
	 * 
	 * @Title getIndicatorsAndTasks
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	public Map<String, Object> getTaskSituationAndAssessmentScore(String orgId,
			String orgLevel) {
		List<Map<String, Object>> getTaskSituation = compositeViewMapper
				.getTaskSituation(orgId);
		List<Map<String, Object>> getAssessmentScore = compositeViewMapper
				.getAssessmentScore(orgId, orgLevel);
		Map<String, Object> returnMaps = new HashMap<String, Object>();
		returnMaps.put("getTaskSituation", getTaskSituation);
		returnMaps.put("getAssessmentScore", getAssessmentScore);
		return returnMaps;
	}

	/**
	 * 获取排名前五和后五
	 * 
	 * @Title getTopScale
	 * @Author hubinbin
	 * @return String
	 */
	public List<Map<String, Object>> getTopScale(String orgId,
			String hexagonType) {
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", orgId);
		params.put("orgLevel", sysOrg.getOrgLevel());
		params.put("hexagonType", hexagonType);
		result = this.compositeViewMapper.getTopScale(params);
		return result;
	}

	public List<Map<String, Object>> getGridInfoMore(Map<String, Object> param) {
		List<Map<String, Object>> returnmaps = new ArrayList<Map<String, Object>>();
		if (param.get("gridInfoType").equals("网格信息")) {
			returnmaps = compositeViewMapper.getGridInfoMore(param);
		} else {
			returnmaps = compositeViewMapper.getDirectorInfofoMore(param);
		}
		return returnmaps;
	}

	public List<Map<String, Object>> getGridTypeMore(Map<String, Object> param) {
		List<Map<String, Object>> returnmaps = new ArrayList<Map<String, Object>>();
		returnmaps = compositeViewMapper.getGridTypeMore(param);
		return returnmaps;
	}

	public List<Map<String, Object>> channelStationInfoMore(Map<String, Object> param) {
		List<Map<String, Object>> returnmaps = new ArrayList<Map<String, Object>>();
		returnmaps = compositeViewMapper.channelStationInfoMore(param);
		return returnmaps;
	}

	/**
	 * 网格信息数据查询
	 * 
	 * @Title gridInfos
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	/**
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> gridInfos(String orgId) {
		Map<String, Object> gridInfos = compositeViewMapper.gridInfos(orgId);
		return gridInfos;
	}
	
	/**
	 * 地市信息数据查询
	 * 
	 * @Title cityInfos
	 * @Author caoxiaojuan
	 * @param orgId
	 * @return Map<String,Object>
	 */
	/**
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> cityInfos(String orgId,String orgLevel) {
		Map<String, Object> cityInfos = compositeViewMapper.cityInfos(orgId, orgLevel);
		return cityInfos;
	}
	

	/**
	 * 获取地区或者渠道的信息
	 * 
	 * @param orgLevel
	 * @param orgId
	 * @return
	 */
	public List<Map<String, Object>> getAreaOrChnlInfo(String orgLevel,
			String orgId) {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		if ("4".equals(orgLevel)) {
			resultList = compositeViewMapper.getChnlInfoByGridCode(orgId);
		} else {
			resultList = compositeViewMapper.getAreaInfoByPId(orgId);
		}
		return resultList;
	}

	/**
	 * 获取任务资源概述详情
	 * 
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> getTaskSituationDetail(
			Map<String, Object> params) {
		return compositeViewMapper.getTaskSituationDetail(params);
	}
	
	/**
	 * 获取用户规模概况详情
	 * 
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> customersMore(
			Map<String, Object> params) {
		return compositeViewMapper.customersMore(params);
	}
	
	/**
	 * 获取指标资源情况
	 * 
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> IndicatorsMore(
			Map<String, Object> params) {
		return compositeViewMapper.IndicatorsMore(params);
	}
	
	/**
	 * 获取运营监控一览More
	 * 
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> monitoringMore(
			Map<String, Object> params) {
		return compositeViewMapper.monitoringMore(params);
	}

	
	/**
	 * 获取考核得分More
	 * 
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> assessmentScoreMore(
			Map<String, Object> params) {
		return compositeViewMapper.assessmentScoreMore(params);
	}
	
	/**
	 * 通过id获取地区信息
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> getAreaInfoById(String orgId) {
		return compositeViewMapper.getAreaInfoById(orgId);
	}

	/**
	 * 根据当前区县id,查询出现浮动框：网格名称、客户数、收入、渠道数、基站数、小区数、AB集团数、
	 * CD集团数、重点小区数、端口数、分纤箱数、光交箱数等信息
	 * 
	 * @Title initAreaDataByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> initAreaDataByOrgId(String orgId) {
		List<Map<String, Object>> list = compositeViewMapper
				.initAreaDataByOrgId(orgId);
		return list;
	}
}
