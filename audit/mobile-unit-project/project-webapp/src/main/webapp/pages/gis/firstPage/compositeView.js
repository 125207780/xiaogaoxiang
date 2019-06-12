//全局组织机构等级变量
var orgLevelParam = "";
$(function() {
	var pubScaleType = 'chnl';
	var pubSmallTypeId = '1'
	var orgId = $(".orgId").val();
	var mapObj = null;
	var eOption = {
		geo: {
			top: 10,
			bottom: 10
		}
	};
	var emap = showEmap(orgId, "mainMap", callBack, eOption);
	// 加载一类类型
	bigType();
	// 账期时间插件
	$(".date-picker").datepicker({
		format : 'yyyymmdd',
		language : 'zh-CN',
		todayBtn : "linked",
		autoclose : true,
		minview : "3"
	});

	// 地图点击事件
	function callBack(_orgId, orgLevel) {
		orgLevelParam = orgLevel;
		mapOrgId = _orgId;
		$("#hiddenOrgId").val(_orgId);
		// 当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		if (orgLevel == "4") {
			$(".glyphicon-fullscreen").remove();
			$(".firstPage-left").hide();
			$(".firstPage-right").hide();
			$(".titleLeveL1").hide();
			$(".operateMonitor").hide();
			$(".targetResourceList").hide();
			$(".firstPage-middle").css("width", "100%");
			$(".titleLevel1Content").css("height", "100%");
			$(".middle-top").css("height", "100%");
			$(".middle-up").height("100%");
			$("#topPanel").remove();
			$("#lastPanel").remove();
			mapObj = emap.mapObj;
		} else if (orgLevel == "1" || orgLevel == "2") {
			if (orgLevel == "1") {
				$("#monthAssessTitle").html("省公司月度考核指标完成情况");
			} else {
				$("#monthAssessTitle").html("地市公司月度考核指标完成情况");
			}
			$("#indexInfomation").show();
			$("#operationSupervision").show();
			$(".middle-top").css("cssText", "height: 78.5% !important");
			$(".firstPage-middle").css("cssText", "width: 41% !important");
			$(".firstPage-left").show();
			$(".firstPage-right").show();
			$(".middle-up").height("55%");
			$(".titleLevel1Content").css("height", "95%");
			$(".glyphicon-fullscreen").remove();
			var showMaxBtn = $('<span style="font-size: 15px; cursor: pointer; position: absolute; z-index: 10; right: 10px;" class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>');
			$("#mainMap").append(showMaxBtn);
			windowMax();
			mapObj = this.next();
			// 考核指标加载数据
			kpiRadio();
			var hexagonType = $(".HexagoAlive").find(".hexagonType").attr("id");
			showTop(_orgId, hexagonType);
			$(".append-all").hide();
		} else {
			$(".glyphicon-fullscreen").remove();
			$("#indexInfomation").hide();
			$("#operationSupervision").hide();
			$(".firstPage-left").hide();
			$(".firstPage-right").hide();
			$(".firstPage-middle").css("cssText", "width: 100% !important");
			$(".titleLevel1Content").css("height", "100%");
			$(".middle-top").css("cssText", "height: 100% !important");
			$(".middle-up").height("100%");
			$("#topPanel").remove();
			$("#lastPanel").remove();
			mapObj = this.next();
		}
		// 初始化公司月度考核指标完成情况单选按钮点击事件
		selectRadio();
		// 初始化基站渠道信息和资源指标概况echatrs图更新
		getChannelStationAndIndicators();
		// 初始化考核指标初始化一类下拉框
		initGridInfoEchartsData();
		// 初始化查询综合视图用户规模概览和运营监控一览
		getScaleAndMonitoringData();
		// 初始化查询任务资源概况
		getTaskSituationAndAssessmentScore(orgLevel);
	}

	// 公司月度考核指标完成情况查询按钮定义点击事件
	$("#newsSelect").click(function() {
		kpiRadio(mapOrgId);
	});

	// 公司月度考核指标完成情况单选按钮点击事件
	function selectRadio() {
		$(".rateRadio input[type='radio']").unbind();
		$(".rateRadio input[type='radio']").click(function() {
			var kpiId = $(this).attr('rangeid');
			$(this).attr('checked', 'checked');
			$(".rateRadio input[type='radio']").each(function(index, element) {
				var _kpiId = $(element).attr('rangeid');
				if (_kpiId != kpiId) {
					$(element).removeAttr("checked");
				}
			});
			kpiRadio(mapOrgId);
		});
	}

	// 中间上：指标资源概况：每个正六边形点击后，点击的那个六边形颜色变为原型设计中的颜色
	$('.Hexagon').click(function() {
		$(this).addClass('HexagoAlive').siblings().removeClass('HexagoAlive');
		var hexagonType = $(".HexagoAlive").find(".hexagonType").attr("id");
		showTop($("#hiddenOrgId").val(), hexagonType);
	});
})

// 窗口信息方法定义
function windowMax() {
	// 窗口缩放
	$(".glyphicon-fullscreen").unbind();
	$(".glyphicon-fullscreen").click(function() {
		topwindow.showHtmlWindow($("#mainMap"), {
			width: 700,
			height: 400,
			title: "信息展示",
			closeBtnFun: function() {
				$(".middle-up").append($("#mainMap"));
				$(".glyphicon-fullscreen").show();
				mapObj.resize();
			},
			fun: function() {
				$(".glyphicon-fullscreen").hide();
				mapObj.resize();
			}
		});
	});
}

// 前五和后五点击事件
$(".scaleTypeName").click(function() {
	kpiDataList = [];
	var scaleType = $(this).attr("bigScaleType");
	var smallScaleType = $(this).attr("smallScaleType");
	pubScaleType = scaleType;
	pubSmallTypeId = smallScaleType;
	showTop(mapOrgId, hexagonType);
});

// 加载一类类型
var bigType = function() {
	var firstKpiType = "";
	$.ajax({
		url: $.cxt + "/dataVisualization2/getBigType",
		type: 'POST',
		data: {},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if (json.code == '0') {
				$("#bigType").empty();
				var html = "";
				for (var i = 0, n = json.data.length; i < n; i++) {
					if (i == 0) {
						firstKpiType = json.data[i].KPI_TYPE;
					}
					html += "<option value = '" + json.data[i].KPI_TYPE + "'>" + json.data[i].KPI_TYPE_NAME + "</option>"
				}
				$("#bigType").append(html);
				smallType(firstKpiType);
			}
		}
	});
}

// 一类、二类级联
$("#bigType").change(function() {
	var kpiType = $(this).find("option:selected").val();
	smallType(kpiType);
	kpiRadio();
});

// 加载二类类型
var smallType = function(kpiType) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getSmallType",
		type: 'POST',
		data: {
			kpiType: kpiType
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			$("#smallType").empty();
			if (json.code == '0') {
				var html = "";
				for (var i = 0, n = json.data.length; i < n; i++) {
					html += "<option value = '" + json.data[i].KPI_CODE + "'>" + json.data[i].KPI_NAME + "</option>"
				}
				$("#smallType").append(html);
			}
		}
	});
}

