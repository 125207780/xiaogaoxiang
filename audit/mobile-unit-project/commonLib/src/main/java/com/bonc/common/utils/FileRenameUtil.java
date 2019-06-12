package com.bonc.common.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class FileRenameUtil {
	/**
	 * 将传入的文件名修改为MD5时间+文件名
	 * @param fullFileName 全文件名，带后缀，不带路径信息。
	 */
	public static String renameUploadFile(String fullFileName) throws Exception{
	    fullFileName = new SimpleDateFormat("hhmmss").format(new Date())+fullFileName;
        String suffix=fullFileName.substring(fullFileName.lastIndexOf("."));
        int num=suffix.length();
        return MD5Util.getHash(fullFileName.substring(0, fullFileName.length()-num))+suffix;
	}

}
