package com.bonc.gridinfo.action;

import java.io.IOException;
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
import com.bonc.gridinfo.dao.entity.Competitor;
import com.bonc.gridinfo.service.CompetitorInfoService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/competitorInfo")
public class CompetitorInfoAction {

	@Resource
	private CompetitorInfoService competitorInfoService;

	@RequestMapping(value = "/getCompetitorInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Competitor> getCompetitorInfo(Competitor competitor, Integer page, Integer rows, String gridCode, String physicalGridName) {
		PageHelper.startPage(page, rows);
		competitor.setGridCode(gridCode);
		competitor.setPhysicalGridName(physicalGridName);
		Page<Competitor> competitorInfo = (Page<Competitor>) this.competitorInfoService.getMapper().getCompetitorInfo(competitor);
		int num = 1 + (page - 1) * rows;
		for (Competitor rowNum : competitorInfo) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<Competitor> competitorJqGrid = new PageJqGrid<>(competitorInfo);
		return competitorJqGrid;
	}

	@RequestMapping(value = "/getOperatorInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getOperatorInfo() {
		try {
			List<Competitor> operator = this.competitorInfoService.getMapper().getOperator();
			return Ajax.responseString(CST.RES_SECCESS, operator);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "运营商信息查询失败！");
		}
	}

	@RequestMapping(value = "/getPhysicalGridName", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getPhysicalGridType(String gridCode) {
		try {
			List<Competitor> operator = this.competitorInfoService.getMapper().getPhysicalGridName(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, operator);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "类型信息查询失败！");
		}
	}

	@RequestMapping(value = "/getCompetitorRatio", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getCompetitorRatio(String listType, String gridCode, String physicalGridCode) {
		try {
			Competitor competitorRatio = this.competitorInfoService.getCompetitorRatio(listType, gridCode, physicalGridCode);
			return Ajax.responseString(CST.RES_SECCESS, competitorRatio);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "类型信息查询失败！");
		}
	}

	// 导出的功能
	@RequestMapping(value = "/export")
	public void exportExcel(HttpServletResponse response, String gridCode, String physicalGridName) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		try {
			List<Competitor> empList = competitorInfoService.selectAll(gridCode, java.net.URLDecoder.decode(physicalGridName, "UTF-8"));
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("竞争对手列表.xls".getBytes(), "ISO-8859-1"));
			// 实例化输出流
			outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			competitorInfoService.exportExcel(empList, outputStream);
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
