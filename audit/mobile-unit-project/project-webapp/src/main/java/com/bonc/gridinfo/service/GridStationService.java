package com.bonc.gridinfo.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.bonc.common.utils.DateUtil;
import com.bonc.gridinfo.dao.entity.OrgGridStation;
import com.bonc.gridinfo.dao.mapper.GridStationMapper;

@Service
public class GridStationService {

	@Resource
	private GridStationMapper mapper;

	public GridStationMapper getMapper() {
		return mapper;
	}

	public void CallDb2GXWH(String orgId) {
		Map<String, Object> paramCusKey = new HashMap<String, Object>();
		paramCusKey.put("orgId", orgId);
		this.mapper.CallDb2GXWH(paramCusKey);
	}

	public List<OrgGridStation> getGridStationInfo(String orgId, String gridCode) {
		List<OrgGridStation> listOgd = mapper.getGridStationtInfo(orgId, gridCode);
		return listOgd;
	}

	public List<OrgGridStation> getGridDeptInfoByName(String orgId, String stationName) {
		List<OrgGridStation> listOgd = mapper.getGridDeptInfoByName(orgId, stationName);
		return listOgd;
	}

	@SuppressWarnings("unchecked")
	public void removeAllGrid(String data) {
		List<Map<String, String>> updateList = (List<Map<String, String>>) JSON.parse(data);
		String updateDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
		for (int i = 0; i < updateList.size(); i++) {
			String areaId = updateList.get(i).get("areaId");
			String gridCode = updateList.get(i).get("gridCode");
			String stationCode = updateList.get(i).get("stationCode");
			this.mapper.removeSingleGrid(updateDate, areaId, gridCode, stationCode);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void addSingleGrid(OrgGridStation orgGridDepartment) {
		Map<String, Object> parentOrg = this.mapper.getParenOrg(orgGridDepartment.getAreaId());
		orgGridDepartment.setAreaName((String) parentOrg.get("AREANAME"));
		this.mapper.addSingleGrid(orgGridDepartment);
	}

	@SuppressWarnings("unchecked")
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void addAllGrid(String areaId, String gridInfo, String gridCode, String gridName, String gridType) {
		Map<String, Object> parentOrg = this.mapper.getParenOrg(areaId);
		List<Map<String, String>> gridList = (List<Map<String, String>>) JSON.parse(gridInfo);
		String joinDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
		OrgGridStation orgGridDepartment = new OrgGridStation();
		for (int i = 0; i < gridList.size(); i++) {
			orgGridDepartment.setAreaName((String) parentOrg.get("AREANAME"));
			orgGridDepartment.setAreaId(areaId);
			orgGridDepartment.setJoinDate(joinDate);
			orgGridDepartment.setStationCode(gridList.get(i).get("stationCode"));
			orgGridDepartment.setStationName(gridList.get(i).get("stationName"));
			orgGridDepartment.setStationType(gridList.get(i).get("stationType"));
			orgGridDepartment.setStatus("A");
			orgGridDepartment.setUpdateDate(null);
			orgGridDepartment.setGridCode(gridCode);
			orgGridDepartment.setGridName(gridName);
			orgGridDepartment.setGridType(gridType);
			this.mapper.addSingleGrid(orgGridDepartment);
		}
	}

	public int saveImportData(List<OrgGridStation> list) {
		int num = 0;
		for (int i = 0; i < list.size(); i++) {
			String StationCode = mapper.findByStationInfo(list.get(i).getStationCode());
			if (StringUtils.isNotBlank(StationCode)) {
				String gridStationCode = mapper.findByStationCode(StationCode);
				if (StringUtils.isBlank(gridStationCode)) {
					num += mapper.saveImportData(list.get(i));
				} else {
					num += mapper.updateImportData(list.get(i));
				}
			}
		}
		return num;
	}

	public Map<String, String> findGridCodeByName(String name, String orgId) {
		return mapper.findGridCodeByName(name, orgId);
	}

	public String findStationTypeByStationCode(String stationCode, String orgId) {
		return mapper.findStationTypeByStationCode(stationCode, orgId);
	}

	public void exportExcel(List<OrgGridStation> empList, ServletOutputStream outputStream) {
		String[] titles = { "区县名称", "网格名称", "基站编码", "基站名称" };
		// 1、定义工作簿
		HSSFWorkbook workbook = null;
		try {
			// 1、实例化工作簿
			workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("基站关系维护模板");
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
			cell1.setCellValue("基站关系维护模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					HSSFCell cell11 = row.createCell(0);
					cell11.setCellValue(empList.get(j).getAreaName());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getGridName());
					HSSFCell cell13 = row.createCell(2);
					cell13.setCellValue(empList.get(j).getStationCode());
					HSSFCell cell14 = row.createCell(3);
					cell14.setCellValue(empList.get(j).getStationName());
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				workbook.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

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
