package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;

import com.bonc.system.dao.entity.SysRoleMenu;

public interface SysRoleMenuMapper {

	@SelectProvider(type = SysRoleMenuMapperSql.class, method = "selectList")
	List<SysRoleMenu> selectList(SysRoleMenu po);

	@InsertProvider(type = SysRoleMenuMapperSql.class, method = "insert")
	Boolean insert(SysRoleMenu po);

	@DeleteProvider(type = SysRoleMenuMapperSql.class, method = "deleteByRoleId")
	Boolean deleteByRoleId(String roleId);
}
