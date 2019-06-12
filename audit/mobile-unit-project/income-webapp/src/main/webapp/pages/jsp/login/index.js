$(function(){
	rangeCharts();//环形图
	mypieChart();//饼形图
	myBarChart();//柱状图
	myLineBarChart();//折线图
	doubleBar();//
	barCharts1();
	barCharts2();
	barCharts3();
	barCharts4();
});

function rangeCharts(){
	var myRangeChart = echarts.init(document.getElementById('rangChart'));
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    color:[ '#f66763','#fdad03','#a7e3d6'],
		    legend: {
		        orient: 'vertical',
		        x:'55%',
		        y:10,
		        textStyle: {
				    color:'#fff'
				},
		        itemGap:3,
		        itemWidth:5,
		        itemHeight:5,
		        radius : '100%',
		        data: ['标题1','标题2','标题3'],
		        textStyle:{
	       			 color:'#666'
	    		},
		        formatter:function(name){
		        	var oa = option.series[0].data;
		        	var num = oa[0].value + oa[1].value + oa[2].value;
		        	for(var i = 0; i < option.series[0].data.length; i++){
	                    if(name==oa[i].name){
	                    	return (oa[i].value/num * 100).toFixed(0) + '%'  + '      ' + name;
	                    }
		        	}
		        }
		    },
		    series:[
		        {
		            name: '标题一',
		            type: 'pie',
		            //radius : '65%',
		            radius: ['60%', '80%'],
		            center: ['30%', '50%'],
		            color:[ '#f66763','#fdad03','#a7e3d6'],
		            data:[
		                {value:3, name:'标题1'},
		                {value:5, name:'标题2'},
		                {value:20, name:'标题3'}
		            ],
		            label: {
	            		normal: {
	        				show:false
	            		}
	        		}
	              
		        }
		    ]
		};
	myRangeChart.setOption(option);
}


function mypieChart(){
  	var mypieChart = echarts.init(document.getElementById('pieChart'));
    var option = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	       // position: [25, 10]
	    },
	    
	    legend: {
	        orient: 'vertical',
	        x:'55%',
	        y:21,
	        textStyle: {
			    color:'#666'
			},
	        itemGap:3,
	        itemWidth:5,
	        itemHeight:5,
	        data: ['指标1','指标2'],
	        formatter:function(name){
	        	var oa = option.series[1].data;
	        	var num = oa[0].value + oa[1].value ;
	        	for(var i = 0; i < option.series[1].data.length; i++){
                    if(name==oa[i].name){
                    	return (oa[i].value/num * 100).toFixed(0) + '%'  + '      ' + name;
                    }
	        	}
	        }
	    },
	    series : [
	         {
	            name: '指标',
	            type: 'pie',
	            radius : '80%',
	            center: ['30%', '50%'],
	            hoverAnimation: false,
        		legendHoverLink:false,
	            color:['#6ac6f9','#f4d169'],
	            data:[
	                {value:3, name:''},
                	{value:5, name:''}
	            ],
				label: {
		                normal: {
		                    position: 'inner'
		                }
		            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	             tooltip: {
            			show:false
        		}
	        },
	        {
	            name: '指标',
	            type: 'pie',
	            radius : '75%',
	            center: ['30%', '50%'],
	            color:['#3dabff','#f3c334'],
	            data:[
	                {value:3, name:'指标1'},
	                {value:5, name:'指标2'}
	            ],
	            label:{ 
                    normal:{show:false}
               }
	        }
	    ]
	};
	
    mypieChart.setOption(option);
 }


function myBarChart(){
	var myBarChart = echarts.init(document.getElementById('barCharts'));
	var data = ['坐标1','坐标2','坐标3','坐标4','坐标5','坐标6'];
	var data1 = ['75','23','65','45','54','45'];
	var data2 = ['23','44','24','34','23','23'];
	option = {
	  title: {
	    text: '',
	    left: 20,
	    top: 20
	  },
	  grid: {
	    right: 10,
	    left: 10,
	    top: '10px',
	    bottom: '5px'
	
	  },
	  tooltip: {
	    trigger: 'axis',
	    axisPointer: {
	      type: 'shadow',
	    }
	  },
	  legend: {
	    left: '30%',
	    top: '10px',
	    itemWidth:10,
	    show:false,
	    itemHeight:10,
	    textStyle: {
				    color:'#666666'
				},
	    data: ['指标1', '指标2']
	  },
	 xAxis: {
	    name:'',
	    show:false,
	    triggerEvent: false,
	    data: data,
	    axisLabel: {
	      interval: 0,
	      show: false,
	      textStyle: {
	        color: "#7b859b"
	      }
    },
    axisTick: {
        show: false
    },
    axisLine: {
      lineStyle: {
        show: false,
        color: "#666666",
        width: 1
      		}
    },
    splitLine:{ 
               show:false
              }
	},
    yAxis: [{
      name: '',
      show:false,
      type: 'value',
      nameTextStyle: {
        "color": "#3dabff"
      }
    },
    {
      axisLine: {
          show:false,
          lineStyle: {
          color: "#3dabff",
          width: 2
        }
      }
    }
  ],
	series: [{
	    name: '指标1',
	    type: 'bar',
	    silent: true,
	    itemStyle: {
	      normal: {
	        color: '#fa9695'
	      }
	    },
	    data: data1
	  }, {
	    name: '指标2',
	    type: 'bar',
	    silent: true,
	    itemStyle: {
	      normal: {
	        color: '#f9bbbb'
	      }
	    },
	    data:data2
	  }]
};
	// 使用刚指定的配置项和数据显示图表。
	myBarChart.setOption(option);
}


