<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	// 获取当前登录用户
	SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
	SysOrg sysOrg = sysUser.getSysOrg();
	if(!sysOrg.getOrgLevel().equals("3")){
		response.sendRedirect(request.getContextPath() + "/pages/gis/power/power.jsp"); 
		return;
	}
	String orgId = sysUser.getOrgId();
	Boolean isShowBtn = (Boolean) request.getAttribute("isShowBtn");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<cxt:commonLinks/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/topMenuFrame.css"/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/indexPage.css"/>
<script src="<%=request.getContextPath()%>/resource/ace/js/jquery-ui.js"></script>
<script src="<%=request.getContextPath()%>/resource/bonc/js/select-img.js"></script>
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<!--发布到正式环境后，必须用该js，否则百度地图相关插件用不了（现在不需要使用该js了，就用下面本地的js
<script src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js" type="text/javascript"></script>
-->
<script src="<%=request.getContextPath()%>/pages/gis/indexPage/DrawingManager_min.js"></script>
<title>网格划配</title>
<style type='text/css'>
body, html {
	width: 100%;
	height: 100%;
	overflow: hidden;
	margin:0;
}
#allmap {
	margin-right: 0px;
	overflow: hidden;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	position: absolute;
}
.ui-tooltip {
    display: block;
    font-size: 11px;
    opacity: 1;
    position: absolute;
    visibility: visible;
    z-index: 1024;
    background: white;
    padding: 0px;
	padding-top: 10px;
} 
.icon-ul {
	list-style: none;
	margin: 0;
	padding: 0;
	font-family: "微软雅黑";
	color: #666666;
	padding: 5px;
}
.icon-ul li {
	float: left;
	text-align: center;
	cursor: pointer;
	width: 10%;
	height: 40px;
	line-height: 40px;
}
.icon-ul li:hover i {
	color: white;
}
.icon-ul li:hover {
	background: #2798ca;
	border-radius: 5px;
}
.icon-links {
	font-size: 14px;
}
.table-bordered tr td input[type="text"], .table-bordered tr td select {
	border: none !important;
	width: 100%;
}
.table-bordered tr td {
	white-space: nowrap;
	line-height: 35px !important;
	padding: 2px !important;
}
.no-margin-left {
	margin-left: 16px !important;
}
.col-sm-8 {
	margin-left: -18px !important;
	margin-top: 3px;
}
.btn-sm > .ace-icon {
 	margin-right: -2px!important;
}
.btn-sm > .ace-icon.icon-on-right {
	margin-left: -2px!important;
}
input[type="text"]:not(.ui-pg-input) {
	border: 1px solid #aaaaaa;
}
input:focus {
	border: 1px solid #5897fb !important;
}
select:not(.ui-pg-selbox) {
	border: 1px solid #aaaaaa;
}
.widget-body {
	margin-top: -15px;
}
.indexNum {
	cursor: pointer;
	color: rgb(0,225,253);
	background-color: #f9f9f9;
}
.BMap_stdMpZoom {
	top: 28% !important;
}
.BMap_stdMpPan {
	top: 5% !important;
}
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
}
.clearfix .modal-footer {
    padding: 0px 10px 0px 0px;
    background: transparent;
    border-width: 0px;
    border-: initial;
    border-color: initial;
    border-image: initial;
    padding-right:0;
    margin: 0px 0px 0px 0px;
}
.modal-body {
    position: relative;
    padding: 15px 15px 10px 15px;  
	background-size: 100% 100%;
	text-align: left;
	line-height: 43px;
	height: 90px;
}
.table.table-bordered td {
	border: 1px solid #57597C;
	color: #fff;
	text-align: center;
}
.btn-primary {
    margin-left: 5px;
    border-radius: 8px !important;
}
.form-control.indexNum {
	background: transparent;
}
.chosen-container-multi .chosen-choices {
	border: 1px solid #00e1fd !important;
}
.chosen-container-multi .chosen-choices li.search-choice {
	border-color: #00e1fd;
	line-height: 20px;
}
.chosen-choices .search-choice span,.chosen-choices .search-choice .search-choice-close::before {
	color: #00e1fd;
}
.fix {
	width: 459px;
	border: 1px solid #57597C;
	height: 36px;
	float: left;
	padding: 0 5px;
	text-align: left;
	overflow-y: auto;
}
.fix::-webkit-scrollbar-track {
	background-color: #F5F5F5;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.22);
}
/*定义滚动条高宽及背景*/
.fix::-webkit-scrollbar {
	width: 6px;
	background-color: rgba(0, 0, 0, 0.34);
}
/*定义滚动条*/
.fix::-webkit-scrollbar-thumb {
	background-color: #8b8b8b;
	border-radius: 6px;
}
#topwindow101context .modal-body {
	background: url(<%=request.getContextPath()%>/pages/images/frameBg.png) center !important;
	background-size: 100% 100%;
}
#topwindow101context .modal-bottom {
	display: none !important;
}
#direct_sale_user_info_chosen {
	width: 479px !important;
    float: left;
}
#topwindow101 .modal-content .modal-body {
	padding: 5px;
}	
#uploadFrame {
	height: 64px;
}
#cb_countryMapTable {
	display: none !important;
}
#countryInputId {
	vertical-align: top;
	width: 82%;
	height: 30px;
	BACKGROUND-COLOR: transparent;
	border: 1px solid #014E83;
	color: #FFFFFF;
}
#stationInputId {
	vertical-align: top;
	width: 38.9%;
	height: 30px;
	BACKGROUND-COLOR: transparent;
	border: 1px solid #014E83;
	color: #FFFFFF;
}
#stationDiv {
	height: 84% !important;
}
#SearchId {
	vertical-align: top;
	border-radius: 0px;
	width: 17%;
	height: 30px;
	text-align: center;
	font-size: 10px;
	position: absolute;
	background: #3385FE;
	border: 1;
	border-color: #3385FE;
	color: white;
}
#countryMapTable {
	position: absolute;
	border-collapse: collapse;
	width: 267px;
}
#countryMapTable tr {
	height: 26px;
}
#countryMapTable tr td{
	border: none;
	border-bottom: 1px solid #1E6C8B;
}
table td {
	color: rgb(217, 230, 242) !important;
}
table thead tr td {
	background-color: #000;
	text-align: right;
}
#gbox_AddcountryMapTable {
	width: 457px;
	height: 100px;
}
#gview_AddcountryMapTable {
	top: 10px;
	height: 190px;
}
#AddcountryMapTable td button {
	width: 80%;
	text-align: center;
	font-size: 21px;
}
#AddcountryMapTable tr {
	height: 20px;
}
#AddcountryMapTable tr td {
	border: none;
	border-bottom: 1px solid #1E6C8B;
}
#AddcountryMapTable .ui-widget-content:hover {
	background: rgba(0,114,160,0.35);
}
.active-result {
	background-color: rgba(32,28,72,0.35);
}
.chosen-container.chosen-with-drop .chosen-results .active-result:hover {
	background: radial-gradient(circle, #005C7E, #10214B);
}
.chosen-container.chosen-with-drop .chosen-results {
	color: white;
}
.chosen-container.chosen-with-drop .chosen-drop {
	background-color: rgba(32,28,72,0.55);
}
.chosen-container-multi .chosen-choices {
	border: 1px solid #57597C !important;
}
.search-field text {
	color: white;
}
#countryMapTable .ui-widget-content:hover {
	background: rgba(0,114,160,0.35);
}
.ui-jqgrid .ui-jqgrid-hdiv {
	background: rgba(51,50,86,0.55);
}
.ui-jqgrid-labels {
	background: rgba(51,50,86,0);
}
#topwindow101 > .modal-dialog > .modal-content > .modal-bottom {
	display: none !important;
}
.stationBtn {
	vertical-align: top;
	border-radius: 0px;
	width: 17%;
	height: 30px;
	text-align: center;
	font-size: 10px;
	position: relative;
	background: #3385FE;
	border-color: #3385FE;
	color: white;
}
.ui-jqgrid-htable {
	width: 267px;
}
#poiTbody {
	position: absolute;
	left: 11px;
	top: 100px;
	width: 130px;
	height: 265px;
	background-color: rgba(101, 101, 126, 0.8);
	z-index: 1;
}
#datashow {
    background-color:white;
    right:10px;
    bottom:10px;
    height:auto;
	position:absolute;
}
.communityInput {
	background: transparent !important;
}
</style>
</head>
 
