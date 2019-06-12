package com.bonc.report.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.map.dao.entity.MapInfo;

/**
 * 
 * @FileName RptCompositeMapper.java
 * @Author xiaogaoxiang
 * @At 2019年3月8日 下午4:36:51
 * @Desc 报表专区Mapper
 */
public interface RptCompositeMapper {

	/**
	 * 查询放号报表
	 * 
	 * @Title selectformTeleNo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> selectformTeleNo(Map<String, Object> params);

	/**
	 * 查询放号报表导出
	 * 
	 * @Title selectformTeleNoExport
	 * @Author caoxiaojuan
	 * @param params
	 * @return Page<Map<String,Object>>
	 */
	List<Map<String, Object>> selectformTeleNoExport(Map<String, Object> params);

	/**
	 * 查询新增宽带报表
	 * 
	 * @Title selectformBroadBandAdd
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> selectformBroadBandAdd(Map<String, Object> params);

	/**
	 * 个人/新增客户总计费收入
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> getFormCustomerFeeInfo(Map<String, Object> map);

	/**
	 * 汇总计费收入目标值和当月累计收入
	 * 
	 * @param params
	 * @return
	 */
	Map<String, Object> totalFormCustomerFeeInfo(Map<String, Object> params);

	List<Map<String, Object>> selectFormCustomerFusion(Map<String, Object> paramMap);

	List<Map<String, Object>> selectFormEnclosureSum(Map<String, Object> paramMap);

	/**
	 * 获取不同地区的高价值低占小区渗透提升数据
	 * 
	 * @param param
	 * @return
	 */
	List<Map<String, Object>> getInfiltrationCellGroupByArea(Map<String, Object> param);

	/**
	 * 获取不同地区的高价值低占小区渗透提升数据版本1
	 * 
	 * @param param
	 * @return
	 */
	List<Map<String, Object>> getInfiltrationCellGroupByArea1(Map<String, Object> param);

	/**
	 * 获取90后客户规模提升
	 * 
	 * @param param
	 * @return
	 */
	List<Map<String, Object>> getFormCusaddAfterNinety(Map<String, Object> param);

	/**
	 * 获取不同地区的新增价值洼地数据
	 * 
	 * @param param
	 * @return
	 */
	List<Map<String, Object>> getDepressionAddGroupByArea(Map<String, Object> param);

	/**
	 * 获取高价值低占小区渗透提升汇总数据
	 * 
	 * @param param
	 * @return
	 */
	Map<String, Object> getInfiltrationCellSummary(Map<String, Object> param);

	/**
	 * 获取90后客户规模汇总数据
	 * 
	 * @param param
	 * @return
	 */
	Map<String, Object> getFormCusaddAfterNinetySummary(Map<String, Object> param);

	/**
	 * 获取高价值低占小区渗透提升汇总数据版本1
	 * 
	 * @param param
	 * @return
	 */
	Map<String, Object> getInfiltrationCellSummary1(Map<String, Object> param);

	/**
	 * 获取新增价值洼地汇总数据
	 * 
	 * @param param
	 * @return
	 */
	Map<String, Object> getDepressionAddSummary(Map<String, Object> param);

	/**
	 * 汇总信息
	 * 
	 * @Title totalinfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	Map<String, Object> totalinfo(Map<String, Object> params);

	/**
	 * 获取终端合约
	 * 
	 * @Title getformterminalcontract
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getformterminalcontract(Map<String, Object> params);

	/**
	 * 获取家庭网新增信息
	 * 
	 * @Title getformhomenetadd
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getformhomenetadd(Map<String, Object> params);

	/**
	 * 头部客户宽带新增
	 * 
	 * @Title getHeadCustomerAddInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getHeadCustomerAddInfo(Map<String, Object> params);

	Map<String, Object> getheadcustomeraddinfoSummary(Map<String, Object> params);

	Map<String, Object> getheadcustomeraddinfoSummaryDay(Map<String, Object> params);

	/**
	 * 获取终端合一二
	 * 
	 * @Title getformterminalcontractsum
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getformterminalcontractsum(Map<String, Object> params);

	/**
	 * 获取家庭网新增信息一二
	 * 
	 * @Title getformhomenetaddsum
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	Map<String, Object> getformhomenetaddsum(Map<String, Object> params);

	Map<String, Object> getSumFormCustomerFusion(Map<String, Object> params);

	List<Map<String, Object>> SchoolCustomer(Map<String, Object> paramMap);

	List<Map<String, Object>> selectFormSchoolCustomer(Map<String, Object> paramMap);

	List<Map<String, Object>> selectFormCustomerOverall(Map<String, Object> paramMap);

	List<Map<String, Object>> selectFormSmallMarket(Map<String, Object> paramMap);

	Map<String, Object> getSumFormEnclosureSum(Map<String, Object> params);

	/**
	 * 根据orgId查询网格轮廓
	 * 
	 * @Title getGridInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<MapInfo>
	 */
	List<MapInfo> getGridInfoByOrgId(@Param("orgId") String orgId);

	/**
	 * 根据登录人的信息，改变orgId
	 * 
	 * @Title changeOrgSysInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	Map<String, Object> changeOrgSysInfo(@Param("orgId") String orgId);

	/**
	 * 查询所有表不分页信息
	 * 
	 * @Title allList
	 * @Author caoxiaojuan
	 * @param orgId
	 * @return List<MapInfo>
	 */
	List<Map<String, Object>> allList(Map<String, Object> params);

	/**
	 * 查询单个组织记录
	 * 
	 * @Title getSignalAreaOrChnlInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getSignalAreaOrChnlInfo(@Param("orgId") String orgId);

	/**
	 * 查询子节点信息
	 * 
	 * @Title getAreaOrChnlInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getAreaOrChnlInfo(@Param("orgId") String orgId);

	/**
	 * 获取子节点SysOrg信息
	 * 
	 * @Title getChildrenSysOrgInfo
	 * @Author xiaogaoxiang
	 * @param orgLevel
	 * @param orgId
	 * @param type
	 * @param areaId
	 * @param orgLevel
	 * @return List<Map<String,Object>>
	 */
	List<Map<String, Object>> getChildrenSysOrgInfo(@Param("orgId") String orgId, @Param("type") String type, @Param("areaId") String areaId,
			@Param("orgLevel") String orgLevel);

	/**
	 * 获取报表最大STATIS_DATE
	 * 
	 * @param conditionOne
	 * @Title getMaxDate
	 * @Author xiaogaoxiang
	 * @return Map<String,Object>
	 */
	Map<String, Object> getMaxDate(@Param("conditionOne") String conditionOne);

	Map<String, Object> getSumFormCustomerOverall(Map<String, Object> params);

	Map<String, Object> getSumFormSchoolCustomer(Map<String, Object> params);

	Map<String, Object> getSumFormSmallMarket(Map<String, Object> params);

	List<Map<String, Object>> selectFormCustomerOverallByCondition(Map<String, Object> map);

}
