package com.bonc.export;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.bonc.common.annotation.Excel;
import com.bonc.common.reflection.ConfReflection;
import com.bonc.datamodel.dao.entity.DataModelDtl;
import com.bonc.export.bean.ExportConf;
import com.bonc.system.dao.entity.SysUser;

public abstract class ExcelExportUtil {
	/**
	 * 
	 * @param title
	 *            Sheet名字
	 * @param pojoClass
	 *            Excel对象Class
	 * @param dataSet
	 *            Excel对象数据List
	 * @param out
	 *            输出流
	 */
	public static void exportExcel(String title, Class<?> pojoClass, Collection<?> dataSet, OutputStream out) throws Exception {
		// 使用userModel模式实现的，当excel文档出现10万级别的大数据文件可能导致OOM内存溢出
		exportExcelInUserModel(title, pojoClass, dataSet, out);
		// 使用eventModel实现，可以一边读一边处理，效率较高，但是实现复杂，暂时未实现
	}

	private static void exportExcelInUserModel(String title, Class<?> pojoClass, Collection<?> dataSet, OutputStream out) throws Exception {
		// 首先检查数据看是否是正确的
		if (dataSet == null || dataSet.size() == 0) {
			throw new Exception("导出数据为空！");
		}
		if (title == null || out == null || pojoClass == null) {
			throw new Exception("传入参数不能为空！");
		}
		// 声明一个工作薄
		@SuppressWarnings("resource")
		Workbook workbook = new HSSFWorkbook();
		// 生成一个表格
		Sheet sheet = workbook.createSheet(title);

		// 标题
		List<String> exportFieldTitle = new ArrayList<String>();
		List<Integer> exportFieldWidth = new ArrayList<Integer>();
		// 拿到所有列名，以及导出的字段的get方法
		List<Method> methodObj = new ArrayList<Method>();
		Map<String, Method> convertMethod = new HashMap<String, Method>();
		// 得到所有字段
		Field fileds[] = pojoClass.getDeclaredFields();
		// 遍历整个fileld
		for (int i = 0; i < fileds.length; i++) {
			Field field = fileds[i];
			Excel excel = field.getAnnotation(Excel.class);
			// 如果设置了annottion
			if (excel != null) {
				// 添加到标题
				exportFieldTitle.add(excel.exportName());
				// 添加标题的列宽
				exportFieldWidth.add(excel.exportFieldWidth());
				// 添加到需要导出的字段的方法
				String fieldname = field.getName();
				// System.out.println(i+"列宽"+excel.exportName()+"
				// "+excel.exportFieldWidth());
				StringBuffer getMethodName = new StringBuffer("get");
				getMethodName.append(fieldname.substring(0, 1).toUpperCase());
				getMethodName.append(fieldname.substring(1));

				Method getMethod = pojoClass.getMethod(getMethodName.toString(), new Class[] {});

				methodObj.add(getMethod);
				if (excel.exportConvertSign()) {
					StringBuffer getConvertMethodName = new StringBuffer("get");
					getConvertMethodName.append(fieldname.substring(0, 1).toUpperCase());
					getConvertMethodName.append(fieldname.substring(1));
					getConvertMethodName.append("Convert");
					// System.out.println("convert:
					// "+getConvertMethodName.toString());
					Method getConvertMethod = pojoClass.getMethod(getConvertMethodName.toString(), new Class[] {});
					convertMethod.put(getMethodName.toString(), getConvertMethod);
				}
			}
		}
		int index = 0;
		// 产生表格标题行
		Row row = sheet.createRow(index);
		for (int i = 0, exportFieldTitleSize = exportFieldTitle.size(); i < exportFieldTitleSize; i++) {
			Cell cell = row.createCell(i);
			// cell.setCellStyle(style);
			RichTextString text = new HSSFRichTextString(exportFieldTitle.get(i));
			cell.setCellValue(text);
		}

		// 设置每行的列宽
		for (int i = 0; i < exportFieldWidth.size(); i++) {
			// 256=65280/255
			sheet.setColumnWidth(i, 256 * exportFieldWidth.get(i));
		}
		Iterator<?> its = dataSet.iterator();
		// 循环插入剩下的集合
		while (its.hasNext()) {
			// 从第二行开始写，第一行是标题
			index++;
			row = sheet.createRow(index);
			Object t = its.next();
			for (int k = 0, methodObjSize = methodObj.size(); k < methodObjSize; k++) {
				Cell cell = row.createCell(k);
				Method getMethod = methodObj.get(k);
				Object value = null;
				if (convertMethod.containsKey(getMethod.getName())) {
					Method cm = convertMethod.get(getMethod.getName());
					value = cm.invoke(t, new Object[] {});
				} else {
					value = getMethod.invoke(t, new Object[] {});
				}
				cell.setCellValue(value == null ? "" : value.toString());
			}
		}

		workbook.write(out);

	}

