<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
			<div class="grid-search-div" id="gridSearch">
				<input type="text" class="searchField input-md" placeholder="流程名称" id="name" name="name">
				<button class="btn btn-primary" type="button" id="searchModelList">
					查询
				</button>
				<button class="btn btn-warning" type="button" id="createModelBtn">
					新建流程
				</button>
			</div>
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
<script src="<%=request.getContextPath()%>/pages/jsp/activiti/activitiModel.js"></script>
</body>
</html>
