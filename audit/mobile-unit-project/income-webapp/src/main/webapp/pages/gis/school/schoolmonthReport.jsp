<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.bean.IncomeUser" %>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>

<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp" />
<style type="text/css">
html, body {
	width: 100%;
	height: 100%;
}
body{
	background:url(<%=request.getContextPath()%>/pages/images/frameBg.png) no-repeat !important;
	background-size:100% 100% !important;
}
</style>
</head>
<body class="clearfix" style="background: none; position: relative">
	<div class="tab-pane" id="monthReport">
   		 <div id="myCarousel4" class="carousel slide" style="height: 500px;" data-interval=false>
			<!-- 轮播（Carousel）指标 -->
			<ol class="carousel-indicators" style="bottom: 100px;">
				<li data-target="#myCarousel4" data-slide-to="0" class="active"></li>
				<li data-target="#myCarousel4" data-slide-to="1"></li>
				<li data-target="#myCarousel4" data-slide-to="2"></li>
				<li data-target="#myCarousel4" data-slide-to="3"></li>
				<li data-target="#myCarousel4" data-slide-to="4"></li>
			</ol>    
			
			<!-- 轮播（Carousel）项目 -->
			<div class="carousel-inner">
				 <div class="item active">
				 	<jsp:include page="monthReportForm1.jsp" ></jsp:include>
				</div>
				<div class="item">
					<jsp:include page="monthReportForm2.jsp" ></jsp:include>
				</div>
				<div class="item">
					<jsp:include page="monthReportForm3.jsp" ></jsp:include>
				</div> 
				<div class="item">
					<jsp:include page="monthReportForm4.jsp" ></jsp:include>
				</div>
				 <div class="item">
					<jsp:include page="monthReportForm5.jsp" ></jsp:include>
				</div>   
			</div>
			</div>
   		 </div>
		
</body>
<script type="text/javascript">
$(function(){
	//$("html").niceScroll();
	$(".carousel-indicators li").click(function(){
		 var slideId = $(this).attr("data-slide-to");
		if(slideId == '1'){
			monthReportForm2DetailListGrid()
		}else if(slideId == '2'){
			monthReportForm3DetailListGrid()
		} 
		else if(slideId == '3'){
			monthReportForm4DetailListGrid()
		} 
		else if(slideId == '4'){
			monthReportForm5DetailListGrid()
		} 
	})
})
</script>
</html>
