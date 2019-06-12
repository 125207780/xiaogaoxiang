package com.bonc.task.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bonc.task.dao.entity.TaskBase;
import com.bonc.task.dao.entity.TaskProblem;
import com.github.pagehelper.Page;

public interface TaskManagerMapper {
	
	/**
	 * 查询我创建的任务
	 * @param userId
	 * @return
	 */
	public List<TaskBase> getTaskCreateInfo(TaskBase taskBase);
	
	/**
	 * 查询我执行的任务
	 * @param userId
	 * @return
	 */
	public List<TaskBase> getTaskHandleInfo(TaskBase taskBase);
	
	/**
	 * 查询取消的任务
	 * @param taskBase
	 * @return
	 */
	public List<TaskBase> getTaskHistoryInfo(TaskBase taskBase);
	
	/**
	 * 监控
	 * @param taskBase
	 * @return
	 */
	public void updateListener(TaskBase taskBase);

	/**
	 * 取消任务
	 * @param taskBase
	 */
	public void cancelTask(TaskBase taskBase);
	
	/**
	 * 恢复人物
	 * @param taskBase
	 */
	public void recoveryTask(TaskBase taskBase);
	
	/**
	 * 查看问题列表
	 * @param taskProblem
	 * @return
	 */
	public List<TaskProblem> getTaskProblem(TaskProblem taskProblem);
}
