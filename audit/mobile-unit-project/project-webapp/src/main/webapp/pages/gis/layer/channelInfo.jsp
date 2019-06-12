<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String uid =request.getParameter("uid");
%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/channelInfo.js"></script>
<style>

.channelBaseInfo{
	padding:0 30px;
}
.YWBL{
 	padding:0 30px;
	width:100%;
}
.ARPU{
	padding:0 30px;
	width:100%;
}
.YHHX{
	padding:0 30px;
	width:100%;
	height:400px;
	text-align:center;
	color:#fff;
}
/* .YHHXTableDiv{
	height:300px;
} */
.gridSchoolInfoL{
	width:50%;
	float:left;
}
.gridSchoolInfoR{
	width:50%;
	float:left;
	text-align:center;
}
.YHFZQK{
 	padding:0 30px;
	width:100%;
}
#gridSchoolYWBLEchart{
	width:400px;
	top:20px;
	height:500px;
}
#gridSchoolYHFZQKIEchart{
	width:400px;
	height:400px;
}
#gridSchoolARPUEchart{
	width:400px;
	top:20px;
	height:500px;
}
.channelBaseInfo, .channelBaseInfoList{
	margin:0px;
	list-style:none;
}
.channelBaseInfoDiv{
	float:left;
	width:48%;
	height: 42px;
	line-height: 43px;
	margin-left: 2%;
	position: relative;
	display: inline-block;
	vertical-align: top;
}
.gridSchoolDiv{
	float:left;
	width:100%;
	height: 42px;
	line-height: 43px;
	position: relative;
	display: inline-block;
	vertical-align: top;
}
.gridSchool{
	float:left;
	text-align:left;
	color:#fff;
	width: 33.3%;
}
.channelBaseInfoDiv1 .channelBaseInfoL, .channelBaseInfoDiv1 .channelBaseInfoR{
	float:left;
}
.channelBaseInfo{
	padding:0 30px;
}
.channelBaseInfoL{
	float:left;
	text-align:left;
	color:#fff;
	width: 140px;
}
.channelBaseInfoLC{
	float:left;
	text-align:left;
	color:#fff;
	width: 169px;
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
.nav-tabs > li:hover{
	background: url(../../images/gis/tabBg.png) repeat !important;
}

.tableListUl .tableLis:hover,.tableListUl .tableLis:hover div{
	backgorund: none !important;
}
 .table.table-bordered td{
	border: 1px solid #00E1FD;
	color: #fff;
	text-align:center;
}
.table.table-bordered th,.table.table-bordered thead{
	color: #D1D8DF;
	background: #1C374C;
	border: 1px solid #00E1FD;
	text-align:center;
} 

.fun{
	position: absolute;
    right: -5px;
    bottom: 5px;
}

.ui-jqgrid {
	position: relative
}
.ui-jqgrid .ui-jqgrid-view {
	position: relative;
	left: 0;
	top: 0;
	padding: .0em;
	font-size: 11px
}

.ui-jqgrid {
	position: relative
}

.ui-jqgrid .ui-jqgrid-view {
	position: relative;
	left: 0;
	top: 0;
	padding: .0em;
	font-size: 11px
}

.ui-jqgrid .ui-jqgrid-titlebar {
	padding: .3em .2em .2em .3em;
	position: relative;
	border-left: 0 none;
	border-right: 0 none;
	border-top: 0 none
}

.ui-jqgrid .ui-jqgrid-title {
	float: left;
	margin: .1em 0 .2em
}

.ui-jqgrid .ui-jqgrid-hdiv {
	position: relative;
	margin: 0;
	padding: 0;
	background-color: #3DB9EF;
	overflow-x: hidden;
	border-left: 0 none !important;
	border-top: 0 none !important;
	border-right: 0 none !important
}

.ui-jqgrid .ui-jqgrid-bdiv {
	position: relative;
	margin: 0;
	padding: 0;
	overflow: auto;
	text-align: left
}

.ui-jqgrid .ui-jqgrid-btable {
	table-layout: fixed;
	margin: 0;
	outline-style: none
}


.ui-jqgrid tr.ui-row-ltr td {
	text-align: left;
	border-right-width: 1px;
	border-right-color: inherit;
	border-right-style: solid
}

.ui-jqgrid tr.ui-row-rtl td {
	text-align: right;
	border-left-width: 1px;
	border-left-color: inherit;
	border-left-style: solid
}

.ui-jqgrid .ui-jqgrid-pager {
	border-left: 0 none !important;
	border-right: 0 none !important;
	border-bottom: 0 none !important;
	margin: 0 !important;
	padding: 0 !important;
	position: relative;
	height: 25px;
	white-space: nowrap;
	overflow: hidden;
	font-size: 11px
}
#YHHXTablegrid-pager{
	height: 50px;
	margin-top:100px;
}

	table{
		width:50%;
	}
	#table1{
		width:100%;
	}
	#table1 tr td{		
		font-size:15px;
		padding-top:6px;
		color:#0ab8b6;
		width:50%;
		text-align:left;
	}
	#table4 tr td{		
		font-size:15px;
		padding-top:25px;
		color:#0ab8b6;
		width:33%;
		text-align:left;
	}
	#filterTable tr td,#table3 tr td{		
		font-size:15px;
		padding-top:3px;
		color:#0ab8b6;
		width:33%;
		text-align:left;
	}
	#table1 tr td:first-child,#filterTable tr td:first-child,#table3 tr td:first-child,
	#table4 tr td:first-child{
		color:#fff;
	}
	#chart1{
		position: absolute;
		width: 50%;
	    height: 100%;
	    right: 0;
	    top: 0;
	}
	#filterEchart{
		width: 100%;
    	height: 74%;
	}
	#chart2{
		position: absolute;
	    top: 0;
	    right: 0;
	    width: 50%;
	    height: 100%;
	}
	#newEchart{
		width: 100%;
    	height: 73%;
	}
	#chart3{
		position: absolute;
	    width: 50%;
	    height: 100%;
	    top: 0;
	    right: 0;
	}
	#useEchart{
		width: 100%;
    	height: 79%;
	}
