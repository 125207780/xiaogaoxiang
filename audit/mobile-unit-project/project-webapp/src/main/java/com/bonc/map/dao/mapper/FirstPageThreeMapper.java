package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import com.bonc.netResources.dao.entity.NetResources;

/**
 * 
 * @FileName FirstPageThreeMapper.java
 * @Author xiaogaoxiang
 * @At 2019年3月18日 上午10:09:25
 * @Desc 首页信息Mapper
 */
public interface FirstPageThreeMapper {

	/**
	 * 初始化左侧查询树
	 * 
	 * @param orgIds
	 * 
	 * @Title selectNetResourceList
	 * @Author xiaogaoxiang
	 * @return List<NetResources>
	 */
	List<NetResources> selectNetResourceList(@Param("orgIds") List<String> orgIds);

	/**
	 * 查询各项指标信息
	 * 
	 * @Title getZbEchart
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getZbEchart(Map<String, Object> params);
	/**
	 * 查询各项指标信息
	 * 
	 * @Title getzbechartInfo
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getzbechartInfo(Map<String, Object> params);
	
	/**
	 * 指标汇总
	 * 
	 * @Title getZbEchartSum
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param type
	 * @param orgLevel
	 * @param statisDate
	 * @return Map<String,Object>
	 */
	Map<String, Object> getZbEchartSum(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel, @Param("type") String type,
			@Param("statisDate") String statisDate);

	/**
	 * 查询基础信息头部信息
	 * 
	 * @Title getJcxxHeader
	 * @Author xiaogaoxiang
	 * @param cityCode
	 * @param cntyCode
	 * @return Map<String,Object>
	 */
	Map<String, Object> getJcxxHeader(@Param("orgId") String orgId, @Param("orgLevel") String orgLevel);

	/**
	 * 查询基础信息详情列表信息
	 * 
	 * @Title getJcxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getJcxxInfoDetail(Map<String, Object> params);

	/**
	 * 查询导出酬金信息
	 * 
	 * @Title getCjybDetailExport
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getCjybDetailExport(Map<String, Object> params);

	/**
	 * 查询网格基础信息详情列表信息
	 * 
	 * @Title getJcxxInfoDetail
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getJcxxInfoWGJCXXDetail(Map<String, Object> params);

	/**
	 * 网格基础信息报表
	 * 
	 * @Title getWgjcxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getWgjcxxInfoDetail(Map<String, Object> params);

	/**
	 * 两个头部汇总
	 * 
	 * @Title getSumInfo
	 * @Author xiaogaoxiang
	 * @param city
	 * @param town
	 * @param grid
	 * @param oneType
	 * @param twoType
	 * @param conditionTwo
	 * @param statisDate
	 * @param orgLevel
	 * @param orgId
	 * @return Map<String,Object>
	 */
	Map<String, Object> getSumInfo(@Param("city") String city, @Param("town") String town, @Param("grid") String grid, @Param("oneType") String oneType,
			@Param("twoType") String twoType, @Param("conditionTwo") String conditionTwo, @Param("statisDate") String statisDate, @Param("orgId") String orgId,
			@Param("orgLevel") Integer orgLevel);

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
	 * @param orgId
	 * @param orgLevel
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getEchartInfo(@Param("city") String city, @Param("town") String town, @Param("grid") String grid,
			@Param("oneType") String oneType, @Param("twoType") String twoType, @Param("conditionTwo") String conditionTwo,
			@Param("statisDate") String statisDate, @Param("orgId") String orgId, @Param("orgLevel") Integer orgLevel);

	/**
	 * 客户信息（日）
	 * 
	 * @Title getKhxxmInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> getKhxxdInfoDetail(Map<String, Object> params);

	/**
	 * 客户信息（月）
	 * 
	 * @Title getKhxxmInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> getKhxxmInfoDetail(Map<String, Object> params);

	/**
	 * 收入信息报表
	 * 
	 * @Title getSrxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> getSrxxInfoDetail(Map<String, Object> params);

	/**
	 * 资源信息列表
	 * 
	 * @Title getZyxxInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> getZyxxInfoDetail(Map<String, Object> params);

	/**
	 * 重点小区报表
	 * 
	 * @Title getZdxqInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> getZdxqInfoDetail(Map<String, Object> params);

	/**
	 * 集团单位报表
	 * 
	 * @Title getJtdwInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getJtdwInfoDetail(Map<String, Object> params);

	/**
	 * 营销任务报表
	 * 
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> getYxrwInfoDetail(Map<String, Object> params);

	/**
	 * 初始化指标信息
	 * 
	 * @Title initMultipleSelectInfo
	 * @Author xiaogaoxiang
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> initMultipleSelectInfo();

	/**
	 * 初始化指标信息
	 * 
	 * @Title initZBinfo
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> initZBinfo(@Param("orgId")String orgId, @Param("orgLevel")String orgLevel,@Param("statisDate")String statisDate);
	
	/**
	 * 根据GRID_INFO_HOME_PAGE_MAIN查询最大账期
	 * 
	 * @Title initMaxStatisDate
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	Map<String, Object> initMaxStatisDate(@Param("orgId")String orgId, @Param("orgLevel")String orgLevel);

	/**
	 * 网格业务办理（日）报表
	 * 
	 * @Title gridBusinessTargetDoneD
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> gridBusinessTargetDoneD(Map<String, Object> params);

	/**
	 * 网格业务办理（日）报表
	 * 
	 * @Title gridBusinessTargetDoneD
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> gridBusinessTargetDoneDay(Map<String, Object> params);

	/**
	 * 网格业务办理（周）报表
	 * 
	 * @Title gridBusinessTargetDoneW
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> gridBusinessTargetDoneW(Map<String, Object> params);

	/**
	 * 网格业务办理（周）报表
	 * 
	 * @Title gridBusinessTargetDoneWeek
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> gridBusinessTargetDoneWeek(Map<String, Object> params);

	/**
	 * 网格业务办理（月）报表
	 * 
	 * @Title gridBusinessTargetDoneM
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> gridBusinessTargetDoneM(Map<String, Object> params);

	/**
	 * 网格业务办理（月）报表
	 * 
	 * @Title gridBusinessTargetDoneMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> gridBusinessTargetDoneMonth(Map<String, Object> params);

	/**
	 * 将地市编码5位转为3位
	 * 
	 * @Title getCityCode
	 * @Author xiaogaoxiang
	 * @param string
	 * @return Map<String,Object>
	 */
	Map<String, Object> getCityCode(@Param("orgId") String orgId);
	
