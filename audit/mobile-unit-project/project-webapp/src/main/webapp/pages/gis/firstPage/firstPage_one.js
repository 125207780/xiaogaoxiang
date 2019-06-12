$(function(){
	//初始化下拉框
	initSelectPortrait();
	var publicOrgId = "";
	var publicOrgLevel = "";
	$("#lineDay").css('color','#0283ff');
	$(".lineDate").click(function() {
		$(this).css('color','#0283ff');
		var lineId = $(this).attr("lineId");
		$(".lineDate").each(function(index,element){
			var lineId1 = $(element).attr("lineId");
			if(lineId1 != lineId){
				$(element).css("color",'#fff');
			}
		})
		echartsLine(publicOrgId,lineId);
	});
	$(".portrait-buttom").niceScroll({
		cursorheight: $(window).height() - 190,
	    cursorcolor: "#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
	var orgId = $(".orgId").val();
	//地图相关
	var unSelectColor = '#999999';
	var kpiDataList = [];
	var mapObj = null;
	$("#mainOrg").append("<div id='smallMap_main' style='width: 100%; height: 100%'></div>");
	var showMaxBtn = $('<span style="display: none; top: -4px; font-size: 15px; cursor: pointer; position: absolute; z-index: 10; right: 10px;" class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>');
	$("#mainOrg").append(showMaxBtn);
	showMaxBtn.show();
 	var emap = showEmap(orgId, "smallMap_main", callBack);
	function callBack(_orgId, orgLevel) {
		// 当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		if(orgLevel == "4") {
		} else {
			mapObj = this.next();
			if(mapObj.objType == "Echarts") {
			} else {
			}
		}
		publicOrgLevel = orgLevel
		publicOrgId = _orgId
		var lineId = "";
		$(".lineDate").each(function() {
			if($(this).css('color') == 'rgb(2, 131, 255)') {
				lineId = $(this).attr('lineId');
			}
		});
		echartsLine(publicOrgId, lineId);
		//折线图(中)
		getFiveInfo(publicOrgId);
		//柱状图(右)
		rightBar(publicOrgId);
		//饼图(右)
		rightPie(_orgId);
		rightPieTable(_orgId)
		var parentId = $("#portraitFirstType").find("option:selected").val();
		var userType = $("#portraitSecondType").find("option:selected").val();
		if(parentId == 'SUI101') {
			if(userType == '2') {
				threearpuEcharts(publicOrgId);
				broadbandEcharts(publicOrgId);
				flowEcharts(publicOrgId);
				userScale(publicOrgId);
				inNet(publicOrgId);
				accessEcharts(publicOrgId);
				warningEcharts(publicOrgId);
			} else {
				areaAge(publicOrgId,userType);
				arpuBar(publicOrgId,userType);
				douEcharts(publicOrgId,userType);
				mouEcharts(publicOrgId,userType);
				preferenceEcharts(publicOrgId,userType);
				appEcharts(publicOrgId,userType);
			}
		} else if(parentId == 'SUI102') {
			chnlnumEcharts(publicOrgId);
			chnlstarEcharts(publicOrgId);
			chnlNumFull(publicOrgId);
			chnlShare(publicOrgId);
		} else {
		}
		getTopFive(_orgId);
		// 显示top5数据
		showTop();
	}
	
	// 窗口缩放
	$(".glyphicon-fullscreen").click(function() {
		topwindow.showHtmlWindow($("#mainOrg"), {
			width:700,
			height:400,
			title:"信息展示",
			closeBtnFun:function() {
				$(".middle-map").append($("#mainOrg"));
				$(".glyphicon-fullscreen").show();
				mapObj.resize(); 
			},
			fun:function() {
				$(".glyphicon-fullscreen").hide();
				mapObj.resize();
			}
		});
	});

	$(".middleButton>span").click(function() {
		var kpiId = $(this).attr('id');
		$('.middleButton>span').each(function(index, element) {
			var tempId = $(element).attr('id');
			if(kpiId == tempId) {
				$(element).css("color", 'red').css("font-weight", 'bold');
				$(element).next().css("color", 'red').css("font-weight", 'bold');
			} else {
				$(element).css("color", '#fff').css("font-weight", 'normal');
				$(element).next().css("color", '#fff').css("font-weight", 'normal');
			}
		});
		getTopFive(publicOrgId);
		// 显示top5数据
		showTop();
		rightPie(publicOrgId);
		rightBar(publicOrgId);
		rightPieTable(publicOrgId);
	});
	
	// 获取前五的数据
	var getTopFive = function(orgId) {
		var scale = '';
		$(".middleButton>span").each(function() {
			if($(this).css('color') == 'rgb(255, 0, 0)') {
				scale = $(this).attr('id');
			}
		})
		$.ajax({
			url: $.cxt + "/pageOne/getTopFive", 
			type: "POST",
			data: {
				orgId: orgId,
				scale: scale
			}, 
			async: false,
			success: function(data) {
				var json = JSON.parse(data);
				if(json.code == '0') {
					kpiDataList = json.data;
				}
			}
		});
		if(mapObj.objType=="Echarts") {
			var data = [];
			var option = mapObj.getOption();
			option.tooltip = {
				trigger: 'item',
				formatter: function (params) {
					if(typeof(params.data.value) == "undefined") {
						return params.data.name + ' : ' + '无数据';
					} else {
						return params.data.name + ' : ' + params.data.value[2];
					}
				}
			};
//			option.visualMap = {}
//			option.visualMap = {
//				type: 'piecewise',
//				textStyle: {color: "gold"},
//				pieces: pieces,
				// 不选中的时候底色
//				outOfRange: {color: [unSelectColor]},  
//				show: true,
				// 只对地图生效，0 对应 地图的 index
//				seriesIndex: [0],  
//			}
			var mapId = mapObj.mapId;
			var cityList = echarts.getMap(mapId).geoJson.features;
			for(var i = 0, k = cityList.length; i < k; i++) {
				var tmpObj = cityList[i].properties;
				for(var j = 0, x = kpiDataList.length; j < x; j++) {
					if(tmpObj.id == kpiDataList[j].PUB_ORG_ID) {
						data.push({
							"name": tmpObj.name,
							"value": tmpObj.cp.concat(kpiDataList[j].PUB_DATA)
//							"top5" :tmpObj.cp.concat(kpiDataList[j].TOP)
						});
					}
				}
			}
			var colorMap = {
				type: 'map',
				geoIndex: 0,
				data: data
			}	
			option.series = [];
			option.series.push(colorMap);
			mapObj.clear();
			mapObj.setOption(option);
		} else {
			var option = mapObj.getOption();
			var mapId = mapObj.mapId;
			var cityList = echarts.getMap(mapId).geoJson.features;
			var data = [];
			for(var i = 0, n = kpiDataList.length; i < n; i++) {
				var kpi = kpiDataList[i].PUB_DATA;
				var orgId = kpiDataList[i].PUB_ORG_ID;
				for(var j = 0, k = cityList.length; j < k; j++) {
					var tmpObj = cityList[j].properties;
					if(tmpObj.id == orgId) {
						data.push({
							"name": tmpObj.name,
							"value": tmpObj.cp.concat(kpi),
						});
						break;
					}
				}
			}
//			option.visualMap={
//				textStyle: {color: "#00F"},
//				pieces: pieces,
				// 不选中的时候底色
//				outOfRange: {color: [unSelectColor]},  
//				show: true,
//				right: 20,
//				bottom: 20,
//				align: 'left',
				// 只对地图生效，0 对应 地图的 index
//				seriesIndex: [0],
//			}
			mapObj.setOption(option);
		}
	}
	
	function showTop() {
		$("#topPanel").remove();
		var topPanel = $("<div class='topPanel' id='topPanel'></div>");
		$("#smallMap_main").append(topPanel);
		if(publicOrgLevel == '3' || publicOrgLevel == '4'){
			$("#topPanel").css('background-color','#2e3052').css('opacity','0.9').css('left','10px').css('bottom','10px');
		}
		var topList = kpiDataList.slice(0, 5);
		var html = "";
		for(var i = 0, n = topList.length; i < n; i++) {
			html += "<div>NO." + (i + 1) + "&nbsp;" + topList[i].PUB_ORG_NAME + "&nbsp;" + topList[i].PUB_DATA + "</div>";
		}
		$("#topPanel").html(html);
	}
	
	$("#portraitFirstType").change(function() {
		var portraitCode = $(this).find("option:selected").val();
		$.ajax({
			url: $.cxt + "/pageOne/getSelectChildren", 
			type: "POST",
			data: {portraitCode: portraitCode},
			async: false,
			success: function(data) {
				var json = JSON.parse(data);
				if(json.code == '0') {
					$("#portraitSecondType").empty();
					var html = "";
					for(var i = 0, j = json.data.length; i < j; i++) {
						html += "<option value='" + json.data[i].CONDITION_CODE + "' parentId='" 
							+ json.data[i].PARENT_ID + "'>" + json.data[i].CONDITION_NAME + "</option>";
					}
					$("#portraitSecondType").html(html);
				}
			}
		});
		var userType = $("#portraitSecondType").find("option:selected").val()
		if(portraitCode == 'SUI101') {
			$("#secondSelect").show();
			$(".portrait-buttom").empty();
			if(userType == '2') {
				var broadbandHtml = 
					"<div class=\"broadband-threearpu\">"
					+ "<div class=\"magicEchartsTop\">"
					+ "<span>魔百盒</span>"
					+ "</div>"
					+ "<div class=\"magic-echarts\">"
					+ "<div class=\"threearpu-echarts1\">"
					+ "<div id=\"userScale\"></div>"
					+ "</div>"
					+ "<div class=\"broadband-echarts1\">"
					+ "<div id=\"inNet\"></div>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"broadband-threearpu\">"
					+ "<div class=\"pre-echarts\">"
					+ "<div class=\"preEchartsTop\">"
					+ "<span>月均ARPU</span>"
					+ "</div>"
					+ "<div id=\"threearpuEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"network-flow\">"
					+ "<div class=\"flow-echarts\">"
					+ "<div class=\"flowEchartsTop\">"
					+ "<span>上网流量趋势</span>"
					+ "</div>"
					+ "<div id=\"flowEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"broadband-threearpu\">"
					+ "<div class=\"pre-echarts\">"
					+ "<div class=\"preEchartsTop\">"
					+ "<span>到期预警</span>"
					+ "</div>"
					+ "<div id=\"warningEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"broadband-threearpu\">"
					+ "<div class=\"threearpu-echarts\">"
					+ "<div class=\"threearpuEchartsTop\">"
					+ "<span>接入方式</span>"
					+ "</div>"
					+ "<div id=\"accessEcharts\"></div>"
					+ "</div>"
					+ "<div class=\"broadband-echarts\">"
					+ "<div class=\"broadbandEchartsTop\">"
					+ "<span>宽带带宽</span>"
					+ "</div>"
					+ "<div id=\"broadbandEcharts\"></div>"
					+ "</div>"
					+ "</div>";
				$(".portrait-buttom").append(broadbandHtml);
				threearpuEcharts(publicOrgId);
				broadbandEcharts(publicOrgId);
				flowEcharts(publicOrgId);
				userScale(publicOrgId);
				inNet(publicOrgId);
				accessEcharts(publicOrgId);
				warningEcharts(publicOrgId);
			} else {
				var schoolHtml = 
					"<div class=\"areaAge-arpu\">"
					+ "<div class=\"area-age\">"
					+ "<div class=\"areaAgeTop\">"
					+ "<span>年龄占比&性别分布</span>"
					+ "</div>"
					+ "<div id=\"areaAge\"></div>"
					+ "</div>"
					+ "<div class=\"arpu-bar\">"
					+ "<div class=\"arpuBarTop\">"
					+ "<span>用户ARPU消费情况</span>"
					+ "</div>"
					+ "<div id=\"arpuBar\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"dou-mou\">"
					+ "<div class=\"dou-echarts\">"
					+ "<div class=\"douEchartsTop\">"
					+ "<span>用户DOU使用情况</span>"
					+ "</div>"
					+ "<div id=\"douEcharts\"></div>"
					+ "</div>"
					+ "<div class=\"mou-echarts\">"
					+ "<div class=\"mouEchartsTop\">"
					+ "<span>用户MOU使用情况</span>"
					+ "</div>"
					+ "<div id=\"mouEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"preference-app\">"
					+ "<div class=\"preference-echarts\">"
					+ "<div class=\"preferenceEchartsTop\">"
					+ "<span>常驻用户偏好终端品牌</span>"
					+ "</div>"
					+ "<div id=\"preferenceEcharts\"></div>"
					+ "</div>"
					+ "<div class=\"app-echarts\">"
					+ "<div class=\"appEchartsTop\">"
					+ "<span>区域用户APP使用次数</span>"
					+ "</div>"
					+ "<div id=\"appEcharts\"></div>"
					+ "</div>"
					+ "</div>";
				$(".portrait-buttom").append(schoolHtml);
				areaAge(publicOrgId, userType);
				arpuBar(publicOrgId, userType);
				douEcharts(publicOrgId, userType);
				mouEcharts(publicOrgId, userType);
				preferenceEcharts(publicOrgId, userType);
				appEcharts(publicOrgId, userType);
			}
		} else if(portraitCode == 'SUI102') {
			$("#secondSelect").hide();
			$(".portrait-buttom").empty()
			var chnlHtml = 
				 "<div class=\"broadband-threearpu\">"
				 + "<div class=\"threearpu-echarts\">"
				 + "<div class=\"threearpuEchartsTop\">"
				 + "<span>渠道数</span>"
				 + "</div>"
				 + "<div id=\"chnlnumEcharts\"></div>"
				 + "</div>"
				 + "<div class=\"broadband-echarts\">"
				 + "<div class=\"broadbandEchartsTop\">"
				 + "<span>渠道星级</span>"
				 + "</div>"
				 + "<div id=\"chnlstarEcharts\"></div>"
				 + "</div>"
				 + "</div>"
				 + "<div class=\"network-flow\">"
				 + "<div class=\"flow-echarts\">"
				 + "<div class=\"flowEchartsTop\">"
				 + "<span>渠道数</span>"
				 + "</div>"
				 + "<div id=\"chnlNumFull\"></div>"
				 + "</div>"
				 + "</div>"
				 + "<div class=\"broadband-threearpu\">"
				 + "<div class=\"flow-echarts\">"
				 + "<div class=\"flowEchartsTop\">"
				 + "<span>渠道份额</span>"
				 + "</div>"
				 + "<div id=\"chnlShare\"></div>"
				 + "</div>"
				 + "</div>";
			$(".portrait-buttom").append(chnlHtml);
			chnlnumEcharts(publicOrgId);
			chnlstarEcharts(publicOrgId);
			chnlNumFull(publicOrgId);
			chnlShare(publicOrgId);
		} else {
			$("#secondSelect").show();
			$(".portrait-buttom").empty();
		}
	});
	
	$("#portraitSecondType").change(function() {
		var userType = $(this).find("option:selected").val();
		var parentId = $(this).find("option:selected").attr('parentid');
		if(parentId == 'SUI101') {
			if(userType == '2') {
				$(".portrait-buttom").empty()
				var broadbandHtml = 
					"<div class=\"broadband-threearpu\">"
					+ "<div class=\"magicEchartsTop\">"
					+ "<span>魔百盒</span>"
					+ "</div>"
					+ "<div class=\"magic-echarts\">"
					+ "<div class=\"threearpu-echarts1\">"
					+ "<div id=\"userScale\"></div>"
					+ "</div>"
					+ "<div class=\"broadband-echarts1\">"
					+ "<div id=\"inNet\"></div>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"broadband-threearpu\">"
					+ "<div class=\"pre-echarts\">"
					+ "<div class=\"preEchartsTop\">"
					+ "<span>月均ARPU</span>"
					+ "</div>"
					+ "<div id=\"threearpuEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"network-flow\">"
					+ "<div class=\"flow-echarts\">"
					+ "<div class=\"flowEchartsTop\">"
					+ "<span>上网流量趋势</span>"
					+ "</div>"
					+ "<div id=\"flowEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"broadband-threearpu\">"
					+ "<div class=\"pre-echarts\">"
					+ "<div class=\"preEchartsTop\">"
					+ "<span>到期预警</span>"
					+ "</div>"
					+ "<div id=\"warningEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"broadband-threearpu\">"
					+ "<div class=\"threearpu-echarts\">"
					+ "<div class=\"threearpuEchartsTop\">"
					+ "<span>接入方式</span>"
					+ "</div>"
					+ "<div id=\"accessEcharts\"></div>"
					+ "</div>"
					+ "<div class=\"broadband-echarts\">"
					+ "<div class=\"broadbandEchartsTop\">"
					+ "<span>宽带带宽</span>"
					+ "</div>"
					+ "<div id=\"broadbandEcharts\"></div>"
					+ "</div>"
					+ "</div>";
				$(".portrait-buttom").append(broadbandHtml);
				threearpuEcharts(publicOrgId);
				broadbandEcharts(publicOrgId);
				flowEcharts(publicOrgId);
				userScale(publicOrgId);
				inNet(publicOrgId);
				accessEcharts(publicOrgId);
				warningEcharts(publicOrgId);
			} else {
				$(".portrait-buttom").empty();
				var schoolHtml = 
					"<div class=\"areaAge-arpu\">"
					+ "<div class=\"area-age\">"
					+ "<div class=\"areaAgeTop\">"
					+ "<span>年龄占比&性别分布</span>"
					+ "</div>"
					+ "<div id=\"areaAge\"></div>"
					+ "</div>"
					+ "<div class=\"arpu-bar\">"
					+ "<div class=\"arpuBarTop\">"
					+ "<span>用户ARPU消费情况</span>"
					+ "</div>"
					+ "<div id=\"arpuBar\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"dou-mou\">"
					+ "<div class=\"dou-echarts\">"
					+ "<div class=\"douEchartsTop\">"
					+ "<span>用户DOU使用情况</span>"
					+ "</div>"
					+ "<div id=\"douEcharts\"></div>"
					+ "</div>"
					+ "<div class=\"mou-echarts\">"
					+ "<div class=\"mouEchartsTop\">"
					+ "<span>用户MOU使用情况</span>"
					+ "</div>"
					+ "<div id=\"mouEcharts\"></div>"
					+ "</div>"
					+ "</div>"
					+ "<div class=\"preference-app\">"
					+ "<div class=\"preference-echarts\">"
					+ "<div class=\"preferenceEchartsTop\">"
					+ "<span>常驻用户偏好终端品牌</span>"
					+ "</div>"
					+ "<div id=\"preferenceEcharts\"></div>"
					+ "</div>"
					+ "<div class=\"app-echarts\">"
					+ "<div class=\"appEchartsTop\">"
					+ "<span>区域用户APP使用次数</span>"
					+ "</div>"
					+ "<div id=\"appEcharts\"></div>"
					+ "</div>"
					+ "</div>";
				$(".portrait-buttom").append(schoolHtml);
				areaAge(publicOrgId, userType);
				arpuBar(publicOrgId, userType);
				douEcharts(publicOrgId, userType);
				mouEcharts(publicOrgId, userType);
				preferenceEcharts(publicOrgId, userType);
				appEcharts(publicOrgId, userType);
			}
		 } else if(parentId == 'SUI102') {
			 chnlnumEcharts(publicOrgId);
			 chnlstarEcharts(publicOrgId);
			 chnlNumFull(publicOrgId);
			 chnlShare(publicOrgId);
		 }else if(parentId == 'SUI103') {
		 }
	});
});

var initSelectPortrait = function() {
	$.ajax({
		url: $.cxt + "/pageOne/initSelectPortrait", 
		type: "POST",
		data: {}, 
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				$("#portraitFirstType").empty();
				$("#portraitSecondType").empty();
				var htmlFirst = "";
				for(var i = 0, j = json.data.firstLevelInfo.length; i < j; i++) {
					htmlFirst += "<option value='" + json.data.firstLevelInfo[i].CONDITION_CODE 
						+ "'>" + json.data.firstLevelInfo[i].CONDITION_NAME + "</option>";
				}
				$("#portraitFirstType").html(htmlFirst);
				var htmlSecond = "";
				for(var i=0;i<json.data.secondLevelInfo.length;i++) {
					htmlSecond += "<option value='" + json.data.secondLevelInfo[i].CONDITION_CODE 
						+ "' parentId='" + json.data.secondLevelInfo[i].PARENT_ID + "'>" 
						+ json.data.secondLevelInfo[i].CONDITION_NAME + "</option>";
				}
				$("#portraitSecondType").html(htmlSecond);
				$("#portraitFirstType").val('SUI101');
				$("#portraitSecondType").val('1');
			}
		}
	});
}

