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
				<input type="text" placeholder="姓名" class="searchField input-md" id="userName" name="userName">
				<input type="text" placeholder="联系方式" class="searchField input-md" id="userMobile" name="userMobile">
				<select class="searchField input-md" name="roleId" id="roleId">
					<option value=""> --- 选择角色 --- </option>
				</select>
				<button class="btn btn-primary" type="button" id="testSearchUserList">查询1</button>
				<button class="btn btn-primary" type="button" id="testClearUserList" onclick="topclear('gridSearch')">清空1</button>
	            <button class="btn btn-warning" type="button" id="testCreateUserBtn">新建2</button>
			</div>
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/training/bailong/blSystemUser.js"></script>
</html>