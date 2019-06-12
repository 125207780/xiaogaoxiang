package com.bonc.system.dao.mapper;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysRoleUser;

public class SysRoleUserMapperSql {

	public String selectList(SysRoleUser po) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(po.getRoleId())) {
			sql += " and role_id=#{roleId} ";
		}
		if (!StringUtils.isBlank(po.getUserId())) {
			sql += " and user_id=#{userId} ";
		}
		return sql;
	}

	public String deleteByUserId(String userId) {
		String sql = "delete from sys_role_user where user_id=#{userId}";
		return sql;
	}

	public String insert(SysRoleUser po) {
		String sql = "insert into sys_role_user(ru_id,role_id,user_id,memo) " + "values(#{ruId},#{roleId},#{userId},#{memo})";
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.ru_id ruId, " + " t.role_id roleId, " + " t.user_id userId, " + " t.memo memo, " + " tt.role_name roleName " + " from "
				+ " sys_role_user t " + " join sys_role tt on t.role_id=tt.role_id " + " where 1=1 ";
		return sql;
	}
}
