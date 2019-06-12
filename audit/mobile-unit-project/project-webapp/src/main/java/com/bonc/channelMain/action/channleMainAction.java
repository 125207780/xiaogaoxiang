package com.bonc.channelMain.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.channelMain.service.channleMainService;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/maintence")
public class channleMainAction {

	@Autowired
	private channleMainService channleMainService;

	@RequestMapping(value = "/initChanelName")
	@ResponseBody
	public List<Map<String, String>> initChanelName(String gridCode) {
		List<Map<String, String>> result = this.channleMainService.initChanelName(gridCode);
		return result;
	}

	@RequestMapping(value = "/initGrid")
	@ResponseBody
	public List<Map<String, String>> initGrid(String gridCode, String chnlCode) {
		List<Map<String, String>> result = this.channleMainService.initGrid(gridCode, chnlCode);
		return result;
	}

	@RequestMapping(value = "/changeGrid")
	@ResponseBody
	public List<Map<String, String>> changeGrid(String gridCode, String chnlCode) {
		List<Map<String, String>> result = this.channleMainService.changeGrid(gridCode, chnlCode);
		return result;
	}

	@RequestMapping(value = "/ChannelManager")
	@ResponseBody
	public List<Map<String, String>> ChannelManager(String gridCode, String subject_id) {
		List<Map<String, String>> result = this.channleMainService.ChannelManager(gridCode, subject_id);
		return result;
	}

	@RequestMapping(value = "/changeTable")
	@ResponseBody
	public PageJqGrid<Map<String, String>> changeTable(String gridCode, String LOGIN_ID, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.channleMainService.changeTable(gridCode, LOGIN_ID, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/initTable")
	@ResponseBody
	public PageJqGrid<Map<String, String>> initTable(String gridCode, String subject_id, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.channleMainService.initTable(gridCode, subject_id, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/getChnlCode")
	@ResponseBody
	public List<Map<String, String>> getChnlCode(String LOGIN_ID) {
		List<Map<String, String>> result = this.channleMainService.getChnlCode(LOGIN_ID);
		return result;
	}

	@RequestMapping(value = "/chnlInformationGrid")
	@ResponseBody
	public PageJqGrid<Map<String, String>> chnlInformationGrid(String ChnlArr, Integer page, Integer rows) {
		List<String> ChnlList = new ArrayList<String>();
		String[] ChnlArrs = ChnlArr.split(",");
		for (String item : ChnlArrs) {
			ChnlList.add(item);
		}
		Page<Map<String, String>> pageList = this.channleMainService.chnlInformationGrid(ChnlList, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/DistributionChnlManager")
	@ResponseBody
	public int UpdatetChnlManager(String LOGIN_ID, String chnlCode) {
		int result = this.channleMainService.UpdatetChnlManager(LOGIN_ID, chnlCode);
		return result;
	}

	@RequestMapping(value = "/OtherDistributionChnlManager")
	@ResponseBody
	public int DoubleInsertChnlManager(String LOGIN_ID, String JsonchnlCodes) {
		int result = this.channleMainService.DoubleInsertChnlManager(LOGIN_ID, JsonchnlCodes);
		return result;
	}

	@RequestMapping(value = "/getInFullOA")
	@ResponseBody
	public String getInFullOA(String text, String gridCode) {
		// ["13123:123","dasda:123"]
		int length = text.split(",").length;
		int result = this.channleMainService.getInFullOA(text, gridCode);
		System.out.println(result);
		if (result == length) {
			return "1";
		}
		return "0";
	}

	@RequestMapping(value = "/insertCountyInfo")
	@ResponseBody
	public int insertCountyInfo(String gridCode, String text, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String userName = user.getUserName();
		int result = this.channleMainService.insertCountyInfo(gridCode, text, userName);
		return result;
	}

	@RequestMapping(value = "/insertCountyInfoNoChnl")
	@ResponseBody
	public int insertCountyInfoNoChnl(String gridCode, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String userName = user.getUserName();
		int result = this.channleMainService.insertCountyInfoNoChnl(gridCode, userName);
		return result;
	}

	@RequestMapping(value = "/getGridChnlManager")
	@ResponseBody
	public int getGridChnlManager(String gridCode) {
		List<Map<String, String>> result = this.channleMainService.getGridChnlManager(gridCode);
		if (result.size() == 0) {
			return 1;
		}
		return 0;
	}

	@RequestMapping(value = "/initGridCode")
	@ResponseBody
	public String initGridCode(String loginId) {
		Map<String, String> result = this.channleMainService.initGridCode(loginId);
		String gridCode = result.get("ORG_ID");
		return gridCode;
	}
}