<body>
<div class="mainContent">
	<div id="allmap">
	</div>
	
	<!-- 左侧基础单元周边DIV start -->
	<div id="poiInfo">
		<div class="poiArea">
			<input type="hidden" value="" id="poiUId" />
			<div id="poiTbody">
				<ul>
					<li class="poiAreaList">
						<font class="poiFont">周边渠道</font>&nbsp;
						<span id="channelPoiSpan" class="poiSpan">
							<font id="channelPoiFont" style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="channel_0" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont">周边基站</font>&nbsp;
						<span id="stationPoiSpan" class="poiSpan">
							<font id="stationPoiFont" style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="station_1" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont">周边商场</font>&nbsp;
						<span id="mallPoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="mall_2" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont">周边校园</font>&nbsp;
						<span id="schoolPoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="school_3" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont">周边村庄</font>&nbsp;
						<span id="villagePoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="village_4" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont">周边乡镇</font>&nbsp;
						<span id="townPoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="town_5" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont">聚类市场</font>&nbsp;
						<span id="marketPoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="market_6" />
						</span>
					</li>
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<!-- <li class="poiAreaList">
						<font class="poiFont">周边小区</font>&nbsp;
						<span id="communityPoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="community_6" />
						</span>
					</li> -->
					<li class="poiAreaList">
						<font class="poiFont" style="color: #FF7F00">全部渠道</font>&nbsp;
						<span id="allChannelPoiSpan" class="poiSpan">
							<font id="allChannelPoiFont" style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="allChannel_0" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont" style="color: #FF7F00">全部基站</font>&nbsp;
						<span id="allStationPoiSpan" class="poiSpan">
							<font id="allStationPoiFont" style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="allStation_1" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont" style="color: #FF7F00">光&nbsp;&nbsp;交&nbsp;&nbsp;箱</font>
						<span id="opticalBoxPoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="opticalBox_10" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont" style="color: #FF7F00">分&nbsp;&nbsp;纤&nbsp;&nbsp;箱</font>
						<span id="splittingBoxPoiSpan" class="poiSpan">
							<font style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="splittingBox_11" />
						</span>
					</li>
					<li class="poiAreaList">
						<font class="poiFont" style="color: #FF7F00">小区管理</font>
						<span id="communityManagerSpan">
							<font id="communityPoiFont" style="display: none; font-weight: bolder;"></font>
							<input type="hidden" value="communityManagerInfo_1" />
							<input type="hidden" value="false" id="checkCommunityManager" />
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 左侧基础单元周边DIV end -->
	<!-- 基础单元图片介绍 start -->
	<div id="poiImg">
		<ul>
			<li><img src="<%=request.getContextPath()%>/pages/gis/layer/channel.png"><font>渠道</font></li>
			<li><img src="<%=request.getContextPath()%>/pages/gis/layer/station.png"><font>基站</font></li>
			<li><img src="<%=request.getContextPath()%>/pages/gis/layer/mall.png"><font>商场</font></li>
			<li><img src="<%=request.getContextPath()%>/pages/gis/layer/school.png"><font>学校</font></li>
			<li><img src="<%=request.getContextPath()%>/pages/gis/layer/village.png"><font>村庄</font></li>
			<li><img src="<%=request.getContextPath()%>/pages/gis/layer/town.png"><font>乡镇</font></li>
			<li><img src="<%=request.getContextPath()%>/pages/gis/layer/market.png"><font>市场</font></li>
		</ul>
	</div>
	<!-- 基础单元图片介绍 end -->
	
	<div class="menuArea">
		<ul class="menuAreaUl">
			<li class="menuAreaList" style="display: none;" id="polygonCommunity">
				<img class="iconPicture" src="<%=request.getContextPath()%>/pages/images/icon/img/icon_huatu.png">
				画图
			</li>
			<li class="menuAreaList" id="polygon">
				<img class="iconPicture" src="<%=request.getContextPath()%>/pages/images/icon/img/icon_huatu.png">
				画图
			</li>
			<li class="menuAreaList" id="submit">
				<img class="iconPicture" src="<%=request.getContextPath()%>/pages/images/icon/img/icon_queren.png">
				确认
			</li>
			<li class="menuAreaList" style="display: none;" id="editCommunity">
				<img class="iconPicture" src="<%=request.getContextPath()%>/pages/images/icon/img/icon_xiugai.png">
				修改
			</li>
			<li class="menuAreaList" id="edit">
				<img class="iconPicture" src="<%=request.getContextPath()%>/pages/images/icon/img/icon_xiugai.png">
				修改
			</li>
			<li class="menuAreaList" id="delete">
				<img class="iconPicture" src="<%=request.getContextPath()%>/pages/images/icon/img/icon_shanchu.png">
				删除
			</li>
			<li class="menuAreaList" id="complete">
				<img class="iconPicture" src="<%=request.getContextPath()%>/pages/images/icon/img/icon_queren.png">
				完毕
			</li>
		</ul>
		
		<div class="page-content clearfix" id="clearfixInfo" style="display: none;background-color: rgba(65, 67, 99, 0.8);margin-top: 10px;">
			<div class="col-sm-12 grid-full">
				<div style="width:100%">
					<span style="float: left;color: white;">村镇网格划分</span>
					<span style="float: right;color: white;">
						<span id="upToggleSpan">
							<a id="upToggle" style="cursor: pointer;"><font style="font-size: 20px;color: white;">^</font></a>
						</span>
					</span>
				</div>
				<div id="gridContainer">
					<div>
						<input id="countryInputId" placeholder ="请输入要查询的村镇名称"/>
						<button id="SearchId" style="text-align: center;">查询</button>
					</div>
					<!-- 
					<button id="country_define" class="btn">确定</button> 
					-->
					<div id="countryMapTableInfo" style="margin-top: 10px;position: relative;height: 81%;">
						<table id="countryMapTable" style="width: 267px;" class="condensed"></table>
					</div>
				</div>
			</div>
		</div>
		<div id="gridContainerAdd" style="display: none;width: 100%;background-color: rgba(65, 67, 99, 0.8);margin-top: 10px;">
			<table id="AddcountryMapTable" class="condensed"></table>
		</div>
		<!-- 基站网格 start -->
		<div style="width:100%; height: 40px; background-color: rgba(101, 101, 126, 0.8); margin-top: 10px;" id="downStationToggleDiv">
			<span style="margin-top: 10px; margin-left: 10px; float: left; color: white;">基站网格划分</span>
			<span style="float: right; color: white; padding-right: 13px; margin-top: 5px;">
				<span id="downStationToggleSpan">
					<a id="downStationToggle" style="cursor: pointer;"><font style="font-size: 20px; color: white;">v</font></a>
				</span>
			</span>
		</div>
		<!-- 基站网格 end -->
		<!-- 村镇网络 start -->
		<div style="width: 100%; height: 40px; background-color: rgba(101, 101, 126, 0.8); margin-top: 10px;" id="downToggleDiv">
			<span style="margin-top: 10px; margin-left: 10px; float: left; color: white;">村镇网格划分</span>
			<span style="float: right; color: white; padding-right: 13px; margin-top: 5px;">
				<span id="downToggleSpan">
					<a id="downToggle" style="cursor: pointer;"><font style="font-size: 20px; color: white;">v</font></a>
				</span>
			</span>
		</div>
		<!-- 村镇网络 end -->
		<!-- 导出excel start -->
		<div style="width: 100%; height: 40px; background-color: rgba(101, 101, 126, 0.8); margin-top: 10px;" id="downExportToggleDiv">
			<span style="margin-top: 10px; margin-left: 10px; float: left; color: white;">导出基础单元</span>
			<span style="float: right; color: white; padding-right: 13px; margin-top: 5px;">
				<span id="downExportToggleSpan">
					<a id="downExportToggle" style="cursor: pointer;"><font style="font-size: 20px; color: white;">v</font></a>
				</span>
			</span>
		</div>
		<!-- 导出excel end -->
		<!-- 基站grid start -->
		<div class="page-content clearfix" id="stationDiv" style="display: none;width: 100%;display: none;background-color: rgba(101, 101, 126, 0.8);margin-top: 5px;">
			<div class="col-sm-12 grid-full">
				<div style="width: 100%;">
					<span style="color: white;">基站网格划分</span>
					<span style="float: right;color: white;">
						<span id="upStationToggleSpan">
							<a id="upStationToggle" style="cursor: pointer;padding-top: -3px;"><font style="font-size: 18px;color: white;">^</font></a>
						</span>
					</span>
				</div>
				<div id="gridContainers">
					<div>
						<input id="stationInputId" placeholder ="请输入要查询的基站名称"/>
						<button class="stationBtn" id="searchStationId">查询</button>
						<button class="stationBtn" id="stationExport">导出</button>
						<button class="stationBtn" id="stationImport" data-toggle="modal" data-target="#myModal4">导入</button>
					</div>
					<div id="stationMapTableInfo" style="margin-top: 10px;position: relative;height: 81%;">
						<table id="stationMapTable" class="condensed"></table>
					</div>
				</div>
			</div>
		</div>
		<!-- 基站grid end -->
		<!-- 导出 start -->
		<div class="page-content clearfix" id="exportDiv" style="display: none; width: 100%; display: none; background-color: rgba(101, 101, 126, 0.8); margin-top: 5px;">
			<div class="col-sm-12 grid-full">
				<div style="width: 100%;">
					<span style="color: white;">基础单元信息导出</span>
					<span style="float: right; color: white;">
						<span id="upExportToggleSpan">
							<a id="upExportToggle" style="cursor: pointer; padding-top: -3px;"><font style="font-size: 18px; color: white;">^</font></a>
						</span>
					</span>
				</div>
				<div id="gridContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<font color="#FFFFFF" style="font-size: 14px">网格信息：</font>
						<select id="gridInfos" style="width: 175px; text-align: center">
						</select>
						<button class="exportBtn" id="exportGridInfo">导出</button>
					</div>
					<div id="exportMapTableInfo" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkAllPoiInfo" />
							<font color="#FFFFFF" style="font-size: 14px">全选</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
						<li class="poiAreaList">
							<span class="exportSpans">
								<font class="exportFont">导出渠道</font>
								<input type="checkbox" name="exportInfos" value="channels" />
							</span>
							<span class="exportSpans">
								<font class="exportFont">导出基站</font>
								<input type="checkbox" name="exportInfos" value="stations" />
							</span>
							<span class="exportSpans">
								<font class="exportFont">导出小区</font>
								<input type="checkbox" name="exportInfos" value="community" />
							</span>
						</li>
						<li class="poiAreaList">
							<span class="exportSpans">
								<font class="exportFont">导出楼宇</font>
								<input type="checkbox" name="exportInfos" value="building" />
							</span>
						</li>
					</div>
				</div>
			</div>
		</div>
	
		<!-- 导出 end -->
		
        </div>
	</div>
	 <div id="datashow" class="datashow" >
        </div>	 


