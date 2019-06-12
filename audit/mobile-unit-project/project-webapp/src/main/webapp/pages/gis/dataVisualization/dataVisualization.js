$(function(){
	$('.kpiCheckbox input:first').attr('checked','checked')
	var orgId = $(".orgId").val();
	var gridTypeId = ''
	var pubGridCode = ''
	var pubSecondCode = ''
	var unSelectColor = '#999999'
	var mapObj= null;
	var mapOrgId = null;
	var eOption = { geo:{bottom:"45%",top:'8%',right:'20%',left:'20%'}};
 	var  emap = showEmap(orgId,"mainMap",callBack,eOption);
	function callBack(_orgId,orgLevel){
		mapOrgId = _orgId
		  if(orgLevel=="4"){//当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
			   $(".visual-right").hide()
			   $(".visual-left").hide()
			   $(".visual-middle").css('width','100%')
 			   mapObj=emap.mapObj;
			   window.setTimeout(function(){
				   mapObj.getModel().getComponent('bmap').getBMap().reset();
			   },1000)
			   appendLevel4()
			   pubGridCode = _orgId
		   }else if(orgLevel=="3"){
			   $(".visual-right").hide()
			   $(".visual-left").hide()
			   $(".visual-middle").css('width','100%')
			   mapObj=this.next();
//			   gridEcharts()
			   appendMap()
			   topGridPoint('1')//默认一类网格top5
		   }else{
			   $(".append-all").remove()
			   $(".visual-right").show()
			   $(".visual-left").show()
			   $(".visual-middle").css('width','40%')
			   mapObj=this.next();
			   getMapLine()
			   bigTypePie()
			   smallTypePie(pubSecondCode)
			   leftBar()
			   topRightBar()
			   rightTotalPie()
		   }
		  selectRadio()
		  selectMapRadio()
		  gridMapRadio()
	}
	
	function getMapLine(){
		var option = mapObj.getOption()
		$.ajax({
			url: $.cxt + "/dataVisualization/getMapLine",
			type: 'POST',
			data: {orgId : mapOrgId},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					var xAxisData = [];
					var legendData= ['收入','客户','容量','4G','流量','宽带','政企业务','新业务'];
					var title = "";
					var serieData = [];
					var metaDate = []
					
					var serieData1 = []
					var serieData2 = []
					var serieData3 = []
					var serieData4 = []
					var serieData5 = []
					var serieData6 = []
					var serieData7 = []
					var serieData8 = []
					for(var i=0;i<json.data.length;i++){
						xAxisData.push(json.data[i].ORGNAME)
						serieData1.push((json.data[i].NUM1).toFixed(2))
						serieData2.push((json.data[i].NUM2).toFixed(2))
						serieData3.push((json.data[i].NUM3).toFixed(2))
						serieData4.push((json.data[i].NUM4).toFixed(2))
						serieData5.push((json.data[i].NUM5).toFixed(2))
						serieData6.push((json.data[i].NUM6).toFixed(2))
						serieData7.push((json.data[i].NUM7).toFixed(2))
						serieData8.push((json.data[i].NUM8).toFixed(2))
					}
					metaDate.push(serieData1)
					metaDate.push(serieData2)
					metaDate.push(serieData3)
					metaDate.push(serieData4)
					metaDate.push(serieData5)
					metaDate.push(serieData6)
					metaDate.push(serieData7)
					metaDate.push(serieData8)
					for(var v=0; v < legendData.length ; v++){
					    var serie = {
					        name:legendData[v],
					        type: 'line',
					        symbol:"circle",
					        symbolSize:10,
					        data: metaDate[v]
					    };
					    serieData.push(serie)
					}
					var colors = ["#036BC8","#4A95FF","#5EBEFC","#2EF7F3","#FFFFFF",'#4b2694','#379426','#8d2694'];
					 option.grid= {
						 left: '5%',top:"65%",bottom: "10%",right:"5%",containLabel: true
				    }
					
//					option.title = {
//						text: title,textAlign:'left',textStyle:{color:"#fff",fontSize:"16",fontWeight:"normal"}
//					}
					
					option.legend = {
						show:true,left:"right",data:legendData,y:"55%",
				        itemWidth:18,itemHeight:12,textStyle:{color:"#fff",fontSize:14},
					}
					option.color = colors
					option.xAxis = {
						type: 'category',
			            axisLine: { show: true,lineStyle:{ color:'#6173A3' }},
			            axisLabel:{interval:0,textStyle:{color:'#fff',fontSize:12},interval: '0',rotate:70, },
			            axisTick : {show: false},
			            data:xAxisData,
					}
					
					option.yAxis = {
						axisTick : {show: false},
			            splitLine: {show:false},
			            axisLabel:{textStyle:{color:'#fff',fontSize:12} },
			            axisLine: { show: true,lineStyle:{ color:'#6173A3'}},
					}
					option.tooltip = {
						 trigger: 'axis',axisPointer : { type : 'shadow'}
					}
					option.series = serieData
					
					mapObj.clear();
					mapObj.setOption(option);
					
				}
			}
		})
		
	}
	
	function selectRadio(){
		$(".kpiCheckbox input[type='radio']").click(function(){
			var kpiId = $(this).attr('id')
			$(this).attr('checked','checked')
			$(".kpiCheckbox input[type='radio']").each(function(index,element){
				var _kpiId = $(element).attr('id')
				if(_kpiId != kpiId){
					$(element).removeAttr("checked")
				}
			})
			bigTypePie()
			smallTypePie(pubSecondCode)
			leftBar()
			topRightBar()
		})
	}
	
	function selectMapRadio(){
//		$(".kpiRadiobox input[type='radio']:first").attr('checked','checked')
		$(".kpiRadiobox input[type='radio']").click(function(){
			var kpiId = $(this).attr('id')
			$(this).attr('checked','checked')
			
			$(".kpiRadiobox input[type='radio']").each(function(index,element){
				var _kpiId = $(element).attr('id')
				if(_kpiId != kpiId){
					$(element).removeAttr("checked")
				}
			})
			//清除上一次网格数据
			var map = mapObj.getModel().getComponent('bmap').getBMap();
			for(var i=0;i<pointArray.length;i++){
				map.removeOverlay(pointArray[i]);
				map.removeOverlay(pointEchartsArray[i]);
			}
			//清除上一次渠道基站数据
			if(chnlEchartsArray.length > 0){
				for(var i=0;i<chnlEchartsArray.length;i++){
					map.removeOverlay(chnlEchartsArray[i]);
				}
				bigTypeChnlGroup(pubGridCode)
			}
			if(stationEchartsArray.length > 0){
				for(var i=0;i<stationEchartsArray.length;i++){
					map.removeOverlay(stationEchartsArray[i]);
				}
				bigTypeStationGroup(pubGridCode)
			}
			if(pubGridCode != null && pubGridCode != ''){
				mapkpiTypeBar(pubGridCode)
				mapkpiTypePie(mapPubSecondCode,pubGridCode)
			}else {
				mapkpiTypeBar(mapOrgId)
				mapkpiTypePie(mapPubSecondCode,mapOrgId)
			}
			topGridPoint(gridTypeId)
		})
	}
	
	function gridMapRadio(){
//		$(".gridRadiobox input[type='radio']:first").attr('checked','checked')
		$(".gridRadiobox input[type='radio']").click(function(){
			var kpiId = $(this).attr('id')
			$(this).attr('checked','checked')
			
			$(".gridRadiobox input[type='radio']").each(function(index,element){
				var _kpiId = $(element).attr('id')
				if(_kpiId != kpiId){
					$(element).removeAttr("checked")
				}
			})
			//清除上一次网格数据
			var map = mapObj.getModel().getComponent('bmap').getBMap();
			for(var i=0;i<pointArray.length;i++){
				map.removeOverlay(pointArray[i]);
				map.removeOverlay(pointEchartsArray[i]);
			}
			//清除上一次渠道基站数据
			if(chnlEchartsArray.length > 0){
				for(var i=0;i<chnlEchartsArray.length;i++){
					map.removeOverlay(chnlEchartsArray[i]);
				}
			}
			bigTypeChnlGroup(pubGridCode)
			if(stationEchartsArray.length > 0){
				for(var i=0;i<stationEchartsArray.length;i++){
					map.removeOverlay(stationEchartsArray[i]);
				}
			}
			if(pubGridCode != null && pubGridCode != ''){
				mapkpiTypeBarLevel4(pubGridCode)
				mapkpiTypePieLevel4(mapPubSecondCode,pubGridCode)
			}else {
				mapkpiTypeBarLevel4(mapOrgId)
				mapkpiTypePieLevel4(mapPubSecondCode,mapOrgId)
			}
			bigTypeStationGroup(pubGridCode)
//			topGridPoint(gridTypeId)
		})
	}
	
	function bigTypePie(){
		var myChart = echarts.init(document.getElementById('bigType'));
		var firstCode = ''
		$(".kpiCheckbox input[type='radio']").each(function(index,element){
			if($(element).attr("checked") == 'checked'){
				firstCode = $(element).attr("id")
			}
		})
		$.ajax({
			url: $.cxt + "/dataVisualization/getBigTypePie",
			type: 'POST',
			data: {
				firstCode : firstCode,
				orgId : mapOrgId
			},
			async : false,
			success: function(data){
				var json = JSON.parse(data);
				var secondTypeData = []
				if(json.code == '0'){
					for(var i=0;i<json.data.length;i++){
						if(i==0){
							pubSecondCode = json.data[i].CONDITION_CODE
						}
						secondTypeData.push({
							value:json.data[i].NUM1.toFixed(2),
							name:json.data[i].CONDITION_NAME,
							conditionCode:json.data[i].CONDITION_CODE
						})
					}
					option = {
						title : {
					        text: '指标大类占比',
					        x:'center',
					        textStyle:{
					        	color: '#fff',
					        	fontSize:12
					        }
					    },
					    tooltip: {
					        trigger: 'item',
					        formatter: "{a} <br/>{b}: {c} ({d}%)",
					        position: [0,0],
					    },
//						    legend: {
//						        orient: 'vertical',
//						        x: 'left',
//						        data:[]
//						    },
					    series: [
					        {
					            name:'大类占比',
					            type:'pie',
					            radius: ['50%', '70%'],
					            avoidLabelOverlap: false,
					            label: {
					                normal: {
					                    show: false,
					                    position: 'center'
					                },
					                emphasis: {
					                    show: true,
					                    textStyle: {
					                        fontSize: '15',
					                        fontWeight: 'bold'
					                    }
					                }
					            },
					            labelLine: {
					                normal: {
					                    show: false
					                }
					            },
					            data:secondTypeData
					        }
					    ],
					    color: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
					};
					myChart.clear()
					myChart.setOption(option)
					myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
				}
				
			}
		})
		
		myChart.on('click', function (param) {
			smallTypePie(param.data.conditionCode)
		})
	}
	
	function smallTypePie(secondCode){
		var myChart = echarts.init(document.getElementById('samllType'));
		$.ajax({
			url: $.cxt + "/dataVisualization/getSmallTypePie",
			type: 'POST',
			data: {
				secondCode : secondCode,
				orgId : mapOrgId
			},
			success: function(data){
				var json = JSON.parse(data);
				var thirdTypeData = []
				if(json.code == '0'){
					for(var i=0;i<json.data.length;i++){
						thirdTypeData.push({
							value:json.data[i].NUM1.toFixed(2),
							name:json.data[i].CONDITION_NAME,
							conditionCode:data[i].CONDITION_CODE
						})
					}
					
					option = {
					    title : {
					        text: '指标小类占比',
					        x:'center',
					        textStyle:{
					        	color: '#fff',
					        	fontSize:12
					        }
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    grid: {
					        x: 20,
					        y: 20,
					        x2: 20,
					        y2: 20,
					        containLabel: true,
					        z:22
					    },
					    calculable : true,
					    series : [
					        {
					            name:'小类占比',
					            type:'pie',
					            radius : [20, 80],
					            center : ['50%', '50%'],
					            roseType : 'radius',
					            label: {
					                normal: {
					                    show: false
					                },
					                emphasis: {
					                    show: false
					                }
					            },
					            lableLine: {
					                normal: {
					                    show: false
					                },
					                emphasis: {
					                    show: true
					                }
					            },
					            data:thirdTypeData
					        }
					    ],
					    color: ["#036BC8","#4A95FF","#5EBEFC","#2EF7F3","#FFFFFF",'#4b2694','#379426','#8d2694']
					};
					myChart.clear()
					myChart.setOption(option)
				}
			}
		})
		
	}
	
	function leftBar(){
		var myChart = echarts.init(document.getElementById('leftBar'));
		var firstCode = ''
		$(".kpiCheckbox input[type='radio']").each(function(index,element){
			if($(element).attr("checked") == 'checked'){
				firstCode = $(element).attr("id")
			}
		})
		$.ajax({
			url: $.cxt + "/dataVisualization/getLeftBar",
			type: 'POST',
			data: {
				firstCode : firstCode,
				orgId : mapOrgId
			},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					var lengendData = []
					var actualProduction = []
					var productivity = []
					lengendData.push(json.data[0].CONDITION_NAME)
					lengendData.push(json.data[0].CONDITION_NAME+'环比')
					actualProduction.push(json.data[0].NUM1.toFixed(2))
					productivity.push(((json.data[0].NUM1/json.data[0].NUM2)*100).toFixed(2))
					actualProduction.push(json.data[0].NUM2.toFixed(2))
					productivity.push(((json.data[0].NUM2/json.data[0].NUM3)*100).toFixed(2))
					actualProduction.push(json.data[0].NUM3.toFixed(2))
					productivity.push(((json.data[0].NUM3/json.data[0].NUM4)*100).toFixed(2))
					actualProduction.push(json.data[0].NUM4.toFixed(2))
					productivity.push(((json.data[0].NUM4/json.data[0].NUM5)*100).toFixed(2))
					actualProduction.push(json.data[0].NUM5.toFixed(2))
					productivity.push(((json.data[0].NUM5/json.data[0].NUM6)*100).toFixed(2))
					var data = {
						    title: ['前一天', '前两天', '前三天', '前四天', '前五天'],
						    actual_production: actualProduction,
						    productivity: productivity
						};
					
						option = {
						    tooltip: {
						        trigger: 'axis',
						        axisPointer: {
						            type: 'cross',
						            label: {
						                backgroundColor: '#283b56'
						            }
						        }
						    },
						    legend: {
						    	textStyle: {
						    		color:'#fff'
						    	},
						        data: lengendData
						    },
						    grid: {
						        bottom: '20%',
						        left: '20%',
						        right: '15%',
						        top:'20%'
						    },
						    xAxis: [{
						        type: 'category',
						        boundaryGap: true,
						        data: data.title,
						        axisLabel: {
						        	interval: 0,
									rotate:70,
									color: '#fff',
						        }
						    }],
						    yAxis: [{
						        type: 'value',
						        scale: true,
						        minInterval: 1,
						        name: '数量',
						        nameTextStyle : {
						        	color: '#fff'
						        },
						        splitLine: {
						            show: false,
						        },
						        axisLabel: {
						        	color: '#fff'
						        },
//						        min: function(v) {
//						            return Math.max((v.min - 10), 0);
//						        }
						    }, {
						        type: 'value',
						        scale: true,
						        name: '百分比',
						        nameTextStyle : {
						        	color: '#fff'
						        },
						        splitLine: {
						            show: false
						        },
						        axisLabel: {
						        	color: '#fff',
						            formatter: '{value} %'
						        }
						    }],
						    series: [{
						        name: lengendData[0],
						        type: 'bar',
						        label: {
						            show: true,
						            position: 'top'
						        },
						        barWidth : '50%',
						        yAxisIndex: 0,
						        itemStyle:{
						        	normal: {
						        		color : '#4a95ff'
						        	}
						        },
						        data: data.actual_production
						    }, {
						        name: lengendData[1],
						        type: 'line',
						        label: {
						            show: true,
						            position: 'top',
						            formatter: '{c} %'
						        },
						        yAxisIndex: 1,
						        data: data.productivity
						    }]
						};
					myChart.clear()
					myChart.setOption(option)
				}
			}
		})
	}
	
	function topRightBar(){
		var myChart = echarts.init(document.getElementById('rightBar'));
		var firstCode = ''
		$(".kpiCheckbox input[type='radio']").each(function(index,element){
			if($(element).attr("checked") == 'checked'){
				firstCode = $(element).attr("id")
			}
		})
		$.ajax({
			url: $.cxt + "/dataVisualization/getTopRightBar",
			type: 'POST',
			data: {
				orgId : mapOrgId,
				firstCode : firstCode
			},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					var proName = []
					var proData = []
					for(var i=0;i<json.data.length;i++){
						proName.push(json.data[i].ORGNAME)
						proData.push((json.data[i].NUM1).toFixed(2))
						
						option = {
						    color: ['#3398DB'],
				//		    title: {
				//		        text: '',
				//		        textStyle: {
				//		            color: '#fff'
				//		        }
				//		    },
						    tooltip: {
						        trigger: 'axis',
						        axisPointer: {
						            type: 'shadow'
						        },
						        formatter: "{b} <br> 指标量: {c}"
						    },
						    /*legend: {
						        data: [date]
						    },*/
						    grid: {
						        left: '4%',
						        right: '4%',
						        bottom: '0%',
						        top: '2%',
						        containLabel: true
						    },
						    xAxis: {
						        type: 'value',
						        boundaryGap: [0, 0.01],
//						        min: 0,
//						        max: 100000000,
						        interval: 0,
						        axisLabel: {
						            formatter: '{value}',
						            textStyle: {
						                color: '#fff',  
						                fontWeight: '80'
						            }
						        }
						    },
						    yAxis: {
						        type: 'category',
						        data: proName,
						        axisLabel: {
						            show: true,
						            interval: 0,
						            rotate: 0,
						            margin: 10,
						            inside: false,
						            textStyle: {
						                color: '#fff',
						                fontWeight: '50'
						            }
						        }
						    },
						    series: [{
						        type:"bar",
						        itemStyle: {
						            normal: {
						                color: {
						                    type: 'linear',
						                    x: 0,
						                    y: 0,
						                    x2: 0,
						                    y2: 1,
						                    colorStops: [{
						                        offset: 0,
						                        color: '#00d386' // 0% 处的颜色
						                    }, {
						                        offset: 1,
						                        color: '#0076fc' // 100% 处的颜色
						                    }],
						                    globalCoord: false // 缺省为 false
						                },
						                barBorderRadius: 15,
						            }
						        },
						        data: proData
						    }]
						};
						myChart.clear()
						myChart.setOption(option)
					}
				}
			}
		})
		
	}
	
	function rightTotalPie(){
		var myChart = echarts.init(document.getElementById('rightTotalPie'));
		$.ajax({
			url: $.cxt + "/dataVisualization/getRightTotalPie",
			type: 'POST',
			data: {
				orgId : mapOrgId
			},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					var governmentData = []
					var newData = []
					for(var i=0;i<json.data.length;i++){
						if(json.data[i].CONDITION_CODE == 'T1112'){
							governmentData.push((json.data[i].NUM1).toFixed(2))
						}else if(json.data[i].CONDITION_CODE == 'T1113'){
							newData.push((json.data[i].NUM1).toFixed(2))
						}
					}
					
					var placeHolderStyle = {
						    normal: {
						        label: {
						            show: false
						        },
						        labelLine: {
						            show: false
						        },
						        color: "rgba(0,0,0,0)",
						        borderWidth: 0
						    },
						    emphasis: {
						        color: "rgba(0,0,0,0)",
						        borderWidth: 0
						    }
						};


						var dataStyle = {
						    normal: {
						        formatter: '{c}',
						        position: 'center',
						        show: true,
						        textStyle: {
						            fontSize: '20',
						            fontWeight: 'normal',
						            color: '#fff'
						        }
						    }
						};


						option = {
						    title: [
						        {
						        text: '',
						        x: '20',
						        y: '20',
						        textStyle: {
						            color: '#fff',
						            fontSize: 20
						        }
						    },{
						        text: '政企业务总量',
						        left: '29.8%',
						        top: '70%',
						        textAlign: 'center',
						        textStyle: {
						            fontWeight: 'normal',
						            fontSize: '16',
						            color: '#fff',
						            textAlign: 'center',
						        },
						    }, {
						        text: '新业务总量',
						        left: '70%',
						        top: '70%',
						        textAlign: 'center',
						        textStyle: {
						            color: '#fff',
						            fontWeight: 'normal',
						            fontSize: '16',
						            textAlign: 'center',
						        },
						    }],
						    series: [{
						            type: 'pie',
						            hoverAnimation: false, //鼠标经过的特效
						            radius: ['25%', '51%'],
						            center: ['30%', '50%'],
						            startAngle: 225,
						            labelLine: {
						                normal: {
						                    show: false
						                }
						            },
						            label: {
						                normal: {
						                    position: 'center'
						                }
						            },
						            data: [{
						                    value: governmentData,
						                    itemStyle: {
						                        normal: {
						                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						                                offset: 0,
						                                color: '#99da69'
						                            }, {
						                                offset: 1,
						                                color: '#01babc'
						                            }]),
						                        }
						                    },
						                    label: dataStyle,
						                }, {
						                    value: governmentData,
						                    itemStyle: placeHolderStyle,
						                },

						            ]
						        },
						        {
						            type: 'pie',
						            hoverAnimation: false,
						            radius: ['25%', '51%'],
						            center: ['70%', '50%'],
						            startAngle: 225,
						            labelLine: {
						                normal: {
						                    show: false
						                }
						            },
						            label: {
						                normal: {
						                    position: 'center'
						                }
						            },
						            data: [{
					                    value: newData,
					                    itemStyle: {
					                        normal: {
					                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                                offset: 0,
					                                color: '#9f3edd'
					                            }, {
					                                offset: 1,
					                                color: '#4897f6'
					                            }]),
					                        }
					                    },
					                    label: dataStyle,
					                }, {
					                    value: newData,
					                    itemStyle: placeHolderStyle,
					                },

					            ]
					        },
					        
					        //外圈的边框
					        {
					            // name: '总人数',
					            type: 'pie',
					            hoverAnimation: true, //鼠标经过的特效
					            radius: ['51%', '52%'],
					            center: ['30%', '50%'],
					            startAngle: 225,
					            labelLine: {
					                normal: {
					                    show: false
					                }
					            },
					            label: {
					                normal: {
					                    position: 'center'
					                }
					            },
					            data: [{
					                    value: 75,
					                    itemStyle: {
					                        normal: {
					                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                                offset: 0,
					                                color: '#01babc'
					                            }, {
					                                offset: 1,
					                                color: '#99da69'
					                            }]),
					                        }
					                    },
					                }, {
					                    value: 25,
					                    itemStyle: placeHolderStyle,
					                },

					            ]
					        },
					        {
					            type: 'pie',
					            hoverAnimation: true,
					            radius: ['51%', '52%'],
					            center: ['70%', '50%'],
					            startAngle: 225,
					            labelLine: {
					                normal: {
					                    show: false
					                }
					            },
					            label: {
					                normal: {
					                    position: 'center'
					                }
					            },
					            data: [{
					                    value: 75,
					                    itemStyle: {
					                        normal: {
					                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                                offset: 0,
					                                color: '#4897f6'
					                            }, {
					                                offset: 1,
					                                color: '#9f3edd'
					                            }]),
					                        }
					                    },
					                }, {
					                    value: 25,
					                    itemStyle: placeHolderStyle,
					                },

					            ]
					        },
					    ]
					};
						myChart.clear()
					myChart.setOption(option)
				}
			}
		})
		
	}
	
	function gridEcharts(){
		
		var map = new BMap.Map("mainMap");
		map.centerAndZoom(new BMap.Point(116.309965, 40.058333), 17);
		map.enableScrollWheelZoom();
		
		for(var i=1;i<10;i++){	
			var htm = $("<div  class='smallChart'>" + "</div>");
			var point = new BMap.Point(116.30816+i*0.007, 40.056863);

			var myRM= new BMapLib.RichMarker(htm[0], point);

			map.addOverlay(myRM);

			var marker = new BMap.Marker(point);
			map.addOverlay(marker);

			var myChart = echarts.init(htm[0]);

			// 指定图表的配置项和数据
			var option = {
				title: {
					text: 'ECharts '
				},
				tooltip: {},
				legend: {
					data:['Chart']
				},
				xAxis: {
					data: ["A","B","C","D","E","F"]
				},
				yAxis: {},
				series: [{
					name: 'A',
					type: 'bar',
					data: [5*i, 20*i, 36*i/10, 10, 10, 20]
				}]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}					
		
		map.addEventListener("zoomend",function(){
			 var zoom = map.getZoom();
			 $("#zoomNum").html(zoom);
			 var scale = 0.5;
			 if(zoom>15){
				scale = 0.5;
			 }else if(zoom>12){
				 scale = 0.4;
			 }
			 else if(zoom>9){
				scale = 0.3;
			 }else if(zoom>7){
				scale = 0.2;
			 }else {
				scale = 0.1;
			 }
			 var width =$(".smallChart").width();
			 var height = $(".smallChart").height();
			 var mwidth =-(width - width*scale)/2;
			 var mheight = - (height - height*scale)/2;
			 $(".smallChart").css("transform","scale("+scale+","+scale+")");
			 $(".smallChart").css("margin",mwidth+"px "+mheight+"px");
		})
	}
	
	function appendMap(){
		var appendAll = $("<div class='append-all'></div>")
		$(".append-all").remove()
		$("#mainMap").append(appendAll)
		var x = $("<span class='glyphicon glyphicon-remove' onclick='closeWindow(this)'></span>")
		var bigType = "<div class='kpi-checkbox' style='margin-top: 5%;margin-left: 5%;'>"
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1106        ' checked='checked'>"
				+"<span>收入</span>"
				+"</div>"
				
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1107        '>"
				+"<span>客户</span>"
				+"</div>"
				
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1108        '>"
				+"<span>存量</span>"
				+"</div>"
				
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1109        '>"
				+"<span>4G</span>"
				+"</div>"
				
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1110        '>"
				+"<span>流量</span>"
				+"</div>"
				
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1111'>"
				+"<span>宽带</span>"
				+"</div>"
				
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1112'>"
				+"<span>政企业务</span>"
				+"</div>"
				
				+"<div class='kpiRadiobox'>"
				+"<input type='radio' id='T1113'>"
				+"<span>新业务</span>"
				+"</div>"
			+"</div>"
		
		var table = "<div class='grid'>"
            +"<table id='gridTable'></table>"
            +"<div id='grid-pager'></div> "
        +"</div>"
        
        var openBut = "<span class='glyphicon glyphicon-fullscreen' style='display:none;color:red;'></span>"
        $("#mainMap").append(openBut)
        
        var leftKpiType = "<div class='leftMapKpiType'>" 
			        	+ "<div class='mapkpiTypePie' id='mapkpiTypePie'>"
						+ "</div>"
						+ "<div class='mapKpiTypeBar' id='mapKpiTypeBar'>"
						+ "</div>"
        				+ "</div>";
		$(".leftMapKpiType").remove()
		$("#mainMap").append(leftKpiType)
		
		appendAll.append(x)
		appendAll.append(bigType)
		appendAll.append(table)
		gridTable(mapOrgId)
		mapkpiTypeBar(mapOrgId)//地图左下角柱状图
		mapkpiTypePie(mapPubSecondCode,mapOrgId)//地图左下角饼图
		closeAndOpen()
	}
	
	function gridTable(orgId){
		$('#gridTable').GridUnload()
		$('#gridTable').jqGrid({
			url : $.cxt + "/dataVisualization/getGridTypeNum",
			datatype : "json",
			mtype : "POST",
			postData : {
				areaId:orgId
	        },
			height : ($(".grid").height()-90),
			autowidth : true,
			colNames : [ '网格类型', '网格数量'],
			colModel : [ 
			      {name : 'GRID_TYPE',align : 'center',formatter:function(cellvalue, options, cell){
			    	  if(cellvalue == '1'){
			    		  return "<span class='spanGrid' style='cursor:pointer' id='1'>一类网格</span>"
			    	  }else if(cellvalue == '2'){
			    		  return "<span class='spanGrid' style='cursor:pointer' id='2'>二类网格</span>"
			    	  }else if(cellvalue == '3'){
			    		  return "<span class='spanGrid' style='cursor:pointer' id='3'>三类网格</span>"
			    	  }else{
			    		  return "<span class='spanGrid' style='cursor:pointer' id='4'>其他网格</span>"
			    	  }
			      }}, 
			      {name : 'GRID_TYPE_NUM',align : 'center',formatter:function(cellvalue, options, cell){
			    	  var html = ""
			    		  html = "<a class='openSubTable' rowId ='"+cell.ROW_ID+"' orgId='"+orgId+"' gridType='"+cell.GRID_TYPE+"' id='true' style='cursor:pointer'>" + cell.GRID_TYPE_NUM + "</a>"
			    		  return html;
			      }}
			],
//			width : 400,
			autoScroll: true,
			viewrecords : false,
			rownumbers: true,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#grid-pager',
			loadComplete : function(){
				clickGridType()
				clickOpenSubTable()
				topjqGridLoadComplete()
			}
		});
		
//		$(".ui-jqgrid-bdiv").niceScroll({
//			cursorheight:$(window).height()-190,
//		    cursorcolor:"#5cd4f8",
//		    cursorborder: "1px solid #5cd4f8",
//		    touchbehavior: false,
//		    spacebarenabled: true,
//		    railoffset: false
//		});
		
	}
	
	
	function closeAndOpen(){
		
		$(".glyphicon-remove").click(function(){
			$(".append-all").animate({"width":"0%"});
			$(".append-all").hide();
			$(".glyphicon-fullscreen").show()
		})
		
		$(".glyphicon-fullscreen").click(function(){
			$(".glyphicon-fullscreen").hide()
			$(".append-all").show();
			$(".append-all").animate({"width":"30%"});
		})
	}
	
	var pointArray = []
	var pointEchartsArray = []
	function topGridPoint(typeId){
		gridTypeId = typeId
		var firstId = ''
		$('.kpiRadiobox input').each(function(index,element){
			if($(element).attr('checked') == 'checked'){
				firstId = $(element).attr('id')
			}
		})
		var map = mapObj.getModel().getComponent('bmap').getBMap();
		map.enableScrollWheelZoom();
		
		$.ajax({
			url: $.cxt + "/dataVisualization/getTopGridByKpi",
			type: 'POST',
			data: {
				areaId:mapOrgId,
				firstCode:firstId,
				typeId:typeId
			},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					for(var i=0;i<json.data.length;i++){
						var point = new BMap.Point(json.data[i].CPLNG,json.data[i].CPLAT)
						var html = $("<div  class='smallChart'>" + "</div>");
						var myRM = new BMapLib.RichMarker(html[0],point,{"anchor": new BMap.Size(-72, -84)});
						map.addOverlay(myRM);
						var marker = new BMap.Marker(point);
						var label = new BMap.Label(i+1,{offset:new BMap.Size(5,3)});
                        label.setStyle({
                            background:'none',
                            color:'#fff',
                            border:'none'
                        });
                        pointArray.push(marker)
                        pointEchartsArray.push(myRM)
                        marker.setLabel(label);
						map.addOverlay(marker);
						var myChart = echarts.init(html[0]);
						var echartsParent = $(".smallChart").parent()
						echartsParent.css('background','none')
						$.ajax({
							url: $.cxt + "/dataVisualization/getBigTypePie",
							type: 'POST',
							data: {
								firstCode : firstId,
								orgId : json.data[i].GRID_CODE
							},
							async : false,
							success: function(data){
								var jsonChildren = JSON.parse(data);
								if(jsonChildren.code == '0'){
									var secondTypeData = []
									for(var j=0;j<jsonChildren.data.length;j++){
										secondTypeData.push({
											value:jsonChildren.data[j].NUM1.toFixed(2),
											name:jsonChildren.data[j].CONDITION_NAME
										})
									}
									option = {
									    title: {
									        text: 'NO.'+(i+1)+'  '+json.data[i].GRID_NAME,
									        left: 'center',
									        top: 10,
									        textStyle: {
									        }
									    },
									    
									    tooltip : {
									        trigger: 'item',
									        formatter: "{a} <br/>{b} : {c} ({d}%)"
									    },
									    series : [
									        {
									            name:'指标',
									            type:'pie',
									            radius : ['10%','40%'],
									            center: ['50%', '40%'],
									            data:secondTypeData.sort(function (a, b) { return a.value - b.value; }),
									            roseType: 'radius',
									            label: {
									                normal: {
									                    textStyle: {
									                    }
									                }
									            },
									            labelLine: {
									                normal: {
									                    lineStyle: {
									                    },
									                    smooth: 0.2,
									                    length: 5,
									                    length2: 5
									                }
									            },
									            itemStyle: {
									                normal: {
									                }
									            }/*,
									            animationType: 'scale',
									            animationEasing: 'elasticOut',
									            animationDelay: function (idx) {
									                return Math.random() * 200;
									            }*/
									        }
									    ]
									};

									myChart.clear()
									myChart.setOption(option)
									
								}
							}
						})
						
					}
				}
			}
		})
		
		map.addEventListener("zoomend",function(){
			 var zoom = map.getZoom();
			 $("#zoomNum").html(zoom);
			 var scale = 0.5;
			 if(zoom>18){
				 scale = 0.8;
			 }else if(zoom>15){
				scale = 0.7;
			 }else if(zoom>12){
				 scale = 0.5;
			 }
			 else if(zoom>9){
				scale = 0.4;
			 }else if(zoom>7){
				scale = 0.3;
			 }else {
				scale = 0.1;
			 }
			 var width =$(".smallChart").width();
			 var height = $(".smallChart").height();
			 var mwidth =-(width - width*scale)/2;
			 var mheight = - (height - height*scale)/2;
			 $(".smallChart").css("transform","scale("+scale+","+scale+")");
			 $(".smallChart").css("margin",mwidth+"px "+mheight+"px");
		})
		
	}
	
	function clickGridType(){
		$('.spanGrid').click(function(){
			var map = mapObj.getModel().getComponent('bmap').getBMap();
			for(var i=0;i<pointArray.length;i++){
				map.removeOverlay(pointArray[i]);
				map.removeOverlay(pointEchartsArray[i]);
			}
			var typeId = $(this).attr('id')
			topGridPoint(typeId)
		})
	}
	
	function clickGridSingle(){
		$(".singleGrid").click(function(){
			var map = mapObj.getModel().getComponent('bmap').getBMap();
			if(chnlEchartsArray.length > 0){
				for(var i=0;i<chnlEchartsArray.length;i++){
					map.removeOverlay(chnlEchartsArray[i]);
				}
			}
			if(stationEchartsArray.length > 0){
				for(var i=0;i<stationEchartsArray.length;i++){
					map.removeOverlay(stationEchartsArray[i]);
				}
			}
			var gridCode = $(this).attr('id')
			pubGridCode = gridCode
			if($(".kpiRadiobox").length > 0){
				mapkpiTypeBar(gridCode)
				mapkpiTypePie(mapPubSecondCode,gridCode)
			}
			if($(".gridRadiobox").length > 0){
				mapkpiTypeBarLevel4(gridCode)
				mapkpiTypePieLevel4(mapPubSecondCode,gridCode)
			}
			gridPosition(gridCode)
			bigTypeChnlGroup(gridCode)
			bigTypeStationGroup(gridCode)
		})
	}
	
	var chnlEchartsArray = []
	var stationEchartsArray = []
	function bigTypeChnlGroup(gridCode){
		var firstId = ''
		$('.kpiRadiobox input').each(function(index,element){
			if($(element).attr('checked') == 'checked'){
				firstId = $(element).attr('id')
			}
		})
		var map = mapObj.getModel().getComponent('bmap').getBMap();
		map.enableScrollWheelZoom();
		$.ajax({
			url: $.cxt + "/dataVisualization/getTopChnlByKpi",
			type: 'POST',
			data: {
				gridCode:gridCode,
				firstCode : firstId
			},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					for(var i=0;i<json.data.length;i++){
						var point = new BMap.Point(json.data[i].LON,json.data[i].LAT)
						var html = $("<div id='CHNLCHAR_"+json.data[i].CHNL_CODE+"' class='smallChart'>" + "</div>");
						var myRM = new BMapLib.RichMarker(html[0],point,{"anchor": new BMap.Size(-72, -84)});
						map.addOverlay(myRM);
//						var marker = new BMap.Marker(point);
//						var label = new BMap.Label(i+1,{offset:new BMap.Size(5,3)});
//	                    label.setStyle({
//	                        background:'none',
//	                        color:'#fff',
//	                        border:'none'
//	                    });
	                    chnlEchartsArray.push(myRM)
//	                    marker.setLabel(label);
//						map.addOverlay(marker);
						var myChart = echarts.init(html[0]);
	                    var echartsParent = $(".smallChart").parent()
						echartsParent.css('background','none')
						$.ajax({
							url: $.cxt + "/dataVisualization/getBigTypeChnlGroupByCode",
							type: 'POST',
							async : false,
							data: {
								physicalId:json.data[i].CHNL_CODE,
								firstCode:firstId
							},
							success: function(data){
								var jsonChildren = JSON.parse(data);
								if(jsonChildren.code == '0'){
									var secondTypeData = []
									for(var j=0;j<jsonChildren.data.length;j++){
										secondTypeData.push({
											value:jsonChildren.data[j].NUM1.toFixed(2),
											name:jsonChildren.data[j].CONDITION_NAME
										})
										
									}
									option = {
									    title: {
									        text: 'NO.'+(i+1)+'  '+json.data[i].CHNL_NAME,
									        left: 'center',
									        top: 10,
									        textStyle: {
									        }
									    },
									    
									    tooltip : {
									        trigger: 'item',
									        formatter: "{a} <br/>{b} : {c} ({d}%)"
									    },
									    series : [
									        {
									            name:'指标',
									            type:'pie',
									            radius : ['10%','40%'],
									            center: ['50%', '40%'],
									            data:secondTypeData.sort(function (a, b) { return a.value - b.value; }),
									            roseType: 'radius',
									            label: {
									                normal: {
									                    textStyle: {
									                    }
									                }
									            },
									            labelLine: {
									                normal: {
									                    lineStyle: {
									                    },
									                    smooth: 0.2,
									                    length: 5,
									                    length2: 5
									                }
									            },
									            itemStyle: {
									                normal: {
									                }
									            }/*,
									            animationType: 'scale',
									            animationEasing: 'elasticOut',
									            animationDelay: function (idx) {
									                return Math.random() * 200;
									            }*/
									        }
									    ]
									};
									myChart.clear()
									myChart.setOption(option)
									
								}
								
							}
							
						})
						
					}
					
				}
			}
		})
		
		map.addEventListener("zoomend",function(){
			 var zoom = map.getZoom();
			 $("#zoomNum").html(zoom);
			 var scale = 0.5;
			 if(zoom>18){
				 scale = 0.8;
			 }else if(zoom>15){
				scale = 0.7;
			 }else if(zoom>12){
				 scale = 0.5;
			 }
			 else if(zoom>9){
				scale = 0.4;
			 }else if(zoom>7){
				scale = 0.3;
			 }else {
				scale = 0.1;
			 }
			 var width =$(".smallChart").width();
			 var height = $(".smallChart").height();
			 var mwidth =-(width - width*scale)/2;
			 var mheight = - (height - height*scale)/2;
			 $(".smallChart").css("transform","scale("+scale+","+scale+")");
			 $(".smallChart").css("margin",mwidth+"px "+mheight+"px");
		})
		
	}
	
	function bigTypeStationGroup(gridCode){
		var firstId = ''
		$('.kpiRadiobox input').each(function(index,element){
			if($(element).attr('checked') == 'checked'){
				firstId = $(element).attr('id')
			}
		})
		var map = mapObj.getModel().getComponent('bmap').getBMap();
		map.enableScrollWheelZoom();
		$.ajax({
			url: $.cxt + "/dataVisualization/getTopStationByKpi",
			type: 'POST',
			data: {
				gridCode:gridCode,
				firstCode:firstId
			},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					for(var i=0;i<json.data.length;i++){
						var point = new BMap.Point(json.data[i].STATION_LON,json.data[i].STATION_LAT)
						var html = $("<div class='smallChart'>" + "</div>");
						var myRM = new BMapLib.RichMarker(html[0],point,{"anchor": new BMap.Size(-72, -84)});
						map.addOverlay(myRM);
						stationEchartsArray.push(myRM)
						var myChart = echarts.init(html[0]);
						var echartsParent = $(".smallChart").parent()
						echartsParent.css('background','none')
						$.ajax({
							url: $.cxt + "/dataVisualization/getBigTypeStationGroupByCode",
							type: 'POST',
							data: {
								physicalId:json.data[i].STATION_CODE,
								firstCode:firstId
							},
							async : false,
							success: function(data){
								var jsonChildren = JSON.parse(data);
								if(jsonChildren.code == '0'){
									var secondTypeData = []
									for(var j=0;j<jsonChildren.data.length;j++){
										secondTypeData.push({
											value:jsonChildren.data[j].NUM1.toFixed(2),
											name:jsonChildren.data[j].CONDITION_NAME
										})
										
									}
									option = {
									    title: {
									        text: 'NO.'+(i+1)+'  '+json.data[i].STATION_NAME,
									        left: 'center',
									        top: 10,
									        textStyle: {
									        }
									    },
									    
									    tooltip : {
									        trigger: 'item',
									        formatter: "{a} <br/>{b} : {c} ({d}%)"
									    },
									    series : [
									        {
									            name:'指标',
									            type:'pie',
									            radius : ['10%','40%'],
									            center: ['50%', '40%'],
									            data:secondTypeData.sort(function (a, b) { return a.value - b.value; }),
									            roseType: 'radius',
									            label: {
									                normal: {
									                    textStyle: {
									                    }
									                }
									            },
									            labelLine: {
									                normal: {
									                    lineStyle: {
									                    },
									                    smooth: 0.2,
									                    length: 5,
									                    length2: 5
									                }
									            },
									            itemStyle: {
									                normal: {
									                }
									            }/*,
									            animationType: 'scale',
									            animationEasing: 'elasticOut',
									            animationDelay: function (idx) {
									                return Math.random() * 200;
									            }*/
									        }
									    ]
									};
									myChart.clear()
									myChart.setOption(option)
								}
							}
						})
					}
				}
			}
		})
		
		map.addEventListener("zoomend",function(){
			 var zoom = map.getZoom();
			 $("#zoomNum").html(zoom);
			 var scale = 0.5;
			 if(zoom>18){
				 scale = 0.8;
			 }else if(zoom>15){
				scale = 0.7;
			 }else if(zoom>12){
				 scale = 0.5;
			 }
			 else if(zoom>9){
				scale = 0.4;
			 }else if(zoom>7){
				scale = 0.3;
			 }else {
				scale = 0.1;
			 }
			 var width =$(".smallChart").width();
			 var height = $(".smallChart").height();
			 var mwidth =-(width - width*scale)/2;
			 var mheight = - (height - height*scale)/2;
			 $(".smallChart").css("transform","scale("+scale+","+scale+")");
			 $(".smallChart").css("margin",mwidth+"px "+mheight+"px");
		})
	}
	
	function gridPosition(gridCode){
		var map = mapObj.getModel().getComponent('bmap').getBMap();
		map.enableScrollWheelZoom();
		$.ajax({
			url: $.cxt + "/dataVisualization/getGridPosition",
			type: 'POST',
			data: {
				gridCode:gridCode
			},
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					var poi = new BMap.Point(json.data[0].CPLNG,json.data[0].CPLAT);
					 map.centerAndZoom(poi, 15);
				}
			}
		})
	}
	
	function clickOpenSubTable(){
		$(".openSubTable").click(function(){
			var rowId = $(this).attr('rowId')
			var orgId = $(this).attr('orgId')
			var gridType = $(this).attr('gridType')
			openSubTable(rowId,orgId,gridType,this)
		})
	}
	
	function openSubTable(rowId,orgId,typeId,_this){
		if($(_this).attr('id') == 'true'){
			$.ajax({
				url: $.cxt + "/dataVisualization/getGridByTypeAjax",
				type: 'POST',
				data: {
					areaId:orgId,
					typeId:typeId
				},
				success: function(data){
					var json = JSON.parse(data);
					if(json.code == '0'){
						var parent = $(_this).parent().parent()
						for(var i=0;i<json.data.length;i++){
							var trtd = "<tr class='ui-widget-content jqgrow ui-row-ltr removeTr' id='removeTr"+rowId+(i+1)+"' ><td>"+''/*(json.data.length-i)*/+"</td>" +
							"<td><span class='singleGrid' id='"+json.data[i].GRID_CODE+"' style='cursor: pointer;'>"+json.data[i].GRID_NAME+"</span></td>" +
							"<td style='padding:0;'>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'乡镇'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].TOWN_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'村庄'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].VILLAGE_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'小区'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].HOME_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'学校'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].SCHOOL_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'渠道'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].CHNL_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv' style='border:none;'>" +
							"<div class='tdDiv-left'>"+'基站'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].STATION_NUM+"</div>" +
							"</div>" +
							
							"</td>" +
							"</tr>"
							parent.after(trtd)
							$('#'+'removeTr'+rowId+(i+1)).addClass('removeTr'+rowId)
						}
						clickGridSingle()
					}
					
				}
			})
			$(_this).attr('id','false')
		}else{
			$('.removeTr'+rowId).remove()
			$(_this).attr('id','true')
		}
		
	}
	
	//网格层级方法
	function appendLevel4(){
		var appendAll = $("<div class='append-all'></div>")
		$(".append-all").remove()
		$("#mainMap").append(appendAll)
		var x = $("<span class='glyphicon glyphicon-remove' onclick='closeWindow(this)'></span>")
		var bigType = "<div class='kpi-checkbox' style='margin-top: 5%;margin-left: 5%;'>"
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1106        ' checked='checked'>"
				+"<span>收入</span>"
				+"</div>"
				
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1107        '>"
				+"<span>客户</span>"
				+"</div>"
				
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1108        '>"
				+"<span>存量</span>"
				+"</div>"
				
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1109        '>"
				+"<span>4G</span>"
				+"</div>"
				
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1110        '>"
				+"<span>流量</span>"
				+"</div>"
				
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1111'>"
				+"<span>宽带</span>"
				+"</div>"
				
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1112'>"
				+"<span>政企业务</span>"
				+"</div>"
				
				+"<div class='gridRadiobox'>"
				+"<input type='radio' id='T1113'>"
				+"<span>新业务</span>"
				+"</div>"
			+"</div>"
		
		var table = "<div class='grid'>"
            +"<table id='gridTable'></table>"
            +"<div id='grid-pager'></div> "
        +"</div>"
        
        var leftKpiType = "<div class='leftMapKpiType'>" 
        	+ "<div class='mapkpiTypePie' id='mapkpiTypePie'>"
			+ "</div>"
			+ "<div class='mapKpiTypeBar' id='mapKpiTypeBar'>"
			+ "</div>"
			+ "</div>";
		$(".leftMapKpiType").remove()
		$("#mainMap").append(leftKpiType)
        
        var openBut = "<span class='glyphicon glyphicon-fullscreen' style='display:none;color:red;'></span>"
        $("#mainMap").append(openBut)
		appendAll.append(x)
		appendAll.append(bigType)
		appendAll.append(table)
		mapkpiTypeBarLevel4(mapOrgId)//地图左下角柱状图
		mapkpiTypePieLevel4(mapPubSecondCode,mapOrgId)//地图左下角饼图
		gridTableLevel4(mapOrgId)
		closeAndOpen()
	}
	
	function gridTableLevel4(orgId){
		$('#gridTable').GridUnload()
		$('#gridTable').jqGrid({
			url : $.cxt + "/dataVisualization/getGridTypeLevel4",
			datatype : "json",
			mtype : "POST",
			postData : {
				gridCode:orgId
	        },
			height : 350,
			autowidth : true,
			colNames : [ '网格类型', '统计数量'],
			colModel : [ 
			      {name : 'GRID_TYPE',align : 'center',formatter:function(cellvalue, options, cell){
			    	  if(cellvalue == '1'){
			    		  return "<span class='spanGrid' style='cursor:pointer' id='1'>一类网格</span>"
			    	  }else if(cellvalue == '2'){
			    		  return "<span class='spanGrid' style='cursor:pointer' id='2'>二类网格</span>"
			    	  }else if(cellvalue == '3'){
			    		  return "<span class='spanGrid' style='cursor:pointer' id='3'>三类网格</span>"
			    	  }else{
			    		  return "<span class='spanGrid' style='cursor:pointer' id='4'>其他网格</span>"
			    	  }
			      }}, 
			      {name : 'GRID_TYPE_NUM',align : 'center',formatter:function(cellvalue, options, cell){
			    	  var html = ""
			    		  html = "<a class='openSubTable' rowId ='"+cell.ROW_ID+"' orgId='"+orgId+"' gridType='"+cell.GRID_TYPE+"' id='true' style='cursor:pointer'>" + cell.GRID_TYPE_NUM + "</a>"
			    		  return html;
			      }}
			],
//			width : 400,
			autoScroll: true,
			viewrecords : false,
			rownumbers: true,
			rowNum : 10,
			rowList : [ 10,20, 30 ],
			pager : '#grid-pager',
			loadComplete : function(){
//				clickGridTypeLevel4()
				clickOpenSubTableLevel4()
				topjqGridLoadComplete()
			}
		});
	}
	
	function clickOpenSubTableLevel4(){
		$(".openSubTable").click(function(){
			var rowId = $(this).attr('rowId')
			var orgId = $(this).attr('orgId')
			var gridType = $(this).attr('gridType')
			openSubTableLevel4(rowId,orgId,gridType,this)
		})
	}
	
	function openSubTableLevel4(rowId,orgId,typeId,_this){
		if($(_this).attr('id') == 'true'){
			$.ajax({
				url: $.cxt + "/dataVisualization/getGridByTypeAjax",
				type: 'POST',
				data: {
					gridCode:orgId,
					typeId:typeId
				},
				success: function(data){
					var json = JSON.parse(data);
					if(json.code == '0'){
						var parent = $(_this).parent().parent()
						for(var i=0;i<json.data.length;i++){
							var trtd = "<tr class='ui-widget-content jqgrow ui-row-ltr removeTr' id='removeTr"+rowId+(i+1)+"' ><td>"+''/*(json.data.length-i)*/+"</td>" +
							"<td><span class='singleGrid' id='"+json.data[i].GRID_CODE+"' style='cursor: pointer;'>"+json.data[i].GRID_NAME+"</span></td>" +
							"<td style='padding:0;'>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'乡镇'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].TOWN_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'村庄'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].VILLAGE_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'小区'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].HOME_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'学校'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].SCHOOL_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv'>" +
							"<div class='tdDiv-left'>"+'渠道'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].CHNL_NUM+"</div>" +
							"</div>" +
							
							"<div class='tdDiv' style='border:none;'>" +
							"<div class='tdDiv-left'>"+'基站'+"</div>" +
							"<div class='tdDiv-right'>"+json.data[i].STATION_NUM+"</div>" +
							"</div>" +
							
							"</td>" +
							"</tr>"
							parent.after(trtd)
							$('#'+'removeTr'+rowId+(i+1)).addClass('removeTr'+rowId)
						}
						clickGridSingle()
					}
					
				}
			})
			$(_this).attr('id','false')
		}else{
			$('.removeTr'+rowId).remove()
			$(_this).attr('id','true')
		}
		
	}
	
	function mapkpiTypePie(secondCode,leftMapOrgId){
		var myChart = echarts.init(document.getElementById('mapkpiTypePie'));
		$.ajax({
			url: $.cxt + "/dataVisualization/getSmallTypePie",
			type: 'POST',
			data: {
				secondCode : secondCode,
				orgId : leftMapOrgId
			},
			success: function(data){
				var json = JSON.parse(data);
				var thirdTypeData = []
				if(json.code == '0'){
					for(var i=0;i<json.data.length;i++){
						thirdTypeData.push({
							value:json.data[i].NUM1.toFixed(2),
							name:json.data[i].CONDITION_NAME,
							conditionCode:data[i].CONDITION_CODE
						})
					}
					
					option = {
					    title : {
					        x:'center',
					        textStyle:{
					        	color: '#fff',
					        	fontSize:12
					        }
					    },
					    tooltip : {
					    	position:[0,0],
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    grid: {
					        x: 20,
					        y: 20,
					        x2: 20,
					        y2: 20,
					        containLabel: true,
					        z:22
					    },
					    calculable : true,
					    series : [
					        {
					            name:'小类占比',
					            type:'pie',
					            center : ['50%', '50%'],
					            label: {
					                normal: {
					                	position: 'inner',
					                	fontSize: 10,
					                    show: false
					                },
					                emphasis: {
					                    show: false
					                }
					            },
					            lableLine: {
					                normal: {
					                    show: false
					                },
					                emphasis: {
					                    show: true
					                }
					            },
					            data:thirdTypeData
					        }
					    ],
					    color: ["#036BC8","#4A95FF","#5EBEFC","#2EF7F3","#FFFFFF",'#4b2694','#379426','#8d2694']
					};
					myChart.clear()
					myChart.setOption(option)
				}
			}
		})
	}
	
	var mapPubSecondCode = ''
	function mapkpiTypeBar(leftMapOrgId){
		var myChart = echarts.init(document.getElementById('mapKpiTypeBar'));
		var firstCode = ''
		$(".kpiRadiobox input[type='radio']").each(function(index,element){
			if($(element).attr("checked") == 'checked'){
				firstCode = $(element).attr("id")
			}
		})
		$.ajax({
			url: $.cxt + "/dataVisualization/getBigTypePie",
			type: 'POST',
			data: {
				firstCode : firstCode,
				orgId : leftMapOrgId
			},
			async:false,
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					var titleData = []
					var actualProduction = []
					var productivity = []
					for(var i=0;i<json.data.length;i++){
						if(i==0){
							mapPubSecondCode = json.data[i].CONDITION_CODE
						}
						actualProduction.push({
							value:json.data[i].NUM1.toFixed(2),
							conditionCode:json.data[i].CONDITION_CODE
						})
						productivity.push((json.data[i].NUM1.toFixed(2))/2)
						titleData.push(json.data[i].CONDITION_NAME)
					}
					
					var data = {
						    title: titleData,
						    actual_production: actualProduction,
						    productivity: productivity
						};
					
						option = {
						    tooltip: {
						        trigger: 'axis',
						        axisPointer: {
						            type: 'cross',
						            label: {
						                backgroundColor: '#283b56'
						            }
						        }
						    },
						    grid: {
						        bottom: '20%',
						        left: '20%',
						        right: '10%',
						        top:'20%'
						    },
						    xAxis: [{
						        type: 'category',
						        boundaryGap: true,
						        data: data.title,
						        axisLabel: {
						        	interval: 0,
									rotate:40,
									color: '#4a95ff',
						        }
						    }],
						    yAxis: [{
						        type: 'value',
						        scale: true,
						        minInterval: 1,
						        name: '数量&平均值',
						        nameTextStyle : {
						        	color: '#4a95ff'
						        },
						        splitLine: {
						            show: false,
						        },
						        axisLabel: {
						        	color: '#4a95ff'
						        },
//						        min: function(v) {
//						            return Math.max((v.min - 10), 0);
//						        }
						    }/*, {
						        type: 'value',
						        scale: true,
						        name: '平均值',
						        nameTextStyle : {
						        	color: '#4a95ff'
						        },
						        splitLine: {
						            show: false
						        },
						        axisLabel: {
						        	color: '#4a95ff',
						            formatter: '{value} %'
						        }
						    }*/],
						    series: [{
						        name: '数量',
						        type: 'bar',
						        label: {
						            show: true,
						            position: 'top'
						        },
						        barWidth : '50%',
						        yAxisIndex: 0,
						        itemStyle:{
						        	normal: {
						        		color : '#4a95ff'
						        	}
						        },
						        data: data.actual_production
						    }, {
						        name: '平均值',
						        type: 'line',
						        label: {
						            show: true,
						            position: 'top',
						            formatter: '{c} %'
						        },
						        yAxisIndex: 0,
						        data: data.productivity
						    }]
						};
					myChart.clear()
					myChart.setOption(option)
				}
			}
		})
		myChart.on('click', function (param) {
			mapkpiTypePie(param.data.conditionCode,leftMapOrgId)
		})
	}
	
	function mapkpiTypePieLevel4(secondCode,leftMapOrgId){
		var myChart = echarts.init(document.getElementById('mapkpiTypePie'));
		$.ajax({
			url: $.cxt + "/dataVisualization/getSmallTypePie",
			type: 'POST',
			data: {
				secondCode : secondCode,
				orgId : leftMapOrgId
			},
			success: function(data){
				var json = JSON.parse(data);
				var thirdTypeData = []
				if(json.code == '0'){
					for(var i=0;i<json.data.length;i++){
						thirdTypeData.push({
							value:json.data[i].NUM1.toFixed(2),
							name:json.data[i].CONDITION_NAME,
							conditionCode:data[i].CONDITION_CODE
						})
					}
					
					option = {
					    title : {
					        x:'center',
					        textStyle:{
					        	color: '#fff',
					        	fontSize:12
					        }
					    },
					    tooltip : {
					    	position:[0,0],
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    grid: {
					        x: 20,
					        y: 20,
					        x2: 20,
					        y2: 20,
					        containLabel: true,
					        z:22
					    },
					    calculable : true,
					    series : [
					        {
					            name:'小类占比',
					            type:'pie',
					            center : ['50%', '50%'],
					            label: {
					                normal: {
					                	position: 'inner',
					                    show: false
					                },
					                emphasis: {
					                    show: false
					                }
					            },
					            lableLine: {
					                normal: {
					                    show: false
					                },
					                emphasis: {
					                    show: true
					                }
					            },
					            data:thirdTypeData
					        }
					    ],
					    color: ["#036BC8","#4A95FF","#5EBEFC","#2EF7F3","#FFFFFF",'#4b2694','#379426','#8d2694']
					};
					myChart.clear()
					myChart.setOption(option)
				}
			}
		})
	}
	
	function mapkpiTypeBarLevel4(leftMapOrgId){
		var myChart = echarts.init(document.getElementById('mapKpiTypeBar'));
		var firstCode = ''
		$(".gridRadiobox input[type='radio']").each(function(index,element){
			if($(element).attr("checked") == 'checked'){
				firstCode = $(element).attr("id")
			}
		})
		$.ajax({
			url: $.cxt + "/dataVisualization/getBigTypePie",
			type: 'POST',
			data: {
				firstCode : firstCode,
				orgId : leftMapOrgId
			},
			async:false,
			success: function(data){
				var json = JSON.parse(data);
				if(json.code == '0'){
					var titleData = []
					var actualProduction = []
					var productivity = []
					for(var i=0;i<json.data.length;i++){
						if(i==0){
							mapPubSecondCode = json.data[i].CONDITION_CODE
						}
						actualProduction.push({
							value:json.data[i].NUM1.toFixed(2),
							conditionCode:json.data[i].CONDITION_CODE
						})
						productivity.push((json.data[i].NUM1.toFixed(2))/2)
						titleData.push(json.data[i].CONDITION_NAME)
					}
					
					var data = {
						    title: titleData,
						    actual_production: actualProduction,
						    productivity: productivity
						};
					
						option = {
						    tooltip: {
						        trigger: 'axis',
						        axisPointer: {
						            type: 'cross',
						            label: {
						                backgroundColor: '#283b56'
						            }
						        }
						    },
						    grid: {
						        bottom: '20%',
						        left: '20%',
						        right: '10%',
						        top:'20%'
						    },
						    xAxis: [{
						        type: 'category',
						        boundaryGap: true,
						        data: data.title,
						        axisLabel: {
						        	interval: 0,
									rotate:40,
									color: '#4a95ff',
						        }
						    }],
						    yAxis: [{
						        type: 'value',
						        scale: true,
						        minInterval: 1,
						        name: '数量&平均值',
						        nameTextStyle : {
						        	color: '#4a95ff'
						        },
						        splitLine: {
						            show: false,
						        },
						        axisLabel: {
						        	color: '#4a95ff'
						        },
//						        min: function(v) {
//						            return Math.max((v.min - 10), 0);
//						        }
						    }/*, {
						        type: 'value',
						        scale: true,
						        name: '平均值',
						        nameTextStyle : {
						        	color: '#4a95ff'
						        },
						        splitLine: {
						            show: false
						        },
						        axisLabel: {
						        	color: '#4a95ff',
						            formatter: '{value} %'
						        }
						    }*/],
						    series: [{
						        name: '数量',
						        type: 'bar',
						        label: {
						            show: true,
						            position: 'top'
						        },
						        barWidth : '50%',
						        yAxisIndex: 0,
						        itemStyle:{
						        	normal: {
						        		color : '#4a95ff'
						        	}
						        },
						        data: data.actual_production
						    }, {
						        name: '平均值',
						        type: 'line',
						        label: {
						            show: true,
						            position: 'top',
						            formatter: '{c} %'
						        },
						        yAxisIndex: 0,
						        data: data.productivity
						    }]
						};
					myChart.clear()
					myChart.setOption(option)
				}
			}
		})
		myChart.on('click', function (param) {
			mapkpiTypePieLevel4(param.data.conditionCode,leftMapOrgId)
		})
	}
	
	
})



