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
<title>指标添加</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/kpi/addKpi.css" />
</head>
<body>
	<div class="addKpi-all">
		<div class="addKpi-content">
			<div class="addKpi-title">指标名称</div>
		</div>
		<div class="addKpiCheck"></div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/kpi/addKpi.js"></script>
</html>