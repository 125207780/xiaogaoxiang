package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysUser;


public interface SysUserMapper {
	
	@SelectProvider(type = SysUserMapperSql.class, method = "selectList")
	List<SysUser> selectList(SysUser sysUser);
	
	@SelectProvider(type = SysUserMapperSql.class, method = "selectSysUserById")
	SysUser selectSysUserById(String userId);
	
	@SelectProvider(type = SysUserMapperSql.class, method = "selectSysUserByLoginId")
	SysUser selectSysUserByLoginId(String loginId);
	
	@InsertProvider(type = SysUserMapperSql.class, method = "insertSysUser")
	Boolean insertSysUser(SysUser sysUser);
	
	@UpdateProvider(type = SysUserMapperSql.class, method = "updateSysUser")
	Boolean updateSysUser(SysUser sysUser);
	
	@DeleteProvider(type = SysUserMapperSql.class, method = "deleteSysUserById")
	Boolean deleteSysUserById(String id);
	
	@SelectProvider(type = SysUserMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysUser sysUser);

	@SelectProvider(type = SysUserMapperSql.class, method = "selectSysUserByIds")
	List<SysUser> selectSysUserByIds(String assigneeIds);
}
