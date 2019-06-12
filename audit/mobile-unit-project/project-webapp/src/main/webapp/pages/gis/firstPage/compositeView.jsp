<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="java.util.*"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysRoleUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	// 获取当前登录角色id
	String loginRoleId = request.getParameter("loginRoleId");
	// 获取当前登录用户
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
	// 获取当前用户所有角色
	List<SysRoleUser> sysRoleUserList = sysUser.getSysRoleUserList();
	for(SysRoleUser sysRoleUser : sysRoleUserList) {
		if(sysRoleUser.getRoleId().equals(loginRoleId)) {
			// 设置当前登陆角色
			sysUser.setLoginSysRoleUser(sysRoleUser);
			break;
		}
	}
	// 往session里set当前登录用户
	session.setAttribute(CST.SESSION_SYS_USER_INFO, sysUser);
	String orgId = request.getParameter("orgId");
	if(orgId == null) {
	   orgId = sysUser.getOrgId();
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/compositeView.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/dataVisualization2.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
<title>网格化智慧管理支撑平台</title>
<style type="text/css">
.topValue {
	text-align: left;
}
.node_name {
	color: #00E1FD;
}
#pg_grid-pager5.ui-pager-control {
	margin-right: 26%;
}
.chooseSelect select {
	width: calc(100% - 42px);
	font-size: 12px;
}
select {
	padding: 0px 0px;
	height: 30px;
}
.sum-select {
	font-size: 12px;
	width: 100%;
	height: 13.7%;
	padding: 1% 1%;
	display: block;
	float: left;
}
.rateRadio {
	margin-left: 3.3%;
	zoom: 0.9;
}
.rateRadio>span {
	font-size: 12px;
	display: inline-block;
	vertical-align: text-bottom;
	margin-top: -1px;
	font-family: serif;
	margin-left: 1px;
}
.ui-jqgrid .ui-jqgrid-pager {
	line-height: 2px;
	height: 50px;
	padding-top: 1px !important;
	padding-bottom: 2px !important;
	background-color: transparent !important;
	border-bottom: 1px solid transparent !important;
	border-top: 1px solid transparent !important;
	color: #353638;
}
.ui-jqgrid .ui-jqgrid-bdiv {
	position: relative;
	margin: 0;
	padding: 0;
	text-align: left;
	color: #666;
	background-color: none;
	overflow-x: auto;
}
.ui-jqgrid tr.ui-row-ltr td, .ui-jqgrid tr.ui-row-rtl td {
	border-left-color: rgb(1, 78, 131);
	color: #fff;
	border-left: 0px solid #014e83;
}
.modal-body {
	text-align: left;
	font-size: 14px;
	background: #f9f9f9;
}
#grid-pager2 {
	line-height: 2px;
	height: 50px;
	padding-top: 6px !important;
	padding-bottom: 2px !important;
	background-color: transparent !important;
	border-bottom: 1px solid transparent !important;
	border-top: 1px solid transparent !important;
	color: #353638;
}
#channelStationInfoMore-pager {
	line-height: 2px;
	height: 50px;
	padding-top: 6px !important;
	padding-bottom: 2px !important;
	background-color: transparent !important;
	border-bottom: 1px solid transparent !important;
	border-top: 1px solid transparent !important;
	color: #353638;
}
#customersMore-pager {
	line-height: 2px;
	height: 50px;
	padding-top: 6px !important;
	padding-bottom: 2px !important;
	background-color: transparent !important;
	border-bottom: 1px solid transparent !important;
	border-top: 1px solid transparent !important;
	color: #353638;
}
.topPanelUp, .lastPanelUp {
	color: #fff;
	font-size: 12px;
}
</style>
</head>
<body>
	<div class="outerDiv">
		<div style="width: 100%; height: 100%;">
			<input value="<%=orgId%>" type="hidden" class="orgId" />
			<div class="firstPage-left">
				<div class="leftDiv">
					<img alt="" src="../../images/icon_Head.png">
					<div class="titleDiv titleImg">
						<span>网格信息概述</span> <span class='rightTit'>单位（个）</span> 
						<span class='rightTit2' onclick="more('网格信息概述')">more</span>
					</div>
					<div id="gridInfo" style="width: 40%; float: left; display: block;" class="echartsLeft"></div>
					<div id="gridInfoPerson" style="width: 60%; display: block; margin-left: 40%;" class="echartsLeft"></div>
				</div>
				<div class="leftDiv">
					<img alt="" src="../../images/icon_Head.png">
					<div class="titleDiv titleImg">
						<span>网格分类规模</span> 
						<span class='rightTit2' onclick="more('网格分类规模')">more</span>
					</div>
					<div id="gridType" class="echartsLeft"></div>
				</div>
				<div class="leftDiv">
					<img alt="" src="../../images/icon_Head.png">
					<div class="titleDiv titleImg">
						<span>基础单元入格信息</span> 
						<span class='rightTit'>单位（个）</span> 
						<span class='rightTit2' onclick="more('基础单元入格信息')">more</span>
					</div>
					<div id="channelStationInfo" class="echartsLeft"></div>
				</div>
				<div class="leftDiv">
					<img alt="" src="../../images/icon_Head.png">
					<div class="titleDiv titleImg">
						<span>用户规模概况</span> <span class='rightTit'>单位（个）</span> 
						<span class='rightTit2' onclick="more('用户规模概况')">more</span>
					</div>
					<div id="userScale" class=>
						<div class="scaleLine">
							<div class="scaleInfo">
								<span class="typeName">期末用户通话数</span> 
								<span id="CUSTOMERS_CALL_COUNT" class="typeNumber typeNumberColorLeft"></span>
							</div>
							<div class="scaleInfo">
								<span class="typeName">新增客户通话数</span> 
								<span id="CUSTOMERS_CALL_ADD" class="typeNumber typeNumberColorRight"></span>
							</div>
						</div>
						<div class="scaleLine">
							<div class="scaleInfo">
								<span class="typeName">净增客户通话数</span> 
								<span id="CUSTOMERS_CALL_NET" class="typeNumber typeNumberColorLeft"></span>
							</div>
							<div class="scaleInfo">
								<span class="typeName">2/3G流量客户数</span> 
								<span id="CUSTOMERS_RATE_23G" class="typeNumber typeNumberColorRight"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="firstPage-middle">
				<div class="titleLevel1Content">
					<div class="middle-top" style="width: 100%; height: 78.5%;">
						<div id="indexInfomation">
							<img alt="" src="../../images/icon_Head.png">
							<div class="titleDiv">
								<span>指标资源情况</span> 
								<span class='rightTit2' onclick="more('指标资源情况')">more</span>
							</div>
							<div style="display: inline-block;">
								<div class="Hexagon HexagoAlive" style="margin-left: 65px; margin-top: 0px;">
									<span>收入</span> <br> 
									<span>
										<span class="hexagonType" id="income">1234</span>
										<div>万</div>
									</span>
								</div>
								<div class="line1" style="margin-left: 144px; margin-top: -31.3px;"></div>
								<div class="Hexagon" style="margin-left: 210px; margin-top: -33.5px;">
									<span>宽带</span> <br> 
									<span>
										<span class="hexagonType" id="bro_count">1234</span>个
									</span>
								</div>
								<div class="line1" style="margin-left: 289px; margin-top: -32px;"></div>
								<div class="Hexagon" style="margin-left: 354px; margin-top: -31px;">
									<span>政企</span> <br> 
									<span>
										<span class="hexagonType" id="gover_cus_sum">1234</span>个
									</span>
								</div>
								<div class="line2" style="margin-left: 431px; margin-top: -35px;"></div>
								<div class="line3" style="margin-left: 56px; margin-top: 44px;"></div>
								<div class="Hexagon" style="margin-left: 134px; margin-top: -35px;">
									<span>新增</span> <br> 
									<span>
										<span class="hexagonType" id="business_add">1234</span>户
									</span>
								</div>
								<div class="line4" style="margin-left: 213px; margin-top: -49px;"></div>
								<div class="Hexagon" style="margin-left: 283px; margin-top: -33px;">
									<span>放号量</span> <br> 
									<span>
										<span class="hexagonType" id="tele_count">1234</span>个
									</span>
								</div>
								<div class="line4" style="margin-left: 359px; margin-top: -49px;"></div>
								<div class="Hexagon" style="margin-left: 429px; margin-top: -33px;">
									<span>4G</span> <br> 
									<span>
										<span class="hexagonType" id="user_count_4g">1234</span>个
									</span>
								</div>
							</div>
						</div>
						<div class="middle-up" style="width: 100%; height: 80%;">
							<div id="mainMap" style="width: 100%; height: 100%;"></div>
						</div>
					</div>
					<!-- 运营监控一览 -->
					<div id="operationSupervision">
						<img alt="" src="../../images/icon_Head.png">
						<div class="titleDiv">
							<span>运营监控一览</span> 
							<span class='rightTit2' onclick="more('运营监控一览')">more</span>
						</div>
						<div class="operationDiv">
							<div class="lineDiv">
								<div class="operationInfo">
									<span class="nameType">区域总监登入次数</span> 
									<span id="LOGIN_DIR_SUM" class="numberType numberTypeColor1"></span> 
									<span>次</span>
								</div>
								<div class="operationInfo">
									<span class="nameType">渠道包保数</span> 
									<span id="CHANNEL_SIGN_COUNT" class="numberType numberTypeColor2"></span>
									<span>个</span>
								</div>
								<div class="operationInfo">
									<span class="nameType">任务工单派发数</span> 
									<span id="TASK_COUNT" class="numberType numberTypeColor1"></span> 
									<span>个</span>
								</div>
								<div class="operationInfo">
									<span class="nameType">任务工单完成数</span> 
									<span id="TASK_DONE" class="numberType numberTypeColor2"></span> 
									<span>个</span>
								</div>
							</div>
						</div>
						<div class="operationDiv">
							<div class="lineDiv">
								<div class="operationInfo">
									<span class="nameType">包保基础单元数</span> 
									<span id="PHYSICAL_SIGN_COUNT" class="numberType numberTypeColor1"></span>
									<span>次</span>
								</div>
								<div class="operationInfo">
									<span class="nameType">任务工单警告数</span> 
									<span id="TASK_ALARM" class="numberType numberTypeColor2"></span> 
									<span>个</span>
								</div>
								<div class="operationInfo">
									<span class="nameType">小区总数</span> 
									<span id="CELL_COUNT" class="numberType numberTypeColor1"></span> 
									<span>个</span>
								</div>
								<div class="operationInfo">
									<span class="nameType">高校总数</span> 
									<span id="COLLEGES_COUNT" class="numberType numberTypeColor2"></span> 
									<span>个</span>
								</div>
							</div>
						</div>
						<div class="operationDiv">
						</div>
					</div>
				</div>
			</div>
			<div class="firstPage-right">
				<div class="echartsRight">
					<img alt="" src="../../images/icon_Head.png">
					<div class="titleDiv2 titleImg2">
						<span>任务资源概况</span> 
						<span class='rightTit2 detailEvent' onclick="more('任务资源概况')" detail_type="任务资源概况">more</span>
					</div>
					<div id="taskSituation"></div>
					<div id="taskSituationTitle">
						<span style="color: #3f78eb">收入类完成进度
							<!-- <p class="incomeTotal"></p> -->
						</span> 
						<span style="color: #95ffc7">重点业务办理完成进度
							<!-- <p class="mainBusManagerTotal"></p> -->
						</span> 
						<span style="color: #ff9e6d">重点工作完成进度
							<!-- <p class="mainWorkTotal"></p> -->
						</span>
					</div>
				</div>
				<div class="echartsRight" style="height: 32%">
					<img alt="" src="../../images/icon_Head.png">
					<div class="titleDiv2 titleImg2">
						<span>考核得分</span> <span class='rightTit' style="margin-left: 10px">单位（分）</span>
						<span class='rightTit2' onclick="more('考核得分')">more</span>
					</div>
					<div id="assessmentScore"></div>
				</div>
				<div class="infoRight">
					<img alt="" src="../../images/icon_Head.png">
					<div class="titleDiv3 titleImg3">
						<span id="monthAssessTitle">省公司月度考核指标完成情况</span>
					</div>
					<div id="assessmentInformation">
						<div class="sum-select">
							<div class="chooseSelect">
								<span>一类：</span> 
								<select id="bigType" style="height: 20px;"></select>
							</div>
							<div class="chooseSelect">
								<span>二类：</span> 
								<select id="smallType" style="height: 20px;"></select>
							</div>
							<div style="width: 48%; float: left; height: 100%;"
								id="dv_TableDiv">
								<label style="font-size: 12px;">账期：</label> 
								<input class="form-control date-picker " style="width: 67px; display: inline-block; padding: 0 0; height: 20px" id="dv_date" type="text" />
								<button id="newsSelect" class="btn btn-primary" style="height: 18px; width: 45px; margin-top: -4px;">查询</button>
							</div>
						</div>
						<div class="rate-radio">
							<div class="rateRadio" style="width: auto;">
								<input type="radio" rangeId="F" /> 
								<span>&gt;40%</span>
							</div>
							<div class="rateRadio" style="width: auto;">
								<input type="radio" rangeId="E" /> 
								<span>35%-40%</span>
							</div>
							<div class="rateRadio" style="width: auto;">
								<input type="radio" rangeId="D" /> 
								<span>30%-35%</span>
							</div>
							<div class="rateRadio" style="width: auto;">
								<input type="radio" rangeId="C" /> 
								<span>25%-30%</span>
							</div>
							<div class="rateRadio" style="width: auto;">
								<input type="radio" rangeId="B" /> 
								<span>20%-25%</span>
							</div>
							<div class="rateRadio" style="width: auto;">
								<input type="radio" rangeId="A" /> 
								<span>&lt;20%</span>
							</div>
						</div>
						<div class="twotype-grid">
							<table id="twoTypeTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
							<div id="grid-pager1"></div>
						</div>
					</div>
				</div>
				<input id="hiddenOrgId" type="hidden" />
			</div>
			<!-- 规模模态框 -->
			<div class="modal fade" id="scaleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30">
				<div class="modal-dialog" style="width: 800px;">
					<div class="modal-content clearfix" style="margin: 0 auto; background: url(../../images/gis/dataVisual/u372.png) !important; background-size: 100% 100% !important;">
						<div class="modal-header" style="display: none;">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px; background: no-repeat !important; height: 440px;">
							<div class="grid-type-all">
								<div class="org-modal">
									<input type="hidden" id="scaleTypeHidden" /> 
									<input type="hidden" id="smallScaleIdHidden" /> 
									<input type="hidden" id="orgIdHidden" />
									<div class="modal-select">
										<span>地市：</span> 
										<select id="cityWindow1" class="orgWindow1"></select>
									</div>
									<div class="modal-select">
										<span>区县：</span> 
										<select id="areaWindow1" class="orgWindow1"></select>
									</div>
									<div class="modal-select" style="width: 21%; display: none;">
										<span>营业部：</span> 
										<select id="deptWindow1" class="orgWindow1"></select>
									</div>
									<div class="modal-select">
										<span>网格：</span> 
										<select id="gridWindow1" class="orgWindow1"></select>
									</div>
									<div class="modal-select" style="width: 9%;">
										<button class="btn btn-primary" id="exportTable">导出</button>
									</div>
								</div>
								<div class="scale-table">
									<table id="scaleTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
									<div id="grid-pager4"></div>
								</div>
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; 
									bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="compositeView_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30">
		<div class="modal-dialog">
			<!--网格信息概述  -->
			<div id="gridInfoMoreDiv" class="compositeView_modal-content clearfix" style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div class="compositeView_modal-header">
					<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
						width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
					<h4 class="compositeView_modal-title" id="myModalLabel">确认</h4>
					<div style="height: 9px; margin-left: 20px;">
						类型: 
						<select id="gridInfoType" style="height: 18px; width: 120px; color: #FFF;">
							<option value="网格信息">网格信息</option>
							<option value="直销人员信息">直销人员信息</option>
						</select> 
						地市:
						<select id="citySelect" onchange="cityCntyGridChange('citySelect')" style="height: 18px; width: 120px; color: #FFF;"></select> 
						区县:
						<select id="cntySelect" onchange="cityCntyGridChange('cntySelect')" style="height: 18px; width: 120px; color: #FFF;"></select> 
						网格:
						<select id="gridSelect"  style="height: 18px; width: 120px; color: #FFF;"></select>
						<div style="float: right; margin-right: 10px; text-align: center;">
							<div id="gridInfoMore" onclick="gridInfoMore()" style="float: left; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">查询</div>
							
							<div onclick="reset('gridInfoMore')" style="float: left; margin-left: 5px; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">重置</div>
						</div>
					</div>
				</div>
				<div
					style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
					<div id="gridInfoGrid" class="more">
						<table id="gridInfoGridtb" data-option="fitColumns:true,scrollbarSize:0," style="width: 679px; color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
						<div id="gridinfo-pager"></div>
					</div>
				</div>
			</div>

			<!--网格分类规模  -->
			<div id="gridTypeMoreDiv" class="compositeView_modal-content clearfix" style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div class="compositeView_modal-header">
					<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
						width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
					<h4 class="compositeView_modal-title" id="myModalLabel">确认</h4>
					<div style="height: 9px; margin-left: 20px;">
						类型: 
						<select id="gridTypeSelect" style="height: 18px; width: 120px; color: #FFF;">
							<option value="1">渠道</option>
							<option value="2">小区</option>
							<option value="4">CD集团</option>
							<option value="0">收入</option>
							<option value="9">客户</option>
						</select> 
						地市:
						<select id="citySelect1" onchange="cityCntyGridChange('citySelect1')" style="height: 18px; width: 120px; color: #FFF;"></select> 
						区县:
						<select id="cntySelect1" onchange="cityCntyGridChange('cntySelect1')" style="height: 18px; width: 120px; color: #FFF;"></select> 
						网格:
						<select id="gridSelect1"  style="height: 18px; width: 120px; color: #FFF;"></select>
						<div style="float: right; margin-right: 10px; text-align: center;">
							<div class="gridInfoMore" onclick="gridTypeMore()" style="float: left; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">查询</div>
							<div onclick="reset('gridTypeMore')" style="float: left; margin-left: 5px; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">重置</div>
						</div>
					</div>
				</div>
				<div style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
					<div id="gridTypeGrid" class="more">
						<table id="gridTypeGridtb" data-option="fitColumns:true,scrollbarSize:0," 
							style="width: 679px; color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
						<div id="gridType-pager"></div>
					</div>
				</div>
			</div>

			<!--基础单元入格信息  -->
			<div id="channelStationInfoMoreDiv" class="compositeView_modal-content clearfix" style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div id="myCarousel2" class="carousel slide" data-interval=false>
					<!-- 轮播（Carousel）指标 -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel2" data-slide-to="0" class="active" style="margin-bottom: 10px;"></li>
						<li data-target="#myCarousel2" data-slide-to="1" style="margin-bottom: 10px;"></li>
					</ol>
					<!-- 轮播（Carousel）项目 -->
					<div class="carousel-inner" style="height: 500px">
						<div class="item active">
							<div class="compositeView_modal-header">
								<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
									width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
								<h4 class="compositeView_modal-title" id="myModalLabel">确认</h4>
								<div style="height: 9px; margin-left: 20px;">
								</div>
							</div>
							<div
								style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
								<div id="channelStationInfoGrid" class="more">
								<table id="dayReportFormGrid" data-option="fitColumns:true,scrollbarSize:0," style="width: 679px; color: #fff; 
									overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
								<div id="dayReportFormpager"></div>
							</div>
						</div>
						</div>
						<div class="item">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<div class="compositeView_modal-header">
								<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
									width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
								<h4 class="compositeView_modal-title" id="myModalLabel">确认</h4>
								<div style="height: 9px; margin-left: 20px;">
									类型: 
									<select id="channelStationInfoTypeSelect" style="height: 18px; width: 120px; color: #FFF;">
										<option value="1">渠道</option>
										<option value="2">小区</option>
										<option value="3">AB集团</option>
										<option value="4">CD集团</option>
										<option value="5">基站</option>
									</select> 
									地市:
									<select id="citySelect2" onchange="cityCntyGridChange('citySelect2')" style="height: 18px; width: 120px; color: #FFF;"></select>
									区县:
									<select id="cntySelect2" onchange="cityCntyGridChange('cntySelect2')" style="height: 18px; width: 120px; color: #FFF;"></select>
									网格:
									<select id="gridSelect2"  style="height: 18px; width: 120px; color: #FFF;"></select>
									<div style="float: right; margin-right: 10px; text-align: center;">
										<div class="gridInfoMore" onclick="channelStationInfoMore()" style="float: left; height: 20px; 
											width: 35px; background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">查询</div>
										
										<div onclick="reset('channelStationInfoMore')" style="float: left; margin-left: 5px; height: 20px; 
											width: 35px; background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">重置</div>
									</div>
								</div>
							</div>

							<div style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
								<div id="channelStationInfoGrid" class="more">
									<table id="channelStationInfoGridtb" data-option="fitColumns:true,scrollbarSize:0" style="width: 679px; color: #fff; 
										overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
									<div id="channelStationInfoMore-pager"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--用户规模信息  -->
			<div id="customersMoreDiv" class="compositeView_modal-content clearfix" style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div class="compositeView_modal-header">
					<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
						width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
					<h4 class="compositeView_modal-title" id="myModalLabel">确认</h4>
					<div style="height: 9px; margin-left: 20px;">
						查询条件1: 
						<select id="customersTypeSelect" style="height: 18px; width: 120px; color: #FFF;">
							<option value="1">渠道</option>
							<option value="2">小区</option>
							<option value="3">AB集团</option>
							<option value="4">CD集团</option>
							<option value="5">基站</option>
						</select> 
						查询条件2:<input style="height: 18px; color: #FFF;" type="text" value="文本框/下拉框/日期插件等">
						<div style="float: right; margin-right: 120px; text-align: center;">
							<div class="gridInfoMore" onclick="customersMore()" style="float: left; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">查询</div>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<div style="float: left; margin-left: 10px; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">重置</div>
						</div>
					</div>
				</div>

				<div style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
					<div id="customersGrid" class="more">
						<table id="customersGridtb" data-option="fitColumns:true,scrollbarSize:0" 
							style="width: 679px; color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
						<div id="customersMore-pager"></div>
					</div>
				</div>
			</div>
			<!--指标资源情况  -->
			<div id="indicatorsMoreDiv" class="compositeView_modal-content clearfix" style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div class="compositeView_modal-header">
					<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
						width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
					<h4 class="compositeView_modal-title" id="myModalLabel">确认</h4>
					<div style="height: 9px; margin-left: 20px;">
						查询条件1: 
						<select id="customersTypeSelect" style="height: 18px; width: 120px; color: #FFF;">
							<option value="1">渠道</option>
							<option value="2">小区</option>
							<option value="3">AB集团</option>
							<option value="4">CD集团</option>
							<option value="5">基站</option>
						</select> 
						查询条件2:<input style="height: 18px; color: #FFF;" type="text" value="文本框/下拉框/日期插件等">
						<div style="float: right; margin-right: 120px; text-align: center;">
							<div class="gridInfoMore" onclick="customersMore()" style="float: left; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">查询</div>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<div style="float: left; margin-left: 10px; height: 20px; width: 35px; 
								sbackground: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">重置</div>
						</div>
					</div>
				</div>

				<div
					style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
					<div id="indicatorsGrid" class="more">
						<table id="indicatorsGridtb" data-option="fitColumns:true,scrollbarSize:0" style="width: 679px; 
							color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
						<div id="indicatorsMore-pager"></div>
					</div>
				</div>
			</div>
			
			<!--监控运营一览More  -->
			<div id="monitoringMoreDiv" class="compositeView_modal-content clearfix" style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div class="compositeView_modal-header">
					<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
						width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
					<h4 class="compositeView_modal-title" id="myModalLabel">确认</h4>
					<div style="height: 9px; margin-left: 20px;">
						查询条件1: 
						<select id="monitoringypeSelect" style="height: 18px; width: 120px; color: #FFF;">
							<option value="1">渠道</option>
							<option value="2">小区</option>
							<option value="3">AB集团</option>
							<option value="4">CD集团</option>
							<option value="5">基站</option>
						</select> 
						查询条件2:<input style="height: 18px; color: #FFF;" type="text" value="文本框/下拉框/日期插件等">
						<div style="float: right; margin-right: 120px; text-align: center;">
							<div class="gridInfoMore" onclick="customersMore()" style="float: left; height: 20px; 
								width: 35px; background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">查询</div>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<div style="float: left; margin-left: 10px; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">重置</div>
						</div>
					</div>
				</div>

				<div style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
					<div id="monitoringGrid" class="more">
						<table id="monitoringGridtb" data-option="fitColumns:true,scrollbarSize:0" 
							style="width: 679px; color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
						<div id="monitoringMore-pager"></div>
					</div>
				</div>
			</div>
			<!--任务资源概况 -->
			<div id="taskMoreDiv" class="compositeView_modal-content clearfix" style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div class="compositeView_modal-header">
					<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
						width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
					<h4 class="compositeView_modal-title"></h4>
					<div style="height: 9px; margin-left: 20px;">
						地市: 
						<select id="citySelect11" style="height: 18px; width: 120px; color: #FFF;" onchange="selectLoad('cntySelect11');">
							<option value="">全省</option>
						</select> 
						区县: <select id="cntySelect11" style="height: 18px; width: 120px; color: #FFF;" onchange="selectLoad('gridSelect11');">
							<option value="">全选</option>
						</select> 
						网格: <select id="gridSelect11" style="height: 18px; width: 120px; color: #FFF;" onchange="selectLoad('chnlSelect11');">
							<option value="">全选</option>
						</select> 
						渠道: <select id="chnlSelect11" style="height: 18px; width: 120px; color: #FFF;">
							<option value="">全选</option>
						</select>
						<div style="float: right; margin-right: 21px; text-align: center;">
							<div class="gridInfoMore" onclick="taskSearch();" style="float: left; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;cursor: pointer;">查询</div>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
				<div style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
					<div id="taskGrid" class="more">
						<table id="taskTable" data-option="fitColumns:true,scrollbarSize:0," style="width: 679px; color: #fff; 
							overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
						<div id="task-pager"></div>
					</div>
				</div>
			</div>
			
			<!--考核得分More -->
			<div id="assessmentScoreMoreDiv" class="compositeView_modal-content clearfix" 
				style="width: 730px; height: 515px; margin: 0 auto; display: none;">
				<div class="compositeView_modal-header">
					<div class="compositeView_close" style="background: url(../../images/icon_close.png) no-repeat; 
						width: 20px; height: 20px; background-size: 100% 100%;" data-dismiss="modal" aria-hidden="true"></div>
					<h4 class="compositeView_modal-title"></h4>
					<div style="height: 9px; margin-left: 20px;">
						类型: 
						<select id="channelStationInfoTypeSelect" style="height: 18px; width: 120px; color: #FFF;">
							<option value="1">渠道</option>
							<option value="2">小区</option>
							<option value="3">AB集团</option>
							<option value="4">CD集团</option>
							<option value="5">基站</option>
						</select> 
						地市:
						<select id="citySelect2" onchange="cityCntyGridChange2('citySelect2')" style="height: 18px; width: 120px; color: #FFF;"></select>
						区县:<select id="cntySelect2" onchange="cityCntyGridChange2('cntySelect2')" style="height: 18px; width: 120px; color: #FFF;"></select>
						网格:<select id="gridSelect2" onchange="cityCntyGridChange2('gridSelect2')" style="height: 18px; width: 120px; color: #FFF;"></select>
						<div style="float: right; margin-right: 0px; text-align: center;">
							<div class="gridInfoMore" onclick="channelStationInfoMore()" style="float: left; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">查询</div>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<div onclick="reset('channelStationInfoMore')" style="float: left; margin-left: 10px; height: 20px; width: 35px; 
								background: url(../../images/icon_Button.png) no-repeat; background-size: 100% 100%;">重置</div>
						</div>
					</div>
					<div style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
						<div id=assessmentScoreGrid class="more">
							<table id="assessmentScoreGridtb" data-option="fitColumns:true,scrollbarSize:0," 
								style="width: 679px; color: #fff; overflow-x: auto; border-collapse: separate; border-spacing: 0px 5px;"></table>
							<div id="assessmentScoreMore-pager"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div id="main"></div>
	
	<div class="menuArea" style = "visibility: hidden;">
		<!-- 导出excel start -->
		<div style="width: 100%; height: 40px; background-color: rgba(101, 101, 126, 0.8); margin-top: 34px;" id="downExportToggleDiv">
			<span style="margin-top: 10px; margin-left: 10px; float: left; color: white;">基础单元信息导出</span>
			<span style="float: right; color: white; padding-right: 13px; margin-top: 5px;">
				<span id="downExportToggleSpan">
					<a id="downExportToggle" style="cursor: pointer;"><font style="font-size: 20px; color: white;">v</font></a>
				</span>
			</span>
		</div>
		<!-- 导出excel end -->
		<!-- 导出 start -->
		<div class="page-content clearfix" id="exportDiv" style="height: 450px; display: none;width: 100%; background-color: rgba(101, 101, 126, 0.8); margin-top: 34px;">
			<div class="col-sm-12 grid-full">
				<div style="width: 100%;">
					<span style="color: white;">基础单元信息导出</span>
					<span style="float: right; color: white;">
						<span id="upExportToggleSpan">
							<a id="upExportToggle" style="cursor: pointer; padding-top: -3px;"><font style="font-size: 18px; color: white;">^</font></a>
						</span>
					</span>
				</div>
				<div id="gridSecondContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<button class="exportBtn" id="exportSecondGridInfo">导出</button>
					</div>
					<div id="exportMapTableInfo" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkSecondAllPoiInfo" />
							<font color="#FFFFFF" style="font-size: 14px">已入格数据导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
									<td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="channels" />
								      	</td>
								      	<td style="width: 20%;">
									  	<font class="exportFont">渠道信息</font>
									</td>
								    <td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="stations" />
										</td>
									  	<td style="width: 20%;">
									  	<font class="exportFont">基站信息</font>
									</td>
							 	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfos" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
							  	</span>
							</tr>
						</table>
					</div>
					<!-- 未入格导出 -->
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<button class="exportBtn" id="exportSecondGridInfoNotEnter">导出</button>
					</div>
					<div id="exportMapTableInfoNotEnter" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkSecondAllPoiInfoNotEnter" />
							<font color="#FFFFFF" style="font-size: 14px">未入格导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
									<td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="channels" />
								      	</td>
								      	<td style="width: 20%;">
									  	<font class="exportFont">渠道信息</font>
									</td>
								    <td style="width: 10%;">
								      	<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="stations" />
										</td>
									  	<td style="width: 20%;">
									  	<font class="exportFont">基站信息</font>
									</td>
							 	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
							  	<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportSecondInfosNotEnter" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
							  	</span>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- 导出 end -->
	</div>
	<input type="hidden" value="" id="hiddenOrgId" />
	<!-- 基站直销经理弹出框 start -->
	<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel1">直销人员信息表</h4>
				</div>
				<div class="modal-body" style="display:grid;">
					<div style="height:5px;width:50px">
						<iframe style="height: 36px;" id="uploadFrame" name="uploadFrame"></iframe>
					</div>
					<form  target="uploadFrame" id="upformDirDirectSale" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadDirectSaleFiles" method="post">
	                	<div class="form-group">
							<div class="col-xs-12">
								<input type="file" id="directSaleFileDir" name="directSaleFileDir"/>
							</div>
				   		</div>
					</form>
					<div style="text-align: right;margin-top:-31px;margin-left:285px;margin-right:-10px;">
						<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="exportDirectSaleInfo" style="width:84px;height: 36px;margin-left:0;border-radius:0;">导出模板</button>			
						<button id="improtDirectSaleInfo" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 基站直销经理弹出框 end -->
	<!-- CD类政企客户弹出框 start -->
	<div class="modal fade" id="myModal01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel1">CD类政企客户信息表</h4>
				</div>
				<div class="modal-body" style="display:grid;">
					<div style="height:5px;width:50px">
						<iframe style="height: 36px;" id="uploadFrame" name="uploadFrame"></iframe>
					</div>
					<form  target="uploadFrame" id="upformDirGovBus" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadGovBusFiles" method="post">
	                	<div class="form-group">
							<div class="col-xs-12">
								<input type="file" id="govBusFileDir" name="govBusFileDir"/>
							</div>
				   		</div>
					</form>
					<div style="text-align: right;margin-top:-31px;margin-left:285px;margin-right:-10px;">
						<button  type="button" class="btn btn-primary" data-target="#myFormInline"  id="exportGovBusInfo" style="width:84px;height: 36px;margin-left:0;border-radius:0;">导出模板</button>			
						<button id="improtGovBusInfo" type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">确定</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:84px;">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- CD类政企客户弹出框 end -->
	<!-- 规模模态框 -->
	<div class="modal fade" id="scaleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 800px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				<div class="modal-header" style="display: none;">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	            </div>
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div class="grid-type-all">
	            		<div class="org-modal">
	            		</div>
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="scaleTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager4"></div> 
	            		</div>
	            		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            	</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- CD类规模模态框 -->
	<div class="modal fade" id="govBusModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 800px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				<div class="modal-header" style="display: none;">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	            </div>
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div class="grid-type-all">
	            		<div class="org-modal">
	            		</div>
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="govBusTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager7"></div> 
	            		</div>
	            		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            	</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 直销人员维护框 -->
	<div class="modal fade" id="modifyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 929px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div style="width: 100%;margin-top: 5px;">
	            		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	            		<!-- <select id="citySelect" style="width: 100px"></select>&nbsp;&nbsp;
	            		<select id="cntySelect" style="width: 100px"></select>&nbsp;&nbsp; -->
	            		<input type="radio" name="gridSelect" value="0"><font color="white">未入网格</font>
	            		<input type="radio" name="gridSelect" value="1" checked="checked"><font color="white">已入网格</font>&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="queryDirectSaleInfo()" style="height: 30px;width:100px;border-radius:0;">查询</button>&nbsp;&nbsp;&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="selectChannel()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">更新渠道</button>
	            	</div>
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="modifyTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager5"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	<!-- 网格选择框 -->
	<div class="modal fade" id="channelSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 629px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">		
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">	         
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="channelSelectTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager6"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            			<div>
	            				<center>
	            					<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="sureSelectGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">确认选择</button>
	            					<input type="hidden" id="selectedOfficeids">
	            				</center>
	            			</div>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	
		<!-- CD类政企客户人员维护框 -->
	<div class="modal fade" id="modifyCDModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 929px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
				
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
	            	<div style="width: 100%;margin-top: 5px;">
	            		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	            		<!-- <select id="citySelect" style="width: 100px"></select>&nbsp;&nbsp;
	            		<select id="cntySelect" style="width: 100px"></select>&nbsp;&nbsp; -->
	            		<input type="radio" name="grid" value="0"><font color="white">未入网格</font>
	            		<input type="radio" name="grid" value="1" checked="checked"><font color="white">已入网格</font>&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" onclick="queryGovBusInfo()" style="height: 30px;width:100px;border-radius:0;">查询</button>&nbsp;&nbsp;&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" onclick="selectCDGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">导入网格</button>&nbsp;&nbsp;
	            		<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" onclick="deleteCDGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">删除网格</button>
	            	</div>
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="modifyCDTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager8"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	
	<!-- CD网格选择框 -->
	<div class="modal fade" id="cdGridSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 629px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">		
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">	         
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="cdGridSelectTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager9"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            			<div>
	            				<center>
	            					<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" onclick="cdSureSelectGrid()" style="height: 30px;width:100px;margin-left:0;border-radius:0;">确认选择</button>
	            					<input type="hidden" id="selectedGcCodes">
	            				</center>
	            			</div>
	            		</div>
	            	</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div>
	<!-- 基础单元信息导出弹出框 -->
