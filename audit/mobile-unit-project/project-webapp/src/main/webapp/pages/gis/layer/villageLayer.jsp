<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String uid =request.getParameter("uid");
%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/villageLayer.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
<style>
.ui-jqgrid-btable tr.jqgrow td {
	white-space: normal;
}
#stationName {
	width: 73% !important;
	white-space: nowrap;/*不换行*/
	text-overflow: ellipsis;
	overflow: hidden;
	}
</style>
 
<div id="myCarousel" class="carousel slide" style="height: 370px;" data-interval=false>
	<!-- 轮播（Carousel）指标 -->
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
	</ol>   
	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		<div class="item active">
		<div class="modal-headers">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" id="myModalLabel">村庄信息</h4>
    	</div>
		<ul class="channelBaseInfo clearfix">
			<li class="channelBaseInfoList clearfix">
				<div class="channelBaseInfoDiv clearfix">
					<div class="channelBaseInfoL">村庄名称：</div>
					<div id= "physicalName" class="channelBaseInfoR"></div>
				</div>
				<div class="channelBaseInfoDiv clearfix">
					<div id="stationId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
						<div class="channelBaseInfoL">村庄编码：</div>
						<div id="physicalId" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">村庄地址：</div>
						<div id="address" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">村庄类型：</div>
						<div id="physicalType" class="channelBaseInfoR"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
 