<!-- 基站文件上传框 start -->
<div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabelStation">基站表</h4>
			</div>
			<div class="modal-body" style="display: grid;">
				<div style="height: 5px;width: 50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<form target="uploadFrame" id="upformStation" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadStation" method="post">
                  		<div class="form-group">
						<div class="col-xs-12">
							<input type="file" id="stationFileDir" name="stationFileDir"/>
						</div>
			   		</div>
				</form>
				<div style="text-align: right;margin-top: -45px;margin-left: 285px;margin-right: -10px;">
					<button id="improtexcelDirStation" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width: 84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 基站文件上传框 end -->

<!-- 基站导入确定后弹出框 start -->
<div class="modal fade" id="modal-station" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width: 730px;margin: 0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <%-- <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: url(<%=request.getContextPath()%>/pages/images/frameBg.png) center !important;"> --%>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<form class="form-horizontal clearfix col-xs-12 col-sm-12 no-padding" role="form" id="mapForms">
            		<input type="hidden" name="color" id="colors">
            		<input type="hidden" name="pid" id="pids">
            		<input type="hidden" name="address" id="addresss">
            		<input type="hidden" name="orgId" id="orgIds">
            		
            		<input type="hidden" name="userId" id="userIds">
            		<input type="hidden" name="busiId" id="busiIds">
            		<input type="hidden" name="cdId" id="cdIds">
            		<input type="hidden" name="heapId" id="heapIds">
            		<input type="hidden" name="directId" id="directIds">
            		<input type="hidden" name="societyId" id="societyIds">
            		<input type="hidden" name="direct_sale_user_infoId" id ="direct_sale_user_infoIds">
	            		
            		<input type="hidden" name="orgOldId" id="orgOldIds">
            		<input type="hidden" name="maxLng" id="maxLngs">
            		<input type="hidden" name="maxLat" id="maxLats">
            		<input type="hidden" name="minLng" id="minLngs">
            		<input type="hidden" name="minLat" id="minLats">
            		<input type="hidden" name="sharp" id="sharps">
            		<input type="hidden" name="stationInfoList" id="stationInfoList"/>
            		<table class="table table-bordered">
						<tbody>
							<tr>
								<td>归属网格</td>
								<td>
									<div style="width: 584px">
										<select id="gridName" name="gridName">
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<div style="width: 100%;height: 160px;overflow-y: auto;overflow-x: hidden;">
										<table style="width: 100%;height: 100%;border: 1px;">
											<thead>
												<tr align="center">
													<th align="center" style="width: 20%; text-align:center;">基站编码</th>
													<th align="center" style="width: 80%; text-align:center;">基站名称</th>
													<th></th>
													<th></th>
												</tr>
											</thead>
											<tbody id="stationTitleInfo">
												
											</tbody>
										</table>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div style="width: 100%;height: 190px;overflow-y: auto;overflow-x: hidden;">
						<table style="width: 100%;height:100%;border: 1px;" class="table table-bordered">
							<tbody>
								<tr class="tr-shadow">
									<td>区域总监</td>
									<td  colspan="5"> 
										<div style="width: 584px; BACKGROUND-COLOR: transparent;">
											<select class="chosen-select" data-placeholder="请选择区域总监" id="mapManagers" multiple="multiple" name="mapManagers" >
											</select>
										</div>
									</td>
								</tr>
								<tr class="tr-shadow" >
									<td>渠道经理</td>
									<td  colspan="5"  >
										<div  style="width: 584px">
											<select  multiple="multiple" data-placeholder="请选择渠道经理" class="chosen-select" id="directManagers" name="directManagers">
												<option value=""></option>
											</select>
										</div>
									</td>
								</tr>
								<tr class="tr-shadow">
									<td>客户经理</td>
									<td  colspan="5"> 
										<div  style="width: 584px">
											<select class="chosen-select" data-placeholder="请选择客户经理"  id="cdManagers"  multiple="multiple" name="cdManagers" >
											</select>
										</div>
									</td>
								</tr>
								<!-- 根据要求，已经把社会渠道经理给移除
								<tr class="tr-shadow">
									<td>社会渠道经理</td>
									<td  colspan="5"> 
										<div  style="width: 584px">
											<select class="chosen-select" data-placeholder="请选择社会渠道经理" id="heapManagers"  multiple="multiple" name="heapManagers" >
											</select>
										</div>
									</td>
								</tr> -->
								<tr class="tr-shadow" >
									<td>直销人员</td>
									<td colspan="5"  >
										<div>
											<div class="fix" style="width: 512px;">
												<div class="chosen-container chosen-container-multi chosen-with-drop" id="marketSalers" name="marketSalers">
													<ul style="border: none !important;" class="chosen-choices" id="direct_sale_user_infos"> </ul>
												</div>
											</div>
											<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal11" id="downModel_DirectIds" style="height: 30px;margin-left:0;border-radius:0;">导入</button>
										</div>
									</td>
								</tr>
							 	<!-- <tr class="tr-shadow">
									<td>销售经理</td>
									<td colspan="5"> 
										<div>
											<div class="fix" style="width: 437px;">
												<div class="chosen-container chosen-container-multi chosen-with-drop" id="marketManagers" name="marketManagers">
													<ul style="border:none !important;" class="chosen-choices" id="market_ul_ids"> </ul>
												</div>
											</div>					
											<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myFormInlineMarkets" id="addmarketManagers" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">添加</button>
											<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal22" id="downModel_marketManagers" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">导入</button>
										</div>				
									</td>
								</tr>  -->
								<tr class="tr-shadow">
									<td>装维人员</td>
									<td colspan="5"> 
										<div>
											<div class="fix" style="width: 437px;">
												<div class="chosen-container chosen-container-multi chosen-with-drop" id="societyManagers" name="societyManagers">
													<ul style="border:none !important;" class="chosen-choices" id="ul_ids"> </ul>
												</div>
											</div>					
											<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myFormInlines" id="addsocietyManagers" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">添加</button>
											<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal33" id="downModel_societys" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">导入</button>
										</div>				
									</td>
								</tr>
							</tbody>
						</table>
	            	 </div>
					<div class="clearfix modal-footer" >
						<div class='pull-right' style="margin-top: 0px;margin-right: 2px;">
							<button class="btn btn-primary" type="reset" id="resetButton">重置</button>
							<button class="btn btn-primary" id="submitStationBtn" type="button" >保存</button>
						</div>
					</div> 
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 基站销售经理添加按钮 start -->
<div class="modal fade" id="myFormInlineMarkets" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content" style="background: url(<%=request.getContextPath()%>/pages/images/frameBg.png) no-repeat !important; " >
            <div class="modal-header">
                <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>  -->
                <h4 class="modal-title" id="myModalLabel1">注册表单</h4>
            </div>
            <div class="modal-body" style="background:transparent !important;height:210px;">
            	<form class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-sm-2 col-xs-2 control-label">用户名称：</label>
						<div class="col-sm-10 col-xs-10">
							<input type="text" class="form-control" id="inputNameMarkets" 
								   placeholder="用户名称">
						</div>
					</div>
					<div class="form-group">
						<label for="inputPassword" class="col-sm-2 col-xs-2 control-label">手机号：</label>
						<div class="col-sm-10 col-xs-2">
							<input type="text" class="form-control" id="inputPhoneMarkets" placeholder="手机号">
							<span id="msgTitleMarkets" style="color: red;display: none;">请输入正确的手机号！</span>
						</div>
					</div>
				</form>
				<div class="clearfix">
					<button type="button" class="btn btn-default pull-right" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary pull-right" style="margin-right: 10px;" id ="confirm_btn_Market_Station">确认</button>
				</div>
            </div>
        </div>
    </div>
