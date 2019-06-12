package com.bonc.training.bailong;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysUser;

public interface BlSysUserMapper {

	@SelectProvider(type = BlSysUserMapperSql.class, method = "selectList")
	List<SysUser> selectList(SysUser sysUser);

	@SelectProvider(type = BlSysUserMapperSql.class, method = "selectSysUserById")
	SysUser selectSysUserById(String userId);

	@SelectProvider(type = BlSysUserMapperSql.class, method = "selectSysUserByLoginId")
	SysUser selectSysUserByLoginId(String loginId);

	@InsertProvider(type = BlSysUserMapperSql.class, method = "insertSysUser")
	Boolean insertSysUser(SysUser sysUser);

	@UpdateProvider(type = BlSysUserMapperSql.class, method = "updateSysUser")
	Boolean updateSysUser(SysUser sysUser);

	@DeleteProvider(type = BlSysUserMapperSql.class, method = "deleteSysUserById")
	Boolean deleteSysUserById(String id);

	@SelectProvider(type = BlSysUserMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysUser sysUser);

	// @SelectProvider(type = BlSysUserMapperSql.class, method =
	// "selectSysUserByIds")
	// List<SysUser> selectSysUserByIds(String assigneeIds);
}
