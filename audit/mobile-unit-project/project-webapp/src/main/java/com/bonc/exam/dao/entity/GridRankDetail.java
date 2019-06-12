package com.bonc.exam.dao.entity;

/**
 * 单项指标网格排名
 * 
 * @author liulin@bonc.com.cn
 *
 */

public class GridRankDetail {

	private String evaluateCycleType;
	private String evaluateCycle;
	private String gridCode;
	private String gridName;
	private String gridType;
	private String kpiId;
	private String kpiName;
	private double kpiScore;
	private String rankId;
	private String objectId;
	private String objectName;
	private String objectType;
	private int rowNum;

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getEvaluateCycleType() {
		return evaluateCycleType;
	}

	public void setEvaluateCycleType(String evaluateCycleType) {
		this.evaluateCycleType = evaluateCycleType;
	}

	public String getEvaluateCycle() {
		return evaluateCycle;
	}

	public void setEvaluateCycle(String evaluateCycle) {
		this.evaluateCycle = evaluateCycle;
	}

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public String getGridName() {
		return gridName;
	}

	public void setGridName(String gridName) {
		this.gridName = gridName;
	}

	public String getGridType() {
		return gridType;
	}

	public void setGridType(String gridType) {
		this.gridType = gridType;
	}

	public String getKpiId() {
		return kpiId;
	}

	public void setKpiId(String kpiId) {
		this.kpiId = kpiId;
	}

	public String getKpiName() {
		return kpiName;
	}

	public void setKpiName(String kpiName) {
		this.kpiName = kpiName;
	}

	public double getKpiScore() {
		return kpiScore;
	}

	public void setKpiScore(double kpiScore) {
		this.kpiScore = kpiScore;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

	public String getRankId() {
		return rankId;
	}

	public void setRankId(String rankId) {
		this.rankId = rankId;
	}

}
