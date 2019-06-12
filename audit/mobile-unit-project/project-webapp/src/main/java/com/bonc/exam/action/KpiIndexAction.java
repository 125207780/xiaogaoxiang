package com.bonc.exam.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bonc.common.cst.CST;
import com.bonc.common.utils.Ajax;
import com.bonc.common.utils.PageJqGrid;
import com.bonc.exam.dao.entity.KpiIndex;
import com.bonc.exam.service.ExamService;
import com.bonc.exam.service.KpiIndexService;
import com.bonc.system.dao.entity.SysUser;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 网格考核模块
 * 
 * @author luxing@bonc.com.cn
 *
 */

@Controller
@RequestMapping(value = "/kpiIndex")
public class KpiIndexAction {

	@Autowired
	private KpiIndexService kpiIndexService;

	@Autowired
	private ExamService examService;

	@RequestMapping(value = "/selectKpiGrid", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public PageJqGrid<KpiIndex> selectKpiGrid(HttpSession session, String cycleType, String indexType, Integer page, Integer rows) {
		PageHelper.startPage(page, rows);
		// sql中的入参用map封装
		Map<String, String> map = new HashMap<String, String>();

		// 获取当前登录用户
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		String orgId = user.getOrgId();

		// 这个作为查询的的条件，在map中作为key，默认为[(请选择)null]，就是查询所有，否则就是按条件查询
		String index = null;
		if (!"请选择".contains(indexType)) {
			index = indexType;
		}
		map.put("index", index);
		map.put("cycle", cycleType);
		map.put("orgId", orgId);
		List<KpiIndex> list = kpiIndexService.selectKpiGrid(map);
		// 封装jqGrid返回值，前端是一个table表格
		PageJqGrid<KpiIndex> kpiListGrid = new PageJqGrid<KpiIndex>((Page<KpiIndex>) list);
		return kpiListGrid;

	}

	@RequestMapping(value = "/insertExamKpi")
	@ResponseBody
	public String insertExamKpi(String jsonStr, String examInput, String objInput, HttpSession session) {
		try {
			// 获取当前登录用户
			SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
			// 获取当前登录用户名
			String userName = user.getUserName();
			String orgId = user.getOrgId();
			// 模板id 对应上面的 指标table字符串 周期类型，开始时间字符串 对象名称字符串
			// 这个是模板id，exam_model的唯一id，对应kpi的多个id;
			String examId = getExamId();
			// 执行插入方法，将业务逻辑写入service层。有事务，
			kpiIndexService.insertExamKpi(jsonStr, examInput, objInput, examId, userName, orgId);
			examService.insertToGridRankDetail(jsonStr, examInput, objInput, examId, orgId);
			// 返回值，如果没有错误，就会返回1
			return Ajax.responseString(CST.RES_SECCESS);
		} catch (Exception e) {
			e.printStackTrace();
			return Ajax.responseString(CST.RES_EXCEPTION, "基础信息插入失败！");
		}
	}

	public static String getExamId() {
		// 这个是模板id，exam_model的唯一id，对应kpi的多个id;
		String examId = UUID.randomUUID().toString().replaceAll("-", "");
		return examId;
	}

	@RequestMapping(value = "/selectKpiTypeByOrgId")
	@ResponseBody
	public List<String> selectKpiTypeByOrgId(HttpSession session) {
		// 获取当前登录用户
		SysUser user = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
		// 获取当前登录用户名
		String orgId = user.getOrgId();
		List<String> list = kpiIndexService.selectKpiTypeByOrgId(orgId);
		return list;

	}

}
