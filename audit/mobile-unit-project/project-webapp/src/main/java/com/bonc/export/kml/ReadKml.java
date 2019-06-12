package com.bonc.export.kml;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.gridinfo.dao.entity.StationInfo;

public class ReadKml {
	// 判断读取KML是否成功
	public static boolean addSampleSuccess = false;
	// 存储从KML文件中读取出来的坐标值和name
	private static Coordinate coordinate = null;
	// 存储每次实例化的Coordinate对象,每个Coordinate都保存着不同的x,y,name
	private static List<Placemark> placemarkList = new ArrayList<>();

	public static void main(String[] args) throws Exception {
		// 读取kml文件
		String filePath = "D://祁阳八宝镇.kml";
		// 解析kml文件
		parseXmlWithDom4j(filePath);
		System.out.println("placemarkList Value :" + placemarkList.toString());

		List<Coordinate> coorList = placemarkList.get(0).getPoints();
		StringBuilder shape = new StringBuilder("[");
		int count = 0;
		Point p = null;
		for (Coordinate c : coorList) {
			p = google_bd_encrypt(c.getLng(), c.getLat());
			if (count != coorList.size() - 1) {
				shape.append("{\"lng\":" + p.getLng() + ",\"lat\":" + p.getLat() + "},");
			} else {
				shape.append("{\"lng\":" + p.getLng() + ",\"lat\":" + p.getLat() + "}");
			}
			count++;
		}
		shape.append("]");
		Map<String, Object> mapInfo = new HashMap<>();
		setShapeMM(shape.toString(), mapInfo);
		List<StationInfo> stationInfoList = new ArrayList<>();
		StationInfo si = new StationInfo();
		si.setShape(shape.toString());
		si.setGridName("八宝镇");
		si.setMaxLng(Double.valueOf(mapInfo.get("maxlng").toString()));
		si.setMinLng(Double.valueOf(mapInfo.get("minlng").toString()));
		si.setMaxLat(Double.valueOf(mapInfo.get("maxlat").toString()));
		si.setMinLat(Double.valueOf(mapInfo.get("minlat").toString()));
		si.setCpLng(Double.valueOf(mapInfo.get("cplng").toString()));
		si.setCpLat(Double.valueOf(mapInfo.get("cplat").toString()));
		si.setColor("#EECFA1");
		stationInfoList.add(si);
		exportStationExcel(stationInfoList, new File("D://gridInfo.xls"));
		FileWriter fw = new FileWriter("D://token.txt", true);
		fw.write("\r\n" + "八宝镇");
		fw.write("\r\n" + shape.toString());
		// 最大经度
		fw.write("\r\n" + mapInfo.get("maxlng"));
		// 最小经度
		fw.write("\r\n" + mapInfo.get("minlng"));
		// 最大纬度
		fw.write("\r\n" + mapInfo.get("maxlat"));
		// 最小纬度
		fw.write("\r\n" + mapInfo.get("minlat"));
		// 中心经度
		fw.write("\r\n" + mapInfo.get("cplng"));
		// 中心纬度
		fw.write("\r\n" + mapInfo.get("cplat"));
		// 颜色
		fw.write("\r\n" + "#EECFA1");
		fw.flush();
		fw.close();
	}

	private static final double x_pi = 3.14159265358979324 * 3000.0 / 180.0;

	public static Point google_bd_encrypt(double gg_lat, double gg_lon) {
		Point point = new Point();
		double x = gg_lon, y = gg_lat;
		double z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
		double theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
		double bd_lon = z * Math.cos(theta) + 0.0065;
		double bd_lat = z * Math.sin(theta) + 0.006;
		point.setLat(bd_lat);
		point.setLng(bd_lon);
		return point;
	}

	public static class Point {

		private double lat;// 纬度
		private double lng;// 经度

		public Point() {
		}

		public Point(double lng, double lat) {
			this.lng = lng;
			this.lat = lat;
		}

		@Override
		public boolean equals(Object obj) {
			if (obj instanceof Point) {
				Point bmapPoint = (Point) obj;
				return (bmapPoint.getLng() == lng && bmapPoint.getLat() == lat) ? true : false;
			} else {
				return false;
			}
		}

		public double getLat() {
			return lat;
		}

		public void setLat(double lat) {
			this.lat = lat;
		}

		public double getLng() {
			return lng;
		}

		public void setLng(double lng) {
			this.lng = lng;
		}

		@Override
		public String toString() {
			return "Point [lat=" + lat + ", lng=" + lng + "]";
		}

	}

	public static Boolean parseXmlWithDom4j(String input) throws Exception {
		Document document = loadFile(input);
		// 获取doc.kml文件的根结点
		Element root = document.getRootElement();
		listNodes(root);
		addSampleSuccess = true;
		// 选择sd卡中的kml文件，解析成功后即调用MainActivity中的添加marker的方法向地图上添加样点marker
		return addSampleSuccess;
	}

