package com.bonc.common.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;

/**
 * 
 * @FileName SysUserTreeMenuUtil.java
 * @Author xiaogaoxiang
 * @At 2018年12月19日 下午12:12:22
 * @Desc 定义一个公共类，用来通过登录人，查询下面所有的子节点信息
 */
public class SysUserTreeMenuUtil {

	// 定义一个全部变量
	private static Set<String> childSysUserList = new HashSet<>();
	private static List<SysOrg> childSysOrgList = new ArrayList<>();
	private static List<SysOrg> parentSysOrgList = new ArrayList<>();

	/**
	 * 获取用户子节点信息
	 * 
	 * @Title getChildrenOrgId
	 * @Author xiaogaoxiang
	 * @param childrenSysUserList
	 * @param orgId
	 * @param nowOrgId
	 * @return List<String>
	 */
	public static List<String> getChildrenOrgId(List<SysUser> childrenSysUserList, String orgId, String nowOrgId) {
		childSysUserList = new HashSet<>();
		// 将所有SysUser对象信息，和当前登陆人的orgid进行比较，查询出当前登陆人下的所有level等于3的信息
		return treeMenuList(childrenSysUserList, orgId, nowOrgId);
	}

	/**
	 * 获取组织子节点信息
	 * 
	 * @Title getChildrenOrgId
	 * @Author xiaogaoxiang
	 * @param allSysOrgList
	 * @param orgId
	 * @return ArrayList<SysOrg>
	 */
	public static List<SysOrg> getChildrenOrgId(List<SysOrg> allSysOrgList, String orgId) {
		childSysOrgList = new ArrayList<>();
		return treeMenuList(allSysOrgList, orgId);
	}

	/**
	 * 获取NET_RESOURCES组织子节点信息
	 * 
	 * @Title getChildrenOrgIdFirstPage
	 * @Author xiaogaoxiang
	 * @param allSysOrgList
	 * @param orgId
	 * @return List<SysOrg>
	 */
	public static List<SysOrg> getChildrenOrgIdFirstPage(List<SysOrg> allSysOrgList, String orgId) {
		childSysOrgList = new ArrayList<>();
		return treeMenuListFirstPage(allSysOrgList, orgId);
	}

	/**
	 * 获取组织父节点信息
	 * 
	 * @Title getParentOrgId
	 * @Author xiaogaoxiang
	 * @param allSysOrgList
	 * @param orgId
	 * @return List<SysOrg>
	 */
	public static List<SysOrg> getParentOrgId(List<SysOrg> allSysOrgList, String orgId) {
		parentSysOrgList = new ArrayList<>();
		return treeParentMenuList(allSysOrgList, orgId);
	}

	/**
	 * 获取父节点信息
	 * 
	 * @Title treeParentMenuList
	 * @Author xiaogaoxiang
	 * @param allSysOrgList
	 * @param orgId
	 * @return List<SysOrg>
	 */
	private static List<SysOrg> treeParentMenuList(List<SysOrg> allSysOrgList, String pid) {
		for (SysOrg su : allSysOrgList) {
			// 遍历出父id等于参数的id，add进子节点集合
			if (pid.equals(su.getOrgId())) {
				// 递归遍历下一级
				treeParentMenuList(allSysOrgList, su.getPid());
				parentSysOrgList.add(su);
			}
		}
		return parentSysOrgList;
	}

	/**
	 * 根据父节点，查询所有子节点的对象集合信息（NET_RESOURCES）
	 * 
	 * @Title treeMenuListFirstPage
	 * @Author xiaogaoxiang
	 * @param allSysOrgList
	 * @param orgId
	 * @return List<SysOrg>
	 */
	private static List<SysOrg> treeMenuListFirstPage(List<SysOrg> allSysOrgList, String orgId) {
		for (SysOrg su : allSysOrgList) {
			// 遍历出父id等于参数的id，add进子节点集合
			if (orgId.equals(su.getPid())) {
				// 递归遍历下一级
				treeMenuListFirstPage(allSysOrgList, su.getOrgId());
				childSysOrgList.add(su);
			}
		}
		return childSysOrgList;
	}

	/**
	 * 根据父节点，查询所有子节点的对象集合信息
	 * 
	 * @Title treeMenuList
	 * @Author xiaogaoxiang
	 * @param allSysOrgList
	 * @param orgId
	 * @return ArrayList<SysOrg>
	 */
	private static List<SysOrg> treeMenuList(List<SysOrg> allSysOrgList, String orgId) {
		for (SysOrg su : allSysOrgList) {
			// 遍历出父id等于参数的id，add进子节点集合
			if (orgId.equals(su.getPid())) {
				// 递归遍历下一级
				treeMenuList(allSysOrgList, su.getOrgId());
				childSysOrgList.add(su);
			}
		}
		return childSysOrgList;
	}

	/**
	 * 调用递归方法
	 * 
	 * @Title treeMenuList
	 * @Author xiaogaoxiang
	 * @param sysUserList
	 * @param orgId
	 * @param nowOrgId
	 * @return List<String>
	 */
	public static List<String> treeMenuList(List<SysUser> sysUserList, String orgId, String nowOrgId) {
		for (SysUser su : sysUserList) {
			// 遍历出父id等于参数的id，add进子节点集合
			if (null != su.getPid() && !"".equals(su.getPid()))
				if (orgId.equals(su.getPid())) {
					// 递归遍历下一级
					treeMenuList(sysUserList, su.getOrgId(), nowOrgId);
					if (su.getOrgLevel() == 3) {
						if (su.getOrgId().equals(nowOrgId)) {
							childSysUserList.add(su.getOrgId());
						}
					}
				}
		}
		return new ArrayList<>(childSysUserList);
	}
}
