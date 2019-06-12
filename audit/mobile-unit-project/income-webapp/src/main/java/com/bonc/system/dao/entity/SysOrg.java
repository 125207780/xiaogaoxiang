package com.bonc.system.dao.entity;

import java.util.ArrayList;
import java.util.List;

public class SysOrg {

	private String orgId;//组织ID
	private String pid="";//父节点
	private String userId;//用户ID
	private String name;//组织名称
	private String memo="";//描述
	private String displayOrder;//排序
	private String orgLevel;//级别
	private String tenantId;
	private String treeCode;
	private List<SysOrg> children = new ArrayList<SysOrg>();
	private SysOrg parent;

	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(String displayOrder) {
		this.displayOrder = displayOrder;
	}
	public String getOrgId() {
		return orgId;
	}
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	public String getOrgLevel() {
		return orgLevel;
	}
	public void setOrgLevel(String orgLevel) {
		this.orgLevel = orgLevel;
	}
	public List<SysOrg> getChildren() {
		return children;
	}
	public void setChildren(List<SysOrg> children) {
		this.children = children;
	}
	public String getTreeCode() {
		return treeCode;
	}
	public void setTreeCode(String treeCode) {
		this.treeCode = treeCode;
	}
	public SysOrg getParent() {
		return parent;
	}
	public void setParent(SysOrg parent) {
		this.parent = parent;
	}
	public String getTenantId() {
		return tenantId;
	}
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
}