package com.bonc.training.ccq;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysUser;

public interface TestCcqSysUserMapper {

	@SelectProvider(type = TestCcqSysUserMapperSql.class, method = "selectList")
	List<SysUser> selectList(SysUser sysUser);

	@SelectProvider(type = TestCcqSysUserMapperSql.class, method = "selectSysUserById")
	SysUser selectSysUserById(String userId);

	@InsertProvider(type = TestCcqSysUserMapperSql.class, method = "insertSysUser")
	Boolean insertSysUser(SysUser sysUser);

	@UpdateProvider(type = TestCcqSysUserMapperSql.class, method = "updateSysUser")
	Boolean updateSysUser(SysUser sysUser);

	@DeleteProvider(type = TestCcqSysUserMapperSql.class, method = "deleteSysUserById")
	Boolean deleteSysUserById(String id);

	@SelectProvider(type = TestCcqSysUserMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysUser sysUser);

}
