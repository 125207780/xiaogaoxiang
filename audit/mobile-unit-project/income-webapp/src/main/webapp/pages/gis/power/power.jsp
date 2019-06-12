<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
String url = (String) request.getAttribute("url");
if(url!=null&&!"".equals(url)){
	response.sendRedirect(request.getContextPath()+"/"+url); 
}
%>
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>暂无权限</title>
	<style>
		.back:hover{
			background:#108EE9 !important;
		}
	</style>
</head>
</html>
<%
String message =(String) request.getAttribute("message");
if(message==null){
	message = "抱歉，您还没有访问权限哦~~";
}
%>
<body style="background:#fff">
	<div class="mainContent clearfix" style="background:#031C31;width:100%;">
		<div style="height:100px;position:absolute;top:50%;left:50%;margin-top:-100px;margin-left:-200px;">
			<div style="text-align:center;"><img src="<%=request.getContextPath()%>/pages/images/gis/alarm4.png" style="width:100px;"/></div>
			<div style="height:50px;line-height:50px;" class="clearfix">
				<div style="float:left">
					<i class="fa fa-lock" style="font-size:30px;color:#0190A9"></i>
				</div>
				<div style="float:left;margin-top:-12px;margin-left:11px">
					<span style="color:#666;font-size:30px;"><%=message %></span>
				</div>
			</div>
		</div>
	</div>
</body>
