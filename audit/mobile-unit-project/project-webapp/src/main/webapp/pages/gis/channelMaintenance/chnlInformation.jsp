<%@page import="com.itextpdf.text.log.SysoCounter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<% String chnlArr = request.getParameter("chnlArr"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>
<body>
	<div>
		<input value = "<%=chnlArr %>"  type="hidden" id= "chnlArr">
		<table id = "chnlInformationGrid"></table>
		<div id="chnlInformationPage"></div>
	</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/channelMaintenance/chnlInformation.js"></script>	

</body>
</html>