package com.bonc.netResources.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.annotation.ArchivesLog;
import com.bonc.netResources.dao.entity.NetResources;
import com.bonc.netResources.dao.mapper.NetResourcesMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class NetResourcesService {
	@Resource
	private NetResourcesMapper netResourcesMapper;

	public NetResourcesMapper getMapper() {
		return netResourcesMapper;
	}

	public List<NetResources> selectList() {
		return netResourcesMapper.selectList();
	}

	/**
	 * 根据一级菜单，查询二级分类
	 * 
	 * @Title getChildrenNetRresourceByOrgId
	 * @Author xiaogaoxiang
	 * @param netCode
	 * @return List<NetResources>
	 */
	@ArchivesLog(actionName = "【操作类：NetResourcesService】", option = "【方法名：getChildrenNetRresourceByOrgId，作用：根据一级菜单，查询二级分类】")
	public List<NetResources> getChildrenNetRresourceByOrgId(String netCode) {
		return netResourcesMapper.getChildrenNetRresourceByOrgId(netCode);
	}
}
