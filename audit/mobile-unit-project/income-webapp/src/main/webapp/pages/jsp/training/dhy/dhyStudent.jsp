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
				<input type="text" placeholder="根据姓名查询" class="searchField input-md" id="studentName" name="studentName">
				<input type="text" placeholder="根据编号查询" class="searchField input-md" id="studentId" name="studentId">
				<button class="btn btn-primary" type="button" id="studentSearchList">查询信息</button>
				<button class="btn btn-primary" type="button" id="clearSearchList" onclick="topclear('gridSearch')">清空查询信息</button>
	            <button class="btn btn-warning" type="button" id="studentCreateBtn">新建教育信息</button>
			</div>
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/training/dhy/dhyStudent.js"></script>
</html>
