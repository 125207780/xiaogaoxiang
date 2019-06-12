package com.bonc.exam.dao.entity;

/**
 * 网格考核模块
 * 
 * @author luxing@bonc.com.cn
 *
 */

// 对应数据库的表是evaluation_kpi
public class KpiIndex {
	// 指标主键id
	private String kpiId;
	// 指标分类
	private String kpiType;
	// 指标名称
	private String kpiName;
	// 权重
	private Integer kpiWeight;
	// 指标定义
	private String kpiDefine;
	// 周期类型
	private String cycleType;

	// 构造方法
	public KpiIndex() {
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

	public Integer getKpiWeight() {
		return kpiWeight;
	}

	public void setKpiWeight(Integer kpiWeight) {
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

	@Override
	public String toString() {
		return "KpiIndex [kpiId=" + kpiId + ", kpiType=" + kpiType + ", kpiName=" + kpiName + ", kpiWeight=" + kpiWeight + ", kpiDefine=" + kpiDefine
				+ ", cycleType=" + cycleType + "]";
	}

}
