package com.bonc.exam.dao.entity;

/**
 * 考核指标
 * 
 * @author liulin@bonc.com.cn
 *
 */

public class EvaluationKpi {

	private String kpiId;
	private String kpiType;
	private String kpiName;
	private String kpiWeight;
	private String kpiDefine;
	private String cycleType;

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

}