	public static void buildExcel(Sheet sheet, Class<?> pojoClass, Collection<?> dataSet) throws Exception {
		buildExcel(sheet, pojoClass, null, null, dataSet, 0, 0);
	}

	public static void buildExcel(Sheet sheet, Class<?> pojoClass, Collection<?> dataSet, int startx, int starty) throws Exception {
		buildExcel(sheet, pojoClass, null, null, dataSet, startx, starty);
	}

	public static void buildExcel(Sheet sheet, String tableName, Collection<?> dataSet) throws Exception {
		buildExcel(sheet, null, tableName, null, dataSet, 0, 0);
	}

	public static void buildExcel(Sheet sheet, String tableName, Collection<?> dataSet, int startx, int starty) throws Exception {
		buildExcel(sheet, null, tableName, null, dataSet, startx, starty);
	}

	public static void buildExcel(Sheet sheet, ExportConf exportConf, Collection<?> dataSet) throws Exception {
		buildExcel(sheet, null, null, exportConf, dataSet, 0, 0);
	}

	public static void buildExcel(Sheet sheet, ExportConf exportConf, Collection<?> dataSet, int startx, int starty) throws Exception {
		buildExcel(sheet, null, null, exportConf, dataSet, startx, starty);
	}

	/**
	 * 
	 * @param title
	 *            Sheet名字
	 * @param pojoClass
	 *            Excel对象Class
	 * @param dataSet
	 *            Excel对象数据List
	 * @param out
	 *            输出流
	 */
	public static void buildExcel(Sheet sheet, Class<?> pojoClass, String tableName, ExportConf exportConf, Collection<?> dataSet, int startx, int starty)
			throws Exception {
		// 使用userModel模式实现的，当excel文档出现10万级别的大数据文件可能导致OOM内存溢出
		if (pojoClass != null) {
			buildExcelInUserModel2File(sheet, pojoClass, dataSet, startx, starty);
		} else if (tableName != null) {
			buildExcelInUserModel2File(sheet, tableName, dataSet, startx, starty);
		} else if (exportConf != null) {
			buildExcelInUserModel2File(sheet, exportConf, dataSet, startx, starty);
		}
	}

	/**
	 * 
	 * @param title
	 *            Sheet名字
	 * @param pojoClass
	 *            Excel对象Class
	 * @param dataSet
	 *            Excel对象数据List
	 * @param startx
	 *            基本excel表格x轴起始坐标
	 * @param starty
	 *            基本excel表格y轴起始坐标
	 */
	public static void exportExcel(Sheet sheet, Class<?> pojoClass, String tableName, Collection<?> dataSet, int startx, int starty) throws Exception {
		// 使用userModel模式实现的，当excel文档出现10万级别的大数据文件可能导致OOM内存溢出
		buildExcelInUserModel2File(sheet, pojoClass, dataSet, startx, starty);
	}

	// 动态报表动态生成exle数据
	public static HSSFWorkbook exportReportExcel(String title, Class<?> pojoClass, Collection<?> dataSet, String newReport) throws Exception {
		// 使用userModel模式实现的，当excel文档出现10万级别的大数据文件可能导致OOM内存溢出
		return exportReportExcelInUserModel2File(title, pojoClass, dataSet, newReport);
	}

