package com.bonc.map.action;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.RequestContext;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bonc.common.cst.CST;
import com.bonc.common.page.Page;
import com.bonc.common.utils.Ajax;
import com.bonc.export.ExcelUtil;
import com.bonc.gridinfo.dao.entity.EvaluationKpi;
import com.bonc.map.dao.entity.RemindEntity;
import com.bonc.map.service.FirstPageService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping(value = "/firstPage")
public class FirstPageAction {
	@Resource
	private FirstPageService firstPageService;

	@RequestMapping(value = "/getCityKpi")
	@ResponseBody
	public List<Map<String, Object>> getCityKpi(String pid, String kpiId, String typeId) {
		// List<Map<String, Object>> result = new ArrayList<>();
		// map用于判断连接那张表
		/*
		 * if("MAP101".equals(typeId)) { List<Map<String,Object>> level =
		 * firstPageService.getLevel(pid); String orglevel="";
		 * if(level.size()>0) {
		 * orglevel=level.get(0).get("ORGLEVEL").toString(); } //展示市的信息
		 * if("2".equals(orglevel)) {
		 * result=firstPageService.getCityKpiCity(pid,kpiId); } //展示县的信息
		 * if("3".equals(orglevel)) {
		 * result=firstPageService.getCityKpiOrg(pid,kpiId); } //展示网格的信息
		 * 
		 * if("4".equals(orglevel)) {
		 * result=firstPageService.getCityKpiGrid(pid,kpiId); }
		 * 
		 * } if("MAP102".equals(typeId)) { List<Map<String,Object>> level =
		 * firstPageService.getLevel(pid); String orglevel="";
		 * if(level.size()>0) {
		 * orglevel=level.get(0).get("ORGLEVEL").toString(); }
		 * if("2".equals(orglevel)) {
		 * result=firstPageService.getCityKpiPercentCity(pid,kpiId); }
		 * if("3".equals(orglevel)) {
		 * result=firstPageService.getCityKpiPercentOrg(pid,kpiId); }
		 * if("4".equals(orglevel)) {
		 * result=firstPageService.getCityKpiPercentGrid(pid,kpiId); }
		 * 
		 * } if("MAP103".equals(typeId)) { List<Map<String,Object>> level =
		 * firstPageService.getLevel(pid); String orglevel="";
		 * if(level.size()>0) {
		 * orglevel=level.get(0).get("ORGLEVEL").toString(); }
		 * if("2".equals(orglevel)) {
		 * result=firstPageService.getCityKpiIncomeCity(pid,kpiId); }
		 * if("3".equals(orglevel)) {
		 * result=firstPageService.getCityKpiIncomeOrg(pid,kpiId); }
		 * if("4".equals(orglevel)) {
		 * result=firstPageService.getCityKpiIncomeGrid(pid,kpiId); }
		 * 
		 * } if("MAP104".equals(typeId)) {
		 * result=firstPageService.getCityKpiAbility(pid,kpiId); }
		 */
		return firstPageService.getCityKpi(pid);
		// return result;
	}

