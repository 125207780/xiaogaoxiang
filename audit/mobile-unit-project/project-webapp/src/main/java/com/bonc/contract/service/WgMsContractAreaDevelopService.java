package com.bonc.contract.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.contract.dao.entity.WgMsContractAreaDevelop;
import com.bonc.contract.dao.mapper.WgMsContractAreaDevelopMapper;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;

@Service
@Transactional(rollbackFor = Exception.class)
public class WgMsContractAreaDevelopService {

	@Autowired
	private WgMsContractAreaDevelopMapper wgMsContractAreaDevelopMapper;

	@Autowired
	private KpiManagerService kpiManagerService;

	public Map<String, List<OrgSearch>> initSeletOrg(String orgId) {

		return kpiManagerService.initSeletOrg(orgId);
	}

	public Map<String, List<OrgSearch>> getChildrenOrg(String orgId) {

		return kpiManagerService.getChildrenOrg(orgId);
	}

	public List<WgMsContractAreaDevelop> getWgMsContractAreaDevelopInfo(WgMsContractAreaDevelop wgMsContractAreaDevelop, List<OrgSearch> gridInfoList) {
		List<String> gridCodes = new ArrayList<>();
		if (gridInfoList.size() > 0) {
			for (int i = 0; i < gridInfoList.size(); i++) {
				gridCodes.add(gridInfoList.get(i).getGridCode());
			}
		}
		return wgMsContractAreaDevelopMapper.getWgMsContractAreaDevelopInfo(wgMsContractAreaDevelop, gridInfoList, gridCodes);
	}

	public void exportExcel(List<WgMsContractAreaDevelop> empList, ServletOutputStream outputStream) {
		String[] titles = { "归属区县", "网格名称", "包保渠道名称", "渠道类型", "基础单元名称", "基础单元地址", "基础单元类型", "专线", "宽带", "移动", "其他", "合计" };
		// 1、创建工作簿
		HSSFWorkbook workbook = null;
		try {
			// 初始化工作簿
			workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("包保区域业务发展");
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
			cell1.setCellValue("包保区域业务发展列表");

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
					cell13.setCellValue(empList.get(j).getChnlName());
					HSSFCell cell14 = row.createCell(3);
					cell14.setCellValue(empList.get(j).getChnlType());
					HSSFCell cell15 = row.createCell(4);
					cell15.setCellValue(empList.get(j).getPhysicalName());
					HSSFCell cell16 = row.createCell(5);
					cell16.setCellValue(empList.get(j).getAddr());
					HSSFCell cell17 = row.createCell(6);
					cell17.setCellValue(empList.get(j).getSmallType());
					HSSFCell cell18 = row.createCell(7);
					cell18.setCellValue(empList.get(j).getLineNum());
					HSSFCell cell19 = row.createCell(8);
					cell19.setCellValue(empList.get(j).getKdNum());
					HSSFCell cell110 = row.createCell(9);
					cell110.setCellValue(empList.get(j).getMobileNum());
					HSSFCell cell111 = row.createCell(10);
					cell111.setCellValue(empList.get(j).getQtNum());
					HSSFCell cell112 = row.createCell(11);
					cell112.setCellValue(empList.get(j).getTotalNum());
				}
			}
			// 5、输出
			workbook.write(outputStream);
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
