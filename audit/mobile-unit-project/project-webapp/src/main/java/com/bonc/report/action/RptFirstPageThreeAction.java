package com.bonc.report.action;

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

import com.bonc.common.cst.CST;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.report.service.RptFirstPageThreeService;
import com.bonc.system.dao.entity.SysUser;

/**
 * 
 * @FileName RptFirstPageThreeAction.java
 * @Author xiaogaoxiang
 * @At 2019年4月4日 上午11:07:51
 * @Desc 首页报表导出类Action
 */
@Controller
@RequestMapping(value = "/rptfirstpagethree")
public class RptFirstPageThreeAction {

	@Resource
	private RptFirstPageThreeService rptFirstPageThreeService;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	/**
	 * 业务办理报表导出
	 * 
	 * @Title exportYwblInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportywblinfo", method = RequestMethod.POST)
	public void exportYwblInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		String orgLevel = user.getOrgLevel().toString();
		if(user.getOrgLevel()==2){
			orgId= firstPageThreeService.getCityCode(orgId).get("OLD_ORG_ID").toString();
		}
		String statisDate = request.getParameter("statisDate");
		String twoType = request.getParameter("twoType");
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", orgId);
		params.put("userOrgLevel", orgLevel);
		params.put("statisDate", statisDate);
		params.put("twoType", twoType);
		try {
			String exportName = "业务办理信息导出";
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			if ("WGYWBLMONTH".equals(params.get("twoType"))) {
				// 业务办理月报表
				rptFirstPageThreeService.exportWgywblMonthInfo(user, params, outputStream, session);
			} else if ("WGYWBLWEEK".equals(params.get("twoType"))) {
				// 业务办理周报表
				rptFirstPageThreeService.exportWgywblWeekInfo(user, params, outputStream, session);
			} else if ("WGYWBLDAY".equals(params.get("twoType"))) {
				// 业务办理日报表
				rptFirstPageThreeService.exportWgywblDayInfo(user, params, outputStream, session);
			} else {
				rptFirstPageThreeService.exportYwblInfo(user, params, outputStream, session);
			}
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 客户发展报表导出
	 * 
	 * @Title exportYwblInfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportkhfzinfo", method = RequestMethod.POST)
	public void exportkhfzinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		String orgLevel = user.getOrgLevel().toString();
		String statisDate = request.getParameter("statisDate");
		String twoType = request.getParameter("twoType");
		Map<String, Object> params = new HashMap<>();
		if(orgLevel.equals("2")){
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(orgId);
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}else{
			params.put("orgId", orgId);
		}
		params.put("userOrgLevel", orgLevel);
		params.put("statisDate", statisDate);
		params.put("twoType", twoType);
		try {
			String exportName = "";
			if(twoType.equals("KHFZD")){
				exportName="客户发展日报表导出";
			}else if(twoType.equals("KHFZW")){
				exportName="客户发展周报表导出";
			}else if(twoType.equals("KHFZM")){
				exportName="客户发展月报表导出";
			}
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			if ("KHFZD".equals(params.get("twoType"))) {
				// 客户发展日报表导出
				rptFirstPageThreeService.exportKhfzDayInfo(user, params, outputStream, session);
			} 
			else if ("KHFZW".equals(params.get("twoType"))) {
				// 客户发展周报表导出
				rptFirstPageThreeService.exportKhfzWeekInfo(user, params, outputStream, session);
			} else if ("KHFZM".equals(params.get("twoType"))) {
				// 客户发展月报表导出
				rptFirstPageThreeService.exportKhfzMonthInfo(user, params, outputStream, session);
			} 
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 人员/网格/网格基础信息报表
	 * 
	 * @Title exportRyxxOrWgxxInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportryxxorwgxxinfo", method = RequestMethod.POST)
	public void exportRyxxOrWgxxInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		String oneType = request.getParameter("oneType");
		String twoType = request.getParameter("twoType");
		String statisDate = request.getParameter("statisDate");
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		params.put("oneType", oneType);
		params.put("twoType", twoType);
		params.put("statisDate", statisDate);
		if (user.getOrgLevel() == 2) {
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		String exportName = null;
		if ("RYXX".equals(oneType)) {
			exportName = "人员信息";
		} else if ("WGXX".equals(oneType)) {
			exportName = "网格信息";
		} else if ("WGJCXX".equals(oneType)) {
			exportName = "网格基础信息";
		}
		exportName = exportName + "导出";
		try {
			response.reset();
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			rptFirstPageThreeService.exportRyxxOrWgxxInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 校园报表导出
	 * 
	 * @Title exportRyxxOrWgxxInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportxybbinfo", method = RequestMethod.POST)
	public void exportXybbInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String city = request.getParameter("city");
		String town = request.getParameter("town");
		String grid = request.getParameter("grid");
		String statisDate = request.getParameter("statisDate");
		String oneType = request.getParameter("oneType");
		String twoType = request.getParameter("twoType");
		Map<String, Object> params = new HashMap<>();
		params.put("city", city);
		params.put("town", town);
		params.put("grid", grid);
		params.put("statisDate", statisDate);
		params.put("oneType", oneType);
		params.put("twoType", twoType);
		try {
			response.reset();
			String exportName = "校园信息报表导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			rptFirstPageThreeService.exportXybbInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 酬金月报报表导出
	 * 
	 * @Title exportcjybinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportcjybinfo", method = RequestMethod.POST)
	public void exportcjybinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String statisDate = request.getParameter("statisDate");
		Map<String, Object> params = new HashMap<>();
		params.put("statisDate", statisDate);
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		// 当选择的是地市
		if (params.get("orgLevel").toString().equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		try {
			response.reset();
			String exportName = "酬金月报报表导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表

			rptFirstPageThreeService.exportCjybInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 装维信息报表导出
	 * 
	 * @Title exportzwxxinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportzwxxinfo", method = RequestMethod.POST)
	public void exportzwxxinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		if (user.getOrgLevel() == 2) {
			// // 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		try {
			response.reset();
			String exportName = "装维信息报表导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表

			rptFirstPageThreeService.exportZwxxInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 投诉信息报表导出
	 * 
	 * @Title exporttsxxinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exporttsxxinfo", method = RequestMethod.POST)
	public void exporttsxxinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		if (user.getOrgLevel() == 2) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		try {
			response.reset();
			String exportName = "投诉信息报表导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表

			rptFirstPageThreeService.exportTsxxInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 经分信息-日月累计报表导出
	 * 
	 * @Title exportjfbbinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportjfbbinfo", method = RequestMethod.POST)
	public void exportjfbbinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		String statisDate = request.getParameter("statisDate");
		params.put("statisDate", statisDate);
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		// 当选择的是地市
		if (params.get("orgLevel").equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		if (user.getOrgLevel() == 2) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		try {
			response.reset();
			String exportName = "日月累计报表导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表

			rptFirstPageThreeService.exportJfxxInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 资源信息报表导出
	 * 
	 * @Title exportzyxxinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportzyxxinfo", method = RequestMethod.POST)
	public void exportzyxxinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		String oneType = request.getParameter("oneType");
		String twoType = request.getParameter("twoType");
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		params.put("oneType", oneType);
		params.put("twoType", twoType);
		if (user.getOrgLevel() == 2) {
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		try {
			response.reset();
			String exportName = "";
			if (oneType.equals("5")) {
				exportName = "基站报表导出";
			} else if (oneType.equals("1")) {
				exportName = "渠道报表导出";
			} else if (oneType.equals("2")) {
				exportName = "小区报表导出";
			} else if (oneType.equals("6")) {
				exportName = "端口信息报表导出";
			}

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表

			rptFirstPageThreeService.exportZyxxInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 重点小区报表导出
	 * 
	 * @Title exportzdxqinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportzdxqinfo", method = RequestMethod.POST)
	public void exportzdxqinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		String oneType = request.getParameter("oneType");
		String twoType = request.getParameter("twoType");
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		params.put("oneType", oneType);
		params.put("twoType", twoType);
		if (user.getOrgLevel() == 2) {
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		try {
			response.reset();
			String exportName = "重点小区报表导出";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表

			rptFirstPageThreeService.exportZdxqInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 任务下发月报报表导出
	 * 
	 * @Title exportrwybbbinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportrwxfybinfo", method = RequestMethod.POST)
	public void exportewxfybinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		if (user.getOrgLevel() == 2) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		try {
			response.reset();
			String exportName = "任务下发月报报表导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表

			rptFirstPageThreeService.exportRwxfybInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 行销任务报表导出
	 * 
	 * @Title exportxxrwinfo
	 * @Author caoxiaojuan
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportxxrwinfo", method = RequestMethod.POST)
	public void exportxxrwinfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		// 当选择的是地市
		if (params.get("orgLevel").toString().equals("2")) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.remove("orgId");
			params.put("orgId", orgIdMap.get("OLD_ORG_ID"));
		}
		if (user.getOrgLevel() == 2) {
			params.put("city", params.get("orgId"));
			// 将地市编码5位转为3位
			params.put("city", params.get("orgId"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		try {
			response.reset();
			String exportName = "行销任务报表导出";
			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			rptFirstPageThreeService.exportxxrwinfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 自助报表导出
	 * 
	 * @Title exportSelfHelpRptExportInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportselfhelprptexportinfo", method = RequestMethod.POST)
	public void exportSelfHelpRptExportInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		Map<String, Object> params = new HashMap<>();
		params.put("orgId", user.getOrgId());
		params.put("orgLevel", user.getOrgLevel());
		if (user.getOrgLevel() == 2) {
			// 将地市编码5位转为3位
			Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(params.get("orgId").toString());
			params.put("city", orgIdMap.get("OLD_ORG_ID"));
		} else if (user.getOrgLevel() == 3) {
			params.put("town", params.get("orgId"));
		} else if (user.getOrgLevel() == 4) {
			params.put("grid", params.get("orgId"));
		}
		String netCode = request.getParameter("netCode");
		String netName = request.getParameter("netName");
		String param = request.getParameter("param");
		params.put("netCode", netCode);
		params.put("netName", netName);
		params.put("selfParams", param);
		try {
			response.reset();
			String exportName = netName + "报表导出";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 导出报表
			rptFirstPageThreeService.exportSelfHelpRptExportInfo(user, params, outputStream, session);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
