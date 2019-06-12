<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>筛选指标</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/kpi/kpiScreen.css" />
</head>
<body>
	<div class="kpiScreen-all">
		<div class="kpiScreen-content">
			<input type="checkbox" id="selectAll">
			<div class="kpiScreen-title">查询条件</div>
		</div>
		<div class="kpiScreenCheck"></div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/kpi/kpiScreen.js"></script>
</html>