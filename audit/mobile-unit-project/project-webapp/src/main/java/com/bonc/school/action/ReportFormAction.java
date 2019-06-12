package com.bonc.school.action;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.FtpClientUtil;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.school.service.ReportFormService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 报表专区
 * 
 * @author liulin
 *
 */
@Controller
@RequestMapping(value = "/getReportForm")
public class ReportFormAction {

	@Autowired
	private ReportFormService reportFormService;

	// 各高校校园客户情况日通报
	@RequestMapping(value = "/getReportForm1", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm1(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm1(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园基站报表
	@RequestMapping(value = "/getReportForm2", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm2(Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm2();
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 各地市校园客户情况日通报
	@RequestMapping(value = "/getReportForm3", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm3(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm3(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 各地市校园客户情况月报表
	@RequestMapping(value = "/getReportForm4", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm4(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm4(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 各高校校园客户情况月报表
	@RequestMapping(value = "/getReportForm5", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm5(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm5(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园重点活动办理情况表（日累计）
	@RequestMapping(value = "/getReportForm6", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm6(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm6(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园重点活动办理明细日报表
	@RequestMapping(value = "/getReportForm7", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm7(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm7(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 存量校园客户保有情况日报表
	@RequestMapping(value = "/getReportForm8", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm8(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm8(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园移动用户明细数据 月报表
	@RequestMapping(value = "/getReportForm9", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm9(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm9(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园异网用户明细数据 月报表
	@RequestMapping(value = "/getReportForm10", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm10(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm10(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园一经 月报表
	@RequestMapping(value = "/getReportForm11", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm11(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm11(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 校园一经 周报表
	@RequestMapping(value = "/getReportForm12", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm12(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm12(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 高校市场份额月报表
	@RequestMapping(value = "/getReportForm13", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm13(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm13(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	// 高校市场份额日报表
	@RequestMapping(value = "/getReportForm14", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getReportForm14(Integer page, Integer rows, String statisMonth) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> infoData = (Page<Map<String, Object>>) reportFormService.getReportForm14(statisMonth);
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(infoData);
		return basicUnitJqGrid;

	}

	private static final long MAX_FILE_SISE = 31000;

	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String uploadMarketFile(@RequestParam("helpCenterFile") MultipartFile file, MultipartHttpServletRequest request, HttpSession session)
			throws IllegalStateException, IOException {
		String message = "";
		if (!file.isEmpty()) {
			// 获取文件名，带扩展名
			String originFileName = file.getOriginalFilename();
			long site = file.getSize();
			if (site > MAX_FILE_SISE) {
				message = "文件不能大于30M";
				request.setAttribute("message", message);
				return "pages/gis/school/fileAlert";
			}
			/*
			 * // 上传文件 //得到上传文件的保存目录，将上传的文件存放于WEB-INF目录下，不允许外界直接访问，保证上传文件的安全
			 * String savePath = "F:/data/";
			 * //得到上传文件的保存目录，将上传的文件存放于WEB-INF目录下，不允许外界直接访问，保证上传文件的安全 File files
			 * = new File(savePath); //判断上传文件的保存目录是否存在 if (!files.exists() &&
			 * !files.isDirectory()) { //创建目录 files.mkdir(); }
			 */
			// 链接服务器文件地址（IP地址，登陆用户名，密码）
			// 采用FTPClient方式进行连接并写上传文件方法
			// 1、IP地址；2、登陆用户名；3、密码
			FtpClientUtil fcu = new FtpClientUtil("10.154.147.239", 21, "webuser", "3edc$RFV");
			fcu.uploadFile(originFileName, file.getInputStream(), "/home/audit_app/bonc/template/");
			reportFormService.savaFile(originFileName, "/home/audit_app/bonc/template/");
			message = "文件上传成功";
		} else {
			message = "文件上传失败";
		}
		request.setAttribute("message", message);

		return "pages/gis/school/fileAlert";
	}

	@SuppressWarnings("static-access")
	@RequestMapping(value = "/downFile", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public void downLoadMarketFile(String fileName, HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		FtpClientUtil fcu = new FtpClientUtil("10.154.147.239", 21, "webuser", "3edc$RFV");
		try {
			fcu.fileDown("/home/audit_app/bonc/template/", fileName, request, response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/findFile", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> findFile(Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> findByFileName = (Page<Map<String, Object>>) this.reportFormService.findFile();
		PageJqGrid<Map<String, Object>> basicUnitJqGrid = new PageJqGrid<>(findByFileName);
		return basicUnitJqGrid;

	}

	@RequestMapping(value = "/findFileByFileName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String findFileByFileName(String fileName) {
		try {
			List<Map<String, Object>> findByFileName = this.reportFormService.findByFileName(fileName);
			return Ajax.responseString(CST.RES_SECCESS, findByFileName);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/deleteFileByFileName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String deleteFileByFileName(String fileName) {
		try {
			String findByFileName = this.reportFormService.deleteFileByName(fileName);
			return Ajax.responseString(CST.RES_SECCESS, findByFileName);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "删除失败");
		}

	}

	// 联系人
	@RequestMapping(value = "/findByUser", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String findByUser() {
		try {
			Map<String, Object> findByUser = this.reportFormService.findByUser();
			return Ajax.responseString(CST.RES_SECCESS, findByUser);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	// 查询当前联系人的OA_ID
	@RequestMapping(value = "/findByOaId", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String findByOaId(String oaId) {
		try {
			int findByUser = this.reportFormService.findByOaId(oaId);
			return Ajax.responseString(CST.RES_SECCESS, findByUser);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}
}