// 显示前五名
function showTop(orgId, hexagonType) {
	$("#topPanel").remove();
	$("#lastPanel").remove();
	var topPanel = $("<div class='topPanel' id='topPanel'><div class='topPanelUp' style='background-color: #375495'><span class='linebg'></span>前五名TOP</div><div class='topPanelDown'></div></div>");
	var lastPanel = $("<div class='lastPanel' id='lastPanel'><div class='lastPanelUp' style='background-color: #375495'><span class='linebg'></span>后五名TOP</div><div class='lastPanelDown'></div></div>");
	$("#mainMap").append(topPanel);
	$("#mainMap").append(lastPanel);
	$.ajax({
		url: $.cxt + "/compositeView/getTopScale",
		type: 'POST',
		data: {
			orgId: orgId,
			hexagonType: hexagonType
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if (json.code == '0') {
				kpiDataList = json.data;
			}
		}
	});
	var topList = kpiDataList.slice(0, 5);
	var lastList = kpiDataList.slice(kpiDataList.length - 5, kpiDataList.length);
	var topHtml = "";
	var lastHtml = "";
	for (var i = 0, n = topList.length; i < n; i++) {
		if (i % 2 == 0) {
			topHtml += "<div class='topValue' style='background-color: #3A5EAA'><span class='yellowColoe"
				+ i
				+ "'>NO."
				+ (i + 1)
				+ "&nbsp;</span>"
				+ topList[i].ORG_NAME
				+ "&nbsp;"
				+ (hexagonType == "income" ? (topList[i].PUB_DATA / 10000).toFixed(2)
				+ "万" : topList[i].PUB_DATA) + "</div>";
		} else {
			topHtml += "<div class='topValue' style='background-color: #375495'><span class='yellowColoe"
				+ i
				+ "'>NO."
				+ (i + 1)
				+ "&nbsp;</span>"
				+ topList[i].ORG_NAME
				+ "&nbsp;"
				+ (hexagonType == "income" ? (topList[i].PUB_DATA / 10000).toFixed(2)
				+ "万" : topList[i].PUB_DATA) + "</div>";
		}
	}
	for (var i = lastList.length - 1; i >= 0; i--) {
		if (i % 2 == 0) {
			lastHtml += "<div class='topValue' style='background-color: #3A5EAA'><span class='yellowColoe"
				+ i
				+ "'>NO."
				+ (lastList.length - i)
				+ "&nbsp;</span>"
				+ lastList[i].ORG_NAME
				+ "&nbsp;"
				+ (hexagonType == "income" ? (lastList[i].PUB_DATA / 10000).toFixed(2)
				+ "万" : lastList[i].PUB_DATA) + "</div>";
		} else {
			lastHtml += "<div class='topValue' style='background-color: #375495'><span class='yellowColoe"
				+ i
				+ "'>NO."
				+ (lastList.length - i)
				+ "&nbsp;</span>"
				+ lastList[i].ORG_NAME
				+ "&nbsp;"
				+ (hexagonType == "income" ? (lastList[i].PUB_DATA / 10000).toFixed(2)
				+ "万" : lastList[i].PUB_DATA) + "</div>";
		}
	}
	$(".topPanelDown").html(topHtml);
	$(".lastPanelDown").html(lastHtml);
	if (topList.length == 0) {
		$(".topPanelDown").hide();
	} else {
		$(".topPanelDown").show();
	}
	if (lastList.length == 0) {
		$(".lastPanelDown").hide();
	} else {
		$(".lastPanelDown").show();
	}
}

// 网格信息概述echarts图初始化
function initGridInfoEcharts(data) {
	var myChart = echarts.init(document.getElementById('gridInfo'));
	var XData = [];
	var yData = [];
	// 定义Y轴
	yData = [ data[0]['GRID_COUNT'], data[0]['GRID_TYPE1_COUNT'], data[0]['GRID_TYPE2_COUNT'], data[0]['GRID_TYPE3_COUNT'] ];
	// 定义X轴
	XData = [ '网格总数', '一类网格数', '二类网格数', '三类网格数' ];
	option = {
		tooltip: {
			trigger: 'axis',
			// 坐标轴指示器，坐标轴触发有效
			axisPointer: { 
				// 默认为直线，可选为：'line' | 'shadow'
				type: 'shadow' 
			}
		},
		grid: {
			left: '20%',
			right: '5%',
			bottom: '0%',
			top: '15%',
			height: '50%',
		},
		xAxis: {
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			splitArea: {
				show: false
			},
			data: XData,
			axisLabel: {
				interval: 0,
				rotate: 25,
				fontSize: 8,
				fontWeight: 100,
				textStyle: {
					color: '#fff',
				}
			},
			axisLine: {
				lineStyle: {
					color: '#4d4d4d'
				}
			}
		},
		yAxis: {
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			splitArea: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#9faeb5',
					fontSize: 8,
				}
			},
			axisLine: {
				lineStyle: {
					color: '#4d4d4d'
				}
			}
		},
		series: {
			barWidth: '30%',
			type: "bar",
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [ {
							offset: 0,
							// 0% 处的颜色
							color: '#00d386'
						}, {
							offset: 1,
							// 100% 处的颜色
							color: '#0076fc'
						} ],
						// 缺省为 false
						globalCoord: false
					},
					barBorderRadius: 3,
				}
			},
			data: yData
		}
	};
	myChart.setOption(option);
}
// 网格人员信息
function initGridPersonInfoEcharts(data) {
	var myChart = echarts.init(document.getElementById('gridInfoPerson'));
	var XData = [];
	var yData = [];
	// 定义Y轴
	yData = [ data[0]['DIRECT_USER_COUNT'], data[0]['DIRECTORS_COUNT'],
			data[0]['CD_MANAGER_COUNT'], data[0]['SALE_MANAGER_COUNT'],
			data[0]['CHNL_MANAGER_COUNT'], data[0]['REPAIR_USER_COUNT'] ];
	// 定义X轴
	XData = [ '区域总监数', '直销人员数', 'CD政企经理', '销售经理', '渠道经理数', '装维人员数' ];
	option = {
		tooltip: {
			trigger: 'axis',
			// 坐标轴指示器，坐标轴触发有效
			axisPointer: { 
				// 默认为直线，可选为：'line' | 'shadow'
				type: 'shadow' 
			}
		},
		grid: {
			left: '10%',
			right: '20%',
			bottom: '0%',
			top: '15%',
			height: '50%',
		},
		xAxis: {
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			splitArea: {
				show: false
			},
			data: XData,
			axisLabel: {
				interval: 0,
				rotate: 25,
				fontSize: 8,
				fontWeight: 100,
				textStyle: {
					color: '#fff',
				}
			},
			axisLine : {
				lineStyle: {
					color: '#4d4d4d'
				}
			}
		},
		yAxis: {
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			splitArea: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#9faeb5',
					fontSize: 8,
				}
			},
			axisLine: {
				lineStyle: {
					color: '#4d4d4d'
				}
			},
			position: 'right'
		},
		series : {
			barWidth: '30%',
			type: "bar",
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [ {
							offset: 0,
							// 0% 处的颜色
							color: '#00d386'
						}, {
							offset: 1,
							// 100% 处的颜色
							color: '#0076fc'
						} ],
						// 缺省为 false
						globalCoord: false
					},
					barBorderRadius: 3,
				}
			},
			data: yData
		}
	};
	myChart.setOption(option);
}

// 网格分类规模echarts图初始化
function initGridTypeEcharts(datas) {
	var income_scale = parseInt(datas[0]['INCOME_SCALE']) + "";
	var income_scalehtml = "";
	for (var i = (income_scale.length - 1); i >= 0; i--) {
		income_scalehtml += '<div class="money' + i + ' unit">' + income_scale[i] + '</div>';
	}
	$('#income_scale').html(income_scalehtml);
	var myChart = echarts.init(document.getElementById('gridType'));
	var data = [];
	var titlename = [];
	data = [ parseInt(datas[0]['CUSTOMER_SCALE'] / 1000),
			datas[0]['CHANNEL_SCALE'], datas[0]['CELL_SCALE'],
			parseInt(datas[0]['CDCUSTOMER_SCALE'] / 10) ];
	titlename = [ '客户规模（万）', '渠道规模', '小区规模', 'CD政企客户规模' ];
	var myColor = [ '#1089E7', '#F57474', '#56D0E3', '#F8B448' ];
	option = {
		grid: {
			left: '30%',
			right: '15%',
			bottom: '0%',
			top: '0%',
			height: '100%',
		},
		xAxis: {
			show: false,
			axisLabel: {
				color: '#fff',
				align: 'left',
				margin: 94,
				textStyle: {
					fontSize: 10,
				}
			},
		},
		yAxis: [ {
			show: true,
			data: titlename,
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				color: '#fff',
				align: 'left',
				margin: 94,
				textStyle: {
					fontSize: 10,
				}
			},
		}, {
			show: true,
			data: data,
			axisLabel: {
				align: 'right',
				margin: 40,
				textStyle: {
					fontSize: 8,
					color: 'rgb(170,170,170)',
				},
				formatter: '{value} 个'
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
		} ],
		series: [ {
			name: '网格分类规模',
			type: 'bar',
			yAxisIndex: 1,
			data: data,
			barWidth: '50%',
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
							color: '#40b5f8'
						}, {
							offset: 1,
							// 100% 处的颜色
							color: '#3ec8d0'
						} ],
						// 缺省为 false
						globalCoord: false
					},
					barBorderRadius: 3,
				}
			},
		} ]
	};
	myChart.setOption(option);
}

// 渠道基站信息echarts图初始化
// 基站渠道信息和资源指标概况echatrs图更新
function getChannelStationAndIndicators() {
	var orgId = $("#hiddenOrgId").val();
	var dataList = [];
	$.ajax({
		url: $.cxt + "/compositeView/getChannelStationAndIndicators",
		type: 'post',
		data: {
			orgId: orgId
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if (json.code == '0') {
				dataList = json.data;
			}
			initChannelStationInfoEcharts(dataList[0]);
			updateIndicators(dataList[1]);
		}
	});
}

