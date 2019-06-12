package com.bonc.exam.dao.entity;

/**
 * 网格考核模块
 * 
 * @author luxing@bonc.com.cn
 *
 */

// 对应数据库的表是exam_model
public class ExamModel {
	private String id;
	// 周期类型
	private String cycleType;
	// 考核周期
	private String examCycle;
	// 创建时间
	private String createTime;
	// 创建人
	private String createPerson;
	// 模板描述
	private String templateDescription;
	// 对象类型
	private String createObject;

	// 周期开始时间，
	private String startDate;
	// 周期结束时间
	private String endDate;
	// 网格名称
	private String gridName;
	// 这个字段只是页面用的(考核对象)，对象数据库的是对象名称的集合
	private String examObjectList;

	// 构造方法
	public ExamModel() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCycleType() {
		return cycleType;
	}

	public void setCycleType(String cycleType) {
		this.cycleType = cycleType;
	}

	public String getExamCycle() {
		return examCycle;
	}

	public void setExamCycle(String examCycle) {
		this.examCycle = examCycle;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getCreatePerson() {
		return createPerson;
	}

	public void setCreatePerson(String createPerson) {
		this.createPerson = createPerson;
	}

	public String getTemplateDescription() {
		return templateDescription;
	}

	public void setTemplateDescription(String templateDescription) {
		this.templateDescription = templateDescription;
	}

	public String getCreateObject() {
		return createObject;
	}

	public void setCreateObject(String createObject) {
		this.createObject = createObject;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getGridName() {
		return gridName;
	}

	public void setGridName(String gridName) {
		this.gridName = gridName;
	}

	public String getExamObjectList() {
		return examObjectList;
	}

	public void setExamObjectList(String examObjectList) {
		this.examObjectList = examObjectList;
	}

	private String objectTypeNew;

	private String cycleTypeNew;

	public String getObjectTypeNew() {
		return objectTypeNew;
	}

	public void setObjectTypeNew(String objectTypeNew) {
		this.objectTypeNew = objectTypeNew;
	}

	public String getCycleTypeNew() {
		return cycleTypeNew;
	}

	public void setCycleTypeNew(String cycleTypeNew) {
		this.cycleTypeNew = cycleTypeNew;
	}

	@Override
	public String toString() {
		return "ExamModel [id=" + id + ", cycleType=" + cycleType + ", examCycle=" + examCycle + ", createTime=" + createTime + ", createPerson=" + createPerson
				+ ", templateDescription=" + templateDescription + ", createObject=" + createObject + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", gridName=" + gridName + ", examObjectList=" + examObjectList + "]";
	}

}
