package com.bonc.system.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysCode;
import com.bonc.system.service.SysCodeService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/syscode")
public class SysCodeAction {
	
	@Resource
	private SysCodeService sysCodeService;

	/**
	 * 分页查询
	 * @param sysCode
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/selectpagelist")
	@ResponseBody
	public PageJqGrid<SysCode> selectPageList(SysCode po, Integer page, Integer rows) {
		Page<SysCode> pageList = this.sysCodeService.selectPageList(po, page, rows);
		PageJqGrid<SysCode> pageJqGrid = new PageJqGrid<SysCode>(pageList);
		return pageJqGrid;
	}
	
	/**
	 * 查询树
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/selecttree")
	@ResponseBody
	public List<SysCode> selectTree(String id) {
		List<SysCode> list = this.sysCodeService.selectTree(id);
		return list;
	}
	
	/**
	 * 表单弹出
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/showsyscodeform")
	public String showSysCodeForm(HttpServletRequest request, String id, String parentId) {
		SysCode vo = new SysCode();
		if(!StringUtils.isBlank(id)) {//修改
			vo = this.sysCodeService.selectSysCodeById(id);
			SysCode parent = this.sysCodeService.selectSysCodeById(vo.getParentId());
			vo.setParent(parent);
		} else {//新增
			SysCode parent = this.sysCodeService.selectSysCodeById(parentId);
			vo.setParent(parent);
			if(parent != null) {//只有顶级节点新增才可以编辑codeType，其他所有情况都不可以编辑
				vo.setCodeType(parent.getCodeType());
				vo.setTreeLevel((Integer.valueOf(parent.getTreeLevel()) + 1) + "");
			} else {
				vo.setTreeLevel("1");
			}
		}
		request.setAttribute("vo", vo);
		return "pages/jsp/system/syscode/sysCodeForm";
	}
	
	/**
	 * 新增修改
	 * @param sysCode
	 * @return
	 */
	@RequestMapping(value = "/insertorupdatesyscode")
	@ResponseBody
	public SysCode insertOrUpdateSysMenu(SysCode po) {
		String id = po.getId();
		if(!StringUtils.isBlank(id)) {
			po = this.sysCodeService.updateSysCode(po);
		} else {
			po = this.sysCodeService.insertSysCode(po);
		}
		return po;
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deletesyscodebytreecode")
	@ResponseBody
	public Boolean deleteSysCodeByTreecode(String treeCode) {
		Boolean bl = this.sysCodeService.deleteSysCodeByTreeCode(treeCode);
		return bl;
	}
	
	/**
	 * 校验重复
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value = "/check")
	@ResponseBody
	public Boolean check(SysCode sysCode) {
		Boolean bl = this.sysCodeService.selectCheck(sysCode);
		return bl;
	}
}
