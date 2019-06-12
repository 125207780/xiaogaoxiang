package com.bonc.system.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.DateUtil;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.HelpDocToFtp;
import com.bonc.system.service.HelpManagerService;
import com.github.pagehelper.Page;

@Controller
@RequestMapping(value = "/syshelp")
public class HelpManagerAction {
	@Resource
	private HelpManagerService helpManagerService;

	/**
	 * 分页查询
	 * 
	 * @param sysHelp
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/selectpagelist")
	@ResponseBody
	public PageJqGrid<HelpDocToFtp> selectPageList(HelpDocToFtp po, Integer page, Integer rows) {
		Page<HelpDocToFtp> pageList = this.helpManagerService.selectPageList(po, page, rows);
		PageJqGrid<HelpDocToFtp> pageJqGrid = new PageJqGrid<HelpDocToFtp>(pageList);
		return pageJqGrid;
	}

	/**
	 * 新增修改
	 * 
	 * @param sysHelp
	 * @return
	 */
	@RequestMapping(value = "/insertOrUpdateSysHelp", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String insertOrUpdateSysHelp(MultipartFile file, HelpDocToFtp vo, String id, HttpServletRequest request) {
		try {
			// HelpDocToFtp po = new HelpDocToFtp();
			// String id = po.getId();
			vo.setTimeId(DateUtil.getToday("yyyy-MM-dd hh:mm:ss"));
			if (StringUtils.isBlank(id)) {
				System.out.println("新增：----------------------" + vo.getId());
				// boolean result = this.helpManagerService.upload(file, vo);
				return "redirect:/pages/jsp/system/syshelp/sysHelp.jsp";
			} else {
				System.out.println("修改：----------------------" + vo.getId());
				// boolean result = this.helpManagerService.updateSysHelp(file,
				// vo);
				return "redirect:/pages/jsp/system/syshelp/sysHelp.jsp";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "redirect:/pages/jsp/system/syshelp/sysHelp.jsp";
		}
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deletesyshelpbyId")
	@ResponseBody
	public String deletesyshelpbyId(String id) {
		try {
			boolean result = this.helpManagerService.deletesyshelpbyId(id);
			;
			if (result) {
				return Ajax.responseString(CST.RES_SECCESS, result);
			} else {
				return Ajax.responseString(CST.RES_LOGIC_ERROR, result);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 下载文件
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/downLoadsyshelpbyId")
	@ResponseBody
	public String downLoadsyshelpbyId(MultipartFile file, String id, HttpServletRequest request, HttpServletResponse response) {
		try {
			boolean result = this.helpManagerService.downLoadsyshelpbyId(file, id, request, response);
			if (result) {
				return Ajax.responseString(CST.RES_SECCESS, result);
			} else {
				return Ajax.responseString(CST.RES_LOGIC_ERROR, result);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 表单弹出
	 * 
	 * @param request
	 * @param menuId
	 * @return
	 */
	@RequestMapping(value = "/showsyshelpform")
	public String showSysHelpForm(HttpServletRequest request, String id) {
		HelpDocToFtp vo = this.helpManagerService.selectSysHelpById(id);// 查询要修改的对象
		request.setAttribute("vo", vo);
		return "pages/jsp/system/syshelp/sysHelpForm";
	}

}
