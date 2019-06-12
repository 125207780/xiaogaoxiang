package com.bonc.common.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

/**
 * @author yantao E-mail:kengsinia@126.com
 * @version
 * @create time : 2016-1-13 下午7:41:46
 */
public class DateUtil extends org.apache.commons.lang3.time.DateUtils {
	public static final String DEFAULT_FORMAT_DATE = "yyyy-MM-dd";
	public static final String DEFAULT_FORMAT_TIME = "HH:mm:ss.SSS";
	public static final String DEFAULT_FORMAT_TIMESTAMP = "yyyy-MM-dd HH:mm:ss.SSS";
	public static final String DEFAULT_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String DEFAULT_FORMAT_DATE_ONE = "yyyyMMdd";

	public static String formatDate(long time) {
		return formatDate(time, DEFAULT_FORMAT);
	}
	public static Date parseDate(String time) {
		return parseDate(time, DEFAULT_FORMAT);
	}
	public static Date parseDate(String time, String format) {
		return parseDate(time, format, Locale.getDefault());
	}
	public static Date parseDate(String time, String format, Locale locale) {
		if (format == null) {
			format = DEFAULT_FORMAT;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format, locale);
		try {
			return sdf.parse(time);
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
	public static String formatDate(long time, String format) {
		return formatDate(time, format, Locale.getDefault());
	}
	public static String formatDate(long time, String format, Locale locale) {
		Date date = new Date(time);
		if (format == null) {
			format = DEFAULT_FORMAT;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format, locale);
		return sdf.format(date);
	}
	/**
	 * <p>
	 * 获取当前年月日
	 * </p>
	 * @return [参数说明]
	 * @return String 返回类型
	 * @author lihongliang
	 * @date 2016年1月26日 下午1:31:14
	 */
	public static String getToday(String format) {
		SimpleDateFormat df = new SimpleDateFormat(format);
		String period = df.format(new Date()).toString();
		return period;
	}
	/**
	 * <p>
	 * 获取昨天年月日
	 * </p>
	 * @return [参数说明]
	 * @return String 返回类型
	 * @author lihongliang
	 * @date 2016年1月26日 下午1:32:10
	 */
	public static String getYestoday(String format) {
		SimpleDateFormat df = new SimpleDateFormat(format);
		Date date = new Date();
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, -1);
		date = calendar.getTime();
		String period = df.format(date).toString();
		return period;
	}
	/**
	 * <p>
	 * 获取上个月年月日
	 * </p>
	 * @return [参数说明]
	 * @return String 返回类型
	 * @author lihongliang
	 * @date 2016年1月26日 下午1:32:27
	 */
	public static String getMonth(String format) {
		SimpleDateFormat df = new SimpleDateFormat(format);
		Date date = new Date();
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, -1);
		date = calendar.getTime();
		String period = df.format(date).toString();
		return period;
	}
	
	/**
	 * 
	 * recentTime:(获取最近时间). <br/> 
	 * 
	 * @author liboqiang
	 * @param date
	 * @return 
	 * @since JDK 1.6
	 */
	public static String recentTime(Date date) {
		Date now = new Date();
		long between = (now.getTime() - date.getTime()) / 1000;
		long day = between / (24 * 60 * 60);
		long hour = between / (60 * 60);
		long minute = between / 60;
		long second = between;
		StringBuffer buf = new StringBuffer();
		if (day != 0) {
			return buf.append(day).append("天前").toString();
		}

		if (hour != 0) {
			return buf.append(hour).append("小时前").toString();
		}

		if (minute != 0) {
			return buf.append(minute).append("分钟前").toString();
		}
		return buf.append(second).append("秒前").toString();
	}
	/**
	 * 
	 * formatTime:获得天时分秒. <br/> 
	 * 
	 * @author wangyb
	 * @param ms
	 * @return 
	 * @since JDK 1.7
	 */
	public static String formatTime(long ms) {  
        
        int ss = 1000;  
        int mi = ss * 60;  
        int hh = mi * 60;  
        int dd = hh * 24;  

        long day = ms / dd;  
        long hour = (ms - day * dd) / hh;  
        long minute = (ms - day * dd - hour * hh) / mi;  
        long second = (ms - day * dd - hour * hh - minute * mi) / ss;  
        long milliSecond = ms - day * dd - hour * hh - minute * mi - second * ss;  

        String strDay = day < 10 ? "0" + day : "" + day; //天  
        String strHour = hour < 10 ? "0" + hour : "" + hour;//小时  
        String strMinute = minute < 10 ? "0" + minute : "" + minute;//分钟  
        String strSecond = second < 10 ? "0" + second : "" + second;//秒  
        String strMilliSecond = milliSecond < 10 ? "0" + milliSecond : "" + milliSecond;//毫秒  
        strMilliSecond = milliSecond < 100 ? "0" + strMilliSecond : "" + strMilliSecond; 
        StringBuilder sb = new StringBuilder();
        sb.append(strDay).append("天").append(strHour)
        .append("小时").append(strMinute).append("分钟").append(strSecond).append("秒");
        return sb.toString();  
	}
}
