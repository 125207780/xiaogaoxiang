package com.bonc.exam.action;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * 网格考核模块
 * @author luxing@bonc.com.cn
 *
 */

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.page.Page;
import com.bonc.common.utils.Ajax;
import com.bonc.exam.dao.entity.ExamGird;
import com.bonc.exam.dao.entity.ExamModel;
import com.bonc.exam.service.ExamService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping(value = "/exam")
public class ExamAction {

	@Autowired
	private ExamService examService;

	@SuppressWarnings("deprecation")
	@RequestMapping(value = "/selectExamModelAnother")
	@ResponseBody
	public String selectExamModel(HttpSession session, String inParam, Integer p, Integer r, String context, String gridName, String CycleType, String gridCode,
			String orglevel) {
		// 获取当前登录用户
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		// 由于是中文， 前端是通过URI编码的，
		String str = URLDecoder.decode(inParam);
		String con = URLDecoder.decode(context);
		String gName = URLDecoder.decode(gridName);
		String cycType = URLDecoder.decode(CycleType);
		// sql语句中查询的条件，用map封装入参
		Map<String, Object> inputParam = new HashMap<>();
		// 第一个条件是list
		List<String> examList = new ArrayList<>();
		// 前端传过来的数组字符串不为空时，把数据添加到list中，否则为null，在sql中做了为null的判断，如果只是new，就存在对象，会出错
		if (str != null && str.length() > 0) {
			String[] arr = str.split(",");
			for (int j = 0; j < arr.length; j++) {
				examList.add(arr[j]);
			}
		} else {
			examList = null;
		}
		// 讲入参放入map中
		inputParam.put("list", examList);
		inputParam.put("con", con);
		inputParam.put("orgId", orgId);
		inputParam.put("gName", gName);
		inputParam.put("cycType", cycType);
		inputParam.put("gridCode", gridCode);
		inputParam.put("orglevel", orglevel);

		// 设置分页
		PageHelper.startPage(p, r);
		System.out.println(p + " 复选框条件----  " + str + "---模糊条件--" + con);

		List<ExamModel> list = examService.checkBoxSearchAnother(inputParam);
		// 返回值封装，
		Page<ExamModel> result = new Page<ExamModel>(new PageInfo<ExamModel>(list));
		return Ajax.responseString(CST.RES_SECCESS, result, true);
	}

	@SuppressWarnings("deprecation")
	@RequestMapping(value = "/selectExamModel")
	@ResponseBody
	public String selectExamModel(HttpSession session, String inParam, Integer p, Integer r, String context) {
		// 获取当前登录用户
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		// 由于是中文， 前端是通过URI编码的，
		String str = URLDecoder.decode(inParam);
		String con = URLDecoder.decode(context);
		// sql语句中查询的条件，用map封装入参
		Map<String, Object> inputParam = new HashMap<>();
		// 第一个条件是list
		List<String> examList = new ArrayList<>();
		// 前端传过来的数组字符串不为空时，把数据添加到list中，否则为null，在sql中做了为null的判断，如果只是new，就存在对象，会出错
		if (str != null && str.length() > 0) {
			String[] arr = str.split(",");
			for (int j = 0; j < arr.length; j++) {
				examList.add(arr[j]);
			}
		} else {
			examList = null;
		}
		// 讲入参放入map中
		inputParam.put("list", examList);
		inputParam.put("con", con);
		inputParam.put("orgId", orgId);
		// 设置分页
		PageHelper.startPage(p, r);
		System.out.println(p + " 复选框条件----  " + str + "---模糊条件--" + con);

		List<ExamModel> list = examService.checkBoxSearch(inputParam);
		// 返回值封装，
		Page<ExamModel> result = new Page<ExamModel>(new PageInfo<ExamModel>(list));
		return Ajax.responseString(CST.RES_SECCESS, result, true);
	}

	@RequestMapping(value = "/deleteExamModelById")
	@ResponseBody
	public String deleteExamModelById(String id) {
		Boolean result = examService.deleteExamModelById(id);
		if (result) {
			return Ajax.responseString(CST.RES_SECCESS);
		}
		return Ajax.responseString(CST.RES_EXCEPTION, "删除失败！");
	}

