<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
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
}
#piecesBtns{
    padding: 0 10px;
}
.sbtn {
	width: 33%;
	display: inline-block;
	padding: 3px 0px;
	line-height: 12px;
	height: 25px;
}
.sbtn > div{
	width: 30px;
	height:12px;
	display: inline-block;
	margin: 5px 10px 0px 0px;
	border-radius: 4px;
}
.topPanel {
	position: absolute;top: 30px;z-index:10;right:30px;
	padding:10px;
	color:lawngreen;
	background-color: rgba(0,0,0,0.3);
	/* border:1px solid rgb(0,158,188); */
 }
#resbtn {
	position: absolute;top: 50%;z-index:10;right:35%;
	color:rgb(0,217,243);
	font-size: 24px;
	cursor: pointer;
	width: 24px;
}
.BMap_stdMpZoom{
   	top:-6px !important;
}
 .BMap_stdMpPan{
   	top:-55px !important;
 }
 .chosen-select{
 	width:100px;
 }
</style>
</head>
<body  class="clearfix" style="background: none;">
	<div id="main">
	
	</div>
	 <i id="resbtn" class="fa fa-angle-double-right"></i>  
	   <div id ='rightpanel'>
	   
	   <div style="width:100%;color:#fff;padding:10px;">
		    指标类型： <select  class="chosen-select" id="typeList" ></select >
		 &nbsp;&nbsp;&nbsp;&nbsp;  
		    指标名称 ：<select class="chosen-select" id="kpiList"></select> 
	   </div>
	   <div id="piecesBtns">
        
		</div>
		<div style="padding: 5px;">
		<table id="kpiTable" style="width:90%;"></table>
			  <div id="kpiTablePager"></div>
		</div>
	<div>
	</div>
	</div>
	<script type="text/javascript">
	<%	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
	  String orgId= sysUser.getOrgId(); 
	%>
	var orgId = "<%=orgId%>";
	 
	</script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPages.js"></script>
</body>
</html>