</div>
<!-- 基站销售经理添加按钮 end -->

<!-- 基站装维人员添加按钮 start -->
<div class="modal fade" id="myFormInlines" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="background: url(<%=request.getContextPath()%>/pages/images/frameBg.png) no-repeat !important; " >
            <div class="modal-header">
                <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>  -->
                <h4 class="modal-title" id="myModalLabel">注册表单</h4>
            </div>
            <div class="modal-body" style="background:transparent !important;height:210px;">
            	<form class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-sm-2 col-xs-2 control-label">用户名称：</label>
						<div class="col-sm-10 col-xs-10">
							<input type="text" class="form-control" id="inputNames" placeholder="用户名称">
						</div>
					</div>
					<div class="form-group">
						<label for="inputPasswords" class="col-sm-2 col-xs-2 control-label">手机号：</label>
						<div class="col-sm-10 col-xs-2">
							<input type="text" class="form-control" id="inputPhones" placeholder="手机号">
							<span id="msgTitles" style="color: red;display: none;">请输入正确的手机号！</span>
						</div>
					</div>
				</form>
				<div class="clearfix">
					<button type="button" class="btn btn-default pull-right" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary pull-right" style="margin-right:10px;" id ="confirm_btn_station">确认</button>
				</div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 基站装维人员添加按钮 end -->

