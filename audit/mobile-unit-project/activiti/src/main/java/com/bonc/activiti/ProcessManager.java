package com.bonc.activiti;

import java.beans.IntrospectionException;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.bonc.activiti.entity.LocalTaskVariables;
import com.bonc.activiti.entity.TaskEntity;
import com.bonc.activiti.service.BaseProcessService;
import com.bonc.test.util.ObjectUtil;
import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.FlowElement;
import org.activiti.bpmn.model.GraphicInfo;
import org.activiti.bpmn.model.Process;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ModelEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmActivity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.pvm.process.ProcessDefinitionImpl;
import org.activiti.engine.impl.pvm.process.TransitionImpl;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ModelQuery;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceQuery;
import org.activiti.engine.task.Task;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.activiti.entity.LocalProcessVariables;


 

public class ProcessManager {
	
	 
	private RuntimeService runtimeService;
	
	 
	private IdentityService identityService;
	
	 
	private ProcessEngine processEngine;
	
	 
	private BaseProcessService baseProcessService;
	
	 
	private RepositoryService repositoryService;
	
	/**
	 * 启动工作流
	 * @param applyId
	 * @param processId
	 * @param owner
	 * @param param
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public String startWorkFlow(String applyId, String processId, LocalProcessVariables localProcessVariables) {		
		try {
			Map<String,Object> param = null;
			localProcessVariables.setProcessState("start");			
			param = ObjectUtil.convertBean(localProcessVariables);
	    	identityService.setAuthenticatedUserId(localProcessVariables.getCreatorId());//设置流程发起人
			baseProcessService.updateProjectPhase("start", localProcessVariables);//更新业务表中的流程状态
			ProcessInstance processInstance = runtimeService.startProcessInstanceById(processId, applyId, param);	
			return processInstance.getId();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (IntrospectionException e) {
			e.printStackTrace();
		}
		return null;		
	}
	
	/**
	 * 启动工作流
	 * @param applyId
	 * @param processId
	 * @param owner
	 * @param param
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public void setVariables(String executionId, LocalProcessVariables localProcessVariables) throws Exception {		
		try {
			Map<String,Object> param = null;
			param = ObjectUtil.convertBean(localProcessVariables);
			runtimeService.setVariable(executionId, "businessInfo", param.get("businessInfo"));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	/**
	 * 根据processInstanceId获取流程变量
	 * @param processInstanceId
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public LocalProcessVariables getProcessVariablesByProcessInstanceId(String processInstanceId) throws Exception {
		try {
			Map<String,Object> processVariable = null;
			LocalProcessVariables localProcessVariables = new LocalProcessVariables();
			try{
				//获取未完成的流程变量
				processVariable = processEngine.getRuntimeService().getVariables(processInstanceId);
			}catch(Exception e){
				e.printStackTrace();
			}
			if(processVariable==null){
			    HistoricVariableInstance historicVariableInstance = processEngine.getHistoryService().createHistoricVariableInstanceQuery().processInstanceId(processInstanceId).singleResult();
			    processVariable = (Map<String, Object>) historicVariableInstance.getValue();
			}
			localProcessVariables=(LocalProcessVariables) ObjectUtil.convertMap(LocalProcessVariables.class, processVariable);
			return localProcessVariables;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}	
	}
	
	/**
	 * 根据taskId获取流程变量
	 * @param taskId
	 * @return
	 */
	public LocalProcessVariables getProcessVariablesByTaskId(String taskId) {
		LocalProcessVariables localProcessVariables = new LocalProcessVariables();
		try{
			String processInstanceId = null;
		    Task task = processEngine.getTaskService().createTaskQuery().taskId(taskId).singleResult();
		    if(task==null){
		        HistoricTaskInstance historicTaskInstance = processEngine.getHistoryService().createHistoricTaskInstanceQuery().taskId(taskId).singleResult();
		        processInstanceId = historicTaskInstance.getProcessInstanceId();
		    }else{
		    	processInstanceId = task.getProcessInstanceId();
		    }
		    
		    localProcessVariables = getProcessVariablesByProcessInstanceId(processInstanceId);	
		}catch(Exception e){
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return localProcessVariables;
	}
	
	/**
	 * 根据taskId获取流程实例
	 * @param taskId
	 * @return
	 */
	public ProcessInstance getProcessInstanceByTaskId(String taskId){
		String processInstanceId = null;
		Task task = processEngine.getTaskService().createTaskQuery().taskId(taskId).singleResult();
		if(task==null){
		    HistoricTaskInstance historicTaskInstance = processEngine.getHistoryService().createHistoricTaskInstanceQuery().taskId(taskId).singleResult();
		    processInstanceId = historicTaskInstance.getProcessInstanceId();
		}else{
			processInstanceId = task.getProcessInstanceId();
		}
		ProcessInstanceQuery processInstanceQuery = processEngine.getRuntimeService().createProcessInstanceQuery().processInstanceId(processInstanceId);
		if(null == processInstanceQuery){
			return null;
		}else{
			return processInstanceQuery.singleResult();
		}
	}
	
/*	*//**
	 * 设置(流转中)的流程变量,
	 * 设置后会将之前设置的变量覆盖掉
	 * @param processInstanceId
	 * @param localProcessVariables
	 *//*
	public void setProcessVariables(String processInstanceId,LocalProcessVariables localProcessVariables) {
		try {
			Map<String,Object> variables = new HashMap<String,Object>();
			variables.put("LocalProcessVariables", localProcessVariables);
			processEngine.getRuntimeService().setVariables(processInstanceId, variables);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}*/
	
	/**
	 * 查询用户是否有待审批的任务
	 * @param userId
	 * @return
	 */
	public boolean validateUserIsAssignee(String userId){
		List<Task> list = processEngine.getTaskService().createTaskQuery().taskCandidateUser(userId).list();
		if(list!=null&&list.size()>0){
			return true;
		}else{
		    return false;
		}
	}
	
	/**
	 * 查询角色是否绑定流程
	 * @param roleId
	 * @return
	 */
	public boolean vaildateRoleIsCandidateGroup(String roleId){
		List<Task> list = processEngine.getTaskService().createTaskQuery().taskCandidateGroup(roleId).list();
		if(list!=null&&list.size()>0){
			return true;
		}else{
		    return false;
		}
	}
	
	/**
	 * 查询角色列表中是否绑定流程
	 * @param roleList
	 * @return
	 */
	public boolean vaildateRolesIsCandidateGroup(List<String> roleList){
		List<Task> list = processEngine.getTaskService().createTaskQuery().taskCandidateGroupIn(roleList).list();
		if(list!=null&&list.size()>0){
			return true;
		}else{
		    return false;
		}
	}
	
	/**
	 * 根据processInstanceId获取任务(task)列表
	 * @param processInstanceId
	 * @return
	 */
	public List<Task> selectTaskListByProcessInstanceId(String processInstanceId){
		List<Task> list = processEngine.getTaskService().createTaskQuery().processInstanceId(processInstanceId).list();
		return list;
	}
	/**
	 * 根据taskId获取task对象
	 * @param taskId
	 * @return
	 */
	public Task selectTaskByProcessTaskId(String taskId){
		Task task = processEngine.getTaskService().createTaskQuery().taskId(taskId).singleResult();
		return task;
	}
	
	
	public TaskEntity selectTaskByExecutionId(String executionId){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		TaskEntity taskEntity = new TaskEntity();	
		try{
			Task task = processEngine.getTaskService().createTaskQuery().executionId(executionId).singleResult();
			LocalTaskVariables localTaskVariables = (LocalTaskVariables)processEngine.getTaskService().getVariable(task.getId(), "LocalTaskVariables");
		    taskEntity.setTaskLocalVariables(localTaskVariables);
			taskEntity.setAssignee(task.getAssignee());
			taskEntity.setCreateTime(task.getCreateTime()==null?"":simpleDateFormat.format(task.getCreateTime()));
			taskEntity.setDescription(task.getDescription());
			taskEntity.setDueDate(task.getDueDate()==null?"":simpleDateFormat.format(task.getDueDate()));
			taskEntity.setExecutionId(task.getExecutionId());
			taskEntity.setTaskId(task.getId());
			taskEntity.setTaskName(task.getName());
			taskEntity.setOwner(task.getOwner());
		    taskEntity.setParentTaskId(task.getParentTaskId());
		    taskEntity.setPriority(String.valueOf(task.getPriority()));
		    taskEntity.setProcessDefinitionId(task.getProcessDefinitionId());
		    taskEntity.setProcessInstanceId(task.getProcessInstanceId());
		    taskEntity.setTaskDefinitionKey(task.getTaskDefinitionKey());		    
		    
		}catch(Exception exe){
			taskEntity = null;
		}
		return taskEntity;
	}
	/**
	 * 根据activitiId,processInstanceId获取流程变量
	 * @param activitiId
	 * @param processInstanceId
	 * @return
	 */
	public List<TaskEntity> selectTaskByActivitiId(String activitiId,String processInstanceId){
		List<HistoricActivityInstance> historicActivityInstances = null;
		List<TaskEntity> list = new ArrayList<TaskEntity>();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try{
		    historicActivityInstances = processEngine.getHistoryService().createHistoricActivityInstanceQuery().activityId(activitiId).processInstanceId(processInstanceId).list();
		}catch(Exception e){
			e.printStackTrace();
			historicActivityInstances = null;
		}
		TaskEntity taskEntity = null;
		if(null!=historicActivityInstances){			
			for(HistoricActivityInstance historicActivityInstance : historicActivityInstances){
				//调用子流程没有taskId，必须额外处理
				if (historicActivityInstance.getActivityId().contains("call")) {
					List<HistoricActivityInstance> historicActivityInstancesNew = processEngine.getHistoryService()
							.createHistoricActivityInstanceQuery()
							.processInstanceId(historicActivityInstance.getCalledProcessInstanceId()).list();
					for (HistoricActivityInstance historicActivityInstance2 : historicActivityInstancesNew) {
						if (historicActivityInstance2.getTaskId()!=null) {
							List<TaskEntity> tasks = selectTaskByTaskId(historicActivityInstance2.getTaskId(),historicActivityInstance2.getProcessInstanceId());
							list.addAll(tasks);
						}
					}
				}
				else {
					if (historicActivityInstance.getTaskId()!=null) {
						List<TaskEntity> tasks = selectTaskByTaskId(historicActivityInstance.getTaskId(),historicActivityInstance.getProcessInstanceId());
						list.addAll(tasks);
					}
				}
			}
		}else{
			List<Task> taskList = processEngine.getTaskService().createTaskQuery().processInstanceId(processInstanceId).active().list();
			for(Task task : taskList){
				try{
				    Execution execution = processEngine.getRuntimeService().createExecutionQuery().activityId(activitiId).executionId(task.getExecutionId()).processInstanceId(processInstanceId).singleResult();
				    if(null!=execution){
				    	taskEntity = new TaskEntity();
				    	taskEntity.setAssignee(task.getAssignee());
						taskEntity.setCreateTime(task.getCreateTime()==null?"":simpleDateFormat.format(task.getCreateTime()));
						taskEntity.setDescription(task.getDescription());
						taskEntity.setDueDate(task.getDueDate()==null?"":simpleDateFormat.format(task.getDueDate()));
						taskEntity.setExecutionId(task.getExecutionId());
						taskEntity.setTaskId(task.getId());
						taskEntity.setTaskName(task.getName());
						taskEntity.setOwner(task.getOwner());
					    taskEntity.setParentTaskId(task.getParentTaskId());
					    taskEntity.setPriority(String.valueOf(task.getPriority()));
					    taskEntity.setProcessDefinitionId(task.getProcessDefinitionId());
					    taskEntity.setProcessInstanceId(task.getProcessInstanceId());
					    taskEntity.setTaskDefinitionKey(task.getTaskDefinitionKey());
					    
					    list.add(taskEntity);
				    }
				}catch(Exception e){
					e.printStackTrace();
				}   
			}
		}
		return list;
	}
	/**
	 * 根据taskId,processInstanceId获取任务历史变量
	 * @param taskId
	 * @param processInstanceId
	 * @return
	 */
	public List<TaskEntity> selectTaskByTaskId(String taskId, String processInstanceId) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<TaskEntity> list = new ArrayList<TaskEntity>();
		try {
			List<HistoricTaskInstance> historicTaskInstanceList = processEngine.getHistoryService().createHistoricTaskInstanceQuery().taskId(taskId).processInstanceId(processInstanceId).list();
			for (HistoricTaskInstance task : historicTaskInstanceList) {
				TaskEntity outter = new TaskEntity();
				outter.setAssignee(task.getAssignee());
				outter.setCreateTime(task.getStartTime() == null ? "" : simpleDateFormat.format(task.getStartTime()));
				outter.setEndTime(task.getEndTime() == null ? "" : simpleDateFormat.format(task.getEndTime()));
				outter.setDescription(task.getDescription());
				outter.setDueDate(task.getDueDate() == null ? "" : simpleDateFormat.format(task.getDueDate()));
				outter.setExecutionId(task.getExecutionId());
				outter.setTaskId(task.getId());
				outter.setTaskName(task.getName());
				outter.setOwner(task.getOwner());
				outter.setParentTaskId(task.getParentTaskId());
				outter.setPriority(String.valueOf(task.getPriority()));
				outter.setProcessDefinitionId(task.getProcessDefinitionId());
				outter.setProcessInstanceId(task.getProcessInstanceId());
				outter.setTaskDefinitionKey(task.getTaskDefinitionKey());
				List<HistoricVariableInstance> historicVariableInstances = processEngine.getHistoryService().createHistoricVariableInstanceQuery().variableName(task.getId()).processInstanceId(processInstanceId).list();
				if (null != historicVariableInstances && historicVariableInstances.size() > 0) {
					for (HistoricVariableInstance historicVariableInstance : historicVariableInstances) {
						TaskEntity taskEntity = new TaskEntity();
					    taskEntity = outter;
						taskEntity.setTaskLocalVariables((LocalTaskVariables) historicVariableInstance.getValue());
						list.add(taskEntity);
					}
				}else{
					list.add(outter);
				}
			}
			if(historicTaskInstanceList==null||historicTaskInstanceList.size()<=0){
				List<Task> tasks = processEngine.getTaskService().createTaskQuery().taskId(taskId).processInstanceId(processInstanceId).list();
				for (Task task : tasks) {
					TaskEntity outter = new TaskEntity();
					outter.setAssignee(task.getAssignee());
					outter.setCreateTime(task.getCreateTime() == null ? "" : simpleDateFormat.format(task.getCreateTime()));
					outter.setDescription(task.getDescription());
					outter.setDueDate(task.getDueDate() == null ? "" : simpleDateFormat.format(task.getDueDate()));
					outter.setExecutionId(task.getExecutionId());
					outter.setTaskId(task.getId());
					outter.setTaskName(task.getName());
					outter.setOwner(task.getOwner());
					outter.setParentTaskId(task.getParentTaskId());
					outter.setPriority(String.valueOf(task.getPriority()));
					outter.setProcessDefinitionId(task.getProcessDefinitionId());
					outter.setProcessInstanceId(task.getProcessInstanceId());
					outter.setTaskDefinitionKey(task.getTaskDefinitionKey());
					List<HistoricVariableInstance> historicVariableInstances = processEngine.getHistoryService().createHistoricVariableInstanceQuery().variableName(task.getId()).processInstanceId(processInstanceId).list();
					if (null != historicVariableInstances && historicVariableInstances.size() > 0) {
						for (HistoricVariableInstance historicVariableInstance : historicVariableInstances) {
							TaskEntity taskEntity = new TaskEntity();
						    taskEntity = outter;
							taskEntity.setTaskLocalVariables((LocalTaskVariables) historicVariableInstance.getValue());
							list.add(taskEntity);
						}
					}else{
						list.add(outter);
					}
				}
			}
		} catch (Exception exe) {
			exe.printStackTrace();
		}
		return list;
	}
	/**
	 * 审批任务
	 * @param taskId
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public void completeTask(String taskId,LocalTaskVariables localTaskVariables) {
		try {
			localTaskVariables.setTaskId(taskId);
			
			//获取流程变量
			LocalProcessVariables localProcessVariables = getProcessVariablesByTaskId(taskId);
			Map<String, Object> map = new HashMap<String, Object>();
			try {
				map = ObjectUtil.convertBean(localTaskVariables);
			} catch (IntrospectionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
//			// 如果不是发送任务，不允许设置auditId的流程变量
//			if (!"send".equals(localTaskVariables.getTaskType())) {
//				map.remove("auditId");
//			}
			// 移除taskType属性，避免冲突
//			map.remove("taskType");
			//设置完成
//			processEngine.getTaskService().setVariables(taskId, map);
			processEngine.getTaskService().setVariablesLocal(taskId, map);
			processEngine.getTaskService().complete(taskId);
			ProcessInstance processInstance = getProcessInstanceByTaskId(taskId);
			//判断流程是否结束			
		    if (processInstance==null||processInstance.isEnded()) {
				//完成
		    	baseProcessService.updateProjectPhase("complete", localProcessVariables);				
			}
		} catch (SecurityException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 退回到上一节点
	 * @param taskId
	 * @return
	 */
	public boolean rollBack(String taskId, LocalTaskVariables localTaskVariables) {
		try {
			// 取得当前任务.当前任务节点
			HistoricTaskInstance currTask = processEngine.getHistoryService().createHistoricTaskInstanceQuery().taskId(taskId).singleResult();
			// 取得流程实例，流程实例
			ProcessInstance instance = processEngine.getRuntimeService().createProcessInstanceQuery().processInstanceId(currTask.getProcessInstanceId()).singleResult();
			if(null==instance){
				return false;
			}
			// 取得流程定义
			ProcessDefinitionEntity definition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) processEngine.getRepositoryService()).getDeployedProcessDefinition(currTask.getProcessDefinitionId());
			if (null == definition){
				return false;
			}
			// 取得本步活动
			ActivityImpl currActivity = ((ProcessDefinitionImpl) definition).findActivity(currTask.getTaskDefinitionKey());
			
