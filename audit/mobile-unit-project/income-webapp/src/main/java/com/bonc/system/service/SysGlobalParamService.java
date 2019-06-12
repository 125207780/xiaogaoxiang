package com.bonc.system.service;

import com.bonc.common.utils.DateUtil;
import com.bonc.common.utils.MD5Util;
import com.bonc.system.dao.entity.SysGlobalParam;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.dao.mapper.SysGlobalParamMapper;
import com.bonc.system.dao.mapper.SysUserMapper;
import com.bonc.system.service.i.SysUserServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
		Boolean bl = this.sysGlobalParamMapper.updateSysGlobalParam(sysGlobalParam);
		return sysGlobalParam;
	}
	
	public Boolean deleteSysGlobalParamByParamName(String paramName) {
		Boolean bl = this.sysGlobalParamMapper.deleteSysGlobalParamByParamName(paramName);
		return bl;
	}

	public Boolean selectCheck(SysGlobalParam sysGlobalParam) {
		Integer i = this.sysGlobalParamMapper.selectCheck(sysGlobalParam);
		if(i > 0) {
			return true;
		}
		return false;
	}
}
