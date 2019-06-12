package com.bonc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.utils.JedisClientPool;
import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.mapper.MapIndexMapper;
import com.bonc.map.service.GridCommonService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * 
 * @FileName StationJunitTest.java
 * @Author xiaogaoxiang
 * @At 2018年12月4日 下午6:03:27
 * @Desc Junit导入网格信息
 */
@ContextConfiguration("/applicationContext.xml")
public class GridInfoJunitTest extends AbstractTransactionalJUnit4SpringContextTests {

	@Autowired
	private MapIndexMapper mapIndexMapper;

	@Autowired
	private GridCommonService gridCommonService;

	@Autowired
	private JedisClientPool jedisClientPool;

	@Test
	public void testRedis() {
		jedisClientPool.set("hello", "111123123");
		String result = jedisClientPool.get("hello");
		System.out.println(result);
	}

	@Test
	@Rollback(false)
	public void updateGeoInfo() throws Exception {
		gridCommonService.updateGeoInfo();
		// gridCommonService.updateGeoSingleCity();
	}

	public void testLength() {
	}

	@Test
	@Rollback(true)
	public void insertGridInfo() throws IOException {
		File file = new File("D://grid.json");
		StringBuilder result = new StringBuilder();
		try {
			// 构造一个BufferedReader类来读取文件
			BufferedReader br = new BufferedReader(new FileReader(file));
			String s = null;
			// 使用readLine方法，一次读一行
			while ((s = br.readLine()) != null) {
				result.append(System.lineSeparator() + s);
			}
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 初始化Google的json对象
		Gson gson = new Gson();
		// 解析json，封装为Map集合对象
		List<Map<String, Object>> mapList = gson.fromJson(result.toString(), new TypeToken<List<Map<String, Object>>>() {
		}.getType());
		List<StationInfo> stationInfoList = new ArrayList<>();
		StationInfo stationInfo = null;
		// 遍历集合，将json对象封装到持久化对象集合中
		for (Map<String, Object> map : mapList) {
			// 解析每一个map对象成为一个String类型
			String s = gson.toJson(map);
			// 解析json对象
			JSONObject job = JSONObject.parseObject(s);
			// 获取json串中properties的json串
			JSONObject job1 = job.getJSONObject("properties");
			// 获取json串中name（网格名称）字段
			String name = job1.get("name").toString();
			// 获取json串中area（区域字段）字段
			String area = job1.get("area").toString();
			// 获取json串中cp（中心经纬度）字段，格式为：[lng, lat]
			String[] cp = job1.get("cp").toString().split(",");
			// 获取中心经度
			String cpLng = cp[0].substring(1, cp[0].length());
			// 获取中心纬度
			String cpLat = cp[1].substring(0, cp[1].length() - 1);
			// 获取json串中geometry的json串
			JSONObject job3 = job.getJSONObject("geometry");
			// 获取经纬度集合json串
			JSONArray jar = job3.getJSONArray("coordinates");
			// 初始化stationInfo对象
			stationInfo = new StationInfo();
			// 获取中心经度
			stationInfo.setCpLng(Double.valueOf(cpLng));
			// 获取中心纬度
			stationInfo.setCpLat(Double.valueOf(cpLat));
			// 获取网格名称
			stationInfo.setGridName(name);
			// 获取所属组织名称
			stationInfo.setAreaName(area);
			// 获取网格经纬度集合
			stationInfo.setShape(jar.toString().substring(2, jar.toString().length() - 2));
			// 存储到网格集合对象中
			stationInfoList.add(stationInfo);
		}
		Map<String, Object> mapInfo = null;
		// 拆分经纬度json串，获取最大最小经纬度
		for (StationInfo si : stationInfoList) {
			// 将每个网格的shape进行格式处理
			String[] ss = si.getShape().split(",");
			int i = 0;
			// 初始化shape字符串变量
			StringBuilder shape = new StringBuilder("[");
			// 封装网格边界shape经纬度
			for (String s : ss) {
				// 偶数个，则为经度
				if ((i & (2 - 1)) == 0) {
					shape.append("{\"lng\":" + s.substring(1, s.length()) + ",");
				}
				// 奇数个，则为纬度
				else {
					if (i != ss.length - 1) {
						shape.append("\"lat\":" + s.substring(0, s.length() - 1) + "},");
					} else {
						shape.append("\"lat\":" + s.substring(0, s.length() - 1) + "}]");
					}
				}
				i++;
				si.setShape(shape.toString());
			}
			// 获取最大经纬度
			mapInfo = new HashMap<String, Object>();
			setShapeMM(si.getShape(), mapInfo);
			// 最大经纬度
			si.setMaxLng(Double.valueOf(mapInfo.get("maxlng").toString()));
			// 最小经度
			si.setMinLng(Double.valueOf(mapInfo.get("minlng").toString()));
			// 最大纬度
			si.setMaxLat(Double.valueOf(mapInfo.get("maxlat").toString()));
			// 最小纬度
			si.setMinLat(Double.valueOf(mapInfo.get("minlat").toString()));
			// 颜色
			si.setColor("#EECFA1");
		}
		exportStationExcel(stationInfoList, new File("D://token.xls"));
		// 遍历集合，将网格数据存储到GRID_DETAIL 和 SYS_ORG表中
		for (StationInfo si : stationInfoList) {
			Map<String, Object> gridMap = new HashMap<>();
			// 生成ID，根据UUID方式生成
			String orgId = UUID.randomUUID().toString().replace("-", "").toLowerCase();
			gridMap.put("typeId", "1");
			gridMap.put("orgId", orgId);
			gridMap.put("shape", si.getShape());
			gridMap.put("maxlng", si.getMaxLng());
			gridMap.put("minlng", si.getMinLng());
			gridMap.put("maxlat", si.getMaxLat());
			gridMap.put("minlat", si.getMinLat());
			gridMap.put("cplng", si.getCpLng());
			gridMap.put("cplat", si.getCpLat());
			gridMap.put("color", si.getColor());
			Map<String, Object> orgMap = new HashMap<>();
			orgMap.put("orgId", orgId);
			orgMap.put("pid", si.getAreaName());
			orgMap.put("name", si.getGridName());
			orgMap.put("displayOrder", 1001);
			orgMap.put("orgLevel", 4);
			orgMap.put("treeCode", "");
			// 存储网格信息
			mapIndexMapper.insertMapInfo(gridMap);
			// 存储所属组织信息
			mapIndexMapper.insertMapOrg(orgMap);
		}
		System.out.println("操作完成.........");
	}

	private void setShapeMM(String shape, Map<String, Object> info) {
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

	public void getStationJsonInfo() throws IOException {
		File file = new File("D://grid.json");
		StringBuilder result = new StringBuilder();
		try {
			BufferedReader br = new BufferedReader(new FileReader(file));// 构造一个BufferedReader类来读取文件
			String s = null;
			while ((s = br.readLine()) != null) {// 使用readLine方法，一次读一行
				result.append(System.lineSeparator() + s);
			}
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		Gson gson = new Gson();
		List<Map<String, Object>> mapList = gson.fromJson(result.toString(), new TypeToken<List<Map<String, Object>>>() {
		}.getType());
		List<StationInfo> stationInfoList = new ArrayList<>();
		StationInfo stationInfo = null;
		for (Map<String, Object> map : mapList) {
			String s = gson.toJson(map);
			JSONObject job = JSONObject.parseObject(s);
			JSONObject job1 = job.getJSONObject("properties");
			String name = job1.get("name").toString();
			String[] cp = job1.get("cp").toString().split(",");
			String cpLng = cp[0].substring(1, cp[0].length());
			String cpLat = cp[1].substring(0, cp[1].length() - 1);
			JSONObject job3 = job.getJSONObject("geometry");
			JSONArray jar = job3.getJSONArray("coordinates");
			stationInfo = new StationInfo();
			stationInfo.setCpLng(Double.valueOf(cpLng));
			stationInfo.setCpLat(Double.valueOf(cpLat));
			stationInfo.setGridName(name);
			stationInfo.setShape(jar.toString().substring(2, jar.toString().length() - 2));
			stationInfoList.add(stationInfo);
		}
		Map<String, Object> mapInfo = null;
		for (StationInfo si : stationInfoList) {
			String[] ss = si.getShape().split(",");
			int i = 0;
			StringBuilder shape = new StringBuilder("[");
			for (String s : ss) {
				// 偶数个，则为经度
				if ((i & (2 - 1)) == 0) {
					shape.append("{\"lng\":" + s.substring(1, s.length()) + ",");
				}
				// 奇数个，则为纬度
				else {
					if (i != ss.length - 1) {
						shape.append("\"lat\":" + s.substring(0, s.length() - 1) + "},");
					} else {
						shape.append("\"lat\":" + s.substring(0, s.length() - 1) + "}]");
					}
				}
				i++;
				si.setShape(shape.toString());
			}
			// 获取最大经纬度
			mapInfo = new HashMap<String, Object>();
			setShapeMM(si.getShape(), mapInfo);
			// 最大经纬度
			si.setMaxLng(Double.valueOf(mapInfo.get("maxlng").toString()));
			// 最小经度
			si.setMinLng(Double.valueOf(mapInfo.get("minlng").toString()));
			// 最大纬度
			si.setMaxLat(Double.valueOf(mapInfo.get("maxlat").toString()));
			// 最小纬度
			si.setMinLat(Double.valueOf(mapInfo.get("minlat").toString()));
			// 颜色
			si.setColor("#EECFA1");
		}
		FileWriter fw = null;
		for (StationInfo si : stationInfoList) {
			try {
				fw = new FileWriter("D://token.txt", true);
				fw.write("\r\n" + si.getGridName() + "\r\n");
				fw.write(si.getShape() + "\r\n");
				fw.write(si.getMaxLng() + "\r\n");
				fw.write(si.getMinLng() + "\r\n");
				fw.write(si.getMaxLat() + "\r\n");
				fw.write(si.getMinLat() + "\r\n");
				fw.write(si.getCpLng() + "\r\n");
				fw.write(si.getCpLat() + "\r\n");
				fw.write(si.getColor() + "\r\n");
				fw.flush();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				fw.close();
			}
		}
		exportStationExcel(stationInfoList, new File("D://taken.xlsx"));
		System.out.println("文件写入成功");
	}

	private HSSFCellStyle createCellStyle(HSSFWorkbook workbook, short fontSize) {
		HSSFCellStyle style = workbook.createCellStyle();
		// 创建字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints(fontSize);
		// 加载字体
		style.setFont(font);
		return style;
	}

	public void exportStationExcel(List<StationInfo> empList, File file) {
		try {
			String[] titles = { "网格名称", "网格SHAP", "最大经度", "最小经度", "最大纬度", "最小纬度", "中心经度", "中心纬度", "颜色" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length-1);// 起始行号，结束行号，起始列号，结束列号
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

	/**
	 * 
	 * @FileName ExcelUtil.java
	 * @Author xiaogaoxiang
	 * @At 2018年11月21日 下午11:27:54
	 * @Desc 定义点类
	 */
	private class Point {
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
	@SuppressWarnings("unused")
	private class Melkman {
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

	public static String readGridExcelByJson(File fileName) {
		StringBuilder result = new StringBuilder();
		try {
			BufferedReader br = new BufferedReader(new FileReader(fileName));// 构造一个BufferedReader类来读取文件
			String s = null;
			while ((s = br.readLine()) != null) {// 使用readLine方法，一次读一行
				result.append(System.lineSeparator() + s);
			}
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result.toString();
	}

	public static Pointss[] readGridExcelByPath(String fileName) throws FileNotFoundException, IOException {
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
					kpi.setStationLon(new BigDecimal(String.valueOf(row.getCell(0))));
				}
				// 基站纬度
				if (row.getCell(1) != null) {
					kpi.setStationLat(new BigDecimal(String.valueOf(row.getCell(1))));
				}
				// 基站名称
				if (row.getCell(2) != null) {
					kpi.setGridName(String.valueOf(getCellValue(row.getCell(2))));
					list.add(kpi);
				}
			}
		}
		hssfworkbook.close();
		Pointss[] pointss = new Pointss[list.size()];
		int i = 0;
		for (StationInfo si : list) {
			if (si.getGridName().equals("中和镇网格")) {
				Pointss p = new Pointss();
				p.setX(si.getStationLon());
				p.setY(si.getStationLat());
				pointss[i] = p;
				i++;
			}
		}
		Pointss[] pointssAll = new Pointss[i];
		int count = 0;
		for (Pointss p : pointss) {
			if (null != p && p.getX().compareTo(new BigDecimal(0)) == 1) {
				pointssAll[count] = p;
				count++;
			}
		}
		return pointssAll;
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

	/** Excel 文件要存放的位置 */
	public static String outputFile = "/zlxx/excel_demo.xls";

	public static class Pointss {
		private BigDecimal x;
		private BigDecimal y;

		public BigDecimal getX() {
			return x;
		}

		public void setX(BigDecimal x) {
			this.x = x;
		}

		public BigDecimal getY() {
			return y;
		}

		public void setY(BigDecimal y) {
			this.y = y;
		}

	}

	// 若点a大于点b,即点a在点b顺时针方向,返回true,否则返回false
	public Boolean PointCmp(Pointss a, Pointss b, Pointss center) {
		if (a.getX().compareTo(new BigDecimal(0)) >= 1 && b.getX().compareTo(new BigDecimal(0)) == -1)
			return true;
		if (a.getX().compareTo(new BigDecimal(0)) == 0 && b.getX().compareTo(new BigDecimal(0)) == 0)
			return a.getY().compareTo(b.getY()) == 1;
		// 向量OA和向量OB的叉积
		BigDecimal det = ((a.getX().subtract(center.getX())).multiply((b.getY().subtract(center.getY()))))
				.subtract((b.getX().subtract(center.getX())).multiply((a.getY().subtract(center.getY()))));
		if (det.compareTo(new BigDecimal(0)) < 0)
			return true;
		if (det.compareTo(new BigDecimal(0)) == 1)
			return false;
		// 向量OA和向量OB共线，以距离判断大小
		BigDecimal d1 = (a.getX().subtract(center.getX())).multiply((a.getX().subtract(center.getX())))
				.add((a.getY().subtract(center.getY())).multiply((a.getY().subtract(center.getY()))));
		BigDecimal d2 = (b.getX().subtract(center.getX())).multiply((b.getX().subtract(center.getY())))
				.add((b.getY().subtract(center.getY())).multiply((b.getY().subtract(center.getY()))));
		return d1.compareTo(d2) == 1;
	}

	public void ClockwiseSortPoints(Pointss[] stationInfoList) throws IOException {
		// 计算中心
		Pointss center = new Pointss();
		BigDecimal x = new BigDecimal(0), y = new BigDecimal(0);
		for (int i = 0; i < stationInfoList.length; i++) {
			x = x.add(stationInfoList[i].getX());
			y = y.add(stationInfoList[i].getY());
		}
		center.setX(x.divide(new BigDecimal(stationInfoList.length), 11, RoundingMode.HALF_UP));
		center.setY(y.divide(new BigDecimal(stationInfoList.length), 11, RoundingMode.HALF_UP));
		// 冒泡排序
		for (int i = 0; i < stationInfoList.length - 1; i++) {
			for (int j = 0; j < stationInfoList.length - i - 1; j++) {
				if (PointCmp(stationInfoList[j + 1], stationInfoList[j], center)) {
					Pointss tmp = stationInfoList[j];
					stationInfoList[j] = stationInfoList[j + 1];
					stationInfoList[j + 1] = tmp;
				}
			}
		}
		FileWriter fw = null;
		StringBuffer shapeInfo = new StringBuffer("[");
		for (Pointss p : stationInfoList) {
			shapeInfo.append("{\"lng\":" + p.getX() + ",\"lat\":" + p.getY() + "},");
		}
		String shap = shapeInfo.toString().substring(0, shapeInfo.length() - 1);
		shap += "]";

		try {
			fw = new FileWriter("D://token.txt", true);
			fw.write(shap);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			fw.close();
		}

		// try {
		// fw = new FileWriter("D://token.txt", true);
		// for (Pointss p : stationInfoList) {
		// fw.write(p.getY() + "," + p.getX() + "\r\n");
		// }
		// } catch (IOException e) {
		// e.printStackTrace();
		// } finally {
		// fw.close();
		// }
	}

	public void test(String[] args) throws FileNotFoundException, IOException {
		// 读取文件
		Pointss[] stationInfoList = readGridExcelByPath("D://gridInfo//gridInfo.xls");
		System.out.println(stationInfoList.length);
		ClockwiseSortPoints(stationInfoList);
	}

	/**
	 * 解析kml文件
	 * 
	 * @Title kml
	 * @Author xiaogaoxiang
	 * @return void
	 */
	@Test
	public void kml() {
	}

	@Test
	public void getArea() {
		List<MapInfo> areaMap = gridCommonService.selectSysOrgPolygon("A31K");

		String shape = areaMap.get(0).getShape();
		JSONArray jsonAry = JSONArray.parseArray(shape);
		List<Map<String, Object>> list = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		for (int i = 0; i < jsonAry.size(); i++) {
			JSONObject json = jsonAry.getJSONObject(i);
			map = new HashMap<>();
			map.put("json", json);
			list.add(map);
		}

		double area = 0;
		BigDecimal a = new BigDecimal(0);
		BigDecimal b = new BigDecimal(0);
		BigDecimal c = new BigDecimal(0);
		BigDecimal d = new BigDecimal(0);
		for (int i = 0; i < list.size() - 1; i++) {
			String ss = list.get(i).get("json").toString();
			String sss = list.get(i + 1).get("json").toString();
			JSONObject json1 = JSONObject.parseObject(ss);
			JSONObject json2 = JSONObject.parseObject(sss);
			a = new BigDecimal(json1.get("lng").toString());
			b = new BigDecimal(json1.get("lat").toString());
			String prev = Convert_BD09_To_GCJ02(a, b);
			a = new BigDecimal(prev.split(":")[0]);
			b = new BigDecimal(prev.split(":")[1]);
			c = new BigDecimal(json2.get("lng").toString());
			d = new BigDecimal(json2.get("lat").toString());
			String next = Convert_BD09_To_GCJ02(c, d);
			c = new BigDecimal(next.split(":")[0]);
			d = new BigDecimal(next.split(":")[1]);
			area += ConvertToRadian(c.subtract(a)) * (2 + Math.sin(ConvertToRadian(b)) + Math.sin(ConvertToRadian(d)));
		}

		area = area * 6378137.0 * 6378137.0 / 2.0;

		System.out.println(Math.abs(area));
	}

	private double ConvertToRadian(BigDecimal input) {
		return input.doubleValue() * Math.PI / 180;
	}

	private double x_pi = 3.14159265358979324 * 3000.0 / 180.0;

	public String Convert_BD09_To_GCJ02(BigDecimal lng, BigDecimal lat) {
		BigDecimal x = lng.subtract(new BigDecimal(0.0065));
		BigDecimal y = lat.subtract(new BigDecimal(0.006));
		BigDecimal z = new BigDecimal(
				Math.sqrt(x.multiply(x).add(y.multiply(y)).doubleValue()) - 0.00002 * Math.sin(y.multiply(new BigDecimal(x_pi)).doubleValue()));
		BigDecimal theta = new BigDecimal(Math.atan2(y.doubleValue(), x.doubleValue()) - 0.000003 * Math.cos(x.multiply(new BigDecimal(x_pi)).doubleValue()));
		lng = z.multiply(new BigDecimal(Math.cos(theta.doubleValue())));
		lat = z.multiply(new BigDecimal(Math.sin(theta.doubleValue())));
		return lng + ":" + lat;
	}

}
