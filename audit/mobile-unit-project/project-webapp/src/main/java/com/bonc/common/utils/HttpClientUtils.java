package com.bonc.common.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 
 * @FileName HttpClientUtils.java
 * @Author xiaogaoxiang
 * @At 2018年12月26日 下午12:17:46
 * @Desc httpclient连接封装类
 */
public class HttpClientUtils {

	/**
	 * 连接方法
	 * 
	 * @Title getPostData
	 * @Author xiaogaoxiang
	 * @param urlStr
	 * @return String
	 * @throws Exception
	 */
	public static String getPostData(String urlStr) throws Exception {
		URL url = new URL(urlStr);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		Reader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
		StringBuilder sb = new StringBuilder();
		for (int c; (c = in.read()) >= 0;)
			sb.append((char) c);
		String response = sb.toString();
		in.close();
		return response;
	}

}
