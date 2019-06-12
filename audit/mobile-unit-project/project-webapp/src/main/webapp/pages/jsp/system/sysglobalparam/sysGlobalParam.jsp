<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
</head>
<body>
	<div class="page-content clearfix">
		<div class="col-sm-12 grid-full">
			<!-- 查询div -->
			<div class="grid-search-div" id="gridSearch">
				<input type="text" placeholder="参数名称" class="searchField input-md" id="paramName" name="paramName">
				<input type="text" placeholder="参数值" class="searchField input-md" id="paramValue" name="paramValue">
				<button class="btn btn-primary" type="button" id="searchParamList">查询</button>
				<button class="btn btn-primary" type="button" id="clearParamList" onclick="topclear('gridSearch')">清空</button>
	            <%--<button top-do-role="add" class="btn btn-warning pull-right" type="button" id="createParamBtn">新建</button>--%>
	            <button class="btn btn-warning" type="button" id="createParamBtn">新建</button>
			</div>
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/system/sysglobalparam/sysGlobalParam.js"></script>
</html>