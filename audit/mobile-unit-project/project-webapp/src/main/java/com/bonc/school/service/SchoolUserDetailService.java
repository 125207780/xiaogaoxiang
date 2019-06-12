package com.bonc.school.service;

import java.util.List;

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

import com.bonc.school.dao.entity.SchoolUserDetail;
import com.bonc.school.dao.mapper.SchoolUserDetailMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SchoolUserDetailService {

	@Autowired
	private SchoolUserDetailMapper schoolUserDetailMapper;

	public SchoolUserDetailMapper getMapper() {
		return schoolUserDetailMapper;
	}

	public List<SchoolUserDetail> selectAll(int statisMonth, String actviType, String usrType, String feeLevel, String gprsLevel, String schoolId,
			String voiceLevel, String appTypeId, String discFeeId) {
		return schoolUserDetailMapper.selectAll(statisMonth, actviType, usrType, feeLevel, gprsLevel, schoolId, voiceLevel, appTypeId, discFeeId);
	}

	public void exportExcel(List<SchoolUserDetail> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("校园用户明细信息列表");
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);

			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("校园用户明细信息列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "账期(月)", "地市编码", "地市名称", "区县编码", "区县名称", "学校所在地编码", "学校所在地名称", "学校编码", "学校名称", "用户id ", "当前主套餐编码", "当前主套餐名称", "网龄", "开户日期",
					"用户类型", "性别", "年龄", "是否4G客户", "是否不限量套餐客户 ", "是否v网用户", "是否宽带用户", "是否套餐减免用户", "套餐减免优惠编码", "套餐减免优惠名称", "合约活动类型标识", "合约活动类型", "合约产品编码",
					"合约活动产品名称", "合约活动生效时间", "合约活动到期时间", "当月ARPU", "当月MOU", "当月DOU", "通话次数", "流量分档标识", "流量分档", "通话时长分档标识", "通话时长分档", "收入分档标识", "收入分档",
					"本月折扣折让金额", "终端偏好" };
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
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
					cell11.setCellValue(empList.get(j).getStatisMonth());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getAreaId());
					HSSFCell cell13 = row.createCell(2);
					cell13.setCellValue(empList.get(j).getAreaName());
					HSSFCell cell14 = row.createCell(3);
					cell14.setCellValue(empList.get(j).getCntyId());
					HSSFCell cell15 = row.createCell(4);
					cell15.setCellValue(empList.get(j).getCntyName());
					HSSFCell cell16 = row.createCell(5);
					cell16.setCellValue(empList.get(j).getSchAreaId());
					HSSFCell cell17 = row.createCell(6);
					cell17.setCellValue(empList.get(j).getSchAreaName());
					HSSFCell cell18 = row.createCell(7);
					cell18.setCellValue(empList.get(j).getSchId());
					HSSFCell cell19 = row.createCell(8);
					cell19.setCellValue(empList.get(j).getSchName());
					HSSFCell cell110 = row.createCell(9);
					cell110.setCellValue(empList.get(j).getUsrId());
					/*
					 * HSSFCell cell111= row.createCell(10);
					 * cell111.setCellValue(empList.get(j).getSvcCode());
					 */
					HSSFCell cell111 = row.createCell(10);
					cell111.setCellValue(empList.get(j).getTaocanId());
					HSSFCell cell112 = row.createCell(11);
					cell112.setCellValue(empList.get(j).getTaocanName());
					HSSFCell cell113 = row.createCell(12);
					cell113.setCellValue(empList.get(j).getOnlineMonth());
					HSSFCell cell114 = row.createCell(13);
					cell114.setCellValue(empList.get(j).getOpenDate());
					HSSFCell cell115 = row.createCell(14);
					if ("00".equals(empList.get(j).getUsrType())) {
						cell115.setCellValue("存量");
					} else {
						cell115.setCellValue("新增");
					}
					HSSFCell cell116 = row.createCell(15);
					if ("F".equals(empList.get(j).getSex())) {
						cell116.setCellValue("女");
					} else {
						cell116.setCellValue("男");
					}
					HSSFCell cell117 = row.createCell(16);
					cell117.setCellValue(empList.get(j).getAge());
					HSSFCell cell118 = row.createCell(17);
					if ("0".equals(empList.get(j).getIs4g())) {
						cell118.setCellValue("否");
					} else {
						cell118.setCellValue("是");
					}
					HSSFCell cell119 = row.createCell(18);
					if ("0".equals(empList.get(j).getIsUnlimit())) {
						cell119.setCellValue("否");
					} else {
						cell119.setCellValue("是");
					}
					HSSFCell cell120 = row.createCell(19);
					if ("0".equals(empList.get(j).getIsVnet())) {
						cell120.setCellValue("否");
					} else {
						cell120.setCellValue("是");
					}
					HSSFCell cell121 = row.createCell(20);
					if ("0".equals(empList.get(j).getIsKd())) {
						cell121.setCellValue("否");
					} else {
						cell121.setCellValue("是");
					}
					HSSFCell cell122 = row.createCell(21);
					if ("0".equals(empList.get(j).getIsDiscnt())) {
						cell122.setCellValue("否");
					} else {
						cell122.setCellValue("是");
					}
					HSSFCell cell123 = row.createCell(22);
					cell123.setCellValue(empList.get(j).getDiscntId());
					HSSFCell cell124 = row.createCell(23);
					cell124.setCellValue(empList.get(j).getDiscntName());
					HSSFCell cell125 = row.createCell(24);
					cell125.setCellValue(empList.get(j).getActviTypeId());
					HSSFCell cell126 = row.createCell(25);
					cell126.setCellValue(empList.get(j).getActviType());
					HSSFCell cell127 = row.createCell(26);
					cell127.setCellValue(empList.get(j).getActviProd());
					HSSFCell cell128 = row.createCell(27);
					cell128.setCellValue(empList.get(j).getActviProdName());
					HSSFCell cell129 = row.createCell(28);
					cell129.setCellValue(empList.get(j).getActviEffDate());
					HSSFCell cell130 = row.createCell(29);
					cell130.setCellValue(empList.get(j).getActviExpDate());
					HSSFCell cell31 = row.createCell(30);
					cell31.setCellValue(empList.get(j).getArpu());
					HSSFCell cell32 = row.createCell(31);
					cell32.setCellValue(empList.get(j).getMou());
					HSSFCell cell33 = row.createCell(32);
					cell33.setCellValue(empList.get(j).getDou());
					HSSFCell cell34 = row.createCell(33);
					cell34.setCellValue(empList.get(j).getCallFreq());
					HSSFCell cell35 = row.createCell(34);
					cell35.setCellValue(empList.get(j).getGprsLevelId());
					HSSFCell cell36 = row.createCell(35);
					cell36.setCellValue(empList.get(j).getGprsLevel());
					HSSFCell cell37 = row.createCell(36);
					cell37.setCellValue(empList.get(j).getVoiceLevelId());
					HSSFCell cell38 = row.createCell(37);
					cell38.setCellValue(empList.get(j).getVoiceLevel());
					HSSFCell cell39 = row.createCell(38);
					cell39.setCellValue(empList.get(j).getFeeLevelId());
					HSSFCell cell40 = row.createCell(39);
					cell40.setCellValue(empList.get(j).getFeeLevel());
					HSSFCell cell41 = row.createCell(40);
					cell41.setCellValue(empList.get(j).getFeeDiscnt());
					HSSFCell cell42 = row.createCell(41);
					cell42.setCellValue(empList.get(j).getTermInfo());

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
