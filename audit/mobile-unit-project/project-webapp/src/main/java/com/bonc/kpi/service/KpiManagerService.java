package com.bonc.kpi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.JedisClientPool;
import com.bonc.kpi.dao.entity.KpiList;
import com.bonc.kpi.dao.entity.KpiScreen;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.dao.entity.ResultMsg;
import com.bonc.kpi.dao.mapper.KpiManagerMapper;
import com.bonc.system.dao.entity.SysOrg;

@Service
public class KpiManagerService {

	@Resource(name = "jedisClientPool")
	private JedisClientPool jedisClientPool;

	@Resource
	private KpiManagerMapper mapper;

	public KpiManagerMapper getMapper() {
		return mapper;
	}

	// List<OrgSearch> cityInfo = null;
	// List<OrgSearch> areaInfo = null;
	// List<OrgSearch> saleDeptInfo = null;
	// List<OrgSearch> gridInfo = null;
	// List<OrgSearch> villageInfo = null;
	// List<OrgSearch> communityInfo = null;
	// List<OrgSearch> chnlorstationInfo = null;
	// public List<OrgSearch> getCityInfo() {
	// return cityInfo;
	// }
	// public void setCityInfo(List<OrgSearch> cityInfo) {
	// this.cityInfo = cityInfo;
	// }
	// public List<OrgSearch> getAreaInfo() {
	// return areaInfo;
	// }
	// public void setAreaInfo(List<OrgSearch> areaInfo) {
	// this.areaInfo = areaInfo;
	// }
	//
	// public List<OrgSearch> getSaleDeptInfo() {
	// return saleDeptInfo;
	// }
	//
	// public void setSaleDeptInfo(List<OrgSearch> saleDeptInfo) {
	// this.saleDeptInfo = saleDeptInfo;
	// }
	//
	// public List<OrgSearch> getGridInfo() {
	// return gridInfo;
	// }
	//
	// public void setGridInfo(List<OrgSearch> gridInfo) {
	// this.gridInfo = gridInfo;
	// }
	//
	// public List<OrgSearch> getVillageInfo() {
	// return villageInfo;
	// }
	//
	// public void setVillageInfo(List<OrgSearch> villageInfo) {
	// this.villageInfo = villageInfo;
	// }
	//
	// public List<OrgSearch> getCommunityInfo() {
	// return communityInfo;
	// }
	// public void setCommunityInfo(List<OrgSearch> communityInfo) {
	// this.communityInfo = communityInfo;
	// }
	// public List<OrgSearch> getChnlorstationInfo() {
	// return chnlorstationInfo;
	// }
	// public void setChnlorstationInfo(List<OrgSearch> chnlorstationInfo) {
	// this.chnlorstationInfo = chnlorstationInfo;
	// }

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public Map<String, List<OrgSearch>> initSeletOrg(String orgId) {
		/*
		 * // 判断是否有缓存 String json =
		 * jedisClientPool.hget(ParamFieldConstant.INIT_ORG, orgId); // 判断是否为空
		 * if (StringUtils.isNotBlank(json)) { // 不为空则写出缓存 Map<String,
		 * List<OrgSearch>> list = JsonUtil.jsonToMapList(json,
		 * OrgSearch.class); return list; }
		 */
		Map<String, List<OrgSearch>> orgInfo = new HashMap<String, List<OrgSearch>>();
		final OrgSearch cityPram = new OrgSearch();
		final OrgSearch areaPram = new OrgSearch();
		final OrgSearch saleDeptPram = new OrgSearch();
		final OrgSearch gridPram = new OrgSearch();
		final OrgSearch villagePram = new OrgSearch();
		final OrgSearch communityPram = new OrgSearch();
		final OrgSearch chnlorstationPram = new OrgSearch();
		SysOrg sysOrg = this.mapper.getOrgLevel(orgId);
		if (sysOrg != null && "1".equals(sysOrg.getOrgLevel())) {
			cityPram.setProvId(orgId);
			areaPram.setProvId(orgId);
			saleDeptPram.setProvId(orgId);
			gridPram.setProvId(orgId);
			villagePram.setProvId(orgId);
			communityPram.setProvId(orgId);
			chnlorstationPram.setProvId(orgId);
		}
		if ("2".equals(sysOrg.getOrgLevel())) {
			cityPram.setCityId(orgId);
			areaPram.setCityId(orgId);
			saleDeptPram.setCityId(orgId);
			gridPram.setCityId(orgId);
			villagePram.setCityId(orgId);
			communityPram.setCityId(orgId);
			chnlorstationPram.setCityId(orgId);

		}
		if ("3".equals(sysOrg.getOrgLevel())) {
			cityPram.setAreaId(orgId);
			areaPram.setAreaId(orgId);
			saleDeptPram.setAreaId(orgId);
			gridPram.setAreaId(orgId);
			villagePram.setAreaId(orgId);
			communityPram.setAreaId(orgId);
			chnlorstationPram.setAreaId(orgId);
		}
		if ("4".equals(sysOrg.getOrgLevel())) {
			cityPram.setGridCode(orgId);
			areaPram.setGridCode(orgId);
			saleDeptPram.setGridCode(orgId);
			gridPram.setGridCode(orgId);
			villagePram.setGridCode(orgId);
			communityPram.setGridCode(orgId);
			chnlorstationPram.setGridCode(orgId);
		}
		if ("5".equals(sysOrg.getOrgLevel())) {
			cityPram.setSaleDeptCode(orgId);
			areaPram.setSaleDeptCode(orgId);
			saleDeptPram.setSaleDeptCode(orgId);
			gridPram.setSaleDeptCode(orgId);
			villagePram.setSaleDeptCode(orgId);
			communityPram.setSaleDeptCode(orgId);
			chnlorstationPram.setSaleDeptCode(orgId);
		}
		if ("6".equals(sysOrg.getOrgLevel())) {
			cityPram.setVillageId(orgId);
			areaPram.setVillageId(orgId);
			saleDeptPram.setVillageId(orgId);
			gridPram.setVillageId(orgId);
			villagePram.setVillageId(orgId);
			communityPram.setVillageId(orgId);
			chnlorstationPram.setVillageId(orgId);
		}
		if ("7".equals(sysOrg.getOrgLevel())) {
			cityPram.setCommunityId(orgId);
			areaPram.setCommunityId(orgId);
			saleDeptPram.setCommunityId(orgId);
			gridPram.setCommunityId(orgId);
			villagePram.setCommunityId(orgId);
			communityPram.setCommunityId(orgId);
			chnlorstationPram.setCommunityId(orgId);
		}
		if ("8".equals(sysOrg.getOrgLevel())) {
			cityPram.setChnlorstationId(orgId);
			areaPram.setChnlorstationId(orgId);
			saleDeptPram.setChnlorstationId(orgId);
			gridPram.setChnlorstationId(orgId);
			villagePram.setChnlorstationId(orgId);
			communityPram.setChnlorstationId(orgId);
			chnlorstationPram.setChnlorstationId(orgId);
		}

		List<OrgSearch> cityInfo = mapper.getCityInfo(cityPram);
		List<OrgSearch> areaInfo = mapper.getAreaInfo(areaPram);
		List<OrgSearch> saleDeptInfo = mapper.getSaleDeptInfo(saleDeptPram);
		List<OrgSearch> gridInfo = mapper.getGridInfo(gridPram);
		List<OrgSearch> villageInfo = mapper.getVillageInfo(villagePram);
		List<OrgSearch> communityInfo = mapper.getCommunityInfo(communityPram);
		List<OrgSearch> chnlorstationInfo = mapper.getChnlorstationInfo(chnlorstationPram);

		orgInfo.put("cityInfo", cityInfo);
		orgInfo.put("areaInfo", areaInfo);
		orgInfo.put("saleDeptInfo", saleDeptInfo);
		orgInfo.put("gridInfo", gridInfo);
		orgInfo.put("villageInfo", villageInfo);
		orgInfo.put("communityInfo", communityInfo);
		orgInfo.put("chnlorstationInfo", chnlorstationInfo);
		/*
		 * //结果写入Redis jedisClientPool.hset(ParamFieldConstant.INIT_ORG,
		 * orgId+"", JsonUtil.objectToJson(orgInfo));
		 */ return orgInfo;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public Map<String, List<OrgSearch>> getChildrenOrg(String orgId) {
		/*
		 * //判断是否存在缓存 String json =
		 * jedisClientPool.hget(ParamFieldConstant.CHILDREN_ORG, orgId);
		 * //判断是否为空 if(StringUtils.isNotBlank(json)){ //不为空写出Redis Map<String,
		 * List<OrgSearch>> list = JsonUtil.jsonToMapList(json,
		 * OrgSearch.class); return list; }
		 */
		Map<String, List<OrgSearch>> orgInfo = new HashMap<String, List<OrgSearch>>();
		OrgSearch cityPram = new OrgSearch();
		OrgSearch areaPram = new OrgSearch();
		OrgSearch saleDeptPram = new OrgSearch();
		OrgSearch gridPram = new OrgSearch();
		OrgSearch villagePram = new OrgSearch();
		OrgSearch communityPram = new OrgSearch();
		OrgSearch chnlorstationPram = new OrgSearch();
		SysOrg sysOrg = this.mapper.getOrgLevel(orgId);
		if (sysOrg.getOrgLevel().equals("2")) {
			cityPram.setCityId(orgId);
			areaPram.setCityId(orgId);
			saleDeptPram.setCityId(orgId);
			gridPram.setCityId(orgId);
			villagePram.setCityId(orgId);
			communityPram.setCityId(orgId);
			chnlorstationPram.setCityId(orgId);
			List<OrgSearch> areaInfo = this.mapper.getAreaInfo(areaPram);
			List<OrgSearch> saleDeptInfo = this.mapper.getSaleDeptInfo(saleDeptPram);
			List<OrgSearch> gridInfo = this.mapper.getGridInfo(gridPram);
			List<OrgSearch> villageInfo = this.mapper.getVillageInfo(villagePram);
			List<OrgSearch> communityInfo = this.mapper.getCommunityInfo(communityPram);
			List<OrgSearch> chnlorstationInfo = this.mapper.getChnlorstationInfo(chnlorstationPram);
			orgInfo.put("areaInfo", areaInfo);
			orgInfo.put("saleDeptInfo", saleDeptInfo);
			orgInfo.put("gridInfo", gridInfo);
			orgInfo.put("villageInfo", villageInfo);
			orgInfo.put("communityInfo", communityInfo);
			orgInfo.put("chnlorstationInfo", chnlorstationInfo);
		}
		if (sysOrg.getOrgLevel().equals("3")) {
			saleDeptPram.setAreaId(orgId);
			gridPram.setAreaId(orgId);
			villagePram.setAreaId(orgId);
			communityPram.setAreaId(orgId);
			chnlorstationPram.setAreaId(orgId);
			List<OrgSearch> saleDeptInfo = this.mapper.getSaleDeptInfo(saleDeptPram);
			List<OrgSearch> gridInfo = this.mapper.getGridInfo(gridPram);
			List<OrgSearch> villageInfo = this.mapper.getVillageInfo(villagePram);
			List<OrgSearch> communityInfo = this.mapper.getCommunityInfo(communityPram);
			List<OrgSearch> chnlorstationInfo = this.mapper.getChnlorstationInfo(chnlorstationPram);
			orgInfo.put("saleDeptInfo", saleDeptInfo);
			orgInfo.put("gridInfo", gridInfo);
			orgInfo.put("villageInfo", villageInfo);
			orgInfo.put("communityInfo", communityInfo);
			orgInfo.put("chnlorstationInfo", chnlorstationInfo);
		}
		if (sysOrg.getOrgLevel().equals("5")) {
			saleDeptPram.setSaleDeptCode(orgId);
			villagePram.setSaleDeptCode(orgId);
			communityPram.setSaleDeptCode(orgId);
			chnlorstationPram.setSaleDeptCode(orgId);
			List<OrgSearch> gridInfo = this.mapper.getGridInfo(saleDeptPram);
			List<OrgSearch> villageInfo = this.mapper.getVillageInfo(villagePram);
			List<OrgSearch> communityInfo = this.mapper.getCommunityInfo(communityPram);
			List<OrgSearch> chnlorstationInfo = this.mapper.getChnlorstationInfo(chnlorstationPram);
			orgInfo.put("gridInfo", gridInfo);
			orgInfo.put("villageInfo", villageInfo);
			orgInfo.put("communityInfo", communityInfo);
			orgInfo.put("chnlorstationInfo", chnlorstationInfo);
		}
		if (sysOrg.getOrgLevel().equals("4")) {
			villagePram.setGridCode(orgId);
			communityPram.setGridCode(orgId);
			chnlorstationPram.setGridCode(orgId);
			List<OrgSearch> villageInfo = this.mapper.getVillageInfo(villagePram);
			List<OrgSearch> communityInfo = this.mapper.getCommunityInfo(communityPram);
			List<OrgSearch> chnlorstationInfo = this.mapper.getChnlorstationInfo(chnlorstationPram);
			orgInfo.put("villageInfo", villageInfo);
			orgInfo.put("communityInfo", communityInfo);
			orgInfo.put("chnlorstationInfo", chnlorstationInfo);
		}
		if (sysOrg.getOrgLevel().equals("6")) {
			communityPram.setVillageId(orgId);
			chnlorstationPram.setVillageId(orgId);
			List<OrgSearch> communityInfo = this.mapper.getCommunityInfo(communityPram);
			List<OrgSearch> chnlorstationInfo = this.mapper.getChnlorstationInfo(chnlorstationPram);
			orgInfo.put("communityInfo", communityInfo);
			orgInfo.put("chnlorstationInfo", chnlorstationInfo);
		}
		if (sysOrg.getOrgLevel().equals("7")) {
			chnlorstationPram.setCommunityId(orgId);
			List<OrgSearch> chnlorstationInfo = this.mapper.getChnlorstationInfo(chnlorstationPram);
			orgInfo.put("chnlorstationInfo", chnlorstationInfo);
		}
		/*
		 * //结果写入Redis jedisClientPool.hset(ParamFieldConstant.CHILDREN_ORG,
		 * orgId+"", JsonUtil.objectToJson(orgInfo));
		 */ return orgInfo;
	}

	public List<KpiList> initKpiInfo() {
		List<KpiList> kpiList = this.mapper.initKpiInfo();
		for (int i = 0; i < kpiList.size(); i++) {
			if (kpiList.get(i) != null) {
				List<KpiScreen> kpiScreen = this.mapper.getKpiScreen(kpiList.get(i).getListValue());
				kpiList.get(i).setKpiScreen(kpiScreen);
			}
		}
		return kpiList;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public Map<String, List<KpiScreen>> initTypeLevel() {
		Map<String, List<KpiScreen>> mapPram = new HashMap<String, List<KpiScreen>>();
		List<KpiScreen> typeLevel1 = this.mapper.getKpiScreen("typeLevel1");
		List<KpiScreen> typeLevel2 = this.mapper.getKpiScreen("typeLevel2");
		List<KpiScreen> typeLevel3 = this.mapper.getKpiScreen("typeLevel3");
		mapPram.put("typeLevel1", typeLevel1);
		mapPram.put("typeLevel2", typeLevel2);
		mapPram.put("typeLevel3", typeLevel3);
		return mapPram;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public List<KpiScreen> changeTypeLevel(String screenCode) {
		List<KpiScreen> kpiScreen = this.mapper.getScreenChildren(screenCode);
		for (int i = 0; i < kpiScreen.size(); i++) {
			if (!StringUtils.isBlank(kpiScreen.get(i).getPid())) {
				this.getChildrenScreen(kpiScreen.get(i));
				this.getParentScreen(kpiScreen.get(i));
			}
		}
		if (kpiScreen.size() == 0) {
			KpiScreen kpi = new KpiScreen();
			kpi.setPid(screenCode);
			this.getParentScreen(kpi);
			kpiScreen.add(kpi);
		}
		return kpiScreen;
	}

	public void getChildrenScreen(KpiScreen kpiScreen) {
		List<KpiScreen> screenList = this.mapper.getScreenChildren(kpiScreen.getScreenCode());
		if (screenList.size() == 0) {
			return;
		} else {
			kpiScreen.setChildren(screenList);
			for (KpiScreen temp : screenList) {
				this.getChildrenScreen(temp);
			}
		}
	}

	public void getParentScreen(KpiScreen kpiScreen) {
		List<KpiScreen> screen = this.mapper.getScreenParent(kpiScreen.getPid());
		if (screen.size() == 0) {
			return;
		}
		for (int i = 0; i < screen.size(); i++) {
			if (StringUtils.isBlank(screen.get(i).getPid())) {
				kpiScreen.setParent(screen);
				return;
			} else {
				kpiScreen.setParent(screen);
				for (KpiScreen temp : screen) {
					this.getParentScreen(temp);
				}
			}
		}
	}

	public List<Map<String, Object>> getResultMsg(ResultMsg resultMsg) {
		List<String> kpiCodes = new ArrayList<>();
		if (resultMsg.getKpi() != null && !"".equals(resultMsg.getKpi())) {
			String[] array = resultMsg.getKpi().split(",");
			for (String str : array) {
				String[] result = str.split(":");
				kpiCodes.add(result[0]);
			}
		}
		if (resultMsg.getCountPeriod().equals("年累计")) {
			resultMsg.setStatisYear(resultMsg.getAccountPeriod());
		}
		if (resultMsg.getCountPeriod().equals("日累计") || resultMsg.getCountPeriod().equals("日")) {
			resultMsg.setStatisDate(resultMsg.getAccountPeriod());
		}
		if (resultMsg.getCountPeriod().equals("月累计") || resultMsg.getCountPeriod().equals("月")) {
			resultMsg.setStatisMon(resultMsg.getAccountPeriod());
		}
		if (resultMsg.getCityCode() != null && resultMsg.getCityCode().equals("undefined")) {
			resultMsg.setCityCode("");
		}
		if (resultMsg.getAreaCode() != null && resultMsg.getAreaCode().equals("undefined")) {
			resultMsg.setAreaCode("");
		}
		if (resultMsg.getSaleDeptCode() != null && resultMsg.getSaleDeptCode().equals("undefined")) {
			resultMsg.setSaleDeptCode("");
		}
		if (resultMsg.getGridCode() != null && resultMsg.getGridCode().equals("undefined")) {
			resultMsg.setGridCode("");
		}
		if (resultMsg.getVillageId() != null && resultMsg.getVillageId().equals("undefined")) {
			resultMsg.setVillageId("");
		}
		if (resultMsg.getCommunityId() != null && resultMsg.getCommunityId().equals("undefined")) {
			resultMsg.setCommunityId("");
		}
		if (resultMsg.getChnlorstationId() != null && resultMsg.getChnlorstationId().equals("undefined")) {
			resultMsg.setChnlorstationId("");
		}
		List<Map<String, Object>> resultInfo = this.mapper.getResultInfo(resultMsg, kpiCodes);
		return resultInfo;
	}

	public List<Map<String, Object>> getTopFive(String orgId, String kpiCode, String accountName, String accountValue) {
		SysOrg orgLevel = this.mapper.getOrgLevel(orgId);
		List<Map<String, Object>> topFive = new ArrayList<Map<String, Object>>();
		ResultMsg resultMsg = new ResultMsg();
		if (accountName.equals("年累计")) {
			resultMsg.setStatisYear(accountValue);
		}
		if (accountName.equals("日累计") || accountName.equals("日")) {
			resultMsg.setStatisDate(accountValue);
		}
		if (accountName.equals("月累计") || accountName.equals("月")) {
			resultMsg.setStatisMon(accountValue);
		}
		if (orgLevel.getOrgLevel().equals("1")) {
			topFive = this.mapper.getCityTopFive(kpiCode, resultMsg);
		} else if (orgLevel.getOrgLevel().equals("2")) {
			topFive = this.mapper.getAreaTopFive(kpiCode, orgId, resultMsg);
		} else if (orgLevel.getOrgLevel().equals("3")) {
			topFive = this.mapper.getGridTopFive(kpiCode, orgId, resultMsg);
		}
		return topFive;
	}

	public List<Map<String, Object>> getNextOrgKpi(ResultMsg resultMsg, String orgId) {
		String orgName = "";
		String orgCode = "";
		SysOrg orgLevel = this.mapper.getOrgLevel(orgId);
		if (!orgLevel.getOrgLevel().equals("8")) {
			if (orgLevel.getOrgLevel().equals("1")) {
				orgName = "CITY_NAME";
			} else if (orgLevel.getOrgLevel().equals("2")) {
				orgName = "AREA_NAME";
				orgCode = "CITY_CODE";
			} else if (orgLevel.getOrgLevel().equals("3")) {
				OrgSearch orgSearch = new OrgSearch();
				orgSearch.setAreaId(orgId);
				List<OrgSearch> listOrg = this.mapper.getAreaInfo(orgSearch);
				if (listOrg.size() > 0) {
					orgName = "SALE_DEPT_NAME";
				} else {
					orgName = "GRID_NAME";
				}
				orgCode = "AREA_CODE";
			} else if (orgLevel.getOrgLevel().equals("5")) {
				orgName = "GRID_NAME";
				orgCode = "SALE_DEPT_CODE";
			} else if (orgLevel.getOrgLevel().equals("4")) {
				orgName = "TOWN_NAME";
				orgCode = "GRID_CODE";
			} else if (orgLevel.getOrgLevel().equals("6")) {
				orgName = "VILLAGE_NAME";
				orgCode = "TOWN_CODE";
			} else if (orgLevel.getOrgLevel().equals("7")) {
				orgName = "CHNLORSTATION_NAME";
				orgCode = "VILLAGE_ID";
			}

			if (resultMsg.getCountPeriod().equals("年累计")) {
				resultMsg.setStatisYear(resultMsg.getAccountPeriod());
			}
			if (resultMsg.getCountPeriod().equals("日累计") || resultMsg.getCountPeriod().equals("日")) {
				resultMsg.setStatisDate(resultMsg.getAccountPeriod());
			}
			if (resultMsg.getCountPeriod().equals("月累计") || resultMsg.getCountPeriod().equals("月")) {
				resultMsg.setStatisMon(resultMsg.getAccountPeriod());
			}

			String[] kpi = resultMsg.getKpi().split(",");
			List<String> kpiCodes = new ArrayList<>();
			for (int j = 0; j < kpi.length; j++) {
				kpiCodes.add(kpi[j]);
			}

			List<Map<String, Object>> retList = this.mapper.getNextOrgKpi(resultMsg, orgId, orgName, orgCode, kpiCodes);
			return retList;
		} else {
			return null;
		}
	}

	public Map<String, Object> getOrgKpiBar(ResultMsg resultMsg, String orgId) {
		SysOrg orgLevel = this.mapper.getOrgLevel(orgId);
		String orgCode = "";
		String orgName = "";
		if (orgLevel.getOrgLevel().equals("1")) {

		} else if (orgLevel.getOrgLevel().equals("2")) {
			orgCode = "CITY_CODE";
			orgName = "CITY_NAME";
		} else if (orgLevel.getOrgLevel().equals("3")) {
			orgCode = "AREA_CODE";
			orgName = "AREA_NAME";
		} else if (orgLevel.getOrgLevel().equals("4")) {
			orgCode = "GRID_CODE";
			orgName = "GRID_NAME";
		} else if (orgLevel.getOrgLevel().equals("5")) {
			orgCode = "SALE_DEPT_CODE";
			orgName = "SALE_DEPT_NAME";
		} else if (orgLevel.getOrgLevel().equals("6")) {
			orgCode = "TOWN_CODE";
			orgName = "TOWN_NAME";
		} else if (orgLevel.getOrgLevel().equals("7")) {
			orgCode = "VILLAGE_ID";
			orgName = "VILLAGE_NAME";
		} else if (orgLevel.getOrgLevel().equals("8")) {
			orgCode = "CHNLORSTATION_ID";
			orgName = "CHNLORSTATION_NAME";
		}

		if (resultMsg.getCountPeriod().equals("年累计")) {
			resultMsg.setStatisYear(resultMsg.getAccountPeriod());
		}
		if (resultMsg.getCountPeriod().equals("日累计") || resultMsg.getCountPeriod().equals("日")) {
			resultMsg.setStatisDate(resultMsg.getAccountPeriod());
		}
		if (resultMsg.getCountPeriod().equals("月累计") || resultMsg.getCountPeriod().equals("月")) {
			resultMsg.setStatisMon(resultMsg.getAccountPeriod());
		}

		String[] kpi = resultMsg.getKpi().split(",");
		List<String> kpiCodes = new ArrayList<>();
		for (String kpiId : kpi) {
			kpiCodes.add(kpiId);
		}
		Map<String, Object> result = this.mapper.getOrgKpiBar(resultMsg, orgId, orgName, orgCode, kpiCodes);
		return result;
	}

}
