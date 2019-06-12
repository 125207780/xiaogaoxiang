package com.bonc.contract.action;

import java.io.File;
import java.util.HashMap;
import java.util.List;
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

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.contract.service.ContractService;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/contract")
public class ContractAction {
	@Resource
	private ContractService contractService;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	private static final String UPLOAD_DIR = "/srv/www/upload/";
	private static final long MAX_FILE_SISE = 31000000;

	@RequestMapping(value = "/getIndexGridList")
	@ResponseBody
	public List<Map<String, Object>> getIndexGridList(String pid) {
		List<Map<String, Object>> result = contractService.getIndexGridList(pid);
		return result;
	}

	@RequestMapping(value = "/getIndexChannelList")
	@ResponseBody
	public List<Map<String, Object>> getIndexChannelList(String gridCode) {
		List<Map<String, Object>> result = contractService.getIndexChannelList(gridCode);
		return result;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getIndexTable")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getIndexTable(String gridCode, String chnlCode, String statusArr, Integer page, Integer rows) {
		List<String> list = null;
		if (!"null".equals(statusArr)) {
			list = JSON.parseObject(statusArr, List.class);
		}

		Page<Map<String, Object>> pageList = this.contractService.getIndexTable(gridCode, chnlCode, list, page, rows);
		PageJqGrid<Map<String, Object>> pageJqGrid = new PageJqGrid<Map<String, Object>>(pageList);
		return pageJqGrid;
	}

	/**
	 * 初始化查询渠道包保信息
	 * 
	 * @Title initContractInfo
	 * @Author xiaogaoxiang
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/initContractInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> initContractInfo(String json, int rows, int page) {
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
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) contractService.initContractInfo(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 初始化查询
	 * 
	 * @Title initContractAnalysis
	 * @Author caoxiaojuan
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/initContractAnalysis", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> initContractAnalysis(String json, int rows, int page) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		if (params.get("orgLevel").toString().equals("2")) {
			if (params.get("orgId").toString().length() == 5) {
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
				params.remove("orgId");
				params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
			}
		}
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) contractService.initContractAnalysis(params);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	/**
	 * 小区包保饼图
	 * 
	 * @Title initContractEchart
	 * @Author caoxiaojuan
	 * @param json
	 * @param rows
	 * @param page
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/initContractEchart", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> initContractEchart(String json) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (json != null && !"".equals(json)) {
			params = (Map<String, Object>) JSONObject.parseObject(json);
		}
		if (params.get("orgLevel").toString().equals("2")) {
			if (params.get("orgId").toString().length() == 5) {
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
				params.remove("orgId");
				params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
			}
		}
		Map<String, Object> tableInfoList = contractService.initContractEchart(params);
		return tableInfoList;
	}

	/**
	 * 初始化下拉框
	 * 
	 * @Title initSelectInfo
	 * @Author xiaogaoxiang
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/initSelectInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initSelectInfo(HttpSession session) {
		try {
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			List<Map<String, Object>> twoList = contractService.initSelectInfo(user);
			return Ajax.responseString(CST.RES_SECCESS, twoList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 导出小区包保统计
	 * 
	 * @Title exportContractAnalysis
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportContractAnalysis", method = RequestMethod.POST)
	public void exportContractAnalysis(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			String exportName = "包保统计明细导出";
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出包保明细
			contractService.exportContractAnalysis(user, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出包保明细
	 * 
	 * @Title exportContractInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportContractInfo", method = RequestMethod.POST)
	public void exportContractInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			String exportName = "包保明细导出";
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出包保明细
			contractService.exportContractInfo(user, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出包保明细模板
	 * 
	 * @Title exportContractInfoModel
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/exportContractInfoModel")
	public void exportContractInfoModel(HttpServletResponse response, HttpServletRequest request) {
		try {
			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/contract/包保明细模板.xls";
			Boolean flag = true;
			String exportName = "包保明细模板";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			contractService.exportContractInfoModel(path, outputStream, flag);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导入包保明细信息
	 * 
	 * @Title uploadContractInfo
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadContractInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String uploadContractInfo(@RequestParam("contractFileDir") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
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
				message = contractService.readContractExcelByPath(fileName1, user);
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
	 * 导出包保错误明细
	 * 
	 * @Title exportErrorStationCellInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportErrorStationCellInfo", method = RequestMethod.POST)
	public void exportErrorStationCellInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String jsonList = request.getParameter("jsonList");
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			String exportName = "包保错误明细导出";
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出包保明细
			contractService.exportErrorStationCellInfo(user, jsonList, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出渠道包保列表明细
	 * 
	 * @Title exportContractDetail
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportContractDetail", method = RequestMethod.POST)
	public void exportContractDetail(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
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
			String exportName = "渠道包保信息导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			contractService.exportContractDetail(params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
