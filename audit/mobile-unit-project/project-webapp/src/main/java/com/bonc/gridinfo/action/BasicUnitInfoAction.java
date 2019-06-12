package com.bonc.gridinfo.action;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.gridinfo.dao.entity.BasicUnitInfo;
import com.bonc.gridinfo.service.BasicUnitInfoService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/basicUnitInfo")
public class BasicUnitInfoAction {

	@Resource
	private BasicUnitInfoService basicUnitInfoService;

	@RequestMapping(value = "/getBasicUnitInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<BasicUnitInfo> getCompetitorInfo(BasicUnitInfo basicUnitInfo, Integer page, Integer rows, String gridCode, String physicaName) {
		PageHelper.startPage(page, rows);
		basicUnitInfo.setGridCode(gridCode);
		basicUnitInfo.setPhysicalName(physicaName);
		Page<BasicUnitInfo> basicUnit = (Page<BasicUnitInfo>) this.basicUnitInfoService.getMapper().getBasicUnitInfo(basicUnitInfo);
		int num = 1 + (page - 1) * rows;
		for (BasicUnitInfo rowNum : basicUnit) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<BasicUnitInfo> basicUnitJqGrid = new PageJqGrid<>(basicUnit);
		return basicUnitJqGrid;
	}

	/**
	 * 查询商场信息
	 * 
	 * @Title selectBasicUnitInfo
	 * @Author xiaogaoxiang
	 * @param areaId
	 * @param gridName
	 * @return String
	 */
	@RequestMapping(value = "/selectBasicUnitInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectBasicUnitInfo(String physicalId) {
		try {
			List<BasicUnitInfo> departmentList = basicUnitInfoService.selectBasicUnitInfoByPhysicalId(physicalId);
			return Ajax.responseString(CST.RES_SECCESS, departmentList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/gridTypeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String gridBaseInfo(HttpSession session, String gridCode) {
		try {
			List<BasicUnitInfo> gridInfo = this.basicUnitInfoService.getMapper().getTypeInfo(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "网格基础信息查询失败！");
		}
	}

	@RequestMapping(value = "/gridTypeRatioInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String TypeRatioInfo(HttpSession session, String gridCode, String bigType) {
		try {
			List<BasicUnitInfo> gridInfo = this.basicUnitInfoService.getMapper().getTypeRatioInfo(gridCode, bigType);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "网格基础信息查询失败！");
		}
	}

	@RequestMapping(value = "/firstTypeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getFirstType() {
		try {
			List<Map<String, Object>> firstTypeInfo = this.basicUnitInfoService.getMapper().getFirstType();
			return Ajax.responseString(CST.RES_SECCESS, firstTypeInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "一级类型信息查询失败！");
		}
	}

	@RequestMapping(value = "/secondTypeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getSecondType(String conditionCode) {
		try {
			List<Map<String, Object>> secondTypeInfo = this.basicUnitInfoService.getMapper().getSecondType(conditionCode);
			return Ajax.responseString(CST.RES_SECCESS, secondTypeInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "二级类型信息查询失败！");
		}
	}

	@RequestMapping(value = "/bigTypeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String BigTypeInfo(HttpSession session, String gridCode) {
		try {
			List<BasicUnitInfo> gridInfo = this.basicUnitInfoService.getMapper().getBigTypeInfo(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "网格基础信息查询失败！");
		}
	}

	@RequestMapping(value = "/showBasicUnitInfo")
	public String showSysUserForm(HttpServletRequest request, String physicalGridCode) {
		if (!StringUtils.isBlank(physicalGridCode)) {
			BasicUnitInfo basicUnitInfo = this.basicUnitInfoService.getMapper().selectBasicUnitInfoById(physicalGridCode);
			request.setAttribute("basicUnitInfo", basicUnitInfo);
		}
		return "pages/gis/gridInfo/basicUnitForm";
	}

	// 导出的功能
	@RequestMapping(value = "/export")
	public void exportExcel(HttpServletResponse response, String gridCode, String physicalName, String bigType, String physicalType) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<BasicUnitInfo> empList = basicUnitInfoService.selectAll(gridCode, java.net.URLDecoder.decode(physicalName, "UTF-8"),
					java.net.URLDecoder.decode(bigType, "UTF-8"), java.net.URLDecoder.decode(physicalType, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("基础单元信息列表.xls".getBytes(), "ISO-8859-1"));
			// 初始化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			basicUnitInfoService.exportExcel(empList, outputStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
