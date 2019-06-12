package com.bonc.map.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.bonc.common.constant.ParamFieldConstant;
import com.bonc.common.utils.JedisClientPool;
import com.bonc.common.utils.JsonUtil;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.map.dao.entity.WgHfScale;
import com.bonc.map.dao.mapper.PageOneMapper;
import com.bonc.system.dao.entity.SysOrg;

@Service
public class PageOneService {

	@Resource
	private PageOneMapper mapper;
	@Resource(name = "jedisClientPool")
	private JedisClientPool jedisClientPool;
	@Resource
	private KpiManagerService kpiManagerService;

	public PageOneMapper getMapper() {
		return mapper;
	}

	/**
	 * 获得排名前五城市和数据
	 * 
	 * @Title getTopFive @Author hubinbin @return
	 *        List<Map<String,Object>> @throws
	 */
	public List<Map<String, Object>> getTopFive(String orgId, String scale) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.GRID_TOP, orgId + scale);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			// json转换为list<map>
			List<Map<String, Object>> topFive = JsonUtil.jsonToListMap(json);
			// 直接返回
			return topFive;
		}
		// 如果不存在 先查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		List<Map<String, Object>> list = this.mapper.getTopFive(orgId, parentId, orgCode, orgName, scale);
		// 查询内容插入缓存
		jedisClientPool.hset(ParamFieldConstant.GRID_TOP, orgId + scale + "", JsonUtil.objectToJson(list));
		return list;
	}

	/**
	 * 首页规模统计数据
	 * 
	 * @Title getFiveInfo @Author hubinbin @return List<WgHfScale> @throws
	 */
	public List<WgHfScale> getFiveInfo(String orgId) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.FIVE_INFO, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			@SuppressWarnings("unchecked")
			List<WgHfScale> list = (List<WgHfScale>) JSONArray.parse(json);
			return list;
		}
		// 如果不存在则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		List<WgHfScale> list = this.mapper.getFiveInfo(orgId, parentId);
		// 查询内容插入到Redis
		jedisClientPool.hset(ParamFieldConstant.FIVE_INFO, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public List<Map<String, Object>> getFiveBarInfo(String orgId) {
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		return this.mapper.getFiveBarInfo(orgId, parentId, orgCode, orgName);
	}

	/**
	 * 新业务趋势折线图数据
	 * 
	 * @Title getTaskByFiveData @Author hubinbin @return
	 *        List<Map<String,Object>> @throws
	 */
	public List<Map<String, Object>> getTaskByFiveData(String orgId, String lineId) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.TASK_BY_FIVE_DATA, orgId + lineId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		// 不存在则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> listR = new ArrayList<Map<String, Object>>();
		String orgCode = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "GRID_CODE";
		}
		if (lineId.equals("day")) {
			listR = this.mapper.getTaskByFiveDay(orgId, orgCode);
		} else if (lineId.equals("month")) {
			listR = this.mapper.getTaskByFiveMonth(orgId, orgCode);
		}
		// 查询内容插入Redis
		jedisClientPool.hset(ParamFieldConstant.TASK_BY_FIVE_DATA, orgId + lineId + "", JsonUtil.objectToJson(listR));
		return listR;
	}

	/**
	 * 业务规模占比饼图
	 * 
	 * @Title getRightPie @Author hubinbin @return
	 *        List<Map<String,Object>> @throws
	 */
	public List<Map<String, Object>> getRightPie(String orgId, String scale) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.RIGHT_PIE, orgId + scale);
		// 是否为空
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		List<Map<String, Object>> retInfo = new ArrayList<Map<String, Object>>();
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgCode = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "GRID_CODE";
		}

		if (scale.equals("income")) {
			retInfo = this.mapper.getIncome(orgId, orgCode);
		} else if (scale.equals("customer")) {
			retInfo = this.mapper.getCustomer(orgId, orgCode);
		} else if (scale.equals("cell_num")) {
			retInfo = this.mapper.getCell(orgId, orgCode);
		} else if (scale.equals("group_num")) {
			retInfo = this.mapper.getGroup(orgId, orgCode);
		} else if (scale.equals("chnl_num")) {
			retInfo = this.mapper.getChnl(orgId, orgCode);
		}
		// 查询结果传入Redis
		jedisClientPool.hset(ParamFieldConstant.RIGHT_PIE, orgId + scale + "", JsonUtil.objectToJson(retInfo));
		return retInfo;
	}

	/**
	 * 规模占比echarts图数据
	 * 
	 * @Title getRightBar @Author hubinbin @return
	 *        List<Map<String,Object>> @throws
	 */
	public List<Map<String, Object>> getRightBar(String orgId, String scale) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.RIGHT_BAR, orgId + scale);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		// 如果为空则查询
		List<Map<String, Object>> retInfo = new ArrayList<Map<String, Object>>();
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		if (scale.equals("income")) {
			retInfo = this.mapper.getIncomeBar(orgId, parentId, orgCode, orgName);
		} else if (scale.equals("customer")) {
			retInfo = this.mapper.getCustomerBar(orgId, parentId, orgCode, orgName);
		} else if (scale.equals("cell_num")) {
			retInfo = this.mapper.getCellBar(orgId, parentId, orgCode, orgName);
		} else if (scale.equals("group_num")) {
			retInfo = this.mapper.getGroupBar(orgId, parentId, orgCode, orgName);
		} else if (scale.equals("chnl_num")) {
			retInfo = this.mapper.getChnlBar(orgId, parentId, orgCode, orgName);
		}
		// 查询结果导入Redis
		jedisClientPool.hset(ParamFieldConstant.RIGHT_BAR, orgId + scale + "", JsonUtil.objectToJson(retInfo));
		return retInfo;
	}

	/**
	 * 画像分析 性别
	 * 
	 * @Title getSexPortrait @Author hubinbin @return
	 *        List<Map<String,Object>> @throws
	 */
	public List<Map<String, Object>> getSexPortrait(String orgId, String userType) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.SEX_PORTRAIT, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			// Redis直接导出数据
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		// 为空则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		System.out.println(orgCode + "----" + orgName);
		List<Map<String, Object>> list = this.mapper.getSexPortrait(orgId, userType, parentId);
		// 数据导入Redis
		jedisClientPool.hset(ParamFieldConstant.SEX_PORTRAIT, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	/**
	 * 年龄占比数据
	 * 
	 * @Title getNestingPie @Author hubinbin @return Map<String,Object> @throws
	 */
	public Map<String, Object> getNestingPie(String orgId, String userType) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.NESTING_PIE, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 为空则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		System.out.println(orgCode + "----" + orgName);
		Map<String, Object> list = this.mapper.getNestingPie(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.NESTING_PIE, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getNestingBar(String orgId, String userType) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.NESTING_BAR, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 为空则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		System.out.println(orgCode + "----" + orgName);
		Map<String, Object> list = this.mapper.getNestingBar(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.NESTING_BAR, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getInterestFeatures(String orgId, String userType) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.INTEREST_FEATURES, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 为空则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		System.out.println(orgCode + "----" + orgName);
		Map<String, Object> list = this.mapper.getInterestFeatures(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.INTEREST_FEATURES, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getConsumeFeatures(String orgId, String userType) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.CONSUME_FEATURES, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 为空则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		System.out.println(orgCode + "----" + orgName);
		Map<String, Object> list = this.mapper.getConsumeFeatures(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.CONSUME_FEATURES, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	/**
	 * 首页画像分析下拉框下拉列表初始化
	 * 
	 * @Title initSelectPortrait @Author hubinbin @return
	 *        Map<String,Object> @throws
	 */
	public Map<String, Object> initSelectPortrait() {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.SELECT_PORTRAIT, "");
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			// json转换成Map<>
			Map<String, Object> retMap = JSON.parseObject(json);
			return retMap;
		}
		Map<String, Object> retMap = new HashMap<String, Object>();
		List<Map<String, Object>> firstLevelInfo = this.mapper.getFirstLevel(); // 一级下拉
		List<Map<String, Object>> secondLevelInfo = this.mapper.getSecondLevel(); // 二级下拉
		retMap.put("firstLevelInfo", firstLevelInfo);
		retMap.put("secondLevelInfo", secondLevelInfo);
		// 将数据写入Redis
		jedisClientPool.hset(ParamFieldConstant.SELECT_PORTRAIT, "", JsonUtil.objectToJson(retMap));
		return retMap;
	}

	/**
	 * 业务规模占比表格数据
	 * 
	 * @Title getRightTable @Author hubinbin @return
	 *        List<Map<String,Object>> @throws
	 */
	public List<Map<String, Object>> getRightTable(String orgId, String scale, SysOrg sysOrg) {
		List<Map<String, Object>> retInfo = new ArrayList<Map<String, Object>>();
		String parentId = "";
		String orgCode = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgCode = "CITY_ID";
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			orgCode = "AREA_ID";
			orgName = "AREA_NAME";
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgCode = "PHYSICAL_ID";
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		System.out.println("orgCode=" + orgCode);
		if (scale.equals("income")) {
			retInfo = this.mapper.getIncomeTable(orgId, parentId, orgName);
		} else if (scale.equals("customer")) {
			retInfo = this.mapper.getCustomerTable(orgId, parentId, orgName);
		} else if (scale.equals("cell_num")) {
			retInfo = this.mapper.getCellTable(orgId, parentId, orgName);
		} else if (scale.equals("group_num")) {
			retInfo = this.mapper.getGroupTable(orgId, parentId, orgName);
		} else if (scale.equals("chnl_num")) {
			retInfo = this.mapper.getChnlTable(orgId, parentId, orgName);
		}
		return retInfo;
	}

	public Map<String, Object> getAreaAge(String orgId, String userType) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.AREA_AGE, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getAreaAge(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.AREA_AGE, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getArpuBar(String orgId, String userType) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.ARPU_BAR, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getArpuBar(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.ARPU_BAR, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getDouEcharts(String orgId, String userType) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.DOU_ECHARTS, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getDouEcharts(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.DOU_ECHARTS, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getMouEcharts(String orgId, String userType) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.MOU_ECHARTS, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getMouEcharts(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.MOU_ECHARTS, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;

	}

	public Map<String, Object> getPreferenceEcharts(String orgId, String userType) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.PREFERENCE_ECHARTS, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getPreferenceEcharts(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.PREFERENCE_ECHARTS, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getAppEcharts(String orgId, String userType) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.APP_ECHARTS, orgId + userType);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getAppEcharts(orgId, userType, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.APP_ECHARTS, orgId + userType + "", JsonUtil.objectToJson(list));
		return list;
	}

	public List<Map<String, Object>> getThreearpuEcharts(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.THREEARPU_ECHARTS, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
			orgName = "AREA_NAME";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		List<Map<String, Object>> list = this.mapper.getThreearpuEcharts(orgId, parentId, orgName);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.THREEARPU_ECHARTS, orgId + "", JsonUtil.objectToJson(list));
		return list;

	}

	public Map<String, Object> getBroadbandEcharts(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.BROADBAND_ECHARTS, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getBroadbandEcharts(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.BROADBAND_ECHARTS, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getFlowEcharts(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.FLOW_ECHARTS, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getFlowEcharts(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.FLOW_ECHARTS, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getUserScale(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.USER_SCALE, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getUserScale(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.USER_SCALE, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getInNet(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.IN_NET, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getInNet(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.IN_NET, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getAccessEcharts(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.ACCESS_ECHARTS, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getAccessEcharts(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.ACCESS_ECHARTS, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getWarningEcharts(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.WARNING_ECHARTS, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getWarningEcharts(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.WARNING_ECHARTS, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public Map<String, Object> getChnlnumEcharts(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.CHNLNUM_ECHARTS, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			Map<String, Object> list = JSON.parseObject(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> list = this.mapper.getWarningEcharts(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.CHNLNUM_ECHARTS, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public List<Map<String, Object>> getChnlstarEcharts(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.CHNLSTAR_ECHARTS, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		List<Map<String, Object>> list = this.mapper.getChnlstarEcharts(orgId, parentId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.CHNLSTAR_ECHARTS, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public List<Map<String, Object>> getChnlNumFull(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.CHNL_NUM_FULL, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
			orgName = "AREA_NAME";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
		}
		List<Map<String, Object>> list = this.mapper.getChnlNumFull(orgId, parentId, orgName);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.CHNL_NUM_FULL, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public List<Map<String, Object>> getChnlShare(String orgId) {
		// 判断缓存是否存在
		String json = jedisClientPool.hget(ParamFieldConstant.CHNL_SHARE, orgId);
		// 判断是否为空
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		// 无则查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		String orgName = "";
		if (sysOrg.getOrgLevel().equals("1")) {
			orgName = "CITY_NAME";
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
			orgName = "AREA_NAME";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			orgName = "GRID_NAME";
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			orgName = "PHYSICAL_NAME";
			parentId = "GRID_CODE";
			return null;
		}
		List<Map<String, Object>> list = this.mapper.getChnlShare(orgId, parentId, orgName);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.CHNL_SHARE, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

}
