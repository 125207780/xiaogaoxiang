package com.bonc.dataVisualization.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.bonc.common.constant.ParamFieldConstant;
import com.bonc.common.utils.JedisClientPool;
import com.bonc.common.utils.JsonUtil;
import com.bonc.dataVisualization.dao.mapper.DataVisualizationMapper2;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class DataVisualizationService2 {

	@Resource
	private DataVisualizationMapper2 mapper;

	@Resource(name = "jedisClientPool")
	private JedisClientPool jedisClientPool;

	@Resource
	private KpiManagerService kpiManagerService;

	public DataVisualizationMapper2 getMapper() {
		return mapper;
	}

	public List<Map<String, Object>> getKpiRatio(int page, int rows, String orgId, String kpiCode, String rangeId, String statisDate) {
		/* SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId); */
		PageHelper.startPage(page, rows);
		/*
		 * String orgCode = ""; if (sysOrg.getOrgLevel().equals("1")) {
		 * 
		 * } else if (sysOrg.getOrgLevel().equals("2")) { orgCode = "AREA_ID"; }
		 * else if (sysOrg.getOrgLevel().equals("3")) { orgCode = "CNTY_ID"; }
		 */
		return this.mapper.getKpiRatio(orgId, kpiCode, rangeId, statisDate);
	}

	/**
	 * 查询网格规模
	 * 
	 * @Title getGridScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getGridScale(String orgId) {
		// 判断是否缓存中存在
		String json = jedisClientPool.hget(ParamFieldConstant.GRID_SCALE, orgId);
		// 判断json是否为空
		if (StringUtils.isNotBlank(json)) {
			// 把json转换成map
			Map<String, Object> mapType = JSON.parseObject(json);
			// 如果存在则直接return
			return mapType;
		}
		// 如果不存在，先查询
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		Map<String, Object> gridScale = this.getMapper().getGridScale(orgId, sysOrg.getOrgLevel());
		// 将查询内容插入缓存
		jedisClientPool.hset(ParamFieldConstant.GRID_SCALE, orgId + "", JsonUtil.objectToJson(gridScale));
		return gridScale;
	}

	/**
	 * 查询渠道规模
	 * 
	 * @Title getChnlScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getChnlScale(String orgId) {

		// 判断是否缓存中存在
		String json = jedisClientPool.hget(ParamFieldConstant.CHNL_SCALE, orgId);
		// 判断json是否为空
		if (StringUtils.isNotBlank(json)) {
			// 把json转换成map
			Map<String, Object> mapType = JSON.parseObject(json);
			// 如果存在则直接return
			return mapType;
		}
		// 如果不存在，先查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		String parentId = "";
		if (sysOrg.getOrgLevel().equals("1")) {
		} else if (sysOrg.getOrgLevel().equals("2")) {
			parentId = "CITY_ID";
		} else if (sysOrg.getOrgLevel().equals("3")) {
			parentId = "AREA_ID";
		} else if (sysOrg.getOrgLevel().equals("4")) {
			parentId = "GRID_CODE";
		}
		Map<String, Object> chnlScale = this.mapper.getChnlScale(orgId, parentId);
		// 将查询内容插入缓存
		jedisClientPool.hset(ParamFieldConstant.CHNL_SCALE, orgId + "", JsonUtil.objectToJson(chnlScale));
		return chnlScale;
	}

	/**
	 * 查询基站规模
	 * 
	 * @Title getStationScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> getStationScale(String orgId) {

		// 判断是否缓存中存在
		String json = jedisClientPool.hget(ParamFieldConstant.STATION_SCALE, orgId);
		// 判断json是否为空
		if (StringUtils.isNotBlank(json)) {
			// 把json转换成map
			List<Map<String, Object>> mapType = JsonUtil.jsonToListMap(json);
			// 如果存在则直接return
			return mapType;
		}
		// 如果不存在，先查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> chnlScale = this.mapper.getStationScale(orgId, sysOrg.getOrgLevel());
		// 将查询内容插入缓存
		jedisClientPool.hset(ParamFieldConstant.STATION_SCALE, orgId + "", JsonUtil.objectToJson(chnlScale));
		return chnlScale;
	}

	/**
	 * 查询语音用户规模
	 * 
	 * @Title getVoiceScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getVoiceScale(String orgId) {

		// 判断是否缓存中存在
		String json = jedisClientPool.hget(ParamFieldConstant.VOICE_SCALE, orgId);
		// 判断json是否为空
		if (StringUtils.isNotBlank(json)) {
			// 把json转换成map
			Map<String, Object> mapType = JSON.parseObject(json);
			// 如果存在则直接return
			return mapType;
		}
		// 如果不存在，先查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		Map<String, Object> voiceScale = this.mapper.getVoiceScale(orgId, sysOrg.getOrgLevel());
		// 将查询内容插入缓存
		jedisClientPool.hset(ParamFieldConstant.VOICE_SCALE, orgId + "", JsonUtil.objectToJson(voiceScale));
		return voiceScale;
	}

	/**
	 * 查询流量用户规模
	 * 
	 * @Title getFlowScale
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	public Map<String, Object> getFlowScale(String orgId) {

		// 判断是否缓存中存在
		String json = jedisClientPool.hget(ParamFieldConstant.FLOW_SCALE, orgId);
		// 判断json是否为空
		if (StringUtils.isNotBlank(json)) {
			// 把json转换成map
			Map<String, Object> mapType = JSON.parseObject(json);
			// 如果存在则直接return
			return mapType;
		}
		// 如果不存在，先查询
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		Map<String, Object> flowScale = this.mapper.getFlowScale(orgId, sysOrg.getOrgLevel());
		// 将查询内容插入缓存
		jedisClientPool.hset(ParamFieldConstant.FLOW_SCALE, orgId + "", JsonUtil.objectToJson(flowScale));
		return flowScale;
	}

	public List<Map<String, Object>> getGridInfoByType(String orgId, String gridTypeId) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.GRID_INFO_BY_TYPE, orgId + gridTypeId);
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> list = this.mapper.getGridInfoByType(orgId, gridTypeId, sysOrg.getOrgLevel());
		// 写入缓存
		jedisClientPool.hset(ParamFieldConstant.GRID_INFO_BY_TYPE, orgId + gridTypeId + "", JsonUtil.objectToJson(list));
		return list;
	}

	public List<Map<String, Object>> getTopScale(String orgId, String scaleType, String smallScaleType) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.TOP_SCALE, orgId + scaleType + smallScaleType);
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		if ("grid".equals(scaleType)) {
			result = this.mapper.getGridTop(orgId, sysOrg.getOrgLevel(), smallScaleType);
		} else if ("chnl".equals(scaleType)) {
			result = this.mapper.getChnlTop(orgId, sysOrg.getOrgLevel(), smallScaleType);
		} else if ("stat".equals(scaleType)) {
			result = this.mapper.getStatTop(orgId, sysOrg.getOrgLevel(), smallScaleType);
		} else if ("voice".equals(scaleType)) {
			result = this.mapper.getVoiceTop(Integer.valueOf(orgId), sysOrg.getOrgLevel(), smallScaleType);
		} else {
			return null;
		}
		// 写入缓存
		jedisClientPool.hset(ParamFieldConstant.TOP_SCALE, orgId + scaleType + smallScaleType + "", JsonUtil.objectToJson(result));
		return result;
	}

	public List<Map<String, Object>> getTableDataByScaleType(int page, int rows, String orgId, String scaleType, String smallScaleType, SysOrg sysOrg) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		PageHelper.startPage(page, rows);
		if ("grid".equals(scaleType)) {
			result = this.mapper.getGridTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("chnl".equals(scaleType)) {
			result = this.mapper.getChnlTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("stat".equals(scaleType)) {
			result = this.mapper.getStatTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		}
		return result;
	}

	public Page<Map<String, Object>> getMapTableInfo(int page, int rows, String orgId, String incomeId, String sidx, String sord) {
		SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
		PageHelper.startPage(page, rows);
		if (sysOrg == null) {
			return this.mapper.getMapTableInfo(orgId, incomeId, "", sidx, sord);
		} else {
			return this.mapper.getMapTableInfo(orgId, incomeId, sysOrg.getOrgLevel(), sidx, sord);
		}
	}

	public List<Map<String, Object>> getTableDataByScaleType1(String orgId, String scaleType, String smallScaleType, SysOrg sysOrg) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.TABLEDATABYSCALETYPE, orgId + scaleType + smallScaleType + sysOrg);
		if (StringUtils.isNotBlank(json)) {
			List<Map<String, Object>> list = JsonUtil.jsonToListMap(json);
			return list;
		}
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		if ("grid".equals(scaleType)) {
			result = this.mapper.getGridTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("chnl".equals(scaleType)) {
			result = this.mapper.getChnlTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		} else if ("stat".equals(scaleType)) {
			result = this.mapper.getStatTableInfo(orgId, smallScaleType, sysOrg.getOrgLevel());
		}
		// 写入
		jedisClientPool.hset(ParamFieldConstant.TABLEDATABYSCALETYPE, orgId + scaleType + smallScaleType + sysOrg + "", JsonUtil.objectToJson(result));
		return result;
	}

	public void exportStationExcel(List<Map<String, Object>> gridScaleList, ServletOutputStream outputStream, String scaleType) {
		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			if ("grid".equals(scaleType)) {
				String[] titles = { "网格名称", "移动渠道数", "联通渠道数", "电信渠道数", "基站数", "乡镇数", "行政村数", "渠道常客数", "基站23G客户数", "基站4G客户数", "集团客户数", "家宽客户数", "网格常驻人口", "收入",
						"同比", "环比", "客户份额", "渠道份额", "4G普及率", "宽带资源利用率", "通话客户数", "不限量套餐渗透率" };
				// 1.1、创建合并单元格对象
				CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
				// 1.2、头标题样式
				HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
				// 设置表头居中
				style1.setAlignment(HorizontalAlignment.CENTER);
				// 1.3、列标题样式
				HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
				// 2、创建工作表
				HSSFSheet sheet = workbook.createSheet("网格信息模板");
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
				cell1.setCellValue("网格信息模板");
				// 3.2、创建列标题行；并且设置列标题
				HSSFRow row2 = sheet.createRow(1);
				HSSFCell cell2 = null;
				for (int i = 0; i < titles.length; i++) {
					cell2 = row2.createCell(i);
					// 加载单元格样式
					cell2.setCellStyle(style2);
					cell2.setCellValue(titles[i]);
				}
				// 4、操作单元格；将基站列表写入excel
				if (gridScaleList != null) {
					HSSFRow row = null;
					HSSFCell cell = null;
					for (int j = 0; j < gridScaleList.size(); j++) {
						row = sheet.createRow(j + 2);
						if (gridScaleList.get(j).get("GRID_NAME") != null) {
							cell = row.createCell(0);
							cell.setCellValue(gridScaleList.get(j).get("GRID_NAME").toString());
						}
						if (gridScaleList.get(j).get("MOBILE_CHNL_NUM") != null) {
							cell = row.createCell(1);
							cell.setCellValue(gridScaleList.get(j).get("MOBILE_CHNL_NUM").toString());
						}
						if (gridScaleList.get(j).get("UNICOM_CHNL_NUM") != null) {
							cell = row.createCell(2);
							cell.setCellValue(gridScaleList.get(j).get("UNICOM_CHNL_NUM").toString());
						}
						if (gridScaleList.get(j).get("TELECOM_CHNL_NUM") != null) {
							cell = row.createCell(3);
							cell.setCellValue(gridScaleList.get(j).get("TELECOM_CHNL_NUM").toString());
						}
						if (gridScaleList.get(j).get("STATION_NUM") != null) {
							cell = row.createCell(4);
							cell.setCellValue(gridScaleList.get(j).get("STATION_NUM").toString());
						}
						if (gridScaleList.get(j).get("TOWN_NUM") != null) {
							cell = row.createCell(5);
							cell.setCellValue(gridScaleList.get(j).get("TOWN_NUM").toString());
						}
						if (gridScaleList.get(j).get("VILLAGE_NUM") != null) {
							cell = row.createCell(6);
							cell.setCellValue(gridScaleList.get(j).get("VILLAGE_NUM").toString());
						}
						if (gridScaleList.get(j).get("CHNL_USER_NUM") != null) {
							cell = row.createCell(7);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_USER_NUM").toString());
						}
						if (gridScaleList.get(j).get("STATION_23G_USER") != null) {
							cell = row.createCell(8);
							cell.setCellValue(gridScaleList.get(j).get("STATION_23G_USER").toString());
						}
						if (gridScaleList.get(j).get("STATION_4G_USER") != null) {
							cell = row.createCell(9);
							cell.setCellValue(gridScaleList.get(j).get("STATION_4G_USER").toString());
						}
						if (gridScaleList.get(j).get("GROUP_NUM") != null) {
							cell = row.createCell(10);
							cell.setCellValue(gridScaleList.get(j).get("GROUP_NUM").toString());
						}
						if (gridScaleList.get(j).get("KD_USER_NUM") != null) {
							cell = row.createCell(11);
							cell.setCellValue(gridScaleList.get(j).get("KD_USER_NUM").toString());
						}
						if (gridScaleList.get(j).get("GRID_RESIDENT_USER") != null) {
							cell = row.createCell(12);
							cell.setCellValue(gridScaleList.get(j).get("GRID_RESIDENT_USER").toString());
						}
						if (gridScaleList.get(j).get("FEE") != null) {
							cell = row.createCell(13);
							cell.setCellValue(gridScaleList.get(j).get("FEE").toString());
						}
						if (gridScaleList.get(j).get("COMPARE_LAST_MONTH") != null) {
							cell = row.createCell(14);
							cell.setCellValue(gridScaleList.get(j).get("COMPARE_LAST_MONTH").toString());
						}
						if (gridScaleList.get(j).get("COMPARE__YSE") != null) {
							cell = row.createCell(15);
							cell.setCellValue(gridScaleList.get(j).get("COMPARE__YSE").toString());
						}
						if (gridScaleList.get(j).get("USER_PER") != null) {
							cell = row.createCell(16);
							cell.setCellValue(gridScaleList.get(j).get("USER_PER").toString());
						}
						if (gridScaleList.get(j).get("CHNL_SHAPE") != null) {
							cell = row.createCell(17);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_SHAPE").toString());
						}
						if (gridScaleList.get(j).get("4G_PER") != null) {
							cell = row.createCell(18);
							cell.setCellValue(gridScaleList.get(j).get("4G_PER").toString());
						}
						if (gridScaleList.get(j).get("KD_PORT_USED_PER") != null) {
							cell = row.createCell(19);
							cell.setCellValue(gridScaleList.get(j).get("KD_PORT_USED_PER").toString());
						}
						if (gridScaleList.get(j).get("VOICE_USER_NUM") != null) {
							cell = row.createCell(20);
							cell.setCellValue(gridScaleList.get(j).get("VOICE_USER_NUM").toString());
						}
						if (gridScaleList.get(j).get("BXL_BRAND_PER") != null) {
							cell = row.createCell(21);
							cell.setCellValue(gridScaleList.get(j).get("BXL_BRAND_PER").toString());
						}
					}
				}
			} else if ("chnl".equals(scaleType)) {
				String[] titles = { "渠道编码", "渠道名称", "一级类型", "二级类型", "渠道星级", "渠道地址", "渠道经理姓名", "渠道经理电话", "终端销量", "新增家庭网", "新增入网即不限量客户数", "新增入网即4G客户数",
				"新和家庭新增量" };
				// 1.1、创建合并单元格对象
				CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
				// 1.2、头标题样式
				HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
				// 设置表头居中
				style1.setAlignment(HorizontalAlignment.CENTER);
				// 1.3、列标题样式
				HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
				// 2、创建工作表
				HSSFSheet sheet = workbook.createSheet("渠道信息模板");
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
				cell1.setCellValue("渠道信息模板");
				// 3.2、创建列标题行；并且设置列标题
				HSSFRow row2 = sheet.createRow(1);
				HSSFCell cell2 = null;
				for (int i = 0; i < titles.length; i++) {
					cell2 = row2.createCell(i);
					// 加载单元格样式
					cell2.setCellStyle(style2);
					cell2.setCellValue(titles[i]);
				}
				// 4、操作单元格；将基站列表写入excel
				if (gridScaleList != null) {
					HSSFRow row = null;
					HSSFCell cell = null;
					for (int j = 0; j < gridScaleList.size(); j++) {
						row = sheet.createRow(j + 2);
						if (gridScaleList.get(j).get("CHNL_CODE") != null) {
							cell = row.createCell(0);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_CODE").toString());
						}
						if (gridScaleList.get(j).get("CHNL_NAME") != null) {
							cell = row.createCell(1);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_NAME").toString());
						}
						if (gridScaleList.get(j).get("CHNL_TYPE_LEVEL1") != null) {
							cell = row.createCell(2);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_TYPE_LEVEL1").toString());
						}
						if (gridScaleList.get(j).get("CHNL_TYPE_LEVEL2") != null) {
							cell = row.createCell(3);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_TYPE_LEVEL2").toString());
						}
						if (gridScaleList.get(j).get("CHNL_STAR") != null) {
							cell = row.createCell(4);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_STAR").toString());
						}
						if (gridScaleList.get(j).get("CHNL_ADDR") != null) {
							cell = row.createCell(5);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_ADDR").toString());
						}
						if (gridScaleList.get(j).get("CHNL_MNGR_NAME") != null) {
							cell = row.createCell(6);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_MNGR_NAME").toString());
						}
						if (gridScaleList.get(j).get("CHNL_MNGR_NUMBER") != null) {
							cell = row.createCell(7);
							cell.setCellValue(gridScaleList.get(j).get("CHNL_MNGR_NUMBER").toString());
						}
						if (gridScaleList.get(j).get("INDEX_01") != null) {
							cell = row.createCell(8);
							cell.setCellValue(gridScaleList.get(j).get("INDEX_01").toString());
						}
						if (gridScaleList.get(j).get("INDEX_02") != null) {
							cell = row.createCell(9);
							cell.setCellValue(gridScaleList.get(j).get("INDEX_02").toString());
						}
						if (gridScaleList.get(j).get("INDEX_03") != null) {
							cell = row.createCell(10);
							cell.setCellValue(gridScaleList.get(j).get("INDEX_03").toString());
						}
						if (gridScaleList.get(j).get("INDEX_04") != null) {
							cell = row.createCell(11);
							cell.setCellValue(gridScaleList.get(j).get("INDEX_04").toString());
						}
						if (gridScaleList.get(j).get("INDEX_05") != null) {
							cell = row.createCell(12);
							cell.setCellValue(gridScaleList.get(j).get("INDEX_05").toString());
						}
					}
				}
			} else if ("stat".equals(scaleType)) {
				String[] titles = { "基站编码", "基站名称", "归属网格", "通话客户数", "人均流量DOU", "新增通话客户数", "人均MOU", "同比", "环比", "总收入", "基站常驻居住地用户数", "基站常驻工作地用户数" };
				// 1.1、创建合并单元格对象
				CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
				// 1.2、头标题样式
				HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
				// 设置表头居中
				style1.setAlignment(HorizontalAlignment.CENTER);
				// 1.3、列标题样式
				HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
				// 2、创建工作表
				HSSFSheet sheet = workbook.createSheet("基站信息模板");
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
				cell1.setCellValue("基站信息模板");
				// 3.2、创建列标题行；并且设置列标题
				HSSFRow row2 = sheet.createRow(1);
				HSSFCell cell2 = null;
				for (int i = 0; i < titles.length; i++) {
					cell2 = row2.createCell(i);
					// 加载单元格样式
					cell2.setCellStyle(style2);
					cell2.setCellValue(titles[i]);
				}
				// 4、操作单元格；将基站列表写入excel
				if (gridScaleList != null) {
					HSSFRow row = null;
					HSSFCell cell = null;
					for (int j = 0; j < gridScaleList.size(); j++) {
						row = sheet.createRow(j + 2);
						if (gridScaleList.get(j).get("STATION_CODE") != null) {
							cell = row.createCell(0);
							cell.setCellValue(gridScaleList.get(j).get("STATION_CODE").toString());
						}
						if (gridScaleList.get(j).get("STATION_NAME") != null) {
							cell = row.createCell(1);
							cell.setCellValue(gridScaleList.get(j).get("STATION_NAME").toString());
						}
						if (gridScaleList.get(j).get("GRID_CODE") != null) {
							cell = row.createCell(2);
							cell.setCellValue(gridScaleList.get(j).get("GRID_CODE").toString());
						}
						if (gridScaleList.get(j).get("VOICE_USER_NUM") != null) {
							cell = row.createCell(3);
							cell.setCellValue(gridScaleList.get(j).get("VOICE_USER_NUM").toString());
						}
						if (gridScaleList.get(j).get("AVG_DOU") != null) {
							cell = row.createCell(4);
							cell.setCellValue(gridScaleList.get(j).get("AVG_DOU").toString());
						}
						if (gridScaleList.get(j).get("NEW_VOICE_USER") != null) {
							cell = row.createCell(5);
							cell.setCellValue(gridScaleList.get(j).get("NEW_VOICE_USER").toString());
						}
						if (gridScaleList.get(j).get("AVG_MOU") != null) {
							cell = row.createCell(6);
							cell.setCellValue(gridScaleList.get(j).get("AVG_MOU").toString());
						}
						if (gridScaleList.get(j).get("COMPARE_LAST") != null) {
							cell = row.createCell(7);
							cell.setCellValue(gridScaleList.get(j).get("COMPARE_LAST").toString());
						}
						if (gridScaleList.get(j).get("COMPARE_YES") != null) {
							cell = row.createCell(8);
							cell.setCellValue(gridScaleList.get(j).get("COMPARE_YES").toString());
						}
						if (gridScaleList.get(j).get("TOTAL_FEE") != null) {
							cell = row.createCell(9);
							cell.setCellValue(gridScaleList.get(j).get("TOTAL_FEE").toString());
						}
						if (gridScaleList.get(j).get("HOME_NUM") != null) {
							cell = row.createCell(10);
							cell.setCellValue(gridScaleList.get(j).get("HOME_NUM").toString());
						}
						if (gridScaleList.get(j).get("WORK_NUM") != null) {
							cell = row.createCell(11);
							cell.setCellValue(gridScaleList.get(j).get("WORK_NUM").toString());
						}
					}
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
	private static HSSFCellStyle createCellStyle(HSSFWorkbook workbook, short fontSize) {
		HSSFCellStyle style = workbook.createCellStyle();
		// 创建字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints(fontSize);
		// 加载字体
		style.setFont(font);
		return style;
	}

	public void exportTableExcel(List<Map<String, Object>> mapTableList, ServletOutputStream outputStream, String incomeId) {
		try {
			HSSFWorkbook workbook = new HSSFWorkbook();
			if (incomeId.equals("chnl")) {
				String[] titles = { "区县编码", "区县名称", "网格编码", "网格名称", "渠道编码", "渠道名称", "收入", "业务量" };
				// 1.1、创建合并单元格对象
				CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
				// 1.2、头标题样式
				HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
				// 设置表头居中
				style1.setAlignment(HorizontalAlignment.CENTER);
				// 1.3、列标题样式
				HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
				// 2、创建工作表
				HSSFSheet sheet = workbook.createSheet("渠道信息模板");
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
				cell1.setCellValue("渠道信息模板");
				// 3.2、创建列标题行；并且设置列标题
				HSSFRow row2 = sheet.createRow(1);
				HSSFCell cell2 = null;
				for (int i = 0; i < titles.length; i++) {
					cell2 = row2.createCell(i);
					// 加载单元格样式
					cell2.setCellStyle(style2);
					cell2.setCellValue(titles[i]);
				}
				// 4、操作单元格；将基站列表写入excel
				if (mapTableList != null) {
					HSSFRow row = null;
					HSSFCell cell = null;
					for (int j = 0; j < mapTableList.size(); j++) {
						row = sheet.createRow(j + 2);
						if (mapTableList.get(j).get("AREA_ID") != null) {
							cell = row.createCell(0);
							cell.setCellValue(mapTableList.get(j).get("AREA_ID").toString());
						}
						if (mapTableList.get(j).get("AREA_NAME") != null) {
							cell = row.createCell(1);
							cell.setCellValue(mapTableList.get(j).get("AREA_NAME").toString());
						}
						if (mapTableList.get(j).get("GRID_CODE") != null) {
							cell = row.createCell(2);
							cell.setCellValue(mapTableList.get(j).get("GRID_CODE").toString());
						}
						if (mapTableList.get(j).get("GRID_NAME") != null) {
							cell = row.createCell(3);
							cell.setCellValue(mapTableList.get(j).get("GRID_NAME").toString());
						}
						if (mapTableList.get(j).get("PHYSICAL_ID") != null) {
							cell = row.createCell(4);
							cell.setCellValue(mapTableList.get(j).get("PHYSICAL_ID").toString());
						}
						if (mapTableList.get(j).get("PHYSICAL_NAME") != null) {
							cell = row.createCell(5);
							cell.setCellValue(mapTableList.get(j).get("PHYSICAL_NAME").toString());
						}
						if (mapTableList.get(j).get("INCOME") != null) {
							cell = row.createCell(6);
							cell.setCellValue(mapTableList.get(j).get("INCOME").toString());
						}
						if (mapTableList.get(j).get("CUSTOMER") != null) {
							cell = row.createCell(7);
							cell.setCellValue(mapTableList.get(j).get("CUSTOMER").toString());
						}
					}
				}

			} else {
				String[] titles = { "区县编码", "区县名称", "网格编码", "网格名称", "基站编码", "基站名称", "收入", "业务量" };
				// 1.1、创建合并单元格对象
				CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
				// 1.2、头标题样式
				HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
				// 设置表头居中
				style1.setAlignment(HorizontalAlignment.CENTER);
				// 1.3、列标题样式
				HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
				// 2、创建工作表
				HSSFSheet sheet = workbook.createSheet("基站信息模板");
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
				cell1.setCellValue("基站信息模板");
				// 3.2、创建列标题行；并且设置列标题
				HSSFRow row2 = sheet.createRow(1);
				HSSFCell cell2 = null;
				for (int i = 0; i < titles.length; i++) {
					cell2 = row2.createCell(i);
					// 加载单元格样式
					cell2.setCellStyle(style2);
					cell2.setCellValue(titles[i]);
				}
				// 4、操作单元格；将基站列表写入excel
				if (mapTableList != null) {
					HSSFRow row = null;
					HSSFCell cell = null;
					for (int j = 0; j < mapTableList.size(); j++) {
						row = sheet.createRow(j + 2);
						if (mapTableList.get(j).get("AREA_ID") != null) {
							cell = row.createCell(0);
							cell.setCellValue(mapTableList.get(j).get("AREA_ID").toString());
						}
						if (mapTableList.get(j).get("AREA_NAME") != null) {
							cell = row.createCell(1);
							cell.setCellValue(mapTableList.get(j).get("AREA_NAME").toString());
						}
						if (mapTableList.get(j).get("GRID_CODE") != null) {
							cell = row.createCell(2);
							cell.setCellValue(mapTableList.get(j).get("GRID_CODE").toString());
						}
						if (mapTableList.get(j).get("GRID_NAME") != null) {
							cell = row.createCell(3);
							cell.setCellValue(mapTableList.get(j).get("GRID_NAME").toString());
						}
						if (mapTableList.get(j).get("PHYSICAL_ID") != null) {
							cell = row.createCell(4);
							cell.setCellValue(mapTableList.get(j).get("PHYSICAL_ID").toString());
						}
						if (mapTableList.get(j).get("PHYSICAL_NAME") != null) {
							cell = row.createCell(5);
							cell.setCellValue(mapTableList.get(j).get("PHYSICAL_NAME").toString());
						}
						if (mapTableList.get(j).get("INCOME") != null) {
							cell = row.createCell(6);
							cell.setCellValue(mapTableList.get(j).get("INCOME").toString());
						}
						if (mapTableList.get(j).get("CUSTOMER") != null) {
							cell = row.createCell(7);
							cell.setCellValue(mapTableList.get(j).get("CUSTOMER").toString());
						}
					}
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
}
