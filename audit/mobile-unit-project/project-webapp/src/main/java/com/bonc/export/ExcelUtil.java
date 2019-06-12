package com.bonc.export;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.annotation.Excel;
import com.bonc.gridinfo.dao.entity.EvaluationKpi;
import com.bonc.gridinfo.dao.entity.OrgGridStation;
import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.map.dao.entity.DirectSaleUserInfo;
import com.bonc.map.dao.entity.MarketManager;
import com.bonc.map.service.MapIndexService;

@Service
public final class ExcelUtil {

	@Resource
	private MapIndexService mapIndexService;

	public ExcelUtil() {
	}

	/** Excel 文件要存放的位置 */
	public static String outputFile = "/zlxx/excel_demo.xls";

	/**
	 * 标题列表
	 */
	// private static String[] HEAD_LIST = { "序号", "名字", "年龄", "备注" };

	// private static String[] VALUE_LIST = { "01", "张代浩", "20", "1986-04-03",
	// "........." };

	/**
	 * 字段列表
	 */
	// private static String[] FIELD_LIST = { "index", "name", "age", "content"
	// };

	/**
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		// ------------------------------------------------------------
		// List<String[]> list = new ArrayList<String[]>();
		// list.add(VALUE_LIST);
		// list.add(VALUE_LIST);
		// list.add(VALUE_LIST);
		// createExcel(outputFile, HEAD_LIST, list);

		// ------------------------------------------------------------
		// List<Map<String, Object>> dataList = new ArrayList<Map<String,
		// Object>>();
		// Map<String, Object> map = new HashMap<String, Object>();
		// map.put("index", "001");
		// map.put("name", "张三");
		// map.put("age", "22");
		// map.put("content", "大家好");
		// dataList.add(map);
		// dataList.add(map);
		// dataList.add(map);
		//
		// createExcel(outputFile, HEAD_LIST, FIELD_LIST, dataList);

		// -------------------------------------------------------------
		// readExcel(null);
		// --------------------------------------------------------------
		// new ExcelUtil().testReadExcel();
		// 读取文件
		List<StationInfo> stationInfoList = readGridExcelByPath("D://gridInfo//gridInfo.xls");
		System.out.println(stationInfoList.size());
		Set<String> stationNames = new TreeSet<>();
		for (StationInfo si : stationInfoList) {
			stationNames.add(si.getGridName());
		}
		Iterator<String> gridNames = stationNames.iterator();
		String name = null;
		StringBuilder shapeInfo = null;
		String shap = null;
		FileWriter fw = null;
		List<Point> pointList = null;
		Point[] points = null;
		int count = 0;
		List<StationInfo> stationInfoLists = new ArrayList<>();
		Melkman m = null;
		StationInfo stationInfo = null;
		Map<String, Object> mapInfo = null;
		while (gridNames.hasNext()) {
			Point p = new Point();
			pointList = new ArrayList<>();
			name = gridNames.next();
			if (null == name || "".equals(name))
				break;
			shapeInfo = new StringBuilder("[");
			for (StationInfo si : stationInfoList) {
				if (si.getGridName().equals(name)) {
					p = new Point();
					p.setX(si.getStationLon().doubleValue());
					p.setY(si.getStationLat().doubleValue());
					pointList.add(p);
				}
			}
			m = new Melkman(pointList);
			System.out.println("这是第： " + count + " 条， 网格名称： " + name + " || 总共有： " + pointList.size() + " 条");
			points = m.getTubaoPoint();
			for (Point pi : points) {
				if (null != pi)
					shapeInfo.append("{\"lng\":" + pi.getX() + ",\"lat\":" + pi.getY() + "},");
			}
			shap = shapeInfo.toString().substring(0, shapeInfo.length() - 1);
			shap += "]";

			mapInfo = new HashMap<String, Object>();
			setShapeMM(shap, mapInfo);
			try {
				// 构造函数中的第二个参数true表示以追加形式写文件
				fw = new FileWriter("D://token.txt", true);
				fw.write("\r\n" + name);
				fw.write("\r\n" + shap);
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
				fw.flush();
			} catch (IOException e) {
				System.out.println("文件写入失败！" + e);
			}
			count++;
			stationInfo = new StationInfo();
			stationInfo.setGridName(name);
			stationInfo.setGridCode(shap);
			// 最大经纬度
			stationInfo.setMaxLng(Double.valueOf(mapInfo.get("maxlng").toString()));
			// 最小经度
			stationInfo.setMinLng(Double.valueOf(mapInfo.get("minlng").toString()));
			// 最大纬度
			stationInfo.setMaxLat(Double.valueOf(mapInfo.get("maxlat").toString()));
			// 最小纬度
			stationInfo.setMinLat(Double.valueOf(mapInfo.get("minlat").toString()));
			// 中心经度
			stationInfo.setCpLng(Double.valueOf(mapInfo.get("cplng").toString()));
			// 中心纬度
			stationInfo.setCpLat(Double.valueOf(mapInfo.get("cplat").toString()));
			stationInfoLists.add(stationInfo);
		}
		exportStationExcel(stationInfoLists, new File("D://taken.xls"));
		System.out.println("文件写入成功！");
		fw.close();
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
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 7);// 起始行号，结束行号，起始列号，结束列号
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
			String[] titles = { "网格名称", "网格SHAP", "最大经度", "最小经度", "最大纬度", "最小纬度", "中心经度", "中心纬度" };
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

	/**
	 * 
	 * @FileName ExcelUtil.java
	 * @Author xiaogaoxiang
	 * @At 2018年11月21日 下午11:27:54
	 * @Desc 定义点类
	 */
	private static class Point {
		// X坐标(经度)
		private double x;
		// Y坐标(纬度)
		private double y;
		// 与P0点的角度
		private double arCos;

		public double getX() {
			return x;
		}

		public void setX(double x) {
			this.x = x;
		}

		public double getY() {
			return y;
		}

		public void setY(double y) {
			this.y = y;
		}

		public double getArCos() {
			return arCos;
		}

		public void setArCos(double arCos) {
			this.arCos = arCos;
		}
	}

	/**
	 * 
	 * @FileName ExcelUtil.java
	 * @Author xiaogaoxiang
	 * @At 2018年11月21日 下午11:28:22
	 * @Desc 定义凸包算法内部类
	 */
	private static class Melkman {
		// 坐标数组
		private Point[] pointArray;
		// 数据个数
		private final int N;
		// 数组索引
		private int D[];

