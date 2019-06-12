package com.bonc.system.dao.mapper;

import com.bonc.system.dao.entity.SysGlobalParam;
import org.apache.commons.lang3.StringUtils;

public class SysGlobalParamMapperSql {
	
	public String selectList(SysGlobalParam sysGlobalParam) {
		String sql = this.getSql();
		if(!StringUtils.isBlank(sysGlobalParam.getParamName())) {
			sql += " and t.param_name like concat(concat('%',#{paramName}),'%') ";
		}
		if(!StringUtils.isBlank(sysGlobalParam.getParamValue())) {
			sql += " and t.param_value like concat(concat('%',#{paramValue}),'%') ";
		}
		return sql;
	}
	
	public String selectSysGlobalParamByParamName(String paramName) {
		String sql = this.getSql() + " and param_name=#{paramName} ";
		return sql;
	}
	
	public String deleteSysGlobalParamByParamName(String paramName) {
		String sql = "delete from sys_global_param where param_name=#{paramName}";
		return sql;
	}
	
	public String insertSysGlobalParam(SysGlobalParam sysGlobalParam) {
		String sql = "insert into sys_global_param(param_name,param_value,param_description ) "
				+ "values(#{paramName},#{paramValue},#{paramDescription} )";
		return sql;
	}
	
	public String updateSysGlobalParam(SysGlobalParam sysGlobalParam) {
		String sql = "update sys_global_param set "
				+ " param_value=#{paramValue},param_description=#{paramDescription} "
				+ " where param_name=#{paramName} ";
		return sql;
	}

	public String selectCheck(SysGlobalParam sysGlobalParam) {
		String sql = " select count(*) from sys_global_param t where 1=1 ";
		if(!StringUtils.isBlank(sysGlobalParam.getParamName())) {
			sql += " and t.param_name = #{paramName} ";
		}
		return sql;
	}
	
	private String getSql() {
		String sql = "select "
				+ " t.param_name paramName,"
				+ " t.param_value paramValue,"
				+ " t.param_description paramDescription "
				+ " from "
				+ " sys_global_param t "
				+ " where 1=1 ";
		return sql;
	}
}