	/**
	 * 获取指标分类
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getTypeList")
	@ResponseBody
	public List<Map<String, Object>> getTypeList() {
		List<Map<String, Object>> result = new ArrayList<>();
		List<Map<String, Object>> detail = firstPageService.getTypeList();
		// 暂时不知道指标分类的表，先这样写吧// 已经添加真实数据
		for (int i = 0; i < detail.size(); i++) {
			Map<String, Object> m = new HashMap<>();
			m.put("NAME", detail.get(i).get("CONDITION_NAME")); // 固定的，与js对应
			m.put("VALUE", detail.get(i).get("CONDITION_CODE")); // 固定的，与js对应
			result.add(m);
		}
		return result;
	}

	/**
	 * 获取指标列表
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getKpiList")
	@ResponseBody
	public List<Map<String, Object>> getKpiList(String typeId) {
		List<Map<String, Object>> result = new ArrayList<>();
		List<Map<String, Object>> detail = firstPageService.getKpiList(typeId);
		// 暂时不知道指标分类的表，先这样写吧 ,以后要根据typeId 查询 // 真实数据
		for (int i = 0; i < detail.size(); i++) {
			Map<String, Object> m = new HashMap<>();
			m.put("NAME", detail.get(i).get("CONDITION_NAME")); // 固定的，与js对应
			m.put("VALUE", detail.get(i).get("CONDITION_CODE"));
			result.add(m);
		}
		return result;
	}

	/**
	 * 获取指标列表
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getChannelTable", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> getChannelTable(String code) {
		List<Map<String, Object>> result = firstPageService.getChannelTable(code);

		return result;
	}

	/**
	 * 获取地图页面的下拉框
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getMapOptionList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> getMapOptionList(String loginId) {
		List<Map<String, Object>> result = firstPageService.getMapOptionList(loginId);

		return result;
	}

	/**
	 * 获取地图页面的下拉框（获取渠道名称）
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getMapOptionChannelList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> getMapOptionChannelList(String loginId) {
		List<Map<String, Object>> result = firstPageService.getMapOptionChannelList(loginId);

		return result;
	}

	@RequestMapping(value = "/getMapSignNameByCode", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> getMapSignNameByCode(String chnlCode) {
		List<Map<String, Object>> result = firstPageService.getMapSignNameByCode(chnlCode);

		return result;
	}

	/**
	 * 获取地图页面的表格信息
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getMapTableList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Map<String, Object>> getMapTableList(String signingId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		List<Map<String, Object>> infoData = firstPageService.getMapTableList(signingId);
		Page<Map<String, Object>> pageMap = new Page<Map<String, Object>>(new PageInfo<Map<String, Object>>(infoData));
		return pageMap;

	}

	/**
	 * 获取地图页面的表格信息
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getMapTextArea", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String, Object> getMapTextArea(String signingId) {

		Map<String, Object> infoData = firstPageService.getMapTextArea(signingId);

		return infoData;

	}

	/**
	 * 签约后修改状态
	 * 
	 * @return
	 */

