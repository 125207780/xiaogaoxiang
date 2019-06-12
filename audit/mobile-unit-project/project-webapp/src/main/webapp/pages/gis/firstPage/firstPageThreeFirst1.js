// map实例
function initMap() {
	var eOption = {
		geo: {
			top: 10,
			bottom: 10
		}
	};
	var emap = showEmap(nowOrgId, "map", callBack, eOption);
	// 地图点击事件
	function callBack(_orgId, orgLevel) {
		mapOrgId = _orgId;
		// 当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		if (orgLevel != "3") {
			mapObj = this.next();
			// 每次变动，则改变echart图数据
			$("#hiddenOrgId").val(mapOrgId);
			$('#hiddenOrgLevel').val(orgLevel);
			initPiePercent($("#hiddenOrgId").val(),orgLevel);
		} 
		else if(orgLevel == "3") {
			$("#hiddenOrgId").val(mapOrgId);
			mapObj = this.next(orgLevel,false);
			$('#hiddenOrgLevel').val(orgLevel);
			initPiePercent($("#hiddenOrgId").val(),orgLevel);
		}
	}
}

$("#showMap").on("click", showMap);
function showMap() {
	$("#mainBody").css("display", "none");
	$("#showMapInfo").toggle("blind", {direction:'right'});
	var eOption = {
		geo: {
			top: 10,
			bottom: 10
		}
	};
	var emap = showEmap(nowOrgId, "showMapInfo", callBack, eOption);
	// 地图点击事件
	function callBack(_orgId, orgLevel) {
		mapOrgId = _orgId;
		$("#hiddenOrgId").val(mapOrgId);
		// 当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		if (orgLevel != "4") {
			mapObj = this.next();
		}
	}
}

