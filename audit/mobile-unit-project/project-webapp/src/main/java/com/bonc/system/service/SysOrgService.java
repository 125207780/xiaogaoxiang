package com.bonc.system.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.common.constant.ParamFieldConstant;
import com.bonc.common.utils.JedisClientPool;
import com.bonc.common.utils.JsonUtil;
import com.bonc.common.utils.UUIDUtil;
import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.mapper.SysOrgMapper;
import com.bonc.system.service.i.SysOrgServiceI;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SysOrgService implements SysOrgServiceI {
	@Resource
	private JedisClientPool jedisClientPool;
	@Resource
	private SysOrgMapper sysOrgMapper;

	public Page<SysOrg> selectPageList(SysOrg sysOrg, Integer page, Integer row) {
		PageHelper.startPage(page, row);
		Page<SysOrg> pageList = (Page<SysOrg>) this.sysOrgMapper.selectList(sysOrg);
		return pageList;
	}

	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：selectSysOrgById，作用：通过地市ID查询地市信息】")
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
		this.sysOrgMapper.insertSysOrg(sysOrg);
		return sysOrg;
	}

	public SysOrg updateSysOrg(SysOrg sysOrg) {
		this.sysOrgMapper.updateSysOrg(sysOrg);
		return sysOrg;
	}

	public Boolean deleteSysOrgByTreeCode(String treeCode) {
		Boolean bl = this.sysOrgMapper.deleteSysOrgByTreeCode(treeCode);
		return bl;
	}

	public List<SysOrg> selectTree(String orgId) {
		SysOrg sysOrg = new SysOrg();
		// if (StringUtils.isBlank(orgId)) {
		// sysOrg.setOrgLevel("1");
		// } else {
		// sysOrg.setOrgId(orgId);
		// }

		List<SysOrg> list = this.sysOrgMapper.selectList(sysOrg);
		List<SysOrg> paList = new ArrayList<SysOrg>();
		for (SysOrg temp : list) {
			if (temp.getOrgLevel().equals("1")) {
				this.selectTreeChildren(temp, list);
				paList.add(temp);
			}

		}
		return paList;
	}

	private void selectTreeChildren(SysOrg sysOrg, List<SysOrg> list) {
		// SysOrg parent = new SysOrg();
		// parent.setPid(sysOrg.getOrgId());
		// List<SysOrg> list = this.sysOrgMapper.selectList(parent);
		List<SysOrg> chList = new ArrayList<SysOrg>();

		for (SysOrg temp : list) {
			if (StringUtils.isNotBlank(temp.getPid())) {
				if (temp.getPid().equals(sysOrg.getOrgId())) {
					this.selectTreeChildren(temp, list);
					chList.add(temp);
				}
			}

		}
		if (chList.size() > 0) {
			sysOrg.setChildren(chList);
		}

	}

	public void deleteSysUser(String orgId) {
		String userId = this.sysOrgMapper.selectSysOrgUserOne(orgId);
		sysOrgMapper.deleteSysOrgUser(orgId);
		sysOrgMapper.deleteSysOrgUserRole(userId);
		return;
	}

	public List<SysOrg> checkGridName(List<String> gridNames) {
		List<SysOrg> sysOrgList = sysOrgMapper.checkGridName(gridNames);
		return sysOrgList;
	}

	/**
	 * 将网格信息进行循环插入
	 * 
	 * @param sysOrgList
	 * @return
	 */
	public int insertSysOrgList(List<SysOrg> sysOrgList) {
		int count = 0;
		for (SysOrg so : sysOrgList) {
			this.insertSysOrg(so);
			count++;
		}
		if (count == sysOrgList.size()) {
			return count;
		} else {
			return 0;
		}
	}

	/**
	 * 根据组织编码，查询该组织下基站最大排序号的组织信息
	 * 
	 * @param orgId
	 * @return
	 */
	public SysOrg selectMaxDisplayOrderSysOrgInfo(String orgId) {
		return sysOrgMapper.selectMaxDisplayOrderSysOrgInfo(orgId);
	}

	/*	*//**
			 * 查询orgId下一级的子节点信息
			 * 
			 * @Title selectNextChildrenSysOrg
			 * @Author xiaogaoxiang
			 * @param orgId
			 * @return List<SysOrg>
			 *//*
			 * public List<SysOrg> selectNextChildrenSysOrg(String orgId) {
			 * return sysOrgMapper.selectNextChildrenSysOrg(orgId); }
			 */

	/**
	 * 查询orgId下一级的子节点信息
	 * 
	 * @Title selectNextChildrenSysOrg
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<SysOrg>
	 */
	public List<SysOrg> selectNextChildrenSysOrg(String orgId) {
		// 判断是否有缓存
		String json = jedisClientPool.hget(ParamFieldConstant.NEXT_CHILDREN_SYSORG, orgId);
		// 判断是否为空
		if (StringUtils.isNoneBlank(json)) {
			List<SysOrg> list = JsonUtil.jsonToList(json, SysOrg.class);
			return list;
		}
		List<SysOrg> list = sysOrgMapper.selectNextChildrenSysOrg(orgId);
		// 写入Redis
		jedisClientPool.hset(ParamFieldConstant.NEXT_CHILDREN_SYSORG, orgId + "", JsonUtil.objectToJson(list));
		return list;
	}

	/**
	 * 查询市的信息
	 * 
	 * @Title selectCityInfo
	 * @Author xiaogaoxiang
	 * @return List<SysOrg>
	 */
	public List<SysOrg> selectCityInfo() {
		return sysOrgMapper.selectCityInfo();
	}

	/**
	 * SYS_ORG_POLYGON表中，根据根据orgid更新shape字段
	 * 
	 * @Title updateSysOrgShape
	 * @Author xiaogaoxiang
	 * @param si
	 *            void
	 */
	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：updateSysOrgDetail，作用：根据根据地市编码更新轮廓信息】")
	public void updateSysOrgDetail(StationInfo si) {
		sysOrgMapper.updateSysOrgDetail(si);
	}

	/**
	 * 根据orgId删除对应的行政边界区域信息
	 * 
	 * @Title deleteSysOrgDetailByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 *            void
	 */
	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：deleteSysOrgDetailByOrgId，作用：根据orgId删除对应的行政边界区域信息】")
	public void deleteSysOrgDetailByOrgId(String orgId) {
		sysOrgMapper.deleteSysOrgDetailByOrgId(orgId);
	}

	/**
	 * 新增SYS_ORG_DETAIL信息
	 * 
	 * @Title insertSysOrgDetail
	 * @Author xiaogaoxiang
	 * @param mapInfo
	 *            void
	 */
	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：insertSysOrgDetail，作用：新增SYS_ORG_DETAIL信息】")
	public void insertSysOrgDetail(Map<String, Object> mapInfo) {
		sysOrgMapper.insertSysOrgDetail(mapInfo);
	}

	/**
	 * 根据orgId查询SYS_ORG_DETAIL信息
	 * 
	 * @Title selectSysOrgDetailByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return Map<String,Object>
	 */
	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：selectSysOrgDetailByOrgId，作用：根据orgId查询SYS_ORG_DETAIL信息】")
	public Map<String, Object> selectSysOrgDetailByOrgId(String orgId) {
		return sysOrgMapper.selectSysOrgDetailByOrgId(orgId);
	}

	/**
	 * 查询所有组织信息
	 * 
	 * @Title selectAllSysOrg
	 * @Author xiaogaoxiang
	 * @return List<SysOrg>
	 */
	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：selectAllSysOrg，作用：查询所有组织信息】")
	public List<SysOrg> selectAllSysOrg() {
		return sysOrgMapper.selectAllSysOrg();
	}

	/**
	 * 根据父节点查询子节点信息
	 * 
	 * @Title getChildrenSysOrgByOrgId
	 * @Author xiaogaoxiang
	 * @param orgId
	 * @return List<SysOrg>
	 */
	@ArchivesLog(actionName = "【操作类：SysOrgService】", option = "【方法名：getChildrenSysOrgByOrgId，作用：根据父节点查询子节点信息】")
	public List<SysOrg> getChildrenSysOrgByOrgId(String orgId) {
		return sysOrgMapper.getChildrenSysOrgByOrgId(orgId);
	}

	/**
	 * 根据子节点查询父节点信息
	 * 
	 * @Title getParentSysOrgByOrgId
	 * @Author xiaogaoxiang
	 * @param pid
	 * @return List<SysOrg>
	 */
	public List<SysOrg> getParentSysOrgByOrgId(String pid) {
		return sysOrgMapper.getParentSysOrgByOrgId(pid);
	}

	/**
	 * 获取所有区县信息
	 * 
	 * @Title selectCntySysOrg
	 * @Author xiaogaoxiang
	 * @return List<SysOrg>
	 */
	public List<SysOrg> selectCntySysOrg() {
		return sysOrgMapper.selectCntySysOrg();
	}

	/**
	 * 根据父级id集合，查询子节点集合
	 * 
	 * @Title getChildrenSysOrgByOrgIds
	 * @Author xiaogaoxiang
	 * @param orgIds
	 * @param gridType
	 * @return List<SysOrg>
	 */
	public List<SysOrg> getChildrenSysOrgByOrgIds(List<String> orgIds, String gridType) {
		return sysOrgMapper.getChildrenSysOrgByOrgIds(orgIds, gridType);
	}

}
