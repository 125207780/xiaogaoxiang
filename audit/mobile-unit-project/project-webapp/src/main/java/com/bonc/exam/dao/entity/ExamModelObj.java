package com.bonc.exam.dao.entity;

/**
 * 网格考核模块
 * 
 * @author luxing@bonc.com.cn
 *
 */

// 对象数据库的表是 evaluation_model_obj
public class ExamModelObj {
	// 模板id
	private String examId;
	// 对象id
	private String objectId;
	// 对象类型
	private String objectType;

	// 构造
	public ExamModelObj() {
	}

	public String getExamId() {
		return examId;
	}

	public void setExamId(String examId) {
		this.examId = examId;
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

	@Override
	public String toString() {
		return "ExamModelObj [examId=" + examId + ", objectId=" + objectId + ", objectType=" + objectType + "]";
	}

}
