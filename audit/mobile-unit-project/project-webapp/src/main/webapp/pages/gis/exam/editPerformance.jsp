<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 --><%String modelID = request.getParameter("modelID"); %>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>		
<script type="text/javascript">
<%-- var modelID ="<%=modelID%>"; 
alert(modelID) --%>
</script>
			<input type="hidden" value="<%=modelID%>" id ="modelInput_id" />
			<div>
			<label>考核状态：
				<select	id="performance_select"   style="width : 100px ">
				<option value ="2">已考核</option>
				
			</select
			>		
			</label>
				<table id="performance_table"></table>
				<div id ="performance_grid"></div>
			
			</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/editPerformance.js"></script>
	
</body>
</html>