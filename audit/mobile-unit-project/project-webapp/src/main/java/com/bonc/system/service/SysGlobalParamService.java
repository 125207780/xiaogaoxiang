package com.bonc.system.service;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.system.dao.entity.SysGlobalParam;
import com.bonc.system.dao.mapper.SysGlobalParamMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysGlobalParamService {

	@Resource
	private SysGlobalParamMapper sysGlobalParamMapper;

	public Page<SysGlobalParam> selectPageList(SysGlobalParam sysGlobalParam, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysGlobalParam> pageList = (Page<SysGlobalParam>) this.sysGlobalParamMapper.selectList(sysGlobalParam);
		return pageList;
	}

	public SysGlobalParam selectSysGlobalParamByParamName(String paramName) {
		SysGlobalParam sysGlobalParam = this.sysGlobalParamMapper.selectSysGlobalParamByParamName(paramName);
		return sysGlobalParam;
	}

	public SysGlobalParam insertSysGlobalParam(SysGlobalParam sysGlobalParam) throws NoSuchAlgorithmException {
		this.sysGlobalParamMapper.insertSysGlobalParam(sysGlobalParam);
		return sysGlobalParam;
	}

	public SysGlobalParam updateSysGlobalParam(SysGlobalParam sysGlobalParam) {
		this.sysGlobalParamMapper.updateSysGlobalParam(sysGlobalParam);
		return sysGlobalParam;
	}

	public Boolean deleteSysGlobalParamByParamName(String paramName) {
		Boolean bl = this.sysGlobalParamMapper.deleteSysGlobalParamByParamName(paramName);
		return bl;
	}

	public Boolean selectCheck(SysGlobalParam sysGlobalParam) {
		Integer i = this.sysGlobalParamMapper.selectCheck(sysGlobalParam);
		if (i > 0) {
			return true;
		}
		return false;
	}
}
