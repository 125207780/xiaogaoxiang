package com.bonc.system.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bonc.system.dao.entity.SysCode;

public class SysCodeUtils {

	public static final String SEX = "sex";// 性别
	public static final String YES_NO = "yesno";// 是否
	public static final String QI_JIN = "qiJin";// 启用禁用
	public static final String SHOW_FORMAT = "showFormat";// 显示格式
	public static final String IS_CODE = "isCode";// 显示省份

	public static Map<String, SysCode> SYS_CODE_MAP = new HashMap<String, SysCode>();// 字典map
	public static List<SysCode> SYS_CODE_LIST_TREE = new ArrayList<SysCode>();// 字典treeList

	public static List<SysCode> getSysCodeList(String codeType) {
		List<SysCode> list = SysCodeUtils.SYS_CODE_LIST_TREE;
		for (SysCode sysCode : list) {
			if (sysCode.getCodeType().equals(codeType)) {
				return sysCode.getChildren();
			}
		}
		return new ArrayList<SysCode>();
	}

	public static String getSysCodeValue(String codeType, String codeKey) {
		String key = codeType + "_" + codeKey;
		SysCode sysCode = SYS_CODE_MAP.get(key);
		if (sysCode == null) {
			return null;
		}
		return sysCode.getCodeValue();
	}
}
