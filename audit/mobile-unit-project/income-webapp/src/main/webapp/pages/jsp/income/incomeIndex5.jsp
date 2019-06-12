<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
	<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
    <cxt:commonLinks />
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>活动用户潜在流失率分析</title>
 
 <title>Insert title here</title>
 <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/defineIncome.css" />
 
<script type="text/javascript" src="<%=request.getContextPath() %>/pages/js/echarts.js"></script>
<style type="text/css">
	html,body,.outDiv {
		width: 100%;height: 100%;
		overflow: hidden;
	}
	#gbox_FX_table,#FX_table{
		width:100% !important;
	}
	
	#gview_FX_table>.ui-jqgrid-bdiv>div{
		width:100% !important;
	}
	
	#gview_FX_table{
		width:100% !important;
		height:482px;
	}
	
	#FX_pager{
		width:100% !important;
		height:14%;
	}
	#gview_FX_table>.ui-jqgrid-bdiv{
		height: 420px !important;
   		 width: 100% !important;
   		 overflow: auto;
	}
	#gview_FX_table .ui-jqgrid-hdiv,#gview_FX_table .ui-jqgrid-hdiv .ui-jqgrid-hbox,
	#gview_FX_table .ui-jqgrid-hdiv .ui-jqgrid-hbox .ui-jqgrid-htable{
		width:100%;
	}
	#gview_FX_table .ui-jqgrid-hdiv .ui-jqgrid-hbox 
	.ui-jqgrid-htable thead .ui-th-column-header{
		text-align:center !important;
	}  
</style>
</head>
<body class="linear">
 	<div class="title_font"> 
 		活动用户潜在流失率分析
 		<div class="title_img"></div>
 	</div>
	<div style="position: absolute;top:32px;left:10px;bottom:0px;right:50%"  class="frameDiv">
		<jsp:include page="/pages/jsp/income/FX-table.jsp" ></jsp:include>
	</div>
	<div style="position: absolute;top:32px;left:50%;bottom:0px;right:10px"  class="frameDiv">
		<jsp:include page="/pages/jsp/income/FX-echartA.jsp" ></jsp:include>
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
})

function resetCharts(domId){
	echarts.getInstanceByDom($("#"+domId)[0]).resize();
}
</script>


</body>
</html>