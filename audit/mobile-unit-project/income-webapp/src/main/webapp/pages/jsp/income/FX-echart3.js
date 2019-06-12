


function  initEcharts3(s){
	var dataxAxisArr  = new Array();
	var AF_MLOST_USRData = new Array();
	var AF_LOST_USRData= new Array();
	var AF_MLOST_RAData = new Array();
	var AF_LOST_RAData = new Array();
	var chartDom = $("#fx_echart3")[0];
	echarts.dispose(chartDom);
	var myChart3 = echarts.init(chartDom);
	
	
	console.log(s);
	var param = s ;
	 $.ajax({
		 url : $.cxt+ "/page5/getCharts1",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (data){
			 console.log(data)
			 for(var i =0 ;i<data.length;i++){
				 var num_mlost= data[i].AF_MLOST_RA;
				 var num_good = data[i].AF_LOST_RA;
				 dataxAxisArr.push((data[i].ACTIVE_MONTH).substring(5)+"月");
				 AF_MLOST_USRData.push(data[i].AF_MLOST_USR);//订购后流失用户
				 AF_LOST_USRData.push(data[i].AF_LOST_USR);// 订购后流失用户数
				 AF_MLOST_RAData.push((num_mlost*100).toFixed(2));//潜在流失率
				 AF_LOST_RAData.push( (num_good*10).toFixed(2));//流失率
			 }
		 }	 
	 });
	console.log(dataxAxisArr);
	console.log(AF_MLOST_USRData)
	console.log(AF_LOST_USRData)
	console.log(AF_MLOST_RAData)
	console.log(AF_LOST_RAData)
	 option_echart3 = {
		        title:{
		            text:'订购用户流失分析',
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
			        }   ,
			        textStyle:  {
		            	color:'#fff'
		            }
		        }, grid:[
		        	{
		        		top:'80px',
		        		bottom:'100px'
		        	}
		        ],
		        legend:{
		            data :['订购后流失用户','订购后流失用户数','潜在流失率','流失率'],
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
		        		           
		        		            splitNumber:5,
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
		                name:'订购后流失用户',
		                type:'bar',
		               
		                 //stack: '总量',
		                /*data:dataChengBenArr,*/
		                 data:AF_MLOST_USRData,
		                 itemStyle:{
		                	 normal:{
		                		 color:'#1089E7'
		                	 }
		                 }
		            },
		             {
		                name:'订购后流失用户数',
		                type:'bar',
		                 //stack: '总量',
		                /*data:dataShouRuArr*/
		                 data:AF_LOST_USRData,
		                 itemStyle:{
		                	 normal:{
		                		 color:'#F57474'
		                	 }
		                 }
		            },
		            {
		                name:'潜在流失率',
		                type:'line',
		                yAxisIndex:1,
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top',
		                        formatter:'{c} %',
		                        color:'#F57474',
		                        textStyle:{
		                        	color:'#fff'
		                        }
		                    }
		                },
		                data:AF_MLOST_RAData,
		            },
		            {
		                name:'流失率',
		                type:'line',
		                yAxisIndex:1,
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'top',
		                        formatter:'{c} %',
		                        color:'#1089E7',
		                        textStyle:{
		                        	color:'#fff'
		                        }
		                    }
		                },
		                data:AF_LOST_RAData,
		            }
		        ]
		    };
	 myChart3.setOption(option_echart3);
	
}