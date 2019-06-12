package com.bonc.login.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.map.service.FirstPageThreeService;
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
	private FirstPageThreeService firstPageThreeService;

	@Resource
	private SysOrgService sysOrgService;

	@ArchivesLog(actionName = "【操作类：LoginService】", option = "【方法名：doLogin，作用：登录系统】")
	public SysUser doLogin(String loginId) {
		SysUser vo = this.sysUserService.selectListByLogin(loginId);
		if (vo != null) {
			SysOrg sysOrg = sysOrgService.selectSysOrgById(vo.getOrgId());
			// 当选择的是地市
			// Map<String, Object> orgIdMap1 =
			// firstPageThreeService.getCityCode("19247");
			// String a=orgIdMap1.get("OLD_ORG_ID").toString();
			// if (sysOrg.getOrgLevel().equals("2")) {
			// // 将地市编码5位转为3位
			// Map<String, Object> orgIdMap =
			// firstPageThreeService.getCityCode(sysOrg.getOrgId());
			// sysOrg.setOrgId(orgIdMap.get("OLD_ORG_ID").toString());
			// vo.setOrgId(orgIdMap.get("OLD_ORG_ID").toString());
			// }

			vo.setSysOrg(sysOrg);
			List<SysRoleUser> sysRoleUserList = this.sysRoleUserService.selectListByUserId(vo.getUserId());
			if (sysRoleUserList.size() == 1) {
				vo.setLoginSysRoleUser(sysRoleUserList.get(0));
			}
			vo.setSysRoleUserList(sysRoleUserList);
		}
		return vo;
	}

	/**
	 * 根据OaId查询用户信息
	 * 
	 * @param oaId
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：LoginService】", option = "【方法名：doLoginByOaId，作用：根据OaId查询用户信息】")
	public List<SysUser> doLoginByOaId(String oaId) {
		// 根据OaId查询用户信息，可能存在多条，因此用集合查询
		List<SysUser> vo = this.sysUserService.selectListByLoginOaId(oaId);
		if (null != vo && vo.size() > 0) {
			SysOrg sysOrg = null;
			List<SysRoleUser> sysRoleUserList = null;
			for (SysUser su : vo) {
				sysOrg = sysOrgService.selectSysOrgById(su.getOrgId());
				su.setSysOrg(sysOrg);
				sysRoleUserList = this.sysRoleUserService.selectListByUserId(su.getUserId());
				if (sysRoleUserList.size() == 1) {
					su.setLoginSysRoleUser(sysRoleUserList.get(0));
				}
				su.setSysRoleUserList(sysRoleUserList);
			}
		}
		return vo;
	}
}
