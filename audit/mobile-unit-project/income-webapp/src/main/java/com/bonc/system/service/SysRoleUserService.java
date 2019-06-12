package com.bonc.system.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import com.bonc.common.utils.UUIDUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.system.dao.entity.SysRole;
import com.bonc.system.dao.entity.SysRoleMenu;
import com.bonc.system.dao.entity.SysRoleUser;
import com.bonc.system.dao.mapper.SysRoleUserMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysRoleUserService {

	@Resource
	private SysRoleUserMapper sysRoleUserMapper;
	@Resource
	private SysRoleService sysRoleService;
	
	public List<SysRoleUser> selectListByUserId(String userId) {
		if(StringUtils.isBlank(userId)) {
			return new ArrayList<SysRoleUser>();
		}
		SysRoleUser po = new SysRoleUser();
		po.setUserId(userId);
		List<SysRoleUser> list = this.sysRoleUserMapper.selectList(po);
		return list;
	}
	
	public String selectLeftRight(String userId) {
		SysRole sysRolePo = new SysRole();
		List<SysRole> sysRoleList = this.sysRoleService.selectList(sysRolePo);
		SysRoleUser sysRoleUserPo = new SysRoleUser();
		sysRoleUserPo.setUserId(userId);
		List<SysRoleUser> sysRoleUserList = this.sysRoleUserMapper.selectList(sysRoleUserPo);
		JSONArray jaLeft = new JSONArray();
		JSONArray jaRight = new JSONArray();
		for(SysRole sysRole : sysRoleList) {
			Boolean bl = true;
			for (SysRoleUser sysRoleUser : sysRoleUserList) {
				if(sysRole.getRoleId().equals(sysRoleUser.getRoleId())) {
					bl = false;
				}
			}
			JSONObject jo = new JSONObject();
			jo.put("name", sysRole.getRoleName());
			jo.put("value", sysRole.getRoleId());
			if(bl) {
				jaLeft.add(jo);
			} else {
				jaRight.add(jo);
			}
		}
		JSONObject jo = new JSONObject();
		jo.put("left", jaLeft);
		jo.put("right", jaRight);
		return jo.toString().replace("\"", "'");
	}

	public List<SysRoleUser> insert(String userId, String roleIds) {
		this.sysRoleUserMapper.deleteByUserId(userId);
		List<SysRoleUser> list = new ArrayList<SysRoleUser>();
		for (String roleId : roleIds.split(",", -1)) {
			if(StringUtils.isBlank(roleId)) {
				continue;
			}
			String uuid = UUIDUtil.createUUID();
			SysRoleUser po = new SysRoleUser();
			po.setRuId(uuid);
			po.setRoleId(roleId);
			po.setUserId(userId);
			list.add(po);
			this.sysRoleUserMapper.insert(po);
		}
		return list;
	}
	
	/**
	 * 查询，根据角色
	 * @param roleId
	 * @return
	 *//*
	public List<SysRoleMenu> selectListByRoleId(String roleId) {
		if(StringUtils.isBlank(roleId)) {
			return new ArrayList<SysRoleMenu>();
		}
		SysRoleMenu po = new SysRoleMenu();
		po.setRoleId(roleId);;
		List<SysRoleMenu> list = this.sysRoleMenuMapper.selectList(po);
		return list;
	}
	
	*//**
	 * 新增，根据角色id，权限字符串
	 * @param roleId
	 * @param s
	 * @return
	 *//*
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
	}*/
}