// 指标资源情况
function updateIndicators(data) {
	$("#income").empty();
	$("#bro_count").empty();
	$("#gover_cus_sum").empty();
	$("#business_add").empty();
	$("#tele_count").empty();
	$("#user_count_4g").empty();
	var income = (parseInt(data["INCOME"]));
	$("#income").html((income / 100000).toFixed(2));
	$("#bro_count").html(data["BRO_COUNT"]);
	$("#gover_cus_sum").html(data["GOVER_CUS_SUM"]);
	$("#business_add").html(data["BUSINESS_ADD"]);
	$("#tele_count").html(data["TELE_COUNT"]);
	$("#user_count_4g").html(data["USER_COUNT_4G"]);
}

// 渠道基站信息echarts图初始化
function initChannelStationInfoEcharts(data) {
	var myChart = echarts.init(document.getElementById('channelStationInfo'));
	var xData = [ "渠道数", "渠道入格", "基站数", "基站入格", "小区数", "小区入格", "重点小区", "重点入格", "AB集团数", "AB集团入格" ];
	var yData = [ data["CHNL_NUM"], data["WG_CHNL_NUM"], data["STATION_NUM"],
			data["WG_STATION_NUM"], data["CELL_NUM"], data["WG_CELL_NUM"],
			data["ZDCELL_NUM"], data["WG_ZDCELL_NUM"], data["AB_JT_NUM"], data["WG_AB_NUM"] ];
	var colors = [ {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21f8b7'
		}, {
			offset: 1,
			color: '#13a959'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21d3fb'
		}, {
			offset: 1,
			color: '#1342ac'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21f8b7'
		}, {
			offset: 1,
			color: '#13a959'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21f8b7'
		}, {
			offset: 1,
			color: '#13a959'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21d3fb'
		}, {
			offset: 1,
			color: '#1342ac'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21d3fb'
		}, {
			offset: 1,
			color: '#1342ac'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21d3fb'
		}, {
			offset: 1,
			color: '#1342ac'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21d3fb'
		}, {
			offset: 1,
			color: '#1342ac'
		} ]
	}, {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [ {
			offset: 0,
			color: '#21d3fb'
		}, {
			offset: 1,
			color: '#1342ac'
		} ]
	} ];
	var i = 0;
	var j = 1;

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line',
				lineStyle: {
					opacity: 0
				}
			},
		},
		grid: {
			left: '5%',
			right: '5%',
			bottom: '16%',
			top: '10%',
			height: '74%',
			containLabel: true,
		},
		xAxis: {
			data: xData,
			axisLabel: {
				interval: 0,
				show: true,
				color: '#fff',
				fontSize: 8,
				rotate: 30,
			},
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#0c3b71'
				}
			},
		},
		yAxis : {
			axisLine: {
				lineStyle: {
					color: '#3f67bb',
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			},
			splitLine: {
				lineStyle: {
					color: '#3f67bb',
				}
			},
		},
		series: [ {
			type: 'bar',
			data: yData,
			barWidth: '30%',
			itemStyle: {
				normal: {
					color: function() {
						if (j >= xData.length / 2) {
							j++;
							return colors[1];
						} else {
							j++;
							return colors[0];
						}

					},
					label: {
						show: true,
						position: 'top',
						textStyle: {
							color: 'rgb(170, 170, 170)'
						}
					}
				}
			}
		} ]
	};
	myChart.setOption(option);
}

// 任务资源情况echarts图初始化
function initTaskSituation(data) {
	var task_sum1 = data[0]["TASK_SUM1"];
	var task_rate1 = (data[0]["TASK_RATE1"] * 100).toFixed(2);
	var task_sum2 = data[0]["TASK_SUM2"];
	var task_rate2 = (data[0]["TASK_RATE2"] * 100).toFixed(2);
	var task_sum3 = data[0]["TASK_SUM3"];
	var task_rate3 = (data[0]["TASK_RATE3"] * 100).toFixed(2);
	if (task_sum1 != undefined && task_sum1 != null && task_sum1 != "") {
		$("#taskSituationTitle .incomeTotal").html(task_sum1 + "万元");
	} else {
		$("#taskSituationTitle .incomeTotal").html(0 + "元");
	}
	if (task_sum2 != undefined && task_sum2 != null && task_sum2 != "") {
		$("#taskSituationTitle .mainBusManagerTotal").html(task_sum2 + "万户");
	} else {
		$("#taskSituationTitle .mainBusManagerTotal").html(0 + "户");
	}
	if (task_sum3 != undefined && task_sum3 != null && task_sum3 != "") {
		$("#taskSituationTitle .mainWorkTotal").html(task_sum3 + "个");
	} else {
		$("#taskSituationTitle .mainWorkTotal").html(0 + "个");
	}
	var myChart = echarts.init(document.getElementById('taskSituation'));
	var colors = [ '', '#3f78eb', '', '#95ffc7', '', '#ff9e6d' ];
	var i = 0;
	var labelTop = {
		normal: {
			label: {
				show: true,
				position: 'center',
				formatter: {},
				textStyle: {
					baseline: 'bottom',
				}
			},
			labelLine: {
				show: false
			}
		}
	};
	var labelFromatter = {
		normal: {
			label: {
				formatter: function(params) {
					return 100 - params.value + '%'
				},
				position: 'center',
			},
			color: function() {
				return colors[i++];
			}
		},
	}
	var labelBottom = {
		normal: {
			color: '#ccc',
			label: {
				show: true,
				position: 'center'
			},
			labelLine: {
				show: false
			}
		},
		emphasis: {
			color : 'rgba(0, 0, 0, 0)'
		}
	};
	var radius = [ 30, 25 ];
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
			formatter: '{c}%',
			position: 'center',
			top: '20',
			show: true,
			textStyle: {
				fontSize: '14',
				fontWeight: 'normal',
				color: '#fff',

			}
		}
	};
	option = {
		series: [{
			type: 'pie',
			// 鼠标经过的特效
			hoverAnimation: false,
			radius: [ '55%', '70%' ],
			center: [ '18%', '50%' ],
			labelLine: {
				normal: {
					show: false
				}
			},
			label: {
				normal: {
					position: [ "100", "200" ]
				}
			},
			data: [{
				value: task_rate1,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [ {
								offset: 0,
								color: '#3f78eb'
							}, {
								offset: 1,
								color: '#3f78eb'
							} ]
						),
					}
				},
				label: dataStyle,
			}, {
				value: (100 - task_rate1),
				itemStyle: placeHolderStyle,
			}]
		},
		{
			type: 'pie',
			// 鼠标经过的特效
			hoverAnimation : false,
			radius : [ '55%', '70%' ],
			center : [ '50%', '50%' ],
			labelLine : {
				normal : {
					show : false
				}
			},
			label : {
				normal : {
					position : [ "100", "200" ]
				}
			},
			data: [{
				value: task_rate2,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [ {
								offset: 0,
								color: '#95ffc7'
							}, {
								offset: 1,
								color: '#95ffc7'
							} ]
						),
					}
				},
				label: dataStyle,
			}, {
				value: (100 - task_rate2),
				itemStyle: placeHolderStyle,
			}]
		},
		{
			type: 'pie',
			hoverAnimation: false,
			radius: [ '55%', '70%' ],
			center: [ '83%', '50%' ],
			labelLine: {
				normal: {
					show: false
				}
			},
			label: {
				normal: {
					position: [ "100", "200" ]
				}
			},
			data: [{
				value: task_rate3,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [ {
								offset: 0,
								color: '#ff9e6d'
							}, {
								offset: 1,
								color: '#ff9e6d'
							} ]
						),
					}
				},
				label: dataStyle,
			}, {
				value: (100 - task_rate3),
				itemStyle: placeHolderStyle,
			} ]
		},

		// 外圈的边框
		{
			type: 'pie',
			// 鼠标经过的特效
			hoverAnimation: false, 
			radius: [ '66%', '71%' ],
			center: [ '18%', '50%' ],
			labelLine: {
				normal: {
					show: false
				}
			},
			label: {
				normal: {
					position: 'center',
				}
			},
			data: [{
				value: 100,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [ {
								offset: 0,
								color: '#3f78eb'
							}, {
								offset: 1,
								color: '#3f78eb'
							} ]
						),
					}
				},
			}, {
				value: 0,
				itemStyle: placeHolderStyle,
			} ]
		},
		{
			type: 'pie',
			// 鼠标经过的特效
			hoverAnimation: false, 
			radius: [ '66%', '71%' ],
			center: [ '50%', '50%' ],
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
				value: 100,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [ {
								offset: 0,
								color: '#95ffc7'
							}, {
								offset: 1,
								color: '#95ffc7'
							} ]
						),
					}
				},
			}, {
				value: 0,
				itemStyle: placeHolderStyle,
			}]
		},
		{
			type: 'pie',
			hoverAnimation: false,
			radius: [ '66%', '71%' ],
			center: [ '83%', '50%' ],
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
				value: 100,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [ {
								offset: 0,
								color: '#ff9e6d'
							}, {
								offset: 1,
								color: '#ff9e6d'
							} ]
						),
					}
				},
			}, {
				value: 0,
				itemStyle: placeHolderStyle,
			}]
		}]
	};
	myChart.setOption(option);
}