var getFiveInfo = function(orgId) {
	$.ajax({
		url: $.cxt + "/pageOne/getFiveInfo", 
		type: "POST",
		data: {
			orgId: orgId,
		},
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				$("#customerScale").empty();
				$("#customerScale").append(json.data[0].customer+'万户');
				$("#cellScale").empty();
				$("#cellScale").append(json.data[0].cellNum+'万个');
				$("#groupScale").empty();
				$("#groupScale").append(json.data[0].groupNum+'万户');
				$("#chnlScale").empty();
				$("#chnlScale").append(json.data[0].chnlNum+'万个');
				$("#incomeScale").empty();
				$("#incomeScale").append(json.data[0].income+'万元');
			}
		}
	});
}

var echartsLine = function(orgId,lineId) {
	var myChart = echarts.init(document.getElementById('echartsLine'));
	$.ajax({
		url: $.cxt + "/pageOne/getTaskByFiveData", 
		type: "POST",
		data: {
			orgId: orgId,
			lineId: lineId
		}, 
		success: function(json) {
			var dataInfo = JSON.parse(json);
			if(dataInfo.code == '0') {
				var data = {
				    id: 'echarLines',
				    // legend: ['新增客户', '宽带新增完工量', '终端销量', '套餐迁转'],
				    xAxis: [],
				    color: ['#1089E7', '#F57474', '#56D0E3', '#8B78F6'],
				    yAxis: []
				}
				if(lineId == 'day') {
					data.legend = ['新增客户', '宽带新增完工量', '终端销量']
					var tempData1 = [];
					var tempData2 = [];
					var tempData3 = [];
					for(var i = 0, j = dataInfo.data.length; i < j; i++) {
						data.xAxis.push(dataInfo.data[i].STATIS_DATE);
						tempData1.push(dataInfo.data[i].NEW_USER);
						tempData2.push(dataInfo.data[i].KD_NEW);
						tempData3.push(dataInfo.data[i].TERMINAL_NUM);
					}
					data.yAxis.push(tempData1);
					data.yAxis.push(tempData2);
					data.yAxis.push(tempData3);
				} else if (lineId == 'month') {
					data.legend = ['套餐迁转'];
					var tempData1 = [];
					for(var i = 0, j = dataInfo.data.length; i < j; i++) {
						data.xAxis.push(dataInfo.data[i].STATIS_MONTH);
						tempData1.push(dataInfo.data[i].QZ_NUM);
					}
					data.yAxis.push(tempData1);
				}
				var legend = data.legend || [];
				var seriesArr = [];
				var legendSele = {};
				if(data.yAxis != undefined && data.yAxis != null) {
					for(var index = 0, j = data.yAxis.length; index < j; index++) {
						var name = legend[index];
						/*index === 0 ? legendSele[name] = true : legendSele[name] = false*/
						seriesArr.push({
					    	name: name,
					    	type: 'line',
					    	data: data.yAxis[index],
					    	smooth: false,
					    	symbol: 'circle',
					    	hoverAnimation: true,
					    	showAllSymbol: true,
					    	symbolSize: '8',
					    	label: {
					    		normal: {
					    			show: index === 0 ? true : false,
					    			position: 'top',
					          	}
					    	},
						});
					}
				}
				option = {
				    title: {
				        x: '4%',
				        top: '4%',
				        textStyle: {
				            color: '#4D5562',
				            fontSize: '16',
				            fontWeight: 'normal'
				        }
				    },
				    grid: {
				        x: 60,
				        y: 40,
				        x2: 12,
				        y2: 25,
				    },
				    color: data.color,
				    tooltip: {
				        trigger: 'axis',
				        formatter: function(params) {
				            var time = '';
				            var str = '';
				            for (var i in params) {
				                time = params[i].name + '<br/>';
				                if (params[i].data == 'null' || params[i].data == null) {
				                    str += params[i].seriesName + ' :  无数据' + '<br/>'
				                } else {
				                    str += params[i].seriesName + ' : ' + params[i].data +'<br/>'
				                }
				            }
				            return time + str;
				        }
				    },
				    legend: {
//				        icon: 'rect',
				        orient: 'horizontal',
				        right: 10,
				        x: 'right',
				        itemWidth: 10,
				        itemHeight: 10,
				        itemGap: 10,
				        borderRadius: 4,
				        data: legend,
				        textStyle: {
				            fontSize: 10,
				            color: '#fff'
				        },
				        selected: legendSele
				    },
				    xAxis: {
				        data: data.xAxis || [],
				        axisLine: { // 坐标轴线
				            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
				                color: '#fff',
				                type: 'solid'
				            },
				        },
				        axisTick: { // 坐标轴小标记
				            show: false, // 属性show控制显示与否，默认不显示
				        },
				        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
				            show: true,
				            interval: '0',
				            rotate: 0,
				            color: '#fff',
				            fontSize: 10
				        },
				    },
				    yAxis: {
				        type: 'value',
				        axisTick: { // 坐标轴小标记
				            show: false, // 属性show控制显示与否，默认不显示
				        },
				        splitLine: {
				            show: true,
				            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
				                color: '#fff',
				                type: 'solid'
				            },
				        },
				        axisLine: { // 坐标轴线
				            show: false, // 默认显示，属性show控制显示与否
				        },
				        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
				            show: true,
				            color: '#fff',
				            formatter: function (val) {
			                    return val;
			                }
				        },
				    },
				    series: seriesArr
				}
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var rightPie = function(orgId) {
	var myChart = echarts.init(document.getElementById('rightPie'));
	var scale = '';
	var lengedData = [];
	var pubData = [];
	$(".middleButton>span").each(function() {
		if($(this).css('color') == 'rgb(255, 0, 0)') {
			scale = $(this).attr('id');
		}
	})
	$.ajax({
		url: $.cxt + "/pageOne/getRightPie", 
		type: "POST",
		data: {
			orgId: orgId,
			scale: scale
		}, 
		success: function(json) {
			var dataInfo = JSON.parse(json);
			var totalData = 0;
			if(dataInfo.code == '0') {
				for(var i = 0, j = dataInfo.data.length; i < j; i++) {
					dataInfo.data[i].PUB_DATA=parseFloat(dataInfo.data[i].PUB_DATA);
				}
				for(var i = 0, j = dataInfo.data.length; i < j; i++) {
					lengedData.push(dataInfo.data[i].PUB_NAME);
					pubData.push({
						value: dataInfo.data[i].PUB_DATA,
						name: dataInfo.data[i].PUB_NAME
					});
					totalData += dataInfo.data[i].PUB_DATA;
				}
				$(".right-button").empty();
				var dataHtml = "";
				for(var j = 0, k = dataInfo.data.length; j < k; j++) {
					dataHtml += '<div class="rightButton" style="width:' + (100 / dataInfo.data.length).toFixed(5) + '%">'
					   +'<span id="incomeRight">' + dataInfo.data[j].PUB_NAME + '</span>'
					   +'<div>'+((dataInfo.data[j].PUB_DATA / totalData) * 100).toFixed(2) + '%' + '</div></div>';
				}
				$(".right-button").html(dataHtml);
				option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {d}% ({c})"
				    },
				    grid: {
				    	x: 10,
				        x2: 20,
				    },
				    legend: {
				        y: 'center',
				        orient: 'vertical',
				        right: -2,
				        data: lengedData,
				        textStyle: {
				            color: '#fff',
				            fontWeight: 'normal'
				        }
				    },
				    calculable: true,
				    series: [{
			        	name: '规模占比',
			            type: 'pie',
			            radius: [30, 50],
			            center: ['40%', '50%'],
			            roseType: 'area',
			            labelLine: {
			            	normal: {
			            		// 此处是改变折线的长度
			            		// smooth: 0.5,
				            	length: 15,
					            length2: 25
			            	}
			            },
			            data: pubData
			        }],
				    color: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var rightPieTable = function(orgId){
	var scale = ''
	$(".middleButton>span").each(function() {
		if($(this).css('color') == 'rgb(255, 0, 0)') {
			scale = $(this).attr('id');
		}
	});
	
	var colNames = [];
	var colModel = [];
	if(scale == 'income') {
		colNames = ['组织机构', '23G', '4G', '宽带', '同比', '环比'];
		colModel.push({
			name: 'ORG_NAME',
			align: 'center',
			width: 80
		}, {
			name: 'DATA_23G',
			align: 'center',
			width: 80
		}, {
			name: 'DATA_4G',
			align: 'center',
			width: 80
		}, {
			name: 'DATA_KD',
			align: 'center',
			width: 80
		}, {
			name: 'DATA_TB',
			align: 'center',
			width: 57
		}, {
			name: 'DATA_HB',
			align: 'center',
			width: 57
		});
	} else if (scale == 'customer') {
		colNames = ['组织机构', '基站常驻', '开户渠道', '渠道常客', '同比', '环比'];
		colModel.push({
			name: 'ORG_NAME',
			align: 'center',
			width: 80
		}, {
			name: 'PUB_DATA1',
			align: 'center',
			width: 80
		}, {
			name: 'PUB_DATA2',
			align: 'center',
			width: 80
		}, {
			name: 'PUB_DATA3',
			align: 'center',
			width: 80
		}, {
			name: 'DATA_TB',
			align: 'center',
			width: 58
		}, {
			name: 'DATA_HB',
			align: 'center',
			width: 58
		});
	} else if (scale == 'cell_num') {
		colNames = ['组织机构', '住宅小区', '别墅', '宿舍', '同比', '环比'];
		colModel.push({
			name: 'ORG_NAME',
			align: 'center',
			width: 80
		}, {
			name: 'PUB_DATA1',
			align: 'center',
			width: 80
		}, {
			name: 'PUB_DATA2',
			align: 'center',
			width: 80
		}, {
			name: 'PUB_DATA3',
			align: 'center',
			width: 80
		}, {
			name: 'DATA_TB',
			align: 'center',
			width: 58
		}, {
			name: 'DATA_HB',
			align: 'center',
			width: 58
		});
	} else if (scale == 'group_num') {
		colNames = ['组织机构', 'D类', 'C类', '同比', '环比'];
		colModel.push({
			name: 'ORG_NAME',
			align: 'center',
			width: 80
		}, {
			name: 'PUB_DATA1',
			align: 'center',
			width: 90
		}, {
			name: 'PUB_DATA2',
			align: 'center',
			width: 90
		}, {
			name: 'DATA_TB',
			align: 'center',
			width: 90
		}, {
			name: 'DATA_HB',
			align: 'center',
			width: 90
		});
	} else if (scale == 'chnl_num') {
		colNames = ['组织机构', '分销渠道', '实体渠道', '直销渠道', '同比', '环比'];
		colModel.push({
			name: 'ORG_NAME',
			align: 'center',
			width: 80
		}, {
			name: 'FX_DATA',
			align: 'center',
			width: 80
		}, {
			name: 'ST_DATA',
			align: 'center',
			width: 80
		}, {
			name: 'ZX_DATA',
			align: 'center',
			width: 80
		}, {
			name: 'DATA_TB',
			align: 'center',
			width: 58
		}, {
			name: 'DATA_HB',
			align: 'center',
			width: 58
		});
	}
	$('#businessScale').GridUnload();
	$('#businessScale').jqGrid({
		url: $.cxt + "/pageOne/getRightTable",
		datatype: "json",
		mtype: "POST",
		postData: {
			orgId: orgId,
			scale: scale
        },
		height: ($(".grid").height() - 10),
		width: $(".grid").width,
		autowidth: false,
		colNames: colNames,
		colModel: colModel,
		autoScroll: true,
		viewrecords: false,
		rownumbers: false,
		rowNum: 1000,
		rowList: [ 10, 20, 30 ],
		gridComplete : setNiceScroll
	});
}

var rightBar = function(orgId) {
	var myChart = echarts.init(document.getElementById('rightBar'));
	var scale = '';
	$(".middleButton>span").each(function() {
		if($(this).css('color') == 'rgb(255, 0, 0)') {
			scale = $(this).attr('id');
		}
	})
	$.ajax({
		url: $.cxt + "/pageOne/getRightBar", 
		type: "POST",
		data: {
			orgId: orgId,
			scale: scale
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				var incomeLenged = [];
				var orgName = [];
				var myseries = [];
				if(scale == 'income') {
					incomeLenged = [];
					orgName = [];
					incomeLenged = ['23G','4G','宽带'];
					var incomeData1 = [];
					var incomeData2 = [];
					var incomeData3 = [];
					for(var i = 0, j = json.data.length; i < j; i++) {
						orgName.push(json.data[i].PUB_ORG_NAME);
						incomeData1.push(json.data[i].PUB_DATA1);
						incomeData2.push(json.data[i].PUB_DATA2);
						incomeData3.push(json.data[i].PUB_DATA3);
					}
					for(var j = 0, k = incomeLenged.length; j < k; j++) {
						if(j == 0) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData1,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color:'#1089E7',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j == 1) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData2,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color:'#F57474',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j == 2) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData3,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color:'#56D0E3',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						}
					}
				} else if(scale == 'customer') {
					incomeLenged = [];
					orgName = [];
					incomeLenged = ['渠道常客','基站常驻','开户渠道'];
					var incomeData1 = [];
					var incomeData2 = [];
					var incomeData3 = [];
					for(var i = 0, j = json.data.length; i < j; i++) {
						orgName.push(json.data[i].PUB_ORG_NAME);
						incomeData1.push(json.data[i].PUB_DATA1);
						incomeData2.push(json.data[i].PUB_DATA2);
						incomeData3.push(json.data[i].PUB_DATA3);
					}
					for(var j = 0, k = incomeLenged.length; j < k; j++) {
						if(j == 0) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData1,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color:'#1089E7',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j==1) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData2,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                         
			                        normal: {
			                        	color:'#F57474',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						}else if(j == 2) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData3,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color:'#56D0E3',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						}
					}
				} else if (scale == 'cell_num') {
					incomeLenged = [];
					orgName = [];
					incomeLenged = ['住宅小区','别墅','宿舍'];
					var incomeData1 = [];
					var incomeData2 = [];
					var incomeData3 = [];
					for(var i = 0, j = json.data.length; i < j; i++) {
						orgName.push(json.data[i].PUB_ORG_NAME);
						incomeData1.push(json.data[i].PUB_DATA1);
						incomeData2.push(json.data[i].PUB_DATA2);
						incomeData3.push(json.data[i].PUB_DATA3);
					}
					for(var j = 0, k = incomeLenged.length; j < k; j++) {
						if(j == 0) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData1,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                         
			                        normal: {
			                        	color:'#1089E7',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j == 1) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData2,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color:'#F57474',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j == 2) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData3,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color: '#56D0E3',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						}
					}
				}else if(scale == 'group_num'){
					incomeLenged = [];
					orgName = [];
					incomeLenged = ['C类', 'D类'];
					var incomeData1 = [];
					var incomeData2 = [];
					var incomeData3 = [];
					for(var i = 0, j = json.data.length; i < j; i++) {
						orgName.push(json.data[i].PUB_ORG_NAME);
						incomeData1.push(json.data[i].PUB_DATA1);
						incomeData2.push(json.data[i].PUB_DATA2);
					}
					for(var j = 0, k = incomeLenged.length; j < k; j++) {
						if(j == 0) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData1,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color: '#1089E7',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j == 1) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData2,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color: '#56D0E3',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						}
					}
				} else if (scale == 'chnl_num') {
					incomeLenged = [];
					orgName = [];
					incomeLenged = ['实体渠道', '分销渠道', '直销渠道'];
					var incomeData1 = [];
					var incomeData2 = [];
					var incomeData3 = [];
					for(var i = 0, j = json.data.length; i < j; i++) {
						orgName.push(json.data[i].PUB_ORG_NAME);
						incomeData1.push(json.data[i].PUB_DATA1);
						incomeData2.push(json.data[i].PUB_DATA2);
						incomeData3.push(json.data[i].PUB_DATA3);
					}
					for(var j = 0, k = incomeLenged.length; j < k; j++) {
						if(j == 0) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData1,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                         
			                        normal: {
			                        	color: '#1089E7',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j == 1) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData2,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color: '#56D0E3',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						} else if (j == 2) {
							myseries.push({
								name: incomeLenged[j],
								type: 'bar',
								barWidth: 8,
								data: incomeData2,
								itemStyle: {
			                        //柱形图圆角，鼠标移上去效果
			                        emphasis: {
			                            barBorderRadius: [10, 10, 10, 10]
			                        },
			                        normal: {
			                        	color: '#56D0E3',
			                            //柱形图圆角，初始化效果
			                            barBorderRadius: [10, 10, 10, 10]
			                        }
			                    }
							});
						}
					}
				}
				option = {
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				    	orient: 'horizontal',
				        x: 'right',
				        itemWidth: 10,
				        itemHeight: 10,
				        itemGap: 10,
				        borderRadius: 4,
				    	textStyle: {
				            fontSize: 10,
				            color: '#fff'
				        },
				        data: incomeLenged
				    },
				    grid: {
				        x: 60,
				        y: 30,
				        x2: 10,
				        y2: 45,
				    },
				    calculable: true,
				    xAxis: [{
			        	type: 'category',
			            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
				        	show: true,
				            interval: '0',
				            rotate:30,
				            color: '#fff',
				            fontSize: 10
				        },
			            data: orgName
			        }],
				    yAxis: [{
			        	splitLine: {
				            show: true,
				            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
				                color: '#F1F3F5',
				                type: 'solid'
				            },
				        },
				        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
				            show: true,
				            color: '#fff',
				            fontSize: 10
				        },
			            type: 'value'
			        }],
				    series: myseries
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var sexPortrait = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('sexPortrait'));
	$.ajax({
		url: $.cxt + "/pageOne/getSexPortrait",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				var sexData = [];
				sexData.push({
					value: json.data[0].MALE_NUM,
					name: '男'
				});
				sexData.push({
					value: json.data[0].FAMALE_NUM,
					name: '女'
				});
				option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    series: [
				        {
				            name: '',
				            type: 'pie',
				            radius: ['50%', '70%'],
				            center: ['50%', '50%'],
				            label: {
				                normal: {
				                    formatter: '{b|{b}：}{per|{d}%} ',
//				                    backgroundColor: '#001323',
//				                    borderColor: '#aaa',
//				                    borderWidth: 1,
				                    borderRadius: 4,
				                    // shadowBlur:3,
				                    // shadowOffsetX: 2,
				                    // shadowOffsetY: 2,
				                    // shadowColor: '#999',
				                    // padding: [0, 7],
				                    rich: {
//				                        a: {
////				                            color: '#999',
//				                            lineHeight: 0,
//				                            align: 'center'
//				                        },
				                        // abg: {
				                        //     backgroundColor: '#333',
				                        //     width: '100%',
				                        //     align: 'right',
				                        //     height: 22,
				                        //     borderRadius: [4, 4, 0, 0]
				                        // },
				                        hr: {
//				                            borderColor: '#aaa',
				                            width: '100%',
				                           /* borderWidth: 0.5,*/
				                            height: 0
				                        },
				                        b: {
				                            fontSize: 14,
				                            lineHeight: 25,
				                            color:'#fff'
				                        },
				                        per: {
				                            color: '#eee',
//				                            backgroundColor: '#334455',
				                            padding: [2, 4],
				                            borderRadius: 2
				                        }
				                    }
				                },
//					                emphasis: {//放大
//					                    show: true,
//					                    textStyle: {
//					                        fontSize: '30',
//					                        fontWeight: 'bold'
//					                    }
//					                }
			                },
				            labelLine: {  
				                normal: {  
				                    length: 25,
				                    length2: 25
				                }  
				            },  
				            data:sexData,
				        }
				    ],
				    color:['#1089E7', '#F57474']
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var nestingPie = function(orgId,userType) {
	var myChart = echarts.init(document.getElementById('nestingPie'));
	$.ajax({
		url: $.cxt + "/pageOne/getNestingPie",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var ageData = [];
			var eduData = [];
			var json = JSON.parse(data);
			if(json.code == '0'){
				eduData.push({
					value: json.data.HIGH_EDU_NUM,
					name: '高等教育用户量'
				});
				eduData.push({
					value: json.data.MIDDLE_EDU_NUM,
					name: '中等教育用户量'
				});
				eduData.push({
					value: json.data.LOW_EDU_NUM,
					name: '低等教育用户量'
				});
				ageData.push({
					value: json.data.YOUNG_NUM,
					name: '少年用户量'
				});
				ageData.push({
					value: json.data.TEENAGERS_NUM,
					name: '青少年用户量'
				});
				ageData.push({
					value: json.data.MIDDLE_NUM,
					name: '中年用户量'
				});
				ageData.push({
					value: json.data.OLD_NUM,
					name: '老年用户量'
				});
				option = {
//				    title : {
//				        text: '年龄、教育水平分布',
//				        x:'center',
//				        textStyle: {
//				            fontSize: 14,
//				            color: '#fff'
//				        }
//				    },
				    tooltip: {
				        trigger: 'item',
				        position: [0,0],
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name: '教育水平分布',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            label: {
				                normal: {
				                    position: 'inner',
				                    fontSize : 8
				                }
				            },
				            data:eduData
				        },
				        {
				            name: '年龄分布',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: ['40%', '55%'],
				            labelLine: {
				                normal: {
				                    show: false,
				                    length: 5,
				                    length2: 5
				                }
				            },
				            label: {
				                normal: {
				                    position: 'outside',
				                    fontSize : 10
				                }
				            },
				            data: ageData
				        }
				    ],
				    color: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var nestingBar = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('nestingBar'));
	$.ajax({
		url: $.cxt + "/pageOne/getNestingBar",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var ageData = [];
			var eduData = [];
			var json = JSON.parse(data);
			if(json.code == '0'){
				var appData = [];
				var valdata = [];
				var countData = json.data.NEWS_APP_NUM + json.data.COMM_APP_NUM + json.data.ENJOY_APP_NUM
				+ json.data.LIFE_APP_NUM + json.data.QT_APP_NUM;
				appData.push(((json.data.NEWS_APP_NUM/countData)*100).toFixed(2));
				appData.push(((json.data.COMM_APP_NUM/countData)*100).toFixed(2));
				appData.push(((json.data.ENJOY_APP_NUM/countData)*100).toFixed(2));
				appData.push(((json.data.LIFE_APP_NUM/countData)*100).toFixed(2));
				appData.push(((json.data.QT_APP_NUM/countData)*100).toFixed(2));
				valdata.push(json.data.NEWS_APP_NUM);
				valdata.push(json.data.COMM_APP_NUM);
				valdata.push(json.data.ENJOY_APP_NUM);
				valdata.push(json.data.LIFE_APP_NUM);
				valdata.push(json.data.QT_APP_NUM);
				var titlename = ['新闻资讯', '通信交流', '娱乐休闲', '生活服务', '其他'];
				var myColor = ['#38d2a0', '#38d2a0', '#38d2a0', '#38d2a0', '#38d2a0'];
				option = {
//					title: {
//				        text: '上网偏好',
//				        x: 'center',
//				        textStyle: {
//				            fontSize: 14,
//				            color: '#fff'
//				        }
//				    },
				    grid: {
				        left: '30%',
				        right: '30%',
				        bottom: '15%',
				        top: '15%'
				    },
				    xAxis: {
				        show: false
				    },
				    yAxis: [{
				        show: true,
				        data: titlename,
				        inverse: true,
				        axisLine: {
				            show: false
				        },
				        splitLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        axisLabel: {
				            color: '#fff',
				            fontSize: 10,
				            rich: {
				                lg: {
				                    backgroundColor: '#339911',
				                    color: '#fff',
				                    borderRadius: 15,
				                    padding: 5,
				                    align: 'center',
				                    width: 15,
				                    height: 15
				                },
				            }
				        },
				    }, {
				        show: true,
				        inverse: true,
				        data: valdata,
				        axisLabel: {
				            textStyle: {
				                fontSize: 10,
				                color: '#fff',
				            },
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
				    }],
				    series: [{
				        name: '条',
				        type: 'bar',
				        yAxisIndex: 0,
				        data: appData,
				        barWidth: 10,
				        itemStyle: {
				            normal: {
				                barBorderRadius: 10,
				                color: function(params) {
				                    var num = myColor.length;
				                    return myColor[params.dataIndex % num]
				                },
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                position: 'right',
				                formatter: '{c}%'
				            }
				        },
				    }, {
				        name: '框',
				        type: 'bar',
				        yAxisIndex: 1,
				        barGap: '-100%',
				        data: [100, 100, 100, 100, 100],
				        barWidth: 11,
				        itemStyle: {
				            normal: {
				                color: 'none',
				                borderColor: '#00c1de',
				                borderWidth: 1,
				                barBorderRadius: 15
				            }
				        }
				    }]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var interestFeatures = function(orgId, userType){
	var myChart = echarts.init(document.getElementById('interestFeatures'));
	$.ajax({
		url: $.cxt + "/pageOne/getInterestFeatures",
		type: "POST",
		data:{
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var xData = []
			var json = JSON.parse(data);
			if(json.code == '0') {
				xData.push(json.data.INTEREST_NUM1)
				xData.push(json.data.INTEREST_NUM2)
				xData.push(json.data.INTEREST_NUM3)
				xData.push(json.data.INTEREST_NUM4)
				xData.push(json.data.INTEREST_NUM5)
				option = {
//					title : {
//				        text: '兴趣特征',
//				        textStyle: {
//				            fontSize: 14,
//				            color: '#fff'
//				        }
//				    },
				    tooltip: {
				        trigger: 'axis',
				        position:[0,0]
				    },
				    grid: {
				        left: '25%',
				        right: '23%',
				        bottom: '26%',
				        top: '20%'
				    },
				    calculable: true,
				    color: ['#0283ff'],
				    xAxis: [
				        {
				            type: 'category',
				            axisLabel: {
				            	show: true,
				            	interval: 0,
				            	rotate: 45,
					            textStyle: {
					                fontSize: 8,
					                color: '#fff'
					            }
					        },
				            data: ['兴趣特征1', '兴趣特征2', '兴趣特征3', '兴趣特征4', '兴趣特征5']
				        }
				    ],
				    yAxis : [
				        {
				            type: 'value',
				            axisLabel: {
					            textStyle: {
					                fontSize: 10,
					                color: '#fff'
					            }
					        }
				        }
				    ],
				    series: [
				        {
				            name: '蒸发量',
				            type: 'bar',
				            data: xData,
				            barWidth: 8,
				            markPoint: {
				            	symbol: 'pin',
				            	symbolSize: 35,
				            	normal: {
				            		borderColor: '#fff',
				            		// 标注边线线宽，单位px，默认为1
				            		borderWidth: 1,
				                    label: {
				                        show: true
				                    }
				            	},
				                data: [
				                    {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}
				                ]
				            },
				            markLine: {
				                data: [
				                    {type: 'average', name: '平均值'}
				                ]
				            },
				            itemStyle: {
		                        //柱形图圆角，鼠标移上去效果
		                        emphasis: {
		                            barBorderRadius: [10, 10, 10, 10]
		                        },
		                        normal: {
		                            //柱形图圆角，初始化效果
		                            barBorderRadius:[10, 10, 10, 10]
		                        }
		                    }
				        }
				    ]
				};
			    myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var consumeFeatures = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('consumeFeatures'));
	$.ajax({
		url: $.cxt + "/pageOne/getConsumeFeatures",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data1) {
			var data = [];
			var json = JSON.parse(data1);
			if(json.code == '0'){
				var countData = json.data.ARPU_LAST1 + json.data.ARPU_LAST2 + json.data.ARPU_LAST3
					+ json.data.ARPU_LAST4 + json.data.ARPU_LAST5;
				data.push({
					value: ((json.data.ARPU_LAST1/countData)*100).toFixed(2),
					name: '前一月'
				});
				data.push({
					value: ((json.data.ARPU_LAST2/countData)*100).toFixed(2),
					name: '前二月'
				});
				data.push({
					value: ((json.data.ARPU_LAST3/countData)*100).toFixed(2),
					name: '前三月'
				});
				data.push({
					value: ((json.data.ARPU_LAST4/countData)*100).toFixed(2),
					name: '前四月'
				});
				data.push({
					value: ((json.data.ARPU_LAST5/countData)*100).toFixed(2),
					name: '前五月'
				});
				
				var xData = [],
			    yData = [];
				var min = 50; 
				data.map(function(a, b) {
				    xData.push(a.name);
				    if (a.value === 0) {
				        yData.push(a.value + min);
				    } else {
				        yData.push(a.value);
				    }
				});
				option = {
//					title : {
//				        text: '消费特征',
//				        x:'center',
//				        textStyle: {
//				            fontSize: 14,
//				            top: 0,
//				            color: '#fff'
//				        }
//				    },
				    color: ['#3398DB'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'line',
				            lineStyle: {
				                opacity: 0
				            }
				        },
				        formatter: function(prams) {
				            if (prams[0].data === min) {
				                return "合格率：0%";
				            } else {
				                return "合格率：" + prams[0].data + "%";
				            }
				        }
				    },
	//			    legend: {
	//			        data: ['直接访问', '背景'],
	//			        show: false
	//			    },
				    grid: {
				        left: '0%',
				        right: '0%',
				        bottom: '10%',
				        top: '15%',
				        containLabel: true,
				        z: 22
				    },
				    xAxis: [{
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
				            color: '#fff',
				            interval:0,
				            rotate:45,
				            fontSize:10
				        }
				    }],
				    yAxis: [{
				            type: 'value',
				            gridIndex: 0,
				            splitLine: {
				                show: false
				            },
				            axisTick: {
				                show: false
				            },
				            min: 0,
				            max: 100,
				            axisLine: {
				                lineStyle: {
				                    color: '#0c3b71'
				                }
				            },
				            axisLabel: {
				                color: '#fff',
				                formatter: '{value} %',
				                fontSize:10
				            }
				        },
				        {
				            type: 'value',
				            gridIndex: 0,
				            min: 0,
				            max: 100,
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
				            splitArea: {
				                show: true,
				                areaStyle: {
				                    color: ['rgba(250, 250, 250, 0.0)', 'rgba(250, 250, 250, 0.05)']
				                }
				            }
				        }
				    ],
				    series: [{
				            name: '合格率',
				            type: 'bar',
				            barWidth: '30%',
				            xAxisIndex: 0,
				            yAxisIndex: 0,
				            itemStyle: {
				                normal: {
				                    barBorderRadius: 30,
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1, [{
				                                offset: 0,
				                                color: '#da2921'
				                            },
				                            {
				                                offset: 0.5,
				                                color: '#da2921'
				                            },
				                            {
				                                offset: 1,
				                                color: '#da2921'
				                            }
				                        ]
				                    )
				                }
				            },
				            data: yData,
				            zlevel: 11
				        },
//				        {
//				            name: '背景',
//				            type: 'bar',
//				            barWidth: '50%',
//				            xAxisIndex: 0,
//				            yAxisIndex: 1,
//				            barGap: '-135%',
//				            data: [100, 100, 100, 100, 100],
//				            itemStyle: {
//				                normal: {
//				                    color: 'rgba(255,255,255,0.1)'
//				                }
//				            },
//				            zlevel: 9
//				        },
				      
				    ]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var areaAge = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('areaAge'));
	$.ajax({
		url: $.cxt + "/pageOne/getAreaAge",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var saleData = [];
			var ageData = [];
			var json = JSON.parse(data);
			if(json.code == '0') {
				saleData.push({
					value: json.data.MALE_NUM,
					name: '男'
				});
				saleData.push({
					value: json.data.FAMALE_NUM,
					name: '女'
				});
				ageData.push({
					value: json.data.YOUNG_NUM,
					name: '<18岁'
				});
				ageData.push({
					value: json.data.TEENAGERS_NUM,
					name: '19-25岁'
				});
				ageData.push({
					value: json.data.MIDDLE_NUM,
					name: '25-40岁'
				});
				ageData.push({
					value: json.data.MIDDLE_OLD_NUM,
					name: '40-60岁'
				});
				ageData.push({
					value: json.data.OLD_NUM,
					name: '>60岁'
				});
				option = {
//				    title : {
//				        text: '年龄、教育水平分布',
//				        x:'center',
//				        textStyle: {
//				            fontSize: 14,
//				            color: '#fff'
//				        }
//				    },
				    tooltip: {
				        trigger: 'item',
				        position: [0,0],
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name: '性别分布',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            label: {
				                normal: {
				                    position: 'inner',
				                    fontSize: 8
				                }
				            },
				            data: saleData
				        },
				        {
				            name: '年龄占比',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: ['40%', '55%'],
				            labelLine: {
				                normal: {
				                    show: false,
				                    length: 5,
				                    length2: 5
				                }
				            },
				            label: {
				                normal: {
				                    position: 'outside',
				                    fontSize : 10
				                }
				            },
				            data: ageData
				        }
				    ],
				    color: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var arpuBar = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('arpuBar'));
	$.ajax({
		url: $.cxt + "/pageOne/getArpuBar",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var xData = ['(-∞,10元]','(10元,30元]','(30元,60元]','(60元,100元]','(100元,150元]','(150元,∞]'];
			var yData = [];
			var json = JSON.parse(data);
			if(json.code == '0') {
				var totalArpu = json.data.ARPU1_NUM + json.data.ARPU2_NUM + json.data.ARPU3_NUM 
					+ json.data.ARPU4_NUM + json.data.ARPU5_NUM + json.data.ARPU6_NUM;
				yData.push(((json.data.ARPU1_NUM / totalArpu) * 100).toFixed(2));
				yData.push(((json.data.ARPU2_NUM / totalArpu) * 100).toFixed(2));
				yData.push(((json.data.ARPU3_NUM / totalArpu) * 100).toFixed(2));
				yData.push(((json.data.ARPU4_NUM / totalArpu) * 100).toFixed(2));
				yData.push(((json.data.ARPU5_NUM / totalArpu) * 100).toFixed(2));
				yData.push(((json.data.ARPU6_NUM / totalArpu) * 100).toFixed(2));
				
				option = {
				    color: ['#3398DB'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'line',
				            lineStyle: {
				                opacity: 0
				            }
				        },
				        formatter: function(prams) {
				            return "ARPU：" + prams[0].data + "%"
				        }
				    },
				    grid: {
				        left: '0%',
				        right: '-8%',
				        bottom: '18%',
				        top: '12%',
//				        height: '85%',
				        containLabel: true,
				        z: 22
				    },
				    xAxis: [{
				        type: 'category',
				        gridIndex: 0,
				        data: xData,
				        axisTick: {
//					            alignWithLabel: true
				        },
				        axisLine: {
				            lineStyle: {
				                color: '#0c3b71'
				            }
				        },
				        axisLabel: {
				            show: true,
				            color: '#fff',
				            interval:0,
				            rotate:45,
				            fontSize: 8
				        }
				    }],
				    yAxis: [{
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
				                color: '#fff',
				                fontSize:10,
				                formatter: '{value}%'
				            }
				        },
				        {
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
				                show: false,
				            },
				            splitArea: {
				                show: true,
				                areaStyle: {
				                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
				                }
				            }
				        }
				    ],
				    series: [{
				            name: 'ARPU',
				            type: 'bar',
				            barWidth: '30%',
				            xAxisIndex: 0,
				            yAxisIndex: 0,
				            label: {
				                normal: {
				                    show: true,
				                    position: "top",
				                    formatter: '{c}%',
				                    textStyle: {
				                        color: "#fff",
				                        fontSize: 10
				                    }
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1, [{
				                                offset: 0,
				                                color: '#00feff'
				                            },
				                            {
				                                offset: 0.5,
				                                color: '#027eff'
				                            },
				                            {
				                                offset: 1,
				                                color: '#0286ff'
				                            }
				                        ]
				                    )
				                }
				            },
				            data: yData,
				            zlevel: 11
				        }
				    ]
				};
			}
			myChart.clear();
			myChart.setOption(option);
		}
	});
}

var douEcharts = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('douEcharts'));
	$.ajax({
		url: $.cxt + "/pageOne/getDouEcharts",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				var ydata = [];
				var xdata = ['(0元,,20MB]', '(20MB,100MB]', '(100MB,500MB]', '(500MB,1.5G]', '(1.5G,3G]', '(3G,∞]'];
				ydata.push(json.data.DOU1_NUM);
				ydata.push(json.data.DOU2_NUM);
				ydata.push(json.data.DOU3_NUM);
				ydata.push(json.data.DOU4_NUM);
				ydata.push(json.data.DOU5_NUM);
				ydata.push(json.data.DOU6_NUM);
				var option = {
				 	tooltip: {
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#283b56'
				            }
				        }
					},
					grid: {
						left: '0%',
						right: '10%',
						top: '10%',
						bottom: '25%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						// boundaryGap: false,
						data: xdata,
						triggerEvent: true,
						splitLine: {
							show: false
						},
						axisLine: {
							show: true,
							lineStyle: {
								width: 2,
								color: 'rgba(255, 255, 255, .6)'
							}
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							color: '#fff',
							fontSize: 8,
							fontWeight: 'bold',
							textShadowColor: '#000',
							textShadowOffsetY: 2,
							interval: 0,
					        rotate: 45,
						}
					},
					yAxis: {
						name: 'DOU使用数',
						nameTextStyle: {
							color: '#fff',
							fontSize: 10,
							textShadowColor: '#000',
							textShadowOffsetY: 2
						},
						type: 'value',
						splitLine: {
							show: true,
							lineStyle: {
								color: 'rgba(255,255,255,.2)'
							}
						},
						axisLine: {
							show: true,
							lineStyle: {
								width: 2,
								color: 'rgba(255,255,255,.6)'
							}
						},
						axisTick: {
							show: true
						},
						axisLabel: {
							color: '#fff',
							fontSize: 10,
							textShadowColor: '#000',
							textShadowOffsetY: 2
						}
					},
					series: [{
						data: ydata,
						type: 'line',
						symbol: 'circle',
						symbolSize: 12,
						color: '#FEC201',
						lineStyle: {
							color: "#03E0F2"
						},
						label: {
							show: true,
							position: 'top',
							textStyle: {
								fontSize: 10,
								fontWeight: 'bold'
							}
						},
						areaStyle: {
							color: 'rgba(1,98,133,0.6)'
						}
					}, {
						type: 'bar',
						animation: false,
						barWidth: 3,
						hoverAnimation: false,
						data: ydata,
						tooltip: {
							show: false
						},
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
										color: '#91EAF2' // 0% 处的颜色
									}, {
										offset: 1,
										color: '#074863' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								},
								label: {
									show: false
								}
							}
						}
					}]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var mouEcharts = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('mouEcharts'));
	$.ajax({
		url: $.cxt + "/pageOne/getMouEcharts",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data1) {
			var data = [];
			var json = JSON.parse(data1);
			if(json.code == '0') {
				var countData = json.data.MOU1_NUM + json.data.MOU2_NUM + json.data.MOU3_NUM
								+ json.data.MOU4_NUM + json.data.MOU5_NUM + json.data.MOU6_NUM;
				data.push({
					value: ((json.data.MOU1_NUM/countData)*100).toFixed(2),
					name: '(0分钟,,10分钟]'
				});
				data.push({
					value: ((json.data.MOU2_NUM/countData)*100).toFixed(2),
					name: '(10分钟，20分钟]'
				});
				data.push({
					value: ((json.data.MOU3_NUM/countData)*100).toFixed(2),
					name: '(20分钟,50分钟]'
				});
				data.push({
					value: ((json.data.MOU4_NUM/countData)*100).toFixed(2),
					name: '(50分钟,100分钟]'
				});
				data.push({
					value: ((json.data.MOU5_NUM/countData)*100).toFixed(2),
					name: '(100分钟,300分钟]'
				});
				data.push({
					value: ((json.data.MOU6_NUM/countData)*100).toFixed(2),
					name: '(300分钟，∞]'
				});
				var xData = [];
			    yData = [];
				var min = 50; 
				data.map(function(a, b) {
					xData.push(a.name);
				    if (a.value === 0) {
				        yData.push(a.value + min);
				    } else {
				        yData.push(a.value);
				    }
				});
				option = {
//					title : {
//				        text: '消费特征',
//				        x:'center',
//				        textStyle: {
//				            fontSize: 14,
//				            top: 0,
//				            color: '#fff'
//				        }
//				    },
				    color: ['#3398DB'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'line',
				            lineStyle: {
				                opacity: 0
				            }
				        },
				        formatter: function(prams) {
				            if (prams[0].data === min) {
				                return "MOU使用占比：0%"
				            } else {
				                return "MOU使用占比：" + prams[0].data + "%"
				            }
				        }
				    },
	//			    legend: {
	//			        data: ['直接访问', '背景'],
	//			        show: false
	//			    },
				    grid: {
				        left: '0%',
				        right: '-10%',
				        bottom: '25%',
				        top: '5%',
				        containLabel: true,
				        z: 22
				    },
				    xAxis: [{
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
				            color: '#fff',
				            interval:0,
				            rotate:40,
				            fontSize:8
				        }
				    }],
				    yAxis: [{
				            type: 'value',
				            gridIndex: 0,
				            splitLine: {
				                show: false
				            },
				            axisTick: {
				                show: false
				            },
				            min: 0,
				            axisLine: {
				                lineStyle: {
				                    color: '#0c3b71'
				                }
				            },
				            axisLabel: {
				                color: '#fff',
				                formatter: '{value} %',
				                fontSize:10
				            }
				        },
				        {
				            type: 'value',
				            gridIndex: 0,
				            min: 0,
				            max: 100,
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
				            splitArea: {
				                show: true,
				                areaStyle: {
				                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
				                }
				            }
				        }
				    ],
				    series: [{
				            name: 'MOU使用占比',
				            type: 'bar',
				            barWidth: '30%',
				            xAxisIndex: 0,
				            yAxisIndex: 0,
				            itemStyle: {
				                normal: {
				                    barBorderRadius: 30,
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1, [{
				                                offset: 0,
				                                color: '#da2921'
				                            },
				                            {
				                                offset: 0.5,
				                                color: '#da2921'
				                            },
				                            {
				                                offset: 1,
				                                color: '#da2921'
				                            }
				                        ]
				                    )
				                }
				            },
				            data: yData,
				            zlevel: 11
	
				        },
//				        {
//				            name: '背景',
//				            type: 'bar',
//				            barWidth: '50%',
//				            xAxisIndex: 0,
//				            yAxisIndex: 1,
//				            barGap: '-135%',
//				            data: [100, 100, 100, 100, 100],
//				            itemStyle: {
//				                normal: {
//				                    color: 'rgba(255,255,255,0.1)'
//				                }
//				            },
//				            zlevel: 9
//				        },
				      
				    ]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

var preferenceEcharts = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('preferenceEcharts'));
	$.ajax({
		url: $.cxt + "/pageOne/getPreferenceEcharts",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var xData = ['苹果', '华为', 'oppo', '三星', '小米', 'vivo', '欧派', '魅族', '诺基亚', '其他'];
			var seriesData = [];
			var json = JSON.parse(data);
			if(json.code == '0') {
				seriesData.push(json.data.TERMINAL_BRAND_NUM1);
				seriesData.push(json.data.TERMINAL_BRAND_NUM2);
				seriesData.push(json.data.TERMINAL_BRAND_NUM3);
				seriesData.push(json.data.TERMINAL_BRAND_NUM4);
				seriesData.push(json.data.TERMINAL_BRAND_NUM5);
				seriesData.push(json.data.TERMINAL_BRAND_NUM6);
				seriesData.push(json.data.TERMINAL_BRAND_NUM7);
				seriesData.push(json.data.TERMINAL_BRAND_NUM8);
				seriesData.push(json.data.TERMINAL_BRAND_NUM9);
				seriesData.push(json.data.TERMINAL_BRAND_NUM10);
				option = {
					tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#283b56'
				            }
				        },
				        position: [0,0]
					},
					grid: {
						top: '8%',
						left: '-20%',
						right: '5%',
						bottom: '8%',
						containLabel: true,
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						axisLine: { //坐标轴轴线相关设置。数学上的x轴
							 show: true,
							 lineStyle: {
								 color: '#233e64'
							 },
						 },
						 axisLabel: { //坐标轴刻度标签的相关设置
							 interval:0,
							 rotate:40,								 
							 textStyle: {
								 color: '#fff',
								 fontSize:8,
							 },
						 },
						 axisTick: {show: true,},
						data: xData,
					}],
					yAxis: [{
						type: 'value',
						min: 0,
						splitNumber: 7,
						splitLine: {
							 show: true,
							 lineStyle: {
								 color: '#233e64'
							 }
						 },
						 axisLine: {show: false,},
						 axisLabel: {
							 show: false,
							 textStyle: {
								 color: '#fff',
								 fontSize:10,
								 
							 },
						 },
						 axisTick: { show: false,},  
					}],
					series: [{
						name: '终端偏好',
						type: 'line',
						smooth: true, //是否平滑曲线显示
//					 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
						symbolSize:0,
						
						lineStyle: {
							normal: {
								color: "#3deaff"   // 线条颜色
							}
						},
						areaStyle: { //区域填充样式
			                normal: {
			                 //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
			                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								   { offset: 0,  color: 'rgba(61,234,255, 0.9)'}, 
								   { offset: 0.7,  color: 'rgba(61,234,255, 0)'}
							   ], false),

			                 shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
			                 shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
			             }
			         },
						data: seriesData
					}]
				};
				
				myChart.clear()
				myChart.setOption(option)
			}
		}
	})
}

