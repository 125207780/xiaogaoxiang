package com.bonc.school.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.school.dao.mapper.SchoolMapMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SchoolMapService {

	@Autowired
	private SchoolMapMapper schoolMapMapper;

	public Map<String, Object> getMapLeft(String statisMonth) {
		Map<String, Object> resultMap = schoolMapMapper.getMapLeft(statisMonth);
		return resultMap;
	}

	public Map<String, Object> getMapCityLeft(String mapOrgId, String statisMonth) {
		Map<String, Object> resultMap = schoolMapMapper.getMapCityLeft(mapOrgId, statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getMapRight(String statisMonth) {
		List<Map<String, Object>> resultMap = schoolMapMapper.getMapRight(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getMapRightArea(String orgId, String statisMonth) {
		List<Map<String, Object>> resultMap = schoolMapMapper.getMapRightArea(orgId, statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getProvinceGaoxiaoLeft(String statisMonth) {
		List<Map<String, Object>> resultMap = schoolMapMapper.getProvinceGaoxiaoLeft(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getCityGaoxiaoLeft(String mapOrgId, String statisMonth) {
		List<Map<String, Object>> resultMap = schoolMapMapper.getCityGaoxiaoLeft(mapOrgId, statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getCityGaoxiaoNum(String statisMonth) {
		return schoolMapMapper.getCityGaoxiaoNum(statisMonth);
	}

	public List<Map<String, Object>> getAreaGaoxiaoNum(String orgId, String statisMonth) {
		return schoolMapMapper.getAreaGaoxiaoNum(orgId, statisMonth);
	}
}
