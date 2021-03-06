


function  initEcharts3(s){
	var dataxAxisArr  = new Array();
	var DOU_L3M_AGData = new Array();
	var DOU_MData= new Array();

	var DOU_RAData = new Array();
	var chartDom = $("#arp_echart3")[0];
	echarts.dispose(chartDom);
	var myChart3 = echarts.init(chartDom);
	
	
	 
	var param = s ;
	 $.ajax({
		 url : $.cxt+ "/page3/echart3",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (data){
			 console.log(3);
			 console.log(data)
			 for(var i =0 ;i<data.length;i++){
				 dataxAxisArr.push(data[i].COMP_MONTH);
				 DOU_L3M_AGData.push(data[i].DOU_L3M_AG);
				 DOU_MData.push(data[i].DOU_M);
				 DOU_RAData.push((data[i].DOU_RA*100).toFixed(2));
			 }
		 }	 
	 });
	 
	 
	 option_echart3 = {
		        title:{
		            text:'订购前后DOU变化',
		            textStyle:{
			        	   color:'#fff'
			           }
		        },
		        tooltip : {
		            trigger: 'axis',
		            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		            },
		            formatter : function(params, ticket, callback){
			        	console.log(params);
			        	var t = params[0].axisValueLabel+"<br>"+
			        			params[0].marker+" "+params[0].seriesName+" : "+(params[0].value)+"<br>"+
			        			params[1].marker+" "+params[1].seriesName+" : "+ params[1].value+"<br>"+
			        			params[2].marker+" "+params[2].seriesName+" : "+ params[2].value+"%";
			        	return  t
			        } ,
			        textStyle:{
			        	   color:'#fff'
			           }
		        },
		        grid:[{
	            	left:'100px',
	            	right:'80px'
	            }],
		        legend:{
		            data :['订购前DOU','订购后DOU','提升度'],
		             align: 'right',
		             textStyle:{
			        	   color:'#fff'
			           }
		        },
		        xAxis : [
		          {
		              
		                data :dataxAxisArr,
		                axisTick: {
		                    alignWithLabel: true
		                },
		                axisLabel:{        
					        	color:'#fff',
					      
		                    },
		            }
		        ],
		        		 yAxis: [
		        		        {
		        		            type: 'value',
		        		             
		        		            splitNumber:8,
		        		            axisLabel:{        
		  					        	color:'#fff',
		  					      
		  		                    },
		        		        },
		        		        {
		        		            type: 'value',
		        
		        		            
		        		            splitLine: {     //网格线
		                             "show": false 
		        		                        },
		        		              position: 'right',
		        		              axisLabel: {
		                              formatter: '{value} %',
		                             
			  					        	color:'#fff',
			  					      
			  		              
		                              }
		        		        }
		        		    ],
		        series : [
		            {
		                name:'订购前DOU',
		                type:'bar',
		                barMaxWidth:80,
		                itemStyle: {
		                    normal: {
		                         
		                        color: '#4F81BD'
		                    }
	            		 
		                },
		                 data:DOU_L3M_AGData,
		            },
		             {
		                name:'订购后DOU',
		                type:'bar',
		                barMaxWidth:80,
		                itemStyle: {
		                    normal: {
		                         
		                        color: '#C0504D'
		                    }
		                },
		                 data:DOU_MData,
		            },
		            { symbol: 'triangle',
		                symbolSize: 15,
		                lineStyle: {
		                    normal: {
		                        color: '#98B954',
		                    },
		            		width:4
		                },
		                itemStyle: {
		                    normal: {
		                         
		                        color: '#98B954'
		                    }
		                },
		                yAxisIndex: 1,
		                name:'提升度',
		                type:'line',
		                data:DOU_RAData,
		            }
		        ]
		    };
	 myChart3.setOption(option_echart3);
	
}