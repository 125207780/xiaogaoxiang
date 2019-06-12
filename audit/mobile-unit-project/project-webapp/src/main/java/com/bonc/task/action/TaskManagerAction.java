package com.bonc.task.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.task.dao.entity.TaskBase;
import com.bonc.task.dao.entity.TaskProblem;
import com.bonc.task.service.TaskManagerService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/task")
public class TaskManagerAction {

	@Resource
	private TaskManagerService taskManagerService;
	@Resource
	private KpiManagerService kpiManagerService;

	@RequestMapping(value = "/getTaskCreateInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<TaskBase> getTaskCreateInfo(int page, int rows, TaskBase taskBase, String ActivityBeginDate, String ActivityEndDate,
			HttpServletRequest request) {
		SysOrg orgLevel = kpiManagerService.getMapper().getOrgLevel(taskBase.getOrgId());
		taskBase.setOrgLevel(orgLevel.getOrgLevel());
		PageHelper.startPage(page, rows);
		Page<TaskBase> baseTask = (Page<TaskBase>) this.taskManagerService.getTaskCreateInfo(taskBase);
		PageJqGrid<TaskBase> taskInfoJqGrid = new PageJqGrid<>(baseTask);
		return taskInfoJqGrid;
	}

	/*
	 * @RequestMapping(value="/getTaskHandleInfo",method =
	 * RequestMethod.POST,produces = "application/json;charset=utf-8")
	 * 
	 * @ResponseBody public PageJqGrid<TaskBase> getTaskHandleInfo(int page,int
	 * rows,TaskBase taskBase,String orgId,String startTime,String
	 * endTime,HttpServletRequest request){ SysUser user = (SysUser)
	 * request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
	 * taskBase.setUserId(user.getUserId()); PageHelper.startPage(page, rows);
	 * Page<TaskBase> baseTask = (Page<TaskBase>)
	 * this.taskManagerService.getMapper().getTaskHandleInfo(taskBase,orgId);
	 * PageJqGrid<TaskBase> taskInfoJqGrid = new PageJqGrid<>(baseTask); return
	 * taskInfoJqGrid; }
	 */

	@RequestMapping(value = "/getTaskHistoryInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<TaskBase> getTaskHistoryInfo(int page, int rows, TaskBase taskBase, String startTime, String endTime, HttpServletRequest request) {
		/*
		 * SysUser user = (SysUser)
		 * request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
		 * taskBase.setUserId(user.getUserId());
		 */
		PageHelper.startPage(page, rows);
		Page<TaskBase> baseTask = (Page<TaskBase>) this.taskManagerService.getMapper().getTaskHistoryInfo(taskBase);
		PageJqGrid<TaskBase> taskInfoJqGrid = new PageJqGrid<>(baseTask);
		return taskInfoJqGrid;
	}

	@RequestMapping(value = "/updateListener", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateListener(TaskBase taskBase, String orgId, HttpServletRequest request) {
		try {
			this.taskManagerService.updateListener(taskBase, orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/cancelTask", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String cancelTask(TaskBase taskBase, String orgId, HttpServletRequest request) {
		try {
			this.taskManagerService.cancelTask(taskBase, orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/recoveryTask", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String recoveryTask(TaskBase taskBase, HttpServletRequest request) {
		try {
			/*
			 * SysUser user = (SysUser)
			 * request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
			 * taskBase.setUserId(user.getUserId());
			 */
			this.taskManagerService.getMapper().recoveryTask(taskBase);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getTaskProblem", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<TaskProblem> getTaskProblem(int page, int rows, TaskProblem taskProblem) {
		PageHelper.startPage(page, rows);
		Page<TaskProblem> taskProblems = (Page<TaskProblem>) this.taskManagerService.getMapper().getTaskProblem(taskProblem);
		PageJqGrid<TaskProblem> taskProblemJqGrid = new PageJqGrid<>(taskProblems);
		return taskProblemJqGrid;
	}

}
