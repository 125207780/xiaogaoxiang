package com.bonc.gridinfo.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.gridinfo.dao.entity.GridManagerUser;
import com.bonc.gridinfo.service.GridManagerUserService;

@Controller
@RequestMapping(value = "/gridManagerUser")
public class GridManagerUserAction {

	@Resource
	private GridManagerUserService gridManagerUserService;

	@RequestMapping(value = "/gridManagerUserInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String gridManagerUserInfo(String gridCode) {
		try {
			List<GridManagerUser> gridInfo = this.gridManagerUserService.getMapper().getGridManagerUserInfo(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "管理人员信息查询失败！");
		}
	}

}
