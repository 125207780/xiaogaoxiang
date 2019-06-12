package com.bonc.task.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.task.dao.entity.TaskBase;
import com.bonc.task.dao.entity.TaskListener;
import com.bonc.task.dao.mapper.TaskManagerMapper;

@Service
public class TaskManagerService {

	@Resource
	private TaskManagerMapper mapper;

	@Resource
	private KpiManagerService kpiManagerService;

	public TaskManagerMapper getMapper() {
		return mapper;
	}

	public List<TaskBase> getTaskCreateInfo(TaskBase taskBase) {
		List<TaskBase> list = mapper.getTaskCreateInfo(taskBase);
		return list;
	}
	/*
	 * public List<TaskBase> getTaskHandleInfo(TaskBase taskBase,String orgId){
	 * SysOrg orgLevel = kpiManagerService.getMapper().getOrgLevel(orgId);
	 * return mapper.getTaskHandleInfo(taskBase, orgLevel.getOrgLevel(),orgId);
	 * 
	 * }
	 */

	public void updateListener(TaskBase taskBase, String orgId) {
		SysOrg sysOrg = kpiManagerService.getMapper().getOrgLevel(orgId);
		taskBase.setOrgLevel(sysOrg.getOrgLevel());
		this.mapper.updateListener(taskBase);
		if (sysOrg != null && "2".equals(sysOrg.getOrgLevel())) {
			this.mapper.addTaskMonitorInfoByCityId(sysOrg.getOrgLevel(), orgId);
			this.mapper.addTaskMonitorInfoByAreaId(sysOrg.getOrgLevel(), orgId);
			this.mapper.addTaskMonitorInfoByGridCode(sysOrg.getOrgLevel(), orgId);
		}
		if (sysOrg != null && "3".equals(sysOrg.getOrgLevel())) {
			this.mapper.addTaskMonitorInfoByAreaId(sysOrg.getOrgLevel(), orgId);
			this.mapper.addTaskMonitorInfoByGridCode(sysOrg.getOrgLevel(), orgId);
		}
		if (sysOrg != null && "4".equals(sysOrg.getOrgLevel())) {
			this.mapper.addTaskMonitorInfoByGridCode(sysOrg.getOrgLevel(), orgId);
		}
	}

	public void cancelTask(TaskBase taskBase, String orgId) {
		SysOrg orgLevel = kpiManagerService.getMapper().getOrgLevel(orgId);
		taskBase.setOrgLevel(orgLevel.getOrgLevel());
		this.mapper.cancelTask(taskBase);
		String monitorCode = "";
		String activityId = taskBase.getActivityId();
		String campaignId = taskBase.getCampaignId();
		monitorCode = orgId + "-" + activityId + "-" + campaignId;
		TaskListener taskListener = mapper.findTreeCodeByOrgIdAndMonitorCode(orgId, monitorCode);
		if (taskListener != null) {
			this.mapper.deleteTaskMonitorInfoByTreeCode(taskListener.getTreeCode());
		}

	}
}
