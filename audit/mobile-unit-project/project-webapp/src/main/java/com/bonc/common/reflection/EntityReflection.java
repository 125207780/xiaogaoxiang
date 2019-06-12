package com.bonc.common.reflection;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;

import org.apache.commons.lang3.StringUtils;

import com.bonc.common.annotation.Excel;
import com.bonc.common.annotation.Grid;

public class EntityReflection {

	public static void dataFormatForGrid(Collection<?> list) throws Exception {
		for (Object obj : list) {
			Class<?> class1 = obj.getClass();
			Field[] fields = class1.getDeclaredFields();
			for (Field field : fields) {
				Grid grid = field.getAnnotation(Grid.class);
				if (grid != null) {
					if (grid.isCodeKey()) {
						String valueConvertMethodName = field.getName() + "toValue";
						Method toValueConvertMethod = class1.getMethod(valueConvertMethodName.toString(), new Class[] {});
						Object value = toValueConvertMethod.invoke(obj, new Object[] {});
						String setMethodName = "set" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
						Method setMethod = class1.getMethod(setMethodName, new Class[] { String.class });
						setMethod.invoke(obj, new Object[] { value });
					}
					if (!StringUtils.isEmpty(grid.dateFormat())) {
						String dateConvertMethodName = field.getName() + "toDate";
						Method toDateConvertMethod = class1.getMethod(dateConvertMethodName.toString(), new Class[] { String.class });
						Object value = toDateConvertMethod.invoke(obj, new Object[] { grid.dateFormat() });
						String setMethodName = "set" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
						Method setMethod = class1.getMethod(setMethodName, new Class[] { String.class });
						setMethod.invoke(obj, new Object[] { value });
					}
					if (!StringUtils.isEmpty(grid.feeFormat())) {
						String feeConvertMethodName = field.getName() + "toFee";
						Method toFeeConvertMethod = class1.getMethod(feeConvertMethodName.toString(), new Class[] { String.class });
						Object value = toFeeConvertMethod.invoke(obj, new Object[] { grid.feeFormat() });
						String setMethodName = "set" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
						Method setMethod = class1.getMethod(setMethodName, new Class[] { String.class });
						setMethod.invoke(obj, new Object[] { value });
					}
				}
			}
		}
	}

	public static void dataFormatForExcel(Collection<?> list) throws Exception {
		for (Object obj : list) {
			Class<?> class1 = obj.getClass();
			Field[] fields = class1.getDeclaredFields();
			for (Field field : fields) {
				Excel excel = field.getAnnotation(Excel.class);
				if (excel != null) {
					if (excel.exportConvertSign()) {
						String valueConvertMethodName = field.getName() + "toValue";
						Method toValueConvertMethod = class1.getMethod(valueConvertMethodName.toString(), new Class[] {});
						Object value = toValueConvertMethod.invoke(obj, new Object[] {});
						String setMethodName = "set" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
						Method setMethod = class1.getMethod(setMethodName, new Class[] { String.class });
						setMethod.invoke(obj, new Object[] { value });
					}
					if (!StringUtils.isEmpty(excel.dateFormat())) {
						String dateConvertMethodName = field.getName() + "toDate";
						Method toDateConvertMethod = class1.getMethod(dateConvertMethodName.toString(), new Class[] { String.class });
						Object value = toDateConvertMethod.invoke(obj, new Object[] { excel.dateFormat() });
						String setMethodName = "set" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
						Method setMethod = class1.getMethod(setMethodName, new Class[] { String.class });
						setMethod.invoke(obj, new Object[] { value });
					}
					if (!StringUtils.isEmpty(excel.feeFormat())) {
						String feeConvertMethodName = field.getName() + "toFee";
						Method toFeeConvertMethod = class1.getMethod(feeConvertMethodName.toString(), new Class[] { String.class });
						Object value = toFeeConvertMethod.invoke(obj, new Object[] { excel.feeFormat() });
						String setMethodName = "set" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
						Method setMethod = class1.getMethod(setMethodName, new Class[] { String.class });
						setMethod.invoke(obj, new Object[] { value });
					}
				}
			}
		}
	}
}
