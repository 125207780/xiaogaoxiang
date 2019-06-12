/**
 * 
 */
package com.bonc.system.bean;

/**
 * @author songhao
 *
 */
public class Logger {

	/**
	 * 日志ID
	 */
	private String id;
	
	/**操作人ID
	 */
	private String userId;
	
	/**操作人名称
	 */
	private String userName;
	
	/**
	 * 操作人IP
	 */
	private String userIp;
	
	/**
	 * 数据ID
	 */
	private String dataId;
	
	/**
	 * 方法名
	 */
	private String methodName;
	
	/**
	 * 类名
	 */
	private String actionName;
	
	/**
	 * 是否成功
	 */
	private int success;
	
	/**
	 * 操作时间
	 */
	private String opTime;
	
	/**
	 * 参数
	 */
	private String param;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getUserIp() {
		return userIp;
	}

	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

	public String getDataId() {
		return dataId;
	}

	public void setDataId(String dataId) {
		this.dataId = dataId;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public int getSuccess() {
		return success;
	}

	public void setSuccess(int success) {
		this.success = success;
	}

	public String getOpTime() {
		return opTime;
	}

	public void setOpTime(String opTime) {
		this.opTime = opTime;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}
}
