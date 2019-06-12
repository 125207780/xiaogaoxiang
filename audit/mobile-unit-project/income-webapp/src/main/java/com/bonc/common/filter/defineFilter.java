package com.bonc.common.filter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.bonc.common.bean.IncomeUser;
import com.bonc.income.service.filterService;
import com.metasoft.portal.sso.domain.User ;
import com.metasoft.sso.client.util.WebConst;  
/**
 * @Description: 自定义拦截器
 */
public class defineFilter implements Filter {
	private filterService filterservice;	
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		 // SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, filterConfig.getServletContext());  
		ServletContext servletContext = filterConfig.getServletContext(); 
		WebApplicationContext webAC = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext); 
		filterservice = webAC.getBean(filterService.class); 
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse rep, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) rep;
		
		HttpSession session = request.getSession();
		Map<String ,String> placeMap = new HashMap<String,String>();
		placeMap.put("730", "岳阳市");
		placeMap.put("731", "长沙市");
		placeMap.put("732", "湘潭市");
		placeMap.put("733", "株洲市");
		placeMap.put("734", "衡阳市");
		placeMap.put("735", "郴州市");
		placeMap.put("736", "常德市");
		placeMap.put("737", "益阳市");
		placeMap.put("738", "娄底市");
		placeMap.put("739", "邵阳市");
		placeMap.put("743", "吉首市");
		placeMap.put("744", "张家界市");
		placeMap.put("745", "怀化市");
		placeMap.put("746", "永州市");
		placeMap.put("999", "全省");
		
		
		List<Integer> noL = new ArrayList<Integer>();	
		noL.add(740);
		noL.add(741);
		noL.add(742);
		
		
		User user =(User)session.getAttribute(WebConst.SESSION_NAME_USER_INFO);
		if(user!=null) {
			String userId= user.getUserId();
			System.out.println(userId);
			if(!"".equals(userId)) {
				IncomeUser inUser =(IncomeUser)session.getAttribute("incomeUser");
				System.out.println(inUser);
				if(inUser==null){
					System.out.println(userId);
					//page1Service.echart1(null);
					Map <String,String >getPlace = filterservice.IncomPlace(userId);
					String place = getPlace.get("USER_ORG01_AREA_ID");
					String html="";
					if(place.equals("999")) {
						 html +="<option value="+place+">"+placeMap.get(place)+"</option>"; 
						for(int i=730;i<747;i++) {
							if(!noL.contains(i)) {
						 html +="<option value="+String.valueOf(i)+">"+placeMap.get(String.valueOf(i))+"</option>";
							}
								}				
					}else {
						 html ="<option value="+place+">"+placeMap.get(place)+"</option>"; 
					}
					System.out.println(html);
					IncomeUser incomeUser = new IncomeUser();
					incomeUser.setUserId(userId);
					incomeUser.setPlace(html);
					session.setAttribute("incomeUser", incomeUser);
				}		
			}
		}
		chain.doFilter(req, rep);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
