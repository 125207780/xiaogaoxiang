package com.bonc.common.utils;

import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class BaseSession {
	
	/**
	 * Session缓存
	 */
	protected static HttpSession sessionCache;
	
	/**
	 * 
	 * @Title: getSession
	 * @Description: 获取session
	 * @return
	 */
	protected static HttpSession getSession() {
		try {
			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
			if (attr.getRequest().getSession() == null) {
				return sessionCache;
			}
			return attr.getRequest().getSession();
		} catch (Exception e) {
			e.printStackTrace();
			return sessionCache;
		}
	}

	/**
	 * 设置session缓存
	 * 
	 * @param session
	 */
	public static void setSessionCache(HttpSession session) {
		sessionCache = session;
	}
}
