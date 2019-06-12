<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
<div style="width:100%;height: 100%; " id="idx_charts4">

</div>

<script type="text/javascript">
function initIdexChr4(date){
	var chartDom = $("#idx_charts4")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	var param = date ;
	var hyrData = [];
	var zbData = [];
		       $.ajax({
		  		 url : $.cxt+ "/page1/echart4",
		  		 data:{param:param},  
		  		 type:"POST",
		  		 async : false ,
		  		 success: function (list){
		  			  var map=list[0];
		  				  hyrData.push(map.UP_FEE_30_USRS);
			  			  hyrData.push(map.UP_FEE_20_30_USRS);
			  			  hyrData.push(map.UP_FEE_10_20_USRS);
			  			  hyrData.push(map.UP_FEE_5_10_USRS);
			  			  hyrData.push(map.UP_FEE_1_5_USRS);
			  			  hyrData.push(map.NC_FEE_0_0_USRS);
			  			  hyrData.push(map.DW_FEE_0_5_USRS);
			  			  hyrData.push(map.DW_FEE_5_10_USRS);
			  			  hyrData.push(map.DW_FEE_10_20_USRS);
			  			  hyrData.push(map.DW_FEE_20_30_USRS);
			  			  hyrData.push(map.DW_FEE_30_USRS);
			  			  zbData.push(Number(map.UP_FEE_30_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.UP_FEE_20_30_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.UP_FEE_10_20_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.UP_FEE_5_10_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.UP_FEE_1_5_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.NC_FEE_0_0_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.DW_FEE_0_5_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.DW_FEE_5_10_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.DW_FEE_10_20_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.DW_FEE_20_30_USRS_RA).toFixed(2)*100);
			  			  zbData.push(Number(map.DW_FEE_30_USRS_RA).toFixed(2)*100);
		  		 }	 
		  	 });		       
	var xAxisData = ["增收30元以上","[20,30)","[10,20)","[5,10)","[1,5)","0","[-5,0)","[-10,-5)","[-20,-10)","[-30,-20)","减收30元以上"];
	option = {
	    tooltip: {
	        trigger: 'axis',
	        formatter:'{b}'+'<br/>'+'{a0}:{c0}'+'<br/>'+'{a1}:{c1}'+'%'
	    },
	    grid:[{
	    	left:'50px',
	    	right:'50px',
	    	
	    }],
	    legend: {
	        data:['合约用户','占比'],
	        textStyle:{
	        	color:'#ffffff'
	        }
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: xAxisData,
	            axisLabel: {rotate: 40, 
	            	interval: 0,
	            	textStyle:{
	    	        	color:'#ffffff'
	    	        }	
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '合约用户',
	            nameTextStyle:{
	            	color:'#ffffff'
	            },
	            axisLabel: {
	                formatter: '{value}',
	                textStyle:{
	    	        	color:'#ffffff'
	    	        }
	            }
	        },
	        {
	            type: 'value',
	            name: '占比',
	            nameTextStyle:{
	            	color:'#fff'
	            },
	            axisLabel: {
	                formatter: '{value} %',
	                textStyle:{
	    	        	color:'#ffffff'
	    	        }
	            }
	        }
	    ],
	    series: [
	        {
	            name:'合约用户',
	            type:'bar',
	            data:hyrData,
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                        // build a color map as your need.
	                        var colorList = [
	                          '#2B91D5','#2B91D5','#2B91D5','#2B91D5','#2B91D5',
	                           '#2B91D5','#00cc33','#00cc33','#00cc33','#00cc33',
	                           '#00cc33'
	                        ];
	                        return colorList[params.dataIndex]
	                    }
	                }
	            }
	        },
	        {
	            name:'占比',
	            type:'line',
	            yAxisIndex: 1,
	            data:zbData
	        }
	    ]
	};  
	myChart.setOption(option);
}

</script>