function myLineBarChart(){
	var myLineBarChart = echarts.init(document.getElementById('lineBar'));
	var option = {
            tooltip : {
            	trigger: 'axis',
            	axisPointer: {
            		type: 'line',
            		label: {
            			// backgroundColor: '#6a7985'
            		},
            itemStyle: {
                        normal: {
                            color:'#f3c334'
                        }
                    },
            	}
        },
        legend: {
            //data:['bar1']
        },
        grid: {
    	    right: 10,
    	    left: 10,
    	    top: '10px',
    	    bottom: '5px'
    	
    	  },
        xAxis: {
            type: 'category',
            show:false,//屏蔽x轴
            axisLine: { 
                lineStyle: { color: '#586f89' } 
            },
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月'],
            axisPointer:{
                show:true,
                type:'line'
            }
        },
        yAxis: {
            show:false,//屏蔽y轴
            type: 'value',
            axisLine: {
                lineStyle: { color: '#666' }
            },
            boundaryGap: false,
            splitLine: { show: false }
        },
        series: [
            {
                name: 'bar1',
                type: 'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color:'#53bde0'
                    }
                },
                lineStyle:{
                    normal:{
                        width:1
                    }
                },
                areaStyle: {
                    normal: {
                       /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 70, 131)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 158, 68)'
                        }])*///渐变颜色
                       color:['#53bde0']
                    }
                },
                data: [311785, 125450, 164356, 534530, 482363, 522344, 52340,341230]       
            },
           
        ]
    }	
	myLineBarChart.setOption(option);
}

function doubleBar(){
	var doubleBar = echarts.init(document.getElementById('doubleBar'));	
	option = {
		    //backgroundColor:'#212121',
		    legend: {
		      show: true,
		     /* right: '6%',
		      data: [{
		        name: '',
		        icon: 'circle',
		        textStyle: {
		        fontSize: '16',
		        color: '#bbad0a'
		        }
		      }]*/
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'line',
		            label: {
		               // backgroundColor: '#6a7985'
		            },
		            itemStyle:{
		                        normal: {
		                            color:'#f3c334'
		                    }
		                },
		            }
		    },
		    grid: {
		      left: 10,
		      right: 20,
		      top: '20px',
		      bottom: '10px',
		      containLabel: true
		    },
		    textStyle: {
		      fontSize: '14',
		      fontWeight: 'normal',
		      color: '#b1b6b6'
		    },
		    xAxis: {
		      show: true,
		      type: 'category',
		      boundaryGap: false,
		      axisLine: {
		      lineStyle: {
					        show: false,
					        color: "#b1b6b6",
					        width: 1
  						}
		      		},
		    data: ['1','2','3','4','5','6','7'],
		    },
		    yAxis: {
		      show: true,
		      type: 'value',
		      splitLine: {
		        show: true,
		        lineStyle: { 
		          color: '#f5f6f6',
		        }
		      },
		      axisLine: {
			      lineStyle: {
						        show: false,
						        color: "#b1b6b6",
						        width: 1
	  						}
			      		},
		      axisLabel: {
		        formatter: function(params) {
		          if (params === 0) {
		            return ''
		          } else {
		            return params
		          }
		        }
		      }
		    },
		    series: [{
		      name: '数据1',
		      type: 'line',
		      smooth: true,
		      showSymbol: true,
		      symbol: "circle", 
		      symbolSize:6,
		      label: {normal: {
		           show: false
		       }},
		      itemStyle: {
		        normal: {
		          label:{show: false},
		          lineStyle: {
		            color: '#99d1dc'
		          },
		          color:'#99d1dc'
		        }
		      },
		      areaStyle: {
		        normal: {
		          color: {
		            type: 'linear',
		            x: 0,
		            y: 0,
		            x2: 0,
		            y2: 1,
		            colorStops: [{
		              offset: 0,
		              color: '#e5f1f3',
		            }, {
		              offset: 1,
		              color: '#e5f1f3',
		            }],
		            globalCoord: false
		          },
		        }
		      },
		      data: [15,11,12,12,10,40,20]
		    },
		    {
		      name: '数据2',
		      type: 'line',
		      smooth: true,
		      showSymbol: true,
		      symbol: "circle", 
		      symbolSize:6,
		      label: {normal: {

		           show: false

		       }},
		      itemStyle: {
		        normal: {
		          lineStyle: {
		            color: '#72ca9b'
		          },
		           color:'#72ca9b'
		        }
		      },
		      areaStyle: {
		        normal: {
		          color: {
		            type: 'linear',
		            x: 0,
		            y: 0,
		            x2: 0,
		            y2: 1,
		            colorStops: [{
		              offset: 0,
		              color: '#daeee4',
		            }, {
		              offset: 1,
		              color: '#daeee4',
		            }],
		            globalCoord: false
		          },
		        }
		      },
		    data: [20,13,16,12,12,18,12]
		    }]
		};
	// 使用刚指定的配置项和数据显示图表。
	doubleBar.setOption(option);
}