//echart图实例,地市id,层级,点击模块编号对象（通过点击对象获取FH）,默认加载直接传code(FH)，当日或当月
function initEcharts(hiddenOrgId,orgLevel,object,firstCode,firstName,flag) {
	// 获取高亮的指标信息
	var hexagonType =firstCode;
	if(hexagonType==null||hexagonType==''||hexagonType==undefined){
		hexagonType = $(object).parent().parent().attr("id");	
	}
	var hexagonName=firstName;
	if(hexagonName==""){
		hexagonName=$(object).parent().parent().find('.spanMainTitle').text();	
	}
	// 获取orgId
	var orgId = $("#hiddenOrgId").val() == null || $("#hiddenOrgId").val() == '' ? nowOrgId : $("#hiddenOrgId").val();
	// 获取账期
	var statisDate = $("#statisDateHeader").val();
	var myChart = echarts.init(document.getElementById('echartInfo'));
	var xData = [];
	var yData = [];
	$.ajax({
		url: $.cxt + "/firstpagethree/getzbechartInfo",
		data: {orgId: orgId,orgLevel:orgLevel, type: hexagonType, statisDate: statisDate,flag:flag},
		type: "POST",
		async : false,
		success: function(result) {
			var json = JSON.parse(result).data;
			var dataShadow=[];
			for(var i = json.length - 1; i >= 0; i--) {
				xData.push(json[i].ORG_NAME);
				yData.push(json[i].PUB_DATA);
			}
			// 这里是需要交互到后台的，需要重新写，这里简单定义了一个假数据
			var dataZoom;
			if(orgLevel=="3"){
			 option = {
						title: {
							text: hexagonName,
							left: 'left',
							top:20,
							textStyle: {
						        // 文字颜色
						        color: '#666',
						        // 字体风格,'normal','italic','oblique'
						        fontStyle: 'normal',
						        // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
						        fontWeight: 'bolder',
						        // 字体系列
						        fontFamily: 'sans-serif',
						        // 字体大小
						        fontSize: 16
						    }
						},
					    tooltip: {},
					    grid:{
					    	x: 105,
					    	right: 120
					    },
					    xAxis: {
					    	axisLabel: {
								show: false
							},
		                    axisLine : {
		                        show: false
		                    },
		                    axisTick : {
		                        show: false
		                    },
							splitLine:{
		                        show: false
							}
					    },
					    dataZoom : {
						    show : true,
						    realtime : true,
						    start : 0,
						    end : 100,
						    yAxisIndex:0 
							},
					    yAxis: {
					        data: xData,
					        boundaryGap : false,
				            axisLine: {onZero: false},
		                    axisLabel: {
		                        show:true,
								color:"#333",
								margin:20
		                    },
		                    axisLine : {
		                        show:false
		                    },
		                    axisTick : {
		                        show:false
		                    }
					    },
					    series: [{
							// For shadow
							type: 'bar',
		                    barWidth: 15,
							itemStyle: {
								normal: {
									color: '#F0F0F0',
		                            barBorderRadius: 15,
								},
							},
							barGap: '-100%',
							barCategoryGap: '40%',
							data: dataShadow,
							animation: false,
		                },{
					        name: hexagonName,
					        type: 'bar',
					        data: yData,
							barWidth: 15,
		                    label: {
		                        normal: {
		                            show: true,
									position:'right',
		                            distance: 30,
									fontSize:14,
									color:"#666"
									//align:"right"
		                        }
		                    },
					        itemStyle: {
								normal: {
									color: {
										type: 'linear',
										x: 0,
										y: 0,
										x2: 1,
										y2: 0,
										colorStops: [ {
											offset: 0,
											// 0% 处的颜色
											color: '#62E3DE'
										}, {
											offset: 1,
											// 100% 处的颜色
											color: '#1992FE'
										} ],
										// 缺省为 false
										globalCoord: false
									},
									barBorderRadius: 15,
								}
							}
					    }]
					};
			   }else{
				    option = {
							title: {
								text: hexagonName,
								left: 'left',
								top:20,
								textStyle: {
							        // 文字颜色
							        color: '#666',
							        // 字体风格,'normal','italic','oblique'
							        fontStyle: 'normal',
							        // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
							        fontWeight: 'bolder',
							        // 字体系列
							        fontFamily: 'sans-serif',
							        // 字体大小
							        fontSize: 16
							    }
							},
						    tooltip: {},
						    grid:{
						    	x: 105,
						    	right: 120
						    },
						    xAxis: {
						    	axisLabel: {
									show: false
								},
			                    axisLine : {
			                        show: false
			                    },
			                    axisTick : {
			                        show: false
			                    },
								splitLine:{
			                        show: false
								}
						    },
						    yAxis: {
						        data: xData,
						        boundaryGap : false,
					            axisLine: {onZero: false},
			                    axisLabel: {
			                        show:true,
									color:"#333",
									margin:20
			                    },
			                    axisLine : {
			                        show:false
			                    },
			                    axisTick : {
			                        show:false
			                    }
						    },
						    series: [{
								// For shadow
								type: 'bar',
			                    barWidth: 15,
								itemStyle: {
									normal: {
										color: '#F0F0F0',
			                            barBorderRadius: 15,
									},
								},
								barGap: '-100%',
								barCategoryGap: '40%',
								data: dataShadow,
								animation: false,
			                },{
						        name: hexagonName,
						        type: 'bar',
						        data: yData,
								barWidth: 15,
			                    label: {
			                        normal: {
			                            show: true,
										position:'right',
			                            distance: 30,
										fontSize:14,
										color:"#666"
										//align:"right"
			                        }
			                    },  
						        itemStyle: {
									normal: {
										color: {
											type: 'linear',
											x: 0,
											y: 0,
											x2: 1,
											y2: 0,
											colorStops: [ {
												offset: 0,
												// 0% 处的颜色
												color: '#62E3DE'
											}, {
												offset: 1,
												// 100% 处的颜色
												color: '#1992FE'
											} ],
											// 缺省为 false
											globalCoord: false
										},
										barBorderRadius: 15,
									}
								}
						    }]
						};
			   }
			myChart.setOption(option,true);
		}
	});
}