<div class="modal fade" id="modal-map-BUI" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 1030"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:400px;height:450px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<div id="gridContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<div id="gridDiv">
							<font color="#FFFFFF" style="font-size: 14px">网格信息：</font>
							<select id="gridInfos" style="width: 175px; text-align: center"></select>
						</div>
						<button class="exportBtn" id="exportGridInfo">导出</button>
					</div>
					<!-- 已入格数据导出 -->
					<div id="exportMapTableInfo" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkAllPoiInfo" />
							<font color="#FFFFFF" style="font-size: 14px">已入格数据导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="channels" />
							      	</td>
							      	<td style="width: 20%;">
								  		<font class="exportFont">渠道信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="stations" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">基站信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfos" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
								</span>
							</tr>
						</table>
					</div>
					<!-- 未入格导出 -->
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<button class="exportBtn" id="exportGridInfoNotEnter">导出</button>
					</div>
					<div id="exportMapTableInfo" style="margin-top: 10px; position: relative; height: 81%;">
						<li>
							<input type="checkbox" id="checkAllPoiInfoNotEnter" />
							<font color="#FFFFFF" style="font-size: 14px">未入格数据导出</font>
						</li>
						<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 10px;"></li>
						<table class="poiAreaList">
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="channels" />
							      	</td>
							      	<td style="width: 20%;">
								  		<font class="exportFont">渠道信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="stations" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">基站信息</font>
									</td>
							  	</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="community" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">小区信息</font>
							    	</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="building" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">楼宇信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="gridInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">网格信息</font>
									</td>
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="ABGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">AB集团单位信息</font>
									</td>
								</span>
							</tr>
							<tr>
								<span class="exportSpans">
							    	<td style="width: 10%;">
							      		<input style="margin-bottom:10px;" type="checkbox" name="exportInfosNotEnter" value="CDGroupInfo" />
								  	</td>
								  	<td style="width: 20%;">
								  		<font class="exportFont">CD集团单位信息</font>
									</td>
								</span>
							</tr>
						</table>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 直销人员维护弹出框start -->
