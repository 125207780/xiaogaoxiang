package com.bonc.school.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bonc.common.utils.DateUtil;
import com.bonc.school.dao.entity.SaveFile;
import com.bonc.school.dao.mapper.ReportFormMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class ReportFormService {

	@Autowired
	private ReportFormMapper reportFormMapper;

	public List<Map<String, Object>> getReportForm1(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm1(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm2() {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm2();
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm3(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm3(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm4(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm4(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm5(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm5(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm6(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm6(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm7(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm7(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm8(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm8(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm9(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm9(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm10(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm10(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm11(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm11(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm12(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm12(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm13(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm13(statisMonth);
		return resultMap;
	}

	public List<Map<String, Object>> getReportForm14(String statisMonth) {
		List<Map<String, Object>> resultMap = reportFormMapper.getReportForm14(statisMonth);
		return resultMap;
	}

	public int savaFile(String fileName, String url) {
		SaveFile saveFile = new SaveFile();
		saveFile.setFileId(UUID.randomUUID().toString().replaceAll(" ", "-"));
		saveFile.setCreateTime(DateUtil.formatDate(new Date().getTime(), "YYYY-MM-dd hh:mm:ss"));
		saveFile.setAddres(url);
		saveFile.setFileName(fileName);
		return reportFormMapper.saveImportData(saveFile);
	}

	public List<Map<String, Object>> findFile() {
		List<Map<String, Object>> resultMap = reportFormMapper.findFile();
		return resultMap;
	}

	public List<Map<String, Object>> findByFileName(String fileName) {
		List<Map<String, Object>> resultMap = reportFormMapper.findByFileName(fileName);
		return resultMap;
	}

	public String deleteFileByName(String fileName) {
		String info = "";
		reportFormMapper.deleteFileByName(fileName);
		info = "删除成功";
		return info;
	}

	public Map<String, Object> findByUser() {
		Map<String, Object> resultMap = reportFormMapper.findByUser();
		return resultMap;
	}

	public int findByOaId(String oaId) {
		int userIdInfo = reportFormMapper.findByOaId(oaId);
		return userIdInfo;
	}

}