// 考核得分Echart
function initAssessmentScore(data) {
	var myChart = echarts.init(document.getElementById('assessmentScore'));
	var backgroundData = [];
	var xData = [], yData = [];
	$.each(data, function(key, value) {
		xData.push(value["ORG_NAME"]);
		yData.push(value["KPI_VALUE"]);
		backgroundData.push(100);
	});
	option = {
		color: [ '#3398DB' ],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line',
				lineStyle: {
					opacity: 0
				}
			},
			formatter: function(prams) {
				return "考核得分：" + prams[0].data
			}
		},
		grid: {
			left: '5%',
			right: '0%',
			bottom: '40%',
			top: '15%',
			height: '80%',
			containLabel: true,
			z: 22
		},
		xAxis: [ {
			type: 'category',
			gridIndex: 0,
			data: xData,
			axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				lineStyle: {
					color: '#0c3b71'
				}
			},
			axisLabel: {
				show: true,
				color: '#1297ca',
				fontSize: 8,
				interval: 0,
				rotate: 30,
			}
		} ],
		yAxis: [ {
			type: 'value',
			gridIndex: 0,
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#0c3b71'
				}
			},
			axisLabel: {
				color: '#1297ca',
				formatter: '{value} '
			}
		}, {
			type: 'value',
			gridIndex: 0,
			splitNumber: 12,
			splitLine: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
		} ],
		series: [ {
			name: '考核得分',
			type: 'bar',
			barWidth: '30%',
			xAxisIndex: 0,
			yAxisIndex: 0,
			itemStyle: {
				normal: {
					barBorderRadius: 30,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
						offset: 0,
						color: '#21d7fe'
					}, {
						offset: 1,
						color: '#1243ad'
					} ])
				}
			},
			data: yData,
			zlevel: 11
		}, {
			name: '背景',
			type: 'bar',
			barWidth: '50%',
			xAxisIndex: 0,
			yAxisIndex: 1,
			barGap: '-135%',
			data: backgroundData,
			itemStyle: {
				normal: {
					color: 'rgba(255,255,255,0.1)'
				}
			},
			zlevel : 9
		} ]
	};
	myChart.setOption(option);
}

