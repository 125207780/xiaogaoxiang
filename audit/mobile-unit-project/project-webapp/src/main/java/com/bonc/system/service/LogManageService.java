/**
 * 
 */
package com.bonc.system.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bonc.system.bean.Logger;
import com.bonc.system.dao.mapper.LogManageMapper;

/**
 * @author songhao
 *
 */
@Service
public class LogManageService {

	@Autowired
	private LogManageMapper logManageMapper;

	public List<Logger> getLogList(Map<String, String> prmMap) {
		List<Logger> resultMap = logManageMapper.getLogList(prmMap);
		return resultMap;
	}

}