<!-- 基站直销人员弹出框 start -->
<div class="modal fade" id="myModal11" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel11">直销人员信息表</h4>
			</div>
			<div class="modal-body" style="display:grid;">
				<div style="height:5px;width:50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<!-- 多选框 -->
				<input type="hidden" value="<%=request.getContextPath() %>" id="loadInfo" />
				<form  target="uploadFrame" id="upformDirStation" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadStationFiles" method="post">
                	<div class="form-group">
						<div class="col-xs-12">
							<input type="file" id="kpiStationFileDir" name="kpiStationFileDir"/>
						</div>
			   		</div>
				</form>
				<div style="text-align: right;margin-top:-45px;margin-left:285px;margin-right:-10px;">
					<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="addDirect_users" style="width:84px;height: 36px;margin-left:0;border-radius:0;">导出模板</button>			
					<button id="improtexcelStationDir" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 基站直销人员弹出框 end -->

<!-- 基站销售经理弹出框 start -->
<div class="modal fade" id="myModal22" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">销售经理信息表</h4>
			</div>
			<div class="modal-body" style="display:grid;">
				<div style="height:5px;width:50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<!-- 多选框 -->
				<form  target="uploadFrame" id="upformStationMatket" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadStationMarket" method="post">
               		<div class="form-group">
				   		<div class="col-xs-12">
					   		<input type="file" id="kpiFileStationMarket" name="kpiFileStationMarket"/>
				     	</div>
			    	</div>
				</form>
				<div style="text-align: right;margin-top:-45px;margin-left:285px;margin-right:-10px;">
					<button  type="button" class="btn btn-primary" data-target="#myFormInline" id="addMarketManagers" style="width:84px;height: 36px;margin-left:5;border-radius:0;">导出模板</button>
					<button id="improtexcelStationMarket" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 基站销售经理弹出框 end -->

<!-- 基站装维人员弹出框 start -->
<div class="modal fade" id="myModal33" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">装维人员信息表</h4>
			</div>
			<div class="modal-body" style="display:grid;">
				<div style="height:5px;width:50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<!-- 多选框 -->
				<form  target="uploadFrame" id="upformStationDSoc" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadStationSoc" method="post">
                	<div class="form-group">
				   		<div class="col-xs-12">
					  		<input type="file" id="kpiFileStationSoc" name="kpiFileStationSoc"/>
				  		</div>
			   		</div>
				</form>
				<div style="text-align: right;margin-top:-45px;margin-left:285px;margin-right:-10px;">
					<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="addSocietyManagers" style="width:84px;height: 36px;margin-left:0;border-radius:0;">导出模板</button>
					<button id="improtexcelStationSoc" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 基站装维人员弹出框 end -->

