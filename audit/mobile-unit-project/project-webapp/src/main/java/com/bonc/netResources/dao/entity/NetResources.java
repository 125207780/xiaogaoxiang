package com.bonc.netResources.dao.entity;

import java.util.ArrayList;
import java.util.List;

public class NetResources {

	private String netCode;      // 组织ID
	private String pid = "";     // 父节点
	private String userId;       // 用户ID
	private String netName;      // 组织名称
	private String displayOrder; // 排序
	private String netLevel;     // 级别
	private String netType;      // 小类别
	private String type;         // 大类别
	private String treeCode;     // 树Code
	private List<NetResources> children = new ArrayList<NetResources>();
	private NetResources parent;

	public String getNetCode() {
		return netCode;
	}

	public void setNetCode(String netCode) {
		this.netCode = netCode;
	}

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

	public String getNetName() {
		return netName;
	}

	public void setNetName(String netName) {
		this.netName = netName;
	}

	public String getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(String displayOrder) {
		this.displayOrder = displayOrder;
	}

	public String getNetLevel() {
		return netLevel;
	}

	public void setNetLevel(String netLevel) {
		this.netLevel = netLevel;
	}

	public String getNetType() {
		return netType;
	}

	public void setNetType(String netType) {
		this.netType = netType;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTreeCode() {
		return treeCode;
	}

	public void setTreeCode(String treeCode) {
		this.treeCode = treeCode;
	}

	public List<NetResources> getChildren() {
		return children;
	}

	public void setChildren(List<NetResources> children) {
		this.children = children;
	}

	public NetResources getParent() {
		return parent;
	}

	public void setParent(NetResources parent) {
		this.parent = parent;
	}

}
