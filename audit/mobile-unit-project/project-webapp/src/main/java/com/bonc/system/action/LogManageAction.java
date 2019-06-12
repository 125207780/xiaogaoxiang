/**
 * 
 */
package com.bonc.system.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.bonc.system.bean.Logger;
import com.bonc.system.service.LogManageService;
import com.bonc.common.cst.CST;
import com.bonc.common.page.Page;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.JsonUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * @author songhao
 *
 */
@Controller
@RequestMapping(value = "/logManage")
public class LogManageAction {

	@Autowired
	private LogManageService logManageService;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getLogList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getLogList(String json, int page, int rows) throws Exception {
		try {
			// 参数预处理
			Map<String, String> prmMap = new HashMap<String, String>();
			if (json != null) {
				prmMap = (Map<String, String>) JsonUtils.json2Java(json);
			}
			PageHelper.startPage(page, rows);
			List<Logger> resultMap = logManageService.getLogList(prmMap);
			// 分页bean包装
			Page<Logger> pageBean = new Page<Logger>(new PageInfo<Logger>(resultMap));
			// 返回前台
			return JSON.toJSONString(pageBean);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}
}
