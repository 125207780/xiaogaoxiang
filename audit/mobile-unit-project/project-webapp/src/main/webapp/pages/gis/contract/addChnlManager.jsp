<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String grid_code = request.getParameter("gridCode");
	String chnlNameCode = request.getParameter("chnl_code");
%>
<script type="text/javascript">
var gridCode= '<%=grid_code%>';
var chnl_code= '<%=chnlNameCode%>';
console.log("gridCode----"+gridCode);
console.log("chnl_code----"+chnl_code);
</script>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 这个是引入js 等资源，单独的jsp是需要引用这个的，如果只是弹窗，这个就不需要引用 -->
</head>
<body>
	 
		<div>
			<table id="chnl_table"></table>
			<div id="chnl_page"></div>
		</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/contract/addChnlManager.js"></script>	
</body>
</html>