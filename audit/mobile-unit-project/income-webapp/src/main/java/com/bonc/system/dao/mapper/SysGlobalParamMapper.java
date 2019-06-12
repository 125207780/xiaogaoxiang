package com.bonc.system.dao.mapper;

import com.bonc.system.dao.entity.SysGlobalParam;
import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

import java.util.List;


public interface SysGlobalParamMapper {
	
	@SelectProvider(type = SysGlobalParamMapperSql.class, method = "selectList")
	List<SysGlobalParam> selectList(SysGlobalParam SysGlobalParam);
	
	@SelectProvider(type = SysGlobalParamMapperSql.class, method = "selectSysGlobalParamByParamName")
	SysGlobalParam selectSysGlobalParamByParamName(String paramName);

	@InsertProvider(type = SysGlobalParamMapperSql.class, method = "insertSysGlobalParam")
	Boolean insertSysGlobalParam(SysGlobalParam SysGlobalParam);
	
	@UpdateProvider(type = SysGlobalParamMapperSql.class, method = "updateSysGlobalParam")
	Boolean updateSysGlobalParam(SysGlobalParam SysGlobalParam);
	
	@DeleteProvider(type = SysGlobalParamMapperSql.class, method = "deleteSysGlobalParamByParamName")
	Boolean deleteSysGlobalParamByParamName(String paramName);

	@SelectProvider(type = SysGlobalParamMapperSql.class, method = "selectCheck")
	Integer selectCheck(SysGlobalParam SysGlobalParam);
	
}
