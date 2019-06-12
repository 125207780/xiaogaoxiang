package com.bonc.gridinfo.service;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataValidation;
import org.apache.poi.ss.usermodel.DataValidationConstraint;
import org.apache.poi.ss.usermodel.DataValidationHelper;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.bonc.common.utils.ExportUtils;
import com.bonc.common.utils.MD5Util;
import com.bonc.gridinfo.dao.mapper.GridUsrInfoMapper;
import com.bonc.map.dao.mapper.MapIndexMapper;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysRoleUser;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.dao.mapper.SysRoleUserMapper;
import com.bonc.system.service.SysOrgService;
import com.bonc.system.service.SysUserService;

@Service
public class GridUsrInfoService {

	// 默认密码
	private final String defaultPassword = "123456";

	@Resource
	private GridUsrInfoMapper gridUsrInfoMapper;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	@Resource
	private SysOrgService sysOrgService;

	@Resource
	private SysUserService sysUserService;

	@Resource
	private MapIndexMapper mapIndexMapper;

	@Resource
	private SysRoleUserMapper sysRoleUserMapper;

	/**
	 * 初始化查询网格总监信息
	 * 
	 * @Title initDirectInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> initDirectInfo(Map<String, Object> params) {
		return gridUsrInfoMapper.initDirectInfo(params);
	}

	/**
	 * 初始化查询网格人员信息
	 * 
	 * @Title initGridUsrInfo
	 * @Author xiaogaoxiang
	 * @param params
	 * @return List<Map<String,Object>>
	 */
	public List<Map<String, Object>> initGridUsrInfo(Map<String, Object> params) {
		return gridUsrInfoMapper.initGridUsrInfo(params);
	}