	public static Map<String, String> getFieldValueNameMap(Class<?> cls) {

		Map<String, String> valueMap = new HashMap<String, String>();
		// 得到所有字段
		Field fileds[] = cls.getDeclaredFields();
		// 遍历整个filed
		for (int i = 0; i < fileds.length; i++) {
			Field field = fileds[i];
			Excel excel = field.getAnnotation(Excel.class);
			if (excel != null) {
				valueMap.put(field.getName(), excel.exportName());
			}
		}
		return valueMap;
	}

	private static void buildExcelInUserModel2File(Sheet sheet, Class<?> pojoClass, Collection<?> dataSet, int startx, int starty) throws Exception {
		// 设置样式
		// 设置表配置
		// 设置表数据
		// 设置边框
		DefaultStyle styles = new DefaultStyle(sheet.getWorkbook());
		// CellStyle captionStyle =
		// styles.getCellStyleForCaption().getDefaultCaptionStyle();
		CellStyle titleStyle = styles.getCellStyleForTitle().getDefaultTitleStyle();
		CellStyle dataStyle = styles.getCellStyleForData().getDefaultDataStyle();

		// 标题
		List<String> exportFieldTitle = new ArrayList<String>();
		List<Integer> exportFieldWidth = new ArrayList<Integer>();
		// 拿到所有列名，以及导出的字段的get方法
		List<Method> methodObj = new ArrayList<Method>();
		// Map<String, Method> valueConvertMethod = new HashMap<String,
		// Method>();
		// Map<String, Method> dateConvertMethod = new HashMap<String,
		// Method>();
		// Map<String, Method> feeConvertMethod = new HashMap<String, Method>();
		// Map<Method, List<String>> methodandParams = new HashMap<Method,
		// List<String>>();
		// 得到所有字段
		Field fileds[] = pojoClass.getDeclaredFields();
		// 遍历整个filed
		for (int i = 0; i < fileds.length; i++) {
			Field field = fileds[i];
			Excel excel = field.getAnnotation(Excel.class);
			// 如果设置了annottion
			if (excel != null) {
				// 添加到标题
				exportFieldTitle.add(excel.exportName());
				// 添加标题的列宽
				exportFieldWidth.add(excel.exportFieldWidth());
				// 添加到需要导出的字段的方法
				String fieldname = field.getName();
				// System.out.println(i+"列宽"+excel.exportName()+"
				// "+excel.exportFieldWidth());
				StringBuffer getMethodName = new StringBuffer("get");
				getMethodName.append(fieldname.substring(0, 1).toUpperCase());
				getMethodName.append(fieldname.substring(1));

				Method getMethod = pojoClass.getMethod(getMethodName.toString(), new Class[] {});

				methodObj.add(getMethod);
				// if (excel.exportConvertSign()) {
				// StringBuffer valueConvertMethodName = new StringBuffer();
				// valueConvertMethodName.append(fieldname);
				// valueConvertMethodName.append("toValue");
				// // System.out.println("convert:
				// "+getConvertMethodName.toString());
				// Method toValueConvertMethod =
				// pojoClass.getMethod(valueConvertMethodName.toString(), new
				// Class[] {});
				// valueConvertMethod.put(getMethodName.toString(),
				// toValueConvertMethod);
				// }
				// if (!StringUtils.isEmpty(excel.dateFormat())) {
				// StringBuffer dateConvertMethodName = new StringBuffer();
				// dateConvertMethodName.append(fieldname);
				// dateConvertMethodName.append("toDate");
				// Method toDateConvertMethod =
				// pojoClass.getMethod(dateConvertMethodName.toString(), new
				// Class[] {String.class});
				// dateConvertMethod.put(getMethodName.toString(),
				// toDateConvertMethod);
				// methodandParams.put(toDateConvertMethod,
				// Arrays.asList(excel.dateFormat()));
				// }
				// if (!StringUtils.isEmpty(excel.feeFormat())) {
				// StringBuffer feeConvertMethodName = new StringBuffer();
				// feeConvertMethodName.append(fieldname);
				// feeConvertMethodName.append("toFee");
				// Method toFeeConvertMethod =
				// pojoClass.getMethod(feeConvertMethodName.toString(), new
				// Class[] {String.class});
				// feeConvertMethod.put(getMethodName.toString(),
				// toFeeConvertMethod);
				// methodandParams.put(toFeeConvertMethod,
				// Arrays.asList(excel.feeFormat()));
				// }
			}
		}
		int index = starty;
		int colNum = 0;
		int dataNum = 0;
		// 产生表格caption
		// Row row = sheet.createRow(index);
		// Cell cCell = row.createCell(startx);
		// cCell.setCellStyle(captionStyle);
		// cCell.setCellValue(tableName);
		// index++;
		// 产生表格标题行
		Row row = sheet.createRow(index);
		for (int i = 0, exportFieldTitleSize = exportFieldTitle.size(); i < exportFieldTitleSize; i++) {
			Cell cell = row.createCell(startx + i);
			cell.setCellStyle(titleStyle);
			RichTextString text = new HSSFRichTextString(exportFieldTitle.get(i));
			if (cell.getClass() == XSSFCell.class) {
				text = new XSSFRichTextString(exportFieldTitle.get(i));
			}
			cell.setCellValue(text);
		}
		colNum = startx + exportFieldTitle.size() + 1;

		// 设置每行的列宽
		for (int i = 0; i < exportFieldWidth.size(); i++) {
			sheet.setColumnWidth(i, exportFieldWidth.get(i));
		}
		if (dataSet != null) {
			dataNum = starty + dataSet.size() + 1;
			Iterator<?> its = dataSet.iterator();
			// 循环插入剩下的集合
			while (its.hasNext()) {
				// 从第二行开始写，第一行是标题
				index++;
				row = sheet.createRow(index);
				Object t = its.next();
				for (int k = 0, methodObjSize = methodObj.size(); k < methodObjSize; k++) {
					Cell cell = row.createCell(startx + k);
					cell.setCellStyle(dataStyle);
					Method getMethod = methodObj.get(k);
					Object value = null;
					// if (valueConvertMethod.containsKey(getMethod.getName()))
					// {
					// Method cm = valueConvertMethod.get(getMethod.getName());
					// value = cm.invoke(t, new Object[] {});
					// } else if
					// (dateConvertMethod.containsKey(getMethod.getName())) {
					// Method cm = dateConvertMethod.get(getMethod.getName());
					// value = cm.invoke(t, methodandParams.get(cm).toArray());
					// } else {
					// }
					value = getMethod.invoke(t, new Object[] {});
					cell.setCellValue(value == null ? "" : value.toString());
				}
			}
		}
		pictureWaterMark(sheet, colNum, dataNum);
	}