var appEcharts = function(orgId, userType) {
	var myChart = echarts.init(document.getElementById('appEcharts'));
	$.ajax({
		url: $.cxt + "/pageOne/getAppEcharts",
		type: "POST",
		data: {
			orgId: orgId,
			userType: userType
		}, 
		success: function(data) {
			var xData = ['即时通信', '导航', 'P2P业务', '游戏', '视频', '音乐', '邮箱', '支付', '动漫', '其他'];
			var seriesData = [];
			var json = JSON.parse(data);
			if(json.code == '0') {
				seriesData.push(json.data.APP_TYPE_USER_01);
				seriesData.push(json.data.APP_TYPE_USER_02);
				seriesData.push(json.data.APP_TYPE_USER_03);
				seriesData.push(json.data.APP_TYPE_USER_04);
				seriesData.push(json.data.APP_TYPE_USER_05);
				seriesData.push(json.data.APP_TYPE_USER_06);
				seriesData.push(json.data.APP_TYPE_USER_07);
				seriesData.push(json.data.APP_TYPE_USER_08);
				seriesData.push(json.data.APP_TYPE_USER_09);
				seriesData.push(json.data.APP_TYPE_USER_10);
				option = {
//					title : {
//				        text: '兴趣特征',
//				        textStyle: {
//				            fontSize: 14,
//				            color: '#fff'
//				        }
//				    },
				    tooltip: {
				        trigger: 'axis',
				    },
				    grid: {
				        left: '10%',
				        right: '5%',
				        bottom: '26%',
				        top: '20%'
				    },
				    calculable: true,
				    color: ['#0283ff'],
				    xAxis: [
				        {
				            type: 'category',
				            axisLabel: {
				            	show: true,
				            	interval: 0,
				            	rotate: 45,
					            textStyle: {
					                fontSize: 8,
					                color: '#fff'
					            }
					        },
				            data: xData
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            show: false,
				            axisLabel: {
					            textStyle: {
					                fontSize: 10,
					                color: '#fff'
					            }
					        }
				        }
				    ],
				    series: [
				        {
				            name: 'APP使用次数',
				            type: 'bar',
				            data: seriesData,
				            barWidth: 8,
				            markPoint: {
				            	symbol: 'pin',
				            	symbolSize: 35,
				            	normal: {
				            		borderColor: '#fff',
				            		// 标注边线线宽，单位px，默认为1
				            		borderWidth: 1,
				                    label: {
				                        show: true
				                    }
				            	},
				                data: [
				                    {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}
				                ]
				            },
				            markLine: {
				                data: [
//				                    {type: 'average', name: '平均值'}
				                ]
				            },
				            itemStyle: {
		                        //柱形图圆角，鼠标移上去效果
		                        emphasis: {
		                            barBorderRadius: [10, 10, 10, 10]
		                        },

		                        normal: {
		                            //柱形图圆角，初始化效果
		                            barBorderRadius:[10, 10, 10, 10]
		                        }
		                    }
				        }
				    ]
				};
			    myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//家宽用户 1
var threearpuEcharts = function(orgId) {
	var myChart = echarts.init(document.getElementById('threearpuEcharts'));

	$.ajax({
		url: $.cxt + "/pageOne/getThreearpuEcharts",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var xData = [];
			var yData = [];
			var json = JSON.parse(data);
			if(json.code == '0') {
				for(var i = 0, j = json.data.length; i < j; i++) {
					xData.push(json.data[i].ORGNAME);
					yData.push(json.data[i].PRE3_AVG_ARPU.toFixed(2));
				}
				
				option = {
				    color: ['#3398DB'],
				    tooltip: {
				        trigger: 'axis',
				        position: [0,0],
				        axisPointer: {
				            type: 'line',
				            lineStyle: {
				                opacity: 0
				            }
				        },
				        formatter: function(prams) {
				            return "ARPU：" + prams[0].data
				        }
				    },
				    grid: {
				        left: '0%',
				        right: '0%',
				        bottom: '18%',
				        top: '12%',
//				        height: '85%',
				        containLabel: true,
				        z: 22
				    },
				    xAxis: [{
				        type: 'category',
				        gridIndex: 0,
				        data: xData,
				        axisTick: {
//					            alignWithLabel: true
				        },
				        axisLine: {
				            lineStyle: {
				                color: '#0c3b71'
				            }
				        },
				        axisLabel: {
				            show: true,
				            color: '#fff',
				            interval:0,
				            rotate:45,
				            fontSize: 8
				        }
				    }],
				    yAxis: [{
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
				                color: '#fff',
				                fontSize:10,
				                formatter: '{value}'
				            }
				        },
				        {
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
				                show: false,
				            },
				            splitArea: {
				                show: true,
				                areaStyle: {
				                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
				                }
				            }
				        }
				    ],
				    series: [{
				            name: 'ARPU',
				            type: 'bar',
				            barWidth: '30%',
				            xAxisIndex: 0,
				            yAxisIndex: 0,
				            label: {
				                normal: {
				                    show: true,
				                    position: "top",
				                    formatter: '{c}',
				                    textStyle: {
				                        color: "#fff",
				                        fontSize: 10
				                    }
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1, [{
				                                offset: 0,
				                                color: '#00feff'
				                            },
				                            {
				                                offset: 0.5,
				                                color: '#027eff'
				                            },
				                            {
				                                offset: 1,
				                                color: '#0286ff'
				                            }
				                        ]
				                    )
				                }
				            },
				            data: yData,
				            zlevel: 11

				        }

				    ]
				};
			}
			myChart.clear();
			myChart.setOption(option);
		}
	})
	
}

//家宽用户 2
var broadbandEcharts = function(orgId) {
	var myChart = echarts.init(document.getElementById('broadbandEcharts'));
	
	$.ajax({
		url: $.cxt + "/pageOne/getBroadbandEcharts",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				var countData = json.data.BANDWIDTH_2M_NUM + json.data.BANDWIDTH_4M_NUM 
							  + json.data.BANDWIDTH_6M_NUM + json.data.BANDWIDTH_8M_NUM
							  + json.data.BANDWIDTH_10M_NUM + json.data.BANDWIDTH_20M_NUM
							  + json.data.BANDWIDTH_50M_NUM + json.data.BANDWIDTH_100M_NUM
							  + json.data.BANDWIDTH_999M_NUM + json.data.BANDWIDTH_QT_NUM;
				var data1 = (json.data.BANDWIDTH_2M_NUM / countData * 100).toFixed(2);
				var data2 = (json.data.BANDWIDTH_4M_NUM / countData * 100).toFixed(2);
				var data3 = (json.data.BANDWIDTH_6M_NUM / countData * 100).toFixed(2);
				var data4 = (json.data.BANDWIDTH_8M_NUM / countData * 100).toFixed(2);
				var data5 = (json.data.BANDWIDTH_10M_NUM / countData * 100).toFixed(2);
				var data6 = (json.data.BANDWIDTH_20M_NUM / countData * 100).toFixed(2);
				var data7 = (json.data.BANDWIDTH_50M_NUM / countData * 100).toFixed(2);
				var data8 = (json.data.BANDWIDTH_100M_NUM / countData * 100).toFixed(2);
				var data9 = (json.data.BANDWIDTH_999M_NUM / countData * 100).toFixed(2);
				var data10 = (json.data.BANDWIDTH_QT_NUM / countData * 100).toFixed(2);
				
				option = {
				    tooltip: {
				        trigger: 'axis',
				        // 坐标轴指示器，坐标轴触发有效
				        axisPointer: {    
				        	// 默认为直线，可选为：'line' | 'shadow'
				            type: 'shadow'
				        },
				        formatter: function(prams) {
				            return prams[0].name + ': ' + prams[0].data.value + '%';
				        }
				    },
				    angleAxis: {
				        interval: 1,
				        type: 'category',
				        data: ['2M',
				            '4M',
				            '6M',
				            '8M',
				            '10M',
				            '20M',
				            '50M',
				            '100M',
				            '>100M',
				            '其他',
				        ],
				        z: 10,
				        axisLine: {
				            show: true,
				            lineStyle: {
				                color: "#00c7ff",
				                width: 1,
				                type: "solid"
				            },
				        },
				        axisLabel: {
				            interval: 0,
				            show: true,
				            color: "#00c7ff",
				            margin: 2,
				            fontSize: 10
				        },
				    },
				    radiusAxis: {
				        min: 0,
//				        max: 100,
				        interval: 20,
				        axisLine: {
				            show: true,
				            lineStyle: {
				                color: "#00c7ff",
				                width: 1,
				                type: "solid"
				            },
				        },
				        axisLabel: {
				            formatter: '{value} %',
				            show: true,
				            padding: [0, 0, 20, 0],
				            color: "#00c7ff",
				            fontSize: 10
				        },
				        splitLine: {
				            lineStyle: {
				                color: "#00c7ff",
				                width: 1,
				                type: "solid"
				            }
				        }
				    },
				    polar: {},
				    series: [{
				        type: 'bar',
				        data: [{
				                value: data1,
				                itemStyle: {
				                    normal: {
				                        color: "#f54d4d"
				                    }
				                }
				            },
				            {
				                value: data2,
				                itemStyle: {
				                    normal: {
				                        color: "#f87544"
				                    }
				                }
				            },
				            {
				                value: data3,
				                itemStyle: {
				                    normal: {
				                        color: "#ffae00"
				                    }
				                }
				            },
				            {
				                value: data4,
				                itemStyle: {
				                    normal: {
				                        color: "#dcff00"
				                    }
				                }
				            },
				            {
				                value: data5,
				                itemStyle: {
				                    normal: {
				                        color: "#25d053"
				                    }
				                }
				            },
				            {
				                value: data6,
				                itemStyle: {
				                    normal: {
				                        color: "#01fff5"
				                    }
				                }
				            },
				            {
				                value: data7,
				                itemStyle: {
				                    normal: {
				                        color: "#007cff"
				                    }
				                }
				            },
				            {
				                value: data8,
				                itemStyle: {
				                    normal: {
				                        color: "#4245ff"
				                    }
				                }
				            },
				            {
				                value: data9,
				                itemStyle: {
				                    normal: {
				                        color: "#c32eff"
				                    }
				                }
				            },
				            {
				                value: data10,
				                itemStyle: {
				                    normal: {
				                        color: "#f9010d00"
				                    }
				                }
				            }
				        ],
				        coordinateSystem: 'polar',
				    }],
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//家宽用户 3
var flowEcharts = function(orgId) {
	var myChart = echarts.init(document.getElementById('flowEcharts'));
	
	$.ajax({
		url: $.cxt + "/pageOne/getFlowEcharts",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				var yData = [];
				yData.push(json.data.VOL_TREND_LAST1.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST2.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST3.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST4.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST5.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST6.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST7.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST8.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST9.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST10.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST11.toFixed(2));
				yData.push(json.data.VOL_TREND_LAST12.toFixed(2));
				option = {
					tooltip: {	
						trigger: 'axis'
					},
					grid: {
						top: '8%',
						left: '1%',
						right: '4%',
						bottom: '8%',
						containLabel: true,
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						axisLine: { //坐标轴轴线相关设置。数学上的x轴
							show: true,
							lineStyle: {
								color: '#233e64'
							},
						},
						axisLabel: { //坐标轴刻度标签的相关设置
							interval:0,
							fontSize:10,
							textStyle: {
								color: '#fff',
							},
						},
						axisTick: { show: false,},
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
					}],
					yAxis: [{
						type: 'value',
						min: 0,
						splitNumber: 7,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#233e64'
							}
						},
						axisLine: {show: false,},
						axisLabel: {
							textStyle: {
								color: '#fff',
									fontSize:10,
							},
						},
						axisTick: { show: false,},  
					}],
					series: [{
						name: '上网流量',
						type: 'line',
						smooth: true, //是否平滑曲线显示
					//	symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
						symbolSize:8,
						lineStyle: {
							normal: {
								color: "#3deaff"   // 线条颜色
							}
						},
						areaStyle: { //区域填充样式
					    	normal: {
						     	//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
						     	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0,  color: 'rgba(61,234,255, 0.9)'}, 
									{ offset: 0.7,  color: 'rgba(61,234,255, 0)'}
								], false),
						
						      	shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
						     	shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
						 	}
						},
						data: yData
					}]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//家宽用户 4
var userScale = function(orgId) {
	var myChart = echarts.init(document.getElementById('userScale'));
	$.ajax({
		url: $.cxt + "/pageOne/getUserScale",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			var innerData = []
			var outData = []
			if(json.code == '0') {
				innerData.push({
					value: json.data.MBH_SERV_NUM,
					name: '用户规模'
				})
				outData.push({
					value: json.data.ONNET_NUM,
					name: '开机数'
				})
				outData.push({
					value: json.data.LOSS_NUM,
					name: '关机数'
				})
				option = {
				    tooltip: {
				        trigger: 'item',
				        position: [0, 0],
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				    	{
				            name: '用户',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            label: {
				                normal: {
				                    position: 'inner',
				                    fontSize : 8
				                }
				            },
				            data:innerData
				        },
				        {
				            name: '开机停机占比',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: ['40%', '68%'],
				            labelLine: {
				                normal: {
				                    show: false,
				                    length: 5,
				                    length2: 5
				                }
				            },
				            label: {
				                normal: {
				                    position: 'outside',
				                    fontSize : 10
				                }
				            },
				            data: outData
				        }
				    ],
				    color: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//家宽用户 5
var inNet = function(orgId) {
	var myChart = echarts.init(document.getElementById('inNet'));
	$.ajax({
		url: $.cxt + "/pageOne/getInNet",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				/**
				 * 图标所需数据
				 */
				var data = {
				    id: 'echartPie',
				    value: [],
				    legend: ['≤2年', '2-3年', '≥3年'],
				    color: ['#3FA7DC', '#7091C4', '#5170A2', '#E1CA74'],
				    // tooltipShow:false,    //设置悬浮提示显示              --默认显示true
				    // hoverAnimation:false, //设置鼠标悬浮点击饼图动画效果  --默认开启动画true
				}
				data.value.push(json.data.ONNET_DATE_NUM1);
				data.value.push(json.data.ONNET_DATE_NUM2);
				data.value.push(json.data.ONNET_DATE_NUM3);
				
				/**
				 * 数据处理
				 */
				var seriesData = [];
				data.value.forEach(function(item, index) {
				    seriesData.push({
				        value: item,
				        name: data.legend[index]
				    });
				});
				
				var option = {
				    title: {
				        x: '2%',
				        y: '2%',
				        textStyle: {
				            fontWeight: 400,
				            fontSize: 16,
				            color: '#687284'
				        },
				        text: data.title || ''
				    },
				    tooltip: {
				        trigger: 'item',
				        show: data.tooltipShow === false ? false : true
				        //   formatter: "{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'horizontal',
				        top: 2,
				        icon: 'circle',
				        selectedMode: true,
				        itemWidth: 6,
				        itemHeight: 6,
				        itemGap: 6,
				        borderRadius: 6,
				        data: data.legend,
				        textStyle: {
				            fontSize: 10,
				            color: '#fff'
				        }
				    },
				    series: [{
				        type: 'pie',
				        // clickable:false,
				        // selectedMode: 'single',//单点击设置
				        hoverAnimation: data.hoverAnimation === false ? false : true,
				        radius: ['40%', '67%'],
				        color: data.color,
				        label: {
				            normal: {
				                position: 'inner',
				                // formatter: '{d}%',
				                formatter: function(param) {
				                    if (!param.percent) return ''
				                    var f = Math.round(param.percent * 10) / 10;
				                    var s = f.toString();
				                    var rs = s.indexOf('.');
				                    if (rs < 0) {
				                        rs = s.length;
				                        s += '.';
				                    }
				                    while (s.length <= rs + 1) {
				                        s += '0';
				                    }
				                    return s + '%';
				                },
				                textStyle: {
				                    color: '#fff',
				                    fontSize: 12
				                }
				            }
				        },
				        labelLine: {
				            normal: {
				                show: false
				            }
				        },
				        data: seriesData
				    }]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//家宽用户 6
var accessEcharts = function(orgId) {
	var myChart = echarts.init(document.getElementById('accessEcharts'));
	
	$.ajax({
		url: $.cxt + "/pageOne/getAccessEcharts",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				var legendData = ['FTTB', 'FTTH', '其他'];
				var countData = json.data.ACESS_TYPE1_NUM + json.data.ACESS_TYPE2_NUM 
							  + json.data.ACESS_TYPE3_NUM;
				var fttbData = ((json.data.ACESS_TYPE1_NUM / countData) * 100).toFixed(2);
				var ftthData = ((json.data.ACESS_TYPE2_NUM / countData) * 100).toFixed(2);
				var otherData = ((json.data.ACESS_TYPE3_NUM / countData) * 100).toFixed(2);
				option = {
				    tooltip : {
				        trigger: 'axis',
				        position:[0,0],
				        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data: legendData,
				        orient: 'horizontal',
				        x: 'center',
				        itemWidth: 10,
				        itemHeight: 10,
				        itemGap: 10,
				        borderRadius: 4,
				        textStyle: {
				        	color:'#fff'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '50%',
				        bottom: '0%',
				        top: '15%',
				        containLabel: true
				    },
				    xAxis:  {
				        type: 'category',
				        data: ['周一'],
				        show: false
				    },
				    yAxis: {
				        type: 'value',
				        show: false
				    },
				    series: [
				        {
				            name: 'FTTB',
				            type: 'bar',
				            stack: '接入方式',
				            color: ['#5c5dba'],
				            barWidth: 30,
				            label: {
				                normal: {
				                    show: true,
				                    color: '#fff',
				                    formatter: function (data) { 
				                        return data.seriesName + "：" + fttbData + "%"
				                    },
				                    position: 'insideRight',
				                    offset: [100, 0]
				                }
				            }, 
				            data: [json.data.ACESS_TYPE1_NUM]
				        },
				        {
				            name: 'FTTH',
				            type: 'bar',
				            stack: '接入方式', 
				            color: ['#54c6ea'],
				            barWidth: 30,
				            label: {
				                normal: {
				                    show: true,
				                    color:'#fff',
				                    formatter: function (data) { 
				                        return data.seriesName + "：" + ftthData + "%"
				                    },
				                    position: 'insideRight',
				                    offset: [100, 0]
				                }
				            }, 
				            data: [json.data.ACESS_TYPE2_NUM]
				        },
				        {
				            name: '其他',
				            type: 'bar',
				            stack: '接入方式', 
				            color: ['#0089bf'],
				            barWidth: 30,
				            label: {
				                normal: {
				                    show: true,
				                    color: '#fff',
				                    formatter: function (data) { 
				                        return data.seriesName+"："+otherData+"%"
				                    },
				                    position: 'insideRight',
				                    offset: [100, 0]
				                }
				            }, 
				            data: [json.data.ACESS_TYPE3_NUM]
				        }
				    ]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//家宽用户 7
var warningEcharts = function(orgId) {
	var myChart = echarts.init(document.getElementById('warningEcharts'));
	
	$.ajax({
		url: $.cxt + "/pageOne/getWarningEcharts",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				var actualProduction = 
				[
					json.data.END_MONTH1_NUM,
					json.data.END_MONTH2_NUM,
					json.data.END_MONTH3_NUM,
					json.data.END_MONTH4_NUM,
					json.data.END_MONTH5_NUM,
					json.data.END_MONTH6_NUM,
					json.data.END_MONTH7_NUM,
					json.data.END_MONTH8_NUM,
					json.data.END_MONTH9_NUM,
					json.data.END_MONTH10_NUM,
					json.data.END_MONTH11_NUM,
					json.data.END_MONTH12_NUM
				]
				
				var productivity = 
				[
					json.data.END_MONTH1_TIME,
					json.data.END_MONTH2_TIME,
					json.data.END_MONTH3_TIME,
					json.data.END_MONTH4_TIME,
					json.data.END_MONTH5_TIME,
					json.data.END_MONTH6_TIME,
					json.data.END_MONTH7_TIME,
					json.data.END_MONTH8_TIME,
					json.data.END_MONTH9_TIME,
					json.data.END_MONTH10_TIME,
					json.data.END_MONTH11_TIME,
					json.data.END_MONTH12_TIME
				]
				
				var lengendData = ['用户数量', '在网时长'];
				var title = ['前1月', '前2月', '前3月', '前4月', '前5月', '前6月', '前7月', '前8月', '前9月', '前10月', '前11月', '前12月'];
//				var data = {
//					    title: ['前1月', '前2月', '前3月', '前4月', '前5月', '前6月', '前7月', '前8月', '前9月', '前10月', '前11月', '前12月'],
//					    actual_production: actualProduction,
//					    productivity: productivity
//					};
//					option = {
//					    tooltip: {
//					        trigger: 'axis',
//					        axisPointer: {
//					            type: 'cross',
//					            label: {
//					                backgroundColor: '#283b56'
//					            }
//					        }
//					    },
//					    legend: {
//					    	textStyle: {
//					    		color:'#fff'
//					    	},
//					        data: lengendData
//					    },
//					    grid: {
//					        bottom: '20%',
//					        left: '12%',
//					        right: '12%',
//					        top:'20%'
//					    },
//					    xAxis: [{
//					        type: 'category',
//					        boundaryGap: true,
//					        data: data.title,
//					        axisLabel: {
//					        	interval: 0,
//								rotate:30,
//								color: '#fff',
//								fontSize:8
//					        }
//					    }],
//					    yAxis: [{
//					        type: 'value',
//					        scale: true,
//					        minInterval: 1,
//					        name: '到期前数量',
//					        nameTextStyle : {
//					        	color: '#fff',
//					        	fontSize:10,
//					        },
//					        splitLine: {
//					            show: false,
//					        },
//					        axisLabel: {
//					        	color: '#fff',
//					        	fontSize:10,
//					        },
//					    }, {
//					        type: 'value',
//					        scale: true,
//					        name: '到期前在网时长',
//					        nameTextStyle : {
//					        	color: '#fff',
//					        	fontSize:10,
//					        },
//					        splitLine: {
//					            show: false
//					        },
//					        axisLabel: {
//					        	color: '#fff',
//					        	fontSize:10,
//					            formatter: '{value}',
//					        }
//					    }],
//					    series: [{
//					        name: lengendData[0],
//					        type: 'bar',
//					        label: {
//					            show: true,
//					            position: 'top'
//					        },
//					        barWidth : '50%',
//					        yAxisIndex: 0,
//					        itemStyle:{
//					        	normal: {
//					        		color : '#4a95ff'
//					        	}
//					        },
//					        data: data.actual_production
//					    }, {
//					        name: lengendData[1],
//					        type: 'line',
//					        label: {
//					            show: true,
//					            position: 'top',
//					            formatter: '{c}'
//					        },
//					        yAxisIndex: 1,
//					        data: data.productivity
//					    }]
//					};
				
				option = {
			        tooltip: {
			        	trigger: 'axis',
			            axisPointer: {
			                type: 'cross',
			                label: {
			                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
			                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
			                    textStyle: {
			                        color: '#666',
			                    },
			                },
			            },
			            backgroundColor: 'rgba(255, 255, 255, 0.8)',
			            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
			            textStyle: {
			                color: '#666',
			            },
			        },
			        toolbox: {
			            'show': false,
			            // orient: 'vertical',
			            //x: 'right',
			            //y: 'center',
			            feature: {
			                'magicType': {
			                    'show': true,
			                    'type': ['bar', 'line']
			                },
			                restore: {
			                    'show': true
			                },
			                saveAsImage: {
			                    'show': true
			                }
			            }
			        },
			        legend: {
			        	textStyle: {
				    		color: '#fff',
				    		fontSize: 10
				    	},
			            data: ['用户数量', '在网时长'],
			        },
			        grid: {
			            top: '25%',
			            left: '3%',
			            right: '2%',
			            bottom: '5%',
			            containLabel: true
			        },
			        xAxis: [{
			            type: 'category',
			            data: title,
			            axisLabel: { //坐标轴刻度标签的相关设置。
			                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
			                rotate: 40,
			                textStyle: {
			                    color: '#fff',
			                    fontSize: '8',
			                }
			            },
			            axisLine: { //坐标轴轴线相关设置
			                lineStyle: {
			                    color: '#666',
			                    opacity: 1
			                }
			            },
			            splitLine: { //坐标轴在 grid 区域中的分隔线。
			                show: false,
			            }
			        }],
			        yAxis: [{
			            name: '到期前数量',
			            nameTextStyle : {
				        	color: '#fff',
				        	fontSize:10,
				        },
			            type: 'value',
			            axisLabel: {
			                textStyle: {
			                    color: '#fff',
			                    fontSize: '10'
			                }
			            },
			            axisLine: {
			                show: false
			            },
			            axisTick: {
			                show: false
			            },
			            splitLine: {
			                show: false,
			            }
			        }, {
			            name: '到期前在网时长',
			            nameTextStyle : {
				        	color: '#fff',
				        	fontSize: 10,
				        },
			            type: 'value',
			            position: 'right',
			            axisLabel: {
			                textStyle: {
			                    color: '#fff',
			                    fontSize: '10',
			                }
			            },
			            axisLine: {
			                show: false
			            },
			            axisTick: {
			                show: false
			            },
			            splitLine: {
			                show: false,
			            }
			        }],
			        series: [{
			            'name': '用户数量',
			            'type': 'bar',
			            // barWidth: 15,
			            'data': actualProduction,
			            itemStyle: {
			                normal: {
			                    //barBorderRadius: 15,
			                    color: new echarts.graphic.LinearGradient(
			                        0, 0, 0, 1, [{
			                                offset: 0,
			                                color: '#229aff'
			                            },
			                            {
			                                offset: 1,
			                                color: '#13bfe8'
			                            }
			                        ]
			                    )
			                }
			            }
			        }, {
			            name: '在网时长',
			            yAxisIndex: 1,
			            type: 'line',
			            showAllSymbol: true,
			            symbol: 'emptyCircle',
			            symbolSize: 14,
			            data: productivity,
			            itemStyle: {
			                normal: {
			                    color: '#fdb94e'
			                },
			            },
			        }]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//渠道用户 1
var chnlnumEcharts = function(orgId) {
	var myChart = echarts.init(document.getElementById('chnlnumEcharts'));
	
	$.ajax({
		url : $.cxt + "/pageOne/getChnlnumEcharts",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				var innerData = [];
				var outData = [];
				innerData.push({
					value: json.data.COUNT_DATA,
					name: '总渠道数'
				});
				outData.push({
					value: json.data.SDATA,
					name: '实体渠道'
				});
				outData.push({
					value: json.data.ZDATA,
					name: '直销渠道'
				});
				outData.push({
					value: json.data.QDATA,
					name: '其他'
				});
				option = {
				    tooltip: {
				        trigger: 'item',
				        position: [0, 0],
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name: '总量',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            label: {
				                normal: {
				                    position: 'inner',
				                    fontSize : 8
				                }
				            },
				            data: innerData
				        },
				        {
				            name: '渠道占比',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: ['40%', '55%'],
				            labelLine: {
				                normal: {
				                    show: false,
				                    length:5,
				                    length2:5
				                }
				            },
				            label: {
				                normal: {
				                    position: 'outside',
				                    fontSize : 10
				                }
				            },
				            data: outData
				        }
				    ],
				    color: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//渠道用户 2
var chnlstarEcharts = function(orgId) {
	var myChart = echarts.init(document.getElementById('chnlstarEcharts'));
	
	$.ajax({
		url : $.cxt + "/pageOne/getChnlstarEcharts",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				var starData = [];
				for(var i = 0, j = json.data.length; i < j; i++) {
					if(json.data[i].PUB_NAME != null) {
						starData.push({
							value: json.data[i].PUB_DATA,
							name: json.data[i].PUB_NAME + '星'
						});
					} else {
						starData.push({
							value: json.data[i].PUB_DATA,
							name: '无'
						});
					}
				}
				option = {
				    tooltip: {
				        trigger: 'item',
				        position: [0, 0],
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name: '渠道星级',
				            type: 'pie',
				            selectedMode: 'single',
				            radius: ['40%', '55%'],
				            labelLine: {
				                normal: {
				                    show: false,
				                    length: 5,
				                    length2: 5
				                }
				            },
				            label: {
				                normal: {
				                    position: 'outside',
				                    fontSize: 10
				                }
				            },
				            data: starData
				        }
				    ],
				    color: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//渠道用户 3
var chnlNumFull = function(orgId) {
	var myChart = echarts.init(document.getElementById('chnlNumFull'));
	
	$.ajax({
		url: $.cxt + "/pageOne/getChnlNumFull",
		type: "POST",
		data:{
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				var xData = [];
				var yData = [];
				for(var i = 0, j = json.data.length; i < j; i++) {
					xData.push(json.data[i].ORG_NAME);
					yData.push(json.data[i].CHNL_DATA);
				}
				
				option = {
				    color: ['#3398DB'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'line',
				            lineStyle: {
				                opacity: 0
				            }
				        },
				        formatter: function(prams) {
				            return "渠道数：" + prams[0].data;
				        }
				    },
				    grid: {
				        left: '0%',
				        right: '-4%',
				        bottom: '18%',
				        top: '12%',
//					        height: '85%',
				        containLabel: true,
				        z: 22
				    },
				    xAxis: [{
				        type: 'category',
				        gridIndex: 0,
				        data: xData,
				        axisTick: {
//							alignWithLabel: true
				        },
				        axisLine: {
				            lineStyle: {
				            	color: '#0c3b71'
				            }
				        },
				        axisLabel: {
				            show: true,
				            color: '#fff',
				            interval: 0,
				            rotate: 45,
				            fontSize: 8
				        }
				    }],
				    yAxis: [
				    	{
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
					        	color: '#fff',
					         	fontSize:10,
					         	formatter: '{value}'
					      	}
					 	},
					 	{
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
				                show: false,
				            },
				            splitArea: {
				                show: true,
				                areaStyle: {
				                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
				                }
				            }
				        }
				    ],
				    series: [
				    	{
				        	name: '渠道数',
				            type: 'bar',
				            barWidth: '30%',
				            xAxisIndex: 0,
				            yAxisIndex: 0,
				            label: {
				                normal: {
				                    show: true,
				                    position: "top",
				                    formatter: '{c}',
				                    textStyle: {
				                        color: "#fff",
				                        fontSize: 10
				                    }
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1, [{
				                                offset: 0,
				                                color: '#00feff'
				                            },
				                            {
				                                offset: 0.5,
				                                color: '#027eff'
				                            },
				                            {
				                                offset: 1,
				                                color: '#0286ff'
				                            }
				                        ]
				                    )
				                }
				            },
				            data: yData,
				            zlevel: 11
				        }
				    ]
				};
				myChart.clear();
				myChart.setOption(option);
			}
		}
	});
}

//渠道用户 4
var chnlShare = function(orgId) {
	var myChart = echarts.init(document.getElementById('chnlShare'));
	$.ajax({
		url: $.cxt + "/pageOne/getChnlShare",
		type: "POST",
		data: {
			orgId: orgId
		}, 
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0'){
				var orgNameData = [];
				var mobileData = [];
				var unicomData = [];
				var telecomData = [];
				for(var i = 0, j = json.data.length; i < j; i++) {
					orgNameData.push(json.data[i].ORG_NAME);
					mobileData.push(json.data[i].MOBILE_CHNL_NUM);
					unicomData.push(json.data[i].UNICOM_CHNL_NUM);
					telecomData.push(json.data[i].TELECOM_CHNL_NUM);
				}
				var app = [];
				app.config = {
				    onChange: function () {
				        var labelOption = {
				            normal: {
				                rotate: app.config.rotate,
				                align: app.config.align,
				                verticalAlign: app.config.verticalAlign,
				                position: app.config.position,
				                distance: app.config.distance
				            }
				        };
				        myChart.setOption({
				            series: [{
				                label: labelOption
				            }, {
				                label: labelOption
				            }, {
				                label: labelOption
				            }, {
				                label: labelOption
				            }]
				        });
				    }
				};
				var labelOption = {
				    normal: {
				        show: true,
				        position: app.config.position,
				        distance: app.config.distance,
				        align: app.config.align,
				        verticalAlign: app.config.verticalAlign,
				        rotate: app.config.rotate,
				        formatter: '{c} ',
				        fontSize: 10,
				        rich: {
				            name: {
				                textBorderColor: '#fff'
				            }
				        }
				    }
				};

				option = {
				    color: ['#003366', '#66CC99', '#4cabce', '#e5323e'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				    	orient: 'horizontal',
				        x: 'right',
				        itemWidth: 10,
				        itemHeight: 10,
				        itemGap: 10,
				        borderRadius: 4,
				    	textStyle: {
				            fontSize: 10,
				            color: '#fff'
				        },
				        data: ['移动', '联通', '电信'],
				    },
				    calculable: true,
				    grid: {
				        x: 60,
				        y: 30,
				        x2: 10,
				        y2: 45,
				    },
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {show: false},
				            data: orgNameData,
				            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
					            show: true,
					            interval: '0',
					            rotate:30,
					            color: '#fff',
					            fontSize: 10
					        },
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
					            show: true,
					            color: '#fff',
					            fontSize:10
					        },
				        }
				    ],
				    series: [
				        {
				            name: '移动',
				            type: 'bar',
				            barGap: 0,
				            label: labelOption,
				            data: mobileData
				        },
				        {
				            name: '联通',
				            type: 'bar',
				            label: labelOption,
				            data: unicomData
				        },
				        {
				            name: '电信',
				            type: 'bar',
				            label: labelOption,
				            data: telecomData
				        }
				    ]
				};
				myChart.clear();
				myChart.setOption(option)
			}
		}
	});
}
var setNiceScroll = function(id){
	$(".ui-jqgrid-bdiv").niceScroll({
		cursorheight: $(window).height()-190,
	    cursorcolor: "#5cd4f8",
	    cursorborder: "1px solid #5cd4f8",
	    touchbehavior: false,
	    spacebarenabled: true,
	    railoffset: false
	});
}