	@RequestMapping(value = "/updateStatus", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String updateStatus(String signingId, String physicalId) {

		try {
			int gridInfo = firstPageService.updateStatus(signingId);
			Map<String, Object> params = new HashMap<>();
			params.put("signingId", signingId);
			List<String> a = Arrays.asList(physicalId.split(","));
			List<String> id = new ArrayList<>();
			id.addAll(a);
			params.put("ids", id);
			firstPageService.updateStatusPhysical(params);
			firstPageService.updateStatusPhysicalReturn(params);
			firstPageService.updateStatusArea(signingId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * 全不签约后修改状态
	 * 
	 * @return
	 */

	@RequestMapping(value = "/updateStatusRturnAll", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String updateStatusRturnAll(String signingId) {

		try {
			int gridInfo = firstPageService.updateStatusReturnAll(signingId);
			firstPageService.updateStatusPhysicalReturnAll(signingId);

			firstPageService.updateStatusAreaReturnAll(signingId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * 获取地图页面的下拉框
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getTest", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> getTest(String dat) {
		List<Map<String, Object>> result = firstPageService.getTest(dat);

		return result;
	}

	/**
	 * 获取indexenrytable
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getindexEnryTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Map<String, Object>> getindexEnryTable(String orgId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		List<Map<String, Object>> infoData = firstPageService.getindexEnryTable(orgId);
		Page<Map<String, Object>> pageMap = new Page<Map<String, Object>>(new PageInfo<Map<String, Object>>(infoData));
		return pageMap;

	}

	/**
	 * 获取option name
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getOptionName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getOptionName(String orgId) {

		try {
			List<Map<String, Object>> gridInfo = firstPageService.getOptionName(orgId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "获取Option失败！");
		}

	}

	/**
	 * table 刷新
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getReloadTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Map<String, Object>> getReloadTable(String orgId, Integer page, Integer rows, String date, String name, String status) {
		PageHelper.startPage(page, rows);
		List<Map<String, Object>> infoData = firstPageService.getReloadTable(orgId, date, name, status);
		Page<Map<String, Object>> pageMap = new Page<Map<String, Object>>(new PageInfo<Map<String, Object>>(infoData));
		return pageMap;

	}

	/**
	 * table 删除数据getDeleteTable
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getDeleteTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getDeleteTable(String orgId, String KPI_ID) {

		try {
			Map<String, Object> params = new HashMap<>();
			params.put("orgId", orgId);
			List<String> a = Arrays.asList(KPI_ID.split(","));
			List<String> id = new ArrayList<>();
			id.addAll(a);
			params.put("ids", id);
			int gridInfo = firstPageService.getDeleteTable(params);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * table更新 //看看谁调用他
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getUpdateTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Map<String, Object>> getUpdateTable(String orgId, Integer page, Integer rows, String KPI_ID) {
		PageHelper.startPage(page, rows);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("orgId", orgId);
		List<String> a = Arrays.asList(KPI_ID.split(","));
		List<String> id = new ArrayList<>();
		id.addAll(a);
		params.put("ids", id);
		firstPageService.getOnlyUpdate(params);
		List<Map<String, Object>> infoData = firstPageService.getUpdateTable(orgId, KPI_ID);
		Page<Map<String, Object>> pageMap = new Page<Map<String, Object>>(new PageInfo<Map<String, Object>>(infoData));
		return pageMap;

	}

	/**
	 * table更新 //后面还需要加上指标提醒
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getOnlyUpdate", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getOnlyUpdate(String orgId, String KPI_ID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("orgId", orgId);
		List<String> a = Arrays.asList(KPI_ID.split(","));
		List<String> id = new ArrayList<>();
		id.addAll(a);
		params.put("ids", id);
		// firstPageService.getOnlyUpdate(params);
		int gridInfo = firstPageService.getOnlyUpdate(params);
		List<Map<String, Object>> grid = firstPageService.getCheckData(orgId);
		if (grid != null) {
			firstPageService.deleteData(orgId);
		}
		return Ajax.responseString(CST.RES_SECCESS, gridInfo);

	}

	/**
	 * 获取getManagerTable
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getManagerTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Map<String, Object>> getManagerTable(String orgId, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		List<Map<String, Object>> infoData = firstPageService.getManagerTable(orgId);
		Page<Map<String, Object>> pageMap = new Page<Map<String, Object>>(new PageInfo<Map<String, Object>>(infoData));
		return pageMap;

	}

	/**
	 * 获取getManagerTable (search)
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getSearchManagerTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Map<String, Object>> getManagerTable(String orgId, Integer page, Integer rows, String date, String name, String status) {
		PageHelper.startPage(page, rows);
		List<Map<String, Object>> infoData = firstPageService.getSearchManagerTable(orgId, date, name, status);
		Page<Map<String, Object>> pageMap = new Page<Map<String, Object>>(new PageInfo<Map<String, Object>>(infoData));
		return pageMap;

	}

	/**
	 * manager update
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getManagerUpdateTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getManagerUpdateTable(String orgId, String KPI_ID) {

		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("orgId", orgId);
			List<String> a = Arrays.asList(KPI_ID.split(","));
			List<String> id = new ArrayList<>();
			id.addAll(a);
			params.put("ids", id);
			int gridInfo = firstPageService.getManagerUpdateTable(params);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * manager update
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getMapChannelName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getMapChannelName(String signingId) {

		try {
			Map<String, Object> gridInfo = firstPageService.getMapChannelName(signingId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * manager reject
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getManagerRejectTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getManagerRejectTable(String orgId, String KPI_ID) {

		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("orgId", orgId);
			List<String> a = Arrays.asList(KPI_ID.split(","));
			List<String> id = new ArrayList<>();
			id.addAll(a);
			params.put("ids", id);
			int gridInfo = firstPageService.getManagerRejectTable(params);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * manager 更新目标值(单个和批量)
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getManagerUpdateValTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getManagerRejectTable(String orgId, String KPI_ID, String val) {

		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("orgId", orgId);
			params.put("val", val);
			List<String> a = Arrays.asList(KPI_ID.split(","));
			List<String> id = new ArrayList<>();
			id.addAll(a);
			params.put("ids", id);
			int gridInfo = firstPageService.getManagerUpdateValTable(params);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * manager reject
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getManagerBlur", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getManagerBlur(String orgId, String KPI_ID, String val) {

		try {
			int gridInfo = firstPageService.getManagerBlur(orgId, KPI_ID, val);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！");
		}

	}

	/**
	 * 获取option name
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getSupplyOptionName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getSupplyOptionName(String orgId) {

		try {
			List<Map<String, Object>> gridInfo = firstPageService.getSupplyOptionName(orgId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "获取Option失败！");
		}

	}

	/**
	 * 添加需求name
	 * 
	 * @return
	 */
	@RequestMapping(value = "/saveSupplyName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String saveSupplyName(String orgId, String nameVal) {

		try {
			Map<String, Object> params = new HashMap<String, Object>();
			List<String> a = Arrays.asList(nameVal.split(","));
			List<RemindEntity> entity = new ArrayList<>();
			for (int i = 0; i < a.size(); i++) {
				RemindEntity item = new RemindEntity();
				String id = UUID.randomUUID().toString().replace("-", "").toLowerCase();
				item.setORG_ID(orgId);
				item.setREMIND_ID(id);
				item.setCONTENT(a.get(i));
				entity.add(item);
			}
			params.put("ids", entity);

			int gridInfo = firstPageService.saveSupplyName(params);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "签约失败！看看");
		}

	}

	/**
	 * 获取remind name
	 * 
	 * @return
	 */

	@RequestMapping(value = "/getRemindName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getRemindName(String orgId) {

		try {
			List<Map<String, Object>> gridInfo = firstPageService.getRemindName(orgId);
			return Ajax.responseString(CST.RES_SECCESS, gridInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "获取Option失败！");
		}

	}

	private static final String UPLOAD_DIR = "/srv/www/upload/";
	private static final long MAX_FILE_SISE = 31457280;

	@RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadFile(@RequestParam("kpiFile") MultipartFile file, MultipartHttpServletRequest request, HttpSession session, Model m) {
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
				SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
				String orgId = user.getOrgId();
				// String orgId="admin1";
				List<EvaluationKpi> kpi = ExcelUtil.readExcelByPath(fileName1, orgId);
				int mum = kpi.size();
				if (mum == 0) {
					message = "模板中无数据";
					request.setAttribute("message", message);
					return "pages/gis/exam/gridIndexEntryAlert";
				}

				List<EvaluationKpi> saveKpi = new ArrayList<>();
				for (int i = 0; i < kpi.size(); i++) {
					int count = firstPageService.checkKpiCode(kpi.get(i).getKpiCode());
					if (count != 0) {
						saveKpi.add(kpi.get(i));
					}
				}
				if (saveKpi.size() > 0) {
					firstPageService.saveImportData(saveKpi);
				}
				kpi.removeAll(saveKpi);
				String a = "";
				for (int j = 0; j < kpi.size(); j++) {
					if (j == kpi.size() - 1) {
						a += kpi.get(j).getKpiCode();
					} else {
						a += kpi.get(j).getKpiCode() + ",";
					}

				}
				if (kpi.size() == 0) {
					message = "文件导入成功";
				} else {
					message = "文件导入成功,但" + a + "不在标准指标库中";
				}

			} catch (Exception e) {
				message = "文件导入失败";
				e.printStackTrace();

			}
		}
		request.setAttribute("message", message);
		return "pages/gis/exam/gridIndexEntryAlert";
	}

	/**
	 * 
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String fileUpload(HttpServletRequest request) throws Exception {
		String filePath = "";

		String path = request.getSession().getServletContext().getRealPath("/");
		path = path.substring(0, path.length() - 1);
		path += "/gis/uploadFile";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String secondDir = sdf.format(new Date());
		path += "/" + secondDir;

		request.setCharacterEncoding("utf-8");
		RequestContext requestContext = new ServletRequestContext(request);

		if (FileUpload.isMultipartContent(requestContext)) {

			DiskFileItemFactory factory = new DiskFileItemFactory();
			// factory.setRepository(new File("c:/tmp/"));
			ServletFileUpload upload = new ServletFileUpload(factory);
			// upload.setHeaderEncoding("utf-8");
			// upload.setSizeMax(200000000);
			List<FileItem> items = new ArrayList<>();
			try {
				items = upload.parseRequest(request);
			} catch (FileUploadException e1) {
				System.out.println("文件上传发生错误" + e1.getMessage());
			}

			Iterator<FileItem> it = items.iterator();
			while (it.hasNext()) {
				FileItem fileItem = (FileItem) it.next();
				if (fileItem.isFormField()) {
					System.out.println(
							fileItem.getFieldName() + "   " + fileItem.getName() + "   " + new String(fileItem.getString().getBytes("iso8859-1"), "utf-8"));
				} else {
					System.out.println(fileItem.getFieldName() + "   " + fileItem.getName() + "   " + fileItem.isInMemory() + "    " + fileItem.getContentType()
							+ "   " + fileItem.getSize());

					if (fileItem.getName() != null && fileItem.getSize() != 0) {
						String randomStr = request.getSession().getId() + new Date().getTime();
						String fileItemName = fileItem.getName();
						if (fileItemName.contains("/")) {
							fileItemName = fileItemName.substring(fileItemName.lastIndexOf("/"));
						} else if (fileItemName.contains("\\")) {
							fileItemName = fileItemName.substring(fileItemName.lastIndexOf("\\") + 1);
						}

						String fileName = randomStr + fileItemName.substring(fileItemName.lastIndexOf("."));

						File newFile = new File(path + "/" + fileName);
						filePath = "gis/uploadFile/" + secondDir + "/" + fileName;
						File fileParent = newFile.getParentFile();

						// 创建文件
						if (!fileParent.exists()) {
							fileParent.mkdirs();
						}
						newFile.createNewFile();

						try {
							fileItem.write(newFile);
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						System.out.println("文件没有选择 或 文件内容为空");
					}
				}

			}
		}
		return filePath;
	}

	@RequestMapping(value = "/importData", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public @ResponseBody String importData(HttpServletRequest request, HttpSession session) throws Exception {
		// String path =
		// request.getSession().getServletContext().getRealPath("/");

		String filePath = request.getParameter("files");
		// 获取当前登录用户
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		List<EvaluationKpi> kpi = ExcelUtil.readExcelByPath(filePath, orgId);
		firstPageService.saveImportData(kpi);

		return "";
	}

	@RequestMapping(value = "/getTestExcel", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getTestExcel() {

		try {
			String excel_name = "C:\\Users\\13055\\Desktop\\基础单元信息列表.xls";
			String orgId = "admin1";
			List<EvaluationKpi> list = ExcelUtil.readExcelByPath(excel_name, orgId);
			System.out.println(list.get(0).getKpiId() + "ffffffffffffffffffffffffffffffffffffff");
			firstPageService.saveImportData(list);
			return Ajax.responseString(CST.RES_SECCESS, list.size());
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "获取Option失败！");
		}

	}

	// 导出的功能
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	public void exportExcel(HttpServletResponse response, HttpServletRequest request) {
		try {
			String orgId = "";
			String path = request.getSession().getServletContext().getRealPath("") + "/pages/gis/exam/指标模板.xls";
			List<EvaluationKpi> list = ExcelUtil.readExcelByPath(path, orgId);
			// List<ChannelManage> empList =
			// channelStationService.selectChannelManageAll(gridCode);
			// 使用response对象输入到excel中(固定格式)
			response.setContentType("application/x-execl");
			// 设置头
			response.setHeader("Content-Disposition", "attachment;filename=" + new String("指标模板.xls".getBytes(), "ISO-8859-1"));
			// 输出流
			ServletOutputStream outputStream = response.getOutputStream();
			// supplierService.exportExcel(userList, outputStream);
			firstPageService.exportExcel(list, outputStream);
			if (outputStream != null) {
				outputStream.close();
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

	}
}
