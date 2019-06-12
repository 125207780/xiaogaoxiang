package com.bonc.training.whs;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysUser;

public interface TestWhsSysUserMapper {

	@SelectProvider(type = TestWhsSysUserMapperSql.class, method = "selectList")
	List<SysUser> selectList(SysUser sysUser);

	@SelectProvider(type = TestWhsSysUserMapperSql.class, method = "selectSysUserById")
	SysUser selectSysUserById(String userId);

	@SelectProvider(type = TestWhsSysUserMapperSql.class, method = "selectSysUserByLoginId")
	SysUser selectSysUserByLoginId(String loginId);

	@InsertProvider(type = TestWhsSysUserMapperSql.class, method = "insertSysUser")
	Boolean insertSysUser(SysUser sysUser);

	@UpdateProvider(type = TestWhsSysUserMapperSql.class, method = "updateSysUser")
	Boolean updateSysUser(SysUser sysUser);

	@DeleteProvider(type = TestWhsSysUserMapperSql.class, method = "deleteSysUserById")
	Boolean deleteSysUserById(String id);

	@SelectProvider(type = TestWhsSysUserMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysUser sysUser);

	@SelectProvider(type = TestWhsSysUserMapperSql.class, method = "selectSysUserByIds")
	List<SysUser> selectSysUserByIds(String assigneeIds);
}
