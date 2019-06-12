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
<title>预警规则修改</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/warning/addWarning.css" />
</head>
<body>
	<div class="rule-all">
		<div class="rule-top">
			<div class="select-top">
				<span><i>*</i>地市：</span>
				<select id="cityCompany_update" name="cityCompany"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>区县：</span>
				<select id="areaCompany_update" name="areaCompany"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>营业部：</span>
				<select id="saleDept_update" name="saleDept"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>范围：</span>
				<select id="range_update" name="scope">
					<option value="0">网格</option>
					<option value="1">渠道</option>
				</select>
			</div>
			<div class="select-top">
				<span><i>*</i>网格：</span>
				<select id="gridAll_update" name="gridAll"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>渠道：</span>
				<select id="chnl_update" name="chnl"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>预警方式：</span>
				<select id="warningStyle_update" name="warnWay">
					<option value="0">系统告警</option>
					<option value="1">短信告警</option>
					<option value="2">邮件告警</option>
				</select>
			</div>
			<div class="select-top">
				<span><i>*</i>预警周期：</span>
				<input type="text" placeholder="每天、每月、1天、1日..." id="warnCycle_update" name="warnCycle">
			</div>
			<div class="select-top">
				<span><i>*</i>预警类型：</span>
				<select id="warnType_update" name="warnType">
					<option value="0">预算预警</option>
					<option value="1">资源预警</option>
					<option value="2">关键指标预警</option>
				</select>
			</div>
			<div class="waring-object" id="">
				<span><i>*</i>预警通知对象：</span>
				<select id="objName_update" multiple="multiple" class="chosen-select" name="noticeUser" style="width:  85%"></select>
			</div>
			<div class="waring-rule">
				<span><i>*</i>预警规则配置：</span>
				<div class="ruleSelect clearfix">
					<select id="kpiSelect_update" class="pull-left" style="margin-left:5%;" name="warnKpiName"></select>
					<select id="compareSelect_update" class="pull-left" style="margin-left:5%;" name="warnRule">
						<option value="大于">大于</option>
						<option value="大于等于">大于等于</option>
						<option value="小于">小于</option>
						<option value="小于等于">小于等于</option>
						<option value="等于">等于</option>
						<option value="不等于">不等于</option>
					</select>
					<input type="text" name="warnValue" id="kpiValue_update">
				</div>
			</div>
			<div class="waring-memo">
				<span>备注：</span>
				<div class="mome-input">
					<input type="text" name="remark" id="remark_update">
				</div>
			</div>
				
		</div>
	</div>
</body>
<script type="text/javascript">
	var warnId = "<%=request.getParameter("warnId")%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/warning/modifyRuleWarning.js"></script>
</html>