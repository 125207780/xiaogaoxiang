package com.bonc.task.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.system.dao.entity.SysUser;
import com.bonc.task.dao.entity.TaskListener;

public interface TaskListenerMapper {

	/**
	 * 查询监控的任务
	 * 
	 * @param userId
	 * @return
	 */
	public List<TaskListener> getTaskListenerTree(TaskListener taskListener);

	public List<TaskListener> selectTaskListenerById(String orgId);

	public TaskListener getTaskListenerInfo(@Param("monitorCode") String monitorCode);

	public void addGridItemInfo(TaskListener taskListener);

	public List<SysUser> getSysUserInfo(String orgId);

	public void addLeaderAdviceInfo(TaskListener taskListener);

}
