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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.bonc.exam.dao.entity.ExamGird;
import com.bonc.exam.dao.entity.ExamModel;
import com.bonc.exam.dao.entity.ExamModelObj;
import com.bonc.exam.dao.mapper.ExamModelMapper;
import com.bonc.exam.dao.mapper.showObjMapper;

@Service
@Transactional(rollbackFor = Exception.class)
public class ExamService {

	@Autowired
	private ExamModelMapper examModelMapper;

	@Autowired
	private showObjMapper objMapper;

	// @Autowired
	// private KpiIndexMapper kpiIndexMapper;

	public List<ExamModel> selectExamModel(ExamModel examModel) {
		List<ExamModel> list = examModelMapper.selectExamModel(examModel);
		return list;
	}

	public Boolean deleteExamModelById(String id) {
		objMapper.deleteKpiByExamId(id);
		examModelMapper.deleteObjByExamId(id);
		Boolean result = examModelMapper.deleteExamModelById(id);
		return result;
	}

	public void insertExamModel(ExamModel examModel) {
		examModelMapper.insertExamModel(examModel);
	}

	public int updateExamModel(ExamModel examModel) {
		int result = examModelMapper.updateExamModel(examModel);
		return result;
	}

	public List<ExamModel> checkBoxSearchAnother(Map<String, Object> map) {
		List<ExamModel> list = new ArrayList<ExamModel>();
		String gridCode = (String) map.get("gridCode");
		String gridName = (String) map.get("gName");
		String orglevel = (String) map.get("orglevel");
		if ((!gridCode.equals("")) && (orglevel.equals("4"))) { // 不为空
			list = examModelMapper.checkBoxSearchByyGridCode(map);
		} else if ((!gridCode.equals("")) && (orglevel.equals("3"))) {
			list = examModelMapper.checkBoxSearchByyGridCodeAndAndOrglevel(map);
		} else if (!gridName.equals("")) { // 不为空
			list = examModelMapper.checkBoxSearchByGridName(map);
		} else {
			list = examModelMapper.checkBoxSearch(map);
		}
		String objectTypeNew = "";
		List<String> objNameList = null;
		for (ExamModel examModel : list) {
			objNameList = new ArrayList<>();
			// 获取exam的id也是obj中的exam_id
			String id = examModel.getId();
			// 获取exam中的gridName对应grid_user中的orgId
			String gridNameCode = examModel.getGridName();
			String cycle = examModel.getCycleType();
			String cycleTypeNew = "";
			if (cycle.equals("month")) {
				cycleTypeNew = "月度考核";
			} else if (cycle.equals("quarter")) {
				cycleTypeNew = "季度考核";
			} else {
				cycleTypeNew = "年度考核";
			}
			examModel.setCycleTypeNew(cycleTypeNew);
			// 封装入参
			Map<String, String> examMap = new HashMap<>();
			examMap.put("examId", id);
			// 获取对象类型
			String objectType = examModel.getCreateObject();
			// 判断objectType是人还是网格 获取最后一个字如果123包含就说明是网格 String objectClass =
			// objectType.substring(objectType.length()-1);
			// 这里会获取多条记录，因为一个examId会关联多个obj
			List<ExamModelObj> objList = examModelMapper.selectObjByExamId(examMap);
			if ("gridLevel1,gridLevel2,gridLevel3".contains(objectType)) {
				if (objectType.equals("gridLevel1")) {
					objectTypeNew = "一类网格";
				} else if (objectType.equals("gridLevel2")) {
					objectTypeNew = "二类网格";
				} else {
					objectTypeNew = "三类网格";
				}
				// 为空判断
				if (objList != null && objList.size() > 0) {
					// 获取每一条记录，遍历
					for (ExamModelObj examModelObj : objList) {
						// 取每一条记录的对象名称的id
						String objNameId = examModelObj.getObjectId();
						// 如果是网格，只需要一个objNameId --> orgId就可以查到sys_org表中的Name
						String objName = examModelMapper.selectNameByOrgId(objNameId);
						objNameList.add(objName);
					}
					examModel.setObjectTypeNew(objectTypeNew);
					examModel.setExamObjectList(objNameList.toString());
				}
				// 不包含就说明是人
			} else {
				// 为空判断
				if (objList != null && objList.size() > 0) {
					Map<String, Object> userMap = null;
					String objNameId = null;
					String userName = null;
					// 获取每一条记录，遍历
					for (ExamModelObj examModelObj : objList) {
						// 封装查询grid_user的入参
						userMap = new HashMap<>();
						// 取每一条记录的对象名称的id-->对应lonid
						objNameId = examModelObj.getObjectId();
						userMap.put("loginId", objNameId);
						userMap.put("orgId", gridNameCode);
						// 设置接受对象类型字符串
						int objectTypeId = 0;
						// 获取对象类型
						// String objType = examModelObj.getObjectType();
						if (objectType.equals("gridManager")) {
							objectTypeNew = "网格经理";
							objectTypeId = 3;
						} else if (objectType.equals("cdManager")) {
							objectTypeNew = "CD政企客户经理";
							objectTypeId = 2;
						} else if (objectType.equals("busiManager")) {
							objectTypeNew = "营业部负责人";
							objectTypeId = 5;
						} else if (objectType.equals("directManager")) {
							objectTypeNew = "直销渠道经理";
							objectTypeId = 4;
						} else if (objectType.equals("societyManager")) {
							objectTypeNew = "社会渠道经理";
							objectTypeId = 1;
						}
						examModel.setObjectTypeNew(objectTypeNew);
						// 用户类型
						userMap.put("userType", objectTypeId);
						// 通过gridNameCode，objNameId--org_id和objectTypeId查询GRID_USER表格的名字
						userName = examModelMapper.selectUserName(userMap);
						if (userName != null && userName.length() > 0) {
							objNameList.add(userName);
						}
					}
					if (objNameList != null && objNameList.size() > 0) {
						examModel.setExamObjectList(objNameList.toString());
					} else {
						examModel.setExamObjectList("");
					}
				}
			}
		}
		return list;
	}

