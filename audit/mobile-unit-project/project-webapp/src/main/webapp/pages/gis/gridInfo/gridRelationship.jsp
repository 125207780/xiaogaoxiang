<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%
	String orgId = request.getParameter("orgId");
	if(orgId == null) {
		// 获取当前登录用户
		SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
   		orgId = sysUser.getOrgId();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/gridRelationship.css" />
<title>网格关系维护</title>
<style type="text/css">
</style>
</head>
</html>
<body>
<input class="orgId" type="hidden" value="<%=orgId %>" />
<div class="mainContent clearfix">
	<div class="pull-left infoTree" id="infoTree">
		<div class="business-list">营业部列表</div>
		<div class="grid-search-div" id="gridSearch">
			<div class="business-listname">名称：</div>
			<input type="text" placeholder="营业部名称" class="searchField input-md" id="saleDeptName" name="saleDeptName">
			<button class="btn btn-primary" type="button" id="searchsaleDeptList">查询</button>
		</div>
		
		<div class="business-content">
			<ul class="org-gridInfo">
				
			</ul>
		</div>
	</div>
	<div class="infoDetail">
		<div class="grid-relationship">
			<div class="view-title">
				已加入营业部网络
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>
			<div class="grid-search-div" id="gridSearch">
				<div class="business-listname">名称：</div>
				<input type="text" placeholder="营业部名称" class="searchField input-md" name="saleDeptName" id="searchGridDept">
				<button class="btn btn-primary" type="button" id="removeAllGrid">移除</button>
			</div>
			<div class="scrollBar">
			</div>
		</div>
		<div class="grid-no">
			<div class="view-title">
				未加入营业部网络
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>
			<div class="grid-search-div" id="gridSearch">
				<div class="business-listname">名称：</div>
				<input type="text" placeholder="网格名称" class="searchField input-md" name="gridName" id="searchNoGridDept">
				<button class="btn btn-primary" type="button" id="addAllGrid">加入</button>
			</div>
			<div class="grid-add-reletionship">
				<div class="scrollBar1">
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridRelationship.js"></script>
</body>