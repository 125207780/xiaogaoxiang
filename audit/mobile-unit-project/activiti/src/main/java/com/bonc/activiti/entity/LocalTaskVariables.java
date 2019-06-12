package com.bonc.activiti.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 任务自定义参数
 * 
 * @author SC
 *
 */
public class LocalTaskVariables implements Serializable {
	/**
	 * serial ID
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 用户id
	 */
	private String userId;
	/**
	 * 任务类型
	 */
	private String taskType;
	/**
	 * 审批人id
	 */
	private String auditId;
	/**
	 * 工单id
	 */
	private String workOrderId;
	/**
	 * 工单名称
	 */
	private String workOrderName;
	/**
	 * 审批人姓名
	 */
	private String userName;
	/**
	 * 问题原因（整改人）
	 */
	private String reason;
	/**
	 * 整改措施（整改人）
	 */
	private String rectifyInfo;
	/**
	 * 改进措施（整改人）
	 */
	private String improveInfo;
	/**
	 * 文件
	 */
	private String fileName;
	/**
	 * 忽略说明（整改人）
	 */
	private String ignoreInfo;
	/**
	 * 整改说明（审批人）
	 */
	private String auditInfo;
	/**
	 * 整改说明（回退人）
	 */
	private String rollbackInfo;
	/**
	 * 回退机构id（回退人）
	 */
	private String orgId;
	/**
	 * 流程id
	 */
	private String procId;
	/**
	 * 审批动作：0,通过,1,退回上一步,2,退回发起人,3,作废,
	 */
	private String approval;
	/**
	 * 电话号码
	 */
	private String teleNo;
	/**
	 * 任务开始
	 */
	private String createTime;
	/**
	 * 任务开始
	 */
	private String url;
	/**
	 * 发起流程要设置的业务流程变量
	 */
	private List<?> businessInfo;
	/**
	 * 自定义变量
	 */
	private Map<String, Object> taskVariables;

	private String taskId;

	public String getWorkOrderId() {
		return workOrderId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getProcId() {
		return procId;
	}

	public void setProcId(String procId) {
		this.procId = procId;
	}

	public void setWorkOrderId(String workOrderId) {
		this.workOrderId = workOrderId;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getAuditId() {
		return auditId;
	}

	public String getRectifyInfo() {
		return rectifyInfo;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setRectifyInfo(String rectifyInfo) {
		this.rectifyInfo = rectifyInfo;
	}

	public String getImproveInfo() {
		return improveInfo;
	}

	public void setImproveInfo(String improveInfo) {
		this.improveInfo = improveInfo;
	}


	public String getIgnoreInfo() {
		return ignoreInfo;
	}

	public void setIgnoreInfo(String ignoreInfo) {
		this.ignoreInfo = ignoreInfo;
	}

	public String getWorkOrderName() {
		return workOrderName;
	}

	public void setWorkOrderName(String workOrderName) {
		this.workOrderName = workOrderName;
	}

	public String getAuditInfo() {
		return auditInfo;
	}

	public void setAuditInfo(String auditInfo) {
		this.auditInfo = auditInfo;
	}

	public String getRollbackInfo() {
		return rollbackInfo;
	}

	public void setRollbackInfo(String rollbackInfo) {
		this.rollbackInfo = rollbackInfo;
	}

	public void setAuditId(String auditId) {
		this.auditId = auditId;
	}

	public String getTaskType() {
		return taskType;
	}

	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}

	public List<?> getBusinessInfo() {
		return businessInfo;
	}

	public void setBusinessInfo(List<?> businessInfo) {
		this.businessInfo = businessInfo;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getApproval() {
		return approval;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public void setApproval(String approval) {
		this.approval = approval;
	}

	public Map<String, Object> getTaskVariables() {
		return taskVariables;
	}

	public void setTaskVariables(Map<String, Object> taskVariables) {
		this.taskVariables = taskVariables;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getTeleNo() {
		return teleNo;
	}

	public void setTeleNo(String teleNo) {
		this.teleNo = teleNo;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
}