	private static void buildExcelInUserModel2File(Sheet sheet, String tableName, Collection<?> dataSet, int startx, int starty) throws Exception {
		// 设置样式
		// 设置表配置
		// 设置表数据
		// 设置边框
		DefaultStyle styles = new DefaultStyle(sheet.getWorkbook());
		CellStyle titleStyle = styles.getCellStyleForTitle().getDefaultTitleStyle();
		CellStyle dataStyle = styles.getCellStyleForData().getDefaultDataStyle();

		// 标题
		List<String> exportFieldTitle = new ArrayList<String>();
		List<String> exportFieldName = new ArrayList<String>();
		List<Integer> exportFieldWidth = new ArrayList<Integer>();
		// 得到所有字段
		List<DataModelDtl> dmdList = ConfReflection.getDataModelDtlList(tableName);
		for (DataModelDtl dataModelDtl : dmdList) {
			if (StringUtils.equals(dataModelDtl.getShowFlag(), "1")) {
				exportFieldTitle.add(dataModelDtl.getModelChineseName());
				exportFieldWidth.add(dataModelDtl.getColumnWidth());
				exportFieldName.add(dataModelDtl.getModelEnglishName());
			}
		}
		int index = starty;
		int colNum = 0;
		int dataNum = 0;
		// 产生表格标题行
		Row row = sheet.createRow(index);
		for (int i = 0, exportFieldTitleSize = exportFieldTitle.size(); i < exportFieldTitleSize; i++) {
			Cell cell = row.createCell(startx + i);
			cell.setCellStyle(titleStyle);
			RichTextString text = new HSSFRichTextString(exportFieldTitle.get(i));
			if (cell.getClass() == XSSFCell.class) {
				text = new XSSFRichTextString(exportFieldTitle.get(i));
			}
			cell.setCellValue(text);
		}
		colNum = startx + exportFieldTitle.size() + 1;

		// 设置每行的列宽
		for (int i = 0; i < exportFieldWidth.size(); i++) {
			sheet.setColumnWidth(i, exportFieldWidth.get(i));
		}
		if (dataSet != null) {
			dataNum = starty + dataSet.size() + 1;
			Iterator<?> its = dataSet.iterator();
			// 循环插入剩下的集合
			while (its.hasNext()) {
				// 从第二行开始写，第一行是标题
				index++;
				row = sheet.createRow(index);
				@SuppressWarnings("unchecked")
				Map<String, Object> t = (Map<String, Object>) its.next();
				for (int k = 0, exportFieldNameSize = exportFieldName.size(); k < exportFieldNameSize; k++) {
					Cell cell = row.createCell(startx + k);
					cell.setCellStyle(dataStyle);
					String value = t.get(exportFieldName.get(k)) == null ? "" : t.get(exportFieldName.get(k)).toString();
					cell.setCellValue(value);
				}
			}
		}
		pictureWaterMark(sheet, colNum, dataNum);
	}

