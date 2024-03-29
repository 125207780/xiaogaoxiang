package com.bonc.training.duanhuiyao;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

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
public class TestDhySysUserService implements SysUserServiceI {

	@Resource
	private TestDhySysUserMapper testDhySysUserMapper;

	public SysUser selectListByLogin(String loginId) {
		SysUser po = new SysUser();
		po.setLoginId(loginId);
		List<SysUser> list = this.testDhySysUserMapper.selectList(po);
		if (list.size() == 1) {
			return list.get(0);
		}
		return null;
	}

	public Page<SysUser> selectPageList(SysUser sysUser, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysUser> pageList = (Page<SysUser>) this.testDhySysUserMapper.selectList(sysUser);
		return pageList;
	}

	public SysUser selectSysUserById(String id) {
		SysUser sysUser = this.testDhySysUserMapper.selectSysUserById(id);
		return sysUser;
	}

	public SysUser insertSysUser(SysUser sysUser) throws NoSuchAlgorithmException {
		sysUser.setUserId(UUIDUtil.createUUID());
		sysUser.setCreateTime(DateUtil.formatDate(new Date().getTime()));
		sysUser.setPassword(MD5Util.getHash(sysUser.getPassword()).toLowerCase());
		this.testDhySysUserMapper.insertSysUser(sysUser);
		return sysUser;
	}

	public SysUser updateSysUser(SysUser sysUser) {
		this.testDhySysUserMapper.updateSysUser(sysUser);
		return sysUser;
	}

	public Boolean deleteSysUserById(String id) {
		Boolean bl = this.testDhySysUserMapper.deleteSysUserById(id);
		return bl;
	}

	public Boolean selectCheck(SysUser sysUser) {
		Integer i = this.testDhySysUserMapper.selectCheck(sysUser);
		if (i > 0) {
			return false;
		}
		return true;
	}
}
