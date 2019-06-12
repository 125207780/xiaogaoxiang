package com.bonc.map.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.map.dao.mapper.FirstPageNewMapper;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class FirstPageNewService {

	@Resource
	private FirstPageNewMapper firstPageNewMapper;

	@Resource
	private KpiManagerService kpiManagerService;

	/**
	 * 根据orgid查询首页网格数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> getGridInfoOverView(String orgId) {
		List<Map<String, Object>> list = firstPageNewMapper.getGridInfoOverView(orgId);
		if (list == null || list.size() == 0) {
			return new HashMap<String, Object>();
		} 
		Map<String, Object> resultMap = this.firstPageNewMapper.getGridInfoOverView(orgId).get(0);
		if (resultMap == null){
			return new HashMap<String, Object>();
		}
		return resultMap;
	}

	/**
	 * 根据orgid查询首页任务资源概况
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @return
	 */
	public Map<String, Object> getTaskInfoOverView(String orgId) {
		// firstPageNewMapper.getTaskInfoOverView(orgId);
		return null;
	}

	/**
	 * 点击左侧网格数据时获取前五名和后无名的数据
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @param scaleType
	 * @param smallScaleType
	 * @return
	 */
	public List<Map<String, Object>> getTopScale(String orgId, String scaleType, String smallScaleType) {
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		if ("grid".equals(scaleType)) {
			result = this.firstPageNewMapper.getGridTop(orgId, sysOrg.getOrgLevel(), smallScaleType);
		} else if ("chnl".equals(scaleType)) {
			result = this.firstPageNewMapper.getChnlTop(orgId, sysOrg.getOrgLevel(), smallScaleType);
		} else if ("stat".equals(scaleType)) {
			result = this.firstPageNewMapper.getStatTop(orgId, sysOrg.getOrgLevel(), smallScaleType);
		} else if ("voice".equals(scaleType)) {
			result = this.firstPageNewMapper.getVoiceTop(Integer.valueOf(orgId), sysOrg.getOrgLevel(), smallScaleType);
		} else if ("staff".equals(scaleType)) {
			result = this.firstPageNewMapper.getStaffTop(orgId, sysOrg.getOrgLevel(), smallScaleType);
		} else if ("chnlLevel1".equals(scaleType)) {
			result = this.firstPageNewMapper.getChnlLevel1Top(orgId, sysOrg.getOrgLevel(), smallScaleType);
		}
		if (result != null && result.size() == 1){
			if (result.get(0) == null){
				return new ArrayList<Map<String, Object>>();
			}
		}
		return result;
	}

	/**
	 * 根据网格类型查询网格数据
	 * 
	 * @author liupeidong
	 * @param page
	 * @param rows
	 * @param orgId
	 * @param scaleType
	 * @param smallScaleType
	 * @return
	 */
	public List<Map<String, Object>> getTableDataByScaleType(int page, int rows, String orgId, String scaleType, String smallScaleType, SysOrg sysOrg) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		if ("grid".equals(scaleType)) {//网格
			result = this.firstPageNewMapper.getGridTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("chnl".equals(scaleType)) {//渠道
			result = this.firstPageNewMapper.getChnlTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("stat".equals(scaleType)) {//基站
			result = this.firstPageNewMapper.getStatTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("staff".equals(scaleType)) {//人员
			result = this.firstPageNewMapper.getStaffTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("chnlLevel1".equals(scaleType)) {//加盟、自有厅
			result = this.firstPageNewMapper.getChnlLevel1TableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		}
		return result;
	}

	public List<Map<String, Object>> getTableDataByScaleType1(String orgId, String scaleType, String smallScaleType, SysOrg sysOrg) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		if ("grid".equals(scaleType)) {
			result = this.firstPageNewMapper.getGridTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("chnl".equals(scaleType)) {
			result = this.firstPageNewMapper.getChnlTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("stat".equals(scaleType)) {
			result = this.firstPageNewMapper.getStatTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("staff".equals(scaleType)) {
			result = this.firstPageNewMapper.getStaffTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("chnlLevel1".equals(scaleType)) {
			result = this.firstPageNewMapper.getChnlLevel1TableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		}
		return result;
	}

	/**
	 * 获取汇总信息指标一类
	 * 
	 * @author liupeidong
	 * @return
	 */
	public List<Map<String, Object>> getBigType() {
		return this.firstPageNewMapper.getBigType();
	}

	/**
	 * 获取汇总信息指标二类
	 * 
	 * @author liupeidong
	 * @return
	 */
	public List<Map<String, Object>> getSmallType(String kpiType) {
		return this.firstPageNewMapper.getSmallType(kpiType);
	}

	/**
	 * 获取考核得分echart
	 * 
	 * @author liupeidong
	 * @param orgId
	 * @return
	 */
	public List<Map<String, Object>> getAssessmentEcharts(String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		String orgLevel = sysOrg.getOrgLevel();
		return this.firstPageNewMapper.getAssessmentEcharts(orgId, orgLevel);
	}

	public void exportStationExcel(List<Map<String, Object>> gridScaleList, ServletOutputStream outputStream, String scaleType, int sheetMaxRowNum) {
		try {
			// 1、创建工作簿
			Workbook workbook = new SXSSFWorkbook();
			if ("grid".equals(scaleType) || "chnl".equals(scaleType) || "stat".equals(scaleType)
					|| "staff".equals(scaleType) || "chnlLevel1".equals(scaleType)) {
				String[] titles = null;
				String[] columns = null;

				String sheetName = "";
				String sheetTitle = "";
				if ("grid".equals(scaleType)) {
					sheetName = "网格信息模板";
					sheetTitle = "网格信息模板";
					titles = FirstPageNewMapper.GRID_DETAIL_TITLES;
					columns = FirstPageNewMapper.GRID_DETAIL_COLUMNS;
				} else if ("chnl".equals(scaleType) || "chnlLevel1".equals(scaleType)) {
					sheetName = "渠道信息模板";
					sheetTitle = "渠道信息模板";
					titles = FirstPageNewMapper.CHNL_DETAIL_TITLES;
					columns = FirstPageNewMapper.CHNL_DETAIL_COLUMNS;
				} else if ("stat".equals(scaleType)) {
					sheetName = "基站信息模板";
					sheetTitle = "基站信息模板";
					titles = FirstPageNewMapper.STAT_DETAIL_TITLES;
					columns = FirstPageNewMapper.STAT_DETAIL_COLUMNS;
				} else if ("staff".equals(scaleType)) {
					sheetName = "人员信息模板";
					sheetTitle = "人员信息模板";
					titles = FirstPageNewMapper.STAFF_DETAIL_TITLES;
					columns = FirstPageNewMapper.STAFF_DETAIL_COLUMNS;
				}
				// 4、操作单元格；将基站列表写入excel
				if (gridScaleList != null) {
					Row row = null;
					Cell cell = null;
					Sheet sheet = null;
					int rowNum = 2;
					int sheetIndex = 0;
					sheet = workbook.createSheet();
					if (gridScaleList.size() > sheetMaxRowNum) {
						workbook.setSheetName(sheetIndex, sheetName + "" + sheetIndex);
					} else {
						workbook.setSheetName(sheetIndex, sheetName);
					}
					sheetIndex++;
					setSheetTop(workbook, sheet, titles, sheetTitle);
					for (int j = 0; j < gridScaleList.size(); j++) {
						if (j > 0 && j % sheetMaxRowNum == 0) {
							sheet = workbook.createSheet();
							workbook.setSheetName(sheetIndex, sheetName + "" + sheetIndex);
							setSheetTop(workbook, sheet, titles, sheetTitle);
							rowNum = 2;
							sheetIndex++;
						}
						row = sheet.createRow(rowNum);
						for (int k = 0; k < columns.length; k++) {
							cell = row.createCell(k);
							if (gridScaleList.get(j) != null && gridScaleList.get(j).get(columns[k]) != null) {
								cell.setCellValue(gridScaleList.get(j).get(columns[k]).toString());
							}
						}
						rowNum++;
					}
				} else {
					Sheet sheet = workbook.createSheet();
					workbook.setSheetName(0, sheetName);
					setSheetTop(workbook, sheet, titles, sheetTitle);
				}
			}
			// 5、输出
			workbook.write(outputStream);
			// 6、关流
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 创建单元格样式
	private static CellStyle createCellStyle(Workbook workbook, short fontSize) {
		CellStyle style = workbook.createCellStyle();
		// 创建字体
		Font font = workbook.createFont();
		font.setFontHeightInPoints(fontSize);
		// 加载字体
		style.setFont(font);
		return style;
	}

	public void setSheetTop(Workbook workbook, Sheet sheet, String[] titles, String sheetTitle) {
		// 1.1、创建合并单元格对象
		CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
		// 1.2、头标题样式
		CellStyle style1 = createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 1.3、列标题样式
		CellStyle style2 = createCellStyle(workbook, (short) 13);
		// 2、创建工作表
		// Sheet sheet = workbook.createSheet();
		// workbook.setSheetName(sheetIndex, sheetName);
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
		cell1.setCellValue(sheetTitle);
		// 3.2、创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);

		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
	}

}