	private static void buildExcelInUserModel2File(Sheet sheet, ExportConf exportConf, Collection<?> dataSet, int startx, int starty) throws Exception {
		// 设置样式
		// 设置表配置
		// 设置表数据
		// 设置边框
		DefaultStyle styles = new DefaultStyle(sheet.getWorkbook());
		CellStyle titleStyle = styles.getCellStyleForTitle().getDefaultTitleStyle();
		CellStyle dataStyle = styles.getCellStyleForData().getDefaultDataStyle();

		// 得到所有字段
		List<String> exportFieldTitle = exportConf.getTitles();
		List<String> exportFieldName = exportConf.getNames();
		List<Integer> exportFieldWidth = exportConf.getWidths();
		int index = starty;
		int colNum = 0;
		int dataNum = 0;
		// 产生表格标题行
		Row row = sheet.createRow(index);
		for (int i = 0, exportFieldTitleSize = exportFieldTitle.size(); i < exportFieldTitleSize; i++) {
			Cell cell = row.createCell(startx + i);
			cell.setCellStyle(titleStyle);
			RichTextString text = new HSSFRichTextString(exportFieldTitle.get(i));
			if (cell.getClass() == XSSFCell.class) {
				text = new XSSFRichTextString(exportFieldTitle.get(i));
			}
			cell.setCellValue(text);
		}
		colNum = startx + exportFieldTitle.size() + 1;

		// 设置每行的列宽
		for (int i = 0; i < exportFieldWidth.size(); i++) {
			sheet.setColumnWidth(i, exportFieldWidth.get(i));
		}
		if (dataSet != null) {
			dataNum = starty + dataSet.size() + 1;
			Iterator<?> its = dataSet.iterator();
			// 循环插入剩下的集合
			while (its.hasNext()) {
				// 从第二行开始写，第一行是标题
				index++;
				row = sheet.createRow(index);
				@SuppressWarnings("unchecked")
				Map<String, Object> t = (Map<String, Object>) its.next();
				for (int k = 0, exportFieldNameSize = exportFieldName.size(); k < exportFieldNameSize; k++) {
					Cell cell = row.createCell(startx + k);
					cell.setCellStyle(dataStyle);
					String value = t.get(exportFieldName.get(k)) == null ? "" : t.get(exportFieldName.get(k)).toString();
					cell.setCellValue(value);
				}
			}
		}
		pictureWaterMark(sheet, colNum, dataNum);
	}

