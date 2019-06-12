<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
			<!-- 查询div -->
			<div class="grid-search-div" id="gridSearch">
				<input type="text" placeholder="姓名查询测试" class="searchField input-md" id="userName" name="userName">
				<input type="text" placeholder="联系方式查询测试" class="searchField input-md" id="userMobile" name="userMobile">
				<select class="searchField input-md" name="roleId" id="roleId">
					<option value=""> --- 选择角色测试 --- </option>
				</select>
				<button class="btn btn-primary" type="button" id="testWhsSearchUserList">查询测试</button>
				<button class="btn btn-primary" type="button" id="testWhsClearUserList" onclick="topclear('gridSearch')">清空测试</button>
	            <button class="btn btn-warning" type="button" id="testWhsCreateUserBtn">新建测试</button>
			</div>
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/training/whs/testWhsSystemUser.js"></script>
</html>