	@RequestMapping(value = "/selectOrgByPid")
	@ResponseBody
	public String selectOrgByPid(HttpSession session, String objectType, String strName) {

		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();

		// 对象类型
		String objectClass = null;
		// 当前端传递过来的值不为空时，改变入参的值，这里是因为在xml中只做了null的判断
		if (objectType != null && objectType != "") {
			objectClass = objectType.substring(objectType.length() - 1);
			// 123是截取对象类型最后面的字段值，有的话，就证明是网格，不是的话，证明是人
			if (!"123".contains(objectClass)) {
				objectClass = objectType;
			}
		}

		// 网格名称
		String name = null;
		// 当前端传递过来的值不为空时，改变入参的值，这里是因为在xml中只做了null的判断
		if (strName != null && strName != "") {
			// name = strName;
			name = "111";
		}

		Map<String, Object> m = new HashMap<String, Object>();
		m.put("org", orgId);
		m.put("typeId", objectClass);
		m.put("name", name);
		List<ExamGird> list = examService.selectOrgByPid(m);
		Page<ExamGird> result = new Page<ExamGird>(new PageInfo<ExamGird>(list));
		return Ajax.responseString(CST.RES_SECCESS, result, true);
	}

	@RequestMapping(value = "/selectObjNameByType")
	@ResponseBody
	public String initObjectNameByUser(String org, String objectType) {
		// 对象类型
		String objectTypeId = null;
		// 当前端传递过来的值不为空时，改变入参的值，这里是因为在xml中只做了null的判断
		if (objectType.equals("gridManager")) {
			objectTypeId = "3";
		} else if (objectType.equals("cdManager")) {
			objectTypeId = "2";
		} else if (objectType.equals("busiManager")) {
			objectTypeId = "5";
		} else if (objectType.equals("directManager")) {
			objectTypeId = "4";
		} else if (objectType.equals("societyManager")) {
			objectTypeId = "1";
		} else {
			objectTypeId = null;
		}

		// 当前orgId
		String orgId = null;
		if (org != null && org != "") {
			orgId = org;
		}
		// 传入到sql中的参数
		Map<String, String> map = new HashMap<>();
		map.put("org", orgId);
		map.put("typeId", objectTypeId);
		List<?> list = examService.selectObjNameByType(map);
		@SuppressWarnings("unchecked")
		Page<ExamGird> result = new Page<ExamGird>(new PageInfo<ExamGird>((List<ExamGird>) list));
		return Ajax.responseString(CST.RES_SECCESS, result, true);
	}

	@RequestMapping(value = "/insertToGridRankDetail")
	@ResponseBody
	public String insertToGridRankDetail(String jsonStr, String examInput, String objInput, HttpSession session) {
		try {
			// 获取当前登录用户
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			String orgId = user.getOrgId();
			// 随机生成RANK_ID(考核id)
			String examId = KpiIndexAction.getExamId();
			examService.insertToGridRankDetail(jsonStr, examInput, objInput, examId, orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基础信息插入失败！");
		}
	}

	@RequestMapping(value = "/updateGridRankDetail")
	@ResponseBody
	public String updateGridRankDetail(String jsonStr, String examInput, String objInput, String examId, HttpSession session) {
		try {
			// 获取当前登录用户
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			// 获取当前登录用户名
			String orgId = user.getOrgId();
			examService.deleteGridRankDetailById(examId);
			examService.updateGridRankDetailStatusById(examId);
			examService.insertToGridRankDetail(jsonStr, examInput, objInput, examId, orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基础信息插入失败！");
		}
	}

	@RequestMapping(value = "/reuseExamModel")
	@ResponseBody
	public String reuseExamModel(String examStr, HttpSession session) {
		try {
			// 获取当前登录用户
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			// 获取当前登录用户名
			String userName = user.getUserName();
			String orgId = user.getOrgId();
			// 模板id 对应上面的 指标table字符串 周期类型，开始时间字符串 对象名称字符串
			// 这个是模板id，exam_model的唯一id，对应kpi的多个id;
			String newExamId = UUID.randomUUID().toString().replaceAll("-", "");
			examService.insertExamAndEtc(examStr, newExamId, userName, orgId);
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基础信息插入失败！");
		}
	}

	@RequestMapping(value = "/selectExamResult")
	@ResponseBody
	public List<Map<String, String>> selectExamResult(String cycleType, String start, HttpSession session) {
		// 获取当前登录用户
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		// 查询所用已考核的
		String status = "2";
		Map<String, String> map = new HashMap<String, String>();
		map.put("orgId", orgId);
		map.put("status", status);
		map.put("cycleType", cycleType);
		map.put("start", start);
		List<Map<String, String>> list = examService.selectExamResult(map);
		return list;
	}

	@RequestMapping(value = "/publish")
	@ResponseBody
	public List<Map<String, String>> publish(HttpSession session, String ids) {
		// 获取当前登录用户
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();
		examService.publish(ids, orgId);
		return null;
	}

}
