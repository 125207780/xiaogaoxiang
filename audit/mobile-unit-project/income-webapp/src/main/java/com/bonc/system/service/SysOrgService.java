package com.bonc.system.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.utils.UUIDUtil;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.mapper.SysOrgMapper;
import com.bonc.system.service.i.SysOrgServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysOrgService implements SysOrgServiceI {

	@Resource
	private SysOrgMapper sysOrgMapper;

	public Page<SysOrg> selectPageList(SysOrg sysOrg, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysOrg> pageList = (Page<SysOrg>) this.sysOrgMapper.selectList(sysOrg);
		return pageList;
	}
	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：selectSysOrgById，作用：通过地市ID获取地市信息】")
	public SysOrg selectSysOrgById(String orgId) {
		SysOrg sysOrg = this.sysOrgMapper.selectSysOrgById(orgId);
		return sysOrg;
	}

	public SysOrg insertSysOrg(SysOrg sysOrg) {
		String orgId = UUIDUtil.createUUID();
		sysOrg.setOrgId(orgId);
		if (StringUtils.isBlank(sysOrg.getPid())) {
			sysOrg.setTreeCode("/" + orgId);
		} else {
			SysOrg parent = this.selectSysOrgById(sysOrg.getPid());
			sysOrg.setTreeCode(parent.getTreeCode() + "/" + orgId);
		}
		// Boolean bl = this.sysOrgMapper.insertSysOrg(sysOrg);
		return sysOrg;
	}

	public SysOrg updateSysOrg(SysOrg sysOrg) {
		// Boolean bl = this.sysOrgMapper.updateSysOrg(sysOrg);
		return sysOrg;
	}

	public Boolean deleteSysOrgByTreeCode(String treeCode) {
		Boolean bl = this.sysOrgMapper.deleteSysOrgByTreeCode(treeCode);
		return bl;
	}

	public List<SysOrg> selectTree(String orgId) {
		SysOrg sysOrg = new SysOrg();
		if (StringUtils.isBlank(orgId)) {
			sysOrg.setOrgLevel("1");
		} else {
			sysOrg.setOrgId(orgId);
		}
		List<SysOrg> list = this.sysOrgMapper.selectList(sysOrg);
		for (SysOrg temp : list) {
			this.selectTreeChildren(temp);
		}
		return list;
	}

	private void selectTreeChildren(SysOrg sysOrg) {
		SysOrg parent = new SysOrg();
		parent.setPid(sysOrg.getOrgId());
		List<SysOrg> list = this.sysOrgMapper.selectList(parent);
		if (list.size() == 0) {
			return;
		} else {
			sysOrg.setChildren(list);
			for (SysOrg temp : list) {
				this.selectTreeChildren(temp);
			}
		}
	}

	public void deleteSysUser(String orgId) {
		String userId = this.sysOrgMapper.selectSysOrgUserOne(orgId);
		sysOrgMapper.deleteSysOrgUser(orgId);
		sysOrgMapper.deleteSysOrgUserRole(userId);
		return;
	}

}
