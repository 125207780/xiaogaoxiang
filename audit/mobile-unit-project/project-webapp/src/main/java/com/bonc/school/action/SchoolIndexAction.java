package com.bonc.school.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.school.service.SchoolIndexService;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping(value = "/school")
public class SchoolIndexAction {

	@Autowired
	private SchoolIndexService schoolIndexService;

	@ResponseBody
	@RequestMapping(value = "/schoolIndex")
	public String schoolIndex() {
		schoolIndexService.schoolIndex();
		return "";
	}

	/**
	 * 校园基本信息查询
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/schoolInfo")
	public Map<String, String> selectSchoolInfo(String schoolId) {
		Map<String, Object> inputMap = new HashMap<String, Object>();
		inputMap.put("schoolId", schoolId);
		Map<String, String> resultMap = schoolIndexService.selectSchoolInfo(inputMap);
		return resultMap;
	}

	/**
	 * 校园渗透率查询
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/schoolFilter")
	public Map<String, String> selectSchoolFilter(String schoolId) {
		Map<String, Object> inputMap = new HashMap<String, Object>();
		inputMap.put("schoolId", schoolId);
		Map<String, String> resultMap = schoolIndexService.selectSchoolFilter(inputMap);
		return resultMap;
	}

	/**
	 * 校园新发展查询
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/schoolNewDevelop")
	public Map<String, String> selectSchoolNewDevelop(String schoolId) {
		Map<String, Object> inputMap = new HashMap<String, Object>();
		inputMap.put("schoolId", schoolId);
		Map<String, String> resultMap = schoolIndexService.selectSchoolNewDevelop(inputMap);
		return resultMap;
	}

	/**
	 * 校园使用查询
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/schoolUse")
	public Map<String, String> selectSchoolUse(String schoolId) {
		Map<String, Object> inputMap = new HashMap<String, Object>();
		inputMap.put("schoolId", schoolId);
		Map<String, String> resultMap = schoolIndexService.selectSchoolUse(inputMap);
		return resultMap;
	}

	/**
	 * 校园渗透率排名
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/filterRanking")
	public List<Map<String, String>> selectFilterRanking(Integer page, Integer rows, String schoolId, String level) {
		if (level != null && level.length() > 0) {
			// 设置分页
			PageHelper.startPage(page, rows);
		}

		Map<String, Object> inputMap = new HashMap<String, Object>();
		if (!"2".equals(level) && !"3".equals(level)) {
			level = "4";
		}

		inputMap.put("uid", schoolId);
		inputMap.put("level", level);

		List<Map<String, String>> resultMap = schoolIndexService.selectFilterRanking(inputMap);
		System.out.println("渗透率排名-->" + resultMap.toString());
		return resultMap;
	}

	/**
	 * 校园新发展排名
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/newRanking")
	public List<Map<String, String>> selectNewRanking(Integer page, Integer rows, String schoolId, String level) {
		if (level != null && level.length() > 0) {
			// 设置分页
			PageHelper.startPage(page, rows);
		}

		Map<String, Object> inputMap = new HashMap<String, Object>();
		if (!"2".equals(level) && !"3".equals(level)) {
			level = "4";
		}

		inputMap.put("uid", schoolId);
		inputMap.put("level", level);

		List<Map<String, String>> resultMap = schoolIndexService.selectNewRanking(inputMap);
		System.out.println("新发展排名-->" + resultMap.toString());
		return resultMap;
	}

	/**
	 * 校园使用排名
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/useRanking")
	public List<Map<String, String>> selectUseRanking(Integer page, Integer rows, String schoolId, String level) {
		if (level != null && level.length() > 0) {
			// 设置分页
			PageHelper.startPage(page, rows);
		}
		Map<String, Object> inputMap = new HashMap<String, Object>();
		if (!"2".equals(level) && !"3".equals(level)) {
			level = "4";
		}

		inputMap.put("uid", schoolId);
		inputMap.put("level", level);

		List<Map<String, String>> resultMap = schoolIndexService.selectUseRanking(inputMap);
		System.out.println("校园使用排名-->" + resultMap.toString());
		return resultMap;
	}

	/**
	 * 渗透率echart
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/filterEchart")
	public List<Map<String, String>> selectFilterEchart(String selected, String schoolId) {
		Map<String, String> inputMap = new HashMap<String, String>();
		inputMap.put("typeId", selected);
		inputMap.put("uid", schoolId);
		List<Map<String, String>> resultMap = schoolIndexService.selectFilterEchart(inputMap);
		return resultMap;
	}

	/**
	 * 新发展echart
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/newEchart")
	public List<Map<String, String>> selectNewEchart(String selected, String schoolId) {
		Map<String, String> inputMap = new HashMap<String, String>();
		inputMap.put("typeId", selected);
		inputMap.put("uid", schoolId);
		List<Map<String, String>> resultMap = schoolIndexService.selectNewEchart(inputMap);
		return resultMap;
	}

	/**
	 * 校园使用echart
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/useEchart")
	public List<Map<String, String>> selectUseEchart(String selected, String schoolId) {
		Map<String, String> inputMap = new HashMap<String, String>();
		inputMap.put("typeId", selected);
		inputMap.put("uid", schoolId);
		List<Map<String, String>> resultMap = schoolIndexService.selectUseEchart(inputMap);
		return resultMap;
	}

}