		public Melkman(List<Point> pList) {
			this.pointArray = new Point[pList.size()];
			N = pList.size();
			int k = 0;
			for (Point p : pList) {
				pointArray[k++] = p;
			}
			D = new int[2 * N];
		}

		/**
		 * 求凸包点
		 * 
		 * @Title getTubaoPoint
		 * @Author xiaogaoxiang
		 * @return Point[] 所求凸包点
		 */
		public Point[] getTubaoPoint() {
			// 获得最小的Y，作为P0点
			double minY = pointArray[0].getY();
			int j = 0;
			for (int i = 1; i < N; i++) {
				if (pointArray[i].getY() < minY) {
					minY = pointArray[i].getY();
					j = i;
				}
			}
			swap(0, j);

			// 计算除第一顶点外的其余顶点到第一点的线段与x轴的夹角
			for (int i = 1; i < N; i++) {
				pointArray[i].setArCos(angle(i));
			}

			// 根据所得到的角度进行快速排序
			quickSort(1, N - 1);

			int bot = N - 1;
			int top = N;
			D[top++] = 0;
			D[top++] = 1;
			int i;

			// 寻找第三个点 要保证3个点不共线！！
			for (i = 2; i < N; i++) {
				if (isLeft(pointArray[D[top - 2]], pointArray[D[top - 1]], pointArray[i]) != 0)
					break;
				// 共线就更换顶点
				D[top - 1] = i;
			}

			D[bot--] = i;
			// i是第三个点 不共线！！
			D[top++] = i;

			int t;
			if (isLeft(pointArray[D[N]], pointArray[D[N + 1]], pointArray[D[N + 2]]) < 0) {
				// 此时队列中有3个点，要保证3个点a,b,c是成逆时针的，不是就调换ab
				t = D[N];
				D[N] = D[N + 1];
				D[N + 1] = t;
			}

			for (i++; i < N; i++) {
				// 如果成立就是i在凸包内，跳过 //top=n+3 bot=n-2
				if (isLeft(pointArray[D[top - 2]], pointArray[D[top - 1]], pointArray[i]) > 0
						&& isLeft(pointArray[D[bot + 1]], pointArray[D[bot + 2]], pointArray[i]) > 0) {
					continue;
				}

				// 非左转 则退栈
				while (isLeft(pointArray[D[top - 2]], pointArray[D[top - 1]], pointArray[i]) <= 0) {
					top--;
				}
				D[top++] = i;

				// 反向表非左转 则退栈
				while (isLeft(pointArray[D[bot + 1]], pointArray[D[bot + 2]], pointArray[i]) <= 0) {
					bot++;
				}
				D[bot--] = i;
			}

			// 凸包构造完成，D数组里bot+1至top-1内就是凸包的序列(头尾是同一点)
			Point[] resultPoints = new Point[top - bot - 1];
			int index = 0;
			for (i = bot + 1; i < top - 1; i++) {
				resultPoints[index++] = pointArray[D[i]];
			}
			return resultPoints;
		}

		/**
		 * 判断ba相对ao是不是左转
		 * 
		 * @Title isLeft
		 * @Author xiaogaoxiang
		 * @param o
		 * @param a
		 * @param b
		 * @return double 大于0则左转
		 */
		private double isLeft(Point o, Point a, Point b) {
			double aoX = a.getX() - o.getX();
			double aoY = a.getY() - o.getY();
			double baX = b.getX() - a.getX();
			double baY = b.getY() - a.getY();

			return aoX * baY - aoY * baX;
		}

		/**
		 * 实现数组交换
		 * 
		 * @Title swap
		 * @Author xiaogaoxiang
		 * @param i
		 * @param j
		 *            void
		 */
		private void swap(int i, int j) {
			Point tempPoint = new Point();
			tempPoint.setX(pointArray[j].getX());
			tempPoint.setY(pointArray[j].getY());
			tempPoint.setArCos(pointArray[j].getArCos());

			pointArray[j].setX(pointArray[i].getX());
			pointArray[j].setY(pointArray[i].getY());
			pointArray[j].setArCos(pointArray[i].getArCos());

			pointArray[i].setX(tempPoint.getX());
			pointArray[i].setY(tempPoint.getY());
			pointArray[i].setArCos(tempPoint.getArCos());
		}

		/**
		 * 快速排序
		 * 
		 * @Title quickSort
		 * @Author xiaogaoxiang
		 * @param top
		 * @param bot
		 *            void
		 */
		private void quickSort(int top, int bot) {
			int pos;
			if (top < bot) {
				pos = loc(top, bot);
				quickSort(top, pos - 1);
				quickSort(pos + 1, bot);
			}
		}

		/**
		 * 移动起点，左侧为小，右侧为大
		 * 
		 * @Title loc
		 * @Author xiaogaoxiang
		 * @param top
		 * @param bot
		 * @return int 移动后位置
		 */
		private int loc(int top, int bot) {
			double x = pointArray[top].getArCos();
			int j, k;
			j = top + 1;
			k = bot;
			while (true) {
				while (j < bot && pointArray[j].getArCos() < x)
					j++;
				while (k > top && pointArray[k].getArCos() > x)
					k--;
				if (j >= k)
					break;
				swap(j, k);
			}
			swap(top, k);
			return k;
		}

		/**
		 * 角度计算
		 * 
		 * @Title angle
		 * @Author xiaogaoxiang
		 * @param i
		 *            指针
		 * @return double
		 */
		private double angle(int i) {
			double j, k, m, h;
			j = pointArray[i].getX() - pointArray[0].getX();
			k = pointArray[i].getY() - pointArray[0].getY();
			// 得到顶点i 到第一顶点的线段长度
			m = Math.sqrt(j * j + k * k);
			if (k < 0)
				j = (-1) * Math.abs(j);
			// 得到该线段与x轴的角度
			h = Math.acos(j / m);
			return h;
		}
	}

