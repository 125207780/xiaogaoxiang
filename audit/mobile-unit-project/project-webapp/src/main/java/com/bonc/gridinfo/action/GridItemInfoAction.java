package com.bonc.gridinfo.action;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.DateUtil;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.gridinfo.dao.entity.GridItemInfo;
import com.bonc.gridinfo.service.GridItemInfoService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/gridItemInfo")
public class GridItemInfoAction {
	@Resource
	private GridItemInfoService gridItemInfoService;

	@RequestMapping(value = "/selectpagelist", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridItemInfo> selectPageList(HttpServletRequest request, GridItemInfo gridItemInfo, Integer page, Integer rows) {
		SysUser user = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
		String userId = user.getUserId();
		gridItemInfo.setUserId(userId);
		PageHelper.startPage(page, rows);
		Page<GridItemInfo> pageJqGrid = (Page<GridItemInfo>) this.gridItemInfoService.getMapper().selectList(gridItemInfo);
		int num = 1 + (page - 1) * rows;
		for (GridItemInfo rowNum : pageJqGrid) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<GridItemInfo> gridItemInfoJqGrid = new PageJqGrid<>(pageJqGrid);
		return gridItemInfoJqGrid;
	}

	@RequestMapping(value = "/selectpagelistByFinishStatus", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridItemInfo> selectPageListByReadStatus(HttpServletRequest request, GridItemInfo gridItemInfo, Integer page, Integer rows) {
		SysUser user = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
		String userId = user.getUserId();
		gridItemInfo.setUserId(userId);
		PageHelper.startPage(page, rows);
		Page<GridItemInfo> pageJqGrid = (Page<GridItemInfo>) this.gridItemInfoService.getMapper().selectListByReadStatus(gridItemInfo);
		int num = 1 + (page - 1) * rows;
		for (GridItemInfo rowNum : pageJqGrid) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<GridItemInfo> gridItemInfoJqGrid = new PageJqGrid<>(pageJqGrid);
		return gridItemInfoJqGrid;
	}

	@RequestMapping(value = "/updateByToDoStatus", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateStatus(GridItemInfo gridItemInfo, HttpServletRequest request, String itemCode) {
		try {
			SysUser user = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
			String userId = user.getUserId();
			gridItemInfo.setUserId(userId);
			gridItemInfo.setItemCode(itemCode);
			gridItemInfo.setHandleDate(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
			this.gridItemInfoService.updateFinishStatus(gridItemInfo);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION, "更新失败");
		}
	}
}
