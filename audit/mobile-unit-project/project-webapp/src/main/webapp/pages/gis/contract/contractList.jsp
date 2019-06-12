<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!-- 这里是引入cxt这个前缀，这样请求后台的时候才能引用到路径 -->
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 这个是引入js 等资源，单独的jsp是需要引用这个的，如果只是弹窗，这个就不需要引用 -->
<%-- <cxt:commonLinks /> --%>
</head>
<body>
	 
	 <div id="channel-list">
		<table id="channelTable">
		</table>
		<div id="sel_indexTable-pager">
		</div>
	</div>
 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/contract/channelList.js"></script>	
</body>
</html>