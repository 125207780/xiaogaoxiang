package com.bonc.map.action;

import java.io.File;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.bonc.channelinfo.service.ChannelInfoService;
import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.common.utils.SysUserTreeMenuUtil;
import com.bonc.common.utils.UUIDUtil;
import com.bonc.export.ExcelExportUtil;
import com.bonc.export.ExcelUtil;
import com.bonc.export.ExportExcelUtil;
import com.bonc.export.bean.ExportConf;
import com.bonc.gridinfo.dao.entity.StationInfo;
import com.bonc.gridinfo.service.BasicUnitInfoService;
import com.bonc.gridinfo.service.StationInfoService;
import com.bonc.map.dao.entity.DirectSaleUserInfo;
import com.bonc.map.dao.entity.MapInfo;
import com.bonc.map.dao.entity.MarketManager;
import com.bonc.map.dao.entity.OrgDetail;
import com.bonc.map.service.FirstPageThreeService;
import com.bonc.map.service.GridCommonService;
import com.bonc.map.service.MapIndexService;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.exception.TooManyDatasException;
import com.bonc.system.service.SysOrgService;
import com.github.pagehelper.Page;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping(value = "/map")
public class MapIndexAction {
	private Workbook workbook;

	@Resource
	private MapIndexService mapIndexService;

	@Resource
	private GridCommonService gridCommonService;

	@Resource
	private StationInfoService stationInfoService;

	@Resource
	private ChannelInfoService channelInfoService;

	@Resource
	private BasicUnitInfoService basicUnitInfoService;

	@Resource
	private FirstPageThreeService firstPageThreeService;

	@Resource
	private SysOrgService sysOrgService;

	@RequestMapping(value = "/initPage")
	public String initPage(HttpServletRequest request, HttpSession session) throws ParseException {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		SysOrg sysOrg = user.getSysOrg();
		if (!sysOrg.getOrgLevel().equals("3")) {
			return "pages/gis/power/power";
		}
		Map<String, Object> result = this.mapIndexService.initPage(orgId);
		if (null != result && result.size() > 0) {
			Date unlockDate = (Date) result.get("DATE");
			String status = (String) result.get("STATUS");
			SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");
			String nowDateStr = SDF.format(new Date());
			Date nowDate = SDF.parse(nowDateStr);
			SimpleDateFormat SDFO = new SimpleDateFormat("yyyyMMdd");

			// a为Date类型20190906
			int lock = Integer.parseInt(SDFO.format(unlockDate).toString());

			// b为Date类型201809005
			int now = Integer.parseInt(SDFO.format(nowDate).toString());
			if (now < lock && status.equals("Y")) {
				request.setAttribute("isShowBtn", true);
			} else {
				request.setAttribute("isShowBtn", false);
			}
			return "pages/gis/indexPage/indexPage";
		}
		return "pages/gis/indexPage/indexPage";
	}

	@RequestMapping(value = "/initUser")
	@ResponseBody
	public List<Map<String, Object>> selectUser(String userType, String orgId) {
		List<Map<String, Object>> list = mapIndexService.selectUser(userType, orgId);
		return list;
	}

	@RequestMapping(value = "/initBusi")
	@ResponseBody
	public List<Map<String, Object>> selectUsers(String userType, String orgId) {
		List<Map<String, Object>> list = mapIndexService.selectUsers(userType, orgId);
		return list;
	}

	@RequestMapping(value = "/initType")
	@ResponseBody
	public List<Map<String, Object>> selectType() {
		List<Map<String, Object>> list = mapIndexService.selectType();
		return list;
	}

