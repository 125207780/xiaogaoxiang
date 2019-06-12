<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String uid =request.getParameter("uid");
%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/townInfo.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
<style>
.ui-jqgrid-btable tr.jqgrow td {
	white-space: normal;
}
#stationName {
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
	</ol>   
	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		<div class="item active">
		<div class="modal-headers">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" id="myModalLabel">乡镇信息</h4>
    	</div>
		<ul class="channelBaseInfo clearfix">
			<li class="channelBaseInfoList clearfix">
				<div class="channelBaseInfoDiv clearfix">
					<div class="channelBaseInfoL">乡镇名称：</div>
					<div id= "physicalName" class="channelBaseInfoR"></div>
				</div>
				<div class="channelBaseInfoDiv clearfix">
					<div id="stationId" class="channelBaseInfoL" style="display: none"><%=uid %></div>
						<div class="channelBaseInfoL">乡镇编码：</div>
						<div id="physicalId" class="channelBaseInfoR"></div>
					</div>
				</li>
				<li class="channelBaseInfoList clearfix">
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">乡镇地址：</div>
						<div id="address" class="channelBaseInfoR"></div>
					</div>
					<div class="channelBaseInfoDiv clearfix">
						<div class="channelBaseInfoL">乡镇类型：</div>
						<div id="physicalType" class="channelBaseInfoR"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>

<script>
$('#myCarousel').on('slid.bs.carousel', function () {
	jkChart();
	var data = [ 
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
        width:260,
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
	       		grid.setRowData(ids[i], false, {height: 40});//设置grid行高度
	   		}
       	},
		rowNum:20, 
		viewrecords: true, 
		rowList:[10, 20, 30],
		viewrecords: true
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
			{name: 'name', index: 'name', width: 70, align: 'center',
				cellattr: function(rowId, tv, rawObject, cm, rdata) { 
					return 'id=\'name' + rowId + "\'"; 
				}
			},
			{name: 'nameB', index: 'nameB', width: 40,align: 'center', 
				cellattr: function(rowId, tv, rawObject, cm, rdata) { 
					return 'id=\'nameB' + rowId + "\'"; 
				} 
			}, 
			{name: 'amount', index: 'amount', width: 250, align: 'center',
				cellattr: function(rowId, tv, rawObject, cm, rdata) { 
					return 'id=\'amount' + rowId + "\'"; 
				}
			}, 
			{name: 'tax', index: 'tax', width: 40, formatter: 'number', align: 'center',
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

var jkChart = function() {
	var myChart = echarts.init(document.getElementById('itemChart'));	
	var data = ['08月','09月','10月','11月','12月'];
	var data1 = ['75','23','65','45','54'];
	option = {
		title: {
			text: '渠道排名',
			left: 10,
			top: 20,
			textStyle:{
				color:'#fff',
		        fontSize:12
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
	    	show:false,
	  	},
	 	xAxis: [{
			name:'',
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
		    	show:false
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
		          	if (params === 0) {
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
	    	barWidth : 10,
	    	silent: true,
	    	itemStyle: {
            	normal: {
                	barBorderRadius: [5,5,0,0],
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
   	// 得到显示到界面的id集合 
   	var mya = $("#" + gridName + "").getDataIDs(); 
   	// 当前显示多少条 
   	var length = mya.length; 
   	for (var i = 0; i < length; i++) { 
       	// 从上到下获取一条信息 
       	var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]); 
       	// 定义合并行数 
       	var rowSpanTaxCount = 1; 
       	for (j = i + 1; j <= length; j++) { 
           	// 和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏 
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
 