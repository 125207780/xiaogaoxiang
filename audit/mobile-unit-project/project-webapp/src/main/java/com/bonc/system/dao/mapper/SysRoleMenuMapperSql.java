package com.bonc.system.dao.mapper;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysRoleMenu;

public class SysRoleMenuMapperSql {

	public String selectList(SysRoleMenu po) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(po.getRoleId())) {
			sql += " and role_id=#{roleId} ";
		}
		return sql;
	}

	public String deleteByRoleId(String roleId) {
		String sql = "delete from sys_role_menu where role_id=#{roleId}";
		return sql;
	}

	public String insert(SysRoleMenu po) {
		String sql = "insert into sys_role_menu(rm_id,role_id,menu_id,operations) " + "values(#{rmId},#{roleId},#{menuId},#{operations})";
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.rm_id rmId, " + " t.role_id roleId, " + " t.menu_id menuId, " + " t.operations operations " + " from "
				+ " sys_role_menu t " + " where 1=1 ";
		return sql;
	}
}
