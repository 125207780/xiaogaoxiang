<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String id = request.getParameter("id");
%>
<script type="text/javascript">
var id= "<%=id%>";
</script>
	<div class="page-content clearfix">
	<div class="col-sm-12 grid-full">
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/showObj.js"></script>