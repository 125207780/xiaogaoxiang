package com.bonc.school.action;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.school.service.SchoolMapService;

@Controller
@RequestMapping(value = "/schoolMap")
public class SchoolMapAction {
	
	@Autowired
	private SchoolMapService schoolMapService;
	
	/**
	 * 获取getMapLeft 省级
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getMapLeft", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  getMapLeft(String statisMonth) {
		try {
			Map<String, Object> infoData = schoolMapService.getMapLeft(statisMonth);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}
	}
	/**
	 * 获取getMapLeft 市级 getMapRight
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getMapCityLeft", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  getMapCityLeft(String mapOrgId,String statisMonth) {
		try {
			Map<String, Object> infoData = schoolMapService.getMapCityLeft(mapOrgId,statisMonth);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}
	}
	
	@RequestMapping(value = "/getMapRight", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String   getMapRight(String statisMonth) {
		
		try {
			List<Map<String, Object>> infoData = schoolMapService.getMapRight(statisMonth);
			Map<String, Object> infoData1 = schoolMapService.getMapLeft(statisMonth);
			infoData1.put("RANK", "");
			infoData1.put("RANK1", "");
			infoData1.put("RANK2", "");
			infoData1.put("RANK3", "");
			infoData1.put("RANK4", "");
			infoData1.put("RANK5", "");
			infoData1.put("RANK6", "");
			infoData1.put("AREA_NAME", "合计");
			infoData.add(infoData1);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}
		
	}
/*	@RequestMapping(value = "/getMapRight1", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Map<String, Object>>  getMapRight1(Integer page, Integer rows,String statisMonth) {
		
			PageHelper.startPage(page, rows);
			List<Map<String, Object>> infoData = schoolMapService.getMapRight(statisMonth);
			Page<Map<String, Object>> pageMap = new Page<Map<String, Object>>(new PageInfo<Map<String, Object>>(infoData));
			return pageMap;
		
	}*/
	
	@RequestMapping(value = "/getMapRightArea", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String   getMapRightArea(String orgId, String statisMonth) {
		
		try {
			List<Map<String, Object>> infoData = schoolMapService.getMapRightArea(orgId, statisMonth);
			Map<String, Object> infoData1 = schoolMapService.getMapCityLeft(orgId,statisMonth);
			infoData1.put("RANK", "");
			infoData1.put("RANK1", "");
			infoData1.put("RANK2", "");
			infoData1.put("RANK3", "");
			infoData1.put("RANK4", "");
			infoData1.put("RANK5", "");
			infoData1.put("RANK6", "");
			infoData1.put("CNTY_NAME", "合计");
			infoData.add(infoData1);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}
		
	}
	
	@RequestMapping(value = "/getProvinceGaoxiaoLeft", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  getProvinceGaoxiaoLeft(String statisMonth) {
		try {
			List<Map<String, Object>> infoData  = schoolMapService.getProvinceGaoxiaoLeft(statisMonth);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "省高校查询失败！");
		}
	}
	
	@RequestMapping(value = "/getCityGaoxiaoLeft", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  getCityGaoxiaoLeft(String mapOrgId,String statisMonth) {
		try {
			List<Map<String, Object>> infoData  = schoolMapService.getCityGaoxiaoLeft(mapOrgId,statisMonth);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "地市高校查询失败！");
		}
	}
	
	@RequestMapping(value = "/getCityGaoxiaoNum", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  getCityGaoxiaoNum(String statisMonth) {
		try {
			List<Map<String, Object>> infoData  = schoolMapService.getCityGaoxiaoNum(statisMonth);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "省高校查询失败！");
		}
	}
	
	@RequestMapping(value = "/getAreaGaoxiaoNum", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  getAreaGaoxiaoNum(String orgId, String statisMonth) {
		try {
			List<Map<String, Object>> infoData  = schoolMapService.getAreaGaoxiaoNum(orgId, statisMonth);
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "地市高校查询失败！");
		}
	}
	
	@RequestMapping(value = "/findByDate", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  findByDate() {
		try {
			String infoData  = schoolMapService.findByDate();
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "数据查询失败！");
		}
	}
	
}
