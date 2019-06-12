package com.bonc.activiti.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 流程自定义参数
 * @author SC
 *
 */
public class LocalProcessVariables implements Serializable{
	
	/**
	 * serial ID
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 关联的业务ID
	 */
    private String id;

	private String copy;
	
	public String getCopy() {
		return copy;
	}
	public void setCopy(String copy) {
		this.copy = copy;
	}
	/**
     * 创建人ID
     */
    private String creatorId;
    /**
     * 创建人姓名
     */
    private String creatorName;
    /**
     * 流程相关的业务标识
     */
    private String className;
    /**
     * 流程审批时回调的接口
     */
	private String classPath;	
	/**
	 * 待办展里的详情页信息
	 */
	private String url;
	/**
	 * 流程启动时传入的ID
	 */
	private String LocalProcessId;
	/**
	 * taskId(暂用)
	 */
	private String taskId;
	/**
	 * 流程业务名称，写明白申请的是什么东西
	 */
	private String processName;
	/**
	 * 流程发起时写入的备注，如果没用的话，
	 * 就写得和processName一样.反正不是空就行。
	 */
	private String processDesc;
    /**
     * 标准流程状态，在流转时进行更新 
     * start,complete,
     */
	private String processState;
	
	/** 
	 * 流程有互斥分支时需要的变量
	 * @author sunce
	 * @return 
	 * @since JDK 1.6
	 */
	private String condition;
	
	/**
	 * 发起流程要设置的业务流程变量
	 */
	private List<?> businessInfo;
	/**
	 * 审核状态
	 */
	private String approval;
	
	public List<?> getBusinessInfo() {
		return businessInfo;
	}
	public String getApproval() {
		return approval;
	}
	public void setApproval(String approval) {
		this.approval = approval;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public void setBusinessInfo(List<?> businessInfo) {
		this.businessInfo = businessInfo;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCreatorId() {
		return creatorId;
	}
	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}
	public String getCreatorName() {
		return creatorName;
	}
	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getClassPath() {
		return classPath;
	}
	public void setClassPath(String classPath) {
		this.classPath = classPath;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getLocalProcessId() {
		return LocalProcessId;
	}
	public void setLocalProcessId(String localProcessId) {
		LocalProcessId = localProcessId;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getProcessDesc() {
		return processDesc;
	}
	public void setProcessDesc(String processDesc) {
		this.processDesc = processDesc;
	}
	public String getProcessState() {
		return processState;
	}
	public void setProcessState(String processState) {
		this.processState = processState;
	}
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
}
