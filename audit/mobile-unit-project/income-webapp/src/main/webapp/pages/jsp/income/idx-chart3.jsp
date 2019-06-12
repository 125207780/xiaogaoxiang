<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
<div style="width:100%;height: 100%; " id="idx_charts3">

</div>


<script type="text/javascript">
function initIdexChr3(date){
	var chartDom = $("#idx_charts3")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	var param = date ;
	var data=[];
	 $.ajax({
		 url : $.cxt+ "/page1/echart3",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (list){
			  for(var i=0;i<list.length;i++){
				  var obj = new Object();
				  obj.month=parseMonth(list[i].COMP_MONTH);
				  obj.dguser=list[i].COST_FEE_TOTAL;
				  obj.zwuser=list[i].INCOME_FEE_TOTAL;
				  var rate=Number(list[i].OUT_IN_RA)*100;
				  obj.chl=rate.toFixed(2);
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
	    		left:'70px',
	    		right:'70px',
	    	}
	    ],
	    legend: {
	        data:['投入','产出','投入产出比'],
	        textStyle:{
	        	color:'#fff'
	        }
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: xAxisData,
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
	            name: '投入/产出',
	            nameTextStyle:{
	            	color:'#ffffff'
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
	            name: '投入产出比',
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
	            name:'投入',
	            type:'bar',
	            
	            data:dgUserData,
	            itemStyle:{
	            	normal:{
	            		color:'#1D308E'
	            	}
	            }
	        },
	        {
	            name:'产出',
	            type:'bar',
	            data:zwuerData,
	            itemStyle:{
	            	normal:{
	            		color:'#009EBC'
	            	}
	            }
	        },
	        {
	            name:'投入产出比',
	            type:'line',
	            yAxisIndex: 1,
	            data:chlData
	        }
	    ]
	};  
	
	myChart.setOption(option);
}
function parseMonth(cellValue){
	
	
	return cellValue.substring(4)+"月";
	
	
}
</script>