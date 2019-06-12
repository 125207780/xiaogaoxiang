package com.bonc.login.action;

import java.util.List;

import javax.annotation.Resource;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
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
import com.bonc.common.utils.Base64;
import com.bonc.common.utils.RedisUtil;
import com.bonc.login.service.LoginService;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysMenuService;

@RequestMapping(value = "/")
@Controller
public class LoginAction {

	@Resource(name = "loginService")
	private LoginService loginService;
	@Resource
	private SysMenuService sysMenuService;
	@Resource(name = "RedisUtil")
	private RedisUtil redisUtil;

	/**
	 * 登陆
	 * 
	 * @param session
	 * @param request
	 * @param loginId
	 * @param password
	 * @return
	 */
	@ArchivesLog(actionName = "登录类", option = "登录系统")
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
	 * OA登陆跳转
	 * 
	 * @param session
	 * @param request
	 * @param loginId
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/oaLogin")
	public String oaLogin(HttpSession session, HttpServletRequest request, @RequestParam(value = "loginId", required = true) String loginId,
			@RequestParam(value = "password", required = true) String password) {

		// OA那边会生成一次OAId查询出来的所有用户session，这里先清除一次。
		session.removeAttribute(CST.SESSION_SYS_USER_INFO);
		SysUser vo = this.loginService.doLogin(loginId);
		if (vo == null) {
			return "-2";
		} else if (!password.equals(vo.getPassword())) {
			return "-1";
		} else {
			if (vo.getSysRoleUserList().size() == 0) {
				request.setAttribute("message", "该用户未分配角色，无法登录");
				return "/pages/gis/power/power";
			} else {
				session.setAttribute(CST.SESSION_SYS_USER_INFO, vo);
				request.setAttribute("url", "/pages/jsp/frame/topMenuFrame.jsp?loginRoleId=" + vo.getSysRoleUserList().get(0).getRoleId());
				return "/pages/gis/power/power";
			}
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

	/**
	 * 修改自：2018-10-17 1，将获取redis的loginId查询用户改为根据oaId查询 2，根据oaId查询出来的用户可能存在>1条信息
	 * ①、如果只有一条用户信息，则直接登陆 ②、如果包含多条用户信息，则登陆页面会弹出一个弹出框，供用户选择一个用户信息进行登陆
	 * 
	 * @param session
	 * @param request
	 * @param TokenId
	 * @return
	 */
	@RequestMapping(value = "/tokenLogin")
	public String tokenLogin(HttpSession session, HttpServletRequest request, @RequestParam(value = "TokenId", required = true) String TokenId) {
		String token = decryptByDefaultKey(TokenId);
		if (token == null) {
			request.setAttribute("message", "token 解密异常");
			System.out.println(TokenId);
			return "/pages/gis/power/power";
		}
		String tokenContent = redisUtil.get(token);
		if (tokenContent == null || "".equals(tokenContent)) {
			request.setAttribute("message", "token获取异常");
			System.out.println(token);
			return "/pages/gis/power/power";
		}
		System.out.println(tokenContent);
		redisUtil.set(token, tokenContent, 30 * 60);

		JSONObject tokenJson = null;

		try {
			tokenJson = JSONObject.parseObject(tokenContent);
		} catch (Exception e) {
			request.setAttribute("message", "tokenJson信息异常");
			return "/pages/gis/power/power";
		}

		// 从redis获取Oa_Id
		String oaId = tokenJson.getJSONObject("USER_INFO").getString("LOGIN_NAME");

		List<SysUser> vo = this.loginService.doLoginByOaId(oaId);
		if (vo == null) {
			request.setAttribute("message", "用户信息不存在");
			return "/pages/gis/power/power";
		} else {

			// 如果有用户信息，判断：1，只有一条用户信息，则直接登陆；2，有>1条用户信息，则将多个用户信息封装成json，返回给登陆弹出框，让用户选择一个用户信息
			if (vo.size() == 1) {
				if (vo.get(0).getSysRoleUserList().size() == 0) {
					request.setAttribute("message", "该用户未分配角色，无法登录");
					return "/pages/gis/power/power";
				} else {
					session.setAttribute(CST.SESSION_SYS_USER_INFO, vo.get(0));
					request.setAttribute("url", "/pages/jsp/frame/topMenuFrame.jsp?loginRoleId=" + vo.get(0).getSysRoleUserList().get(0).getRoleId());
					return "/pages/gis/power/power";
				}
			} else {
				// 如果有多条用户信息，将用户信息封装成json，返回给登陆页面的一个弹出框，供用户选择
				session.setAttribute(CST.SESSION_SYS_USER_INFO, JSONObject.toJSON(vo).toString());
				request.setAttribute("url", "pages/jsp/login/oalogin.jsp");
				return "/pages/gis/power/power";
			}
		}
		// SysMenu menu = sysMenuService.selectSysMenuById(menuId);
		//
		// request.setAttribute("url", menu.getMenuUrl());
	}

	public static String decryptByDefaultKey(String src) {
		return decrypt(src, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	}

	public static String decrypt(String src, String key) {
		if (src == null) {
			return null;
		} else {
			// Object retByte = null;

			try {
				byte[] e = Base64.decode(src);
				DESedeKeySpec dks = new DESedeKeySpec(key.getBytes("UTF-8"));
				SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
				SecretKey securekey = keyFactory.generateSecret(dks);
				Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
				cipher.init(2, securekey);
				byte[] retByte1 = cipher.doFinal(e);
				retByte1 = Base64.decode(new String(retByte1, "UTF-8"));
				return new String(retByte1, "UTF-8");
			} catch (Exception var8) {
				return null;
			}
		}
	}
}
