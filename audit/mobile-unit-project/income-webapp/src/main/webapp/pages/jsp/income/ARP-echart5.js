


function  initEcharts5(s){
	var seriesData = [] ;
	var chartDom = $("#echart5")[0];
	echarts.dispose(chartDom);
	var myChart5 = echarts.init(chartDom);
	
	
	var param = s ;
	 $.ajax({
		 url : $.cxt+ "/page3/echart5",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (data){  
			 console.log(3);
			 console.log(data)
			 seriesData.push({
				 value: data[0].UP_FEE_30_USRS,
				 name:  ">=30"
			 });
			 seriesData.push({
				 value: data[0].UP_FEE_20_30_USRS,
				 name:  "[20,30)"
			 });	
			 seriesData.push({
				 value: data[0].UP_FEE_10_20_USRS,
				 name:  "[10,20)"
			 });
			 seriesData.push({
				 value: data[0].UP_FEE_5_10_USRS,
				 name:  "[5,10)"
			 });
			 seriesData.push({
				 value: data[0].UP_FEE_1_5_USRS,
				 name:  "[1,5)"
			 });
			 seriesData.push({
				 value: data[0].NC_FEE_0_0_USRS,
				 name:  "0"
			 });
			 seriesData.push({
				 value: data[0].DW_FEE_0_5_USRS,
				 name:  "[-5,0)"
			 }); seriesData.push({
				 value: data[0].DW_FEE_5_10_USRS,
				 name:  "[-10,5)"
			 });
			 seriesData.push({
				 value: data[0].DW_FEE_10_20_USRS,
				 name:  "[-20,-10)"
			 });
			 seriesData.push({
				 value: data[0].DW_FEE_20_30_USRS,
				 name:  "[-30,-20)"
			 });
			 seriesData.push({
				 value: data[0].DW_FEE_30_USRS,
				 name:  "<-30"
			 });
			 
			 
		 }	 
	 });
	 
	// [{value:1,name:'s'},{value:2,name:'s'}];
	 option_echart5 = {
	            title : {
	                text: '订购前后收入变化分档',
	                x:'left',
	                textStyle:{
			        	   color:'#fff'
			           }
	            },
	            tooltip : {
	                trigger: 'item',
	                formatter: "{b} : {c} ({d}%)",
	                textStyle:{
			        	   color:'#fff'
			           }
	            },
	            legend: {
	            	type :'scroll',
	                //orient: 'vertical',
	                x: 'right',
	                top:'8%',
	                data: ['>=30','[20,30)','[10,20)','[5,10)','[1,5)','0','[-5,0)','[-10,5)','[-20,-10)','[-30,-20)','<-30']
	            	, textStyle:{
			        	   color:'#fff'
			           }
	            },
	            grid:[{
	            	left:'80px',
	            	right:'80px'
	            	}]
	            ,
	            series : [
	                {
	                    name: '',
	                    type: 'pie',
	                    radius : '55%',
	                    center: ['50%', '60%'],
	                    //minAngle: 20,
	                    data:seriesData,
	                 /*   label: {
			                normal: {
			                    position: 'inner',
			                    fontSize : 12,
			                    formatter: "{a} " +
			                    		"{b} : {c} ({d}%)"
			                }
			            },*/
	                    itemStyle: {
	                        emphasis: {
	                            shadowBlur: 10,
	                            shadowOffsetX: 0,
	                            shadowColor: 'rgba(0, 0, 0, 0.5)'
	                        }
	                    }
	                }
	            ]
	        };
	 myChart5.setOption(option_echart5);
	
}