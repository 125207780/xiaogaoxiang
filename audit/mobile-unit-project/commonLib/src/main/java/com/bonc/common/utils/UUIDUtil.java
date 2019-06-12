package com.bonc.common.utils;

import java.util.UUID;

public class UUIDUtil {
	
	/**
	 * 创建32位全大写UUID
	 * @return
	 */
	public static String createUUID() {
		String uuid = UUID.randomUUID().toString().replace("-", "").toUpperCase(); 
		return uuid;
	}
}
