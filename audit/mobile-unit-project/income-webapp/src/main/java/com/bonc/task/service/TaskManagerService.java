package com.bonc.task.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.task.dao.mapper.TaskManagerMapper;

@Service
public class TaskManagerService {
	
	@Resource
	private TaskManagerMapper mapper;
	
	public TaskManagerMapper getMapper(){
		return mapper;
	}
}
