package com.bonc.map.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.gridinfo.dao.entity.EvaluationKpi;

public interface FirstPageMapper {
	List<Map<String, Object>> getCityKpi(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiPercent(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiIncome(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiAbility(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getLevel(String pid);

	List<Map<String, Object>> getCityKpiCity(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiOrg(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiGrid(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiPercentCity(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiPercentOrg(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiPercentGrid(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiIncomeCity(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiIncomeOrg(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpiIncomeGrid(@Param(value = "pid") String pid, @Param(value = "typeId") String typeId);

	List<Map<String, Object>> getCityKpi(String pid);

	// 获取指标分类类型
	List<Map<String, Object>> getTypeList();

	// 获取指标分类 下面的指标名称
	List<Map<String, Object>> getKpiList(String typeId);

	List<Map<String, Object>> getChannelTable(String code);

	List<Map<String, Object>> getMapOptionList(String loginId);

	List<Map<String, Object>> getMapOptionChannelList(String loginId);

	List<Map<String, Object>> getMapSignNameByCode(String chnlCode);

	List<Map<String, Object>> getMapTableList(@Param(value = "signingId") String signingId);

	Map<String, Object> getMapTextArea(@Param(value = "signingId") String signingId);

	int updateStatus(@Param(value = "signingId") String signingId);

	int updateStatusPhysical(Map<String, Object> params);

	int updateStatusPhysicalReturn(Map<String, Object> params);

	int updateStatusArea(@Param(value = "signingId") String signingId);

	int updateStatusReturnAll(@Param(value = "signingId") String signingId);

	int getDeleteTable(Map<String, Object> params);

	int getManagerUpdateTable(Map<String, Object> params);

	Map<String, Object> getMapChannelName(@Param(value = "signingId") String signingId);

	int getManagerRejectTable(Map<String, Object> params);

	int getManagerBlur(@Param(value = "orgId") String orgId, @Param(value = "KPI_ID") String KPI_ID, @Param(value = "val") String val);

	int getManagerUpdateValTable(Map<String, Object> params);

	int saveSupplyName(Map<String, Object> params);

	int getOnlyUpdate(Map<String, Object> params);

	int deleteData(@Param(value = "orgId") String orgId);

	int updateStatusPhysicalReturnAll(@Param(value = "signingId") String signingId);

	int updateStatusAreaReturnAll(@Param(value = "signingId") String signingId);

	List<Map<String, Object>> getTest(@Param(value = "dat") String dat);

	List<Map<String, Object>> getindexEnryTable(@Param(value = "orgId") String orgId);

	List<Map<String, Object>> getManagerTable(@Param(value = "orgId") String orgId);

	List<Map<String, Object>> getSearchManagerTable(@Param(value = "orgId") String orgId, @Param(value = "date") String date,
			@Param(value = "name") String name, @Param(value = "status") String status);

	List<Map<String, Object>> getOptionName(@Param(value = "orgId") String orgId);

	List<Map<String, Object>> getSupplyOptionName(@Param(value = "orgId") String orgId);

	List<Map<String, Object>> getRemindName(@Param(value = "orgId") String orgId);

	int saveImportData(@Param(value = "kpi") EvaluationKpi kpi);

	List<Map<String, Object>> getCheckData(@Param(value = "orgId") String orgId);

	int checkKpiCode(@Param(value = "kpiCode") String kpiCode);

	List<Map<String, Object>> getReloadTable(@Param(value = "orgId") String orgId, @Param(value = "date") String date, @Param(value = "name") String name,
			@Param(value = "status") String status);

	List<Map<String, Object>> getUpdateTable(@Param(value = "orgId") String orgId, @Param(value = "KPI_ID") String KPI_ID);
}
