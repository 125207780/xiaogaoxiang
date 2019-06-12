<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<% 
String orgId = request.getParameter("orgId");
SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
if(orgId ==null){
   orgId= sysUser.getOrgId();
	
}
SysOrg sysOrg =sysUser.getSysOrg();
boolean level = sysOrg.getOrgLevel().equals("3");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>预警规则</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/warning/warning.css" />
<style>
.btn-primary{
	padding:0 15px;
}
#topwindow101context{
	width:1030px !important;
}
/* .modal-bottom{
	display:none !important;
} */
</style>
</head>
<body>
	<input class="orgId" type="hidden" value="<%=orgId %>" />
	<div class="rule-all">
		<div class="rule-top" style="overflow:hidden;">
			<div class="select-top">
				<span>地市：</span>
				<select id="cityCompany"></select>
			</div>
			<div class="select-top">
				<span>区县：</span>
				<select id="areaCompany"></select>
			</div>
			<div class="select-top">
				<span>营业部：</span>
				<select id="saleDept"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>范围：</span>
				<select id="range">
					<option value="0">网格</option>
					<option value="1">渠道</option>
				</select>
			</div>
			<div class="select-top">
				<span><i>*</i>网格：</span>
				<select id="gridAll"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>渠道：</span>
				<select id="channel"></select>
			</div>
			<div class="select-top">
				<span><i>*</i>预警类型：</span>
				<select id="warningType">
					<option value="0">预算预警</option>
					<option value="1">资源预警</option>
					<option value="2">关键指标预警</option>
				</select>
			</div>
			<div class="select-top" style="float: right;">
			<% if(level){ %>
				<button class="btn btn-primary" type="button" id="addButton">添加</button>
			<% } %>
				<button class="btn btn-primary" type="button" id="checkButton">查询</button>
				<button class="btn btn-primary" type="button" id="clearButton">重置</button>
			</div>
		</div>
		
		<div class="rule-buttom">
			<div class="grid">
	            <table id="waringResultGrid"></table>
	            <div id="grid-pager"></div>
		    </div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var rule_level = <%=level%>;
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/warning/ruleWarning.js"></script>
</html>