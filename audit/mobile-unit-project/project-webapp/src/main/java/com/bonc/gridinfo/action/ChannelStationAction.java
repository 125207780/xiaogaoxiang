package com.bonc.gridinfo.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.gridinfo.dao.entity.BaseStation;
import com.bonc.gridinfo.dao.entity.ChannelManage;
import com.bonc.gridinfo.service.ChannelStationService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 渠道基站控制类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
@Controller
@RequestMapping(value = "/channelStation")
public class ChannelStationAction {

	@Resource
	private ChannelStationService channelStationService;

	@RequestMapping(value = "/getChannelManageInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<ChannelManage> getChannelManageInfo(ChannelManage channelManage, Integer page, Integer rows, String gridCode) {
		PageHelper.startPage(page, rows);
		channelManage.setGridCode(gridCode);
		Page<ChannelManage> channelManageInfo = (Page<ChannelManage>) this.channelStationService.getMapper().getChannelManageInfo(channelManage);
		int num = 1 + (page - 1) * rows;
		for (ChannelManage rowNum : channelManageInfo) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<ChannelManage> channelManageJqGrid = new PageJqGrid<>(channelManageInfo);
		return channelManageJqGrid;
	}

	@RequestMapping(value = "/getBaseStationInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<BaseStation> getBaseStationInfo(BaseStation baseStation, Integer page, Integer rows, String gridCode) {
		PageHelper.startPage(page, rows);
		baseStation.setGridCode(gridCode);
		Page<BaseStation> baseStationInfo = (Page<BaseStation>) this.channelStationService.getMapper().getBaseStationInfo(baseStation);
		int num = 1 + (page - 1) * rows;
		for (BaseStation rowNum : baseStationInfo) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<BaseStation> baseStationJqGrid = new PageJqGrid<>(baseStationInfo);
		return baseStationJqGrid;
	}

	@RequestMapping(value = "/getOperatorInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getOperatorInfo(String gridCode) {
		try {
			List<ChannelManage> operator = this.channelStationService.getMapper().getOperator(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, operator);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "运营商信息查询失败！");
		}
	}

	@RequestMapping(value = "/getChannelType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChannelType(String gridCode, String marketType) {
		try {
			List<ChannelManage> channelType = this.channelStationService.getMapper().getChannelType(gridCode, marketType);
			return Ajax.responseString(CST.RES_SECCESS, channelType);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "渠道信息查询失败！");
		}
	}

	@RequestMapping(value = "/getChnlTypelevel2Ratio", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChnlTypelevel2Ratio(String gridCode, String marketType, String channelType) {
		try {
			List<ChannelManage> chnlTypelevel2Ratio = this.channelStationService.getMapper().getChnlTypelevel2Ratio(gridCode, marketType, channelType);
			return Ajax.responseString(CST.RES_SECCESS, chnlTypelevel2Ratio);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "二级类型信息查询失败！");
		}
	}

	@RequestMapping(value = "/getBaseStationDetailsRatio", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBaseStationDetailsRatio(String gridCode) {
		try {
			List<BaseStation> baseStationDetailsRatio = this.channelStationService.getMapper().getBaseStationDetailsRatio(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, baseStationDetailsRatio);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基站类型信息查询失败！");
		}
	}

	// 导出的功能
	@RequestMapping(value = "/exportByChannelManage")
	public void exportExcel(HttpServletResponse response, String gridCode) {
		try {

			List<ChannelManage> empList = channelStationService.selectChannelManageAll(gridCode);
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("渠道基础信息列表.xls".getBytes(), "ISO-8859-1"));
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			channelStationService.exportExcel(empList, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	// 导出的功能
	@RequestMapping(value = "/exportByBaseStation")
	public void exportExcelByBaseStation(HttpServletResponse response, String gridCode) {
		try {
			List<BaseStation> empList = channelStationService.selectBaseStationAll(gridCode);
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("基站基础信息列表.xls".getBytes(), "ISO-8859-1"));
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			channelStationService.exportExcelByBaseStation(empList, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

	}
}