<!-- 确认模态框 -->
<div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<i class="confirm-close fa fa-times"></i>
				</button>
				<h4 class="modal-title">删除提示框</h4>
			</div>
			<div class="modal-body clearfix" style="margin:0 auto;border-radius:0px 0px 8px 8px;">
				<div>
					是否确认删除？
				</div>
				<div class="pull-right" style="margin-top:-10px;">
					<button class=" btn  pull-left btn-primary pri"  id="confirmBtnModal">确定</button>
					<button class=" btn  pull-left btn-warning war" style="width:96px;"  id="cancelBtnModal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-map" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:730px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <%-- <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: url(<%=request.getContextPath()%>/pages/images/frameBg.png) center !important;"> --%>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<form class="form-horizontal clearfix col-xs-12 col-sm-12 no-padding" role="form" id="mapForm">
            		<input type="hidden" name="color" id="color">
            		<input type="hidden" name="pid" id="pid">
            		<input type="hidden" name="address" id="address">
            		<input type="hidden" name="orgId" id="orgId">
            		
            		<input type="hidden" name="userId" id="userId">
            		<input type="hidden" name="busiId" id="busiId">
            		<input type="hidden" name="cdId" id="cdId">
            		<input type="hidden" name="heapId" id="heapId">
            		<input type="hidden" name="directId" id="directId">
            		<input type="hidden" name="societyId" id="societyId">
            		<input type="hidden" name="direct_sale_user_infoId" id ="direct_sale_user_infoId">
	            		
            		<input type="hidden" name="orgOldId" id="orgOldId">
            		<input type="hidden" name="maxLng" id="maxLng">
            		<input type="hidden" name="maxLat" id="maxLat">
            		<input type="hidden" name="minLng" id="minLng">
            		<input type="hidden" name="minLat" id="minLat">
            		<input type="hidden" name="sharp" id="sharp">
            		<table class="table table-bordered">
						<tbody>
							<tr class="tr-shadow">
								<td>收入规模</td>
								<td colspan="1">
									<span class="form-control indexNum" id="dayCost" name="dayCost" ></span>
								</td>
								<td> 客户规模</td>
								<td colspan="1">
									<span  class="form-control indexNum" id="customCost" name="customCost" /></span>
								</td>
								<td>小区规模</td>
								<td colspan="1">
									<span class="form-control indexNum" id="villageCost" name="villageCost" ></span>
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>集团规模</td>
								<td colspan="1">
									<span  class="form-control indexNum" id="groupCost" name="groupCost"></span>
								</td>
								<td>渠道规模</td>
								<td colspan="1">
									<span class="form-control indexNum" id="channelCost" name="channelCost"></span>
								</td>
								<td>基站规模</td>
								<td colspan="1">
									<span class="form-control indexNum" id="stationCost" name="stationCost"></span>
								</td>
							</tr>
							<tr style="height: 10px;"></tr>
							<tr class="tr-shadow">
								<td>网格名称</td>
								<td colspan="5">
									<span id="Sname"></span>
									<input type="text" id="mapName" placeholder="请输入网格名称" name="mapName" style="width:70%;" >
								</td>
							</tr>
							<tr style="height: 10px;"></tr>
							<!-- 
							<tr style="height: 10px;"></tr>
							<tr class="tr-shadow">
								<td>营业部经理</td>
								<td colspan="7"> 
									<div style="width:575px">
										<select class="chosen-select" data-placeholder="请选择营业部经理" id="busiManager"  multiple="multiple" name="busiManager">
										</select>
									</div>
								</td>
							</tr> 
							-->
							<tr class="tr-shadow">
								<td>区域总监</td>
								<td  colspan="5"> 
								<div  style="width:584px;BACKGROUND-COLOR: transparent;">
									<select class="chosen-select" data-placeholder="请选择区域总监" id="mapManager"  multiple="multiple" name="mapManager" >
									</select>
								</div>
								</td>
							</tr>
							
							<tr class="tr-shadow" >
								<td>渠道经理</td>
								<td  colspan="5"  >
								<div  style="width:584px">
									<select  multiple="" data-placeholder="请选择渠道经理" class="chosen-select" id="directManager" name="directManager">
									<option value=""></option>
									</select>
								</div>
								</td>
							</tr>
							
							<tr class="tr-shadow">
								<td>客户经理</td>
								<td  colspan="5"> 
								<div style="width: 584px">
									<select class="chosen-select" data-placeholder="请选择客户经理" id="cdManager" multiple="multiple" name="cdManager" >
									</select>
								</div>
								</td>
							</tr>
							
							<!-- 根据要求，已经先把社会渠道经理给移除
							<tr class="tr-shadow">
								<td>社会渠道经理</td>
								<td  colspan="5"> 
								<div  style="width:584px">
									<select class="chosen-select" data-placeholder="请选择社会渠道经理" id="heapManager"  multiple="multiple" name="heapManager" >
									</select>
								</div>
								</td>
							</tr> -->
								
							<tr class="tr-shadow" >
								<td>直销人员</td>
								<td  colspan="5"  >
									<div>
										<div class="fix" style="width:512px;">
											<div class="chosen-container chosen-container-multi chosen-with-drop" id="marketSaler" name="marketSaler">
												<ul style="border:none !important;" class="chosen-choices" id="direct_sale_user_info"> </ul>
											</div>
										</div>
										<!-- 
										<div style="width:479px;">
											<select multiple="" data-placeholder="请选择直销人员" class="chosen-select" id="direct_sale_user_info" name="direct_sale_user_info">
												<option value=""></option>
											</select>
										</div> 
										-->
										<button  type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal1"  id="downModel_DirectId" style="height: 30px;margin-left:0;border-radius:0;">导入</button>
									</div>
								</td>
							</tr>
						 	<!-- <tr class="tr-shadow">
								<td>销售经理</td>
								<td colspan="5"> 
									<div>
										<div class="fix" style="width:437px;">
											<div class="chosen-container chosen-container-multi chosen-with-drop" id="marketManager" name="marketManager">
												<ul style="border:none !important;" class="chosen-choices" id="market_ul_id"> </ul>
											</div>
										</div>					
										<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myFormInlineMarket" id="addmarketManager" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">添加</button>
										<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal2" id="downModel_marketManager" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">导入</button>
									</div>				
								</td>
							</tr>  -->
							<tr class="tr-shadow">
								<td>装维人员</td>
								<td colspan="5"> 
									<div>
										<div class="fix" style="width:437px;">
											<div class="chosen-container chosen-container-multi chosen-with-drop" id="societyManager" name="societyManager">
												<ul style="border:none !important;" class="chosen-choices" id="ul_id"> </ul>
											</div>
										</div>
										<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myFormInline" id="addsocietyManager" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">添加</button>
										<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal3" id="downModel_society" style="vertical-align:top;height: 30px;margin-left:0;border-radius:0;">导入</button>
									</div>
								</td>
							</tr>   
						</tbody>
					</table>
					<div class="clearfix modal-footer">
						<div class='pull-right' style="margin-top: -15px;margin-right:2px;">
							<button class="btn btn-primary" type="reset" id="resetButton">重置</button>
							<button class="btn btn-primary" id="submitBtn" type="button" >保存</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
    
