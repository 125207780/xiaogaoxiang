package com.bonc.system.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import com.bonc.common.utils.UUIDUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.DateUtil;
import com.bonc.system.dao.entity.SysRole;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.dao.mapper.SysRoleMapper;
import com.bonc.system.service.i.SysUserServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysRoleService {

	@Resource
	private SysRoleMapper sysRoleMapper;
	
	public List<SysRole> selectList(SysRole po) {
		List<SysRole> list = this.sysRoleMapper.selectList(po);
		return list;
	}
	
	public Page<SysRole> selectPageList(SysRole po, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysRole> pageList = (Page<SysRole>) this.sysRoleMapper.selectList(po);
		return pageList;
	}
	
	public SysRole selectSysRoleById(String roleId) {
		SysRole vo = this.sysRoleMapper.selectSysRoleById(roleId);
		return vo;
	}

	public SysRole insertSysRole(SysRole po, SysUser sysUser) {
		po.setRoleId(UUIDUtil.createUUID());
		po.setCreateId(sysUser.getUserId());
		po.setCreateTime(DateUtil.formatDate(new Date().getTime()));
		Boolean bl = this.sysRoleMapper.insertSysRole(po);
		return po;
	}
	
	public SysRole updateSysRole(SysRole po) {
		Boolean bl = this.sysRoleMapper.updateSysRole(po);
		return po;
	}
	
	public Boolean deleteSysRoleById(String roleId) {
		Boolean bl = this.sysRoleMapper.deleteSysRoleById(roleId);
		return bl;
	}

	public Boolean selectCheck(SysRole po) {
		Integer i = this.sysRoleMapper.selectCheck(po);
		if(i > 0) {
			return false;
		}
		return true;
	}
}
