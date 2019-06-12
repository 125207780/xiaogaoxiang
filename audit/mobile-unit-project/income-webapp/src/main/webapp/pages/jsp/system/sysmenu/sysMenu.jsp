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
		<div class="col-sm-3 left-full" id="sysMenuTreeDiv">
		</div>
		<div class="col-sm-9 grid-full">
			<input type="hidden" id="parentId" name="parentId">
			<!-- 查询div -->
			<div class="grid-search-div" id="gridSearch">
				<input type="hidden" class="searchField" id="treeCode" name="treeCode">
				<input type="text" placeholder="菜单名称" class="searchField input-md" id="menuName" name="menuName">
				<button class="btn btn-primary" type="button" id="searchList">查询</button>
				<button class="btn btn-primary" type="button" onclick="topclear('gridSearch')">清空</button>
	            <button class="btn btn-warning" type="button" id="createBtn">新建</button>
			</div>
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>							
</body>
<script src="<%=request.getContextPath()%>/pages/jsp/system/sysmenu/sysMenu.js"></script>
</html>