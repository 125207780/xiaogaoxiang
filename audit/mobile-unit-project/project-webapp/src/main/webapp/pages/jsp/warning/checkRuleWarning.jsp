<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>预警规则查看</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/warning/checkWarning.css" />
</head>
<body>
	<div class="rule-all">
		<div class="rule-top">
			<div class="select-top">
				<span>地市：</span>
				<input type="text" id = "crw_cityCompany"  disabled="disabled">
			</div>
			<div class="select-top">
				<span>区县：</span>
				<input type="text" id = "crw_areaCompany" disabled="disabled">
			</div>
			<div class="select-top">
				<span>营业部：</span>
				<input type="text" id = "crw_saleDept" disabled="disabled">
			</div>
			<div class="select-top">
				<span>范围：</span>
				<input type="text" id = "crw_range" disabled="disabled">
			</div>
			<div class="select-top">
				<span>网格：</span>
				<input type="text" id="crw_gridAll" disabled="disabled">
			</div>
			<div class="select-top">
				<span>渠道：</span>
				<input type="text"  id="crw_channel" disabled="disabled">
			</div>
			<div class="select-top">
				<span><i>*</i>预警方式：</span>
				<input type="text"  id="crw_warnWay" disabled="disabled">
			</div>
			<div class="select-top">
				<span><i>*</i>预警周期：</span>
				<input type="text" id="crw_warnCycle" disabled="disabled">
			</div>
			<div class="select-top">
				<span><i>*</i>预警类型：</span>
				<input type="text" id="crw_warnType" disabled="disabled">
			</div>
			<div class="waring-object">
				<span><i>*</i>预警通知对象：</span>
				<input type="text" id="crw_noticeUser" style="height: 28px; width: 85%" disabled="disabled">
			</div>
			<div class="waring-rule">
				<span><i>*</i>预警规则配置：</span>
				<div class="ruleSelect">
					<input type="text" id="crw_warnKpiName" style="width: 50%" disabled="disabled">
					<input type="text" id="crw_listValue" disabled="disabled">
					<input type="text" id="crw_warnValue" disabled="disabled">
				</div>
			</div>
			<div class="waring-memo">
				<span>备注：</span>
				<div class="mome-input">
					<input type="text" id="crw_remark" disabled="disabled">
				</div>
			</div>
				
		</div>
	</div>
</body>
<script type="text/javascript">
	var warnId = "<%=request.getParameter("warnId")%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/warning/checkRuleWarning.js"></script>
</html>