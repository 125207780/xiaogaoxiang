package com.bonc.system.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.system.dao.entity.SysRoleUser;
import com.bonc.system.service.SysRoleUserService;

@Controller
@RequestMapping(value = "/sysroleuser")
public class SysRoleUserAction {
	
	@Resource
	private SysRoleUserService sysRoleUserService;
	
	/**
	 * 角色菜单树弹出
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/showsysroleuserform")
	public String showsysRoleUserForm(HttpServletRequest request, String userId) {
		String s = this.sysRoleUserService.selectLeftRight(userId);
		request.setAttribute("s", s);
		return "pages/jsp/system/sysroleuser/sysRoleUserForm";
	}
	
	/**
	 * 新增
	 * @param po
	 * @return
	 */
	@RequestMapping(value = "/insertsysroleuser")
	@ResponseBody
	public List<SysRoleUser> insertSysRoleUser(HttpServletRequest request, String userId, String roleIds) {
		List<SysRoleUser> list = this.sysRoleUserService.insert(userId, roleIds);
		return list;
	}
}
