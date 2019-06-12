package com.bonc.gridinfo.service;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Service;

import com.bonc.gridinfo.dao.entity.BasicUnitInfo;
import com.bonc.gridinfo.dao.mapper.BasicUnitInfoMapper;

@Service
public class BasicUnitInfoService {

	@Resource
	private BasicUnitInfoMapper basicUnitInfoMapper;

	public BasicUnitInfoMapper getMapper() {
		return basicUnitInfoMapper;
	}

	public List<BasicUnitInfo> selectAll(String gridCode, String physicalName, String bigType, String physicalType) {
		return basicUnitInfoMapper.selectAll(gridCode, physicalName, bigType, physicalType);
	}

	public void exportExcel(List<BasicUnitInfo> empList, ServletOutputStream outputStream) {

		try {
			String[] titles = { "基础单元编号", "基础单元名称", "基础单元类型", "详细地址", "负责人", "联系电话" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("基础单元信息列表");
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
			cell1.setCellValue("基础单元信息列表");

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
					cell11.setCellValue(empList.get(j).getPhysicalId());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getPhysicalName());
					HSSFCell cell13 = row.createCell(2);
					cell13.setCellValue(empList.get(j).getPhysicalType());
					HSSFCell cell14 = row.createCell(3);
					cell14.setCellValue(empList.get(j).getAddress());
					HSSFCell cell15 = row.createCell(4);
					cell15.setCellValue(empList.get(j).getMaster());
					HSSFCell cell16 = row.createCell(5);
					cell16.setCellValue(empList.get(j).getMasterNumber());

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

	/**
	 * 查询所有商场信息
	 * 
	 * @param orgId
	 * 
	 * @Title selectMallAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectMallAll(String orgId) {
		return basicUnitInfoMapper.selectMallAll(orgId);
	}

	/**
	 * 查询小区信息
	 * 
	 * @param string
	 * 
	 * @Title selectCommunityAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectCommunityAll(String orgId) {
		return basicUnitInfoMapper.selectCommunityAll(orgId);
	}

	/**
	 * 查询校园信息
	 * 
	 * @param string
	 * 
	 * @Title selectSchoolAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectSchoolAll(String orgId) {
		return basicUnitInfoMapper.selectSchoolAll(orgId);
	}

	/**
	 * 查询村庄信息
	 * 
	 * @param string
	 * 
	 * @Title selectVillageAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectVillageAll(String orgId) {
		return basicUnitInfoMapper.selectVillageAll(orgId);
	}

	/**
	 * 查询乡镇信息
	 * 
	 * @param string
	 * 
	 * @Title selectTownAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectTownAll(String orgId) {
		return basicUnitInfoMapper.selectTownAll(orgId);
	}

	/**
	 * 查询市场信息
	 * 
	 * @param string
	 * 
	 * @Title selectMarketAll
	 * @Author xiaogaoxiang
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectMarketAll(String orgId) {
		return basicUnitInfoMapper.selectMarketAll(orgId);
	}

	/**
	 * 根据physicalId查询信息
	 * 
	 * @Title selectBasicUnitInfoByPhysicalId
	 * @Author xiaogaoxiang
	 * @param physicalId
	 * @return List<BasicUnitInfo>
	 */
	public List<BasicUnitInfo> selectBasicUnitInfoByPhysicalId(String physicalId) {
		return basicUnitInfoMapper.selectBasicUnitInfoByPhysicalId(physicalId);
	}

}
