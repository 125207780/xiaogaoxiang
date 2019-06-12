package com.bonc.report.service;

import java.io.IOException;
import java.util.ArrayList;
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

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.utils.ExportUtils;
import com.bonc.map.dao.mapper.FirstPageThreeMapper;
import com.bonc.map.service.FirstPageThreeSchoolService;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.report.dao.mapper.RptFirstPageThreeMapper;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;

/**
 * 
 * @FileName RptFirstPageThreeService.java
 * @Author xiaogaoxiang
 * @At 2019年4月4日 上午11:08:07
 * @Desc 首页报表导出类Service
 */
@Service
public class RptFirstPageThreeService {

	@Resource
	private RptFirstPageThreeMapper rptFirstPageThreeMapper;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	@Resource
	private SysOrgService sysOrgService;

	@Resource
	private FirstPageThreeSchoolService firstPageThreeSchoolService;

	@Resource
	private FirstPageThreeMapper firstPageThreeMapper;

	/**
	 * 业务报表导出（组合表头）
	 * 
	 * @param user
	 * 
	 * @Title exportYwblInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportYwblInfo，作用：报表专区/业务办理:网格业务办理（日/周/月）报表导出】")
	public void exportYwblInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
//		if (null == params.get("orgId") || "null".equals(params.get("orgId"))) {
//			params.remove("orgLevel");
//			params.put("orgLevel", 0);
//			// 查询所有组织信息
//			List<SysOrg> allSysOrgList = sysOrgService.selectAllSysOrg();
//			List<SysOrg> childrenSysOrgList = SysUserTreeMenuUtil.getChildrenOrgId(allSysOrgList, user.getOrgId());
//			List<String> orgIds = new ArrayList<>();
//			for (SysOrg so : childrenSysOrgList) {
//				orgIds.add(so.getOrgId());
//			}
//			orgIds.add(user.getOrgId());
//			params.remove("orgId");
//			params.put("orgId", orgIds);
//		}
//		// 当选择的是地市
//		if (params.get("orgLevel").equals("2")) {
//			// 将地市编码5位转为3位
//			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
//			params.remove("orgId");
//			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
//		}
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		style2.setAlignment(HorizontalAlignment.CENTER);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		if ("WGYWBLD".equals(params.get("twoType"))) {
			sheetName = "网格业务办理日Sheet";
			titleName = "网格业务办理日汇总";
		} else if ("WGYWBLW".equals(params.get("twoType"))) {
			sheetName = "网格业务办理周Sheet";
			titleName = "网格业务办理周汇总";
		} else if ("WGYWBLM".equals(params.get("twoType"))) {
			sheetName = "网格业务办理月Sheet";
			titleName = "网格业务办理月汇总";
		} else if ("WGYWBLMONTH".equals(params.get("twoType"))) {
			sheetName = "网格业务办理月Sheet";
			titleName = "网格业务办理月汇总";
		}
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
		// 3.2、创建列标题行(第一行)；并且设置列标题
		Row row2 = sheet.createRow(1);
		// 第一行标题
		String[] titlesOne = null;
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		if ("WGYWBLD".equals(params.get("twoType"))) {
			titlesOne = new String[] { "统计周期", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监编码", "网格总监姓名", "网格总监电话", "个人客户计费收入（单位：万元）", "", "", "", "",
					"", "新增客户计费收入（单位：万元）", "", "", "", "", "", "放号	", "", "", "", "", "", "家庭宽带", "", "", "", "", "", "终端合约", "", "", "", "", "", "", "",
					"家庭网新增", "", "", "", "", "", "高价值低占小区渗透率提升", "", "", "", "", "", "", "", "", "", "", "", "", "新增价值洼地", "", "", "", "", "", "", "", "", "",
					"头部客户固移融合率", "", "", "", "", "", "", "", "", "", "", "中小微企业圈地行动", "", "", "", "", "", "", "", "当日得分", "全省排名", "全市排名", "全县排名" };
			allPoiLists = rptFirstPageThreeMapper.rptGridBusinessTargetDoneD(params);
		} else if ("WGYWBLW".equals(params.get("twoType"))) {
			titlesOne = new String[] { "统计周期", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监编码", "网格总监姓名", "网格总监电话", "个人客户计费收入（单位：万元）", "", "", "", "",
					"", "新增客户计费收入（单位：万元）", "", "", "", "", "", "放号	", "", "", "", "", "", "家庭宽带", "", "", "", "", "", "终端合约", "", "", "", "", "", "", "",
					"家庭网新增", "", "", "", "", "", "高价值低占小区宽带新增", "", "", "", "", "", "", "", "", "", "", "90后客户规模", "", "", "", "", "", "", "", "", "",
					"头部客户固移融合率", "", "", "", "", "", "", "", "", "", "", "中小微企业圈地行动", "", "", "", "", "", "", "", "当周得分", "全省排名", "全市排名", "全县排名" };
			allPoiLists = firstPageThreeService.gridBusinessTargetDoneW(params);
		} else if ("WGYWBLM".equals(params.get("twoType"))) {
			titlesOne = new String[] { "统计周期", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监编码", "网格总监姓名", "网格总监电话", "个人客户计费收入（单位：万元）", "", "", "", "",
					"", "新增客户计费收入（单位：万元）", "", "", "", "", "", "放号	", "", "", "", "", "", "家庭宽带", "", "", "", "", "", "终端合约", "", "", "", "", "", "", "", "",
					"", "", "", "家庭网新增", "", "", "", "", "", "高价值低占小区渗透率提升", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "新增价值洼地", "", "", "", "",
					"", "", "", "", "头部客户固移融合率", "", "", "", "", "", "", "", "", "", "中小微企业圈地行动", "", "", "", "", "", "", "", "当月得分", "全省排名", "全市排名", "全县排名" };
			allPoiLists = firstPageThreeService.gridBusinessTargetDoneM(params);
		} else if ("WGYWBLMONTH".equals(params.get("twoType"))) {
			titlesOne = new String[] { "统计周期", "组织编码", "组织层级", "地市名称", "区县名称", "网格名称", "网格总监姓名", "网格总监电话", "个人客户计费收入（单位：万元）", "", "", "", "", "", "放号	", "",
					"", "", "", "", "家庭宽带", "", "", "", "", "", "终端合约", "", "", "", "", "", "", "", "家庭网新增", "", "", "", "", "", "高价低占小区宽带新增", "", "", "", "",
					"", "", "", "", "", "", "", "", "", "", "90后客户规模", "", "", "", "", "", "", "", "", "", "头部客户宽带新增", "", "", "", "", "", "", "", "", "", "",
					"商客拓展", "", "", "", "", "", "", "", "当月得分", "全省排名", "全市排名", "全县排名", "地市编码", "区县编码", "网格编码", "网格总监编码" };
			allPoiLists = firstPageThreeService.gridBusinessTargetDoneM(params);
		}
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titlesOne.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		Cell cell2 = null;
		for (int i = 0; i < titlesOne.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titlesOne[i]);
		}
		// 3.3、创建列标题行(第二行)；并且设置列标题
		Row row3 = sheet.createRow(2);
		// 第二行标题
		String[] titlesTwo = null;
		String[] columns = null;
		if ("WGYWBLD".equals(params.get("twoType"))) {
			titlesTwo = new String[] { "", "", "", "", "", "", "", "", "", "", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
					"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "日任务", "日完成", "其中手机合约", "其中泛终端合约", "日完成率", "超欠产",
					"得分", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "渗透率提升目标", "上月期末高价值低占小区九级地址数", "上月期末高价值低占小区已用地址数", "上月渗透率", "当前高价值低占小区九级地址数",
					"当前高价值低占小区已用地址数", "昨日高价值低占小区已用地址数", "日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "当月期末拟达到90后规模数", "上月期末90后到达规模数", "当前90后到达规模数", "昨日90后到达规模数",
					"日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "本月期末拟达到头部客户固移融合率", "上月期末头部客户数", "上月期末头部客户融合量", "当前头部客户融合量", "昨日头部客户融合量", "日任务", "日完成", "日完成率",
					"超欠产", "得分", "权重", "日任务", "日完成", "其中199-399小微宽带", "其中企业上云", "日完成率", "超欠产", "得分" };
			columns = new String[] { "STATIS_DATE", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "GRID_MANAGER_CODE",
					"GRID_MANAGER_NAME", "GRID_MANAGER_PHONE", "CUSTOMER_FEE_WEIGHT", "CUSTOMER_FEE_TARGET_D", "CUSTOMER_FEE_D", "CUSTOMER_FEE_RATE_D",
					"CUSTOMER_FEE_OWE", "CUSTOMER_FEE_SCORE", "CUSTOMER_ADD_WEIGHT", "CUSTOMER_ADD_TARGET_D", "CUSTOMER_ADD_D", "CUSTOMER_ADD_RATE_D",
					"CUSTOMER_ADD_OWE", "CUSTOMER_ADD_SCORE", "TELE_WEIGHT", "TELE_TARGET_D", "TELE_D", "TELE_RATE_D", "TELE_OWE", "TELE_SCORE",
					"BROADADD_WEIGHT", "BROADADD_TARGET_D", "BROADADD_D", "BROADADD_RATE_D", "BROADADD_OWE", "BROADADD_SCORE", "TERMINAL_WEIGHT",
					"TERMINAL_TARGET_D", "TERMINAL_COMPLETE_D", "MOBILE_CONTRACT_D", "TERMINAL_CONTRACT_D", "TERMINAL_RATE_D", "TERMINAL_OWE", "TERMINAL_SCORE",
					"HOMENET_ADD_WEIGHT", "HOMENET_ADD_TARGET_D", "HOMENET_ADD_D", "HOMENET_ADD_RATE_D", "HOMENET_ADD_OWE", "HOMENET_ADD_SCORE", "CELL_WEIGHT",
					"CELL_TARGET", "CELL_SUM_LAST_M", "CELL_NUM_LAST_M", "PERMEABILITY_LAST_M", "CELL_SUM", "CELL_NUM", "CELL_NUM_LAST_D", "CELL_TARGET_D",
					"PERMEABILITY_D", "CELL_RATE_D", "CELL_OWE", "CELL_SCORE", "DEPADD_WEIGHT", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D",
					"DEPADD_SUM_LAST_D", "DEPADD_TARGET_D", "DEPADD_D", "DEPADD_RATE_D", "DEPADD_OWE", "DEPADD_SCORE", "FUSION_WEIGHT", "FUSION_SUM_M",
					"FUSION_SUM_LAST_M", "FUSION_RATE_LAST_M", "FUSION_SUM_D", "FUSION_SUM_LAST_D", "FUSION_TARGET_D", "FUSION_D", "FUSION_RATE_D",
					"FUSION_OWE", "FUSION_SCORE", "ENCLOSURE_WEIGHT", "ENCLOSURE_TARGET_D", "ENCLOSURE_D", "MIC_BRO_D", "ENTERPRISE_D", "ENCLOSURE_RATE_D",
					"ENCLOSURE_OWE", "ENCLOSURE_SCORE", "DAY_SCORE", "PROVINCE_ORDER", "CITY_ORDER", "CNTY_ORDER" };
		} else if ("WGYWBLW".equals(params.get("twoType"))) {
			titlesTwo = new String[] { "", "", "", "", "", "", "", "", "", "", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
					"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "周任务", "周完成", "其中手机合约", "其中泛终端合约", "周完成率", "超欠产",
					"得分", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "渗透率提升目标", "上月期末高价值低占小区九级地址数", "上月期末高价值低占小区已用地址数", "上月渗透率", "当前高价值低占小区九级地址数",
					"当前高价值低占小区已用地址数", "昨日高价值低占小区已用地址数", "周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "当月期末拟达到90后规模数", "上月期末90后到达规模数", "当前90后到达规模数", "昨日90后到达规模数",
					"周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "本月期末拟达到头部客户固移融合率", "上月期末头部客户数", "上月期末头部客户融合量", "当前头部客户融合量", "昨日头部客户融合量", "周任务", "周完成", "周完成率",
					"超欠产", "得分", "权重", "周任务", "周完成", "其中199-399小微宽带", "其中企业上云", "周完成率", "超欠产", "得分" };
			columns = new String[] { "STATIS_DATE", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "GRID_MANAGER_CODE",
					"GRID_MANAGER_NAME", "GRID_MANAGER_PHONE", "CUSTOMER_FEE_WEIGHT", "CUSTOMER_FEE_TARGET", "CUSTOMER_FEE", "CUSTOMER_FEE_RATE",
					"CUSTOMER_FEE_OWE", "CUSTOMER_FEE_SCORE", "CUSTOMER_ADD_WEIGHT", "CUSTOMER_ADD_TARGET", "CUSTOMER_ADD", "CUSTOMER_ADD_RATE",
					"CUSTOMER_ADD_OWE", "CUSTOMER_ADD_SCORE", "TELE_WEIGHT", "TELE_TARGET", "TELE", "TELE_RATE", "TELE_OWE", "TELE_SCORE", "BROADADD_WEIGHT",
					"BROADADD_TARGET", "BROADADD", "BROADADD_RATE", "BROADADD_OWE", "BROADADD_SCORE", "TERMINAL_WEIGHT", "TERMINAL_TARGET", "TERMINAL_COMPLETE",
					"MOBILE_CONTRACT", "TERMINAL_CONTRACT", "TERMINAL_RATE", "TERMINAL_OWE", "TERMINAL_SCORE", "HOMENET_ADD_WEIGHT", "HOMENET_ADD_TARGET",
					"HOMENET_ADD", "HOMENET_ADD_RATE", "HOMENET_ADD_OWE", "HOMENET_ADD_SCORE", "CELL_WEIGHT", "CELL_TARGET", "CELL_SUM_LAST_M",
					"CELL_NUM_LAST_M", "PERMEABILITY_LAST_M", "CELL_SUM", "CELL_NUM", "CELL_NUM_LAST_W", "CELL_TARGET_W", "PERMEABILITY_W", "CELL_RATE_W",
					"CELL_OWE", "CELL_SCORE", "DEPADD_WEIGHT", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_SUM_LAST_W", "DEPADD_TARGET_W",
					"DEPADD_W", "DEPADD_RATE_W", "DEPADD_OWE", "DEPADD_SCORE", "FUSION_WEIGHT", "FUSION_SUM_M", "FUSION_SUM_LAST_M", "FUSION_RATE_LAST_M",
					"FUSION_SUM_D", "FUSION_SUM_LAST_W", "FUSION_TARGET_W", "FUSION_W", "FUSION_RATE_W", "FUSION_OWE", "FUSION_SCORE", "ENCLOSURE_WEIGHT",
					"ENCLOSURE_TARGET", "ENCLOSURE", "MIC_BRO", "ENTERPRISE", "ENCLOSURE_RATE", "ENCLOSURE_OWE", "ENCLOSURE_SCORE", "DAY_SCORE",
					"PROVINCE_ORDER", "CITY_ORDER", "CNTY_ORDER" };
		} else if ("WGYWBLM".equals(params.get("twoType"))) {
			titlesTwo = new String[] { "", "", "", "", "", "", "", "", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率",
					"较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成",
					"其中4G终端合约任务", "其中4G终端合约", "4G终端合约完成率", "其中泛终端合约任务", "其中泛终端合约", "泛终端合约完成率", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率",
					"较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当前高价值低占小区九级地址数", "当前高价值低占小区已用地址数", "当前渗透率", "上月高价值低占小区已用地址数",
					"已用地址数月净增", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", "当月90后客户规模净增", "权重", "月任务",
					"月完成", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上月头部客户固移融合量", "头部客户固移融合量月净增", "权重", "月任务", "累计完成", "其中199-399小微宽带", "其中企业上云", "较时间进度完成率",
					"较时间进度超欠产", "得分", "当月得分", "全省排名", "全市排名", "全县排名", "地市编码", "区县编码", "网格编码", "网格总监编码" };
			columns = new String[] { "STATIS_DATE", "CITY_NAME", "CNTY_NAME", "GRID_NAME", "GRID_MANAGER_NAME", "GRID_MANAGER_PHONE", "CUSTOMER_FEE_WEIGHT",
					"CUSTOMER_FEE_TARGET", "CUSTOMER_FEE", "CUSTOMERFEE_TIME_RATE", "CUSTOMERFEE_TIME_OWE", "CUSTOMER_FEE_SCORE", "CUSTOMER_ADD_WEIGHT",
					"CUSTOMER_ADD_TARGET", "CUSTOMER_ADD", "CUSTOMERADD_TIME_RATE", "CUSTOMERADD_TIME_OWE", "CUSTOMER_ADD_SCORE", "TELE_WEIGHT", "TELE_TARGET",
					"TELE", "TELE_TIME_RATE", "TELE_TIME_OWE", "TELE_SCORE", "BROADADD_WEIGHT", "BROADADD_TARGET", "BROADADD", "BROADADD_TIME_RATE",
					"BROADADD_TIME_OWE", "BROADADD_SCORE", "TERMINAL_WEIGHT", "TERMINAL_TARGET", "TERMINAL_COMPLETE", "MOBILE_CONTRACT", "TERMINAL_CONTRACT",
					"TERMINAL_TIME_RATE", "TERMINAL_TIME_OWE", "TERMINAL_SCORE", "HOMENET_ADD_WEIGHT", "HOMENET_ADD_TARGET", "HOMENET_ADD",
					"HOMENETADD_TIME_RATE", "HOMENETADD_TIME_OWE", "HOMENET_ADD_SCORE", "CELL_WEIGHT", "CELL_TARGET", "CELL_SUM_LAST_M", "CELL_NUM_LAST_M",
					"PERMEABILITY_LAST_M", "CELL_SUM", "CELL_NUM", "PERMEABILITY_D", "CELL_NUM_LAST_D", "TARGET_M", "CELL_COUNT", "CELL_TIME_RATE",
					"CELL_TIME_OWE", "CELL_RATE_UP", "CELL_SCORE", "DEPADD_WEIGHT", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_TARGET_M",
					"DEPADD_M", "DEPADD_TIME_RATE", "DEPADD_TIME_OWE", "DEPADD_SCORE", "FUSION_WEIGHT", "FUSION_SUM_M", "FUSION_SUM_LAST_M",
					"FUSION_RATE_LAST_M", "FUSION_SUM_D", "FUSION_TARGET_M", "FUSION_M", "FUSION_TIME_RATE", "FUSION_TIME_OWE", "FUSION_SCORE",
					"ENCLOSURE_WEIGHT", "ENCLOSURE_TARGET", "ENCLOSURE", "MIC_BRO", "ENTERPRISE", "ENCLOSURE_TIME_RATE", "ENCLOSURE_TIME_OWE",
					"ENCLOSURE_SCORE", "DAY_SCORE", "PROVINCE_ORDER", "CITY_ORDER", "CNTY_ORDER", "CITY_CODE", "CNTY_CODE", "GRID_CODE", "GRID_MANAGER_CODE" };
		} else if ("WGYWBLMONTH".equals(params.get("twoType"))) {
			titlesTwo = new String[] { "", "", "", "", "", "", "", "", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率",
					"较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成",
					"其中4G终端合约任务", "其中4G终端合约", "4G终端合约完成率", "其中泛终端合约任务", "其中泛终端合约", "泛终端合约完成率", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率",
					"较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当前高价值低占小区九级地址数", "当前高价值低占小区已用地址数", "当前渗透率", "上月高价值低占小区已用地址数",
					"已用地址数月净增", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", "当月90后客户规模净增", "权重", "月任务",
					"月完成", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上月头部客户固移融合量", "头部客户固移融合量月净增", "权重", "月任务", "累计完成", "其中199-399小微宽带", "其中企业上云", "较时间进度完成率",
					"较时间进度超欠产", "得分", "当月得分", "全省排名", "全市排名", "全县排名", "地市编码", "区县编码", "网格编码", "网格总监编码" };
			columns = new String[] { "STATIS_DATE", "ORG_ID", "ORG_LEVEL", "CITY_NAME", "CITY_NAME", "GRID_NAME", "GRID_MANAGER_NAME", "GRID_MANAGER_PHONE",
					"CUSTOMER_FEE_WEIGHT", "CUSTOMER_FEE_TARGET", "CUSTOMER_FEE", "CUSTOMERFEE_TIME_RATE", "CUSTOMERFEE_TIME_OWE", "CUSTOMER_FEE_SCORE",
					"TELE_WEIGHT", "TELE_TARGET", "TELE", "TELE_TIME_RATE", "TELE_TIME_OWE", "TELE_SCORE", "BROADADD_WEIGHT", "BROADADD_TARGET", "BROADADD",
					"BROADADD_TIME_RATE", "BROADADD_TIME_OWE", "BROADADD_SCORE", "TERMINAL_WEIGHT", "TERMINAL_TARGET", "TERMINAL_COMPLETE", "TERMINAL_TARGET",
					"MOBILE_TARGET", "MOBILE_CONTRACT", "TERMINAL_TARGET", "TERMINAL_CONTRACT", "TERMINAL_TIME_RATE", "TERMINAL_TIME_OWE", "TERMINAL_SCORE",
					"HOMENET_ADD_WEIGHT", "HOMENET_ADD_TARGET", "HOMENET_ADD", "HOMENETADD_TIME_RATE", "HOMENETADD_TIME_OWE", "HOMENET_ADD_SCORE",
					"CELL_WEIGHT", "TARGET_M", "CELL_COUNT", "CELL_TIME_RATE", "CELL_TIME_OWE", "CELL_SCORE", "CELL_SUM", "CELL_NUM", "PERMEABILITY_D",

					"CELL_NUM_LAST_D", "CELL_NUM_JZ_COUNT", "DEPADD_WEIGHT", "DEPADD_TARGET_M", "DEPADD_M", "DEPADD_TIME_RATE", "DEPADD_TIME_OWE",
					"DEPADD_SCORE", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_SCORE", "FUSION_WEIGHT", "FUSION_SUM_M", "FUSION_SUM_LAST_M",
					"DEPADD_SUM_D", "DEPADD_SUM_JZ_COUNT", "FUSION_WEIGHT", "FUSION_TARGET_M", "FUSION_M", "FUSION_TIME_RATE", "FUSION_TIME_OWE",
					"FUSION_SCORE", "FUSION_SUM_LAST_M", "FUSION_SUM_D", "FUSION_RH_RATE", "FUSION_RATE_LAST_M", "FUSION_JZ_COUNT", "ENCLOSURE_TIME_RATE",
					"ENCLOSURE_TIME_OWE", "ENCLOSURE_SCORE", "DAY_SCORE", "PROVINCE_ORDER", "CITY_ORDER", "CNTY_ORDER", "CITY_CODE", "CNTY_CODE", "GRID_CODE",
					"GRID_MANAGER_CODE" };
		}
		Cell cell3 = null;
		for (int i = 10; i < titlesTwo.length; i++) {
			cell3 = row3.createCell(i);
			// 加载单元格样式
			cell3.setCellStyle(style2);
			cell3.setCellValue(titlesTwo[i]);
		}
		// 将前面10个数据合并
		CellRangeAddress region0 = new CellRangeAddress(1, (short) 2, 0, (short) 0);
		CellRangeAddress region1 = new CellRangeAddress(1, (short) 2, 1, (short) 1);
		CellRangeAddress region2 = new CellRangeAddress(1, (short) 2, 2, (short) 2);
		CellRangeAddress region3 = new CellRangeAddress(1, (short) 2, 3, (short) 3);
		CellRangeAddress region4 = new CellRangeAddress(1, (short) 2, 4, (short) 4);
		CellRangeAddress region5 = new CellRangeAddress(1, (short) 2, 5, (short) 5);
		CellRangeAddress region6 = new CellRangeAddress(1, (short) 2, 6, (short) 6);
		CellRangeAddress region7 = new CellRangeAddress(1, (short) 2, 7, (short) 7);
		CellRangeAddress region8 = new CellRangeAddress(1, (short) 2, 8, (short) 8);
		CellRangeAddress region9 = new CellRangeAddress(1, (short) 2, 9, (short) 9);
		sheet.addMergedRegion(region0);
		sheet.addMergedRegion(region1);
		sheet.addMergedRegion(region2);
		sheet.addMergedRegion(region3);
		sheet.addMergedRegion(region4);
		sheet.addMergedRegion(region5);
		sheet.addMergedRegion(region6);
		sheet.addMergedRegion(region7);
		sheet.addMergedRegion(region8);
		sheet.addMergedRegion(region9);
		// 将中间数据合并
		CellRangeAddress region10 = new CellRangeAddress(1, (short) 1, 10, (short) 15);
		CellRangeAddress region11 = new CellRangeAddress(1, (short) 1, 16, (short) 21);
		CellRangeAddress region12 = new CellRangeAddress(1, (short) 1, 22, (short) 27);
		CellRangeAddress region13 = new CellRangeAddress(1, (short) 1, 28, (short) 33);
		CellRangeAddress region14 = new CellRangeAddress(1, (short) 1, 34, (short) 41);
		CellRangeAddress region15 = new CellRangeAddress(1, (short) 1, 42, (short) 47);
		CellRangeAddress region16 = null;
		CellRangeAddress region17 = null;
		CellRangeAddress region18 = null;
		CellRangeAddress region19 = null;
		if ("WGYWBLD".equals(params.get("twoType")) || "WGYWBLW".equals(params.get("twoType"))) {
			region16 = new CellRangeAddress(1, (short) 1, 48, (short) 60);
			region17 = new CellRangeAddress(1, (short) 1, 61, (short) 70);
			region18 = new CellRangeAddress(1, (short) 1, 71, (short) 81);
			region19 = new CellRangeAddress(1, (short) 1, 82, (short) 89);
		} else if ("WGYWBLM".equals(params.get("twoType"))) {
			region16 = new CellRangeAddress(1, (short) 1, 48, (short) 62);
			region17 = new CellRangeAddress(1, (short) 1, 63, (short) 71);
			region18 = new CellRangeAddress(1, (short) 1, 72, (short) 81);
			region19 = new CellRangeAddress(1, (short) 1, 82, (short) 89);
		}
		sheet.addMergedRegion(region10);
		sheet.addMergedRegion(region11);
		sheet.addMergedRegion(region12);
		sheet.addMergedRegion(region13);
		sheet.addMergedRegion(region14);
		sheet.addMergedRegion(region15);
		sheet.addMergedRegion(region16);
		sheet.addMergedRegion(region17);
		sheet.addMergedRegion(region18);
		sheet.addMergedRegion(region19);
		// 将后面数据合并
		CellRangeAddress region20 = new CellRangeAddress(1, (short) 2, 90, (short) 90);
		CellRangeAddress region21 = new CellRangeAddress(1, (short) 2, 91, (short) 91);
		CellRangeAddress region22 = new CellRangeAddress(1, (short) 2, 92, (short) 92);
		CellRangeAddress region23 = new CellRangeAddress(1, (short) 2, 93, (short) 93);
		sheet.addMergedRegion(region20);
		sheet.addMergedRegion(region21);
		sheet.addMergedRegion(region22);
		sheet.addMergedRegion(region23);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 3);
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
	 * 业务办理日报表（组合表头）
	 * 
	 * @Title exportWgywblDayInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportWgywblDayInfo，作用：报表专区/业务办理:网格业务办理（日）报表导出】")
	public void exportWgywblDayInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
//		if (null == params.get("orgId") || "null".equals(params.get("orgId"))) {
//			params.remove("orgLevel");
//			params.put("orgLevel", 0);
//			// 查询所有组织信息
//			List<SysOrg> allSysOrgList = sysOrgService.selectAllSysOrg();
//			List<SysOrg> childrenSysOrgList = SysUserTreeMenuUtil.getChildrenOrgId(allSysOrgList, user.getOrgId());
//			List<String> orgIds = new ArrayList<>();
//			for (SysOrg so : childrenSysOrgList) {
//				orgIds.add(so.getOrgId());
//			}
//			orgIds.add(user.getOrgId());
//			params.remove("orgId");
//			params.put("orgId", orgIds);
//		}
//		// 当选择的是地市
//		if (params.get("orgLevel").equals("2")) {
//			// 将地市编码5位转为3位
//			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
//			params.remove("orgId");
//			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
//		}
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		style2.setAlignment(HorizontalAlignment.CENTER);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "网格业务办理日Sheet";
		titleName = "网格业务办理日汇总";
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
		// 3.2、创建列标题行(第一行)；并且设置列标题
		Row row2 = sheet.createRow(1);
		// 第一行标题
		String[] titlesOne = null;
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		titlesOne = new String[] { "统计周期", "组织编码", "组织层级", "地市名称", "区县名称", "网格名称", "网格总监姓名", "网格总监电话", "个人客户计费收入（单位：万元）", "", "", "", "", "", "放号", "", "", "",
				"", "", "家庭宽带", "", "", "", "", "", "终端合约", "", "", "", "", "", "", "", "家庭网新增", "", "", "", "", "", "高价低占小区宽带新增", "", "", "", "", "", "", "",
				"", "", "", "90后客户规模", "", "", "", "", "", "", "", "", "", "头部客户宽带新增", "", "", "", "", "", "", "", "", "", "", "商客拓展", "", "", "", "", "", "",
				"", "当日得分", "全省排名", "全市排名", "全县排名", "地市编码", "区县编码", "网格编码", "网格总监编码" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titlesOne.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		allPoiLists = firstPageThreeService.gridBusinessTargetDoneDay(params);
		Cell cell2 = null;
		for (int i = 0; i < titlesOne.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titlesOne[i]);
		}
		// 3.3、创建列标题行(第二行)；并且设置列标题
		Row row3 = sheet.createRow(2);
		// 第二行标题
		String[] titlesTwo = null;
		String[] columns = null;
		titlesTwo = new String[] { "", "", "", "", "", "", "", "", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "权重",
				"日任务", "日完成", "日完成率", "超欠产", "得分", "权重", "日任务", "日完成", "其中4G终端合约", "其中泛终端合约", "日完成率", "超欠产", "得分", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分",
				"权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "昨日高价低占小区已用地址数", "已用地址数日净增", "权重", "日任务", "日完成", "日完成率",
				"超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", "昨日90后客户规模", "权重", "日任务", "日完成", "日完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量",
				"头部客户固移融合率", "昨日头部客户固移融合量", "头部客户固移融合量日净增", "权重", "日任务", "日完成", "其中199-399小微宽带", "其中企业上云", "日完成率", "超欠产", "得分", "当日得分", "全省排名", "全市排名", "全县排名",
				"地市编码", "区县编码", "网格编码", "网格总监编码" };
		columns = new String[] { "STATIS_DATE", "ORG_ID", "ORG_LEVEL", "CITY_NAME", "CNTY_NAME", "GRID_NAME", "GRID_MANAGER_NAME", "GRID_MANAGER_PHONE",
				"CUSTOMER_FEE_WEIGHT", "CUSTOMER_FEE_TARGET_D", "CUSTOMER_FEE_D", "CUSTOMER_FEE_RATE_D", "CUSTOMER_FEE_OWE", "CUSTOMER_FEE_SCORE",
				"TELE_WEIGHT", "TELE_TARGET_D", "TELE_D", "TELE_RATE_D", "TELE_OWE", "TELE_SCORE", "BROADADD_WEIGHT", "BROADADD_TARGET_D", "BROADADD_D",
				"BROADADD_RATE_D", "BROADADD_OWE", "BROADADD_SCORE", "TERMINAL_WEIGHT", "TERMINAL_TARGET_D", "TERMINAL_COMPLETE_D", "MOBILE_CONTRACT_D",
				"TERMINAL_CONTRACT_D", "TERMINAL_RATE_D", "TERMINAL_OWE", "TERMINAL_SCORE", "HOMENET_ADD_WEIGHT", "HOMENET_ADD_TARGET_D", "HOMENET_ADD_D",
				"HOMENET_ADD_RATE_D", "HOMENET_ADD_OWE", "HOMENET_ADD_SCORE", "CELL_WEIGHT", "CELL_TARGET", "CELL_COUNT", "CELL_RATE_D", "CELL_OWE",
				"CELL_SCORE", "CELL_SUM", "CELL_NUM", "PERMEABILITY_D", "CELL_NUM_LAST_D", "CELL_NUM_JZ_D", "DEPADD_WEIGHT", "DEPADD_TARGET_D", "DEPADD_D",
				"DEPADD_RATE_D", "DEPADD_OWE", "DEPADD_SCORE", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_SUM_LAST_D", "FUSION_WEIGHT",
				"FUSION_TARGET_D", "FUSION_D", "FUSION_RATE_D", "FUSION_OWE", "FUSION_SCORE", "FUSION_SUM_LAST_M", "FUSION_SUM_D", "FUSION_RH_RATE_D",
				"FUSION_SUM_LAST_D", "FUSION_SUM_JZ", "ENCLOSURE_WEIGHT", "ENCLOSURE_TARGET_D", "ENCLOSURE_D", "MIC_BRO_D", "ENTERPRISE_D", "ENCLOSURE_RATE_D",
				"ENCLOSURE_OWE", "ENCLOSURE_SCORE", "DAY_SCORE", "PROVINCE_ORDER", "CITY_ORDER", "CNTY_ORDER", "CITY_CODE", "CNTY_CODE", "GRID_CODE",
				"GRID_MANAGER_CODE" };
		Cell cell3 = null;
		for (int i = 10; i < titlesTwo.length; i++) {
			cell3 = row3.createCell(i);
			// 加载单元格样式
			cell3.setCellStyle(style2);
			cell3.setCellValue(titlesTwo[i]);
		}
		// 将前面8个数据合并
		CellRangeAddress region0 = new CellRangeAddress(1, (short) 2, 0, (short) 0);
		CellRangeAddress region1 = new CellRangeAddress(1, (short) 2, 1, (short) 1);
		CellRangeAddress region2 = new CellRangeAddress(1, (short) 2, 2, (short) 2);
		CellRangeAddress region3 = new CellRangeAddress(1, (short) 2, 3, (short) 3);
		CellRangeAddress region4 = new CellRangeAddress(1, (short) 2, 4, (short) 4);
		CellRangeAddress region5 = new CellRangeAddress(1, (short) 2, 5, (short) 5);
		CellRangeAddress region6 = new CellRangeAddress(1, (short) 2, 6, (short) 6);
		CellRangeAddress region7 = new CellRangeAddress(1, (short) 2, 7, (short) 7);
		sheet.addMergedRegion(region0);
		sheet.addMergedRegion(region1);
		sheet.addMergedRegion(region2);
		sheet.addMergedRegion(region3);
		sheet.addMergedRegion(region4);
		sheet.addMergedRegion(region5);
		sheet.addMergedRegion(region6);
		sheet.addMergedRegion(region7);
		// 将中间数据合并
		CellRangeAddress region8 = new CellRangeAddress(1, (short) 1, 8, (short) 13);
		CellRangeAddress region9 = new CellRangeAddress(1, (short) 1, 14, (short) 19);
		CellRangeAddress region10 = new CellRangeAddress(1, (short) 1, 20, (short) 25);
		CellRangeAddress region11 = new CellRangeAddress(1, (short) 1, 26, (short) 33);
		CellRangeAddress region12 = new CellRangeAddress(1, (short) 1, 34, (short) 39);
		CellRangeAddress region13 = new CellRangeAddress(1, (short) 1, 40, (short) 50);
		CellRangeAddress region14 = new CellRangeAddress(1, (short) 1, 51, (short) 60);
		CellRangeAddress region15 = new CellRangeAddress(1, (short) 1, 61, (short) 71);
		CellRangeAddress region16 = new CellRangeAddress(1, (short) 1, 72, (short) 79);
		sheet.addMergedRegion(region8);
		sheet.addMergedRegion(region9);
		sheet.addMergedRegion(region10);
		sheet.addMergedRegion(region11);
		sheet.addMergedRegion(region12);
		sheet.addMergedRegion(region13);
		sheet.addMergedRegion(region14);
		sheet.addMergedRegion(region15);
		sheet.addMergedRegion(region16);
		// 将后面数据合并
		CellRangeAddress region17 = new CellRangeAddress(1, (short) 2, 80, (short) 80);
		CellRangeAddress region18 = new CellRangeAddress(1, (short) 2, 81, (short) 81);
		CellRangeAddress region19 = new CellRangeAddress(1, (short) 2, 82, (short) 82);
		CellRangeAddress region20 = new CellRangeAddress(1, (short) 2, 83, (short) 83);
		CellRangeAddress region21 = new CellRangeAddress(1, (short) 2, 84, (short) 84);
		CellRangeAddress region22 = new CellRangeAddress(1, (short) 2, 85, (short) 85);
		CellRangeAddress region23 = new CellRangeAddress(1, (short) 2, 86, (short) 86);
		CellRangeAddress region24 = new CellRangeAddress(1, (short) 2, 87, (short) 87);
		sheet.addMergedRegion(region17);
		sheet.addMergedRegion(region18);
		sheet.addMergedRegion(region19);
		sheet.addMergedRegion(region20);
		sheet.addMergedRegion(region21);
		sheet.addMergedRegion(region22);
		sheet.addMergedRegion(region23);
		sheet.addMergedRegion(region24);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 3);
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
	 * 业务办理周报表（组合表头）
	 * 
	 * @Title exportWgywblWeekInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportWgywblWeekInfo，作用：报表专区/业务办理:网格业务办理（周）报表导出】")
	public void exportWgywblWeekInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
//		if (null == params.get("orgId") || "null".equals(params.get("orgId"))) {
//			params.remove("orgLevel");
//			params.put("orgLevel", 0);
//			// 查询所有组织信息
//			List<SysOrg> allSysOrgList = sysOrgService.selectAllSysOrg();
//			List<SysOrg> childrenSysOrgList = SysUserTreeMenuUtil.getChildrenOrgId(allSysOrgList, user.getOrgId());
//			List<String> orgIds = new ArrayList<>();
//			for (SysOrg so : childrenSysOrgList) {
//				orgIds.add(so.getOrgId());
//			}
//			orgIds.add(user.getOrgId());
//			params.remove("orgId");
//			params.put("orgId", orgIds);
//		}
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		style2.setAlignment(HorizontalAlignment.CENTER);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "网格业务办理周Sheet";
		titleName = "网格业务办理周汇总";
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
		// 3.2、创建列标题行(第一行)；并且设置列标题
		Row row2 = sheet.createRow(1);
		// 第一行标题
		String[] titlesOne = null;
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		titlesOne = new String[] { "统计周期", "组织编码", "组织层级", "地市名称", "区县名称", "网格名称", "网格总监姓名", "网格总监电话", "个人客户计费收入（单位：万元）", "", "", "", "", "", "放号", "", "", "",
				"", "", "家庭宽带", "", "", "", "", "", "终端合约", "", "", "", "", "", "", "", "家庭网新增", "", "", "", "", "", "高价低占小区宽带新增", "", "", "", "", "", "", "",
				"", "", "", "90后客户规模", "", "", "", "", "", "", "", "", "", "头部客户宽带新增", "", "", "", "", "", "", "", "", "", "", "商客拓展", "", "", "", "", "", "",
				"", "当周得分", "全省排名", "全市排名", "全县排名", "地市编码", "区县编码", "网格编码", "网格总监编码" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titlesOne.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		allPoiLists = firstPageThreeService.gridBusinessTargetDoneWeek(params);
		Cell cell2 = null;
		for (int i = 0; i < titlesOne.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titlesOne[i]);
		}
		// 3.3、创建列标题行(第二行)；并且设置列标题
		Row row3 = sheet.createRow(2);
		// 第二行标题
		String[] titlesTwo = null;
		String[] columns = null;
		titlesTwo = new String[] { "", "", "", "", "", "", "", "", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "权重",
				"周任务", "周完成", "周完成率", "超欠产", "得分", "权重", "周任务", "周完成", "其中4G终端合约", "其中泛终端合约", "周完成率", "超欠产", "得分", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分",
				"权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率", "上周高价低占小区已用地址数", "已用地址数周净增", "权重", "周任务", "周完成", "周完成率",
				"超欠产", "得分", "4月90后客户规模目标值", "3月期末90后客户规模", "当前90后客户规模", "上周90后客户规模", "权重", "周任务", "周完成", "周完成率", "超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量",
				"头部客户固移融合率", "上周头部客户固移融合量", "头部客户固移融合量周净增", "权重", "周任务", "周完成", "其中199-399小微宽带", "其中企业上云", "周完成率", "超欠产", "得分", "当周得分", "全省排名", "全市排名", "全县排名",
				"地市编码", "区县编码", "网格编码", "网格总监编码" };
		columns = new String[] { "STATIS_DATE", "ORG_ID", "ORG_LEVEL", "CITY_NAME", "CNTY_NAME", "GRID_NAME", "GRID_MANAGER_NAME", "GRID_MANAGER_PHONE",
				"CUSTOMER_FEE_WEIGHT", "CUSTOMER_FEE_TARGET", "CUSTOMER_FEE", "CUSTOMER_FEE_RATE", "CUSTOMER_FEE_OWE", "CUSTOMER_FEE_SCORE", "TELE_WEIGHT",
				"TELE_TARGET", "TELE", "TELE_RATE", "TELE_OWE", "TELE_SCORE", "BROADADD_WEIGHT", "BROADADD_TARGET", "BROADADD", "BROADADD_RATE", "BROADADD_OWE",
				"BROADADD_SCORE", "TERMINAL_WEIGHT", "TERMINAL_TARGET", "TERMINAL_COMPLETE", "MOBILE_CONTRACT", "TERMINAL_CONTRACT", "TERMINAL_RATE",
				"TERMINAL_OWE", "TERMINAL_SCORE", "HOMENET_ADD_WEIGHT", "HOMENET_ADD_TARGET", "HOMENET_ADD", "HOMENET_ADD_RATE", "HOMENET_ADD_OWE",
				"HOMENET_ADD_SCORE", "CELL_WEIGHT", "CELL_TARGET_W", "PERMEABILITY_W", "CELL_RATE_W", "CELL_OWE", "CELL_SCORE", "CELL_SUM", "CELL_NUM",
				"PERMEABILITY_D", "CELL_NUM_LAST_W", "CELL_NUM_JZ_W", "DEPADD_WEIGHT", "DEPADD_TARGET_W", "DEPADD_W", "DEPADD_RATE_W", "DEPADD_OWE",
				"DEPADD_SCORE", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_SUM_LAST_W", "FUSION_WEIGHT", "FUSION_TARGET_W", "FUSION_W",
				"FUSION_RATE_W", "FUSION_OWE", "FUSION_SCORE", "FUSION_SUM_LAST_M", "FUSION_SUM_D", "FUSION_RH_RATE_D", "FUSION_SUM_LAST_W", "FUSION_SUM_JZ",
				"ENCLOSURE_WEIGHT", "ENCLOSURE_TARGET", "ENCLOSURE", "MIC_BRO", "ENTERPRISE", "ENCLOSURE_RATE", "ENCLOSURE_OWE", "ENCLOSURE_SCORE", "DAY_SCORE",
				"PROVINCE_ORDER", "CITY_ORDER", "CNTY_ORDER", "CITY_CODE", "CNTY_CODE", "GRID_CODE", "GRID_MANAGER_CODE" };
		Cell cell3 = null;
		for (int i = 10; i < titlesTwo.length; i++) {
			cell3 = row3.createCell(i);
			// 加载单元格样式
			cell3.setCellStyle(style2);
			cell3.setCellValue(titlesTwo[i]);
		}
		// 将前面8个数据合并
		CellRangeAddress region0 = new CellRangeAddress(1, (short) 2, 0, (short) 0);
		CellRangeAddress region1 = new CellRangeAddress(1, (short) 2, 1, (short) 1);
		CellRangeAddress region2 = new CellRangeAddress(1, (short) 2, 2, (short) 2);
		CellRangeAddress region3 = new CellRangeAddress(1, (short) 2, 3, (short) 3);
		CellRangeAddress region4 = new CellRangeAddress(1, (short) 2, 4, (short) 4);
		CellRangeAddress region5 = new CellRangeAddress(1, (short) 2, 5, (short) 5);
		CellRangeAddress region6 = new CellRangeAddress(1, (short) 2, 6, (short) 6);
		CellRangeAddress region7 = new CellRangeAddress(1, (short) 2, 7, (short) 7);
		sheet.addMergedRegion(region0);
		sheet.addMergedRegion(region1);
		sheet.addMergedRegion(region2);
		sheet.addMergedRegion(region3);
		sheet.addMergedRegion(region4);
		sheet.addMergedRegion(region5);
		sheet.addMergedRegion(region6);
		sheet.addMergedRegion(region7);
		// 将中间数据合并
		CellRangeAddress region8 = new CellRangeAddress(1, (short) 1, 8, (short) 13);
		CellRangeAddress region9 = new CellRangeAddress(1, (short) 1, 14, (short) 19);
		CellRangeAddress region10 = new CellRangeAddress(1, (short) 1, 20, (short) 25);
		CellRangeAddress region11 = new CellRangeAddress(1, (short) 1, 26, (short) 33);
		CellRangeAddress region12 = new CellRangeAddress(1, (short) 1, 34, (short) 39);
		CellRangeAddress region13 = new CellRangeAddress(1, (short) 1, 40, (short) 50);
		CellRangeAddress region14 = new CellRangeAddress(1, (short) 1, 51, (short) 60);
		CellRangeAddress region15 = new CellRangeAddress(1, (short) 1, 61, (short) 71);
		CellRangeAddress region16 = new CellRangeAddress(1, (short) 1, 72, (short) 79);
		sheet.addMergedRegion(region8);
		sheet.addMergedRegion(region9);
		sheet.addMergedRegion(region10);
		sheet.addMergedRegion(region11);
		sheet.addMergedRegion(region12);
		sheet.addMergedRegion(region13);
		sheet.addMergedRegion(region14);
		sheet.addMergedRegion(region15);
		sheet.addMergedRegion(region16);
		// 将后面数据合并
		CellRangeAddress region17 = new CellRangeAddress(1, (short) 2, 80, (short) 80);
		CellRangeAddress region18 = new CellRangeAddress(1, (short) 2, 81, (short) 81);
		CellRangeAddress region19 = new CellRangeAddress(1, (short) 2, 82, (short) 82);
		CellRangeAddress region20 = new CellRangeAddress(1, (short) 2, 83, (short) 83);
		CellRangeAddress region21 = new CellRangeAddress(1, (short) 2, 84, (short) 84);
		CellRangeAddress region22 = new CellRangeAddress(1, (short) 2, 85, (short) 85);
		CellRangeAddress region23 = new CellRangeAddress(1, (short) 2, 86, (short) 86);
		CellRangeAddress region24 = new CellRangeAddress(1, (short) 2, 87, (short) 87);
		sheet.addMergedRegion(region17);
		sheet.addMergedRegion(region18);
		sheet.addMergedRegion(region19);
		sheet.addMergedRegion(region20);
		sheet.addMergedRegion(region21);
		sheet.addMergedRegion(region22);
		sheet.addMergedRegion(region23);
		sheet.addMergedRegion(region24);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 3);
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
	 * 业务报表网格业务办理月导出（组合表头）
	 * 
	 * @param user
	 * 
	 * @Title exportWGYWBLMONTHInfo
	 * @Author caoxiaojuan
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportWGYWBLMONTHInfo，作用：报表专区/业务办理:网格业务办理（月）报表导出】")
	public void exportWgywblMonthInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
//		if (null == params.get("orgId") || "null".equals(params.get("orgId"))) {
//			params.remove("orgLevel");
//			params.put("orgLevel", 0);
//			// 查询所有组织信息
//			List<SysOrg> allSysOrgList = sysOrgService.selectAllSysOrg();
//			List<SysOrg> childrenSysOrgList = SysUserTreeMenuUtil.getChildrenOrgId(allSysOrgList, user.getOrgId());
//			List<String> orgIds = new ArrayList<>();
//			for (SysOrg so : childrenSysOrgList) {
//				orgIds.add(so.getOrgId());
//			}
//			orgIds.add(user.getOrgId());
//			params.remove("orgId");
//			params.put("orgId", orgIds);
//		}
//		params.put("orgId", user);
//		// 当选择的是地市
//		if (params.get("orgLevel").equals("2")) {
//			// 将地市编码5位转为3位
//			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
//			params.remove("orgId");
//			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
//		}
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		style2.setAlignment(HorizontalAlignment.CENTER);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "网格业务办理月Sheet";
		titleName = "网格业务办理月汇总";
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
		// 3.2、创建列标题行(第一行)；并且设置列标题
		Row row2 = sheet.createRow(1);
		// 第一行标题
		String[] titlesOne = null;
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		titlesOne = new String[] { "统计周期", "组织编码", "组织层级", "地市名称", "区县名称", "网格名称", "网格总监姓名", "网格总监电话", "个人客户计费收入（单位：万元）", "", "", "", "", "", "放号", "", "", "",
				"", "", "家庭宽带", "", "", "", "", "", "终端合约", "", "", "", "", "", "", "", "家庭网新增", "", "", "", "", "", "高价低占小区宽带新增", "", "", "", "", "", "", "",
				"", "", "", "90后客户规模", "", "", "", "", "", "", "", "", "", "头部客户宽带新增", "", "", "", "", "", "", "", "", "", "", "商客拓展", "", "", "", "", "", "",
				"", "当月得分", "全省排名", "全市排名", "全县排名", "地市编码", "区县编码", "网格编码", "网格总监编码" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titlesOne.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		allPoiLists = firstPageThreeService.gridBusinessTargetDoneMonth(params);
		Cell cell2 = null;
		for (int i = 0; i < titlesOne.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titlesOne[i]);
		}
		// 3.3、创建列标题行(第二行)；并且设置列标题
		Row row3 = sheet.createRow(2);
		// 第二行标题
		String[] titlesTwo = null;
		String[] columns = null;
		titlesTwo = new String[] { "", "", "", "", "", "", "", "", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产",
				"得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "其中4G终端合约", "其中泛终端合约", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务",
				"月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当前高价低占小区九级地址数", "当前高价低占小区已用地址数", "当前渗透率",
				"上月高价低占小区已用地址数", "已用地址数月净增", "权重", "月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "当月90后客户规模目标值", "上月期末90后客户规模", "当前90后客户规模", "当月90后客户规模净增", "权重",
				"月任务", "月完成", "较时间进度完成率", "较时间进度超欠产", "得分", "上月期末头部客户数", "当前头部客户固移融合量", "头部客户固移融合率", "上月头部客户固移融合量", "头部客户固移融合量月净增", "权重", "月任务", "月完成",
				"其中199-399小微宽带", "其中企业上云", "较时间进度完成率", "较时间进度超欠产", "得分", "当月得分", "全省排名", "全市排名", "全县排名", "地市编码", "区县编码", "网格编码", "网格总监编码" };
		columns = new String[] { "STATIS_DATE", "ORG_ID", "ORG_LEVEL", "CITY_NAME", "CNTY_NAME", "GRID_NAME", "GRID_MANAGER_NAME", "GRID_MANAGER_PHONE",
				"CUSTOMER_FEE_WEIGHT", "CUSTOMER_FEE_TARGET", "CUSTOMER_FEE", "CUSTOMERFEE_TIME_RATE", "CUSTOMERFEE_TIME_OWE", "CUSTOMER_FEE_SCORE",
				"TELE_WEIGHT", "TELE_TARGET", "TELE", "TELE_TIME_RATE", "TELE_TIME_OWE", "TELE_SCORE", "BROADADD_WEIGHT", "BROADADD_TARGET", "BROADADD",
				"BROADADD_TIME_RATE", "BROADADD_TIME_OWE", "BROADADD_SCORE", "TERMINAL_WEIGHT", "TERMINAL_TARGET", "TERMINAL_COMPLETE", "MOBILE_CONTRACT",
				"TERMINAL_CONTRACT", "TERMINAL_TIME_RATE", "TERMINAL_TIME_OWE", "TERMINAL_SCORE", "HOMENET_ADD_WEIGHT", "HOMENET_ADD_TARGET", "HOMENET_ADD",
				"HOMENETADD_TIME_RATE", "HOMENETADD_TIME_OWE", "HOMENET_ADD_SCORE", "CELL_WEIGHT", "TARGET_M", "CELL_COUNT", "CELL_TIME_RATE", "CELL_TIME_OWE",
				"CELL_SCORE", "CELL_SUM", "CELL_NUM", "PERMEABILITY_D", "CELL_NUM_LAST_D", "CELL_NUM_JZ_COUNT", "DEPADD_WEIGHT", "DEPADD_TARGET_M", "DEPADD_M",
				"DEPADD_TIME_RATE", "DEPADD_TIME_OWE", "DEPADD_SCORE", "DEPADD_SUM_M", "DEPADD_SUM_LAST_M", "DEPADD_SUM_D", "DEPADD_SUM_JZ_COUNT",
				"FUSION_WEIGHT", "FUSION_TARGET_M", "FUSION_M", "FUSION_TIME_RATE", "FUSION_TIME_OWE", "FUSION_SCORE", "FUSION_SUM_LAST_M", "FUSION_SUM_D",
				"FUSION_RH_RATE", "FUSION_RATE_LAST_M", "FUSION_JZ_COUNT", "ENCLOSURE_WEIGHT", "ENCLOSURE_TARGET", "ENCLOSURE", "MIC_BRO", "ENTERPRISE",
				"ENCLOSURE_TIME_RATE", "ENCLOSURE_TIME_OWE", "ENCLOSURE_SCORE", "DAY_SCORE", "PROVINCE_ORDER", "CITY_ORDER", "CNTY_ORDER", "CITY_CODE",
				"CNTY_CODE", "GRID_CODE", "GRID_MANAGER_CODE" };
		Cell cell3 = null;
		for (int i = 8; i < titlesTwo.length; i++) {
			cell3 = row3.createCell(i);
			// 加载单元格样式
			cell3.setCellStyle(style2);
			cell3.setCellValue(titlesTwo[i]);
		}
		// 将前面8个数据合并
		CellRangeAddress region0 = new CellRangeAddress(1, (short) 2, 0, (short) 0);
		CellRangeAddress region1 = new CellRangeAddress(1, (short) 2, 1, (short) 1);
		CellRangeAddress region2 = new CellRangeAddress(1, (short) 2, 2, (short) 2);
		CellRangeAddress region3 = new CellRangeAddress(1, (short) 2, 3, (short) 3);
		CellRangeAddress region4 = new CellRangeAddress(1, (short) 2, 4, (short) 4);
		CellRangeAddress region5 = new CellRangeAddress(1, (short) 2, 5, (short) 5);
		CellRangeAddress region6 = new CellRangeAddress(1, (short) 2, 6, (short) 6);
		CellRangeAddress region7 = new CellRangeAddress(1, (short) 2, 7, (short) 7);
		sheet.addMergedRegion(region0);
		sheet.addMergedRegion(region1);
		sheet.addMergedRegion(region2);
		sheet.addMergedRegion(region3);
		sheet.addMergedRegion(region4);
		sheet.addMergedRegion(region5);
		sheet.addMergedRegion(region6);
		sheet.addMergedRegion(region7);
		// 将中间数据合并
		CellRangeAddress region8 = new CellRangeAddress(1, (short) 1, 8, (short) 13);
		CellRangeAddress region9 = new CellRangeAddress(1, (short) 1, 14, (short) 19);
		CellRangeAddress region10 = new CellRangeAddress(1, (short) 1, 20, (short) 25);
		CellRangeAddress region11 = new CellRangeAddress(1, (short) 1, 26, (short) 33);
		CellRangeAddress region12 = new CellRangeAddress(1, (short) 1, 34, (short) 39);
		CellRangeAddress region13 = new CellRangeAddress(1, (short) 1, 40, (short) 50);
		CellRangeAddress region14 = new CellRangeAddress(1, (short) 1, 51, (short) 60);
		CellRangeAddress region15 = new CellRangeAddress(1, (short) 1, 61, (short) 71);
		CellRangeAddress region16 = new CellRangeAddress(1, (short) 1, 72, (short) 79);
		sheet.addMergedRegion(region8);
		sheet.addMergedRegion(region9);
		sheet.addMergedRegion(region10);
		sheet.addMergedRegion(region11);
		sheet.addMergedRegion(region12);
		sheet.addMergedRegion(region13);
		sheet.addMergedRegion(region14);
		sheet.addMergedRegion(region15);
		sheet.addMergedRegion(region16);
		// 将后面数据合并
		CellRangeAddress region17 = new CellRangeAddress(1, (short) 2, 80, (short) 80);
		CellRangeAddress region18 = new CellRangeAddress(1, (short) 2, 81, (short) 81);
		CellRangeAddress region19 = new CellRangeAddress(1, (short) 2, 82, (short) 82);
		CellRangeAddress region20 = new CellRangeAddress(1, (short) 2, 83, (short) 83);
		CellRangeAddress region21 = new CellRangeAddress(1, (short) 2, 84, (short) 84);
		CellRangeAddress region22 = new CellRangeAddress(1, (short) 2, 85, (short) 85);
		CellRangeAddress region23 = new CellRangeAddress(1, (short) 2, 86, (short) 86);
		CellRangeAddress region24 = new CellRangeAddress(1, (short) 2, 87, (short) 87);
		sheet.addMergedRegion(region17);
		sheet.addMergedRegion(region18);
		sheet.addMergedRegion(region19);
		sheet.addMergedRegion(region20);
		sheet.addMergedRegion(region21);
		sheet.addMergedRegion(region22);
		sheet.addMergedRegion(region23);
		sheet.addMergedRegion(region24);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 3);
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
	 * 人员/网格信息报表导出
	 * 
	 * @Title exportRyxxInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	public void exportRyxxOrWgxxInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
		if ("RYXX".equals(params.get("oneType"))) {
			// 人员信息
			exportRyxxRptInfo(user, params, outputStream, session);
		} else if ("WGXX".equals(params.get("oneType"))) {
			if (params.get("twoType").equals("网格基础信息")) {
				// 网格基础信息
				exportWgjcxx0RptInfo(user, params, outputStream, session);
			} else {
				// 网格信息
				exportWgxxRptInfo(user, params, outputStream, session);
			}
		} else if ("WGJCXX".equals(params.get("oneType"))) {
			// 网格基础信息（供后台人员及网格总监）
			exportWgjcxxRptInfo(user, params, outputStream, session);
		}
	}

	/**
	 * 人员信息报表导出（单行表头）
	 * 
	 * @Title exportRyxxRptInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportKhfzDayInfo，作用：报表专区/客户发展日报表导出】")
	public void exportKhfzMonthInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "客户发展月报表Sheet";
		titleName = "客户发展月报表";
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
		titles = new String[] { "统计日期","业务层级","地市编码","地市名称","区县编码","区县名称","网格编码","网格名称","渠道编码","渠道名称","新入网当月任务","新入网累计完成","新入网较时间进度超欠产","新入网较时间进度完成率","一级排名","二级排名","当日到达客户数","上月期末到达客户数","到达客户数当月净增数","90后新增当月任务","90后新增累计完成","90后新增较时间进度超欠产","90后新增较时间进度完成率","一级排名","二级排名","90后当日到达规模","90后上月期末到达规模","90后规模当月净增","花卡新增当月任务","花卡新增累计完成","其中新入网花卡新增","其中存量迁转花卡新增","花卡新增较时间进度超欠产","花卡新增较时间进度完成率","	一级排名","二级排名","花卡当日到达规模	","花卡上月期末到达规模","花卡规模当月净增"};
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
		String[] columns = null;
		columns = new String[] { "STATIS_DATE", "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME","CHNL_CODE","CHNL_NAME",
				"TELENO_TARGET_M", "TELENO_COMPETE_M","TELENO_OWE_TIME","TELENO_RATE_TIME","ORDER_TELENO_01","ORDER_TELENO_02","CUS_COUNT_M","CUS_COUNT_LAST_M","CUS_COUNT_JZ_M",
				"AFTER90_TARGET_M","AFTER90_COMPLETE_M","AFTER90_OWE_TIME","AFTER90_RATE_TIME","ORDER_90_01","ORDER_90_02","AFTER90_COUNT_M","AFTER90_COUNT_LAST_M","AFTER90_COUNT_JZ_M",
				"CARD_TARGET_M","CARD_COMPLETE_M","CARD_ADD_M","CARD_STOCK_M","CARD_OWE_TIME","CARD_RATE_TIME","ORDER_CARD_01","ORDER_CARD_02","CARD_COUNT_M","CARD_COUNT_LAST_M","CARD_JZ_M"};
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeService.customerDevelopMonth(params);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}
	/**
	 * 客户发展周报表（单行表头）
	 * 
	 * @Title exportKhfzWeekInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportKhfzWeekInfo，作用：报表专区/客户发展周报表导出】")
	public void exportKhfzWeekInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "客户发展周报表Sheet";
		titleName = "客户发展周报表";
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
		titles = new String[] { "统计日期","业务层级","地市编码","地市名称","区县编码","区县名称","网格编码","网格名称","渠道编码","渠道名称","新入网近7天任务","新入网近7天完成","新入网近7天超欠产","新入网近7天完成率","一级排名","二级排名","当日到达客户数","7天前到达客户数","到达客户数近7天净增数","90后新增近7天任务","90后新增近7天完成","90后新增近7天超欠产","90后新增近7天完成率","一级排名","二级排名","90后当日到达规模","90后7天前到达规模","90后规模近7天净增","花卡新增近7天任务","花卡新增近7天完成","其中新入网花卡新增","其中存量迁转花卡新增","花卡新增近7天超欠产","花卡新增近7天完成率","一级排名","二级排名","花卡当日到达规模","	花卡7天前到达规模","花卡规模近7天净增"};
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
		String[] columns = null;
		
		columns = new String[] { "STATIS_DATE", "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME","CHNL_CODE","CHNL_NAME",
				"TELENO_TARGET_W", "TELENO_COMPETE_W","TELENO_OWE_W","TELENO_RATE_W","ORDER_TELENO_01","ORDER_TELENO_02","CUS_COUNT_D","CUS_COUNT_LAST_W","CUS_COUNT_JZ_W",
				"AFTER90_TARGET_W","AFTER90_COMPLETE_W","AFTER90_OWE_W","AFTER90_RATE_W","ORDER_90_01","ORDER_90_02","AFTER90_COUNT_W","AFTER90_COUNT_LAST_W","AFTER90_COUNT_JZ_W",
				"CARD_TARGET_W","CARD_COMPLETE_W","CARD_ADD_W","CARD_STOCK_W","CARD_OWE_W","CARD_RATE_W","ORDER_CARD_01","ORDER_CARD_02","CARD_COUNT_D","CARD_COUNT_LAST_W","CARD_JZ_W"};
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeService.customerDevelopWeek(params);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}
	/**
	 * 客户发展日报表（单行表头）
	 * 
	 * @Title exportKhfzDayInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportKhfzDayInfo，作用：报表专区/客户发展日报表导出】")
	public void exportKhfzDayInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "客户发展日报表Sheet";
		titleName = "客户发展日报表";
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
		titles = new String[] { "统计日期","业务层级","地市编码","地市名称","区县编码","区县名称","网格编码","网格名称","渠道编码","渠道名称","新入网当日任务","新入网当日完成","新入网当日超欠产","新入网当日完成率","一级排名","二级排名","当日到达客户数","昨日到达客户数","到达客户数当日净增数","90后新增当日任务","90后新增当日完成","90后新增当日超欠产","90后新增当日完成率","一级排名","二级排名","90后当日到达规模","90后昨日到达规模","90后规模当日净增","花卡新增当日任务","花卡新增当日完成","其中新入网花卡新增","其中存量迁转花卡新增","花卡新增当日超欠产","花卡新增当日完成率","一级排名","二级排名","花卡当日到达规模","花卡昨日到达规模","花卡规模当日净增"};
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
		String[] columns = null;
		
		columns = new String[] { "STATIS_DATE", "ORG_LEVEL", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME","CHNL_CODE","CHNL_NAME",
				"TELENO_TARGET_D", "TELENO_COMPETE_D","TELENO_OWE_D","TELENO_RATE_D","ORDER_TELENO_01","ORDER_TELENO_02","CUS_COUNT_D","CUS_COUNT_LAST_D","CUS_COUNT_JZ_D",
				"AFTER90_TARGET_D","AFTER90_COMPLETE_D","AFTER90_OWE_D","AFTER90_RATE_D","ORDER_90_01","ORDER_90_02","AFTER90_COUNT_D","AFTER90_COUNT_LAST_D","AFTER90_COUNT_JZ_D",
				"CARD_TARGET_D","CARD_COMPLETE_D","CARD_ADD_D","CARD_STOCK_D","CARD_OWE_D","CARD_RATE_D","ORDER_CARD_01","ORDER_CARD_02","CARD_COUNT_D","CARD_COUNT_LAST_D","CARD_JZ_D"};	
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeService.customerDevelopDay(params);
		// 4、操作单元格；将基站列表写入excel
		showExportInfo(sheet, allPoiLists, columns);
		// 5、输出
		workbook.write(outputStream);
		// 6、关流
		workbook.close();
	}
	
	/**
	 * 人员信息报表导出（单行表头）
	 * 
	 * @Title exportRyxxRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportRyxxRptInfo，作用：网格总览/人员信息报表导出】")
	private void exportRyxxRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "人员信息Sheet";
		titleName = "人员信息报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "网格类型", "人员类型", "OA工号", "登陆账号", "姓名", "性别", "电话" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "GRID_TYPE", "USER_TYPE", "OA_ID", "LOGIN_ID", "USER_NAME", "SEX", "PHONE" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeService.getJcxxInfoDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 网格信息导出（单行表头）
	 * 
	 * @Title exportWgxxRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportWgjcxx0RptInfo，作用：网格基础信息报表导出】")
	private void exportWgjcxx0RptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "网格基础信息Sheet";
		titleName = "网格基础信息报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "网格类型", "渠道数", "基站数", "直销人员数", "重点小区数","宽带小区数","AB类集团单位数","CD类集团单位数" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "GRID_TYPE", "CHNL_COUNT", "STATION_COUNT", "DIRECT_USER_COUNT", "ZDCELL_COUNT","CELL_COUNT", "AB_JT_COUNT","CD_JT_COUNT" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeService.getJcxxInfoWGJCXXDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 网格信息导出（单行表头）
	 * 
	 * @Title exportWgxxRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportWgxxRptInfo，作用：网格总览/网格信息报表导出】")
	private void exportWgxxRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "网格信息Sheet";
		titleName = "网格信息报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "网格类型", "区域面积", "网格覆盖面积", "覆盖率" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "GRID_TYPE", "AREA_SIZE", "GRID_SIZE", "COVER_RATE" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeService.getJcxxInfoDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 网格基础信息（组合表头）
	 * 
	 * @Title exportWgjcxxRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportWgjcxxRptInfo，作用：网格总览/网格基础信息报表导出】")
	private void exportWgjcxxRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.2、头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		style2.setAlignment(HorizontalAlignment.CENTER);
		// 2、创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "网格基础信息Sheet";
		titleName = "网格基础信息";
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
		// 3.2、创建列标题行(第一行)；并且设置列标题
		Row row2 = sheet.createRow(1);
		// 第一行标题
		String[] titlesOne = null;
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		titlesOne = new String[] { "统计周期", "地市编码", "地市", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监编码", "网格总监姓名", "网格总监电话", "渠道情况", "", "", "", "", "", "客户规模", "",
				"", "", "", "", "", "收入情况", "", "", "", "", "", "", "", "客户特征", "", "", "", "", "", "", "", "", "", "宽带资源", "", "", "", "", "", "", "高价值低占小区",
				"", "", "", "", "", "", "", "", "", "", "", "低价值洼地", "", "", "", "", "", "", "", "头部客户情况", "", "", "", "", "", "", "", "", "", "", "", "", "",
				"" };
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titlesOne.length-1);
		// 2.1、加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		allPoiLists = firstPageThreeService.getWgjcxxInfoDetail(params);
		Cell cell2 = null;
		for (int i = 0; i < titlesOne.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titlesOne[i]);
		}
		// 3.3、创建列标题行(第二行)；并且设置列标题
		Row row3 = sheet.createRow(2);
		// 第二行标题
		String[] titlesTwo = null;
		String[] columns = null;
		titlesTwo = new String[] { "", "", "", "", "", "", "", "", "", "", "网格内渠道数", "其中实体渠道", "其中NGBOSS渠道", "其中直销渠道", "网格内有业务量的工号", "其中ngboss渠道有业务量的工号",
				"当前入格客户数", "上月入格客户数", "本月新拓展客户数", "本月流失客户数", "2018年期末入格客户数", "本年新拓展客户数", "本年", "2018年期末拍照计费收入", "当月计费收入", "上月计费收入", "当年累计计费收入", "收入保有率",
				"当月新增客户计费收入", "上月新增客户计费收入", "当年新增客户计费收入", "大流量产品渗透率", "上月大流量产品渗透率", "固移融合率", "上月固移融合率", "终端合约率", "上月终端合约率", "话费合约率", "上月话费合约率", "家庭网或集团V网渗透率",
				"上月家庭网或集团V网渗透率", "网格内小区数", "网格内18年期末九级地址数", "网格内18年期末空余九级地址数", "上月网格内九级地址数", "上月网格内空余九级地址数", "当前网格内九级地址数", "当前网格内空余九级地址数", "高价值低占小区数",
				"高价值低占小区入格客户数", "上月入格客户数", "其中当月新增客户数", "其中当月流失客户数", "网格内高价值低占小区数", "网格内18年期末九级地址数", "网格内18年期末空余九级地址数", "上月网格内九级地址数", "上月网格内空余九级地址数",
				"当前网格内九级地址数", "当前网格内空余九级地址数", "当月90后客户规模数", "占比网格内客户规模", "上月90后客户规模数", "本月新拓展90后客户数", "本月流失90后客户数", "18年期末90后客户规模数", "本年新拓展90后客户数",
				"本年流失90后客户数", "当月头部客户数", "其中已固移融合", "头部客户固移融合率", "上月头部客户数", "其中已固移融合", "头部客户固移融合率", "本月升档至头部客户", "本月降档出头部客户", "本月头部客户离网", "18年期末头部客户数",
				"其中已固移融合", "头部客户固移融合率", "本年升档至头部客户", "本年降档出头部客户", "本年头部客户离网" };
		columns = new String[] { "STATIS_DATE", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "GRID_MANAGER_CODE",
				"GRID_MANAGER_NAME", "GRID_MANAGER_PHONE", "CHNL_COUNT", "CHNL_ENTITY_COUNT", "CHNL_NGBOSS_COUNT", "CHNL_DIRECT_COUNT", "WORK_BS_COUNT",
				"WORK_BS_NGBOSS_COUNT", "GRID_CUS_COUNT", "GRID_CUS_COUNT_LAST_M", "NEW_CUS_COUNT_M", "LOSE_CUS_COUNT_M", "GRID_CUS_LASTYEAR_COUNT",
				"NEW_CUS_COUNT_Y", "LOSE_CUS_COUNT_Y", "FEE_LAST_Y", "FEE_M", "FEE_LAST_M", "FEE_YEAR", "INCOME_RN_RATE", "ADD_CUS_FEE_M", "ADD_CUS_FEE_M_LAST",
				"ADD_CUS_FEE_Y", "CUSINFO_STRATE", "CUSINFO_STRATE_LAST_M", "FUSION_RATE", "FUSION_RATE_LAST_M", "TERMINAL_RATE", "TERMINAL_RATE_LAST_M",
				"HFHY_RATE", "HFHY_RATE_LAST_M", "HOMENET_ST_RATE", "HOMENET_ST_RATE_LAST_M", "CELL_COUNT", "ADDR_COUNT_LAST_Y", "ZEROADDR_COUNT_LAST_Y",
				"ADDR_COUNT_LAST_M", "ZEROADDR_COUNT_LAST_M", "ADDR_COUNT_D", "ZEROADDR_COUNT_D", "HLCELL_COUNT", "HLCELL_CUS_COUNT", "HLCELL_CUS_GRID_COUNT",
				"HLCELL_ADD_CUS_COUNT", "HLCELL_LOSE_CUS_COUNT", "HLCELL_GRID_COUNT", "HLCELL_ADDR_COUNT_LAST_Y", "HLCELL_ZEROADDR_COUNT_LAST_Y",
				"HLCELL_ADDR_COUNT_LAST_M", "HLCELL_ZEROADDR_COUNT_LAST_M", "HLCELL_ADDR_COUNT_D", "HLCELL_ZEROADDR_COUNT_D", "DEPADD_COUNT_M",
				"DEPADD_GRID_RATE", "DEPADD_COUNT_LAST_M", "DEPADD_ADD_COUNT_M", "DEPADD_LOSE_COUNT_M", "DEPADD_COUNT_LAST_Y", "DEPADD_ADD_COUNT_Y",
				"DEPADD_LOSE_COUNT_Y", "TBCUS_COUNT_M", "TBCUS_RH_COUNT_M", "TBCUT_RATE_M", "TBCUS_COUNT_LAST_M", "TBCUS_RH_COUNT_LAST_M",
				"TBCUT_RATE_M_LAST_M", "TBCUS_UP_COUNT_M", "TBCUS_DOWN_COUNT_M", "TBCUS_OFFLINE_COUNT_M", "TBCUS_COUNT_LAST_Y", "TBCUS_RH_COUNT_LAST_Y",
				"TBCUT_RATE_LAST_Y", "TBCUS_UP_COUNT_Y", "TBCUS_DOWN_COUNT_Y", "TBCUS_OFFLINE_COUNT_Y" };
		Cell cell3 = null;
		for (int i = 10; i < titlesTwo.length; i++) {
			cell3 = row3.createCell(i);
			// 加载单元格样式
			cell3.setCellStyle(style2);
			cell3.setCellValue(titlesTwo[i]);
		}
		// 将前面10个数据合并
		CellRangeAddress region0 = new CellRangeAddress(1, (short) 2, 0, (short) 0);
		CellRangeAddress region1 = new CellRangeAddress(1, (short) 2, 1, (short) 1);
		CellRangeAddress region2 = new CellRangeAddress(1, (short) 2, 2, (short) 2);
		CellRangeAddress region3 = new CellRangeAddress(1, (short) 2, 3, (short) 3);
		CellRangeAddress region4 = new CellRangeAddress(1, (short) 2, 4, (short) 4);
		CellRangeAddress region5 = new CellRangeAddress(1, (short) 2, 5, (short) 5);
		CellRangeAddress region6 = new CellRangeAddress(1, (short) 2, 6, (short) 6);
		CellRangeAddress region7 = new CellRangeAddress(1, (short) 2, 7, (short) 7);
		CellRangeAddress region8 = new CellRangeAddress(1, (short) 2, 8, (short) 8);
		CellRangeAddress region9 = new CellRangeAddress(1, (short) 2, 9, (short) 9);
		sheet.addMergedRegion(region0);
		sheet.addMergedRegion(region1);
		sheet.addMergedRegion(region2);
		sheet.addMergedRegion(region3);
		sheet.addMergedRegion(region4);
		sheet.addMergedRegion(region5);
		sheet.addMergedRegion(region6);
		sheet.addMergedRegion(region7);
		sheet.addMergedRegion(region8);
		sheet.addMergedRegion(region9);
		// 将中间数据合并
		CellRangeAddress region10 = new CellRangeAddress(1, (short) 1, 10, (short) 15);
		CellRangeAddress region11 = new CellRangeAddress(1, (short) 1, 16, (short) 22);
		CellRangeAddress region12 = new CellRangeAddress(1, (short) 1, 23, (short) 30);
		CellRangeAddress region13 = new CellRangeAddress(1, (short) 1, 31, (short) 40);
		CellRangeAddress region14 = new CellRangeAddress(1, (short) 1, 41, (short) 47);
		CellRangeAddress region15 = new CellRangeAddress(1, (short) 1, 48, (short) 59);
		CellRangeAddress region16 = new CellRangeAddress(1, (short) 1, 60, (short) 67);
		CellRangeAddress region17 = new CellRangeAddress(1, (short) 1, 68, (short) 82);
		sheet.addMergedRegion(region10);
		sheet.addMergedRegion(region11);
		sheet.addMergedRegion(region12);
		sheet.addMergedRegion(region13);
		sheet.addMergedRegion(region14);
		sheet.addMergedRegion(region15);
		sheet.addMergedRegion(region16);
		sheet.addMergedRegion(region17);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 3);
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
	 * 校园报表导出
	 * 
	 * @Title exportXybbInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	public void exportXybbInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
		if ("XYYXBBYHBM".equals(params.get("twoType"))) {
			// 校园营销报表-用户表(月)
			exportXyyxbbyhbmRptInfo(user, params, outputStream, session);
		} else if ("XYYHHXBM".equals(params.get("twoType"))) {
			// 校园用户画像表(月)
			exportXyyhhxbmRptInfo(user, params, outputStream, session);
		} else if ("XYYXBBXYKHQKD".equals(params.get("twoType"))) {
			// 校园营销报表-校园客户情况(日)
			exportXyyxbbxykhqkkdRptInfo(user, params, outputStream, session);
		} else if ("XYYXBBXYKHQKM".equals(params.get("twoType"))) {
			// 校园营销报表-校园客户情况(月)
			exportXyyxbbxykhqkmRptInfo(user, params, outputStream, session);
		} else if ("XYYXBBXYZDHDBLQKD".equals(params.get("twoType"))) {
			// 校园营销报表-校园重点活动办理情况(日)
			exportXyyxbbxyzdhdblqkdRptInfo(user, params, outputStream, session);
		} else if ("XYYXBBXYZDHDBLMXQKD".equals(params.get("twoType"))) {
			// 校园营销报表-校园重点活动办理明细情况(日)
			exportXyyxbbxyzdhdblmxqkdRptInfo(user, params, outputStream, session);
		} else if ("XYYXBBCLXYKHBYQKRBBD".equals(params.get("twoType"))) {
			// 校园营销报表-存量校园客户保有情况日报表(日)
			exportXyyxbbclxykhbyqkrbbdRptInfo(user, params, outputStream, session);
		} else if ("XYYHFEFBD".equals(params.get("twoType"))) {
			// 校园用户份额分布(日)
			exportXyyhfefbdRptInfo(user, params, outputStream, session);
		} else if ("XYYHFEFBM".equals(params.get("twoType"))) {
			// 校园用户份额分布(月)
			exportXyyhfefbmRptInfo(user, params, outputStream, session);
		} else if ("XYYWYHBM".equals(params.get("twoType"))) {
			// 校园异网用户表(月)
			exportXyywyhbmRptInfo(user, params, outputStream, session);
		} else if ("XYXXBM".equals(params.get("twoType"))) {
			// 校园信息表(月)
			exportXyxxbmRptInfo(user, params, outputStream, session);
		}
	}

	/**
	 * 酬金月报报表导出
	 * 
	 * @Title exportCjybInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportCjybInfo，作用：报表专区/酬金信息：酬金月报报表导出】")
	public void exportCjybInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "酬金月报报表Sheet";
		titleName = "酬金月报报表";
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
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道标识", "渠道编码", "渠道名称", "放号酬金", "宽带酬金", "不限量酬金", "套餐酬金", "集团酬金", "调整金额",
				"统计月份" };
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
		String[] columns = null;
		columns = new String[] { "AREA_ID", "AREA_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_ID", "CHNL_CODE", "CHNL_NAME", "OPEN_REWARD",
				"KD_REWARD", "UNLIMIT_REWARD", "DISC_REWARD", "BUSI_REWARD", "ADJUST_FEE", "STATIS_MONTH" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getCjybDetailExport(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 装维信息报表导出
	 * 
	 * @Title exportCjybInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportZwxxInfo，作用：报表专区/装维信息：装维信息报表导出】")
	public void exportZwxxInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "装维信息报表Sheet";
		titleName = "装维信息报表";
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
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "装维人员编码", "装维人员名称" };
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
		String[] columns = null;
		columns = new String[] { "AREA_ID", "AREA_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "REPAIR_USER_ID", "REPAIR_USER_NAME" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getZwxxDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 投诉信息报表导出
	 * 
	 * @Title exportTsxxInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportTsxxInfo，作用：报表专区/投诉信息：投诉信息报表导出】")
	public void exportTsxxInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "投诉信息报表Sheet";
		titleName = "投诉信息报表";
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
		titles = new String[] { "工单流水号", "主工单编号", "签收状态0未签收1签收", "工单内容的简短说明信息", "工单状态", "工单共享状态", "工单类型01普通工单04现场解决单", "工单所处环节", "受理类型", "受理类型名称", "来话号码",
				"手机号码", "客户名称", "联系号码", "备用手机号码", "是否头部客户", "客户数据办理渠道", "归属县市", "归属地区", "客户级别", "受理时间", "业务开通县市", "受理部门", "设置客户投诉的归属地", "受理员工", "更新时间", "更新市县",
				"更新部门", "更新员工", "工单时限", "紧急程度", "期望反馈时限", "期望反馈方式", "期望处理结果", "分区字段（YYYYMM）" };
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
		String[] columns = null;
		columns = new String[] { "WORKFORM_ID", "P_WORKFORM_ID", "SIGN_STS", "WORKFORM_TITLE", "WORKFORM_STS", "WORKFORM_STS_SHARE", "LIST_TYP",
				"CURR_NODE_CODE", "TOPIC_TYP_CODE", "TOPIC_TYP_NAME", "CALL_PHONE_CODE", "MSISDN", "CUST_NAME", "LINK_PHONE_CODE", "OTH_PHONE_CODE", "TB_FALG",
				"CUST_DATAOPEN_CHNL", "CUST_CNTY_ID", "CUST_AREA_ID", "CUST_CLASS", "ACCEPT_TIME", "ACCEPT_CNTY_ID", "ACCEPT_DEPART_ID", "ACCEPT_AREA_CODE",
				"ACCEPT_STAFF_ID", "UPDATE_TIME", "UPDATE_CNTY_CODE", "UPDATE_DEPART_ID", "UPDATE_STAFF_ID", "TIME_LIMIT", "URGENT_DEGREE", "HOPE_DEAL_TIME",
				"HOPE_FEEDBACK_TYP", "HOPE_DEAL_RESULT", "PARTITION_MONTH" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getTsxxDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 经分报表-日月累计报表导出
	 * 
	 * @Title exportJfxxInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportJfxxInfo，作用：报表专区/投诉信息：投诉信息报表导出】")
	public void exportJfxxInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "日月累计信息报表Sheet";
		titleName = "日月累计信息报表";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(20);
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
		titles = new String[] { "数据周期", "指标编码", "指标名称", "组织层级", "组织编码", "组织名称", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "目标值", "完成量",
				"完成量", "完成经度", "环比", "排名" };
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
		String[] columns = null;
		columns = new String[] { "STATIS_DATE", "KPI_CODE", "KPI_NAME", "ORG_LEVEL", "ORG_ID", "ORG_NAME", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME",
				"GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME", "TARGET", "COMPLETE_D", "COMPLETE_M", "RATE", "RATIO", "RANK" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getRyljbbDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 资源信息导出
	 * 
	 * @Title exportZyxxInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportZyxxInfo，作用：报表专区/资源信息：资源信息报表导出】")
	public void exportZyxxInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		String col1 = "";
		String col2 = "";
		// 查询出对应选择的基础单元的信息
		if (params.get("oneType").equals("5")) {
			sheetName = "基站报表Sheet";
			titleName = "基站信息报表";
			col1 = "基站编码";
			col2 = "基站名称";
		} else if (params.get("oneType").equals("1")) {
			sheetName = "渠道报表Sheet";
			titleName = "渠道报表";
			col1 = "渠道编码";
			col2 = "渠道名称";
		} else if (params.get("oneType").equals("2")) {
			sheetName = "小区报表Sheet";
			titleName = "小区报表";
			col1 = "小区编码";
			col2 = "小区名称";
		} else if (params.get("oneType").equals("6")) {
			sheetName = "端口信息报表Sheet";
			titleName = "端口信息信息报表";
			col1 = "端口编码";
			col2 = "端口名称";
		}

		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(20);
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
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", col1, col2, "经度", "纬度", "类型", "其他信息", "是否入格" };
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
		String[] columns = null;
		columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "PHYSIC_CODE", "PHYSIC_NAME", "PHYSIC_LON",
				"PHYSIC_LAT", "PHYSIC_TYPE", "PHYSIC_REST", "ENTER_GRID" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getZyxxInfoDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			for (int k = 0; k < columns.length; k++) {
				cell = row.createCell(k);
				if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
					if (columns[k].toString().equals("ENTER_GRID")) {
						if (allPoiLists.get(j).get(columns[k]).toString().equals("是")) {
							cell.setCellValue("已入格");
						} else {
							cell.setCellValue("未入格");
						}
					} else {
						cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
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
	 * 资源信息-重点小区导出
	 * 
	 * @Title exportZyxxInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportZyxxInfo，作用：报表专区/资源信息：重点小区报表导出】")
	public void exportZdxqInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "重点小区报表Sheet";
		titleName = "重点小区信息报表";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(20);
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
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "重点小区编码", "重点小区名称", "经度", "纬度", "类型", "其他信息", "是否入格" };
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
		String[] columns = null;
		columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "PHYSIC_CODE", "PHYSIC_NAME", "PHYSIC_LON",
				"PHYSIC_LAT", "PHYSIC_TYPE", "PHYSIC_REST", "ENTER_GRID" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getZdxqInfoDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			for (int k = 0; k < columns.length; k++) {
				cell = row.createCell(k);
				if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
					if (columns[k].toString().equals("ENTER_GRID")) {
						if (allPoiLists.get(j).get(columns[k]).toString().equals("是")) {
							cell.setCellValue("已入格");
						} else {
							cell.setCellValue("未入格");
						}
					} else {
						cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
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
	 * 任务下发月报报表导出
	 * 
	 * @Title exportZyxxInfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportRwxfybInfo，作用：报表专区/任务总览：任务下发月报报表导出】")
	public void exportxxrwinfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "行销任务报表Sheet";
		titleName = "行销任务信息报表";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(28);
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
		titles = new String[] { "日期", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "完成量", "促销场次" };
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
		String[] columns = null;
		columns = new String[] { "STATIS_DATE", "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME", "VAL",
				"SALES_COUNT" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getXxrwDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 行销任务报表导出
	 * 
	 * @Title exportxxrwinfo
	 * @Author caoxiaojuan
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportxxrwinfo，作用：报表专区/行销任务：行销任务报表导出】")
	public void exportRwxfybInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "任务下发月报报表Sheet";
		titleName = "任务下发月报信息报表";
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(20);
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

		titles = new String[] { "任务ID", "任务父ID", "任务月份", "任务名称", "任务级别", "全省编码( 固定值：1)", "全省名称(固定值：Z_全省)", "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称",
				"网格总监姓名", "网格总监工号", "网格总监联系电话", "渠道编码", "渠道名称", "个人客户总计费收入（万元）", "新增客户总计费收入（万元）", "放号（户）", "宽带新增（户）", "泛终端合约（户）", "新增家庭网（户）", "高价值小区提渗透",
				"新增价值洼地", "重点客户固移融合率", "中小微企业圈地行动（小微宽带+企业上云）" };
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
		String[] columns = null;
		columns = new String[] { "TASK_ID", "TASK_PID", "TASK_PERIOD", "TASK_NAME", "TASK_LEVEL", "PROVINCE_CODE", "PROVINCE_NAME", "CITY_CODE", "CITY_NAME",
				"CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "MANAGER_NAME", "MANAGER_ID", "MANAGER_PHONE", "CHNL_CODE", "CHNL_NAME", "TARGET_CUS_FEE",
				"TARGET_ADD_FEE", "TARGER_TELE_NO", "TARGET_BROADBAND_ADD", "TARGET_TERMINAL_CONTRACT", "TARGET_HOMENET_ADD", "TARGET_INFILTRATION_CELL",
				"TARGET_DEPRESSION_ADD", "TARGET_CUSTOMER_FUSION", "TARGET_ENCLOSURE_SUM" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeMapper.getRwybDetail(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园营销报表-用户表(月)
	 * 
	 * @Title exportXyyxbbyhbmRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyxbbyhbmRptInfo，作用：报表专区/校园报表：校园营销报表-用户表(月)报表导出】")
	private void exportXyyxbbyhbmRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "校园营销报表-用户表(月)Sheet";
		titleName = "校园营销报表-用户表(月)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "用户id", "用户号码", "归属运营商", "当前主套餐编码", "当前主套餐名称", "网龄", "是否本月新增",
				"是否20180801起以后新增", "是否本月通话", "是否本月通信", "是否4G客户", "是否不限量套餐客户", "是否v网用户", "是否宽带用户", "是否缴费用户", "是否套餐减免用户", "套餐减免优惠编码", "套餐减免优惠名称", "是否有效存费合约类用户",
				"是否有效终端合约类用户", "是否有效宽带合约类用户", "是否其他有效合约类用户", "合约产品编码", "合约产品名称", "合约办理时间", "合约生效时间", "合约失效时间", "当月ARPU", "本月ARPU-上月ARPU", "三月月均ARPU", "当月MOU",
				"本月MOU-上月MOU", "三月月均MOU", "当月DOU", "本月DOU-上月DOU", "三月月均DOU", "本月折扣折让金额", "折扣优惠编码", "折扣优惠档次", "合约优惠编码", "合约优惠名称", "是否上月新增用户", "上月ARPU", "上月MOU",
				"上月ARPU", "通话次数", "开户日期", "是否出账用户", "性别", "年龄", "终端品牌", "终端型号", "缴费金额", "产品编码", "产品名称", "宽带优惠类型", "APRU除折扣折让", "不限量套餐类型", "APP偏好类别", "主套餐费用" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "USR_ID", "SVC_CODE",
				"HOME_TYP_NAME", "TAOCAN_ID", "TAOCAN_NAME", "ONLINE_MONTH", "IS_NEWUSER_MONTH", "IS_NEWUSER_AFTER0801", "IS_CALL", "IS_COMMUNICATION", "IS_4G",
				"IS_UNLIMIT", "IS_VNET", "IS_KD", "IS_CHARGE", "IS_DISCNT", "DISCNT_ID", "DISCNT_NAME", "IS_CONTRACT", "IS_CONTRACT_PHONE", "IS_CONTRACT_KD",
				"IS_CONTRACT_OTHER", "CONT_PRODUCT_ID", "CONT_PRODUCT_NAME", "CONT_TIME", "CONT_VAL", "CONT_INVAL", "ARPU", "ARPU_TWO_MONTH", "ARPU_MEAN",
				"MOU", "MOU_TWO_MONTH", "MOU_MEAN", "DOU", "DOU_TWO_MONTH", "DOU_MEAN", "FEE_DISCNT", "DISCNT_YOUHUI_ID", "DISCNT_YOUHUI_RANK",
				"CONT_PACKAGE_ID", "CONT_PACKAGE_NAME", "IS_NEWUSER_LM", "ARPU_LM", "MOU_LM", "DOU_LM", "CALL_FREQ", "OPEN_DATE", "IS_ACCT_USR", "SEX", "AGE",
				"TERM_BRND", "TERM_TYP", "PAY_FEE", "PRODUCT_ID", "PRODUCT_NAME", "KD_DISCNT_TYPE", "APRU_REAL_FEE", "BXL_TYP_ID", "APP_TYPE_NAME",
				"MAIN_DISC_FEE" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolUserMonth(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园用户画像表(月)
	 * 
	 * @Title exportXyyhhxbmRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyhhxbmRptInfo，作用：报表专区/校园报表：校园用户画像表(月)报表导出】")
	private void exportXyyhhxbmRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "校园用户画像表(月)Sheet";
		titleName = "校园用户画像表(月)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "用户编码", "手机号码", "套餐编码", "套餐名称", "在网时间", "开户时间", "用户类型", "性别", "年龄", "是否4G用户", "是否不限量用户",
				"是否V网用户", "是否宽带用户", "是否套餐减免用户", "套餐减免优惠编码", "套餐减免优惠名称", "合约类型", "合约类型名称", "合约产品编码", "合约产品名称", "合约生效时间", "合约失效时间", "APRU", "MOU", "DOU", "通话次数",
				"流量分档标识", "流量分档", "通话时长分档标识", "通话时长分档", "ARPU除折让分档标识", "ARPU除折让分档", "本月折扣折让金额", "终端品牌", "终端型号", "产品编码", "产品名称", "APP偏好类别编码", "APP偏好类别",
				"主套餐费用分档标识", "主套餐费用分档" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "USR_ID", "SVC_CODE", "TAOCAN_ID", "TAOCAN_NAME", "ONLINE_MONTH",
				"OPEN_DATE", "USR_TYPE", "SEX", "AGE", "IS_4G", "IS_UNLIMIT", "IS_VNET", "IS_KD", "IS_DISCNT", "DISCNT_ID", "DISCNT_NAME", "ACTVI_TYPE_ID",
				"ACTVI_TYPE", "ACTVI_PROD", "ACTVI_PROD_NAME", "ACTVI_EFF_DATE", "ACTVI_EXP_DATE", "ARPU", "MOU", "DOU", "CALL_FREQ", "GPRS_LEVEL_ID",
				"GPRS_LEVEL", "VOICE_LEVEL_ID", "VOICE_LEVEL", "FEE_LEVEL_ID", "FEE_LEVEL", "FEE_DISCNT", "TERM_BRND", "TERM_TYP", "PRODUCT_ID", "PRODUCT_NAME",
				"APP_TYPE_ID", "APP_TYPE_NAME", "DISC_FEE_ID", "DISC_FEE_NAME" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolUserPortraitMonth(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园营销报表-校园客户情况(日)
	 * 
	 * @Title exportXyyxbbxykhqkkdRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyxbbxykhqkkdRptInfo，作用：报表专区/校园报表：校园营销报表-校园客户情况(日)报表导出】")
	private void exportXyyxbbxykhqkkdRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session)
			throws IOException {
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
		sheetName = "校园营销报表-校园客户情况(日)Sheet";
		titleName = "校园营销报表-校园客户情况(日)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "当日移动新增通话校园客户 ", "当日移动新增校园通话客户份额X%", "当月移动累计新增通话校园客户",
				"当月联通累计新增通话校园客户", "当月电信累计新增通话校园客户", "当月移动累计新增通话校园客户市场份额X%", "当月移动累计新增通话校园客户市场份额排名", "8月1日起移动累计新增通话校园客户", "8月1日起联通累计新增通话校园客户",
				"8月1日起电信累计新增通话校园客户", "8月1日起移动累计新增通话校园客户市场份额X%", "8月1日起移动累计新增通话校园客户市场份额排名", "期末移动通话客户数", "期末联通通话客户数", "期末电信通话客户数", "期末移动通话客户市场份额X%",
				"期末移动通话客户市场份额排名", "期末联通通话市场份额X%", "期末电信通话市场份额X%", "期末移动通信客户数", "期末联通通信客户数", "期末电信通信客户数", "期末通信客户市场份额X%", "期末通信客户市场份额排名", "联通期末通信市场份额X%",
				"电信期末通信市场份额X%", "当日新增4G客户数", "当月新增4G客户数", "期末4G客户数", "4G客户渗透率X%", "4G客户渗透率排名", "当日新增不限量套餐客户数", "当月新增不限量套餐客户数", "期末不限量套餐客户数", "不限量套餐客户渗透率X%",
				"不限量套餐客户渗透率排名", "其中：不限量流量包渗透率", "当月ARPU", "当月ARPU环比变化", "当月DOU", "当月DOU环比变化", "当月MOU", "当月MOU环比变化", "当前V网客户数", "V网客户渗透率", "本月缴费用户数",
				"本月缴费用户渗透率", "当日新增宽带客户数", "当月新增宽带客户数", "期末宽带客户数 ", "宽带客户渗透率", "期末存费类客户数", "期末终端类客户数", "期末宽带类客户数", "期末其他类客户数", "小计", "合约率" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "ADD_CMCC_D", "ADD_SHARE_CMCC_D",
				"ADD_CMCC_M", "ADD_CUCC_M", "ADD_CTCC_M", "ADD_SHARE_CMCC_M", "RANK_ADD_CMCC_M", "ADD_CMCC_AFTER0801", "ADD_CUCC_AFTER0801",
				"ADD_CTCC_AFTER0801", "ADD_SHARE_CMCC_AFTER0801", "RANK_ADD_CMCC_AFTER0801", "CALL_CMCC", "CALL_CUCC", "CALL_CTCC", "CALL_SHARE_CMCC",
				"CALL_RANK_CMCC", "CALL_SHARE_CUCC", "CALL_SHARE_CTCC", "COMMUNI_CMCC", "COMMUNI_CUCC", "COMMUNI_CTCC", "COMMUNI_SHARE_CMCC",
				"COMMUNI_RANK_CMCC", "COMMUNI_SHARE_CUCC", "COMMUNI_SHARE_CTCC", "G4_CMCC_D", "G4_CMCC_M", "G4_CMCC", "G4_RATE", "G4_RANK", "UMLIMIT_CMCC_D",
				"UMLIMIT_CMCC_M", "UNLIMIT_CMCC", "UNLIMIT_RATE", "UNLIMIT_RANK", "UNLIMIT_DIEJIA", "ARPU", "ARPU_HB", "DOU", "DOU_HB", "MOU", "MOU_HB", "VNET",
				"VNET_RATE", "CHARGE", "CHARGE_RATE", "KD_CMCC_D", "KD_CMCC_M", "KD_CMCC", "KD_RATE", "CONTRACT_CMCC", "CONTRACT_PHONE_CMCC",
				"CONTRACT_KD_CMCC", "CONTRACT_OTHER_CMCC", "CONTRACT_CMCC_TOL", "HY_RATE" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolUserStatusDay(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园营销报表-校园客户情况(月)
	 * 
	 * @Title exportXyyxbbxykhqkmRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyxbbxykhqkmRptInfo，作用：报表专区/校园报表：校园营销报表-校园客户情况(月)报表导出】")
	private void exportXyyxbbxykhqkmRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session)
			throws IOException {
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
		sheetName = "校园营销报表-校园客户情况(月)Sheet";
		titleName = "校园营销报表-校园客户情况(月)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "当月移动累计新增通话校园客户", "当月联通累计新增通话校园客户", "当月电信累计新增通话校园客户",
				"当月移动累计新增通话校园客户份额X%", "当月移动累计新增通话校园客户份额排名", "8月1日起移动累计新增通话校园客户", "8月1日起联通累计新增通话校园客户", "8月1日起电信累计新增通话校园客户", "8月1日起移动累计新增通话校园客户市场份额X%",
				"8月1日起移动累计新增通话校园客户市场份额排名", "期末移动通话客户数", "期末联通通话客户数", "期末电信通话客户数", "期末移动通话客户市场份额X%", "期末移动通话客户市场份额排名", "期末联通通话市场份额X%", "期末电信通话市场份额X%",
				"期末移动通信客户数", "期末联通通信客户数", "期末电信通信客户数", "期末通信客户市场份额X%", "期末通信客户市场份额排名", "联通期末通信市场份额X%", "电信期末通信市场份额X%", "当月新增4G客户数", "期末4G客户数", "4G客户渗透率X%",
				"4G客户渗透率排名", "当月新增不限量套餐客户数", "期末不限量套餐客户数", "不限量套餐客户渗透率X%", "不限量套餐客户渗透率排名", "其中：不限量流量包渗透率", "当月ARPU", "当月ARPU环比变化", "累计月均ARPU", "当月DOU(G)",
				"当月DOU环比变化", "累计月均DOU", "当月MOU", "当月MOU环比变化", "累计月均MOU", "当前V网客户数", "V网客户渗透率", "本月缴费用户数", "缴费客户渗透率", "当月新增宽带客户数", "期末宽带客户数 ", "宽带客户渗透率%",
				"期末存费类客户数", "期末终端类客户数", "期末宽带类客户数", "期末其他类客户数", "小计", "合约率" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "ADD_CMCC_M", "ADD_CUCC_M",
				"ADD_CTCC_M", "ADD_SHARE_CMCC_M", "RANK_ADD_CMCC_M", "ADD_CMCC_AFTER0801", "ADD_CUCC_AFTER0801", "ADD_CTCC_AFTER0801",
				"ADD_SHARE_CMCC_AFTER0801", "RANK_ADD_CMCC_AFTER0801", "CALL_CMCC", "CALL_CUCC", "CALL_CTCC", "CALL_SHARE_CMCC", "CALL_RANK_CMCC",
				"CALL_SHARE_CUCC", "CALL_SHARE_CTCC", "COMMUNI_CMCC", "COMMUNI_CUCC", "COMMUNI_CTCC", "COMMUNI_SHARE_CMCC", "COMMUNI_RANK_CMCC",
				"COMMUNI_SHARE_CUCC", "COMMUNI_SHARE_CTCC", "G4_CMCC_M", "G4_CMCC", "G4_RATE", "G4_RANK", "UMLIMIT_CMCC_M", "UNLIMIT_CMCC", "UNLIMIT_RATE",
				"UNLIMIT_RANK", "UNLIMIT_DIEJIA", "ARPU", "ARPU_TWO_MONTH", "ARPU_MEAN", "MOU", "MOU_TWO_MONTH", "MOU_MEAN", "DOU", "DOU_TWO_MONTH", "DOU_MEAN",
				"VNET", "VNET_RATE", "CHARGE", "CHARGE_RATE", "KD_CMCC_M", "KD_CMCC", "KD_RATE", "CONTRACT_CMCC", "CONTRACT_PHONE_CMCC", "CONTRACT_KD_CMCC",
				"CONTRACT_OTHER_CMCC", "CONTRACT_CMCC_TOL", "HY_RATE" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolUserStatusMonth(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园营销报表-校园重点活动办理情况(日)
	 * 
	 * @Title exportXyyxbbxyzdhdblqkdRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyxbbxyzdhdblqkdRptInfo，作用：报表专区/校园报表：校园营销报表-校园重点活动办理情况(日)报表导出】")
	private void exportXyyxbbxyzdhdblqkdRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session)
			throws IOException {
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
		sheetName = "校园营销报表-校园重点活动办理情况(日)Sheet";
		titleName = "校园营销报表-校园重点活动办理情况(日)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "校园和享包", "畅享包", "区域流量包", "语音叠加包", "流量提速包", "入网送费", "入网送和包券",
				"入网办甜言蜜语包", "入网送高校集团网", "存费送费", "存费送和包券", "不限量叠加包", "校园明星机", "信用购", "融合宽带", "叠加型宽带", "单宽带", "套餐功能费减免" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "PACK_HE", "PACK_CHANG",
				"PACK_DISTRI_FLOW", "PACK_VOICE", "PACK_FLOW_SPEED_UP", "ACCESS_DISC_FEE", "ACCESS_DISC_TICKET", "ACCESS_DISC_VOICE", "ACCESS_DISC_GROUP",
				"DISC_FEE", "DISC_TICKET", "DISC_UNLIMIT", "TERMI_DISC_HOT", "TERMI_DISC_CREDIT", "KD_DISC_MULTI", "KD_DISC_DIAJIA", "KD_DISC_SINGAL",
				"DISC_TAOCAN" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolImportantActiveStatusDay(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园营销报表-校园重点活动办理明细情况(日)
	 * 
	 * @Title exportXyyxbbxyzdhdblmxqkd
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyxbbxyzdhdblmxqkdRptInfo，作用：报表专区/校园报表：校园营销报表-校园重点活动办理明细情况(日)报表导出】")
	private void exportXyyxbbxyzdhdblmxqkdRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session)
			throws IOException {
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
		sheetName = "校园营销报表-校园重点活动办理明细情况(日)Sheet";
		titleName = "校园营销报表-校园重点活动办理明细情况(日)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "业务类型", "优惠编码", "优惠名称", "当日办理量", "当月办理量", "累计办理量" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "LEVEL_1_NAME", "DISCNT_ID",
				"DISCNT_NAME", "ORDER_TODAY", "ORDER_MONTH", "ORDER_TOTAL" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolImportantActiveDetailStatusDay(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园营销报表-存量校园客户保有情况日报表(日)
	 * 
	 * @Title exportXyyxbbclxykhbyqkrbbdRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyxbbclxykhbyqkrbbdRptInfo，作用：报表专区/校园报表：校园营销报表-存量校园客户保有情况日报表(日)报表导出】")
	private void exportXyyxbbclxykhbyqkrbbdRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session)
			throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, 9);
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
		sheetName = "校园营销报表-存量校园客户保有情况日报表(日)Sheet";
		titleName = "校园营销报表-存量校园客户保有情况日报表(日)报表";
		Sheet sheet = workbook.createSheet(sheetName);
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
		String[] titles = null;
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校名称", "拍照客户数", "当前保有客户数", "客户保有率" };
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "PZ_USRS", "ONNET_USRS",
				"ONNET_RATE" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolStockUserTenureStatusDay(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园用户份额分布(日)
	 * 
	 * @Title exportXyyhfefbdRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyhfefbdRptInfo，作用：报表专区/校园报表：校园用户份额分布(日)报表导出】")
	private void exportXyyhfefbdRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "校园用户份额分布(日)Sheet";
		titleName = "校园用户份额分布(日)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比",
				"异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数",
				"本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "ALL_NUM", "CMCC", "ALL_COMPI",
				"CUCC", "CTCC", "RATE_BENWANG", "RATE_COMPI", "ALL_NEW_NUM", "NEW_CMCC", "ALL_NEW_COMPI", "NEW_CUCC", "NEW_CTCC", "RATE_NEW_BENWANG",
				"RATE_NEW_COMPI", "ALL_NUM_S", "CMCC_S", "ALL_COMPI_S", "CUCC_S", "CTCC_S", "RATE_BENWANG_S", "RATE_COMPI_S", "ALL_NEW_NUM_S", "NEW_CMCC_S",
				"NEW_COMPI_S", "NEW_CUCC_S", "NEW_CTCC_S", "RATE_NEW_BENWANG_S", "RATE_NEW_COMPI_S" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolUserShareDistributionDay(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园用户份额分布(月)
	 * 
	 * @Title exportXyyhfefbmRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyyhfefbmRptInfo，作用：报表专区/校园报表：校园用户份额分布(月)报表导出】")
	private void exportXyyhfefbmRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "校园用户份额分布(月)Sheet";
		titleName = "校园用户份额分布(月)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比",
				"异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数",
				"本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_PART_ID", "SCH_PART_NAME", "ALL_NUM", "CMCC", "ALL_COMPI",
				"CUCC", "CTCC", "RATE_BENWANG", "RATE_COMPI", "ALL_NEW_NUM", "NEW_CMCC", "ALL_NEW_COMPI", "NEW_CUCC", "NEW_CTCC", "RATE_NEW_BENWANG",
				"RATE_NEW_COMPI", "ALL_NUM_S", "CMCC_S", "ALL_COMPI_S", "CUCC_S", "CTCC_S", "RATE_BENWANG_S", "RATE_COMPI_S", "ALL_NEW_NUM_S", "NEW_CMCC_S",
				"NEW_COMPI_S", "NEW_CUCC_S", "NEW_CTCC_S", "RATE_NEW_BENWANG_S", "RATE_NEW_COMPI_S" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolUserShareDistributionMonth(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园异网用户表(月)
	 * 
	 * @Title exportXyywyhbmRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyywyhbmRptInfo，作用：报表专区/校园报表：校园异网用户表(月)报表导出】")
	private void exportXyywyhbmRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "校园异网用户表(月)Sheet";
		titleName = "校园异网用户表(月)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "异网号码", "异网号码归属地编码", "异网号码归属运营商", "学校编码", "学校名称", "联系该异网号码的本网学生数", "通话次数", "通话时长", "联系该异网号码的同城本网学生数",
				"联系该异网号码的同城本网学生通话次数", "联系该异网号码的同城本网学生通话时长", "学校所属地市名称", "学校所属地市编码", "是否当日新增用户", "是否当月新增用户", "入网时间", "分校区编码", "分校区名称" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "OTHR_PARTY", "OTHER_HOME_AREA_ID", "OTHER_OPRAT_TYP_ID", "SCH_ID", "SCH_NAME",
				"SCH_USERS", "CALL_FREQ", "CALL_DUR", "LOCAL_SCH_USERS", "LOCAL_CALL_FREQ", "LOCAL_CALL_DUR", "CITY_NAME", "AREA_ID", "IF_DANGYUE", "IF_DANGRI",
				"INNET_TIME", "SCH_PART_ID", "SCH_PART_NAME" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getOutNetUserDay(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 校园信息表(月)
	 * 
	 * @Title exportXyxxbmRptInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	@ArchivesLog(actionName = "【操作类：RptFirstPageThreeService】", option = "【方法名：exportXyxxbmRptInfo，作用：报表专区/校园报表：校园信息表(月)报表导出】")
	private void exportXyxxbmRptInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
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
		sheetName = "校园信息表(月)Sheet";
		titleName = "校园信息表(月)报表";
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
		titles = new String[] { "地市名称", "区县名称", "网格名称", "学校标识", "学校名称 ", "学校主页", "办学层次", "主管单位", "学生人数", "新生人数", "教职工人数", "移动市场占有率", "学校类型", "学校归属", "注释",
				"学校所在地市编码", "学校编码（集团编码）", "校园所在CMCC运营公司标识", "校园所在CMCC运营公司名称", "办学层次编码", "学校地址", "是否重点院校", "经度", "纬度" };
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
		String[] columns = null;
		columns = new String[] { "CITY_NAME", "CNTY_NAME", "GRID_NAME", "SCH_ID", "SCH_NAME", "SCH_WEB_ADDR", "SCH_LEVEL", "SCH_COMPETENT_ORG", "SCH_USER",
				"NEW_SCH_USER", "TEACH_WORKS", "CMCC_PERCNT", "TYPE_NAME", "SCH_PROPERTY", "REMARK", "AREA_ID", "CMCC_SCH_ID", "CMCC_AREA_ID", "CMCC_AREA_NAME",
				"SCH_LEVEL_ID", "SCH_ADDR", "IF_KEY_SCH", "SCH_LONGTITUDE", "SCH_LATITUDE" };
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = firstPageThreeSchoolService.getSchoolInfoMonth(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
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
	 * 自助报表导出
	 * 
	 * @Title exportSelfHelpRptExportInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	public void exportSelfHelpRptExportInfo(SysUser user, Map<String, Object> params, ServletOutputStream outputStream, HttpSession session)
			throws IOException {
		// 根据NET_CODE查询要导出的数据库表名，表字段，列表名称
		Map<String, Object> selfHelpReportMap = rptFirstPageThreeMapper.selectSelfHelpReportByNetCode(params.get("netCode").toString());

		// 获取数据库表名
		String tableName = selfHelpReportMap.get("SELF_HELP_TABLE_NAME").toString();
		// 获取列表头名称
		String tableTHead = selfHelpReportMap.get("SELF_HELP_TABLE_EXPORT_THEAD").toString();
		// 解析列表头名称为字符串数组
		String[] tableTHeads = tableTHead.split(",");
		// 获取查询的表字段名
		String tableColumn = selfHelpReportMap.get("SELF_HELP_TABLE_EXPORT_COLUMN").toString();
		// 解析表字段名为字符串数组
		String[] tableColumns = tableColumn.split(",");
		params.put("tableName", tableName);
		params.put("tableColumn", tableColumn);

		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, tableTHeads.length - 1);
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
		sheetName = params.get("netName").toString() + "Sheet";
		titleName = params.get("netName").toString() + "报表";
		Sheet sheet = workbook.createSheet(sheetName);
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
		for (int i = 0; i < tableTHeads.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(tableTHeads[i]);
		}
		// 定义报表集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = rptFirstPageThreeMapper.selectSelfHelpReportInfo(params);
		// 4、操作单元格；将基站列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		for (int j = 0; j < allPoiLists.size(); j++) {
			row = sheet.createRow(j + 2);
			for (int k = 0; k < tableColumns.length; k++) {
				cell = row.createCell(k);
				if (allPoiLists.get(j) != null && allPoiLists.get(j).get(tableColumns[k]) != null) {
					cell.setCellValue(allPoiLists.get(j).get(tableColumns[k]).toString());
				}
			}
		}
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
