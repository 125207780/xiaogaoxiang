package com.bonc.netResources.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.netResources.dao.entity.NetResources;
import com.bonc.netResources.service.NetResourcesService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/netResources")
public class NetResourcesAction {

	@Resource
	private NetResourcesService netResourcesService;

	@RequestMapping(value = "/getLeftTree")
	@ResponseBody
	public JSONArray getLeftTree(HttpSession session) {
		JSONArray treeList = new JSONArray();
		List<NetResources> list = netResourcesService.selectList();
		if (list != null && !list.isEmpty()) {
			for (NetResources t : list) {
				JSONObject o = new JSONObject();
				o.put("id", t.getNetCode());
				o.put("pId", t.getPid());
				o.put("name", t.getNetName());
				o.put("netType", t.getNetType());
				o.put("orglevel", t.getNetLevel());
				treeList.add(o);
			}
		}
		return treeList;
	}

	@RequestMapping(value = "/firstTypeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getFirstType() {
		try {
			List<Map<String, Object>> firstTypeInfo = this.netResourcesService
					.getMapper().getFirstType();
			return Ajax.responseString(CST.RES_SECCESS, firstTypeInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "一级类型信息查询失败！");
		}
	}

	@RequestMapping(value = "/secondTypeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getSecondType(String pId) {
		try {
			List<Map<String, Object>> secondTypeInfo = this.netResourcesService
					.getMapper().getSecondType(pId);
			return Ajax.responseString(CST.RES_SECCESS, secondTypeInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "二级类型信息查询失败！");
		}
	}

	/**
	 * 全省网格基础数据入格日通报
	 * 
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/getDayReportForm", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm1(Integer page,
			Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) netResourcesService
				.getMapper().getDayReportForm();
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(
				infoData);
		return basicUnitJqGrid;

	}
}
