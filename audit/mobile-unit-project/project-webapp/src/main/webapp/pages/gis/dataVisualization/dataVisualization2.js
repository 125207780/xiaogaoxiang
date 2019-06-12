$(function() {
	//汇总信息--》日期
	var now = new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
	var date = now.getDate();
    month = month + 1;
    if (month < 10) 
 	   month = "0" + month;
    if (date < 10)  
 	   date = "0" + date;
 	var lastMonth = year.toString()+ month.toString() + date.toString();
 	$("#dv_date").datepicker({
 		format: 'yyyymmdd',
		language:  'zh-CN',
		todayBtn : "linked",
		autoclose:true,
		minview : "3"
	});
	
	$("#dv_date").val(lastMonth);
	
	var orgId = $(".orgId").val();
	bigType();
	initOrg(orgId);
	childrenOrg();
	
	var pubScaleType = 'chnl';
	var pubSmallTypeId = '1'
	var unSelectColor = '#999999';
	var mapObj = null;
	var mapOrgId = null;
	// var eOption = { geo:{bottom:"45%",top:'8%',right:'20%',left:'20%'}};
 	var emap = showEmap(orgId, "mainMap", callBack);
	function callBack(_orgId, orgLevel) {
		mapOrgId = _orgId
		$("#hiddenOrgId").val(_orgId);
		// 当前点击的是第3层，地图呈现，再钻取就没什么能呈现的
		if(orgLevel == "4") {
			$(".glyphicon-fullscreen").remove();
			$(".visual-left").hide();
			$(".visual-right").hide();
			$(".middle-down").hide();
			$(".visual-middle").width("100%");
			$(".middle-up").height("100%");
			$("#topPanel").remove();
			$("#lastPanel").remove();
			mapObj = emap.mapObj;
			/*   地图层重复重置
			window.setTimeout(function() {
				mapObj.getModel().getComponent('bmap').getBMap().reset();
			},1000);*/
		} else if(orgLevel == "1" || orgLevel == "2") {
			$(".visual-left").show();
			$(".visual-right").show();
			$(".middle-down").show();
			$(".visual-middle").width("34%");
			$(".middle-up").height("50%");
			$(".glyphicon-fullscreen").remove();
			var showMaxBtn = $('<span style="font-size: 15px; cursor: pointer; position: absolute; z-index: 10; right: 10px;" class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>');
			$("#mainMap").append(showMaxBtn);
			windowMax();
			mapObj = this.next();
			kpiRadio(orgId);
			// 初始化加载网格规模
			gridScale(_orgId);
			chnlScale(_orgId);
			stationScale(_orgId);
			flowScale(_orgId);
			voiceScale(_orgId);
			showTop(_orgId, pubScaleType, pubSmallTypeId);
			$(".append-all").hide();
		} else {
			$(".glyphicon-fullscreen").remove();
			$(".visual-left").hide();
			$(".visual-right").hide();
		   	$(".middle-down").hide();
		   	$(".visual-middle").width("100%");
		   	$(".middle-up").height("100%");
		   	$("#topPanel").remove();
		   	$("#lastPanel").remove();
		   	mapObj = this.next();
		   	areaAndGridPage(_orgId);
		}
		selectRadio();
	}
	
	function windowMax() {
		//窗口缩放
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
	
	var scaleTypeNum = ""
	var	smallTypeIdNum = ""
	$(".scaleNum").on("click", function() {
		$("#scaleModal").modal("show");
		initOrgWindow1(mapOrgId);
		childrenOrgWindow1();
		var scaleType = $(this).prev().attr("id");
		var smallTypeId = $(this).prev().attr("smallScaleId");
		$("#scaleTypeHidden").val(scaleType);
		$("#smallScaleIdHidden").val(smallTypeId);
		// getGridInfoByType(mapOrgId,gridTypeId);
		scaleTypeNum = scaleType;
		smallTypeIdNum = smallTypeId;
		scaleWindow(mapOrgId, scaleType, smallTypeId)
	})
	
	$("#bigType").change(function() {
		var kpiType = $(this).find("option:selected").val();
		smallType(kpiType);
	});
	
/*	$("#smallType").change(function(){
		var kpiType = $(this).find("option:selected").val();
		kpiRadio(mapOrgId);
	});*/
	
	$("#newsSelect").click(function(){
		kpiRadio(mapOrgId);
	});
	function selectRadio() {
		$(".rateRadio input[type='radio']").unbind();
		$(".rateRadio input[type='radio']").click(function() {
			var kpiId = $(this).attr('rangeid');
			$(this).attr('checked', 'checked');
			$(".rateRadio input[type='radio']").each(function(index, element) {
				var _kpiId = $(element).attr('rangeid');
				if(_kpiId != kpiId) {
					$(element).removeAttr("checked");
				}
			});
			kpiRadio(mapOrgId);
		});
	}
	
	var kpiDataList = [];
	$(".scaleTypeName").click(function() {
		kpiDataList = [];
		var scaleType = $(this).attr("id");
		var smallScaleType = $(this).attr("smallScaleId");
		pubScaleType = scaleType;
		pubSmallTypeId = smallScaleType;
		showTop(mapOrgId, scaleType, smallScaleType);
	});
	
	function showTop(orgId, scaleType, smallScaleType) {
		$("#topPanel").remove();
		$("#lastPanel").remove();
		var topPanel = $("<div class='topPanel' id='topPanel'><div class='topPanelUp'>前五名TOP</div><div class='topPanelDown'></div></div>");
		var lastPanel = $("<div class='lastPanel' id='lastPanel'><div class='lastPanelUp'>后五名TOP</div><div class='lastPanelDown'></div></div>");
		$("#mainMap").append(topPanel);
		$("#mainMap").append(lastPanel);
//		if(publicOrgLevel == '3' || publicOrgLevel == '4'){
//			$("#topPanel").css('background-color', '#2e3052')
//				.css('opacity', '0.9').css('left', '10px').css('bottom', '10px');
//		}
		$.ajax({
			url: $.cxt + "/dataVisualization2/getTopScale",
			type: 'POST',
			data: {
				orgId: orgId,
				scaleType: scaleType,
				smallScaleType: smallScaleType
			},
			async: false,
			success: function(data) {
				var json = JSON.parse(data);
				if(json.code == '0'){
					kpiDataList = json.data;
				}
			}
		});
		
		var topList = kpiDataList.slice(0, 5);
		var lastList = kpiDataList.slice(kpiDataList.length - 5, kpiDataList.length);
		var topHtml = "";
		var lastHtml = "";
		for(var i = 0, n = topList.length; i < n; i++) {
			topHtml += "<div class='topValue'>NO." + (i + 1) + "&nbsp;" 
				+ topList[i].ORG_NAME + "&nbsp;" + topList[i].PUB_DATA + "</div>";
		}
		for(var i = lastList.length - 1; i >= 0; i--) {
			lastHtml += "<div class='topValue'>NO." + (lastList.length - i) + "&nbsp;" 
				+ lastList[i].ORG_NAME + "&nbsp;" + lastList[i].PUB_DATA + "</div>";
		}
		$(".topPanelDown").html(topHtml);
		$(".lastPanelDown").html(lastHtml);
	}
	
	function childrenOrgWindow1() {
		$(".orgWindow1").change(function() {
			var selectId = $(this).attr('id');
			var optionValue = $(this).find("option:selected").val();
			if(selectId == 'cityWindow1') {
				if(optionValue != '请选择...') {
					$.ajax({
						url: $.cxt + "/dataVisualization2/getChildren",
						type: 'POST',
						data: {orgId: optionValue},
						success: function(data) {
							var json = JSON.parse(data);
							var orgInfo = json.data;
							if(json.code == '0') {
								$("#areaWindow1").empty();
								$("#deptWindow1").empty();
								$("#gridWindow1").empty();
								$("#areaWindow1").append($("<option>" + '请选择...' + "</option>"))
								$("#deptWindow1").append($("<option>" + '请选择...' + "</option>"))
								$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"))
								var html = "";
								for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.areaInfo[i].areaId+"'>"+ orgInfo.areaInfo[i].areaName + "</option>"
								}
								    $("#areaWindow1").append(html);
									
								//	$("#areaWindow1").append(
								//		$("<option>" + orgInfo.areaInfo[i].areaName + "</option>").attr('value', orgInfo.areaInfo[i].areaId)
								//	);
								//}
							    var html = "";
								for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
								}
								    $("#deptWindow1").append(html);
									
								//	$("#deptWindow1").append(
								//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
								//	);
								//}
								var html = "";
								for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+ orgInfo.gridInfo[i].gridName + "</option>"
								}
								    $("#gridWindow1").append(html);
									
								//	$("#gridWindow1").append(
								//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
								//	);
								//}
							}
							scaleWindow(optionValue,scaleTypeNum,smallTypeIdNum);
						}
					});
				} else {
					initOrgWindow1("1");
					scaleWindow('1', scaleTypeNum, smallTypeIdNum);
				}
			} else if(selectId == 'areaWindow1') {
				if(optionValue != '请选择...') {
					$.ajax({
						url: $.cxt + "/dataVisualization2/getChildren",
						type: 'POST',
						data: {orgId: optionValue},
						success: function(data) {
							var json = JSON.parse(data);
							var orgInfo = json.data;
							if(json.code == '0') {
								$("#deptWindow1").empty();
								$("#gridWindow1").empty();
								$("#deptWindow1").append($("<option>" + '请选择...' + "</option>"))
								$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"))
								var html = "";
								for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
								}
								    $("#deptWindow1").append(html);
									
								//	$("#deptWindow1").append(
								//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
								//	);
								//}
								var html = "";
								for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+  orgInfo.gridInfo[i].gridName + "</option>"
								}
								    $("#gridWindow1").append(html);
									
								//	$("#gridWindow1").append(
								//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
								//	);
								//}
							}
							scaleWindow(optionValue,scaleTypeNum,smallTypeIdNum);
						}
					});
				} else {
					var cityId = $("#sumCity").find("option:selected").val();
					if(cityId == '请选择...') {
						initOrgWindow1("1");
						scaleWindow('1', scaleTypeNum, smallTypeIdNum);
						return;
					} else {
						$.ajax({
							url: $.cxt + "/dataVisualization2/getChildren",
							type: 'POST',
							data: {orgId: cityId},
							success: function(data) {
								var json = JSON.parse(data);
								var orgInfo = json.data;
								if(json.code == '0') {
									$("#deptWindow1").empty();
									$("#gridWindow1").empty();
									$("#deptWindow1").append($("<option>" + '请选择...' + "</option>"))
									$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"))
									var html = "";
									for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
										 html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+  orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
									}
									    $("#deptWindow1").append(html);
											
									//	$("#deptWindow1").append(
									//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
									//	);
									//}
									var html = "";
									for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
										 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+   orgInfo.gridInfo[i].gridName + "</option>"
									}
									    $("#gridWindow1").append(html);
												
									//	$("#gridWindow1").append(
									//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
									//	);
									//}
									scaleWindow(cityId,scaleTypeNum,smallTypeIdNum);
								}
							}
						});
					}
				}
			} else if(selectId == 'sumDept') {
				if(optionValue != '请选择...') {
					$.ajax({
						url: $.cxt + "/dataVisualization2/getChildren",
						type: 'POST',
						data: {orgId: optionValue},
						success: function(data) {
							var json = JSON.parse(data);
							var orgInfo = json.data;
							if(json.code == '0') {
								$("#gridWindow1").empty();
								$("#gridWindow1").append($("<option>" + '请选择...' + "</option>"));
								var html = "";
								for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
									 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+   orgInfo.gridInfo[i].gridName + "</option>"
								}
								    $("#gridWindow1").append(html);
										
								//	$("#gridWindow1").append(
								//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
								//	);
								//}
							}
							scaleWindow(optionValue, scaleTypeNum, smallTypeIdNum);
						}
					});
				} else {
					var areaId = $("#sumArea").find("option:selected").val();
					if(areaId == '请选择...') {
						areaId = $("#sumCity").find("option:selected").val();
					}
					if(areaId == '请选择...') {
						initOrgWindow1("1");
						scaleWindow('1', scaleTypeNum, smallTypeIdNum);
						return;
					} else {
						$.ajax({
							url: $.cxt + "/dataVisualization2/getChildren",
							type: 'POST',
							data: {orgId: areaId},
							success: function(data) {
								var json = JSON.parse(data);
								var orgInfo = json.data;
								if(json.code == '0') {
									$("#sumGrid").empty();
									$("#sumGrid").append($("<option>" + '请选择...' + "</option>"))
									var html = "";
									for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
										 html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+   orgInfo.gridInfo[i].gridName + "</option>"
									}
									    $("#sumGrid").append(html);
									//	$("#sumGrid").append(
									//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
									//	);
									//}
									scaleWindow(area_id, scaleTypeNum, smallTypeIdNum);
								}
							}
						});
					}
				}
			}
		});
	}
	
	var areaAndGridPage = function(orgId) {
		var appendAll = $("<div class='append-all'></div>");
		$(".append-all").remove();
		$("#mainMap").append(appendAll);
		var mapOrg = "<div class='org-map'>"
			+ "<div class='map-select'>"
			+ "<span>地市：</span>"
			+ "<select id='mapCity' class='orgMap'></select>"
			+ "</div>"
			+ "<div class='map-select'>"
			+ "<span>区县：</span>"
			+ "<select id='mapArea' class='orgMap'></select>"
		   	+ "</div>"
		   	+ "<div class='map-select'>"
		   	+ "<span>网格：</span>"
		   	+ "<select id='mapGrid' class='orgMap'></select>"
		   	+ "</div>"
		   	+"<input type='hidden' id='orgIdHidden01' />"
		   	+"<input type='hidden' id='incomeIdHidden' />"
		   	+ "</div>";
		var bigType = "<div class='kpi-checkbox' style=''>"
			+ "<div class='kpiCheckbox'>"
			+ "<input type='radio' id='chnl' checked='checked'>"
			+ "<span>渠道</span>"
			+ "</div>"
			+ "<div class='kpiCheckbox'>"
			+ "<input type='radio' id='stat'>"
			+ "<span>基站</span>"
			+ "</div>"
			+"<div>"
			+"<button class='btn btn-primary' id='exportGridTable'>导出</button>"
			+"</div>"
			+ "</div>";
		var table = "<div class='mapGrid'>"
			+ "<table id='mapTable'></table>"
			+ "<div id='grid-pager5'></div> "
			+ "</div>";
		appendAll.append(mapOrg);
		appendAll.append(bigType);
		appendAll.append(table);
		initMapOrg(mapOrgId);
		getMapChildrenOrg();
		mapRadio();
		mapTableInfo(mapOrgId);
		$("#exportGridTable").on('click',exportGridTable);
	}
	
	function mapRadio() {
		$(".kpiCheckbox input[type='radio']").unbind();
		$(".kpiCheckbox input[type='radio']").click(function() {
			var kpiId = $(this).attr('id')
			$(this).attr('checked', 'checked')
			$(".kpiCheckbox input[type='radio']").each(function(index, element) {
				var _kpiId = $(element).attr('id')
				if(_kpiId != kpiId) {
					$(element).removeAttr("checked")
				}
			});
			mapTableInfo(mapOrgId);
		});
	}
});


