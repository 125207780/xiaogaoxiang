package com.bonc.exam.dao.entity;

/**
 * 总得分网格排名
 * 
 * @author liulin@bonc.com.cn
 *
 */

public class GridRank {
	private String evaluateCycleType;
	private String evaluateCycle;
	private String gridCode;
	private String gridName;
	private String gridType;
	private double checkScore;
	private String kpiId;
	private String kpiName;
	private String id;
	private String status;
	private int rowNum;
	private double kpiScore;
	private String objectId;
	private String objectType;
	private String objectName;

	public double getKpiScore() {
		return kpiScore;
	}

	public void setKpiScore(double kpiScore) {
		this.kpiScore = kpiScore;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
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

	public double getCheckScore() {
		return checkScore;
	}

	public void setCheckScore(double checkScore) {
		this.checkScore = checkScore;
	}

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
