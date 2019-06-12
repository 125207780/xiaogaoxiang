package com.bonc.training.dhy;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/dhyedusysuser")
public class DhyEduAction {

	@Resource
	private DhyEduService dhyEduService;

	/**
	 * 分页查询
	 * 
	 * @param sysUser
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/dhyeduselectpagelist")
	@ResponseBody
	public PageJqGrid<DhyEduUser> dhyEduSelectPageList(DhyEduUser eduer, Integer page, Integer rows) {
		Page<DhyEduUser> pageList = this.dhyEduService.dhyeduselectPageList(eduer, page, rows);
		PageJqGrid<DhyEduUser> pageJqGrid = new PageJqGrid<DhyEduUser>(pageList);
		return pageJqGrid;
	}

	/**
	 * 表单弹出
	 * 
	 * @param request
	 * @param id
	 * @return
	 */
	/*
	 * @RequestMapping(value = "/dhyedushowsysuserform") public String
	 * testDhyShowSysUserForm(HttpServletRequest request, String id) {
	 * if(!StringUtils.isBlank(id)) { DhyEduUser eduer =
	 * this.dhyEduService.selectEduerById(id); request.setAttribute("vo",
	 * eduer); } return "pages/jsp/training/dhy/dhyEduUserForm"; }
	 */
	/**
	 * 新增修改
	 * 
	 * @param sysUser
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	/*
	 * @RequestMapping(value = "/dhyeduinsertorupdatesysuser")
	 * 
	 * @ResponseBody public DhyEduUser dhyEduInsertOrUpdateSysuser(DhyEduUser
	 * eduer) throws NoSuchAlgorithmException { String eduerId =
	 * eduer.getEduerId(); if(!StringUtils.isBlank(eduerId)) { eduer =
	 * this.dhyEduService.updateEduer(eduer); } else { eduer =
	 * this.dhyEduService.dhyEduInsertEduer(eduer); } return eduer; }
	 */
	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	/*
	 * @RequestMapping(value = "/dhyedudeletesysuserbyid")
	 * 
	 * @ResponseBody public Boolean deleteEduerById(String id) { Boolean bl =
	 * this.dhyEduService.deleteEduerById(id); return bl; }
	 */
	/**
	 * 校验重复
	 * 
	 * @param sysUser
	 * @return
	 */
	/*
	 * @RequestMapping(value = "/dhyeducheck")
	 * 
	 * @ResponseBody public Boolean check(DhyEduUser eduer) { Boolean bl =
	 * this.dhyEduService.selectCheck(eduer); return bl; }
	 */
}