// 考核指标数据加载
var kpiRadio = function() {
	var kpiCode = $("#smallType").find("option:selected").val();
	var statisDate = $("#dv_date").val();
	var rangeId = "";
	var orgId = $("#hiddenOrgId").val();
	$(".rateRadio input[type='radio']").each(function() {
		var checked = $(this).attr('checked');
		if (checked == 'checked') {
			rangeId = $(this).attr("rangeId");
		}
	})
	if (rangeId == "") {
		rangeId = "G"
	}
	$('#twoTypeTable').GridUnload();
	$('#twoTypeTable').jqGrid({
		url: $.cxt + "/dataVisualization2/getKpiRatio",
		datatype: "json",
		mtype: "POST",
		postData: {
			orgId: orgId,
			kpiCode: kpiCode,
			rangeId: rangeId,
			statisDate: statisDate
		},
		height: ($(".twotype-grid").height() * 0.75),
		width: $(".twotype-grid").width(),
		autowidth: true,
		colNames: [ '组织机构', '指标量', '环比', '同比' ],
		colModel: [ {
			name: 'PARENT_NAME',
			align: 'center'
		}, {
			name: 'KPI_VALUE',
			align: 'center'
		}, {
			name: 'KPI_VALUE_HB',
			align: 'center'
		}, {
			name: 'KPI_VALUE_TB',
			align: 'center'
		} ],
		autoScroll: true,
		viewrecords: false,
		rownumbers: false,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#grid-pager1',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}

// 查询综合视图用户规模概览
function getScale(data) {
	$('#CUSTOMERS_RATE_23G').text(data[0]['CUSTOMERS_RATE_23G']);
	$('#CUSTOMERS_CALL_ADD').text(data[0]['CUSTOMERS_CALL_ADD']);
	$('#CUSTOMERS_CALL_NET').text(data[0]['CUSTOMERS_CALL_NET']);
	$('#BROAD_USER_COUNT').text(data[0]['BROAD_USER_COUNT']);
	$('#CUSTOMERS_RATE_4G').text(data[0]['CUSTOMERS_RATE_4G']);
	$('#CUSTOMERS_CALL_COUNT').text(data[0]['CUSTOMERS_CALL_COUNT']);
}

// 和运营监控一览
function getMonitoring(data) {
	$('#STORE_COUNT').text(data[0]['STORE_COUNT']);
	$('#CELL_COUNT').text(data[0]['CELL_COUNT']);
	$('#LOGIN_DIR_SUM').text(data[0]['LOGIN_DIR_SUM']);
	$('#BRO_CELL_COUNT').text(data[0]['BRO_CELL_COUNT']);
	$('#COLLEGES_COUNT').text(data[0]['COLLEGES_COUNT']);
	$('#BUSINESS_COUNT').text(data[0]['BUSINESS_COUNT']);
	$('#TASK_DONE').text(data[0]['TASK_DONE']);
	$('#MARKET_COUNT').text(data[0]['MARKET_COUNT']);
	$('#PHYSICAL_SIGN_COUNT').text(data[0]['PHYSICAL_SIGN_COUNT']);
	$('#CHANNEL_SIGN_COUNT').text(data[0]['CHANNEL_SIGN_COUNT']);
	$('#TASK_ALARM').text(data[0]['TASK_ALARM']);
	$('#TASK_COUNT').text(data[0]['TASK_COUNT']);
}

// 考核指标初始化一类下拉框
function initGridInfoEchartsData() {
	$.ajax({
		url: $.cxt + '/compositeView/getGridInfoAndGridType',
		data: {
			orgId: $("#hiddenOrgId").val()
		},
		type: "POST",
		async: false,
		success: function(data) {
			var data = JSON.parse(data);
			// 网格信息概述
			initGridInfoEcharts(data.data.GridInfo);
			initGridPersonInfoEcharts(data.data.GridInfo);
			// 网格分类规模
			initGridTypeEcharts(data.data.GridType);
		}
	});
}

// 查询综合视图用户规模概览和运营监控一览
function getScaleAndMonitoringData() {
	$.ajax({
		url: $.cxt + '/compositeView/getScaleAndMonitoring',
		data: {
			orgId: $("#hiddenOrgId").val()
		},
		type: "POST",
		async: false,
		success: function(data) {
			var data = JSON.parse(data);
			// 查询综合视图用户规模概览
			getScale(data.data.getScale);
			// 和运营监控一览
			getMonitoring(data.data.getMonitoring);
		}
	});
}

// 查询任务资源概况
function getTaskSituationAndAssessmentScore(orgLevel) {
	$.ajax({
		url: $.cxt + '/compositeView/getTaskSituationAndAssessmentScore',
		data: {
			orgId: $("#hiddenOrgId").val(),
			orgLevel: orgLevel
		},
		type: "POST",
		async: false,
		success: function(data) {
			var data = JSON.parse(data);
			initTaskSituation(data.data["getTaskSituation"]);
			initAssessmentScore(data.data["getAssessmentScore"]);
		}
	});
}
//点击页面more
function more(title) {
	$("#compositeView_modal").on("hidden.bs.modal", function() {});
	if (title == "网格信息概述") {
		$('#channelStationInfoMoreDiv').css("display", "none");
		$('#gridTypeMoreDiv').css("display", "none");
		$("#taskMoreDiv").css("display", "none");
		$("#customersMoreDiv").css("display", "none");
		$("#indicatorsMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "none");
		$('#gridInfoMoreDiv').css("display", "block");
		loadCityCntyGridData("");
		gridInfoMore();
	} else if (title == "网格分类规模") {
		$('#channelStationInfoMoreDiv').css("display", "none");
		$('#gridInfoMoreDiv').css("display", "none");
		$("#taskMoreDiv").css("display", "none");
		$("#customersMoreDiv").css("display", "none");
		$("#indicatorsMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "none");
		$('#gridTypeMoreDiv').css("display", "block");
		loadCityCntyGridData("1");
		gridTypeMore();
	} else if (title == "基础单元入格信息") {
		$('#gridInfoMoreDiv').css("display", "none");
		$('#gridTypeMoreDiv').css("display", "none");
		$("#taskMoreDiv").css("display", "none");
		$("#customersMoreDiv").css("display", "none");
		$("#indicatorsMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "none");
		$('#channelStationInfoMoreDiv').css("display", "block");
		loadCityCntyGridData("2");
		channelStationInfoMore();
		// 全省网格基础数据入格日通报
		dayReportForm();
	} else if (title == "任务资源概况") {
		$('#gridInfoMoreDiv').css("display", "none");
		$('#gridTypeMoreDiv').css("display", "none");
		$('#channelStationInfoMoreDiv').css("display", "none");
		$("#customersMoreDiv").css("display", "none");
		$("#indicatorsMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "none");
		$("#taskMoreDiv").css("display", "block");
		taskInfoMore();
	}else if (title == "用户规模概况"){
		$('#gridInfoMoreDiv').css("display", "none");
		$('#gridTypeMoreDiv').css("display", "none");
		$('#channelStationInfoMoreDiv').css("display", "none");
		$('#taskMoreDiv').css("display", "none");
		$("#indicatorsMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "none");
		$("#customersMoreDiv").css("display", "block");
		customersMore();
	}else if (title == "指标资源情况"){
		$('#gridInfoMoreDiv').css("display", "none");
		$('#gridTypeMoreDiv').css("display", "none");
		$('#channelStationInfoMoreDiv').css("display", "none");
		$('#taskMoreDiv').css("display", "none");
		$("#customersMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "none");
		$("#indicatorsMoreDiv").css("display", "block");
		indicatorsMore();
	}
	else if (title == "运营监控一览"){
		$('#gridInfoMoreDiv').css("display", "none");
		$('#gridTypeMoreDiv').css("display", "none");
		$('#channelStationInfoMoreDiv').css("display", "none");
		$('#taskMoreDiv').css("display", "none");
		$("#customersMoreDiv").css("display", "none");
		$("#indicatorsMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "block");
		monitoringMore();
	} else if (title == "考核得分") {
		$('#gridInfoMoreDiv').css("display", "none");
		$('#gridTypeMoreDiv').css("display", "none");
		$('#channelStationInfoMoreDiv').css("display", "none");
		$('#taskMoreDiv').css("display", "none");
		$("#customersMoreDiv").css("display", "none");
		$("#indicatorsMoreDiv").css("display", "none");
		$("#monitoringMoreDiv").css("display", "none");
		$("#assessmentScoreMoreDiv").css("display", "block");
		assessmentScoreMore();
	}
	$('#compositeView_modal .compositeView_modal-title').empty();
	$('#compositeView_modal .compositeView_modal-title').append(title + "查询");
	$('#compositeView_modal').modal({
		backdrop : 'static',
		keyboard : false,
		show : true
	});
	$(".compositeView_modal-header  input").each(function() {
		$(this).val('');
	});
	$("select").find("option:first").prop("selected", true);
}

function loadGridInfoDataGrid(json) {
	$('#gridInfoGridtb').GridUnload();
	var colNamesData = [];
	var colModelData = [];
	if (json.gridInfoType == "网格信息") {
		 colNamesData=[ '地市', '区县', '网格', '网格类型', '区域总监', '渠道经理','CD政企经理', '销售经理', '装维人员' ];
		 colModelData=[ 
		 	{name: 'AREA_NAME', align: 'center'}, 
		 	{name: 'CNTY_NAME', align: 'center'}, 
		 	{name: 'GRID_NAME', align: 'center'}, 
		 	{name: 'GRID_TYPE', align: 'center' }, 
		 	{name: 'DIRECTORS', align: 'center'}, 
		 	{name: 'CHNL_MANAGER', align: 'center'}, 
		 	{name: 'CD_MANAGER', align: 'center'},
		 	{name: 'SALE_MANAGER', align: 'center'}, 
		 	{name: 'REPAIE_USER', align: 'center'}
		 ];
	} else {
		colNamesData=[ '地市编码', '地市名称', '区县编码', '区县名称', '工号编码','工号姓名', '归属渠道名称', '渠道8位编码', '身份证号码', '性别', '参加移动直销工作时间', '移动电话' ];
		colModelData=[ 
			{name: 'CITY_ID', align: 'center'}, 
			{name: 'CITY_NAME', align: 'center'}, 
			{name: 'CNTY_ID', align: 'center'}, 
			{name: 'CNTY_NAME', align: 'center'}, 
			{name: 'OFFICE_ID', align: 'center'}, 
			{name: 'NAME', align: 'center'}, 
			{name: 'BELONG_CHNL_NAME', align: 'center'}, 
			{name: 'BELONG_CHNL_CODE', align: 'center'}, 
			{name: 'CUST_ID', align: 'center'}, 
			{name: 'SEX', align: 'center'}, 
			{name: 'WORK_DATE', align: 'center'}, 
			{name: 'PHONE', align: 'center'} 
		];
	}
	$('#gridInfoGridtb').jqGrid({
		url: $.cxt + "/compositeView/getGridInfoMore",
		datatype: "json",
		mtype: "POST",
		height: ($("#gridInfoGrid").height() * 0.8),
		width: 679,
		postData: {
			json: JSON.stringify(json)
        },
		autowidth: false,
		colNames: colNamesData,
		colModel: colModelData,
		shrinkToFit: false,
		autoScroll: true,
		viewrecords: false,
		rownumbers: false,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#gridinfo-pager',
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
}
function loadGridTypeDataGrid(data) {
	$('#gridTypeGridtb').GridUnload();
	var colNames = [];
	var colModel = [];
	if (data.type == "1") {
		colNames=[ '地市', '区县', '网格', '渠道编码', '归属渠道名称' ];
		colModel=[ 
			{name: 'AREA_NAME', align: 'center'}, 
			{name: 'CNTY_NAME', align: 'center'}, 
			{name: 'GRID_NAME', align: 'center'}, 
			{name: 'PHYSIC_CODE', align: 'center'}, 
			{name: 'PHYSIC_NAME', align: 'center'} 
		];
	} else if (data.type == "2") {
		colNames = [ '地市', '区县', '网格', '小区', '小区精度', '小区纬度' ];
		colModel = [ 
			{name: 'AREA_NAME', align: 'center'}, 
			{name: 'CNTY_NAME', align: 'center'}, 
			{name: 'GRID_NAME', align: 'center'},
			{name: 'PHYSIC_NAME', align: 'center'},
			{name: 'PHYSIC_LON', align: 'center'},
			{name: 'PHYSIC_LAT', align: 'center'}
		];
	}
	else if (data.type == "4") {
		colNames = [ '地市', '区县', '网格', 'CD政企客户编码', 'CD政企客户名称', '其他信息' ],
		colModel =[ 
			{name: 'AREA_NAME', align: 'center'}, 
			{name: 'CNTY_NAME', align: 'center'}, 
			{name: 'GRID_NAME', align: 'center'},
			{name: 'PHYSIC_CODE', align: 'center'},
			{name: 'PHYSIC_NAME', align: 'center'},
			{name: 'PHYSIC_REST', align: 'center'} 
		];
	} else if (data.type == "0") {
		colNames = [ '地市', '区县', '网格', '用户数', '收入' ],
		colModel=[ 
			{name: 'AREA_NAME', align: 'center'}, 
			{name: 'CNTY_NAME', align: 'center'},
			{name: 'GRID_NAME', align: 'center'}, 
			{name: 'USER_COUNT', align: 'center'},
			{name: 'INCOME', align: 'center'}
		];
	} else if (data.type == "9") {
		colNames = [ '地市', '区县', '网格', '用户ID', '用户信息', '用户类型', '号码' ],
		colModel =[ 
			{name: 'AREA_NAME', align: 'center'}, 
			{name: 'CNTY_NAME', align: 'center'},
			{name: 'GRID_NAME', align: 'center'},
			{name: 'USER_ID', align: 'center'},
			{name: 'USER_INFO', align: 'center'},
			{name: 'USER_TYPE', align: 'center'},
			{name: 'PHONE', align: 'center'}
		];
	}
	$('#gridTypeGridtb').jqGrid({
		datatype: "json",
		url: $.cxt + "/compositeView/getGridTypeMore",
		mtype: "POST",
		postData: {
			json: JSON.stringify(data)
        },
		height: ($("#gridTypeGrid").height() * 0.8),
		width: 679,
		autowidth: false,
		colNames: colNames,
		colModel: colModel,
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#gridType-pager',
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
}

function dayReportForm() {
	grid = $("#dayReportFormGrid");
	grid.jqGrid({
		url: $.cxt + "/netResources/getDayReportForm",
		datatype: "json",
		mtype: "POST",
		height: ($("#channelStationInfoGrid").height() * 0.8),
		width: $("#channelStationInfoGrid").width(),
		autowidth: false,
		colNames: [ '地市', '总网格数', '现有渠道', '入格数', '进度', '小区数', '入格数', '进度',
			'端口利用率', '资源打标率', '重点小区数', '含重点小区网格数', '总网格数', '已入格重点小区数',
			'入格重点小区占比', '端口利用率', '资源打标率', 'A/B类集团总数', 'A/B类集团已入格数',
			'A/B类集团入格率', 'C/D类集团总数', 'C/D类集团入网格数', 'C/D类集团入网格率', '基站数',
			'入格数', '进度', '网格总数', '上报区域总监数', '已入系统区域总监数 ', '区域总监到位率' ],
		colModel: [ 
			{name: 'CITY_NAME', align: 'center'}, 
			{name: 'GRID_COUNT', align: 'center'}, 
			{name: 'CHNL_COUNT', align: 'center'}, 
			{name: 'CHNL_GRID', align: 'center'},
			{name: 'CHNL_RATE', align: 'center'}, 
			{name: 'CELL_COUNT', align: 'center'},
			{name: 'CELL_GRID', align: 'center'},
			{name: 'CELL_RATE', align: 'center'}, 
			{name: 'PORT_RATE', align: 'center'}, 
			{name: 'ZY_RATE', align: 'center'},
			{name: 'CELL_ZD_COUNT', align: 'center'},
			{name: 'ZD_GRID_COUNT', align: 'center'},
			{name: 'GRID_COUNT_ZD', align: 'center'},
			{name: 'GRID_CELL_COUNT', align: 'center'},
			{name: 'CELL_ZD_RATE', align: 'center'},
			{name: 'PORT_ZD_RATE', align: 'center'}, 
			{name: 'ZY_ZD_RATE', align: 'center'},
			{name: 'AB_COUNT', align: 'center'},
			{name: 'AB_GRID', align: 'center'},
			{name: 'AB_RATE', align: 'center'},
			{name: 'CD_COUNT', align: 'center'},
			{name: 'CD_GRID', align: 'center'}, 
			{name: 'CD_RATE', align: 'center'},
			{name: 'STATION_COUNT', align: 'center'},
			{name: 'STATION_GRID', align: 'center'},
			{name: 'STATION_RATE', align: 'center'}, 
			{name: 'STATIS_DATE', align: 'center'}, 
			{name: 'MANAGER_SB', align: 'center'}, 
			{name: 'MANAGER_WG', align: 'center'}, 
			{name: 'MANAGER_RATE', align: 'center'}
		],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#dayReportFormpager',
		gridComplete: dayReportFormsetNiceScroll,
		loadComplete: function() {
			topjqGridLoadComplete();
		},
	});
}

function dayReportFormsetNiceScroll() {
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight: $(window).height() - 190,
		cursorcolor: "#5cd4f8",
		cursorborder: "1px solid #5cd4f8",
		touchbehavior: false,
		spacebarenabled: true,
		railoffset: false
	});
}

function loadchannelStationInfoDataGrid(data) {
	var headData = [];
	if (data.type == "1") {
		headData = [ '地市编码', '地市名称', '区县编码', '区县名称', '网格编码', '网格名称', '是否入格',
			'渠道编码', '渠道名称', '渠道经度', '渠道纬度', '类型', '其他信息' ];
	} else if (data.type == "2") {
		headData = [ '地市编码', '地市名称', '区县编码', '区县名称', '网格编码', '网格名称', '是否入格',
			'小区编码', '小区名称', '小区经度', '小区纬度', '类型', '其他信息' ];
	} else if (data.type == "3") {
		headData = [ '地市编码', '地市名称', '区县编码', '区县名称', '网格编码', '网格名称', '是否入格',
			'AB集团编码', 'AB集团名称', 'AB集团经度', 'AB集团纬度', '类型', '其他信息' ];
	} else if (data.type == "4") {
		headData = [ '地市编码', '地市名称', '区县编码', '区县名称', '网格编码', '网格名称', '是否入格',
			'CD集团编码', 'CD集团名称', 'CD集团经度', 'CD集团纬度', '类型', '其他信息' ];
	} else if (data.type == "5") {
		headData = [ '地市编码', '地市名称', '区县编码', '区县名称', '网格编码', '网格名称', '是否入格',
			'基站编码', '基站名称', '基站经度', '基站纬度', '类型', '其他信息' ];
	}
	$('#channelStationInfoGridtb').GridUnload();
	$('#channelStationInfoGridtb').jqGrid({
		datatype: "json",
		url: $.cxt + "/compositeView/channelStationInfoMore",
		mtype: "POST",
		postData: {
			json: JSON.stringify(data)
        },
		height: ($("#channelStationInfoGrid").height() * 0.8),
		width: $("#channelStationInfoGrid").width(),
		autowidth: false,
		colNames: headData,
		colModel: [ 
	     	{name: 'AREA_ID', align: 'center'},
	     	{name: 'AREA_NAME', align: 'center'},
	     	{name: 'CNTY_ID', align: 'center'}, 
	     	{name: 'CNTY_NAME', align: 'center'},
	     	{name: 'GRID_ID', align: 'center'},
	     	{name: 'GRID_NAME', align: 'center'},
	     	{name: 'ENTER_GRID', align: 'center'},
	     	{name: 'PHYSIC_CODE', align: 'center'}, 
	     	{name: 'PHYSIC_NAME', align: 'center'},
	     	{name: 'PHYSIC_LON', align: 'center'},
	     	{name: 'PHYSIC_LAT', align: 'center'}, 
	     	{name: 'PHYSIC_TYPE', align: 'center'}, 
	     	{name: 'PHYSIC_RESET', align: 'center'} 
	     ],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#channelStationInfoMore-pager',
		loadComplete: function() {
			topjqGridLoadComplete();
		}
	});
}

function gridInfoMore() {
	// 判断是网格信息还是直销人员信息
	var cityId = "";
	var cntyId = "";
	var gridId = "";
	var gridInfoType = $('#gridInfoType option:selected').val();
	var citySelect = $('#citySelect option:selected').val();
	var cntySelect = $('#cntySelect option:selected').val();
	var gridSelect = $('#gridSelect option:selected').val();
	if (gridSelect == "") {
		if (cntySelect == "") {
			if (citySelect != "") {
				cityId = citySelect;
			}
		} else {
			cntyId = cntySelect;
		}
	} else {
		gridId = gridSelect;
	}
    var json = {
	    gridInfoType: gridInfoType,
	    cityId: cityId,
	    cntyId: cntyId,
	    gridId: gridId
    };
	loadGridInfoDataGrid(json);
}


function gridTypeMore() {
	var type = $('#gridTypeSelect option:selected').val();
	var cityId = "";//
	var cntyId = "";
	var gridId = "";
	var citySelect = $('#citySelect1 option:selected').val();
	var cntySelect = $('#cntySelect1 option:selected').val();
	var gridSelect = $('#gridSelect1 option:selected').val();
	if (gridSelect == "") {
		if (cntySelect == "") {
			if (citySelect != "") {
				cityId = citySelect;
			}
		} else {
			cntyId = cntySelect;
		}
	} else {
		gridId = gridSelect;
	}
	var json = {
	    type: type,
	    cityId: cityId,
		cntyId: cntyId,
	    gridId: gridId
	}
	loadGridTypeDataGrid(json);
}

function taskInfoMore() {
	loadAreaCascade();
	var json = {
		areaId: $("#hiddenOrgId").val(),
		orgLevel: orgLevelParam
	};
	var areaName = '';
	if (orgLevelParam == '1'){
		areaName = '地市名称';
	} else if (orgLevelParam == '2'){
		areaName = '区县名称';
	} else if (orgLevelParam == '3'){
		areaName = '网格名称';
	} else if (orgLevelParam == '4'){
		areaName = '渠道名称';
	} else if (orgLevelParam == '5'){
		areaName = '渠道名称';
	}
	$('#taskTable').GridUnload();
	$('#taskTable').jqGrid({
		url: $.cxt + "/compositeView/getTaskInfoMore",
		datatype: "json",
		mtype: "POST",
		postData: {
			json: JSON.stringify(json)
		},
		height: ($("#taskGrid").height() * 0.8),
		width: $("#taskGrid").width(),
		autowidth: false,
		colNames: [ areaName, '个人客户总计费收入(亿元)', '新增客户总计费收入', '放号', '宽带新增',
			'泛终端合约(台)', '新增家庭网', '新增价值洼地', '重点客户固移融合率', '中小微企业圈地行动（小微宽带+企业上云）' ],
		colModel: [ 
			{name: 'AREA_NAME', align: 'center'},
			{name: 'CUS_INCOME', align: 'center'},
			{name: 'CUS_ADD_INCOME', align: 'center'},
			{name: 'TELE_COUNT', align: 'center'}, 
			{name: 'BROAD_ADD', align: 'center'},
			{name: 'TERMINAL', align: 'center'}, 
			{name: 'HOME_ADD_NET', align: 'center'}, 
			{name: 'VALUE_DEP', align: 'center'},
			{name: 'FUSION_RATE', align: 'center', formatter: rateFormat},
			{name: 'ENCLOSURE_COUNT', align: 'center'} 
		],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#task-pager',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}

//用户规模概况
function customersMore() {
	var json = {
		areaId: $("#hiddenOrgId").val(),
		orgLevel: orgLevelParam
	};
	$('#customersGridtb').GridUnload();
	$('#customersGridtb').jqGrid({
		url: $.cxt + "/compositeView/customersMore",
		datatype: "json",
		mtype: "POST",
		postData: {
			json: JSON.stringify(json)
		},
		height: ($("#customersGrid").height() * 0.8),
		width: $("#customersGrid").width(),
		autowidth : false,
		colNames : [ '地区', '个人客户总计费收入(亿元)', '新增客户总计费收入', '放号', '宽带新增',
			'泛终端合约()', '新增家庭网', '新增价值洼地', '重点客户固移融合率', '中小微企业圈地行动（小微宽带+企业上云）' ],
		colModel: [ 
			{name: 'AREA_NAME', align: 'center'},
			{name: 'CUS_INCOME', align: 'center'},
			{name: 'CUS_ADD_INCOME', align: 'center'},
			{name: 'TELE_COUNT', align: 'center'},
			{name: 'BROAD_ADD', align: 'center'}, 
			{name: 'TERMINAL', align: 'center'},
			{name: 'HOME_ADD_NET', align: 'center'},
			{name: 'VALUE_DEP', align: 'center'},
			{name: 'FUSION_RATE', align: 'center'},
			{name: 'ENCLOSURE_COUNT', align: 'center'}
		],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#customersMore-pager',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}

// 指标资源情况
function indicatorsMore() {
	var json = {
		areaId : $("#hiddenOrgId").val(),
		orgLevel : orgLevelParam
	};
	$('#indicatorsGridtb').GridUnload();
	$('#indicatorsGridtb').jqGrid({
		url: $.cxt + "/compositeView/indicatorsMore",
		datatype: "json",
		mtype: "POST",
		postData: {
			json: JSON.stringify(json)
		},
		height: ($("#indicatorsGrid").height() * 0.8),
		width: $("#indicatorsGrid").width(),
		autowidth: false,
		colNames: [ '地区', '个人客户总计费收入(亿元)', '新增客户总计费收入', '放号', '宽带新增',
			'泛终端合约()', '新增家庭网', '新增价值洼地', '重点客户固移融合率', '中小微企业圈地行动（小微宽带+企业上云）' ],
		colModel: [
			{name: 'AREA_NAME', align: 'center'}, 
			{name: 'CUS_INCOME', align: 'center'},
			{name: 'CUS_ADD_INCOME', align: 'center'},
			{name: 'TELE_COUNT', align: 'center'},
			{name: 'BROAD_ADD', align: 'center'}, 
			{name: 'TERMINAL', align: 'center'},
			{name: 'HOME_ADD_NET', align: 'center'},
			{name: 'VALUE_DEP', align: 'center'},
			{name: 'FUSION_RATE', align: 'center'},
			{name: 'ENCLOSURE_COUNT', align: 'center'}
		],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#indicatorsMore-pager',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}

function monitoringMore() {
	var json = {
		areaId : $("#hiddenOrgId").val(),
		orgLevel : orgLevelParam
	};
	$('#monitoringGridtb').GridUnload();
	$('#monitoringGridtb').jqGrid({
		url: $.cxt + "/compositeView/monitoringMore",
		datatype: "json",
		mtype: "POST",
		postData: {
			json: JSON.stringify(json)
		},
		height: ($("#monitoringGrid").height() * 0.8),
		width: $("#monitoringGrid").width(),
		autowidth: false,
		colNames: [ '地区', '个人客户总计费收入(亿元)', '新增客户总计费收入', '放号', '宽带新增',
			'泛终端合约()', '新增家庭网', '新增价值洼地', '重点客户固移融合率', '中小微企业圈地行动（小微宽带+企业上云）' ],
		colModel: [ 
			{name: 'AREA_NAME', align: 'center'},
			{name: 'CUS_INCOME', align: 'center'},
			{name: 'CUS_ADD_INCOME', align: 'center'},
			{name: 'TELE_COUNT', align: 'center'}, 
			{name: 'BROAD_ADD', align: 'center'}, 
			{name: 'TERMINAL', align: 'center'},
			{name: 'HOME_ADD_NET', align: 'center'},
			{name: 'VALUE_DEP', align: 'center'},
			{name: 'FUSION_RATE', align: 'center'},
			{name: 'ENCLOSURE_COUNT', align: 'center'}
		],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#monitoringMore-pager',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}

function assessmentScoreMore() {
	var json = {
		areaId : $("#hiddenOrgId").val(),
		orgLevel : orgLevelParam
	};
	$('#assessmentScoreGridtb').GridUnload();
	$('#assessmentScoreGridtb').jqGrid({
		url: $.cxt + "/compositeView/assessmentScoreMore",
		datatype: "json",
		mtype: "POST",
		postData: {
			json: JSON.stringify(json)
		},
		height: ($("#assessmentScoreGrid").height() * 0.8),
		width: $("#assessmentScoreGrid").width(),
		autowidth: false,
		colNames: [ '地区', '个人客户总计费收入(亿元)', '新增客户总计费收入', '放号', '宽带新增',
			'泛终端合约()', '新增家庭网', '新增价值洼地', '重点客户固移融合率', '中小微企业圈地行动（小微宽带+企业上云）' ],
		colModel: [ 
			{name: 'AREA_NAME', align: 'center'}, 
			{name: 'CUS_INCOME', align: 'center'},
			{name: 'CUS_ADD_INCOME', align: 'center'}, 
			{name: 'TELE_COUNT', align: 'center'},
			{name: 'BROAD_ADD', align: 'center'}, 
			{name: 'TERMINAL', align: 'center'},
			{name: 'HOME_ADD_NET', align: 'center'}, 
			{name: 'VALUE_DEP', align: 'center'},
			{name: 'FUSION_RATE', align: 'center'},
			{name: 'ENCLOSURE_COUNT', align: 'center'}
		],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#assessmentScoreMore-pager',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}

function channelStationInfoMore() {
	var type = $('#channelStationInfoTypeSelect option:selected').val();
	var cityId = "";
	var cntyId = "";
	var gridId = "";
	var citySelect = $('#citySelect2 option:selected').val();
	var cntySelect = $('#cntySelect2 option:selected').val();
	var gridSelect = $('#gridSelect2 option:selected').val();
	if (gridSelect == "") {
		if (cntySelect == "") {
			if (citySelect != "") {
				cityId = citySelect;
			}
		} else {
			cntyId = cntySelect;
		}
	} else {
		gridId = gridSelect;
	}
	var json = {
		type: type,
	    cityId: cityId,
		cntyId: cntyId,
	    gridId: gridId
	}
	loadchannelStationInfoDataGrid(json);
}
//加载地市区县网格下拉框数据
function loadCityCntyGridData(idStr) {
	var orgLevel = orgLevelParam;
	$("#citySelect"+idStr).empty();
	$("#cntySelect"+idStr).empty();
	$("#gridSelect"+idStr).empty();
	var areaId = $("#hiddenOrgId").val();
	$("#gridSelect"+idStr).append("<option value=''>全选</option>");
	$.ajax({
		url: $.cxt + "/compositeView/getAreaOrChnlInfo",
		type: 'POST',
		data: {
			orgLevel: orgLevel,
			orgId: areaId
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if (json.code == '0') {
				var childList = json.data.childList;
				var html ="<option value=''>全选</option>";
				for (var i = 0; i < childList.length; i++) {
					html += "<option value = '" + childList[i].AREA_ID + "'>" + childList[i].AREA_NAME + "</option>";
				}
				if (orgLevel == "1") {
					$("#citySelect"+idStr).append(html);
					$("#citySelect"+idStr).attr("disabled", false);
					$("#cntySelect"+idStr).append("<option value=''>全选</option>");
				} else if (orgLevel == "2") {
					var parentMap = json.data.parentMap;
					$("#citySelect"+idStr).append("<option value='" + parentMap.AREA_ID + "'>" + parentMap.AREA_NAME + "</option>");
					$("#citySelect"+idStr).attr("disabled", "disabled");
					$("#cntySelect"+idStr).append(html);
				}
			}
		}
	});
}

//more详情地区级联
function cityCntyGridChange(idStr) {
	var areaId = $("#hiddenOrgId").val();
	var Level = "";
	var select=idStr.split('Select');
	if(idStr.indexOf("citySelect") != -1){
		Level = "1";
		var citySelectVal = $("#"+idStr).val();
		if (citySelectVal != "") {
			areaId = citySelectVal;
		}
		var html = "<option value=''>全选</option>";
		$("#cntySelect"+select[1]).empty();
		$("#gridSelect"+select[1]).empty();
		$("#cntySelect"+select[1]).append(html);
		$("#gridSelect"+select[1]).append(html);
	}
	if(idStr.indexOf("cntySelect") != -1){
		Level = "2";
		var citySelectVal = $("#"+idStr).val();
		if (citySelectVal != "") {
			areaId = citySelectVal;
		}
		var html = "<option value=''>全选</option>";
		$("#gridSelect"+select[1]).empty();
		$("#gridSelect"+select[1]).append(html);
	}
    if(Level=="1"){
    	idStr="cntySelect"+select[1];
    }else if(Level=="2"){
    	idStr="gridSelect"+select[1];
    }
	var idObject = $("#" + idStr);
	$.ajax({
		url: $.cxt + "/compositeView/getAreaOrChnlInfo",
		type: 'POST',
		data: {
			orgLevel: Level,
			orgId: areaId
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if (json.code == '0') {
				var childList = json.data.childList;
				idObject.empty();
				var html = "<option value=''>全选</option>";
				for (var i = 0, n = childList.length; i < n; i++) {
					html += "<option value = '" + childList[i].AREA_ID + "'>" + childList[i].AREA_NAME + "</option>";
				}
				idObject.append(html);
			}
		}
	});
}



// 任务资源详情弹出层初始化时加载地区条件
function loadAreaCascade() {
	var orgLevel = orgLevelParam;
	var areaId = $("#hiddenOrgId").val();
	$("#gridSelect11").empty();
	$("#chnlSelect11").empty();
	$("#gridSelect11").append("<option value=''>全选</option>");
	$("#chnlSelect11").append("<option value=''>全选</option>");
	$.ajax({
		url: $.cxt + "/compositeView/getAreaOrChnlInfo",
		type: 'POST',
		data: {
			orgLevel: orgLevel,
			orgId: areaId
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if (json.code == '0') {
				var childList = json.data.childList;
				if (orgLevel == "1") {
					$("#citySelect11").empty();
					$("#cntySelect11").empty();
				} else if (orgLevel == "2") {
					$("#citySelect11").empty();
					$("#cntySelect11").empty();
				}
				var html = "<option value=''>全选</option>";
				for (var i = 0; i < childList.length; i++) {
					html += "<option value = '" + childList[i].AREA_ID + "'>" + childList[i].AREA_NAME + "</option>";
				}
				if (orgLevel == "1") {
					$("#citySelect11").append(html);
					$("#cntySelect11").append("<option value=''>全选</option>");
				} else if (orgLevel == "2") {
					var parentMap = json.data.parentMap;
					$("#citySelect11").append("<option value='" + parentMap.AREA_ID + "'>" + parentMap.AREA_NAME + "</option>");
					$("#cntySelect11").append(html);
				}
			}
		}
	});
}

// 任务资源详情地区级联
function selectLoad(idStr) {
	var areaId = $("#hiddenOrgId").val();
	var orgLevel = "";
	if ("cntySelect11" == idStr) {
		var citySelectVal = $("#citySelect11").val();
		if (citySelectVal != "") {
			areaId = citySelectVal;
		}
		orgLevel = "2";
		var html = "<option value=''>全选</option>";
		$("#cntySelect11").empty();
		$("#gridSelect11").empty();
		$("#chnlSelect11").empty();
		$("#cntySelect11").append(html);
		$("#gridSelect11").append(html);
		$("#chnlSelect11").append(html);
		if ($("#citySelect11").val() == '') {
			return;
		}
	} else if ("gridSelect11" == idStr) {
		var cntySelectVal = $("#cntySelect11").val();
		if (cntySelectVal != "") {
			areaId = cntySelectVal;
		}
		orgLevel = "3";
		var html = "<option value=''>全选</option>";
		$("#gridSelect11").empty();
		$("#chnlSelect11").empty();
		$("#gridSelect11").append(html);
		$("#chnlSelect11").append(html);
		if ($("#cntySelect11").val() == '') {
			return;
		}
	} else if ("chnlSelect11" == idStr) {
		var gridSelectVal = $("#gridSelect11").val();
		if (gridSelectVal != "") {
			areaId = gridSelectVal;
		}
		orgLevel = "4";
		var html = "<option value=''>全选</option>";
		$("#chnlSelect11").empty();
		$("#chnlSelect11").append(html);
		if ($("#gridSelect11").val() == '') {
			return;
		}
	}
	var idObject = $("#" + idStr);
	$.ajax({
		url: $.cxt + "/compositeView/getAreaOrChnlInfo",
		type: 'POST',
		data: {
			orgLevel: orgLevel,
			orgId: areaId
		},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if (json.code == '0') {
				var childList = json.data.childList;
				idObject.empty();
				var html = "<option value=''>全选</option>";
				for (var i = 0, n = childList.length; i < n; i++) {
					html += "<option value = '" + childList[i].AREA_ID + "'>" + childList[i].AREA_NAME + "</option>";
				}
				idObject.append(html);
			}
		}
	});
}

// 任务资源详情查询
function taskSearch() {
	var areaId = "";
	var orgLevel = "";
	var citySelectVal = $("#citySelect11").val();
	var cntySelectVal = $("#cntySelect11").val();
	var gridSelectVal = $("#gridSelect11").val();
	var chnlSelectVal = $("#chnlSelect11").val();
	var areaName = '';
	if (citySelectVal != '') {
		areaId = citySelectVal;
		orgLevel = '2';
		areaName = '区县名称';
	} else {
		orgLevel = '1';
		areaName = '地市名称';
	}
	if (cntySelectVal != '') {
		areaId = cntySelectVal;
		orgLevel = '3';
		areaName = '网格名称';
	}
	if (gridSelectVal != '') {
		areaId = gridSelectVal;
		orgLevel = '4';
		areaName = '渠道名称';
	}
	if (chnlSelectVal != '') {
		areaId = chnlSelectVal;
		orgLevel = '5';
		areaName = '渠道名称';
	}
	var json = {
		areaId: areaId,
		orgLevel: orgLevel
	};
	$('#taskTable').GridUnload();
	$('#taskTable').jqGrid({
		url: $.cxt + "/compositeView/getTaskInfoMore",
		datatype: "json",
		mtype: "POST",
		postData: {
			json: JSON.stringify(json)
		},
		height: ($("#taskGrid").height() * 0.8),
		width: $("#taskGrid").width(),
		autowidth: false,
		colNames: [ areaName, '个人客户总计费收入(亿元)', '新增客户总计费收入', '放号', '宽带新增',
			'泛终端合约(台)', '新增家庭网', '新增价值洼地', '重点客户固移融合率', '中小微企业圈地行动（小微宽带+企业上云）' ],
		colModel: [ 
			{name: 'AREA_NAME', align: 'center'},
			{name: 'CUS_INCOME', align: 'center'},
			{name: 'CUS_ADD_INCOME', align: 'center'},
			{name: 'TELE_COUNT', align: 'center'}, 
			{name: 'BROAD_ADD', align: 'center'},
			{name: 'TERMINAL', align: 'center'}, 
			{name: 'HOME_ADD_NET', align: 'center'}, 
			{name: 'VALUE_DEP', align: 'center'},
			{name: 'FUSION_RATE', align: 'center', formatter: rateFormat},
			{name: 'ENCLOSURE_COUNT', align: 'center'} 
		],
		viewrecords: false,
		rownumbers: false,
		shrinkToFit: false,
		autoScroll: true,
		rowNum: 10,
		rowList: [ 10, 20, 30 ],
		pager: '#task-pager',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}


function reset(type) {
	$(".compositeView_modal-header  input").each(function() {
		$(this).val('');
	});
	$("select").find("option:first").prop("selected", true);
	if (type == "gridInfoMore") {
		loadCityCntyGridData("");
		gridInfoMore();
	}
	if (type == "gridTypeMore") {
		loadCityCntyGridData("1");
		gridTypeMore();
	}
	if (type == "channelStationInfoMore") {
		loadCityCntyGridData("2");
		channelStationInfoMore();
	}
}

//小数点转化成百分号
function rateFormat(celval, options, rowdata){
	return (celval * 100).toFixed(2) + "%";
}

$("#checkSecondAllPoiInfo").on("change", checkSecondAllPoiInfo);
function checkSecondAllPoiInfo() {
	alert("3333");
	if ($("#checkSecondAllPoiInfo").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportSecondInfos']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportSecondInfos']").prop("checked",false);
    }  
}

