package com.bonc.task.dao.entity;

/**
 * 任务信息实体类
 * @author yangdong@bonc.com.cn
 *
 */
public class TaskBase {
	
	private String userId;
	private String taskCode;
	private String taskName;
	private String taskType;
	private String taskBigtype;
	private String taskSmalltype;
	private String taskTargetDesc;
	private String taskCreater;
	private String createrOwner;
	private String taskSender;
	private String taskHandler;
	private String taskOwner;
	private String taskStatus;
	private String handleDate;
	private String createDate;
	private String finishDate;
	private String taskTarget;
	private String finishState;
	private String problemRecode;
	private String isMonitor;
	private String offMonitorDate;
	private String evaluateDate;
	private String touchWay;
	private String marketingPlan;
	
	public String getTaskCreater() {
		return taskCreater;
	}
	public void setTaskCreater(String taskCreater) {
		this.taskCreater = taskCreater;
	}
	public String getCreaterOwer() {
		return createrOwner;
	}
	public void setCreaterOwer(String createrOwner) {
		this.createrOwner = createrOwner;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getTaskType() {
		return taskType;
	}
	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}
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
	public String getTaskBigtype() {
		return taskBigtype;
	}
	public void setTaskBigtype(String taskBigtype) {
		this.taskBigtype = taskBigtype;
	}
	public String getTaskSmalltype() {
		return taskSmalltype;
	}
	public void setTaskSmalltype(String taskSmalltype) {
		this.taskSmalltype = taskSmalltype;
	}
	public String getTaskTargetDesc() {
		return taskTargetDesc;
	}
	public void setTaskTargetDesc(String taskTargetDesc) {
		this.taskTargetDesc = taskTargetDesc;
	}
	public String getTaskSender() {
		return taskSender;
	}
	public void setTaskSender(String taskSender) {
		this.taskSender = taskSender;
	}
	public String getTaskHandler() {
		return taskHandler;
	}
	public void setTaskHandler(String taskHandler) {
		this.taskHandler = taskHandler;
	}
	public String getTaskOwner() {
		return taskOwner;
	}
	public void setTaskOwner(String taskOwner) {
		this.taskOwner = taskOwner;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	public String getHandleDate() {
		return handleDate;
	}
	public void setHandleDate(String handleDate) {
		this.handleDate = handleDate;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getFinishDate() {
		return finishDate;
	}
	public void setFinishDate(String finishDate) {
		this.finishDate = finishDate;
	}
	public String getTaskTarget() {
		return taskTarget;
	}
	public void setTaskTarget(String taskTarget) {
		this.taskTarget = taskTarget;
	}
	public String getFinishState() {
		return finishState;
	}
	public void setFinishState(String finishState) {
		this.finishState = finishState;
	}
	public String getProblemRecode() {
		return problemRecode;
	}
	public void setProblemRecode(String problemRecode) {
		this.problemRecode = problemRecode;
	}
	public String getIsMonitor() {
		return isMonitor;
	}
	public void setIsMonitor(String isMonitor) {
		this.isMonitor = isMonitor;
	}
	public String getOffMonitorDate() {
		return offMonitorDate;
	}
	public void setOffMonitorDate(String offMonitorDate) {
		this.offMonitorDate = offMonitorDate;
	}
	public String getEvaluateDate() {
		return evaluateDate;
	}
	public void setEvaluateDate(String evaluateDate) {
		this.evaluateDate = evaluateDate;
	}
	public String getTouchWay() {
		return touchWay;
	}
	public void setTouchWay(String touchWay) {
		this.touchWay = touchWay;
	}
	public String getMarketingPlan() {
		return marketingPlan;
	}
	public void setMarketingPlan(String marketingPlan) {
		this.marketingPlan = marketingPlan;
	}
	
	
	private String startTime;
	private String endTime;
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
}
