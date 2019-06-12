<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@page import="com.metasoft.portal.sso.domain.User"%>
<%@page import="com.metasoft.sso.client.util.WebConst"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>	
    <cxt:commonLinks />
<%
	User user = new User();
	//user.setUserId("zzj123");
	user.setUserId("z");
	session.setAttribute(WebConst.SESSION_NAME_USER_INFO, user);

%>
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<title>Insert title here</title>
</head>
<body>
<input type="hidden" id= "input" value="<%=user %>">
<h3>这是一个网页</h3>
</body>
<script type="text/javascript">
var u = $("#input").val();
console.log(u);
</script>
</html>