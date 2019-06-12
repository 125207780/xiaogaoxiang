package com.bonc.dataVisualization.action;

import java.io.IOException;
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
import com.bonc.dataVisualization.dao.entity.TableInfo;
import com.bonc.dataVisualization.service.VisualRightService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 数据可视化控制层
 * 
 * @author liulin@bonc.com.cn
 *
 */

@Controller
@RequestMapping(value = "/VisualRight")
public class VisualRightAction {

	@Resource
	private VisualRightService visualRightService;

	@RequestMapping(value = "/addTableInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String insertTable(String param, int len, HttpServletRequest request) {
		try {
			this.visualRightService.addTableInfo(request, param, len);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/findTableInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<TableInfo> findTableInfo(TableInfo tableInfo, String tableName, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<TableInfo> tableInfoList = (Page<TableInfo>) this.visualRightService.getMapper().findTableInfo(tableName);
		PageJqGrid<TableInfo> tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		return tableInfoJqGrid;
	}

	@RequestMapping(value = "/checkTable", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String checkTable(String tableName, String tabschema) {
		try {
			int num = this.visualRightService.checkTale(tableName, tabschema);
			return Ajax.responseString(CST.RES_SECCESS, num);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "该表名不存在");
		}
	}

	@RequestMapping(value = "/findByColumnName", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public List<Map<String, Object>> findByColumnName(String tableName) {
		return visualRightService.findByColumnName(tableName);
	}

	@RequestMapping(value = "/findColumnContent")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> findColumnContent(String tableName, Integer page, Integer rows) {
		Page<Map<String, Object>> tableInfoList = (Page<Map<String, Object>>) this.visualRightService.findColumnContent(tableName, page, rows);
		PageJqGrid<Map<String, Object>> tableInfoJqGrid;
		if (tableInfoList == null) {
			tableInfoJqGrid = null;
		} else {
			tableInfoJqGrid = new PageJqGrid<>(tableInfoList);
		}
		return tableInfoJqGrid;
	}

	@RequestMapping(value = "/extPortExcell")
	public void extPortExcell(HttpServletResponse response, String tableName, int rows) {
		// 定义输出流
		ServletOutputStream outputStream = null;
		String tabschema = this.visualRightService.getMapper().findTabschema(tableName);
		// String sql = tabschema + "." + tableName;
		try {
			List<Map<String, Object>> listTitle = this.visualRightService.getMapper().findColumnName(tableName, tabschema);
			List<Map<String, Object>> listInfo = this.visualRightService.findColumnContent(tableName, 1, rows);
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String((tableName + "信息列表.xls").getBytes(), "ISO-8859-1"));
			// 初始化输出流
			outputStream = response.getOutputStream();
			this.visualRightService.exportExcel(listInfo, listTitle, outputStream, tableName);
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
