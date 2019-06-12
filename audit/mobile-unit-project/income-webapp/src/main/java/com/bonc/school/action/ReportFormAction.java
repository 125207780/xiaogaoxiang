package com.bonc.school.action;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.school.service.ReportFormService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 报表专区
 * 
 * @author liulin
 *
 */
@Controller
@RequestMapping(value = "/getReportForm")
public class ReportFormAction {

	@Autowired
	private ReportFormService reportFormService;

	// 各高校校园客户情况日通报
	@RequestMapping(value = "/getReportForm1", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm1(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm1(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 各高校校园客户情况日通报导出的功能
	@RequestMapping(value = "/getReportForm1Export")
	public void ReportForm1ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm1(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("各高校校园客户情况日通报列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "各高校校园客户情况日通报列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm1ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	@RequestMapping(value = "/getReportForm2", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm2(String cityName, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm2(cityName);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	@RequestMapping(value = "/findCityName", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initCityName() {
		try {
			List<Map<String, Object>> findCityName = reportFormService.getMapper().findCityName();
			return Ajax.responseString(CST.RES_SECCESS, findCityName);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "地市信息查询失败！");
		}
	}

	// 校园基站报表导出的功能
	@RequestMapping(value = "/getReportForm2Export")
	public void ReportForm2ExportExcel(HttpServletResponse response,HttpServletRequest request, String cityName) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm2(java.net.URLDecoder.decode(cityName, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "校园基站报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm2ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 各地市校园客户情况日通报
	@RequestMapping(value = "/getReportForm3", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm3(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm3(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 各地市校园客户情况日通报导出的功能
	@RequestMapping(value = "/getReportForm3Export")
	public void ReportForm3ExportExcel(HttpServletResponse response,HttpServletRequest request, String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm3(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("各地市校园客户情况日通报列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "各地市校园客户情况日通报列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm3ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 各地市校园客户情况月报表
	@RequestMapping(value = "/getReportForm4", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm4(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm4(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 各地市校园客户情况月报表导出的功能
	@RequestMapping(value = "/getReportForm4Export")
	public void ReportForm4ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm4(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("各地市校园客户情况月报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "各地市校园客户情况月报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm4ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 各高校校园客户情况月报表
	@RequestMapping(value = "/getReportForm5", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm5(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm5(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 各高校校园客户情况月报表导出的功能
	@RequestMapping(value = "/getReportForm5Export")
	public void ReportForm5ExportExcel(HttpServletResponse response,HttpServletRequest request, String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm5(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("各高校校园客户情况月报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "各高校校园客户情况月报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm5ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 校园重点活动办理情况表（日累计）
	@RequestMapping(value = "/getReportForm6", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm6(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm6(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园重点活动办理情况表（日累计）导出的功能
	@RequestMapping(value = "/getReportForm6Export")
	public void ReportForm6ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm6(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("校园重点活动办理情况表（日累计）列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "校园重点活动办理情况表（日累计）列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm6ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 校园重点活动办理明细日报表
	@RequestMapping(value = "/getReportForm7", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm7(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm7(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园重点活动办理明细日报表导出的功能
	@RequestMapping(value = "/getReportForm7Export")
	public void ReportForm7ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm7(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("校园重点活动办理明细日报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "校园重点活动办理明细日报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm7ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 存量校园客户保有情况日报表
	@RequestMapping(value = "/getReportForm8", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm8(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm8(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 存量校园客户保有情况日报表导出的功能
	@RequestMapping(value = "/getReportForm8Export")
	public void ReportForm8ExportExcel(HttpServletResponse response,HttpServletRequest request, String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm8(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("存量校园客户保有情况日报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "存量校园客户保有情况日报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm8ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	/**
	 * 校园移动用户明细数据 月报表 添加了cityName,schoolName传入参数
	 * 
	 * @Title getReportForm9
	 * @Author hubinbin
	 * @param page
	 * @param rows
	 * @param statisMonth
	 * @param cityName
	 * @param schoolName
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getReportForm9", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm9(Integer page, Integer rows, String statisMonth, String cityName, String schoolName) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm9(statisMonth, cityName, schoolName);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	/**
	 * 校园移动用户明细数据 地区查询
	 * 
	 * @Title initCityName1
	 * @Author hubinbin
	 * @return String
	 */
	@RequestMapping(value = "/findCityName1", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initCityName1() {
		try {
			List<Map<String, Object>> findCityName1 = reportFormService.getMapper().findCityName1();
			return Ajax.responseString(CST.RES_SECCESS, findCityName1);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "地区信息查询失败！");
		}
	}

	/**
	 * 校园移动用户明细数据 学校查询
	 * 
	 * @Title initSchoolName1
	 * @Author hubinbin
	 * @param cityName
	 * @return String
	 */
	@RequestMapping(value = "/findSchoolName1", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initSchoolName(String cityName) {
		try {
			List<Map<String, Object>> findSchoolName = reportFormService.getMapper().findSchoolName1(cityName);
			return Ajax.responseString(CST.RES_SECCESS, findSchoolName);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "学校信息查询失败！");
		}
	}

	/**
	 * 校园移动用户明细数据月报表导出的功能 增加cityName,schoolName传入参数
	 * 
	 * @Title ReportForm9ExportExcel
	 * @Author hubinbin
	 * @param response
	 * @param statisMonth
	 * @param cityName
	 * @param schoolName
	 *            void
	 */
	@RequestMapping(value = "/getReportForm9Export")
	public void ReportForm9ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth, String cityName, String schoolName) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm9(java.net.URLDecoder.decode(statisMonth, "UTF-8"),
					java.net.URLDecoder.decode(cityName, "UTF-8"), java.net.URLDecoder.decode(schoolName, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			/*response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("校园移动用户明细数据月报表列表.xlsx".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "校园移动用户明细数据月报表列表.xlsx";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm9ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	/**
	 * 新增两个传入参数 cityName,schoolName
	 * 
	 * @Title getReportForm10
	 * @Author hubinbin
	 * @param page
	 * @param rows
	 * @param statisMonth
	 * @return PageJqGrid<Map<String,Object>>
	 */
	// 校园异网用户明细数据 月报表
	@RequestMapping(value = "/getReportForm10", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm10(Integer page, Integer rows, String statisMonth, String cityName, String schoolName) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm10(statisMonth, cityName, schoolName);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	/**
	 * 校园异网用户明细数据 地区查询
	 * 
	 * @Title initCityName2
	 * @Author hubinbin
	 * @return String
	 */
	@RequestMapping(value = "/findCityName2", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initCityName2() {
		try {
			List<Map<String, Object>> findCityName2 = reportFormService.getMapper().findCityName2();
			return Ajax.responseString(CST.RES_SECCESS, findCityName2);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "地区信息查询失败！");
		}
	}

	/**
	 * 校园异网用户明细数据 学校查询
	 * 
	 * @Title uppSchool
	 * @Author hubinbin
	 * @param cityName
	 * @return String
	 */
	@RequestMapping(value = "/findSchoolName2", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String uppSchool(String cityName) {
		try {
			List<Map<String, Object>> findSchoolName2 = reportFormService.getMapper().findSchoolName2(cityName);
			return Ajax.responseString(CST.RES_SECCESS, findSchoolName2);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "学校信息查询失败！");
		}
	}

	/**
	 * 添加两传入参数 cityName,schoolName
	 * 
	 * @Title ReportForm10ExportExcel
	 * @Author hubinbin
	 * @param response
	 * @param statisMonth
	 * @param cityName
	 * @param schoolName
	 *            void
	 */
	// 校园异网用户明细数据月报表导出的功能
	@RequestMapping(value = "/getReportForm10Export")
	public void ReportForm10ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth, String cityName, String schoolName) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm10(java.net.URLDecoder.decode(statisMonth, "UTF-8"),
					java.net.URLDecoder.decode(cityName, "UTF-8"), java.net.URLDecoder.decode(schoolName, "UTF-8"));
		/*	// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("校园异网用户明细数据月报表列表.xlsx".getBytes(), "ISO-8859-1"));*/
			
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "校园异网用户明细数据月报表列表.xlsx";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm10ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 校园一经 月报表
	@RequestMapping(value = "/getReportForm11", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm11(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm11(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园一经月报表导出的功能
	@RequestMapping(value = "/getReportForm11Export")
	public void ReportForm11ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm11(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			/*// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("校园一经月报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "校园一经月报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm11ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 校园一经 周报表
	@RequestMapping(value = "/getReportForm12", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm12(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm12(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园一经周报表导出的功能
	@RequestMapping(value = "/getReportForm12Export")
	public void ReportForm12ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm12(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			/*// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("校园一经周报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "校园一经周报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm12ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 高校市场份额月报表
	@RequestMapping(value = "/getReportForm13", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm13(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm13(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 高校市场份额月报表导出的功能
	@RequestMapping(value = "/getReportForm13Export")
	public void ReportForm13ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm13(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
		/*	// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("高校市场份额月报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "高校市场份额月报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm13ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	// 高校市场份额日报表
	@RequestMapping(value = "/getReportForm14", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm14(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm14(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 高校市场份额日报表导出的功能
	@RequestMapping(value = "/getReportForm14Export")
	public void ReportForm14ExportExcel(HttpServletResponse response, HttpServletRequest request,String statisMonth) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Map<String, Object>> empList = reportFormService.getReportForm14(java.net.URLDecoder.decode(statisMonth, "UTF-8"));
			/*// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("高校市场份额日报表列表.xls".getBytes(), "ISO-8859-1"));*/
			final String userAgent = request.getHeader("USER-AGENT");
			response.setContentType("application/x-execl");
			String finalFileName = null;
			String fileName = null;
			fileName = "高校市场份额日报表列表.xls";
			
			if (userAgent != null && userAgent.indexOf("Firefox") >= 0 || 
				      userAgent.indexOf("Chrome") >= 0 ||
				      userAgent.indexOf("Safari") >= 0) {  
					finalFileName=URLEncoder.encode(fileName,"UTF8"); //IE 
				 } else {  
					 finalFileName= new String((fileName).getBytes(), "ISO8859-1");  //其他浏览器
				 } 
	
			// 设置头
			response.setHeader("Content-Disposition", "attachment; filename=\"" + finalFileName + "\"");
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			reportFormService.ReportForm14ExportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String uploadMarketFile(@RequestParam("helpCenterFile") MultipartFile file, MultipartHttpServletRequest request, HttpSession session)
			throws IllegalStateException, IOException {
		try {
			reportFormService.uploadFile(file.getOriginalFilename(), file.getInputStream());
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	@RequestMapping(value = "/downFile")
	@ResponseBody
	public void downLoadMarketFile(String fileId, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {
		/*String ss = java.net.URLDecoder.decode(fileName, "UTF-8");
		String realName= ss.substring(0,ss.lastIndexOf("."));
		FtpClientUtil.ftpDownFile("10.154.147.239", 21, "webuser", "1qaz@WSX", "/home/weblogicspace/sch_files/"+fileName, realName, request, response);*/
		reportFormService.downLoad(fileId,request,response);
	}

	@RequestMapping(value = "/findFile", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> findFile(Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> findByFileName = (Page<Map<String, Object>>) this.reportFormService.findFile();
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(findByFileName);
		return basicUnitJqGrid;

	}

	@RequestMapping(value = "/findFileByFileName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String findFileByFileName(String fileName) {
		try {
			List<Map<String, Object>> findByFileName = this.reportFormService.findByFileName(fileName);
			return Ajax.responseString(CST.RES_SECCESS, findByFileName);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/deleteFileByFileName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String deleteFileByFileName(String fileName) {
		try {
			String findByFileName = this.reportFormService.deleteFileByName(fileName);
			return Ajax.responseString(CST.RES_SECCESS, findByFileName);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "删除失败");
		}

	}

	// 联系人
	@RequestMapping(value = "/findByUser", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String findByUser() {
		try {
			Map<String, Object> findByUser = this.reportFormService.findByUser();
			return Ajax.responseString(CST.RES_SECCESS, findByUser);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	// 查询当前联系人的OA_ID
	@RequestMapping(value = "/findByOaId", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String findByOaId(String oaId) {
		try {
			int findByUser = this.reportFormService.findByOaId(oaId);
			return Ajax.responseString(CST.RES_SECCESS, findByUser);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}
	public static void main(String[] in){
		String aString= "/home/ibonc/template/file/1.png";
		String fileType = aString.substring(aString.lastIndexOf("/"));
		System.out.println(fileType);
	}
}
