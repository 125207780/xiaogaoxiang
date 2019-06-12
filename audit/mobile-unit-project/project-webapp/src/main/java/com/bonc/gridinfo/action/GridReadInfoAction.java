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
import com.bonc.gridinfo.dao.entity.GridReadInfo;
import com.bonc.gridinfo.service.GridReadInfoService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/gridReadInfo")
public class GridReadInfoAction {
	@Resource
	private GridReadInfoService gridReadInfoService;

	@RequestMapping(value = "/selectpagelistPendingStatus", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridReadInfo> selectPageList(HttpServletRequest request, GridReadInfo gridReadInfo, Integer page, Integer rows) {
		SysUser user = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
		String userId = user.getUserId();
		gridReadInfo.setUserId(userId);
		PageHelper.startPage(page, rows);
		Page<GridReadInfo> pageJqGrid = (Page<GridReadInfo>) this.gridReadInfoService.getMapper().selectList(gridReadInfo);
		int num = 1 + (page - 1) * rows;
		for (GridReadInfo rowNum : pageJqGrid) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<GridReadInfo> gridReadInfoJqGrid = new PageJqGrid<>(pageJqGrid);
		return gridReadInfoJqGrid;
	}

	@RequestMapping(value = "/selectpagelistByReadStatus", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<GridReadInfo> selectPageListByReadStatus(HttpServletRequest request, GridReadInfo gridReadInfo, Integer page, Integer rows) {
		SysUser user = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
		String userId = user.getUserId();
		gridReadInfo.setUserId(userId);
		PageHelper.startPage(page, rows);
		Page<GridReadInfo> pageJqGrid = (Page<GridReadInfo>) this.gridReadInfoService.getMapper().selectListByReadStatus(gridReadInfo);
		int num = 1 + (page - 1) * rows;
		for (GridReadInfo rowNum : pageJqGrid) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<GridReadInfo> gridReadInfoJqGrid = new PageJqGrid<>(pageJqGrid);
		return gridReadInfoJqGrid;
	}

	@RequestMapping(value = "/updateByReadStatus", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateStatus(GridReadInfo gridReadInfo, HttpServletRequest request, String contentCode) {
		try {
			SysUser user = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
			String userId = user.getUserId();
			gridReadInfo.setUserId(userId);
			gridReadInfo.setContentCode(contentCode);
			gridReadInfo.setReadDate(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
			this.gridReadInfoService.updatePendingStatus(gridReadInfo);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION, "更新失败");
		}
	}
}
