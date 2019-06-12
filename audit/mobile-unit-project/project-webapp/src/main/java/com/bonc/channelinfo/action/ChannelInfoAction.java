package com.bonc.channelinfo.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.channelinfo.service.ChannelInfoService;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;

@Controller
@RequestMapping(value = "/channelInfo")
public class ChannelInfoAction {

	@Resource
	private ChannelInfoService channelInfoService;

	@RequestMapping(value = "/getBaseChannelInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBaseChannelInfo(String channelId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> channelInfo = this.channelInfoService.getMapper().getBaseChannelInfo(channelId);
			return Ajax.responseString(CST.RES_SECCESS, channelInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "渠道基础信息查询失败！");
		}
	}

	@RequestMapping(value = "/getChannelInfoDay", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChannelInfoDay(String channelId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> channelInfo = this.channelInfoService.getMapper().getBaseChannelInfoDay(channelId);
			return Ajax.responseString(CST.RES_SECCESS, channelInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "渠道日指标信息查询失败！");
		}
	}
}