<div class="modal fade" id="modal-map-DSPM" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:730px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<div id="gridDirectSaleContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<li>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal1" id="directSaleImportBtn" style="height: 30px;margin-left:0;border-radius:0;">导入</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" id="directSaleViewBtn" style="height: 30px;margin-left:0;border-radius:0;">查看</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal2" id="directSaleMaintainBtn" style="height: 30px;margin-left:0;border-radius:0;">维护</button>
						</li>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

	
<!-- CD政企客户导入弹出框start -->
<div class="modal fade" id="modal-map-CD" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
	<div class="modal-dialog">
		<div class="modal-content clearfix" style="width:730px;margin:0 auto;">
			<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
            </div>
            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;">
            	<div id="gridGovBusContainers">
					<li style="border-bottom: 1px solid #1E6C8B; margin-bottom: 1px;"></li>
					<div style="margin-top: 5px;">
						<li>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal01" id="govBusImportBtn" style="height: 30px;margin-left:0;border-radius:0;">导入</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" id="govBusViewBtn" style="height: 30px;margin-left:0;border-radius:0;">查看</button>
							<button class="directSaleBtn" data-toggle="modal" data-target="#myModal02" id="govBusMaintainBtn" style="height: 30px;margin-left:0;border-radius:0;">维护</button>						
						</li>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	
	 <div id="datashow" class="datashow" >
        </div>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/compositeView.js"></script>
</body>
</html>
