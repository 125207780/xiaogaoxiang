package com.bonc.system.dao.mapper;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysRole;

public class SysRoleMapperSql {

	public String selectList(SysRole po) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(po.getRoleName())) {
			sql += " and t.role_name like concat(concat('%',#{roleName}),'%') ";
		}
		return sql;
	}

	public String selectSysRoleById(String roleId) {
		String sql = this.getSql() + " and role_id=#{roleId} ";
		return sql;
	}

	public String selectCheck(SysRole po) {
		String sql = " select count(*) from sys_role t where 1=1 ";
		if (!StringUtils.isBlank(po.getRoleId())) {
			sql += " and t.role_id != #{roleId} ";
		}
		if (!StringUtils.isBlank(po.getRoleName())) {
			sql += " and t.role_name = #{roleName} ";
		}
		return sql;
	}

	public String deleteSysRoleById(String roleId) {
		String sql = "delete from sys_role where role_id=#{roleId}";
		return sql;
	}

	public String insertSysRole(SysRole po) {
		String sql = "insert into sys_role(role_id,role_name,create_id,create_time, memo) " + "values(#{roleId},#{roleName},#{createId},#{createTime},#{memo})";
		return sql;
	}

	public String updateSysRole(SysRole po) {
		String sql = "update sys_role set " + " role_name=#{roleName} " + " where role_id=#{roleId} ";
		return sql;
	}

	private String getSql() {
		String sql = "select " + " t.role_id roleId, " + " t.create_id createId, " + " t.create_time createTime, " + " t.role_name roleName, " + " t.memo memo "
				+ " from " + " sys_role t " + " where 1=1 ";
		return sql;
	}
}
