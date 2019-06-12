<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
<div style="width:100%;height: 100%; " id="idx_charts2">

</div>


<script type="text/javascript">
//initIdexChr2();
function initIdexChr2(date){
	var chartDom = $("#idx_charts2")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	var param = date ;
	var data=[];
	 $.ajax({
		 url : $.cxt+ "/page1/echart2",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (list){
			  for(var i=0;i<list.length;i++){
				  var obj = new Object();
				  obj.month=parseMonth(list[i].ACTIVE_MONTH);
				  obj.dguser=list[i].ORDER_USR;
				  obj.zwuser=list[i].ONNET_TX_USR;
				  obj.chl=Number(list[i].SURVIVAL_RA).toFixed(2)*100;
				  data.push(obj);
			  }
		 }	 
	 });
	/* var data = [{month:"1月",dguser:18065,zwuser:17640,chl:97.65},
		{month:"2月",dguser:21404,zwuser:21128,chl:98.71},
		{month:"3月",dguser:14034,zwuser:13965,chl:99.51},
		{month:"4月",dguser:13546,zwuser:13437,chl:99.20},
		{month:"5月",dguser:12258,zwuser:12156,chl:99.17},
		{month:"6月",dguser:15317,zwuser:15208,chl:99.29},
		{month:"7月",dguser:11934,zwuser:11869,chl:99.46},
		{month:"8月",dguser:9400 ,zwuser:9381 ,chl:99.80},

		       ]; */
	var xAxisData = [];
	var dgUserData = [];
	var zwuerData = [];
	var chlData = [];
	for(var i=0,n=data.length;i<n;i++){
		var obj =data[i];
		xAxisData.push(obj.month);
		dgUserData.push(obj.dguser);
		zwuerData.push(obj.zwuser);
		chlData.push(obj.chl);
	}
	option = {
	    tooltip: {
	        trigger: 'axis',
	        formatter:'{b}'+'<br/>'+'{a0}:{c0}'+'<br/>'+'{a1}:{c1}'+'<br/>'+'{a2}:{c2}'+'%'
	    },
	    grid:[
	    	{
	    		left:'50px',
	    		right:'50px',
	    	}
	    ],
	    legend: {
	        data:['订购用户','通信在网客户','存活率'],
	        textStyle:{
	        	color:'#ffffff'
	        }
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data:xAxisData,
	            axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '用户数',
	            nameTextStyle:{
	            	color:'#fff'
	            },
	            
	            axisLabel: {
	                formatter: '{value}',
	                textStyle: {
                        color: '#fff'
                    }
	            }
	        },
	        {
	            type: 'value',
	            name: '存活率',
	            nameTextStyle:{
	            	color:'#fff'
	            },
	            
	            axisLabel: {
	                formatter: '{value} %',
	                textStyle: {
                        color: '#fff'
                    }
	            }
	        }
	    ],
	    series: [
	        {
	            name:'订购用户',
	            type:'bar',
	            data:dgUserData,

	            itemStyle:{
                    normal:{
                        color:'#1089E7'    
                    }
                },
	        },
	        {
	            name:'通信在网客户',
	            type:'bar',
	            data:zwuerData,
	            itemStyle:{
                    normal:{
                        color:'#F57474'    
                    }
                },
	        },
	        {
	            name:'存活率',
	            type:'line',
	            yAxisIndex: 1,
	            data:chlData
	        }
	    ]
	};  
	
	myChart.setOption(option);
}
function strToNum(cellValue){
	
	var num = Math.round(parseFloat(cellValue) * 100);
	return num + "%";
	
	
}
function parseMonth(cellValue){
	
	return cellValue.substring(4)+"月";
	
}
</script>