<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
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
<title>上传</title>
<script type="text/javascript">
<% 
String message = (String)request.getAttribute("message");

%>
</script>
<script type="text/javascript">
     var message1="<%=message%>"
     
	
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
</body>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/fileAlert.js"></script> 
<script type="text/javascript">
$(function() {
    messageAlert(message1);
    
});
	
</script>
</html>