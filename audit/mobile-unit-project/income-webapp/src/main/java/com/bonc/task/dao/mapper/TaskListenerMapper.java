package com.bonc.task.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.task.dao.entity.TaskBase;
import com.bonc.task.dao.entity.TaskListener;
import com.bonc.task.dao.entity.TaskListenerBase;

public interface TaskListenerMapper {
	
	/**
	 * 查询监控的任务
	 * @param userId
	 * @return
	 */
	public List<TaskListener> getTaskListenerTree(String userId);
	
	public List<TaskListenerBase> getTaskBaseInfo(@Param("userId")String userId,@Param("monitorCode")String monitorCode);

}
