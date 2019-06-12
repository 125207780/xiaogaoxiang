package com.bonc.system.dao.mapper;

import org.apache.commons.lang3.StringUtils;

import com.bonc.system.dao.entity.SysCode;

public class SysCodeMapperSql {

	public String selectList(SysCode po) {
		String sql = this.getSql();
		if (!StringUtils.isBlank(po.getCodeValue())) {
			sql += " and t.code_value like concat(concat('%',#{codeValue}),'%') ";
		}
		if (!StringUtils.isBlank(po.getTreeCode())) {
			sql += " and t.tree_code like concat(#{treeCode},'%') ";
		}
		if (!StringUtils.isBlank(po.getParentId())) {
			sql += " and t.parent_id = #{parentId} ";
		}
		if (!StringUtils.isBlank(po.getTreeLevel())) {
			sql += " and t.tree_level = #{treeLevel} ";
		}
		sql += " order by t.code_type, t.tree_level ";
		return sql;
	}

	public String selectCheck(SysCode po) {
		String sql = " select count(*) from sys_code t where 1=1 ";
		if (!StringUtils.isBlank(po.getId())) {
			sql += " and t.id != #{id} ";
		}
		if (!StringUtils.isBlank(po.getCodeType())) {
			sql += " and t.code_type = #{codeType} ";
		}
		if (!StringUtils.isBlank(po.getTreeLevel())) {
			sql += " and t.tree_level = #{treeLevel} ";
		}
		return sql;
	}

	public String selectSysCodeById(String id) {
		String sql = this.getSql() + " and id=#{id} ";
		return sql;
	}

	public String deleteSysCodeByTreeCode(String id) {
		String sql = "delete from sys_code where tree_code like concat(#{treeCode},'%')";
		return sql;
	}

	public String insertSysCode(SysCode po) {
		String sql = "insert into sys_code(id,code_type,code_key,code_value,tree_code,tree_level,parent_id) "
				+ "values(#{id},#{codeType},#{codeKey},#{codeValue},#{treeCode},#{treeLevel},#{parentId})";
		return sql;
	}

	public String updateSysCode(SysCode po) {
		String sql = "update sys_code set " + "code_key=#{codeKey},code_value=#{codeValue} " + "where id=#{id}";
		return sql;
	}

	private String getSql() {
		String sql = " select " + " t.id id, " + " t.code_type codeType, " + " t.code_key codeKey, " + " t.code_value codeValue, " + " t.tree_code treeCode, "
				+ " t.tree_level treeLevel, " + " t.parent_id parentId " + " from " + " sys_code t " + " where 1=1 ";
		return sql;
	}
}
