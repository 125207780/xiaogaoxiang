<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String uids = request.getParameter("uids");
%>
<style>
	
	 #topwindow101 .modal-dialog{
		width:600px !important;
	} 
	
</style>
<script type="text/javascript">
var uids= "<%=uids%>";
</script>
	<div class="page-content clearfix">
	<div class="col-sm-12 grid-full">
			<div id="gridContainer">
				<table id="grid-table"></table>
				<div id="grid-pager"></div>
			</div>
		</div>
	</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/indexPage/groupCost.js"></script>