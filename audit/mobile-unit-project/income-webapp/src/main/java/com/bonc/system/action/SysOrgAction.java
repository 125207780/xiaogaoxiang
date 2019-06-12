package com.bonc.system.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/sysorg")
public class SysOrgAction {
	
	@Resource
	private SysOrgService sysOrgService;

	/**
	 * 分页查询
	 * @param sysUser
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/selectpagelist")
	@ResponseBody
	public PageJqGrid<SysOrg> selectPageList(SysOrg sysOrg, Integer page, Integer rows) {
		Page<SysOrg> pageList = this.sysOrgService.selectPageList(sysOrg, page, rows);
		PageJqGrid<SysOrg> pageJqGrid = new PageJqGrid<SysOrg>(pageList);
		return pageJqGrid;
	}
	
	/**
	 * 查询树
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/selecttree")
	@ResponseBody
	public List<SysOrg> selectTree(String orgId) {
		List<SysOrg> list = this.sysOrgService.selectTree(orgId);
		return list;
	}
	
	/**
	 * 表单弹出
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/showsysorgform")
	public String showSysUserForm(HttpServletRequest request, String id, String pid) {
		SysOrg sysOrg = new SysOrg();
		if(!StringUtils.isBlank(id)) {
			sysOrg = this.sysOrgService.selectSysOrgById(id);
			SysOrg parent = this.sysOrgService.selectSysOrgById(sysOrg.getPid());
			sysOrg.setParent(parent);
		} else {
			SysOrg parent = this.sysOrgService.selectSysOrgById(pid);
			sysOrg.setParent(parent);
			if(parent != null) {
				sysOrg.setOrgLevel((Integer.valueOf(parent.getOrgLevel()) + 1) + "");
			} else {
				sysOrg.setOrgLevel("1");
			}
		}
		request.setAttribute("vo", sysOrg);
		return "pages/jsp/system/sysorg/sysOrgForm";
	}
	
	/**
	 * 新增修改
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value = "/insertorupdatesysorg")
	@ResponseBody
	public SysOrg insertOrUpdateSysuser(SysOrg sysOrg) {
		String orgId = sysOrg.getOrgId();
		if(!StringUtils.isBlank(orgId)) {
			sysOrg = this.sysOrgService.updateSysOrg(sysOrg);
		} else {
			sysOrg = this.sysOrgService.insertSysOrg(sysOrg);
		}
		return sysOrg;
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deletesysorgbytreecode")
	@ResponseBody
	public Boolean deleteSysOrgById(String treeCode,String orgId) {
		Boolean bl = this.sysOrgService.deleteSysOrgByTreeCode(treeCode);
		this.sysOrgService.deleteSysUser(orgId);
		return bl;
	}
	
	/**
	 * 机构树弹出
	 * @param sysOrg
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/showsysorgtreewindow")
	public String showSysOrgTreeWindow(SysOrg sysOrg) {
		return "pages/jsp/system/sysorg/sysOrgTreeWindow";
	}
}
