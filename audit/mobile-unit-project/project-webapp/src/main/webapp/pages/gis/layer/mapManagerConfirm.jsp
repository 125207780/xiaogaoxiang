<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
 SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
 SysOrg sysOrg =sysUser.getSysOrg();
/* if(!sysOrg.getOrgLevel().equals("3")){
response.sendRedirect(request.getContextPath()+"/pages/gis/power/power.jsp"); 
return;
} */
String orgId = sysUser.getOrgId(); 
String loginId1 = sysUser.getLoginId(); 
%>
<script type="text/javascript">
	var nowOrgId = "A31K";
	
	var loginId="<%=loginId1%>"
</script>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />	
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<style>
.btnGroup{
	color:#00BFB2;	
}
.msc_serchBtn.btn{
	margin-left:0;
	margin-top:-1px;
	margin-bottom:0;
	height:40px;
}
html,body {
	width:100%;height: 100%;
}
#main{
	width :65%;height:100%;
	float:left;
	position: relative;
}
#rightpanel{
	width:35%; height:100%;
	float:right;
	position: relative;
	border: 1px solid  rgb(0,158,188);
	background: url(../../images/frameBg.png) center !important;
	background-size:100% 100%;
	padding:10px;
}
#resbtn {
 	position: absolute;
 	top: 50%;z-index:10;right:35%;
 	color:rgb(0,217,243);
 	font-size: 24px;
 	cursor: pointer;
 	width: 24px;
}
.btn{
	height:28px;
	padding:0 15px;
	border-radius:3px;
	margin-left: 8px;
	margin-bottom:5px;
}
.ui-jqgrid-labels .cbox{
	margin-top:13px;
	margin-left:5px;
}
td{
	font-size:14px !important;
}
.ui-jqgrid .ui-jqgrid-labels{
	background:transparent;
}
</style>
</head>
<body  class="clearfix" style="background: none;">
	<div id="main"></div>
	<i id="resbtn" class="fa fa-angle-double-right"></i>  
	<div id ='rightpanel'>
		<p style="color:#fff;">
		   
		   <label>渠道名称：</label><select id="idx_gridName"></select>
		   <label>批次：</label><select id="batch"></select>
		   <button id="idx_detailBtn" class="btn btn-primary">查询</button>
		   <button class="btn btn-primary" type="button" id="confrimsign">签约</button>
		</p>
		<p>
		   <!-- <lable>渠道名称</lable><select  style="width: 170px"  id="idx_chnlName"></select>
		   <label>状态</label><select   style="width: 170px" class="chosen-select" multiple="multiple"  id="idx_status"  data-placeholder="选择状态..."></select> -->
		   
		</p>
		<table id="idx_table"></table>
		<div id="idx_grid-pager"></div>		   
		<div class="fun">
			<!-- <button class="btn" type="button" id="reset" style="left: 54%;">重置</button>
			<button class="btn" type="button" id="delete" style="left: 53%;">删除</button>
			<button class="btn" type="button" id="signing" style="left: 52%;">发起签约</button> -->
		</div>   
	</div>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapManagerConfirm.js"></script>
</body>
</html>