<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<cxt:commonLinks />
</head>

<body scroll=no>
	<div class="page-content clearfix">
		<div class="col-sm-12 grid-full">
			<div class="grid-search-div" id="gridSearch">
				<input type="hidden" class="searchField" id="pageType" name="pageType" value="handle" />
				<!-- <select class="searchField input-md" id="status" name="status">
					<option value=""> --- 选择工单状态 --- </option>
					<option value="1">办理中</option>
					<option value="2">待审核</option>
				</select> -->
				<input type="text" class="searchField input-md" placeholder="工单名称" id="workOrderName" name="workOrderName">
				<button class="btn btn-primary" type="button" id="searchWorkOrderList">
					查询
				</button>
			</div>
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/workbench/workorder/workOrder.js"></script>
<script src="<%=request.getContextPath()%>/pages/jsp/workbench/workorder/backlogWorkOrder.js"></script>
</html>