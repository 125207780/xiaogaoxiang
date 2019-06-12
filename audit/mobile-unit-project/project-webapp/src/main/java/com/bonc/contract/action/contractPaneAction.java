package com.bonc.contract.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.contract.service.contractPaneService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/contract")
public class contractPaneAction {

	@Autowired
	private contractPaneService contractPaneService;

	@RequestMapping(value = "/selectGridName")
	@ResponseBody
	public List<Map<String, String>> selectGridName(String nowOrgId) {
		List<Map<String, String>> result = this.contractPaneService.selectGridName(nowOrgId);
		return result;
	}

	@RequestMapping(value = "/selectTypeOne")
	@ResponseBody
	public List<Map<String, String>> selectTypeOne() {
		List<Map<String, String>> result = this.contractPaneService.selectTypeOne();
		return result;
	}

	@RequestMapping(value = "/selectTypeTwo")
	@ResponseBody
	public List<Map<String, String>> selectTypeTwo(String code) {
		List<Map<String, String>> result = this.contractPaneService.selectTypeTwo(code);
		return result;
	}

	@RequestMapping(value = "/initGrid")
	@ResponseBody
	public PageJqGrid<Map<String, String>> initGrid(String gridCode, String smallType, String bigType, String phsycialName, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.contractPaneService.initGrid(gridCode, smallType, bigType, phsycialName, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/selectChannl")
	@ResponseBody
	public List<Map<String, String>> selectChannl(String chnl_code) {
		List<Map<String, String>> result = this.contractPaneService.selectChannl(chnl_code);
		return result;
	}

	@RequestMapping(value = "/insertContract")
	@ResponseBody
	public int insertContract(String chnl_code, HttpSession session, String Requirements, String JsonArrphysical) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String userName = user.getUserName();
		String id = UUID.randomUUID().toString().replaceAll("-", "");
		this.contractPaneService.insertContract(chnl_code, userName, Requirements, JsonArrphysical, id);
		return 1;
	}

	@RequestMapping(value = "/initType")
	@ResponseBody
	public Map<String, String> initManagerType(String chnl_code) {
		Map<String, String> other = new HashMap<String, String>();
		other.put("CHNL_TYPE", "1");
		Map<String, String> result = this.contractPaneService.initManagerType(chnl_code);
		if (result == null) {
			return other;
		}
		return result;
	}

	@RequestMapping(value = "/tableManager")
	@ResponseBody
	public PageJqGrid<Map<String, String>> tableManager(int ManagerType, String OrgId, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.contractPaneService.tableManager(ManagerType, OrgId, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/insertChnlManager")
	@ResponseBody
	public int insertChnlManager(String chnl_code, String newManager) {
		int result = this.contractPaneService.insertChnlManager(chnl_code, newManager);
		return result;
	}

	@RequestMapping(value = "/insertGridItemInfo")
	@ResponseBody
	public int insertGridItemInfo(String gridCode, String chnl_code, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String userName = user.getUserName();
		int result = this.contractPaneService.insertGridItemInfo(gridCode, chnl_code, userName);
		return result;
	}
}