	public List<ExamModel> checkBoxSearch(Map<String, Object> map) {
		List<ExamModel> list = examModelMapper.checkBoxSearch(map);
		String objectTypeNew = "";
		List<String> objNameList = null;
		String id = null;
		String gridNameCode = null;
		String cycle = null;
		String cycleTypeNew = null;
		String objectType = null;
		Map<String, String> examMap = null;
		List<ExamModelObj> objList = null;
		for (ExamModel examModel : list) {
			objNameList = new ArrayList<>();
			// 获取exam的id也是obj中的exam_id
			id = examModel.getId();
			// 获取exam中的gridName对应grid_user中的orgId
			gridNameCode = examModel.getGridName();
			cycle = examModel.getCycleType();
			cycleTypeNew = "";
			if (cycle.equals("month")) {
				cycleTypeNew = "月度考核";
			} else if (cycle.equals("quarter")) {
				cycleTypeNew = "季度考核";
			} else {
				cycleTypeNew = "年度考核";
			}
			examModel.setCycleTypeNew(cycleTypeNew);
			// 封装入参
			examMap = new HashMap<>();
			examMap.put("examId", id);
			// 获取对象类型
			objectType = examModel.getCreateObject();
			// 判断objectType是人还是网格 获取最后一个字如果123包含就说明是网格 String objectClass =
			// objectType.substring(objectType.length()-1);
			// 这里会获取多条记录，因为一个examId会关联多个obj
			objList = examModelMapper.selectObjByExamId(examMap);
			if ("gridLevel1,gridLevel2,gridLevel3".contains(objectType)) {
				if (objectType.equals("gridLevel1")) {
					objectTypeNew = "一类网格";
				} else if (objectType.equals("gridLevel2")) {
					objectTypeNew = "二类网格";
				} else {
					objectTypeNew = "三类网格";
				}
				// 为空判断
				if (objList != null && objList.size() > 0) {
					// 获取每一条记录，遍历
					String objNameId = null;
					String objName = null;
					for (ExamModelObj examModelObj : objList) {
						// 取每一条记录的对象名称的id
						objNameId = examModelObj.getObjectId();
						// 如果是网格，只需要一个objNameId --> orgId就可以查到sys_org表中的Name
						objName = examModelMapper.selectNameByOrgId(objNameId);
						objNameList.add(objName);
					}
					examModel.setObjectTypeNew(objectTypeNew);
					examModel.setExamObjectList(objNameList.toString());
				}
				// 不包含就说明是人
			} else {
				// 为空判断
				if (objList != null && objList.size() > 0) {
					Map<String, Object> userMap = null;
					String objNameId = null;
					String userName = null;
					// 获取每一条记录，遍历
					for (ExamModelObj examModelObj : objList) {
						// 封装查询grid_user的入参
						userMap = new HashMap<>();
						// 取每一条记录的对象名称的id-->对应lonid
						objNameId = examModelObj.getObjectId();
						userMap.put("loginId", objNameId);
						userMap.put("orgId", gridNameCode);
						// 设置接受对象类型字符串
						int objectTypeId = 0;
						// 获取对象类型
						// String objType = examModelObj.getObjectType();
						if (objectType.equals("gridManager")) {
							objectTypeNew = "网格经理";
							objectTypeId = 3;
						} else if (objectType.equals("cdManager")) {
							objectTypeNew = "CD政企客户经理";
							objectTypeId = 2;
						} else if (objectType.equals("busiManager")) {
							objectTypeNew = "营业部负责人";
							objectTypeId = 5;
						} else if (objectType.equals("directManager")) {
							objectTypeNew = "直销渠道经理";
							objectTypeId = 4;
						} else if (objectType.equals("societyManager")) {
							objectTypeNew = "社会渠道经理";
							objectTypeId = 1;
						}
						examModel.setObjectTypeNew(objectTypeNew);
						// 用户类型
						userMap.put("userType", objectTypeId);
						// 通过gridNameCode，objNameId--org_id和objectTypeId查询GRID_USER表格的名字
						userName = examModelMapper.selectUserName(userMap);
						if (userName != null && userName.length() > 0) {
							objNameList.add(userName);
						}
					}
					if (objNameList != null && objNameList.size() > 0) {
						examModel.setExamObjectList(objNameList.toString());
					} else {
						examModel.setExamObjectList("");
					}
				}
			}
		}
		return list;
	}

