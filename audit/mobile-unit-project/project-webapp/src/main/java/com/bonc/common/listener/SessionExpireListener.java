package com.bonc.common.listener;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;

/**
 * 
 * @ClassName: SessionExpireListener
 * @Description: Session监听器
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年3月21日 下午8:34:39
 *
 */
public class SessionExpireListener implements HttpSessionListener {

	/*
	 * 
	 * <p>Title: sessionCreated</p> <p>Description:session创建时的回调函数 </p>
	 * 
	 * @param sessionEnv
	 * 
	 * @see
	 * javax.servlet.http.HttpSessionListener#sessionCreated(javax.servlet.http.
	 * HttpSessionEvent)
	 */
	public void sessionCreated(HttpSessionEvent sessionEnv) {
		// TODO Auto-generated method stub

	}

	/*
	 * 
	 * <p>Title: sessionDestroyed</p> <p>Description:
	 * session销毁时的回调函数，清空EhCache</p>
	 * 
	 * @param sessionEnv
	 * 
	 * @see
	 * javax.servlet.http.HttpSessionListener#sessionDestroyed(javax.servlet.
	 * http.HttpSessionEvent)
	 */
	public void sessionDestroyed(HttpSessionEvent sessionEnv) {
		try {
			HttpSession session = sessionEnv.getSession();
			String key = (String) session.getAttribute("ehcacheKey");
			CacheManager manager = CacheManager.create();
			Cache cache = manager.getCache("globalCache");
			cache.remove(key);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
