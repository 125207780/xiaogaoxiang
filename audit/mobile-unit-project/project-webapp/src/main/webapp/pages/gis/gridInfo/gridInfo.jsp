<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
 
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/gridInfo.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
	<title>网格信息</title>
	</head>
</html>
<style>
	#topwindow101context{
		overflow: hidden;
	    background: url(../../images/frameBg.png) repeat !important;;
	}
	#infoTree{
		height: 548px !important;
		width: 170px !important;
	} 
	.infoDetail{
		margin-left: 180px;
	}
	.ztree li span.button.root_open {
   		background: url(../../images/table/ztreeSelectDown.png) no-repeat center !important;
	}
	.ztree li span.button.root_close{
		background: url(../../images/table/ztreeSelectRight.png) no-repeat center !important;
	}
	.ztree li span.button.center_open, .ztree li span.button.bottom_open{
		background: url(../../images/table/ztreeSelectDown.png) no-repeat center !important;
	}
	.ztree li span.button.center_close, .ztree li span.button.bottom_close{
		background: url(../../images/table/ztreeSelectRight.png) no-repeat center !important;
	}
	.center_docu, .bottom_docu{
		display: none !important;
	}
	.modal-bottom{
		display: none !important;
	}
	.nicescroll-cursors{
		/* top:385px !important; z*/
	}
	.tab-pane{
		height: 472px !important;
	}
	.gridInfo1{
		width: 25% !important;
	}
	.gridInfo2{
		width: 50% !important;
	}
	.gridInfo3{
		width: 25% !important;
	}
	#incomeInfo{
		width: 100% !important;
	}
	#businessInfo{
		width: 100% !important;
		height: 100% !important;
	}
	#gridExport{
		margin-left: 868px !important;
		margin-top: -42px !important;
	}
	#typeInfo{
		margin-left:22px;
	}
	.carousel-inner .item{
		height:500px !important;
	}
	.carousel-indicators li{
		margin-bottom:0 !important;
	}
	.gridInfo2{
		width:100%;
	}
	#incomeInfo{
		width:100% !important;
	}
	#businessInfo{
		width:100% !important;
	}
	#typeRatioInfo .kpi-select{
		margin-top: 23px;
	    margin-right: 57px;
	    text-align: right;
	}
	#type .chartTitle{
		margin-top:11px !important;
	}
	.grid {
		position: absolute;
	}