	/**
	 * 导出网格总监信息模板
	 * 
	 * @Title exportDirectInfoModel
	 * @Author xiaogaoxiang
	 * @param path
	 * @param outputStream
	 * @param flag
	 *            void
	 */
	public void exportDirectInfoModel(String path, ServletOutputStream outputStream, Boolean flag) {
		try {
			String[] titles = { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监工号编码", "网格总监登陆账号", "网格总监姓名", "网格总监电话" };
			HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(path));
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.2、头标题样式
			HSSFCellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("网格总监信息维护模板");
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
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
			cell1.setCellValue("网格总监信息维护模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);

			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
			hssfworkbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void exportGridUsrInfoModel(String path, ServletOutputStream outputStream, Boolean flag) {
		try {
			String[] titles = { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监姓名", "网格内人员名称", "网格内人员类型", "网格内人员Boss工号", "网格内人员电话", "性别	", "年龄	",
					"政治面貌", "身份	", "职级	", "Boss工号归属渠道", "归属渠道类型", "管理模式", "身份证号", "网格区域属性", "员工类型" };
			HSSFWorkbook hssfworkbook = new HSSFWorkbook(new FileInputStream(path));
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.2、头标题样式
			HSSFCellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("网格内人员信息维护模板");
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);
			String[] userType = { "网格经理（自有人员）", "网格经理（社会人员）", "个人客户经理（自有人员）", "政企客户经理（自有人员）", "CD类单位直销员（社会人员）", "网络维护人员" };
			// 设置单元格下拉框方法
			sheet.addValidationData(setDataValidation(sheet, userType, 2, 10000, 8, 8)); // 超过255个报错
			String[] managerType = { "网格直管" };
			// 设置单元格下拉框方法
			sheet.addValidationData(setDataValidation(sheet, managerType, 2, 10000, 18, 18)); // 超过255个报错
			String[] gridAttributeType = { "农村网格", "城区网格" };
			// 设置单元格下拉框方法
			sheet.addValidationData(setDataValidation(sheet, gridAttributeType, 2, 10000, 20, 20)); // 超过255个报错
			String[] usrMoldType = { "劳务合同制员工", "劳务派遣人员", "无" };
			// 设置单元格下拉框方法
			sheet.addValidationData(setDataValidation(sheet, usrMoldType, 2, 10000, 21, 21)); // 超过255个报错
			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			HSSFRow row1 = sheet.createRow(0);
			HSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("网格内人员信息维护模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);

			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 5、输出
			workbook.write(outputStream);
			outputStream.close();
			workbook.close();
			hssfworkbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void exportNetResourceModel(String path, ServletOutputStream outputStream, Boolean flag, SysUser user) {
		try {
			String[] titles = { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称" };
			String[] columns = { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME" };
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.2、头标题样式
			HSSFCellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 1.3、列标题样式
			HSSFCellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("组织机构模板");
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);// 起始行号，结束行号，起始列号，结束列号
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
			cell1.setCellValue("组织机构模板");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);

			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 定义集合
			List<Map<String, Object>> allPoiLists = new ArrayList<Map<String, Object>>();
			// 查询列表
			allPoiLists = gridUsrInfoMapper.selectOrgnization(user.getOrgId());
			// 操作单元格；将列表写入excel
			Row row = null;
			// 导出
			Cell cell = null;
			if (null != allPoiLists && allPoiLists.size() > 0) {
				for (int j = 0; j < allPoiLists.size(); j++) {
					row = sheet.createRow(j + 2);
					for (int k = 0; k < columns.length; k++) {
						cell = row.createCell(k);
						if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
							cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
						}
					}
				}
			}
			// 5、输出
			workbook.write(outputStream);
			outputStream.close();
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 设置单元格下拉框方法
	 * 
	 * @Title setDataValidation
	 * @Author xiaogaoxiang
	 * @param sheet
	 * @param textList
	 * @param firstRow
	 *            起始行（0开始）
	 * @param endRow
	 *            终止行
	 * @param firstCol
	 *            起始列（0开始）
	 * @param endCol
	 *            终止行
	 * @return DataValidation
	 */
	private static DataValidation setDataValidation(Sheet sheet, String[] textList, int firstRow, int endRow, int firstCol, int endCol) {
		DataValidationHelper helper = sheet.getDataValidationHelper();
		// 加载下拉列表内容
		DataValidationConstraint constraint = helper.createExplicitListConstraint(textList);
		// DVConstraint constraint = new DVConstraint();
		constraint.setExplicitListValues(textList);
		// 设置数据有效性加载在哪个单元格上。四个参数分别是：起始行、终止行、起始列、终止列
		CellRangeAddressList regions = new CellRangeAddressList((short) firstRow, (short) endRow, (short) firstCol, (short) endCol);
		// 数据有效性对象
		DataValidation data_validation = helper.createValidation(constraint, regions);
		return data_validation;
	}

	/**
	 * 导入网格总监信息
	 * 
	 * @Title readDirectExcelByPath
	 * @Author xiaogaoxiang
	 * @param fileName1
	 * @param user
	 * @return String
	 * @throws IOException
	 */
	@SuppressWarnings("resource")
	@Transactional
	public String readDirectExcelByPath(String fileName, SysUser user) throws IOException {
		// 返回message
		String message = null;
		HSSFWorkbook hssfworkbook = null;
		Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(user.getOrgId());
		String orgId = orgIdMap.get("OLD_ORG_ID").toString();
		FileInputStream input = null;
		try {
			input = new FileInputStream(new File(fileName));
			hssfworkbook = new HSSFWorkbook(new BufferedInputStream(input));
			// hssfworkbook = new HSSFWorkbook(new FileInputStream(fileName));
			// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
			HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);
			// 判断表头内容是否是模板内容
			HSSFRow row = hssfsheet.getRow(1);
			boolean flag = false;
			if (null != row) {
				if (!"地市编码".equals(row.getCell(0).toString()) || !"地市名称".equals(row.getCell(1).toString()) || !"区县编码".equals(row.getCell(2).toString())
						|| !"区县名称".equals(row.getCell(3).toString()) || !"网格编码".equals(row.getCell(4).toString()) || !"网格名称".equals(row.getCell(5).toString())
						|| !"网格总监工号编码".equals(row.getCell(6).toString()) || !"网格总监登陆账号".equals(row.getCell(7).toString())
						|| !"网格总监姓名".equals(row.getCell(8).toString()) || !"网格总监电话".equals(row.getCell(9).toString())) {
					flag = true;
				}
				if (flag) {
					message = "导入文件与模板文件不一致！请检查！";
					return message;
				} else {
					// 获取内容
					List<Map<String, String>> mapList = readDirectExcelIsNull(hssfsheet);
					// 循环集合
					if (null != mapList && mapList.size() > 0) {
						// 循环一次LOGIN_ID，如果有重复的，则提示有重复的LOGIN_ID，让其修改
						Set<String> loginIdSet = new HashSet<>();
						for (Map<String, String> m : mapList) {
							loginIdSet.add(m.get("LOGIN_ID"));
						}
						if (loginIdSet.size() != mapList.size()) {
							message = "网格总监登陆账号,在Excel表中有重复，请检查后再提交！";
							return message;
						}
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						SysOrg pid = null;
						List<Map<String, String>> errorMapList = new ArrayList<>();
						Map<String, String> errorMap = null;
						flag = true;
						int rightCount = 0;
						// 查询SysUser，判断网格总监是否存在当前网格
						SysUser sysUser = null;
						// 新增SysUser信息
						SysUser sysUserAdd = null;
						// 新增SYSRoleUser信息
						SysRoleUser gridRoleUserAdd = null;
						// 新增GRID_DIRECTOR_INFO_RECORD信息
						Map<String, String> gdirMap = null;
						// 新增GRID_USER信息
						Map<String, Object> gridUserMap = null;
						// 不为空则循环集合
						for (Map<String, String> m : mapList) {
							errorMap = new HashMap<>();
							// 判断当前excel的地市编码，是否与当前登录人的一致
							if (orgId.equals(String.valueOf(Double.valueOf(m.get("CITY_CODE").toString()).intValue()))) {
								// 根据当前excel的区县编码，查询组织信息
								pid = sysOrgService.selectSysOrgById(m.get("CNTY_CODE"));
								// 判断当前excel的区县编码，是否属于当前地市，这里只能用5位编码，不做3位短编码转换了，提高效率
								if (null != pid && !"".equals(pid) && pid.getPid().equals(user.getOrgId())) {
									// 根据当前excel的网格编码，查询组织信息
									pid = sysOrgService.selectSysOrgById(m.get("GRID_CODE"));
									// 判断当前excel的网格编码，是否属于当前区县
									if (null != pid && !"".equals(pid) && pid.getPid().equals(m.get("CNTY_CODE"))) {
										// 判断excel网格编码，在SYS_USER表中是否存在，如果不存在则新增，存在则修改
										sysUser = sysUserService.selectSysUserByOrgId(m.get("GRID_CODE"));
										// 如果不存在，则新增一条信息GRID_DIRECTOR_INFO_REPAIR表和GRID_DIRECTOR_INFO_RECORD表中
										if (null == sysUser) {
											// 新增一条信息到GRID_DIRECTOR_INFO_REPAIR表
											gridUsrInfoMapper.insertGridDirectorInfoRepair(m);
											// 新增一条信息到SYS_USER表
											sysUserAdd = new SysUser();
											sysUserAdd.setUserId(UUID.randomUUID().toString());
											sysUserAdd.setCreateId(user.getLoginId());
											sysUserAdd.setLoginId(m.get("LOGIN_ID"));
											sysUserAdd.setPassword(MD5Util.getHash(defaultPassword).toLowerCase());
											sysUserAdd.setOrgId(m.get("GRID_CODE"));
											sysUserAdd.setUserName(m.get("NAME"));
											sysUserAdd.setUserMobile(m.get("PHONE"));
											sysUserAdd.setUserLevel("4");
											sysUserAdd.setOaId(m.get("LOGIN_ID"));
											sysUserService.insertSysUser(sysUserAdd);
											// 新增一条信息到GRID_USER信息表
											gridUserMap = new HashMap<>();
											gridUserMap.put("loginId", m.get("LOGIN_ID"));
											gridUserMap.put("orgId", m.get("GRID_CODE"));
											gridUserMap.put("userName", m.get("NAME"));
											gridUserMap.put("userMobile", m.get("PHONE"));
											gridUserMap.put("usertype", 3);
											gridUserMap.put("oaid", m.get("LOGIN_ID"));
											mapIndexMapper.insertMapUser(gridUserMap);
											// 新增一条信息到SYS_ROLE_USER表，查询出固定条件：网格总监
											gridRoleUserAdd = new SysRoleUser();
											gridRoleUserAdd.setRuId(UUID.randomUUID().toString());
											gridRoleUserAdd.setRoleId("6346019941E34EB9B300388FF15DE8D7");
											gridRoleUserAdd.setUserId(sysUserAdd.getUserId());
											sysRoleUserMapper.insert(gridRoleUserAdd);
										}
										// 如果存在，则更新GRID_DIRECTOR_INFO_REPAIR表和插入GRID_DIRECTOR_INFO_RECORD表中
										else {
											// 先根据这个总监编码和网格编码，删除这个总监信息
											gridUsrInfoMapper.deleteGridDirectorInfoRepair(m);
											// 新增一条信息到GRID_DIRECTOR_INFO_REPAIR表
											gridUsrInfoMapper.insertGridDirectorInfoRepair(m);
											// 更新SYS_USER表条件是org_id和user_level=4
											sysUserAdd = new SysUser();
											sysUserAdd.setUserId(UUID.randomUUID().toString());
											sysUserAdd.setCreateId(user.getLoginId());
											sysUserAdd.setLoginId(m.get("LOGIN_ID"));
											sysUserAdd.setPassword(MD5Util.getHash(defaultPassword).toLowerCase());
											sysUserAdd.setOrgId(m.get("GRID_CODE"));
											sysUserAdd.setUserName(m.get("NAME"));
											sysUserAdd.setUserMobile(m.get("PHONE"));
											sysUserAdd.setUserLevel("4");
											sysUserAdd.setOaId(m.get("LOGIN_ID"));
											sysUserService.updateSysUserByOrgIdAndUserLevel(sysUserAdd);
											// 更新GRID_USER表条件是org_id和user_type=3
											gridUserMap = new HashMap<>();
											gridUserMap.put("LOGIN_ID", m.get("LOGIN_ID"));
											gridUserMap.put("ORG_ID", m.get("GRID_CODE"));
											gridUserMap.put("NAME", m.get("NAME"));
											gridUserMap.put("PHONE", m.get("PHONE"));
											gridUserMap.put("USER_TYPE", 3);
											gridUserMap.put("OA_ID", m.get("LOGIN_ID"));
											mapIndexMapper.updateGridUserByOrgIdAndUserType(gridUserMap);
										}
										// 新增一条信息到GRID_DIRECTOR_INFO_RECORD表
										gdirMap = m;
										gdirMap.put("CREATE_ID", user.getLoginId());
										gdirMap.put("CREATE_DATE", sdf.format(new Date()));
										gridUsrInfoMapper.insertGridDirectorInfoRecord(gdirMap);
									} else {
										errorMap = m;
										errorMap.put("errorMsg", "网格总监工号编码：" + m.get("JB_ID") + "，填写的网格县编码不属于当前区县！");
										errorMapList.add(m);
									}
								} else {
									errorMap = m;
									errorMap.put("errorMsg", "网格总监工号编码：" + m.get("JB_ID") + "，填写的区县编码不属于当前地市！");
									errorMapList.add(m);
								}
							}
							// 如果不一致，则放到错误信息中
							else {
								errorMap = m;
								errorMap.put("errorMsg", "网格总监工号编码：" + m.get("JB_ID") + "，填写的地市编码与当前登录人的不一致！");
								errorMapList.add(m);
							}
						}
						message = "导入成功";
						if (null != errorMapList && errorMapList.size() > 0) {
							// 执行导出错误的excel
							message = "执行成功： " + rightCount + " 条，其中有：" + errorMapList.size() + "条错误信息！&" + JSONArray.toJSONString(errorMapList);
						}
					} else {
						message = "没有内容！";
					}
				}
			} else {
				message = "没有内容！";
			}
		} catch (Exception e) {
			e.printStackTrace();
			message = "转换异常！请联系管理员帮忙检核数据！";
		} finally {
			// hssfworkbook.close();
			input.close();
		}
		return message;
	}

	/**
	 * 导入网格人员信息
	 * 
	 * @Title readGridUsrExcelByPath
	 * @Author xiaogaoxiang
	 * @param fileName
	 * @param user
	 * @return
	 * @throws IOException
	 *             String
	 */
	@SuppressWarnings("resource")
	@Transactional
	public String readGridUsrExcelByPath(String fileName, SysUser user) throws IOException {
		// 返回message
		String message = null;
		HSSFWorkbook hssfworkbook = null;
		Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(user.getOrgId());
		String orgId = orgIdMap.get("OLD_ORG_ID").toString();
		FileInputStream input = null;
		try {
			input = new FileInputStream(fileName);
			hssfworkbook = new HSSFWorkbook(input);
			// 遍历该表格中所有的工作表，i表示工作表的数量 getNumberOfSheets表示工作表的总数
			HSSFSheet hssfsheet = hssfworkbook.getSheetAt(0);
			// 判断表头内容是否是模板内容
			HSSFRow row = hssfsheet.getRow(1);
			boolean flag = false;
			if (null != row) {
				if (!"地市编码".equals(row.getCell(0).toString()) || !"地市名称".equals(row.getCell(1).toString()) || !"区县编码".equals(row.getCell(2).toString())
						|| !"区县名称".equals(row.getCell(3).toString()) || !"网格编码".equals(row.getCell(4).toString()) || !"网格名称".equals(row.getCell(5).toString())
						|| !"网格总监姓名".equals(row.getCell(6).toString()) || !"网格内人员名称".equals(row.getCell(7).toString())
						|| !"网格内人员类型".equals(row.getCell(8).toString()) || !"网格内人员Boss工号".equals(row.getCell(9).toString())
						|| !"网格内人员电话".equals(row.getCell(10).toString())) {
					flag = true;
				}
				if (flag) {
					message = "导入文件与模板文件不一致！请检查！";
					return message;
				} else {
					// 获取内容
					List<Map<String, String>> mapList = readGridUsrExcelIsNull(hssfsheet);
					// 循环集合
					if (null != mapList && mapList.size() > 0) {
						// 循环一次LOGIN_ID，如果有重复的，则提示有重复的LOGIN_ID，让其修改
						Set<String> loginIdSet = new HashSet<>();
						for (Map<String, String> m : mapList) {
							loginIdSet.add(m.get("USR_BOSS_CODE"));
						}
						if (loginIdSet.size() != mapList.size()) {
							message = "网格内人员Boss工号,在Excel表中有重复，请检查后再提交！";
							return message;
						}
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						SysOrg pid = null;
						List<Map<String, String>> errorMapList = new ArrayList<>();
						Map<String, String> errorMap = null;
						flag = true;
						int rightCount = 0;
						// 查询SysUser，判断网格总监是否存在当前网格
						Map<String, Object> guirMap = null;
						String directName = null;
						// 新增GRID_DIRECTOR_INFO_RECORD信息
						Map<String, String> gdirMap = null;
						// 网格boss和渠道关系对象
						Map<String, Object> bossChnlInfoMap = null;
						// 不为空则循环集合
						for (Map<String, String> m : mapList) {
							errorMap = new HashMap<>();
							// 判断当前excel的地市编码，是否与当前登录人的一致
							if (orgId.equals(String.valueOf(Double.valueOf(m.get("CITY_CODE").toString()).intValue()))) {
								// 根据当前excel的区县编码，查询组织信息
								pid = sysOrgService.selectSysOrgById(m.get("CNTY_CODE"));
								// 判断当前excel的区县编码，是否属于当前地市，这里只能用5位编码，不做3位短编码转换了，提高效率
								if (null != pid && !"".equals(pid) && pid.getPid().equals(user.getOrgId())) {
									// 根据当前excel的网格编码，查询组织信息
									pid = sysOrgService.selectSysOrgById(m.get("GRID_CODE"));
									// 判断当前excel的网格编码，是否属于当前区县
									if (null != pid && !"".equals(pid) && pid.getPid().equals(m.get("CNTY_CODE"))) {

										// 根据GRID_CODE查询GRID_DIRECTOR_INFO_REPAIR表中网格总监名称
										directName = gridUsrInfoMapper.selectGridDirectorInfoRepairByOrgId(m.get("GRID_CODE"));
										if (null != directName) {
											m.remove("DIRECTOR_NAME");
											m.put("DIRECTOR_NAME", directName);
										}
										// 根据网格内人员BOSS工号，查询BOSS渠道关联表，将渠道编码，渠道类型重新赋值
										bossChnlInfoMap = gridUsrInfoMapper.selectGridUsrChnlInfo(m.get("USR_BOSS_CODE"));
										if (null != bossChnlInfoMap) {
											m.put("USR_BOSS_CHNL", bossChnlInfoMap.get("USR_BOSS_CHNL").toString());
											m.put("CHNL_TYPE", bossChnlInfoMap.get("USR_BOSS_CHNL_TYPE").toString());
											m.put("MANA_MODEL", "网格直管");
										} else {
											m.put("USR_BOSS_CHNL", "请联系管理员");
											m.put("CHNL_TYPE", "请联系管理员");
											m.put("MANA_MODEL", "网格直管");
										}

										// 判断excel网格内人员Boss工号，在GRID_USR_INFO_REPAIR表中是否有重复，如果不存在则新增，存在则修改
										guirMap = gridUsrInfoMapper.selectGridUsrInfoRepairByUsrBoosCode(m.get("USR_BOSS_CODE"));
										// 如果不存在，则新增一条GRID_USR_INFO_REPAIR信息
										if (null == guirMap) {
											// 新增GRID_USR_INFO_REPAIR信息
											gridUsrInfoMapper.insertGridUsrInfoRepair(m);
										}
										// 如果存在，则更新一条GRID_USR_INFO_REPAIR信息
										else {
											// 新增GRID_USR_INFO_REPAIR信息
											gridUsrInfoMapper.updateGridUsrInfoRepair(m);
										}
										// 新增GRID_USR_INFO_RECORD信息
										gdirMap = m;
										gdirMap.put("CREATE_ID", user.getLoginId());
										gdirMap.put("CREATE_DATE", sdf.format(new Date()));
										// gridUsrInfoMapper.insertGridUsrInfoRecord(gdirMap);
									} else {
										errorMap = m;
										errorMap.put("errorMsg", "网格内人员Boss工号：" + m.get("USR_BOSS_CODE") + "，填写的网格县编码不属于当前区县！");
										errorMapList.add(m);
									}
								} else {
									errorMap = m;
									errorMap.put("errorMsg", "网格内人员Boss工号：" + m.get("USR_BOSS_CODE") + "，填写的区县编码不属于当前地市！");
									errorMapList.add(m);
								}
							}
							// 如果不一致，则放到错误信息中
							else {
								errorMap = m;
								errorMap.put("errorMsg", "网格内人员Boss工号：" + m.get("USR_BOSS_CODE") + "，填写的地市编码与当前登录人的不一致！");
								errorMapList.add(m);
							}
						}
						message = "导入成功";
						if (null != errorMapList && errorMapList.size() > 0) {
							// 执行导出错误的excel
							message = "执行成功： " + rightCount + " 条，其中有：" + errorMapList.size() + "条错误信息！&" + JSONArray.toJSONString(errorMapList);
						}
					} else {
						message = "文件中1-11列为必填项，有为空数据，请检查文件！";
					}
				}
			} else {
				message = "没有内容！";
			}
		} catch (Exception e) {
			e.printStackTrace();
			message = "转换异常！请联系管理员帮忙检核数据！";
		} finally {
			// hssfworkbook.close();
			input.close();
		}
		return message;
	}

	private List<Map<String, String>> readDirectExcelIsNull(HSSFSheet hssfsheet) {
		// 结果集
		List<Map<String, String>> mapList = new ArrayList<>();
		// 结果
		Map<String, String> map = null;
		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				map = new HashMap<String, String>();
				if (null == row.getCell(0) || null == row.getCell(1) || null == row.getCell(2) || null == row.getCell(3) || null == row.getCell(4)
						|| null == row.getCell(5) || null == row.getCell(6) || null == row.getCell(7) || null == row.getCell(8) || null == row.getCell(9)) {
					return null;
				}
				// 地市编码
				map.put("CITY_CODE", row.getCell(0) == null ? null : String.valueOf(Double.valueOf(row.getCell(0).toString()).intValue()));
				// 地市名称
				map.put("CITY_NAME", row.getCell(1) == null ? null : row.getCell(1).toString());
				// 区县编码
				map.put("CNTY_CODE", row.getCell(2) == null ? null : row.getCell(2).toString());
				// 区县名称
				map.put("CNTY_NAME", row.getCell(3) == null ? null : row.getCell(3).toString());
				// 网格编码
				map.put("GRID_CODE", row.getCell(4) == null ? null : row.getCell(4).toString());
				// 网格名称
				map.put("GRID_NAME", row.getCell(5) == null ? null : row.getCell(5).toString());
				// 网格总监工号编码
				map.put("JB_ID", row.getCell(6) == null ? null : row.getCell(6).toString());
				// 网格总监登陆账号
				map.put("LOGIN_ID", row.getCell(7) == null ? null : row.getCell(7).toString());
				// 网格总监姓名
				map.put("NAME", row.getCell(8) == null ? null : row.getCell(8).toString());
				// 网格总监电话
				map.put("PHONE", row.getCell(9) == null ? null : numberToString(row.getCell(9)));
				mapList.add(map);
			}
		}
		return mapList;
	}

	private List<Map<String, String>> readGridUsrExcelIsNull(HSSFSheet hssfsheet) {
		// 结果集
		List<Map<String, String>> mapList = new ArrayList<>();
		// 结果
		Map<String, String> map = null;
		// 遍历该行所有的行,j表示行数 getPhysicalNumberOfRows行的总数
		for (int j = 2; j < hssfsheet.getPhysicalNumberOfRows(); j++) {
			HSSFRow row = hssfsheet.getRow(j);
			if (row != null) {
				map = new HashMap<String, String>();
				if (null == row.getCell(0) || null == row.getCell(1) || null == row.getCell(2) || null == row.getCell(3) || null == row.getCell(4)
						|| null == row.getCell(5) || null == row.getCell(6) || null == row.getCell(7) || null == row.getCell(8) || null == row.getCell(9)
						|| null == row.getCell(10)) {
					return null;
				}
				// 地市编码
				map.put("CITY_CODE", row.getCell(0) == null ? null : String.valueOf(Double.valueOf(row.getCell(0).toString()).intValue()));
				// 地市名称
				map.put("CITY_NAME", row.getCell(1) == null ? null : row.getCell(1).toString());
				// 区县编码
				map.put("CNTY_CODE", row.getCell(2) == null ? null : row.getCell(2).toString());
				// 区县名称
				map.put("CNTY_NAME", row.getCell(3) == null ? null : row.getCell(3).toString());
				// 网格编码
				map.put("GRID_CODE", row.getCell(4) == null ? null : row.getCell(4).toString());
				// 网格名称
				map.put("GRID_NAME", row.getCell(5) == null ? null : row.getCell(5).toString());
				// 网格总监姓名
				map.put("DIRECTOR_NAME", row.getCell(6) == null ? null : numberToString(row.getCell(6)));
				// 网格内人员名称
				map.put("USR_NAME", row.getCell(7) == null ? null : numberToString(row.getCell(7)));
				// 网格内人员类型
				map.put("USR_TYPE", row.getCell(8) == null ? null : row.getCell(8).toString());
				// 网格内人员Boss工号
				map.put("USR_BOSS_CODE", row.getCell(9) == null ? null : numberToString(row.getCell(9)));
				// 网格内人员电话
				map.put("USR_PHONE", row.getCell(10) == null ? null : numberToString(row.getCell(19)));
				// 性别
				map.put("USR_SEX", row.getCell(11) == null ? null : row.getCell(11).toString());
				// 年龄
				map.put("USR_AGE", row.getCell(12) == null ? null : numberToString(row.getCell(12)));
				// 政治面貌
				map.put("USR_POUTLOOK", row.getCell(13) == null ? null : row.getCell(13).toString());
				// 身份
				map.put("USR_IDENTITY", row.getCell(14) == null ? null : row.getCell(14).toString());
				// 职级
				map.put("USR_RANK", row.getCell(15) == null ? null : row.getCell(15).toString());
				// Boss工号归属渠道
				map.put("USR_BOSS_CHNL", row.getCell(16) == null ? null : row.getCell(16).toString());
				// 归属渠道类型
				map.put("CHNL_TYPE", row.getCell(17) == null ? null : row.getCell(17).toString());
				// 管理模式
				map.put("MANA_MODEL", row.getCell(18) == null ? null : row.getCell(18).toString());
				// 身份证号
				map.put("ID_NUMBER", row.getCell(19) == null ? null : numberToString(row.getCell(19)));
				// 网格区域属性
				map.put("GRID_ATTRIBUTE", row.getCell(20) == null ? "999" : row.getCell(20).toString().equals("农村网格") ? "1" : "0");
				// 员工类型
				map.put("USR_MOLD", row.getCell(21) == null ? "999"
						: row.getCell(21).toString().equals("无") ? "0" : row.getCell(21).toString().equals("劳务合同制员工") ? "1" : "2");
				mapList.add(map);
			}
		}
		return mapList;
	}

	/**
	 * 描述：对表格中数值进行格式化
	 * 
	 * @Title getCellValue
	 * @Author xiaogaoxiang
	 * @param cell
	 * @return Object
	 */
	@SuppressWarnings("deprecation")
	public static String getCellValue(Cell cell) {
		String value = null;
		DecimalFormat df = new DecimalFormat("0"); // 格式化number String字符
		SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd"); // 日期格式化
		DecimalFormat df2 = new DecimalFormat("0"); // 格式化数字
		System.out.println(cell.getCellType());
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
		case Cell.CELL_TYPE_BLANK:
			value = "";
			break;
		case Cell.CELL_TYPE_FORMULA:
			value = cell.getCellFormula().toString();
		default:
			break;
		}
		return value;
	}

	/**
	 * 网格总监错误明细导出
	 * 
	 * @Title exportErrorDirectInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param jsonList
	 * @param outputStream
	 * @param session
	 *            void
	 */
	@SuppressWarnings("unchecked")
	public void exportErrorDirectInfo(SysUser user, String jsonList, ServletOutputStream outputStream, HttpSession session) {
		List<Map<String, String>> errorMapList = new ArrayList<>();
		errorMapList = JSONArray.parseObject(jsonList, List.class);
		try {
			// 创建对象
			Workbook workbook = new SXSSFWorkbook(100);
			// 头标题样式
			CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 列标题样式
			CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 创建工作表
			String sheetName = null;
			String titleName = null;
			// 查询出对应选择的基础单元的信息
			sheetName = "网格总监错误信息Sheet";
			titleName = "网格总监错误信息";
			// 定义标题行
			String[] titles = null;
			titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监工号编码", "网格总监登陆账号", "网格总监姓名", "网格总监电话", "错误信息" };
			// 定义列的字段
			String[] columns = null;
			columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "JB_ID", "LOGIN_ID", "NAME", "PHONE",
					"errorMsg" };
			Sheet sheet = workbook.createSheet(sheetName);
			// 创建合并单元格对象
			CellRangeAddress cellRangeAddress = null;
			// 起始行号，结束行号，起始列号，结束列号
			cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
			// 加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(20);
			// 创建行
			// 创建头标题行；并且设置头标题
			Row row1 = sheet.createRow(0);
			Cell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue(titleName);
			// 创建列标题行；并且设置列标题
			Row row2 = sheet.createRow(1);
			Cell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 定义集合
			List<Map<String, String>> allPoiLists = new ArrayList<>();
			// 查询列表
			allPoiLists = errorMapList;
			// 操作单元格；将列表写入excel
			Row row = null;
			// 导出
			Cell cell = null;
			if (null != allPoiLists && allPoiLists.size() > 0) {
				for (int j = 0; j < allPoiLists.size(); j++) {
					row = sheet.createRow(j + 2);
					for (int k = 0; k < columns.length; k++) {
						cell = row.createCell(k);
						if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
							cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
						}
					}
				}
			}
			// 输出
			workbook.write(outputStream);
			// 关流
			outputStream.close();
			// workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 网格人员错误信息导出
	 * 
	 * @Title exportErrorGridUsrInfo
	 * @Author xiaogaoxiang
	 * @param user
	 * @param jsonList
	 * @param outputStream
	 * @param session
	 *            void
	 */
	@SuppressWarnings("unchecked")
	public void exportErrorGridUsrInfo(SysUser user, String jsonList, ServletOutputStream outputStream, HttpSession session) {
		List<Map<String, String>> errorMapList = new ArrayList<>();
		errorMapList = JSONArray.parseObject(jsonList, List.class);
		try {
			// 创建对象
			Workbook workbook = new SXSSFWorkbook(100);
			// 头标题样式
			CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
			// 设置表头居中
			style1.setAlignment(HorizontalAlignment.CENTER);
			// 列标题样式
			CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
			// 创建工作表
			String sheetName = null;
			String titleName = null;
			// 查询出对应选择的基础单元的信息
			sheetName = "网格人员错误信息Sheet";
			titleName = "网格人员错误信息";
			// 定义标题行
			String[] titles = null;
			titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监姓名", "网格内人员名称", "网格内人员类型", "网格内人员Boss工号", "网格内人员电话", "性别	", "年龄	",
					"政治面貌", "身份	", "职级	", "Boss工号归属渠道", "归属渠道类型", "管理模式", "身份证号", "网格区域属性", "员工类型", "错误信息" };
			// 定义列的字段
			String[] columns = null;
			columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "DIRECTOR_NAME", "USR_NAME", "USR_TYPE",
					"USR_BOSS_CODE", "USR_PHONE", "USR_SEX", "USR_AGE", "USR_POUTLOOK", "USR_IDENTITY", "USR_RANK", "USR_BOSS_CHNL", "CHNL_TYPE", "MANA_MODEL",
					"ID_NUMBER", "GRID_ATTRIBUTE", "USR_MOLD", "errorMsg" };
			Sheet sheet = workbook.createSheet(sheetName);
			// 创建合并单元格对象
			CellRangeAddress cellRangeAddress = null;
			// 起始行号，结束行号，起始列号，结束列号
			cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
			// 加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(20);
			// 创建行
			// 创建头标题行；并且设置头标题
			Row row1 = sheet.createRow(0);
			Cell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue(titleName);
			// 创建列标题行；并且设置列标题
			Row row2 = sheet.createRow(1);
			Cell cell2 = null;
			for (int i = 0; i < titles.length; i++) {
				cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}
			// 定义集合
			List<Map<String, String>> allPoiLists = new ArrayList<>();
			// 查询列表
			allPoiLists = errorMapList;
			// 操作单元格；将列表写入excel
			Row row = null;
			// 导出
			Cell cell = null;
			if (null != allPoiLists && allPoiLists.size() > 0) {
				for (int j = 0; j < allPoiLists.size(); j++) {
					row = sheet.createRow(j + 2);
					for (int k = 0; k < columns.length; k++) {
						cell = row.createCell(k);
						if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
							cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
						}
					}
				}
			}
			// 输出
			workbook.write(outputStream);
			// 关流
			// workbook.close();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出网格网格总监列表信息
	 * 
	 * @Title exportDirectInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	public void exportDirectInfoDetail(Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "网格总监Sheet";
		titleName = "网格总监信息";
		// 定义标题行
		String[] titles = null;
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监工号编码", "网格总监登陆账号", "网格总监姓名", "网格总监电话" };
		// 定义列的字段
		String[] columns = null;
		columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "JB_ID", "LOGIN_ID", "NAME", "PHONE" };
		Sheet sheet = workbook.createSheet(sheetName);
		// 创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(20);
		// 创建行
		// 创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = gridUsrInfoMapper.getDirectDetail(params);
		// 操作单元格；将列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		if (null != allPoiLists && allPoiLists.size() > 0) {
			for (int j = 0; j < allPoiLists.size(); j++) {
				row = sheet.createRow(j + 2);
				for (int k = 0; k < columns.length; k++) {
					cell = row.createCell(k);
					if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
						cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
					}
				}
			}
		}
		// 输出
		workbook.write(outputStream);
		// 关流
		workbook.close();
	}

	/**
	 * 网格人员列表信息导出
	 * 
	 * @Title exportGridUsrInfoDetail
	 * @Author xiaogaoxiang
	 * @param params
	 * @param outputStream
	 * @param session
	 * @throws IOException
	 *             void
	 */
	public void exportGridUsrInfoDetail(Map<String, Object> params, ServletOutputStream outputStream, HttpSession session) throws IOException {
		// 创建对象
		Workbook workbook = new SXSSFWorkbook(100);
		// 头标题样式
		CellStyle style1 = ExportUtils.createCellStyle(workbook, (short) 16);
		// 设置表头居中
		style1.setAlignment(HorizontalAlignment.CENTER);
		// 列标题样式
		CellStyle style2 = ExportUtils.createCellStyle(workbook, (short) 13);
		// 创建工作表
		String sheetName = null;
		String titleName = null;
		// 查询出对应选择的基础单元的信息
		sheetName = "网格内人员信息Sheet";
		titleName = "网格内人员信息";
		// 定义标题行
		String[] titles = null;
		titles = new String[] { "地市编码", "地市名称", "区县编码", "区县名称", "网格编码", "网格名称", "网格总监姓名", "网格内人员名称", "网格内人员类型", "网格内人员Boss工号", "网格内人员电话", "性别	", "年龄	",
				"政治面貌", "身份	", "职级	", "Boss工号归属渠道", "归属渠道类型", "管理模式", "身份证号", "网格区域属性", "员工类型" };
		// 定义列的字段
		String[] columns = null;
		columns = new String[] { "CITY_CODE", "CITY_NAME", "CNTY_CODE", "CNTY_NAME", "GRID_CODE", "GRID_NAME", "DIRECTOR_NAME", "USR_NAME", "USR_TYPE",
				"USR_BOSS_CODE", "USR_PHONE", "USR_SEX", "USR_AGE", "USR_POUTLOOK", "USR_IDENTITY", "USR_RANK", "USR_BOSS_CHNL", "CHNL_TYPE", "MANA_MODEL",
				"ID_NUMBER", "GRID_ATTRIBUTE", "USR_MOLD" };
		Sheet sheet = workbook.createSheet(sheetName);
		// 创建合并单元格对象
		CellRangeAddress cellRangeAddress = null;
		// 起始行号，结束行号，起始列号，结束列号
		cellRangeAddress = new CellRangeAddress(0, 0, 0, titles.length - 1);
		// 加载合并单元格对象
		sheet.addMergedRegion(cellRangeAddress);
		// 设置默认列宽
		sheet.setDefaultColumnWidth(20);
		// 创建行
		// 创建头标题行；并且设置头标题
		Row row1 = sheet.createRow(0);
		Cell cell1 = row1.createCell(0);
		// 加载单元格样式
		cell1.setCellStyle(style1);
		cell1.setCellValue(titleName);
		// 创建列标题行；并且设置列标题
		Row row2 = sheet.createRow(1);
		Cell cell2 = null;
		for (int i = 0; i < titles.length; i++) {
			cell2 = row2.createCell(i);
			// 加载单元格样式
			cell2.setCellStyle(style2);
			cell2.setCellValue(titles[i]);
		}
		// 定义集合
		List<Map<String, Object>> allPoiLists = new ArrayList<>();
		// 查询列表
		allPoiLists = gridUsrInfoMapper.getGridUsrDetail(params);
		// 操作单元格；将列表写入excel
		Row row = null;
		// 导出
		Cell cell = null;
		if (null != allPoiLists && allPoiLists.size() > 0) {
			for (int j = 0; j < allPoiLists.size(); j++) {
				row = sheet.createRow(j + 2);
				for (int k = 0; k < columns.length; k++) {
					cell = row.createCell(k);
					if (allPoiLists.get(j) != null && allPoiLists.get(j).get(columns[k]) != null) {
						if (columns[k].equals("GRID_ATTRIBUTE")) {
							if (allPoiLists.get(j).get(columns[k]).toString().equals("1")) {
								cell.setCellValue("农村网格");
							} else if (allPoiLists.get(j).get(columns[k]).toString().equals("0")) {
								cell.setCellValue("城区网格");
							} else {
								cell.setCellValue("未填写");
							}
						} else if (columns[k].equals("USR_MOLD")) {
							if (allPoiLists.get(j).get(columns[k]).toString().equals("1")) {
								cell.setCellValue("劳务合同制员工");
							} else if (allPoiLists.get(j).get(columns[k]).toString().equals("2")) {
								cell.setCellValue("劳务派遣人员");
							} else if (allPoiLists.get(j).get(columns[k]).toString().equals("0")) {
								cell.setCellValue("无");
							} else {
								cell.setCellValue("未填写");
							}
						} else {
							cell.setCellValue(allPoiLists.get(j).get(columns[k]).toString());
						}
					}
				}
			}
		}
		// 输出
		workbook.write(outputStream);
		// 关流
		workbook.close();
	}

	/**
	 * * 使用正则表达式去掉多余的.与 * @param s
	 * 
	 * @return
	 */
	@SuppressWarnings({ "deprecation" })
	private String numberToString(Cell cell) {
		String value = "";
		DecimalFormat df = new DecimalFormat("0");
		if (cell != null) {
			if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
				value = df.format(cell.getNumericCellValue());
				if (value.indexOf(".0") > 0) {
					// 去掉多余的
					value = value.replaceAll("0+?$", "");
					// 如果最后一位是.则去掉
					value = value.replaceAll("[.]$", "");
				}
			} else {
				value = cell.toString();
			}
		}
		return value;
	}
}
