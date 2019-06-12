package com.bonc.exam.dao.entity;

/**
 * 网格考核模块
 * 
 * @author luxing@bonc.com.cn
 *
 */

// 对象数据库的表是 evaluation_model_kpi
public class ExamModelKpi {
	// 主键id
	private String id;
	// 指标id
	private String kpiId;
	// 规则json字符串
	private String kpiRoleJson;
	// 指标分类
	private String kpiType;
	// 指标名称
	private String kpiName;
	// 权重
	private String kpiWeight;
	// 指标定义
	private String kpiDefine;
	// 周期类型
	private String cycleType;
	// 考核规则
	private String kpiRoleStr;
	// 模板id
	private String examId;

	public ExamModelKpi() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKpiId() {
		return kpiId;
	}

	public void setKpiId(String kpiId) {
		this.kpiId = kpiId;
	}

	public String getKpiRoleJson() {
		return kpiRoleJson;
	}

	public void setKpiRoleJson(String kpiRoleJson) {
		this.kpiRoleJson = kpiRoleJson;
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

	public String getKpiRoleStr() {
		return kpiRoleStr;
	}

	public void setKpiRoleStr(String kpiRoleStr) {
		this.kpiRoleStr = kpiRoleStr;
	}

	public String getExamId() {
		return examId;
	}

	public void setExamId(String examId) {
		this.examId = examId;
	}

	@Override
	public String toString() {
		return "ExamModelKpi [id=" + id + ", kpiId=" + kpiId + ", kpiRoleJson=" + kpiRoleJson + ", kpiType=" + kpiType + ", kpiName=" + kpiName + ", kpiWeight="
				+ kpiWeight + ", kpiDefine=" + kpiDefine + ", cycleType=" + cycleType + ", kpiRoleStr=" + kpiRoleStr + ", examId=" + examId + "]";
	}

}
