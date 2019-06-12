package com.bonc.kpi.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.kpi.dao.entity.BaseKpi;
import com.bonc.kpi.dao.entity.KpiList;
import com.bonc.kpi.dao.entity.KpiScreen;
import com.bonc.kpi.dao.entity.OrgSearch;
import com.bonc.kpi.dao.entity.ResultMsg;
import com.bonc.system.dao.entity.SysOrg;

public interface KpiManagerMapper {

	public List<OrgSearch> getOrgInfo(String orgId);

	public List<OrgSearch> getCityInfo(OrgSearch orgSearch);

	public List<OrgSearch> getAreaInfo(OrgSearch orgSearch);

	public List<OrgSearch> getSaleDeptInfo(OrgSearch orgSearch);

	public List<OrgSearch> getGridInfo(OrgSearch orgSearch);

	public List<OrgSearch> getVillageInfo(OrgSearch orgSearch);

	public List<OrgSearch> getCommunityInfo(OrgSearch orgSearch);

	public List<OrgSearch> getChnlorstationInfo(OrgSearch orgSearch);

	public SysOrg getOrgLevel(String orgId);

	public String getLevelMax(String orgId);

	public List<BaseKpi> getCountPeriod();

	public List<KpiList> initKpiInfo();

	public List<KpiScreen> getKpiScreen(String kpiTypeColumn);

	public List<BaseKpi> initKpiIndex(BaseKpi baseKpi);

	public List<KpiScreen> getScreenChildren(String screenCode);

	public List<KpiScreen> getScreenParent(String pid);

	public List<Map<String, Object>> getResultInfo(@Param("resultMsg") ResultMsg resultMsg, @Param("kpiCodes") List<String> kpiCodes);

	public List<Map<String, Object>> getCityTopFive(@Param("kpiCode") String kpiCode, @Param("resultMsg") ResultMsg resultMsg);

	public List<Map<String, Object>> getAreaTopFive(@Param("kpiCode") String kpiCode, @Param("orgId") String orgId, @Param("resultMsg") ResultMsg resultMsg);

	public List<Map<String, Object>> getGridTopFive(@Param("kpiCode") String kpiCode, @Param("orgId") String orgId, @Param("resultMsg") ResultMsg resultMsg);

	public List<Map<String, Object>> getNextOrgKpi(@Param("resultMsg") ResultMsg resultMsg, @Param("orgId") String orgId, @Param("orgName") String orgName,
			@Param("orgCode") String orgCode, @Param("kpiCodes") List<String> kpiCodes);

	public Map<String, Object> getOrgKpiBar(@Param("resultMsg") ResultMsg resultMsg, @Param("orgId") String orgId, @Param("orgName") String orgName,
			@Param("orgCode") String orgCode, @Param("kpiCodes") List<String> kpiCodes);

}
