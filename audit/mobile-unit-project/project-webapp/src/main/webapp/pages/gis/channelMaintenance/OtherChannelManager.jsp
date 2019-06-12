<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% String gridCode = request.getParameter("gridCode");
String JsonchnlCodes = request.getParameter("JsonchnlCodes");
%>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>
<body>
	<input value="<%=gridCode%>" id ="gridCode"  type="hidden" />
	<input value="<%=JsonchnlCodes%>" id ="JsonchnlCodes"  type="hidden" />
	<div>	
			<label>社会渠道经理：</label>
	 <select  id="subjectId"></select>			
 		<button id="btn_select">查询</button>
	
			<table id="MainGridTable12345"></table>
			<div  id="MainGridPage12345"></div>
		
	</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/channelMaintenance/OtherChannelManager.js"></script>		
</body>
</html>