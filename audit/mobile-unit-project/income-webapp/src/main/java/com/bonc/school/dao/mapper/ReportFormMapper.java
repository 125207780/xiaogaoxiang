package com.bonc.school.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bonc.school.dao.entity.SaveFile;

public interface ReportFormMapper {

	List<Map<String, Object>> getReportForm1(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm2(@Param("cityName") String cityName);

	List<Map<String, Object>> findCityName();

	List<Map<String, Object>> getReportForm3(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm4(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm5(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm6(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm7(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm8(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm9(@Param("statisMonth") String statisMonth, @Param("cityName") String cityName,
			@Param("schoolName") String schoolName);

	List<Map<String, Object>> findCityName1();

	List<Map<String, Object>> findSchoolName1(String cityName);

	List<Map<String, Object>> getReportForm10(@Param("statisMonth") String statisMonth, @Param("cityName") String cityName,
			@Param("schoolName") String schoolName);

	List<Map<String, Object>> findCityName2();

	List<Map<String, Object>> findSchoolName2(String cityName);

	List<Map<String, Object>> getReportForm11(@Param(value = "statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm12(@Param(value = "statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm13(@Param("statisMonth")String statisMonth);

	List<Map<String, Object>> getReportForm14(@Param("statisMonth")String statisMonth);

	int saveImportData(@Param(value = "saveFile") SaveFile saveFile);

	int updateImportData(@Param(value = "saveFile") SaveFile saveFile);

	List<Map<String, Object>> findFile();
	
	public SaveFile findFileById(String fileId);

	List<Map<String, Object>> findByFileName(String fileName);

	public void deleteFileByName(String fileName);

	public Map<String, Object> findByUser();

	public int findByOaId(String oaId);

}
