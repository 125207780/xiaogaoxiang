package com.bonc.common.utils;

import java.net.URLEncoder;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * 
 * ClassName: HtmlEncoder <br/> 
 * Function: URL连接中的汉字编码转换. <br/> 
 * date: 2017年2月17日 下午3:04:08 <br/> 
 * 
 * @author liboqiang 
 * @version  
 * @since JDK 1.6
 */
public class StringEncoder {

	/**
	 * 
	 * urlEncode:(汉字转码方法). <br/> 
	 * 
	 * @author liboqiang
	 * @param url
	 * @return 
	 * @since JDK 1.6
	 */
	public static String urlEncode(String url) {
		try {
			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();

			String agent = attr.getRequest().getHeader("USER-AGENT");
			// IE
			if (null != agent && -1 != agent.indexOf("MSIE")) {
				url = URLEncoder.encode(url, "UTF-8");
			}
			// Firefox
			else if (null != agent && -1 != agent.indexOf("Mozilla")) {
				url = new String(url.getBytes("UTF-8"), "iso-8859-1");
			} else {
				url = URLEncoder.encode(url, "UTF-8");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return url;
	}

}
