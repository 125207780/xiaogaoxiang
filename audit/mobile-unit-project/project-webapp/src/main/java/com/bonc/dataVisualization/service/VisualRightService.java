package com.bonc.dataVisualization.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Service;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.DateUtil;
import com.bonc.common.utils.JsonUtils;
import com.bonc.dataVisualization.dao.entity.TableInfo;
import com.bonc.dataVisualization.dao.mapper.VisualRightMapper;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.PageHelper;

@Service
public class VisualRightService {

	@Resource
	private VisualRightMapper visualRightMapper;

	public VisualRightMapper getMapper() {

		return visualRightMapper;
	}

	@SuppressWarnings("unchecked")
	public void addTableInfo(HttpServletRequest request, String param, int len) {
		Map<String, Object> map = (Map<String, Object>) JsonUtils.json2Java(param);
		TableInfo tableInfo = new TableInfo();
		for (int i = 0; i < len; i++) {
			tableInfo.setTableName((String) map.get("tableName"));
			tableInfo.setTabschema((String) map.get("tabschema"));
			tableInfo.setTableRemake((String) map.get("tableRemake"));
			tableInfo.setColumnName((String) map.get("columnName" + i));
			tableInfo.setColumnType((String) map.get("columnType" + i));
			tableInfo.setColumnSize((String) map.get("columnSize" + i));
			tableInfo.setColumnRemake((String) map.get("columnRemake" + i));
			SysUser sysUser = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
			tableInfo.setCreateTime(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
			tableInfo.setOprUser(sysUser.getUserId());
			visualRightMapper.addTableInfo(tableInfo);
		}
	}

	public int checkTale(String tableName, String tabschema) {
		return visualRightMapper.checkTable(tableName, tabschema);
	}

	public List<Map<String, Object>> findByColumnName(String tableName) {
		String tabschema = visualRightMapper.findTabschema(tableName);
		List<Map<String, Object>> findColumnName = null;
		if (StringUtils.isNotBlank(tabschema)) {
			findColumnName = visualRightMapper.findColumnName(tableName, tabschema);
		}
		return findColumnName;
	}

	public List<Map<String, Object>> findColumnContent(String tableName, Integer page, Integer rows) {
		String tabschema = visualRightMapper.findTabschema(tableName);
		List<Map<String, Object>> listTitle = this.getMapper().findColumnName(tableName, tabschema);
		String field = "";
		for (int i = 0; i < listTitle.size(); i++) {
			if (i == listTitle.size() - 1) {
				field += listTitle.get(i).get("COLNAME");
			} else {
				field += listTitle.get(i).get("COLNAME") + ",";
			}
		}
		List<Map<String, Object>> columnContent = null;
		PageHelper.startPage(page, rows);
		if (StringUtils.isNotBlank(tabschema)) {
			String sql = tabschema + "." + tableName;
			columnContent = visualRightMapper.findColumnContent(sql, field);
		}
		return columnContent;
	}

	public void exportExcel(List<Map<String, Object>> listInfo, List<Map<String, Object>> listTitle, ServletOutputStream outputStream, String tableName) {
		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, listTitle.size()-1);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet(tableName + "_信息表");
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
			cell1.setCellValue(tableName + "_信息列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			ArrayList<String> arr = new ArrayList<String>();
			for (Map<String, Object> map : listTitle) {
				arr.add((String) map.get("COLNAME"));
			}
			for (int i = 0; i < arr.size(); i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(arr.get(i));
			}
			// 4、操作单元格；将用户列表写入excel
			if (listInfo != null) {
				for (int x = 0; x < listInfo.size(); x++) {
					HSSFRow row = sheet.createRow(x + 2);
					for (int y = 0; y < arr.size(); y++) {
						HSSFCell cell = row.createCell(y);
						if (listInfo.get(x).get(arr.get(y)) != null) {
							cell.setCellValue(listInfo.get(x).get(arr.get(y)).toString());
						}
					}
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 创建单元格样式
	 * 
	 * @param workbook
	 *            工作簿
	 * @param fontSize
	 *            字体大小
	 * @return 单元格样式
	 */
	private static HSSFCellStyle createCellStyle(HSSFWorkbook workbook, short fontSize) {
		HSSFCellStyle style = workbook.createCellStyle();
		// 创建字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints(fontSize);
		// 加载字体
		style.setFont(font);
		return style;
	}

}
