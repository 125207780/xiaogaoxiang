package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;

import com.bonc.system.dao.entity.SysRoleUser;


public interface SysRoleUserMapper {
	
	@SelectProvider(type = SysRoleUserMapperSql.class, method = "selectList")
	List<SysRoleUser> selectList(SysRoleUser po);
	
	@InsertProvider(type = SysRoleUserMapperSql.class, method = "insert")
	Boolean insert(SysRoleUser po);
	
	@DeleteProvider(type = SysRoleUserMapperSql.class, method = "deleteByUserId")
	Boolean deleteByUserId(String userId);
}
