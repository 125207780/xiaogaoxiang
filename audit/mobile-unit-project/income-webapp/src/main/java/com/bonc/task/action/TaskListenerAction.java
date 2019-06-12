package com.bonc.task.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysOrgService;
import com.bonc.task.dao.entity.TaskBase;
import com.bonc.task.dao.entity.TaskListener;
import com.bonc.task.dao.entity.TaskListenerBase;
import com.bonc.task.service.TaskListenerService;
import com.bonc.task.service.TaskManagerService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value="/task")
public class TaskListenerAction {
	@Resource
	private TaskListenerService taskListenerService;

	
	
	@RequestMapping(value="/getTaskTree",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public JSONArray getLeftTree(HttpSession session){
		SysUser user = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO); 
		JSONArray treeList = new JSONArray();
		if(user!=null&&!StringUtils.isBlank( user.getUserId())) {
			String userId = user.getUserId();			
			TaskListener tl = new TaskListener();
			List<TaskListener> list = this.taskListenerService.getTaskListenerTree(userId);
			for(TaskListener t:list) {
				JSONObject o = new JSONObject();
				o.put("id",t.getMonitorCode());
				o.put("pId",t.getPid());
				o.put("name", t.getContent());
				o.put("title", "");
				o.put("treeLevel", t.getTreeLevel());
				treeList.add(o);				
			}
		}
	
		return treeList;	  
  }
	
	@RequestMapping(value="/getTaskBaseInfo",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getTaskBaseInfo(HttpSession session,String monitorCode){
		SysUser user = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO); 
		if(user!=null&&!StringUtils.isBlank( user.getUserId())) {
			String userId = user.getUserId();	
			if(monitorCode!=null&&!monitorCode.isEmpty()){
				List<TaskListenerBase> taskBaseInfo = this.taskListenerService.getTaskBaseInfo(userId, monitorCode);
				System.out.println(taskBaseInfo.toString());
				return Ajax.responseString(CST.RES_SECCESS, taskBaseInfo);
			}			
		}
		return Ajax.responseString(CST.RES_EXCEPTION,"任务监控基本信息查看失败");
	} 
	
}
