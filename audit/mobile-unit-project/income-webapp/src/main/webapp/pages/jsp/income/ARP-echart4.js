


function  initEcharts4(s){
	var seriesData = [] ;
	var chartDom = $("#echart4")[0];
	echarts.dispose(chartDom);
	var myChart4 = echarts.init(chartDom);
	
	
 
	var param = s ;
	 $.ajax({
		 url : $.cxt+ "/page3/echart4",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (data){  //UP_FEE_USRS, -- 增收用户
		       						//NC_FEE_USRS, --  收入没变化用户
		      						// DW_FEE_USRS, -- 降收用户
									   // UP_FEE_USRS_RA, -- 增收用户占比 
								       // NC_FEE_USRS_RA, -- 收入没变化用户占比 
								       // DW_FEE_USRS_RA  -- 降收用户占比 
			 
			 seriesData.push({
				 value: data[0].UP_FEE_USRS,
				 name:  "增收用户"
			 });
			 seriesData.push({
				 value: data[0].NC_FEE_USRS,
				 name:  "收入不变"
			 });	
			 seriesData.push({
				 value: data[0].DW_FEE_USRS,
				 name:  "降收用户"
			 });
			 
		 }	 
	 });
	 
	// [{value:1,name:'s'},{value:2,name:'s'}];
	 option_echart4 = {
	            title : {
	                text: '订购前后ARPU变化',
	                x:'left',
	                textStyle:{
			        	   color:'#fff'
			           }
	            },
	            grid:[{
	            	left:'80px',
	            	right:'80px'
	            }],
	            tooltip : {
	                trigger: 'item',
	                formatter :"{b}:{c}({d}%)",
	                textStyle:{
			        	   color:'#fff'
			           }
	            },
	            legend: {
	            	type :'scroll',
	                left: 'right',
	                top:'8%',
	                data: ['增收用户','收入不变','降收用户'],
	                textStyle:{
			        	   color:'#fff'
			           }
	            },
	            color:["#1089E7",'#F57474','#52D0E6'],
	            series : [
	                {
	                    name: '',
	                    type: 'pie',
	                    radius : '55%',
	                    center: ['50%', '60%'],
	                    //minAngle: 20,
	                    data:seriesData,
	                    label: {
			                normal: {
			                    position: 'inner',
			                    fontSize : 12,
			                    formatter:  "{b},\n {c} ,{d}%",
			                    
			                }
			            },
	                     
	                }
	            ]
	        };
	 myChart4.setOption(option_echart4);
	
}