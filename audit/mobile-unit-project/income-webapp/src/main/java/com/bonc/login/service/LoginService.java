package com.bonc.login.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysRoleUser;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.bonc.system.service.SysRoleUserService;
import com.bonc.system.service.SysUserService;

@Service("loginService")
public class LoginService {
	@Resource
	private SysUserService sysUserService;
	// @Autowired
	// private LoginMapper loginDao;
	// @Autowired
	// private CacheManager cacheManager;
	@Resource
	private SysRoleUserService sysRoleUserService;

	@Resource
	private SysOrgService sysOrgService;

	public SysUser doLogin(String loginId) {
		SysUser vo = this.sysUserService.selectListByLogin(loginId);
		if (vo != null) {
			SysOrg sysOrg = sysOrgService.selectSysOrgById(vo.getOrgId());
			vo.setSysOrg(sysOrg);
			List<SysRoleUser> sysRoleUserList = this.sysRoleUserService
					.selectListByUserId(vo.getUserId());
			if (sysRoleUserList.size() == 1) {
				vo.setLoginSysRoleUser(sysRoleUserList.get(0));
			}
			vo.setSysRoleUserList(sysRoleUserList);
		}
		return vo;
	}

}