var bigType = function() {
	var firstKpiType = "";
	$.ajax({
		url: $.cxt + "/dataVisualization2/getBigType",
		type: 'POST',
		data: {},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				$("#bigType").empty();
				var html = "";
				for(var i = 0, n = json.data.length; i < n; i++) {
					if(i == 0) {
						firstKpiType = json.data[i].KPI_TYPE;
					}
					 html += "<option value = '"+json.data[i].KPI_TYPE+"'>"+ json.data[i].KPI_TYPE_NAME + "</option>"
				}
				    $("#bigType").append(html);
					
				//	$("#bigType").append(
				//		$("<option>" + json.data[i].KPI_TYPE_NAME + "</option>").attr('value', json.data[i].KPI_TYPE)
				//	);
				//}
				smallType(firstKpiType);
			}
		}
	});
}
var smallType = function(kpiType) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getSmallType",
		type: 'POST',
		data: {kpiType: kpiType},
		async: false,
		success: function(data) {
			var json = JSON.parse(data);
			$("#smallType").empty();
			if(json.code == '0') {
				var html = "";
				for(var i = 0, n = json.data.length; i < n; i++) {
					html += "<option value = '"+json.data[i].KPI_CODE+"'>"+ json.data[i].KPI_NAME + "</option>"
				}
				    $("#smallType").append(html);
				//	$("#smallType").append(
				//		$("<option>" + json.data[i].KPI_NAME + "</option>").attr('value', json.data[i].KPI_CODE)
				//	);
				//}
			}
		}
	});
}

