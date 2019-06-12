


function  initEcharts1(s){
	var dataxAxisArr  = new Array();
	var ORDER_USRdata = new Array();
	var ONNET_TX_USRdata= new Array();

	var live_radata = new Array();
	
	var chartDom = $("#echart1")[0];
	echarts.dispose(chartDom);
	var myChart1 = echarts.init(chartDom);
	
	
	console.log(s);
	var param = s ;
	 $.ajax({
		 url : $.cxt+ "/page4/getCharts1",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (data){
			 console.log(data)
			 for(var i =0 ;i<data.length;i++){
				 var num= data[i].LIVE_RA;
				 dataxAxisArr.push(data[i].ACTIVE_MONTH);
				 ORDER_USRdata.push(data[i].ORDER_USR);
				 ONNET_TX_USRdata.push(data[i].ONNET_TX_USR);
				 live_radata.push((num*100).toFixed(2));
				 console.log(typeof(data[i].LIVE_RA))
			 }
		 }	 
	 });
	console.log(dataxAxisArr);
	console.log(ORDER_USRdata);
	console.log(ONNET_TX_USRdata);
	console.log(live_radata);
	
	 option_echart1 = {
		        title:{
		            text:'各账期订购用户在本月存活率',
		            textStyle:{
			        	color:'#fff',
			        	//fontSize:'14px'
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
			        }   ,
			        textStyle:{
			        	color:'#fff',
			        	//fontSize:'14px'
			        }
		        },
		        grid:[{
		        	top:'50px',
		        	bottom:'100px',
		        }],
		        legend:{
		            data :['订购用户','截至当前账期仍通信在网用户','存活率'],
		             align: 'right',
		             right:1,
		             textStyle:{
				        	color:'#fff',
				        }
		        },
		        xAxis : [
		          {
		        	  	type : 'category',
		                data :dataxAxisArr,
		                axisLabel:{  
		                    interval:0,//横轴信息全部显示  

		                    rotate:-45,//-90度角倾斜显示  
		                    textStyle:{
					        	color:'#fff',
					        	//fontSize:'14px'
					        }
		                    },
		            }
		        ],
		        		 yAxis: [
		        		        {
		        		            type: 'value',
		        		            max: 140000,
		        		            min: 0,
		        		            splitNumber:8,
		        		            axisLabel:{  
		        		            	 textStyle:{
		     					        	color:'#fff',
		     					        	}
		        		            }
		        		        },
		        		        {
		        		            type: 'value',
		        
		        		            max: 105,
		        		            min: 75,
		        		            splitLine: {     //网格线
		                             "show": false 
		        		                        },
		        		              position: 'right',
		        		              axisLabel: {
		                              formatter: '{value} %',
		                              textStyle:{
		     					        	color:'#fff',
		     					        	}
		                              }
		        		        }
		        		    ],
		        series : [
		            {
		                name:'订购用户',
		                type:'bar',
		                 //stack: '总量',
		                /*data:dataChengBenArr,*/
		                 data:ORDER_USRdata,
		                 itemStyle:{
		                	 normal:{
		                		 color:'#1089E7'
		                	 }
		                 }
		            },
		             {
		                name:'截至当前账期仍通信在网用户',
		                type:'bar',
		              
		                 //stack: '总量',
		                /*data:dataShouRuArr*/
		                 data:ONNET_TX_USRdata,
		                 itemStyle:{
		                	 normal:{
		                		 color:'#F57474'
		                	 }
		                 }
		            },
		            {
		                name:'存活率',
		                type:'line',
		                yAxisIndex:1,
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top',
		                        formatter:'{c} %'
		                    }
		                },
		                data:live_radata,
		            }
		        ]
		    };
	 myChart1.setOption(option_echart1);
	
}