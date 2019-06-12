package com.bonc.report.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpSession;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.ExportUtils;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.map.service.GridCommonService;
import com.bonc.report.dao.mapper.RptCompositeMapper;
import com.bonc.system.dao.entity.SysUser;

/**
 * 
 * @FileName RptCompositeService.java
 * @Author xiaogaoxiang
 * @At 2019年3月8日 下午4:36:41
 * @Desc 报表专区Service
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class RptCompositeService {

	@Resource
	private RptCompositeMapper rptCompositeMapper;
	@Resource
	private GridCommonService gridCommonService;
	@Resource
	private FirstPageThreeService firstPageThreeService;

	/**
	 * 查询放号报表
	 * 
	 * @Title selectformTeleNo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：selectformTeleNo，作用：首页/报表专区/重点业务：查询放号报表列表数据】")
	public List<Map<String, Object>> selectformTeleNo(Map<String, Object> params) {
		return rptCompositeMapper.selectformTeleNo(params);
	}

	/**
	 * 查询新增宽带报表
	 * 
	 * @Title selectformBroadBandAdd
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：selectformBroadBandAdd，作用：首页/报表专区/重点业务：查询新增宽带报表列表数据】")
	public List<Map<String, Object>> selectformBroadBandAdd(Map<String, Object> params) {
		return rptCompositeMapper.selectformBroadBandAdd(params);
	}

	/**
	 * 查询个人/新增客户总计费收入报表列表数据】
	 * 
	 * @Title getFormCustomerFeeInfo
	 * @Author xiaogaoxiang
	 * @param prmMap
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getFormCustomerFeeInfo，作用：首页/报表专区/重点业务：查询个人/新增客户总计费收入报表列表数据】")
	public List<Map<String, Object>> getFormCustomerFeeInfo(Map<String, Object> prmMap) {
		return rptCompositeMapper.getFormCustomerFeeInfo(prmMap);
	}

	/**
	 * 查询个人/新增客户总计费收入报表列表数据】
	 * 
	 * @Title selectFormCustomerFusion
	 * @Author
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：selectFormCustomerFusion，作用：首页/报表专区/重点业务：查询个人/新增客户总计费收入报表列表数据】")
	public List<Map<String, Object>> selectFormCustomerFusion(Map<String, Object> paramMap) {
		return rptCompositeMapper.selectFormCustomerFusion(paramMap);
	}

	/**
	 * 客户费用汇总
	 * 
	 * @Title totalFormCustomerFeeInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：totalFormCustomerFeeInfo，作用：首页/报表专区/重点业务：客户费用汇总】")
	public Map<String, Object> totalFormCustomerFeeInfo(Map<String, Object> params) {
		Map<String, Object> returnMaps = rptCompositeMapper.totalFormCustomerFeeInfo(params);
		if (returnMaps == null) {
			returnMaps = new HashMap<String, Object>();
		}
		return returnMaps;
	}

	/**
	 * 查询个人/新增客户总计费收入报表列表数据
	 * 
	 * @Title selectFormEnclosureSum
	 * @Author
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：selectFormCustomerFusion，作用：首页/报表专区/重点业务：查询个人/新增客户总计费收入报表列表数据】")
	public List<Map<String, Object>> selectFormEnclosureSum(Map<String, Object> paramMap) {
		List<Map<String, Object>> result = rptCompositeMapper.selectFormEnclosureSum(paramMap);
		return result;
	}

	/**
	 * 获取不同地区的高价值低占小区渗透提升数据
	 * 
	 * @Title getInfiltrationCellGroupByArea
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getInfiltrationCellGroupByArea，作用：首页/报表专区/重点业务：获取不同地区的高价值低占小区渗透提升数据】")
	public List<Map<String, Object>> getInfiltrationCellGroupByArea(Map<String, Object> params) {
		return rptCompositeMapper.getInfiltrationCellGroupByArea(params);
	}

	/**
	 * 获取不同地区的高价值低占小区渗透提升数据版本1
	 * 
	 * @Title getInfiltrationCellGroupByArea1
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getInfiltrationCellGroupByArea1，作用：首页/报表专区/重点业务：获取不同地区的高价值低占小区渗透提升数据版本1】")
	public List<Map<String, Object>> getInfiltrationCellGroupByArea1(Map<String, Object> params) {
		return rptCompositeMapper.getInfiltrationCellGroupByArea1(params);
	}

	/**
	 * 获取90后客户规模提升
	 * 
	 * @Title getFormCusaddAfterNinety
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getFormCusaddAfterNinety，作用：首页/报表专区/重点业务：获取90后客户规模提升】")
	public List<Map<String, Object>> getFormCusaddAfterNinety(Map<String, Object> params) {
		return rptCompositeMapper.getFormCusaddAfterNinety(params);
	}

	/**
	 * 获取不同地区的新增价值洼地数据
	 * 
	 * @Title getDepressionAddGroupByArea
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getDepressionAddGroupByArea，作用：首页/报表专区/重点业务：获取不同地区的新增价值洼地数据】")
	public List<Map<String, Object>> getDepressionAddGroupByArea(Map<String, Object> params) {
		return rptCompositeMapper.getDepressionAddGroupByArea(params);
	}

	/**
	 * 获取高价值低占小区渗透提升汇总数据
	 * 
	 * @Title getInfiltrationCellSummary
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getInfiltrationCellSummary，作用：首页/报表专区/重点业务：获取高价值低占小区渗透提升汇总数据】")
	public Map<String, Object> getInfiltrationCellSummary(Map<String, Object> params) {
		return rptCompositeMapper.getInfiltrationCellSummary(params);
	}

	/**
	 * 获取高价值低占小区渗透提升汇总数据
	 * 
	 * @Title getFormCusaddAfterNinetySummary
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getFormCusaddAfterNinetySummary，作用：首页/报表专区/重点业务：获取90后客户规模汇总数据】")
	public Map<String, Object> getFormCusaddAfterNinetySummary(Map<String, Object> params) {
		return rptCompositeMapper.getFormCusaddAfterNinetySummary(params);
	}

	/**
	 * 获取高价值低占小区渗透提升汇总数据版本1
	 * 
	 * @Title getInfiltrationCellSummary1
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getInfiltrationCellSummary1，作用：首页/报表专区/重点业务：获取高价值低占小区渗透提升汇总数据版本1】")
	public Map<String, Object> getInfiltrationCellSummary1(Map<String, Object> params) {
		return rptCompositeMapper.getInfiltrationCellSummary1(params);
	}

	/**
	 * 获取新增价值洼地汇总数据
	 * 
	 * @Title getDepressionAddSummary
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getDepressionAddSummary，作用：首页/报表专区/重点业务：获取新增价值洼地汇总数据】")
	public Map<String, Object> getDepressionAddSummary(Map<String, Object> params) {
		return rptCompositeMapper.getDepressionAddSummary(params);
	}

	/**
	 * 汇总信息
	 * 
	 * @Title totalinfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：totalinfo，作用：首页/报表专区/重点业务：查询统计报表汇总信息】")
	public Map<String, Object> totalinfo(Map<String, Object> params) {
		Map<String, Object> returnMaps = rptCompositeMapper.totalinfo(params);
		return returnMaps;
	}

	/**
	 * 获取终端合约
	 * 
	 * @Title getformterminalcontract
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getformterminalcontract，作用：首页/报表专区/重点业务：获取终端合约】")
	public List<Map<String, Object>> getformterminalcontract(Map<String, Object> params) {
		List<Map<String, Object>> formterminalcontract = rptCompositeMapper.getformterminalcontract(params);
		return formterminalcontract;
	}

	/**
	 * 获取家庭网新增信息
	 * 
	 * @Title getformhomenetadd
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getformhomenetadd，作用：首页/报表专区/重点业务：获取家庭网新增信息】")
	public List<Map<String, Object>> getformhomenetadd(Map<String, Object> params) {
		List<Map<String, Object>> formterminalcontract = rptCompositeMapper.getformhomenetadd(params);
		return formterminalcontract;
	}

	/**
	 * 头部客户宽带新增
	 * 
	 * @Title getHeadCustomerAddInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getHeadCustomerAddInfo，作用：首页/报表专区/重点业务：重点业务/头部客户宽带新增报表展示】")
	public List<Map<String, Object>> getHeadCustomerAddInfo(Map<String, Object> params) {
		List<Map<String, Object>> mapList = rptCompositeMapper.getHeadCustomerAddInfo(params);
		return mapList;
	}

	/**
	 * 重点业务/头部客户宽带新增报表展示
	 * 
	 * @Title getheadcustomeraddinfoSummary
	 * @Author xiaogaoxiang
	 * @param params
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getheadcustomeraddinfoSummary，作用：首页/报表专区/重点业务：重点业务/头部客户宽带新增报表展示】")
	public Map<String, Object> getheadcustomeraddinfoSummary(Map<String, Object> params) {
		Map<String, Object> mapList = rptCompositeMapper.getheadcustomeraddinfoSummary(params);
		return mapList;
	}

	/**
	 * 获取终端合约一二
	 * 
	 * @Title getformterminalcontractsum
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getformterminalcontractsum，作用：首页/报表专区/重点业务：获取终端合约汇总信息】")
	public List<Map<String, Object>> getformterminalcontractsum(Map<String, Object> params) {
		List<Map<String, Object>> formterminalcontractsum = rptCompositeMapper.getformterminalcontractsum(params);
		return formterminalcontractsum;
	}

	/**
	 * 获取家庭网新增信息一二
	 * 
	 * @Title getformhomenetaddsum
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getformhomenetaddsum，作用：首页/报表专区/重点业务：获取家庭网新增汇总信息】")
	public Map<String, Object> getformhomenetaddsum(Map<String, Object> params) {
		Map<String, Object> returnMaps = rptCompositeMapper.getformhomenetaddsum(params);
		return returnMaps;
	}

	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getSumFormCustomerFusion，作用：首页/报表专区/重点业务：获取头部客户固移融合率汇总数据】")
	public Map<String, Object> getSumFormCustomerFusion(Map<String, Object> params) {
		Map<String, Object> result = rptCompositeMapper.getSumFormCustomerFusion(params);
		return result;
	}

	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getSumFormEnclosureSum，作用：首页/报表专区/重点业务：获取中小微企业圈地行动汇总数据】")
	public Map<String, Object> getSumFormEnclosureSum(Map<String, Object> params) {
		Map<String, Object> result = rptCompositeMapper.getSumFormEnclosureSum(params);
		return result;
	}

	/**
	 * 根据orgId查询网格轮廓
	 * 
	 * @Title getGridInfoByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<MapInfo>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getGridInfoByOrgId，作用：首页/报表专区/重点业务：根据orgId查询网格轮廓】")
	public List<MapInfo> getGridInfoByOrgId(String orgId) {
		return rptCompositeMapper.getGridInfoByOrgId(orgId);
	}

	/**
	 * 根据登录人的信息，改变orgId
	 * 
	 * @Title changeOrgSysInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：changeOrgSysInfo，作用：首页/报表专区/重点业务：根据登录人的信息，改变orgId】")
	public Map<String, Object> changeOrgSysInfo(String orgId) {
		return rptCompositeMapper.changeOrgSysInfo(orgId);
	}

	/**
	 * 查询所有表查询报表统计图数据
	 * 
	 * @Title allList
	 * @Author caoxiaojuan
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：allList，作用：首页/报表专区/重点业务：查询报表统计图数据】")
	public List<Map<String, Object>> allList(Map<String, Object> params) {
		List<Map<String, Object>> allList = rptCompositeMapper.allList(params);
		return allList;
	}

	/**
	 * 查询单个组织记录
	 * 
	 * @Title getSignalAreaOrChnlInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getSignalAreaOrChnlInfo，作用：查询单个组织记录】")
	public List<Map<String, Object>> getSignalAreaOrChnlInfo(String orgId) {
		return rptCompositeMapper.getSignalAreaOrChnlInfo(orgId);
	}

	/**
	 * 查询子节点信息
	 * 
	 * @Title getAreaOrChnlInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getAreaOrChnlInfo，作用：查询子节点信息】")
	public List<Map<String, Object>> getAreaOrChnlInfo(String orgId) {
		return rptCompositeMapper.getAreaOrChnlInfo(orgId);
	}

	/**
	 * 获取子节点SysOrg信息
	 * 
	 * @Title getChildrenSysOrgInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param type
	 * @param areaId
	 * @param orgLevel
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getChildrenSysOrgInfo，作用：获取子节点SysOrg信息】")
	public List<Map<String, Object>> getChildrenSysOrgInfo(String orgId, String type, String areaId, String orgLevel) {
		return rptCompositeMapper.getChildrenSysOrgInfo(orgId, type, areaId, orgLevel);
	}

	/**
	 * 获取报表最大STATIS_DATE
	 * 
	 * @param conditionOne
	 * @Title getMaxDate
	 * @Author xiaogaoxiang
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getMaxDate，作用：获取报表最大STATIS_DATE】")
	public Map<String, Object> getMaxDate(String conditionOne) {
		return rptCompositeMapper.getMaxDate(conditionOne);
	}

	/**
	 * 报表导出
	 * 
	 * @Title exportRptInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @param conditionOne
	 * @param conditionTwo
	 * @param conditionTwo2
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	public void exportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo, String gcFalg,
			ServletOutputStream outputStream, HttpSession session) throws IOException {
		SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String cdOrgId = orgId;
		orgId = sysUser.getOrgId();
		String userOrgLevel = sysUser.getOrgLevel().toString();
		// 当选择的是地市
		if (userOrgLevel.equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(orgId);
			orgId = orgIdMap.get("OLD_ORG_ID").toString();
		}
		if ("FH".equals(conditionOne)) {
			// 放号
			fhExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("XZKD".equals(conditionOne)) {
			// 新增宽带
			xzkdExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("ZDHY".equals(conditionOne)) {
			// 终端合约
			zdhyExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("JTWXZ".equals(conditionOne)) {
			// 终端合约
			jtwxzExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("GJZDZXQSTTS".equals(conditionOne)) {
			// 高价值低占小区渗透提升
			gjzdzxqsttsExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("GJDZXQKDXZ".equals(conditionOne)) {
			// 高价低占小区宽带新增
			gjdzxqkdxzExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("90HKHGMTS".equals(conditionOne)) {
			// 90后客户规模提升
			hkhgmtsExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("XZJZWD".equals(conditionOne)) {
			// 新增价值洼地
			xzjzwdExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("TBKHGYRHL".equals(conditionOne)) {
			tbkhgyrhlExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("ZXWQYQDXD".equals(conditionOne)) {
			// 中小微企业圈地行动
			zxwqyqdxdExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("GRKHZJFSR".equals(conditionOne)) {
			// 个人客户总计费收入
			grkhzjfsrExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("XZKHZJFSR".equals(conditionOne)) {
			// 新增客户总计费收入
			xzkhzjfsrExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		} else if ("TBKHZTQK".equals(conditionOne)) {
			// 头部整体情况
			TBKHZTQKExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, session);
		} else if ("XWSC".equals(conditionOne)) {
			// 小微市场
			XWSCExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, gcFalg, outputStream, session);
		} else if ("XYKH".equals(conditionOne)) {
			// 新增宽带
			XYKHExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, session);
		} else if ("CD-YRG-1".equals(conditionOne)) {
			// CD类已入格
			CDYRGExportRptInfo(cdOrgId, orgLevel, conditionOne, outputStream);
		} else if ("CD-WRG-2".equals(conditionOne)) {
			// CD类未入格
			CDYRGExportRptInfo(cdOrgId, orgLevel, conditionOne, outputStream);
		} else if ("AB-YRG-1".equals(conditionOne)) {
			// AB类已入格
			ABYRGExportRptInfo(cdOrgId, orgLevel, conditionOne, outputStream);
		} else if ("AB-WRG-2".equals(conditionOne)) {
			// AB类未入格
			ABYRGExportRptInfo(cdOrgId, orgLevel, conditionOne, outputStream);
		} else if ("TBKHKDXZ".equals(conditionOne)) {
			// 头部客户宽带新增
			tbkhkdxzExportRptInfo(orgId, orgLevel, statisDate, conditionOne, conditionTwo, outputStream, userOrgLevel);
		}
	}

	/**
	 * 放号报表导出
	 * 
	 * @Title fhExportRptInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：fhExportRptInfo，作用：首页/报表专区/重点业务：放号报表导出】")
	private void fhExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo, ServletOutputStream outputStream,
			String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "放号Sheet";
		titleName = "放号报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		
		String dayOrMonthName = null;
		String dayOrMonthFh = null;
		String name1 = "";
		String name2 = "";
		if ("day".equals(conditionTwo)) {
			dayOrMonthName = "当日目标值（户）";
			dayOrMonthFh = "当日放号量（户）";
			name1 = "超欠产量（户）";
			name2 = "进度";
		} else {
			dayOrMonthName = "当月目标值（户）";
			dayOrMonthFh = "当月放号量（户）";
			name1 = "较时间进度超欠产";
			name2 = "较时间进度完成率";
		}
		String[] titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", dayOrMonthName, dayOrMonthFh, name1, name2, "一级排名",
		"二级排名" };
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME" };
		if ("day".equals(conditionTwo)) {
			columns = insert(columns, "TARGET_D");
			columns = insert(columns, "TELE_D");
			columns = insert(columns, "OWE_D");
			columns = insert(columns, "RATE_D");
			columns = insert(columns, "ORDER1_D");
			columns = insert(columns, "ORDER2_D");
		} else {
			columns = insert(columns, "TARGET_M");
			columns = insert(columns, "TELE_M");
			columns = insert(columns, "OWE_M");
			columns = insert(columns, "RATE_M");
			columns = insert(columns, "ORDER1_M");
			columns = insert(columns, "ORDER2_M");
		}
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);// 传userOrgLevel，登录用户所在地市层级，层级下面的都可以导出，在同一个查询里查全量导出数据，和上面orgLevel不同时存在
		// 根据归属网格查询列表
		allPoiLists = rptCompositeMapper.selectformTeleNo(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	// 往字符串数组追加新数据
	private static String[] insert(String[] arr, String str) {
		int size = arr.length; // 获取数组长度
		String[] tmp = new String[size + 1]; // 新建临时字符串数组，在原来基础上长度加一
		for (int i = 0; i < size; i++) { // 先遍历将原来的字符串数组数据添加到临时字符串数组
			tmp[i] = arr[i];
		}
		tmp[size] = str; // 在最后添加上需要追加的数据
		return tmp; // 返回拼接完成的字符串数组
	}

	/**
	 * 新增宽带报表导出
	 * 
	 * @Title xzkdExportRptInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：xzkdExportRptInfo，作用：首页/报表专区/重点业务：新增宽带报表导出】")
	private void xzkdExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo, ServletOutputStream outputStream,
			String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "新增宽带Sheet";
		titleName = "新增宽带报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		String dayOrMonthName = null;
		String dayOrMonthFh = null;
		String name1 = "";
		String name2 = "";
		if ("day".equals(conditionTwo)) {
			dayOrMonthName = "当日目标值（户）";
			dayOrMonthFh = "当日下单量（户）";
			name1 = "超欠产量（户）";
			name2 = "完成进度";
		} else {
			dayOrMonthName = "当月目标值（户）";
			dayOrMonthFh = "当月下单量（户）";
			name1 = "较时间进度超欠产";
			name2 = "较时间进度完成率";
		}
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", dayOrMonthName, dayOrMonthFh, "完成值(户)", "在途工单(个)",
				"撤单量(个)", name1, name2, "一级排名", "二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
				sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME" };
		if ("day".equals(conditionTwo)) {
			columns = insert(columns, "TARGET_D");
			columns = insert(columns, "ORDER_SUM_D");
			columns = insert(columns, "COMPLETE_VALUE_D");
			columns = insert(columns, "ORDERING_SUM_D");
			columns = insert(columns, "ORDER_REVOKE_D");
			columns = insert(columns, "OWE_D");
			columns = insert(columns, "RATE_D");
			columns = insert(columns, "ORDER1_D");
			columns = insert(columns, "ORDER2_D");
		} else {
			columns = insert(columns, "TARGET_M");
			columns = insert(columns, "ORDER_SUM_M");
			columns = insert(columns, "COMPLETE_VALUE_M");
			columns = insert(columns, "ORDERING_SUM_M");
			columns = insert(columns, "ORDER_REVOKE_M");
			columns = insert(columns, "OWE_M");
			columns = insert(columns, "RATE_M");
			columns = insert(columns, "ORDER1_M");
			columns = insert(columns, "ORDER2_M");
		}
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格查询列表
		allPoiLists = rptCompositeMapper.selectformBroadBandAdd(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 终端合约
	 * 
	 * @Title zdhyExportRptInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：zdhyExportRptInfo，作用：首页/报表专区/重点业务：终端合约报表导出】")
	private void zdhyExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo, ServletOutputStream outputStream,
			String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "终端合约Sheet";
		titleName = "终端合约报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		String dayOrMonthName = null;
		String dayOrMonthFh = null;
		String name1 = "";
		String name2 = "";
		if ("day".equals(conditionTwo)) {
			dayOrMonthName = "当日手机终端合约(台)";
			dayOrMonthFh = "当日泛终端合约(台)";
			name1 = "超欠产（台）";
			name2 = "进度";
		} else {
			dayOrMonthName = "当月手机终端合约(台)";
			dayOrMonthFh = "当月泛终端合约(台)";
			name1 = "较时间进度超欠产";
			name2 = "较时间进度完成率";
		}
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "目标值", dayOrMonthName, dayOrMonthFh, "完成值(台)", name1,
				name2, "一级排名", "二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME" };
		if ("day".equals(conditionTwo)) {
			columns = insert(columns, "TARGET_D");
			columns = insert(columns, "MOBILE_CONTRACT_D");
			columns = insert(columns, "TERMINAL_CONTRACT_D");
			columns = insert(columns, "COMPLETE_VALUE_D");
			columns = insert(columns, "OWE_D");
			columns = insert(columns, "RATE_D");
			columns = insert(columns, "ORDER1_D");
			columns = insert(columns, "ORDER2_D");
		} else {
			columns = insert(columns, "TARGET_M");
			columns = insert(columns, "MOBILE_CONTRACT_M");
			columns = insert(columns, "TERMINAL_CONTRACT_M");
			columns = insert(columns, "COMPLETE_VALUE_D");
			columns = insert(columns, "OWE_M");
			columns = insert(columns, "RATE_M");
			columns = insert(columns, "ORDER1_M");
			columns = insert(columns, "ORDER2_M");
		}
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getformterminalcontract(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 家庭网新增
	 * 
	 * @Title jtwxzExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：jtwxzExportRptInfo，作用：首页/报表专区/重点业务：家庭网新增报表导出】")
	private void jtwxzExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "家庭网新增Sheet";
		titleName = "家庭网新增报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		String dayOrMonthName = null;
		String name1 = "";
		String name2 = "";
		if ("day".equals(conditionTwo)) {
			dayOrMonthName = "当日新增家庭网(户)";
			name1 = "超欠产量（户）";
			name2 = "进度";
		} else {
			dayOrMonthName = "当月新增家庭网(户)";
			name1 = "较时间进度超欠产";
			name2 = "较时间进度完成率";
		}
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "目标值(户)", dayOrMonthName, name1, name2, "一级排名", "二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME" };
		if ("day".equals(conditionTwo)) {
			columns = insert(columns, "TARGET_D");
			columns = insert(columns, "HOMENET_ADD_D");
			columns = insert(columns, "OWE_D");
			columns = insert(columns, "RATE_D");
			columns = insert(columns, "ORDER1_D");
			columns = insert(columns, "ORDER2_D");
		} else {
			columns = insert(columns, "TARGET_M");
			columns = insert(columns, "HOMENET_ADD_M");
			columns = insert(columns, "OWE_M");
			columns = insert(columns, "RATE_M");
			columns = insert(columns, "ORDER1_M");
			columns = insert(columns, "ORDER2_M");
		}
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getformhomenetadd(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 高价值低占小区渗透提升
	 * 
	 * @Title gjzdzxqsttsExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：gjzdzxqsttsExportRptInfo，作用：首页/报表专区/重点业务：高价值低占小区渗透提升报表导出】")
	private void gjzdzxqsttsExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "高价值低占小区渗透提升Sheet";
		titleName = "高价值低占小区渗透提升报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "当月提升目标值", "高价值低占小区宽带九级地址数(个)", "高价值低占小区已用九级地址数(个)",
				"当月渗透率", "上月渗透率", "提升值", "超欠产(个)", "一级排名", "二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME" };
		columns = insert(columns, "TARGET");
		columns = insert(columns, "CELL_SUM");
		columns = insert(columns, "CELL_NUM");
		columns = insert(columns, "PERMEABILITY");
		columns = insert(columns, "PERMEABILITY_LASTPERIOD");
		columns = insert(columns, "ADD_SUM");
		columns = insert(columns, "OWE");
		columns = insert(columns, "ORDER1");
		columns = insert(columns, "ORDER2");
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getInfiltrationCellGroupByArea(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 高价值低占小区宽带新增
	 * 
	 * @Title gjzdzxqsttsExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：gjdzxqkdxzExportRptInfo，作用：首页/报表专区/重点业务：高价值低占小区宽带新增】")
	private void gjdzxqkdxzExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "高价低占小区宽带新增Sheet";
		titleName = "高价低占小区宽带新增报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		String[] columns = null;
		if (conditionTwo.equals("day")) {
			titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "当日高价低占小区宽带新增目标值", "当日高价低占小区宽带新增完成", "超欠产", "完成率", "当前高价低占小区九级地址数",
					"当前高价低占小区已用九级地址数", "当前高价低占小区渗透率", "昨日高价低占小区已用地址数", "当日已用地址数月净增", "一级排名", "二级排名" };
			columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "TARGET_D", "CELL_COUNT_D",
					"OWE_D", "RATE_D", "CELL_SUM", "CELL_NUM", "PERMEABILITY_D", "CELL_NUM_YS_D", "CELL_NUM_JZ_D", "ORDER1_D", "ORDER1_D" };
		} else {
			titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "当月高价低占小区宽带新增目标值", "当月高价低占小区宽带新增完成", "较时间进度完成率", "较时间进度超欠产",
					"当前高价低占小区九级地址数", "当前高价低占小区已用九级地址数", "当前高价低占小区渗透率", "上月高价低占小区已用地址数", "当月已用地址数月净增", "一级排名", "二级排名" };
			columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "TARGET_M", "CELL_COUNT",
					"CELL_TIME_OWE", "CELL_TIME_RATE", "CELL_SUM", "CELL_NUM", "PERMEABILITY_D", "CELL_NUM_LAST_D", "CELL_NUM_JZ_COUNT", "ORDER1", "ORDER2" };
		}
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getInfiltrationCellGroupByArea1(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 90后客户规模提升
	 * 
	 * @Title gjzdzxqsttsExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：90hkhgmtsExportRptInfo，作用：首页/报表专区/重点业务：90后客户规模提升】")
	private void hkhgmtsExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "90后客户规模提升Sheet";
		titleName = "90后客户规模提升报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		String[] columns = null;
		if (conditionTwo.equals("day")) {
			titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "当日90后净增目标值", "当日90后净增完成值", "超欠产", "完成率", "当月90后规模到达目标值",
					"上月期末90后规模到达值", "当前90后规模到达值", "当月90后客户规模净增", "一级排名", "二级排名" };
			columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "DEPADD_TARGET_D", "DEPADD_D",
					"DEPADD_OWE", "DEPADD_RATE_D", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_SUM_JZ_COUNT", "ORDER1_D", "ORDER2_D" };
		} else {
			titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "当月90后净增目标值", "当月90后净增完成值", "较时间进度超欠产", "较时间进度完成率", "当月90后规模到达目标值",
					"上月期末90后规模到达值", "当前90后规模到达值", "当月90后客户规模净增", "一级排名", "二级排名" };
			columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "DEPADD_TARGET_M", "DEPADD_M",
					"DEPADD_TIME_OWE", "DEPADD_TIME_RATE", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_SUM_JZ_COUNT", "ORDER1", "ORDER2" };
		}
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getFormCusaddAfterNinety(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 新增价值洼地
	 * 
	 * @Title xzjzwdExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：xzjzwdExportRptInfo，作用：首页/报表专区/重点业务：新增价值洼地报表导出】")
	private void xzjzwdExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "新增价值洼地Sheet";
		titleName = "新增价值洼地报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "当月目标值(个)", "90后到达客户数(个)", "欠产(个)", "进度", "一级排名",
				"二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, 14);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME", "TARGET",
				"CELL_SUM", "OWE", "RATE", "ORDER1", "ORDER2" };
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getDepressionAddGroupByArea(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 头部客户固移融合率
	 * 
	 * @Title tbkhgyrhlExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：tbkhgyrhlExportRptInfo，作用：首页/报表专区/重点业务：头部客户固移融合率报表导出】")
	private void tbkhgyrhlExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "头部客户固移融合率Sheet";
		titleName = "头部客户固移融合率报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "当月目标值", "头部客户数(个)", "固移融合头部客户(个)", "头部客户固移融合率", "超欠产(个)",
				"进度", "一级排名", "二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME", "TARGET",
				"HEAD_CLIENT", "FUSE_TYPE_BRO", "FUSE_RETA", "OWE", "RATE", "ORDER1", "ORDER2" };
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.selectFormCustomerFusion(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 中小微企业圈地行动
	 * 
	 * @Title zxwqyqdxdExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：zxwqyqdxdExportRptInfo，作用：首页/报表专区/重点业务：中小微企业圈地行动报表导出】")
	private void zxwqyqdxdExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "商客拓展Sheet";
		titleName = "商客拓展报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		String dayOrMonthName = null;
		String dayOrMonthNum = null;
		String name1 = "";
		String name2 = "";
		if (conditionTwo.equals("day")) {
			dayOrMonthName = "当日目标(个)";
			dayOrMonthNum = "当日完成量(个)";
			name1 = "超欠产量（个）";
			name2 = "进度";
		} else {
			dayOrMonthName = "当月目标(个)";
			dayOrMonthNum = "当月完成量(个)";
			name1 = "较时间进度超欠产";
			name2 = "较时间进度完成率";
		}
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", dayOrMonthName, dayOrMonthNum, "其中小微宽带(个)", "其中企业上云(个)",
				name1, name2, "一级排名", "二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME" };
		if ("day".equals(conditionTwo)) {
			columns = insert(columns, "TARGET_D");
			columns = insert(columns, "COMPLETE_D");
			columns = insert(columns, "MIC_BRO_D");
			columns = insert(columns, "ENTERPRISE_D");
			columns = insert(columns, "OWE_D");
			columns = insert(columns, "RATE_D");
			columns = insert(columns, "ORDER1_D");
			columns = insert(columns, "ORDER2_D");
		} else {
			columns = insert(columns, "TARGET_M");
			columns = insert(columns, "COMPLETE_M");
			columns = insert(columns, "MIC_BRO_M");
			columns = insert(columns, "ENTERPRISE_M");
			columns = insert(columns, "OWE_M");
			columns = insert(columns, "RATE_M");
			columns = insert(columns, "ORDER1_M");
			columns = insert(columns, "ORDER2_M");
		}
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.selectFormEnclosureSum(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 个人客户总计费收入
	 * 
	 * @Title grkhzjfsrExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：grkhzjfsrExportRptInfo，作用：首页/报表专区/重点业务：个人客户总计费收入报表导出】")
	private void grkhzjfsrExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "个人客户总计费收入Sheet";
		titleName = "个人客户总计费收入报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "计费收入目标值(万元)", "当日收入(万元)", "当月累计收入(万元)", "较时间进度完成率",
				"一级排名", "二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME",
				"TARGET_D", "FEE_D", "FEE_M", "RATE_D", "ORDER1_D", "ORDER2_D" };
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getFormCustomerFeeInfo(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 
	 * 新增客户总计费收入查询
	 * 
	 * @Title xzkhzjfsrExportRptInfo
	 * @Author caoxiaojaun
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：xzkhzjfsrExportRptInfo，作用：首页/报表专区/重点业务：新增客户总计费收入报表导出】")
	private void xzkhzjfsrExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "新增客户总计费收入Sheet";
		titleName = "新增客户总计费收入报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "计费收入目标值(万元)", "当日收入(万元)", "当月累计收入(万元)", "进度", "一级排名",
				"二级排名" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		String[] columns = null;
		columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME",
				"TARGET_D", "FEE_D", "FEE_M", "RATE_D", "ORDER1_D", "ORDER2_D" };
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		// map.put("orgLevel", orgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionOne", conditionOne);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getFormCustomerFeeInfo(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 头部整体情况
	 * 
	 * @Title TBKHZTQKExportRptInfo
	 * @Author xiqinguang
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：TBKHZTQKExportRptInfo，作用：首页/报表专区/重点业务：头部整体情况报表导出】")
	private void TBKHZTQKExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "头部客户整体情况Sheet";
		titleName = "头部客户整体情况报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		String[] titles = null;
		String[] keys = null;
		titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "2018期末客户规模", "2018年期末其中头部客户", "2018年期末其中中部客户", "2018年期末其中低端客户",
				"上月期末客户规模", "上月期末其中头部客户", "上月期末其中中部客户", "上月期末其中低端客户", "本月期末客户规模", "本月期末其中头部客户", "本月期末其中中部客户", "本月期末其中低端客户", "月累计净增", "月累计环比", "月累计升档至头部客户",
				"月累计降档出头部客户", "月累计离网头部客户", "月累计其中：网龄1年以内客户占比", "月累计其中：网龄1-2年客户占比", "月累计其中：网龄2年以上客户占比", "年累计净增", "年累计净增幅度", "年累计升档至头部客户", "年累计降档出头部客户",
				"年累计离网头部客户", "年累计其中：网龄1年以内客户占比", "年累计其中：网龄1-2年客户占比", "年累计其中：网龄2年以上客户占比" };
		keys = new String[] { "ORGLEVEL", "AREA_CODE", "AREA_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "USR_CNT_2018", "TB_CNT_2018",
				"ZB_CNT_2018", "DD_CNT_2018", "USR_CNT_L1M", "TB_CNT_L1M", "ZB_CNT_L1M", "DD_CNT_L1M", "USR_CNT_M", "TB_CNT_M", "ZB_CNT_M", "DD_CNT_M",
				"JINZ_TB", "GB_TB", "UP_TB", "DOWN_TB", "LW_TB", "NET_MON_1", "NET_MON_2", "NET_MON_3", "Y_JINZ_TB", "Y_GB_TB", "Y_UP_TB", "Y_DOWN_TB",
				"Y_LW_TB", "Y_NET_MON_1", "Y_NET_MON_2", "Y_NET_MON_3" };
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);

		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		orgId = sysUser.getOrgId();
		String userOrgLevel = sysUser.getOrgLevel().toString();
		map.put("orgId", orgId);
		map.put("userOrgLevel", userOrgLevel);
		map.put("statisDate", statisDate.substring(0, 6));
		map.put("conditionTwo", conditionTwo);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.selectFormCustomerOverall(map);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			Map<String, Object> map2 = allPoiLists.get(j);
			// 0320修改的需求
			map2.remove("AREA_CODE");
			map2.remove("CNTY_CODE");
			map2.remove("GRID_CODE");
			for (int x = 0; x < keys.length; x++) {
				for (String k1 : map2.keySet()) {
					if (k1.equals(keys[x])) {
						if (map2.get(k1) != null) {
							row.createCell(x).setCellValue(String.valueOf(map2.get(k1)));
						}
						break;
					}
				}
			}
		}
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 小微市场
	 * 
	 * @Title XWSCExportRptInfo
	 * @Author xiqinguang
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param gcFalg
	 * @param conditionTwo
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：XWSCExportRptInfo，作用：小微市场报表导出】")
	private void XWSCExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo, String gcFalg,
			ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "小微市场Sheet";
		titleName = "小微市场报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		String[] titles = null;
		String[] keys = null;

		// 0320修改
		titles = new String[] { "地市名称", "区县名称", "网格名称", "中小微企业名称", "企业规模", "标识（1-酒店宾馆/2-楼宇园区/3-沿街商铺）", "已办理小微宽带条数", "已办理企业上云套餐数", "已办理和酒店数", "集团V网客户数" };
		keys = new String[] { "AREA_NAME", "CNTY_NAME", "GRID_NAME", "GC_NAME", "GC_SIZE", "GC_FALG", "KD_CNT", "QSY_CNT", "HJD_CNT", "VUSR_CNT" };

		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);

		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		orgId = sysUser.getOrgId();
		String userOrgLevel = sysUser.getOrgLevel().toString();
		map.put("orgId", orgId);
		map.put("userOrgLevel", userOrgLevel);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("gcFalg", gcFalg);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.selectFormSmallMarket(map);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			Map<String, Object> map2 = allPoiLists.get(j);
			// 0320修改的需求
			map2.remove("AREA_CODE");
			map2.remove("CNTY_CODE");
			map2.remove("GRID_CODE");
			for (int x = 0; x < keys.length; x++) {
				for (String k1 : map2.keySet()) {
					if (k1.equals(keys[x])) {
						if (map2.get(k1) != null) {
							row.createCell(x).setCellValue(String.valueOf(map2.get(k1)));
						}
						break;
					}
				}
			}
		}

		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * CD类已入格导出
	 * 
	 * @Title CDYRGExportRptInfo
	 * @Author caoxiaojuan
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：CDYRGExportRptInfo，作用：CD类已入格集团报表导出】")
	private void CDYRGExportRptInfo(String orgId, String userOrgLevel, String conditionOne, ServletOutputStream outputStream) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		Map<String, Object> map = new HashMap<String, Object>();// 定义参数
		// 查询出对应选择的基础单元的信息
		if (conditionOne.equals("CD-YRG-1")) {
			sheetName = "CD类已入格Sheet";
			titleName = "CD类已入格报表汇总";
			map.put("isEnter", "是");// 已入格
		} else {
			sheetName = "CD类未入格Sheet";
			titleName = "CD类未入格报表汇总";
			map.put("isEnter", "否");// 未入格
		}
		Sheet sheet = workbook.createSheet(sheetName);
		String[] titles = null;
		String[] columns = null;
		// 定义整合所有的基础单元集合
		List<Map<String, Object>> allPoiLists = new ArrayList<Map<String, Object>>();
		titles = new String[] { "地市名称", "区县名称", "归属网格名称", "集团编码", "集团名称", "经度", "纬度", "详细地址", "联系人", "联系电话", "成员数", "是否开通小微宽带", "是否开通专线", "是否开通家庭宽带",
				"是否开通企业上云" };
		columns = new String[] { "AREA_NAME", "CNTY_NAME", "NAME", "GC_CODE", "GC_NAME", "JING_DU", "WEI_DU", "GC_ADDR", "LINKMAN", "LINKMAN_MSISDN", "EMP_NUM",
				"IS_XWKD", "IS_KTZX", "IS_JTKD", "IS_QYSY" };
		map.put("orgId", orgId);
		map.put("orgLevel", userOrgLevel);

		// 查询CD集团信息
		allPoiLists = gridCommonService.selectZYGLCDGroupInfoByGridCodes(map);
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);

		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 导出
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			for (int k = 0; k < columns.length; k++) {
				cell = row.createCell(k);
				if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
					cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
				}
			}
		}

		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * AB类已入格导出
	 * 
	 * @Title ABYRGExportRptInfo
	 * @Author caoxiaojuan
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：ABYRGExportRptInfo，作用：AB类已入格集团报表导出】")
	private void ABYRGExportRptInfo(String orgId, String userOrgLevel, String conditionOne, ServletOutputStream outputStream) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		Map<String, Object> map = new HashMap<String, Object>();// 定义参数
		// 查询出对应选择的基础单元的信息
		if (conditionOne.equals("AB-YRG-1")) {
			sheetName = "AB类已入格Sheet";
			titleName = "AB类已入格报表汇总";
			map.put("twoType", "是");// 已入格
		} else {
			sheetName = "AB类未入格Sheet";
			titleName = "AB类未入格报表汇总";
			map.put("twoType", "否");// 未入格
		}
		Sheet sheet = workbook.createSheet(sheetName);
		String[] titles = null;
		String[] columns = null;
		// 定义整合所有的基础单元集合
		List<Map<String, Object>> allPoiLists = new ArrayList<Map<String, Object>>();
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "集团编码", "集团名称", "经度", "纬度", "类型", "是否入格" };
		columns = new String[] { "AREA_ID", "AREA_NAME", "CNTY_ID", "CNTY_NAME", "GRID_CODE", "NAME", "GC_CODE", "GC_NAME", "JING_DU", "WEI_DU", "CLASS_ID",
				"ENTER_GRID" };
		map.put("orgId", orgId);
		map.put("orgLevel", userOrgLevel);
		map.put("oneType", "3");

		// 查询CD集团信息
		allPoiLists = firstPageThreeService.getJtdwInfoDetail(map);
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);

		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 导出
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			for (int k = 0; k < columns.length; k++) {
				cell = row.createCell(k);
				if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
					cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
				} else {
					if (columns[k].equals("ENTER_GRID") && map.get("twoType").equals("是")) {
						cell.setCellValue("已入格");
					} else if (columns[k].equals("ENTER_GRID") && map.get("twoType").equals("否")) {
						cell.setCellValue("未入格");
					}

				}

			}
		}
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 校园客户
	 * 
	 * @Title XYKHExportRptInfo
	 * @Author xiqinguang
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：XYKHExportRptInfo，作用：校园客户报表导出】")
	private void XYKHExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo, ServletOutputStream outputStream,
			HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "校园客户Sheet";
		titleName = "校园客户报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		String[] titles = null;
		String[] keys = null;
		// 0320修改
		titles = new String[] { "地市名称", "区县名称", "网格名称", "校园名称", "校园移网到达客户数", "已加入校园网集团客户比例", "固移融合率", "校园移网份额", "电信校园移网份额", "联通校园移网份额", "校园宽带到达客户数",
				"校园固网(宽带)份额", "电信校园固网份额", "联通校园固网份额" };
		keys = new String[] { "SCH_AREA_NAME", "CNTY_NAME", "GRID_NAME", "SCH_NAME", "CMCC_NUM", "VNET_RATE", "TELE_MOBILE_RATE", "CMCC_RATE", "CTCC_RATE",
				"CUCC_RATE", "KD_NUM", "CMCC_TELE_RATE", "CTCC_TELE_RATE", "CUCC_TELE_RATE" };
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);

		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		orgId = sysUser.getOrgId();
		String userOrgLevel = sysUser.getOrgLevel().toString();
		map.put("orgId", orgId);
		map.put("userOrgLevel", userOrgLevel);
		map.put("statisDate", statisDate.substring(0, 6));
		map.put("conditionTwo", conditionTwo);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.selectFormSchoolCustomer(map);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			Map<String, Object> map2 = allPoiLists.get(j);
			// 0320修改
			map2.remove("SCH_AREA_ID");
			map2.remove("CNTY_ID");
			map2.remove("GRID_CODE");
			for (int x = 0; x < keys.length; x++) {
				for (String k1 : map2.keySet()) {
					if (k1.equals(keys[x])) {
						if (map2.get(k1) != null) {
							row.createCell(x).setCellValue(String.valueOf(map2.get(k1)));
						}
						break;
					}
				}
			}
		}

		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 
	 * @Title selectFormCustomerOverall
	 * @Author
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：selectFormCustomerOverall，作用：获取头部客户整体情况】")
	public List<Map<String, Object>> selectFormCustomerOverall(Map<String, Object> paramMap) {
		List<Map<String, Object>> result = rptCompositeMapper.selectFormCustomerOverall(paramMap);
		return result;
	}

	/**
	 * 
	 * @Title selectFormSchoolCustomer
	 * @Author
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：selectFormSchoolCustomer，作用：获取校园客户报表导出】")
	public List<Map<String, Object>> selectFormSchoolCustomer(Map<String, Object> paramMap) {
		List<Map<String, Object>> result = rptCompositeMapper.selectFormSchoolCustomer(paramMap);
		return result;
	}

	/**
	 * 头部整体目标值
	 * 
	 * @param params
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getSumFormCustomerOverall，作用：获取头部客户整理情况】")
	public Map<String, Object> getSumFormCustomerOverall(Map<String, Object> params) {
		Map<String, Object> result = rptCompositeMapper.getSumFormCustomerOverall(params);
		return result;
	}

	/**
	 * 头部整体目标值
	 * 
	 * @param params
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getSumFormSchoolCustomer，作用：获取头部整体目标值】")
	public Map<String, Object> getSumFormSchoolCustomer(Map<String, Object> params) {
		Map<String, Object> result = rptCompositeMapper.getSumFormSchoolCustomer(params);
		return result;
	}

	/**
	 * 小微市场目标值
	 * 
	 * @param params
	 * @return
	 */

	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：getSumFormSmallMarket，作用：获取小微市场目标值】")
	public Map<String, Object> getSumFormSmallMarket(Map<String, Object> params) {
		Map<String, Object> result = rptCompositeMapper.getSumFormSmallMarket(params);
		return result;
	}

	/**
	 * 小微市场
	 * 
	 * @param paramMap
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：selectFormSmallMarket，作用：获取小微市场列表数据】")
	public List<Map<String, Object>> selectFormSmallMarket(Map<String, Object> paramMap) {
		List<Map<String, Object>> result = rptCompositeMapper.selectFormSmallMarket(paramMap);
		return result;
	}

	/**
	 * 头部客户宽带新增
	 * 
	 * @Title tbkhkdxzExportRptInfo
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @param orgLevel
	 * @param statisDate
	 * @param conditionOne
	 * @param conditionTwo
	 * @param outputStream
	 * @param userOrgLevel
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptCompositeService】", option = "【方法名：tbkhkdxzExportRptInfo，作用：首页/报表专区/重点业务：头部客户宽带新增导出】")
	private void tbkhkdxzExportRptInfo(String orgId, String orgLevel, String statisDate, String conditionOne, String conditionTwo,
			ServletOutputStream outputStream, String userOrgLevel) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "头部客户宽带新增Sheet";
		titleName = "头部客户宽带新增报表汇总";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 3、创建行
		// 3.1、创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		String[] titles = null;
		String[] columns = null;
		if (conditionTwo.equals("day")) {
			titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "当日头部客户宽带新增目标值", "当日头部客户宽带新增完成值", "超欠产", "完成率", "头部客户数",
					"当前头部客户已固移融合量", "头部客户固移融合率", "昨日期末头部客户已固移融合量", "头部客户已固移融合日净增量", "一级排名", "二级排名" };
			columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "FUSION_TARGET_D", "FUSION_D",
					"FUSION_OWE", "FUSION_RATE_D", "FUSION_SUM_LAST_M", "FUSION_SUM_D", "FUSION_RH_RATE", "FUSION_RATE_LAST_M", "FUSION_JZ_COUNT", "ORDER1_D",
					"ORDER2_D" };
		} else {
			titles = new String[] { "层级", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "当月头部客户宽带新增目标值", "当月头部客户宽带新增完成值", "较时间进度超欠产", "较时间进度完成率", "头部客户数",
					"当前头部客户已固移融合量", "头部客户固移融合率", "上月期末头部客户已固移融合量", "头部客户已固移融合月净增量", "一级排名", "二级排名" };
			columns = new String[] { "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "FUSION_TARGET_M", "FUSION_M",
					"DEPADD_TIME_OWE", "DEPADD_TIME_RATE", "FUSION_SUM_LAST_M", "FUSION_SUM_D", "FUSION_RH_RATE", "FUSION_RATE_LAST_M", "FUSION_JZ_COUNT",
					"ORDER1", "ORDER2" };
		}
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orgId", orgId);
		map.put("statisDate", statisDate);
		map.put("conditionTwo", conditionTwo);
		map.put("userOrgLevel", userOrgLevel);
		// 根据归属网格，查询集合
		allPoiLists = rptCompositeMapper.getHeadCustomerAddInfo(map);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}

	/**
	 * 导出封装方法
	 * 
	 * @Title showExportInfo
	 * @Author xiaogaoxiang
	 * @param sheet
	 * @param allPoiLists
	 * @param columns
	 *            void
	 */
	private void showExportInfo(Sheet sheet, List<Map<String, Object>> allPoiLists, String[] columns) {
		Row row = null;
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			for (int k = 0; k < columns.length; k++) {
				cell = row.createCell(k);
				if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
					if ("ORG_LEVEL".equals(columns[k]) && "1".equals(allPoiLists.get(j).get("ORG_ID").toString())
							&& "1".equals(allPoiLists.get(j).get(columns[k]).toString())) {
						cell.setCellValue("省");
					} else if ("ORG_LEVEL".equals(columns[k]) && !"1".equals(allPoiLists.get(j).get("ORG_ID").toString())
							&& "1".equals(allPoiLists.get(j).get(columns[k]).toString())) {
						cell.setCellValue("市");
					} else if ("ORG_LEVEL".equals(columns[k]) && "2".equals(allPoiLists.get(j).get(columns[k]).toString())) {
						cell.setCellValue("县");
					} else if ("ORG_LEVEL".equals(columns[k]) && "3".equals(allPoiLists.get(j).get(columns[k]).toString())) {
						cell.setCellValue("网格");
					} else if ("ORG_LEVEL".equals(columns[k]) && "4".equals(allPoiLists.get(j).get(columns[k]).toString())) {
						cell.setCellValue("渠道");
					} else {
						cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
					}
				}
			}
		}
	}
}