</style>
     <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/gridInfo.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<div class="infoDetail1" id="" >
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles setHeight" value="1">
		    	<a href="#channelInfo" data-toggle="tab">渠道基础信息</a>
		    	<!-- <div class="tanBg2"></div> -->
		    </li>
		    
		    <li class="titles setHeight">
			    <a href="#channelRZBInfo"   data-toggle="tab">渠道日指标</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>  
		</ul>
		<div class="infoLists">
			<div id="myTabContent" class="tab-content">
			    <div class="tab-pane clearfix in active" id="channelInfo">
			    	<ul class="channelBaseInfo clearfix">
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div id="channelId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
						<div class="channelBaseInfoL">渠道编码：</div>
						<div id="channelCode" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道星级：</div>
						<div id="chnlStar" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道名称：</div>
						<div id="chnlName" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道能力得分：</div>
						<div id="chnlCapacityScore" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道地址：</div>
						<div id="chnlAddr" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道归属标识：</div>
						<div id="operName" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道一级分类：</div>
						<div id="chnlTypeLevel1" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">放号量：</div>
						<div id="chnlMngrName" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道二级分类：</div>
						<div id="chnlTypeLevel2" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">宽带新增量：</div>
						<div id="chnlMngrNumber" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道开店时间：</div>
						<div id="openDate" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">放号完成情况：</div>
						<div id="useArea" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">渠道台席数：</div>
						<div id="chnlCounterNum" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">宽带新增完成：</div>
						<div id="chnlClerkNum" class="channelBaseInfoR"></div>
					</div>
				</li>
			</ul>
			    </div>
			      <div class="tab-pane clearfix" id="channelRZBInfo" >
			      <ul class="channelBaseInfo clearfix">
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv1 clearfix">
						<div class="channelBaseInfoLC">终端销量：</div>
						<div id= "index_01" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv1 clearfix">
						<div class="channelBaseInfoLC">新增家庭网：</div>
						<div id="index_02"  class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv1 clearfix">
						<div class="channelBaseInfoLC">新增入网即不限量客户数：</div>
						<div id="index_03" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv1 clearfix">
						<div class="channelBaseInfoLC">新增入网即4G客户数：</div>
						<div id="index_04" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv1 clearfix">
						<div class="channelBaseInfoLC">新和家庭新增量：</div>
						<div id="index_05" class="channelBaseInfoR"></div>
					</div>
				</li>
			</ul>
			      </div>
			    </div>
