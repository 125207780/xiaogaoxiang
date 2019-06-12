package com.bonc.system.dao.mapper;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysMenu;

public class SysMenuMapperSql {

	public String selectList(SysMenu po) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(po.getMenuName())) {
			sql += " and t.menu_name like concat(concat('%',#{menuName}),'%') ";
		}
		if (!StringUtils.isBlank(po.getTreeCode())) {
			sql += " and t.tree_code like concat(#{treeCode},'%') ";
		}
		if (!StringUtils.isBlank(po.getParentId())) {
			sql += " and t.parent_id = #{parentId} ";
		}
//		if (!StringUtils.isBlank(po.getMenuLevel())) {
//			sql += " and t.menu_level = #{menuLevel} ";
//		}
		
		if (!StringUtils.isBlank(po.getState())) {
			sql += " and t.state = #{state} ";
		}
		sql += " order by t.menu_level, t.display_order ";
		return sql;
	}

	public String selectSysMenuById(String menuId) {
		String sql = this.getSql() + " and menu_id=#{menuId} ";
		return sql;
	}

	public String deleteSysMenuByTreeCode(String id) {
		String sql = "delete from sys_menu where tree_code like #{treeCode}||'%'";
		return sql;
	}

	public String insertSysMenu(SysMenu po) {
		String sql = "insert into sys_menu(menu_id,menu_name,menu_url,memo,icon_path,display_order,parent_id,state,menu_level,tree_code,menu_attr) "
				+ "values(#{menuId},#{menuName},#{menuUrl},#{memo},#{iconPath},#{displayOrder},#{parentId},#{state},#{menuLevel},#{treeCode},#{menuAttr})";
		return sql;
	}

	public String updateSysMenu(SysMenu po) {
		String sql = "update sys_menu set "
				+ "menu_name=#{menuName},menu_url=#{menuUrl},display_order=#{displayOrder},icon_path=#{iconPath},state=#{state},menu_attr=#{menuAttr} "
				+ "where menu_id=#{menuId}";
		return sql;
	}

	
//	public String selectJoinSysRoleMenuList(SysMenu po) {
//		String sql = " select " + " t.menu_id menuId, " + " t.menu_name menuName, " + " t.menu_url menuUrl, " + " t.memo memo, " + " t.icon_path iconPath, "
//				+ " t.display_order displayOrder, " + " t.parent_id parentId, " + " t.state state, " + " t.menu_level menuLevel, " + " t.tree_code treeCode, "
//				+ " t.menu_attr menuAttr "  + " from " + " SYS_MENU t where 1=1 "
//				;
//		if (!StringUtils.isBlank(po.getParentId())) {
//			sql += " and t.parent_id = #{parentId} ";
//		}
//		if (!StringUtils.isBlank(po.getState())) {
//			sql += " and t.state = #{state} ";
//		}
//		sql += " order by t.menu_level, t.display_order ";
//		return sql;
//	}
	
	public String selectJoinSysRoleMenuList(SysMenu po) {
		String sql = " select " + " t.menu_id menuId, " + " t.menu_name menuName, " + " t.menu_url menuUrl, " + " t.memo memo, " + " t.icon_path iconPath, "
				+ " t.display_order displayOrder, " + " t.parent_id parentId, " + " t.state state, " + " t.menu_level menuLevel, " + " t.tree_code treeCode, "
				+ " t.menu_attr menuAttr, " + " tt.role_id roleId, " + " tt.operations operations " + " from " + " SYS_MENU t "
				+ " join sys_role_menu tt on t.menu_id=tt.menu_id " + " where role_id=#{roleId} ";
		if (!StringUtils.isBlank(po.getParentId())) {
			sql += " and t.parent_id = #{parentId} ";
		}
//		if (!StringUtils.isBlank(po.getMenuLevel())) {
//			sql += " and t.menu_level = #{menuLevel} ";
//		}
		if (!StringUtils.isBlank(po.getState())) {
			sql += " and t.state = #{state} ";
		}
		sql += " order by t.menu_level, t.display_order ";
		return sql;
	}

	private String getSql() {
		String sql = " select " + " t.menu_id menuId, " + " t.menu_name menuName, " + " t.menu_url menuUrl, " + " t.memo memo, " + " t.icon_path iconPath, "
				+ " t.display_order displayOrder, " + " t.parent_id parentId, " + " t.state state, " + " t.menu_level menuLevel, " + " t.tree_code treeCode, "
				+ " t.menu_attr menuAttr" + " from " + " SYS_MENU t " + " where 1=1 ";
		return sql;
	}
}
