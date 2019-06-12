package com.bonc.exam.dao.mapper;

/**
 * 网格考核模块
 * @author luxing@bonc.com.cn
 *
 */

import java.util.List;
import java.util.Map;

import com.bonc.exam.dao.entity.ExamGird;
import com.bonc.exam.dao.entity.ExamModel;
import com.bonc.exam.dao.entity.ExamModelObj;

public interface ExamModelMapper {

	List<ExamModel> selectExamModel(ExamModel examModel);

	Boolean deleteExamModelById(String id);

	void insertExamModel(ExamModel examModel);

	int updateExamModel(ExamModel examModel);

	List<ExamModel> checkBoxSearch(Map<String, Object> map);

	List<ExamModel> checkBoxSearchByyGridCode(Map<String, Object> map);

	List<ExamModel> checkBoxSearchByyGridCodeAndAndOrglevel(Map<String, Object> map);

	List<ExamModel> checkBoxSearchByGridName(Map<String, Object> map);

	List<ExamGird> selectOrgByPid(Map<String, Object> map);

	List<Map<String, Object>> selectObjNameByType(Map<String, String> map);

	List<ExamModelObj> selectObjByExamId(Map<String, String> examMap);

	String selectNameByOrgId(String orgId);

	String selectUserName(Map<String, Object> userMap);

	void insertToGridRankDetail(Map<String, Object> inMap);

	void deleteGridRankDetailById(Map<String, String> map);

	void deleteObjByExamId(String id);

	void insertNewObj(Map<String, String> map);

	List<Map<String, String>> selectKpiByExamId(String examId);

	void insertKpiMap(Map<String, String> m);

	Map<String, String> selectExamByExamId(String examId);

	void insertNewExamModel(Map<String, String> map);

	void insertNewGridRankDetail(Map<String, Object> paramMap);

	void updateGridRankDetailStatusById(Map<String, String> examId);

	List<Map<String, String>> selectExamResult(Map<String, String> map);

	void updateGridRankByRankId(Map<String, String> rankMap);

	void updateGridRankByRankNewId(Map<String, String> rankMap);

	List<Map<String, String>> selectObjByNewExamId(String examId);

	String selectNameByOrgIdFromSysUser(String objectId);

	// List<ExamModelObj> selectObjByExamIdString(String examId);

}
