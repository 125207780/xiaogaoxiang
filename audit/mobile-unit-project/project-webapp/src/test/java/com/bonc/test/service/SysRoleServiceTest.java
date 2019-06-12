package com.bonc.test.service;

import com.bonc.system.dao.entity.SysRole;
import com.bonc.system.service.SysRoleService;
import com.bonc.test.util.SpringTransactionalTestCase;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ContextConfiguration("/applicationContext-test.xml")
public class SysRoleServiceTest extends SpringTransactionalTestCase {

	@Autowired
	private SysRoleService sysRoleService;

	@SuppressWarnings("unused")
	private Map<String, Object> getRoleMap() {
		Map<String, Object> prmMap = new HashMap<String, Object>();
		prmMap.put("memo", "testUnit");
		prmMap.put("tenantId", "99999999");
		prmMap.put("roleName", "testUnitRole");
		List<Map<String, String>> userInfoList = new ArrayList<Map<String, String>>();
		Map<String, String> user1 = new HashMap<String, String>();
		user1.put("userId", "0");
		userInfoList.add(user1);
		prmMap.put("userInfoList", userInfoList);
		return prmMap;
	}

	@Test
	@Sql("sql/role/testAddModifyDelRole.sql")
	public void testAddMfyDelRole() throws Exception {

		SysRole role = new SysRole();

		sysRoleService.updateSysRole(role);

	}

}
