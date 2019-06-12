package com.bonc.system.service;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.utils.DateUtil;
import com.bonc.common.utils.MD5Util;
import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.dao.mapper.SysUserMapper;
import com.bonc.system.service.i.SysUserServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysUserService implements SysUserServiceI {

	@Resource
	private SysUserMapper sysUserMapper;

	@ArchivesLog(actionName = "【操作类：SysUserService】", option = "【方法名：selectListByLogin，作用：通过用户ID查询用户信息】")
	public SysUser selectListByLogin(String loginId) {
		SysUser po = new SysUser();
		po.setLoginId(loginId);
		List<SysUser> list = this.sysUserMapper.selectList(po);
		if (list.size() == 1) {
			return list.get(0);
		}
		return null;
	}

	/**
	 * 根据OaId查询用户集合信息
	 * 
	 * @param oaId
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：SysUserService】", option = "【方法名：selectListByLoginOaId，作用：根据OaId查询用户集合信息】")
	public List<SysUser> selectListByLoginOaId(String oaId) {
		SysUser po = new SysUser();
		po.setOaId(oaId);
		List<SysUser> list = this.sysUserMapper.selectListByOaId(po);
		return list;
	}

	public Page<SysUser> selectPageList(SysUser sysUser, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysUser> pageList = (Page<SysUser>) this.sysUserMapper.selectList(sysUser);
		return pageList;
	}

	public SysUser selectSysUserById(String id) {
		SysUser sysUser = this.sysUserMapper.selectSysUserById(id);
		return sysUser;
	}

	public SysUser insertSysUser(SysUser sysUser) throws NoSuchAlgorithmException {
		sysUser.setUserId(UUIDUtil.createUUID());
		sysUser.setCreateTime(DateUtil.formatDate(new Date().getTime()));
		sysUser.setPassword(MD5Util.getHash(sysUser.getPassword()).toLowerCase());
		this.sysUserMapper.insertSysUser(sysUser);
		return sysUser;
	}

	public SysUser updateSysUser(SysUser sysUser) {
		this.sysUserMapper.updateSysUser(sysUser);
		return sysUser;
	}

	public Boolean deleteSysUserById(String id) {
		Boolean bl = this.sysUserMapper.deleteSysUserById(id);
		return bl;
	}

	public Boolean selectCheck(SysUser sysUser) {
		Integer i = this.sysUserMapper.selectCheck(sysUser);
		if (i > 0) {
			return false;
		}
		return true;
	}

	/**
	 * 查询所有用户信息
	 * 
	 * @Title selectAllSysUser
	 * @Author xiaogaoxiang
	 * @return List<SysUser>
	 */
	public List<SysUser> selectAllSysUser() {
		return sysUserMapper.selectAllSysUser();
	}

	/**
	 * 根据网格编码，查询系统用户信息
	 * 
	 * @Title selectSysUserByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return SysUser
	 */
	public SysUser selectSysUserByOrgId(String orgId) {
		return sysUserMapper.selectSysUserByOrgId(orgId);
	}

	/**
	 * 更新SysUser信息，条件用orgId和userLevel=4
	 * 
	 * @Title updateSysUserByOrgIdAndUserLevel
	 * @Author xiaogaoxiang
	 * @param sysUser
	 *            void
	 */
	public void updateSysUserByOrgIdAndUserLevel(SysUser sysUser) {
		sysUserMapper.updateSysUserByOrgIdAndUserLevel(sysUser);
	}

}
