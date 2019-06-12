package com.bonc.system.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.system.dao.entity.SysRoleMenu;
import com.bonc.system.service.SysRoleMenuService;

@Controller
@RequestMapping(value = "/sysrolemenu")
public class SysRoleMenuAction {
	
	@Resource
	private SysRoleMenuService sysRoleMenuService;
	
	/**
	 * 新增修改
	 * @param po
	 * @return
	 */
	@RequestMapping(value = "/insertsysrolemenu")
	@ResponseBody
	public List<SysRoleMenu> insertOrUpdateSysuser(HttpServletRequest request, String roleId, String s) {
		List<SysRoleMenu> list = this.sysRoleMenuService.insert(roleId, s);
		return list;
	}
	
	/**
	 * 角色菜单树弹出
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/showsysrolemenutreewindow")
	public String showSysMenuTreeWindow(HttpServletRequest request, String roleId) {
		request.setAttribute("roleId", roleId);
		return "pages/jsp/system/sysrolemenu/sysRoleMenuTreeWindow";
	}
}