package com.bonc.exam.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.exam.service.showObjService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/exam")
public class showObjeAction {
	@Autowired
	private showObjService showObjService;

	@RequestMapping(value = "/showObj")
	@ResponseBody
	public PageJqGrid<Map<String, String>> showObj(String examid, Integer page, Integer rows) {
		System.out.println(examid + ',' + page + "," + rows);
		String examidS = examid.replaceAll("\\s*", "");
		System.out.println(examidS);
		Page<Map<String, String>> pageList = this.showObjService.showObj(examidS, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/editObj")
	@ResponseBody
	public Map<String, String> editObj(String examid) {
		Map<String, String> map = this.showObjService.editObj(examid);
		return map;
	}

	@RequestMapping(value = "/editObjectS")
	@ResponseBody
	public List<Map<String, String>> editObject(String examId, String objType) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> listType1 = new ArrayList<String>();
		listType1.add("gridLevel1");
		listType1.add("gridLevel2");
		listType1.add("gridLevel3");
		if (listType1.contains(objType)) {
			String examidS = examId.replaceAll("\\s*", "");
			map.put("id", examidS);
			map.put("type", objType);
			List<Map<String, String>> result = this.showObjService.editObjectTypeNoPeople(map);
			return result;
		} else {
			String examidS = examId.replaceAll("\\s*", "");
			map.put("id", examidS);
			map.put("objType", objType);
			if (objType.equals("gridManager")) {
				map.put("type", 3);
			} else if (objType.equals("cdManager")) {
				map.put("type", 2);
			} else if (objType.equals("directManager")) {
				map.put("type", 4);
			} else if (objType.equals("societyManager")) {
				map.put("type", 1);
			} else {
				map.put("type", 5);
			}
			List<Map<String, String>> result = this.showObjService.editObjectTypePeopleS(map);
			return result;
		}
	}

	@RequestMapping(value = "/UpdateObj")
	@ResponseBody
	public int UpdateObj(String jsonStr, String examInput, String objInput, String id, HttpSession session) {
		JSONArray jsonStrArr = JSON.parseArray(jsonStr);
		JSONObject examInpuObj = JSON.parseObject(examInput);
		JSONArray objInputArr = JSON.parseArray(objInput);
		String objectType = examInpuObj.getString("objectType");
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		int result = this.showObjService.UpdateObj(jsonStrArr, examInpuObj, objInputArr, id, objectType, user);
		System.out.println(result);
		return 1;

	}

	@RequestMapping(value = "/initGrid")
	@ResponseBody
	public PageJqGrid<Map<String, String>> initGrid(String examid, Integer page, Integer rows) {
		System.out.println(examid + ',' + page + "," + rows);
		;
		Page<Map<String, String>> pageList = this.showObjService.initGrid(examid, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/selectIndicator")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getIndicator(/* String examid , */Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.showObjService.getIndicator(/* examid, */page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/initTree")
	@ResponseBody
	public JSONArray getLeftTree(HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		JSONArray treeList = new JSONArray();
		if (user != null && !StringUtils.isBlank(user.getOrgId())) {
			String orgId = user.getOrgId();

			SysOrg s = showObjService.selectSysOrgById(orgId);
			// s.setTreeCode("/"+orgId);
			SysOrg param = new SysOrg();
			param.setTreeCode(s.getTreeCode());
			List<SysOrg> list = showObjService.selectList(param);
			for (SysOrg t : list) {
				JSONObject o = new JSONObject();
				o.put("id", t.getOrgId());
				o.put("pId", t.getPid());
				o.put("name", t.getName());
				o.put("title", "");
				o.put("orglevel", t.getOrgLevel());
				treeList.add(o);
			}
		}
		return treeList;
	}

	@RequestMapping(value = "/initPerformaceTable")
	@ResponseBody
	public PageJqGrid<Map<String, String>> initPerformaceTable(String modelID, String status, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.showObjService.initPerformaceTable(modelID, status, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/updateGridRank", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public int updateGridRank(String UpdataJson) {
		Map<String, Object> mapJson = JSON.parseObject(UpdataJson);
		System.out.println(mapJson);
		int reusult = this.showObjService.updateGridRank(mapJson);
		return reusult;
	}

}
