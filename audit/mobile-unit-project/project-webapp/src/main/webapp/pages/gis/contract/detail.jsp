 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript"></script>
<style>
/* .modal-body,.modal-bottom{
	background:none !important;
	border:none !important;
}
#infoTree{
	height: 548px !important;
	width: 170px !important;
}  */
.infoDetail1{
	margin-left: 0px !important;
}
/* .ui-jqgrid-btable > tbody > tr{
	height: 10px !important;
}
  .jqgfirstrow{
	display: none !important;
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
 .ui-jqgrid-btable tr.jqgrow td{
	white-space: normal;
} 
#topwindow101context{
	background: url(../../images/frameBg.png) center !important;
	background-size: 100% 100%;
}*/
.channelBaseInfo{
	padding:0 30px;
}
.channelBaseInfo, .channelBaseInfoList{
	margin:0px;
	list-style:none;
}
.channelBaseInfoDiv{
	float:left;
	width:45%;
	height: 42px;
	line-height: 43px;
	margin-left: 5%;
	position: relative;
	display: inline-block;
	vertical-align: top;
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
	width: 98px;
}
.channelBaseInfoR{
	float:left;
	text-align:left;
	color:#0ab8b6;
	font-size:15px;
	width:235px;
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
#idx_grid-pager {
  position: absolute;
    right: 3px;
    bottom: -496px;
}
.fun{
	position: absolute;
    right: -5px;
    bottom: 5px;
}

</style>
   <%--  <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" /> --%>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/gridInfo.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
	<%
	String gridCode = request.getParameter("gridCode");
	String channelCode = request.getParameter("channelCode");
    %>
<script type="text/javascript">
     var dtl_gridCode="<%=gridCode%>";
     var dtl_channelCode="<%=channelCode%>";
	
</script>
 
 <div class="infoDetail1" id="" >
		<ul id="myTab" class="nav nav-tabs">
		    <li class="active titles setHeight" value="1">
		    	<a href="#gridInfo" data-toggle="tab">网格信息</a>
		    	<!-- <div class="tanBg2"></div> -->
		    </li>
		    
		    <li class="titles setHeight">
			    <a href="#gridTable"   data-toggle="tab">渠道信息</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
		    <li class="titles setHeight">
			    <a href="#baseceil"   data-toggle="tab">基础单元信息</a>
			    <!-- <div class="tanBg2"></div> -->
		    </li>
		    
		</ul>
		<div class="infoLists">
			<div id="myTabContent" class="tab-content">
			    <div class="tab-pane clearfix in active" id="gridInfo">
			    	<jsp:include page="/pages/gis/gridInfo/gridInfoPane.jsp"/>
			    </div>
			    <div class="tab-pane clearfix" id="gridTable" >			    	
			    	<%
			    	 
			    	if("".equals(channelCode)){%>                   
                     <jsp:include page="/pages/gis/layer/channelCount.jsp"/>                     
                	 <%}else{%>			    	
		 	          
			           <ul class="channelBaseInfo clearfix">
							<li class="channelBaseInfoList clearfix">
								<div class="channelBaseInfoDiv clearfix">
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
									<div class="channelBaseInfoL">渠道销售经理：</div>
									<div id="chnlMngrName" class="channelBaseInfoR"></div>
								</div>
							</li>
							<li class="channelBaseInfoList clearfix">
								<div class="channelBaseInfoDiv clearfix">
									<div class="channelBaseInfoL">渠道二级分类：</div>
									<div id="chnlTypeLevel2" class="channelBaseInfoR"></div>
								</div>
								<div class="channelBaseInfoDiv clearfix">
									<div class="channelBaseInfoL">销售经理电话：</div>
									<div id="chnlMngrNumber" class="channelBaseInfoR"></div>
								</div>
							</li>
							<li class="channelBaseInfoList clearfix">
								<div class="channelBaseInfoDiv clearfix">
									<div class="channelBaseInfoL">渠道开店时间：</div>
									<div id="openDate" class="channelBaseInfoR"></div>
								</div>
								<div class="channelBaseInfoDiv clearfix">
									<div class="channelBaseInfoL">渠道经营面积：</div>
									<div id="useArea" class="channelBaseInfoR"></div>
								</div>
							</li>
							<li class="channelBaseInfoList clearfix">
								<div class="channelBaseInfoDiv clearfix">
									<div class="channelBaseInfoL">渠道台席数：</div>
									<div id="chnlCounterNum" class="channelBaseInfoR"></div>
								</div>
								<div class="channelBaseInfoDiv clearfix">
									<div class="channelBaseInfoL">渠道店员数：</div>
									<div id="chnlClerkNum" class="channelBaseInfoR"></div>
								</div>
							</li>
						</ul>
			    	<%} %>
			    </div>
			   <div class="tab-pane clearfix" id="baseceil">
			           <jsp:include page="/pages/gis/gridInfo/gridInfoUserList.jsp"/>
			    </div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	 
	$(function(){
		 
		 
  	initGridInfoPane(dtl_gridCode);
		initGridInfoUserList(dtl_gridCode);
		
		<% if("".equals(channelCode)){%>
		initCnCountTable(dtl_gridCode);
		<%}else{%>
		getChannelInfo();
		 <%}%>
	})
	function getChannelInfo(){
 
	$.ajax({
		url : $.cxt + '/channelInfo/getBaseChannelInfo',
		data : {channelId : dtl_channelCode},
		type : "POST",
		success : function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				$("#channelCode").append(data.data[0].CHNL_CODE);
				$("#chnlStar").append(data.data[0].CHNL_STAR);
				$("#chnlName").append(data.data[0].CHNL_NAME);
				$("#chnlCapacityScore").append(data.data[0].CHNL_CAPACITY_SCORE);
				$("#chnlAddr").append(data.data[0].CHNL_ADDR);
				$("#operName").append(data.data[0].OPER_NAME);
				$("#chnlTypeLevel1").append(data.data[0].CHNL_TYPE_LEVEL1);
				$("#chnlMngrName").append(data.data[0].CHNL_MNGR_NAME);
				$("#chnlTypeLevel2").append(data.data[0].CHNL_TYPE_LEVEL2);
				$("#chnlMngrNumber").append(data.data[0].CHNL_MNGR_NUMBER);
				$("#openDate").append(data.data[0].OPEN_DATE);
				$("#useArea").append(data.data[0].USE_AREA);
				$("#chnlCounterNum").append(data.data[0].CHNL_COUNTER_NUM);
				$("#chnlClerkNum").append(data.data[0].CHNL_CLERK_NUM);
			}
		}
	})
}
</script>
 