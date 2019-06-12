<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	<title>效能整体情况</title>
</head>
<body>
	<div class="outLine clearfix">
		<div class="outLinesTitle">
			效能整体情况
			<div class="orner orner1"></div>
			<div class="orner orner2"></div>
			<div class="orner orner3"></div>
			<div class="orner orner4"></div>
		</div>
		<div class="gridCon">
			<div class="grid">
	            <table id="gridInfo"></table>
	            <div id="grid-pager"></div> 
	        </div>
		</div>
	</div>
	<div class="outLine clearfix">
		<div class="outLinesTitle">
			效能整体情况
			<div class="orner orner1"></div>
			<div class="orner orner2"></div>
			<div class="orner orner3"></div>
			<div class="orner orner4"></div>
		</div>
		<div class="barChart" id="barChart">
			
		</div>
		<div class="gridCon gridHalf">
			<div class="grid">
	            <table id="gridInfo1"></table>
	            <div id="grid-pager1"></div> 
	        </div>
		</div>
	</div>
</body>
<script>
$(function(){
	jkChart();
	var colName = [ '销售线', '专业线', '网格', '渠道类别(三级)','四级渠道类型','管理本部渠道编码','管理本部','渠道编码','渠道名称','新发展用户数(户)','新发展用户出账应收（元）','新发展用户欠费（元）','期末出账用户数（户）','统计期间出账收入总额(元)','统计期间欠费总额(元)','统计期间渠道费用总额(元)','统计期间净收入（元）','佣金总额（元）','渠道补贴','终端酬金','终端补贴成本','渠道费用占收比','佣金占收比','渠道补贴占收比','终端酬金占收比','终端补贴占收比','欠费率'];
	var colName1 = [ '网格名称', '渠道名称', '效能评分', '效能排名'];
	var colModels1 = [ 
      	{ name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
      	{ name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
      	{ name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
      	{ name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'}
  	];
	var colModels = [ 
    	{ name: 'invdate', index: 'invdate', width: 80, align: 'center',frozen:true}, 
        { name: 'nameB', index: 'nameB', width: 70,align: 'center',frozen:true}, 
        { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center',frozen:true}, 
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center',sortable:false},
        { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
        { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
        { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
        { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
        { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
        { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
        { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
        { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
        { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
        { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
        { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
        { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
        { name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
        { name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
        { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
        { name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
        { name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'}
	]
	var mydata = [ 
    	{ id: "1", invdate: "A责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
        { id: "2", invdate: "A责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
        { id: "3", invdate: "A责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
        { id: "1", invdate: "A责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
        { id: "2", invdate: "A责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
        { id: "3", invdate: "A责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
        { id: "1", invdate: "A责任网格", name: "移动", nameB: "直营店", amount: "200.00", tax: "10.00", closed: true, ship_via: "TN", total: "210.00" }, 
        { id: "2", invdate: "A责任网格", name: "移动", nameB: "授权店", amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" }, 
        { id: "3", invdate: "A责任网格", name: "移动", nameB: "加盟店", amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" }
	];
	setGrid('#gridInfo',mydata,$('.outLine').width()-20,colName,colModels,'grid-pager')    
	$('#gridInfo').jqGrid('setFrozenColumns');
	setGrid('#gridInfo1',mydata,($('.outLine').width()-20)*0.5,colName1,colModels1,'grid-pager1');     
});

var setGrid = function(grid,mydata,widths,colName,colModels,pager){
	$(grid).jqGrid({ 
		datatype: 'local', 
        data: mydata, 
        width:widths,
        height: $(window).height()-200,
        colNames:colName, 
        colModel: colModels, 
        rowNum: 15, 
        rowList: [10, 15, 20, 30], 
        pager: "#"+pager, 
        gridview: false, 
        viewrecords: false, 
        gridComplete: function() { 
       } 
	}); 
    $("#first_"+pager).find("span").addClass("bigger-150 fa fa-angle-double-left");
 	$("#prev_"+pager).find("span").addClass("bigger-150 fa fa-angle-left");
 	$("#next_"+pager).find("span").addClass("bigger-150 fa fa-angle-right");
 	$("#last_"+pager).find("span").addClass("bigger-150 fa fa-angle-double-right");
}

var jkChart = function() {
	var myChart = echarts.init(document.getElementById('barChart'));	
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
		    splitLine:{ 
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
}   
</script>
</html>