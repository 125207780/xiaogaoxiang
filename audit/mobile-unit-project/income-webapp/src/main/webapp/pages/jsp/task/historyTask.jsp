<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>历史任务</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/task/task.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
</head>
<body>
	<div class="history-all">
		<div class="history-search">
			<div class="view-title">
				查询条件
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>
			<div class="grid-search-div" id="gridSearch">
				<div class="task-search-div">
					<div class="task-name">任务名称：</div>
					<input type="text" placeholder="查询" class="searchField input-md" name="taskName" id="taskName">
				</div>
				<div class="calendar">
					<div class="task-name">取消时间：</div>
					<input type="text" id="startTime" class="searchField input-md" name="startTime" id="startTime">
					<div class="task-name" style="margin-left: 0 !important">&nbsp;至&nbsp;</div>
					<input type="text" id="endTime" class="searchField input-md" name="endTime" id="endTime">
				</div>
				<div class="search-button">
					<button class="btn btn-primary" type="button" id="searchButton">查询</button>
					<button class="btn btn-primary" type="button" id="clearButton">清除</button>
				</div>
			</div>
		</div>
		<div class="history-content">
			<div class="view-title">
				取消的任务
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>
			<div class="grid" id="taskCancelDiv">
	            <table id="taskCancel"></table>
	            <div id="grid-pager"></div>
	        </div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/task/historyTask.js"></script>
</html>