	// 动态报表动态生成exle数据
	private static HSSFWorkbook exportReportExcelInUserModel2File(String title, Class<?> pojoClass, Collection<?> dataSet, String newReport) throws Exception {
		// 声明一个工作薄
		HSSFWorkbook workbook = null;
		// 首先检查数据看是否是正确的
		// if (dataSet == null || dataSet.size() == 0) {
		// throw new Exception("导出数据为空！");
		// }
		// if (title == null || pojoClass == null) {
		// throw new Exception("传入参数不能为空！");
		// }
		// 声明一个工作薄
		workbook = new HSSFWorkbook();
		// 生成一个表格
		Sheet sheet = workbook.createSheet(title);

		// 设置边框
		HSSFCellStyle style = workbook.createCellStyle();
		// style.setBorderBottom(CellStyle.BORDER_THIN);
		// style.setBorderLeft(CellStyle.BORDER_THIN);
		// style.setBorderRight(CellStyle.BORDER_THIN);
		// style.setBorderTop(CellStyle.BORDER_THIN);

		// 标题
		List<String> exportFieldTitle = new ArrayList<String>();
		List<Integer> exportFieldWidth = new ArrayList<Integer>();
		// 拿到所有列名，以及导出的字段的get方法
		List<Method> methodObj = new ArrayList<Method>();
		Map<String, Method> convertMethod = new HashMap<String, Method>();
		// 得到所有字段
		Field fileds[] = pojoClass.getDeclaredFields();
		// 遍历整个filed
		for (int i = 0; i < fileds.length; i++) {
			// 动态生成的列名称与之对比，匹配成功后的列名作为导出数据
			String[] bbb = newReport.split(",");
			Field field = fileds[i];
			for (int j = 0; j < bbb.length; j++) {
				if (field.getName().equals(bbb[j])) {
					Excel excel = field.getAnnotation(Excel.class);
					// 如果设置了annottion
					if (excel != null) {
						// 添加到标题
						exportFieldTitle.add(excel.exportName());
						// 添加标题的列宽
						exportFieldWidth.add(excel.exportFieldWidth());
						// 添加到需要导出的字段的方法
						String fieldname = field.getName();
						// System.out.println(i+"列宽"+excel.exportName()+"
						// "+excel.exportFieldWidth());
						StringBuffer getMethodName = new StringBuffer("get");
						getMethodName.append(fieldname.substring(0, 1).toUpperCase());
						getMethodName.append(fieldname.substring(1));

						Method getMethod = pojoClass.getMethod(getMethodName.toString(), new Class[] {});

						methodObj.add(getMethod);
						if (excel.exportConvertSign()) {
							StringBuffer getConvertMethodName = new StringBuffer("get");
							getConvertMethodName.append(fieldname.substring(0, 1).toUpperCase());
							getConvertMethodName.append(fieldname.substring(1));
							getConvertMethodName.append("Convert");
							// System.out.println("convert:
							// "+getConvertMethodName.toString());
							Method getConvertMethod = pojoClass.getMethod(getConvertMethodName.toString(), new Class[] {});
							convertMethod.put(getMethodName.toString(), getConvertMethod);
						}
					}
				}
			}
		}
		int index = 0;
		// 产生表格标题行
		Row row = sheet.createRow(index);
		for (int i = 0, exportFieldTitleSize = exportFieldTitle.size(); i < exportFieldTitleSize; i++) {
			Cell cell = row.createCell(i);
			cell.setCellStyle(style);
			RichTextString text = new HSSFRichTextString(exportFieldTitle.get(i));
			cell.setCellValue(text);
		}

		// 设置每行的列宽
		for (int i = 0; i < exportFieldWidth.size(); i++) {
			// 256=65280/255
			sheet.setColumnWidth(i, 256 * exportFieldWidth.get(i));
		}
		if (dataSet != null) {
			Iterator<?> its = dataSet.iterator();
			// 循环插入剩下的集合
			while (its.hasNext()) {
				// 从第二行开始写，第一行是标题
				index++;
				row = sheet.createRow(index);
				Object t = its.next();
				for (int k = 0, methodObjSize = methodObj.size(); k < methodObjSize; k++) {
					Cell cell = row.createCell(k);
					cell.setCellStyle(style);
					Method getMethod = methodObj.get(k);
					Object value = null;
					if (convertMethod.containsKey(getMethod.getName())) {
						Method cm = convertMethod.get(getMethod.getName());
						value = cm.invoke(t, new Object[] {});
					} else {
						value = getMethod.invoke(t, new Object[] {});
					}
					cell.setCellValue(value == null ? "" : value.toString());
				}
			}
		}

		return workbook;
	}

