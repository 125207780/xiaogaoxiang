package com.bonc.system.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import com.bonc.system.dao.entity.SysCode;

public interface SysCodeMapper {

	@SelectProvider(type = SysCodeMapperSql.class, method = "selectList")
	List<SysCode> selectList(SysCode po);

	@SelectProvider(type = SysCodeMapperSql.class, method = "selectSysCodeById")
	SysCode selectSysCodeById(String id);

	@InsertProvider(type = SysCodeMapperSql.class, method = "insertSysCode")
	Boolean insertSysCode(SysCode po);

	@UpdateProvider(type = SysCodeMapperSql.class, method = "updateSysCode")
	Boolean updateSysCode(SysCode po);

	@DeleteProvider(type = SysCodeMapperSql.class, method = "deleteSysCodeByTreeCode")
	Boolean deleteSysCodeByTreeCode(String treeCode);

	@SelectProvider(type = SysCodeMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysCode sysCode);

}
