package com.bonc.task.dao.entity;

/**
 * 问题列表实体类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
public class TaskProblem {

	private String taskCode;
	private String taskName;
	private String problemType;
	private String problemDesc;
	private String recodeDate;
	private String recoder;
	private String isSolve;

	public String getTaskCode() {
		return taskCode;
	}

	public void setTaskCode(String taskCode) {
		this.taskCode = taskCode;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getProblemType() {
		return problemType;
	}

	public void setProblemType(String problemType) {
		this.problemType = problemType;
	}

	public String getProblemDesc() {
		return problemDesc;
	}

	public void setProblemDesc(String problemDesc) {
		this.problemDesc = problemDesc;
	}

	public String getRecodeDate() {
		return recodeDate;
	}

	public void setRecodeDate(String recodeDate) {
		this.recodeDate = recodeDate;
	}

	public String getRecoder() {
		return recoder;
	}

	public void setRecoder(String recoder) {
		this.recoder = recoder;
	}

	public String getIsSolve() {
		return isSolve;
	}

	public void setIsSolved(String isSolve) {
		this.isSolve = isSolve;
	}

}