	public static String sheetNameTrans(String mainCode) throws Exception {
		return sheetNameTrans(mainCode, null);
	}

	public static String sheetNameTrans(String mainCode, String rowNum) throws Exception {
		String connectStr = "";
		String newCode = "";
		if (!StringUtils.isEmpty(mainCode)) {
			newCode = mainCode.replaceAll("[^\\u4e00-\\u9fa5\\da-zA-Z]+", "_");
		}
		if (!StringUtils.isEmpty(mainCode) && !StringUtils.isEmpty(rowNum)) {
			connectStr = "_";
		}
		return newCode + connectStr + (rowNum == null ? "" : rowNum);
	}

	private static void pictureWaterMark(Sheet sheet, int w, int h) throws IOException {
		int width = 3;
		int height = 5;
		int xDis = 0;
		int yDis = 0;
		XSSFDrawing patriarch = (XSSFDrawing) sheet.createDrawingPatriarch();
		BufferedImage image = new BufferedImage(500, 250, BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = (Graphics2D) image.createGraphics();
		// graphics.setBackground(new Color(29, 115, 188, 100));
		// graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
		// graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER,
		// 0.2f));
		Color color = new Color(29, 115, 188, 100);
		graphics.setColor(color);
		int fontSize = 40;
		graphics.setFont(new java.awt.Font("文泉驛正黑", java.awt.Font.PLAIN, fontSize));
		graphics.rotate(Math.toRadians(30.0));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d = new Date();
		String date = sdf.format(d);
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		SysUser user = (SysUser) session.getAttribute("sysUserInfo");
		String userName = user.getUserName();
		graphics.drawString(userName + " " + date, 20, 20);
		graphics.dispose();
		ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();
		ImageIO.write(image, "png", byteArrayOut);
		int addPicture = sheet.getWorkbook().addPicture(byteArrayOut.toByteArray(), Workbook.PICTURE_TYPE_PNG);
		patriarch.createPicture(new XSSFClientAnchor(2, 3, 7, 2, (short) xDis, yDis, (short) (width + xDis), (height + yDis)), addPicture);
		for (int i = 1; i <= w / width; i++) {
			if (i != 1) {
				patriarch.createPicture(new XSSFClientAnchor(2, 3, 7, 2, (short) width * (i - 1) + xDis, yDis, (short) width * i + xDis, height + yDis),
						addPicture);
			}
			for (int j = 2; j <= h / height; j++) {
				patriarch.createPicture(
						new XSSFClientAnchor(2, 3, 7, 2, (short) width * (i - 1) + xDis, height * (j - 1) + yDis, (short) width * i + xDis, height * j + yDis),
						addPicture);
			}
		}
	}

	public static Sheet creatSheet(Workbook workbook, String sheetName, String sheetProtectPassword) throws Exception {
		Sheet sheet = workbook.createSheet(ExcelExportUtil.sheetNameTrans(sheetName));
		// sheet页锁定
		sheet.protectSheet(sheetProtectPassword);
		return sheet;
	}
}
