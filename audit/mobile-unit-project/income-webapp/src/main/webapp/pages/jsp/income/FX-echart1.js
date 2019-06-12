


function  initEcharts1(s){
	var dataxAxisArr  = new Array();
	var BF_MLOST_USRData = new Array();
	var AF_ONNET_TX_USRData= new Array();

	var BF_MLOST_RAData = new Array();
	var BF_GOOD_RAData = new Array();
	var chartDom = $("#fx_echart1")[0];
	echarts.dispose(chartDom);
	var myChart1 = echarts.init(chartDom);
	
	
	console.log(s);
	var param = s ;
	 $.ajax({
		 url : $.cxt+ "/page5/getCharts1",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (data){
			
			 for(var i =0 ;i<data.length;i++){
				 var num_mlost= data[i].BF_MLOST_RA;
				 var num_good = data[i].BF_GOOD_RA;
				 dataxAxisArr.push((data[i].ACTIVE_MONTH).substring(5)+"月");
				 BF_MLOST_USRData.push(data[i].BF_MLOST_USR);//订购潜在流失用户
				 AF_ONNET_TX_USRData.push(data[i].AF_ONNET_TX_USR);//在网用户
				 BF_MLOST_RAData.push((num_mlost*100).toFixed(2));//潜在流失用户存活率
				 BF_GOOD_RAData.push( (num_good*100).toFixed(2));//正常用户存活率
			 }
		 }	 
	 });
	console.log(dataxAxisArr);
	console.log(BF_MLOST_USRData)
	console.log(AF_ONNET_TX_USRData)
	console.log(BF_MLOST_RAData)
	console.log(BF_GOOD_RAData)
	 option_echart1 = {
		        title:{
		            text:'潜在流失用户订购营销活动后的存活率',
		            textStyle:  {
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
			        			params[2].marker+" "+params[2].seriesName+" : "+ params[2].value+"%"+"<br>"+
			        			params[3].marker+" "+params[3].seriesName+" : "+ params[3].value+"%";
			        	return  t
			        }    ,
			        textStyle:  {
		            	color:'#fff'
		            }
		        },
		        grid:[
		        	{
		        		top:'80px',
		        		bottom:'100px'
		        	}
		        ],
		        legend:{
		            data :['订购前潜在流失用户','订购后仍通信在网用户','潜在流失用户存活率','正常用户存活率'],
		             align: 'right',
		             top:30,
		             textStyle:  {
			            	color:'#fff'
			            }
		        },
		        xAxis : [
		          {
		              
		                data :dataxAxisArr,
		                axisTick: {
		                    alignWithLabel: true
		                },
		                axisLabel: {
			                //formatter: '{value}',
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
		        		            
		        		            min: 0,
		        		            splitNumber:6,
		        		            axisLabel: {
						                //formatter: '{value}',
					                	show: true,
						                textStyle: {
					                        color: '#fff'
					                    }
						            }
		        		        },
		        		        {
		        		            type: 'value',
		        
		        		          
		        		           min:0,
		        		            splitLine: {     //网格线
		                             "show": false 
		        		                        },
		        		              position: 'right',
		        		              axisLabel: {
		                              formatter: '{value} %',
		                              textStyle: {
					                        color: '#fff'
					                    }
		                              }
		        		        }
		        		    ],
		        series : [
		            {
		                name:'订购前潜在流失用户',
		                type:'bar',
		               
		                 //stack: '总量',
		                /*data:dataChengBenArr,*/
		                 data:BF_MLOST_USRData,
		                 itemStyle:{
		                	 normal:{
		                		 color:'#F57474'
		                	 }
		                 }
		            },
		             {
		                name:'订购后仍通信在网用户',
		                type:'bar',
		                 //stack: '总量',
		                /*data:dataShouRuArr*/
		                 data:AF_ONNET_TX_USRData,
		                 itemStyle:{
		                	 normal:{
		                		 color:'#1089E7'
		                	 }
		                 }
		            },
		            {
		                name:'潜在流失用户存活率',
		                type:'line',
		                yAxisIndex:1,
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top',
		                        formatter:'{c} %',
		                        textStyle:{
		                        	color:'#fff'
		                        }
		                    }
		                },
		                data:BF_MLOST_RAData,
		            },
		            {
		                name:'正常用户存活率',
		                type:'line',
		                yAxisIndex:1,
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top',
		                        formatter:'{c} %',
		                        textStyle:{
		                        	color:'#fff'
		                        }
		                    }
		                },
		                data:BF_GOOD_RAData,
			            itemStyle:{
			            	normal:{
			            		color:'#DF8686'
			            	}
			            }     
		            }
		        ]
		    };
	 myChart1.setOption(option_echart1);
	
}