<div class="modal fade" id="myFormInlineMarket" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content" style="background: url(<%=request.getContextPath()%>/pages/images/frameBg.png) no-repeat !important; " >
            <div class="modal-header">
                <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>  -->
                <h4 class="modal-title" id="myModalLabel1">注册表单</h4>
            </div>
            <div class="modal-body" style="background:transparent !important;height:210px;">
            	<form class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-sm-2 col-xs-2 control-label">用户名称：</label>
						<div class="col-sm-10 col-xs-10">
							<input type="text" class="form-control" id="inputNameMarket" 
								   placeholder="用户名称">
						</div>
					</div>
					<div class="form-group">
						<label for="inputPassword" class="col-sm-2 col-xs-2 control-label">手机号：</label>
						<div class="col-sm-10 col-xs-2">
							<input type="text" class="form-control" id="inputPhoneMarket" placeholder="手机号">
							<span id="msgTitleMarket" style="color: red;display: none;">请输入正确的手机号！</span>
						</div>
					</div>
				</form>
				<div class="clearfix">
					<button type="button" class="btn btn-default pull-right" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary pull-right" style="margin-right:10px;" id ="confirm_btn_Market">确认</button>
				</div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="myFormInline" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="background: url(<%=request.getContextPath()%>/pages/images/frameBg.png) no-repeat !important; " >
            <div class="modal-header">
                <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>  -->
                <h4 class="modal-title" id="myModalLabel">注册表单</h4>
            </div>
            <div class="modal-body" style="background:transparent !important;height:210px;">
            	<form class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-sm-2 col-xs-2 control-label">用户名称：</label>
						<div class="col-sm-10 col-xs-10">
							<input type="text" class="form-control" id="inputName" placeholder="用户名称">
						</div>
					</div>
					<div class="form-group">
						<label for="inputPassword" class="col-sm-2 col-xs-2 control-label">手机号：</label>
						<div class="col-sm-10 col-xs-2">
							<input type="text" class="form-control" id="inputPhone" placeholder="手机号">
							<span id="msgTitle" style="color: red;display: none;">请输入正确的手机号！</span>
						</div>
					</div>
				</form>
				<div class="clearfix">
					<button type="button" class="btn btn-default pull-right" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary pull-right" style="margin-right: 10px;" id ="confirm_btn">确认</button>
				</div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">销售经理信息表</h4>
			</div>
			<div class="modal-body" style="display: grid;">
				<div style="height: 5px; width: 50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<!-- 多选框 -->
				<form  target="uploadFrame" id="upformMatket" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadMarket" method="post">
               		<div class="form-group">
				   		<div class="col-xs-12">
					   		<input type="file" id="kpiFileMarket" name="kpiFile"/>
				     	</div>
			    	</div>
				</form>
				<div style="text-align: right; margin-top: -45px; margin-left: 285px; margin-right: -10px;">
					<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="addMarketManager" style="width: 84px; height: 36px; margin-left: 5; border-radius: 0;">导出模板</button>
					<button id="improtexcelMarket" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width: 84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>
	
<!-- 基站文件上传框 start -->
<div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabelChannel">基站表</h4>
			</div>
			<div class="modal-body" style="display: grid;">
				<div style="height: 5px; width: 50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<form  target="uploadFrame" id="upformChannel" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/upload" method="post">
               		<div class="form-group">
						<div class="col-xs-12">
							<input type="file" id="chlFileDir" name="chlFileDir"/>
						</div>
			   		</div>
				</form>
				<div style="text-align: right; margin-top: -45px; margin-left: 285px; margin-right: -10px;">
					<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="addChannel_info" style="width:84px;height: 36px;margin-left:0;border-radius:0;">导出模板</button>			
					<button id="improtexcelDirChannel" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 基站文件上传框 end -->
	
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">直销人员信息表</h4>
			</div>
			<div class="modal-body" style="display: grid;">
				<div style="height: 5px; width: 50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<!-- 多选框 -->
				<input type="hidden" value="<%=request.getContextPath() %>" id="loadInfo" />
				<form  target="uploadFrame" id="upformDir" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/upload" method="post">
                	<div class="form-group">
						<div class="col-xs-12">
							<input type="file" id="kpiFileDir" name="kpiFile"/>
						</div>
			   		</div>
				</form>
				<div style="text-align: right; margin-top: -45px; margin-left: 285px; margin-right: -10px;">
					<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="addDirect_user" style="width: 84px; height: 36px; margin-left: 0; border-radius: 0;">导出模板</button>			
					<button id="improtexcelDir" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>		
	
<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">装维人员信息表</h4>
			</div>
			<div class="modal-body" style="display: grid;">
				<div style="height: 5px; width: 50px">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
				</div>
				<!-- 多选框 -->
				<form  target="uploadFrame" id="upformDSoc" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadSoc" method="post">
                	<div class="form-group">
				   		<div class="col-xs-12">
					  		<input type="file" id="kpiFileSoc" name="kpiFile"/>
				  		</div>
			   		</div>
				</form>
				<div style="text-align: right; margin-top: -45px; margin-left: 285px; margin-right: -10px;">
					<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="addSocietyManager" style="width: 84px; height: 36px; margin-left: 0; border-radius: 0;">导出模板</button>
					<button id="improtexcelSoc" type="button" class="btn btn-primary" data-dismiss="modal" style="width: 84px;">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="width: 84px;">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 小区信息弹出框start -->
