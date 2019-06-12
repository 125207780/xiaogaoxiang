package com.bonc.school.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.school.dao.entity.SaveFile;

public interface ReportFormMapper {

	List<Map<String, Object>> getReportForm1(String statisMonth);

	List<Map<String, Object>> getReportForm2();

	List<Map<String, Object>> getReportForm3(String statisMonth);

	List<Map<String, Object>> getReportForm4(String statisMonth);

	List<Map<String, Object>> getReportForm5(String statisMonth);

	List<Map<String, Object>> getReportForm6(String statisMonth);

	List<Map<String, Object>> getReportForm7(String statisMonth);

	List<Map<String, Object>> getReportForm8(String statisMonth);

	List<Map<String, Object>> getReportForm9(String statisMonth);

	List<Map<String, Object>> getReportForm10(String statisMonth);

	List<Map<String, Object>> getReportForm11(String statisMonth);

	List<Map<String, Object>> getReportForm12(String statisMonth);

	List<Map<String, Object>> getReportForm13(String statisMonth);

	List<Map<String, Object>> getReportForm14(String statisMonth);

	int saveImportData(@Param(value = "saveFile") SaveFile saveFile);

	int updateImportData(@Param(value = "saveFile") SaveFile saveFile);

	List<Map<String, Object>> findFile();

	List<Map<String, Object>> findByFileName(String fileName);

	public void deleteFileByName(String fileName);

	public Map<String, Object> findByUser();

	public int findByOaId(String oaId);

}
