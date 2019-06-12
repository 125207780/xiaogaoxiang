package com.bonc.waring.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.waring.dao.entity.RuleWarning;
import com.bonc.waring.service.BudgetWarningService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/warning")
public class GudgetWarningAction {

	@Resource
	private BudgetWarningService budgetWarningService;

	@Resource
	private KpiManagerService kpiManagerService;

	@RequestMapping(value = "/getRuleWarning", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<RuleWarning> getRuleWaring(RuleWarning ruleWarning, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<RuleWarning> ruleWarningInfo = (Page<RuleWarning>) budgetWarningService.getMapper().getRuleWarning(ruleWarning);
		PageJqGrid<RuleWarning> ruleWaringJqgrid = new PageJqGrid<>(ruleWarningInfo);
		return ruleWaringJqgrid;
	}

	@RequestMapping(value = "/initSelectOrg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initSelectOrg(String orgId) {
		try {
			Map<String, List<OrgSearch>> initSeletOrg = kpiManagerService.initSeletOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, initSeletOrg);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_SECCESS);
		}

	}

	@RequestMapping(value = "/getChildrenOrg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChildrenOrg(String orgId) {
		try {
			Map<String, List<OrgSearch>> initSeletOrg = kpiManagerService.getChildrenOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, initSeletOrg);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getChnlInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChnlInfo(String orgId) {
		try {
			List<Map<String, Object>> chnlInfo = this.budgetWarningService.getMapper().getChnlInfo(orgId);
			return Ajax.responseString(CST.RES_SECCESS, chnlInfo);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getRangeInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getRangeInfo() {
		try {
			List<Map<String, Object>> rangeInfo = this.budgetWarningService.getMapper().getRangeInfo();
			return Ajax.responseString(CST.RES_SECCESS, rangeInfo);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getWarnType", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getWarnType() {
		try {
			List<Map<String, Object>> rangeInfo = this.budgetWarningService.getMapper().getWarnType();
			return Ajax.responseString(CST.RES_SECCESS, rangeInfo);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getWarnStyle", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getWarnStyle() {
		try {
			List<Map<String, Object>> rangeInfo = this.budgetWarningService.getMapper().getWarnStyle();
			return Ajax.responseString(CST.RES_SECCESS, rangeInfo);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getWarnRule", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getWarnRule() {
		try {
			List<Map<String, Object>> rangeInfo = this.budgetWarningService.getMapper().getWarnRule();
			return Ajax.responseString(CST.RES_SECCESS, rangeInfo);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getKpiInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getKpiInfo() {
		try {
			List<Map<String, Object>> kpiInfo = this.budgetWarningService.getMapper().getKpiInfo();
			return Ajax.responseString(CST.RES_SECCESS, kpiInfo);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getObject", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getObject(String orgId) {
		try {
			List<Map<String, Object>> objectInfo = this.budgetWarningService.getMapper().getObject(orgId);
			return Ajax.responseString(CST.RES_SECCESS, objectInfo);
		} catch (Exception e) {
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/addWarnRule", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addWarnRule(RuleWarning ruleWarning, HttpServletRequest request) {
		try {
			this.budgetWarningService.addWarnRule(ruleWarning, request);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/updateWarnRule", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateWarnRule(RuleWarning ruleWarning, HttpServletRequest request) {
		try {
			this.budgetWarningService.updateWarnRule(ruleWarning, request);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/checkRuleWarning", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String checkRuleWarning(String warnId) {
		try {
			List<Map<String, Object>> checkRuleWarning = this.budgetWarningService.getMapper().checkRuleWarning(warnId);
			return Ajax.responseString(CST.RES_SECCESS, checkRuleWarning);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}

	}

	@RequestMapping(value = "/getStauts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getStauts(String warnId) {
		try {
			String setStautsInfo = budgetWarningService.updateStautsInfo(warnId);
			return Ajax.responseString(CST.RES_SECCESS, setStautsInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "状态更新失败");
		}
	}

	@RequestMapping(value = "/getGridObject", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGridObject(String gridCode) {
		try {
			List<Map<String, Object>> checkRuleWarning = this.budgetWarningService.getMapper().getGridObject(gridCode);
			return Ajax.responseString(CST.RES_SECCESS, checkRuleWarning);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getchnlObject", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getchnlObject(String chnlCode) {
		try {
			List<Map<String, Object>> checkRuleWarning = this.budgetWarningService.getMapper().getchnlObject(chnlCode);
			return Ajax.responseString(CST.RES_SECCESS, checkRuleWarning);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/selectObjectNameAndId", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectObjectNameAndId(String warnId) {
		try {
			List<Map<String, Object>> checkRuleWarning = this.budgetWarningService.getMapper().selectObjectNameAndId(warnId);
			return Ajax.responseString(CST.RES_SECCESS, checkRuleWarning);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

}
