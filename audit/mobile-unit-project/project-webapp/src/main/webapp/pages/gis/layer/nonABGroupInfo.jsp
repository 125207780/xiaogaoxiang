<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String uid =request.getParameter("uid");
%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/nonABGroupInfo.js"></script>
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
	word-break: keep-all;������
	white-space: nowrap;������
	overflow: hidden;���ݳ������ʱ���س������ֵ�����
	text-overflow: ellipsis;���������ı����ʱ��ʾʡ�Ա��(...) ������overflow:hiddenһ��ʹ�á�
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
	word-break: keep-all;������
	white-space: nowrap;������
	overflow: hidden;���ݳ������ʱ���س������ֵ�����
	text-overflow: ellipsis;���������ı����ʱ��ʾʡ�Ա��(...) ������overflow:hiddenһ��ʹ�á�
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
 
<div id="myCarousel" class="carousel slide" style="height: 370px;" data-interval=false>
	<!-- 轮播（Carousel）指标 -->
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
	<!--<li data-target="#myCarousel" data-slide-to="2"></li>
		<li data-target="#myCarousel" data-slide-to="3"></li> -->
	</ol>   
	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		<div class="item active">
			<div class="modal-headers">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">未入格AB基础信息</h4>
			</div>
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
			<!-- <ul class="channelBaseInfo">
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv3 clearfix">
						<div class="channelBaseInfoL3">开店时间：</div>
						<div class="channelBaseInfoR3">2018-09-23</div>
					</div>
					<div class="channelBaseInfoDiv3 clearfix">
						<div class="channelBaseInfoL3">销售经理：</div>
						<div class="channelBaseInfoR3">某某某</div>
					</div>
					<div class="channelBaseInfoDiv3 clearfix">
						<div class="channelBaseInfoL3">台席数：</div>
						<div class="channelBaseInfoR3">33台</div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv3 clearfix">
						<div class="channelBaseInfoL3">经营面积：</div>
						<div class="channelBaseInfoR3">800平米</div>
					</div>
					<div class="channelBaseInfoDiv3 clearfix">
						<div class="channelBaseInfoL3">销售经理电话：</div>
						<div class="channelBaseInfoR3">13888888888</div>
					</div>
					<div class="channelBaseInfoDiv3 clearfix">
						<div class="channelBaseInfoL3">店员数：</div>
						<div class="channelBaseInfoR3">30人</div>
					</div>
				</li>
			</ul> -->
		</div>
		<div class="item">
			<div class="modal-headers">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="dayKip">渠道日指标(2018-06-15)</h4>
			</div>
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
					<!--<div class="item">
							<div class="modal-headers">
				                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				                <h4 class="modal-title" id="myModalLabel">渠道得分</h4>
				            </div>
							<div  style="width:550px;padding-top: 10px;margin:0 auto;">
								<table id="gridInfo"></table>
								<div id="grid-pager"></div>
							</div>
						</div>
						<div class="item">
							<div class="modal-headers">
				                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				                <h4 class="modal-title" id="myModalLabel">渠道排名</h4>
				            </div>
							<div class="itemChart" id="itemChart" style="margin-left:6px;"></div>
							<div class="itemTable" style="width:250px;padding-top: 33px;">
								<table id="itemTable" style="width:250px;"></table>
								<div id="gridPager"></div>
							</div>
						</div> -->
	</div>
	<!-- 轮播（Carousel）导航 -->
	<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
	    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
	    <span class="sr-only">Previous</span>
	</a>
	<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
	    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
	    <span class="sr-only">Next</span>
	</a>
