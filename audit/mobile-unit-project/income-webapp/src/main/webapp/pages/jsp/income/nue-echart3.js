 
function queryEcharts3( statisMonth,  areaId,  prodId,  packageId){
	
	var chartDom = $("#nue_echart3")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	
	var legendData = [];
	var pieData = [];
	$.ajax({
		 url : $.cxt +"/page2/getCharts3",
		 data:{"statisMonth":statisMonth,"areaId":areaId,"prodId":prodId,"packageId":packageId},
		 type: "POST",
		 success:function (data){
			 for(var i = 0 ;i<data.length;i++){
				 legendData.push(data[i].ACTIVE_MONTH); //['1月','2月','3月','4月','5月','6月','7月','8月','9月']
				 pieData.push({value: data[i].COST_FEE,name:data[i].ACTIVE_MONTH});  //['189','193','208','217','217','206','327','193','185']
				 
			 }
			 var option = { 
			            title : {
			                text: '当月成本构成',
			                x:'left',
			                textStyle:{
					        	color:'#fff',
					        }
			            },
			            tooltip : {
			                trigger: 'item',
			                formatter: "{a} <br/>{b} : {c} ({d}%)"
			                
			                
			            },
			            legend: {
			            	type :'scroll',
			                //orient: 'vertical',
			                x: 'right',
			                top:'8%',
			                data: legendData,
			                formatter: function(params) {
			            		if(params.indexOf('订购') == -1){
			            		    return params;
			            		}else{
			            		  return ''+params.split('订购')[0]+'\n'+params.split('订购')[1];
			            		}
			            	},
			                textStyle:{
					        	color:'#fff',
					        }
			            },
			           // color:["#1089E7",'#F57474','#52D0E6'],
			            series : [
			                {
			                    name: '',
			                    type: 'pie',
			                    radius : '45%',
			                    center: ['50%', '50%'],
			                    data:pieData,
			                    itemStyle: {
			                        emphasis: {
			                            shadowBlur: 10,
			                            shadowOffsetX: 0,
			                            shadowColor: 'rgba(0, 0, 0, 0.5)'
			                        }
			                    },
			                    
			                }
			            ]
				    }
			 myChart.setOption(option);
		 }
	}); 
	
	 
}