	@RequestMapping(value = "/create")
	@ResponseBody
	@Transactional(propagation = Propagation.REQUIRED)
	public String create(@RequestParam Map<String, String> record) throws Exception {
		try {
			return mapIndexService.create(record);

		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 小区轮廓信息保存
	 * 
	 * @Title createOrUpdateCommunity
	 * @Author xiaogaoxiang
	 * @param record
	 * @return String
	 */
	@RequestMapping(value = "/createOrUpdateCommunity")
	@ResponseBody
	@Transactional(propagation = Propagation.REQUIRED)
	public String createOrUpdateCommunity(@RequestParam Map<String, Object> record) {
		try {
			return mapIndexService.createOrUpdateCommunity(record);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 导入基站excel保存
	 * 
	 * @Title stationCreate
	 * @Author administration
	 * @param record
	 * @param session
	 * @return
	 * @throws Exception
	 *             String
	 */
	@RequestMapping(value = "/stationCreate")
	@ResponseBody
	@Transactional(propagation = Propagation.REQUIRED)
	public String stationCreate(@RequestParam Map<String, String> record, HttpSession session) throws Exception {
		try {
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			return mapIndexService.stationCreate(record, user);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 编辑
	 * 
	 * @Title edit
	 * @Author administration
	 * @param record
	 * @return
	 * @throws Exception
	 *             String
	 */
	@RequestMapping(value = "/edit")
	@ResponseBody
	@Transactional(propagation = Propagation.REQUIRED)
	public String edit(@RequestParam Map<String, String> record) throws Exception {
		try {
			return mapIndexService.edit(record);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 删除网格轮廓信息
	 * 
	 * @Title delete
	 * @Author administration
	 * @param orgId
	 * @return
	 * @throws Exception
	 *             String
	 */
	@RequestMapping(value = "/delete")
	@ResponseBody
	@Transactional(propagation = Propagation.REQUIRED)
	public String delete(String orgId) throws Exception {
		try {
			return mapIndexService.delete(orgId);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 根据小区编码删除小区轮廓信息
	 * 
	 * @Title deleteCommunity
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	@RequestMapping(value = "/deleteCommunity")
	@ResponseBody
	@Transactional(propagation = Propagation.REQUIRED)
	public String deleteCommunity(String cellId) {
		try {
			return mapIndexService.deleteCommunity(cellId);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, e.getMessage());
		}
	}

	/**
	 * 初始化查询网格轮廓信息
	 * 
	 * @Title selectMapInfo
	 * @Author xiaogaoxiang
	 * @param pid
	 * @return List<MapInfo>
	 */
	@RequestMapping(value = "/initMap")
	@ResponseBody
	public List<MapInfo> selectMapInfo(String pid) {
		List<MapInfo> list = mapIndexService.selectGridByPid(pid);
		return list;
	}

	/**
	 * 初始化查询小区轮廓信息
	 * 
	 * @Title initCommunityMap
	 * @Author xiaogaoxiang
	 * @param pid
	 * @return List<MapInfo>
	 */
	@RequestMapping(value = "/initCommunityMap")
	@ResponseBody
	public List<MapInfo> initCommunityMap(String pid) {
		List<MapInfo> list = mapIndexService.selectCommunityGridByPid(pid);
		return list;
	}

	@RequestMapping(value = "/editUser")
	@ResponseBody
	public List<Map<String, Object>> selectUserOne(String orgId, int userType) {
		List<Map<String, Object>> map = mapIndexService.selectUserOne(orgId, userType);
		return map;
	}

	@RequestMapping(value = "/editHeapDirect")
	@ResponseBody
	public List<Map<String, Object>> selectUserOneS(String orgId, int userType) {
		List<Map<String, Object>> map = mapIndexService.selectUserOneS(orgId, userType);
		return map;
	}

	@RequestMapping(value = "/edit_sale_user")
	@ResponseBody
	public List<Map<String, Object>> selectUserOneSale(String areaid, String orgId, int userType) {
		List<Map<String, Object>> map = mapIndexService.selectUserOneSale(areaid, orgId, userType);
		return map;
	}

	@RequestMapping(value = "/initData")
	@ResponseBody
	public Map<String, Object> initData(String orgId, String maxLng, String maxLat, String minLng, String minLat, String sharp)
			throws ClassNotFoundException, SQLException {
		return mapIndexService.getResultCost(orgId, maxLng, maxLat, minLng, minLat, sharp);
	}

	@RequestMapping(value = "/getOrgDetail")
	@ResponseBody
	public List<OrgDetail> getOrgDetail(String orgId) {

		return mapIndexService.getOrgDetail(orgId);
	}

	@RequestMapping(value = "/getErrChannelNum")
	@ResponseBody
	public int getErrChannelNum(String orgId) {

		return mapIndexService.getErrChannelNum(orgId);
	}

	/**
	 * 渠道规模 channelCost
	 * 
	 * @Title getChannel
	 * @Author administration
	 * @param uids
	 * @param page
	 * @param rows
	 * @return PageJqGrid<Map<String,String>>
	 */
	@RequestMapping(value = "/errChannelList")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getChannel(String uids, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.mapIndexService.getChannel(uids.split(","), page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/initCountryGrid")
	@ResponseBody
	public List<Map<String, String>> getCountryGrid(String orgid, String countTryName) {
		List<Map<String, String>> pageList = this.mapIndexService.getCountryGrid(orgid, countTryName);
		return pageList;
	}

	/**
	 * 根据用户组织编码，基站名称，查询基站信息
	 * 
	 * @Title getStationGrid
	 * @Author administration
	 * @param orgid
	 * @param stationName
	 * @return List<Map<String,String>>
	 */
	@RequestMapping(value = "/initStationGrid")
	@ResponseBody
	public List<Map<String, Object>> getStationGrid(String orgid, String stationName) {
		List<Map<String, Object>> pageList = this.mapIndexService.getStationGrid(orgid, stationName);
		return pageList;
	}

	/**
	 * 收入规模： dayCost
	 * 
	 * @Title getIncome
	 * @Author administration
	 * @param uids
	 * @param page
	 * @param rows
	 * @return PageJqGrid<Map<String,String>>
	 */
	@RequestMapping(value = "/incomelist")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getIncome(String uids, Integer page, Integer rows) {

		Page<Map<String, String>> pageList = this.mapIndexService.getIncome(uids.split(","), page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	/**
	 * 客户规模：customCost
	 * 
	 * @Title getCustomer
	 * @Author administration
	 * @param uids
	 * @param page
	 * @param rows
	 * @return PageJqGrid<Map<String,String>>
	 */
	@RequestMapping(value = "/customerlist")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getCustomer(String uids, Integer page, Integer rows) {

		Page<Map<String, String>> pageList = this.mapIndexService.getCustomer(uids.split(","), page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	/**
	 * 小区规模villageCost
	 * 
	 * @Title getVillage
	 * @Author administration
	 * @param uids
	 * @param page
	 * @param rows
	 * @return PageJqGrid<Map<String,String>>
	 */
	@RequestMapping(value = "/villagelist")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getVillage(String uids, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.mapIndexService.getVillage(uids.split(","), page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	/**
	 * 集团规模groupCost
	 * 
	 * @Title getVipCustomer
	 * @Author administration
	 * @param uids
	 * @param page
	 * @param rows
	 * @return PageJqGrid<Map<String,String>>
	 */
	@RequestMapping(value = "/vipcustomerlist")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getVipCustomer(String uids, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.mapIndexService.getVipCustomer(uids.split(","), page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	/**
	 * 基站规模stationCost
	 * 
	 * @Title getStation
	 * @Author administration
	 * @param uids
	 * @param page
	 * @param rows
	 * @return PageJqGrid<Map<String,String>>
	 */
	@RequestMapping(value = "/stationlist")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getStation(String uids, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.mapIndexService.getStation(uids.split(","), page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	/**
	 * errChannel
	 * 
	 * @Title getErr
	 * @Author administration
	 * @param orgId
	 * @param page
	 * @param rows
	 * @return PageJqGrid<Map<String,String>>
	 */
	@RequestMapping(value = "/errlist")
	@ResponseBody
	public PageJqGrid<Map<String, String>> getErr(String orgId, Integer page, Integer rows) {
		Page<Map<String, String>> pageList = this.mapIndexService.getErr(orgId, page, rows);
		PageJqGrid<Map<String, String>> pageJqGrid = new PageJqGrid<Map<String, String>>(pageList);
		return pageJqGrid;
	}

	@RequestMapping(value = "/buildExcel")
	@ResponseBody
	public String buildExcel(String orgId) {
		try {
			workbook = new XSSFWorkbook();
			Sheet sheet = ExcelExportUtil.creatSheet(workbook, "渠道规模表", CST.SHEET_PROTECT_PASSWORD);
			List<Map<String, String>> list = this.mapIndexService.getErrExcel(orgId);
			// 创建excel（手写配置形式 前提：数据不需要转换）
			List<String> titleList = Arrays.asList("渠道名称", "类型", "一级类型", "二级类型");
			List<String> nameList = Arrays.asList("CHNL_NAME", "CHNL_TYPE", "CHNL_TYPE_LEVEL1", "CHNL_TYPE_LEVEL2");
			List<Integer> widthList = Arrays.asList(CST.CELL_MAX_LENGTH, CST.CELL_MAX_LENGTH, CST.CELL_MAX_LENGTH, CST.CELL_MAX_LENGTH);
			ExportConf epconf = new ExportConf(titleList, nameList, widthList);
			ExcelExportUtil.buildExcel(sheet, epconf, list);
			return CST.RES_SECCESS;
		} catch (TooManyDatasException e) {
			return CST.TOO_MANY_DATAS_EXCEPTION;
		} catch (Exception e) {
			e.printStackTrace();
			return CST.RES_EXCEPTION;
		}
	}

	@RequestMapping(value = "/exportExcel")
	@ResponseBody
	public void exportExcel(HttpServletResponse response) {
		try {
			// 产生工作簿对象
			String excelname = UUIDUtil.createUUID();
			ExportExcelUtil.downloadExcel(response, excelname, workbook);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/initName")
	@ResponseBody
	public List<Map<String, String>> initName(String orgId) throws ClassNotFoundException, SQLException {
		return mapIndexService.initName(orgId);
	}

	@RequestMapping(value = "/initsale_user")
	@ResponseBody
	public List<Map<String, Object>> initsale_user(String userType, String orgId) {
		List<Map<String, Object>> list = mapIndexService.initsale_user(userType, orgId);
		return list;
	}

	@RequestMapping(value = "/complete")
	@ResponseBody
	public int completeMap(String orgId) {
		int result = mapIndexService.completeMap(orgId);
		return result;
	}

	/**
	 * 导出网格信息中所选择的渠道，基站，小区，楼宇
	 * 
	 * @Title exportGridInfo
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 * @param session
	 *            void
	 */
	@RequestMapping(value = "/exportGridInfo", method = RequestMethod.POST)
	public void exportGridInfo(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String gridCode = request.getParameter("gridCode");
		String gridName = request.getParameter("gridName");
		String gridInfo = request.getParameter("gridInfos");
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		try {
			response.reset();
			String exportName = "网格基础单元";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 根据传入的网格编码和要导出的基础单元，分sheet单元导出
			mapIndexService.exportGridExcel(user.getOrgId(), gridCode, gridName, gridInfo, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出导出网格信息中所选择的渠道，基站，小区，楼宇（已入格数据）
	 * 
	 * @Title exportGridInfo01
	 * @Author hubinbin
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/exportGridInfo01", method = RequestMethod.POST)
	public void exportGridInfo01(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String gridCode = request.getParameter("gridCode");
		String gridName = request.getParameter("gridName");
		String gridInfo = request.getParameter("gridInfos");
		String oldOrgId = request.getParameter("orgId");
		String orgLevel = request.getParameter("orgLevel");
		String orgId = "";
		try {
			if (orgLevel.equals("2")) {
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(oldOrgId);
				orgId = orgIdMap.get("OLD_ORG_ID").toString();
			} else {
				orgId = oldOrgId;
			}
			response.reset();
			String exportName = "网格基础单元信息";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 根据传入的网格编码和要导出的基础单元，分sheet单元导出
			mapIndexService.exportGridExcel01(orgId, oldOrgId, orgLevel, gridCode, gridName, gridInfo, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出导出网格信息中所选择的渠道，基站，小区，楼宇(未入格数据)
	 * 
	 * @Title exportGridInfo01
	 * @Author hubinbin
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/exportGridInfoNotEnter", method = RequestMethod.POST)
	public void exportGridInfoNotEnter(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		String gridInfo = request.getParameter("gridInfos");
		String oldOrgId = request.getParameter("orgId");
		String orgLevel = request.getParameter("orgLevel");
		String orgId = "";
		try {
			if (orgLevel.equals("2")) {
				Map<String, Object> orgIdMap = firstPageThreeService.getCityCode(oldOrgId);
				orgId = orgIdMap.get("OLD_ORG_ID").toString();
			} else {
				orgId = oldOrgId;
			}
			response.reset();
			String exportName = "网格基础单元";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// 根据传入的网格编码和要导出的基础单元，分sheet单元导出
			mapIndexService.exportGridExcelNotEnter(orgId, oldOrgId, orgLevel, gridInfo, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出基站表格中的所有基站信息
	 * 
	 * @Title exportStationExcel
	 * @Author xiaogaoxiang
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/addStationInfo", method = RequestMethod.POST)
	public void exportStationExcel(HttpServletResponse response, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String stationName = request.getParameter("stationName");
		try {

			// 用Gson解析json字符串，封装成基站信息类
			List<Map<String, Object>> mapList = mapIndexService.getStationGrid(user.getOrgId(), stationName);
			List<StationInfo> stationInfoList = new ArrayList<>();
			StationInfo si = null;
			for (Map<String, Object> map : mapList) {
				si = new StationInfo();
				if (null != map.get("STATION_LON") && !"".equals(map.get("STATION_LON")) && null != map.get("STATION_LAT") && !"".equals(map.get("STATION_LAT"))
						&& (null == map.get("GRID_CODE") || "".equals(map.get("GRID_CODE")))) {
					si.setStationCode(map.get("STATION_CODE").toString());
					si.setStationName(null != map.get("STATION_NAME") && !"".equals(map.get("STATION_NAME")) ? map.get("STATION_NAME").toString() : null);
					si.setStationLon(new BigDecimal(map.get("STATION_LON").toString()));
					si.setStationLat(new BigDecimal(map.get("STATION_LAT").toString()));
					stationInfoList.add(si);
				}
			}
			String exportName = "基站信息";
			response.reset();

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			this.mapIndexService.exportStationExcel(stationInfoList, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 销售经理信息导入模板导出的功能
	 * 
	 * @Title exportMarketExcel
	 * @Author administration
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/downMarketManager")
	public void exportMarketExcel(HttpServletResponse response, HttpServletRequest request) {
		try {

			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/indexPage/销售经理信息导入模板.xls";
			List<MarketManager> list = ExcelUtil.readExcelByPath(path);
			String exportName = "销售经理";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			this.mapIndexService.exportExcel(list, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static final String UPLOAD_DIR = "/srv/www/upload/";
	private static final long MAX_FILE_SISE = 31000000;

	/**
	 * 基站导入销售经理excel
	 * 
	 * @Title uploadStationMarket
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadStationMarket", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadStationMarket(@RequestParam("kpiFileStationMarket") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
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
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				List<MarketManager> kpi = ExcelUtil.readExcelByPath(fileName1);
				message = "文件上传成功";
				request.setAttribute("json", kpi);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();

			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlertStationXSMarket";
	}

	@RequestMapping(value = "/uploadMarket", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadFile(@RequestParam("kpiFile") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
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
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				List<MarketManager> kpi = ExcelUtil.readExcelByPath(fileName1);
				message = "文件上传成功";
				request.setAttribute("json", kpi);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();

			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlert";
	}

	/**
	 * 直销人员信息导入模板导出的功能
	 * 
	 * @Title exportDirectExcel
	 * @Author administration
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/downDirect_user")
	public void exportDirectExcel(HttpServletResponse response, HttpServletRequest request) {
		try {

			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/indexPage/直销人员信息导入模板.xls";
			Boolean flag = true;
			List<DirectSaleUserInfo> list = ExcelUtil.readExcelByPath(path, flag);
			String exportName = "直销人员";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			this.mapIndexService.exportExcel(list, outputStream, flag);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 直销人员信息导入模板导出的功能
	 * 
	 * @Title exportDirectExcel
	 * @Author administration
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/exportdirectuser")
	public void exportDirectUser(HttpServletResponse response, HttpServletRequest request) {
		try {
			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/gridInfo/网格直销经理信息录入模板.xls";
			Boolean flag = true;
			List<Map<String, Object>> list = ExcelUtil.readDirectUserExcelByPath(path, flag);
			String exportName = "直销经理信息";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			this.mapIndexService.exportDirectUserExcel(list, outputStream, flag);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 装维人员信息导入模板导出的功能
	 * 
	 * @Title exportSocietyExcel
	 * @Author administration
	 * @param response
	 * @param request
	 *            void
	 */
	@RequestMapping(value = "/downSocietyManager")
	public void exportSocietyExcel(HttpServletResponse response, HttpServletRequest request) {
		try {

			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/indexPage/装维人员信息导入模板.xls";
			Boolean flag = true;
			List<MarketManager> list = ExcelUtil.readExcelByPath(path);
			String exportName = "装维人员";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			this.mapIndexService.exportExcel(list, outputStream, flag, flag);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/uploadStationFiles", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadStationFiles(@RequestParam("kpiStationFileDir") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		Boolean flag = true;
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
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				List<DirectSaleUserInfo> kpi = ExcelUtil.readExcelByPath(fileName1, flag);
				message = "文件上传成功";

				request.setAttribute("json", kpi);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();

			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlertStationMarket";
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadMarket(@RequestParam("kpiFile") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		Boolean flag = true;
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
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				List<DirectSaleUserInfo> kpi = ExcelUtil.readExcelByPath(fileName1, flag);
				message = "文件上传成功";

				request.setAttribute("json", kpi);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();

			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlertMarket";
	}

	/**
	 * 直销人员信息导入
	 * 
	 * @Title uploadDirectSaleFiles
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadDirectSaleFiles", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadDirectSaleFiles(@RequestParam("directSaleFileDir") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		String message = "";
		if (!file.isEmpty()) {
			// 获取文件类型
			String path = request.getSession().getServletContext().getRealPath("/");
			String contentType = file.getContentType();
			if (!contentType.equals("")) {
				// 可以对文件类型进行检查
			}
			// 获取文件名，带扩展名
			String originFileName = file.getOriginalFilename();
			// 获取文件扩展名
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				// 获取上传文件基站信息
				message = mapIndexService.readDirectSaleExcelByPath(fileName1);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();
			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlertDirectSale";
	}

	/**
	 * 上传基站excel表格，解析，并获取解析后的excel表格内容，转发到jsp上
	 * 
	 * @Title uploadStation
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadStation", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadStation(@RequestParam("stationFileDir") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		String message = "";
		if (!file.isEmpty()) {
			// 获取文件类型
			String path = request.getSession().getServletContext().getRealPath("/");
			String contentType = file.getContentType();
			if (!contentType.equals("")) {
				// 可以对文件类型进行检查
			}
			// 获取文件名，带扩展名
			String originFileName = file.getOriginalFilename();
			// 获取文件扩展名
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				// 获取上传文件基站信息
				List<StationInfo> kpi = ExcelUtil.readStationExcelByPath(fileName1);
				message = stationInfoService.saveStationInfo(kpi);
				// 获取所有非空网格信息
				StringBuffer map = null;
				// 拼接错误信息
				StringBuffer errorMsg = null;
				// 获取所有非空基站信息
				List<StationInfo> stationInfoList = null;
				if ("GRID_NONE".equals(message.split("&")[0]) || "GRID_REPEAT".equals(message.split("&")[0]) || "STATION_NONE".equals(message.split("&")[0])
						|| "STATION_REPEAT".equals(message.split("&")[0])) {
					errorMsg = new StringBuffer();
					if ("GRID_REPEAT".equals(message.split("&")[0])) {
						SysOrg sysOrgMsg = new Gson().fromJson(message.split("&")[1], SysOrg.class);
						errorMsg.append("{\"stationName\":\"\",\"stationCode\":\"\",\"gridName\":\"" + sysOrgMsg.getName() + "\"}");
					} else if ("STATION_REPEAT".equals(message.split("&")[0])) {
						Map<String, String> stationInfoMsg = new Gson().fromJson(message.split("&")[1], new TypeToken<Map<String, String>>() {
						}.getType());
						errorMsg.append("{\"stationName\":\"" + stationInfoMsg.get("STATIONNAME") + "\",\"stationCode\":\"" + stationInfoMsg.get("STATIONCODE")
								+ "\",\"gridName\":\"\"}");
					}
				} else {
					map = new StringBuffer("[");
					stationInfoList = new ArrayList<>();
					// 去重循环
					Set<String> gridNames = new TreeSet<>();
					for (int i = 0; i < kpi.size(); i++) {
						if (null != kpi.get(i).getGridCode() && !"".equals(kpi.get(i).getGridCode())) {
							gridNames.add(kpi.get(i).getGridCode());
							stationInfoList.add(kpi.get(i));
						}
					}

					Iterator<String> gridNamesIterator = gridNames.iterator();
					int count = 0;
					while (gridNamesIterator.hasNext()) {
						if (count != gridNames.size() - 1) {
							map.append("{\"gridName\":\"" + gridNamesIterator.next() + "\"},");
						} else {
							map.append("{\"gridName\":\"" + gridNamesIterator.next() + "\"}");
						}
						count++;
					}
					map.append("]");
					message = "SUCCESS";
				}
				request.setAttribute("errorMsg", errorMsg == null ? null : errorMsg.toString());
				// 将所有基站所属网格信息转发
				request.setAttribute("gridInfoJson", map == null ? null : map.toString());
				// 将所有基站信息进行转发
				request.setAttribute("stationInfoJson", stationInfoList == null ? null : stationInfoList);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();
			}
		}
		request.setAttribute("message", message.split("&")[0]);
		return "pages/gis/indexPage/gridIndexEntryAlertStation";
	}

	/**
	 * 基站导入excel装维人员信息
	 * 
	 * @Title uploadStationSoc
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadStationSoc", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadStationSoc(@RequestParam("kpiFileStationSoc") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		// Boolean flag = true ;
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
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				List<MarketManager> kpi = ExcelUtil.readExcelByPath(fileName1);
				message = "文件上传成功";

				request.setAttribute("json", kpi);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();

			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlertStationSoc";
	}

	/**
	 * 网格划分导入excel装维人员信息
	 * 
	 * @Title uploadSoc
	 * @Author xiaogaoxiang
	 * @param file
	 * @param request
	 * @param session
	 * @return String
	 */
	@RequestMapping(value = "/uploadSoc", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadSoc(@RequestParam("kpiFile") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		// Boolean flag = true ;
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
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				List<MarketManager> kpi = ExcelUtil.readExcelByPath(fileName1);
				message = "文件上传成功";
				request.setAttribute("json", kpi);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();
			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlertSoc";
	}

	/**
	 * 查询网格直销经理信息
	 * 
	 * @Title getDirectSaleInfo
	 * @Author xiaogaoxiang
	 * @param page
	 * @param rows
	 * @param session
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getDirectSaleInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getDirectSaleInfo(int page, int rows, String orgId, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		List<String> orgIds = new ArrayList<>();
		if (user.getOrgLevel() == 1) {
			List<SysOrg> allSysOrgList = sysOrgService.selectAllSysOrg();
			List<SysOrg> sysOrgList = SysUserTreeMenuUtil.getChildrenOrgId(allSysOrgList, user.getOrgId());
			for (SysOrg so : sysOrgList) {
				if (so.getOrgLevel().equals("3")) {
					orgIds.add(so.getOrgId());
				}
			}
		} else if (user.getOrgLevel() == 2) {
			List<SysOrg> sysOrgList = sysOrgService.getChildrenSysOrgByOrgId(user.getOrgId());
			for (SysOrg so : sysOrgList) {
				orgIds.add(so.getOrgId());
			}
		} else if (user.getOrgLevel() == 3) {
			orgIds.add(orgId);
		} else {
			List<SysOrg> sysOrgList = sysOrgService.getParentSysOrgByOrgId(user.getSysOrg().getPid());
			for (SysOrg so : sysOrgList) {
				orgIds.add(so.getOrgId());
			}
		}
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) mapIndexService.getDirectSaleInfo(page, rows, orgIds);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	/**
	 * 更改直销经理状态
	 * 
	 * @Title updateDirectSaleStatus
	 * @Author xiaogaoxiang
	 * @param officeId
	 * @param request
	 * @param response
	 * @return String
	 */
	@RequestMapping(value = "/updateDirectSaleStatus", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String updateDirectSaleStatus(String officeId, String statusType, HttpServletRequest request, HttpServletResponse response) {
		mapIndexService.updateDirectSaleStatus(officeId, statusType);
		return null;
	}

	/**
	 * CD类政企客户导入信息
	 * 
	 * @param file
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/uploadGovBusFiles", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadGovBusFiles(@RequestParam("govBusFileDir") MultipartFile file, MultipartHttpServletRequest request, HttpSession session) {
		String message = "";
		if (!file.isEmpty()) {
			// 获取文件类型
			String path = request.getSession().getServletContext().getRealPath("/");
			String contentType = file.getContentType();
			if (!contentType.equals("")) {
				// 可以对文件类型进行检查
			}
			// 获取文件名，带扩展名
			String originFileName = file.getOriginalFilename();
			// 获取文件扩展名
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			// 获取文件大小，单位字节
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/exam/gridIndexEntryAlert";
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
				// 获取上传文件基站信息
				message = mapIndexService.readGovBusExcelByPath(fileName1);
			} catch (Exception e) {
				message = "文件上传失败";
				e.printStackTrace();
			}
		}
		request.setAttribute("message", message);
		return "pages/gis/indexPage/gridIndexEntryAlertDirectSale";
	}

	/**
	 * CD类政企客户信息导出模板
	 * 
	 * @param response
	 * @param request
	 */
	@RequestMapping(value = "/exportdirectuser01")
	public void exportDirectUser01(HttpServletResponse response, HttpServletRequest request) {
		try {
			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/gridInfo/CD类政企客户信息录入模板.xls";
			Boolean flag = true;
			List<Map<String, Object>> list = ExcelUtil.readGovBusUserExcelByPath(path, flag);
			String exportName = "CD政企客户信息";

			// 设置响应的编码
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			// 设置浏览器响应头对应的Content-disposition
			response.setHeader("Content-disposition", "attachment;filename=" + new String(exportName.getBytes("gbk"), "iso8859-1") + ".xls");

			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			this.mapIndexService.exportGovBusUserExcel(list, outputStream, flag);
			if (outputStream != null) {
				outputStream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询CD类政企客户信息
	 * 
	 * @Title getGovBusInfo
	 * @Author hubinbin
	 * @param page
	 * @param rows
	 * @param session
	 * @return PageJqGrid<Map<String,Object>>
	 */
	@RequestMapping(value = "/getGovBusInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getGovBusInfo(int page, int rows, String orgId, HttpSession session) {
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) mapIndexService.getGovBusInfo(page, rows, orgId);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	/**
	 * 根据条件查询网格直销经理信息
	 * 
	 * @Author liupeidong
	 * @param page
	 * @param rows
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/getDirectSaleInfoByParam", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getDirectSaleInfoByParam(int page, int rows, HttpServletRequest request, HttpSession session) {
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		String orgLevel = user.getOrgLevel().toString();
		String ingrid = request.getParameter("ingrid");
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) mapIndexService.getDirectSaleInfoByParam(page, rows, orgId, orgLevel, ingrid);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	/**
	 * 更改直销经理信息
	 * 
	 * @Title removeDirectSaleGrid
	 * @Author liupeidong
	 * @param request
	 * @param response
	 * @return String
	 */
	@RequestMapping(value = "/removeDirectSaleGrid", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String removeDirectSaleGrid(HttpServletRequest request, HttpServletResponse response) {

		String ids = request.getParameter("oids");
		List<String> idList = Arrays.asList(ids.split(","));
		mapIndexService.removeDirectSaleGrid(idList);

		return "0";
	}

	/**
	 * 根据区县id查询网格
	 * 
	 * @Title selectGridByOrgid
	 * @author liupeidong
	 * @param page
	 * @param rows
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/selectGridByOrgid", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectGridByOrgid(int page, int rows, HttpServletRequest request, HttpSession session) {

		String orgid = request.getParameter("orgid");
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) mapIndexService.selectGridByOrgid(page, rows, orgid);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	/**
	 * 更改直销经理状态
	 * 
	 * @Title updateDirectSaleChannel
	 * @Author liupeidong
	 * @param request
	 * @param response
	 * @return String
	 */
	@RequestMapping(value = "/updateDirectSaleChannel", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String updateDirectSaleChannel(HttpServletRequest request, HttpServletResponse response) {
		String channelName = request.getParameter("CHNL_NAME");
		String channelCode = request.getParameter("CHNL_CODE");
		String ids = request.getParameter("officeids");
		List<String> idList = Arrays.asList(ids.split(","));
		mapIndexService.updateDirectSaleChannel(channelName, channelCode, idList);
		return null;
	}

	/**
	 * 根据条件查询CD类政企客户信息
	 * 
	 * @Author hubinbin
	 * @param page
	 * @param rows
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/getGovBusInfoByParam", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody PageJqGrid<Map<String, Object>> getGovBusInfoByParam(int page, int rows, HttpServletRequest request, HttpSession session) {
		String orgId = request.getParameter("orgId");
		String ingrid = request.getParameter("ingrid");
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) mapIndexService.getGovBusInfoByParam(page, rows, orgId, ingrid);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	/**
	 * 更改CD类政企客户状态
	 * 
	 * @Title addGovBusGrid
	 * @Author hubinbin
	 * @param request
	 * @param response
	 * @return String
	 */
	@RequestMapping(value = "/addGovBusGrid", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addGovBusGrid(HttpServletRequest request, HttpServletResponse response) {
		String gridname = request.getParameter("GRID_NAME");
		String gridcode = request.getParameter("GRID_CODE");
		String ids = request.getParameter("gcCodes");
		List<String> idList = Arrays.asList(ids.split(","));
		mapIndexService.addGovBusGrid(gridname, gridcode, idList);
		return null;
	}

	/**
	 * 更改CD类政企客户信息
	 * 
	 * @Title removeDirectSaleGrid
	 * @Author hubinbin
	 * @param request
	 * @param response
	 * @return String
	 */
	@RequestMapping(value = "/removeGovBusGrid", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String removeGovBusGrid(HttpServletRequest request, HttpServletResponse response) {

		String ids = request.getParameter("oids");
		List<String> idList = Arrays.asList(ids.split(","));
		mapIndexService.removeGovBusGrid(idList);

		return "0";
	}

	/**
	 * 根据区县id查询渠道
	 * 
	 * @Title selectChannelByOrgid
	 * @author liupeidong
	 * @param page
	 * @param rows
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/selectChannelByOrgid", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> selectChannelByOrgid(int page, int rows, String cntyIds, HttpServletRequest request, HttpSession session) {
		String[] officeIds = null;
		officeIds = cntyIds.split(",");
		Page<Map<String, Object>> tableInfo = (Page<Map<String, Object>>) mapIndexService.selectChannelByOrgid(page, rows, officeIds);
		PageJqGrid<Map<String, Object>> tableInfoJq = new PageJqGrid<>(tableInfo);
		return tableInfoJq;
	}

	/**
	 * 根据cellId查询小区信息（新增）
	 * 
	 * @Title selectCommunityCreateByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 * @throws ParseException
	 */
	@RequestMapping(value = "/selectCommunityCreateByCellId", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String selectCommunityCreateByCellId(String cellId) throws ParseException {
		Map<String, Object> communityMap = mapIndexService.selectCommunityCreateByCellId(cellId);
		String json = JSONObject.toJSONString(communityMap);
		return json;
	}

	/**
	 * 根据cellId查询小区信息（修改）
	 * 
	 * @Title selectCommunityEditByCellId
	 * @Author xiaogaoxiang
	 * @param cellId
	 * @return String
	 */
	@RequestMapping(value = "/selectCommunityEditByCellId", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String selectCommunityEditByCellId(String cellId) {
		Map<String, Object> communityMap = mapIndexService.selectCommunityEditByCellId(cellId);
		String shape = mapIndexService.selectCommunityShapeByCellId(cellId);
		String shapeGxh = mapIndexService.selectCommunityShapeGxhByCellId(cellId);
		communityMap.remove("SHAPE");
		communityMap.put("SHAPE", shape);
		communityMap.remove("SHAPEGXH");
		communityMap.put("SHAPEGXH", shapeGxh);
		String json = JSONObject.toJSONString(communityMap);
		return json;
	}

	/**
	 * 基础信息类型选择后，获取基础信息下拉框内容
	 * 
	 * @Title getBasicPoiInfo
	 * @Author xiaogaoxiang
	 * @param basicPoiOneInfoSelect
	 * @return String
	 */
	@RequestMapping(value = "/getBasicPoiInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBasicPoiInfo(String orgId, String basicPoiOneInfoSelect) {
		try {
			List<Map<String, Object>> gridInfo = mapIndexService.getBasicPoiInfo(orgId, basicPoiOneInfoSelect);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 根据基础单元类型，基础单元查询对应的经纬度
	 * 
	 * @Title getBasicPoiInfoById
	 * @Author xiaogaoxiang
	 * @param basicPoiOneInfoSelect
	 * @param basicPoiTwoInfoSelect
	 * @return String
	 */
	@RequestMapping(value = "/getBasicPoiInfoById", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBasicPoiInfoById(String basicPoiOneInfoSelect, String basicPoiTwoInfoSelect) {
		try {
			Map<String, Object> gridInfo = mapIndexService.getBasicPoiInfoById(basicPoiOneInfoSelect, basicPoiTwoInfoSelect);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}
}