package com.bonc.activiti.service;

import com.bonc.activiti.entity.LocalProcessVariables;

public interface IProcessInterface {
	/**
	 * 工作流审批结束
	 * @param task
	 */
	public void complete(LocalProcessVariables localProcessVariables);
	/**
	 * 工作流发起
	 * @param task
	 */
	public void start(LocalProcessVariables localProcessVariables);
	/**
	 * 工作流执行中
	 * @param task
	 */
	public void handling(LocalProcessVariables localProcessVariables);
	/**
	 * 工作流回退到发起人
	 * @param task
	 */
	public void rejectStart(LocalProcessVariables localProcessVariables);
	/**
	 * 工作流作废
	 * @param task
	 */
	public void end(LocalProcessVariables localProcessVariables);
	/**
	 * 工作流回退上一步
	 * @param task
	 */
	public void rejectPre(LocalProcessVariables localProcessVariables);
}
