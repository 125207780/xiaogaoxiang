<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>预警规则增加</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/warning/addWarning.css" />
</head>
<body>
	<div class="rule-all">
		<div class="rule-top">
			<div class="select-top">
				<span><i>*</i>地市：</span>
				<select id="cityCompany_add" name="cityCompany"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>区县：</span>
				<select id="areaCompany_add" name="areaCompany"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>营业部：</span>
				<select id="saleDept_add" name="saleDept"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>范围：</span>
				<select id="range_add" name="scope">
					<option value="0">网格</option>
					<option value="1">渠道</option>
				</select>
			</div>
			<div class="select-top">
				<span><i>*</i>网格：</span>
				<select id="gridAll_add" name="gridAll"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>渠道：</span>
				<select id="chnl_add" name="chnl"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>预警方式：</span>
				<select id="warningStyle_add" name="warnWay">
					<option value="0">系统告警</option>
					<option value="1">短信告警</option>
					<option value="2">邮件告警</option>
				</select>
			</div>
			<div class="select-top">
				<span><i>*</i>预警周期：</span>
				<input type="text" placeholder="每天、每月、1天、1日..." id="warnCycle_add" name="warnCycle">
			</div>
			<div class="select-top">
				<span><i>*</i>预警类型：</span>
				<select id="warnType_add" name="warnType">
					<option value="0">预算预警</option>
					<option value="1">资源预警</option>
					<option value="2">关键指标预警</option>
				</select>
			</div>
			<div class="waring-object" id="">
				<span><i>*</i>预警通知对象：</span>
				<select id="objName_add" multiple="multiple" class="chosen-select" name="noticeUser"></select>
			</div>
			<div class="waring-rule">
				<span><i>*</i>预警规则配置：</span>
				<div class="ruleSelect">
					<select id="kpiSelect_add" name="warnKpiName"></select>
					<select id="compareSelect_add" name="warnRule">
						<option value="大于">大于</option>
						<option value="大于等于">大于等于</option>
						<option value="小于">小于</option>
						<option value="小于等于">小于等于</option>
						<option value="等于">等于</option>
						<option value="不等于">不等于</option>
					</select>
					<input type="text" name="warnValue" id="kpiValue">
				</div>
			</div>
			<div class="waring-memo">
				<span>备注：</span>
				<div class="mome-input">
					<input type="text" name="remark" id="remark_add">
				</div>
			</div>
				
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/warning/addRuleWarning.js"></script>
</html>