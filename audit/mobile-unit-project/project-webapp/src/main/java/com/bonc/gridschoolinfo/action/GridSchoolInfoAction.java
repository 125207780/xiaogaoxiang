package com.bonc.gridschoolinfo.action;

import java.io.IOException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.gridschoolinfo.service.GridSchoolInfoService;
import com.bonc.school.dao.entity.SchoolUserDetail;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/gridSchoolInfo")
public class GridSchoolInfoAction {

	@Resource
	private GridSchoolInfoService gridSchoolInfoService;

	@RequestMapping(value = "/getBaseGridSchoolInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBaseGridSchoolInfo(String schId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> gridSchoolInfo = this.gridSchoolInfoService.getMapper().getBaseGridSchoolInfo(schId);
			return Ajax.responseString(CST.RES_SECCESS, gridSchoolInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "网格学校基础信息查询失败！");
		}
	}
	
	@RequestMapping(value = "/getGridSchoolYWBLInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String,Object> getGridSchoolYWBLInfo(String schId, HttpServletRequest request) {
		try {
			Map<String,Object> returnmaps=new HashMap<String,Object>();
			List<Map<String, Object>> gridSchoolInfoL = this.gridSchoolInfoService.getMapper().getBaseGridSchoolYWBLInfoL(schId);
			returnmaps.put("left", gridSchoolInfoL);
			return returnmaps;
		} catch (Exception e) {
			e.printStackTrace();
	        return null;
		}
	}
	
	@RequestMapping(value = "/getGridSchoolYWBLEchart", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> getGridSchoolYWBLEchart(String selected,String schoolId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> gridSchoolInfoR = this.gridSchoolInfoService.getMapper().getBaseGridSchoolYWBLInfoR(selected,schoolId);
			return gridSchoolInfoR;
		} catch (Exception e) {
			e.printStackTrace();
	        return null;
		}
	}
	@RequestMapping(value = "/getGridSchoolNewDevelopInit", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> getGridSchoolNewDevelopInit(String schId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> gridSchoolInfoR = this.gridSchoolInfoService.getMapper().getGridSchoolNewDevelopL(schId);
			return gridSchoolInfoR;
		} catch (Exception e) {
			e.printStackTrace();
	        return null;
		}
	}
	@RequestMapping(value = "/getGridSchoolNewDevelopEchart", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> getGridSchoolNewDevelopEchart(String selected,String schId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> gridSchoolInfoR = this.gridSchoolInfoService.getMapper().getGridSchoolNewDevelopR(selected,schId);
			return gridSchoolInfoR;
		} catch (Exception e) {
			e.printStackTrace();
	        return null;
		}
	}
	
	@RequestMapping(value = "/getGridSchoolUseInit", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> getGridSchoolUseInit(String schId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> gridSchoolInfoL = this.gridSchoolInfoService.getMapper().getGridSchoolUseL(schId);
			return gridSchoolInfoL;
		} catch (Exception e) {
			e.printStackTrace();
	        return null;
		}
	}
	
	@RequestMapping(value = "/getGridSchoolUseEchart", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> getGridSchoolUseEchart(String selected,String schId, HttpServletRequest request) {
		try {
			List<Map<String, Object>> gridSchoolInfoR = this.gridSchoolInfoService.getMapper().getGridSchoolUseR(selected,schId);
			return gridSchoolInfoR;
		} catch (Exception e) {
			e.printStackTrace();
	        return null;
		}
	}
	
	
	/**
	 * 用户画像
	 * @param basicUnitInfo
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value="/getGridSchoolUserDetailInit",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<SchoolUserDetail> getGridSchoolUserDetailInit(SchoolUserDetail basicUnitInfo ,Integer page, Integer rows){
		PageHelper.startPage(page, rows);
		//		List<String> AppTypeIdList = (List<String>) JSON.parse(basicUnitInfo.getAppTypeId());
		Page<SchoolUserDetail> basicUnit = (Page<SchoolUserDetail>) this.gridSchoolInfoService.getMapper().getGridSchoolUserDetailInit(basicUnitInfo);
		PageJqGrid<SchoolUserDetail> basicUnitJqGrid = new PageJqGrid<>(basicUnit);
		return basicUnitJqGrid;
	}
	@RequestMapping(value="/schoolUserDetail",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<SchoolUserDetail> findSchoolUserDetailInfo(SchoolUserDetail basicUnitInfo ,Integer page, Integer rows){
		PageHelper.startPage(page, rows);
		//List<String> AppTypeIdList = new ArrayList<String>(); 
//		AppTypeIdList=(List<String>) JSON.parse(basicUnitInfo.getAppTypeId());
		Page<SchoolUserDetail> basicUnit = (Page<SchoolUserDetail>) this.gridSchoolInfoService.getMapper().findSchoolUserDetailInfo(basicUnitInfo);
		PageJqGrid<SchoolUserDetail> basicUnitJqGrid = new PageJqGrid<>(basicUnit);
		return basicUnitJqGrid;
	}
	
	@RequestMapping(value="/getUserInfo",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getUserInfo(SchoolUserDetail basicUnitInfo){
		try {
		SchoolUserDetail findSchoolUserDetailInfo = this.gridSchoolInfoService.getMapper().findUserInfo(basicUnitInfo);
		 return Ajax.responseString(CST.RES_SECCESS, findSchoolUserDetailInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"个人信息查询失败！");
		}
	}
	
	@RequestMapping(value="/findContractType",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initContractType(){
		try {
		List<Map<String, String>> findContractType = gridSchoolInfoService.getMapper().findContractType();
		return Ajax.responseString(CST.RES_SECCESS, findContractType);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"合约类型信息查询失败！");
		}
	}
	
	@RequestMapping(value="/findStockAdditions",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initStockAdditions(){
		try {
		List<Map<String, String>> findStockAdditions = gridSchoolInfoService.getMapper().findStockAdditions();
		return Ajax.responseString(CST.RES_SECCESS, findStockAdditions);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"存量/新增信息查询失败！");
		}
	}
	
	@RequestMapping(value="/findIncomeFiling",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initIncomeFiling(){
		try {
		List<Map<String, String>> findIncomeFiling = gridSchoolInfoService.getMapper().findIncomeFiling();
		return Ajax.responseString(CST.RES_SECCESS, findIncomeFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"ARPU分档(折让后)的信息查询失败！");
		}
	}
	
	@RequestMapping(value="/findAPPFiling",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initAPPFiling(){
		try {
		List<Map<String, String>> findAPPFiling = gridSchoolInfoService.getMapper().findAPPFiling();
		return Ajax.responseString(CST.RES_SECCESS, findAPPFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"APP偏好的信息查询失败！");
		}
	}
	
	@RequestMapping(value="/findTaocanFiling",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initTaocanFiling(){
		try {
		List<Map<String, String>> findIncomeFiling = gridSchoolInfoService.getMapper().findTaocanFiling();
		return Ajax.responseString(CST.RES_SECCESS, findIncomeFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"套餐的信息查询失败！");
		}
	}
	
	@RequestMapping(value="/findFlowFiling",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initFlowFiling(){
		try {
		List<Map<String, String>> findFlowFiling = gridSchoolInfoService.getMapper().findFlowFiling();
		return Ajax.responseString(CST.RES_SECCESS, findFlowFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"流量分档信息查询失败！");
		}
	}
	@RequestMapping(value="/findPhoneticFiling",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initPhoneticFiling(){
		try {
		List<Map<String, String>> findPhoneticFiling = gridSchoolInfoService.getMapper().findPhoneticFiling();
		return Ajax.responseString(CST.RES_SECCESS, findPhoneticFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION,"语音分档信息查询失败！");
		}
	}
	
	// 导出的功能
	@RequestMapping(value = "/export")
	public void exportExcel(HttpServletResponse response,int statisMonth,String actviTypeId,String usrType,String feeLevelId,String gprsLevelId,String schoolId,String voiceLevelId,String appTypeId,String discFeeId) {
		ServletOutputStream outputStream = null;
		try {
			//List<String> AppTypeIdList = (List<String>) JSON.parse(java.net.URLDecoder.decode(appTypeId, "UTF-8"));
			List<SchoolUserDetail> empList = gridSchoolInfoService.selectAll(statisMonth, actviTypeId, usrType, feeLevelId, gprsLevelId, schoolId,voiceLevelId,appTypeId,discFeeId);
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename="
					+ new String("校园用户明细信息列表.xls".getBytes(), "ISO-8859-1"));
			// 输出流
			 outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			 gridSchoolInfoService.exportExcel(empList, outputStream);

		} catch (Exception e) {

			e.printStackTrace();
		}finally{
			try {
				outputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	@RequestMapping(value = "/findByDate", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String  findByDate() {
		try {
			String infoData  = gridSchoolInfoService.findByDate();
			return Ajax.responseString(CST.RES_SECCESS, infoData);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "数据查询失败！");
		}
	}
	

	
}
