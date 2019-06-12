<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.gridinfo.dao.entity.OrgGridStation"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <cxt:commonLinks />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>基站录入</title>
<script type="text/javascript">
<% 
String message = (String)request.getAttribute("message");
System.out.print(request.getAttribute("title"));
Object object = request.getAttribute("title");
String station ="";
if(object != null){
	int json = (Integer)object;
	  
	station += "已有:"+json+"插入";
}
%>

</script>
<script type="text/javascript">
     var message1="<%=message%>"
    var title = ('<%=station%>')
</script>

<style type="text/css">
#topwindow101context{
  background: url(../../images/frameBg.png) repeat !important;
}
.modal-body{
	background:none;
}
.modal-bottom{
	display: none !important;
}
.ui-jqgrid-labels{
	background:transparent !important;
}
.btn.btn-primary{
	padding:0 15px;
	height:28px !important;
	border-radius:3px;
}
.modal-footer,.modal-bottom{
	background:transparent !important;
}
.bootbox-body,.bootbox-body span{
	color:#fff !important;
}
</style>

</head>

<body>
  <div >
  
  
  </div>

<%--  <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/gridIndexEntryAlert.js"></script> --%>
</body>
<script type="text/javascript">
$(function() {
	if(message1 == "文件上传成功"){
		parent.messageAlert(message1);
		parent.messageAlert(title);
		parent.getGridStationInfoByName(null);
	}else{
		parent.messageAlert(message1);
		parent.getGridStationInfoByName(null);
	}
    
});
	
</script>
</html>