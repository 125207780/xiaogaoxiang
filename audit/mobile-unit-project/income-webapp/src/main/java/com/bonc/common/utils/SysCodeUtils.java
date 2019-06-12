package com.bonc.common.utils;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bonc.system.dao.entity.SysCode;
import com.bonc.system.dao.mapper.SysCodeMapper;

@Component
public class SysCodeUtils {
	
	private static List<SysCode> sysCodeList = new ArrayList<SysCode>();
	
	@Autowired 
	private SysCodeMapper sysCodeMapper;
	
	private static SysCodeUtils sysCodeUtils;
	
	@PostConstruct
	public void init() {
		sysCodeUtils = this;
		sysCodeUtils.sysCodeMapper = this.sysCodeMapper;
	}

	public static String Code2Value(SysCode sc) {
		String value = "";
		if (sysCodeList.size() == 0) {
			sysCodeList = sysCodeUtils.sysCodeMapper.selectList(new SysCode());
		}
		for (SysCode sysCode : sysCodeList) {
			if (StringUtils.equals(sc.getCodeType(), sysCode.getCodeType()) && 
					StringUtils.equals(sc.getCodeKey(), sysCode.getCodeKey())) {
				value = sysCode.getCodeValue();
				break;
			}
		}
		return value;
	}
	
	
}
