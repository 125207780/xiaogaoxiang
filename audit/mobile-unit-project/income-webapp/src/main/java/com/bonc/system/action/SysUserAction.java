package com.bonc.system.action;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysUserService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/sysuser")
public class SysUserAction {
	
	@Resource
	private SysUserService sysUserService;

	/**
	 * 分页查询
	 * @param sysUser
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/selectpagelist")
	@ResponseBody
	public PageJqGrid<SysUser> selectPageList(SysUser sysUser, Integer page, Integer rows) {
		Page<SysUser> pageList = this.sysUserService.selectPageList(sysUser, page, rows);
		PageJqGrid<SysUser> pageJqGrid = new PageJqGrid<SysUser>(pageList);
		return pageJqGrid;
	}
	
	/**
	 * 表单弹出
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/showsysuserform")
	public String showSysUserForm(HttpServletRequest request, String id) {
		if(!StringUtils.isBlank(id)) {
			SysUser sysUser = this.sysUserService.selectSysUserById(id);
			request.setAttribute("vo", sysUser);
		}
		return "pages/jsp/system/sysuser/sysUserForm";
	}
	
	/**
	 * 新增修改
	 * @param sysUser
	 * @return
	 * @throws NoSuchAlgorithmException 
	 */
	@RequestMapping(value = "/insertorupdatesysuser")
	@ResponseBody
	public SysUser insertOrUpdateSysuser(SysUser sysUser) throws NoSuchAlgorithmException {
		String userId = sysUser.getUserId();
		if(!StringUtils.isBlank(userId)) {
			sysUser = this.sysUserService.updateSysUser(sysUser);
		} else {
			sysUser = this.sysUserService.insertSysUser(sysUser);
		}
		return sysUser;
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deletesysuserbyid")
	@ResponseBody
	public Boolean deleteSysUserById(String id) {
		Boolean bl = this.sysUserService.deleteSysUserById(id);
		return bl;
	}
	
	/**
	 * 校验重复
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value = "/check")
	@ResponseBody
	public Boolean check(SysUser sysUser) {
		Boolean bl = this.sysUserService.selectCheck(sysUser);
		return bl;
	}
}