package com.bonc.system.dao.mapper;

import java.util.List;

import com.bonc.system.dao.entity.SysOrg;


public interface SysOrgMapper {
	
	List<SysOrg> selectList(SysOrg sysOrg);
	
	SysOrg selectSysOrgById(String orgId);
	
	Boolean insertSysOrg(SysOrg sysOrg);
	
	Boolean updateSysOrg(SysOrg sysOrg);
	
	Boolean deleteSysOrgByTreeCode(String treeCode);
	
	Integer selectCheck(SysOrg sysOrg);
	
	String selectSysOrgUserOne(String orgId);
	
	int deleteSysOrgUser(String orgId);
	
	int deleteSysOrgUserRole(String userId);
}
