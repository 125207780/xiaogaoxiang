package com.bonc.school.dao.mapper;

import java.util.List;
import java.util.Map;

import com.bonc.school.dao.entity.SchoolUserDetail;


public interface SchoolIndexMapper {

	void schoolIndex();

	Map<String, String> selectSchoolInfo(Map<String,Object> map);

	Map<String, String> selectSchoolFilter(Map<String,Object> map);

	Map<String, String> selectSchoolNewDevelop(Map<String,Object> map);

	Map<String, String> selectSchoolUse(Map<String,Object> map);

	List<Map<String,String>> selectFilterRanking(Map<String, Object> inputMap);

	List<Map<String,String>> selectNewRanking(Map<String, Object> inputMap);

	List<Map<String,String>> selectUseRanking(Map<String, Object> inputMap); 

	List<SchoolUserDetail> findSchoolUserDetailInfo(SchoolUserDetail statisMonth);

	List<Map<String, String>> selectFilterEchart(Map<String, String> inputMap);

	List<Map<String, String>> selectNewEchart(Map<String, String> inputMap);

	List<Map<String, String>> selectUseEchart(Map<String, String> inputMap);
}
