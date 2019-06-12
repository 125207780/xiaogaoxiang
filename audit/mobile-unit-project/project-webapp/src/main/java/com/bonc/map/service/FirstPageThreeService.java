package com.bonc.map.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.utils.SysUserTreeMenuUtil;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.map.dao.mapper.FirstPageThreeMapper;
import com.bonc.netResources.dao.entity.NetResources;
import com.bonc.netResources.service.NetResourcesService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;

/**
 * 
 * @FileName FirstPageThreeService.java
 * @Author xiaogaoxiang
 * @At 2019年3月18日 上午10:09:16
 * @Desc 首页信息Service
 */
@Service
public class FirstPageThreeService {

	@Resource
	private FirstPageThreeMapper firstPageThreeMapper;

	@Resource
	private KpiManagerService kpiManagerService;

	@Resource
	private SysOrgService sysOrgService;

	@Resource
	private NetResourcesService netResourcesService;
	@Resource
	private GridCommonService gridCommonService;

	/**
	 * 初始化左侧查询树
	 * 
	 * @Title selectNetResourceList
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<NetResources>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：selectNetResourceList，作用：初始化左侧查询树】")
	public List<NetResources> selectNetResourceList(SysUser user) {
		// 获取当前用户下所有子节点信息
		List<SysOrg> allSysOrgList = sysOrgService.selectAllSysOrg();
		List<SysOrg> parentSysOrgList = SysUserTreeMenuUtil.getParentOrgId(allSysOrgList, user.getPid());
		List<SysOrg> childrenSysOrgList = SysUserTreeMenuUtil.getChildrenOrgIdFirstPage(allSysOrgList, user.getOrgId());
		List<String> orgIds = new ArrayList<>();
		// 加上基础信息，指标现状，资源信息，营销任务NET_CODE
		orgIds.add("jcxx");
		orgIds.add("yxrw");
		orgIds.add("zbxz");
		orgIds.add("zyxx");
		// 加上自身的NET_CODE
		orgIds.add("jcxx-" + user.getOrgId());
		orgIds.add("yxrw-" + user.getOrgId());
		orgIds.add("zbxz-" + user.getOrgId());
		orgIds.add("zyxx-" + user.getOrgId());
		// 加上所有的子节点NET_CODE
		for (SysOrg so : childrenSysOrgList) {
			orgIds.add("jcxx-" + so.getOrgId());
			orgIds.add("yxrw-" + so.getOrgId());
			orgIds.add("zbxz-" + so.getOrgId());
			orgIds.add("zyxx-" + so.getOrgId());
		}
		// 加上所有的父节点NET_CODE
		for (SysOrg so : parentSysOrgList) {
			orgIds.add("jcxx-" + so.getOrgId());
			orgIds.add("yxrw-" + so.getOrgId());
			orgIds.add("zbxz-" + so.getOrgId());
			orgIds.add("zyxx-" + so.getOrgId());
		}
		return firstPageThreeMapper.selectNetResourceList(orgIds);
	}

	/**
	 * 查询各项指标信息
	 * 
	 * @Title getZbEchart
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param type
	 * @param statisDate
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getZbEchart，作用：查询各项指标信息】")
	public List<Map<String, Object>> getZbEchart(String orgId, String orgLevel, String type, String statisDate) {
		// SysOrg sysOrg =
		// this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", orgId);
		params.put("orgLevel", orgLevel);
		params.put("type", type);
		params.put("statisDate", statisDate);
		result = this.firstPageThreeMapper.getZbEchart(params);
		return result;
	}

	/**
	 * 查询各项指标信息
	 * 
	 * @Title getzbechartInfo
	 * @Author caoxiaojuan
	 * @param orgId
	 * @param type
	 * @param statisDate
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getZbEchart，作用：查询各项指标信息】")
	public List<Map<String, Object>> getzbechartInfo(String orgId, String orgLevel, String type, String statisDate,String flag) {
		// SysOrg sysOrg =
		// this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", orgId);
		params.put("orgLevel", orgLevel);
		params.put("type", type);
		params.put("statisDate", statisDate);
		params.put("flag", flag);
		result = this.firstPageThreeMapper.getzbechartInfo(params);
		return result;
	}
	
	/**
	 * 获取5个指标的汇总信息
	 * 
	 * @Title getZbEchartSum
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param type
	 * @param statisDate
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getZbEchartSum，作用：获取指标汇总信息】")
	public List<Map<String, Object>> getZbEchartSum(String orgId, String orgLevel, String type, String statisDate) {
		// SysOrg sysOrg =
		// this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> result = new ArrayList<>();
		Map<String, Object> sumMap = null;
		String[] types = type.split(",");
		for (int i = 0; i < types.length; i++) {
			sumMap = firstPageThreeMapper.getZbEchartSum(orgId, orgLevel, type.split(",")[i], statisDate);
			result.add(sumMap);
		}
		return result;
	}

	/**
	 * 根据父节点查询子节点信息
	 * 
	 * @Title getChildrenSysOrgByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @param user
	 * @return List<SysOrg>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getChildrenSysOrgByOrgId，作用：根据父节点查询子节点信息】")
	public List<SysOrg> getChildrenSysOrgByOrgId(String orgId, String orgLevel, SysUser user) {
		List<SysOrg> sysOrgList = new ArrayList<>();
		// 省，地市层级的，正常交互
		if (user.getOrgLevel() < 3) {
			sysOrgList = sysOrgService.getChildrenSysOrgByOrgId(orgId);
		}
		// 区县交互
		else if (user.getOrgLevel() == 3) {
			// 当前登录人为区县层级，如果选择了地市，则区县只显示自己的内容
			if ("2".equals(orgLevel)) {
				sysOrgList.add(sysOrgService.selectSysOrgById(orgId));
			}
			// 当前登录人为区县层级，如果选择了区县，则把区县下所有的网格查询出来
			else {
				sysOrgList = sysOrgService.getChildrenSysOrgByOrgId(orgId);
			}
		}
		// 网格交互
		else {
			// 当前登录人为网格层级，如果选择了地市，则区县只显示自己的上一级
			if ("2".equals(orgLevel)) {
				sysOrgList.add(sysOrgService.selectSysOrgById(user.getSysOrg().getPid()));
			}
			// 当前登录人为网格层级，如果选择了区县，则网格只显示自己的内容
			else {
				sysOrgList.add(sysOrgService.selectSysOrgById(user.getOrgId()));
			}
		}
		return sysOrgList;
	}

	/**
	 * 根据一级菜单，查询二级分类
	 * 
	 * @Title getChildrenNetRresourceByOrgId
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return List<NetResources>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getChildrenNetRresourceByOrgId，作用：根据一级菜单，查询二级分类】")
	public List<NetResources> getChildrenNetRresourceByOrgId(String netCode) {
		if (null != netCode && !"".equals(netCode))
			return netResourcesService.getChildrenNetRresourceByOrgId(netCode);
		else
			return null;
	}

	/**
	 * 查询基础信息头部信息
	 * 
	 * @Title getJcxxHeader
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getJcxxHeader，作用：查询基础信息头部信息】")
	public Map<String, Object> getJcxxHeader(String orgId, String orgLevel) {
		return firstPageThreeMapper.getJcxxHeader(orgId, orgLevel);
	}

	/**
	 * 查询基础信息详情列表信息
	 * 
	 * @Title getJcxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getJcxxInfoDetail，作用：查询基础信息详情列表信息】")
	public List<Map<String, Object>> getJcxxInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getJcxxInfoDetail(params);
	}

	/**
	 * 查询基础信息详情列表信息
	 * 
	 * @Title getJcxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getJcxxInfoWGJCXXDetail，作用：查询网格基础信息详情列表信息】")
	public List<Map<String, Object>> getJcxxInfoWGJCXXDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getJcxxInfoWGJCXXDetail(params);
	}
    
	/**
	 * 网格基础信息报表
	 * 
	 * @Title getWgjcxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getJcxxInfoDetail，作用：网格总览/网格基础信息/查询网格基础信息详情列表信息】")
	public List<Map<String, Object>> getWgjcxxInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getWgjcxxInfoDetail(params);
	}

	/**
	 * 重点业务头部两个汇总，一个echart图
	 * 
	 * @Title getZdywHeader
	 * @Author xiaogaoxiang
	 * @param city
	 * @param town
	 * @param grid
	 * @param oneType
	 * @param twoType
	 * @param conditionTwo
	 * @param statisDate
	 * @param user
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getZdywHeader(String city, String town, String grid, String oneType, String twoType, String conditionTwo, String statisDate,
			SysUser user) {
		String orgId = null;
		Integer orgLevel = null;
		if (null == city || "".equals(city)) {
			orgId = user.getOrgId();
			orgLevel = user.getOrgLevel();
		}
		// 两个汇总
		Map<String, Object> sumMap = firstPageThreeMapper.getSumInfo(city, town, grid, oneType, twoType, conditionTwo, statisDate, orgId, orgLevel);
		return sumMap;
	}

	/**
	 * 查询echart图
	 * 
	 * @Title getEchartInfo
	 * @Author xiaogaoxiang
	 * @param city
	 * @param town
	 * @param grid
	 * @param oneType
	 * @param twoType
	 * @param conditionTwo
	 * @param statisDate
	 * @param user
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getEchartInfo(String city, String town, String grid, String oneType, String twoType, String conditionTwo,
			String statisDate, SysUser user) {
		String orgId = null;
		Integer orgLevel = null;
		if (null == city || "".equals(city)) {
			orgId = user.getOrgId();
			orgLevel = user.getOrgLevel();
		}
		List<Map<String, Object>> allList = firstPageThreeMapper.getEchartInfo(city, town, grid, oneType, twoType, conditionTwo, statisDate, orgId, orgLevel);
		return allList;
	}

	/**
	 * 客户信息（日）
	 * 
	 * @Title getKhxxdInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	public List<Map<String, Object>> getKhxxdInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getKhxxdInfoDetail(params);
	}

	/**
	 * 客户信息（月）
	 * 
	 * @Title getKhxxmInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	public List<Map<String, Object>> getKhxxmInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getKhxxmInfoDetail(params);
	}

	/**
	 * 收入信息报表
	 * 
	 * @Title getSrxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getSrxxInfoDetail，作用：获取收入信息列表数据】")
	public List<Map<String, Object>> getSrxxInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getSrxxInfoDetail(params);
	}

	/**
	 * 资源信息列表
	 * 
	 * @Title getZyxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getZyxxInfoDetail，作用：资源信息列表数据】")
	public List<Map<String, Object>> getZyxxInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getZyxxInfoDetail(params);
	}

	/**
	 * 重点小区报表
	 * 
	 * @Title getZdxqInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getZdxqInfoDetail，作用：获取重点小区报表数据】")
	public List<Map<String, Object>> getZdxqInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getZdxqInfoDetail(params);
	}

	/**
	 * 集团单位报表
	 * 
	 * @Title getJtdwInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getJtdwInfoDetail，作用：获取集团单位报表数据】")
	public List<Map<String, Object>> getJtdwInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getJtdwInfoDetail(params);
	}

	/**
	 * 营销任务报表
	 * 
	 * @param params
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getYxrwInfoDetail，作用：获取营销任务报表数据】")
	public List<Map<String, Object>> getYxrwInfoDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getYxrwInfoDetail(params);
	}

	/**
	 * 初始化指标信息
	 * 
	 * @Title initMultipleSelectInfo
	 * @Author xiaogaoxiang
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：initMultipleSelectInfo，作用：初始化指标信息】")
	public List<Map<String, Object>> initMultipleSelectInfo() {
		return firstPageThreeMapper.initMultipleSelectInfo();
	}

	/**
	 * 初始化指标信息
	 * 
	 * @Title initZBinfo
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：initMultipleSelectInfo，作用：初始化指标信息】")
	public List<Map<String, Object>> initZBinfo(String orgId, String orgLevel,String statisDate) {
		return firstPageThreeMapper.initZBinfo( orgId,  orgLevel, statisDate);
	}

	
	/**
	 * 根据GRID_INFO_HOME_PAGE_MAIN查询最大账期
	 * 
	 * @Title initMaxStatisDate
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：initMaxStatisDate，作用：根据GRID_INFO_HOME_PAGE_MAIN查询最大账期】")
	public Map<String, Object> initMaxStatisDate(String orgId,String orgLevel) {
		return firstPageThreeMapper.initMaxStatisDate(orgId,orgLevel);
	}

	/**
	 * 网格业务办理（日）报表
	 * 
	 * @Title gridBusinessTargetDoneD
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> gridBusinessTargetDoneD(Map<String, Object> params) {
		return firstPageThreeMapper.gridBusinessTargetDoneD(params);
	}

	/**
	 * 网格业务办理（日）报表
	 * 
	 * @Title gridBusinessTargetDoneD
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> gridBusinessTargetDoneDay(Map<String, Object> params) {
		return firstPageThreeMapper.gridBusinessTargetDoneDay(params);
	}

	/**
	 * 网格业务办理（周）报表
	 * 
	 * @Title gridBusinessTargetDoneW
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> gridBusinessTargetDoneW(Map<String, Object> params) {
		return firstPageThreeMapper.gridBusinessTargetDoneW(params);
	}

	/**
	 * 网格业务办理（周）报表
	 * 
	 * @Title gridBusinessTargetDoneWeek
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> gridBusinessTargetDoneWeek(Map<String, Object> params) {
		return firstPageThreeMapper.gridBusinessTargetDoneWeek(params);
	}

	/**
	 * 网格业务办理（月）报表
	 * 
	 * @Title gridBusinessTargetDoneM
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> gridBusinessTargetDoneM(Map<String, Object> params) {
		return firstPageThreeMapper.gridBusinessTargetDoneM(params);
	}

	/**
	 * 网格业务办理（月）报表
	 * 
	 * @Title gridBusinessTargetDoneMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> gridBusinessTargetDoneMonth(Map<String, Object> params) {
		return firstPageThreeMapper.gridBusinessTargetDoneMonth(params);
	}

	public Map<String, Object> getCityCode(String orgId) {
		return firstPageThreeMapper.getCityCode(orgId);
	}
	
	public List<Map<String, Object>> getCntyCode(String orgId) {
		return firstPageThreeMapper.getCntyCode(orgId);
	}

	/**
	 * 酬金月报报表
	 * 
	 * @Title getCjybDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getCjybDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getCjybDetail(params);
	}

	/**
	 * 装维信息报表
	 * 
	 * @Title getZwxxDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getZwxxDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getZwxxDetail(params);
	}

	/**
	 * 任务月报
	 * 
	 * @Title getRwybDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getRwybDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getRwybDetail(params);
	}

	/**
	 * 投诉报表
	 * 
	 * @Title getTsxxDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getTsxxDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getTsxxDetail(params);
	}

	/**
	 * 行销任务报表
	 * 
	 * @Title getXxrwDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getXxrwDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getXxrwDetail(params);
	}

	/**
	 * 日月累计报表
	 * 
	 * @Title getRyljbbDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getRyljbbDetail(Map<String, Object> params) {
		return firstPageThreeMapper.getRyljbbDetail(params);
	}

	/**
	 * 客户发展日报表
	 * 
	 * @Title customerDevelopDay
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> customerDevelopDay(Map<String, Object> params) {
		return firstPageThreeMapper.customerDevelopDay(params);
	}

	/**
	 * 客户发展周报表
	 * 
	 * @Title customerDevelopWeek
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> customerDevelopWeek(Map<String, Object> params) {
		return firstPageThreeMapper.customerDevelopWeek(params);
	}

	/**
	 * 客户发展月报表
	 * 
	 * @Title customerDevelopMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> customerDevelopMonth(Map<String, Object> params) {
		return firstPageThreeMapper.customerDevelopMonth(params);
	}

	/**
	 * 根据对标类型，查询最大日期
	 * 
	 * @Title getMaxBenchmarkingsnAlysisStatisDate
	 * @Author xiaogaoxiang
	 * @param type
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getMaxBenchmarkingsnAlysisStatisDate(String type) {
		return firstPageThreeMapper.getMaxBenchmarkingsnAlysisStatisDate(type);
	}

	/**
	 * 根据当前登录人获取到地市信息下拉框
	 * 
	 * @param user
	 * @Title getCityInfo
	 * @Author xiaogaoxiang
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getCityInfo，作用：报表专区/对标分析：地市分析单选按钮选择后获取登录人的地市信息】")
	public List<SysOrg> getCityInfo(SysUser user) {
		List<SysOrg> mapList = new ArrayList<>();
		// 省公司，获取所有地市信息
		if (1 == user.getOrgLevel()) {
			mapList = sysOrgService.getChildrenSysOrgByOrgId(user.getOrgId());
		}
		// 地市，获取当前地市信息
		else if (2 == user.getOrgLevel()) {
			mapList.add(user.getSysOrg());
		}
		// 区县，获取上级地市信息
		else if (3 == user.getOrgLevel()) {
			mapList.add(sysOrgService.selectSysOrgById(user.getSysOrg().getPid()));
		}
		// 网格，获取上上级地市信息
		else if (4 == user.getOrgLevel()) {
			SysOrg sysOrg = sysOrgService.selectSysOrgById(user.getSysOrg().getPid());
			mapList.add(sysOrgService.selectSysOrgById(sysOrg.getPid()));
		}
		return mapList;
	}

	/**
	 * 根据当前登录人获取到地市，区县下拉框
	 * 
	 * @Title getTownInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @return List<SysOrg>
	 */
	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：getCityInfo，作用：报表专区/对标分析：区县分析单选按钮选择后获取登录人的地市、区县信息】")
	public List<SysOrg> getTownInfo(SysUser user) {
		List<SysOrg> mapList = new ArrayList<>();
		// 省公司，获取所有地市信息
		if (1 == user.getOrgLevel()) {
			// 获取所有地市信息
			mapList = sysOrgService.getChildrenSysOrgByOrgId(user.getOrgId());
			// 获取所有区县信息
			List<SysOrg> cntyList = sysOrgService.selectCntySysOrg();
			mapList.addAll(cntyList);
		}
		// 地市，获取当前地市信息
		else if (2 == user.getOrgLevel()) {
			// 获取当前地市信息
			mapList.add(user.getSysOrg());
			// 再获取当前地市下所有的区县
			mapList.addAll(sysOrgService.getChildrenSysOrgByOrgId(user.getOrgId()));
		}
		// 区县，获取上级地市信息
		else if (3 == user.getOrgLevel()) {
			// 获取当前上级地市信息
			mapList.add(sysOrgService.selectSysOrgById(user.getSysOrg().getPid()));
			// 获取当前区县
			mapList.add(user.getSysOrg());
		}
		// 网格，获取上上级地市信息
		else if (4 == user.getOrgLevel()) {
			// 获取当前上级区县信息
			SysOrg sysOrg = sysOrgService.selectSysOrgById(user.getSysOrg().getPid());
			// 根据当前上级区县信息获取地市信息
			mapList.add(sysOrgService.selectSysOrgById(sysOrg.getPid()));
			// 获取区县信息
			mapList.add(sysOrg);
		}
		return mapList;
	}