	public List<ExamGird> selectOrgByPid(Map<String, Object> m) {
		List<ExamGird> list = examModelMapper.selectOrgByPid(m);
		return list;
	}

	public List<Map<String, Object>> selectObjNameByType(Map<String, String> m) {
		return examModelMapper.selectObjNameByType(m);
	}

	public void insertToGridRankDetail(String jsonStr, String examInput, String objInput, String examId, String orgId) {
		// xml中传入的map
		Map<String, Object> map = new HashMap<String, Object>();
		// GridRankDetail表格的唯一id
		map.put("examId", examId);
		// 初始拆入状态为1
		map.put("status", "1");
		map.put("orgId", orgId);
		// examInput考核表格字符串 这里是一个数组
		JSONArray examIn = new JSONArray(examInput);
		String cycleType = examIn.getString(0);
		map.put("cycleType", isEmpty(cycleType));
		String startDate = examIn.getString(1);
		map.put("startDate", isEmpty(startDate));
		String gridNameCode = examIn.getString(5);
		String gridCode = "";
		if (!"null".equals(gridNameCode) && gridNameCode != null && gridNameCode.length() > 0) {
			gridCode = gridNameCode;
		}
		map.put("gridNameCode", isEmpty(gridCode));

		// 对象名称 id 数组 这里可能是多个 每一个都是一条记录，和kpi相交
		JSONArray obj = new JSONArray(objInput);
		// 对象类型
		String objectType = obj.getString(0);
		map.put("objectType", objectType);
		// 对象名称数组字符串 这里直接转换是因为前端判断了不能为空，否则不能进来
		JSONArray objectNameArr = obj.getJSONArray(1);
		// kpi列表字符串 jsonStr 这里是多条，需要遍历,这里在前端做了判断，也是必须有值的
		JSONObject jsonObj = new JSONObject(jsonStr);
		// 循环遍历，因为是多选，结合kpi多选，有多少，取笛卡尔交集拆入
		for (int i = 0; i < objectNameArr.length(); i++) {
			if (jsonObj != null && jsonObj.length() > 0) {
				// 取总的记录数 这里是至少有一条记录
				Iterator<?> iterator = jsonObj.keys();
				while (iterator.hasNext()) {
					String rankId = UUID.randomUUID().toString().replaceAll("-", "");
					map.put("rankId", rankId);
					String objectId = objectNameArr.getString(i);
					map.put("objectId", objectId);
					map.put("kpi_score", 0);
					map.put("kpi_value", "");
					String objectName = "";
					if (objectType.equals("gridLevel1") || objectType.equals("gridLevel2") || objectType.equals("gridLevel3")) {
						objectName = examModelMapper.selectNameByOrgId(objectId);
					} else {
						objectName = examModelMapper.selectNameByOrgIdFromSysUser(objectId);
					}

					map.put("objectName", objectName);
					map.put("gridType", "");
					// 循环遍历jsonObj对象，取每一条记录
					String name = (String) iterator.next();
					@SuppressWarnings("unchecked")
					Map<String, String> kpiMap = (Map<String, String>) JSON.parse(jsonObj.getString(name));
					map.put("kpi_id", kpiMap.get("KPI_ID").trim());
					map.put("kpi_name", kpiMap.get("KPI_NAME"));
					map.put("kpi_type", kpiMap.get("KPI_TYPE"));
					map.put("kpi_weight", Integer.parseInt(kpiMap.get("KPI_WEIGHT")));
					map.put("kpi_define", kpiMap.get("KPI_DEFINE"));
					String val = kpiMap.get("TARGET_VALUE");
					Double d = 0.0;
					if (val != null && val.length() > 0) {
						d = Double.parseDouble(val);
					}
					map.put("target_value", d);
					String json = kpiMap.get("KPI_ROLESTR").toString();
					map.put("kpi_rolejson", json);
					examModelMapper.insertToGridRankDetail(map);
				}
			}
		}

	}

