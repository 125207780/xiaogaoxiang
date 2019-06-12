 
function queryEcharts4( statisMonth,  areaId,  prodId,  packageId){
	
	var chartDom = $("#nue_echart4")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	
	var legendData = [];
	var pieData = [];
	$.ajax({
		 url : $.cxt +"/page2/getCharts4",
		 data:{"statisMonth":statisMonth,"areaId":areaId,"prodId":prodId,"packageId":packageId},
		 type: "POST",
		 success:function (data){
			 for(var i = 0 ;i<data.length;i++){
				 legendData.push(data[i].ACTIVE_MONTH); 
				 pieData.push({value: data[i].INCOME_FEE,name:data[i].ACTIVE_MONTH}); 
				 
			 }
			 var option = { 
			            title : {
			                text: '当月收入构成',
			                x:'left',
			                textStyle: {
		                        color: '#fff'
		                    }
			            },
			            tooltip : {
			                trigger: 'item',
			                formatter: "{a} <br/>{b} : {c} ({d}%)",
			                textStyle: {
		                        color: '#fff'
		                    }
			                
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
			                textStyle: {
		                        color: '#fff'
		                    }
			            },
			            //color:["#1089E7",'#F57474','#52D0E6'],
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
			                    }
			                }
			            ]
				    }
			 myChart.setOption(option);
		 }
	}); 
	
	 
}