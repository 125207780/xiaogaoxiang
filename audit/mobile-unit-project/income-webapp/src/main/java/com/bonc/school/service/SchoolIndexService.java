package com.bonc.school.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.school.dao.mapper.SchoolIndexMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class SchoolIndexService {
	
	@Autowired
	private SchoolIndexMapper schoolIndexMapper;
	
	public SchoolIndexMapper getMapper(){
		return schoolIndexMapper;
	}
 
	public void schoolIndex() {
		schoolIndexMapper.schoolIndex();
	}

	/**
	 * 校园基本信息查询
	 * @return
	 */
	public Map<String, String> selectSchoolInfo(Map<String,Object> map) {
		Map<String,String> resultMap = schoolIndexMapper.selectSchoolInfo(map);
		return resultMap;
	}

	/**
	 * 校园渗透率查询
	 * @return
	 */
	public Map<String, String> selectSchoolFilter(Map<String,Object> map) {
		Map<String,String> resultMap = schoolIndexMapper.selectSchoolFilter(map);
		return resultMap;
	}

	/**
	 * 校园新发展查询
	 * @return
	 */
	public Map<String, String> selectSchoolNewDevelop(Map<String,Object> map) {
		Map<String,String> resultMap = schoolIndexMapper.selectSchoolNewDevelop(map);
		return resultMap;
	}

	/**
	 * 校园使用查询
	 * @return
	 */
	public Map<String, String> selectSchoolUse(Map<String,Object> map) {
		Map<String,String> resultMap = schoolIndexMapper.selectSchoolUse(map);
		return resultMap;
	}

	/**
	 * 渗透率排名
	 * @return
	 */
	public List<Map<String,String>> selectFilterRanking(Map<String, Object> inputMap) {
		List<Map<String,String>> resultMap = schoolIndexMapper.selectFilterRanking(inputMap);
		return resultMap;
	}

	/**
	 * 新发展排名
	 * @return
	 */
	public List<Map<String,String>> selectNewRanking(Map<String, Object> inputMap) {
		List<Map<String,String>> resultMap = schoolIndexMapper.selectNewRanking(inputMap);
		return resultMap;
	}
	
	/**
	 * 校园使用排名
	 * @return
	 */
	public List<Map<String,String>> selectUseRanking(Map<String, Object> inputMap) {
		List<Map<String,String>> resultMap = schoolIndexMapper.selectUseRanking(inputMap);
		return resultMap;
	}

	/**
	 * 渗透率echart
	 * @param inputMap
	 * @return
	 */
	public List<Map<String, String>> selectFilterEchart(Map<String,String> inputMap) {
		List<Map<String,String>> resultMap = schoolIndexMapper.selectFilterEchart(inputMap);
		return resultMap;
	}

	/**
	 * 新发展echart
	 * @param inputMap
	 * @return
	 */
	public List<Map<String, String>> selectNewEchart(Map<String, String> inputMap) {
		List<Map<String,String>> resultMap = schoolIndexMapper.selectNewEchart(inputMap);
		return resultMap;
	}

	/**
	 * 校园使用echart
	 * @param inputMap
	 * @return
	 */
	public List<Map<String, String>> selectUseEchart(Map<String, String> inputMap) {
		List<Map<String,String>> resultMap = schoolIndexMapper.selectUseEchart(inputMap);
		return resultMap;
	}

}