</style>
<body>
<div class="mainContent clearfix">
	<div class="pull-left infoTree ztree" id="infoTree" >
		
	</div>
	<div class="infoDetail">
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles setHeight" value="1">
		    	<a href="#gridInfo" data-toggle="tab">网格统计信息</a>
		    	<!-- <div class="tanBg2"></div> -->
		    </li>
		    <!-- <li class="titles setHeight">
		    	<a href="#phisicalList" data-toggle="tab">网格基本信息</a>
		    	<div class="tanBg2"></div>
	    	</li> -->
		    <li class="titles setHeight">
			    <a href="#userList"   data-toggle="tab">基础单元信息</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
		    <!-- <li class="titles setHeight">
			    <a href="#buildingList" data-toggle="tab">楼宇列表</a>
			    <div class="tanBg2"></div>
		    </li>
		    <li class="titles setHeight">
			    <a href="#businessList" data-toggle="tab">竞争对手列表</a>
			    <div class="tanBg2"></div>
		    </li>
		     <li class="titles setHeight">
			    <a href="#channelStationList" data-toggle="tab">渠道基站信息</a>
			    <div class="tanBg2"></div>
		    </li> -->
		   <!--  <li class="titles setHeight">
			    <a href="#gridInfoList" data-toggle="tab">网格排名</a>
			    <div class="tanBg2"></div>
		    </li> -->
		</ul>
		<div class="infoLists" style="height:518px !important;">
			<div id="myTabContent" class="tab-content">
			    <div class="tab-pane  in active clearfix" id="gridInfo">
			    	 <!--  
			    	<div class="gridInfo1">
			    		<div class="tableList clearfix">
			    			<div class="tableListTitle">
			    				基本信息
			    			</div>
			    			<ul class="tableListUl clearfix">
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格名称：</div>
			    					<div class="tableLisRight hiddenText" id="gridName"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格类型：</div>
			    					<div class="tableLisRight hiddenText" id="gridType"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格评分：</div>
			    					<div class="tableLisRight hiddenText" id="gridScore"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格经理：</div>
			    					<a href="#">
			    						<div class="tableLisRight hiddenText" id="gridManager"></div>
			    					</a>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">集团客户数：</div>
			    					<div class="tableLisRight hiddenText" id="groupNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格用户数：</div>
			    					<div class="tableLisRight hiddenText" id="userNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">基础单元数：</div>
			    					<div class="tableLisRight hiddenText" id="physicalNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">网格面积：</div>
			    					<div class="tableLisRight hiddenText" id="gridArea"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">创建时间：</div>
			    					<div class="tableLisRight hiddenText" id="createDate"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">语音数：</div>
			    					<div id="voiceNum" class="tableLisRight hiddenText" ></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">端口数：</div>
			    					<div class="tableLisRight hiddenText" id="voicePortNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">语音占有率：</div>
			    					<div class="tableLisRight hiddenText" id="voicePer"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">端口占有率：</div>
			    					<div class="tableLisRight hiddenText" id="voicePortPer"></div>
			    				</li>
			    			</ul>
			    		</div>
			    		
			    		 
			    	</div>
			    	<div class="gridInfo2">
			    		<div class="chartTitle">
			    			网格业务收入构成信息
			    		</div>
			    		<div id="incomeInfo">
			    			
			    		</div>
			    		<div class="chartTitle">
			    			网格业务发展量构成信息
			    		</div>
			    		<div id="businessInfo">
			    			
			    		</div>
			    	</div>
			    	<div class="gridInfo3">
			    		<div class="tableList clearfix">
			    			<div class="tableListTitle">
			    				统计信息
			    			</div>
			    			<ul class="tableListUl clearfix">
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">家宽用户：</div>
			    					<div class="tableLisRight hiddenText" id="kdNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">总收入：</div>
			    					<div class="tableLisRight hiddenText" id="totalFee"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">当月收入：</div>
			    					<div class="tableLisRight hiddenText" id="totalFeeLast"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">环比收入：</div>
			    					<div class="tableLisRight hiddenText" id="compare"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">家宽收入：</div>
			    					<div class="tableLisRight hiddenText" id="kdFee"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">家宽占有率：</div>
			    					<div class="tableLisRight hiddenText" id="kdPercent"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">移网收入：</div>
			    					<div class="tableLisRight hiddenText" id= "ywFee"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">当月新发展用户：</div>
			    					<div class="tableLisRight hiddenText" id= "newUserNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">当月离网用户：</div>
			    					<div class="tableLisRight hiddenText" id="outnetNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">数据数：</div>
			    					<div id="dataNum" class="tableLisRight hiddenText" ></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">端口数：</div>
			    					<div class="tableLisRight hiddenText" id="dataPortNum"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">数据占有率：</div>
			    					<div class="tableLisRight hiddenText" id="dataPer"></div>
			    				</li>
			    				<li class="tableLis">
			    					<div class="tableLisLeft hiddenText">端口占有率：</div>
			    					<div class="tableLisRight hiddenText" id="dataPortPer"></div>
			    				</li>
			    			</ul>
			    		</div>
			    		
			    	</div>
			    -->
			    	<jsp:include page="/pages/gis/gridInfo/gridInfoPane.jsp"/>
			    </div>
			    <div class="tab-pane " id="phisicalList">
				    <div class="view-title">
						网格基本信息
						<div class="myOrners myOrner1"></div>
						<div class="myOrners myOrner2"></div>
						<div class="myOrners myOrner3"></div>
						<div class="myOrners myOrner4"></div>
					</div>
			    	<ul class="baseUl">
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								名称：
							</div>
							<div class="baseDetail" id="remarks">
							</div>
						</div>
						<div class="baseRight">
							<div class="baseName">
								表名：
							</div>
							<div class="baseDetail" id="tabname">
							</div>
						</div>
					</li>
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								创建时间：
							</div>
							<div class="baseDetail" id="tableCreaterTime">
							</div>
						</div>
						<div class="baseRight">
							<div class="baseName">
								创建人员：
							</div>
							<div class="baseDetail" id="owner">
							</div>
						</div>
					</li>
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								最早数据时间：
							</div>
							<div class="baseDetail" id="minTime">
							</div>
						</div>
						<div class="baseRight">
							<div class="baseName">
								最新数据时间：
							</div>
							<div class="baseDetail" id="maxTime">
							</div>
						</div>
					</li>
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								网格编号：
							</div>
							<div class="baseDetail" id="gridCode">
							</div>
						</div>
						<div class="baseRight">
							<div class="baseName">
								网格名称：
							</div>
							<div class="baseDetail" id="gridName1">
							</div>
						</div>
					</li>
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								网格类型：
							</div>
							<div class="baseDetail" id="gridType1">
							</div>
						</div>
						<div class="baseRight">
							<div class="baseName">
								网格经理：
							</div>
							<div class="baseDetail" id="gridManager1">
							</div>
						</div>
					</li>
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								网格经理联系电话：
							</div>
							<div class="baseDetail" id="phoneNumber1">
							</div>
						</div>
						<div class="baseRight">
							<div class="baseName">
								分公司：
							</div>
							<div class="baseDetail" id="branchCompany">
							</div>
						</div>
					</li>
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								分局：
							</div>
							<div class="baseDetail" id="branchSubstation">
							</div>
						</div>
						<div class="baseRight">
							<div class="baseName">
								创建人：
							</div>
							<div class="baseDetail" id="creater">
							</div>
						</div>
					</li>
					<li class="baseList clearfix">
						<div class="baseLeft clearfix">
							<div class="baseName">
								创建时间：
							</div>
							<div class="baseDetail" id="createTime">
							</div>
						</div>
					</li>
				</ul>
				<div class="view-title">
					网格团队信息
					<div class="myOrners myOrner1"></div>
					<div class="myOrners myOrner2"></div>
					<div class="myOrners myOrner3"></div>
					<div class="myOrners myOrner4"></div>
				</div>
				<ul class="teamInfo">
					<li class="teamInfoLI clearfix">
						<div class="teamInfoLITitle">员工编号</div>
						<div class="teamInfoLITitle">员工名称</div>
						<div class="teamInfoLITitle">角色</div>
						<div class="teamInfoLITitle">联系方式</div>
						<div class="teamInfoLITitle">所在部门</div>
						<div class="teamInfoLITitle">来源单位</div>
					</li>
					<li class="teamInfoDetail">
						<ul class="teamInfoListUl">
							<!-- <li class="teamInfoList clearfix">
								<div class="teamInfoLITitle">10010001</div>
								<div class="teamInfoLITitle">admin</div>
								<div class="teamInfoLITitle">客户经理</div>
								<div class="teamInfoLITitle">8888888</div>
								<div class="teamInfoLITitle">二区分公司</div>
								<div class="teamInfoLITitle">大单坊</div>
							</li>
							<li class="teamInfoList clearfix">
								<div class="teamInfoLITitle">10010001</div>
								<div class="teamInfoLITitle">admin</div>
								<div class="teamInfoLITitle">客户经理</div>
								<div class="teamInfoLITitle">8888888</div>
								<div class="teamInfoLITitle">二区分公司</div>
								<div class="teamInfoLITitle">大单坊</div>
							</li> -->
						</ul>
					</li>
				</ul>
				<div class="view-title">
					资源信息
					<div class="myOrners myOrner1"></div>
					<div class="myOrners myOrner2"></div>
					<div class="myOrners myOrner3"></div>
					<div class="myOrners myOrner4"></div>
				</div>
				<ul class="resourceInfo">
					<li class="resourceInfoLi clearfix">
						<div class="resourceInfoLiL clearfix">
							<div class="resourceInfoLiAll">语音端口数</div>
							<div class="resourceInfoLiDetail">
								<div>网线端口数：<span id="voiceCopperNum"></span></div>
								<div>光网端口数：<span id="voiceFiberNum"></span></div>
							</div>
						</div>
						<div class="resourceInfoLiR clearfix">
							<div class="resourceInfoLiAll">数据端口数</div>
							<div class="resourceInfoLiDetail">
								<div>网线端口数：<span id="dataCopperNum"></span></div>
								<div>光网端口数：<span id="dataFiberNum"></span></div>
							</div>
						</div>
					</li>
					<li class="resourceInfoLi clearfix">
						<div class="resourceInfoLiL clearfix">
							<div class="resourceInfoLiAll">语音端口占用率</div>
							<div class="resourceInfoLiDetail">
								<div>网线实占率：<span id="voiceCopperPer"></span></div>
								<div>光网实占率：<span id="voiceFiberPer"></span></div>
							</div>
						</div>
						<div class="resourceInfoLiR clearfix">
							<div class="resourceInfoLiAll">数据端口占用率</div>
							<div class="resourceInfoLiDetail">
								<div>网线实占率：<span id="dataCopperPer"></span></div>
								<div>光网实占率：<span id="dataFiberPer"></span></div>
							</div>
						</div>
					</li>
				</ul>
			    </div>
			    <div class="tab-pane " id="userList" style="width: 933px;">
			   <!--  <div id="myCarousel" class="carousel slide" style="height: 370px;" data-interval=false>
					轮播（Carousel）指标
					<ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
					</ol>   
					轮播（Carousel）项目
					<div class="carousel-inner" style="height: 500px">
						<div class="item active">
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						 <div style="margin-top:20px; height: 457px;border: 1px solid;color:#00E1FD">
			                <div id="type" style="width:50%; float:left">
				                <div class="view-title" style="margin-bottom: -20px; margin-top: -10px;margin-left: 10px;">
									基础单元大类
									<div class="myOrners myOrner1"></div>
									<div class="myOrners myOrner2"></div>
									<div class="myOrners myOrner3"></div>
									<div class="myOrners myOrner4"></div>
								</div>
				                <div class="chartTitle" style="margin-top: 1px;">
			    				基础单元大类
			    				</div>
			    				<div id="typeInfo" style="width: 400px;height: 400px;margin-left: 30px;" >
			    			
			    				</div>
		    				</div>
		    				<div id="typeRatioInfo" style="width:50%; float:right">
			    				 <div class="view-title" id="Export" style=" margin-left: 6px;margin-top: -10px;">
									基础单元小类
									<div class="myOrners myOrner1"></div>
									<div class="myOrners myOrner2"></div>
									<div class="myOrners myOrner3"></div>
									<div class="myOrners myOrner4"></div>
								 </div>
				                <div class="chartTitle" style="margin-top:4px;">
			    				基础单元小类
			    				</div>
			    				<div class="kpi-select" style="margin-top: 23px;">
									<span style="color:#ffffff !important">类型：</span>
									<select class="typeSelect" id="bigTypeSelect" style="width:90px">
									</select>
								</div>
			    				<div id="typeRatioInfo1" style="width: 550px;height: 400px;margin-left: -71px" >
			    			
			    				</div>
		    				</div>
		    			 </div>
						</div>
						<div class="item">
		    				<div class="grid-search-div" id="gridSearch" style="margin-left: 2px;">
							<input type="text" placeholder="查询" class="searchField input-md" id="physicalGridName" name="physicalGridName">
							<button class="btn btn-primary" type="button" id="searchBasicUnitList">查询</button>
						</div>
						<div class="grid-search-div" id="gridExport">
							<button class="btn btn-primary" type="button" id="exportBasicUnitList">导出</button>
						</div>
			    		<div class="grid">
				            <table id="userListGrid"></table>
				            <div id="grid-pager1"></div> 
			        	</div>
				        </div>
					</div>
				</div> -->
					<jsp:include page="/pages/gis/gridInfo/gridInfoUserList.jsp"/>
			    </div>
			    <div class="tab-pane " id="buildingList">
			    <div id="myCarousel1" class="carousel slide" data-interval=false>
					<!-- 轮播（Carousel）指标 -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel1" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel1" data-slide-to="1"></li>
					</ol>   
					<!-- 轮播（Carousel）项目 -->
					<div class="carousel-inner" style="height: 500px">
						<div class="item active">
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			                <div id="buildType" >
			                <div class="kpi-select">
									<span style="color:#ffffff !important">类型：</span>
									<select class="typeSelect" id="buildTypeSelect" style="width:90px">
									</select>
								</div>
			    				<div id="buildDetailInfo" style="width: 850px;height: 400px;" >
			    			
			    				</div>
		    				</div>
						</div>
						<div class="item">
		    			<div class="grid-search-div" id="gridSearch" style="margin-left: 2px;">
							<input type="text" placeholder="查询" class="searchField input-md" id="belongPhysicalGrid" name="belongPhysicalGrid">
							<button class="btn btn-primary" type="button" id="searchbuildingList">查询</button>
						</div>
						<div class="grid-search-div" id="gridExport">
							<button class="btn btn-primary" type="button" id="exportBuildingList">导出</button>
						</div>
			    		<div class="grid">
				          	<table id="buildingListGrid"></table>
			            	<div id="grid-pager2"></div> 
			        	</div>
				        </div>
					</div>
				</div>
			    </div>
			    <div class="tab-pane " id="businessList">
			    <div id="myCarousel2" class="carousel slide" data-interval=false>
					<!-- 轮播（Carousel）指标 -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel2" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel2" data-slide-to="1"></li>
					</ol>   
					<!-- 轮播（Carousel）项目 -->
					<div class="carousel-inner" style="height: 500px">
						<div class="item active">
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			                <div id="businessType" >
			                	<div class="kpi-select">
									<span style="color:#ffffff !important">运营商：</span>
									<select class="typeSelect" id="Operator" style="width:90px">
									</select>
									<span style="color:#ffffff !important">类型：</span>
									<select class="typeSelect" id="businessTypeSelect" style="width:90px">
									</select>
								</div>
			    				<div id="businessDetailInfo" style="width: 850px;height: 400px;" >
			    			
			    				</div>
		    				</div>
						</div>
						<div class="item">
		    			<div class="grid-search-div" id="gridSearch" style="margin-left: 2px;">
							<input type="text" placeholder="查询" class="searchField input-md" id="businessGridName" name="physicalGridName">
							<button class="btn btn-primary" type="button" id="searchCompetitorList">查询</button>
						</div>
						<div class="grid-search-div" id="gridExport">
							<button class="btn btn-primary" type="button" id="exportCompetitorList">导出</button>
						</div>
			    		<div class="grid">
				          	<table id="businessListGrid"></table>
			            	<div id="grid-pager3"></div>
			        	</div>
				        </div>
					</div>
				</div>
			    </div>
			    
			    <div class="tab-pane " id="channelStationList" >
				    <div id="myCarousel3" class="carousel slide" data-interval=false>
					<!-- 轮播（Carousel）指标 -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel3" data-slide-to="0" class="active" ></li>
						<li data-target="#myCarousel3" data-slide-to="1"></li>
					</ol>   
					<!-- 轮播（Carousel）项目 -->
					<div class="carousel-inner" style="height: 500px">
						<div class="item active">
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						 	<div class="kpi-select">
									<span style="color:#ffffff !important">运营商：</span>
									<select class="typeSelect" id="channelOperator" style="width:90px">
									</select>
									<span style="color:#ffffff !important">类型：</span>
									<select class="typeSelect" id="channelTypeSelect" style="width:90px">
									</select>
								</div>
			                <div id="channel" style="width:50%; float:left">
				                
			    				<div id="channelInfo1" style="width: 400px;height: 400px;margin-left: 1px;" >
			    			
			    				</div>
		    				</div>
		    				<div id="baseStationInfo" style="width:50%; float:right">
				          
				          
			    				<div id="baseStationInfo1" style="width: 550px;height: 400px;margin-left: -71px" >
			    			
			    				</div>
		    				</div>
						</div>
					<div class="item">
		    		<div class="view-title" style="margin-bottom: -20px;">
						渠道基础信息
						<div class="myOrners myOrner1"></div>
						<div class="myOrners myOrner2"></div>
						<div class="myOrners myOrner3"></div>
						<div class="myOrners myOrner4"></div>
					</div>
					 <div class="view-title" id="Export" style=" margin-left: 815px;">
						<button  type="button" id="exportChannelManage" style="background-color: transparent;border: none;">导出</button>
						<div class="myOrners myOrner1"></div>
						<div class="myOrners myOrner2"></div>
						<div class="myOrners myOrner3"></div>
						<div class="myOrners myOrner4"></div>
					</div>
					<ul class="resourceInfo">
						<!-- <div class="grid-search-div" id="gridSearch">
							<input type="text" placeholder="查询" class="searchField input-md" id="physicalGridName" name="physicalGridName">
							<button class="btn btn-primary" type="button" id="searchCompetitorList">查询</button>
						</div> -->
				    	<div class="grid" style="margin-top: 5px;">
				            <table id="channelListGrid"></table>
				            <div id="grid-pager4"></div> 
				        </div>
					</ul>
					
					<div class="view-title" style="margin-bottom: -20px;">
						基站基础信息
						<div class="myOrners myOrner1"></div>
						<div class="myOrners myOrner2"></div>
						<div class="myOrners myOrner3"></div>
						<div class="myOrners myOrner4"></div>
					</div>
					 <div class="view-title" id="Export" style=" margin-left: 815px;">
						<button  type="button"id="exportBaseStation"style="background-color: transparent;border: none;">导出</button>
						<div class="myOrners myOrner1"></div>
						<div class="myOrners myOrner2"></div>
						<div class="myOrners myOrner3"></div>
						<div class="myOrners myOrner4"></div>
					</div>
					<ul class="resourceInfo">
						<!-- <div class="grid-search-div" id="gridSearch">
							<input type="text" placeholder="查询" class="searchField input-md" id="physicalGridName" name="physicalGridName">
							<button class="btn btn-primary" type="button" id="searchCompetitorList">查询</button>
						</div> -->
				    	<div class="grid" style="margin-top: 5px;">
				            <table id="stationListGrid"></table>
				            <div id="grid-pager5"></div> 
				        </div>
					</ul>
				        </div>
					</div>
				</div>
				
			    </div>
			    <div class="tab-pane " id="gridInfoList">
		    		<div class="grid-search-div clearfix no-padding">
			    		<div class="col-sm-6 col-xs-6 no-padding">
			    			<label>排名类型：</label>
							<label><input type="radio"  class="searchField " value="0" id="radio1">&nbsp;单指标排名</label>&nbsp;&nbsp;&nbsp;
							<label><input type="radio"  class="searchField " value="1" id="radio2">&nbsp;总得分排名</label>
						</div>
						<div class="col-sm-6 col-xs-6 no-padding">
			    			<label class="">周期类型:</label>
							<select>
								<option>--请选择--</option>
								<option>季度考核</option>
								<option>年度考核</option>
						
							</select>
							<div style="margin-left: 212px; margin-top: -29px;">
				    			<label>考核周期:</label>
								<select>
									<option>--请选择--</option>
									<option>--请选择--</option>
									<option>--请选择--</option>
									<option>--请选择--</option>
								</select>
							</div>
						</div>
					</div>
					<div class="grid-search-div clearfix no-padding">
			    		<div class="col-sm-6 col-xs-6 no-padding" style="height: 30px">
				    		<div id="selectHidden">
				    			<label>单项指标:</label>
								<select>
									<option>--请选择--</option>
									<option>--请选择--</option>
									<option>--请选择--</option>
									<option>--请选择--</option>
								</select>
							</div>
						</div>
					</div>
					<div class="grid-search-div clearfix no-padding">
						<div class="col-sm-6 col-xs-6 no-padding" style="margin-left: 698px;margin-top: -39px;">
							<button class="btn btn-danger" style="margin-right:10px;">查询</button>
							<button  class="btn btn-info">重置</button>
						</div>
					</div>
					<div class="grid infoList">
			            <table id="gridInfoListGrid"></table>
			            <div id="gridInfoListPagers"></div> 
			        </div>
			        <div class="fanhui">
			        	<button class="btn btn-info">返回</button>
			        </div>
			    	<div class="grid infoDetails">
			            <table id="gridInfoDetailGrid"></table>
			            <div id="gridInfoDetailPagers"></div> 
			        </div>
			   </div>
			</div>
		</div>
	</div>
</div>
<%
SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
SysOrg sysOrg =sysUser.getSysOrg();
String orgId = sysUser.getOrgId();
String gridCode =  request.getParameter("orgId");
%>
<input id="businessGridCode" type="hidden" value="<%=gridCode %>" />
<script type="text/javascript">
	var nowOrgId = "<%=orgId%>"; 
	var gridCode = "<%=gridCode%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridInfo.js"></script>

<script type="text/javascript">
	function echartsOnload(){
		$('#incomeInfo').removeAttr('_echarts_instance_');
		incomeInfo();
		$('#businessInfo').removeAttr('_echarts_instance_');
		businessInfo();
		$('#typeInfo').removeAttr('_echarts_instance_');
		typeInfo();
	}
</script>
 
</body>