var initOrg = function(orgId) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/initOrg",
		type: 'POST',
		data: {orgId: orgId},
		success: function(data) {
			var json = JSON.parse(data);
			var orgInfo = json.data;
			if(json.code == '0') {
				if(json.msg == '1') {
					$("#sumCity").empty();
					$("#sumArea").empty();
					$("#sumDept").empty();
					$("#sumGrid").empty();
					$("#sumCity").append($("<option>" + '请选择...' + "</option>"));
					$("#sumArea").append($("<option>" + '请选择...' + "</option>"));
					$("#sumDept").append($("<option>" + '请选择...' + "</option>"));
					$("#sumGrid").append($("<option>" + '请选择...' + "</option>"));
					var html = "";
					for(var i = 0, n = orgInfo.cityInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.cityInfo[i].cityId+"'>"+ orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#sumCity").append(html);
					//	$("#sumCity").append(
					//		$("<option>" + orgInfo.cityInfo[i].cityName + "</option>").attr('value', orgInfo.cityInfo[i].cityId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.areaInfo[i].areaId+"'>"+  orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#sumArea").append(html);
					//	$("#sumArea").append(
					//		$("<option>" + orgInfo.areaInfo[i].areaName + "</option>").attr('value', orgInfo.areaInfo[i].areaId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+  orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#sumDept").append(html);
					//	$("#sumDept").append(
					//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+ orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#sumGrid").append(html);
					//	$("#sumGrid").append(
					//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
					//	);
					//}
				} else if(json.msg == '2') {
					$("#sumCity").empty();
					$("#sumArea").empty();
					$("#sumDept").empty();
					$("#sumGrid").empty();
					$("#sumArea").append($("<option>" + '请选择...' + "</option>"));
					$("#sumDept").append($("<option>" + '请选择...' + "</option>"));
					$("#sumGrid").append($("<option>" + '请选择...' + "</option>"));
					var html = "";
					for(var i = 0, n = orgInfo.cityInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.cityInfo[i].cityId+"'>"+ orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#sumCity").append(html);
					//	$("#sumCity").append(
					//		$("<option>" + orgInfo.cityInfo[i].cityName + "</option>").attr('value', orgInfo.cityInfo[i].cityId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.areaInfo[i].areaId+"'>"+ orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#sumArea").append(html);
					//	$("#sumArea").append(
					//		$("<option>" + orgInfo.areaInfo[i].areaName + "</option>").attr('value', orgInfo.areaInfo[i].areaId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#sumDept").append(html);
					//	$("#sumDept").append(
					//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+ orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#sumGrid").append(html);
					//	$("#sumGrid").append(
					//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
					//	);
					//}
				} else if(json.msg == '3') {
					$("#sumCity").empty();
					$("#sumArea").empty();
					$("#sumDept").empty();
					$("#sumGrid").empty();
					$("#sumDept").append($("<option>" + '请选择...' + "</option>"));
					$("#sumGrid").append($("<option>" + '请选择...' + "</option>"));
					var html ="";
					for(var i = 0, n = orgInfo.cityInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.cityInfo[i].cityId+"'>"+ orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#sumCity").append(html);
					//	$("#sumCity").append(
					//		$("<option>" + orgInfo.cityInfo[i].cityName + "</option>").attr('value', orgInfo.cityInfo[i].cityId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.areaInfo[i].areaId+"'>"+ orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#sumArea").append(html);
					//	$("#sumArea").append(
					//		$("<option>" + orgInfo.areaInfo[i].areaName + "</option>").attr('value', orgInfo.areaInfo[i].areaId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#sumDept").append(html);
					//	$("#sumDept").append(
					//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+ orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#sumGrid").append(html);
					//	$("#sumGrid").append(
					//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
					//	);
					//}
				} else if(json.msg == '4') {
					$("#sumCity").empty();
					$("#sumArea").empty();
					$("#sumDept").empty();
					$("#sumGrid").empty();
					var html = "";
					for(var i = 0, n = orgInfo.cityInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.cityInfo[i].cityId+"'>"+ orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#sumCity").append(html);
					//	$("#sumCity").append(
					//		$("<option>" + orgInfo.cityInfo[i].cityName + "</option>").attr('value', orgInfo.cityInfo[i].cityId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
						html += "<option value = '"+ orgInfo.areaInfo[i].areaId+"'>"+ orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#sumArea").append(html);
					//	$("#sumArea").append(
					//		$("<option>" + orgInfo.areaInfo[i].areaName + "</option>").attr('value', orgInfo.areaInfo[i].areaId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
						html += "<option value = '"+ orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#sumDept").append(html);
					//	$("#sumDept").append(
					//			$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
					//	);
					//}
					var html = "";    
					for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode+"'>"+ orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#sumGrid").append(html);
					//	$("#sumGrid").append(
					//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
					//	);
					//}
				} else if(json.msg == '5') {
					$("#sumCity").empty();
					$("#sumArea").empty();
					$("#sumDept").empty();
					$("#sumGrid").empty();
					$("#sumGrid").append($("<option>"+'请选择...'+"</option>"));
					var html = ""; 
					for(var i = 0, n = orgInfo.cityInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.cityInfo[i].cityId+"'>"+ orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#sumCity").append(html);
					//	$("#sumCity").append(
					//		$("<option>" + orgInfo.cityInfo[i].cityName + "</option>").attr('value', orgInfo.cityInfo[i].cityId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.areaInfo[i].areaId+"'>"+ orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#sumArea").append(html);
					//	$("#sumArea").append(
					//		$("<option>" + orgInfo.areaInfo[i].areaName + "</option>").attr('value', orgInfo.areaInfo[i].areaId)
					//	);
					//}
					var html = "";
					for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode+"'>"+ orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#sumDept").append(html);
					//	$("#sumDept").append(
					//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
					//	);
					//}
					var html = ""; 
					for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
						html += "<option value = '"+orgInfo.girdInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#sumGrid").append(html);
					//	$("#sumGrid").append(
					//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	);
					//}
				}
			}
		}
	});
}

var childrenOrg = function() {
	$(".orgSelect").change(function() {
		var selectId = $(this).attr('id');
		var optionValue = $(this).find("option:selected").val();
		if(selectId == 'sumCity') {
			if(optionValue != '请选择...') {
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId: optionValue},
					success: function(data) {
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0') {
							$("#sumArea").empty();
							$("#sumDept").empty();
							$("#sumGrid").empty();
							$("#sumArea").append($("<option>" + '请选择...' + "</option>"));
							$("#sumDept").append($("<option>" + '请选择...' + "</option>"));
							$("#sumGrid").append($("<option>" + '请选择...' + "</option>"));
							var html = "";
							for(var i = 0, n = orgInfo.areaInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
							}
							    $("#sumArea").append(html);
							//	$("#sumArea").append(
							//		$("<option>" + orgInfo.areaInfo[i].areaName + "</option>").attr('value', orgInfo.areaInfo[i].areaId)
							//	);
							//}
							var html = "";
							for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
							}
							    $("#sumDept").append(html);
							//	$("#sumDept").append(
							//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
							//	);
							//}
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#sumGrid").append(html);
							//	$("#sumGrid").append(
							//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
							//	);
							//}
						}
					}
				});
			} else {
				initOrg("1");
			}
		} else if(selectId == 'sumArea') {
			if(optionValue != '请选择...') {
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId: optionValue},
					success: function(data) {
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0'){
							$("#sumDept").empty();
							$("#sumGrid").empty();
							$("#sumDept").append($("<option>" + '请选择...' + "</option>"));
							$("#sumGrid").append($("<option>" + '请选择...' + "</option>"));
							for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
								$("#sumDept").append(
									$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
								);
							}
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#sumGrid").append(html);
							//	$("#sumGrid").append(
							//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
							//	);
							//}
						}
					}
				});
			} else {
				var cityId = $("#sumCity").find("option:selected").val();
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId: cityId},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0') {
							$("#sumDept").empty();
							$("#sumGrid").empty();
							$("#sumDept").append($("<option>" + '请选择...' + "</option>"));
							$("#sumGrid").append($("<option>" + '请选择...' + "</option>"));
							var html = "";
							for(var i = 0, n = orgInfo.saleDeptInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
							}
							    $("#sumDept").append(html);
							//	$("#sumDept").append(
							//		$("<option>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>").attr('value', orgInfo.saleDeptInfo[i].saleDeptCode)
							//	);
							//}
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#sumGrid").append(html);
							//	$("#sumGrid").append(
							//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
							//	);
							//}
						}
					}
				})
			}
		} else if(selectId == 'sumDept') {
			if(optionValue != '请选择...') {
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId: optionValue},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0') {
							$("#sumGrid").empty();
							$("#sumGrid").append($("<option>" + '请选择...'+"</option>"));
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#sumGrid").append(html);
							//	$("#sumGrid").append(
							//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
							//	);
							//}
						}
					}
				});
			} else {
				var areaId = $("#sumArea").find("option:selected").val();
				if(areaId == '请选择...'){
					areaId = $("#sumCity").find("option:selected").val();
				}
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId : areaId},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0') {
							$("#sumGrid").empty();
							$("#sumGrid").append($("<option>" + '请选择...' + "</option>"));
							var html = "";
							for(var i = 0, n = orgInfo.gridInfo.length; i < n; i++) {
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#sumGrid").append(html);
							//	$("#sumGrid").append(
							//		$("<option>" + orgInfo.gridInfo[i].gridName + "</option>").attr('value', orgInfo.gridInfo[i].gridCode)
							//	);
							//}
						}
					}
				});
			}
		}
	});
}

