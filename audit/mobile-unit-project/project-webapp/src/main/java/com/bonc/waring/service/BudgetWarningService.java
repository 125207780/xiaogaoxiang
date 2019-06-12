package com.bonc.waring.service;

import java.util.Date;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.DateUtil;
import com.bonc.system.dao.entity.SysUser;
import com.bonc.waring.dao.entity.RuleWarning;
import com.bonc.waring.dao.entity.WgYjWarnObj;
import com.bonc.waring.dao.mapper.BudgetWarningMapper;

@Service
public class BudgetWarningService {

	@Resource
	private BudgetWarningMapper mapper;

	public BudgetWarningMapper getMapper() {
		return mapper;
	}

	public void addWarnRule(RuleWarning ruleWarning, HttpServletRequest request) {
		SysUser sysUser = (SysUser) request.getSession().getAttribute(CST.SESSION_SYS_USER_INFO);
		ruleWarning.setWarnId(UUID.randomUUID().toString().replaceAll(" ", "-"));
		ruleWarning.setUserId(sysUser.getUserId());
		ruleWarning.setCreateUser(sysUser.getUserName());
		ruleWarning.setStatus("A");
		ruleWarning.setCreateDate(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
		mapper.addWarnRule(ruleWarning);
		String loginIds = ruleWarning.getLoginId();
		String[] strings = loginIds.split(",");
		for (int i = 0; i < strings.length; i++) {
			WgYjWarnObj wgYjWarnObj = new WgYjWarnObj();
			wgYjWarnObj.setObjId(strings[i]);
			wgYjWarnObj.setWarnId(ruleWarning.getWarnId());
			mapper.addWgYjWarnObj(wgYjWarnObj);
		}
	}

	public void updateWarnRule(RuleWarning ruleWarning, HttpServletRequest request) {
		ruleWarning.setCreateDate(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
		mapper.updateWarnRule(ruleWarning);
		String loginIds = ruleWarning.getLoginId();
		String[] strings = loginIds.split(",");
		mapper.deleteWgYjWarnObj(ruleWarning.getWarnId());
		for (int i = 0; i < strings.length; i++) {
			WgYjWarnObj wgYjWarnObj = new WgYjWarnObj();
			wgYjWarnObj.setObjId(strings[i]);
			wgYjWarnObj.setWarnId(ruleWarning.getWarnId());
			mapper.addWgYjWarnObj(wgYjWarnObj);
		}
	}

	public String updateStautsInfo(String warnId) {
		String info = "";
		this.mapper.updateStauts(warnId);
		info = "更新成功";
		return info;
	}

}
