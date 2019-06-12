package com.bonc.login.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.login.service.LoginService;
import com.bonc.system.dao.entity.SysUser;

@RequestMapping(value = "/")
@Controller
public class LoginAction {

	@Resource(name = "loginService")
	private LoginService loginService;

	/**
	 * 登陆
	 * 
	 * @param session
	 * @param request
	 * @param loginId
	 * @param password
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/login")
	public String doLogin(HttpSession session, HttpServletRequest request, @RequestParam(value = "loginId", required = true) String loginId,
			@RequestParam(value = "password", required = true) String password) {
		SysUser vo = this.loginService.doLogin(loginId);
		if (vo == null) {
			return "-2";
		} else if (!password.equals(vo.getPassword())) {
			return "-1";
		} else {
			session.setAttribute(CST.SESSION_SYS_USER_INFO, vo);
			return JSONObject.toJSON(vo).toString();
		}
	}

	/**
	 * 登出
	 * 
	 * @param session
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/loginout")
	@ResponseBody
	public String doLoginOut(HttpSession session, HttpServletRequest request) {
		session.setAttribute(CST.SESSION_SYS_USER_INFO, null);// 清空session中的当前登录用户
		return "1";
	}

	/**
	 * 检查session
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/checkSession")
	@ResponseBody
	public String checkSession(HttpSession session) {
		if (session.getAttribute(CST.SESSION_SYS_USER_INFO) == null) {
			return Ajax.responseString(CST.RES_SESSION_TIME_OUT, "用户已经过期，请重新登陆");
		}
		return Ajax.responseString(CST.RES_SECCESS);
	}

	/*
	 * @ArchivesLog(actionName="登录类",option="登录")
	 * 
	 * @ResponseBody
	 * 
	 * @RequestMapping(value="/login", method=RequestMethod.POST,
	 * produces="text/html;charset=utf-8") public String
	 * doLogin(@RequestParam(value = "userName", required = true) String
	 * userName,
	 * 
	 * @RequestParam(value = "password", required = true) String password,
	 * HttpSession session, HttpServletRequest request){ try { LoginEnum result
	 * = loginService.checkUserPassword(userName, password);
	 * if(LOGIN_SUCCESS.equals(result.value())){
	 * loginService.doLogin(session,userName,request); } return
	 * Ajax.responseString(result.value(), result.name()); } catch (Exception e)
	 * { e.printStackTrace(); return Ajax.responseString("7", e.getMessage()); }
	 * }
	 */

	@RequestMapping(value = "/noQx", method = RequestMethod.GET, produces = "text/html;charset=utf-8")
	@ResponseBody
	public String noQx(HttpSession session) {
		try {
			return Ajax.responseString(CST.CONN_TEST_FAIL2, "没有权限");
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 
	 * @Title: logOut
	 * @Description: 登出系统
	 * @param session
	 * @return
	 */
	@ArchivesLog(actionName = "登录类", option = "退出系统")
	@RequestMapping(value = "/loginOut", method = RequestMethod.POST, produces = "text/html;charset=utf-8")
	public @ResponseBody String logOut(HttpSession session, HttpServletRequest request) {
		try {
			String ip = request.getHeader("x-forwarded-for");
			ip = request.getRemoteAddr();
			ip = ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
			session.invalidate();
			if (CST.LOGOUT_URL.isEmpty()) {
				// 登出URL准备
				String schema = request.getScheme();
				String serverName = request.getServerName();
				int port = request.getServerPort();
				String path = request.getContextPath();
				String baseUrl = schema + "://" + serverName + ":" + port + path + "/pages/jsp/login/login.jsp";
				return Ajax.responseString(CST.RES_SECCESS, null, baseUrl);
			} else {
				return Ajax.responseString(CST.RES_SECCESS, null, CST.LOGOUT_URL);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	@ResponseBody
	@RequestMapping(value = "/loginRole")
	public String doLoginRole(HttpSession session, HttpServletRequest request) {
		if (session.getAttribute(CST.SESSION_SYS_USER_INFO) != null) {
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			String loginId = user.getLoginId();
			SysUser vo = this.loginService.doLogin(loginId);
			if (vo == null) {
				return "-2";
			} else {
				return JSONObject.toJSON(vo).toString();
			}
		} else {
			return "-2";
		}
	}
}
