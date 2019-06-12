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
			initEcharts($("#hiddenOrgId").val(),orgLevel);
			initPiePercent($("#hiddenOrgId").val(),orgLevel);
		} 
//		else if(orgLevel == "3") {
//			$("#hiddenOrgId").val(mapOrgId);
//			mapObj = this.next(orgLevel, false);
//			initEcharts($("#hiddenOrgId").val());
//			initPiePercent($("#hiddenOrgId").val());
//		}
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

//echart图实例
function initEcharts(hiddenOrgId,orgLevel) {
	// 获取高亮的指标信息
	var hexagonType = $(".HexagoAlive").find(".zhibiaoFont").attr("id");
	// 获取orgId
	var orgId = $("#hiddenOrgId").val() == null || $("#hiddenOrgId").val() == '' ? nowOrgId : $("#hiddenOrgId").val();
	// 获取账期
	var statisDate = $("#statisDateHeader").val();
	var myChart = echarts.init(document.getElementById('echartInfo'));
	var xData = [];
	var yData = [];
	var name = "";
	if("FH" == hexagonType) {
		name = "放号(户)";
	} else if("XZKD" == hexagonType) {
		name = "家庭宽带新增(户)";
	} else if("ZDHY" == hexagonType) {
		name = "终端合约(台)";
	} else if("JTWXZ" == hexagonType) {
		name = "家庭网新增(户)";
	} else if("GJZDZXQSTTS" == hexagonType) {
		name = "高价值低占小区渗透提升(百分比)";
	} else if("XZJZWD" == hexagonType) {
		name = "新增价值洼地(个)";
	} else if("TBKHGYRHL" == hexagonType) {
		name = "头部客户固移融合率(百分比)";
	} else if("ZXWQYQDXD" == hexagonType) {
		name = "商客拓展(个)";
	} else if("GRKHZJFSR" == hexagonType) {
		name = "个人客户总计费收入(亿)";
	} else if("XZKHZJFSR" == hexagonType) {
		name = "新增客户总计费收入(万)";
	} else if("GJDZXQKDXZ" == hexagonType) {
		name = "高价低占小区宽带新增(户)";
	} else if("90HKHGMTS" == hexagonType) {
		name = "90后客户规模提升(个)";
	} else if("TBKHKDXZ" == hexagonType) {
		name = "头部客户宽带新增(户)";
	}
	$.ajax({
		url: $.cxt + "/firstpagethree/getzbechart",
		data: {orgId: orgId,orgLevel:orgLevel, type: hexagonType, statisDate: statisDate},
		type: "POST",
		success: function(result) {
			var json = JSON.parse(result).data;
			var dataShadow=[];
			for(var i = json.length - 1; i >= 0; i--) {
				xData.push(json[i].ORG_NAME);
				if(hexagonType == "GJZDZXQSTTS" || hexagonType == "TBKHGYRHL") {
					yData.push((json[i].PUB_DATA*100).toFixed(2));
				} else if (hexagonType == "XZKHZJFSR"){
					yData.push((json[i].PUB_DATA).toFixed(2));
				} else if(hexagonType == "GRKHZJFSR") {
					yData.push((json[i].PUB_DATA/10000).toFixed(2));
				} else {
					yData.push(json[i].PUB_DATA.toFixed(0));
				}
			}
			// 这里是需要交互到后台的，需要重新写，这里简单定义了一个假数据
			var option = {
				title: {
					text: name,
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
			        name: name,
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
			myChart.setOption(option);
		}
	});
}