	/**
	 * 根据当前登录人获取到地市，区县，网格下拉框
	 * 
	 * @param gridType
	 * 
	 * @Title getGridInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @return List<SysOrg>
	 */
	public List<SysOrg> getGridInfo(String gridType, SysUser user) {
		List<SysOrg> mapList = new ArrayList<>();
		List<String> orgIds = null;
		List<SysOrg> sysOrgList = null;
		// 省公司，获取所有地市信息
		if (1 == user.getOrgLevel()) {
			// 获取所有地市信息
			orgIds = new ArrayList<>();
			orgIds.add(user.getOrgId());
			sysOrgList = new ArrayList<>();
			sysOrgList = sysOrgService.getChildrenSysOrgByOrgIds(orgIds, null);
			mapList.addAll(sysOrgList);
			// 获取所有区县信息
			orgIds = new ArrayList<>();
			for (SysOrg so : sysOrgList) {
				orgIds.add(so.getOrgId());
			}
			sysOrgList = new ArrayList<>();
			sysOrgList = sysOrgService.getChildrenSysOrgByOrgIds(orgIds, null);
			mapList.addAll(sysOrgList);
			// 获取所有网格信息
			orgIds = new ArrayList<>();
			for (SysOrg so : sysOrgList) {
				orgIds.add(so.getOrgId());
			}
			sysOrgList = new ArrayList<>();
			sysOrgList = sysOrgService.getChildrenSysOrgByOrgIds(orgIds, gridType);
			mapList.addAll(sysOrgList);
		}
		// 地市，获取当前地市信息
		else if (2 == user.getOrgLevel()) {
			// 获取当前地市信息
			mapList.add(user.getSysOrg());
			// 获取当前区县信息
			orgIds = new ArrayList<>();
			orgIds.add(user.getOrgId());
			sysOrgList = new ArrayList<>();
			sysOrgList = sysOrgService.getChildrenSysOrgByOrgIds(orgIds, null);
			mapList.addAll(sysOrgList);
			// 获取当前网格信息
			orgIds = new ArrayList<>();
			for (SysOrg so : sysOrgList) {
				orgIds.add(so.getOrgId());
			}
			sysOrgList = new ArrayList<>();
			sysOrgList = sysOrgService.getChildrenSysOrgByOrgIds(orgIds, gridType);
			mapList.addAll(sysOrgList);
		}
		// 区县，获取上级地市信息
		else if (3 == user.getOrgLevel()) {
			// 获取当前上级地市信息
			mapList.add(sysOrgService.selectSysOrgById(user.getSysOrg().getPid()));
			// 获取当前区县
			mapList.add(user.getSysOrg());
			// 获取当前区县下所有网格
			orgIds = new ArrayList<>();
			orgIds.add(user.getOrgId());
			sysOrgList = new ArrayList<>();
			sysOrgList = sysOrgService.getChildrenSysOrgByOrgIds(orgIds, gridType);
			mapList.addAll(sysOrgList);
		}
		// 网格，获取上上级地市信息
		else if (4 == user.getOrgLevel()) {
			// 获取当前上级区县信息
			SysOrg sysOrg = sysOrgService.selectSysOrgById(user.getSysOrg().getPid());
			// 根据当前上级区县信息获取地市信息
			mapList.add(sysOrgService.selectSysOrgById(sysOrg.getPid()));
			// 获取区县信息
			mapList.add(sysOrg);
			// 获取当前自身网格信息
			mapList.add(user.getSysOrg());
		}
		return mapList;
	}

