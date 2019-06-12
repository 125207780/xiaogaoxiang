package com.bonc.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.RegUtils;
import com.bonc.common.utils.Session;

/**
 * @ClassName: LoginFilter
 * @Description: 登陆拦截器
 * @author 李博强 liboqiang@bonc.com.cn
 * @date 2016年3月21日 下午8:30:03
 */
public class LoginFilter implements Filter {

	/** 需要排除的页面 **/
	private String excludedPages;
	/** 需要排除的页面（数组） **/
	private String[] excludedPageArray;
	// 是否单点登录，true为单点登录
	private String singleSignOut;
	/** 重定向页面 **/
	private String redirectPage;

	// private ApplicationContext cxt;

	/*
	 * <p>Title: doFilter</p> <p>Description: 登陆过滤方法</p>
	 * 
	 * @param req
	 * 
	 * @param rep
	 * 
	 * @param chain
	 * 
	 * @throws IOException
	 * 
	 * @throws ServletException
	 * 
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
	 * javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	public void doFilter(ServletRequest req, ServletResponse rep, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) rep;
		HttpSession session = request.getSession();
		boolean isExcludedPage = false;
		String servletPath = request.getServletPath();
		String context = request.getContextPath();

		// this.cxt=WebApplicationContextUtils.getRequiredWebApplicationContext(session.getServletContext());
		Session.setSessionCache(session);

		// 排除例外URL
		for (String page : excludedPageArray) {
			// 在有单点登录的时候，如果页面是登录页面，则直接跳过。
			if (RegUtils.isMatch("(?i)^.*login\\.jsp$", servletPath) && "true".equals(singleSignOut)) {
				continue;
			}
			if (RegUtils.isMatch(page, servletPath)) {
				isExcludedPage = true;
				break;
			}
		}

		if (isExcludedPage) {
			chain.doFilter(req, rep);
		} else {
			if (session.getAttribute(CST.SESSION_SYS_USER_INFO) == null) {
				if (RegUtils.isMatch("(?i)^.*\\.jsp$", servletPath)) {
					response.sendRedirect(context + "/resource/bonc/html/timeout.html");
				} else if (RegUtils.isMatch("(?i)^.*\\.(js|css|png|jpg|icon|woff|html|json)$", servletPath)) {
					chain.doFilter(req, rep);
				} else if (RegUtils.isMatch("^/$", servletPath)) {
					response.sendRedirect(context + this.redirectPage);
				} else {
					response.sendRedirect(context + "/checkSession");
				}
			} else {
				// 这个验证加上之后问题比较多，暂时先去掉，等以后有好的解决办法了，再启用
				// if (RegUtils.isMatch("(?i)^.*\\.jsp$", servletPath)) {
				// if(!validatePageAuth(RegUtils.match("[^/]*\\.jsp",
				// servletPath, 0))){
				// response.sendRedirect(context+"/resource/bonc/html/404.html");
				// }
				// chain.doFilter(req, rep);
				// }
				// else
				/*
				 * if (RegUtils.isMatch("(?i)^.*login\\.jsp$", servletPath)) {
				 * response.sendRedirect(context +
				 * "/pages/jsp/frame/frame.jsp"); } else if
				 * (RegUtils.isMatch("^/$", servletPath)) {
				 * response.sendRedirect(context +
				 * "/pages/jsp/frame/frame.jsp"); } else{ chain.doFilter(req,
				 * rep); }
				 */
				chain.doFilter(req, rep);
			}
		}
	}

	/*
	 * 
	 * <p>Title: init</p> <p>Description: 过滤器初始化方法</p>
	 * 
	 * @param fConfig
	 * 
	 * @throws ServletException
	 * 
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		this.excludedPages = fConfig.getInitParameter("excludedPages");
		this.excludedPages = this.excludedPages.replaceAll("\\s*", "");
		// 获取登录过滤器，是否单点登录
		this.singleSignOut = fConfig.getInitParameter("singleSignOut");
		this.redirectPage = fConfig.getInitParameter("redirectPage");
		if (!excludedPages.isEmpty()) {
			this.excludedPageArray = excludedPages.split(",");
		}
		return;
	}

	/*
	 * 
	 * <p>Title: destroy</p> <p>Description: 过滤器销毁方法</p>
	 * 
	 * @see javax.servlet.Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub

	}

}
