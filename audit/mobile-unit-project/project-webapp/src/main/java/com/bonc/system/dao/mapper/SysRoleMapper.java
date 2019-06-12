package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysRole;

public interface SysRoleMapper {

	@SelectProvider(type = SysRoleMapperSql.class, method = "selectList")
	List<SysRole> selectList(SysRole po);

	@SelectProvider(type = SysRoleMapperSql.class, method = "selectSysRoleById")
	SysRole selectSysRoleById(String userId);

	@InsertProvider(type = SysRoleMapperSql.class, method = "insertSysRole")
	Boolean insertSysRole(SysRole po);

	@UpdateProvider(type = SysRoleMapperSql.class, method = "updateSysRole")
	Boolean updateSysRole(SysRole po);

	@DeleteProvider(type = SysRoleMapperSql.class, method = "deleteSysRoleById")
	Boolean deleteSysRoleById(String id);

	@SelectProvider(type = SysRoleMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysRole po);
}