	/**
	 * 根据地市选择，获取地市下所有区县信息
	 * 
	 * @param gridType
	 * 
	 * @Title getChildrenInfoByIds
	 * @Author xiaogaoxiang
	 * @param cityCode
	 * @return List<SysOrg>
	 */
	public List<SysOrg> getChildrenInfoByIds(String orgId, String gridType) {
		String[] orgIdStrs = orgId.split(",");
		// String数组转List
		List<String> orgIds = Arrays.asList(orgIdStrs);
		// 根据父级id集合，查询子节点集合
		List<SysOrg> sysOrgList = sysOrgService.getChildrenSysOrgByOrgIds(orgIds, gridType);
		return sysOrgList;
	}

	@ArchivesLog(actionName = "【操作类：FirstPageThreeService】", option = "【方法名：selectZYGLCDGroupInfoByGridCodes，作用：资源管理已入格CD类集团报表导出】")
	public List<Map<String, Object>> selectZYGLCDGroupInfoByGridCodes(Map<String, Object> map) {
		return gridCommonService.selectZYGLCDGroupInfoByGridCodes(map);
	}

	/**
	 * 查询对标分析内容
	 * 
	 * @Title getBenchmarkingAnalysis
	 * @Author xiaogaoxiang
	 * @param type
	 * @param orgId
	 * @param statisDate
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getBenchmarkingAnalysis(String type, String orgId, String statisDate) {
		String[] orgIdStrs = orgId.split(",");
		List<String> orgIds = Arrays.asList(orgIdStrs);
		List<Map<String, Object>> mapList = firstPageThreeMapper.getBenchmarkingAnalysis(type, orgIds, statisDate);
		return mapList;
	}

	/**
	 * 根据选择的排序类型将指标分析进行排序
	 * 
	 * @Title getBenchmarkingAnalysisOrder
	 * @Author xiaogaoxiang
	 * @param type
	 * @param statisDate
	 * @param orderType
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getBenchmarkingAnalysisOrder(String type, String statisDate, String orderType) {
		Map<String, Object> params = new HashMap<>();
		// 显示多少个
		int orderNum = Integer.parseInt(orderType);
		// 如果是前多少名排序，则倒序排序（从大到小排序）；如果是后多少名排序，则顺序排序（从小到大排序）
		String ascOrDesc = null;
		if (orderNum < 0) {
			ascOrDesc = "ASC";
		} else {
			ascOrDesc = "DESC";
		}
		params.put("type", type);
		params.put("statisDate", statisDate);
		params.put("ascOrDesc", ascOrDesc);
		params.put("orderNum", Math.abs(orderNum));
		return firstPageThreeMapper.getBenchmarkingAnalysisOrder(params);
	}

	/**
	 * 自主分析报表如果有账期，则查询该表的最大账期
	 * 
	 * @Title getSelfHelpReportStatisDate
	 * @Author xiaogaoxiang
	 * @param tableName
	 * @param statisDateCol
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getSelfHelpReportStatisDate(String tableName) {
		Map<String, Object> params = new HashMap<>();
		params.put("tableName", tableName);
		return firstPageThreeMapper.getSelfHelpReportStatisDate(params);
	}

	/**
	 * 根据对应的条件，查询自助报表的表结构，查询出要展示的字段，要显示的条件信息
	 * 
	 * @Title getSelfHelpReportInfo
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return List<Map<String, Object>>
	 */
	public List<Map<String, Object>> getSelfHelpReportInfo(String netCode) {
		List<Map<String, Object>> result = new ArrayList<>();
		// 查询自助分析报表对象
		Map<String, Object> mapList = new HashMap<>();
		mapList.put("selfHelpReportVo", firstPageThreeMapper.getSelfHelpReportInfo(netCode));
		result.add(mapList);
		// 查询自助分析报表条件类型
		List<Map<String, Object>> selfHelpReportConditionList = firstPageThreeMapper.selectHelpReportConditionList(netCode);
		mapList.put("selfHelpReportCondtitionVo", selfHelpReportConditionList);
		result.add(mapList);
		// 查询自助分析报表条件内容表
		List<Map<String, Object>> selfHelpReportContentList = firstPageThreeMapper.selectHelpReportContentList(netCode);
		mapList.put("selfHelpReportCondtentVo", selfHelpReportContentList);
		result.add(mapList);
		return result;
	}

	/**
	 * 自助分析报表查询列表
	 * 
	 * @Title selectSelfHelpReportInfoList
	 * @Author xiaogaoxiang
	 * @param jsonStr
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> selectSelfHelpReportInfoList(String jsonStr) {
		return firstPageThreeMapper.selectSelfHelpReportInfoList(jsonStr);
	}
}
