package com.bonc.system.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysRole;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysRoleService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/sysrole")
public class SysRoleAction {

	@Resource
	private SysRoleService sysRoleService;

	/**
	 * 分页查询
	 * 
	 * @param po
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/selectpagelist")
	@ResponseBody
	public PageJqGrid<SysRole> selectPageList(SysRole po, Integer page, Integer rows) {
		Page<SysRole> pageList = this.sysRoleService.selectPageList(po, page, rows);
		PageJqGrid<SysRole> pageJqGrid = new PageJqGrid<SysRole>(pageList);
		return pageJqGrid;
	}

	/**
	 * 表单弹出
	 * 
	 * @param request
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/showsysroleform")
	public String showSysUserForm(HttpServletRequest request, String roleId) {
		if (!StringUtils.isBlank(roleId)) {
			SysRole vo = this.sysRoleService.selectSysRoleById(roleId);
			request.setAttribute("vo", vo);
		}
		return "pages/jsp/system/sysrole/sysRoleForm";
	}

	/**
	 * 新增修改
	 * 
	 * @param po
	 * @return
	 */
	@RequestMapping(value = "/insertorupdatesysrole")
	@ResponseBody
	public SysRole insertOrUpdateSysuser(HttpServletRequest request, SysRole po) {
		SysUser sysUser = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
		String roleId = po.getRoleId();
		if (!StringUtils.isBlank(roleId)) {
			po = this.sysRoleService.updateSysRole(po);
		} else {
			po = this.sysRoleService.insertSysRole(po, sysUser);
		}
		return po;
	}

	/**
	 * 校验重复
	 * 
	 * @param po
	 * @return
	 */
	@RequestMapping(value = "/check")
	@ResponseBody
	public Boolean check(SysRole po) {
		Boolean bl = this.sysRoleService.selectCheck(po);
		return bl;
	}

	/**
	 * 删除
	 * 
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/deletesysrolebyid")
	@ResponseBody
	public Boolean deleteSysUserById(String roleId) {
		Boolean bl = this.sysRoleService.deleteSysRoleById(roleId);
		return bl;
	}
}