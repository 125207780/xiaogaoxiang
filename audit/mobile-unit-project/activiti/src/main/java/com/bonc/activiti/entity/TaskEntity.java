package com.bonc.activiti.entity;

import java.io.Serializable;
import java.util.Map;

public class TaskEntity implements Serializable{
	/**
	 * serial ID
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 任务id
	 */
	private String taskId;
	/**
	 * 任务名称
	 */
    private String taskName;
    /**
     * 任务描述
     */
    private String description;
    /**
     * 优先级
     */
    private String priority;
    /**
     * 拥有者
     */
    private String owner;
    /**
     * 处理人
     */
    private String assignee;
    /**
     * 处理人姓名
     */
    private String assigneeName;
    /**
     * 流程ID
     */
    private String processInstanceId;
    /**
     * 执行ID
     */
    private String executionId;
    /**
     * 流程定义ID
     */
    private String processDefinitionId;
    /**
     * 创建时间
     */
    private String createTime;
    /**
     * 结束时间
     */
    private String endTime;
    /**
     * 定义ID
     */
    private String taskDefinitionKey;
    /**
     * 处理时间
     */
    private String dueDate;
    /**
     * 父任务ID
     */
    private String parentTaskId;
    /**
     * 是否挂起
     */
    private Boolean isSuspended;
    /**
     * 任务变量
     */
    private LocalTaskVariables taskLocalVariables;
    /**
     * 流程变量
     */
    private Map<String, Object> processVariables;
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getAssignee() {
		return assignee;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public String getAssigneeName() {
		return assigneeName;
	}
	public void setAssigneeName(String assigneeName) {
		this.assigneeName = assigneeName;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	public String getExecutionId() {
		return executionId;
	}
	public void setExecutionId(String executionId) {
		this.executionId = executionId;
	}
	public String getProcessDefinitionId() {
		return processDefinitionId;
	}
	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getTaskDefinitionKey() {
		return taskDefinitionKey;
	}
	public void setTaskDefinitionKey(String taskDefinitionKey) {
		this.taskDefinitionKey = taskDefinitionKey;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getParentTaskId() {
		return parentTaskId;
	}
	public void setParentTaskId(String parentTaskId) {
		this.parentTaskId = parentTaskId;
	}
	public Boolean getIsSuspended() {
		return isSuspended;
	}
	public void setIsSuspended(Boolean isSuspended) {
		this.isSuspended = isSuspended;
	}
	public LocalTaskVariables getTaskLocalVariables() {
		return taskLocalVariables;
	}
	public void setTaskLocalVariables(LocalTaskVariables taskLocalVariables) {
		this.taskLocalVariables = taskLocalVariables;
	}
	public Map<String, Object> getProcessVariables() {
		return processVariables;
	}
	public void setProcessVariables(Map<String, Object> processVariables) {
		this.processVariables = processVariables;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
