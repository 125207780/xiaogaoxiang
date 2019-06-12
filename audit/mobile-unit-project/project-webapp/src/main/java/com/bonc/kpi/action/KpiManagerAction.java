package com.bonc.kpi.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.kpi.dao.entity.BaseKpi;
import com.bonc.kpi.dao.entity.KpiList;
import com.bonc.kpi.dao.entity.KpiScreen;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.dao.entity.ResultMsg;
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 指标管理控制类
 * 
 * @author yangdong@bonc.com.cn
 *
 */

@Controller
@RequestMapping(value = "/kpi")
public class KpiManagerAction {

	@Resource
	private KpiManagerService kpiManagerService;

	/**
	 * 初始化下拉条
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/initSeletOrg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initSeletOrg(String orgId) {
		try {
			Map<String, List<OrgSearch>> orgInfo = this.kpiManagerService.initSeletOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, orgInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取当前机构下所有组织机构
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getChildrenOrg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChildrenOrg(String orgId) {
		try {
			SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
			Map<String, List<OrgSearch>> orgInfo = this.kpiManagerService.getChildrenOrg(orgId);
			return Ajax.responseString(CST.RES_SECCESS, sysOrg.getOrgLevel(), orgInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取周期
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getCountPeriod", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getCountPeriod(String orgId) {
		try {
			List<BaseKpi> countPeriodInfo = this.kpiManagerService.getMapper().getCountPeriod();
			return Ajax.responseString(CST.RES_SECCESS, countPeriodInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 初始化筛选条件
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/initKpiInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initKpiInfo() {
		try {
			List<KpiList> initKpiInfo = this.kpiManagerService.initKpiInfo();
			return Ajax.responseString(CST.RES_SECCESS, initKpiInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 初始化123级筛选条件
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/initTypeLevel", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initTypeLevel() {
		try {
			Map<String, List<KpiScreen>> initTypeLevelInfo = this.kpiManagerService.initTypeLevel();
			return Ajax.responseString(CST.RES_SECCESS, initTypeLevelInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getKpiScreen", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getKpiScreen(String listValue) {
		try {
			List<KpiScreen> initKpiScreen = this.kpiManagerService.getMapper().getKpiScreen(listValue);
			return Ajax.responseString(CST.RES_SECCESS, initKpiScreen);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 初始化指标名称
	 * 
	 * @return
	 */
	@RequestMapping(value = "/initKpiIndex", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initKpiIndex(BaseKpi baseKpi) {
		try {
			List<BaseKpi> initKpiIndexInfo = this.kpiManagerService.getMapper().initKpiIndex(baseKpi);
			return Ajax.responseString(CST.RES_SECCESS, initKpiIndexInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/changeTypeLevel", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String changeTypeLevel(String screenCode) {
		try {
			List<KpiScreen> initKpiIndexInfo = kpiManagerService.changeTypeLevel(screenCode);
			return Ajax.responseString(CST.RES_SECCESS, initKpiIndexInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/initResultMsg", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> initResultMsg(ResultMsg resultMsg, int rows, int page) {
		PageHelper.startPage(page, rows);
		Page<Map<String, Object>> resultMs = (Page<Map<String, Object>>) this.kpiManagerService.getResultMsg(resultMsg);
		PageJqGrid<Map<String, Object>> resultJqgrid = new PageJqGrid<>(resultMs);
		return resultJqgrid;
	}

	/**
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getOrgLevelAndLevelMax", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getOrgLevelAndLevelMax(String orgId) {
		try {
			// orgLevel
			SysOrg orgLevel = this.kpiManagerService.getMapper().getOrgLevel(orgId);
			// levelMax
			String levelMax = this.kpiManagerService.getMapper().getLevelMax(orgId);
			return Ajax.responseString(CST.RES_SECCESS, levelMax, orgLevel);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getTopFive", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getTopFive(String orgId, String kpiCode, String accountName, String accountValue) {
		try {
			List<Map<String, Object>> resultTopFive = this.kpiManagerService.getTopFive(orgId, kpiCode, accountName, accountValue);
			return Ajax.responseString(CST.RES_SECCESS, resultTopFive);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * @param resultMsg
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getNextOrgKpi", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getNextOrgKpi(ResultMsg resultMsg, String orgId) {
		try {
			List<Map<String, Object>> resultRight = this.kpiManagerService.getNextOrgKpi(resultMsg, orgId);
			return Ajax.responseString(CST.RES_SECCESS, resultRight);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * @param resultMsg
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getOrgKpiBar", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getOrgKpiBar(ResultMsg resultMsg, String orgId) {
		try {
			Map<String, Object> resultRight = this.kpiManagerService.getOrgKpiBar(resultMsg, orgId);
			return Ajax.responseString(CST.RES_SECCESS, resultRight);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}
}