package com.bonc.common.utils;

/**
 * 各种类型转换工具
 * 
 * @author duyan
 *
 */
public class TypeConvertUtils {

	public static String DbTypeConvert(String typeNum) {
		switch (typeNum) {
		case "1":
			return "oracle";
		case "2":
			return "mysql";
		case "3":
			return "db2";
		case "4":
			return "xcloud";
		case "5":
			return "gp";
		case "6":
			return "hive";
		case "7":
			return "hive2";
		case "8":
			return "sybase";
		case "9":
			return "vertica";
		default:
			return "";
		}
	}

	public static String FtpTypeConvert(String typeNum) {
		switch (typeNum) {
		case "1":
			return "ftp";
		case "2":
			return "sftp";
		default:
			return "";
		}
	}

	public static String FtpClientEncodeConvert(String clientEncodeNum) {
		switch (clientEncodeNum) {
		case "1":
			return "zh";
		case "2":
			return "en";
		default:
			return "";
		}
	}

	public static String FtpClientSystemConvert(String num) {
		switch (num) {
		case "1":
			return "unix";
		case "2":
			return "windows";
		default:
			return "";
		}
	}

	public static String FtpIsActiveConvert(String num) {
		switch (num) {
		case "1":
			return "0";
		case "2":
			return "1";
		default:
			return "";
		}
	}
}