// 查询网格规模
var gridScale = function(orgId) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getGridScale",
		type: 'POST',
		data: {orgId: orgId},
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				// 一类网格
				$("#firstTypeGrid").empty();
				$("#firstTypeGrid").text(json.data.TYPE1);
				// 二类微网格
				$("#secondTypeGrid").empty();
				$("#secondTypeGrid").text(json.data.TYPE2);
				// 三类网格
				$("#thirdTypeGrid").empty();
				$("#thirdTypeGrid").text(json.data.TYPE3);
			}
		}
	});
}

// 查询渠道规模
var chnlScale = function(orgId) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getChnlScale",
		type: 'POST',
		data: {orgId: orgId},
		success: function(data){
			var json = JSON.parse(data);
			if(json.code == '0') {
				// 实体渠道
				$("#stqd").empty();
				$("#stqd").text(json.data.SDATA);
				// 直销渠道
				$("#zxqd").empty();
				$("#zxqd").text(json.data.ZDATA);
				// 分销渠道
				$("#fxqd").empty();
				$("#fxqd").text(json.data.QDATA);
			}
		}
	});
}

// 查询基站规模
var stationScale = function(orgId) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getStationScale",
		type: 'POST',
		data: {orgId: orgId},
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				for(var i = 0, n = json.data.length; i < n; i++) {
					// 2G基站
					if(json.data[i].STATION_TYPE == '2G') {
						$("#statG2").empty();
						$("#statG2").text(json.data[i].STAT_SCALE);
					} 
					// 3G基站
					else if(json.data[i].STATION_TYPE == '3G') {
						$("#statG3").empty();
						$("#statG3").text(json.data[i].STAT_SCALE);
					} 
					// 4G基站
					else if(json.data[i].STATION_TYPE == '4G') {
						$("#statG4").empty();
						$("#statG4").text(json.data[i].STAT_SCALE);
					}
				}
			}
		}
	});
}