	/**
	 * 载入一个KML文件
	 * 
	 * @Title loadFile
	 * @param fileName
	 * @return
	 * @Author xiaogaoxiang
	 * @return Document
	 */
	private static Document loadFile(String fileName) {
		Document document = null;
		SAXReader reader = null;
		try {
			reader = new SAXReader();
			FileInputStream in = new FileInputStream(new File(fileName));
			InputStreamReader inReader = new InputStreamReader(in, "UTF-8");
			BufferedReader bufReader = new BufferedReader(inReader);
			document = reader.read(bufReader);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return document;
	}

	/**
	 * 遍历当前节点下的所有节点
	 * 
	 * @Title listNodes
	 * @param node
	 * @Author xiaogaoxiang
	 * @return void
	 */
	@SuppressWarnings("unchecked")
	public static void listNodes(Element node) {

		// Placemark节点中的name属性
		String name = "";
		// Placemark节点中的name属性
		String href = "";
		List<Coordinate> coordinateList = new ArrayList<>();
		try {
			// 如果当前节点是Placemark就解析其子节点
			if ("Placemark".equals(node.getName())) {
				// 得到Placemark节点所有的子节点
				List<Element> placemarkSons = node.elements();
				// 遍历所有的子节点
				for (Element element : placemarkSons) {
					if ("name".equals(element.getName())) {
						href = element.getText();
						System.out.println("href Value :" + "href=" + href);
					}
				}
				// Point节点的子节点
				Element pointSon;
				// 遍历Point节点的所有子节点
				Iterator<?> i = node.elementIterator("Point");
				while (i.hasNext()) {
					pointSon = (Element) i.next();
					String nodeContent = "";
					// 得到coordinates节点的节点内容
					nodeContent = pointSon.elementText("coordinates");
					coordinate = makeCoordinate(nodeContent);
					// 将每一个实例化的对象存储在list中
					coordinateList.add(coordinate);
				}
				if (coordinateList.size() > 0)
					placemarkList.add(new Placemark(coordinateList, name, "point"));
				coordinateList.clear();

				// 线节点的子节点
				Element LineSon;
				// 遍历线节点的所有子节点
				Iterator<?> j = node.elementIterator("LineString");
				while (j.hasNext()) {
					LineSon = (Element) j.next();
					String nodeContent = "";
					// 得到coordinates节点的节点内容
					nodeContent = LineSon.elementText("coordinates");
					System.out.println("beforeRepace :" + nodeContent);
					nodeContent = nodeContent.replaceAll("\t|\n", " ");
					System.out.println("afterRepace :" + nodeContent);
					String nodeContentSplit[] = null;
					nodeContentSplit = nodeContent.split(" ");
					for (int it = 0; it < nodeContentSplit.length; it++) {
						String coordinateStr = nodeContentSplit[it];
						coordinate = makeCoordinate(coordinateStr);
						// 将每一个实例化的对象存储在list中
						coordinateList.add(coordinate);
					}
				}

				Placemark heh = new Placemark(coordinateList, name, "LineString");
				System.out.println("Placemark  Value :" + "name=" + heh.getName() + "type=" + heh.getType() + "points=" + heh.getPoints());
				if (coordinateList.size() > 0)
					placemarkList.add(new Placemark(coordinateList, name, "LineString"));
				Placemark heh0 = new Placemark(coordinateList, name, "LineString");
				System.out.println("Placemark  Value :" + "name=" + heh0.getName() + "type=" + heh0.getType() + "points=" + heh0.getPoints());
				if (coordinateList.size() > 0)
					placemarkList.add(new Placemark(coordinateList, name, "LineString"));

			}
			coordinateList.clear();
			// 多边形节点的子节点
			Element PolygonSon;
			// 遍历Polygon节点的所有子节点
			Iterator<?> k = node.elementIterator("Polygon");
			while (k.hasNext()) {
				PolygonSon = (Element) k.next();
				String nodeContent = "";
				nodeContent = PolygonSon.getStringValue();
				nodeContent = nodeContent.replaceAll("\t|\n", "");
				String nodeContentSplit[] = null;
				nodeContentSplit = nodeContent.split(" ");
				for (int it = 0; it < nodeContentSplit.length; it++) {
					String coordinateStr = nodeContentSplit[it];
					coordinate = makeCoordinate(coordinateStr);
					// 将每一个实例化的对象存储在list中
					coordinateList.add(coordinate);
				}
			}

			Placemark heh = new Placemark(coordinateList, name, "Polygon");
			System.out.println("Placemark  Value :" + "name=" + heh.getName() + "type=" + heh.getType() + "points=" + heh.getPoints());
			if (coordinateList.size() > 0)
				placemarkList.add(new Placemark(coordinateList, name, "Polygon"));
			coordinateList.clear();

		} catch (Exception e) {
			e.printStackTrace();
		}
		// 同时迭代当前节点下面的所有子节点，使用递归
		Iterator<Element> iterator = node.elementIterator();
		while (iterator.hasNext()) {
			Element e = iterator.next();
			listNodes(e);
		}
	}

	private static Coordinate makeCoordinate(String point) {
		Coordinate coordinate = null;
		// 坐标x
		String x = "";
		// 坐标y
		String y = "";
		// 对x作string to double
		double d_x = 0.0;
		double d_y = 0.0;
		String nodeContentSplit[] = null;
		System.out.println("makeCoordinate :" + point);
		nodeContentSplit = point.split(",");
		System.out.println("nodeContentSplit :" + nodeContentSplit);
		y = nodeContentSplit[0];
		x = nodeContentSplit[1];
		d_x = Double.valueOf(x.trim());
		d_y = Double.valueOf(y.trim());
		coordinate = new Coordinate(d_x, d_y);
		System.out.println("coordinate  Value :" + "lng=" + coordinate.getLng() + "lat=" + coordinate.getLat());
		return coordinate;
	}

	public List<Placemark> getCoordinateList() {
		return ReadKml.placemarkList;
	}

	private static void setShapeMM(String shape, Map<String, Object> info) {
		JSONArray arr = JSONArray.parseArray(shape);
		Double minlng = 0.0;
		Double maxlng = 0.0;
		Double minlat = 0.0;
		Double maxlat = 0.0;

		Double x0 = 0.0;
		Double x1 = 0.0;
		Double x2 = 0.0;
		Double y0 = 0.0;
		Double y1 = 0.0;
		Double y2 = 0.0;
		Double sumx = 0.0;
		Double sumy = 0.0;
		Double sumarea = 0.0;

		for (int i = 0, n = arr.size(); i < n; i++) {
			JSONObject obj = arr.getJSONObject(i);
			Double lng = obj.getDouble("lng");
			Double lat = obj.getDouble("lat");
			if (i == 0) {
				minlng = maxlng = lng;
				minlat = maxlat = lat;
				x0 = lng;
				y0 = lat;
			} else {
				if (minlng > lng) {
					minlng = lng;
				}
				if (maxlng < lng) {
					maxlng = lng;
				}
				if (minlat > lat) {
					minlat = lat;
				}
				if (maxlat < lat) {
					maxlat = lat;
				}

				if (i == 1) {
					x1 = lng;
					y1 = lat;
				} else {
					x2 = lng;
					y2 = lat;
					Double s = ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)) / 2.0;
					sumx += ((x0 + x1 + x2) * s);
					sumy += ((y0 + y1 + y2) * s);
					sumarea += s;
					x1 = x2;
					y1 = y2;
				}
			}
		}
		info.put("minlng", minlng);
		info.put("maxlng", maxlng);
		info.put("minlat", minlat);
		info.put("maxlat", maxlat);
		if (Math.abs(sumarea) > 0) {
			info.put("cplng", sumx / sumarea / 3);
			info.put("cplat", sumy / sumarea / 3);
		} else {
			info.put("cplng", (minlng + maxlng) / 2);
			info.put("cplat", (minlat + maxlat) / 2);
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

	public static void exportStationExcel(List<StationInfo> empList, File file) {
		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 8);// 起始行号，结束行号，起始列号，结束列号
			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("网格模板");
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
			cell1.setCellValue("网格模板");
			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "网格名称", "网格SHAP", "最大经度", "最小经度", "最大纬度", "最小纬度", "中心经度", "中心纬度", "颜色" };
			HSSFCell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 4、操作单元格；将基站列表写入excel
			if (empList != null) {
				HSSFRow row = null;
				HSSFCell cell11 = null;
				HSSFCell cell12 = null;
				HSSFCell cell13 = null;
				HSSFCell cell14 = null;
				HSSFCell cell15 = null;
				HSSFCell cell16 = null;
				HSSFCell cell17 = null;
				HSSFCell cell18 = null;
				HSSFCell cell19 = null;
				for (int j = 0; j < empList.size(); j++) {
					row = sheet.createRow(j + 2);
					cell11 = row.createCell(0);
					cell11.setCellValue(empList.get(j).getGridName());
					cell12 = row.createCell(1);
					cell12.setCellValue(empList.get(j).getGridCode());
					// 最大经度
					cell13 = row.createCell(2);
					cell13.setCellValue(empList.get(j).getMaxLng());
					// 最小经度
					cell14 = row.createCell(3);
					cell14.setCellValue(empList.get(j).getMinLng());
					// 最大纬度
					cell15 = row.createCell(4);
					cell15.setCellValue(empList.get(j).getMaxLat());
					// 最小纬度
					cell16 = row.createCell(5);
					cell16.setCellValue(empList.get(j).getMinLat());
					// 中心经度
					cell17 = row.createCell(6);
					cell17.setCellValue(empList.get(j).getCpLng());
					// 中心纬度
					cell18 = row.createCell(7);
					cell18.setCellValue(empList.get(j).getCpLat());
					// 颜色
					cell19 = row.createCell(8);
					cell19.setCellValue(empList.get(j).getColor());
				}
			}
			// 5、输出
			workbook.write(file);
			// 6、关流
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}