	public static List<StationInfo> readGridExcelByPath(String fileName) throws FileNotFoundException, IOException {
		// 结果集
		List<StationInfo> list = new ArrayList<>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(fileName));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				StationInfo kpi = new StationInfo();
				// 基站经度
				if (row.getCell(0) != null) {
					kpi.setStationLon(new BigDecimal(String.valueOf(row.getCell(0))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				// 基站纬度
				if (row.getCell(1) != null) {
					kpi.setStationLat(new BigDecimal(String.valueOf(row.getCell(1))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				// 基站名称
				if (row.getCell(2) != null) {
					kpi.setGridName(String.valueOf(getCellValue(row.getCell(2))));
					list.add(kpi);
				}
			}
		}
		hssfworkbook.close();
		return list;
	}

	/**
	 * 使用举例
	 * 
	 */
	public void testCreateExcel() throws Exception {

		List<Map<String, Object>> dataList = getDataList();
		List<String> headList = getHeadList();
		List<String> fieldList = getFieldList();

		createExcel("TEST01.xls", headList, fieldList, dataList);
	}

	/**
	 * 使用举例
	 * 
	 * @throws Exception
	 * 
	 */
	public void testReadExcel() throws Exception {
		// String excelUrl =
		// "C:/javadeveloper/workspace/Mybatis_one/src/����̨��2003.xls";
		// List<String[]> list = this.readExcel(excelUrl);
		// for (String[] str : list) {
		// for (String s : str) {
		// // System.out.print(s + " | ");
		// }
		// // System.out.println("");
		// }
	}

	/**
	 * 测试举例
	 * 
	 * @return
	 * @throws Exception
	 */
	private List<Map<String, Object>> getDataList() throws Exception {
		/**
		 * 数据集合
		 */
		List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
		// 单行数据
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("index", "001");
		map.put("name", "张三");
		map.put("age", "22");
		map.put("content", "大家好");
		// map.put("date", DateUtil.getSysDate());
		dataList.add(map);
		dataList.add(map);
		dataList.add(map);

		return dataList;
	}

	/**
	 * 测试举例
	 * 
	 * @return
	 */
	private List<String> getHeadList() {
		List<String> headList = new ArrayList<String>();
		headList.add("序号");
		headList.add("名字");
		headList.add("年龄");
		headList.add("出生");
		headList.add("备注");

		return headList;
	}

	/**
	 * 测试举例
	 * 
	 * @return
	 */
	private List<String> getFieldList() {
		List<String> fieldList = new ArrayList<String>();
		fieldList.add("index");
		fieldList.add("name");
		fieldList.add("age");
		fieldList.add("date");
		fieldList.add("content");

		return fieldList;
	}

	/**
	 * @param excel_name
	 *            生成的Excel文件路径+名称
	 * @param headList
	 *            Excel文件Head标题集合
	 * @param field_list
	 *            Excel文件Field标题集合
	 * @param dataList
	 *            Excel文件数据内容部分
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	public static void createExcel(String excel_name, String[] headList, String[] fieldList, List<Map<String, Object>> dataList) throws Exception {
		// 创建新的Excel 工作簿
		@SuppressWarnings("resource")
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 在Excel工作簿中建一工作表，其名为缺省值
		// 如要新建一名为"效益指标"的工作表，其语句为：
		// HSSFSheet sheet = workbook.createSheet("效益指标");
		HSSFSheet sheet = workbook.createSheet();
		// 在索引0的位置创建行（最顶端的行）
		HSSFRow row = sheet.createRow(0);
		// ===============================================================
		for (int i = 0; i < headList.length; i++) {

			// 在索引0的位置创建单元格（左上端）
			HSSFCell cell = row.createCell(i);
			// 定义单元格为字符串类型
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			// 在单元格中输入一些内容
			cell.setCellValue(headList[i]);
		}
		// ===============================================================

		for (int n = 0; n < dataList.size(); n++) {
			// 在索引1的位置创建行（最顶端的行）
			HSSFRow row_value = sheet.createRow(n + 1);
			Map<String, Object> dataMap = dataList.get(n);
			// ===============================================================
			for (int i = 0; i < fieldList.length; i++) {

				// 在索引0的位置创建单元格（左上端）
				HSSFCell cell = row_value.createCell(i);
				// 定义单元格为字符串类型
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				// 在单元格中输入一些内容
				cell.setCellValue(objToString(dataMap.get(fieldList[i])));
			}
			// ===============================================================
		}

		// 新建一输出文件流
		FileOutputStream fOut = new FileOutputStream(excel_name);
		// 把相应的Excel 工作簿存盘
		workbook.write(fOut);
		fOut.flush();
		// 操作结束，关闭文件
		fOut.close();
		// System.out.println("[" + excel_name + "]" + "文件生成...");
	}

	/**
	 * @param excel_name
	 *            生成的Excel文件路径+名称
	 * @param headList
	 *            Excel文件Head标题集合
	 * @param field_list
	 *            Excel文件Field标题集合
	 * @param dataList
	 *            Excel文件数据内容部分
	 * @throws Exception
	 */
	@SuppressWarnings({ "resource", "deprecation" })
	public static void createExcel(String excel_name, List<String> headList, List<String> fieldList, List<Map<String, Object>> dataList) throws Exception {
		// 创建新的Excel 工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 在Excel工作簿中建一工作表，其名为缺省值
		// 如要新建一名为"效益指标"的工作表，其语句为：
		// HSSFSheet sheet = workbook.createSheet("效益指标");
		HSSFSheet sheet = workbook.createSheet();
		// 在索引0的位置创建行（最顶端的行）
		HSSFRow row = sheet.createRow(0);
		// ===============================================================
		for (int i = 0; i < headList.size(); i++) {

			// 在索引0的位置创建单元格（左上端）
			HSSFCell cell = row.createCell(i);
			// 定义单元格为字符串类型
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			// 在单元格中输入一些内容
			cell.setCellValue(headList.get(i));
		}
		// ===============================================================

		for (int n = 0; n < dataList.size(); n++) {
			// 在索引1的位置创建行（最顶端的行）
			HSSFRow row_value = sheet.createRow(n + 1);
			Map<String, Object> dataMap = dataList.get(n);
			// ===============================================================
			for (int i = 0; i < fieldList.size(); i++) {

				// 在索引0的位置创建单元格（左上端）
				HSSFCell cell = row_value.createCell(i);
				// 定义单元格为字符串类型
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				// 在单元格中输入一些内容
				cell.setCellValue(objToString(dataMap.get(fieldList.get(i))));
			}
			// ===============================================================
		}

		// 新建一输出文件流
		FileOutputStream fOut = new FileOutputStream(excel_name);
		// 把相应的Excel 工作簿存盘
		workbook.write(fOut);
		fOut.flush();
		// 操作结束，关闭文件
		fOut.close();
		// System.out.println("[" + excel_name + "]" + "文件生成...");
	}

	/**
	 * @param excel_name
	 *            生成的Excel文件路径+名称
	 * @param headList
	 *            Excel文件Head标题集合
	 * @param field_list
	 *            Excel文件Field标题集合
	 * @param dataList
	 *            Excel文件数据内容部分
	 * @throws HSSFWorkbook
	 */
	@SuppressWarnings("deprecation")
	public static HSSFWorkbook createExcel(List<String> headList, List<String> fieldList, List<Map<String, Object>> dataList) throws Exception {
		// 创建新的Excel 工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 在Excel工作簿中建一工作表，其名为缺省值
		// 如要新建一名为"效益指标"的工作表，其语句为：
		// HSSFSheet sheet = workbook.createSheet("效益指标");
		HSSFSheet sheet = workbook.createSheet();
		// 在索引0的位置创建行（最顶端的行）
		HSSFRow row = sheet.createRow(0);
		// ===============================================================
		for (int i = 0; i < headList.size(); i++) {

			// 在索引0的位置创建单元格（左上端）
			HSSFCell cell = row.createCell(i);
			// 定义单元格为字符串类型
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			// 在单元格中输入一些内容
			cell.setCellValue(headList.get(i));
		}
		// ===============================================================

		for (int n = 0; n < dataList.size(); n++) {
			// 在索引1的位置创建行（最顶端的行）
			HSSFRow row_value = sheet.createRow(n + 1);
			Map<String, Object> dataMap = dataList.get(n);
			// ===============================================================
			for (int i = 0; i < fieldList.size(); i++) {

				// 在索引0的位置创建单元格（左上端）
				HSSFCell cell = row_value.createCell(i);
				// 定义单元格为字符串类型
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				// 在单元格中输入一些内容
				cell.setCellValue(objToString(dataMap.get(fieldList.get(i))));
			}
			// ===============================================================
		}
		return workbook;
	}

	private static String objToString(Object obj) {
		if (obj == null) {
			return "";
		} else {
			if (obj instanceof String) {
				return (String) obj;
			} else if (obj instanceof Date) {
				return null;// DateUtil.dateToString((Date)
							// obj,DateUtil.DATESTYLE_SHORT_EX);
			} else {
				return obj.toString();
			}
		}
	}

	/**
	 * 
	 * @param excel_name
	 *            生成的Excel文件路径+名称
	 * @param headList
	 *            Excel文件Head标题部分
	 * @param valueList
	 *            Excel文件数据内容部分
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	public static void bulidExcel(String excel_name, String[] headList, List<String[]> valueList) throws Exception {
		// 创建新的Excel 工作簿
		@SuppressWarnings("resource")
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 在Excel工作簿中建一工作表，其名为缺省值
		// 如要新建一名为"效益指标"的工作表，其语句为：
		// HSSFSheet sheet = workbook.createSheet("效益指标");
		HSSFSheet sheet = workbook.createSheet();
		// 在索引0的位置创建行（最顶端的行）
		HSSFRow row = sheet.createRow(0);
		// ===============================================================
		for (int i = 0; i < headList.length; i++) {

			// 在索引0的位置创建单元格（左上端）
			HSSFCell cell = row.createCell(i);
			// 定义单元格为字符串类型
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			// 在单元格中输入一些内容
			cell.setCellValue(headList[i]);
		}
		// ===============================================================

		for (int n = 0; n < valueList.size(); n++) {
			// 在索引1的位置创建行（最顶端的行）
			HSSFRow row_value = sheet.createRow(n + 1);
			String[] valueArray = valueList.get(n);
			// ===============================================================
			for (int i = 0; i < valueArray.length; i++) {

				// 在索引0的位置创建单元格（左上端）
				HSSFCell cell = row_value.createCell(i);
				// 定义单元格为字符串类型
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				// 在单元格中输入一些内容
				cell.setCellValue(valueArray[i]);
			}
			// ===============================================================
		}

		// 新建一输出文件流
		FileOutputStream fOut = new FileOutputStream(excel_name);
		// 把相应的Excel 工作簿存盘
		workbook.write(fOut);
		fOut.flush();
		// 操作结束，关闭文件
		fOut.close();
		// System.out.println("[" + excel_name + "]" + "文件生成...");
	}

	/**
	 * 读取 Excel文件内容
	 * 
	 * @param excel_name
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "resource", "deprecation" })
	public static List<String[]> readExcel(String excel_name) throws Exception {
		// 结果集
		List<String[]> list = new ArrayList<String[]>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 0; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow hssfrow = hssfsheet.getRow(j);
			if (hssfrow != null) {
				int col = hssfrow.getPhysicalNumberOfCells();
				// 单行数据
				String[] arrayString = new String[col];
				for (int i = 0; i < col; i++) {
					HSSFCell cell = hssfrow.getCell(i);
					if (cell == null) {
						arrayString[i] = "";
					} else if (cell.getCellType() == 0) {
						// arrayString[i] = new
						// Double(cell.getNumericCellValue()).toString();
						if (HSSFCell.CELL_TYPE_NUMERIC == cell.getCellType()) {
							if (HSSFDateUtil.isCellDateFormatted(cell)) {
								Date d = cell.getDateCellValue();
								DateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
								// DateFormat formater = new
								// SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
								arrayString[i] = formater.format(d);
							} else {
								arrayString[i] = new BigDecimal(cell.getNumericCellValue()).longValue() + "";
							}
						}
					} else {// 如果EXCEL表格中的数据类型为字符串型
						arrayString[i] = cell.getStringCellValue().trim();
					}
				}
				list.add(arrayString);
			}
		}
		return list;
	}

	/**
	 * 读取 Excel文件内容
	 * 
	 * @param excel_name
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "resource", "deprecation" })
	public static List<List<Object>> readExcelByList(String excel_name) throws Exception {
		// 结果集
		List<List<Object>> list = new ArrayList<List<Object>>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 0; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow hssfrow = hssfsheet.getRow(j);
			if (hssfrow != null) {
				int col = hssfrow.getPhysicalNumberOfCells();
				// 单行数据
				List<Object> arrayString = new ArrayList<Object>();
				for (int i = 0; i < col; i++) {
					HSSFCell cell = hssfrow.getCell(i);
					if (cell == null) {
						arrayString.add("");
					} else if (cell.getCellType() == 0) {
						arrayString.add(new Double(cell.getNumericCellValue()).toString());
					} else {// 如果EXCEL表格中的数据类型为字符串型
						arrayString.add(cell.getStringCellValue().trim());
					}
				}
				list.add(arrayString);
			}
		}
		return list;
	}

	/**
	 * 读取基站excel文件内容，并将文件内容获取到后返回
	 * 
	 * @param fileName
	 * @return
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	public static List<StationInfo> readStationExcelByPath(String fileName) throws FileNotFoundException, IOException {
		// 结果集
		List<StationInfo> list = new ArrayList<>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(fileName));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				StationInfo kpi = new StationInfo();
				// 基站编码
				if (row.getCell(0) != null) {
					kpi.setStationCode(String.valueOf(getCellValue(row.getCell(0))));
				}
				// 基站名称
				if (row.getCell(1) != null) {
					kpi.setStationName(String.valueOf(getCellValue(row.getCell(1))));
				}
				// 基站经度
				if (row.getCell(2) != null) {
					kpi.setStationLon(new BigDecimal(String.valueOf(row.getCell(2))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				// 基站纬度
				if (row.getCell(3) != null) {
					kpi.setStationLat(new BigDecimal(String.valueOf(row.getCell(3))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				// 归属网格
				if (row.getCell(4) != null) {
					kpi.setGridCode(String.valueOf(getCellValue(row.getCell(4))));
					list.add(kpi);
				}
			}
		}
		hssfworkbook.close();
		return list;
	}

	/**
	 * 读取 Excel文件内容
	 * 
	 * @param excel_name
	 * @return
	 * @throws Exception
	 */
	public static List<MarketManager> readExcelByPath(String excel_name) throws Exception {
		// 结果集
		List<MarketManager> list = new ArrayList<MarketManager>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				// int col = row.getPhysicalNumberOfCells();
				MarketManager kpi = new MarketManager();
				if (row.getCell(0) != null) {
					kpi.setUserName(String.valueOf(getCellValue(row.getCell(0))));
				}
				if (row.getCell(1) != null) {
					kpi.setUserNumber(String.valueOf(getCellValue(row.getCell(1))));
				}

				list.add(kpi);

			}
		}
		hssfworkbook.close();
		return list;
	}

	public static List<Map<String, Object>> readDirectUserExcelByPath(String excel_name, Boolean flag) throws FileNotFoundException, IOException {
		// 结果集
		List<Map<String, Object>> list = new ArrayList<>();
		Map<String, Object> map = null;
		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				// int col = row.getPhysicalNumberOfCells();
				map = new HashMap<>();
				// 地市编码
				if (row.getCell(0) != null) {
					map.put("city_id", String.valueOf(getCellValue(row.getCell(0))));
				}
				// 地市名称
				if (row.getCell(1) != null) {
					map.put("city_name", String.valueOf(getCellValue(row.getCell(1))));
				}
				// 区县名称
				if (row.getCell(2) != null) {
					map.put("cnty_name", String.valueOf(getCellValue(row.getCell(2))));
				}
				// 区县编码
				if (row.getCell(3) != null) {
					map.put("cnty_id", String.valueOf(getCellValue(row.getCell(3))));
				}
				// 网格名称
				if (row.getCell(4) != null) {
					map.put("grid_name", String.valueOf(getCellValue(row.getCell(4))));
				}
				// 网格编码
				if (row.getCell(5) != null) {
					map.put("grid_code", String.valueOf(getCellValue(row.getCell(5))));
				}
				// 工号编码
				if (row.getCell(6) != null) {
					map.put("office_id", String.valueOf(getCellValue(row.getCell(6))));
				}
				// 工号姓名
				if (row.getCell(7) != null) {
					map.put("name", String.valueOf(getCellValue(row.getCell(7))));
				}
				// 归属渠道名称
				if (row.getCell(8) != null) {
					map.put("belong_chnl_name", String.valueOf(getCellValue(row.getCell(8))));
				}
				// 渠道8位编码
				if (row.getCell(9) != null) {
					map.put("belong_chnl_code", String.valueOf(getCellValue(row.getCell(9))));
				}
				// 归属渠道经度
				if (row.getCell(10) != null) {
					map.put("lng", new BigDecimal(String.valueOf(row.getCell(10))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				// 归属渠道纬度
				if (row.getCell(11) != null) {
					map.put("lat", new BigDecimal(String.valueOf(row.getCell(11))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				// 身份证号码
				if (row.getCell(12) != null) {
					map.put("cust_id", String.valueOf(getCellValue(row.getCell(12))));
				}
				// 性别
				if (row.getCell(13) != null) {
					map.put("sex", String.valueOf(getCellValue(row.getCell(13))));
				}
				// 参加移动直销工作时间
				if (row.getCell(14) != null) {
					map.put("work_date", String.valueOf(getCellValue(row.getCell(14))));
				}
				// 移动电话
				if (row.getCell(15) != null) {
					map.put("phone", String.valueOf(getCellValue(row.getCell(15))));
				}
				// 直销员工号状态
				if (row.getCell(16) != null) {
					map.put("status", String.valueOf(getCellValue(row.getCell(16))));
				}
				list.add(map);
			}
		}
		hssfworkbook.close();
		return list;
	}

	/**
	 * 读取 Excel文件内容
	 * 
	 * @param excel_name
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("resource")
	public static List<DirectSaleUserInfo> readExcelByPath(String excel_name, Boolean flag) throws Exception {
		// 结果集
		List<DirectSaleUserInfo> list = new ArrayList<DirectSaleUserInfo>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				// int col = row.getPhysicalNumberOfCells();
				DirectSaleUserInfo kpi = new DirectSaleUserInfo();
				if (row.getCell(0) != null) {
					kpi.setUserName(String.valueOf(getCellValue(row.getCell(0))));
				}
				if (row.getCell(1) != null) {
					kpi.setUid(String.valueOf(getCellValue(row.getCell(1))));
				}

				list.add(kpi);

			}
		}
		return list;
	}

	/**
	 * 读取 Excel文件内容 zzj
	 * 
	 * @param excel_name
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("resource")
	public static List<EvaluationKpi> readExcelByPath(String excel_name, String orgId) throws Exception {
		// 结果集
		List<EvaluationKpi> list = new ArrayList<EvaluationKpi>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				// int col = row.getPhysicalNumberOfCells();
				EvaluationKpi kpi = new EvaluationKpi();
				String id = UUID.randomUUID().toString().replace("-", "").toLowerCase();
				kpi.setKpiId(id);
				kpi.setOrgId(orgId);
				kpi.setStatus("A");
				if (row.getCell(0) != null) {
					kpi.setKpiType(String.valueOf(getCellValue(row.getCell(0))));
				}
				if (row.getCell(1) != null) {
					kpi.setKpiName(String.valueOf(getCellValue(row.getCell(1))));
				}
				if (row.getCell(2) != null) {
					kpi.setKpiWeight(String.valueOf(getCellValue(row.getCell(2))));
				}
				if (row.getCell(3) != null) {
					kpi.setKpiDefine(String.valueOf(getCellValue(row.getCell(3))));
				}
				if (row.getCell(4) != null) {
					String date = String.valueOf(getCellValue(row.getCell(4)));
					String datetype = "";
					if ("年".equals(date)) {
						datetype = "year";
					}
					if ("月".equals(date)) {
						datetype = "month";
					}
					if ("季度".equals(date)) {
						datetype = "quarter";
					}
					kpi.setCycleType(datetype);
				}
				if (row.getCell(5) != null) {
					kpi.setKpiCode(String.valueOf(getCellValue(row.getCell(5))));
				}
				if (row.getCell(6) != null) {
					kpi.setOrgId(String.valueOf(getCellValue(row.getCell(6))));
				}
				if (row.getCell(7) != null) {
					kpi.setTargetValue(String.valueOf(getCellValue(row.getCell(7))));
				}
				list.add(kpi);

			}
		}
		return list;
	}

	/**
	 * 网格与基站
	 * 
	 * @param excel_name
	 * @param orgId
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("resource")
	public static List<OrgGridStation> readStationInfoExcelByPath(String excel_name, String orgId) throws Exception {
		// 结果集
		List<OrgGridStation> list = new ArrayList<OrgGridStation>();

		// HSSFWorkbook hssfworkbook = new HSSFWorkbook(new
		// FileInputStream(excel_name));
		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));
		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				// int col = row.getPhysicalNumberOfCells();
				OrgGridStation kpi = new OrgGridStation();
				kpi.setAreaId(orgId);
				kpi.setStatus("A");
				if (row.getCell(0) != null) {
					kpi.setAreaName(String.valueOf(getCellValue(row.getCell(0))));
				}
				if (row.getCell(1) != null) {
					kpi.setGridName(String.valueOf(getCellValue(row.getCell(1))));
				}
				if (row.getCell(2) != null) {
					kpi.setStationCode(String.valueOf(getCellValue(row.getCell(2))));
				}
				if (row.getCell(3) != null) {
					kpi.setStationName(String.valueOf(getCellValue(row.getCell(3))));
				}
				list.add(kpi);

			}
		}
		return list;
	}

	/**
	 * 描述：对表格中数值进行格式化
	 *
	 * @param cell
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static Object getCellValue(Cell cell) {
		Object value = null;
		DecimalFormat df = new DecimalFormat("0"); // 格式化number String字符
		SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd"); // 日期格式化
		DecimalFormat df2 = new DecimalFormat("0.00"); // 格式化数字

		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING:
			value = cell.getRichStringCellValue().getString();
			break;
		case Cell.CELL_TYPE_NUMERIC:
			if ("General".equals(cell.getCellStyle().getDataFormatString())) {
				value = df.format(cell.getNumericCellValue());
			} else if ("m/d/yy".equals(cell.getCellStyle().getDataFormatString())) {
				value = sdf.format(cell.getDateCellValue());
			} else {
				value = df2.format(cell.getNumericCellValue());
			}
			break;
		case Cell.CELL_TYPE_BOOLEAN:
			value = cell.getBooleanCellValue();
			break;
		case Cell.CELL_TYPE_BLANK:
			value = "";
			break;
		default:
			break;
		}
		return value;
	}

	/**
	 * 
	 * @param cell
	 *            一个单元格的对象
	 * @return 返回该单元格相应的类型的值
	 */
	@SuppressWarnings("deprecation")
	public static Object getRightTypeCell(Cell cell) {

		Object object = null;
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING: {
			object = cell.getStringCellValue();
			break;
		}
		case Cell.CELL_TYPE_NUMERIC: {
			cell.setCellType(Cell.CELL_TYPE_NUMERIC);
			object = cell.getNumericCellValue();
			break;
		}

		case Cell.CELL_TYPE_FORMULA: {
			cell.setCellType(Cell.CELL_TYPE_NUMERIC);
			object = cell.getNumericCellValue();
			break;
		}

		case Cell.CELL_TYPE_BLANK: {
			cell.setCellType(Cell.CELL_TYPE_BLANK);
			object = cell.getStringCellValue();
			break;
		}
		}
		return object;
	}

	/**
	 * 读取 Excel文件内容
	 * 
	 * @param excel_name
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "resource", "deprecation" })
	public static List<List<Object>> readExcelByInputStream(InputStream inputstream) throws Exception {
		// 结果集
		List<List<Object>> list = new ArrayList<List<Object>>();

		HSSFWorkbook hssfworkbook = new HSSFWorkbook(inputstream);

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数

		// //System.out.println("excel行数：
		// "+hssfsheet.getPhysicalNumberOfRows());
		for (int j = 0; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow hssfrow = hssfsheet.getRow(j);
			if (hssfrow != null) {
				int col = hssfrow.getPhysicalNumberOfCells();
				// 单行数据
				List<Object> arrayString = new ArrayList<Object>();
				for (int i = 0; i < col; i++) {
					HSSFCell cell = hssfrow.getCell(i);
					if (cell == null) {
						arrayString.add("");
					} else if (cell.getCellType() == 0) {
						arrayString.add(new Double(cell.getNumericCellValue()).toString());
					} else {// 如果EXCEL表格中的数据类型为字符串型
						arrayString.add(cell.getStringCellValue().trim());
					}
				}
				list.add(arrayString);
			}
		}
		return list;
	}

	/**
	 * 导入 excel
	 * 
	 * @param file
	 * @param pojoClass
	 * @param pattern
	 * @return
	 */
	@SuppressWarnings({ "resource", "deprecation" })
	public static Collection<Object> importExcel(File file, Class<?> pojoClass) throws Exception {
		Collection<Object> dist = new ArrayList<>();
		// 得到目标目标类的所有的字段列表
		Field filed[] = pojoClass.getDeclaredFields();
		// 将所有标有Annotation的字段，也就是允许导入数据的字段,放入到一个map中
		Map<String, Method> fieldSetMap = new HashMap<String, Method>();
		Map<String, Method> fieldSetConvertMap = new HashMap<String, Method>();
		// 循环读取所有字段
		for (int i = 0; i < filed.length; i++) {
			Field f = filed[i];
			// 得到单个字段上的Annotation
			Excel excel = f.getAnnotation(Excel.class);
			// 如果标识了Annotationd的话
			if (excel != null) {
				// 构造设置了Annotation的字段的Setter方法
				String fieldname = f.getName();
				String setMethodName = "set" + fieldname.substring(0, 1).toUpperCase() + fieldname.substring(1);
				// 构造调用的method，
				Method setMethod = pojoClass.getMethod(setMethodName, new Class[] { f.getType() });
				// 将这个method以Annotaion的名字为key来存入。
				// 对于重名将导致 覆盖 失败，对于此处的限制需要
				fieldSetMap.put(excel.exportName(), setMethod);
				if (excel.importConvertSign()) {
					StringBuffer setConvertMethodName = new StringBuffer("set");
					setConvertMethodName.append(fieldname.substring(0, 1).toUpperCase());
					setConvertMethodName.append(fieldname.substring(1));
					setConvertMethodName.append("Convert");
					Method getConvertMethod = pojoClass.getMethod(setConvertMethodName.toString(), new Class[] { String.class });
					fieldSetConvertMap.put(excel.exportName(), getConvertMethod);
				}
			}
		}
		// 将传入的File构造为FileInputStream;
		FileInputStream in = new FileInputStream(file);
		// // 得到工作表
		HSSFWorkbook book = new HSSFWorkbook(in);
		// // 得到第一页
		HSSFSheet sheet = book.getSheetAt(0);
		// // 得到第一面的所有行
		Iterator<Row> row = sheet.rowIterator();
		// 得到第一行，也就是标题行
		Row title = row.next();
		// 得到第一行的所有列
		Iterator<Cell> cellTitle = title.cellIterator();
		// 将标题的文字内容放入到一个map中。
		Map<Integer, String> titlemap = new HashMap<>();
		// 从标题第一列开始
		// 循环标题所有的列
		while (cellTitle.hasNext()) {
			Cell cell = cellTitle.next();
			String value = cell.getStringCellValue();
			titlemap.put(cell.getColumnIndex(), value);
		}
		// 用来格式化日期的DateFormat
		// SimpleDateFormat sf;
		while (row.hasNext()) {
			// 标题下的第一行
			Row rown = row.next();
			// 行的所有列
			Iterator<Cell> cellbody = rown.cellIterator();
			// 得到传入类的实例
			Object tObject = pojoClass.newInstance();
			// 遍历一行的列
			while (cellbody.hasNext()) {
				Cell cell = cellbody.next();
				// 这里得到此列的对应的标题
				String titleString = (String) titlemap.get(cell.getColumnIndex());
				// 如果这一列的标题和类中的某一列的Annotation相同，那么则调用此类的的set方法，进行设值
				if (fieldSetMap.containsKey(titleString)) {
					Method setMethod = (Method) fieldSetMap.get(titleString);
					// 得到setter方法的参数
					Type[] ts = setMethod.getGenericParameterTypes();
					// 只要一个参数
					String xclass = ts[0].toString();
					// 判断参数类型
					if (fieldSetConvertMap.containsKey(titleString)) {
						fieldSetConvertMap.get(titleString).invoke(tObject, cell.getStringCellValue());
					} else {
						if (xclass.equals("class java.lang.String")) {
							// 先设置Cell的类型，然后就可以把纯数字作为String类型读进来了：
							cell.setCellType(Cell.CELL_TYPE_STRING);
							setMethod.invoke(tObject, cell.getStringCellValue());
						} else if (xclass.equals("class java.util.Date")) {
							setMethod.invoke(tObject, cell.getDateCellValue());
						} else if (xclass.equals("class java.lang.Boolean")) {
							setMethod.invoke(tObject, cell.getBooleanCellValue());
						} else if (xclass.equals("class java.lang.Integer")) {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							// String tmp = cell.getStringCellValue();
							setMethod.invoke(tObject, new Integer(cell.getStringCellValue()));
						} else if (xclass.equals("class java.lang.Long")) {
							setMethod.invoke(tObject, new Long(cell.getStringCellValue()));
						} else if (xclass.equals("class java.math.BigDecimal")) {
							setMethod.invoke(tObject, new BigDecimal(cell.getNumericCellValue()));
						} else if (xclass.equals("class java.lang.Double")) {
							setMethod.invoke(tObject, new Double(cell.getNumericCellValue()));
						}
					}
				}
			}
			dist.add(tObject);
		}
		return dist;
	}

	/**
	 * 
	 * Description:</br>
	 * Author:yanping.shi</br>
	 * 
	 * @param inputstream
	 * @param pojoClass
	 * @return
	 */
	@SuppressWarnings({ "resource", "deprecation" })
	public static Collection<Object> importExcelByIs(InputStream inputstream, Class<?> pojoClass) throws Exception {
		Collection<Object> dist = new ArrayList<>();
		// 得到目标目标类的所有的字段列表
		Field filed[] = pojoClass.getDeclaredFields();
		// 将所有标有Annotation的字段，也就是允许导入数据的字段,放入到一个map中
		Map<String, Method> fieldSetMap = new HashMap<String, Method>();
		Map<String, Method> fieldSetConvertMap = new HashMap<String, Method>();
		// 循环读取所有字段
		for (int i = 0; i < filed.length; i++) {
			Field f = filed[i];
			// 得到单个字段上的Annotation
			Excel excel = f.getAnnotation(Excel.class);
			// 如果标识了Annotationd的话
			if (excel != null) {
				// 构造设置了Annotation的字段的Setter方法
				String fieldname = f.getName();
				String setMethodName = "set" + fieldname.substring(0, 1).toUpperCase() + fieldname.substring(1);
				// 构造调用的method，
				Method setMethod = pojoClass.getMethod(setMethodName, new Class[] { f.getType() });
				// 将这个method以Annotaion的名字为key来存入。
				// 对于重名将导致 覆盖 失败，对于此处的限制需要
				fieldSetMap.put(excel.exportName(), setMethod);
				if (excel.importConvertSign()) {
					StringBuffer setConvertMethodName = new StringBuffer("set");
					setConvertMethodName.append(fieldname.substring(0, 1).toUpperCase());
					setConvertMethodName.append(fieldname.substring(1));
					setConvertMethodName.append("Convert");
					Method getConvertMethod = pojoClass.getMethod(setConvertMethodName.toString(), new Class[] { String.class });
					fieldSetConvertMap.put(excel.exportName(), getConvertMethod);
				}
			}
		}
		// 将传入的File构造为FileInputStream;
		// // 得到工作表
		HSSFWorkbook book = new HSSFWorkbook(inputstream);
		// // 得到第一页
		HSSFSheet sheet = book.getSheetAt(0);
		// // 得到第一面的所有行
		Iterator<Row> row = sheet.rowIterator();
		// 得到第一行，也就是标题行
		Row title = row.next();
		// 得到第一行的所有列
		Iterator<Cell> cellTitle = title.cellIterator();
		// 将标题的文字内容放入到一个map中。
		Map<Integer, String> titlemap = new HashMap<>();
		// 从标题第一列开始
		// 循环标题所有的列
		while (cellTitle.hasNext()) {
			Cell cell = cellTitle.next();
			String value = cell.getStringCellValue();
			titlemap.put(cell.getColumnIndex(), value);
		}
		// 用来格式化日期的DateFormat
		// SimpleDateFormat sf;
		while (row.hasNext()) {
			// 标题下的第一行
			Row rown = row.next();
			// 行的所有列
			Iterator<Cell> cellbody = rown.cellIterator();
			// 得到传入类的实例
			Object tObject = pojoClass.newInstance();
			// 遍历一行的列
			while (cellbody.hasNext()) {
				Cell cell = cellbody.next();
				// 这里得到此列的对应的标题
				String titleString = (String) titlemap.get(cell.getColumnIndex());
				// 如果这一列的标题和类中的某一列的Annotation相同，那么则调用此类的的set方法，进行设值
				if (fieldSetMap.containsKey(titleString)) {
					Method setMethod = (Method) fieldSetMap.get(titleString);
					// 得到setter方法的参数
					Type[] ts = setMethod.getGenericParameterTypes();
					// 只要一个参数
					String xclass = ts[0].toString();
					// 判断参数类型
					if (fieldSetConvertMap.containsKey(titleString)) {
						fieldSetConvertMap.get(titleString).invoke(tObject, cell.getStringCellValue());
					} else {
						if (xclass.equals("class java.lang.String")) {
							// 先设置Cell的类型，然后就可以把纯数字作为String类型读进来了：
							cell.setCellType(Cell.CELL_TYPE_STRING);
							String value = cell.getStringCellValue();
							if (value != null && !"".equals(value.trim())) {
								setMethod.invoke(tObject, value);
							}
						} else if (xclass.equals("class java.util.Date")) {
							setMethod.invoke(tObject, cell.getDateCellValue());
						} else if (xclass.equals("class java.lang.Boolean")) {
							setMethod.invoke(tObject, cell.getBooleanCellValue());
						} else if (xclass.equals("class java.lang.Integer")) {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							// String tmp = cell.getStringCellValue();
							setMethod.invoke(tObject, new Integer(cell.getStringCellValue()));
						} else if (xclass.equals("class java.lang.Long")) {
							setMethod.invoke(tObject, new Long(cell.getStringCellValue()));
						} else if (xclass.equals("class java.math.BigDecimal")) {
							setMethod.invoke(tObject, new BigDecimal(cell.getNumericCellValue()));
						} else if (xclass.equals("class java.lang.Double")) {
							setMethod.invoke(tObject, new Double(cell.getNumericCellValue()));
						}
					}
				}
			}
			dist.add(tObject);
		}
		return dist;
	}

	/**
	 * CD类客户经理结果集 @Title readDirectUserExcelByPath @Author hubinbin @return
	 * List<Map<String,Object>> @throws
	 */
	public static List<Map<String, Object>> readGovBusUserExcelByPath(String excel_name, Boolean flag) throws FileNotFoundException, IOException {
		// 结果集
		List<Map<String, Object>> list = new ArrayList<>();
		Map<String, Object> map = null;
		HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(excel_name));

		// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
		HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);

		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				// int col = row.getPhysicalNumberOfCells();
				map = new HashMap<>();
				// 地市名称
				if (row.getCell(0) != null) {
					map.put("city_name", String.valueOf(getCellValue(row.getCell(0))));
				}
				// 区县名称
				if (row.getCell(1) != null) {
					map.put("cnty_name", String.valueOf(getCellValue(row.getCell(1))));
				}
				// 区县编码
				if (row.getCell(2) != null) {
					map.put("cnty_id", String.valueOf(getCellValue(row.getCell(2))));
				}
				// 网格名称
				if (row.getCell(3) != null) {
					map.put("grid_name", String.valueOf(getCellValue(row.getCell(3))));
				}
				// 网格编码
				if (row.getCell(4) != null) {
					map.put("grid_code", String.valueOf(getCellValue(row.getCell(4))));
				}
				// CD类政企客户名称
				if (row.getCell(5) != null) {
					map.put("gc_name", String.valueOf(getCellValue(row.getCell(5))));
				}
				// CD类政企客户编码
				if (row.getCell(6) != null) {
					map.put("gc_code", String.valueOf(getCellValue(row.getCell(6))));
				}
				// 详细地址
				if (row.getCell(7) != null) {
					map.put("addr", String.valueOf(getCellValue(row.getCell(7))));
				}
				// 联系人
				if (row.getCell(8) != null) {
					map.put("manager", String.valueOf(getCellValue(row.getCell(8))));
				}
				// 联系电话
				if (row.getCell(9) != null) {
					map.put("phone", String.valueOf(getCellValue(row.getCell(9))));
				}
				// 经度
				if (row.getCell(10) != null) {
					map.put("lon", new BigDecimal(String.valueOf(row.getCell(10))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				// 纬度
				if (row.getCell(11) != null) {
					map.put("lat", new BigDecimal(String.valueOf(row.getCell(11))).setScale(6, BigDecimal.ROUND_HALF_UP));
				}
				list.add(map);
			}
		}
		hssfworkbook.close();
		return list;
	}

}
