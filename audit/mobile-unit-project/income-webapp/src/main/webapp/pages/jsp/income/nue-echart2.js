 
function  queryEcharts2( statisMonth,  areaId,  prodId,  packageId){
	

	var dataxAxisArr  = new Array();
	var dataChengBenArr = new Array();
	var dataShouRuArr = new Array();
	var dataBiLi =  new Array();
	var chartDom = $("#nue_echart2")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	
	$.ajax({
		 url : $.cxt +"/page2/getCharts2",
		 data:{"statisMonth":statisMonth,"areaId":areaId,"prodId":prodId,"packageId":packageId},
		 type: "POST",
		 success:function (data){
			 for(var i = 0 ;i<data.length;i++){
				 dataxAxisArr.push(data[i].COMP_MONTH); //['1月','2月','3月','4月','5月','6月','7月','8月','9月']
				 dataChengBenArr.push(data[i].COST_FEE_TOTAL);  //['189','193','208','217','217','206','327','193','185']
				 dataShouRuArr.push(data[i].INCOME_FEE_TOTAL);
				 dataBiLi.push((data[i].OUT_IN_RA*100).toFixed(2));
			 }
			 var option = {
					 /*title:{
				            text:'当月月总成本与收入',
				            textStyle:{
					        	color:'#fff',
					        }
				        },*/
				        tooltip : {
				            trigger: 'axis',
				            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				            },
				        formatter : function(params, ticket, callback){
				        	var t = params[0].axisValueLabel+"<br>"+
				        			params[0].marker+" "+params[0].seriesName+" : "+(-params[0].value)+"<br>"+
				        			params[1].marker+" "+params[1].seriesName+" : "+ params[1].value+"<br>"+
				        			params[2].marker+" "+params[2].seriesName+" : "+ params[2].value+"%";
				        	return  t
				        },
				        textStyle:{
				        	color:'#ffffff',
				        }
				        },
				        legend:{
				            data :['当月合计成本','当月合计收入','当月合计投入产出比'],
				             align: 'right',
				            /* right:1,*/
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
				                axisLabel: {
				                	show: true,
				                    color: '#fff'
				                
					            }
				            }
				        ],
				        		 yAxis: [
				        		        {
				        		            type: 'value',
				        		            splitNumber:8,
				        		            axisLabel: {
								                //formatter: '{value}',
							                	show: true,
							                	color: '#fff'
							                  
								            },
				        		        },
				        		        {
				        		            type: 'value',
				        		            splitLine: {     //网格线
				        		            	"show": false 
	        		                          },
				        		              position: 'right',
				        		              axisLabel: {
				        		            	  formatter: '{value} %'
				                              },
				                              axisLabel: {
									                //formatter: '{value}',
								                	show: true,
								                    color: '#fff'
								                 
									            },
				        		        }
				        		    ],
				        series : [
				            {
				                name:'当月合计成本',
				                type:'bar',
				                barMaxWidth:80,
				                stack: '总量',
				                data:dataChengBenArr,
				                itemStyle: {
					                    normal: {
					                        color: '#1089E7'
					                    }
				            		 
					                },
				            },
				             {
				                name:'当月合计收入',
				                type:'bar',
				                barMaxWidth:80,
				                stack: '总量',
				                itemStyle: {
					                    normal: {
					                        color: '#F57474'
					                    }
					                },
				                 data:dataShouRuArr,
				            },
				            {
				                name:'当月合计投入产出比',
				                type:'line',
				                yAxisIndex: 1,
				                symbol: 'triangle',
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
				                data:dataBiLi,
				            }
				        ]
				    }
			 myChart.setOption(option);
		 }
	}); 
	
}