<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String uid =request.getParameter("uid");
%>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/importantCommunity.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/importantCommunity.css" />
<style>
.ui-jqgrid-btable tr.jqgrow td {
	white-space: normal;
}
#stationName {
	width: 73% !important;
	white-space: nowrap;/*不换行*/
       text-overflow:ellipsis;
	overflow: hidden;
}
</style>
	<div id="myCarousel" class="carousel slide" style="height: 370px;" data-interval=false>
		<!-- 轮播（Carousel）指标 -->
		<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<!-- <li data-target="#myCarousel" data-slide-to="1"></li>
			<li data-target="#myCarousel" data-slide-to="2"></li>
			<li data-target="#myCarousel" data-slide-to="3"></li> -->
		</ol>   
		<!-- 轮播（Carousel）项目 -->
		<div class="carousel-inner">
			<div class="item active">
			<div class="modal-headers">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">重点小区信息</h4>
            </div>
				<ul class="channelBaseInfo clearfix">
					<li class="channelBaseInfoList clearfix">
						<div class="channelBaseInfoDiv clearfix">
							<div class="channelBaseInfoL">重点小区名称：</div>
							<div id= "importantAreaNameId"  class="channelBaseInfoR"></div>
						</div>
						<div class="channelBaseInfoDiv clearfix">
							<div id="importantId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
							<div class="channelBaseInfoL">包保渠道名称：</div>
							<div id="channelNameId" class="channelBaseInfoR"></div>
						</div>
					</li>
					<li class="channelBaseInfoList clearfix">
						<div class="channelBaseInfoDiv clearfix">
							<div class="channelBaseInfoL">区域总监名称：</div>
							<div id="areaDirectorNameId" class="channelBaseInfoR"></div>
						</div>
						<div class="channelBaseInfoDiv clearfix">
							<div class="channelBaseInfoL">区域总监电话：</div>
							<div id="areaDirectorNumberId" class="channelBaseInfoR"></div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
