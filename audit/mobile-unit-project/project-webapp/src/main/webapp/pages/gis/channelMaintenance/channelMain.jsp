<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
String  loginId =sysUser.getLoginId();
String  orgId =sysUser.getOrgId();
%>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 这个是引入js 等资源，单独的jsp是需要引用这个的，如果只是弹窗，这个就不需要引用 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<style type="text/css">
#topwindow101contextBtn0 {
	display: none !important;
}
label{
	color:#fff;
}
#topwindow101modal-body{
	overflow: hidden !important;
}
#topwindow101 .modal-bottom{
	display:none !important;
}
.modal-content{
	border: 1px solid #014e83;
}
.modal-dialog{
	position: absolute;
    left: 21%;
    top: auto;
}
.grid {
	position: absolute;
}
#topwindow101modal-body {
	height: 400px !important;
}
</style>
<body>
<div style="margin-bottom:10px">
	<label>渠道名称：</label><select id="chnlId" ></select>&nbsp;&nbsp;&nbsp;&nbsp;
	<label>分配状态：</label><select id="statusId" style="width:150px;"><option value="0">未分配</option><option value="1">已分配</option></select>&nbsp;&nbsp;&nbsp;&nbsp;
	<button class="btn btn-primary" id="selectId">查询</button>
	<button class="btn btn-primary" id="channelMain_distributeID">分配社会渠道经理</button>
</div>
 
<div>
	<div class="grid" id="gridtable1">
		<table id="MainGridTable1"></table>
		<div  id="MainGridPage1"></div>
	</div>
	<div class="grid" style="display: none;" id="gridtable2">
		<table id="MainGridTable2"></table>
		<div  id="MainGridPage2"></div>
	</div>
</div>

<script type="text/javascript">
var loginID="<%=loginId%>"
var orgID ="<%=orgId%>"
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/channelMaintenance/channelMain.js"></script>	
</body>
</html>