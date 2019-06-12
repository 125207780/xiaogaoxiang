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
				<input type="text" placeholder="编号" class="searchField input-md" id="workerNum" name="workerNum">
				<input type="text" placeholder="姓名" class="searchField input-md" id="workerName" name="workerName">
				<button class="btn btn-primary" type="button" id="workerSearchList">查找</button>
				<button class="btn btn-primary" type="button" id="clearSearchList" onclick="topclear('gridSearch')">清空</button>
	            <button class="btn btn-warning" type="button" id="workerCreateBtn">新建</button>
	            <button class="btn btn-warning" type="button" id="upload">上传简历</button>
	            <button class="btn btn-warning" onclick = "window.location.href = 'http://localhost:8080/audit/servlet/ListFileServlet'">简历下载</button>
			</div>
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/training/bailong/blWorker.js"></script>
</html>