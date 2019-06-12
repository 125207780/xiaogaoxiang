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
import com.bonc.gridinfo.service.NonCommunityService;

@Controller
@RequestMapping(value = "/nonCommunity")
public class NonCommunityAction {

	@Resource
	private NonCommunityService nonCommunityService;

	@RequestMapping(value = "/getNonCommunity", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getNonCommunity(String cellId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> nonCommunity = this.nonCommunityService.getMapper().getNonCommunity(cellId);
			return Ajax.responseString(CST.RES_SECCESS, nonCommunity);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基站基础信息查询失败！");
		}
	}
}
