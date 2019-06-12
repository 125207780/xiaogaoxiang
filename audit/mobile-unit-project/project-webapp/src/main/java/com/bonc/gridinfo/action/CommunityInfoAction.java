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
import com.bonc.gridinfo.service.CommunityInfoService;


@Controller
@RequestMapping(value = "/communityInfo")
public class CommunityInfoAction {

	@Resource
	private CommunityInfoService communityInfoService;

	@RequestMapping(value = "/getBaseCommunityInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBaseCommunityInfo(String communityId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> channelInfo = this.communityInfoService.getMapper().getBaseCommunityInfo(communityId);
			return Ajax.responseString(CST.RES_SECCESS, channelInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "入格小区基础信息查询失败！");
		}
	}

}
