package com.bonc.gridinfo.action;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.DateUtil;
import com.bonc.export.ExcelUtil;
import com.bonc.gridinfo.dao.entity.GridInfo;
import com.bonc.gridinfo.dao.entity.OrgGridStation;
import com.bonc.gridinfo.service.GridStationService;
import com.bonc.system.dao.entity.SysUser;

@Controller
@RequestMapping(value = "/gridStation")
public class GridStationAction {

	@Resource
	private GridStationService gridStationService;

	/**
	 * 获取当前机构下的网格信息
	 * 
	 * @param areaId
	 * @return
	 */
	@RequestMapping(value = "/getGridInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getDepartment(String areaId, String gridName) {
		try {
			List<GridInfo> departmentList = gridStationService.getMapper().getGridInfo(areaId, gridName);
			return Ajax.responseString(CST.RES_SECCESS, departmentList);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取当前营业部下的网格信息
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	@RequestMapping(value = "/getGridStationInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridStationInfo(String orgId, String gridCode) {
		try {
			List<OrgGridStation> listOgd = this.gridStationService.getGridStationInfo(orgId, gridCode);
			return Ajax.responseString(CST.RES_SECCESS, listOgd);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取当前网格下的基站信息
	 * 
	 * @param saleDeptCode
	 * @return
	 */
	@RequestMapping(value = "/getGridStationInfoByName", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridStationInfoByName(String orgId, String stationName) {
		try {
			List<OrgGridStation> listOgd = this.gridStationService.getGridDeptInfoByName(orgId, stationName);
			return Ajax.responseString(CST.RES_SECCESS, listOgd);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 查询未加入营业部的网格
	 * 
	 * @param orgId
	 * @param gridName
	 * @return
	 */
	@RequestMapping(value = "/getNoGridStation", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getNoGridStation(String areaId, String stationName) {
		try {
			List<Map<String, Object>> listNgd = this.gridStationService.getMapper().getNoGridStation(areaId, stationName);
			return Ajax.responseString(CST.RES_SECCESS, listNgd);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 移除单个网格
	 * 
	 * @param orgId
	 * @param gridCode
	 * @param saleDeptCode
	 * @return
	 */
	@RequestMapping(value = "/removeSingleGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String removeSingleGrid(String areaId, String gridCode, String stationCode) {
		try {
			String updateDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
			this.gridStationService.getMapper().removeSingleGrid(updateDate, areaId, gridCode, stationCode);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 移除多个网格
	 * 
	 * @param data
	 * @return
	 */
	@RequestMapping(value = "/removeAllGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String removeAllGrid(String data, String areaId) {
		try {
			this.gridStationService.removeAllGrid(data);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 加入单个网格
	 * 
	 * @param orgGridDepartment
	 * @return
	 */
	@RequestMapping(value = "/addSingleGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addSingleGrid(OrgGridStation orgGridDepartment) {
		try {
			String joinDate = DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss");
			orgGridDepartment.setJoinDate(joinDate);
			orgGridDepartment.setUpdateDate(null);
			this.gridStationService.addSingleGrid(orgGridDepartment);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgGridDepartment.getOrgId());
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/addAllGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addAllGrid(String areaId, String gridInfo, String gridCode, String gridName, String gridType) {
		try {
			this.gridStationService.addAllGrid(areaId, gridInfo, gridCode, gridName, gridType);
			// this.gridBusinessDepartmentService.CallDb2GXWH(orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	private static final String UPLOAD_DIR = "/srv/www/upload/";
	private static final long MAX_FILE_SISE = 31000;

	@RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadFile(@RequestParam("stationFile") MultipartFile file, MultipartHttpServletRequest request, HttpSession session, Model m) {
		String message = "";
		if (!file.isEmpty()) {
			// 获取文件类型
			String path = request.getSession().getServletContext().getRealPath("/");
			String contentType = file.getContentType();
			if (!contentType.equals("")) {
				// 可以对文件类型进行检查
			}
			// 获取input域的name属性
			// String name = file.getName();
			// 获取文件名，带扩展名
			String originFileName = file.getOriginalFilename();
			// 获取文件扩展名
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			System.out.println(extension);
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/gridInfo/stationInfoAlert";
			}
			// 构造文件上传后的文件绝对路径，这里取系统时间戳＋文件名作为文件名
			// 不推荐这么写，这里只是举例子，这么写会有并发问题
			// 应该采用一定的算法生成独一无二的的文件名
			String fileName = path + UPLOAD_DIR;
			String fileName1 = fileName + String.valueOf(System.currentTimeMillis()) + extension;
			File newFile = new File(fileName);
			if (!newFile.exists()) {
				newFile.mkdirs();

			}
			try {

				file.transferTo(new File(fileName1));
				SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
				String orgId = user.getOrgId();
				// String orgId="admin1";
				List<OrgGridStation> kpi = ExcelUtil.readStationInfoExcelByPath(fileName1, orgId);
				for (OrgGridStation orgGridStation : kpi) {
					Map<String, String> grid = gridStationService.findGridCodeByName(orgGridStation.getGridName(), orgId);
					String stationType = gridStationService.findStationTypeByStationCode(orgGridStation.getStationCode(), orgId);
					orgGridStation.setStationType(stationType);
					if (grid != null) {
						orgGridStation.setGridCode(grid.get("GRIDCODE"));
						orgGridStation.setGridType(grid.get("GRIDTYPE"));
						int saveImportData = gridStationService.saveImportData(kpi);
						request.setAttribute("title", saveImportData);
						message = "文件上传成功";
					} else {
						request.setAttribute("title", 0);
						message = "文件上传失败";
					}
				}
			} catch (Exception e) {
				request.setAttribute("title", 0);
				message = "文件上传失败";
				e.printStackTrace();

			}
		}
		request.setAttribute("message", message);
		return "pages/gis/gridInfo/stationInfoAlert";
	}

	// 导出的功能
	@RequestMapping(value = "/exportExcel")
	public void exportExcel(HttpServletResponse response, HttpServletRequest request) {
		try {
			String orgId = "";
			String path = request.getSession().getServletContext().getRealPath("/pages/gis/gridInfo/基站关系维护模板.xls");
			List<OrgGridStation> list = ExcelUtil.readStationInfoExcelByPath(path, orgId);
			// List<ChannelManage> empList =
			// channelStationService.selectChannelManageAll(gridCode);
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("基站关系维护模板.xls".getBytes(), "ISO-8859-1"));
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			gridStationService.exportExcel(list, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

	}
}
