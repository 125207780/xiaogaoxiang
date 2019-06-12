<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
 
 
<div style="width:100%;height: 100%; padding: 5px;" id="idx_charts1">

</div>


<script type="text/javascript">

function initIdexChr1(date){
	var chartDom = $("#idx_charts1")[0];
	echarts.dispose(chartDom);
	var myChart = echarts.init(chartDom);
	var param = date ;
	var data=[];
	var max=0;
	$.ajax({
		 url : $.cxt+ "/page1/echart1",
		 data:{param:param},  
		 type:"POST",
		 async : false ,
		 success: function (map){
			 data = [{name:"投入产出比",value:87},{name:"ARPU提升率",value:76},{name:"增收用户比",value:40},{name:"MOU提升率",value:50}
			,{name:"DOU提升率",value:64},{name:"存活率",value:89},{name:"潜在流失率",value:64},{name:"潜在流失存活率",value:66}];
			 data[0].value=map.OUT_IN_RA_SCORE;
			 data[1].value=map.ARPU_RA_SCORE;
			 data[2].value=map.INCOME_RA_SCORE;
			 data[3].value=map.MOU_RA_SCORE;
			 data[4].value=map.DOU_RA_SCORE;
			 data[5].value=map.SURVIVAL_RA_SCORE;
			 data[6].value=map.LURK_LOST_RA_SCORE;
			 data[7].value=map.LURK_LIVE_RA_SCORE;
			 var numdata=[map.OUT_IN_RA_SCORE,map.ARPU_RA_SCORE,map.INCOME_RA_SCORE,map.MOU_RA_SCORE,map.DOU_RA_SCORE,map.SURVIVAL_RA_SCORE,map.LURK_LOST_RA_SCORE,map.LURK_LIVE_RA_SCORE];
			 max=Math.ceil(findMax(numdata));
		 }	 
	 });
	/* var data = [{name:"投入产出比",value:87},{name:"ARPU提升率",value:76},{name:"增收用户比",value:40},{name:"MOU提升率",value:50}
	,{name:"DOU提升率",value:64},{name:"存活率",value:89},{name:"潜在流失率",value:64},{name:"潜在流失率",value:66}] */
	var radarData = [];
	var indicator = [];
	console.log(data);
	var data1=data;
	for(var i=0,n=data.length;i<n;i++){
		if(i==0){
			indicator.push({text:data[i].name, axisLabel:{
	               show:true,
	               color:"#fff"
	            },
	          min:0,
	          max:max
			})
		}else{
			indicator.push({text:data[i].name,min:0,
		          max:max})
		}
		radarData.push(data[i].value);
	}
	
	var option = {
			tooltip: {
		        trigger: 'item',
		        //formatter: "{a} <br/>{b}: {c0} "
		        formatter: function (params) { 
		        	var list=params.value;
		        	var html="";
		        	html+="投入产出比"+":"+(100*list[0]).toFixed(2)+"%"+"<br>";
		        	html+="ARPU提升率"+":"+(100*list[1]).toFixed(2)+"%"+"<br>";
		        	html+="增收用户比"+":"+(100*list[2]).toFixed(2)+"%"+"<br>";
		        	html+="MOU提升率"+":"+(100*list[3]).toFixed(2)+"%"+"<br>";
		        	html+="DOU提升率"+":"+(100*list[4]).toFixed(2)+"%"+"<br>";
		        	html+="存活率"+":"+(100*list[5]).toFixed(2)+"%"+"<br>";
		        	html+="潜在流失率"+":"+(100*list[6]).toFixed(2)+"%"+"<br>";
		        	html+="潜在流失存活率"+":"+(100*list[7]).toFixed(2)+"%"+"<br>";
		        	return html;
		        },
		        textStyle:{
		        	color:'#ffffff',
		        }
 
		     },
		    legend: {
		        data: ['比率'],
		        textStyle:{
		        	color:'#ffffff'
		        }
		    }, 
			radar: [
		        {	
		        	name:{
		        		color:"#fff"
		        	},
		            indicator:indicator,
		            center: ['50%', '50%'],
		            radius: "50%",
		        	 splitArea: {
		                 areaStyle: {
		                     color: ['rgba(1, 145, 185, 1)',
		                     'rgba(1, 139, 180, 0.9)', 'rgba(0, 129, 173, 0.8)',
		                     'rgba(1, 110, 159, 0.7)', 'rgba(1, 80, 138, 6)'],
		                      
		                 }
		             },
		             axisLine: {
		                 lineStyle: {
		                     color: '#0099c7'
		                 }
		             },
		             splitLine: {
		                 lineStyle: {
		                     color: 'rgba(255, 255, 255, 0)'
		                 }
		             }
		        }
		    ],
		    series: [
		        {
		            name:'比率',
		            type: 'radar',
		            data: [
		                {
		                    value: radarData,
		                    itemStyle:{ normal:{color:'#38def0'} },
		                    label: {                    // 单个拐点文本的样式设置                            	                    
		                    	normal: {  	                        
		                    		show: true,
		                    		color: '#fff',
		                    	}
				          },    
		                }
		            ]
		        }
		    ]
	}
	
	myChart.setOption(option);
}
function findMax(arr)	{
	
	return Math.max.apply(Math,arr);
		}

</script>