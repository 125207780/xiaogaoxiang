<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
  <cxt:commonLinks />

<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>总览-表格</title>
 
<style type="text/css">
	html,body{
		width:100%;
		height:100%;
	}
	 
	 
	
	  #gbox_idx_table,#idx_table{
		width:100% !important;
	}
	
	#gview_idx_table>.ui-jqgrid-bdiv>div{
		width:100% !important;
	}
	
	#gview_idx_table{
		width:100% !important;
		height:84%;
	}
	
	#idx_table-page{
		width:100% !important;
		height:14%;
	}
	#gview_idx_table>.ui-jqgrid-bdiv{
		height: 77% !important;
   		 width: 100% !important;
   		 overflow: auto;
	}
	#gview_idx_table .ui-jqgrid-hdiv,#gview_idx_table .ui-jqgrid-hdiv .ui-jqgrid-hbox,
	#gview_idx_table .ui-jqgrid-hdiv .ui-jqgrid-hbox .ui-jqgrid-htable{
		width:100%;
	}
	#gview_idx_table .ui-jqgrid-hdiv .ui-jqgrid-hbox 
	.ui-jqgrid-htable thead .ui-th-column-header{
		text-align:center !important;
	}  
	.second{
		width:50%;
		float:left;
	}
	.third{
		width:30%;
		float:left;
	}
	.dd{
		width:40%;
	}
	#inx_info{
		padding-left: 10px;
    	padding-top: 10px;
	}
	.below>div{
		width:25%;
		height:100%;
		float:left;
	}
	
</style>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/defineIncome.css" />
<script type="text/javascript" src="<%=request.getContextPath() %>/pages/js/echarts.js"></script>
</head>
<body>
<div class="title_font">营销活动效益评估<div class="title_img"></div></div>
	 		
			<div  style="position: absolute;top: 32px;left: 10px;right: 50%;bottom: 50%"  class="frameDiv" >
					<jsp:include page="/pages/jsp/income/idx-table.jsp" ></jsp:include>
			</div>
			 
				<div style="position: absolute;top: 32px;left:50%;right: 25%;bottom: 50%;	" class="frameDiv" >
					<jsp:include page="/pages/jsp/income/idx-chart1.jsp" ></jsp:include>
				</div>
				<div style="position: absolute;top: 32px;left: 75%;right: 10px;bottom: 50%;overflow: auto;" class="frameDiv" >
					<jsp:include page="/pages/jsp/income/idx-info.jsp" ></jsp:include>
				</div>				
			 
			<div style="position: absolute;top: 50%;left: 10px;right: 75%;bottom: 5px" class="frameDiv" >
				<jsp:include page="/pages/jsp/income/idx-chart2.jsp" ></jsp:include>
			</div>
			<div  style="position: absolute;top: 50%;left:25%;right: 50%;bottom: 5px" class="frameDiv">
				<jsp:include page="/pages/jsp/income/idx-chart3.jsp" ></jsp:include>
			</div>
			<div  style="position: absolute;top: 50%;left:50%;right: 25%;bottom: 5px" class="frameDiv">
				<jsp:include page="/pages/jsp/income/idx-chart4.jsp" ></jsp:include>
			</div>
			<div  style="position: absolute;top: 50%;left: 75%;right:10px;bottom: 5px" class="frameDiv">
				<jsp:include page="/pages/jsp/income/idx-chart5.jsp" ></jsp:include>
			</div>
	  
</body>
<script type="text/javascript">
$(function(){
	 //initIdexChr1();
	 initIdxTable();
	 //initIdexChr2();
	 //initIdexChr3();
	 //initIdexChr4();
	 //initIdexChr5();
	 $("#search").click(function(){
			queryTable();
		});
})

</script>
</html>