package com.bonc.contract.action;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.contract.service.ChannelService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/channel")
public class ChannelAction {

	@Resource
	private ChannelService channelService;

	@RequestMapping(value = "/selectChannelList")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectChannelList(String gridCode, Integer page, Integer rows) {
		Page<Map<String, Object>> pageList = (Page<Map<String, Object>>) channelService.selectChannelList(gridCode, page, rows);
		int num = 1 + (page - 1) * rows;
		for (Map<String, Object> rowNum : pageList) {
			rowNum.put("rowNum", num++);
		}

		PageJqGrid<Map<String, Object>> pageJqGrid = new PageJqGrid<Map<String, Object>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/insertMsContractArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String insertMsContractArea(String jsonStr, String jsonStationStr, String gridCode, HttpSession session) {
		try {
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			String userName = user.getUserName();
			channelService.insertMsContractArea(jsonStr, jsonStationStr, gridCode, userName);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "信息插入失败！");
		}
	}

	@RequestMapping(value = "/deleteMsContractAreaByIds", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String deleteMsContractAreaById(String ids, HttpSession session) {
		try {
			// 获取当前登录用户
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			// 获取当前登录用户名
			String userName = user.getUserName();
			channelService.deleteMsContractAreaById(ids, userName);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "删除失败");
		}
	}

	@RequestMapping(value = "/updateMsContractArea", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateMsContractArea(String jsonUnit, String unitId, String gridCode, HttpSession session) {
		try {
			// 获取当前登录用户
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			// 获取当前登录用户名
			String userName = user.getUserName();
			channelService.updateMsContractArea(jsonUnit, unitId, gridCode, userName);
			System.out.println("ok");
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "信息插入失败！");
		}
	}

	@RequestMapping(value = "/selectLngAndLat", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, String> selectLngAndLat(String uid) {
		Map<String, String> lngAndLatMap = channelService.selectLngAndLat(uid);
		return lngAndLatMap;
	}

}