	/**
	 * 获取区县编码
	 * 
	 * @Title getCntyCode
	 * @Author caoxiaojuan
	 * @param string
	 * @return Map<String,Object>
	 */
	List<Map<String, Object>> getCntyCode(@Param("orgId") String orgId);

	/**
	 * 酬金月报报表
	 * 
	 * @Title getCjybDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getCjybDetail(Map<String, Object> params);

	/**
	 * 装维信息报表
	 * 
	 * @Title getZwxxDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getZwxxDetail(Map<String, Object> params);

	/**
	 * 任务月报
	 * 
	 * @Title getRwybDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getRwybDetail(Map<String, Object> params);

	/**
	 * 投诉报表
	 * 
	 * @Title getTsxxDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getTsxxDetail(Map<String, Object> params);

	/**
	 * 行销任务报表
	 * 
	 * @Title getXxrwDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getXxrwDetail(Map<String, Object> params);

	/**
	 * 日月累计报表
	 * 
	 * @Title getRyljbbDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getRyljbbDetail(Map<String, Object> params);

	/**
	 * 客户发展日报表
	 * 
	 * @Title customerDevelopDay
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> customerDevelopDay(Map<String, Object> params);

	/**
	 * 客户发展周报表
	 * 
	 * @Title customerDevelopWeek
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> customerDevelopWeek(Map<String, Object> params);

	/**
	 * 客户发展月报表
	 * 
	 * @Title customerDevelopMonth
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> customerDevelopMonth(Map<String, Object> params);

	/**
	 * 根据对标类型，查询最大日期
	 * 
	 * @Title getMaxBenchmarkingsnAlysisStatisDate
	 * @Author xiaogaoxiang
	 * @param type
	 * @return Map<String,Object>
	 */
	Map<String, Object> getMaxBenchmarkingsnAlysisStatisDate(@Param("type") String type);

	/**
	 * 查询对标分析内容
	 * 
	 * @Title getBenchmarkingAnalysis
	 * @Author xiaogaoxiang
	 * @param type
	 * @param statisDate
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getBenchmarkingAnalysis(@Param("type") String type, @Param("orgIds") List<String> orgIds, @Param("statisDate") String statisDate);

	/**
	 * 根据选择的排序类型将指标分析进行排序
	 * 
	 * @Title getBenchmarkingAnalysisOrder
	 * @Author xiaogaoxiang
	 * @param type
	 * @param statisDate
	 * @param orderNum
	 * @param ascOrDesc
	 * @return List<Map<String,Object>>
	 */
	@SelectProvider(type = FirstPageThreeMapperSql.class, method = "getBenchmarkingAnalysisOrder")
	List<Map<String, Object>> getBenchmarkingAnalysisOrder(Map<String, Object> params);

	/**
	 * 根据对应的条件，查询自助报表的表结构，查询出要展示的字段，要显示的条件信息
	 * 
	 * @Title getSelfHelpReportInfo
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return Map<String,Object>
	 */
	Map<String, Object> getSelfHelpReportInfo(@Param("netCode") String netCode);

	/**
	 * 自助分析报表查询列表
	 * 
	 * @Title selectSelfHelpReportInfoList
	 * @Author xiaogaoxiang
	 * @param jsonStr
	 * @return List<Map<String,Object>>
	 */
	@SelectProvider(type = FirstPageThreeMapperSql.class, method = "selectSelfHelpReportInfoList")
	List<Map<String, Object>> selectSelfHelpReportInfoList(String jsonStr);

	/**
	 * 查询自助分析报表条件类型
	 * 
	 * @Title selectHelpReportConditionList
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectHelpReportConditionList(@Param("netCode") String netCode);

	/**
	 * 查询自助分析报表条件内容表
	 * 
	 * @Title selectHelpReportContentList
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectHelpReportContentList(@Param("netCode") String netCode);

	/**
	 * 自主分析报表如果有账期，则查询该表的最大账期
	 * 
	 * @Title getSelfHelpReportStatisDate
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@SelectProvider(type = FirstPageThreeMapperSql.class, method = "getSelfHelpReportStatisDate")
	Map<String, Object> getSelfHelpReportStatisDate(Map<String, Object> params);
}
