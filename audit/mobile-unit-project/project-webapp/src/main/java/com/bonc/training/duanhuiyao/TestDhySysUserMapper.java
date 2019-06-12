package com.bonc.training.duanhuiyao;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysUser;

public interface TestDhySysUserMapper {

	@SelectProvider(type = TestDhySysUserMapperSql.class, method = "selectList")
	List<SysUser> selectList(SysUser sysUser);

	@SelectProvider(type = TestDhySysUserMapperSql.class, method = "selectSysUserById")
	SysUser selectSysUserById(String userId);

	@SelectProvider(type = TestDhySysUserMapperSql.class, method = "selectSysUserByLoginId")
	SysUser selectSysUserByLoginId(String loginId);

	@InsertProvider(type = TestDhySysUserMapperSql.class, method = "insertSysUser")
	Boolean insertSysUser(SysUser sysUser);

	@UpdateProvider(type = TestDhySysUserMapperSql.class, method = "updateSysUser")
	Boolean updateSysUser(SysUser sysUser);

	@DeleteProvider(type = TestDhySysUserMapperSql.class, method = "deleteSysUserById")
	Boolean deleteSysUserById(String id);

	@SelectProvider(type = TestDhySysUserMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysUser sysUser);

	@SelectProvider(type = TestDhySysUserMapperSql.class, method = "selectSysUserByIds")
	List<SysUser> selectSysUserByIds(String assigneeIds);
}
