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
#main {
	height: 100%;
	float: left;
	width: 50%;
	position: relative;
}

#rightpanel {
	width: 25%;
	height: 100%;
	float: right;
	position: relative;
	border: 1px solid rgb(0, 158, 188);
}

#leftpanel {
	width: 25%;
	height: 100%;
	float: left;
	position: relative;
	border: 1px solid rgb(0, 158, 188);
}

.areaMenuLevel3 {
	display: none
}
#leftpanel td{
	color:#009ebc;
	padding-top: 2px;
}
.infoDetail{
	height: 100%;
}
#indexOverview{
	height: 100%;
}
.gridClick:hover {
	background:#8cb4bb;color:000;
	cursor: pointer;
}
#schP_gaoxiao:hover {
	background:#8cb4bb;color:000;
	cursor: pointer;
}
.areaMenuLevel3,.areaMenuLevel2,.areaMenuLevel1 {
	font-weight: bold;
}
.areaMenuLevel3 {
	display: block;
	float: right;
}
</style>
</head>
<body class="clearfix" style="background: none; position: relative">
   		 <div class="tab-pane " id="campusBaseStationInformation1">
    		 <div id="myCarousel" class="carousel slide" style="height: 500px;" data-interval=false>
				<!-- 轮播（Carousel）指标 -->
				<!-- <ol class="carousel-indicators" style="bottom: 7px;">
					<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
				</ol>  -->  
				
				<!-- 轮播（Carousel）项目 -->
				<div class="carousel-inner">
					<div class="item active">
					 	<jsp:include page="stationReportForm.jsp" ></jsp:include>
					</div>
				</div>
			</div>
		 </div>
		
</body>
</html>
