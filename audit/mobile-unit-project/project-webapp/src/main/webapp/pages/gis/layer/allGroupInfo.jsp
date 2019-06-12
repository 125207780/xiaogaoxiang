<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String uid =request.getParameter("uid");
%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/allGroupInfo.js"></script>
<style>
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
	width: 98px;
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
.channelBaseInfoR {
	float: left;
	text-align: left;
	color: #0ab8b6;
	font-size: 15px;
	width: 235px;
	height: 42px;
	word-break: keep-all;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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
 
<div id="myCarousel" class="carousel slide" style="height: 390px;" data-interval=false>
			<ul class="channelBaseInfo clearfix">
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div id="GC_Code" class="channelBaseInfoL" style="display: none"><%=uid %></div>
						<div class="channelBaseInfoL">地市编码：</div>
						<div id="CITY_CODE" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">地市名称：</div>
						<div id="CITY_NAME" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">区县编码：</div>
						<div id="CNTY_CODE" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">区县名称：</div>
						<div id="CNTY_NAME" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">网格编码：</div>
						<div id="GRID_CODE" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">网格名称：</div>
						<div id="GRID_NAME" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">集团类型：</div>
						<div id="GC_TYPE" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">集团单位编码：</div>
						<div id="GC_CODE" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">集团单位名称：</div>
						<div id="GC_NAME" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">集团单位地址：</div>
						<div id="GC_ADDR" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">经度：</div>
						<div id="JING_DU" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">纬度：</div>
						<div id="WEI_DU" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">一级类型编码：</div>
						<div id="INDUSTRY_TYP_ID" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">一级类型名称：</div>
						<div id="INDUSTRY_TYP_NAME" class="channelBaseInfoR"></div>
					</div>
				</li>
					<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">二级类型编码：</div>
						<div id="INDUSTRY_SUB_TYP_ID" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">二级类型名称：</div>
						<div id="INDUSTRY_SUB_TYP_NAME" class="channelBaseInfoR"></div>
					</div>
				</li>
					<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">经理姓名：</div>
						<div id="VIP_MNGR_NAME" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">经理电话：</div>
						<div id="VIP_MNGR_MSISDN" class="channelBaseInfoR"></div>
					</div>
				</li>
			</ul>
			
</div>
