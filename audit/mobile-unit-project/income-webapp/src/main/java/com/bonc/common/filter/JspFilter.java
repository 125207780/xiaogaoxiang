package com.bonc.common.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

/**
 * @Description: JSP拦截器
 */
public class JspFilter implements Filter {
	/** 需要排除的页面（数组） **/
	private String[] excludedPageArray;
	private String excludedPages;
	@SuppressWarnings("unchecked")
	@Override
	public void doFilter(ServletRequest req, ServletResponse rep, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) rep;
		String servletPath = request.getServletPath();//访问地址
		String context = request.getContextPath();//项目名
		boolean isExcludedPage =false;//默认不通过
		for (String page : excludedPageArray) {//是否在不拦截页面里面
			if (servletPath.indexOf(page)>=0) {
				isExcludedPage = true;//是 通过
				break;
			}
		}
		if(!isExcludedPage){//不通过
			HttpSession session = request.getSession();
			String key=(String) session.getAttribute("ehcacheKey"); //缓存KEY
			CacheManager manager = CacheManager.create();
			Cache cache = manager.getCache("globalCache");
			Map<String, Object> dataMap = new HashMap<String, Object>();
			Element element = cache.get(key);
			dataMap = (Map<String, Object>)element.getObjectValue();
			List<Map<String,Object>> menuTree = (List<Map<String,Object>>)dataMap.get("menuTree");//用户对应角色的菜单权限
//			isExcludedPage = verificationAuthorization(servletPath,menuTree);//递归菜单权限验证
		}
		if(isExcludedPage){
			chain.doFilter(req, rep);
		}else{
			response.sendRedirect(context + "/noQx");
		}
	}

	@Override
	public void init(FilterConfig fConfig) throws ServletException {
		this.excludedPages = fConfig.getInitParameter("excludedPages");
		this.excludedPages=this.excludedPages.replaceAll("\\s*", "");
		if (!excludedPages.isEmpty()) {
			this.excludedPageArray = excludedPages.split(",");
		}
		return;
	}
	@Override
	public void destroy() {
	}
}
