package com.bonc.exam.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bonc.exam.dao.mapper.showObjMapper;
import com.bonc.system.dao.entity.SysOrg;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
@Transactional(rollbackFor = Exception.class)
public class showObjService {
	@Autowired
	private showObjMapper showObjMapper;

	public Page<Map<String, String>> showObj(String examidS, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.showObjMapper.showObj(examidS);
		return pageList;
	}

	public Page<Map<String, String>> getIndicator(/* String examidS, */Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.showObjMapper.getIndicator(/* examidS */);
		return pageList;
	}

	public Page<Map<String, String>> initGrid(String examidS, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) this.showObjMapper.initGrid(examidS);
		return pageList;
	}

	// editObj
	public Map<String, String> editObj(String examidS) {
		Map<String, String> map = this.showObjMapper.editObj(examidS);
		return map;
	}

	// editObjectType1
	public List<Map<String, String>> editObjectTypeNoPeople(Map<String, Object> map) {
		List<Map<String, String>> result = this.showObjMapper.editObjectTypeNoPeople(map);
		return result;
	}

	// editObjectType2
	public List<Map<String, String>> editObjectTypePeopleS(Map<String, Object> map) {
		List<Map<String, String>> result = this.showObjMapper.editObjectTypePeopleS(map);
		return result;
	}

	public int UpdateObj(JSONArray jsonStr, JSONObject examInput, JSONArray objInput, String id, String objectType, SysUser user) {
		String ujson = UpdateObjJsonStr(jsonStr, id);
		String uei = UpdateObjExamInput(examInput, id, objectType, user);
		String uoi = UpdateObjObjInput(objInput, id, objectType);
		if (uei.equals("1") && uoi.equals("1") && ujson.equals("1")) {
			return 1;
		}
		return 0;
	}

	@SuppressWarnings("unchecked")
	public String UpdateObjJsonStr(JSONArray jsonStr, String id) {

		// 根据id 删除数据，再重新插入 这里是根据examId全部删除，在重新插入
		this.showObjMapper.deleteKpiByExamId(id);

		Map<String, Object> objectMap = new HashMap<String, Object>();
		for (int i = 0; i < jsonStr.size(); i++) {
			objectMap = (Map<String, Object>) jsonStr.get(i); // 将数组 内容转换成Map
		}

		for (int j = 0; j < jsonStr.size(); j++) {
			objectMap = (Map<String, Object>) jsonStr.get(j);
			objectMap.put("KPI_ID", objectMap.get("KPI_ID"));
			objectMap.put("examidS", id);
			Double d = 0.0;
			String value = (String) objectMap.get("TARGET_VALUE");
			if (value != null && value.length() > 0) {
				d = Double.parseDouble(value);
			}
			objectMap.put("target_value", d);
			String ID = UUID.randomUUID().toString().replaceAll("-", "");
			objectMap.put("ID", ID);
			System.out.println(objectMap);
			this.showObjMapper.insertJson(objectMap);
		}

		return "1";
	}

	public String UpdateObjExamInput(JSONObject examInput, String id, String objectType, SysUser user) {
		Map<String, Object> examMap = new HashMap<String, Object>();
		String type = examInput.getString("type");
		String startDate = examInput.getString("startDate");
		String endDate = examInput.getString("endDate");
		String desc = examInput.getString("desc");
		String gridName = examInput.getString("gridName");
		examMap.put("cycleType", type);
		examMap.put("startDate", startDate);
		examMap.put("endDate", endDate);
		examMap.put("desc", desc);
		examMap.put("gridNameCode", gridName);
		examMap.put("examId", id);
		examMap.put("objectType", objectType);
		examMap.put("createPerson", user.getUserName());
		examMap.put("orgId", user.getOrgId());
		System.out.println(examMap);
		this.showObjMapper.UpdateObjExamInput(examMap);
		return "1";
	}

	public String UpdateObjObjInput(JSONArray objInput, String id, String objectType) {
		this.showObjMapper.deleteObject(id);
		Map<String, String> objMap = new HashMap<>();
		for (int i = 0; i < objInput.size(); i++) {
			String loginId = objInput.getString(i);
			objMap.put("objectId", loginId);
			objMap.put("examId", id);
			objMap.put("objectType", objectType);
			System.out.println(objMap);
			this.showObjMapper.insertObjObjInput(objMap);
		}
		return "1";
	}

	public SysOrg selectSysOrgById(String orgId) {
		SysOrg sysOrg = this.showObjMapper.selectSysOrgById(orgId);
		return sysOrg;
	}

	public List<SysOrg> selectList(SysOrg po) {
		return showObjMapper.selectList(po);
	}

	public Page<Map<String, String>> initPerformaceTable(String modelID, String status, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("modelID", modelID);
		if (status.equals("0")) {
			paramMap.put("status", "");
		} else {
			paramMap.put("status", status);
		}
		List<Map<String, String>> resultGet = this.showObjMapper.initPerformaceTable(paramMap);
		for (int i = 0; i < resultGet.size(); i++) {
			String cycle_type = resultGet.get(i).get("EVALUATE_CYCLE_TYPE");
			if (cycle_type.equals("month")) {
				resultGet.get(i).put("EVALUATE_CYCLE_TYPE", "月度考核");
			} else if (cycle_type.equals("year")) {
				resultGet.get(i).put("EVALUATE_CYCLE_TYPE", "年度考核");
			} else if (cycle_type.equals("quarter")) {
				resultGet.get(i).put("EVALUATE_CYCLE_TYPE", "季度考核");
			}
		}
		for (int j = 0; j < resultGet.size(); j++) {
			String object_type = resultGet.get(j).get("OBJECT_TYPE");
			if (object_type.equals("gridLevel1")) {
				resultGet.get(j).put("OBJECT_TYPE", "一类网格");
			} else if (object_type.equals("gridLevel2")) {
				resultGet.get(j).put("OBJECT_TYPE", "二类网格");
			} else if (object_type.equals("gridLevel3")) {
				resultGet.get(j).put("OBJECT_TYPE", "三类网格");
			} else if (object_type.equals("cdManager")) {
				resultGet.get(j).put("OBJECT_TYPE", "CD政企经理");
			} else if (object_type.equals("gridManager")) {
				resultGet.get(j).put("OBJECT_TYPE", "网格经理");
			} else if (object_type.equals("directManager")) {
				resultGet.get(j).put("OBJECT_TYPE", "直销经理");
			} else if (object_type.equals("heapManager")) {
				resultGet.get(j).put("OBJECT_TYPE", "社会渠道经理");
			}
		}
		Page<Map<String, String>> pageList = (Page<Map<String, String>>) resultGet;
		return pageList;
	}

	public int updateGridRank(Map<String, Object> mapJson) {
		Set<String> keySet = mapJson.keySet();
		for (String key : keySet) {
			Map<String, String> paramMap = new HashMap<String, String>();
			paramMap.put("rankID", key);
			if (mapJson.get(key).equals("")) {
				paramMap.put("status", "1");
				System.out.println(paramMap);
				this.showObjMapper.updateGridRank(paramMap);
			} else {
				paramMap.put("score", (String) mapJson.get(key));
				paramMap.put("status", "2");
				System.out.println(paramMap);
				this.showObjMapper.updateGridRankO(paramMap);
			}
		}
		return 1;
	}

}
