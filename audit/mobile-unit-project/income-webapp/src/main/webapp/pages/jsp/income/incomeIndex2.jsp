<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
  <cxt:commonLinks />
  
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

 
 <style type="text/css">
 html,body {
		width:100%;
		height:100%;
	}
	#gbox_CostAndRevenue_Table_grid-table,#CostAndRevenue_Table_grid-table{
		width:100% !important;
		
	}
	
	#gview_CostAndRevenue_Table_grid-table>.ui-jqgrid-bdiv>div{
		width:100% !important;
	}
	
	#gview_CostAndRevenue_Table_grid-table{
		width:100% !important;
		height:482px;
	}
	
	#CostAndRevenue_Table_grid-pager{
		width:100% !important;
		height:14%;
	}
	#gview_CostAndRevenue_Table_grid-table>.ui-jqgrid-bdiv{
		height: 420px !important;
   		 width: 100% !important;
   		 overflow: auto;
	}
	#gview_CostAndRevenue_Table_grid-table .ui-jqgrid-hdiv,#gview_CostAndRevenue_Table_grid-table .ui-jqgrid-hdiv .ui-jqgrid-hbox,
	#gview_CostAndRevenue_Table_grid-table .ui-jqgrid-hdiv .ui-jqgrid-hbox .ui-jqgrid-htable{
		width:100%;
	}
	#gview_CostAndRevenue_Table_grid-table .ui-jqgrid-hdiv .ui-jqgrid-hbox 
	.ui-jqgrid-htable thead .ui-th-column-header{
		text-align:center !important;
	}  
 
</style>
<title>Insert title here</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/defineIncome.css" />
<script type="text/javascript" src="<%=request.getContextPath() %>/pages/js/echarts4.min.js"></script>

</head>
<body class="linear" style="overflow: hidden;">
		<div class="title_font">
			  投入产出分析 
		  	<div class="title_img"></div>
		</div>
		<div style="position: absolute;top: 32px;left: 10px;right: 50%;bottom: 0px; padding:0px,10px"  class="frameDiv">
			<jsp:include page="/pages/jsp/income/nue-table.jsp" ></jsp:include>
		</div>
		<div style="position: absolute;top:32px;left:50%;right: 0px;top:32px;bottom:50%;" class="frameDiv" >
			<jsp:include page="/pages/jsp/income/nue-echart.jsp" ></jsp:include>
		</div>	
		<div style="position: absolute;top: 50%;left:50%;right:25%;bottom: 0px;	" class="frameDiv" >
			<jsp:include page="/pages/jsp/income/nue-echart3.jsp" ></jsp:include>
		</div>
		<div style="position: absolute;top: 50%;left:75%;right:0px;bottom: 0px	" class="frameDiv" >		  	
			<jsp:include page="/pages/jsp/income/nue-echart4.jsp" ></jsp:include>
		</div>
 
<script type="text/javascript">
$(function(){
	initParam();
	initGrid();  
	$("#search").click(function(){
		queryTable();
	})
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var chartId= $(e.target).attr("chartId");
		if(chartId){
			resetCharts(chartId);
		}
	});
})
function resetCharts(domId){
	echarts.getInstanceByDom($("#"+domId)[0]).resize();
}
</script>


</body>
</html>