</div>
<script>
$('#myCarousel').on('slid.bs.carousel', function() {
	jkChart();
	var data = 
	[ 
	    {id:"1",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"2",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"3",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"4",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"5",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"6",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"7",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"8",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"9",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"10",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"11",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"12",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"13",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"14",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"15",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"},
	    {id:"16",data:"test",data0:'test1',data1:"test2",data2:"test3",data3:"test4"}
	]
	$('#itemTable').jqGrid({               
	    datatype: "local", 
	    data: data,           
	    altRows:true,
	    width:440,
	    height: 230,
	    multiselet: false,//checkbox
	    colNames:['网格名称','渠道名称','宽带业务量排名', '移动业务量排名'],
	    colModel:[
        	{name:'data',index:'data',align:"center"}, 
	        {name:'data0',index:'data1',align:"center"}, 
	        {name:'data1',index:'data2',align:"center"}, 
	        {name:'data2',index:'data3',align:"center"}
		],
        loadComplete: function() {
	    	var grid = $('#itemTable');
	    	var ids = grid.getDataIDs();
	   		for (var i = 0; i < ids.length; i++) {
	        	grid.setRowData ( ids[i], false, {height: 40} );//设置grid行高度
	   		}
	   	},
		// pager: '#gridPager', 
		rowNum:20, 
        viewrecords: true, 
        rowList:[10,20,30],
        viewrecords : true
	});
	
	var mydata = [ 
		{ id: "1", invdate: "渠道分层质量", name: "月均重点业务承载率", nameB: "2", amount: "重点业务承载率=有重点业务销售专卖店（不含小微）/专卖店数量；", tax: "10.00"}, 
        { id: "2", invdate: "渠道分层质量", name: "月均重点业务承载率", nameB: "2", amount: "月均重点业务承载率=全年每个月重点业务承载率之和/12", tax: "10.00"}, 
        { id: "3", invdate: "渠道分层质量", name: "优质渠道占比", nameB: "5", amount: "优质渠道：年累计办理1800笔及以上的渠道为优质渠道；", tax: "20.00" }, 
        { id: "4", invdate: "渠道分层质量", name: "优质渠道占比", nameB: "5", amount: "优质渠道占比=优质渠道数量/专卖店数量；", tax: "20.00"},
        { id: "5", invdate: "营销效率", name: "重点业务单店办理量", nameB: "2", amount: "重点业务单店办理量=全年专卖店办理的重点业务笔数/专卖店数量", tax: "10.00"}, 
        { id: "6", invdate: "营销效率", name: "重点业务单店办理量", nameB: "2", amount: "重点业务单店办理量=全年专卖店办理的重点业务笔数/专卖店数量", tax: "10.00"}, 
        { id: "7", invdate: "营销效率", name: "重点业务单位面积办理量", nameB: "5", amount: "重点业务单位面积办理量=全年专卖店办理的重点业务笔数/专卖店面积之和", tax: "20.00" }, 
        { id: "8", invdate: "营销效率", name: "重点业务单位面积办理量", nameB: "5", amount: "重点业务单位面积办理量=全年专卖店办理的重点业务笔数/专卖店面积之和", tax: "20.00"},
        { id: "9", invdate: "营销效益", name: "酬金占收比", nameB: "2", amount: "酬金占收比=2018年实际支出酬金/2018年通服收入", tax: "10.00"}, 
        { id: "10", invdate: "营销效益", name: "酬金占收比", nameB: "2", amount: "酬金占收比=2018年实际支出酬金/2018年通服收入", tax: "10.00"}, 
        { id: "11", invdate: "营销效益", name: "重点业务单业务酬金", nameB: "5", amount: "重点业务单业务酬金=全年重点业务基础酬金/重点业务笔数", tax: "20.00" }, 
        { id: "12", invdate: "营销效益", name: "重点业务单业务酬金", nameB: "5", amount: "重点业务单业务酬金=全年重点业务基础酬金/重点业务笔数", tax: "20.00"},
        { id: "13", invdate: "营销质量", name: "新入网99及以上不限量占比", nameB: "2", amount: "新入网99不限量占比=新入网办理99元及以上不限量套餐数/新入网数量", tax: "10.00"}, 
        { id: "14", invdate: "营销质量", name: "新入网99及以上不限量占比", nameB: "2", amount: "新入网99不限量占比=新入网办理99元及以上不限量套餐数/新入网数量", tax: "10.00"}, 
        { id: "15", invdate: "营销质量", name: "和家庭宽带搭载率", nameB: "5", amount: "和家庭宽带搭载率=办理和家庭客户中办理了宽带的客户数/办理和家庭客户数", tax: "20.00" }, 
        { id: "16", invdate: "营销质量", name: "和家庭宽带搭载率", nameB: "5", amount: "和家庭宽带搭载率=办理和家庭客户中办理了宽带的客户数/办理和家庭客户数", tax: "20.00"}
	];
	grid = $("#gridInfo");
	grid.jqGrid({
	    datatype: 'local',
	    data: mydata,
	    width:550,
	    height: 230,
	    colNames: [ '类别', '指标', '权重', '考核说明', '得分'],
	    colModel: [
	        {name: 'invdate', index: 'invdate', width: 80, align: 'center',
	        	cellattr: function(rowId, tv, rawObject, cm, rdata) {
	                return 'id=\'invdate' + rowId + "\'";
	            }
	        },
	        { name: 'name', index: 'name', width: 70, align: 'center',
	            cellattr: function(rowId, tv, rawObject, cm, rdata) {
	                return 'id=\'name' + rowId + "\'";
	            }
	        },
	        { name: 'nameB', index: 'nameB', width: 40,align: 'center', 
	        	cellattr: function(rowId, tv, rawObject, cm, rdata) { 
	        		return 'id=\'nameB' + rowId + "\'"; 
	     		} 
	        }, 
	        { name: 'amount', index: 'amount', width: 250, align: 'center',
	     	   	cellattr: function(rowId, tv, rawObject, cm, rdata) { 
	       		return 'id=\'amount' + rowId + "\'"; 
	  			}
	        }, 
	        { name: 'tax', index: 'tax', width: 40, formatter: 'number', align: 'center',
	     		cellattr: function(rowId, tv, rawObject, cm, rdata) { 
	           		return 'id=\'tax' + rowId + "\'"; 
	       		}
	        }
		], 
		rowNum: 15, 
        rowList: [10, 15, 20, 30], 
        pager: '#grid-pager', 
        gridview: false, 
        viewrecords: false, 
        gridComplete: function() { 
	        //②在gridComplete调用合并方法 
	        var gridName = "gridInfo"; 
	        Merger(gridName, 'invdate');
	        Merger(gridName, 'name'); 
	        Merger(gridName, 'nameB'); 
	        Merger(gridName, 'tax'); 
	        Merger(gridName, 'amount'); 
	   	} 
	}); 
	
	$("#first_grid-pager").find("span").addClass("bigger-150 fa fa-angle-double-left");
    $("#prev_grid-pager").find("span").addClass("bigger-150 fa fa-angle-left");
    $("#next_grid-pager").find("span").addClass("bigger-150 fa fa-angle-right");
    $("#last_grid-pager").find("span").addClass("bigger-150 fa fa-angle-double-right");
	$(".ui-jqgrid-bdiv").slimScroll({
		height:'200px',
		color:"#5cd4f8",
		opacity: 1,
		alwaysVisible: false
	});
	$("#first_gridPager").find("span").addClass("bigger-150 fa fa-angle-double-left");
   	$("#prev_gridPager").find("span").addClass("bigger-150 fa fa-angle-left");
   	$("#next_gridPager").find("span").addClass("bigger-150 fa fa-angle-right");
   	$("#last_gridPager").find("span").addClass("bigger-150 fa fa-angle-double-right");
});

var jkChart = function(){
	var myChart = echarts.init(document.getElementById('itemChart'));	
	var data = ['08月','09月','10月','11月','12月'];
	var data1 = ['75','23','65','45','54'];
	option = {
		title: {
			text: '渠道排名',
			left: 10,
			top: 20,
			textStyle: {
		   		color: '#fff',
		     	fontSize: 12
			}
		},
		grid: {
			left: '50px',
		 	right: '10px',
			top: '60px',
			bottom: '40px',
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			}
		},
		legend: {
			show: false,
		},
		xAxis: [{
			name: '',
			triggerEvent: false,
			data: data,
			axisLabel: {
			 	interval: 0,
			  	show: true,
				textStyle: {
			  		color: "#ffffff"
			  	}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
			   		show: false,
			    	color: "#ffffff",
			    	width: 1
			  	}
			},
			splitLine: { 
				show: false
			}
		}],
		yAxis: {
			show: true,
			type: 'value',
			splitLine: {
		    	show: false
			},
			axisLabel: {
		 		formatter: function(params) {
			   		if(params === 0) {
			        	return ''
			   		} else {
			      		return params
			     	}
				}
			},
			axisLabel: {
		   		textStyle: {
		       		color: '#fff'
		    	}
			},
			axisLine: {
				lineStyle: {
					show: false,
					color: "#ffffff",
					width: 1
				}
			},
			lineStyle: {
			 	show: true,
				color: "#ffffff",
				width: 1
			}
		},
		series: [{
			name: '指标1',
			type: 'bar',
		    barWidth: 10,
		    silent: true,
		    itemStyle: {
	            normal: {
	           		barBorderRadius: [5, 5, 0, 0],
	           		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	               		offset: 0,
	                	color: '#0074d6'
	            	}, {
	               		offset: 1,
	                	color: '#0074d6'
	                }]),
	                shadowColor: 'rgba(0, 0, 0, 0.4)',
	                shadowBlur: 20
	            }
	 		},
			data: data1
		}]
	};
	myChart.setOption(option);
	myChart.resize();
}

// 公共调用方法 
function Merger(gridName, CellName) { 
	//得到显示到界面的id集合 
    var mya = $("#" + gridName + "").getDataIDs(); 
    //当前显示多少条 
    var length = mya.length; 
    for (var i = 0; i < length; i++) { 
        //从上到下获取一条信息 
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]); 
        //定义合并行数 
        var rowSpanTaxCount = 1; 
        for (j = i + 1; j <= length; j++) { 
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏 
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]); 

            if (before[CellName] == end[CellName]) { 
                rowSpanTaxCount++; 
                $("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' }); 

            } else { 
                rowSpanTaxCount = 1; 
                break; 
            } 
            $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount); 
        } 
    } 
} 
</script>
 