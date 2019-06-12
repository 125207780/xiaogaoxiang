package com.bonc.kpi.dao.entity;

import java.util.List;

public class KpiList {

	private String type;
	private String listType;
	private String listValue;
	private String displayOrder;
	private String remark;
	private List<KpiScreen> kpiScreen;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getListType() {
		return listType;
	}

	public void setListType(String listType) {
		this.listType = listType;
	}

	public String getListValue() {
		return listValue;
	}

	public void setListValue(String listValue) {
		this.listValue = listValue;
	}

	public String getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(String displayOrder) {
		this.displayOrder = displayOrder;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public List<KpiScreen> getKpiScreen() {
		return kpiScreen;
	}

	public void setKpiScreen(List<KpiScreen> kpiScreen) {
		this.kpiScreen = kpiScreen;
	}

}
