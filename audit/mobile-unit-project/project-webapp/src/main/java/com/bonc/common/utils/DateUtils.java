package com.bonc.common.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 
 * @FileName DateUtils.java
 * @Author 肖高翔
 * @At 2018年5月11日 上午10:06:56
 * @Desc 日期工具类
 */
public class DateUtils extends org.apache.commons.lang.time.DateUtils {

	public static final String TIME_WITH_MINUTE_PATTERN = "HH:mm";

	/**
	 * 一天的MilliSecond
	 */
	public static final long DAY_MILLI = 24 * 60 * 60 * 1000;

	/**
	 * 取值范围：就是临界点包不包含等于
	 */
	public final static int LEFT_OPEN_RIGHT_OPEN = 1;
	public final static int LEFT_CLOSE_RIGHT_OPEN = 2;
	public final static int LEFT_OPEN_RIGHT_CLOSE = 3;
	public final static int LEFT_CLOSE_RIGHT_CLOSE = 4;

	/**
	 * 等于返回0值, 大于返回大于0的值 小于返回小于0的值
	 */
	public final static int COMP_MODEL_DATE = 1;

	/**
	 * 比较日期的模式 --只比较时间，不比较日期
	 */
	public final static int COMP_MODEL_TIME = 2;

	/**
	 * 比较日期的模式 --比较日期，也比较时间
	 */
	public final static int COMP_MODEL_DATETIME = 3;

	/**
	 * 要用到的DATE Format的定义
	 */
	public static String DATE_FORMAT_DATEONLY = "yyyy-MM-dd"; // 年/月/日
	public static String DATE_FORMAT_DATETIME = "yyyy-MM-dd HH:mm:ss"; // 年/月/日
	public static String DATE_FORMAT_DATEMONTH = "yyyyMM";
	public static SimpleDateFormat sdfDateTime = new SimpleDateFormat(DateUtils.DATE_FORMAT_DATETIME);
	public static SimpleDateFormat sdfDateOnly = new SimpleDateFormat(DateUtils.DATE_FORMAT_DATEONLY);
	public static final SimpleDateFormat formatTimestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static final SimpleDateFormat SHORTDATEFORMAT = new SimpleDateFormat("yyyyMMdd");
	public static final SimpleDateFormat SUPERSHORTDATEFORMAT = new SimpleDateFormat("yyyyMM");
	public static final SimpleDateFormat VERYSHORTDATEFORMAT = new SimpleDateFormat("yyMMdd");
	public static final SimpleDateFormat SHORT_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	public static final SimpleDateFormat VERY_SHORT_DATE_FORMAT = new SimpleDateFormat("yy-MM-dd");
	public static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static final SimpleDateFormat LONG_DATE_FORMAT_SSS = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	public static final SimpleDateFormat HMS_FORMAT = new SimpleDateFormat("HH:mm:ss");

	/**
	 * 根据日期格式字符串解析日期字符串
	 * 
	 * @Title parseDate
	 * @Author 肖高翔
	 * @param str
	 *            日期字符串
	 * @param parsePatterns
	 *            日期格式字符串
	 * @return 解析后日期
	 * @throws ParseException
	 *             Date
	 */
	public static Date parseDate(String str, String parsePatterns) throws ParseException {
		return parseDate(str, new String[] { parsePatterns });
	}

	/**
	 * 根据单位字段比较两个日期
	 * 
	 * @Title compareDate
	 * @Author 肖高翔
	 * @param date
	 *            日期1
	 * @param otherDate
	 *            日期2
	 * @param withUnit
	 *            单位字段，从Calendar field取值
	 * @return int 等于返回0值, 大于返回大于0的值 小于返回小于0的值
	 */
	public static int compareDate(Date date, Date otherDate, int withUnit) {
		Calendar dateCal = Calendar.getInstance();
		dateCal.setTime(date);
		Calendar otherDateCal = Calendar.getInstance();
		otherDateCal.setTime(otherDate);
		switch (withUnit) {
		case Calendar.YEAR:
			dateCal.clear(Calendar.MONTH);
			otherDateCal.clear(Calendar.MONTH);
		case Calendar.MONTH:
			dateCal.set(Calendar.DATE, 1);
			otherDateCal.set(Calendar.DATE, 1);
		case Calendar.DATE:
			dateCal.set(Calendar.HOUR_OF_DAY, 0);
			otherDateCal.set(Calendar.HOUR_OF_DAY, 0);
		case Calendar.HOUR:
			dateCal.clear(Calendar.MINUTE);
			otherDateCal.clear(Calendar.MINUTE);
		case Calendar.MINUTE:
			dateCal.clear(Calendar.SECOND);
			otherDateCal.clear(Calendar.SECOND);
		case Calendar.SECOND:
			dateCal.clear(Calendar.MILLISECOND);
			otherDateCal.clear(Calendar.MILLISECOND);
		case Calendar.MILLISECOND:
			break;
		default:
			throw new IllegalArgumentException("withUnit 单位字段 " + withUnit + " 不合法！！");
		}
		return dateCal.compareTo(otherDateCal);
	}

	/**
	 * 根据单位字段比较两个时间
	 * 
	 * @Title compareTime
	 * @Author 肖高翔
	 * @param date
	 *            时间1
	 * @param otherDate
	 *            时间2
	 * @param withUnit
	 *            单位字段，从Calendar field取值
	 * @return int 等于返回0值, 大于返回大于0的值 小于返回小于0的值
	 */
	public static int compareTime(Date date, Date otherDate, int withUnit) {
		Calendar dateCal = Calendar.getInstance();
		dateCal.setTime(date);
		Calendar otherDateCal = Calendar.getInstance();
		otherDateCal.setTime(otherDate);
		dateCal.clear(Calendar.YEAR);
		dateCal.clear(Calendar.MONTH);
		dateCal.set(Calendar.DATE, 1);
		otherDateCal.clear(Calendar.YEAR);
		otherDateCal.clear(Calendar.MONTH);
		otherDateCal.set(Calendar.DATE, 1);
		switch (withUnit) {
		case Calendar.HOUR:
			dateCal.clear(Calendar.MINUTE);
			otherDateCal.clear(Calendar.MINUTE);
		case Calendar.MINUTE:
			dateCal.clear(Calendar.SECOND);
			otherDateCal.clear(Calendar.SECOND);
		case Calendar.SECOND:
			dateCal.clear(Calendar.MILLISECOND);
			otherDateCal.clear(Calendar.MILLISECOND);
		case Calendar.MILLISECOND:
			break;
		default:
			throw new IllegalArgumentException("withUnit 单位字段 " + withUnit + " 不合法！！");
		}
		return dateCal.compareTo(otherDateCal);
	}

