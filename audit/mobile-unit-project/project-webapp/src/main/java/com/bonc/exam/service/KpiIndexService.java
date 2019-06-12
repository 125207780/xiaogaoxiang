package com.bonc.exam.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

/**
 * 网格考核模块
 * @author luxing@bonc.com.cn
 *
 */

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 网格考核模块
 * @author luxing@bonc.com.cn
 *
 */

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.bonc.exam.dao.entity.KpiIndex;
import com.bonc.exam.dao.mapper.KpiIndexMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class KpiIndexService {

	@Autowired
	private KpiIndexMapper kpiIndexMapper;

	public List<KpiIndex> selectKpiGrid(Map<String, String> m) {
		return kpiIndexMapper.selectKpiGrid(m);
	}

	/**
	 * 
	 * @param jsonStr
	 *            kpi指标表字符串
	 * @param examInput
	 *            exam_model字符串
	 * @param objInput
	 *            _obj表字符串
	 * @param examId
	 *            exam_model主键
	 */
	public void insertExamKpi(String jsonStr, String examInput, String objInput, String examId, String userName, String orgId) {
		// 往kpi指标表中添加数据
		insertKpi(jsonStr, examId);
		// 对象类型，关联exam_model和evaluation_model_obj俩个表
		JSONArray obj = new JSONArray(objInput);
		String objectTyepe = obj.getString(0);
		// 往exam_model中添加数据
		insertExamModel(examInput, examId, objectTyepe, userName, orgId);
		// 往evaluation_model_obj表中添加数据
		insertObjType(objInput, examId, objectTyepe);
	}

	/**
	 * 
	 * @param examInput
	 *            exam_model字符串
	 * @param examId
	 *            exam_model主键
	 * @param objectType
	 *            对象类型
	 */
	// 往ExamModel主表中插入数据
	public void insertExamModel(String examInput, String examId, String objectType, String userName, String orgId) {
		Map<String, String> examMap = new HashMap<String, String>();
		// 这里是因为examId字段太短。需要修改字段的长度
		examMap.put("examId", examId);
		examMap.put("objectType", objectType);
		examMap.put("orgId", orgId);
		// 获取系统当前时间
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
		String currentDate = sdf.format(date);
		System.out.println("当前时间" + currentDate);
		examMap.put("currentDate", currentDate);
		// ExamInput
		// 将json字符串转换成JSONArray数组对象，这里的顺序是固定的导致map存值就是这样了
		JSONArray examIn = new JSONArray(examInput);
		String cycleType = examIn.getString(0);
		examMap.put("cycleType", isEmpty(cycleType));
		String startDate = examIn.getString(1);
		examMap.put("startDate", isEmpty(startDate));
		String endDate = examIn.getString(2);
		examMap.put("endDate", isEmpty(endDate));
		String desc = examIn.getString(3);
		examMap.put("desc", isEmpty(desc));
		// String createPerson = examIn.getString(4);
		examMap.put("createPerson", isEmpty(userName));
		String gridNameCode = examIn.getString(5);
		String gridCode = "";
		if (!"null".equals(gridNameCode) && gridNameCode != null && gridNameCode.length() > 0) {
			gridCode = gridNameCode;
		}
		examMap.put("gridNameCode", gridCode);
		kpiIndexMapper.insertExamModel(examMap);

	}

	/**
	 * 
	 * @param objInput
	 *            evaluation_model_obj表字符串
	 * @param examId
	 *            exam_model表 id
	 * @param objectType
	 *            对象类型
	 */
	// 往对象类型的表中插入数据
	public void insertObjType(String objInput, String examId, String objectType) {
		Map<String, String> objMap = new HashMap<String, String>();
		// 这里是examId
		objMap.put("examId", examId);
		// 解析前端json字符串
		JSONArray obj = new JSONArray(objInput);
		objMap.put("objectType", objectType);

		// 对象名称是多选
		// List objList = new ArrayList();
		String s = obj.getString(1);
		// 取对象名称数组。如果为null，证明是没有值的，直接为空，
		if (!s.contains("null")) {
			// 如果不为null，转成JSONArray数组，循环遍历每一个，中间用空格分割，方便取值
			JSONArray arr = obj.getJSONArray(1);
			for (int i = 0; i < arr.length(); i++) {
				String objNameStr = arr.getString(i);
				objMap.put("objNameStr", objNameStr);
				kpiIndexMapper.insertObjType(objMap);
			}
			// 原本是想一次性插入的
			// kpiIndexMapper.insertObj(objList);
		} else {
			// map中的key，和xml中的字段要对应，不然会报错，在xml中最好加上字段的类型。String,这样就算值为空也不会报错
			// 如果不加上数据库的类型，一旦值为空就会报错，
			// 如果为空，直接为"",不为空时候，再添加对象名称的字符串数组，判断null是因为前端传过来的值是null
			objMap.put("objNameStr", "");
			kpiIndexMapper.insertObjType(objMap);
		}

	}

	/**
	 * 
	 * @param jsonStr
	 *            evaluation_model_kpi表字符串
	 * @param examId
	 *            exam_model的主键id
	 */
	// 往kpi指标的表中插入数据
	public void insertKpi(String jsonStr, String examId) {
		List<Map<String, Object>> list = new ArrayList<>();
		// 将json转成Object对象
		JSONObject jsonObj = new JSONObject(jsonStr);
		if (jsonObj != null && jsonObj.length() > 0) {
			// 取总的记录数
			Iterator<?> i = jsonObj.keys();
			while (i.hasNext()) {
				// 循环遍历jsonObj对象，取每一条记录
				String name = (String) i.next();
				@SuppressWarnings("unchecked")
				Map<String, Object> map = (Map<String, Object>) JSON.parse(jsonObj.getString(name));
				// 随机生成一个id，作为kpi表的主键
				String id = UUID.randomUUID().toString().replaceAll("-", "");
				// 这里是因为id字段太短。需要修改字段的长度
				map.put("id", id);
				// 这里是因为examId字段太短。需要修改字段的长度
				// 这个是关联exam_model表字段
				map.put("examId", examId);
				list.add(map);
			}
			// map中的key，和xml中的字段要对应，不然会报错，在xml中最好加上字段的类型。String,这样就算值为空也不会报错
			// 如果不加上数据库的类型，一旦值为空就会报错，
			// 在list中放map，在xml中循环，一次性插入，记得加上item.key，不然会找不到key
			kpiIndexMapper.insertExamKpi(list);
		}

	}

	public List<String> selectKpiTypeByOrgId(String orgId) {
		List<String> list = kpiIndexMapper.selectKpiTypeByOrgId(orgId);
		return list;
	}

	/**
	 * 
	 * @param str
	 *            判断是字符串
	 * @return
	 */
	public static String isEmpty(String str) {
		if (str != null && str.length() > 0) {
			return str;
		} else {
			return "";
		}
	}

}
