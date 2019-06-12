package com.bonc.training.duanhuiyao;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.training.duanhuiyao.TestDhySysUserService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/testdhysysuser")
public class TestDhySysUserAction {

	@Resource
	private TestDhySysUserService testDhySysUserService;

	/**
	 * 分页查询
	 * 
	 * @param sysUser
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/testdhyselectpagelist")
	@ResponseBody
	public PageJqGrid<SysUser> selectPageList(SysUser sysUser, Integer page, Integer rows) {
		Page<SysUser> pageList = this.testDhySysUserService.selectPageList(sysUser, page, rows);
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
	@RequestMapping(value = "/testdhyshowsysuserform")
	public String testDhyShowSysUserForm(HttpServletRequest request, String id) {
		if (!StringUtils.isBlank(id)) {
			SysUser sysUser = this.testDhySysUserService.selectSysUserById(id);
			request.setAttribute("vo", sysUser);
		}
		return "pages/jsp/training/duanhuiyao/testDhySysUserForm";
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
			sysUser = this.testDhySysUserService.updateSysUser(sysUser);
		} else {
			sysUser = this.testDhySysUserService.insertSysUser(sysUser);
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
		Boolean bl = this.testDhySysUserService.deleteSysUserById(id);
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
		Boolean bl = this.testDhySysUserService.selectCheck(sysUser);
		return bl;
	}
}
