package com.bonc.datamodel.dao.entity;

/**
 * @author weihongda 数据模型model
 */
public class DataModel {
	private String id;
	private String dataModelName;
	private String dataModelDesc;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDataModelName() {
		return dataModelName;
	}

	public void setDataModelName(String dataModelName) {
		this.dataModelName = dataModelName;
	}

	public String getDataModelDesc() {
		return dataModelDesc;
	}

	public void setDataModelDesc(String dataModelDesc) {
		this.dataModelDesc = dataModelDesc;
	}

	@Override
	public String toString() {
		return "DataModel [id=" + id + ", dataModelName=" + dataModelName + ", dataModelDesc=" + dataModelDesc + "]";
	}

}
