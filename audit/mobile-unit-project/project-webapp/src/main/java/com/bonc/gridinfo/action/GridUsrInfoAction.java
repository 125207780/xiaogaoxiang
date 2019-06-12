package com.bonc.gridinfo.action;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.gridinfo.service.GridUsrInfoService;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/gridUsrInfo")
public class GridUsrInfoAction {

	private static final String UPLOAD_DIR = "/srv/www/upload/";
	private static final long MAX_FILE_SISE = 31000000;

	@Resource
	private GridUsrInfoService gridUsrInfoService;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	/**
	 * 初始化查询网格总监信息
	 * 
	 * @Title initDirectInfo
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/initDirectInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> initDirectInfo(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) gridUsrInfoService.initDirectInfo(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 初始化查询网格人员信息
	 * 
	 * @Title initGridUsrInfo
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/initGridUsrInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> initGridUsrInfo(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) gridUsrInfoService.initGridUsrInfo(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 导出网格总监信息
	 * 
	 * @Title exportDirectInfoModel
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/exportDirectInfoModel")
	public void exportDirectInfoModel(HttpServletResponse response, HttpServletRequest request) {
		try {
			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/gridInfo/网格总监信息维护模板.xls";
			Boolean flag = true;
			String exportName = "网格总监信息维护模板";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			gridUsrInfoService.exportDirectInfoModel(path, outputStream, flag);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出网格人员信息
	 * 
	 * @Title exportGridUsrInfoModel
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/exportGridUsrInfoModel")
	public void exportGridUsrInfoModel(HttpServletResponse response, HttpServletRequest request) {
		try {
			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/gridInfo/网格人员信息维护模板.xls";
			Boolean flag = true;
			String exportName = "网格人员信息维护模板";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			gridUsrInfoService.exportGridUsrInfoModel(path, outputStream, flag);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 组织机构下载
	 * 
	 * @Title downloadNetResourceModel
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/downloadNetResourceModel")
	public void downloadNetResourceModel(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/gridInfo/组织机构模板.xls";
			Boolean flag = true;
			String exportName = "组织机构模板";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			gridUsrInfoService.exportNetResourceModel(path, outputStream, flag, user);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导入网格总监信息
	 * 
	 * @Title uploadDirectInfo
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadDirectInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String uploadDirectInfo(@RequestParam("directInfoFileDir") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String message = "";
		if (!file.isEmpty()) {
			// 获取文件类型
			String path = request.getSession().getServletContext().getRealPath("/");
			String contentType = file.getContentType();
			if (!contentType.equals("")) {
				// 可以对文件类型进行检查
			}
			// 获取文件名，带扩展名
			String originFileName = file.getOriginalFilename();
			// 获取文件扩展名
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
			}
			// 构造文件上传后的文件绝对路径，这里取系统时间戳＋文件名作为文件名
			// 不推荐这么写，这里只是举例子，这么写会有并发问题
			// 应该采用一定的算法生成独一无二的的文件名
			String fileName = path + UPLOAD_DIR;
			String fileName1 = fileName + String.valueOf(System.currentTimeMillis()) + extension;
			File newFile = new File(fileName);
			if (!newFile.exists()) {
				newFile.mkdirs();
			}
			try {
				file.transferTo(new File(fileName1));
				// 获取上传文件基站信息
				message = gridUsrInfoService.readDirectExcelByPath(fileName1, user);
			} catch (Exception e) {
				message = "文件上传失败";
			}
		}
		if ("导入成功".equals(message)) {
			return Ajax.responseString(CST.RES_SECCESS, message);
		} else {
			return Ajax.responseString(CST.RES_EXCEPTION, message);
		}
	}

	/**
	 * 导入网格人员信息
	 * 
	 * @Title uploadGridUsrInfo
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadGridUsrInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String uploadGridUsrInfo(@RequestParam("gridUsrInfoFileDir") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String message = "";
		if (!file.isEmpty()) {
			// 获取文件类型
			String path = request.getSession().getServletContext().getRealPath("/");
			String contentType = file.getContentType();
			if (!contentType.equals("")) {
				// 可以对文件类型进行检查
			}
			// 获取文件名，带扩展名
			String originFileName = file.getOriginalFilename();
			// 获取文件扩展名
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
			}
			// 构造文件上传后的文件绝对路径，这里取系统时间戳＋文件名作为文件名
			// 不推荐这么写，这里只是举例子，这么写会有并发问题
			// 应该采用一定的算法生成独一无二的的文件名
			String fileName = path + UPLOAD_DIR;
			String fileName1 = fileName + String.valueOf(System.currentTimeMillis()) + extension;
			File newFile = new File(fileName);
			if (!newFile.exists()) {
				newFile.mkdirs();
			}
			try {
				file.transferTo(new File(fileName1));
				// 获取上传文件基站信息
				message = gridUsrInfoService.readGridUsrExcelByPath(fileName1, user);
			} catch (Exception e) {
				message = "文件上传失败";
			}
		}
		if ("导入成功".equals(message)) {
			return Ajax.responseString(CST.RES_SECCESS, message);
		} else {
			return Ajax.responseString(CST.RES_EXCEPTION, message);
		}
	}

	/**
	 * 网格总监错误明细导出
	 * 
	 * @Title exportErrorDirectInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportErrorDirectInfo", method = RequestMethod.POST)
	public void exportErrorDirectInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String jsonList = request.getParameter("jsonList");
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			String exportName = "网格总监错误明细导出";
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 明细导出
			gridUsrInfoService.exportErrorDirectInfo(user, jsonList, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 网格人员错误信息导出
	 * 
	 * @Title exportErrorGridUsrInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportErrorGridUsrInfo", method = RequestMethod.POST)
	public void exportErrorGridUsrInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String jsonList = request.getParameter("jsonList");
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			String exportName = "网格人员错误明细导出";
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 明细导出
			gridUsrInfoService.exportErrorGridUsrInfo(user, jsonList, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 网格网格总监列表信息导出
	 * 
	 * @Title exportDirectInfoDetail
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportDirectInfoDetail", method = RequestMethod.POST)
	public void exportDirectInfoDetail(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String city = request.getParameter("city");
		String cnty = request.getParameter("cnty");
		String grid = request.getParameter("grid");
		Map<String, Object> params = new HashMap<>();
		// 当选择的是地市
		if (null != city && !"".equals(city)) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(city);
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		params.put("cnty", cnty);
		params.put("grid", grid);
		try {
			response.reset();
			String exportName = "网格总监信息导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			gridUsrInfoService.exportDirectInfoDetail(params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 网格人员列表信息导出
	 * 
	 * @Title exportGridUsrInfoDetail
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportGridUsrInfoDetail", method = RequestMethod.POST)
	public void exportGridUsrInfoDetail(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String city = request.getParameter("city");
		String cnty = request.getParameter("cnty");
		String grid = request.getParameter("grid");
		Map<String, Object> params = new HashMap<>();
		// 当选择的是地市
		if (null != city && !"".equals(city)) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(city);
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		}
		params.put("cnty", cnty);
		params.put("grid", grid);
		try {
			response.reset();
			String exportName = "网格人员信息导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			gridUsrInfoService.exportGridUsrInfoDetail(params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
