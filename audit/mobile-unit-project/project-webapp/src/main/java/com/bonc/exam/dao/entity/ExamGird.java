package com.bonc.exam.dao.entity;

/**
 * 网格考核模块
 * 
 * @author luxing@bonc.com.cn
 *
 */

public class ExamGird {
	// 组织结构id
	private String orgId;
	// 组织结构名称
	private String name;
	// detail类型id
	private String typeId;

	// 构造方法
	public ExamGird() {
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	@Override
	public String toString() {
		return "ExamGird [orgId=" + orgId + ", name=" + name + ", typeId=" + typeId + "]";
	}

}
