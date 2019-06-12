<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	<title>渠道异常识别</title>
</head>
<body>
	<div class="outLine clearfix">
		<div class="outLinesTitle">
			渠道异常识别
			<div class="orner orner1"></div>
			<div class="orner orner2"></div>
			<div class="orner orner3"></div>
			<div class="orner orner4"></div>
		</div>
		
		<div class="gridCon">
			<div class="grid">
	            <table id="gridInfo1"></table>
	            <div id="grid-pager1"></div> 
	        </div>
		</div>
		<div class="lineChart" id="lineChart">
			
		</div>
	</div>
</body>
<script>
$(function(){
	jkChart();
	var colName1 = [ '渠道类型', '渠道编码', '渠道名称', '养卡用户','渠道刷量','留存用户','低价设备排名','WIFI网络使用','注册昵称','注册手机号码归属'];
	var colModels1 = [ 
		{ name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
      	{ name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
      	{ name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
      	{ name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
      	{ name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
      	{ name: 'invdate', index: 'invdate', width: 80, align: 'center'}, 
      	{ name: 'nameB', index: 'nameB', width: 70,align: 'center'}, 
      	{ name: 'amount', index: 'amount', width: 100, formatter: 'number', align: 'center'}, 
      	{ name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'},
      	{ name: 'tax', index: 'tax', width: 70, formatter: 'number', align: 'center'}
  	];
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
	setGrid('#gridInfo1', mydata,$('.outLine').width()-20, colName1, colModels1, 'grid-pager1');     
});

var setGrid = function(grid, mydata, widths, colName, colModels, pager){
	$(grid).jqGrid({ 
        datatype: 'local', 
        data: mydata, 
        width: widths,
        height: $(window).height() - 200,
        colNames:colName, 
        colModel: colModels, 
        rowNum: 15, 
        rowList: [10, 15, 20, 30], 
        pager: "#" + pager, 
        gridview: false, 
        viewrecords: false, 
        gridComplete: function() { 
      
       } 
    }); 
     $("#first_" + pager).find("span").addClass("bigger-150 fa fa-angle-double-left");
	 $("#prev_" + pager).find("span").addClass("bigger-150 fa fa-angle-left");
	 $("#next_" + pager).find("span").addClass("bigger-150 fa fa-angle-right");
	 $("#last_" + pager).find("span").addClass("bigger-150 fa fa-angle-double-right");
	
}
var jkChart = function(){
	var myChart = echarts.init(document.getElementById('lineChart'));	
	var data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'];
	var data1 = ['75', '23', '65', '25', '54', '34', '45', '12', '33', '43'];
	var data2 = ['25', '43', '45', '35', '34', '24', '35', '22', '23', '13'];
	var data3 = ['45', '23', '55', '45', '44', '14', '25', '32', '43', '33'];
	option = {
		title: {
		    text: '',
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
		    name: '刷量用户',
		    type: 'line',
		    barWidth : 10,
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
	  	},
	  	{
			name: '留存用户',
		    type: 'line',
		    barWidth : 10,
		    silent: true,
		    itemStyle: {
	        	normal: {
	                barBorderRadius: [5, 5, 0, 0],
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'green'
	                }, {
	                    offset: 1,
	                    color: 'green'
	                }]),
	                shadowColor: 'rgba(0, 0, 0, 0.4)',
	                shadowBlur: 20
	            }
	        },
		    data: data2
		},
		{
			name: '周边地区放号',
			type: 'line',
			barWidth : 10,
			silent: true,
			itemStyle: {
				normal: {
					barBorderRadius: [5, 5, 0, 0],
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
		          		color: 'yellow'
		       		}, {
		          		offset: 1,
		          		color: 'yellow'
		      		}]),
		    		shadowColor: 'rgba(0, 0, 0, 0.4)',
		      		shadowBlur: 20
		 		}
			},
			data: data3
		}]
	};
	myChart.setOption(option);
}    
</script>
</html>