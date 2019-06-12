package com.bonc.training.ccq;

import java.security.NoSuchAlgorithmException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/testccqsysuser")
public class TestCcqSysUserAction {

	@Resource
	private TestCcqSysUserService testCcqSysUserService;

	/**
	 * 分页查询
	 * 
	 * @param sysUser
	 * @param searchInfo
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/testccqselectpagelist")
	@ResponseBody
	public PageJqGrid<SysUser> selectPageList(SysUser sysUser, String searchInfo, Integer page, Integer rows) {
		Page<SysUser> pageList = this.testCcqSysUserService.selectPageList(sysUser, page, rows);
		PageJqGrid<SysUser> pageJqGrid = new PageJqGrid<SysUser>(pageList);
		return pageJqGrid;
	}

	/**
	 * 判断是否存在用户并弹出编辑窗口
	 * 
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/testccqshowsysuserform")
	public String testCcqShowSysUserForm(HttpServletRequest request, String id) {
		if (!StringUtils.isBlank(id)) {
			SysUser sysUser = this.testCcqSysUserService.selectSysUserById(id);
			request.setAttribute("vo", sysUser);
		}
		return "pages/jsp/training/ccq/testCcqSysUserForm";
	}

	/**
	 * 进行新增或修改操作
	 * 
	 * @param sysUser
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	@RequestMapping(value = "/testinsertorupdatesysuser")
	@ResponseBody
	public SysUser insertOrUpdateSysuser(SysUser sysUser) throws NoSuchAlgorithmException {
		String userId = sysUser.getUserId();
		// 根据是否已经有用户id来判断是新增还是更新用户信息
		if (!StringUtils.isBlank(userId)) {
			sysUser = this.testCcqSysUserService.updateSysUser(sysUser);
		} else {
			sysUser = this.testCcqSysUserService.insertSysUser(sysUser);
		}
		return sysUser;
	}

	/**
	 * 根据id删除用户
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/testdeletesysuserbyid")
	@ResponseBody
	public Boolean deleteSysUserById(String id) {
		Boolean bl = this.testCcqSysUserService.deleteSysUserById(id);
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
		Boolean bl = this.testCcqSysUserService.selectCheck(sysUser);
		return bl;
	}
}
