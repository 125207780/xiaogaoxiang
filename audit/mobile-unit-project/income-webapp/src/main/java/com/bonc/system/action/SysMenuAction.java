package com.bonc.system.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysMenu;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysMenuService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/sysmenu")
public class SysMenuAction {
	
	@Resource
	private SysMenuService sysMenuService;

	/**
	 * 分页查询
	 * @param sysUser
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/selectpagelist")
	@ResponseBody
	public PageJqGrid<SysMenu> selectPageList(SysMenu po, Integer page, Integer rows) {
		Page<SysMenu> pageList = this.sysMenuService.selectPageList(po, page, rows);
		PageJqGrid<SysMenu> pageJqGrid = new PageJqGrid<SysMenu>(pageList);
		return pageJqGrid;
	}
	
	/**
	 * 查询树
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/selecttree")
	@ResponseBody
	public List<SysMenu> selectTree(String roleId) {
		List<SysMenu> list = this.sysMenuService.selectTree(roleId);
		return list;
	}
	
	/**
	 * 查询树，关联角色权限表
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/selectjoinsysrolemenutree")
	@ResponseBody
	public List<SysMenu> selectJoinSysRoleMenuTree(HttpSession session, String roleId) {
		SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		List<SysMenu> list = this.sysMenuService.selectJoinSysRoleMenuTree(sysUser.getLoginSysRoleUser().getRoleId());
		return list;
	}
	
	/**
	 * 表单弹出
	 * @param request
	 * @param menuId
	 * @return
	 */
	@RequestMapping(value = "/showsysmenuform")
	public String showSysMenuForm(HttpServletRequest request, String menuId, String parentId) {
		SysMenu vo = new SysMenu();
		if(!StringUtils.isBlank(menuId)) {//修改
			vo = this.sysMenuService.selectSysMenuById(menuId);//查询要修改的对象
			SysMenu parent = this.sysMenuService.selectSysMenuById(vo.getParentId());//查询父节点
			vo.setParent(parent);
		} else {//新增
			SysMenu parent = this.sysMenuService.selectSysMenuById(parentId);//查询父节点
			vo.setParent(parent);
			if(parent != null) {//如果能查询到父节点则设置要添加的菜单的级别
				vo.setMenuLevel((Integer.valueOf(parent.getMenuLevel()) + 1) + "");
			} else {//没有查询到父节点则默认添加顶级元素
				vo.setMenuLevel("1");
			}
		}
		request.setAttribute("vo", vo);
		return "pages/jsp/system/sysmenu/sysMenuForm";
	}
	
	/**
	 * 新增修改
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value = "/insertorupdatesysmenu")
	@ResponseBody
	public SysMenu insertOrUpdateSysMenu(SysMenu po) {
		String menuId = po.getMenuId();
		if(!StringUtils.isBlank(menuId)) {
			po = this.sysMenuService.updateSysMenu(po);
		} else {
			System.out.println("属性值：----------------------" + po.getMenuAttr());
			po = this.sysMenuService.insertSysMenu(po);
		}
		return po;
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deletesysmenubytreecode")
	@ResponseBody
	public Boolean deleteSysMenuByTreecode(String treeCode) {
		Boolean bl = this.sysMenuService.deleteSysMenuByTreeCode(treeCode);
		return bl;
	}
	
	/**
	 * 新增修改
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value = "/updatestate")
	@ResponseBody
	public SysMenu updateState(String menuId) {
		SysMenu sysMenu = this.sysMenuService.updateState(menuId);
		return sysMenu;
	}
}
