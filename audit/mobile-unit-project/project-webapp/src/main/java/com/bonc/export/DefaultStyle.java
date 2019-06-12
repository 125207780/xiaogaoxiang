package com.bonc.export;

import java.lang.reflect.InvocationTargetException;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Workbook;

public class DefaultStyle {
	private Workbook workbook = null;
	private CellStyle cellStyleForTitle = null;
	private CellStyle cellStyleForData = null;

	public class TitleStyle {
		private CellStyle defaultTitleStyle;

		public CellStyle getDefaultTitleStyle() {
			return defaultTitleStyle;
		}

		public void setDefaultTitleStyle(CellStyle defaultTitleStyle) {
			this.defaultTitleStyle = defaultTitleStyle;
		}
	}

	public class DataStyle {
		private CellStyle defaultDataStyle;

		public CellStyle getDefaultDataStyle() {
			return defaultDataStyle;
		}

		public void setDefaultDataStyle(CellStyle defaultDataStyle) {
			this.defaultDataStyle = defaultDataStyle;
		}
	}

	public DefaultStyle(Workbook workbook)
			throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		this.workbook = workbook;
		// Class<? extends DefaultStyle> clazz = this.getClass();
		// Field[] fields = clazz.getDeclaredFields();
		// for (Field field : fields) {
		// String fieldname = field.getName();
		// if ("workbook".equals(fieldname)) {
		// continue;
		// }
		// field.set(this, workbook.createCellStyle());
		// StringBuffer setMethodName = new StringBuffer("set");
		// setMethodName.append(fieldname.substring(0, 1).toUpperCase());
		// setMethodName.append(fieldname.substring(1));
		// Method method = clazz.getMethod(setMethodName.toString(), clazz);
		// method.invoke(this, null);
		// }
		this.cellStyleForTitle = this.workbook.createCellStyle();
		this.cellStyleForData = this.workbook.createCellStyle();
		this.setCellStyleForTitle();
		this.setCellStyleForData();
	}

	private void setCellStyleForTitle() {
		Font titleFont = this.workbook.createFont();
		titleFont.setBold(true);
		this.cellStyleForTitle.setFont(titleFont);
		this.cellStyleForTitle.setAlignment(HorizontalAlignment.CENTER);
		this.cellStyleForTitle.setBorderBottom(BorderStyle.THIN);
		this.cellStyleForTitle.setBorderLeft(BorderStyle.THIN);
		this.cellStyleForTitle.setBorderRight(BorderStyle.THIN);
		this.cellStyleForTitle.setBorderTop(BorderStyle.THIN);
		this.cellStyleForTitle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		this.cellStyleForTitle.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
	}

	private void setCellStyleForData() {

	}

	public TitleStyle getCellStyleForTitle() {
		TitleStyle ts = new TitleStyle();
		ts.setDefaultTitleStyle(this.cellStyleForTitle);
		return ts;
	}

	public DataStyle getCellStyleForData() {
		DataStyle ds = new DataStyle();
		ds.setDefaultDataStyle(this.cellStyleForData);
		return ds;
	}
}
