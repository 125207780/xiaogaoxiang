<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <html>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
     <cxt:commonLinks />
 <script type="text/javascript" src="<%=request.getContextPath() %>/pages/js/echarts.js"></script>
<style>
	
	 #topwindow101 .modal-dialog{
		width:600px !important;
	} 
	
</style>
<script type="text/javascript">
</script>
	<div class="page-content clearfix">
	<div class="col-sm-12 grid-full">
			<div id="gridContainer">
									
				<table id="CHL_table2"></table>
				<div id="CHL_grid2"></div>
			</div>
		</div>
	</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/income/CHL-table2.js"></script>
<script type="text/javascript">

</script>
</html>
