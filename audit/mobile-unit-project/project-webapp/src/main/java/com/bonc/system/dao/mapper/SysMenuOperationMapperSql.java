package com.bonc.system.dao.mapper;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysMenuOperation;

public class SysMenuOperationMapperSql {

	public String selectCheck(SysMenuOperation po) {
		String sql = " select count(*) from sys_menu_operation t where 1=1 ";
		if (!StringUtils.isBlank(po.getOperationCode())) {
			sql += " and t.operation_code = #{operationCode} ";
		}
		if (!StringUtils.isBlank(po.getMenuId())) {
			sql += " and t.menu_id = #{menuId} ";
		}
		return sql;
	}

	public String deleteSysMenuOperationById(String id) {
		String sql = "delete from sys_menu_operation where id=#{id}";
		return sql;
	}

	public String insertSysMenuOperation(SysMenuOperation po) {
		String sql = "insert into sys_menu_operation(id,menu_id,operation_code,operation_name) " + "values(#{id},#{menuId},#{operationCode},#{operationName})";
		return sql;
	}

	public String selectList(SysMenuOperation po) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(po.getMenuId())) {
			sql += " and t.menu_id=#{menuId} ";
		}
		return sql;
	}

	private String getSql() {
		String sql = " select " + " t.id id, " + " t.menu_id menuId, " + " t.operation_code operationCode, " + " t.operation_name operationName " + " from "
				+ " sys_menu_operation t " + " where 1=1 ";
		return sql;
	}
}
