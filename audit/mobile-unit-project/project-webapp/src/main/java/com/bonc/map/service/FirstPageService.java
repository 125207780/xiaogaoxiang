package com.bonc.map.service;

import java.util.List;
import java.util.Map;

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
import org.springframework.transaction.annotation.Transactional;

import com.bonc.gridinfo.dao.entity.EvaluationKpi;
import com.bonc.map.dao.mapper.FirstPageMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class FirstPageService {

	@Resource
	private FirstPageMapper firstPageMapper;

	public List<Map<String, Object>> getCityKpi(String pid, String typeId) {

		return firstPageMapper.getCityKpi(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiPercent(String pid, String typeId) {

		return firstPageMapper.getCityKpiPercent(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiIncome(String pid, String typeId) {

		return firstPageMapper.getCityKpiIncome(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiAbility(String pid, String typeId) {

		return firstPageMapper.getCityKpiAbility(pid, typeId);
	}

	public List<Map<String, Object>> getLevel(String pid) {

		return firstPageMapper.getLevel(pid);
	}

	public List<Map<String, Object>> getCityKpiCity(String pid, String typeId) {

		return firstPageMapper.getCityKpiCity(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiOrg(String pid, String typeId) {

		return firstPageMapper.getCityKpiOrg(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiGrid(String pid, String typeId) {

		return firstPageMapper.getCityKpiGrid(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiPercentCity(String pid, String typeId) {

		return firstPageMapper.getCityKpiPercentCity(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiPercentOrg(String pid, String typeId) {

		return firstPageMapper.getCityKpiPercentOrg(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiPercentGrid(String pid, String typeId) {

		return firstPageMapper.getCityKpiPercentGrid(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiIncomeCity(String pid, String typeId) {

		return firstPageMapper.getCityKpiIncomeCity(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiIncomeOrg(String pid, String typeId) {

		return firstPageMapper.getCityKpiIncomeOrg(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpiIncomeGrid(String pid, String typeId) {

		return firstPageMapper.getCityKpiIncomeGrid(pid, typeId);
	}

	public List<Map<String, Object>> getCityKpi(String pid) {

		return firstPageMapper.getCityKpi(pid);
	}

	/**
	 * 获取指标分类
	 * 
	 * @Title getTypeList
	 * @Author administration
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getTypeList() {

		return firstPageMapper.getTypeList();
	}

	/**
	 * 获取指标分类 下面的指标名称
	 * 
	 * @Title getKpiList
	 * @Author administration
	 * @param typeId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getKpiList(String typeId) {

		return firstPageMapper.getKpiList(typeId);
	}

	/**
	 * 获取channeltable
	 * 
	 * @Title getChannelTable
	 * @Author administration
	 * @param code
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getChannelTable(String code) {

		return firstPageMapper.getChannelTable(code);
	}

	/**
	 * 获取地图页面的option
	 * 
	 * @Title getMapOptionList
	 * @Author administration
	 * @param loginId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getMapOptionList(String loginId) {

		return firstPageMapper.getMapOptionList(loginId);
	}

	public List<Map<String, Object>> getMapOptionChannelList(String loginId) {

		return firstPageMapper.getMapOptionChannelList(loginId);
	}

	public List<Map<String, Object>> getMapSignNameByCode(String chnlCode) {

		return firstPageMapper.getMapSignNameByCode(chnlCode);
	}

	/**
	 * 获取地图页面的table
	 * 
	 * @Title getMapTableList
	 * @Author administration
	 * @param signingId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getMapTableList(String signingId) {

		return firstPageMapper.getMapTableList(signingId);
	}

	/**
	 * 获取地图页面的textarea
	 * 
	 * @Title getMapTextArea
	 * @Author administration
	 * @param signingId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getMapTextArea(String signingId) {

		return firstPageMapper.getMapTextArea(signingId);
	}

	/**
	 * update各类数据
	 * 
	 * @Title updateStatus
	 * @Author administration
	 * @param signingId
	 * @return int
	 */
	public int updateStatus(String signingId) {

		return firstPageMapper.updateStatus(signingId);
	}

	/**
	 * update各类数据
	 * 
	 * @Title updateStatusPhysical
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int updateStatusPhysical(Map<String, Object> params) {

		return firstPageMapper.updateStatusPhysical(params);
	}

	/**
	 * update各类数据
	 * 
	 * @Title updateStatusPhysicalReturn
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int updateStatusPhysicalReturn(Map<String, Object> params) {

		return firstPageMapper.updateStatusPhysicalReturn(params);
	}

	/**
	 * update各类数据
	 * 
	 * @Title updateStatusArea
	 * @Author administration
	 * @param signingId
	 * @return int
	 */
	public int updateStatusArea(String signingId) {

		return firstPageMapper.updateStatusArea(signingId);
	}

	/**
	 * update全部不选
	 * 
	 * @Title updateStatusReturnAll
	 * @Author administration
	 * @param signingId
	 * @return int
	 */
	public int updateStatusReturnAll(String signingId) {

		return firstPageMapper.updateStatusReturnAll(signingId);
	}

	/**
	 * 批量删除
	 * 
	 * @Title getDeleteTable
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int getDeleteTable(Map<String, Object> params) {

		return firstPageMapper.getDeleteTable(params);
	}

	/**
	 * 批量删除
	 * 
	 * @Title getManagerUpdateTable
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int getManagerUpdateTable(Map<String, Object> params) {

		return firstPageMapper.getManagerUpdateTable(params);
	}

	/**
	 * 批量删除
	 * 
	 * @Title getMapChannelName
	 * @Author administration
	 * @param signingId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getMapChannelName(String signingId) {

		return firstPageMapper.getMapChannelName(signingId);
	}

	/**
	 * 批量删除
	 * 
	 * @Title getManagerRejectTable
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int getManagerRejectTable(Map<String, Object> params) {

		return firstPageMapper.getManagerRejectTable(params);
	}

	/**
	 * 批量删除
	 * 
	 * @Title getManagerBlur
	 * @Author administration
	 * @param orgId
	 * @param KPI_ID
	 * @param val
	 * @return int
	 */
	public int getManagerBlur(String orgId, String KPI_ID, String val) {

		return firstPageMapper.getManagerBlur(orgId, KPI_ID, val);
	}

	/**
	 * manager 更新单个目标值
	 * 
	 * @Title getManagerUpdateValTable
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int getManagerUpdateValTable(Map<String, Object> params) {

		return firstPageMapper.getManagerUpdateValTable(params);
	}

	/**
	 * manager 更新单个目标值
	 * 
	 * @Title saveSupplyName
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int saveSupplyName(Map<String, Object> params) {

		return firstPageMapper.saveSupplyName(params);
	}

	/**
	 * 批量更新
	 * 
	 * @Title getOnlyUpdate
	 * @Author administration
	 * @param params
	 * @return int
	 */
	public int getOnlyUpdate(Map<String, Object> params) {

		return firstPageMapper.getOnlyUpdate(params);
	}

	/**
	 * 删除提醒
	 * 
	 * @Title deleteData
	 * @Author administration
	 * @param orgId
	 * @return int
	 */
	public int deleteData(String orgId) {

		return firstPageMapper.deleteData(orgId);
	}

	/**
	 * update全部不选
	 * 
	 * @Title updateStatusPhysicalReturnAll
	 * @Author administration
	 * @param signingId
	 * @return int
	 */
	public int updateStatusPhysicalReturnAll(String signingId) {

		return firstPageMapper.updateStatusPhysicalReturnAll(signingId);
	}

	/**
	 * update全部不选
	 * 
	 * @Title updateStatusAreaReturnAll
	 * @Author administration
	 * @param signingId
	 * @return int
	 */
	public int updateStatusAreaReturnAll(String signingId) {

		return firstPageMapper.updateStatusAreaReturnAll(signingId);
	}

	/**
	 * update全部不选
	 * 
	 * @Title getTest
	 * @Author administration
	 * @param dat
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getTest(String dat) {

		return firstPageMapper.getTest(dat);
	}

	/**
	 * 获取地图页面的table
	 * 
	 * @Title getindexEnryTable
	 * @Author administration
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getindexEnryTable(String orgId) {

		return firstPageMapper.getindexEnryTable(orgId);
	}

	/**
	 * update各类数据
	 * 
	 * @Title getOptionName
	 * @Author administration
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getOptionName(String orgId) {

		return firstPageMapper.getOptionName(orgId);
	}

	/**
	 * getSupplyOptionName
	 * 
	 * @Title getSupplyOptionName
	 * @Author administration
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getSupplyOptionName(String orgId) {

		return firstPageMapper.getSupplyOptionName(orgId);
	}

	/**
	 * getSupplyOptionName
	 * 
	 * @Title getRemindName
	 * @Author administration
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getRemindName(String orgId) {

		return firstPageMapper.getRemindName(orgId);
	}

	/**
	 * getSupplyOptionName
	 * 
	 * @Title saveImportData
	 * @Author administration
	 * @param list
	 *            void
	 */
	public void saveImportData(List<EvaluationKpi> list) {
		for (int i = 0; i < list.size(); i++) {
			try {
				 firstPageMapper.saveImportData(list.get(i));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public List<Map<String, Object>> getCheckData(String orgId) {

		return firstPageMapper.getCheckData(orgId);
	}

	public int checkKpiCode(String kpiCode) {

		return firstPageMapper.checkKpiCode(kpiCode);
	}

	/**
	 * 获取地图页面的table
	 * 
	 * @Title getReloadTable
	 * @Author administration
	 * @param orgId
	 * @param date
	 * @param name
	 * @param status
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getReloadTable(String orgId, String date, String name, String status) {

		return firstPageMapper.getReloadTable(orgId, date, name, status);
	}

	/**
	 * table的更新
	 * 
	 * @Title getUpdateTable
	 * @Author administration
	 * @param orgId
	 * @param KPI_ID
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getUpdateTable(String orgId, String KPI_ID) {

		return firstPageMapper.getUpdateTable(orgId, KPI_ID);
	}

	/**
	 * 获取地图页面的table
	 * 
	 * @Title getManagerTable
	 * @Author administration
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getManagerTable(String orgId) {

		return firstPageMapper.getManagerTable(orgId);
	}

	/**
	 * 获取地图页面的table
	 * 
	 * @Title getSearchManagerTable
	 * @Author administration
	 * @param orgId
	 * @param date
	 * @param name
	 * @param status
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getSearchManagerTable(String orgId, String date, String name, String status) {

		return firstPageMapper.getSearchManagerTable(orgId, date, name, status);
	}

	public void exportExcel(List<EvaluationKpi> empList, ServletOutputStream outputStream) {
		try {
			String[] titles = { "指标类型", "指标名称", "指标权重", "指标定义", "数据周期(年、月、季度)", "指标编码" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("指标模板");
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
			cell1.setCellValue("指标模板");

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
					cell11.setCellValue(empList.get(j).getKpiType());
					HSSFCell cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getKpiName());
					HSSFCell cell13 = row.createCell(2);
					cell13.setCellValue(empList.get(j).getKpiWeight());
					HSSFCell cell14 = row.createCell(3);
					cell14.setCellValue(empList.get(j).getKpiDefine());
					HSSFCell cell15 = row.createCell(4);
					if ("year".equals(empList.get(j).getCycleType())) {
						cell15.setCellValue("年");
					}
					if ("month".equals(empList.get(j).getCycleType())) {
						cell15.setCellValue("月");
					}
					if ("quarter".equals(empList.get(j).getCycleType())) {
						cell15.setCellValue("季度");
					}
					HSSFCell cell16 = row.createCell(5);
					cell16.setCellValue(empList.get(j).getKpiCode());

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
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