	public void deleteGridRankDetailById(String examId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("examId", examId);
		map.put("status", "1");
		examModelMapper.deleteGridRankDetailById(map);
	}

	/**
	 * 判断是字符串
	 * 
	 * @Title isEmpty
	 * @Author xiaogaoxiang
	 * @param str
	 * @return String
	 */
	public static String isEmpty(String str) {
		if (str != null && str.length() > 0) {
			return str;
		} else {
			return "";
		}
	}

	/**
	 * 
	 * @param examStr
	 *            前端传过来的值，
	 * @param newExamId
	 *            新的随机id
	 * @param user
	 *            用户
	 */
	public void insertExamAndEtc(String examStr, String newExamId, String user, String orgId) {
		@SuppressWarnings("unchecked")
		Map<String, String> examMap = JSON.parseObject(examStr, Map.class);

		String oldExamId = examMap.get("examId");
		List<Map<String, String>> objList = insertNewObj(oldExamId, newExamId);
		List<Map<String, String>> kpiList = insertNewKpi(oldExamId, newExamId);
		Map<String, String> oneExam = insertNewExam(oldExamId, newExamId, examMap, user, orgId);
		insertNewGridRankDetail(objList, kpiList, oneExam);
	}

	/**
	 * 这个是网格考核复用，使用老id查询，再复制一遍，原本examId对应有多少条记录，就新增多少，
	 * 原本的不变，新增和原本的只是examId不同，返回list<map>是 考核表需要数据
	 * 
	 * @param oldExamId
	 * @param newExamId
	 * @return
	 */
	public List<Map<String, String>> insertNewObj(String oldExamId, String newExamId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("newExamId", newExamId);
		map.put("examId", oldExamId);
		List<ExamModelObj> objList = examModelMapper.selectObjByExamId(map);
		Map<String, String> inMap = new HashMap<String, String>();
		if (objList != null && objList.size() > 0) {
			for (ExamModelObj obj : objList) {
				String objectId = obj.getObjectId();
				String objectType = obj.getObjectType();
				inMap.put("objectId", objectId);
				inMap.put("objectType", objectType);
				inMap.put("newExamId", newExamId);
				examModelMapper.insertNewObj(inMap);
			}
		}
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		list = examModelMapper.selectObjByNewExamId(newExamId);
		return list;
	}

