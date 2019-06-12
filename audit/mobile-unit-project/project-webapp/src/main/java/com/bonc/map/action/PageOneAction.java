package com.bonc.map.action;

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
import com.bonc.kpi.service.KpiManagerService;
import com.bonc.map.dao.entity.WgHfScale;
import com.bonc.map.service.PageOneService;
import com.bonc.system.dao.entity.SysOrg;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 首页控制类
 * 
 * @author yangdong@bonc.com.cn
 *
 */
@Controller
@RequestMapping(value = "/pageOne")
public class PageOneAction {

	@Resource
	private PageOneService pageOneService;

	@Resource
	private KpiManagerService kpiManagerService;

	/**
	 * 首页画像分析下拉框初始化
	 * 
	 * @Title initSelectPortrait @Author hubinbin @return String @throws
	 */
	@RequestMapping(value = "/initSelectPortrait", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String initSelectPortrait() {
		try {
			Map<String, Object> selectInfo = this.pageOneService.initSelectPortrait();
			return Ajax.responseString(CST.RES_SECCESS, selectInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 画像分析 根据选择的一级菜单，修改二级菜单内容(未加入Redis)
	 * 
	 * @Title getSelectChildren @Author hubinbin @return String @throws
	 */
	@RequestMapping(value = "/getSelectChildren", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getSelectChildren(String portraitCode) {
		try {
			List<Map<String, Object>> selectInfo = this.pageOneService.getMapper().getSelectChildren(portraitCode);
			return Ajax.responseString(CST.RES_SECCESS, selectInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 获取排名前五的城市和数据 获取某个规模数据
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getTopFive", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getTopFive(String orgId, String scale) {
		try {
			List<Map<String, Object>> scaleInfo = this.pageOneService.getTopFive(orgId, scale);
			return Ajax.responseString(CST.RES_SECCESS, scaleInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 首页规模统计数据 获取五个规模数据
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getFiveInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getFiveInfo(String orgId) {
		try {
			List<WgHfScale> scaleInfo = this.pageOneService.getFiveInfo(orgId);
			return Ajax.responseString(CST.RES_SECCESS, scaleInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 暂未发现调用 获取各组织机构五个规模数据
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getFiveBarInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getFiveBarInfo(String orgId) {
		try {
			List<Map<String, Object>> fiveBarInfo = this.pageOneService.getFiveBarInfo(orgId);
			return Ajax.responseString(CST.RES_SECCESS, fiveBarInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 新业务趋势折线图数据 获取近五天数据
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getTaskByFiveData", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getTaskByFiveData(String orgId, String lineId) {
		try {
			List<Map<String, Object>> fiveDayInfo = this.pageOneService.getTaskByFiveData(orgId, lineId);
			return Ajax.responseString(CST.RES_SECCESS, fiveDayInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 业务规模占比饼图+右侧规模占比数据
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getRightPie", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getRightPie(String orgId, String scale) {
		try {
			List<Map<String, Object>> scalePieInfo = this.pageOneService.getRightPie(orgId, scale);
			return Ajax.responseString(CST.RES_SECCESS, scalePieInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 业务规模占比表格(未加入Redis)
	 * 
	 * @param orgId
	 * @param scale
	 * @return
	 */
	@RequestMapping(value = "/getRightTable", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<Map<String, Object>> getRightTable(String orgId, String scale, Integer rows, Integer page) {
		try {
			SysOrg sysOrg = this.kpiManagerService.getMapper().getOrgLevel(orgId);
			if (null != sysOrg) {
				PageHelper.startPage(page, rows);
				Page<Map<String, Object>> scaleTableInfo = (Page<Map<String, Object>>) this.pageOneService.getRightTable(orgId, scale, sysOrg);
				PageJqGrid<Map<String, Object>> resultJqgrid = new PageJqGrid<>(scaleTableInfo);
				return resultJqgrid;
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 业务规模占比echarts图数据
	 * 
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value = "/getRightBar", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getRightBar(String orgId, String scale) {
		try {
			List<Map<String, Object>> scaleBarInfo = this.pageOneService.getRightBar(orgId, scale);
			return Ajax.responseString(CST.RES_SECCESS, scaleBarInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 画像分析 性别分布数据 未发现调用
	 * 
	 * @Title getSexPortrait @Author hubinbin @return String @throws
	 */
	@RequestMapping(value = "/getSexPortrait", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getSexPortrait(String orgId, String userType) {
		try {
			List<Map<String, Object>> sexInfo = this.pageOneService.getSexPortrait(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, sexInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	/**
	 * 年龄占比数据
	 * 
	 * @Title getNestingPie @Author hubinbin @return String @throws
	 */
	@RequestMapping(value = "/getNestingPie", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getNestingPie(String orgId, String userType) {
		try {
			Map<String, Object> nestingPie = this.pageOneService.getNestingPie(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, nestingPie);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getNestingBar", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getNestingBar(String orgId, String userType) {
		try {
			Map<String, Object> nestingBar = this.pageOneService.getNestingBar(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, nestingBar);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getInterestFeatures", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getInterestFeatures(String orgId, String userType) {
		try {
			Map<String, Object> interestFeatures = this.pageOneService.getInterestFeatures(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, interestFeatures);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getConsumeFeatures", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getConsumeFeatures(String orgId, String userType) {
		try {
			Map<String, Object> consumeFeatures = this.pageOneService.getConsumeFeatures(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, consumeFeatures);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getAreaAge", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getAreaAge(String orgId, String userType) {
		try {
			Map<String, Object> getAreaAge = this.pageOneService.getAreaAge(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, getAreaAge);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getArpuBar", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getArpuBar(String orgId, String userType) {
		try {
			Map<String, Object> getArpuBar = this.pageOneService.getArpuBar(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, getArpuBar);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getDouEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getDouEcharts(String orgId, String userType) {
		try {
			Map<String, Object> getDouEcharts = this.pageOneService.getDouEcharts(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, getDouEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getMouEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getMouEcharts(String orgId, String userType) {
		try {
			Map<String, Object> getMouEcharts = this.pageOneService.getMouEcharts(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, getMouEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getPreferenceEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getPreferenceEcharts(String orgId, String userType) {
		try {
			Map<String, Object> getPreferenceEcharts = this.pageOneService.getPreferenceEcharts(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, getPreferenceEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getAppEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getAppEcharts(String orgId, String userType) {
		try {
			Map<String, Object> getAppEcharts = this.pageOneService.getAppEcharts(orgId, userType);
			return Ajax.responseString(CST.RES_SECCESS, getAppEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getThreearpuEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getThreearpuEcharts(String orgId) {
		try {
			List<Map<String, Object>> getThreearpuEcharts = this.pageOneService.getThreearpuEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getThreearpuEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getBroadbandEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getBroadbandEcharts(String orgId) {
		try {
			Map<String, Object> getBroadbandEcharts = this.pageOneService.getBroadbandEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getBroadbandEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getFlowEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getFlowEcharts(String orgId) {
		try {
			Map<String, Object> getFlowEcharts = this.pageOneService.getFlowEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getFlowEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getUserScale", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getUserScale(String orgId) {
		try {
			Map<String, Object> getUserScale = this.pageOneService.getUserScale(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getUserScale);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getInNet", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getInNet(String orgId) {
		try {
			Map<String, Object> getInNet = this.pageOneService.getInNet(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getInNet);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getAccessEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getAccessEcharts(String orgId) {
		try {
			Map<String, Object> getAccessEcharts = this.pageOneService.getAccessEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getAccessEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getWarningEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getWarningEcharts(String orgId) {
		try {
			Map<String, Object> getWarningEcharts = this.pageOneService.getWarningEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getWarningEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getChnlnumEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChnlnumEcharts(String orgId) {
		try {
			Map<String, Object> getChnlnumEcharts = this.pageOneService.getChnlnumEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getChnlnumEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getChnlstarEcharts", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChnlstarEcharts(String orgId) {
		try {
			List<Map<String, Object>> getChnlstarEcharts = this.pageOneService.getChnlstarEcharts(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getChnlstarEcharts);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getChnlNumFull", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChnlNumFull(String orgId) {
		try {
			List<Map<String, Object>> getChnlNumFull = this.pageOneService.getChnlNumFull(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getChnlNumFull);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

	@RequestMapping(value = "/getChnlShare", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getChnlShare(String orgId) {
		try {
			List<Map<String, Object>> getChnlShare = this.pageOneService.getChnlShare(orgId);
			return Ajax.responseString(CST.RES_SECCESS, getChnlShare);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION);
		}
	}

}
