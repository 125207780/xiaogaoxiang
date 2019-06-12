<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Insert title here</title>

<%
String orgId = request.getParameter("orgId");
 
%>
<script type="text/javascript">
var orgId= "<%=orgId%>";
</script>
</head>
<body>
<div class="grid-search-div" id="gridSearch">
				<button class="btn btn-primary" type="button" id="export">导出</button>
				<form id="exportForm" method="post" action="">
				</form>
</div>
<div class="page-content clearfix">
	<div class="col-sm-12 grid-full">
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/indexPage/errChannel.js"></script>

</html>