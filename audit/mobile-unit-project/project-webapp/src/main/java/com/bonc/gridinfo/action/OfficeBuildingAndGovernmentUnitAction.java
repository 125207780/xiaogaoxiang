package com.bonc.gridinfo.action;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.gridinfo.service.OfficeBuildingAndGovernmentUnitService;

@Controller
@RequestMapping(value = "/officeBuildingAndGovernmentUnit")
public class OfficeBuildingAndGovernmentUnitAction {

	@Resource
	private OfficeBuildingAndGovernmentUnitService officeBuildingAndGovernmentUnitService;
    /**
     * 获取写字楼详情
     * @param physicCode
     * @param request
     * @return
     */
	@RequestMapping(value = "/getOfficeBuilding", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getOfficeBuilding(String physicCode, HttpServletRequest request) {
		try {
			Map<String, Object> stationInfo = officeBuildingAndGovernmentUnitService
					.getMapper().getOfficeBuilding(physicCode);
			return Ajax.responseString(CST.RES_SECCESS, stationInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基站基础信息查询失败！");
		}
	}
	/**
	 * 获取政府单位明细
	 * @param physicCode
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getGovernmentUnit", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGovernmentUnit(String physicCode, HttpServletRequest request) {
		try {
			Map<String, Object> stationInfo = officeBuildingAndGovernmentUnitService
					.getMapper().getGovernmentUnit(physicCode);
			return Ajax.responseString(CST.RES_SECCESS, stationInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基站基础信息查询失败！");
		}
	}

}
