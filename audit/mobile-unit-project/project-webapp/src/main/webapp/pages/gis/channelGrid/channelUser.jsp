<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/channelPoint.css" />
	<title>渠道覆盖常驻用户</title>
</head>
<body>
	<div class="outLine clearfix">
		<div class="outLinesTitle">
			渠道覆盖常驻用户
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
	var colName1 = [ '网格名称', '渠道名称', '基站名称', '覆盖常驻移网用户','覆盖常驻宽带用户'];
	var colModels1 = [ 
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
	setGrid('#gridInfo1', mydata, ($('.outLine').width() - 20) * 0.5, colName1, colModels1, 'grid-pager1');     
});

var setGrid = function(grid, mydata, widths, colName, colModels, pager) {
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
	var data1 = [
		{'name':'A基站','value':'40','type':'工作区域'},
        {'name':'B基站','value':'20','type':'生活区域'},
        {'name':'C基站','value':'80','type':'工作区域'},
        {'name':'D基站','value':'90','type':'生活区域'}
    ];
	var datas = [];
	for (var i = 1; i < 13; i++) {
		datas.push({
			name: String(i+":00"),
			value: 1
	    });
	}
	option = {
	  	legend: {
	    	show:false,
		},
		series: [{
	        type: 'pie',
	        startAngle:74.5,
	        hoverAnimation: false,
	        radius: ['65%', '79%'],
			itemStyle: {
				normal: {
	                color: '#91e8e1',
	            },
	            emphasis: {
	                show: false,
	                color: '#91e8e1',
	            }
	        },
	        silent: false,
	        label: {
	            normal: {
	                position: 'inner',
	                formatter: '{b}',
	                textStyle: {
	                    color: '#066c8d',
	                    fontWeight: 'bold',
	                    fontSize:14
	                }
	            },
	        },
	        labelLine: {
	            normal: {
	                show: false,
	                lineStyle: {
	                    color: '#ccc'
	                }
	            }
	        },
	        data: datas
		} ,{
			name: '',
	    	type: 'pie',
	    	silent: true,
	    	radius: [ '0%','65%'],
	    	itemStyle: {
	           	normal: {
	               	shadowColor: 'rgba(0, 0, 0, 0.4)',
	               	shadowBlur: 0
	           	}
	       	},
	        color: ['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
	        label: {
	        	normal: {
	            	position: 'inner',
	                formatter:function(data){
	                	for (var i = 1; i < data2.length; i++) {
	                	    i_=data.name+'\n'+data.data.type;
	                	    return i_;
	                	}
	                } ,
					textStyle: {
		          		color: '#066c8d',
	                    fontWeight: 'bold',
	                    fontSize:14
	                }
	            },
	        },
			data: data1
		}]
	}
	myChart.setOption(option);
}    
</script>
</html>