package com.bonc.task.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.task.dao.entity.TaskBase;
import com.bonc.task.dao.entity.TaskListener;
import com.bonc.task.dao.entity.TaskListenerBase;
import com.bonc.task.dao.mapper.TaskListenerMapper;
import com.bonc.task.dao.mapper.TaskManagerMapper;

@Service
public class TaskListenerService {
	
	@Resource
	private TaskListenerMapper taskListenerMapper;
	
	public List<TaskListener> getTaskListenerTree(String userId){
		List<TaskListener> list =  this.taskListenerMapper.getTaskListenerTree(userId);
		return list;
	}
	
	public List<TaskListenerBase> getTaskBaseInfo(String userId,String monitorCode){
		List<TaskListenerBase> taskBaseInfo = this.taskListenerMapper.getTaskBaseInfo(userId, monitorCode);
		return taskBaseInfo;
		
	}
	
}
