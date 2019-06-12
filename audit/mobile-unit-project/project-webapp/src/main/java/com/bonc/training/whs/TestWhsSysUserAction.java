package com.bonc.training.whs;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.training.whs.TestWhsSysUserService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/testwhssysuser")
public class TestWhsSysUserAction {

	@Resource
	private TestWhsSysUserService testWhsSysUserService;

	/**
	 * 分页查询
	 * 
	 * @param sysUser
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/testwhsselectpagelist")
	@ResponseBody
	public PageJqGrid<SysUser> selectPageList(SysUser sysUser, Integer page, Integer rows) {
		Page<SysUser> pageList = this.testWhsSysUserService.selectPageList(sysUser, page, rows);
		PageJqGrid<SysUser> pageJqGrid = new PageJqGrid<SysUser>(pageList);
		return pageJqGrid;
	}

	/**
	 * 表单弹出
	 * 
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/testwhsshowsysuserform")
	public String testwhsShowSysUserForm(HttpServletRequest request, String id) {
		if (!StringUtils.isBlank(id)) {
			SysUser sysUser = this.testWhsSysUserService.selectSysUserById(id);
			request.setAttribute("vo", sysUser);
		}
		return "pages/jsp/training/whs/testWhsSysUserForm";
	}

	/**
	 * 新增修改
	 * 
	 * @param sysUser
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	@RequestMapping(value = "/testinsertorupdatesysuser")
	@ResponseBody
	public SysUser insertOrUpdateSysuser(SysUser sysUser) throws NoSuchAlgorithmException {
		String userId = sysUser.getUserId();
		if (!StringUtils.isBlank(userId)) {
			sysUser = this.testWhsSysUserService.updateSysUser(sysUser);
		} else {
			sysUser = this.testWhsSysUserService.insertSysUser(sysUser);
		}
		return sysUser;
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/testdeletesysuserbyid")
	@ResponseBody
	public Boolean deleteSysUserById(String id) {
		Boolean bl = this.testWhsSysUserService.deleteSysUserById(id);
		return bl;
	}

	/**
	 * 校验重复
	 * 
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value = "/testcheck")
	@ResponseBody
	public Boolean check(SysUser sysUser) {
		Boolean bl = this.testWhsSysUserService.selectCheck(sysUser);
		return bl;
	}
}