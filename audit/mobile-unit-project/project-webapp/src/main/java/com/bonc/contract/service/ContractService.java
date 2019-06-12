package com.bonc.contract.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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

import com.alibaba.fastjson.JSONArray;
import com.bonc.common.utils.ExportUtils;
import com.bonc.contract.dao.mapper.ContractMapper;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class ContractService {

	@Resource
	private ContractMapper contractMapper;

	@Resource
	private SysOrgService sysOrgService;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	public List<Map<String, Object>> getIndexGridList(String pid) {

		return contractMapper.getIndexGridList(pid);
	}

	public List<Map<String, Object>> getIndexChannelList(String gridCode) {

		return contractMapper.getIndexChannelList(gridCode);
	}

	public Page<Map<String, Object>> getIndexTable(String gridCode, String chnlCode, List<String> statusArr, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("gridCode", gridCode);
		param.put("chnlCode", chnlCode);
		param.put("statusArr", statusArr);
		Page<Map<String, Object>> pageList = (Page<Map<String, Object>>) this.contractMapper.getIndexTable(param);
		return pageList;
	}

	/**
	 * 初始化查询渠道包保信息
	 * 
	 * @Title initContractInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> initContractInfo(Map<String, Object> params) {
		return contractMapper.initContractInfo(params);
	}

	/**
	 * 初始化查询包保统计汇总查询
	 * 
	 * @Title initContractAnalysis
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> initContractAnalysis(Map<String, Object> params) {
		return contractMapper.initContractAnalysis(params);
	}

	/**
	 * 初始化查询包保统计汇总查询
	 * 
	 * @Title initContractAnalysis
	 * @Author caoxiaojuan
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public Map<String, Object> initContractEchart(Map<String, Object> params) {
		return contractMapper.initContractEchart(params);
	}

	/**
	 * 初始化下拉框
	 * 
	 * @Title initSelectInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> initSelectInfo(SysUser user) {
		List<Map<String, Object>> result = new ArrayList<>();
		Map<String, Object> cityMap = new HashMap<>();
		Map<String, Object> cntyMap = new HashMap<>();
		Map<String, Object> gridMap = new HashMap<>();
		SysOrg sysOrg = user.getSysOrg();
		// 用户是省级领导
		if (user.getOrgLevel() == 1) {
			// 查询所有地市的信息
			List<SysOrg> sysOrgList = sysOrgService.getChildrenSysOrgByOrgId(sysOrg.getOrgId());
			cityMap.put("CITY", sysOrgList);
			cntyMap.put("CNTY", null);
			gridMap.put("GRID", null);
		}
		// 用户是地市领导
		else if (user.getOrgLevel() == 2) {
			// 将当前的地市传进去
			List<SysOrg> sysOrgList = new ArrayList<>();
			sysOrgList.add(sysOrg);
			cityMap.put("CITY", sysOrgList);
			// 查询所有区县信息
			List<SysOrg> sysOrgChildrenList = sysOrgService.getChildrenSysOrgByOrgId(sysOrg.getOrgId());
			cntyMap.put("CNTY", sysOrgChildrenList);
			// 网格信息
			gridMap.put("GRID", null);
		}
		// 用户是区县领导
		else if (user.getOrgLevel() == 3) {
			// 先根据当前页用户的pid查询上级地市父节点信息
			List<SysOrg> sysOrgParentList = sysOrgService.getParentSysOrgByOrgId(sysOrg.getPid());
			cityMap.put("CITY", sysOrgParentList);
			// 将当前的区县传进去
			List<SysOrg> sysOrgList = new ArrayList<>();
			sysOrgList.add(sysOrg);
			cntyMap.put("CNTY", sysOrgList);
			// 查询所有网格信息
			List<SysOrg> sysOrgChildrenList = sysOrgService.getChildrenSysOrgByOrgId(sysOrg.getOrgId());
			gridMap.put("GRID", sysOrgChildrenList);
		}
		result.add(cityMap);
		result.add(cntyMap);
		result.add(gridMap);
		return result;
	}

	/**
	 * 导出小区包保统计明细
	 * 
	 * @Title exportContractAnalysis
	 * @Author caoxiaojuan
	 * @param user
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	public void exportContractAnalysis(SysUser user, ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 定义整合所有的基础单元集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 创建工作表
		String sheetName = null;
		String[] titles = null;
		String[] columns = null;
		String titleName = null;

		sheetName = "包保统计Sheet";
		titleName = "包保统计导出明细";
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "宽带小区数量", "被包保的宽带小区数量", "渠道数", "参与包保的渠道数" };
		columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CELL_CNT", "RESPONSIBLE_CELL_CNT", "CHNL_CNT",
				"RESPONSIBLE_CHNL_CNT" };
		// 当前登录用户为地市人员转换为3位编码
		if (user.getOrgLevel().toString().equals("2")) {
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(user.getOrgId());
			user.setOrgId(orgIdMap.get("OLD_ORG_ID").toString());
		}
		allPoiLists = contractMapper.exportContractAnalysis(user.getOrgId(), user.getOrgLevel());

		Sheet sheet = workbook.createSheet(sheetName);
		// 创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
		// 加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(25);
		// 创建行
		// 创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		Cell cell2 = null;
		for (int j = 0; j < titles.length; j++) {
			cell2 = row2.createCell(j);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[j]);
		}
		// 操作单元格；将基站列表写入excel
		if (allPoiLists != null) {
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
		}

		// 输出
		workbook.write(outputStream);
		// 关流
		workbook.close();
	}

	/**
	 * 导出包保明细
	 * 
	 * @Title exportContractInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	public void exportContractInfo(SysUser user, ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 定义整合所有的基础单元集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		for (int i = 0; i < 2; i++) {
			// 头标题样式
			CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 列标题样式
			CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 创建工作表
			String sheetName = null;
			String[] titles = null;
			String[] columns = null;
			String titleName = null;
			if (i == 0) {
				sheetName = "渠道Sheet";
				titleName = "渠道导出明细";
				titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称" };
				columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CHNL_CODE", "CHNL_NAME" };
				// 根据当前登录用户的组织编码，查询对应的渠道信息
				allPoiLists = contractMapper.selectChannelInfoByOrgId(user.getOrgId());
			} else {
				sheetName = "小区Sheet";
				titleName = "宽带小区导出明细";
				titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "宽带小区编码", "宽带小区名称" };
				columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "CELL_CODE", "CELL_NAME" };
				// 根据当前登录用户的组织编码，查询对应的宽带小区信息
				allPoiLists = contractMapper.selectCellInfoByOrgId(user.getOrgId());
			}
			Sheet sheet = workbook.createSheet(sheetName);
			// 创建合并单元格对象
			CellRangeAddress cellRangeAddress = null;
			cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);
			// 创建行
			// 创建头标题行；并且设置头标题
			Row row1 = sheet.createRow(0);
			Cell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue(titleName);
			// 创建列标题行；并且设置列标题
			Row row2 = sheet.createRow(1);
			Cell cell2 = null;
			for (int j = 0; j < titles.length; j++) {
				cell2 = row2.createCell(j);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[j]);
			}
			// 操作单元格；将基站列表写入excel
			if (allPoiLists != null) {
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
			}
		}
		// 输出
		workbook.write(outputStream);
		// 关流
		workbook.close();
	}

	/**
	 * 导出包保明细模板
	 * 
	 * @param path
	 * 
	 * @Title exportContractInfoModel
	 * @Author xiaogaoxiang
	 * @param list
	 * @param outputStream
	 * @param flag
	 *            void
	 */
	public void exportContractInfoModel(String path, ServletOutputStream outputStream, Boolean flag) {
		try {
			String[] titles = { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "区域总监姓名", "区域总监电话", "包保渠道编码", "包保渠道名称", "宽带小区编码", "宽带小区名称" };
			HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(path));
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.2、头标题样式
			HSSFCellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("包保明细模板");
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);

			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("包保明细模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);

			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
			hssfworkbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 小区包保导入
	 * 
	 * @Title readContractExcelByPath
	 * @Author xiaogaoxiang
	 * @param fileName
	 * @param user
	 * @return
	 * @throws IOException
	 *             String
	 */
	@SuppressWarnings("resource")
	@Transactional
	public String readContractExcelByPath(String fileName, SysUser user) throws IOException {
		// 返回message
		String message = null;
		HSSFWorkbook hssfworkbook = null;
		FileInputStream fileInputStream = null;
		Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(user.getOrgId());
		String orgId = orgIdMap.get("OLD_ORG_ID").toString();
		try {
			fileInputStream=new FileInputStream(fileName);
			hssfworkbook = new HSSFWorkbook(fileInputStream);
			// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
			HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);
			// 判断表头内容是否是模板内容
			HSSFRow row = hssfsheet.getRow(1);
			boolean flag = false;
			if (null != row) {
				if (!"地市编码".equals(row.getCell(0).toString()) || !"地市名称".equals(row.getCell(1).toString()) || !"区县编码".equals(row.getCell(2).toString())
						|| !"区县名称".equals(row.getCell(3).toString()) || !"网格编码".equals(row.getCell(4).toString()) || !"网格名称".equals(row.getCell(5).toString())
						|| !"区域总监姓名".equals(row.getCell(6).toString()) || !"区域总监电话".equals(row.getCell(7).toString())
						|| !"包保渠道编码".equals(row.getCell(8).toString()) || !"包保渠道名称".equals(row.getCell(9).toString())
						|| !"宽带小区编码".equals(row.getCell(10).toString()) || !"宽带小区名称".equals(row.getCell(11).toString())) {
					flag = true;
				}
				if (flag) {
					message = "导入文件与模板文件不一致！请检查！";
					return message;
				} else {
					// 获取内容
					List<Map<String, String>> mapList = readContractExcelIsNull(hssfsheet);
					// 循环集合
					if (null != mapList && mapList.size() > 0) {
						String chnlCode = null;
						String cellCode = null;
						// String chnlGridCode = null;
						List<String> cellGridCode = null;
						Map<String, Object> rpMap = null;
						List<Map<String, String>> errorMapList = new ArrayList<>();
						Map<String, String> errorMap = null;
						flag = true;
						int rightCount = 0;
						// 不为空则循环集合
						for (Map<String, String> m : mapList) {
							errorMap = new HashMap<>();
							// 渠道编码
							chnlCode = m.get("RESPONSIBLE_CHNL_CODE").toString();
							// 基站小区编码
							cellCode = m.get("RESPONSIBLE_CELL_CODE").toString();
							// 根据基站小区查询对应基站小区归属的网格，并用查询出来的网格，比较excel中的网格编码，判断是否一致，如果不一致就这一条不做录入
							cellGridCode = contractMapper.selectStationCellByCellCode(cellCode);
							// 如果不为空，则判断是否是同一个网格信息
							if (null != cellGridCode && cellGridCode.size() > 0) {
								// 判断查询出来的入格网格编码，是否和excel中的一致
								if (cellGridCode.contains(m.get("GRID_CODE"))) {
									// 如果网格编码一致，则判断，当前填写的地市名称，和当前登录人的地市是否一致，如果不一致，则增加到错误列表中
									if (orgId.equals(String.valueOf(Double.valueOf(m.get("CITY_CODE").toString()).intValue()))) {
										// 如果相同，则表示符合条件，则进行新增或者修改，先用小区编码查询是否有重复记录
										rpMap = contractMapper.selectRpGridResponsibilityByCellCode(cellCode);
										// 如果为空，则新增
										if (null == rpMap) {
											contractMapper.insertRpGridResponsibility(m);
											rightCount++;
										}
										// 如果非空，则修改
										else {
											contractMapper.updateRpGridResponsesibility(m);
											rightCount++;
										}
									}
									// 如果判断excel填写的地市编码与当前登录人的不一致，则增加到错误列表中
									else {
										errorMap = m;
										errorMap.put("errorMsg", "渠道编码：" + chnlCode + "，填写的地市编码与当前登录人的不一致！");
										errorMapList.add(m);
									}
								}
								// 如果不一致，则增加到错误列表中
								else {
									errorMap = m;
									errorMap.put("errorMsg", "小区编码： " + cellCode + "， 与归属网格不一致！");
									errorMapList.add(m);
								}
							}
							// 如果为空，则增加到错误列表中
							else {
								errorMap = m;
								errorMap.put("errorMsg", "小区编码：" + cellCode + "， 没有归属网格！");
								errorMapList.add(m);
							}
						}
						message = "导入成功";
						if (null != errorMapList && errorMapList.size() > 0) {
							// 执行导出错误的excel
							message = "执行成功： " + rightCount + " 条，其中有：" + errorMapList.size() + "条错误信息！&" + JSONArray.toJSONString(errorMapList);
							// exportErrorStationCellInfo(errorMapList);
						}
					} else {
						message = "没有内容！";
					}
				}
			} else {
				message = "没有内容！";
			}
		} catch (Exception e) {
			e.printStackTrace();
			message = "转换异常！请联系管理员帮忙检核数据！";
		} finally {
			fileInputStream.close();
		}
		return message;
	}

	/**
	 * 导出错误的渠道基站小区信息
	 * 
	 * @Title exportErrorStationCellInfo
	 * @Author xiaogaoxiang
	 * @param errorMapList
	 *            void
	 * @param response
	 */
	@SuppressWarnings("unchecked")
	public void exportErrorStationCellInfo(SysUser user, String jsonList, ServletOutputStream outputStream, HttpSession session) {
		List<Map<String, String>> errorMapList = new ArrayList<>();
		errorMapList = JSONArray.parseObject(jsonList, List.class);
		try {
			// 创建对象
			Workbook workbook = new SXSSFWorkbook(100);
			// 头标题样式
			CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 列标题样式
			CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 创建工作表
			String sheetName = null;
			String titleName = null;
			// 查询出对应选择的基础单元的信息
			sheetName = "Sheet";
			titleName = "渠道包保错误信息";
			// 定义标题行
			String[] titles = null;
			titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "区域总监姓名", "区域总监电话", "包保渠道编码", "包保渠道名称", "包保宽带小区编码", "包保宽带小区名称", "错误信息" };
			// 定义列的字段
			String[] columns = null;
			columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "DIRECTOR_NAME", "DIRECTOR_PHONE",
					"RESPONSIBLE_CHNL_CODE", "RESPONSIBLE_CHNL_NAME", "RESPONSIBLE_CELL_CODE", "RESPONSIBLE_CELL_NAME", "errorMsg" };
			Sheet sheet = workbook.createSheet(sheetName);
			// 创建合并单元格对象
			CellRangeAddress cellRangeAddress = null;
			// 起始行号，结束行号，起始列号，结束列号
			cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
			// 加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(20);
			// 创建行
			// 创建头标题行；并且设置头标题
			Row row1 = sheet.createRow(0);
			Cell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue(titleName);
			// 创建列标题行；并且设置列标题
			Row row2 = sheet.createRow(1);
			Cell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 定义集合
			List<Map<String, String>> allPoiLists = new ArrayList<>();
			// 查询列表
			allPoiLists = errorMapList;
			// 操作单元格；将列表写入excel
			Row row = null;
			// 导出
			Cell cell = null;
			if (null != allPoiLists && allPoiLists.size() > 0) {
				for (int j = 0; j < allPoiLists.size(); j++) {
					row = sheet.createRow(j + 2);
					for (int k = 0; k < columns.length; k++) {
						cell = row.createCell(k);
						if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
							cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
						}
					}
				}
			}
			// 输出
			workbook.write(outputStream);
			// 关流
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private List<Map<String, String>> readContractExcelIsNull(HSSFSheet hssfsheet) {
		// 结果集
		List<Map<String, String>> mapList = new ArrayList<>();
		// 结果
		Map<String, String> map = null;
		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				map = new HashMap<String, String>();
				// 地市编码
				map.put("CITY_CODE", row.getCell(0) == null ? null : String.valueOf(Double.valueOf(row.getCell(0).toString()).intValue()));
				// 地市名称
				map.put("CITY_NAME", row.getCell(1) == null ? null : row.getCell(1).toString());
				// 区县编码
				map.put("CNTY_CODE", row.getCell(2) == null ? null : row.getCell(2).toString());
				// 区县名称
				map.put("CNTY_NAME", row.getCell(3) == null ? null : row.getCell(3).toString());
				// 网格编码
				map.put("GRID_CODE", row.getCell(4) == null ? null : row.getCell(4).toString());
				// 网格名称
				map.put("GRID_NAME", row.getCell(5) == null ? null : row.getCell(5).toString());
				// 区域总监姓名
				map.put("DIRECTOR_NAME", row.getCell(6) == null ? null : row.getCell(6).toString());
				// 区域总监电话
				map.put("DIRECTOR_PHONE", row.getCell(7) == null ? null :  getCellValue(row.getCell(7)));
				// 包保渠道编码
				map.put("RESPONSIBLE_CHNL_CODE", row.getCell(8) == null ? null : row.getCell(8).toString());
				// 包保渠道名称
				map.put("RESPONSIBLE_CHNL_NAME", row.getCell(9) == null ? null : row.getCell(9).toString());
				// 宽带小区编码
				map.put("RESPONSIBLE_CELL_CODE", String.valueOf(getCellValue(row.getCell(10))));
				// 宽带小区名称
				map.put("RESPONSIBLE_CELL_NAME", row.getCell(11) == null ? null : row.getCell(11).toString());
				mapList.add(map);
			}
		}
		return mapList;
	}

	/**
	 * 描述：对表格中数值进行格式化
	 * 
	 * @Title getCellValue
	 * @Author xiaogaoxiang
	 * @param cell
	 * @return Object
	 */
	@SuppressWarnings("deprecation")
	public static String getCellValue(Cell cell) {
		String value = null;
		DecimalFormat df = new DecimalFormat("0"); // 格式化number String字符
		SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd"); // 日期格式化
		DecimalFormat df2 = new DecimalFormat("0"); // 格式化数字
		System.out.println(cell.getCellType());
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING:
			value = cell.getRichStringCellValue().getString();
			break;
		case Cell.CELL_TYPE_NUMERIC:
			if ("General".equals(cell.getCellStyle().getDataFormatString())) {
				value = df.format(cell.getNumericCellValue());
			} else if ("m/d/yy".equals(cell.getCellStyle().getDataFormatString())) {
				value = sdf.format(cell.getDateCellValue());
			} else {
				value = df2.format(cell.getNumericCellValue());
			}
			break;
		case Cell.CELL_TYPE_BLANK:
			value = "";
			break;
		case Cell.CELL_TYPE_FORMULA:
			value = cell.getCellFormula().toString();
		default:
			break;
		}
		return value;
	}

	/**
	 * 导出渠道包保明细
	 * 
	 * @Title exportContractDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @param outputStream
	 * @param session
	 *            void
	 * @throws IOException
	 */
	public void exportContractDetail(Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "渠道包保Sheet";
		titleName = "渠道包保信息";
		// 定义标题行
		String[] titles = null;
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "区域总监姓名", "区域总监电话", "包保渠道编码", "包保渠道名称", "包保宽带小区编码", "包保宽带小区名称" };
		// 定义列的字段
		String[] columns = null;
		columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "DIRECTOR_NAME", "DIRECTOR_PHONE",
				"RESPONSIBLE_CHNL_CODE", "RESPONSIBLE_CHNL_NAME", "RESPONSIBLE_CELL_CODE", "RESPONSIBLE_CELL_NAME" };
		Sheet sheet = workbook.createSheet(sheetName);
		// 创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(20);
		// 创建行
		// 创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = contractMapper.getContractDetail(params);
		// 操作单元格；将列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		if (null != allPoiLists && allPoiLists.size() > 0) {
			for (int j = 0; j < allPoiLists.size(); j++) {
				row = sheet.createRow(j + 2);
				for (int k = 0; k < columns.length; k++) {
					cell = row.createCell(k);
					if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
						cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
					}
				}
			}
		}
		// 输出
		workbook.write(outputStream);
		// 关流
		workbook.close();
	}
}
