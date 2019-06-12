package com.bonc.gridinfo.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.gridinfo.dao.entity.GridInfo;
import com.bonc.gridinfo.service.GridInfoService;

/**
 * 网格信息控制类
 * 
 * @author yangdong@bonc.com.cn
 *
 */

@Controller
@RequestMapping(value = "/gridInfo")
public class GridInfoAction {

	@Resource
	private GridInfoService gridInfoService;

	/**
	 * 
	 * 网格统计信息-基本信息&&网格基本信息-网格基本信息/资源信息
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/gridBaseInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String gridBaseInfo(HttpSession session, String gridCode) {
		try {
			List<GridInfo> gridInfo = this.gridInfoService.getMapper().getGridInfo(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "网格基础信息查询失败！");
		}
	}

	/**
	 * 
	 * 网格基本信息-团队信息
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/getGridTeamInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridTeamInfo(HttpSession session) {
		try {
			// SysUser syssUser = (SysUser)
			// session.getAttribute(CST.SESSION_SYS_USER_INFO);
			// String gridCode = sysUser.getOrgId();
			List<GridInfo> gridInfo = this.gridInfoService.getMapper().getGridTeamInfo();
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "网格团队信息查询失败！");
		}
	}

}
