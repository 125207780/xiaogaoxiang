package com.bonc.system.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.utils.UUIDUtil;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.system.dao.entity.SysMenu;
import com.bonc.system.dao.entity.SysMenuOperation;
import com.bonc.system.dao.entity.SysRoleMenu;
import com.bonc.system.dao.mapper.SysMenuMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysMenuService {

	@Resource
	private SysMenuMapper sysMenuMapper;
	@Resource
	private SysMenuOperationService sysMenuOperationService;
	@Resource
	private SysRoleMenuService sysRoleMenuService;
	
	/**
	 * 分页查询
	 * @param po
	 * @param page
	 * @param row
	 * @return
	 */
	public Page<SysMenu> selectPageList(SysMenu po, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysMenu> pageList = (Page<SysMenu>) this.sysMenuMapper.selectList(po);
		return pageList;
	}
	
	/**
	 * 查询，并且对查询结果进行对应的操作权限查询，然后对菜单和操作权限进行checked赋值
	 * @param po
	 * @param sysRoleMenuList
	 * @return
	 */
	public List<SysMenu> selectList(SysMenu po, List<SysRoleMenu> sysRoleMenuList) {
		List<SysMenu> list = this.sysMenuMapper.selectList(po);//查询菜单
		for (SysMenu sysMenu : list) {//循环菜单
			SysRoleMenu sysRoleMenu = null;//菜单对应的角色权限
			for (SysRoleMenu sysRoleMenuTemp : sysRoleMenuList) {//循环传过来的角色权限
				if(sysMenu.getMenuId().equals(sysRoleMenuTemp.getMenuId())) {//判断菜单是否在角色权限集合中
					sysRoleMenu = sysRoleMenuTemp;//赋值
					sysRoleMenuList.remove(sysRoleMenuTemp);//移除该角色权限，这样下次就少循环一次
					break;
				}
			}
			List<SysMenuOperation> sysMenuOperationList = this.sysMenuOperationService.selectListByMenuId(sysMenu.getMenuId());//查询菜单对应的操作权限
			if(sysRoleMenu != null ) {//菜单对应的角色权限不为空
				sysMenu.setChecked(true);//设置菜单为被选中
				if(!StringUtils.isBlank(sysRoleMenu.getOperations())) {//如果角色权限有操作权限
					for (SysMenuOperation sysMenuOperation : sysMenuOperationList) {//循环该菜单对应的操作权限
						if(sysRoleMenu.getOperations().contains(sysMenuOperation.getOperationCode() + "#")) {//判断角色权限中操作权限是否包含对应的操作权限
							sysMenuOperation.setChecked(true);//包含则将该操作权限设置为选中
						}
					}
				}
			}
			sysMenu.setSysMenuOperationList(sysMenuOperationList);//set菜单的操作权限
		}
		return list;
	}
	
	/**
	 * 根据id查询
	 * @param menuId
	 * @return
	 */
	public SysMenu selectSysMenuById(String menuId) {
		SysMenu SysMenu = this.sysMenuMapper.selectSysMenuById(menuId);
		return SysMenu;
	}

	/**
	 * 新增
	 * @param po
	 * @return
	 */
	public SysMenu insertSysMenu(SysMenu po) {
		String menuId = UUIDUtil.createUUID();
		po.setMenuId(menuId);
		po.setState("1");//状态默认1启用
		if(StringUtils.isBlank(po.getParentId())) {
			po.setTreeCode("/" + menuId);
		} else {
			SysMenu parent = this.selectSysMenuById(po.getParentId());
			po.setTreeCode(parent.getTreeCode() + "/" + menuId);
		}
		Boolean bl = this.sysMenuMapper.insertSysMenu(po);
		return po;
	}
	
	/**
	 * 修改状态
	 * @param menuId
	 * @return
	 */
	public SysMenu updateState(String menuId) {
		SysMenu sysMenu = this.selectSysMenuById(menuId);
		if("1".equals(sysMenu.getState())) {
			sysMenu.setState("-1");
		} else {
			sysMenu.setState("1");
		}
		this.sysMenuMapper.updateSysMenu(sysMenu);
		return sysMenu;
	}
	
	/**
	 * 修改
	 * @param po
	 * @return
	 */
	public SysMenu updateSysMenu(SysMenu po) {
		Boolean bl = this.sysMenuMapper.updateSysMenu(po);
		return po;
	}
	
	/**
	 * 删除
	 * @param treeCode
	 * @return
	 */
	public Boolean deleteSysMenuByTreeCode(String treeCode) {
		Boolean bl = this.sysMenuMapper.deleteSysMenuByTreeCode(treeCode);
		return bl;
	}
	
	/**
	 * 查询菜单树
	 * @param roleId
	 * @return
	 */
	public List<SysMenu> selectTree(String roleId) {
		List<SysRoleMenu> sysRoleMenuList = this.sysRoleMenuService.selectListByRoleId(roleId);//查询对应的角色权限，用于判断菜单和菜单对应的操作权限checked是否被选中
		SysMenu po = new SysMenu();//查询对象
		po.setMenuLevel("1");//设置查询级别
		List<SysMenu> list = this.selectList(po, sysRoleMenuList);//查询菜单
		for (SysMenu temp : list) {
			this.selectTreeChildren(temp, sysRoleMenuList);//递归查询子菜单
		}
		return list;
	}
	private void selectTreeChildren(SysMenu po, List<SysRoleMenu> sysRoleMenuList) {
		SysMenu parent = new SysMenu();//查询对象
		parent.setParentId(po.getMenuId());//设置父节点
		List<SysMenu> list = this.selectList(parent, sysRoleMenuList);//查询子菜单
		if(list.size() == 0) {//没有子菜单则跳出
			return;
		} else {//有子菜单
			po.setChildren(list);//set子菜单
			for (SysMenu temp : list) {
				this.selectTreeChildren(temp, sysRoleMenuList);//继续递归查询子菜单
			}
		}
	}
	
	/**
	 * 查询菜单树，与角色权限表关联
	 * @param roleId
	 * @return
	 */
	@ArchivesLog(actionName = "【操作类：SysMenuService】", option = "【方法名：selectJoinSysRoleMenuTree，作用：查询菜单树，与角色权限表关联】")
	public List<SysMenu> selectJoinSysRoleMenuTree(String roleId) {
		SysMenu po = new SysMenu();//查询对象
		po.setRoleId(roleId);//设置角色id
//		po.setMenuLevel("1");//设置查询级别
		po.setState("1");
		List<SysMenu> list = this.sysMenuMapper.selectJoinSysRoleMenuList(po);
		List<SysMenu> pareList=new ArrayList<SysMenu>();
		for (SysMenu temp : list) {
			if(temp.getMenuLevel().equals("1")){
				selectTreeChildren0(temp,list);
				pareList.add(temp);
			}
			
		}
		return pareList;
	}
	private void selectTreeChildren0(SysMenu po,List<SysMenu> list) {
		
		List<SysMenu> chiList = new ArrayList<SysMenu>();
		for (SysMenu temp : list) {
			if(StringUtils.isNotEmpty(temp.getParentId())){
				if(temp.getParentId().equals(po.getMenuId())){
					selectTreeChildren0(temp,list);// 继续递归子节点
					chiList.add(temp);
				}
				
			}
		}
		po.setChildren(chiList);

	}
	
	
}
