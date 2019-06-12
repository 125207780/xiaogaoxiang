package com.bonc.export;

import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExportExcelUtil {
	/**
	 * 导出Excel
	 * 
	 * @param response
	 * @param excelname
	 * @param tablename
	 * @param valueClz
	 * @param list
	 * @throws Exception
	 */
	public static void downloadExcel(HttpServletResponse response, String excelname, Workbook workbook) throws Exception {
		// 生成提示信息，
		response.setContentType("application/vnd.ms-excel");
		String codedFileName = excelname + ".xls";
		// 进行转码，使其支持中文文件名
		if (workbook.getClass() == XSSFWorkbook.class) {

			codedFileName = excelname + ".xlsx";
		}
		// response.setHeader("Content-Disposition", "attachment;filename=" +
		// new String(codedFileName.getBytes("UTF-8"), "ISO8859-1" ));
		response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(codedFileName, "UTF-8"));
		OutputStream fOut = response.getOutputStream();
		workbook.write(fOut);
		fOut.flush();
		fOut.close();
	}
}