// 查询语音用户规模
var voiceScale = function(orgId) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getVoiceScale",
		type: 'POST',
		data: {orgId : orgId},
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				// 期末通话客户数
				$("#voice23").empty();
				$("#voice23").text(json.data.VOICE23);
				// 新增通话客户数
				$("#voiceNa").empty();
				$("#voiceNa").text(json.data.VOICENA);
				// 净增通话客户数
				$("#voiceNg").empty();
				$("#voiceNg").text(json.data.VOICENG);
			}
		}
	});
}

// 流量用户规模
var flowScale = function(orgId) {
	$.ajax({
		url: $.cxt + "/dataVisualization2/getFlowScale",
		type: 'POST',
		data: {orgId : orgId},
		success: function(data) {
			var json = JSON.parse(data);
			if(json.code == '0') {
				// 2/3G流量用户数
				$("#flow1").empty();
				$("#flow1").text((json.data.FLOW2/10000).toFixed(2) + '万');
				// 4G流量用户数
				$("#flow2").empty();
				$("#flow2").text((json.data.FLOW3/10000).toFixed(2) + '万');
				// 和掌柜数
				$("#flow3").empty();
				$("#flow3").text((json.data.FLOW4/10000).toFixed(2) + '万');
				// 魔百和用户数
				$("#flow4").empty();
				$("#flow4").text((json.data.FLOWW/10000).toFixed(2) + '万');
				// 家庭宽带用户数
				$("#flow5").empty();
				$("#flow5").text((json.data.FLOWB/10000).toFixed(2) + '万');
				// 集客专线用户数
				$("#flow6").empty();
				$("#flow6").text((json.data.FLOWC/10000).toFixed(2) + '万');
			}
		}
	});
}

