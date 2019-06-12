<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

	<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%> 
	   <cxt:commonLinks />
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>存活率</title>
<meta charset="utf-8">
<title>Insert title here</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/defineIncome.css" />

<script type="text/javascript" src="<%=request.getContextPath() %>/pages/js/echarts.js"></script>
<style type="text/css">
	html,body,.outDiv {
		width: 100%;height: 100%
	}
	#gbox_CHL_table,#CHL_table{
		width:100% !important;
		height:100%;
	}
	
	#gview_CHL_table>.ui-jqgrid-bdiv>div{
		width:100% !important;
	}
	
	#gview_CHL_table{
		width:100% !important;
		height:482px;
		 overflow: auto;
	}
	
	#CHL_pager{
		width:100% !important;
		height:14%;
	}
	#gview_CHL_table>.ui-jqgrid-bdiv{
		 height: 420px !important;
   		 width: 100% !important;
   		 overflow: auto;
	}
	#gview_CHL_table .ui-jqgrid-hdiv,#gview_CHL_table .ui-jqgrid-hdiv .ui-jqgrid-hbox,
	#gview_CHL_table .ui-jqgrid-hdiv .ui-jqgrid-hbox .ui-jqgrid-htable{
		width:100%;
	}
	#gview_CHL_table .ui-jqgrid-hdiv .ui-jqgrid-hbox 
	.ui-jqgrid-htable thead .ui-th-column-header{
		text-align:center !important;
	}  
	
</style>
</head>
<body class="linear">
<div class="title_font">活动用户存活率分析 <div class="title_img"></div></div>
	
		
			<div style="position: absolute;top:32px;left:10px;bottom:0px;right:50%"  class="frameDiv">
				<jsp:include page="/pages/jsp/income/CHL-table.jsp" ></jsp:include>
				<!-- <div>123</div> -->
			</div>
			<div style="position: absolute;top:32px;left:50%;bottom:0px;right:0px"  class="frameDiv">
				<!-- <div>123</div> -->
				<jsp:include page="/pages/jsp/income/CHL-echart1.jsp"/> 	
			</div>




</body>
</html>