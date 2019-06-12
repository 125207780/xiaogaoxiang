package com.bonc.system.dao.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 菜单实体类
 * 
 * @author 祝正佳
 *
 */
public class SysCode implements Serializable {

	private static final long serialVersionUID = -1L;
	private List<SysCode> children;// 子节点
	private String id;
	private String codeType;
	private String codeKey;
	private String codeValue;
	private String treeCode;
	private String treeLevel;
	private String parentId;
	private SysCode parent;// 父节点

	public List<SysCode> getChildren() {
		return children;
	}

	public void setChildren(List<SysCode> children) {
		this.children = children;
	}

	public String getCodeType() {
		return codeType;
	}

	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}

	public String getCodeKey() {
		return codeKey;
	}

	public void setCodeKey(String codeKey) {
		this.codeKey = codeKey;
	}

	public String getCodeValue() {
		return codeValue;
	}

	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}

	public SysCode getParent() {
		return parent;
	}

	public void setParent(SysCode parent) {
		this.parent = parent;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTreeCode() {
		return treeCode;
	}

	public void setTreeCode(String treeCode) {
		this.treeCode = treeCode;
	}

	public String getTreeLevel() {
		return treeLevel;
	}

	public void setTreeLevel(String treeLevel) {
		this.treeLevel = treeLevel;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
}
