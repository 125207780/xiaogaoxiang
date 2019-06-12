<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String uid =request.getParameter("uid");
%>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/stationInfo.js"></script>
 
  
 
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	
 
	<style>
	.ui-jqgrid-btable tr.jqgrow td{
		white-space: normal;
	}
	#myCarousel .ui-jqgrid-btable tr.jqgrow td {
	white-space: normal;
}
#myCarousel #topwindow101context {
	background: url(../../images/frameBg.png) center !important;
	background-size: 100% 100%;
	height: 440px !important;
	top: 40px !important;
}
#gbox_channelTable .slimScrollDiv {
	height: 405px !important;
}
#gbox_channelTable .slimScrollDiv .ui-jqgrid-bdiv {
	height: 100% !important;
	width: auto;
	overflow: hidden;
}
#gview_pane_grid_table .slimScrollDiv {
	height: 405px !important;
}
#gview_pane_grid_table .slimScrollDiv .ui-jqgrid-bdiv {
	height: 100% !important;
	width: auto;
	overflow: hidden;  
}
#gview_idx_table .slimScrollDiv {
	height:405px !important;
}
#gview_idx_table .slimScrollDiv .ui-jqgrid-bdiv {
	height: 100% !important;
	width: auto;
	overflow: hidden;  
}
.carousel-control {
	background: none !important;
	background-image: none !important;
	top: 38px;
	width: 7%;
}
.carousel-control .glyphicon-chevron-left {
	margin-left: -22px;
}
.carousel-control .glyphicon-chevron-right {
	margin-right: -22px;
}
.item {
	padding: 0px 30px;
}
.carousel-indicators {
    bottom: -20px;
}
.carousel-indicators .active {
    margin: 0;
    width: 12px;
    height: 12px;
    background-color: #0074d6;
}
.carousel-indicators li {
	border: 1px solid #0074d6;
}
.modal-body {
	background: rgba(14,19,34,0.8);
	padding: 0px;
	border-radius: 6px 6px 5px 5px;
}
.channelBaseInfo, .channelBaseInfoList {
	margin: 0px;
	list-style: none;
}
.channelBaseInfoDiv {
	float: left;
	width: 45%;
	height: 42px;
	line-height: 43px;
	margin-left: 5%;
	position: relative;
	display: inline-block;
	vertical-align: top;
}
.channelBaseInfoDiv1 {
	height: 50px;
	line-height: 51px;
}
.channelBaseInfoDiv1 .channelBaseInfoL, .channelBaseInfoDiv1 .channelBaseInfoR {
	float: left;
}
.channelBaseInfoDiv3 {
	float: left;
	width: 33.3333%;
	tex-align: center;
	height: 60px;
}
.channelBaseInfoL {
	float: left;
	text-align: left;
	color: #fff;
	width: 140px;
	word-break: keep-all;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.channelBaseInfoLC {
	float: left;
	text-align: left;
	color: #fff;
	width: 300px;
}
.channelBaseInfoR{
	float:left;
	text-align:left;
	color:#0ab8b6;
	font-size:15px;
	width:229px;
	height: 42px;
	word-break:keep-all;/* 不换行 */
	white-space:nowrap;/* 不换行 */
	overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
	text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden一起使用。*/
}
.channelBaseInfoL3 {
	text-align: center;
	color: #fff;
}
.channelBaseInfoR3 {
	text-align: center;
	color: #0ab8b6;
	font-size: 15px;
	margin-left: 28px;
}
.itemChart {
	float: left;
	width: 38% !important;
	height: 300px;
}
.itemTable {
	float: left;
	width: 60% !important;
	height: 300px;
}
#itemChart {
	float: left;
	width: 60%;
	height: 300px;
}
.modal-headers {
	background: rgba(27,26,24,0.5) !important;
	padding: 10px 5px;
	border-radius: 5px 5px 0px 0px;
	z-index: 9999;
	border-bottom: 2px solid #0074d6;
	text-align: center;
}
.modal-headers .close {
	color: #fff;
	opacity: 0.8;
	display: none;
}
.item {
	padding: 0px 0px;
}
.channelBaseInfo {
	padding: 0 30px;
}
.carousel-control {
	color: #0074d6;
	opacity: 1;
}
.carousel-control .glyphicon-chevron-left, .carousel-control .glyphicon-chevron-right {
	font-size:20px;
}
.ui-jqgrid tr.ui-row-ltr td {
	color:#fff;
}
.modal-bottom {
	display: none;
}
.carousel-inner {
	border-bottom: 2px solid #0074d6;
	height: 352px;
}
#chnlAddr {
	width: 73% !important;
	white-space: nowrap;/*不换行*/
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>
	</style>
 
            	<div id="myCarousel" class="carousel slide" style="height: 370px;" data-interval=false>
					<!-- <!-- 轮播（Carousel）指标
					<ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
						<li data-target="#myCarousel" data-slide-to="2"></li>
						<li data-target="#myCarousel" data-slide-to="3"></li>
					</ol>   
					轮播（Carousel）项目
					<div class="carousel-inner">
						<div class="item active">
						<div class="modal-headers">
			                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			                <h4 class="modal-title" id="myModalLabel">基站基础信息</h4>
			            </div> -->
							<ul class="channelBaseInfo clearfix">
							<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">地市编码：</div>
										<div id= "CITY_CODE"  class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div id="stationId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
										<div class="channelBaseInfoL">地市名称：</div>
										<div id="CITY_NAME" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">区县编码：</div>
										<div id= "CNTY_CODE"  class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div id="stationId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
										<div class="channelBaseInfoL">区县名称：</div>
										<div id="CNTY_NAME" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">网格编码：</div>
										<div id= "GRID_CODE"  class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div id="stationId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
										<div class="channelBaseInfoL">网格名称：</div>
										<div id="GRID_NAME" class="channelBaseInfoR"></div>
									</div>
								</li>
								
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">基站名称：</div>
										<div id= "STATION_CODE"  class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div id="stationId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
										<div class="channelBaseInfoL">基站编码：</div>
										<div id="STATION_NAME" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">基站类型：</div>
										<div id="STATION_TYPE" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">是否入格：</div>
										<div id="ENTER_GRID" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">基站经度：</div>
										<div id="STATION_LON" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">基站纬度：</div>
										<div id="STATION_LAT" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">基站状态：</div>
										<div id="IS_ONNET" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">基站属性：</div>
										<div id="BTS_ATTR" class="channelBaseInfoR"></div>
									</div>
									
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">是否村通基站：</div>
										<div id="IS_VILLAGE_STATION" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">基站站号：</div>
										<div id="STATION_NUM" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">覆盖类型：</div>
										<div id="COVER_TYP" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">vip级别：</div>
										<div id="VIP_CLASS" class="channelBaseInfoR"></div>
									</div>
									
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">生命周期状态：</div>
										<div id="LIFE_CYC_STS" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">小区数：</div>
										<div id="COUNTY_COUNT" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">载频数：</div>
										<div id="FREQUENCY" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">理论载频数：</div>
										<div id="THEORY_FREQUENCY" class="channelBaseInfoR"></div>
									</div>
									
								</li> 	
									<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">话音信道数：</div>
										<div id="VOICE_CHAIN" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">信令信道数：</div>
										<div id="SIGNAL_CHAIN" class="channelBaseInfoR"></div>
									</div>
								</li>
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">gprs静态配置系数：</div>
										<div id="GPRS_STATIC_STAT_CONFIG" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">gprs动态配置系数：</div>
										<div id="GPRS_DYNAMIC_STAT_CONFIG" class="channelBaseInfoR"></div>
									</div>
									
								</li> 	
								<li class="channelBaseInfoList clearfix">
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">覆盖场景：</div>
										<div id="COVER_SCENE" class="channelBaseInfoR"></div>
									</div>
									<div class="channelBaseInfoDiv clearfix">
										<div class="channelBaseInfoL">物理基站数：</div>
										<div id="PHYSICAL_STATION_COUNT" class="channelBaseInfoR"></div>
									</div>
									
								</li> 	
							</ul>
					 </div>
					
					</div>
					<!-- 轮播（Carousel）导航 -->
					<!-- <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
					    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					    <span class="sr-only">Previous</span>
					</a>
					<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
					    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					    <span class="sr-only">Next</span>
					</a> -->
				<!-- </div> -->
    

 