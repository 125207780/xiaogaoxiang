<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!-- 这里是引入cxt这个前缀，这样请求后台的时候才能引用到路径 -->
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<% 
	String physicalId = request.getParameter("physicalId");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 这个是引入js 等资源，单独的jsp是需要引用这个的，如果只是弹窗，这个就不需要引用 -->
<%-- <cxt:commonLinks /> --%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>小区信息</title>

</head>
<body>
	 <input type="hidden" value="<%=physicalId%>" id="physicalId"/>
	 <table border="3" width="100%" style="background: beige;">
	 	<tr>
	 		<td width="50%">归属地市</td>
	 		<td width="50%" id="city"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">基础单元编码</td>
	 		<td width="50%" id="unitCode"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">学校名称</td>
	 		<td width="50%" id="schoolName"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">校区</td>
	 		<td width="50%" id="schoolArea"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">地址</td>
	 		<td width="50%" id="address"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">办学层次</td>
	 		<td width="50%" id="schoolLevel"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">总学生规模</td>
	 		<td width="50%" id="studentTotal"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">学生规模</td>
	 		<td width="50%" id="studentScale"></td>
	 	</tr>
	 	
	 	<tr>
	 		<td width="50%">主管部门</td>
	 		<td width="50%" id="depart"></td>
	 	</tr>
	 	
	 </table>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/school.js"></script>	
</body>
</html>