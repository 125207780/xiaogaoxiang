package com.bonc.school.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface SchoolMapMapper {

	Map<String, Object> getMapLeft(String statisMonth);

	Map<String, Object> getMapCityLeft(@Param("mapOrgId") String mapOrgId, @Param("statisMonth") String statisMonth);

	List<Map<String, Object>> getMapRight(String statisMonth);

	List<Map<String, Object>> getMapRightArea(@Param("orgId") String orgId, @Param("statisMonth") String statisMonth);

	List<Map<String, String>> selectUseRanking(Map<String, Object> inputMap);

	List<Map<String, Object>> getProvinceGaoxiaoLeft(@Param("statisMonth") String statisMonth);

	List<Map<String, Object>> getCityGaoxiaoLeft(@Param("mapOrgId") String mapOrgId, @Param("statisMonth") String statisMonth);

	List<Map<String, Object>> getCityGaoxiaoNum(@Param("statisMonth") String statisMonth);

	List<Map<String, Object>> getAreaGaoxiaoNum(@Param("orgId") String orgId, @Param("statisMonth") String statisMonth);
}
