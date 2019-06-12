package com.bonc.system.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import com.bonc.common.utils.UUIDUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.system.dao.entity.SysRoleMenu;
import com.bonc.system.dao.mapper.SysRoleMenuMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysRoleMenuService {

	@Resource
	private SysRoleMenuMapper sysRoleMenuMapper;
	
	public List<SysRoleMenu> selectList(SysRoleMenu po) {
		List<SysRoleMenu> list = this.sysRoleMenuMapper.selectList(po);
		return list;
	}
	
	/**
	 * 查询，根据角色
	 * @param roleId
	 * @return
	 */
	public List<SysRoleMenu> selectListByRoleId(String roleId) {
		if(StringUtils.isBlank(roleId)) {
			return new ArrayList<SysRoleMenu>();
		}
		SysRoleMenu po = new SysRoleMenu();
		po.setRoleId(roleId);;
		List<SysRoleMenu> list = this.sysRoleMenuMapper.selectList(po);
		return list;
	}
	
	/**
	 * 新增，根据角色id，权限字符串
	 * @param roleId
	 * @param s
	 * @return
	 */
	public List<SysRoleMenu> insert(String roleId, String s) {
		this.deleteByRoleId(roleId);
		String[] ss = s.split(",", -1);
		List<SysRoleMenu> list = new ArrayList<SysRoleMenu>();
		for (String string : ss) {
			if(StringUtils.isBlank(string)) {
				continue;
			}
			String[] strings = string.split("_", -1);
			String menuId = strings[0];
			String operations = strings[1];
			String uuid = UUIDUtil.createUUID();
			SysRoleMenu po = new SysRoleMenu();
			po.setRmId(uuid);
			po.setRoleId(roleId);
			po.setMenuId(menuId);
			po.setOperations(operations);
			list.add(po);
			this.sysRoleMenuMapper.insert(po);
		}
		return list;
	}
	
	public Boolean deleteByRoleId(String roleId) {
		Boolean bl = this.sysRoleMenuMapper.deleteByRoleId(roleId);
		return bl;
	}
}
