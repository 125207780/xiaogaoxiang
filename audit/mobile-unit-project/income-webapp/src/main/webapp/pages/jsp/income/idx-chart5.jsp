<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
<div style="width:100%;height: 100%; " id="idx_charts5">

</div>


<script type="text/javascript">
 
function initIdexChr5(date){
	var chartDom = $("#idx_charts5")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	var param = date ;
	var data=[];
		       $.ajax({
		  		 url : $.cxt+ "/page1/echart5",
		  		 data:{param:param},  
		  		 type:"POST",
		  		 async : false ,
		  		 success: function (list){
		  			  for(var i=0;i<list.length;i++){
		  				  var obj = new Object();
		  				  obj.month=parseMonth(list[i].COMP_MONTH);
		  				  obj.mou=(Number(list[i].MOU_RA)*100).toFixed(2);
		  				  obj.dou=(Number(list[i].DOU_RA)*100).toFixed(2);
		  				  data.push(obj);
		  			  }
		  			  
		  		 }	 
		  	 });
	var xAxisData = [];
	var mouData = [];
	var douData = [];
	for(var i=0,n=data.length;i<n;i++){
		var obj =data[i];
		xAxisData.push(obj.month);
		mouData.push(obj.mou);
		douData.push(obj.dou);
		
	}
	option = {
	    tooltip: {
	        trigger: 'axis',
	        formatter: '{b}'+'<br/>'+'{a0}:{c0}'+'%'+'<br/>{a1}:{c1}'+'%'
	         
	    },
	    grid:[{
	    	left:'50px',
	    	right:'50px',
	    	
	    }],
	    legend: {
	        data:['MOU提升','DOU提升'],
	        textStyle:{
	        	color:'#ffffff'
	        }
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: xAxisData,//b
	            axisLabel: {
	              	show: true,
	                textStyle:{
	    	        	color:'#ffffff'
	    	        }
	            },
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	           
	            
	            axisLabel: {
	                formatter: '{value} %',
	                textStyle:{
	    	        	color:'#ffffff'
	    	        }
	            },
	            
	        }
	    ],
	    series: [
	        {
	            name:'MOU提升',//a0
	            type:'line',
	            data:mouData,//c0
	            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter:'{c} %',
                    color:'#D53A35'
                }
            }, 
	        },
	        {
	            name:'DOU提升',
	            type:'line',
	            data:douData,
	            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter:'{c} %',
                    color:'#00E038'
                }
            }, 
	        }
	    ]
	};  
	
	myChart.setOption(option);
}

</script>