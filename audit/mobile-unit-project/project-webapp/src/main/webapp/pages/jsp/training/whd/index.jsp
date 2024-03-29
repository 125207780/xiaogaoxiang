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
			<!-- 查询    增加div -->
			<div class="grid-search-div" id="gridSearch">
				<input type="text" placeholder="姓名" class="searchField input-md" id="user_Name" name="user_Name">
				<button class="btn btn-primary" type="button" id="searchUserList" >查询</button>
				<button class="btn btn-primary" type="button" id="insertUser" onclick="toInsert()">添加</button>
			</div>
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/training/whd/index.js"></script>
</html>