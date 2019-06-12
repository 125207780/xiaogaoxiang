package com.bonc.gridinfo.dao.entity;

public class EvaluationKpi {
	// 指标的实体类
	private String kpiId;
	private String kpiType;
	private String kpiName;
	private String kpiWeight;
	private String kpiDefine;
	private String cycleType;
	private String status;
	private String orgId;
	private String targetValue;
	private String kpiCode;

	public String getKpiCode() {
		return kpiCode;
	}

	public void setKpiCode(String kpiCode) {
		this.kpiCode = kpiCode;
	}

	public String getKpiId() {
		return kpiId;
	}

	public void setKpiId(String kpiId) {
		this.kpiId = kpiId;
	}

	public String getKpiType() {
		return kpiType;
	}

	public void setKpiType(String kpiType) {
		this.kpiType = kpiType;
	}

	public String getKpiName() {
		return kpiName;
	}

	public void setKpiName(String kpiName) {
		this.kpiName = kpiName;
	}

	public String getKpiWeight() {
		return kpiWeight;
	}

	public void setKpiWeight(String kpiWeight) {
		this.kpiWeight = kpiWeight;
	}

	public String getKpiDefine() {
		return kpiDefine;
	}

	public void setKpiDefine(String kpiDefine) {
		this.kpiDefine = kpiDefine;
	}

	public String getCycleType() {
		return cycleType;
	}

	public void setCycleType(String cycleType) {
		this.cycleType = cycleType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getTargetValue() {
		return targetValue;
	}

	public void setTargetValue(String targetValue) {
		this.targetValue = targetValue;
	}

}