	/**
	 * 这个是网格考核复用，使用老id查询，再复制一遍，原本examId对应有多少条记录，就新增多少，
	 * 原本的不变，新增和原本的只是examId不同，返回list<map>是 考核表需要数据
	 * 
	 * @param oldExamId
	 * @param newExamId
	 * @return
	 */
	public List<Map<String, String>> insertNewKpi(String oldExamId, String newExamId) {
		List<Map<String, String>> list = examModelMapper.selectKpiByExamId(oldExamId);
		for (Map<String, String> m : list) {
			m.put("EXAM_ID", newExamId);
			String id = UUID.randomUUID().toString().replaceAll("-", "");
			m.put("ID", id);
			examModelMapper.insertKpiMap(m);
		}
		List<Map<String, String>> resultList = examModelMapper.selectKpiByExamId(newExamId);
		return resultList;
	}

	/**
	 * 这个是网格考核复用，使用老id查询，再复制一遍，原本examId对应有多少条记录，就新增多少，
	 * 原本的不变，新增和原本的只是examId不同，返回list<map>是 考核表需要数据
	 * 
	 * @param oldExamId
	 * @param newExamId
	 * @param user
	 * @return
	 */
	public Map<String, String> insertNewExam(String oldExamId, String newExamId, Map<String, String> examMap, String user, String orgId) {
		Map<String, String> map = examModelMapper.selectExamByExamId(oldExamId);
		map.put("CREATEPERSON", user);
		// 获取系统当前时间
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
		String currentDate = sdf.format(date);
		map.put("CREATETIME", currentDate);
		map.put("CYCLETYPE", examMap.get("cycleType"));
		map.put("STARTDATE", examMap.get("start"));
		map.put("ENDDATE", examMap.get("end"));
		map.put("ID", newExamId);
		map.put("orgId", orgId);
		examModelMapper.insertNewExamModel(map);
		Map<String, String> resultMap = examModelMapper.selectExamByExamId(newExamId);
		return resultMap;
	}

