package com.bonc.gridinfo.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.gridinfo.service.GroupInfoService;

@Controller
@RequestMapping(value = "/groupInfo")
public class GroupInfoAction {

	@Resource
	private GroupInfoService groupInfoService;

	@RequestMapping(value = "/getGroupInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGroupInfo(String GCCode, HttpServletRequest request) {
		try {
			List<Map<String, Object>> groupInfo = this.groupInfoService
					.getMapper().getGroupInfo(GCCode);
			return Ajax.responseString(CST.RES_SECCESS, groupInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "集团基础信息查询失败！");
		}
	}
}