	/**
	 * 获得当前的日期毫秒
	 * 
	 * @Title nowTimeMillis
	 * @Author 肖高翔
	 * @return long
	 */
	public static long nowTimeMillis() {
		return System.currentTimeMillis();
	}

	/**
	 * 获得当前的时间戳
	 * 
	 * @Title nowTimeStamp
	 * @Author 肖高翔
	 * @return Timestamp
	 */
	public static Timestamp nowTimeStamp() {
		return new Timestamp(nowTimeMillis());
	}

	/**
	 * 获得日期字符串格式：yyyy-MM-dd 当前日期
	 * 
	 * @Title getReqDate
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getReqDate() {
		return SHORTDATEFORMAT.format(new Date());
	}

	/**
	 * 获得日期字符串格式：yyMMdd 当前短时间
	 * 
	 * @Title getShortReqDate
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getShortReqDate() {
		return VERYSHORTDATEFORMAT.format(new Date());
	}

	/**
	 * 获得日期字符串格式：yyyyMM 当前超短日期
	 * 
	 * @Title getVeryShortReqDate
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getVeryShortReqDate() {
		return SUPERSHORTDATEFORMAT.format(new Date());
	}

	/**
	 * 获得当前日期字符串格式：yyyy-MM-dd 传入日期
	 * 
	 * @Title getReqDate
	 * @Author 肖高翔
	 * @param date
	 * @return String
	 */
	public static String getReqDate(Date date) {
		return SHORT_DATE_FORMAT.format(date);
	}

	/**
	 * 获得当前日期字符串格式：yy-MM-dd 传入日期
	 * 
	 * @Title getShortDate
	 * @Author 肖高翔
	 * @param date
	 * @return String
	 */
	public static String getShortDate(Date date) {
		return VERY_SHORT_DATE_FORMAT.format(date);
	}

	/**
	 * 获得当前日期字符串格式：yyyyMMdd 传入日期
	 * 
	 * @Title getReqDateyyyyMMdd
	 * @Author 肖高翔
	 * @param date
	 * @return String
	 */
	public static String getReqDateyyyyMMdd(Date date) {
		return SHORTDATEFORMAT.format(date);
	}

	/**
	 * 获得当前日期字符串格式：yyyy-MM-dd 传入的时间戳
	 * 
	 * @Title TimestampToDateStr
	 * @Author 肖高翔
	 * @param tmp
	 * @return String
	 */
	public static String TimestampToDateStr(Timestamp tmp) {
		return SHORT_DATE_FORMAT.format(tmp);
	}

	/**
	 * 获得当前日期字符串格式：HH:mm:ss 当前时间
	 * 
	 * @Title getReqTime
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getReqTime() {
		return HMS_FORMAT.format(new Date());
	}

	/**
	 * 得到时间戳格式字串
	 * 
	 * @Title getTimeStampStr
	 * @Author 肖高翔
	 * @param date
	 * @return String
	 */
	public static String getTimeStampStr(Date date) {
		return LONG_DATE_FORMAT.format(date);
	}

	/**
	 * 得到长日期格式字串
	 * 
	 * @Title getLongDateStr
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getLongDateStr() {
		return LONG_DATE_FORMAT.format(new Date());
	}

	/**
	 * 得到长日期格式字符串
	 * 
	 * @Title getLongDateStr 传入时间
	 * @Author 肖高翔
	 * @param time
	 * @return String
	 */
	public static String getLongDateStr(Timestamp time) {
		return LONG_DATE_FORMAT.format(time);
	}

	/**
	 * 得到短日期格式字串
	 * 
	 * @Title getShortDateStr 传入时间
	 * @Author 肖高翔
	 * @param date
	 * @return String
	 */
	public static String getShortDateStr(Date date) {
		return SHORT_DATE_FORMAT.format(date);
	}