var kpiRadio = function(_orgId){
	var kpiCode = $("#smallType").find("option:selected").val();
	var statisDate = $("#dv_date").val();
	var rangeId = "";
	var orgId = $("#hiddenOrgId").val();
	$(".rateRadio input[type='radio']").each(function(){
		var checked = $(this).attr('checked');
		if(checked == 'checked'){
			rangeId = $(this).attr("rangeId");
		}
	})
	if(rangeId == ""){
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
			statisDate:statisDate
        },
		height: ($(".twotype-grid").height() - 50),
		width: $(".twotype-grid").width(),
		autowidth: true,
		colNames: [ '组织机构','指标量', '环比','同比'],
		colModel: [ 
		      {name : 'PARENT_NAME',align : 'center'}, 
		      {name : 'KPI_VALUE',align : 'center'},
		      {name : 'KPI_VALUE_HB',align : 'center'},
		      {name : 'KPI_VALUE_TB',align : 'center'}
		],
		autoScroll: true,
		viewrecords: false,
		rownumbers: false,
		rowNum: 10,
		rowList: [ 10,20, 30 ],
		pager : '#grid-pager1',
		loadComplete: function() {
			topjqGridLoadComplete()
		}
	});
}

var initOrgWindow1 = function(orgId){
	$.ajax({
		url: $.cxt + "/dataVisualization2/initOrg",
		type: 'POST',
		data: {orgId : orgId},
		success: function(data){
			var json = JSON.parse(data);
			var orgInfo = json.data;
			if(json.code == '0'){
				if(json.msg == '1'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#cityWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#areaWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#deptWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#cityWindow1").append(html);
					//	$("#cityWindow1").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#areaWindow1").append(html);
					//	$("#areaWindow1").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#deptWindow1").append(html);
					//	$("#deptWindow1").append(
					//			$("<option>"+orgInfo.saleDeptInfo[i].saleDeptName+"</option>").attr('value',orgInfo.saleDeptInfo[i].saleDeptCode)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#gridWindow1").append(html);
					//	$("#gridWindow1").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '2'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#areaWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#deptWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#cityWindow1").append(html);
					//	$("#cityWindow1").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#areaWindow1").append(html);
					//	$("#areaWindow1").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#deptWindow1").append(html);
					//	$("#deptWindow1").append(
					//			$("<option>"+orgInfo.saleDeptInfo[i].saleDeptName+"</option>").attr('value',orgInfo.saleDeptInfo[i].saleDeptCode)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#gridWindow1").append(html);
					//	$("#gridWindow1").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '3'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#deptWindow1").append($("<option>"+'请选择...'+"</option>"))
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#cityWindow1").append(html);
					//	$("#cityWindow1").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#areaWindow1").append(html);
					//	$("#areaWindow1").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#deptWindow1").append(html);
					//	$("#deptWindow1").append(
					//			$("<option>"+orgInfo.saleDeptInfo[i].saleDeptName+"</option>").attr('value',orgInfo.saleDeptInfo[i].saleDeptCode)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#gridWindow1").append(html);
					//	$("#gridWindow1").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '4'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#cityWindow1").append(html);
					//	$("#cityWindow1").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#areaWindow1").append(html);
					//	$("#areaWindow1").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#deptWindow1").append(html);
					//	$("#deptWindow1").append(
					//			$("<option>"+orgInfo.saleDeptInfo[i].saleDeptName+"</option>").attr('value',orgInfo.saleDeptInfo[i].saleDeptCode)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#gridWindow1").append(html);
					//	$("#gridWindow1").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '5'){
					$("#cityWindow1").empty();
					$("#areaWindow1").empty();
					$("#deptWindow1").empty();
					$("#gridWindow1").empty();
					$("#gridWindow1").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#cityWindow1").append(html);
					//	$("#cityWindow1").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#areaWindow1").append(html);
					//	$("#areaWindow1").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.saleDeptInfo.length;i++){
						html += "<option value = '"+orgInfo.saleDeptInfo[i].saleDeptCode + "'>" + orgInfo.saleDeptInfo[i].saleDeptName + "</option>"
					}
					    $("#deptWindow1").append(html);
					//	$("#deptWindow1").append(
					//			$("<option>"+orgInfo.saleDeptInfo[i].saleDeptName+"</option>").attr('value',orgInfo.saleDeptInfo[i].saleDeptCode)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#gridWindow1").append(html);
					//	$("#gridWindow1").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}
			}
		}
	})
}

var getGridInfoByType = function(orgId,gridTypeId){
	$.ajax({
		url: $.cxt + "/dataVisualization2/getGridInfoByType",
		type: 'POST',
		data: {
			orgId : orgId,
			gridTypeId : gridTypeId
		},
		success: function(data){
			var json = JSON.parse(data);
			if(json.code == '0'){
				$("#gridInfo").empty()
				var html = "";
				for(var i=0;i<json.data.length;i++){
					html += $("<div><div>").addClass("gridName").attr("gridCode",json.data[i].ORG_ID)
					.append(json.data[i].NAME);
				}
				$("#gridInfo").append(html);
			}
		}
	})
}

