package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;

import com.bonc.system.dao.entity.SysMenuOperation;


public interface SysMenuOperationMapper {
	
	@SelectProvider(type = SysMenuOperationMapperSql.class, method = "selectList")
	List<SysMenuOperation> selectList(SysMenuOperation po);
	
	@InsertProvider(type = SysMenuOperationMapperSql.class, method = "insertSysMenuOperation")
	Boolean insertSysMenuOperation(SysMenuOperation po);

	@DeleteProvider(type = SysMenuOperationMapperSql.class, method = "deleteSysMenuOperationById")
	Boolean deleteSysMenuOperationById(String id);

	@SelectProvider(type = SysMenuOperationMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysMenuOperation po);
}
