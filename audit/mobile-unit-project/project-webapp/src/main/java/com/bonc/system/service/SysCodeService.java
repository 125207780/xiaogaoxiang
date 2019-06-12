package com.bonc.system.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.dao.entity.SysCode;
import com.bonc.system.dao.mapper.SysCodeMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysCodeService {

	@Resource
	private SysCodeMapper sysCodeMapper;

	public Page<SysCode> selectPageList(SysCode po, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysCode> pageList = (Page<SysCode>) this.sysCodeMapper.selectList(po);
		return pageList;
	}

	public SysCode selectSysCodeById(String id) {
		SysCode SysCode = this.sysCodeMapper.selectSysCodeById(id);
		return SysCode;
	}

	public SysCode insertSysCode(SysCode po) {
		String id = UUIDUtil.createUUID();
		po.setId(id);
		if (StringUtils.isBlank(po.getParentId())) {
			po.setTreeCode("/" + id);
		} else {
			SysCode parent = this.selectSysCodeById(po.getParentId());
			po.setTreeCode(parent.getTreeCode() + "/" + id);
		}
		this.sysCodeMapper.insertSysCode(po);
		return po;
	}

	public SysCode updateSysCode(SysCode po) {
		this.sysCodeMapper.updateSysCode(po);
		return po;
	}

	public Boolean deleteSysCodeByTreeCode(String treeCode) {
		Boolean bl = this.sysCodeMapper.deleteSysCodeByTreeCode(treeCode);
		return bl;
	}

	public List<SysCode> selectTree(String id) {
		SysCode po = new SysCode();
		if (StringUtils.isBlank(id)) {
			po.setTreeLevel("1");
		} else {
			po.setId(id);
		}
		List<SysCode> list = this.sysCodeMapper.selectList(po);
		for (SysCode temp : list) {
			this.selectTreeChildren(temp);
		}
		return list;
	}

	private void selectTreeChildren(SysCode po) {
		SysCode parent = new SysCode();
		parent.setParentId(po.getId());
		List<SysCode> list = this.sysCodeMapper.selectList(parent);
		if (list.size() == 0) {
			return;
		} else {
			po.setChildren(list);
			for (SysCode temp : list) {
				this.selectTreeChildren(temp);
			}
		}
	}

	public Map<String, SysCode> selectMap(String id) {
		SysCode po = new SysCode();
		po.setId(id);
		List<SysCode> list = this.sysCodeMapper.selectList(po);
		Map<String, SysCode> returnMap = new HashMap<String, SysCode>();
		for (SysCode sysCode : list) {
			returnMap.put(sysCode.getCodeType() + "_" + sysCode.getCodeKey(), sysCode);
		}
		return returnMap;
	}

	public Boolean selectCheck(SysCode sysCode) {
		if (!"1".equals(sysCode.getTreeLevel())) {// 树级别不是1不校验
			return true;
		}
		Integer i = this.sysCodeMapper.selectCheck(sysCode);
		if (i > 0) {
			return false;
		}
		return true;
	}
}