	/**
	 * 这个是网格考核复用， 使用从其他三个表返回的数据填充
	 * 
	 * @param oldExamId
	 * @param newExamId
	 * @return
	 */
	public void insertNewGridRankDetail(List<Map<String, String>> objList, List<Map<String, String>> kpiList, Map<String, String> oneExam) {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("startDate", oneExam.get("STARTDATE"));
		paramMap.put("cycleType", oneExam.get("CYCLETYPE"));
		paramMap.put("org_id", oneExam.get("ORG_ID"));
		String gridCode = "";
		String gridName = oneExam.get("GRIDNAME");
		if (!"null".equals(gridName) && gridName != null) {
			gridCode = gridName;
		}
		paramMap.put("gridNameCode", gridCode);
		for (int i = 0; i < objList.size(); i++) {
			Map<String, String> objMap = objList.get(i);
			String objectId = objMap.get("OBJECT_ID");
			paramMap.put("objectId", objectId);
			String objectName = examModelMapper.selectNameByOrgId(objectId);
			paramMap.put("objectName", objectName);
			paramMap.put("examId", objMap.get("EXAM_ID"));
			paramMap.put("objectType", objMap.get("OBJECT_TYPE"));
			for (int j = 0; j < kpiList.size(); j++) {
				Map<String, String> kpiMap = kpiList.get(j);
				paramMap.put("kpi_id", kpiMap.get("KPI_ID").trim());
				paramMap.put("kpi_name", kpiMap.get("KPI_NAME"));
				paramMap.put("kpi_type", kpiMap.get("KPI_TYPE"));
				paramMap.put("kpi_weight", kpiMap.get("KPI_WEIGHT"));
				paramMap.put("kpi_define", kpiMap.get("KPI_DEFINE"));
				paramMap.put("target_value", kpiMap.get("TARGET_VALUE"));
				paramMap.put("kpi_rolejson", kpiMap.get("KPI_ROLESTR"));

				String rankId = UUID.randomUUID().toString().replaceAll("-", "");
				paramMap.put("rankId", rankId);
				paramMap.put("status", "1");
				System.out.println(paramMap.toString());
				examModelMapper.insertNewGridRankDetail(paramMap);
			}
		}

	}

	public void updateGridRankDetailStatusById(String examId) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("newStatus", "5");
		map.put("oldStatus", "2");
		map.put("examId", examId);
		examModelMapper.updateGridRankDetailStatusById(map);
	}

	public List<Map<String, String>> selectExamResult(Map<String, String> map) {
		List<Map<String, String>> list = examModelMapper.selectExamResult(map);
		for (Map<String, String> m : list) {
			String type = m.get("OBJECT_TYPE");
			String objectType = "";
			if (type.equals("gridLevel1")) {
				objectType = "一类网格";
			} else if (type.equals("gridLevel2")) {
				objectType = "二类网格";
			} else if (type.equals("gridLevel3")) {
				objectType = "三类网格";
			} else if (type.equals("gridManager")) {
				objectType = "网格经理";
			} else if (type.equals("cdManager")) {
				objectType = "CD政企客户经理";
			} else if (type.equals("busiManager")) {
				objectType = "营业部负责人";
			} else if (type.equals("directManager")) {
				objectType = "直销渠道经理";
			} else {
				objectType = "社会渠道经理";
			}
			m.put("objectType", objectType);

			String cycle = m.get("EVALUATE_CYCLE_TYPE");
			String cycleType = "";
			if (cycle.equals("month")) {
				cycleType = "月度考核";
			} else if (cycle.equals("quarter")) {
				cycleType = "季度考核";
			} else {
				cycleType = "年度考核";
			}
			m.put("cycleType", cycleType);
		}
		return list;
	}

	/**
	 * rank表记录条数的数组字符串
	 * 
	 * @Title publish
	 * @Author xiaogaoxiang
	 * @param ids
	 * 
	 * @param orgId
	 *            当前登录人orgId void
	 */
	public void publish(String ids, String orgId) {
		JSONArray rankIdArr = new JSONArray(ids);
		for (int i = 0; i < rankIdArr.length(); i++) {
			// 这里就是一个对象了
			String rankObj = rankIdArr.getString(i);
			// 这里是rank的一条记录的对象数组
			@SuppressWarnings("unchecked")
			Map<String, String> rankMap = JSON.parseObject(rankObj, Map.class);
			rankMap.put("oldStatus", "3");
			rankMap.put("newStatus", "4");
			String status = rankMap.get("STATUS");
			rankMap.put("status", status);
			// 根据这个map中的数组去查询是否存在rankId相同的，以前的一条已经发布过的数据，如果存在，把以前的那条数据状态设置为4
			examModelMapper.updateGridRankByRankId(rankMap);
			examModelMapper.updateGridRankByRankNewId(rankMap);
		}
	}
}