var scaleWindow = function(orgId,scaleType,smallScaleId){
	$("#orgIdHidden").val(orgId);
	var colNames = []
	var colModel = []
	if(scaleType == "grid"){
		colNames = [
		            	'网格名称','移动渠道数','联通渠道数','电信渠道数','基站数','乡镇数','行政村数','渠道常客数',
		            	'基站23G客户数','基站4G客户数','集团客户数','家宽客户数','网格常驻人口','收入','同比','环比',
		            	'客户份额','渠道份额','4G普及率','宽带资源利用率','通话客户数','不限量套餐渗透率'
		           ]
		colModel = [
		            	{name : 'GRID_NAME',align : 'center'}, 
		            	{name : 'MOBILE_CHNL_NUM',align : 'center'}, 
		            	{name : 'UNICOM_CHNL_NUM',align : 'center'}, 
		            	{name : 'TELECOM_CHNL_NUM',align : 'center'}, 
		            	{name : 'STATION_NUM',align : 'center'}, 
		            	{name : 'TOWN_NUM',align : 'center'}, 
		            	{name : 'VILLAGE_NUM',align : 'center'}, 
		            	{name : 'CHNL_USER_NUM',align : 'center'}, 
		            	{name : 'STATION_23G_USER',align : 'center'}, 
		            	{name : 'STATION_4G_USER',align : 'center'}, 
		            	{name : 'GROUP_NUM',align : 'center'},
		            	{name : 'KD_USER_NUM',align : 'center'}, 
		            	{name : 'GRID_RESIDENT_USER',align : 'center'}, 
		            	{name : 'FEE',align : 'center'},
		            	{name : 'COMPARE_LAST_MONTH',align : 'center'}, 
		            	{name : 'COMPARE__YSE',align : 'center'}, 
		            	{name : 'USER_PER',align : 'center'},
		            	{name : 'CHNL_SHAPE',align : 'center'}, 
		            	{name : '4G_PER',align : 'center'}, 
		            	{name : 'KD_PORT_USED_PER',align : 'center'},
		            	{name : 'VOICE_USER_NUM',align : 'center'}, 
		            	{name : 'BXL_BRAND_PER',align : 'center'}
		           ]
		
	}else if(scaleType == "chnl"){
		colNames = [
	            	'渠道编码','渠道名称','一级类型','二级类型','渠道星级','渠道地址','渠道经理姓名','渠道经理电话',
	            	'终端销量','新增家庭网','新增入网即不限量客户数','新增入网即4G客户数','新和家庭新增量'
	           ]
		colModel = [
	            	{name : 'CHNL_CODE',align : 'center'}, 
	            	{name : 'CHNL_NAME',align : 'center'}, 
	            	{name : 'CHNL_TYPE_LEVEL1',align : 'center'}, 
	            	{name : 'CHNL_TYPE_LEVEL2',align : 'center'}, 
	            	{name : 'CHNL_STAR',align : 'center'}, 
	            	{name : 'CHNL_ADDR',align : 'center'}, 
	            	{name : 'CHNL_MNGR_NAME',align : 'center'}, 
	            	{name : 'CHNL_MNGR_NUMBER',align : 'center'}, 
	            	{name : 'INDEX_01',align : 'center'}, 
	            	{name : 'INDEX_02',align : 'center'}, 
	            	{name : 'INDEX_03',align : 'center'},
	            	{name : 'INDEX_04',align : 'center'}, 
	            	{name : 'INDEX_05',align : 'center'}
	            ]
		
	}else if(scaleType == "stat"){
		colNames = [
	            	'基站编码','基站名称','归属网格','通话客户数','人均流量DOU','新增通话客户数','人均MOU','同比',
	            	'环比','总收入','基站常驻居住地用户数','基站常驻工作地用户数'
	           ]
		colModel = [
	            	{name : 'STATION_CODE',align : 'center'}, 
	            	{name : 'STATION_NAME',align : 'center'}, 
	            	{name : 'GRID_CODE',align : 'center'}, 
	            	{name : 'VOICE_USER_NUM',align : 'center'}, 
	            	{name : 'AVG_DOU',align : 'center'}, 
	            	{name : 'NEW_VOICE_USER',align : 'center'}, 
	            	{name : 'AVG_MOU',align : 'center'}, 
	            	{name : 'COMPARE_LAST',align : 'center'}, 
	            	{name : 'COMPARE_YES',align : 'center'}, 
	            	{name : 'TOTAL_FEE',align : 'center'}, 
	            	{name : 'HOME_NUM',align : 'center'},
	            	{name : 'WORK_NUM',align : 'center'}
	            ]
	}
	$('#scaleTable').GridUnload();
	$('#scaleTable').jqGrid({
		url: $.cxt + "/dataVisualization2/getTableDataByScaleType",
		datatype: "json",
		mtype: "POST",
		postData: {
			orgId: orgId,
			scaleType: scaleType,
			smallScaleType: smallScaleId
        },
		height:270,
		autowidth: false,
		width: 670,
		colNames: colNames,
		colModel: colModel,
		shrinkToFit:false,
		autoScroll: true,
		viewrecords: true,
		rownumbers: true,
		rowNum: 10,
		rowList: [ 10,20, 30 ],
		pager : '#grid-pager4',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
	});
}

//网格规模导出模板
$("#exportTable").on('click', exportTable);
function exportTable(){
	//拼接到text标签中
	var html="<input type='text' value='"+ $("#orgIdHidden").val()+"' name= 'orgId' />" ;
	html+= "<input type='text' value='"+$("#scaleTypeHidden").val()+"' name= 'scaleType' />" ;
	html+= "<input type='text' value='"+$("#smallScaleIdHidden").val()+"' name= 'smallScaleType' />" ;
/*		html+= "<input type='text' value='"+$("#cityWindows1").val()+"' name= 'cityInfo' />" ;
	html+= "<input type='text' value='"+$("#areaWindows1").val()+"' name ='areaInfo' />";
	html+= "<input type='text' value='"+$("#deptWindows1").val()+"' name='deptInfo' />"; 
	html+= "<input type='text' value='"+$("#gridWindows1").val()+"' name='gridInfo' />";*/
	//封装一个form表单，，将上面text便签放进去，通过POST方式提交，无论多长多可以提交，不会报request提交的字符串太长，最后用remove()移除这个表单
	$("<form method='POST' action='"+$.cxt+"/dataVisualization2/addGridScale'>"+html+ "< /form>").appendTo("body").submit().remove();
}

