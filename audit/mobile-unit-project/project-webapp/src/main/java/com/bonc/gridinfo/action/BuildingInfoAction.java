package com.bonc.gridinfo.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.gridinfo.dao.entity.BuildingInfo;
import com.bonc.gridinfo.service.BuildingInfoService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 楼宇信息控制类
 * 
 * @author yangdong@bonc.com.cn
 *
 */

@Controller
@RequestMapping(value = "/buildingInfo")
public class BuildingInfoAction {

	@Resource
	private BuildingInfoService buildingInfoService;

	@RequestMapping(value = "/gridBuildingInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<BuildingInfo> getBuildingInfo(BuildingInfo buildingInfo, Integer page, Integer rows, String gridCode, String physicalGridName) {
		PageHelper.startPage(page, rows);
		buildingInfo.setGridCode(gridCode);
		buildingInfo.setBuildingName(physicalGridName);
		Page<BuildingInfo> buildInfo = (Page<BuildingInfo>) this.buildingInfoService.getMapper().getBuildingInfo(buildingInfo);
		int num = 1 + (page - 1) * rows;
		for (BuildingInfo rowNum : buildInfo) {
			rowNum.setRowNum(num++);
		}
		PageJqGrid<BuildingInfo> buildJqGrid = new PageJqGrid<>(buildInfo);
		return buildJqGrid;
	}

	// 导出的功能
	@RequestMapping(value = "/export")
	public void exportExcel(HttpServletResponse response, String gridCode, String buildingName) {
		try {
			List<BuildingInfo> empList = buildingInfoService.selectAll(gridCode, java.net.URLDecoder.decode(buildingName, "UTF-8"));
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("楼宇信息列表.xls".getBytes(), "ISO-8859-1"));
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			buildingInfoService.exportExcel(empList, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

}