function barCharts1(){
    var myBarChart1 = echarts.init(document.getElementById('lineBar1'));
	var data=[600];
	var xMax=800;
	var option = {
	tooltip:{
		show:true,
		formatter:"{b} {c}"
	},
	grid:{
		left:20,
		top:50,
		bottom:'0',
		right:20
	},
    xAxis : [
        {
            max:xMax,
            type : 'value',
            axisTick: {show: false},
	        axisLine: {show:false},
	        axisLabel: {show:false},
	        splitLine: {show: false}
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['业务收款'],
            nameTextStyle:{color:'#b7ce9e',fontSize:'14px'},
           	axisLabel: {show:false},
            axisTick: {show: false},
	        axisLine: {show: false}
        }
    ],
    graphic: [
        {
            type: 'text',
            z: -10,
            left: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '80/400',
                font: '14px Microsoft YaHei'
            }
        } ,
        {
            type: 'text',
            z: -10,
            right: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '(50%)',
                font: '14px Microsoft YaHei'
            }
        }
    ],
    series : [
        { 
            name:' ',
            type: 'bar',
            barWidth:10,
            silent:true,
            itemStyle: {
	            normal: {
	                color: '#18537b',
	                barBorderRadius: [10, 10, 10, 10]
	
	            }

        },
            barGap:'-100%',
            barCategoryGap:'50%',
            data: data.map(function(d){return xMax}),
        },
        {
            name:' ',
            type:'bar',
            barWidth:10,
            label: {normal: {show: false,position: 'right',formatter: '{c}%'}},
            data:[{
            	value:400, 
            	itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 10, 10],
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#d91a60' // 100% 处的颜色
                            
                            //color:'#00facc'
                        }, {
                            offset: 1,
                            color: '#d91a60' // 0% 处的颜色
                        }],
                        globalCoord: false, // 缺省为 false
                    }
                }
            }}]
        }
    ]
};
	// 使用刚指定的配置项和数据显示图表。
	myBarChart1.setOption(option);
}
function barCharts2(){
    var myBarChart2 = echarts.init(document.getElementById('lineBar2'));
	var data=[800];
	var xMax=800;
	var option = {
	tooltip:{
		show:true,
		formatter:"{b} {c}"
	},
	grid:{
		left:20,
		top:50,
		bottom:'0',
		right:20
	},
    xAxis : [
        {
            max:xMax,
            type : 'value',
            axisTick: {show: false},
	        axisLine: {show:false},
	        axisLabel: {show:false},
	        splitLine: {show: false}
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['业务收款'],
            nameTextStyle:{color:'#b7ce9e',fontSize:'14px'},
           	axisLabel: {show:false},
            axisTick: {show: false},
	        axisLine: {show: false}
        }
    ],
    graphic: [
        {
            type: 'text',
            z: -10,
            left: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '800/500',
                font: '14px Microsoft YaHei'
            }
        } ,
        {
            type: 'text',
            z: -10,
            right: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '(62%)',
                font: '14px Microsoft YaHei'
            }
        }
    ],
    series : [
        { 
            name:' ',
            type: 'bar',
            barWidth:10,
            silent:true,
            itemStyle: {
	            normal: {
	                color: '#18537b',
	                barBorderRadius: [10, 10, 10, 10]
	
	            }

        },
            barGap:'-100%',
            barCategoryGap:'50%',
            data: data.map(function(d){return xMax}),
        },
        {
            name:' ',
            type:'bar',
            barWidth:10,
            label: {normal: {show: false,position: 'right',formatter: '{c}%'}},
            data:[{
            	value:500, 
            	itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 10, 10],
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#00acc3' // 100% 处的颜色
                            
                            //color:'#00facc'
                        }, {
                            offset: 1,
                            color: '#00acc3' // 0% 处的颜色
                        }],
                        globalCoord: false, // 缺省为 false
                    }
                }
            }}]
        }
    ]
};
	// 使用刚指定的配置项和数据显示图表。
	myBarChart2.setOption(option);
}