			// 本节点入口
			List<PvmTransition> nextTransitionList = currActivity.getIncomingTransitions();
			// 本节点出口
			List<PvmTransition> pvmTransitionList = currActivity.getOutgoingTransitions();
			// 新建一个节点连线关系集合（存储原流程出口）
			List<PvmTransition> oriPvmTransitionList = new ArrayList<PvmTransition>();
			for (PvmTransition pvmTransition : pvmTransitionList) {
				oriPvmTransitionList.add(pvmTransition);
			}
			// 清除当前活动的出口
			pvmTransitionList.clear();
			// 建立新出口
			// 新建一个出口节点集合（存储新流程出口）
			List<TransitionImpl> newTransitions = new ArrayList<TransitionImpl>();
			for (PvmTransition nextTransition : nextTransitionList) {
				PvmActivity nextActivity = nextTransition.getSource();
				ActivityImpl nextActivityImpl = ((ProcessDefinitionImpl) definition).findActivity(nextActivity.getId());
				//获取上一步活动类型
				String event = checkActivityImpl(nextActivityImpl);
				//如果上一步是开始事件，则不允许回退
				if(("startEvent").equalsIgnoreCase(event)){
					return false;
				}
				TransitionImpl newTransition = currActivity.createOutgoingTransition();
				newTransition.setDestination(nextActivityImpl);
				newTransitions.add(newTransition);
			}
			// 完成任务
			/*List<Task> tasks = processEngine.getTaskService().createTaskQuery().processInstanceId(instance.getId()).taskDefinitionKey(currTask.getTaskDefinitionKey()).list();
			for (Task task : tasks) {*/
			//设置流程变量
			Map<String, Object> map = new HashMap<String, Object>();
			try {
				map = ObjectUtil.convertBean(localTaskVariables);
			} catch (IntrospectionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			//设置完成
//			processEngine.getTaskService().setVariables(taskId, map);
			processEngine.getTaskService().setVariablesLocal(taskId, map);
			processEngine.getTaskService().complete(taskId);
			//获取流程变量
			LocalProcessVariables localProcessVariables = getProcessVariablesByTaskId(taskId);
				//删除历史记录
				//processEngine.getHistoryService().deleteHistoricTaskInstance(task.getId());
			//}
			// 恢复方向
			for (TransitionImpl transitionImpl : newTransitions) {
				currActivity.getOutgoingTransitions().remove(transitionImpl);
			}
			for (PvmTransition pvmTransition : oriPvmTransitionList) {
				pvmTransitionList.add(pvmTransition);
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * 处理误 签功能
	 * @param taskId
	 * @throws Exception
	 */
	public void resolveTask(String taskId) {
		try {
			processEngine.getTaskService().resolveTask(taskId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}		
	}
	
	/**
	 * 将流程删除
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public void deleteProcess(String processInstanceId,String taskId,LocalTaskVariables localTaskVariables, Map<String,Object> map) {
		try {
			LocalProcessVariables localProcessVariables = getProcessVariablesByTaskId(taskId);
			processEngine.getTaskService().setVariable(taskId, taskId, localTaskVariables);
			processEngine.getTaskService().setVariables(taskId, map);
			processEngine.getRuntimeService().deleteProcessInstance(processInstanceId, localTaskVariables.getAuditInfo());
			baseProcessService.updateProjectPhase("rejectStart", localProcessVariables);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 将流程删除
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public void deleteProcess(String processInstanceId) {
		try {
			processEngine.getRuntimeService().deleteProcessInstance(processInstanceId, "recall");
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 判断流程是否被挂起
	 * @param processInstanceId
	 * @return
	 */
	public boolean isDelete(String processInstanceId){
		try{
			ProcessInstance processInstance = processEngine.getRuntimeService().createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
			if(processInstance==null){
				return true;
			}else{
				return false;
			}
		} catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 显示流程图
	 * @param processDefinitionId
	 * @param processInstanceId
	 * @return
	 */
	public Map<String, Object> showProcessImage(String processDefinitionId, String processInstanceId) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("processDefinitionId", processDefinitionId);
			ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService).getDeployedProcessDefinition(processDefinitionId);
			List<ActivityImpl> activitilist = processDefinition.getActivities();
			List<Map<String, Object>> activityList = new ArrayList<Map<String, Object>>();
			Task task = processEngine.getTaskService().createTaskQuery().processInstanceId(processInstanceId).singleResult();
			String activitiId = null;
			if(null!=task){
				ExecutionEntity executionEntity = (ExecutionEntity)runtimeService.createExecutionQuery().executionId(task.getExecutionId()).singleResult();
				activitiId = executionEntity.getActivityId();
			}else{
				activitiId=null;
			}
			int minX = 0;
			int minY = 0;
			for (int i = 0; i < activitilist.size(); i++) {
				ActivityImpl activityImpl = activitilist.get(i);
				if (i == 0) {
					minX = activityImpl.getX();
					minY = activityImpl.getY();
				}
				if (activityImpl.getX() < minX) {
					minX = activityImpl.getX();
				}
				if (activityImpl.getY() < minY) {
					minY = activityImpl.getY();
				}
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("x", activityImpl.getX() + "");
				map.put("y", activityImpl.getY() + "");
				map.put("height", activityImpl.getHeight() + "");
				map.put("width", activityImpl.getWidth() + "");
				map.put("id", activityImpl.getId());
				map.put("type", activityImpl.getProperty("type").toString());		
				//select task object by execution id
				map.put("taskInfo", selectTaskByActivitiId(activityImpl.getId(),processInstanceId));
				if(activityImpl.getId().equals(activitiId)){
					map.put("color", "red");
				}else{
					map.put("color", "blue");
				}
				activityList.add(map);
			}
			resultMap.put("deploymentId", processDefinition.getDeploymentId());
			resultMap.put("activityList", activityList);
			resultMap.put("minX", minX);
			resultMap.put("minY", minY);
			return resultMap;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//获取工作流程图图片
	@Transactional(propagation = Propagation.REQUIRED)
	public InputStream getImg(String deploymentId) {
		try {
			// 查找这次发布的所有资源文件名称
			List<String> names = repositoryService.getDeploymentResourceNames(deploymentId);
			// 筛选需要的文件名称
			String imageName = null;
			for (String name : names) {
				if (name.endsWith(".png")) {
					imageName = name;
				}
			}
			// 通过文件名称去数据库中查询对应的输入流
			InputStream in = repositoryService.getResourceAsStream(deploymentId, imageName);
			return in;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	/**
	 * 判断流程是否结束
	 * @param processInstanceId
	 * @return
	 */
	public boolean isEnd(String processInstanceId) {
	    ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
	    if (processInstance != null){
	        return processInstance.isEnded();
	    }else{
	    	return true;
	    }	    
	}
	
	/**
	 * 获取所有流程定义
	 * @param prmMap
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Map<String, Object>> listAll() {
		try {
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			ProcessDefinitionQuery processDefinitionQuery = repositoryService.createProcessDefinitionQuery().orderByProcessDefinitionVersion().desc();
			List<ProcessDefinition> processDefinitionList = processDefinitionQuery.list();
			for (ProcessDefinition processDefinition : processDefinitionList) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("processId", processDefinition.getId());
				map.put("name", processDefinition.getName());
				map.put("key", processDefinition.getKey());
				map.put("version", processDefinition.getVersion());
				map.put("diagramResourceName", processDefinition.getDiagramResourceName());
				String deploymentId = processDefinition.getDeploymentId();
				Deployment deployment = repositoryService.createDeploymentQuery().deploymentId(deploymentId).singleResult();
				map.put("id", deployment.getId());
				map.put("deployId", deployment.getId());
				map.put("deploymentTime", deployment.getDeploymentTime());
				list.add(map);
			}
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}
	
	/**
	 * 创建工作流模型
	 * @param prmMap
	 * @return
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public String createModel(Map<String,String> prmMap) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode editorNode = objectMapper.createObjectNode();
		editorNode.put("id", "canvas");
		editorNode.put("resourceId", "canvas");
		ObjectNode stencilSetNode = objectMapper.createObjectNode();
		stencilSetNode.put("namespace", "http://b3mn.org/stencilset/bpmn2.0#");
		editorNode.put("stencilset", stencilSetNode);
		Model modelData = repositoryService.newModel();
		ObjectNode modelObjectNode = objectMapper.createObjectNode();
		modelObjectNode.put(ModelDataJsonConstants.MODEL_NAME, prmMap.get("name"));
		modelObjectNode.put(ModelDataJsonConstants.MODEL_REVISION, 1);
		modelObjectNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, prmMap.get("description"));
		modelData.setMetaInfo(modelObjectNode.toString());
		modelData.setName(prmMap.get("name"));
		modelData.setKey(prmMap.get("key"));
		repositoryService.saveModel(modelData);
		repositoryService.addModelEditorSource(modelData.getId(), editorNode.toString().getBytes("utf-8"));
		return modelData.getId();
	}
	
	/**
	 * 判断模型是否存在
	 * @param prmMap
	 * @return
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public Boolean isModelNotExists(ModelEntity model) throws Exception {
		Long modelTotal = repositoryService.createModelQuery().modelKey(model.getKey()).count();
		if (modelTotal>0l) {
			return false;
		}
		return true;
	}
	
	/**
	 * 获取工作流服务地址
	 * @param serverName
	 * @param serverPort
	 * @param contextPath
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public String getEditorUrl(String serverName,String serverPort,String contextPath) {
		String activitiModelPath = "http://" + serverName + ":" + serverPort + contextPath + "/service/editor?id=";
		return activitiModelPath;
	}
	/**
	 * 获取全部模型
	 * @param prmMap
	 * @return
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Model> selectAllModel(Model model) throws Exception {
		ModelQuery modelQuery = repositoryService.createModelQuery();
		if(!StringUtils.isEmpty(model.getName())) {
			modelQuery.modelNameLike("%" + model.getName() + "%");
		}
		List<Model> list = modelQuery.orderByCreateTime().desc().list();
		return list;
	}
	/**
	 * 部署流程
	 * @param modelId
	 * @return
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public String deploy(String modelId) throws Exception {
		Model modelData = repositoryService.getModel(modelId);
		ObjectNode modelNode = (ObjectNode) new ObjectMapper().readTree(repositoryService.getModelEditorSource(modelData.getId()));
		if(modelNode.get("properties") == null) {
			return "1";
		}
		if("".equals(modelNode.get("properties").get("name").toString().replace("\"",""))
				||null==(modelNode.get("properties").get("name").toString().replace("\"",""))) {
			return "2";
		}
		BpmnModel model = new BpmnJsonConverter().convertToBpmnModel(modelNode);
		Process process = model.getProcesses().get(0);
		List<FlowElement> flowElementList = (List<FlowElement>) process.getFlowElements();
		for (FlowElement flowElement : flowElementList) {
			if (flowElement instanceof SequenceFlow) {
				GraphicInfo graphicInfo = new GraphicInfo();
				graphicInfo.setX(3);
				graphicInfo.setY(3);
				model.getLabelLocationMap().put(flowElement.getId(), graphicInfo);
			}
		}
		byte[] bpmnBytes = new BpmnXMLConverter().convertToXML(model);
		String processName = modelData.getKey() + ".bpmn20.xml";
		ByteArrayInputStream in = new ByteArrayInputStream(bpmnBytes);
		repositoryService.createDeployment().name(modelData.getName()).addInputStream(processName, in).deploy();
		return "0";
	}
	
	/**
	 * 删除模型
	 * @param modelId
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public void doDelete(String modelId) throws Exception {
		repositoryService.deleteModel(modelId);
	}
	/**
	 * 删除全部任务
	 * @throws Exception
	 */
	public void deletePorcessInstance() throws Exception {
		List<Task> list = processEngine.getTaskService().createTaskQuery().list();
		for(Task task : list){
			processEngine.getRuntimeService().deleteProcessInstance(task.getProcessInstanceId(), "It's disabled!");
		}		
	}
	/**
	 * 根据ActivityImpl获取类型信息
	 * @param activityImpl
	 */
    public String checkActivityImpl(ActivityImpl activityImpl){
    	Map<String,Object> map = activityImpl.getProperties();
    	return map.get("type")==null?"":map.get("type").toString(); 
    }
}