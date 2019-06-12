package com.bonc.school.action;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.school.dao.entity.SchoolUserDetail;
import com.bonc.school.service.SchoolUserDetailService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 
 * @author liulin
 *
 */
@Controller
@RequestMapping(value = "/schoolUserDeatil")
public class SchoolUserDetailAction {

	@Autowired
	private SchoolUserDetailService schoolUserDetailService;

	/**
	 * 用户画像
	 * 
	 * @param basicUnitInfo
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/schoolUserDetail", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<SchoolUserDetail> findSchoolUserDetailInfo(SchoolUserDetail basicUnitInfo, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<SchoolUserDetail> basicUnit = (Page<SchoolUserDetail>) this.schoolUserDetailService.getMapper().findSchoolUserDetailInfo(basicUnitInfo);
		PageJqGrid<SchoolUserDetail> basicUnitJqGrid = new PageJqGrid<>(basicUnit);
		return basicUnitJqGrid;
	}

	@RequestMapping(value = "/getUserInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getUserInfo(SchoolUserDetail basicUnitInfo) {
		try {
			SchoolUserDetail findSchoolUserDetailInfo = this.schoolUserDetailService.getMapper().findUserInfo(basicUnitInfo);
			return Ajax.responseString(CST.RES_SECCESS, findSchoolUserDetailInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "个人信息查询失败！");
		}
	}

	@RequestMapping(value = "/findContractType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initContractType() {
		try {
			List<Map<String, String>> findContractType = schoolUserDetailService.getMapper().findContractType();
			return Ajax.responseString(CST.RES_SECCESS, findContractType);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "合约类型信息查询失败！");
		}
	}

	@RequestMapping(value = "/findStockAdditions", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initStockAdditions() {
		try {
			List<Map<String, String>> findStockAdditions = schoolUserDetailService.getMapper().findStockAdditions();
			return Ajax.responseString(CST.RES_SECCESS, findStockAdditions);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "存量/新增信息查询失败！");
		}
	}

	@RequestMapping(value = "/findIncomeFiling", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initIncomeFiling() {
		try {
			List<Map<String, String>> findIncomeFiling = schoolUserDetailService.getMapper().findIncomeFiling();
			return Ajax.responseString(CST.RES_SECCESS, findIncomeFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "ARPU分档(折让后)的信息查询失败！");
		}
	}

	@RequestMapping(value = "/findAPPFiling", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initAPPFiling() {
		try {
			List<Map<String, String>> findAPPFiling = schoolUserDetailService.getMapper().findAPPFiling();
			return Ajax.responseString(CST.RES_SECCESS, findAPPFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "APP偏好的信息查询失败！");
		}
	}

	@RequestMapping(value = "/findTaocanFiling", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initTaocanFiling() {
		try {
			List<Map<String, String>> findIncomeFiling = schoolUserDetailService.getMapper().findTaocanFiling();
			return Ajax.responseString(CST.RES_SECCESS, findIncomeFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "套餐的信息查询失败！");
		}
	}

	@RequestMapping(value = "/findFlowFiling", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initFlowFiling() {
		try {
			List<Map<String, String>> findFlowFiling = schoolUserDetailService.getMapper().findFlowFiling();
			return Ajax.responseString(CST.RES_SECCESS, findFlowFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "流量分档信息查询失败！");
		}
	}

	@RequestMapping(value = "/findPhoneticFiling", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initPhoneticFiling() {
		try {
			List<Map<String, String>> findPhoneticFiling = schoolUserDetailService.getMapper().findPhoneticFiling();
			return Ajax.responseString(CST.RES_SECCESS, findPhoneticFiling);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "语音分档信息查询失败！");
		}
	}

	// 导出的功能
	@RequestMapping(value = "/export")
	public void exportExcel(HttpServletResponse response, int statisMonth, String actviTypeId, String usrType, String feeLevelId, String gprsLevelId,
			String schoolId, String voiceLevelId, String appTypeId, String discFeeId) {
		try {
			List<SchoolUserDetail> empList = schoolUserDetailService.selectAll(statisMonth, actviTypeId, usrType, feeLevelId, gprsLevelId, schoolId,
					voiceLevelId, appTypeId, discFeeId);
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("校园用户明细信息列表.xls".getBytes(), "ISO-8859-1"));
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			schoolUserDetailService.exportExcel(empList, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

}