	/**
	 * 得到短日期格式字符串
	 * 
	 * @Title getShortDateStr 系统当前时间
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getShortDateStr() {
		return SHORT_DATE_FORMAT.format(new Date());
	}

	/**
	 * 计算 second 秒后的时间
	 * 
	 * @Title addSecond
	 * @Author 肖高翔
	 * @param date
	 * @param second
	 * @return Date
	 */
	public static Date addSecond(Date date, int second) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.SECOND, second);
		return calendar.getTime();
	}

	/**
	 * 计算 minute 分钟后的时间
	 * 
	 * @param date
	 * @param minute
	 * @return
	 */
	public static Date addMinute(Date date, int minute) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MINUTE, minute);
		return calendar.getTime();
	}

	/**
	 * 计算 hour 小时后的时间
	 * 
	 * @Title addHour
	 * @Author 肖高翔
	 * @param date
	 * @param hour
	 * @return Date
	 */
	public static Date addHour(Date date, int hour) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.HOUR, hour);
		return calendar.getTime();
	}

	/**
	 * 得到day的起始时间点。
	 * 
	 * @Title getDayStart
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getDayStart(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	/**
	 * 得到day的终止时间点.
	 * 
	 * @Title getDayEnd
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getDayEnd(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		calendar.add(Calendar.MILLISECOND, -1);
		return calendar.getTime();
	}

	/**
	 * 计算 day 天后的时间
	 * 
	 * @Title addDay
	 * @Author 肖高翔
	 * @param date
	 * @param day
	 * @return Date
	 */
	public static Date addDay(Date date, int day) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, day);
		return calendar.getTime();
	}

	/**
	 * 得到month的终止时间点.
	 * 
	 * @Title getMonthEnd
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getMonthEnd(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		calendar.add(Calendar.MONTH, 1);
		calendar.add(Calendar.MILLISECOND, -1);
		return calendar.getTime();
	}

	/**
	 * 日期加一年
	 * 
	 * @Title addYear
	 * @Author 肖高翔
	 * @param date
	 * @param year
	 * @return Date
	 */
	public static Date addYear(Date date, int year) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_YEAR, 365 * year);
		return calendar.getTime();
	}

	/**
	 * 将字符串日期转成Timestamp格式
	 * 
	 * @Title strToTimestamp
	 * @Author 肖高翔
	 * @param dateStr
	 * @return Timestamp
	 */
	public static Timestamp strToTimestamp(String dateStr) {
		return Timestamp.valueOf(dateStr);
	}

	/**
	 * 将日期转成Timestamp格式
	 * 
	 * @Title strToTimestamp
	 * @Author 肖高翔
	 * @param date
	 * @return Timestamp
	 */
	public static Timestamp strToTimestamp(Date date) {
		return Timestamp.valueOf(formatTimestamp.format(date));
	}

	/**
	 * 将日期字符串转短日期（yyyy-MM-dd)
	 * 
	 * @Title strToDate
	 * @Author 肖高翔
	 * @param dateStr
	 * @return Date
	 * @throws ParseException
	 */
	public static Date strToShortDate(String dateStr) throws ParseException {
		return SHORT_DATE_FORMAT.parse(dateStr);
	}

	/**
	 * 将日期字符串转长日期（yyyy-MM-dd HH:mm:ss）
	 * 
	 * @Title strToDate
	 * @Author 肖高翔
	 * @param dateStr
	 * @return
	 * @throws ParseException
	 *             Date
	 */
	public static Date strToDate(String dateStr) throws ParseException {
		return formatTimestamp.parse(dateStr);
	}

	/**
	 * 将日期字符串转超长日期（yyyy-MM-dd HH:mm:ss.SSS）
	 * 
	 * @Title strToLongDate
	 * @Author 肖高翔
	 * @param dateStr
	 * @return
	 * @throws ParseException
	 *             Date
	 */
	public static Date strToLongDate(String dateStr) throws ParseException {
		return LONG_DATE_FORMAT_SSS.parse(dateStr);
	}

	/**
	 * 获取当前Timestamp格式日期
	 * 
	 * @Title getCurTimestamp
	 * @Author 肖高翔
	 * @return Timestamp
	 */
	public static Timestamp getCurTimestamp() {
		return Timestamp.valueOf(formatTimestamp.format(new Date()));
	}

	/**
	 * 取得两个日期之间的日数
	 * 
	 * @Title daysBetween
	 * @Author 肖高翔
	 * @param t1
	 * @param t2
	 * @return long t1到t2间的日数，如果t2 在 t1之后，返回正数，否则返回负数
	 */
	public static long daysBetween(java.sql.Timestamp t1, java.sql.Timestamp t2) {
		return (t2.getTime() - t1.getTime()) / DAY_MILLI;
	}

	/**
	 * 返回java.sql.Timestamp型的SYSDATE
	 * 
	 * @Title getSysDateTimestamp
	 * @Author 肖高翔
	 * @return java.sql.Timestamp java.sql.Timestamp型的SYSDATE
	 */
	public static java.sql.Timestamp getSysDateTimestamp() {
		return new java.sql.Timestamp(System.currentTimeMillis());
	}

	/**
	 * 利用缺省的Date格式(YYYY/MM/DD)转换String到java.sql.Timestamp
	 * 
	 * @Title toSqlTimestamp
	 * @Author 肖高翔
	 * @param sDate
	 * @return java.sql.Timestamp
	 */
	public static java.sql.Timestamp toSqlTimestamp(String sDate) {
		if (sDate == null) {
			return null;
		}
		if (sDate.length() != DateUtils.DATE_FORMAT_DATEONLY.length() && sDate.length() != DateUtils.DATE_FORMAT_DATETIME.length()) {
			return null;
		}
		return toSqlTimestamp(sDate,
				sDate.length() == DateUtils.DATE_FORMAT_DATEONLY.length() ? DateUtils.DATE_FORMAT_DATEONLY : DateUtils.DATE_FORMAT_DATETIME);

	}

	/**
	 * 利用缺省的Date格式(YYYY/MM/DD hh:mm:ss)转化String到java.sql.Timestamp
	 * 
	 * @Title toSqlTimestamp
	 * @Author 肖高翔
	 * @param sDate
	 *            string类型
	 * @param sFmt
	 *            Date format DATE_FORMAT_DATEONLY/DATE_FORMAT_DATETIME
	 * @return java.sql.Timestamp
	 */
	public static java.sql.Timestamp toSqlTimestamp(String sDate, String sFmt) {
		String temp = null;
		if (sDate == null || sFmt == null) {
			return null;
		}
		if (sDate.length() != sFmt.length()) {
			return null;
		}
		if (sFmt.equals(DateUtils.DATE_FORMAT_DATETIME)) {
			temp = sDate.replace('/', '-');
			temp = temp + ".000000000";
		} else if (sFmt.equals(DateUtils.DATE_FORMAT_DATEONLY)) {
			temp = sDate.replace('/', '-');
			temp = temp + " 00:00:00.000000000";
		} else {
			return null;
		}
		return java.sql.Timestamp.valueOf(temp);
	}

	/**
	 * 以YYYY/MM/DD HH24:MI:SS格式返回系统日期时间
	 * 
	 * @Title getSysDateTimeString
	 * @Author 肖高翔
	 * @return String 系统日期时间
	 */
	public static String getSysDateTimeString() {
		return toString(new java.util.Date(System.currentTimeMillis()), DateUtils.sdfDateTime);
	}

	/**
	 * 根据指定的Format转化java.util.Date到String
	 * 
	 * @Title toString
	 * @Author 肖高翔
	 * @param dt
	 * @param sFmt
	 *            Date format , DATE_FORMAT_DATEONLY or DATE_FORMAT_DATETIME
	 * @return String
	 */
	public static String toString(java.util.Date dt, String sFmt) {
		if (dt == null || sFmt == null || "".equals(sFmt)) {
			return "";
		}
		return toString(dt, new SimpleDateFormat(sFmt));
	}

	/**
	 * 利用指定SimpleDateFormat instance转换java.util.Date到String
	 * 
	 * @Title toString
	 * @Author 肖高翔
	 * @param dt
	 *            ava.util.Date instance
	 * @param formatter
	 *            SimpleDateFormat Instance
	 * @return String
	 */
	private static String toString(java.util.Date dt, SimpleDateFormat formatter) {
		String sRet = null;

		try {
			sRet = formatter.format(dt).toString();
		} catch (Exception e) {
			sRet = null;
		}

		return sRet;
	}

	/**
	 * 转换java.sql.Timestamp到String，格式为YYYY/MM/DD HH24:MI
	 * 
	 * @Title toSqlTimestampString2
	 * @Author 肖高翔
	 * @param dt
	 *            java.sql.Timestamp instance
	 * @return String
	 */
	public static String toSqlTimestampString2(java.sql.Timestamp dt) {
		if (dt == null) {
			return null;
		}
		String temp = toSqlTimestampString(dt, DateUtils.DATE_FORMAT_DATETIME);
		return temp.substring(0, 16);
	}

	/**
	 * 转换java.sql.Timestamp到String
	 * 
	 * @Title toString
	 * @Author 肖高翔
	 * @param dt
	 * @return String
	 */
	public static String toString(java.sql.Timestamp dt) {
		return dt == null ? "" : toSqlTimestampString2(dt);
	}

	/**
	 * 根据指定的格式转换java.sql.Timestamp到String
	 * 
	 * @Title toSqlTimestampString
	 * @Author 肖高翔
	 * @param dt
	 *            java.sql.Timestamp instance
	 * @param sFmt
	 *            Date 格式，DATE_FORMAT_DATEONLY/DATE_FORMAT_DATETIME/
	 *            DATE_FORMAT_SESSION
	 * @return String
	 */
	public static String toSqlTimestampString(java.sql.Timestamp dt, String sFmt) {
		String temp = null;
		String out = null;
		if (dt == null || sFmt == null) {
			return null;
		}
		temp = dt.toString();
		// "YYYY/MM/DD HH24:MI:SS"
		if (sFmt.equals(DateUtils.DATE_FORMAT_DATETIME) || sFmt.equals(DateUtils.DATE_FORMAT_DATEONLY)) {
			temp = temp.substring(0, sFmt.length());
			out = temp.replace('/', '-');
		}
		return out;
	}

	/**
	 * 得到当前日期的星期
	 * 
	 * @Title getWeek
	 * @Author 肖高翔
	 * @return int
	 */
	public static int getWeek() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		int w = cal.get(Calendar.DAY_OF_WEEK);
		return w;
	}

	/**
	 * Timestamp 格式转换成yyyy-MM-dd timestampToSql(Timestamp 格式转换成yyyy-MM-dd)
	 * 
	 * @Title timestampToStringYMD
	 * @Author 肖高翔
	 * @param timestamp
	 *            时间
	 * @return String yyyy-MM-dd 时间
	 */
	public static String timestampToStringYMD(java.sql.Timestamp timestamp) {
		SimpleDateFormat sdf = new SimpleDateFormat(DateUtils.DATE_FORMAT_DATEONLY);
		String createTimeStr = sdf.format(timestamp);
		return createTimeStr;
	}

	/**
	 * 判断一个时间是否在某个时间区间内
	 * 
	 * @Title isBetween
	 * @Author 肖高翔
	 * @param now
	 *            目标时间
	 * @param start
	 *            时间区间开始
	 * @param end
	 *            时间区间结束
	 * @param model
	 *            区间模式
	 * @return boolean 是否在区间内
	 */
	public static boolean isBetween(Date now, Date start, Date end, int model) {
		return isBetween(now, start, end, model, LEFT_OPEN_RIGHT_OPEN);
	}

	/**
	 * 判断时间是否在制定的时间段之类
	 * 
	 * @Title isBetween
	 * @Author 肖高翔
	 * @param date
	 *            需要判断的时间
	 * @param start
	 *            时间段的起始时间
	 * @param end
	 *            时间段的截止时间
	 * @param interModel
	 *            区间的模式
	 * @param compModel
	 *            比较的模式
	 * @return boolean
	 * 
	 *         <pre>
	 * 取值：
	 * LEFT_OPEN_RIGHT_OPEN
	 * LEFT_CLOSE_RIGHT_OPEN
	 * LEFT_OPEN_RIGHT_CLOSE
	 * LEFT_CLOSE_RIGHT_CLOSE
	 *         </pre>
	 * 
	 *         <pre>
	 * 取值：
	 * COMP_MODEL_DATE	只比较日期，不比较时间
	 * COMP_MODEL_TIME	只比较时间，不比较日期
	 * COMP_MODEL_DATETIME 比较日期，也比较时间
	 *         </pre>
	 */
	public static boolean isBetween(Date date, Date start, Date end, int interModel, int compModel) {
		if (date == null || start == null || end == null) {
			throw new IllegalArgumentException("日期不能为空");
		}
		SimpleDateFormat format = null;
		switch (compModel) {
		case COMP_MODEL_DATE: {
			format = new SimpleDateFormat("yyyyMMdd");
			break;
		}
		case COMP_MODEL_TIME: {
			format = new SimpleDateFormat("HHmmss");
			break;
		}
		case COMP_MODEL_DATETIME: {
			format = new SimpleDateFormat("yyyyMMddHHmmss");
			break;
		}
		default: {
			throw new IllegalArgumentException(String.format("日期的比较模式[%d]有误", compModel));
		}
		}
		long dateNumber = Long.parseLong(format.format(date));
		long startNumber = Long.parseLong(format.format(start));
		long endNumber = Long.parseLong(format.format(end));
		switch (interModel) {
		case LEFT_OPEN_RIGHT_OPEN: {
			if (dateNumber <= startNumber || dateNumber >= endNumber) {
				return false;
			} else {
				return true;
			}
		}
		case LEFT_CLOSE_RIGHT_OPEN: {
			if (dateNumber < startNumber || dateNumber >= endNumber) {
				return false;
			} else {
				return true;
			}
		}
		case LEFT_OPEN_RIGHT_CLOSE: {
			if (dateNumber <= startNumber || dateNumber > endNumber) {
				return false;
			} else {
				return true;
			}
		}
		case LEFT_CLOSE_RIGHT_CLOSE: {
			if (dateNumber < startNumber || dateNumber > endNumber) {
				return false;
			} else {
				return true;
			}
		}
		default: {
			throw new IllegalArgumentException(String.format("日期的区间模式[%d]有误", interModel));
		}
		}
	}

	/**
	 * 得到当前周起始时间
	 * 
	 * @Title getWeekStart
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getWeekStart(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.get(Calendar.WEEK_OF_YEAR);
		int firstDay = calendar.getFirstDayOfWeek();
		calendar.set(Calendar.DAY_OF_WEEK, firstDay);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	/**
	 * 得到当前周截止时间
	 * 
	 * @Title getWeekEnd
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getWeekEnd(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.get(Calendar.WEEK_OF_YEAR);
		int firstDay = calendar.getFirstDayOfWeek();
		calendar.set(Calendar.DAY_OF_WEEK, 8 - firstDay);
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	/**
	 * 得到当月起始时间
	 * 
	 * @Title getMonthStart
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getMonthStart(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	/**
	 * 得到当前年起始时间
	 * 
	 * @Title getYearStart
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getYearStart(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR));
		calendar.set(Calendar.MONTH, 0);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	/**
	 * 得到当前年最后一天
	 * 
	 * @Title getYearEnd
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getYearEnd(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR));
		calendar.set(Calendar.MONTH, 11);
		calendar.set(Calendar.DAY_OF_MONTH, 31);
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	/**
	 * 取得月天数
	 * 
	 * @Title getDayOfMonth
	 * @Author 肖高翔
	 * @param date
	 * @return int
	 */
	public static int getDayOfMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 取得月第一天
	 * 
	 * @Title getFirstDateOfMonth
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getFirstDateOfMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMinimum(Calendar.DAY_OF_MONTH));
		return c.getTime();
	}

	/**
	 * 取得月最后一天
	 * 
	 * @Title getLastDateOfMonth
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getLastDateOfMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
		return c.getTime();
	}

	/**
	 * 取得季度第一天
	 * 
	 * @Title getSeasonStart
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getSeasonStart(Date date) {
		return getDayStart(getFirstDateOfMonth(getSeasonDate(date)[0]));
	}

	/**
	 * 取得季度最后一天
	 * 
	 * @Title getSeasonEnd
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getSeasonEnd(Date date) {
		return getDayEnd(getLastDateOfMonth(getSeasonDate(date)[2]));
	}

	/**
	 * 取得季度月
	 * 
	 * @Title getSeasonDate
	 * @Author 肖高翔
	 * @param date
	 * @return Date[]
	 */
	public static Date[] getSeasonDate(Date date) {
		Date[] season = new Date[3];

		Calendar c = Calendar.getInstance();
		c.setTime(date);

		int nSeason = getSeason(date);
		if (nSeason == 1) {// 第一季度
			c.set(Calendar.MONTH, Calendar.JANUARY);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.FEBRUARY);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.MARCH);
			season[2] = c.getTime();
		} else if (nSeason == 2) {// 第二季度
			c.set(Calendar.MONTH, Calendar.APRIL);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.MAY);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.JUNE);
			season[2] = c.getTime();
		} else if (nSeason == 3) {// 第三季度
			c.set(Calendar.MONTH, Calendar.JULY);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.AUGUST);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.SEPTEMBER);
			season[2] = c.getTime();
		} else if (nSeason == 4) {// 第四季度
			c.set(Calendar.MONTH, Calendar.OCTOBER);
			season[0] = c.getTime();
			c.set(Calendar.MONTH, Calendar.NOVEMBER);
			season[1] = c.getTime();
			c.set(Calendar.MONTH, Calendar.DECEMBER);
			season[2] = c.getTime();
		}
		return season;
	}

	/**
	 * 1 第一季度 2 第二季度 3 第三季度 4 第四季度
	 * 
	 * @Title getSeason
	 * @Author 肖高翔
	 * @param date
	 * @return int
	 */
	public static int getSeason(Date date) {

		int season = 0;

		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int month = c.get(Calendar.MONTH);
		switch (month) {
		case Calendar.JANUARY:
		case Calendar.FEBRUARY:
		case Calendar.MARCH:
			season = 1;
			break;
		case Calendar.APRIL:
		case Calendar.MAY:
		case Calendar.JUNE:
			season = 2;
			break;
		case Calendar.JULY:
		case Calendar.AUGUST:
		case Calendar.SEPTEMBER:
			season = 3;
			break;
		case Calendar.OCTOBER:
		case Calendar.NOVEMBER:
		case Calendar.DECEMBER:
			season = 4;
			break;
		default:
			break;
		}
		return season;
	}

	/**
	 * 一年的第几个星期
	 * 
	 * @Title getWeekOfYear
	 * @Author 肖高翔
	 * @param date
	 * @return int
	 */
	public static int getWeekOfYear(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		return calendar.get(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * 一年的第几个月
	 * 
	 * @Title getMonthOfYear
	 * @Author 肖高翔
	 * @param date
	 * @return int
	 */
	public static int getMonthOfYear(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		return calendar.get(Calendar.WEEK_OF_MONTH);
	}

	/**
	 * 字符串转date
	 * 
	 * @Title StringToDate
	 * @Author 肖高翔
	 * @param dateString
	 * @return Date
	 */
	public static Date StringToDate(String dateString) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		Date date = null;
		try {
			date = sdf.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * 判断输入日期是一个星期中的第几天(星期天为一个星期第一天)
	 * 
	 * @Title getWeekIndex
	 * @Author 肖高翔
	 * @param date
	 * @return int
	 */
	public static int getWeekIndex(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.DAY_OF_WEEK);
	}

	/**
	 * 当前时间的前几天，并且以例如2013/12/09 00:00:00 形式输出
	 * 
	 * @Title subDays
	 * @Author 肖高翔
	 * @param days
	 * @return Date
	 */
	public static Date subDays(int days) {
		Date date = addDay(new Date(), -days);
		String dateStr = getReqDate(date);
		Date date1 = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			date1 = sdf.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date1;
	}

	/**
	 * 判断开始时间和结束时间，是否超出了当前时间的一定的间隔数限制 如：开始时间和结束时间，不能超出距离当前时间90天
	 * 
	 * @Title isOverIntervalLimit
	 * @Author 肖高翔
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            结束时间按
	 * @param interval
	 *            间隔数
	 * @param dateUnit
	 *            单位(如：月，日),参照Calendar的时间单位
	 * @return boolean
	 */
	public static boolean isOverIntervalLimit(Date startDate, Date endDate, int interval, int dateUnit) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(dateUnit, interval * (-1));
		Date curDate = getDayStart(cal.getTime());
		if (getDayStart(startDate).compareTo(curDate) < 0 || getDayStart(endDate).compareTo(curDate) < 0) {
			return true;
		}
		return false;
	}

	/**
	 * 判断开始时间和结束时间，是否超出了当前时间的一定的间隔数限制, 时间单位默认为天数 如：开始时间和结束时间，不能超出距离当前时间90天
	 * 
	 * @Title isOverIntervalLimit
	 * @Author 肖高翔
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            结束时间按
	 * @param interval
	 *            间隔数
	 * @return boolean
	 */
	public static boolean isOverIntervalLimit(Date startDate, Date endDate, int interval) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.DAY_OF_MONTH, interval * (-1));
		Date curDate = getDayStart(cal.getTime());
		if (getDayStart(startDate).compareTo(curDate) < 0 || getDayStart(endDate).compareTo(curDate) < 0) {
			return true;
		}
		return false;
	}

	/**
	 * 判断开始时间和结束时间，是否超出了当前时间的一定的间隔数限制, 时间单位默认为天数 如：开始时间和结束时间，不能超出距离当前时间90天
	 * 
	 * @Title isOverIntervalLimit
	 * @Author 肖高翔
	 * @param startDateStr
	 *            开始时间
	 * @param endDateStr
	 *            结束时间按
	 * @param interval
	 *            间隔数
	 * @return boolean
	 */
	public static boolean isOverIntervalLimit(String startDateStr, String endDateStr, int interval) {
		Date startDate = null;
		Date endDate = null;
		try {
			startDate = DateUtils.parseDate(startDateStr, DateUtils.DATE_FORMAT_DATEONLY);
			endDate = DateUtils.parseDate(endDateStr, DateUtils.DATE_FORMAT_DATEONLY);
		} catch (ParseException e) {
			e.printStackTrace();
			return false;
		}
		return isOverIntervalLimit(startDate, endDate, interval);
	}

	/**
	 * 传入时间字符串及时间格式，返回对应的Date对象
	 * 
	 * @Title getDateFromString
	 * @Author 肖高翔
	 * @param src
	 *            时间字符串
	 * @param pattern
	 *            时间格式
	 * @return java.util.Date
	 */
	public static java.util.Date getDateFromString(String src, String pattern) {
		SimpleDateFormat f = new SimpleDateFormat(pattern);
		try {
			return f.parse(src);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 取季度
	 * 
	 * @Title getQuarter
	 * @Author 肖高翔
	 * @param date
	 * @return int
	 */
	@SuppressWarnings("deprecation")
	public static int getQuarter(Date date) {
		if (date.getMonth() == 0 || date.getMonth() == 1 || date.getMonth() == 2) {
			return 1;
		} else if (date.getMonth() == 3 || date.getMonth() == 4 || date.getMonth() == 5) {
			return 2;
		} else if (date.getMonth() == 6 || date.getMonth() == 7 || date.getMonth() == 8) {
			return 3;
		} else if (date.getMonth() == 9 || date.getMonth() == 10 || date.getMonth() == 11) {
			return 4;
		} else {
			return 0;

		}
	}

	/**
	 * 取得通用日期时间格式字符串
	 * 
	 * @Title formatDate
	 * @Author 肖高翔
	 * @param date
	 * @return String
	 */
	public static String formatDate(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dateFormat.format(date);
	}

	/**
	 * 获取当日的日期格式串
	 * 
	 * @Title today
	 * @Author 肖高翔
	 * @return String
	 */
	public static String today() {
		return formatDate(new Date(), "yyyy-MM-dd");
	}

	/**
	 * 获取当前时间格式串
	 * 
	 * @Title currentTime
	 * @Author 肖高翔
	 * @return String
	 */
	public static String currentTime() {
		return formatDate(new Date(), "yyyyMMddhhmmssSSS");
	}

	/**
	 * 取得指定日期格式的字符串
	 * 
	 * @Title formatDate
	 * @Author 肖高翔
	 * @param date
	 * @param format
	 * @return String
	 */
	public static String formatDate(Date date, String format) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(date);
	}

	/**
	 * 获取昨日的日期格式串
	 * 
	 * @Title getYesterday
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getYesterday() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -1);
		return formatDate(calendar.getTime(), "yyyy-MM-dd");
	}

	/**
	 * 获取当前日期
	 * 
	 * @Title getCurrentDay
	 * @Author 肖高翔
	 * @return String
	 */
	public static String getCurrentDay() {
		return formatDate(Calendar.getInstance().getTime(), "yyyy-MM-dd");
	}

	/**
	 * 判断当前时间是否在一定的时间范围内
	 * 
	 * @Title isInBetweenTimes
	 * @Author 肖高翔
	 * @param startTime
	 * @param endTime
	 * @return boolean
	 */
	public static boolean isInBetweenTimes(String startTime, String endTime) {
		Date nowTime = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		String time = sdf.format(nowTime);
		if (time.compareTo(startTime) >= 0 && time.compareTo(endTime) <= 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断输入的时间是否在一定的时间范围内
	 * 
	 * @Title isInBetweenTimes
	 * @Author 肖高翔
	 * @param startTime
	 * @param endTime
	 * @return boolean
	 */
	public static boolean isInBetweenTimes(String date, String startTime, String endTime) {
		if (date.compareTo(startTime.substring(0, 7)) >= 0 && date.compareTo(endTime.substring(0, 7)) <= 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 将超短日期转换成短日期 例如201909 转换成2019-09
	 * 
	 * @Title veryShortDateToShortDate
	 * @Author 肖高翔
	 * @param date
	 * @return String
	 */
	public static String veryShortDateToShortDate(String date) {
		String startDate = date.substring(0, 4);
		String endDate = date.substring(4, date.length());
		return startDate + "-" + endDate;
	}

	/**
	 * 字符转日期
	 * 
	 * @Title getDateByStr
	 * @Author 肖高翔
	 * @param dateStr
	 * @return Date
	 */
	public static Date getDateByStr(String dateStr) {
		SimpleDateFormat formatter = null;
		if (dateStr == null) {
			return null;
		} else if (dateStr.length() == 10) {
			formatter = new SimpleDateFormat("yyyy-MM-dd");
		} else if (dateStr.length() == 16) {
			formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		} else if (dateStr.length() == 19) {
			formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		} else if (dateStr.length() > 19) {
			dateStr = dateStr.substring(0, 19);
			formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		} else {
			return null;
		}
		try {
			return formatter.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 根据传入的数字，输出相比现在days天的数据
	 * 
	 * @Title getDate
	 * @Author 肖高翔
	 * @param days
	 * @return Date
	 */
	public static Date getDate(int days) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, days);
		return calendar.getTime();
	}

	/**
	 * 日期最大时间
	 * 
	 * @Title getMaxTime
	 * @Author 肖高翔
	 * @param dt
	 * @return Date
	 */
	public static Date getMaxTime(Date dt) {

		Date dt1 = null;
		Calendar ca = Calendar.getInstance();
		ca.setTime(dt);
		ca.add(Calendar.DAY_OF_MONTH, 1);
		dt1 = ca.getTime();
		dt1 = DateUtils.getMinTime(dt1);
		ca.setTime(dt1);
		ca.add(Calendar.SECOND, -1);
		dt1 = ca.getTime();
		return dt1;
	}

	/**
	 * 日期最小时间
	 * 
	 * @Title getMinTime
	 * @Author 肖高翔
	 * @param dt
	 * @return Date
	 */
	public static Date getMinTime(Date dt) {
		Date dt1 = null;
		dt1 = DateUtils.getDateByStr(DateUtils.formatDate(dt, "yyyy-MM-dd"));
		return dt1;
	}

	/**
	 * 月的最后一天
	 * 
	 * @Title getLastDayOfMonth
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	@SuppressWarnings("deprecation")
	public static Date getLastDayOfMonth(Date date) {
		Calendar cDay1 = Calendar.getInstance();
		cDay1.setTime(date);
		int lastDay = cDay1.getActualMaximum(Calendar.DAY_OF_MONTH);
		Date lastDate = cDay1.getTime();
		lastDate.setDate(lastDay);
		return lastDate;
	}

	/**
	 * 月的第一天
	 * 
	 * @Title getFirstDayOfMonth
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date getFirstDayOfMonth(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DATE));
		return calendar.getTime();
	}

	/**
	 * 上月第一天
	 * 
	 * @Title getPreviousMonthFirstDay
	 * @Author 肖高翔
	 * @return Date
	 */
	public static Date getPreviousMonthFirstDay() {
		Calendar lastDate = Calendar.getInstance();
		// 设为当前月的1号
		lastDate.set(Calendar.DATE, 1);
		// 减一个月，变为下月的1号
		lastDate.add(Calendar.MONTH, -1);
		return getMinTime(lastDate.getTime());
	}

	/**
	 * 上月最后一天
	 * 
	 * @Title getPreviousMonthLastDay
	 * @Author 肖高翔
	 * @return Date
	 */
	public static Date getPreviousMonthLastDay() {
		Calendar lastDate = Calendar.getInstance();
		// 设为当前月的1号
		lastDate.set(Calendar.DATE, 1);
		lastDate.add(Calendar.DATE, -1);
		return getMinTime(lastDate.getTime());
	}

	/**
	 * 两个日期相关天数
	 * 
	 * @Title getDateDiff
	 * @Author 肖高翔
	 * @param startDate
	 * @param endDate
	 * @return long
	 */
	public static long getDateDiff(String startDate, String endDate) {
		long diff = 0;
		try {
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(startDate);
			Date date2 = new SimpleDateFormat("yyyy-MM-dd").parse(endDate);
			diff = (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000) > 0 ? (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000)
					: (date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return diff;
	}

	/**
	 * 两个日期相关天数
	 * 
	 * @Title getDateDiff
	 * @Author 肖高翔
	 * @param date1
	 * @param date2
	 * @return long
	 */
	public static long getDateDiff(Date date1, Date date2) {
		if (null == date1 || null == date2) {
			return 0L;
		}
		long diff = (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000) > 0 ? (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000)
				: (date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000);
		return diff;
	}

	/**
	 * 判断两个时间是不是在一个周中
	 * 
	 * @Title isSameWeekWithToday
	 * @Author 肖高翔
	 * @param date
	 * @return boolean
	 */
	public static boolean isSameWeekWithToday(Date date) {

		if (date == null) {
			return false;
		}

		// 0.先把Date类型的对象转换Calendar类型的对象
		Calendar todayCal = Calendar.getInstance();
		Calendar dateCal = Calendar.getInstance();

		todayCal.setTime(new Date());
		dateCal.setTime(date);
		int subYear = todayCal.get(Calendar.YEAR) - dateCal.get(Calendar.YEAR);
		// subYear==0,说明是同一年
		if (subYear == 0) {
			if (todayCal.get(Calendar.WEEK_OF_YEAR) == dateCal.get(Calendar.WEEK_OF_YEAR))
				return true;
		} else if (subYear == 1 && dateCal.get(Calendar.MONTH) == 11 && todayCal.get(Calendar.MONTH) == 0) {
			if (todayCal.get(Calendar.WEEK_OF_YEAR) == dateCal.get(Calendar.WEEK_OF_YEAR))
				return true;
		} else if (subYear == -1 && todayCal.get(Calendar.MONTH) == 11 && dateCal.get(Calendar.MONTH) == 0) {
			if (todayCal.get(Calendar.WEEK_OF_YEAR) == dateCal.get(Calendar.WEEK_OF_YEAR))
				return true;
		}
		return false;
	}

	/**
	 * 将指定日期转换成指定格式
	 * 
	 * @Title getStrFormTime
	 * @Author 肖高翔
	 * @param form
	 *            格式时间
	 * @param date
	 *            时间
	 * @return String
	 */
	public static String getStrFormTime(String form, Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(form);
		return sdf.format(date);
	}

	/**
	 * 获取几天内日期 return 2014-5-4、2014-5-3
	 * 
	 * @Title getLastDays
	 * @Author 肖高翔
	 * @param countDay
	 * @return List<String>
	 */
	public static List<String> getLastDays(int countDay) {
		List<String> listDate = new ArrayList<String>();
		for (int i = 0; i < countDay; i++) {
			listDate.add(DateUtils.getReqDateyyyyMMdd(DateUtils.getDate(-i)));
		}
		return listDate;
	}

	/**
	 * 对时间进行格式化
	 * 
	 * @Title dateFormat
	 * @Author 肖高翔
	 * @param date
	 * @return Date
	 */
	public static Date dateFormat(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date value = new Date();
		try {
			value = sdf.parse(sdf.format(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return value;
	}

	/**
	 * 传入日期到当前系统日期相差的天数集合信息（包含当前传入日期）
	 * 例如传入日期为2018-05-08，系统日期为2018-05-11，集合中就包含（2018-05-08,2018-05-09,2018-05-10,2018-05-11）
	 * 
	 * @Title dateInterval
	 * @Author 肖高翔
	 * @param date
	 * @return List<Date>
	 */
	public static List<Date> dateIntervalUnion(Date date) {
		List<Date> dateList = new ArrayList<>();
		Calendar tempStart = Calendar.getInstance();
		tempStart.setTime(date);
		Calendar tempEnd = Calendar.getInstance();
		tempEnd.setTime(new Date());
		while (tempStart.before(tempEnd)) {
			dateList.add(tempStart.getTime());
			tempStart.add(Calendar.DAY_OF_YEAR, 1);
		}
		return dateList;
	}

	/**
	 * 传入日期到当前系统日期相差的天数集合信息（不包含当前传入日期）
	 * 例如传入日期为2018-05-08，系统日期为2018-05-11，集合中就包含（2018-05-09,2018-05-09,2018-05-10,2018-05-11）
	 * 
	 * @Title dateInterval
	 * @Author 肖高翔
	 * @param date
	 * @return List<Date>
	 */
	public static List<Date> dateInterval(Date date) {
		List<Date> dateList = new ArrayList<>();
		Calendar tempStart = Calendar.getInstance();
		tempStart.setTime(date);
		tempStart.add(Calendar.DAY_OF_YEAR, 1);
		Calendar tempEnd = Calendar.getInstance();
		tempEnd.setTime(new Date());
		while (tempStart.before(tempEnd)) {
			dateList.add(tempStart.getTime());
			tempStart.add(Calendar.DAY_OF_YEAR, 1);
		}
		return dateList;
	}

	/***
	 * 日期月份减一个月
	 * 
	 * @param datetime
	 *            日期(2014-11)
	 * @return 2014-10
	 */
	public static String dateSubtract(String datetime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Date date = null;
		try {
			date = sdf.parse(datetime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Calendar cl = Calendar.getInstance();
		cl.setTime(date);
		cl.add(Calendar.MONTH, -1);
		date = cl.getTime();
		return sdf.format(date);
	}

	/***
	 * 日期月份加一个月
	 * 
	 * @param datetime
	 *            日期(2014-11)
	 * @return 2014-10
	 */
	public static String dateAdd(String datetime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Date date = null;
		try {
			date = sdf.parse(datetime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Calendar cl = Calendar.getInstance();
		cl.setTime(date);
		cl.add(Calendar.MONTH, +1);
		date = cl.getTime();
		return sdf.format(date);
	}

	/***
	 * 日期月份加几个月
	 * 
	 * @param datetime
	 *            日期(2014-11)
	 * @return 2014-10
	 */
	public static String dateAdd(String datetime, int i) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Date date = null;
		try {
			date = sdf.parse(datetime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Calendar cl = Calendar.getInstance();
		cl.setTime(date);
		cl.add(Calendar.MONTH, i);
		date = cl.getTime();
		return sdf.format(date);
	}

	/****
	 * 传入具体日期 ，返回具体日期减一个月。
	 * 
	 * @param date
	 *            日期(2014-04-20)
	 * @return 2014-03-20
	 * @throws ParseException
	 */
	public static String subMonth(String date) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt = sdf.parse(date);
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(dt);

		rightNow.add(Calendar.MONTH, -1);
		Date dt1 = rightNow.getTime();
		String reStr = sdf.format(dt1);

		return reStr;
	}

	/**
	 * 传入当前日期，减一个月
	 * 
	 * @Title subShortMonth
	 * @Author xiaogaoxiang
	 * @param date
	 * @return String
	 * @throws ParseException
	 */
	public static String subShortMonth(Date date) throws ParseException {
		String dateStr = getReqDate(date);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Date dt = sdf.parse(dateStr);
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(dt);
		rightNow.add(Calendar.MONTH, 1);
		Date dt1 = rightNow.getTime();
		String reStr = sdf.format(dt1);
		return reStr;
	}

	/**
	 * 比较时间与当前时间距离几个月（绝对值）
	 * 
	 * @Title compareWithNow
	 * @Author 肖高翔
	 * @param dateStr
	 * @return int
	 */
	public static int compareWithAbsTowDate(String dateOne, String dateTwo) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar afferent = Calendar.getInstance();
		Calendar now = Calendar.getInstance();
		try {
			afferent.setTime(sdf.parse(dateOne));
			now.setTime(sdf.parse(dateTwo));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		int year = (now.get(Calendar.YEAR) - afferent.get(Calendar.YEAR)) * 12;
		int month = now.get(Calendar.MONTH) - afferent.get(Calendar.MONTH);
		return Math.abs(year + month);
	}

	/**
	 * 比较时间与当前时间距离几个月（绝对值）
	 * 
	 * @Title compareWithAbsTowDate
	 * @Author 肖高翔
	 * @param dateOne
	 * @param dateTwo
	 * @return int
	 */
	public static int compareWithTowDate(String dateOne, String dateTwo) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar afferent = Calendar.getInstance();
		Calendar now = Calendar.getInstance();
		try {
			afferent.setTime(sdf.parse(dateOne));
			now.setTime(sdf.parse(dateTwo));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		int year = (now.get(Calendar.YEAR) - afferent.get(Calendar.YEAR)) * 12;
		int month = now.get(Calendar.MONTH) - afferent.get(Calendar.MONTH);
		return (year + month);
	}

	/**
	 * 获取当前系统前一天日期
	 * 
	 * @Title getNextDay
	 * @param date
	 * @return
	 * @Author xiaogaoxiang
	 * @return Date
	 */
	public static Date getPrevDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, -1);
		date = calendar.getTime();
		return date;
	}

	/**
	 * 获取当前系统后一天日期
	 * 
	 * @Title getNextDay
	 * @param date
	 * @return
	 * @Author xiaogaoxiang
	 * @return Date
	 */
	public static Date getNextDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, +1);
		date = calendar.getTime();
		return date;
	}

	public static void main(String[] args) throws ParseException {
		// Date date3 = DateUtils.addMinutes(new Date(), 5);
		// System.out.println(date3);
		// System.out.println(new Date().after(DateUtils.addMinute(new Date(),
		// -10)));
		// Date date1 = DateUtils.addMinutes(new Date(), -1);
		// Date date2 = DateUtils.addMinutes(date1, 5);
		// System.out.println(date1);
		// System.out.println(date2);
		// System.out.println(DateUtils.isBetween(new Date(), date1, date2,
		// DateUtils.COMP_MODEL_TIME));
		// Integer a = 1;
		// int b = 1;
		// System.out.println(a == b);
		// System.out.println(getWeekOfYear(new Date()));
		// System.out.println(getMonthOfYear(new Date()));
		// List<Date> dateList =
		// dateIntervalUnion(strToShortDate("2018-05-05"));
		// for (Date date : dateList) {
		// System.out.println(getReqDate(date));
		// }
		// System.out.println(dateSubtract("201809"));
		// System.out.println(dateAdd("201809", 1));
		// String str1 = "2014-12-08 20:20:20";
		// String str2 = "2015-01-08 10:10:10";
		// int res = str1.compareTo(str2);
		// if (res > 0)
		// System.out.println("str1>str2");
		// else if (res == 0)
		// System.out.println("str1=str2");
		// else
		// System.out.println("str1<str2");

		// System.out.println(getCurrentDay());

		// System.out.println(compareWithAbsTowDate("2018-05-13",
		// "2018-01-14"));
		//
		// System.out.println(getVeryShortReqDate());

		// System.out.println(veryShortDateToShortDate("201909"));
		// System.out.println(isInBetweenTimes("2018-08", "2018-08-22",
		// "2018-08-24"));
		// System.out.println(getNextDay(new Date()));
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		// Date date = DateUtils.getPrevDay(new Date());
		// String prevDate = sdf.format(date);
		// System.out.println(prevDate);
		System.out.println(subShortMonth(new Date()));
	}
}