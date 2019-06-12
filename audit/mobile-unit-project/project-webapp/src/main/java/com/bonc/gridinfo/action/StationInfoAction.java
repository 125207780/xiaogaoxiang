package com.bonc.gridinfo.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.gridinfo.service.StationInfoService;

@Controller
@RequestMapping(value = "/stationInfo")
public class StationInfoAction {

	@Resource
	private StationInfoService stationInfoService;

	@RequestMapping(value = "/getStationInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getStationInfo(String stationId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> stationInfo = this.stationInfoService
					.getMapper().getStationInfo(stationId);
			return Ajax.responseString(CST.RES_SECCESS, stationInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基站基础信息查询失败！");
		}
	}

	/**
	 * 根据重点小区id,查询重点小区信息
	 * 
	 * @param importantId
	 *            重点小区id
	 * @return 当前区县信息
	 */
	@RequestMapping(value = "/getImportantAreaInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> getImportantAreaInfo(String importantId) {
		Map<String, Object> resultMap = stationInfoService
				.getImportantAreaInfo(importantId);
		return resultMap;
	}

}