<div class="modal fade" id="modal-map-community" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:730px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<form class="form-horizontal clearfix col-xs-12 col-sm-12 no-padding" role="form" id="mapCommunityForm" style="height: 500px; overflow-y: auto; overflow-x: hidden;">
            		<input type="hidden" name="addressCommunity" id="addressCommunity" />
					<input type="hidden" name="uid" id="uid" />
            		<table class="table table-bordered">
						<tbody>
							<tr class="tr-shadow">
								<td>地市名称</td>
								<td colspan="3">
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cityName" id="cityName" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>地市编码</td>
								<td colspan="3">
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cityCode" id="cityCode" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>区域类型</td>
								<td colspan="3">
									<input type="text" style="background: transparent !important;" readonly="readonly" name="areaType" id="areaType" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>区县Id</td>
								<td colspan="3">
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cntyId" id="cntyId" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>区县名称</td>
								<td colspan="3">
									<input type="text" style="background: transparent !important;" readonly="readonly" name="countyName" id="countyName" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>乡镇/街道ID</td>
								<td style="width: 150px;">
									<input type="text" style="background: transparent !important;" readonly="readonly" name="villId" id="villId" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="villIdGxh" id="villIdGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>乡镇/街道名称</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="villName" id="villName" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="villNameGxh" id="villNameGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>所属小区ID</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellId" id="cellId" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellIdGxh" id="cellIdGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>所属小区名称</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellName" id="cellName" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellNameGxh" id="cellNameGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>基站ID</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="bsId" id="bsId" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="bsIdGxh" id="bsIdGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区类型</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellType" id="cellType" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellTypeGxh" id="cellTypeGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区经度</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellLongitude" id="cellLongitude" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellLongitudeGxh" id="cellLongitudeGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区纬度</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellLatitude" id="cellLatitude" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellLatitudeGxh" id="cellLatitudeGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区房价</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellPrc" id="cellPrc" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellPrcGxh" id="cellPrcGxh"  value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区占地面积</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellOccupyArea" id="cellOccupyArea" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellOccupyAreaGxh" id="cellOccupyAreaGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区建筑面积</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellBuildArea" id="cellBuildArea" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellBuildAreaGxh" id="cellBuildAreaGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区栋数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellCnt" id="cellCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellCntGxh" id="cellCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区户数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellUserCnt" id="cellUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellUserCntGxh" id="cellUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区入住数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellInUserCnt" id="cellInUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellInUserCntGxh" id="cellInUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区地址</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellAddr" id="cellAddr" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellAddrGxh" id="cellAddrGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>人口规模</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="popuScale" id="popuScale" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="popuScaleGxh" id="popuScaleGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>是否盲点小区</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="isNotBuiltCell" id="isNotBuiltCell" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="isNotBuiltCellGxh" id="isNotBuiltCellGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>建设模式</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="buildMode" id="buildMode" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="buildModeGxh" id="buildModeGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区端口数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="portCnt" id="portCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="portCntGxh" id="portCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>已使用端口数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="usePortCnt" id="usePortCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="usePortCntGxh" id="usePortCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>端口利用率</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="portRatio" id="portRatio" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="portRatioGxh" id="portRatioGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>是否电信覆盖</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="isTeleCover" id="isTeleCover" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="isTeleCoverGxh" id="isTeleCoverGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>是否联通覆盖</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="isUnicomCover" id="isUnicomCover" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="isUnicomCoverGxh" id="isUnicomCoverGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>是否广电覆盖</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="isBroAdCastCover" id="isBroAdCastCover" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="isBroAdCastCoverGxh" id="isBroAdCastCoverGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>是否具备传输资源</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="tranResFlag" id="tranResFlag" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="tranResFlagGxh" id="tranResFlagGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>资源建设难易程度</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="difficultyLvl" id="difficultyLvl" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="difficultyLvlGxh" id="difficultyLvlGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>友商网络接入类型</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="acessType" id="acessType" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="acessTypeGxh" id="acessTypeGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>友商独家进驻情况</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="isSole" id="isSole" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="isSoleGxh" id="isSoleGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>电信用户数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="teleUserCnt" id="teleUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="teleUserCntGxh" id="teleUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>联通用户数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="unicomUserCnt" id="unicomUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="unicomUserCntGxh" id="unicomUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>广电用户数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="broAdCaseUserCnt" id="broAdCaseUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="broAdCaseUserCntGxh" id="broAdCaseUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>移动宽带分额</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="mobileUserRatio" id="mobileUserRatio" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="mobileUserRatioGxh" id="mobileUserRatioGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>友商产品</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="competProd" id="competProd" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="competProdGxh" id="competProdGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>友商促销</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="competProm" id="competProm" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="competPromGxh" id="competPromGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>物业名称</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="propertyCompany" id="propertyCompany" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="propertyCompanyGxh" id="propertyCompanyGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>物业办公电话</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="propertyTel" id="propertyTel" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="propertyTelGxh" id="propertyTelGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>物业公司地址</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="propertyAddr" id="propertyAddr" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="propertyAddrGxh" id="propertyAddrGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>关键人（领导）</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="keyMan" id="keyMan" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="keyManGxh" id="keyManGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>关键人职务</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="keyManPost" id="keyManPost" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="keyManPostGxh" id="keyManPostGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>关键人电话</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="keyManTel" id="keyManTel" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="keyManTelGxh" id="keyManTelGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>物业联系人</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="propertyContName" id="propertyContName" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="propertyContNameGxh" id="propertyContNameGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>物业联系人职务</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="propertyContPost" id="propertyContPost" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="propertyContPostGxh" id="propertyContPostGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>物业联系人电话</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="propertyContTel" id="propertyContTel" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="propertyContTelGxh" id="propertyContTelGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>开发商名称</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="builderName" id="builderName" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="builderNameGxh" id="builderNameGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>开发商联系人名称</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="builderContName" id="builderContName" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="builderContNameGxh" id="builderContNameGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>开发商联系人电话</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="builderContTel" id="builderContTel" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="builderContTelGxh" id="builderContTelGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>开发商办公电话</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="builderTel" id="builderTel" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="builderTelGxh" id="builderTelGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>性别</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="sex" id="sex" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="sexGxh" id="sexGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>宽带用户数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="kdUserCnt" id="kdUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="kdUserCntGxh" id="kdUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>宽带到期用户数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="kdExpUserCnt" id="kdExpUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="kdExpUserCntGxh" id="kdExpUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区价值</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cellValue" id="cellValue" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cellValueGxh" id="cellValueGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>是否覆盖宽带资源</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="coverFlag" id="coverFlag" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="coverFlagGxh" id="coverFlagGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>宽带收入</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="kdInc" id="kdInc" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="kdIncGxh" id="kdIncGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区网络覆盖类型</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="coverType" id="coverType" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="coverTypeGxh" id="coverTypeGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>宽带资源饱和率</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="resSaturatedRatio" id="resSaturatedRatio" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="resSaturatedRatioGxh" id="resSaturatedRatioGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>潜在离网用户占比</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="potentialCnclRatio" id="potentialCnclRatio" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="potentialCnclRatioGxh" id="potentialCnclRatioGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>潜在发展用户占比</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="potentialUserRatio" id="potentialUserRatio" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="potentialUserRatioGxh" id="potentialUserRatioGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>离网占比</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="cnclRatio" id="cnclRatio" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="cnclRatioGxh" id="cnclRatioGxh" value="0.0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>是否攻坚小区</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="regionType" id="regionType" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="regionTypeGxh" id="regionTypeGxh" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>上月目标客户数</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="potentialUserCnt" id="potentialUserCnt" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="potentialUserCntGxh" id="potentialUserCntGxh" value="0" />
								</td>
							</tr>
							<tr class="tr-shadow">
								<td>小区轮廓</td>
								<td>
									<input type="text" style="background: transparent !important;" readonly="readonly" name="shape" id="shape" />
								</td>
								<td>修改值：</td>
								<td>
									<input type="text" name="shapeGxh" id="shapeGxh" />
								</td>
							</tr>
						</tbody>
					</table>
					<div class="clearfix modal-footer">
						<div class='pull-right' style="margin-top: -15px;margin-right:2px;">
							<button class="btn btn-primary" type="reset" id="resetButton">重置</button>
							<button class="btn btn-primary" id="submitCommunityBtn" type="button" >保存</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>



<!-- 小区信息弹出框end -->
<script type="text/javascript">
var nowOrgId = "<%=orgId%>";
$(".chosen-select").chosen();
$('.chosen-select').chosen({allow_single_deselect: false}); 
</script>
<%if(isShowBtn){ %>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/indexPage/OtherindexPage.js"></script>
<%}else{ %>>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/indexPage/indexPage.js"></script>
 <%} %>
</body>
</html>