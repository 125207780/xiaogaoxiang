package com.bonc.system.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.dao.entity.SysMenuOperation;
import com.bonc.system.dao.mapper.SysMenuOperationMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysMenuOperationService {

	@Resource
	private SysMenuOperationMapper sysMenuOperationMapper;

	public List<SysMenuOperation> selectListByMenuId(String menuId) {
		if (StringUtils.isBlank(menuId)) {
			return new ArrayList<SysMenuOperation>();
		}
		SysMenuOperation sysMenuOperation = new SysMenuOperation();
		sysMenuOperation.setMenuId(menuId);
		List<SysMenuOperation> list = this.sysMenuOperationMapper.selectList(sysMenuOperation);
		return list;
	}

	public SysMenuOperation insertSysMenuOperation(SysMenuOperation po) {
		po.setId(UUIDUtil.createUUID());
		this.sysMenuOperationMapper.insertSysMenuOperation(po);
		return po;
	}

	public Boolean deleteSysMenuOperationById(String id) {
		Boolean bl = this.sysMenuOperationMapper.deleteSysMenuOperationById(id);
		return bl;
	}

	public Boolean selectCheck(SysMenuOperation po) {
		Integer i = this.sysMenuOperationMapper.selectCheck(po);
		if (i > 0) {
			return false;
		}
		return true;
	}
}
