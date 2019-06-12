<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
	<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>	
    <cxt:commonLinks />
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title> ARPU-MOU-DOU </title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/defineIncome.css" />

  <script type="text/javascript" src="<%=request.getContextPath() %>/pages/js/echarts4.min.js"></script>
 <style type="text/css">
 	html,body {
		width:100%;
		height:100%;
	}
	#gbox_ARP_table,#ARP_table{
		width:100% !important;
	}
	
	#gview_ARP_table>.ui-jqgrid-bdiv>div{
		width:100% !important;
	}
	
	#gview_ARP_table{
		width:100% !important;
		height:482px;
	}
	
	#ARP_pager{
		width:100% !important;
		height:14%;
	}
	#gview_ARP_table>.ui-jqgrid-bdiv{
		height: 420px !important;
   		 width: 100% !important;
   		 overflow: auto;
	}
	#gview_ARP_table .ui-jqgrid-hdiv,#gview_ARP_table .ui-jqgrid-hdiv .ui-jqgrid-hbox,
	#gview_ARP_table .ui-jqgrid-hdiv .ui-jqgrid-hbox .ui-jqgrid-htable{
		width:100%;
	}
	#gview_ARP_table .ui-jqgrid-hdiv .ui-jqgrid-hbox 
	.ui-jqgrid-htable thead .ui-th-column-header{
		text-align:center !important;
	}  
	
 
 </style>
<meta charset="UTF-8">
<title>Insert title here</title>
<body  class="linear">
 	<div class="title_font"> 
 		ARPU-MOU-DOU
 	 	<div class="title_img"></div>
 	</div>
	<div style="position: absolute;top: 32px;left: 10px;right: 50%;bottom: 0px; padding:0px,10px"  class="frameDiv">
			<jsp:include page="/pages/jsp/income/ARP-table.jsp" ></jsp:include>
	</div>
	<div style="position: absolute;bottom: 50%;left:50%;right: 0px;top: 32px;	" class="frameDiv" >
			<jsp:include page="/pages/jsp/income/ARP-echart.jsp" ></jsp:include>
	</div>	
	<div style="position: absolute;top: 50%;left:50%;right:25%;bottom: 0px;	" class="frameDiv" >
		<jsp:include page="/pages/jsp/income/ARP-echart4.jsp" ></jsp:include>
	</div>
	<div style="position: absolute;bottom: 0px;left:75%;right:0px;top: 50%;	" class="frameDiv" >		
		<jsp:include page="/pages/jsp/income/ARP-echart5.jsp" ></jsp:include>
	</div>
<script type="text/javascript">
$(function(){
		 initParam();
		 initGrid();
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	var chartId= $(e.target).attr("chartId");
	if(chartId){
		resetCharts(chartId);
	}
});
function resetCharts(domId){
	echarts.getInstanceByDom($("#"+domId)[0]).resize();
}

});
</script>


</body>
</html>