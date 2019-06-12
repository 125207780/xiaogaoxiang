<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<cxt:commonLinks />
</head>
<body>
	<div class="page-content clearfix">
		<div class="col-sm-12 grid-full">
			<div class="grid-search-div" id="gridSearch">
				<input type="text" class="searchField input-md" placeholder="流程名称" id="processname" name="processname">
				<button class="btn btn-primary" type="button" id="searchProcessList">
					查询
				</button>
				<button class="btn btn-warning" type="button" id="createApplyBtn">
					新建关联
				</button>
			</div>
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/activiti/flowManager.js"></script>
</html>