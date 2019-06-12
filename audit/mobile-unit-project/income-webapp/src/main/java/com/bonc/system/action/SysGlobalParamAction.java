package com.bonc.system.action;

import com.bonc.common.utils.PageJqGrid;
import com.bonc.system.dao.entity.SysGlobalParam;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.system.service.SysGlobalParamService;
import com.bonc.system.service.SysUserService;
import com.github.pagehelper.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;

@Controller
@RequestMapping(value = "/sysglobalparam")
public class SysGlobalParamAction {
	
	@Resource
	private SysGlobalParamService sysGlobalParamService;

	/**
	 * 分页查询
	 * @param sysGlobalParam
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping(value = "/selectpagelist")
	@ResponseBody
	public PageJqGrid<SysGlobalParam> selectPageList(SysGlobalParam sysGlobalParam, Integer page, Integer rows) {
		Page<SysGlobalParam> pageList = this.sysGlobalParamService.selectPageList(sysGlobalParam, page, rows);
		PageJqGrid<SysGlobalParam> pageJqGrid = new PageJqGrid<SysGlobalParam>(pageList);
		return pageJqGrid;
	}
	
	/**
	 * 表单弹出
	 * @param request
	 * @param paramName
	 * @return
	 */
	@RequestMapping(value = "/showsysglobalparamform")
	public String showSysGlobalParamForm(HttpServletRequest request, String paramName) {
		if(!StringUtils.isBlank(paramName)) {
			SysGlobalParam sysGlobalParam = this.sysGlobalParamService.selectSysGlobalParamByParamName(paramName);
			request.setAttribute("vo", sysGlobalParam);
		}
		return "pages/jsp/system/sysglobalparam/sysGlobalParamForm";
	}
	
	/**
	 * 新增修改
	 * @param sysGlobalParam
	 * @return
	 * @throws NoSuchAlgorithmException 
	 */
	@RequestMapping(value = "/insertorupdatesysglobalparam")
	@ResponseBody
	public SysGlobalParam insertOrUpdateSysGlobalParam(SysGlobalParam sysGlobalParam) throws NoSuchAlgorithmException {
		if(this.sysGlobalParamService.selectCheck(sysGlobalParam)) {
			sysGlobalParam = this.sysGlobalParamService.updateSysGlobalParam(sysGlobalParam);
		} else {
			sysGlobalParam = this.sysGlobalParamService.insertSysGlobalParam(sysGlobalParam);
		}
		return sysGlobalParam;
	}
	
	/**
	 * 删除
	 * @param paramName
	 * @return
	 */
	@RequestMapping(value = "/deletesysglobalparambyparamname")
	@ResponseBody
	public Boolean deleteSysUserById(String paramName) {
		Boolean bl = this.sysGlobalParamService.deleteSysGlobalParamByParamName(paramName);
		return bl;
	}
	
	/**
	 * 校验重复
	 * @param sysGlobalParam
	 * @return
	 */
	@RequestMapping(value = "/check")
	@ResponseBody
	public Boolean check(SysGlobalParam sysGlobalParam) {
		Boolean bl = this.sysGlobalParamService.selectCheck(sysGlobalParam);
		return bl;
	}
}