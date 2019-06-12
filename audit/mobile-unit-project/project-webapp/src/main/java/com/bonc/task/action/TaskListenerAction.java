package com.bonc.task.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.task.dao.entity.TaskListener;
import com.bonc.task.service.TaskListenerService;

@Controller
@RequestMapping(value = "/task")
public class TaskListenerAction {
	@Resource
	private TaskListenerService taskListenerService;

	@RequestMapping(value = "/getTaskTree", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public JSONArray getLeftTree(HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		JSONArray treeList = new JSONArray();
		if (user != null && !StringUtils.isBlank(user.getOrgId())) {
			String orgId = user.getOrgId();
			List<TaskListener> s = taskListenerService.selectTaskListenerById(orgId);
			for (TaskListener taskListener : s) {
				TaskListener param = new TaskListener();
				param.setTreeCode(taskListener.getTreeCode());
				List<TaskListener> list = this.taskListenerService.getTaskListenerTree(param);
				for (TaskListener t : list) {
					JSONObject o = new JSONObject();
					o.put("id", t.getMonitorCode());
					o.put("pId", t.getPid());
					o.put("name", t.getContent());
					o.put("title", "");
					o.put("treeLevel", t.getTreeLevel());
					treeList.add(o);
				}
			}
		}

		return treeList;
	}

	@RequestMapping(value = "/getTaskListenerInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getTaskListenerInfo(HttpSession session, String monitorCode) {
		if (monitorCode != null && !monitorCode.isEmpty()) {
			TaskListener taskBaseInfo = this.taskListenerService.getTaskListenerInfo(monitorCode);
			return Ajax.responseString(CST.RES_SECCESS, taskBaseInfo);
		}
		return Ajax.responseString(CST.RES_EXCEPTION, "任务监控基本信息查看失败");
	}

	@RequestMapping(value = "/addGridItemInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addGridItemInfo(HttpSession session, String monitorCode) {
		try {
			this.taskListenerService.addGridItemInfo(session, monitorCode);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/addLeaderAdviceInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addLeaderAdviceInfo(String monitorCode, String leaderAdvice) {
		try {
			this.taskListenerService.addLeaderAdviceInfo(monitorCode, leaderAdvice);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

}