var initMapOrg = function(orgId){
	$.ajax({
		url: $.cxt + "/dataVisualization2/initOrg",
		type: 'POST',
		data: {orgId : orgId},
		success: function(data){
			var json = JSON.parse(data);
			var orgInfo = json.data;
			if(json.code == '0'){
				if(json.msg == '1'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					$("#mapCity").append($("<option>"+'请选择...'+"</option>"))
					$("#mapArea").append($("<option>"+'请选择...'+"</option>"))
					$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '2'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					$("#mapArea").append($("<option>"+'请选择...'+"</option>"))
					$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '3'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '4'){
					$("#mapCity").empty();
					$("#mapArea").empty();
					$("#mapGrid").empty();
					var html = "";
					for(var i=0;i<orgInfo.cityInfo.length;i++){
						html += "<option value = '"+orgInfo.cityInfo[i].cityId + "'>" + orgInfo.cityInfo[i].cityName + "</option>"
					}
					    $("#mapCity").append(html);
					//	$("#mapCity").append(
					//			$("<option>"+orgInfo.cityInfo[i].cityName+"</option>").attr('value',orgInfo.cityInfo[i].cityId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.areaInfo.length;i++){
						html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
					}
					    $("#mapArea").append(html);
					//	$("#mapArea").append(
					//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
					//	)
					//}
					var html = "";
					for(var i=0;i<orgInfo.gridInfo.length;i++){
						html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
					}
					    $("#mapGrid").append(html);
					//	$("#mapGrid").append(
					//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
					//	)
					//}
				}else if(json.msg == '5'){}
			}
		}
	})
}
var getMapChildrenOrg = function(){
	$(".orgMap").change(function(){
		var selectId = $(this).attr('id');
		var optionValue = $(this).find("option:selected").val();
		if(selectId == 'mapCity'){
			if(optionValue != '请选择...'){
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId : optionValue},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0'){
							$("#mapArea").empty();
							$("#mapGrid").empty();
							$("#mapArea").append($("<option>"+'请选择...'+"</option>"))
							$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
							var html = "";
							for(var i=0;i<orgInfo.areaInfo.length;i++){
								html += "<option value = '"+orgInfo.areaInfo[i].areaId + "'>" + orgInfo.areaInfo[i].areaName + "</option>"
							}
							    $("#mapArea").append(html);
							//	$("#mapArea").append(
							//			$("<option>"+orgInfo.areaInfo[i].areaName+"</option>").attr('value',orgInfo.areaInfo[i].areaId)
							//	)
							//}
							var html = "";
							for(var i=0;i<orgInfo.gridInfo.length;i++){
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#mapGrid").append(html);
							//	$("#mapGrid").append(
							//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
							//	)
							//}
						}
					}
				})
			}else{
				initOrg("1")
			}
		}else if(selectId == 'mapArea'){
			if(optionValue != '请选择...'){
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId : optionValue},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0'){
							$("#mapGrid").empty();
							$("#mapGrid").append($("<option>"+'请选择...'+"</option>"))
							var html = "";
							for(var i=0;i<orgInfo.gridInfo.length;i++){
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#sumGrid").append(html);
							//	$("#sumGrid").append(
							//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
							//	)
							//}
						}
					}
				})
			}else{
				var cityId = $("#mapCity").find("option:selected").val()
				$.ajax({
					url: $.cxt + "/dataVisualization2/getChildren",
					type: 'POST',
					data: {orgId : cityId},
					success: function(data){
						var json = JSON.parse(data);
						var orgInfo = json.data;
						if(json.code == '0'){
							$("#mapGrid").empty();
							$("#sumGrid").append($("<option>"+'请选择...'+"</option>"))
							var html = "";
							for(var i=0;i<orgInfo.gridInfo.length;i++){
								html += "<option value = '"+orgInfo.gridInfo[i].gridCode + "'>" + orgInfo.gridInfo[i].gridName + "</option>"
							}
							    $("#mapGrid").append(html);
							//	$("#mapGrid").append(
							//			$("<option>"+orgInfo.gridInfo[i].gridName+"</option>").attr('value',orgInfo.gridInfo[i].gridCode)
							//	)
							//}
						}
					}
				})
			}
		}else if(selectId == 'mapGrid'){
			if(optionValue != '请选择...'){
				mapTableInfo(optionValue);
			}else{
				var areaId = $("#areaCity").find("option:selected").val();
				mapTableInfo(areaId);
			}
		}
		
	})
}

var mapTableInfo = function(orgId){
	var colNames = [];
	var colModel = [];
	var incomeId = "";
	$(".kpiCheckbox input[type='radio']").each(function(){
		if($(this).attr("checked") == 'checked'){
			incomeId = $(this).attr("id");
		}
	})
	$("#orgIdHidden01").val(orgId);
	$("#incomeIdHidden").val(incomeId);
	
	if(incomeId == "chnl"){
		colNames = ["区县编码","区县名称","网格编码","网格名称","渠道编码","渠道名称","收入","业务量"]
	}else{
		colNames = ["区县编码","区县名称","网格编码","网格名称","基站编码","基站名称","收入","业务量"]
	}
	$('#mapTable').GridUnload();
	$('#mapTable').jqGrid({
		url: $.cxt + "/dataVisualization2/getMapTableInfo",
		datatype: "json",
		mtype: "POST",
		postData: {
			orgId: orgId,
			incomeId: incomeId
        },
		height:($(".mapGrid").height() - 60),
		autowidth: false,
		width: $(".mapGrid").width(),
		colNames: colNames,
		colModel: [
					{name : 'AREA_ID',align : 'center',hidden:true,sortable: false}, 
					{name : 'AREA_NAME',align : 'center',sortable: false}, 
					{name : 'GRID_CODE',align : 'center',hidden:true,sortable: false}, 
					{name : 'GRID_NAME',align : 'center',sortable: false}, 
					{name : 'PHYSICAL_ID',align : 'center',hidden:true,sortable: false}, 
					{name : 'PHYSICAL_NAME',align : 'center',sortable: false}, 
					{name : 'INCOME',align : 'center'}, 
					{name : 'CUSTOMER',align : 'center'}, 
		           ],
		shrinkToFit:true,
		autoScroll: true,
		viewrecords: true,
		sortable: true,
		sortorder: "desc",
		rownumbers: true,
		rowNum: 10,
		rowList: [ 10,20, 30 ],
		pager : '#grid-pager5',
		loadComplete: topjqGridLoadComplete,
		gridComplete : setNiceScroll
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

function exportGridTable(){
	var html = "<input type='text' value='"+$("#orgIdHidden01").val()+"' name='orgId' />";
	html+= "<input type='text' value='"+$("#incomeIdHidden").val()+"' name='incomeId' />";
	//封装到表单
	$("<form method='POST' action='"+$.cxt+"/dataVisualization2/exportGridTable'>"+html+"</form>").appendTo("body").submit().remove();
}
