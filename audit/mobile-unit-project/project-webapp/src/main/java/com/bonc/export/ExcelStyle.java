package com.bonc.export;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Workbook;

public abstract class ExcelStyle {
	Workbook workbook = null;
	CellStyle cellStyleForCaption = null;
	CellStyle cellStyleForTitle = null;
	CellStyle cellStyleForData = null;

	public ExcelStyle(Workbook workbook)
			throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		this.workbook = workbook;
		Class<? extends ExcelStyle> clazz = this.getClass();
		Field[] fields = clazz.getDeclaredFields();
		for (Field field : fields) {
			String fieldname = field.getName();
			if ("workbook".equals(fieldname)) {
				continue;
			}
			field.set(this, workbook.createCellStyle());
			StringBuffer setMethodName = new StringBuffer("set");
			setMethodName.append(fieldname.substring(0, 1).toUpperCase());
			setMethodName.append(fieldname.substring(1));
			Method method = clazz.getMethod(setMethodName.toString(), clazz);
			method.invoke(this, Method.class);
		}
		// this.setCellStyleForCaption();
		// this.setCellStyleForTitle();
		// this.setCellStyleForData();
	}

	public abstract void setCellStyleForCaption();

	public abstract void setCellStyleForTitle();

	public abstract void setCellStyleForData();

	public CellStyle getCellStyleForCaption() {
		return cellStyleForCaption;
	}

	public CellStyle getCellStyleForTitle() {
		return cellStyleForTitle;
	}

	public CellStyle getCellStyleForData() {
		return cellStyleForData;
	}

}
