package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysMenu;

public interface SysMenuMapper {

	@SelectProvider(type = SysMenuMapperSql.class, method = "selectJoinSysRoleMenuList")
	List<SysMenu> selectJoinSysRoleMenuList(SysMenu po);

	@SelectProvider(type = SysMenuMapperSql.class, method = "selectList")
	List<SysMenu> selectList(SysMenu po);

	@SelectProvider(type = SysMenuMapperSql.class, method = "selectSysMenuById")
	SysMenu selectSysMenuById(String menuId);

	@InsertProvider(type = SysMenuMapperSql.class, method = "insertSysMenu")
	Boolean insertSysMenu(SysMenu po);

	@UpdateProvider(type = SysMenuMapperSql.class, method = "updateSysMenu")
	Boolean updateSysMenu(SysMenu po);

	@DeleteProvider(type = SysMenuMapperSql.class, method = "deleteSysMenuByTreeCode")
	Boolean deleteSysMenuByTreeCode(String treeCode);

}
