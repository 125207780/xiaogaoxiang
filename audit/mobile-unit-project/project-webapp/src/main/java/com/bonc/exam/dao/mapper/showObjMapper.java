package com.bonc.exam.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.system.dao.entity.SysOrg;

public interface showObjMapper {
	List<Map<String, String>> showObj(@Param("examidS") String examidS);

	List<Map<String, String>> initGrid(@Param("examidS") String examidS);

	List<Map<String, String>> getIndicator(/* @Param("examidS")String examidS */);

	Map<String, String> editObj(@Param("examidS") String examidS);

	List<Map<String, String>> editObjectTypeNoPeople(Map<String, Object> Param);

	List<Map<String, String>> editObjectTypePeopleS(Map<String, Object> Param);

	// int UpdateObjJsonStr(List list);

	int UpdateObjExamInput(Map<String, Object> m);

	int insertObjObjInput(Map<String, String> m);

	List<Map<String, String>> selectKpiById(@Param("id") String id);

	int deleteJson(Map<String, Object> Param);

	int insertJson(Map<String, Object> Param);

	int updateJson(Map<String, Object> Param);

	int deleteObject(@Param("id") String id);

	SysOrg selectSysOrgById(String orgId);

	List<SysOrg> selectList(SysOrg po);

	List<Map<String, String>> initPerformaceTable(Map<String, String> map);

	int updateGridRank(Map<String, String> map);

	int updateGridRankO(Map<String, String> map);

	void deleteKpiByExamId(String id);
}
