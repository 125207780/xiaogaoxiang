package com.bonc.common.utils;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

import com.bonc.common.cst.CST;

public class FormatUtils {
	public static String format(String cellValue, String format) {
		String result = "";
		String formatLow = format.toLowerCase();
		if (formatLow.contains("y") || formatLow.contains("m") || formatLow.contains("d") || formatLow.contains("t") || formatLow.contains("s")) {
			result = dateFormat(cellValue, format);
		} else {
			result = feeFormat(cellValue, format);
		}
		return result;
	}

	// "#,##0.00"
	public static String feeFormat(String cellValue, String feeFormat) {
		String result = "";
		if (StringUtils.isEmpty(cellValue)) {
			return result;
		}
		double m;
		try {
			m = Double.valueOf(cellValue);
		} catch (Exception e) {
			m = 0;
		}
		DecimalFormat df = new DecimalFormat(feeFormat);
		result = df.format(m);
		return result;
	}

	// "#,##0.00"
	public static String dateFormat(String cellValue, String dateFormat) {
		String result = "";
		if (StringUtils.isEmpty(cellValue)) {
			return result;
		}
		SimpleDateFormat sdf1 = new SimpleDateFormat(CST.AUDIT_PERIOD_FORMAT);
		SimpleDateFormat sdf2 = new SimpleDateFormat(dateFormat);
		Date date = null;
		try {
			date = sdf1.parse(cellValue);
			result = sdf2.format(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}
}
