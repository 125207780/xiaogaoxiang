<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
<style type="text/css">
</style>
<script type="text/javascript">
	var id = "<%=request.getParameter("id")%>";
	var ect = "<%=request.getParameter("ect")%>";
	var et = "<%=request.getParameter("et")%>";
	var ot = "<%=request.getParameter("ot")%>";
	
</script>
<body>
	<div class="page-content clearfix">
		<div class="col-sm-12 grid-full">
			<!-- 列表div -->
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>

<script src="<%=request.getContextPath()%>/pages/gis/exam/gridRankDetail.js"></script>
</html>