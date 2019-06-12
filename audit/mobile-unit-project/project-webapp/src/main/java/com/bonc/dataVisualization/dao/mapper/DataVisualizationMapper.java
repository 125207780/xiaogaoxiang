package com.bonc.dataVisualization.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.kpi.dao.entity.OrgSearch;

public interface DataVisualizationMapper {

	List<Map<String, Object>> getMapLine(@Param("orgId") String orgId, @Param("orgCode") String orgCode, @Param("orgName") String orgName,
			@Param("parentId") String parentId);

	List<Map<String, Object>> getBigTypePie(@Param("orgId") String orgId, @Param("orgCode") String orgCode, @Param("firstCode") String firstCode);

	List<Map<String, Object>> getSmallTypePie(@Param("orgId") String orgId, @Param("orgCode") String orgCode, @Param("secondCode") String secondCode);

	List<Map<String, Object>> getLeftBar(@Param("orgId") String orgId, @Param("orgCode") String orgCode, @Param("firstCode") String firstCode);

	List<Map<String, Object>> getTopRightBar(@Param("orgId") String orgId, @Param("orgCode") String orgCode, @Param("firstCode") String firstCode,
			@Param("orgName") String orgName, @Param("parentId") String parentId);

	List<Map<String, Object>> getRightTotalPie(@Param("orgId") String orgId, @Param("orgCode") String orgCode);

	List<OrgSearch> getGridInfo(String areaId);

	List<Map<String, Object>> getGridTypeNum(@Param("areaId") String areaId);

	List<Map<String, Object>> getGridByType(@Param("typeId") String typeId, @Param("areaId") String areaId);

	List<Map<String, Object>> getTopChnlByKpi(@Param("gridCode") String gridCode, @Param("physicalType") Integer physicalType,
			@Param("firstCode") String firstCode);

	List<Map<String, Object>> getTopStationByKpi(@Param("gridCode") String gridCode, @Param("physicalType") String physicalType,
			@Param("firstCode") String firstCode);

	List<Map<String, Object>> getTopGridByKpi(@Param("typeId") String typeId, @Param("firstCode") String firstCode, @Param("areaId") String areaId);

	List<Map<String, Object>> getBigTypeChnlGroupByCode(@Param("physicalId") String physicalId, @Param("firstCode") String firstCode);

	List<Map<String, Object>> getBigTypeStationGroupByCode(@Param("physicalId") String physicalId, @Param("firstCode") String firstCode);

	List<Map<String, Object>> getGridPosition(@Param("gridCode") String gridCode);

	List<Map<String, Object>> getGridTypeLevel4(@Param("gridCode") String gridCode);

	List<Map<String, Object>> getGridByTypeAjax(@Param("typeId") String typeId, @Param("areaId") String areaId, @Param("gridCode") String gridCode);

}
