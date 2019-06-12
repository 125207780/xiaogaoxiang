package com.bonc.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.usermodel.Range;

public class PoiUtil {

	// 读doc文件
	public static void main(String arg[]) throws IOException {
		File file = new File("D:\\集中化经分系统省级数据接口规范_ERP分册 V1.1.2.doc");
		// String str = "";
		FileInputStream fis = null;
		HWPFDocument doc = null;
		try {
			fis = new FileInputStream(file);
			doc = new HWPFDocument(fis);
			String doc1 = doc.getDocumentText();
			System.out.println(doc1);
			StringBuilder doc2 = doc.getText();
			System.out.println(doc2);
			Range rang = doc.getRange();
			String doc3 = rang.text();
			System.out.println(doc3);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			doc.close();
			fis.close();
		}
	}

	/*
	 * // 读docx文件 public static void main(String arg[]) throws IOException {
	 * File file = new File("D:\\集中化经分系统省级数据接口规范_ERP分册 V1.1.2.doc"); String str
	 * = ""; try { FileInputStream fis = new FileInputStream(file); XWPFDocument
	 * xdoc = new XWPFDocument(fis); XWPFWordExtractor extractor = new
	 * XWPFWordExtractor(xdoc); String doc1 = extractor.getText();
	 * System.out.println(doc1); fis.close(); } catch (Exception e) {
	 * e.printStackTrace(); } }
	 */
}
