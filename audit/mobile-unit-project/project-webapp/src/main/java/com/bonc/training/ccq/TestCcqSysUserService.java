package com.bonc.training.ccq;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.DateUtil;
import com.bonc.common.utils.MD5Util;
import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.i.SysUserServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class TestCcqSysUserService implements SysUserServiceI {

	@Resource
	private TestCcqSysUserMapper testCcqSysUserMapper;

	// 查询用户列表
	public Page<SysUser> selectPageList(SysUser sysUser, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysUser> pageList = (Page<SysUser>) this.testCcqSysUserMapper.selectList(sysUser);
		return pageList;
	}

	// 通过user_id查询用户信息
	public SysUser selectSysUserById(String id) {
		SysUser sysUser = this.testCcqSysUserMapper.selectSysUserById(id);
		return sysUser;
	}

	// 插入用户信息并对密码进行MD5加密
	public SysUser insertSysUser(SysUser sysUser) throws NoSuchAlgorithmException {
		sysUser.setUserId(UUIDUtil.createUUID());
		sysUser.setCreateTime(DateUtil.formatDate(new Date().getTime()));
		sysUser.setPassword(MD5Util.getHash(sysUser.getPassword()).toLowerCase());
		this.testCcqSysUserMapper.insertSysUser(sysUser);
		return sysUser;
	}

	// 更新用户信息
	public SysUser updateSysUser(SysUser sysUser) {
		this.testCcqSysUserMapper.updateSysUser(sysUser);
		return sysUser;
	}

	// 删除用户信息
	public Boolean deleteSysUserById(String id) {
		Boolean bl = this.testCcqSysUserMapper.deleteSysUserById(id);
		return bl;
	}

	// 判断添加的信息是否已经存在
	public Boolean selectCheck(SysUser sysUser) {
		Integer i = this.testCcqSysUserMapper.selectCheck(sysUser);
		if (i > 0) {
			return false;
		}
		return true;
	}
}
