<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String uid =request.getParameter("uid");
%>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/nonCommunity.js"></script>
 
  
 
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	
 
	<style>
	.ui-jqgrid-btable tr.jqgrow td{
		white-space: normal;
	}
	#stationName{
		width: 73% !important;
		white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;
		overflow: hidden;
	}
	</style>
 
            	<div id="myCarousel1" class="carousel1 slide" style="height: 370px;" data-interval=false>
					
							<ul class="channelBaseInfo clearfix">
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">小区名称：</div>
										<div id= "CELL_NAME"  class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div id="CELLID" class="channelBaseInfoL" style="display: none"><%=uid %></div>
										<div class="channelBaseInfoL">小区编码：</div>
										<div id="CELL_ID" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">小区地市名称：</div>
										<div id="AREA_NAME" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">小区区县名称：</div>
										<div id="CNTY_NAME" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">网格地市名称：</div>
										<div id="AREA_NAME_GRID" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">网格区县名称：</div>
										<div id="CNTY_NAME_GRID" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">网格名称：</div>
										<div id="GRID_NAME" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">小区地市：</div>
										<div id="CELL_ADDR" class="channelBaseInfoR"></div>
									</div>
									
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">经度：</div>
										<div id="CELL_LONGITUDE" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">纬度：</div>
										<div id="CELL_LATITUDE" class="channelBaseInfoR"></div>
									</div>
									
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">未入格原因：</div>
										<div id="TYPE" class="channelBaseInfoR"></div>
									</div>
									
									
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">建议：</div>
										<div id="REMARK" class="channelBaseInfoR"></div>
									</div>
									
									
								</li>
							</ul>
						</div>
    
	
 