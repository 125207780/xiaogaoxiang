package com.bonc.system.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.system.dao.entity.SysMenuOperation;
import com.bonc.system.service.SysMenuOperationService;

@Controller
@RequestMapping(value = "/sysmenuoperation")
public class SysMenuOperationAction {

	@Resource
	private SysMenuOperationService sysMenuOperationService;

	/**
	 * 根据菜单id查询权限
	 * 
	 * @param menuId
	 * @return
	 */
	@RequestMapping(value = "/selectlistbymenuid")
	@ResponseBody
	public List<SysMenuOperation> selectListByMenuId(String menuId) {
		List<SysMenuOperation> list = this.sysMenuOperationService.selectListByMenuId(menuId);
		return list;
	}

	/**
	 * 跳转表单
	 * 
	 * @param request
	 * @param menuId
	 * @return
	 */
	@RequestMapping(value = "/showsysmenuoperationform")
	public String showSysMenuOperationForm(HttpServletRequest request, String menuId) {
		request.setAttribute("menuId", menuId);
		return "pages/jsp/system/sysmenuoperation/sysMenuOperationForm";
	}

	/**
	 * 新增
	 * 
	 * @param po
	 * @return
	 */
	@RequestMapping(value = "/insertsysmenuoperation")
	@ResponseBody
	public SysMenuOperation insertSysMenuOperation(SysMenuOperation po) {
		po = this.sysMenuOperationService.insertSysMenuOperation(po);
		return po;
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deletesysmenuoperationbyid")
	@ResponseBody
	public Boolean deleteSysMenuOperationById(String id) {
		Boolean bl = this.sysMenuOperationService.deleteSysMenuOperationById(id);
		return bl;
	}

	/**
	 * 校验
	 * 
	 * @param po
	 * @return
	 */
	@RequestMapping(value = "/check")
	@ResponseBody
	public Boolean check(SysMenuOperation po) {
		Boolean bl = this.sysMenuOperationService.selectCheck(po);
		return bl;
	}
}
