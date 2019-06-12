package com.bonc.school.service;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.classification.InterfaceAudience.Public;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.tool.bean.FtpConfig;
import com.bonc.common.utils.DateUtil;
import com.bonc.common.utils.SFTPUtil;
import com.bonc.school.dao.entity.SaveFile;
import com.bonc.school.dao.mapper.ReportFormMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class ReportFormService {

	@Autowired
	private ReportFormMapper reportFormMapper;
	@Resource
	private FtpConfig ftpConfig;

	public ReportFormMapper getMapper() {
		return reportFormMapper;
	}

	public List<Map<String, Object>> getReportForm1(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm1(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm2(String cityName) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm2(cityName);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm3(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm3(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm4(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm4(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm5(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm5(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm6(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm6(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm7(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm7(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm8(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm8(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm9(String statisMonth, String cityName, String schoolName) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm9(statisMonth, cityName, schoolName);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm10(String statisMonth, String cityName, String schoolName) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm10(statisMonth, cityName, schoolName);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm11(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm11(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm12(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm12(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm13(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm13(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm14(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm14(statisMonth);
		return resultMap;
	}

	public int savaFile(String fileName, String url) {
		SaveFile saveFile = new SaveFile();
		saveFile.setFileId(UUID.randomUUID().toString().replaceAll(" ", "-"));
		saveFile.setCreateTime(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
		saveFile.setAddres(url);
		saveFile.setFileName(fileName);
		return reportFormMapper.saveImportData(saveFile);
	}

	public List<Map<String, Object>> findFile() {
		List<Map<String, Object>> resultMap = reportFormMapper.findFile();
		return resultMap;
	}

	public List<Map<String, Object>> findByFileName(String fileName) {
		List<Map<String, Object>> resultMap = reportFormMapper.findByFileName(fileName);
		return resultMap;
	}
	
	public void uploadFile(String fileName, InputStream inputStream){
		try {
			//从配置文件取值
			String username = ftpConfig.getFtpServerUser();
			String password = ftpConfig.getFtpServerPwd();
			String host = ftpConfig.getFtpServerId();
			int port = Integer.parseInt(ftpConfig.getFtpServerPort());
			String server_address = ftpConfig.getFtpServerAddress();
			if (!server_address.endsWith("/")) {
				server_address += "/";
			}
			String ftpConnectType = ftpConfig.getFtpConnectType();
			//得到要存库的数据
			String realName = fileName.substring(0, fileName.lastIndexOf("."));//文件名称
			String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);//文件类型
			String res[] = getServerPathName(server_address, realName);//服务器存放文件地址和名称
			//插入数据
			SaveFile saveFile = new SaveFile();
			saveFile.setFileId(UUID.randomUUID().toString().replaceAll(" ", "-"));
			saveFile.setCreateTime(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
			saveFile.setAddres(res[1]+res[0]+"."+fileType);
			saveFile.setFileName(fileName);
			reportFormMapper.saveImportData(saveFile);
			//文件上传
			if(ftpConnectType.equals("SFTP")){
				SFTPUtil sfptUtil = new SFTPUtil(username,password,host,port);
				sfptUtil.upload(res[1], res[0]+"."+fileType, inputStream);
			}else if(ftpConnectType.equals("FTP")){
				//如果是ftp不做什么处理，由于21端口不能使用
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	public String[] getServerPathName(String server_address, String realName){
		SimpleDateFormat sdformat = new SimpleDateFormat("yyyyMM");
		String ftpDate = sdformat.format(new Date());
		Date date = new Date();
		long currentTime = date.getTime();
		String[] result = new String[]{realName+"_"+currentTime, server_address};
		return result;
	}
	
	public void downLoad(String fileId,HttpServletRequest request, HttpServletResponse response) throws IOException{
		SaveFile saveFile = reportFormMapper.findFileById(fileId);
		if (saveFile != null){
			String addres = saveFile.getAddres();
			String fileName = saveFile.getFileName();
			String url = ftpConfig.getFtpAccessAddress()+ "/file"+saveFile.getAddres().substring(addres.lastIndexOf("/"));
			String ftpConnectType = ftpConfig.getFtpConnectType();
			if (ftpConnectType.equals("SFTP")) {
				SFTPUtil sftpUtil = new SFTPUtil();
				sftpUtil.fileDownNg(url,fileName,request,response);
			}else if(ftpConnectType.equals("FTP")){
				//如果是ftp不做什么处理，由于21端口不能使用
			}
			
		}
	}

	public String deleteFileByName(String fileName) {
		String info = "";
		reportFormMapper.deleteFileByName(fileName);
		info = "删除成功";
		return info;
	}

	public Map<String, Object> findByUser() {
		Map<String, Object> resultMap = reportFormMapper.findByUser();
		return resultMap;
	}

	public int findByOaId(String oaId) {
		int userIdInfo = reportFormMapper.findByOaId(oaId);
		return userIdInfo;
	}

	public void ReportForm1ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("各高校校园客户情况日通报列表");
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
			cell1.setCellValue("各高校校园客户情况日通报列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市名称", "区县名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "当日移动新增通话校园客户 ", "当日移动新增校园通话客户份额X%", "当月移动累计新增通话校园客户",
					"当月联通累计新增通话校园客户", "当月电信累计新增通话校园客户", "当月移动累计新增通话校园客户市场份额X%", "当月移动累计新增通话校园客户市场份额排名", "8月1日起移动累计新增通话校园客户", "8月1日起联通累计新增通话校园客户",
					"8月1日起电信累计新增通话校园客户", "8月1日起移动累计新增通话校园客户市场份额X%", "8月1日起移动累计新增通话校园客户市场份额排名", "期末移动通话客户数", "期末联通通话客户数", "期末电信通话客户数", "期末移动通话客户市场份额X%",
					"期末移动通话客户市场份额排名", "期末联通通话市场份额X%", "期末电信通话市场份额X%", "期末移动通信客户数", "期末联通通信客户数", "期末电信通信客户数", "期末通信客户市场份额X%", "期末通信客户市场份额排名", "联通期末通信市场份额X%",
					"电信期末通信市场份额X%", "当日新增4G客户数", "当月新增4G客户数", "期末4G客户数", "4G客户渗透率X%", "4G客户渗透率排名", "当日新增不限量套餐客户数", "当月新增不限量套餐客户数", "期末不限量套餐客户数",
					"不限量套餐客户渗透率X%", "不限量套餐客户渗透率排名", "其中：不限量流量包渗透率", "当月ARPU", "当月ARPU环比变化", "当月DOU", "当月DOU环比变化", "当月MOU", "当月MOU环比变化", "当前V网客户数", "V网客户渗透率",
					"本月缴费用户数", "本月缴费用户渗透率", "当日新增宽带客户数", "当月新增宽带客户数", "期末宽带客户数 ", "宽带客户渗透率", "期末存费类客户数", "期末终端类客户数", "期末宽带类客户数", "期末其他类客户数", "小计", "合约率" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_DATE") != null) {
						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_DATE").toString());
					}
					if (empList.get(j).get("SCH_AREA_NAME") != null) {
						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("CNTY_NAME") != null) {
						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("CNTY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {
						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {
						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {
						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {
						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("ADD_CMCC_D") != null) {
						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("ADD_CMCC_D").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_D") != null) {
						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_D").toString());
					}
					if (empList.get(j).get("ADD_CMCC_M") != null) {
						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CUCC_M") != null) {
						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("ADD_CUCC_M").toString());
					}
					if (empList.get(j).get("ADD_CTCC_M") != null) {
						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("ADD_CTCC_M").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_M") != null) {
						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_M").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_M") != null) {
						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("RANK_ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CMCC_AFTER0801") != null) {
						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CUCC_AFTER0801") != null) {
						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("ADD_CUCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CTCC_AFTER0801") != null) {
						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("ADD_CTCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_AFTER0801") != null) {
						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_AFTER0801") != null) {
						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("RANK_ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("CALL_CMCC") != null) {
						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("CALL_CMCC").toString());
					}
					if (empList.get(j).get("CALL_CUCC") != null) {
						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("CALL_CUCC").toString());
					}
					if (empList.get(j).get("CALL_CTCC") != null) {
						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("CALL_CTCC").toString());

					}
					if (empList.get(j).get("CALL_SHARE_CMCC") != null) {
						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("CALL_SHARE_CMCC").toString());

					}
					if (empList.get(j).get("CALL_RANK_CMCC") != null) {
						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("CALL_RANK_CMCC").toString());

					}
					if (empList.get(j).get("CALL_SHARE_CUCC") != null) {
						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("CALL_SHARE_CUCC").toString());

					}
					if (empList.get(j).get("CALL_SHARE_CTCC") != null) {
						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("CALL_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CMCC") != null) {
						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("COMMUNI_CMCC").toString());

					}
					if (empList.get(j).get("COMMUNI_CUCC") != null) {
						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("COMMUNI_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CTCC") != null) {
						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("COMMUNI_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CMCC") != null) {
						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("COMMUNI_SHARE_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_RANK_CMCC") != null) {
						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("COMMUNI_RANK_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CUCC") != null) {
						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("COMMUNI_SHARE_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CTCC") != null) {
						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("COMMUNI_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("G4_CMCC_D") != null) {
						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("G4_CMCC_D").toString());
					}
					if (empList.get(j).get("G4_CMCC_M") != null) {
						HSSFCell cell45 = row.createCell(34);
						cell45.setCellValue(empList.get(j).get("G4_CMCC_M").toString());
					}
					if (empList.get(j).get("G4_CMCC") != null) {
						HSSFCell cell46 = row.createCell(35);
						cell46.setCellValue(empList.get(j).get("G4_CMCC").toString());
					}
					if (empList.get(j).get("G4_RATE") != null) {
						HSSFCell cell47 = row.createCell(36);
						cell47.setCellValue(empList.get(j).get("G4_RATE").toString());
					}
					if (empList.get(j).get("G4_RANK") != null) {
						HSSFCell cell48 = row.createCell(37);
						cell48.setCellValue(empList.get(j).get("G4_RANK").toString());
					}
					if (empList.get(j).get("UMLIMIT_CMCC_D") != null) {
						HSSFCell cell49 = row.createCell(38);
						cell49.setCellValue(empList.get(j).get("UMLIMIT_CMCC_D").toString());
					}
					if (empList.get(j).get("UMLIMIT_CMCC_M") != null) {
						HSSFCell cell50 = row.createCell(39);
						cell50.setCellValue(empList.get(j).get("UMLIMIT_CMCC_M").toString());

					}
					if (empList.get(j).get("UNLIMIT_CMCC") != null) {
						HSSFCell cell51 = row.createCell(40);
						cell51.setCellValue(empList.get(j).get("UNLIMIT_CMCC").toString());
					}
					if (empList.get(j).get("UNLIMIT_RATE") != null) {
						HSSFCell cell52 = row.createCell(41);
						cell52.setCellValue(empList.get(j).get("UNLIMIT_RATE").toString());
					}
					if (empList.get(j).get("UNLIMIT_RANK") != null) {
						HSSFCell cell53 = row.createCell(42);
						cell53.setCellValue(empList.get(j).get("UNLIMIT_RANK").toString());
					}
					if (empList.get(j).get("UNLIMIT_DIEJIA") != null) {
						HSSFCell cell54 = row.createCell(43);
						cell54.setCellValue(empList.get(j).get("UNLIMIT_DIEJIA").toString());
					}
					if (empList.get(j).get("ARPU") != null) {
						HSSFCell cell55 = row.createCell(44);
						cell55.setCellValue(empList.get(j).get("ARPU").toString());
					}
					if (empList.get(j).get("ARPU_HB") != null) {
						HSSFCell cell56 = row.createCell(45);
						cell56.setCellValue(empList.get(j).get("ARPU_HB").toString());
					}
					if (empList.get(j).get("DOU") != null) {
						HSSFCell cell57 = row.createCell(46);
						cell57.setCellValue(empList.get(j).get("DOU").toString());
					}
					if (empList.get(j).get("DOU_HB") != null) {
						HSSFCell cell58 = row.createCell(47);
						cell58.setCellValue(empList.get(j).get("DOU_HB").toString());
					}
					if (empList.get(j).get("MOU") != null) {
						HSSFCell cell59 = row.createCell(48);
						cell59.setCellValue(empList.get(j).get("MOU").toString());
					}
					if (empList.get(j).get("MOU_HB") != null) {
						HSSFCell cell60 = row.createCell(49);
						cell60.setCellValue(empList.get(j).get("MOU_HB").toString());
					}
					if (empList.get(j).get("VNET") != null) {
						HSSFCell cell61 = row.createCell(50);
						cell61.setCellValue(empList.get(j).get("VNET").toString());
					}
					if (empList.get(j).get("VNET_RATE") != null) {
						HSSFCell cell62 = row.createCell(51);
						cell62.setCellValue(empList.get(j).get("VNET_RATE").toString());
					}
					if (empList.get(j).get("CHARGE") != null) {
						HSSFCell cell63 = row.createCell(52);
						cell63.setCellValue(empList.get(j).get("CHARGE").toString());
					}
					if (empList.get(j).get("CHARGE_RATE") != null) {
						HSSFCell cell64 = row.createCell(53);
						cell64.setCellValue(empList.get(j).get("CHARGE_RATE").toString());
					}
					if (empList.get(j).get("KD_CMCC_D") != null) {
						HSSFCell cell65 = row.createCell(54);
						cell65.setCellValue(empList.get(j).get("KD_CMCC_D").toString());
					}

					if (empList.get(j).get("KD_CMCC_M") != null) {
						HSSFCell cell66 = row.createCell(55);
						cell66.setCellValue(empList.get(j).get("KD_CMCC_M").toString());
					}
					if (empList.get(j).get("KD_CMCC") != null) {
						HSSFCell cell67 = row.createCell(56);
						cell67.setCellValue(empList.get(j).get("KD_CMCC").toString());
					}
					if (empList.get(j).get("KD_RATE") != null) {
						HSSFCell cell68 = row.createCell(57);
						cell68.setCellValue(empList.get(j).get("KD_RATE").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC") != null) {
						HSSFCell cell69 = row.createCell(58);
						cell69.setCellValue(empList.get(j).get("CONTRACT_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_PHONE_CMCC") != null) {
						HSSFCell cell70 = row.createCell(59);
						cell70.setCellValue(empList.get(j).get("CONTRACT_PHONE_CMCC").toString());
					}

					if (empList.get(j).get("CONTRACT_KD_CMCC") != null) {
						HSSFCell cell71 = row.createCell(60);
						cell71.setCellValue(empList.get(j).get("CONTRACT_KD_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_OTHER_CMCC") != null) {
						HSSFCell cell72 = row.createCell(61);
						cell72.setCellValue(empList.get(j).get("CONTRACT_OTHER_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC_TOL") != null) {
						HSSFCell cell73 = row.createCell(62);
						cell73.setCellValue(empList.get(j).get("CONTRACT_CMCC_TOL").toString());
					}
					if (empList.get(j).get("HY_RATE") != null) {
						HSSFCell cell74 = row.createCell(63);
						cell74.setCellValue(empList.get(j).get("HY_RATE").toString());
					}
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm2ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("校园基站报表列表");
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
			cell1.setCellValue("校园基站报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "地市", "学校编码", "学校名称", "学校级别", "分校编码", "分校名称", "基站编码", "基站名称", "基站状态" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("CITY_NAME") != null) {
						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("CITY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {
						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {
						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("LEVEL_NAME") != null) {
						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("LEVEL_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {
						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {
						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("LAC_CELL_ID") != null) {
						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("LAC_CELL_ID").toString());
					}
					if (empList.get(j).get("CELL_NAME") != null) {
						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("CELL_NAME").toString());
					}
					if (empList.get(j).get("LIFE_CYC_STATS") != null) {
						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("LIFE_CYC_STATS").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm3ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("各地市校园客户情况日通报列表");
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
			cell1.setCellValue("各地市校园客户情况日通报列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市名称", "区县名称", "当日移动新增通话校园客户 ", "当日移动新增校园通话客户份额X%", "当月移动累计新增通话校园客户", "当月联通累计新增通话校园客户", "当月电信累计新增通话校园客户",
					"当月移动累计新增通话校园客户市场份额X%", "当月移动累计新增通话校园客户市场份额排名", "8月1日起移动累计新增通话校园客户", "8月1日起联通累计新增通话校园客户", "8月1日起电信累计新增通话校园客户", "8月1日起移动累计新增通话校园客户市场份额X%",
					"8月1日起移动累计新增通话校园客户市场份额排名", "期末移动通话客户数", "期末联通通话客户数", "期末电信通话客户数", "期末移动通话客户市场份额X%", "期末移动通话客户市场份额排名", "期末联通通话市场份额X%", "期末电信通话市场份额X%",
					"期末移动通信客户数", "期末联通通信客户数", "期末电信通信客户数", "期末通信客户市场份额X%", "期末通信客户市场份额排名", "联通期末通信市场份额X%", "电信期末通信市场份额X%", "当日新增4G客户数", "当月新增4G客户数", "期末4G客户数",
					"4G客户渗透率X%", "4G客户渗透率排名", "当日新增不限量套餐客户数", "当月新增不限量套餐客户数", "期末不限量套餐客户数", "不限量套餐客户渗透率X%", "不限量套餐客户渗透率排名", "其中：不限量流量包渗透率", "当月ARPU",
					"当月ARPU环比变化", "当月DOU", "当月DOU环比变化", "当月MOU", "当月MOU环比变化", "当前V网客户数", "V网客户渗透率", "本月缴费用户数", "本月缴费用户渗透率", "当日新增宽带客户数", "当月新增宽带客户数",
					"期末宽带客户数 ", "宽带客户渗透率", "期末存费类客户数", "期末终端类客户数", "期末宽带类客户数", "期末其他类客户数", "小计", "合约率" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_DATE") != null) {
						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_DATE").toString());
					}
					if (empList.get(j).get("SCH_AREA_NAME") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("CNTY_NAME") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("CNTY_NAME").toString());
					}
					if (empList.get(j).get("ADD_CMCC_D") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("ADD_CMCC_D").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_D") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_D").toString());
					}
					if (empList.get(j).get("ADD_CMCC_M") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CUCC_M") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("ADD_CUCC_M").toString());
					}
					if (empList.get(j).get("ADD_CTCC_M") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("ADD_CTCC_M").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_M") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_M").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_M") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("RANK_ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CMCC_AFTER0801") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CUCC_AFTER0801") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("ADD_CUCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CTCC_AFTER0801") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("ADD_CTCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_AFTER0801") != null) {

						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_AFTER0801") != null) {

						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("RANK_ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("CALL_CMCC") != null) {

						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("CALL_CMCC").toString());
					}
					if (empList.get(j).get("CALL_CUCC") != null) {

						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("CALL_CUCC").toString());
					}
					if (empList.get(j).get("CALL_CTCC") != null) {

						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("CALL_CTCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CMCC") != null) {

						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("CALL_SHARE_CMCC").toString());
					}
					if (empList.get(j).get("CALL_RANK_CMCC") != null) {

						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("CALL_RANK_CMCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CUCC") != null) {

						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("CALL_SHARE_CUCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CTCC") != null) {

						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("CALL_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CMCC") != null) {

						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("COMMUNI_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CUCC") != null) {

						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("COMMUNI_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CTCC") != null) {

						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("COMMUNI_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CMCC") != null) {

						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("COMMUNI_SHARE_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_RANK_CMCC") != null) {

						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("COMMUNI_RANK_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CUCC") != null) {

						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("COMMUNI_SHARE_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CTCC") != null) {

						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("COMMUNI_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("G4_CMCC_D") != null) {

						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("G4_CMCC_D").toString());
					}
					if (empList.get(j).get("G4_CMCC_M") != null) {

						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("G4_CMCC_M").toString());
					}
					if (empList.get(j).get("G4_CMCC") != null) {

						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("G4_CMCC").toString());
					}
					if (empList.get(j).get("G4_RATE") != null) {

						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("G4_RATE").toString());
					}
					if (empList.get(j).get("G4_RANK") != null) {

						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("G4_RANK").toString());
					}
					if (empList.get(j).get("UMLIMIT_CMCC_D") != null) {

						HSSFCell cell45 = row.createCell(34);
						cell45.setCellValue(empList.get(j).get("UMLIMIT_CMCC_D").toString());
					}
					if (empList.get(j).get("UMLIMIT_CMCC_M") != null) {

						HSSFCell cell46 = row.createCell(35);
						cell46.setCellValue(empList.get(j).get("UMLIMIT_CMCC_M").toString());
					}
					if (empList.get(j).get("UNLIMIT_CMCC") != null) {

						HSSFCell cell47 = row.createCell(36);
						cell47.setCellValue(empList.get(j).get("UNLIMIT_CMCC").toString());
					}
					if (empList.get(j).get("UNLIMIT_RATE") != null) {

						HSSFCell cell48 = row.createCell(37);
						cell48.setCellValue(empList.get(j).get("UNLIMIT_RATE").toString());
					}
					if (empList.get(j).get("UNLIMIT_RANK") != null) {

						HSSFCell cell49 = row.createCell(38);
						cell49.setCellValue(empList.get(j).get("UNLIMIT_RANK").toString());
					}
					if (empList.get(j).get("UNLIMIT_DIEJIA") != null) {

						HSSFCell cell50 = row.createCell(39);
						cell50.setCellValue(empList.get(j).get("UNLIMIT_DIEJIA").toString());
					}
					if (empList.get(j).get("ARPU") != null) {

						HSSFCell cell51 = row.createCell(40);
						cell51.setCellValue(empList.get(j).get("ARPU").toString());
					}
					if (empList.get(j).get("ARPU_HB") != null) {

						HSSFCell cell52 = row.createCell(41);
						cell52.setCellValue(empList.get(j).get("ARPU_HB").toString());
					}
					if (empList.get(j).get("DOU") != null) {

						HSSFCell cell53 = row.createCell(42);
						cell53.setCellValue(empList.get(j).get("DOU").toString());
					}
					if (empList.get(j).get("DOU_HB") != null) {

						HSSFCell cell54 = row.createCell(43);
						cell54.setCellValue(empList.get(j).get("DOU_HB").toString());
					}
					if (empList.get(j).get("MOU") != null) {

						HSSFCell cell55 = row.createCell(44);
						cell55.setCellValue(empList.get(j).get("MOU").toString());
					}
					if (empList.get(j).get("MOU_HB") != null) {

						HSSFCell cell56 = row.createCell(45);
						cell56.setCellValue(empList.get(j).get("MOU_HB").toString());
					}
					if (empList.get(j).get("VNET") != null) {

						HSSFCell cell57 = row.createCell(46);
						cell57.setCellValue(empList.get(j).get("VNET").toString());
					}
					if (empList.get(j).get("VNET_RATE") != null) {

						HSSFCell cell58 = row.createCell(47);
						cell58.setCellValue(empList.get(j).get("VNET_RATE").toString());
					}
					if (empList.get(j).get("CHARGE") != null) {

						HSSFCell cell59 = row.createCell(48);
						cell59.setCellValue(empList.get(j).get("CHARGE").toString());
					}
					if (empList.get(j).get("CHARGE_RATE") != null) {

						HSSFCell cell60 = row.createCell(49);
						cell60.setCellValue(empList.get(j).get("CHARGE_RATE").toString());
					}
					if (empList.get(j).get("KD_CMCC_D") != null) {

						HSSFCell cell61 = row.createCell(50);
						cell61.setCellValue(empList.get(j).get("KD_CMCC_D").toString());
					}
					if (empList.get(j).get("KD_CMCC_M") != null) {

						HSSFCell cell62 = row.createCell(51);
						cell62.setCellValue(empList.get(j).get("KD_CMCC_M").toString());
					}
					if (empList.get(j).get("KD_CMCC") != null) {

						HSSFCell cell63 = row.createCell(52);
						cell63.setCellValue(empList.get(j).get("KD_CMCC").toString());
					}
					if (empList.get(j).get("KD_RATE") != null) {

						HSSFCell cell64 = row.createCell(53);
						cell64.setCellValue(empList.get(j).get("KD_RATE").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC") != null) {

						HSSFCell cell65 = row.createCell(54);
						cell65.setCellValue(empList.get(j).get("CONTRACT_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_PHONE_CMCC") != null) {

						HSSFCell cell66 = row.createCell(55);
						cell66.setCellValue(empList.get(j).get("CONTRACT_PHONE_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_KD_CMCC") != null) {

						HSSFCell cell67 = row.createCell(56);
						cell67.setCellValue(empList.get(j).get("CONTRACT_KD_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_OTHER_CMCC") != null) {

						HSSFCell cell68 = row.createCell(57);
						cell68.setCellValue(empList.get(j).get("CONTRACT_OTHER_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC_TOL") != null) {

						HSSFCell cell69 = row.createCell(58);
						cell69.setCellValue(empList.get(j).get("CONTRACT_CMCC_TOL").toString());
					}
					if (empList.get(j).get("HY_RATE") != null) {

						HSSFCell cell70 = row.createCell(59);
						cell70.setCellValue(empList.get(j).get("HY_RATE").toString());
					}
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm4ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("各地市校园客户情况月报表列表");
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
			cell1.setCellValue("各地市校园客户情况月报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市名称", "区县名称", "当月移动累计新增通话校园客户", "当月联通累计新增通话校园客户", "当月电信累计新增通话校园客户", "当月移动累计新增通话校园客户份额X%", "当月移动累计新增通话校园客户份额排名",
					"8月1日起移动累计新增通话校园客户", "8月1日起联通累计新增通话校园客户", "8月1日起电信累计新增通话校园客户", "8月1日起移动累计新增通话校园客户市场份额X%", "8月1日起移动累计新增通话校园客户市场份额排名", "期末移动通话客户数",
					"期末联通通话客户数", "期末电信通话客户数", "期末移动通话客户市场份额X%", "期末移动通话客户市场份额排名", "期末联通通话市场份额X%", "期末电信通话市场份额X%", "期末移动通信客户数", "期末联通通信客户数", "期末电信通信客户数",
					"期末通信客户市场份额X%", "期末通信客户市场份额排名", "联通期末通信市场份额X%", "电信期末通信市场份额X%", "当月新增4G客户数", "期末4G客户数", "4G客户渗透率X%", "4G客户渗透率排名", "当月新增不限量套餐客户数",
					"期末不限量套餐客户数", "不限量套餐客户渗透率X%", "不限量套餐客户渗透率排名", "其中：不限量流量包渗透率", "当月ARPU", "当月ARPU环比变化", "累计月均ARPU", "当月DOU(G)", "当月DOU环比变化", "累计月均DOU",
					"当月MOU", "当月MOU环比变化", "累计月均MOU", "当前V网客户数", "V网客户渗透率", "本月缴费用户数", "本月缴费用户渗透率", "当月新增宽带客户数", "期末宽带客户数 ", "宽带客户渗透率%", "期末存费类客户数", "期末终端类客户数",
					"期末宽带类客户数", "期末其他类客户数", "小计", "合约率" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_MONTH") != null) {

						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_MONTH").toString());
					}
					if (empList.get(j).get("SCH_AREA_NAME") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("CNTY_NAME") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("CNTY_NAME").toString());
					}
					if (empList.get(j).get("ADD_CMCC_M") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CUCC_M") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("ADD_CUCC_M").toString());
					}
					if (empList.get(j).get("ADD_CTCC_M") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("ADD_CTCC_M").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_M") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_M").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_M") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("RANK_ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CMCC_AFTER0801") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CUCC_AFTER0801") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("ADD_CUCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CTCC_AFTER0801") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("ADD_CTCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_AFTER0801") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_AFTER0801") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("RANK_ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("CALL_CMCC") != null) {

						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("CALL_CMCC").toString());
					}
					if (empList.get(j).get("CALL_CUCC") != null) {

						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("CALL_CUCC").toString());
					}
					if (empList.get(j).get("CALL_CTCC") != null) {

						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("CALL_CTCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CMCC") != null) {

						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("CALL_SHARE_CMCC").toString());
					}
					if (empList.get(j).get("CALL_RANK_CMCC") != null) {

						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("CALL_RANK_CMCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CUCC") != null) {

						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("CALL_SHARE_CUCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CTCC") != null) {

						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("CALL_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CMCC") != null) {

						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("COMMUNI_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CUCC") != null) {

						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("COMMUNI_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CTCC") != null) {

						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("COMMUNI_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CMCC") != null) {

						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("COMMUNI_SHARE_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_RANK_CMCC") != null) {

						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("COMMUNI_RANK_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CUCC") != null) {

						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("COMMUNI_SHARE_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CTCC") != null) {

						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("COMMUNI_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("G4_CMCC_M") != null) {

						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("G4_CMCC_M").toString());
					}
					if (empList.get(j).get("G4_CMCC") != null) {

						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("G4_CMCC").toString());
					}
					if (empList.get(j).get("G4_RATE") != null) {

						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("G4_RATE").toString());
					}
					if (empList.get(j).get("G4_RANK") != null) {

						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("G4_RANK").toString());
					}
					if (empList.get(j).get("UMLIMIT_CMCC_M") != null) {

						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("UMLIMIT_CMCC_M").toString());
					}
					if (empList.get(j).get("UNLIMIT_CMCC") != null) {

						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("UNLIMIT_CMCC").toString());
					}
					if (empList.get(j).get("UNLIMIT_RATE") != null) {

						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("UNLIMIT_RATE").toString());
					}
					if (empList.get(j).get("UNLIMIT_RANK") != null) {

						HSSFCell cell45 = row.createCell(34);
						cell45.setCellValue(empList.get(j).get("UNLIMIT_RANK").toString());
					}
					if (empList.get(j).get("UNLIMIT_DIEJIA") != null) {

						HSSFCell cell46 = row.createCell(35);
						cell46.setCellValue(empList.get(j).get("UNLIMIT_DIEJIA").toString());
					}
					if (empList.get(j).get("ARPU") != null) {

						HSSFCell cell47 = row.createCell(36);
						cell47.setCellValue(empList.get(j).get("ARPU").toString());
					}
					if (empList.get(j).get("ARPU_TWO_MONTH") != null) {

						HSSFCell cell48 = row.createCell(37);
						cell48.setCellValue(empList.get(j).get("ARPU_TWO_MONTH").toString());
					}
					if (empList.get(j).get("ARPU_MEAN") != null) {

						HSSFCell cell49 = row.createCell(38);
						cell49.setCellValue(empList.get(j).get("ARPU_MEAN").toString());
					}
					if (empList.get(j).get("MOU") != null) {

						HSSFCell cell50 = row.createCell(39);
						cell50.setCellValue(empList.get(j).get("MOU").toString());
					}
					if (empList.get(j).get("MOU_TWO_MONTH") != null) {

						HSSFCell cell51 = row.createCell(40);
						cell51.setCellValue(empList.get(j).get("MOU_TWO_MONTH").toString());
					}
					if (empList.get(j).get("MOU_MEAN") != null) {

						HSSFCell cell52 = row.createCell(41);
						cell52.setCellValue(empList.get(j).get("MOU_MEAN").toString());
					}
					if (empList.get(j).get("DOU") != null) {

						HSSFCell cell53 = row.createCell(42);
						cell53.setCellValue(empList.get(j).get("DOU").toString());
					}
					if (empList.get(j).get("DOU_TWO_MONTH") != null) {

						HSSFCell cell54 = row.createCell(43);
						cell54.setCellValue(empList.get(j).get("DOU_TWO_MONTH").toString());
					}
					if (empList.get(j).get("DOU_MEAN") != null) {

						HSSFCell cell55 = row.createCell(44);
						cell55.setCellValue(empList.get(j).get("DOU_MEAN").toString());
					}
					if (empList.get(j).get("VNET") != null) {

						HSSFCell cell56 = row.createCell(45);
						cell56.setCellValue(empList.get(j).get("VNET").toString());
					}
					if (empList.get(j).get("VNET_RATE") != null) {

						HSSFCell cell57 = row.createCell(46);
						cell57.setCellValue(empList.get(j).get("VNET_RATE").toString());
					}
					if (empList.get(j).get("CHARGE") != null) {

						HSSFCell cell58 = row.createCell(47);
						cell58.setCellValue(empList.get(j).get("CHARGE").toString());
					}
					if (empList.get(j).get("CHARGE_RATE") != null) {

						HSSFCell cell59 = row.createCell(48);
						cell59.setCellValue(empList.get(j).get("CHARGE_RATE").toString());
					}
					if (empList.get(j).get("KD_CMCC_M") != null) {

						HSSFCell cell60 = row.createCell(49);
						cell60.setCellValue(empList.get(j).get("KD_CMCC_M").toString());
					}
					if (empList.get(j).get("KD_CMCC") != null) {

						HSSFCell cell61 = row.createCell(50);
						cell61.setCellValue(empList.get(j).get("KD_CMCC").toString());
					}
					if (empList.get(j).get("KD_RATE") != null) {

						HSSFCell cell62 = row.createCell(51);
						cell62.setCellValue(empList.get(j).get("KD_RATE").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC") != null) {

						HSSFCell cell63 = row.createCell(52);
						cell63.setCellValue(empList.get(j).get("CONTRACT_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_PHONE_CMCC") != null) {

						HSSFCell cell64 = row.createCell(53);
						cell64.setCellValue(empList.get(j).get("CONTRACT_PHONE_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_KD_CMCC") != null) {

						HSSFCell cell65 = row.createCell(54);
						cell65.setCellValue(empList.get(j).get("CONTRACT_KD_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_OTHER_CMCC") != null) {

						HSSFCell cell66 = row.createCell(55);
						cell66.setCellValue(empList.get(j).get("CONTRACT_OTHER_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC_TOL") != null) {

						HSSFCell cell67 = row.createCell(56);
						cell67.setCellValue(empList.get(j).get("CONTRACT_CMCC_TOL").toString());
					}
					if (empList.get(j).get("HY_RATE") != null) {

						HSSFCell cell68 = row.createCell(57);
						cell68.setCellValue(empList.get(j).get("HY_RATE").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void ReportForm5ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("各高校校园客户情况月报表列表");
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
			cell1.setCellValue("各高校校园客户情况月报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市名称", "区县名称", "学校编码", "学校名称", "分校区编码", "分校区名称", "当月移动累计新增通话校园客户", "当月联通累计新增通话校园客户", "当月电信累计新增通话校园客户",
					"当月移动累计新增通话校园客户份额X%", "当月移动累计新增通话校园客户份额排名", "8月1日起移动累计新增通话校园客户", "8月1日起联通累计新增通话校园客户", "8月1日起电信累计新增通话校园客户", "8月1日起移动累计新增通话校园客户市场份额X%",
					"8月1日起移动累计新增通话校园客户市场份额排名", "期末移动通话客户数", "期末联通通话客户数", "期末电信通话客户数", "期末移动通话客户市场份额X%", "期末移动通话客户市场份额排名", "期末联通通话市场份额X%", "期末电信通话市场份额X%",
					"期末移动通信客户数", "期末联通通信客户数", "期末电信通信客户数", "期末通信客户市场份额X%", "期末通信客户市场份额排名", "联通期末通信市场份额X%", "电信期末通信市场份额X%", "当月新增4G客户数", "期末4G客户数", "4G客户渗透率X%",
					"4G客户渗透率排名", "当月新增不限量套餐客户数", "期末不限量套餐客户数", "不限量套餐客户渗透率X%", "不限量套餐客户渗透率排名", "其中：不限量流量包渗透率", "当月ARPU", "当月ARPU环比变化", "累计月均ARPU", "当月DOU(G)",
					"当月DOU环比变化", "累计月均DOU", "当月MOU", "当月MOU环比变化", "累计月均MOU", "当前V网客户数", "V网客户渗透率", "本月缴费用户数", "本月缴费用户渗透率", "当月新增宽带客户数", "期末宽带客户数 ", "宽带客户渗透率%",
					"期末存费类客户数", "期末终端类客户数", "期末宽带类客户数", "期末其他类客户数", "小计", "合约率" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_MONTH") != null) {

						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_MONTH").toString());
					}
					if (empList.get(j).get("SCH_AREA_NAME") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("CNTY_NAME") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("CNTY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("ADD_CMCC_M") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CUCC_M") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("ADD_CUCC_M").toString());
					}
					if (empList.get(j).get("ADD_CTCC_M") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("ADD_CTCC_M").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_M") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_M").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_M") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("RANK_ADD_CMCC_M").toString());
					}
					if (empList.get(j).get("ADD_CMCC_AFTER0801") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CUCC_AFTER0801") != null) {

						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("ADD_CUCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_CTCC_AFTER0801") != null) {

						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("ADD_CTCC_AFTER0801").toString());
					}
					if (empList.get(j).get("ADD_SHARE_CMCC_AFTER0801") != null) {

						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("ADD_SHARE_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("RANK_ADD_CMCC_AFTER0801") != null) {

						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("RANK_ADD_CMCC_AFTER0801").toString());
					}
					if (empList.get(j).get("CALL_CMCC") != null) {

						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("CALL_CMCC").toString());
					}
					if (empList.get(j).get("CALL_CUCC") != null) {

						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("CALL_CUCC").toString());
					}
					if (empList.get(j).get("CALL_CTCC") != null) {

						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("CALL_CTCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CMCC") != null) {

						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("CALL_SHARE_CMCC").toString());
					}
					if (empList.get(j).get("CALL_RANK_CMCC") != null) {

						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("CALL_RANK_CMCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CUCC") != null) {

						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("CALL_SHARE_CUCC").toString());
					}
					if (empList.get(j).get("CALL_SHARE_CTCC") != null) {

						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("CALL_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CMCC") != null) {

						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("COMMUNI_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CUCC") != null) {

						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("COMMUNI_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_CTCC") != null) {

						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("COMMUNI_CTCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CMCC") != null) {

						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("COMMUNI_SHARE_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_RANK_CMCC") != null) {

						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("COMMUNI_RANK_CMCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CUCC") != null) {

						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("COMMUNI_SHARE_CUCC").toString());
					}
					if (empList.get(j).get("COMMUNI_SHARE_CTCC") != null) {

						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("COMMUNI_SHARE_CTCC").toString());
					}
					if (empList.get(j).get("G4_CMCC_M") != null) {

						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("G4_CMCC_M").toString());
					}
					if (empList.get(j).get("G4_CMCC") != null) {

						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("G4_CMCC").toString());
					}
					if (empList.get(j).get("G4_RATE") != null) {

						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("G4_RATE").toString());
					}
					if (empList.get(j).get("G4_RANK") != null) {

						HSSFCell cell45 = row.createCell(34);
						cell45.setCellValue(empList.get(j).get("G4_RANK").toString());
					}
					if (empList.get(j).get("UMLIMIT_CMCC_M") != null) {

						HSSFCell cell46 = row.createCell(35);
						cell46.setCellValue(empList.get(j).get("UMLIMIT_CMCC_M").toString());
					}
					if (empList.get(j).get("UNLIMIT_CMCC") != null) {

						HSSFCell cell47 = row.createCell(36);
						cell47.setCellValue(empList.get(j).get("UNLIMIT_CMCC").toString());
					}
					if (empList.get(j).get("UNLIMIT_RATE") != null) {

						HSSFCell cell48 = row.createCell(37);
						cell48.setCellValue(empList.get(j).get("UNLIMIT_RATE").toString());
					}
					if (empList.get(j).get("UNLIMIT_RANK") != null) {

						HSSFCell cell49 = row.createCell(38);
						cell49.setCellValue(empList.get(j).get("UNLIMIT_RANK").toString());
					}
					if (empList.get(j).get("UNLIMIT_DIEJIA") != null) {

						HSSFCell cell50 = row.createCell(39);
						cell50.setCellValue(empList.get(j).get("UNLIMIT_DIEJIA").toString());
					}
					if (empList.get(j).get("ARPU") != null) {

						HSSFCell cell51 = row.createCell(40);
						cell51.setCellValue(empList.get(j).get("ARPU").toString());
					}
					if (empList.get(j).get("ARPU_TWO_MONTH") != null) {

						HSSFCell cell52 = row.createCell(41);
						cell52.setCellValue(empList.get(j).get("ARPU_TWO_MONTH").toString());
					}
					if (empList.get(j).get("ARPU_MEAN") != null) {

						HSSFCell cell53 = row.createCell(42);
						cell53.setCellValue(empList.get(j).get("ARPU_MEAN").toString());
					}
					if (empList.get(j).get("MOU") != null) {

						HSSFCell cell54 = row.createCell(43);
						cell54.setCellValue(empList.get(j).get("MOU").toString());
					}
					if (empList.get(j).get("MOU_TWO_MONTH") != null) {

						HSSFCell cell55 = row.createCell(44);
						cell55.setCellValue(empList.get(j).get("MOU_TWO_MONTH").toString());
					}
					if (empList.get(j).get("MOU_MEAN") != null) {

						HSSFCell cell56 = row.createCell(45);
						cell56.setCellValue(empList.get(j).get("MOU_MEAN").toString());
					}
					if (empList.get(j).get("DOU") != null) {

						HSSFCell cell57 = row.createCell(46);
						cell57.setCellValue(empList.get(j).get("DOU").toString());
					}
					if (empList.get(j).get("DOU_TWO_MONTH") != null) {

						HSSFCell cell58 = row.createCell(47);
						cell58.setCellValue(empList.get(j).get("DOU_TWO_MONTH").toString());
					}
					if (empList.get(j).get("DOU_MEAN") != null) {

						HSSFCell cell59 = row.createCell(48);
						cell59.setCellValue(empList.get(j).get("DOU_MEAN").toString());
					}
					if (empList.get(j).get("VNET") != null) {

						HSSFCell cell60 = row.createCell(49);
						cell60.setCellValue(empList.get(j).get("VNET").toString());
					}
					if (empList.get(j).get("VNET_RATE") != null) {

						HSSFCell cell61 = row.createCell(50);
						cell61.setCellValue(empList.get(j).get("VNET_RATE").toString());
					}
					if (empList.get(j).get("CHARGE") != null) {

						HSSFCell cell62 = row.createCell(51);
						cell62.setCellValue(empList.get(j).get("CHARGE").toString());
					}
					if (empList.get(j).get("CHARGE_RATE") != null) {

						HSSFCell cell63 = row.createCell(52);
						cell63.setCellValue(empList.get(j).get("CHARGE_RATE").toString());
					}
					if (empList.get(j).get("KD_CMCC_M") != null) {

						HSSFCell cell64 = row.createCell(53);
						cell64.setCellValue(empList.get(j).get("KD_CMCC_M").toString());
					}
					if (empList.get(j).get("KD_CMCC") != null) {

						HSSFCell cell65 = row.createCell(54);
						cell65.setCellValue(empList.get(j).get("KD_CMCC").toString());
					}
					if (empList.get(j).get("KD_RATE") != null) {

						HSSFCell cell66 = row.createCell(55);
						cell66.setCellValue(empList.get(j).get("KD_RATE").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC") != null) {

						HSSFCell cell67 = row.createCell(56);
						cell67.setCellValue(empList.get(j).get("CONTRACT_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_PHONE_CMCC") != null) {

						HSSFCell cell68 = row.createCell(57);
						cell68.setCellValue(empList.get(j).get("CONTRACT_PHONE_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_KD_CMCC") != null) {

						HSSFCell cell69 = row.createCell(58);
						cell69.setCellValue(empList.get(j).get("CONTRACT_KD_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_OTHER_CMCC") != null) {

						HSSFCell cell70 = row.createCell(59);
						cell70.setCellValue(empList.get(j).get("CONTRACT_OTHER_CMCC").toString());
					}
					if (empList.get(j).get("CONTRACT_CMCC_TOL") != null) {

						HSSFCell cell71 = row.createCell(60);
						cell71.setCellValue(empList.get(j).get("CONTRACT_CMCC_TOL").toString());
					}
					if (empList.get(j).get("HY_RATE") != null) {

						HSSFCell cell72 = row.createCell(61);
						cell72.setCellValue(empList.get(j).get("HY_RATE").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm6ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("校园重点活动办理情况表（日累计）列表");
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
			cell1.setCellValue("校园重点活动办理情况表（日累计）列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市", "区县", "学校编码", "学校名称", "分校区编码", "分校区名称", "校园和享包", "畅享包", "区域流量包", "语音叠加包", "流量提速包", "入网送费", "入网送和包券", "入网办甜言蜜语包",
					"入网送高校集团网", "存费送费", "存费送和包券", "不限量叠加包", "校园明星机", "信用购", "融合宽带", "叠加型宽带", "单宽带", "套餐功能费减免" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_DATE") != null) {

						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_DATE").toString());
					}
					if (empList.get(j).get("SCH_AREA_NAME") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("CNTY_NAME") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("CNTY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("PACK_HE") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("PACK_HE").toString());
					}
					if (empList.get(j).get("PACK_CHANG") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("PACK_CHANG").toString());
					}
					if (empList.get(j).get("PACK_DISTRI_FLOW") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("PACK_DISTRI_FLOW").toString());
					}
					if (empList.get(j).get("PACK_VOICE") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("PACK_VOICE").toString());
					}
					if (empList.get(j).get("PACK_FLOW_SPEED_UP") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("PACK_FLOW_SPEED_UP").toString());
					}
					if (empList.get(j).get("ACCESS_DISC_FEE") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("ACCESS_DISC_FEE").toString());
					}
					if (empList.get(j).get("ACCESS_DISC_TICKET") != null) {

						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("ACCESS_DISC_TICKET").toString());
					}
					if (empList.get(j).get("ACCESS_DISC_VOICE") != null) {

						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("ACCESS_DISC_VOICE").toString());
					}
					if (empList.get(j).get("ACCESS_DISC_GROUP") != null) {

						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("ACCESS_DISC_GROUP").toString());
					}
					if (empList.get(j).get("DISC_FEE") != null) {

						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("DISC_FEE").toString());
					}
					if (empList.get(j).get("DISC_TICKET") != null) {

						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("DISC_TICKET").toString());
					}
					if (empList.get(j).get("DISC_UNLIMIT") != null) {

						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("DISC_UNLIMIT").toString());
					}
					if (empList.get(j).get("TERMI_DISC_HOT") != null) {

						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("TERMI_DISC_HOT").toString());
					}
					if (empList.get(j).get("TERMI_DISC_CREDIT") != null) {

						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("TERMI_DISC_CREDIT").toString());
					}
					if (empList.get(j).get("KD_DISC_MULTI") != null) {

						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("KD_DISC_MULTI").toString());
					}
					if (empList.get(j).get("KD_DISC_DIAJIA") != null) {

						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("KD_DISC_DIAJIA").toString());
					}
					if (empList.get(j).get("KD_DISC_SINGAL") != null) {

						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("KD_DISC_SINGAL").toString());
					}
					if (empList.get(j).get("DISC_TAOCAN") != null) {

						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("DISC_TAOCAN").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm7ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("校园重点活动办理明细日报表列表");
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
			cell1.setCellValue("校园重点活动办理明细日报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市", "区县", "学校编码", "学校名称", "分校区编码", "分校区名称", "业务类型", "优惠编码", "优惠名称", "当日办理量", "当月办理量", "累计办理量" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_DATE") != null) {

						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_DATE").toString());
					}
					if (empList.get(j).get("SCH_AREA_NAME") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("CNTY_NAME") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("CNTY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("LEVEL_1_NAME") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("LEVEL_1_NAME").toString());
					}
					if (empList.get(j).get("DISCNT_ID") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("DISCNT_ID").toString());
					}
					if (empList.get(j).get("DISCNT_NAME") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("DISCNT_NAME").toString());
					}
					if (empList.get(j).get("ORDER_TODAY") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("ORDER_TODAY").toString());
					}
					if (empList.get(j).get("ORDER_MONTH") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("ORDER_MONTH").toString());
					}
					if (empList.get(j).get("ORDER_TOTAL") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("ORDER_TOTAL").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm8ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("存量校园客户保有情况日报表列表");
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
			cell1.setCellValue("存量校园客户保有情况日报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市名称", "区县名称", "学校名称", "分校区编码", "分校区名称',,'拍照客户数", "当前保有客户数", "客户保有率" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_DATE") != null) {
						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_DATE").toString());
					}
					if (empList.get(j).get("SCH_AREA_NAME") != null) {
						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("CNTY_NAME") != null) {
						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("CNTY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {
						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {
						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {
						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {
						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("pz_usrs") != null) {
						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("pz_usrs").toString());
					}
					if (empList.get(j).get("onnet_usrs") != null) {
						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("onnet_usrs").toString());
					}
					if (empList.get(j).get("onnet_rate") != null) {
						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("onnet_rate").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm9ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			XSSFWorkbook workbook = new XSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			XSSFCellStyle style1 = workbook.createCellStyle();

			// 2、创建工作表
			XSSFSheet sheet = workbook.createSheet("校园移动用户明细数据月报表列表");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);

			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			XSSFRow row1 = sheet.createRow(0);
			XSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("校园移动用户明细数据月报表列表");

			// 3.2、创建列标题行；并且设置列标题
			XSSFRow row2 = sheet.createRow(1);
			String[] titles = { "地市", "区县", "学校编码", "学校名称", "客户号码", "ARPU", "DOU", "MOU", "当前主套餐编码", "当前主套餐名称", "是否4G", "是否V网", "是否宽带客户", "合约活动类型", "产品编码",
					"合约活动产品名称", "优惠编码", "合约活动优惠名称", "到期时间", "网龄", "当月折扣折让金额", "折扣优惠编码", "折扣优惠档次", "套餐减免优惠编码", "套餐减免优惠名称" };
			for (int i = 0; i < titles.length; i++) {
				XSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					XSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("SCH_AREA_NAME") != null) {
						XSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("SCH_AREA_NAME").toString());
					}
					if (empList.get(j).get("QX_NAME") != null) {
						XSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("QX_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {
						XSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {
						XSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SVC_CODE") != null) {
						XSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SVC_CODE").toString());
					}
					if (empList.get(j).get("ARPU") != null) {
						XSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("ARPU").toString());
					}
					if (empList.get(j).get("DOU") != null) {
						XSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("DOU").toString());
					}
					if (empList.get(j).get("MOU") != null) {
						XSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("MOU").toString());
					}
					if (empList.get(j).get("TAOCAN_ID") != null) {
						XSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("TAOCAN_ID").toString());
					}
					if (empList.get(j).get("TAOCAN_NAME") != null) {
						XSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("TAOCAN_NAME").toString());
					}
					if (empList.get(j).get("IS_4G") != null) {
						XSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("IS_4G").toString());
					}
					if (empList.get(j).get("IS_VNET") != null) {
						XSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("IS_VNET").toString());

					}
					if (empList.get(j).get("IS_KD") != null) {
						XSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("IS_KD").toString());
					}
					if (empList.get(j).get("CONTRACT_CAT") != null) {
						XSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("CONTRACT_CAT").toString());
					}
					if (empList.get(j).get("CONT_PRODUCT_ID") != null) {
						XSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("CONT_PRODUCT_ID").toString());
					}
					if (empList.get(j).get("CONT_PRODUCT_NAME") != null) {
						XSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("CONT_PRODUCT_NAME").toString());

					}
					if (empList.get(j).get("CONT_PACKAGE_ID") != null) {
						XSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("CONT_PACKAGE_ID").toString());
					}
					if (empList.get(j).get("CONT_PACKAGE_NAME") != null) {
						XSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("CONT_PACKAGE_NAME").toString());
					}
					if (empList.get(j).get("CONT_INVAL") != null) {
						XSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("CONT_INVAL").toString());
					}
					if (empList.get(j).get("ONLINE_MONTH") != null) {
						XSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("ONLINE_MONTH").toString());
					}
					if (empList.get(j).get("FEE_DISCNT") != null) {
						XSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("FEE_DISCNT").toString());
					}
					if (empList.get(j).get("DISCNT_YOUHUI_ID") != null) {
						XSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("DISCNT_YOUHUI_ID").toString());
					}
					if (empList.get(j).get("DISCNT_YOUHUI_RANK") != null) {
						XSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("DISCNT_YOUHUI_RANK").toString());
					}
					if (empList.get(j).get("DISCNT_ID") != null) {
						XSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("DISCNT_ID").toString());
					}
					if (empList.get(j).get("DISCNT_NAME") != null) {
						XSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("DISCNT_NAME").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm10ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) throws IOException {

			// 1、创建工作簿
			XSSFWorkbook workbook = null;
		try {
			workbook = new XSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			XSSFCellStyle style1 = workbook.createCellStyle();

			// 2、创建工作表
			XSSFSheet sheet = workbook.createSheet("校园异网用户明细数据月报表列表");
			// 2.1、加载合并单元格对象
			sheet.addMergedRegion(cellRangeAddress);
			// 设置默认列宽
			sheet.setDefaultColumnWidth(25);

			// 3、创建行
			// 3.1、创建头标题行；并且设置头标题
			XSSFRow row1 = sheet.createRow(0);
			XSSFCell cell1 = row1.createCell(0);
			// 加载单元格样式
			cell1.setCellStyle(style1);
			cell1.setCellValue("校园异网用户明细数据月报表列表");

			// 3.2、创建列标题行；并且设置列标题
			XSSFRow row2 = sheet.createRow(1);
			String[] titles = { "地市", "区县", "学校编码", "学校名称", "异网号码", "运营商", "交往圈个数" };
			for (int i = 0; i < titles.length; i++) {
				XSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					XSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("CITY_NAME") != null) {
						XSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("CITY_NAME").toString());
					}
					if (empList.get(j).get("QX_NAME") != null) {
						XSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("QX_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {
						XSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {
						XSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("OTHR_PARTY") != null) {
						XSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("OTHR_PARTY").toString());
					}
					if (empList.get(j).get("OTHER_OPRAT_TYP") != null) {
						XSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("OTHER_OPRAT_TYP").toString());
					}
					if (empList.get(j).get("CIRCLE_USERS") != null) {
						XSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("CIRCLE_USERS").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			workbook.close();
		}

	}

	public void ReportForm11ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("校园一经月报表列表");
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
			cell1.setCellValue("校园一经月报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "校园移动用户DOU（GB）", "其中不限量用户DOU（GB）", "不限量主套餐用户DOU（GB）", "DOU为0的用户数（万人）", "DOU为（0,100MB）的用户数（万人）",
					"DOU为（100MB，5GB）的用户数（万人）", "DOU为（5GB，10GB）的用户数（万人）", "DOU为（10GB，15GB）的用户数（万人）", "DOU为（15GB，20GB）的用户数（万人）", "DOU为（20GB，40GB）以上的用户数（万人）",
					"DOU为40GB以上的用户数（万人）", "青春卡不限量版用户DOU（GB）", "DOU为0的用户数（万人）", "DOU为（0,100MB）的用户数（万人）", "DOU为（100MB，5GB）的用户数（万人）", "DOU为（5GB，10GB）的用户数（万人）",
					"DOU为（10GB，15GB）的用户数（万人）", "DOU为（15GB，20GB）的用户数（万人）", "DOU为（20GB，40GB）以上的用户数（万人）", "DOU为40GB以上的用户数（万人）", "不限量叠加包用户DOU（GB）",
					"DOU为0的用户数（万人）", "DOU为（0,100MB）的用户数（万人）", "DOU为（100MB，5GB）的用户数（万人）", "DOU为（5GB，10GB）的用户数（万人）", "DOU为（10GB，15GB）的用户数（万人）",
					"DOU为（15GB，20GB）的用户数（万人）", "DOU为（20GB，40GB）以上的用户数（万人）", "DOU为40GB以上的用户数（万人）", "日租卡不限量用户DOU（GB）", "DOU为0的用户数（万人）", "DOU为（0,100MB）的用户数（万人）",
					"DOU为（100MB，5GB）的用户数（万人）", "DOU为（5GB，10GB）的用户数（万人）", "DOU为（10GB，15GB）的用户数（万人）", "DOU为（15GB，20GB）的用户数（万人）", "DOU为（20GB，40GB）以上的用户数（万人）",
					"DOU为40GB以上的用户数（万人）", "其中：非不限量用户DOU（GB）", "DOU为0的用户数（万人）", "DOU为（0,100MB）的用户数（万人）", "DOU为（100MB，5GB）的用户数（万人）", "DOU为（5GB，10GB）的用户数（万人）",
					"DOU为（10GB，15GB）的用户数（万人）", "DOU为（15GB，20GB）的用户数（万人）", "DOU为（20GB，40GB）以上的用户数（万人）", "DOU为40GB以上的用户数（万人）", "移动和享包DOU（GB）",
					"30GB互联网畅享包DOU（GB）", "40GB互联网畅享包DOU（GB）", "校园移动用户Wlan流量DOU（GB）", "校园移动用户宽带月均时长（小时）" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_MONTH") != null) {

						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_MONTH").toString());
					}
					if (empList.get(j).get("LL_ZONG") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("LL_ZONG").toString());
					}
					if (empList.get(j).get("LL_BUXIAL") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("LL_BUXIAL").toString());
					}
					if (empList.get(j).get("LL_ZONG_ZHU") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("LL_ZONG_ZHU").toString());
					}
					if (empList.get(j).get("ZHU_LL_0") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("ZHU_LL_0").toString());
					}
					if (empList.get(j).get("ZHU_LL_100M") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("ZHU_LL_100M").toString());
					}
					if (empList.get(j).get("ZHU_LL_5G") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("ZHU_LL_5G").toString());
					}
					if (empList.get(j).get("ZHU_LL_10G") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("ZHU_LL_10G").toString());
					}
					if (empList.get(j).get("ZHU_LL_15G") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("ZHU_LL_15G").toString());
					}
					if (empList.get(j).get("ZHU_LL_20G") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("ZHU_LL_20G").toString());
					}
					if (empList.get(j).get("ZHU_LL_40G") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("ZHU_LL_40G").toString());
					}
					if (empList.get(j).get("ZHU_LL_50G") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("ZHU_LL_50G").toString());
					}
					if (empList.get(j).get("LL_ZONG_QINGCHUN") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("LL_ZONG_QINGCHUN").toString());
					}
					if (empList.get(j).get("QC_LL_0") != null) {

						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("QC_LL_0").toString());
					}
					if (empList.get(j).get("QC_LL_100M") != null) {

						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("QC_LL_100M").toString());
					}
					if (empList.get(j).get("QC_LL_5G") != null) {

						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("QC_LL_5G").toString());
					}
					if (empList.get(j).get("QC_LL_10G") != null) {

						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("QC_LL_10G").toString());
					}
					if (empList.get(j).get("QC_LL_15G") != null) {

						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("QC_LL_15G").toString());
					}
					if (empList.get(j).get("QC_LL_20G") != null) {

						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("QC_LL_20G").toString());
					}
					if (empList.get(j).get("QC_LL_40G") != null) {

						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("QC_LL_40G").toString());
					}
					if (empList.get(j).get("QC_LL_50G") != null) {

						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("QC_LL_50G").toString());
					}
					if (empList.get(j).get("LL_ZONG_DIE") != null) {

						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("LL_ZONG_DIE").toString());
					}
					if (empList.get(j).get("DIE_LL_0") != null) {

						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("DIE_LL_0").toString());
					}
					if (empList.get(j).get("DIE_LL_100M") != null) {

						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("DIE_LL_100M").toString());
					}
					if (empList.get(j).get("DIE_LL_5G") != null) {

						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("DIE_LL_5G").toString());
					}
					if (empList.get(j).get("DIE_LL_10G") != null) {

						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("DIE_LL_10G").toString());
					}
					if (empList.get(j).get("DIE_LL_15G") != null) {

						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("DIE_LL_15G").toString());
					}
					if (empList.get(j).get("DIE_LL_20G") != null) {

						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("DIE_LL_20G").toString());
					}
					if (empList.get(j).get("DIE_LL_40G") != null) {

						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("DIE_LL_40G").toString());
					}
					if (empList.get(j).get("DIE_LL_50G") != null) {

						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("DIE_LL_50G").toString());
					}
					if (empList.get(j).get("LL_ZONG_RIZU") != null) {

						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("LL_ZONG_RIZU").toString());
					}
					if (empList.get(j).get("RIZU_LL_0") != null) {

						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("RIZU_LL_0").toString());
					}
					if (empList.get(j).get("RIZU_LL_100M") != null) {

						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("RIZU_LL_100M").toString());
					}
					if (empList.get(j).get("RIZU_LL_5G") != null) {

						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("RIZU_LL_5G").toString());
					}
					if (empList.get(j).get("RIZU_LL_10G") != null) {

						HSSFCell cell45 = row.createCell(34);
						cell45.setCellValue(empList.get(j).get("RIZU_LL_10G").toString());
					}
					if (empList.get(j).get("RIZU_LL_15G") != null) {

						HSSFCell cell46 = row.createCell(35);
						cell46.setCellValue(empList.get(j).get("RIZU_LL_15G").toString());
					}
					if (empList.get(j).get("RIZU_LL_20G") != null) {

						HSSFCell cell47 = row.createCell(36);
						cell47.setCellValue(empList.get(j).get("RIZU_LL_20G").toString());
					}
					if (empList.get(j).get("RIZU_LL_40G") != null) {

						HSSFCell cell48 = row.createCell(37);
						cell48.setCellValue(empList.get(j).get("RIZU_LL_40G").toString());
					}
					if (empList.get(j).get("RIZU_LL_50G") != null) {

						HSSFCell cell49 = row.createCell(38);
						cell49.setCellValue(empList.get(j).get("RIZU_LL_50G").toString());
					}
					if (empList.get(j).get("LL_ZONG_FEIBU") != null) {

						HSSFCell cell50 = row.createCell(39);
						cell50.setCellValue(empList.get(j).get("LL_ZONG_FEIBU").toString());
					}
					if (empList.get(j).get("FEIBU_LL_0") != null) {

						HSSFCell cell51 = row.createCell(40);
						cell51.setCellValue(empList.get(j).get("FEIBU_LL_0").toString());
					}
					if (empList.get(j).get("FEIBU_LL_100M") != null) {

						HSSFCell cell52 = row.createCell(41);
						cell52.setCellValue(empList.get(j).get("FEIBU_LL_100M").toString());
					}
					if (empList.get(j).get("FEIBU_LL_5G") != null) {

						HSSFCell cell53 = row.createCell(42);
						cell53.setCellValue(empList.get(j).get("FEIBU_LL_5G").toString());
					}
					if (empList.get(j).get("FEIBU_LL_10G") != null) {

						HSSFCell cell54 = row.createCell(43);
						cell54.setCellValue(empList.get(j).get("FEIBU_LL_10G").toString());
					}
					if (empList.get(j).get("FEIBU_LL_15G") != null) {

						HSSFCell cell55 = row.createCell(44);
						cell55.setCellValue(empList.get(j).get("FEIBU_LL_15G").toString());
					}
					if (empList.get(j).get("FEIBU_LL_20G") != null) {

						HSSFCell cell56 = row.createCell(45);
						cell56.setCellValue(empList.get(j).get("FEIBU_LL_20G").toString());
					}
					if (empList.get(j).get("FEIBU_LL_40G") != null) {

						HSSFCell cell57 = row.createCell(46);
						cell57.setCellValue(empList.get(j).get("FEIBU_LL_40G").toString());
					}
					if (empList.get(j).get("FEIBU_LL_50G") != null) {

						HSSFCell cell58 = row.createCell(47);
						cell58.setCellValue(empList.get(j).get("FEIBU_LL_50G").toString());
					}
					if (empList.get(j).get("LL_ZONG_HEXING") != null) {

						HSSFCell cell59 = row.createCell(48);
						cell59.setCellValue(empList.get(j).get("LL_ZONG_HEXING").toString());
					}
					if (empList.get(j).get("LL_ZONG_CHANG_30G") != null) {

						HSSFCell cell60 = row.createCell(49);
						cell60.setCellValue(empList.get(j).get("LL_ZONG_CHANG_30G").toString());
					}
					if (empList.get(j).get("LL_ZONG_CHANG_40G") != null) {

						HSSFCell cell61 = row.createCell(50);
						cell61.setCellValue(empList.get(j).get("LL_ZONG_CHANG_40G").toString());
					}
					if (empList.get(j).get("LL_WLAN") != null) {

						HSSFCell cell62 = row.createCell(51);
						cell62.setCellValue(empList.get(j).get("LL_WLAN").toString());
					}
					if (empList.get(j).get("DOU") != null) {

						HSSFCell cell63 = row.createCell(52);
						cell63.setCellValue(empList.get(j).get("DOU").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm12ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("校园一经周报表列表");
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
			cell1.setCellValue("校园一经周报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "大中专院校数", "学生数（万人）", "新生数（万人）", "活动进驻校园数（所）", "竞品情况", "移动", "电信", "联通", "流量环比增幅（%）", "wlan覆盖校园数（所）", "宽带覆盖校园数（所）",
					"渠道覆盖校园数（所）", "校园新增用户数（万人）", "不限量套餐用户数（万人）", "青春卡用户数（万人）", "不限量叠加包用户数（万人）", "日租不限量用户数（万人）", "非不限量用户数（万人）", "移动和享包用户数（万人）", "互联网畅享包用户数（万人）",
					"校园存量用户数（万人）", "不限量主套餐用户数（万人）", "不限量主套餐中：青春卡不限量版用户数（万人）", "不限量叠加包用户数（万人）", "日租不限量用户数（万人）", "非不限量用户数（万人）", "移动和享包用户数（万人）", "互联网畅享包用户数（万人）",
					"开展和包活动的校园数（所）", "和包APP使用用户数（万人）", "视频彩铃用户数（万人）", "和飞信用户数（万人）", "宽带订购用户数（万人）", "校园V网用户数（万人）", "校园WLAN用户数（万人）" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_DATE") != null) {

						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_DATE").toString());
					}
					if (empList.get(j).get("SCH_NUM") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("SCH_NUM").toString());
					}
					if (empList.get(j).get("SCH_USER") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("SCH_USER").toString());
					}
					if (empList.get(j).get("SCH_NEW_USER") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_NEW_USER").toString());
					}
					if (empList.get(j).get("SCH_ACTIVE") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_ACTIVE").toString());
					}
					if (empList.get(j).get("COMP_INFO") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("COMP_INFO").toString());
					}
					if (empList.get(j).get("SCH_ASIT_CMCC") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("SCH_ASIT_CMCC").toString());
					}
					if (empList.get(j).get("SCH_ASIT_CUCC") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("SCH_ASIT_CUCC").toString());
					}
					if (empList.get(j).get("SCH_ASIT_CTCC") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("SCH_ASIT_CTCC").toString());
					}
					if (empList.get(j).get("FLOW_RATE") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("FLOW_RATE").toString());
					}
					if (empList.get(j).get("SCH_WLAN") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("SCH_WLAN").toString());
					}
					if (empList.get(j).get("SCH_KD") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("SCH_KD").toString());
					}
					if (empList.get(j).get("NUM_QUDAO") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("NUM_QUDAO").toString());
					}
					if (empList.get(j).get("NEWNUM") != null) {

						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("NEWNUM").toString());
					}
					if (empList.get(j).get("NEWNUM_UNLIMIT") != null) {

						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("NEWNUM_UNLIMIT").toString());
					}
					if (empList.get(j).get("NEWNUM_YOUTH") != null) {

						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("NEWNUM_YOUTH").toString());
					}
					if (empList.get(j).get("NEWNUM_PACK") != null) {

						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("NEWNUM_PACK").toString());
					}
					if (empList.get(j).get("NEWNUM_DPACK") != null) {

						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("NEWNUM_DPACK").toString());
					}
					if (empList.get(j).get("NEWNUM_LIMIT") != null) {

						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("NEWNUM_LIMIT").toString());
					}
					if (empList.get(j).get("NEWNUM_AND_PACK") != null) {

						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("NEWNUM_AND_PACK").toString());
					}
					if (empList.get(j).get("NEWNUM_WLAN_PACK") != null) {

						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("NEWNUM_WLAN_PACK").toString());
					}
					if (empList.get(j).get("NUM") != null) {

						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("NUM").toString());
					}
					if (empList.get(j).get("NUM_UNLIMIT") != null) {

						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("NUM_UNLIMIT").toString());
					}
					if (empList.get(j).get("NUM_YOUTH") != null) {

						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("NUM_YOUTH").toString());
					}
					if (empList.get(j).get("NUM_PACK") != null) {

						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("NUM_PACK").toString());
					}
					if (empList.get(j).get("NUM_DPACK") != null) {

						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("NUM_DPACK").toString());
					}
					if (empList.get(j).get("NUM_LIMIT") != null) {

						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("NUM_LIMIT").toString());
					}
					if (empList.get(j).get("NUM_AND_PACK") != null) {

						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("NUM_AND_PACK").toString());
					}
					if (empList.get(j).get("NUM_WLAN_PACK") != null) {

						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("NUM_WLAN_PACK").toString());
					}
					if (empList.get(j).get("SCH_HB") != null) {

						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("SCH_HB").toString());
					}
					if (empList.get(j).get("NUM_HB") != null) {

						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("NUM_HB").toString());
					}
					if (empList.get(j).get("NUM_SPCL") != null) {

						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("NUM_SPCL").toString());
					}
					if (empList.get(j).get("NUM_FEIXIN") != null) {

						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("NUM_FEIXIN").toString());
					}
					if (empList.get(j).get("NUM_KD") != null) {

						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("NUM_KD").toString());
					}
					if (empList.get(j).get("NUM_VNET") != null) {

						HSSFCell cell45 = row.createCell(34);
						cell45.setCellValue(empList.get(j).get("NUM_VNET").toString());
					}
					if (empList.get(j).get("NUM_WLAN") != null) {

						HSSFCell cell46 = row.createCell(35);
						cell46.setCellValue(empList.get(j).get("NUM_WLAN").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm13ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("高校市场份额月报表列表");
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
			cell1.setCellValue("高校市场份额月报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市", "学校编码", "学校名称", "分校区编码", "分校区名称", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比",
					"学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数",
					"本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_MONTH") != null) {

						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_MONTH").toString());
					}
					if (empList.get(j).get("CITY_NAME") != null) {

						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("CITY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {

						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {

						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {

						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {

						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("ALL_NUM") != null) {

						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("ALL_NUM").toString());
					}
					if (empList.get(j).get("CMCC") != null) {

						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("CMCC").toString());
					}
					if (empList.get(j).get("ALL_COMPI") != null) {

						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("ALL_COMPI").toString());
					}
					if (empList.get(j).get("CUCC") != null) {

						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("CUCC").toString());
					}
					if (empList.get(j).get("CTCC") != null) {

						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("CTCC").toString());
					}
					if (empList.get(j).get("RATE_BENWANG") != null) {

						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("RATE_BENWANG").toString());
					}
					if (empList.get(j).get("RATE_COMPI") != null) {

						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("RATE_COMPI").toString());
					}
					if (empList.get(j).get("ALL_NEW_NUM") != null) {

						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("ALL_NEW_NUM").toString());
					}
					if (empList.get(j).get("NEW_CMCC") != null) {

						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("NEW_CMCC").toString());
					}
					if (empList.get(j).get("ALL_NEW_COMPI") != null) {

						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("ALL_NEW_COMPI").toString());
					}
					if (empList.get(j).get("NEW_CUCC") != null) {

						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("NEW_CUCC").toString());
					}

					if (empList.get(j).get("NEW_CTCC") != null) {

						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("NEW_CTCC").toString());
					}
					if (empList.get(j).get("RATE_NEW_BENWANG") != null) {

						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("RATE_NEW_BENWANG").toString());
					}
					if (empList.get(j).get("RATE_NEW_COMPI") != null) {

						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("RATE_NEW_COMPI").toString());
					}
					if (empList.get(j).get("ALL_NUM_S") != null) {

						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("ALL_NUM_S").toString());
					}
					if (empList.get(j).get("CMCC_S") != null) {

						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("CMCC_S").toString());
					}
					if (empList.get(j).get("ALL_COMPI_S") != null) {

						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("ALL_COMPI_S").toString());
					}
					if (empList.get(j).get("CUCC_S") != null) {

						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("CUCC_S").toString());
					}
					if (empList.get(j).get("CTCC_S") != null) {

						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("CTCC_S").toString());
					}
					if (empList.get(j).get("RATE_BENWANG_S") != null) {

						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("RATE_BENWANG_S").toString());
					}
					if (empList.get(j).get("RATE_COMPI_S") != null) {

						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("RATE_COMPI_S").toString());
					}
					if (empList.get(j).get("ALL_NEW_NUM_S") != null) {

						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("ALL_NEW_NUM_S").toString());
					}
					if (empList.get(j).get("NEW_CMCC_S") != null) {

						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("NEW_CMCC_S").toString());
					}
					if (empList.get(j).get("NEW_COMPI_S") != null) {

						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("NEW_COMPI_S").toString());
					}
					if (empList.get(j).get("NEW_CUCC_S") != null) {

						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("NEW_CUCC_S").toString());
					}
					if (empList.get(j).get("NEW_CTCC_S") != null) {

						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("NEW_CTCC_S").toString());
					}
					if (empList.get(j).get("RATE_NEW_BENWANG_S") != null) {

						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("RATE_NEW_BENWANG_S").toString());
					}
					if (empList.get(j).get("RATE_NEW_COMPI_S") != null) {

						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("RATE_NEW_COMPI_S").toString());
					}
				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void ReportForm14ExportExcel(List<Map<String, Object>> empList, ServletOutputStream outputStream) {

		try {
			// 1、创建工作簿
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 1.1、创建合并单元格对象
			CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 5);// 起始行号，结束行号，起始列号，结束列号

			// 1.2、头标题样式
			HSSFCellStyle style1 = createCellStyle(workbook, (short) 16);

			// 1.3、列标题样式
			HSSFCellStyle style2 = createCellStyle(workbook, (short) 13);

			// 2、创建工作表
			HSSFSheet sheet = workbook.createSheet("高校市场份额日报表列表");
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
			cell1.setCellValue("高校市场份额日报表列表");

			// 3.2、创建列标题行；并且设置列标题
			HSSFRow row2 = sheet.createRow(1);
			String[] titles = { "日期", "地市", "学校编码", "学校名称", "分校区编码", "分校区名称", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比",
					"学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数",
					"本网：学生用户占比", "异网：学生用户占比", "学生数", "本网学生数", "异网学生数", "其中：异网联通学生数", "其中：异网电信学生数", "本网：学生用户占比", "异网：学生用户占比" };
			for (int i = 0; i < titles.length; i++) {
				HSSFCell cell2 = row2.createCell(i);
				// 加载单元格样式
				cell2.setCellStyle(style2);
				cell2.setCellValue(titles[i]);
			}

			// 4、操作单元格；将用户列表写入excel
			if (empList != null) {
				for (int j = 0; j < empList.size(); j++) {
					HSSFRow row = sheet.createRow(j + 2);
					if (empList.get(j).get("STATIS_DATE") != null) {
						HSSFCell cell11 = row.createCell(0);
						cell11.setCellValue(empList.get(j).get("STATIS_DATE").toString());
					}
					if (empList.get(j).get("CITY_NAME") != null) {
						HSSFCell cell12 = row.createCell(1);
						cell12.setCellValue(empList.get(j).get("CITY_NAME").toString());
					}
					if (empList.get(j).get("SCH_ID") != null) {
						HSSFCell cell13 = row.createCell(2);
						cell13.setCellValue(empList.get(j).get("SCH_ID").toString());
					}
					if (empList.get(j).get("SCH_NAME") != null) {
						HSSFCell cell14 = row.createCell(3);
						cell14.setCellValue(empList.get(j).get("SCH_NAME").toString());
					}
					if (empList.get(j).get("SCH_PART_ID") != null) {
						HSSFCell cell15 = row.createCell(4);
						cell15.setCellValue(empList.get(j).get("SCH_PART_ID").toString());
					}
					if (empList.get(j).get("SCH_PART_NAME") != null) {
						HSSFCell cell16 = row.createCell(5);
						cell16.setCellValue(empList.get(j).get("SCH_PART_NAME").toString());
					}
					if (empList.get(j).get("ALL_NUM") != null) {
						HSSFCell cell17 = row.createCell(6);
						cell17.setCellValue(empList.get(j).get("ALL_NUM").toString());
					}
					if (empList.get(j).get("CMCC") != null) {
						HSSFCell cell18 = row.createCell(7);
						cell18.setCellValue(empList.get(j).get("CMCC").toString());
					}
					if (empList.get(j).get("ALL_COMPI") != null) {
						HSSFCell cell19 = row.createCell(8);
						cell19.setCellValue(empList.get(j).get("ALL_COMPI").toString());
					}
					if (empList.get(j).get("CUCC") != null) {
						HSSFCell cell20 = row.createCell(9);
						cell20.setCellValue(empList.get(j).get("CUCC").toString());
					}
					if (empList.get(j).get("CTCC") != null) {
						HSSFCell cell21 = row.createCell(10);
						cell21.setCellValue(empList.get(j).get("CTCC").toString());
					}
					if (empList.get(j).get("RATE_BENWANG") != null) {
						HSSFCell cell22 = row.createCell(11);
						cell22.setCellValue(empList.get(j).get("RATE_BENWANG").toString());
					}
					if (empList.get(j).get("RATE_COMPI") != null) {
						HSSFCell cell23 = row.createCell(12);
						cell23.setCellValue(empList.get(j).get("RATE_COMPI").toString());
					}
					if (empList.get(j).get("ALL_NEW_NUM") != null) {
						HSSFCell cell24 = row.createCell(13);
						cell24.setCellValue(empList.get(j).get("ALL_NEW_NUM").toString());
					}
					if (empList.get(j).get("NEW_CMCC") != null) {
						HSSFCell cell25 = row.createCell(14);
						cell25.setCellValue(empList.get(j).get("NEW_CMCC").toString());
					}
					if (empList.get(j).get("ALL_NEW_COMPI") != null) {
						HSSFCell cell26 = row.createCell(15);
						cell26.setCellValue(empList.get(j).get("ALL_NEW_COMPI").toString());
					}
					if (empList.get(j).get("NEW_CUCC") != null) {
						HSSFCell cell27 = row.createCell(16);
						cell27.setCellValue(empList.get(j).get("NEW_CUCC").toString());
					}
					if (empList.get(j).get("NEW_CTCC") != null) {
						HSSFCell cell28 = row.createCell(17);
						cell28.setCellValue(empList.get(j).get("NEW_CTCC").toString());
					}
					if (empList.get(j).get("RATE_NEW_BENWANG") != null) {
						HSSFCell cell29 = row.createCell(18);
						cell29.setCellValue(empList.get(j).get("RATE_NEW_BENWANG").toString());
					}
					if (empList.get(j).get("RATE_NEW_COMPI") != null) {
						HSSFCell cell30 = row.createCell(19);
						cell30.setCellValue(empList.get(j).get("RATE_NEW_COMPI").toString());
					}
					if (empList.get(j).get("ALL_NUM_S") != null) {
						HSSFCell cell31 = row.createCell(20);
						cell31.setCellValue(empList.get(j).get("ALL_NUM_S").toString());
					}
					if (empList.get(j).get("CMCC_S") != null) {
						HSSFCell cell32 = row.createCell(21);
						cell32.setCellValue(empList.get(j).get("CMCC_S").toString());
					}
					if (empList.get(j).get("ALL_COMPI_S") != null) {
						HSSFCell cell33 = row.createCell(22);
						cell33.setCellValue(empList.get(j).get("ALL_COMPI_S").toString());
					}
					if (empList.get(j).get("CUCC_S") != null) {
						HSSFCell cell34 = row.createCell(23);
						cell34.setCellValue(empList.get(j).get("CUCC_S").toString());
					}
					if (empList.get(j).get("CTCC_S") != null) {
						HSSFCell cell35 = row.createCell(24);
						cell35.setCellValue(empList.get(j).get("CTCC_S").toString());
					}
					if (empList.get(j).get("RATE_BENWANG_S") != null) {
						HSSFCell cell36 = row.createCell(25);
						cell36.setCellValue(empList.get(j).get("RATE_BENWANG_S").toString());
					}
					if (empList.get(j).get("RATE_COMPI_S") != null) {
						HSSFCell cell37 = row.createCell(26);
						cell37.setCellValue(empList.get(j).get("RATE_COMPI_S").toString());
					}
					if (empList.get(j).get("ALL_NEW_NUM_S") != null) {
						HSSFCell cell38 = row.createCell(27);
						cell38.setCellValue(empList.get(j).get("ALL_NEW_NUM_S").toString());
					}
					if (empList.get(j).get("NEW_CMCC_S") != null) {
						HSSFCell cell39 = row.createCell(28);
						cell39.setCellValue(empList.get(j).get("NEW_CMCC_S").toString());
					}
					if (empList.get(j).get("NEW_COMPI_S") != null) {
						HSSFCell cell40 = row.createCell(29);
						cell40.setCellValue(empList.get(j).get("NEW_COMPI_S").toString());
					}
					if (empList.get(j).get("NEW_CUCC_S") != null) {
						HSSFCell cell41 = row.createCell(30);
						cell41.setCellValue(empList.get(j).get("NEW_CUCC_S").toString());
					}
					if (empList.get(j).get("NEW_CTCC_S") != null) {
						HSSFCell cell42 = row.createCell(31);
						cell42.setCellValue(empList.get(j).get("NEW_CTCC_S").toString());
					}
					if (empList.get(j).get("RATE_NEW_BENWANG_S") != null) {
						HSSFCell cell43 = row.createCell(32);
						cell43.setCellValue(empList.get(j).get("RATE_NEW_BENWANG_S").toString());
					}
					if (empList.get(j).get("RATE_NEW_COMPI_S") != null) {
						HSSFCell cell44 = row.createCell(33);
						cell44.setCellValue(empList.get(j).get("RATE_NEW_COMPI_S").toString());
					}

				}
			}
			// 5、输出
			workbook.write(outputStream);
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 创建单元格样式
	 * 
	 * @param workbook
	 *            工作簿
	 * @param fontSize
	 *            字体大小
	 * @return 单元格样式
	 */
	private static HSSFCellStyle createCellStyle(HSSFWorkbook workbook, short fontSize) {
		HSSFCellStyle style = workbook.createCellStyle();
		// 创建字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints(fontSize);
		// 加载字体
		style.setFont(font);
		return style;
	}
	
}