function barCharts3(){
    var myBarChart3 = echarts.init(document.getElementById('lineBar3'));
	var data=[800];
	var xMax=800;
	var option = {
	tooltip:{
		show:true,
		formatter:"{b} {c}"
	},
	grid:{
		left:20,
		top:50,
		bottom:'0',
		right:20
	},
    xAxis : [
        {
            max:xMax,
            type : 'value',
            axisTick: {show: false},
	        axisLine: {show:false},
	        axisLabel: {show:false},
	        splitLine: {show: false}
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['业务收款'],
            nameTextStyle:{color:'#b7ce9e',fontSize:'14px'},
           	axisLabel: {show:false},
            axisTick: {show: false},
	        axisLine: {show: false}
        }
    ],
    graphic: [
        {
            type: 'text',
            z: -10,
            left: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '800/600',
                font: '14px Microsoft YaHei'
            }
        } ,
        {
            type: 'text',
            z: -10,
            right: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '(75%)',
                font: '14px Microsoft YaHei'
            }
        }
    ],
    series : [
        { 
            name:' ',
            type: 'bar',
            barWidth:10,
            silent:true,
            itemStyle: {
	            normal: {
	                color: '#18537b',
	                barBorderRadius: [10, 10, 10, 10]
	
	            }

        },
            barGap:'-100%',
            barCategoryGap:'50%',
            data: data.map(function(d){return xMax}),
        },
        {
            name:' ',
            type:'bar',
            barWidth:10,
            label: {normal: {show: false,position: 'right',formatter: '{c}%'}},
            data:[{
            	value:600, 
            	itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 10, 10],
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#8d24ab' // 100% 处的颜色
                            
                            //color:'#00facc'
                        }, {
                            offset: 1,
                            color: '#8d24ab' // 0% 处的颜色
                        }],
                        globalCoord: false, // 缺省为 false
                    }
                }
            }}]
        }
    ]
};
	// 使用刚指定的配置项和数据显示图表。
	myBarChart3.setOption(option);
}

function barCharts4(){
    var myBarChart4 = echarts.init(document.getElementById('lineBar4'));
	var data=[800];
	var xMax=800;
	var option = {
	tooltip:{
		show:true,
		formatter:"{b} {c}"
	},
	grid:{
		left:20,
		top:50,
		bottom:'0',
		right:20
	},
    xAxis : [
        {
            max:xMax,
            type : 'value',
            axisTick: {show: false},
	        axisLine: {show:false},
	        axisLabel: {show:false},
	        splitLine: {show: false}
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['业务收款'],
            nameTextStyle:{color:'#b7ce9e',fontSize:'14px'},
           	axisLabel: {show:false},
            axisTick: {show: false},
	        axisLine: {show: false}
        }
    ],
    graphic: [
        {
            type: 'text',
            z: -10,
            left: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '800/700',
                font: '14px Microsoft YaHei'
            }
        } ,
        {
            type: 'text',
            z: -10,
            right: 20,
            top: 'middle',
            style: {
                fill: '#666',
                text: '(88%)',
                font: '14px Microsoft YaHei'
            }
        }
    ],
    series : [
        { 
            name:' ',
            type: 'bar',
            barWidth:10,
            silent:true,
            itemStyle: {
	            normal: {
	                color: '#18537b',
	                barBorderRadius: [10, 10, 10, 10]
	
	            }

        },
            barGap:'-100%',
            barCategoryGap:'50%',
            data: data.map(function(d){return xMax}),
        },
        {
            name:' ',
            type:'bar',
            barWidth:10,
            label: {normal: {show: false,position: 'right',formatter: '{c}%'}},
            data:[{
            	value:700, 
            	itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 10, 10],
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#fb8c00' // 100% 处的颜色
                            
                            //color:'#00facc'
                        }, {
                            offset: 1,
                            color: '#fb8c00' // 0% 处的颜色
                        }],
                        globalCoord: false, // 缺省为 false
                    }
                }
            }}]
        }
    ]
};
	// 使用刚指定的配置项和数据显示图表。
	myBarChart4.setOption(option);
}
