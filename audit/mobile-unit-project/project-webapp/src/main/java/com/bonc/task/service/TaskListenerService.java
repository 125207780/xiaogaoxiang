package com.bonc.task.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.DateUtil;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.task.dao.entity.TaskListener;
import com.bonc.task.dao.mapper.TaskListenerMapper;

@Service
public class TaskListenerService {

	@Resource
	private TaskListenerMapper taskListenerMapper;

	public List<TaskListener> getTaskListenerTree(TaskListener taskListener) {
		List<TaskListener> list = this.taskListenerMapper.getTaskListenerTree(taskListener);
		return list;
	}

	public List<TaskListener> selectTaskListenerById(String orgId) {
		List<TaskListener> taskListener = this.taskListenerMapper.selectTaskListenerById(orgId);
		return taskListener;
	}

	public TaskListener getTaskListenerInfo(String monitorCode) {
		TaskListener taskBaseInfo = this.taskListenerMapper.getTaskListenerInfo(monitorCode);
		return taskBaseInfo;

	}

	public void addGridItemInfo(HttpSession session, String monitorCode) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		if (user != null && !StringUtils.isBlank(user.getUserId())) {
			if (monitorCode != null && !monitorCode.isEmpty()) {
				TaskListener taskBaseInfo = this.taskListenerMapper.getTaskListenerInfo(monitorCode);
				List<SysUser> sysUserInfo = taskListenerMapper.getSysUserInfo(taskBaseInfo.getOrgId());
				for (SysUser sysUser : sysUserInfo) {
					TaskListener taskListener = new TaskListener();
					taskListener.setOrgName(user.getUserName());// 当前登入人
					taskListener.setUserId(sysUser.getUserId());
					taskListener.setUserName(sysUser.getUserName());
					taskListener.setItemCode(UUID.randomUUID().toString().replaceAll(" ", "-"));
					taskListener.setActivityName(taskBaseInfo.getActivityName());
					taskListener.setLeaderAdvice(taskBaseInfo.getLeaderAdvice());
					taskListenerMapper.addGridItemInfo(taskListener);
				}
			}
		}
	}

	public void addLeaderAdviceInfo(String monitorCode, String leaderAdvice) {
		if (monitorCode != null && !monitorCode.isEmpty()) {
			TaskListener taskListener = new TaskListener();
			taskListener.setLeaderAdvice(leaderAdvice);
			taskListener.setMonitorCode(monitorCode);
			taskListener.setCreateDate(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
			taskListenerMapper.addLeaderAdviceInfo(taskListener);
		}

	}

}
