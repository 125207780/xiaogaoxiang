$( function() {
	initLoading()
	initParam();
	// initForm();
	// 初始化网格划分添加装维人员信息
	initButton();
	// 初始化基站添加装维人员信息
	initStationButton();
	// 初始化网格划分添加销售经理信息
	initButtonMarket();
	// 初始化基站添加销售经理信息
	initButtonMarketStation();
	initCountryMapGrid();
	// initContextMenu();
	initAddCountryGrid();
	// 初始化基站信息
	initStationMapGrid();
	// 初始化根据登录人orgId查询网格信息
	initGridMapGrid();
});

var cunZhenPolygonLengthOne = new Array();
var addCountryNum = 0 ;
var m = 0;
var Arr = new Array();
var creatArr = new Array();
var MarketArr = new Array();
var num = 0 ;	
var othernum = 0 ;	
var name = "";
var phone = "";
var poiList = "";
var channelList ="";
var stationList = "";
var dayCost = "";	
var villageCost = "";	
var customCost = "";	
var groupCost = "";	
var channelCost = "";	
var stationCost = "";	
var editnum = true;
	
// 全局的泡	
var marker;
var countryArr = new Array();
var countryArrMarker = new Array();

$("#SearchId").on("click",SearchFunction);
function SearchFunction() {
	$("#countryMapTable").jqGrid("clearGridData");
	var countTryName = $("#countryInputId").val();
	$.ajax({
		url: $.cxt + "/map/initCountryGrid",
		data: {orgid:nowOrgId,countTryName:countTryName},
		type: "POST",
		success: function(data) {
			$("#countryMapTable").jqGrid('setGridParam', {
				datatype: 'local',
				data: data,
			}).trigger("reloadGrid");
		}
	});
	$(".ui-jqgrid-bdiv").removeAttr("id");
	$(".ui-jqgrid-bdiv").attr("id", "ui-jqgrid-bdiv-infos");
	$("#ui-jqgrid-bdiv-infos").css('height', '81%');
	$("#countryMapTable").parent().parent().css("height", "81%");
}

// 初始化查询基站信息，查询当前登陆人组织id下的所有基站信息
$("#searchStationId").on("click", searchStationFunction);
function searchStationFunction() {
	$("#stationMapTable").jqGrid("clearGridData");
	var stationName = $("#stationInputId").val();
	$.ajax({
		url: $.cxt + "/map/initStationGrid",
		data: {orgid: nowOrgId, stationName: stationName},
		type: "POST",
		success: function (data) {
			$("#stationMapTable").jqGrid('setGridParam', {
				datatype: 'local',
				data: data,	
			}).trigger("reloadGrid");
		}
	});
}

function BuildObject(marker, lng, lat, centerPoint) {
	var object = new Object();
	object.marker = marker;
	object.lng = lng;
	object.lat = lat;
	object.centerPoint = centerPoint;
	return object;
}

function BuildPology() {
	return pology;
}

function buildCircle(centerPoint, r) {
	var pology = new BMap.Circle(centerPoint,r);
	pology.mapState = "new";
	pology.addEventListener('click', editPolygon);
	pology.setFillColor("#995cb0");
	return pology;
}

function buildPology(pointlist) {
	var pology = new BMap.Polygon(pointlist);
	pology.mapState = "new";
	pology.addEventListener('click', editPolygon);
	pology.setFillColor("#995cb0");
	return pology;
}

// 初始化已选择村镇信息
function initAddCountryGrid () {
	$("#AddcountryMapTable").jqGrid({
		data: [],
		datatype: 'local',
		width: $(".menuArea").width() - 20,
		colNames: [ '村镇名称', '经度','纬度','操作'],
		colModel: [
	    	{name: 'NAME', align: 'center'},
	    	{name: 'LNG', align: 'center', hidden: true},
	    	{name: 'LAT', align: 'center', hidden: true},
	    	{name: 'A', align: 'center', width: 30, formatter: addButton},
		],
		viewrecords: true,
		rownumbers: true,
		caption: "已选择的村镇",
	});
	$('#AddcountryMapTable').jqGrid('setLabel','rn', '序号', {
		'text-align': 'cenger',
		'vertical-align': 'middle',
		"width": "30"
	});
	// jqgrid 创建的表格都有role属性为grid
	$("table[role='grid']").each(function () {
		// 使表头的序号列宽度为40
		$('.' + $(this).attr("class") + ' tr:first th:first').css("width", "30");
		// 使表体的序号列宽度为40
		$('.' + $(this).attr("class") + ' tr:first td:first').css("width", "30");
	});
}

// 给已选择村镇的列增加删除按钮
function addButton(cellvalue, options, rowdata) {
	var html = "";
	html += "<a style='color:#FFFFFF' onclick=\"Assigned('" + options.rowId + "')\" href=\"#\">删除";
	return html;	
}

/*
 * 点击 - 首先 数据 消失 回到  上面的 表格中第一个
 * 正在画的overlays[0] 去除   以及之前勾选村镇的五角星 
 * countryArr[obj.name]; 删除 
 * 判断当前countryArr 的个数 
 */
function Assigned(id) {

	// 获取当前已选择城镇的id
	var obj = $("#AddcountryMapTable").jqGrid('getRowData', id);
	var numstat = 0;
	map.removeOverlay(countryArrMarker[obj.NAME]);
	delete countryArrMarker[obj.NAME];
	// 删除原来的图形
	map.removeOverlay(overlays[0]);
	delete overlays[0];
	map.removeOverlay(marker);
	delete countryArr[obj.NAME]; 
	var nowPoint = new Array();
	for(var name in countryArr) {	
		nowPoint[numstat] = countryArr[name];
		numstat++;
	}
	if(numstat == 0) {
		
	}else if(numstat == 1) {
		overlays[0] = buildCircle(nowPoint[0].centerPoint, 100) 
    	map.addOverlay(overlays[0]);
	}else if(numstat == 2) {
		var diameter = BMapLib.GeoUtils.getDistance(nowPoint[0].centerPoint, nowPoint[1].centerPoint);
	    var lng = (Number(nowPoint[0].lng) + Number(nowPoint[1].lng)) / 2;
	    var lat = (Number(nowPoint[0].lat) + Number(nowPoint[1].lat)) / 2;
		var point = new BMap.Point(lng,lat);
    	diameter = (Number(diameter) + 200) / 2;
    	overlays[0] = buildCircle(point, diameter);
	    map.addOverlay(overlays[0]);
	}else {
		var ActionPointArrJson = new Array();
		var pointnum = 0;
		var pointArr = new Array ;
		for(var name in countryArr) {	
			pointArr[pointnum] = countryArr[name];
			pointnum++;
		}
		for(var i = 0; i < pointnum; i++) {
			var pointObject = new Object();
			pointObject.lng = pointArr[i].lng;
			pointObject.lat = pointArr[i].lat;
			ActionPointArrJson.push(pointObject);
		}
		
		var ActionPointArrJsonStr = JSON.stringify(ActionPointArrJson);
		$.ajax({
			 url: $.cxt+"/gridCommon/convexHull",
			 data: {pointsStr: ActionPointArrJsonStr},
			 type: "POST",
			 success: function(data) {
				 var pointlist = [];
				 for(var i = 0; i < data.length; i++) {
					 pointlist.push(new BMap.Point(data[i].lng, data[i].lat))
				 }
				 overlays[0] = buildPology(pointlist);
				 map.addOverlay(overlays[0]);
			 }	 
		});	
	}
	$("#AddcountryMapTable").delRowData(id);
	var ids = $("#countryMapTable").jqGrid('getDataIDs');  
	var rowid = (ids.length == 0 ? 1 : Math.max.apply(Math, ids) + 1);  
	var newrowid = (0 - rowid); 
	$("#countryMapTable").jqGrid('addRowData', newrowid, obj, "first");
	addCountryNum--;
}

// 初始化网格信息
function initGridMapGrid() {
	$.ajax({
		url: $.cxt + "/gridCommon/initGridInfo",
		data: {orgId: nowOrgId},
		type: "POST",
		success: function(data) {
			var htmltv = "<option value=''>全部</option>";
			for(var i = 0, n = data.length; i < n; i++) {
				htmltv += "<option value='" + data[i].orgId + "'>" + data[i].name + "</option>";
			}
			$("#gridInfos").html(htmltv);
		}
	});
}

// 初始化基站网格信息
function initStationMapGrid() {
	var stationName = $("#stationInputId").val();
	$.ajax({
		url: $.cxt + "/map/initStationGrid",
		data: {orgid: nowOrgId, stationName: stationName},
		type: "POST",
		success: function(data) {
			$("#stationMapTable").jqGrid({
				data: data,
				datatype: "local",
				height: ($("#gridContainers").height() - 120),
				autowidth: true,
				colNames: ['基站名称', '基站编码', '经度', '纬度', '归属网格编码'],
				colModel: [
					{name: 'STATION_NAME', align: 'center'},
				  	{name: 'STATION_CODE', align: 'center', hidden: true},
				  	{name: 'STATION_LON', align: 'center', hidden: true}, 
				  	{name: 'STATION_LAT', align: 'center', hidden: true},
				  	{name: 'GRID_CODE', align: 'center', hidden: true}
				],
				rowNum: 1000,
				viewrecords: false,
				multiselect: false,
				loadComplete: function (xhr) {
					var ids = $("#stationMapTable").jqGrid('getDataIDs');
					for(var id in ids ) {
						var obj = $(this).jqGrid('getRowData',id);
						if(countryArr.hasOwnProperty(obj.NAME)) {	
							$("#stationMapTable").delRowData(id);
						}else{
						}
					}
					// 设置grid样式
					$(".ui-jqgrid-bdiv").css('overflow', 'auto');
					$(".ui-jqgrid-bdiv").css('height', '90.2%');
					$(".ui-jqgrid-bdiv").css('width', '100%');
					$(".ui-jqgrid-bdiv").attr("id", "ui-jqgrid-bdiv-infos");
					$("#gview_stationMapTable").css("width", "267px");
					$("#gview_stationMapTable").css("margin-left", "-60px");
					$("#gview_stationMapTable").css("height", "373px");
					$("#ui-jqgrid-htable").css("width", "100%");
					$("#ui-jqgrid-bdiv-infos").css('height', '90.2%');
					$("#ui-jqgrid-bdiv-infos").css('width', '100%');
					$("#stationMapTable").css("width", "100%");
				},
				// onCellSelect此事件在点击表格特定单元格时发生.rowid为行ID；iCol为列索引； cellcontent为单元格中内容； e点击事件对象。
				onCellSelect:function(rowid, iCol, cellcontent, e) {
					// 选择了某个基站之后，将基站的信息展示到地图上，并且能够点击基站坐标图标展示基站信息
			    	var obj = $(this).jqGrid('getRowData', rowid);
			    	// 先删除泡
			    	map.removeOverlay(marker);
			    	// 中心点
			    	var centerPoint = new BMap.Point(obj.STATION_LON, obj.STATION_LAT);
			    	// 地图中心点
			    	map.centerAndZoom(centerPoint, 11);
			    	// 新的泡
			    	marker = new BMap.Marker(centerPoint);
			    	// 添加新的泡
			    	map.addOverlay(marker);
					// 删除原来的图形
					map.removeOverlay(overlays[0]);
			    	delete overlays[0];
			    	
			    	// 设置坐标点信息
			    	var object = BuildObject(marker, obj.STATION_LON, obj.STATION_LAT, centerPoint);
			    	countryArr[obj.STATION_NAME] = object;
			    	
			    	// 画图
			    	overlays[0] = buildCircle(countryArr[obj.STATION_NAME].centerPoint, 100) 
			    	var pt = countryArr[obj.STATION_NAME].centerPoint;
			    	var myIcon = new BMap.Icon($.cxt + "/pages/gis/indexPage/wujiaoxing.png", new BMap.Size(20, 50));
			    	var markerOther = new BMap.Marker(pt, {icon: myIcon});
			    	countryArrMarker[obj.STATION_NAME] = markerOther;
			    	map.addOverlay(markerOther);
			    	map.addOverlay(overlays[0]);
				}
			});
		}
	});
}

// 初始化村镇网格信息
function initCountryMapGrid() {
	var countTryName=$("#countryInputId").val();
	$.ajax({
		url: $.cxt + "/map/initCountryGrid",
		data: {orgid: nowOrgId, countTryName: countTryName},
		type: "POST",
		success: function(data) {
			$('#countryMapTable').jqGrid({
				data: data,
				datatype: "local",
				// mtype: "POST",
				height: ($("#gridContainer").height() - 120),
				autowidth: true,
				colNames: ['村镇名称', '经度','纬度'],
				colModel: [ 
					{name: 'NAME', align: 'center'}, 
					{name: 'LNG', align: 'center', hidden: true}, 
					{name: 'LAT', align: 'center', hidden: true}, 
				],
				rowNum: 1000,
				viewrecords: true,
				// multiboxonly:true, 
				rownumbers: true,
				multiselect: false,
				// caption : "村镇网格划分",
				loadComplete: function (xhr) {
					var ids = $("#countryMapTable").jqGrid('getDataIDs');
					for(var id in ids) {
						var obj = $(this).jqGrid('getRowData',id);
						if(countryArr .hasOwnProperty(obj.NAME)) {
							$("#countryMapTable").delRowData(id);
						} else {
						}
					}
					// $("#countryMapTable").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });     
					$(".ui-jqgrid-bdiv").css('overflow', 'auto');
					// $(".ui-jqgrid-bdiv").css('height', '112px');
					$("#gview_countryMapTable").css('height', '190px');
					$("#gview_countryMapTable").css("width", "270px");
					$("#gview_countryMapTable").css("margin-left", "-48px");
					$("#ui-jqgrid-bdiv-info").css("width", "100%");
					$("#countryMapTable").css("width", "100%");
					$(".ui-jqgrid-htable").css("width", "100%");
				},
				onSelectRow:function(rowid, state, e) {
					var obj = $(this).jqGrid('getRowData', rowid);
					var numstat = 0;
					// 先删除泡
			    	map.removeOverlay(marker);
			    	// 中心点
			    	var centerPoint = new BMap.Point(obj.LNG, obj.LAT); 
			    	// 地图中心点
			    	map.centerAndZoom(centerPoint, 11);
			    	// 新的泡
			    	marker = new BMap.Marker(centerPoint);
			    	// 添加新的泡
			    	map.addOverlay(marker);
			    	// 删除原来的图形
			    	map.removeOverlay(overlays[0]);
			    	delete overlays[0];
			    	var object = BuildObject(marker, obj.LNG, obj.LAT, centerPoint);
			    	countryArr[obj.NAME] = object;
			    	for(var name in countryArr) {	
			    		numstat++;
					}
			    	if(numstat == 1) {
			    		overlays[0] = buildCircle(countryArr[obj.NAME].centerPoint, 100) 
				    	var pt = countryArr[obj.NAME].centerPoint;
				    	var myIcon = new BMap.Icon($.cxt+"/pages/gis/indexPage/wujiaoxing.png", new BMap.Size(20, 50));
				    	var markerOther = new BMap.Marker(pt, {icon: myIcon});
				    	countryArrMarker[obj.NAME]=markerOther;
				    	map.addOverlay(markerOther);
				    	map.addOverlay(overlays[0]);	
			    	} else if (numstat == 2) {
			    		var pt = countryArr[obj.NAME].centerPoint;
				    	var myIcon = new BMap.Icon($.cxt + "/pages/gis/indexPage/wujiaoxing.png", new BMap.Size(20, 50));
				    	var markerOther = new BMap.Marker(pt, {icon: myIcon});
			    		countryArrMarker[obj.NAME] = markerOther;
			    		var pointnum = 0;
			    		var pointArr = new Array ;
			    		for(var name in countryArr) {	
			    			pointArr[pointnum] = countryArr[name];
			    			pointnum++;
						}
			    		// 直径
			    		var diameter = BMapLib.GeoUtils.getDistance(pointArr[0].centerPoint, pointArr[1].centerPoint);
					    var lng = (Number(pointArr[0].lng) + Number(pointArr[1].lng)) / 2;
					    var lat = (Number(pointArr[0].lat) + Number(pointArr[1].lat)) / 2;
			    		var point = new BMap.Point(lng, lat);
				    	diameter = (Number(diameter) + 200) / 2;
					    overlays[0] = buildCircle(point, diameter);
					    map.addOverlay(markerOther);
					    map.addOverlay(overlays[0]);
			    	} else {
			    		var ActionPointArrJson = new Array();
			    		var pt = countryArr[obj.NAME].centerPoint;
				    	var myIcon = new BMap.Icon($.cxt + "/pages/gis/indexPage/wujiaoxing.png", new BMap.Size(20, 50));
				    	var markerOther = new BMap.Marker(pt, {icon: myIcon});
			    		countryArrMarker[obj.NAME] = markerOther;
			    		var pointnum = 0;
			    		var pointArr = new Array ;
			    		for(var name in countryArr) {	
			    			pointArr[pointnum] = countryArr[name];
			    			pointnum++;
						}
			    		for(var i = 0; i < pointnum; i++) {
			    			var pointObject = new Object();
			    			pointObject.lng = pointArr[i].lng;
			    			pointObject.lat = pointArr[i].lat;
			    			ActionPointArrJson.push(pointObject);
			    		}
			    		var ActionPointArrJsonStr = JSON.stringify(ActionPointArrJson);
			    		$.ajax({
			    			url:$.cxt + "/gridCommon/convexHull",
			    			data: {pointsStr: ActionPointArrJsonStr},
			    			type: "POST",
			    			success: function(data) {
			    				var pointlist = [];
			    				for(var i = 0; i < data.length; i++){
			    					pointlist.push(new BMap.Point(data[i].lng, data[i].lat))
			    				}
			    				overlays[0] = buildPology(pointlist);
			    				map.addOverlay(overlays[0]);
			    			}	 
			    		});
			    		map.addOverlay(markerOther);
			    	}
			    	$("#countryMapTable").delRowData(rowid);
			    	$("#AddcountryMapTable").jqGrid('addRowData', addCountryNum, obj);
			    	addCountryNum++ ;
				}
			});
			$('#countryMapTable').jqGrid('setLabel', 'rn', '序号', {
				'text-align': 'cenger',
				'vertical-align': 'middle',
				'width': "30"
			});
			// jqgrid 创建的表格都有role属性为grid
			$("table[role='grid']").each(function () {
				// 使表头的序号列宽度为40
				$('.' + $(this).attr("class") + ' tr:first th:first').css("width", "30"); 
				// 使表体的序号列宽度为40
				$('.' + $(this).attr("class") + ' tr:first td:first').css("width", "30"); 
			});
		}
	});
}

$("#country_define").on("click", function() {
	$("#submit").trigger("click");
});

function initParam() {
	map.enableScrollWheelZoom(true);
	$.ajax({
		url: $.cxt + "/map/getOrgDetail", 
		data: {orgId: nowOrgId},
		type: "POST",
		success: function(data) {
			var lng = 0, lat = 0;	  
			for(var i = 0, n = data.length; i < n; i++) {
				var tmp = data[i];
				// 创建多边形
				var polygon = new BMap.Polygon(JSON.parse(tmp.shape), 
					{strokeColor: "blue", fillColor: '', strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.0, strokeStyle: 'solid'});
				// map.addOverlay(polygon); 
				lng += (tmp.maxlng + tmp.minlng) / (2 * data.length);
				lat += (tmp.maxlat + tmp.minlat) / (2 * data.length);
			}
			initMap(lng, lat);
		}
	});
	redIcon = new BMap.Icon($.cxt + "/pages/images/gis/red.png", new BMap.Size(21, 33));
	blueIcon = new BMap.Icon($.cxt + "/pages/images/gis/blue.png", new BMap.Size(21, 33));
	$("#pid").val(nowOrgId);
	$.ajax({
		url: $.cxt + "/map/initMap",
		data: {pid: nowOrgId},
		type: "POST",
		success: function(data) {
			for(var i = 0, n = data.length; i < n; i++) {
				var temp = data[i];
				var pointArray = [];
				var points = JSON.parse(temp.shape);
				for(var j = 0; j < points.length; j++) {
					var point = new BMap.Point(points[j].lng, points[j].lat);
					pointArray.push(point);
				}

				// 创建多边形
				var polygon = new BMap.Polygon(pointArray, 
					{strokeColor: "blue", fillColor: temp.color, strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.5, strokeStyle: 'solid'});
				polygon.orgId = temp.orgId;
				polygon.mapName = temp.name;
				polygon.mapType = temp.typeId;
				polygon.orgOldId = temp.orgId;
				// polygon.mapUser = temp.loginId;
				// polygon.busiManager = temp.loginId;
				// polygon.cdManager = temp.loginId;
				// polygon.heapManager = temp.loginId;
				// polygon.directManager = temp.loginId;
				// polygon.societyManager = temp.loginId;
				polygon.mapColor = temp.color;
				polygon.mapAddress = temp.shape;
				polygon.mapState = "edit";
            	map.addOverlay(polygon);
            	polygon.addEventListener('click', editPolygon);
            	showText(polygon, temp.name);
			}
		}
	});
	
	//显示信息
	function showText(polygon, pName) { 
		// 或的多边形的所有顶点
		var point = getCenterPoint(polygon.getPath());
		// 获得中心点
		var label = new BMap.Label(pName, {offset: new BMap.Size(-40, -25), position: point});
		// 对label样式隐藏
		label.setStyle({color : "#000", fontSize : "14px", backgroundColor :"0.05", border :"0", fontWeight :"bold" });
		polygon.addEventListener('mouseover', function() {map.addOverlay(label)});
		polygon.addEventListener('mouseout', function() {map.removeOverlay(label)});
	} 
	
	// 获得图形的中心点
	function getCenterPoint(path) {
		var x = 0.0;
		var y = 0.0;
		for(var i = 0; i < path.length; i++) {
			x = x + parseFloat(path[i].lng);
	  		y = y + parseFloat(path[i].lat);
		}
		x = x / path.length;
		y = y / path.length;
		return new BMap.Point(x, y);
	}
}
  
var map = new BMap.Map('allmap');
var overlays = [];
var flag = 0;
var page = 1;
var total;
var tempoverlays = [];
var edit = 0;
var areaLayerList;
var completePology = [];
function initMap(lng, lat) {
	var centerPoint = new BMap.Point(lng, lat);
	// 设置地图中心，显示层级
	map.centerAndZoom(centerPoint, 11);
	// 地图可以滚轮放大缩小
	map.enableScrollWheelZoom(true);
	map.enableDragging();
	map.enableDoubleClickZoom(false);
	//放置鼠标显示经纬度
	 //单击获取点击的经纬度

	map.addEventListener("click",function(e){
		$('#datashow').empty();
		$('#datashow').text(e.point.lng + "," + e.point.lat);
		
	});
	
	// 范围设置div，从渠道里面移到地图初始化服务中
	var div = $("<div class='RangeSet' style='left: 11px; top: 56px; right: auto; bottom: auto; position: absolute;'></div>");
	// 只允许输入数字(整数：小数点不能输入)
	var radioLength = $("<input placeholder='范围设置' type='number' min='0' max='1000' id='setRange' style='width:100px' oninput='value=value.replace(/[^\\d]/g,\"\")'>");
	radioLength.bind('input propertychange', function() {
		var r = radioLength.val();
		if(r > 1000) {
			$("#setRange").val("");
		}
	});
	div.append(radioLength);
	$(map.getContainer()).parent().append(div);
	
	var navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(navigation);

	// 基础单元（包含小区）边界信息
	var poiLayer = new BMapLib.PoiLayer(nowOrgId, "false");
	map.addOverlay(poiLayer);
	
	var areaLayer = new BMapLib.AreaLayer(nowOrgId);  
	map.addOverlay(areaLayer);
	areaLayerList = areaLayer.getOverlayList();

	var searchControl = new BMapLib.SearchControl(nowOrgId);  
	map.addControl(searchControl);

	var styleOptions = {
		strokeColor: "blue",  // 边线颜色。
		fillColor: "#A7C0E0", // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 2,      // 边线的宽度，以像素为单位。
        strokeOpacity: 0.5,   // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.5,     // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid'  // 边线的样式，solid或dashed。
	}
	
    // 实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
    	isOpen: false,                     // 是否开启绘制模式
        enableDrawingTool: true,           // 是否显示工具栏
        drawingToolOptions: {
        	anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
            offset: new BMap.Size(5, 5),   // 偏离值
        },
        circleOptions: styleOptions,       // 圆的样式
        polylineOptions: styleOptions,     // 线的样式
        polygonOptions: styleOptions,      // 多边形的样式
        rectangleOptions: styleOptions     // 矩形的样式
    });
	// 添加鼠标绘制工具监听事件，用于获取绘制结果
	drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    
	// 画矩形
    drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
	$("#polygonCommunity").css("display", "none");
	$("#polygon").css("display", "block");
    // 给button绑定个点击事件,点击后可以进行绘制
    $("#polygon").click(function() {
		/*
    	 * 点击画图
    	 * 判断是否存在正在画却没有进行保存的覆盖物
    	 * 清除当前marker点
    	 * 还原上下两个表格
    	 * {
    	 *		//addCountryNum   存储的是选择了的村镇的个数
    	 * }
    	 */
    	if(!editnum) {
    		messageAlert("存在正在修改的网格,请进行保存后再继续进行修改");
    		return;
    	}

    	if(overlays.length == 0) {
    		$.ajax({
				url: $.cxt + "/map/getErrChannelNum", 
				data: {orgId: nowOrgId},
				type: "POST",
				success: function(data) {
					if(data>0) {
						var message = "当前区县下有<a id='errChannelBtn' style='cursor: pointer;'>" + data + "</a>个渠道没有经纬度信息，故未在地图上展现，是否继续划分网格?";
						bootbox.dialog({  
							message: message,  
							title: "确认提示",  
						   	buttons: {  
						   		OK: {  
						   			label: "确认",  
						        	className: "btn-primary",  
						        	callback: function () {  
						        		drawingManager.open();
								    	disableEditPolygon();
								    	$("path, svg").css({"cursor":""});
								    	if(null != overlays[0] && 'new' == overlays[0].mapState) {
								    		map.removeOverlay(overlays[0]);
								    	}
								    	overlays.splice(0, 1);
						          	}
						   		},
					            Cancel: {
					                label: "取消",
					                className: "btn-default"
					            }
							}
						});

						$("#errChannelBtn").unbind("click");
				    	$("#errChannelBtn").click(function() {
				    		topwindow.i=1100;
				    		topwindow.showWindow({
								title: '渠道异常信息',
								data: {orgId: nowOrgId},
								url: $.cxt + "/pages/gis/indexPage/errChannel.jsp",
								bottons: [{
									title : "关闭" ,
									fun: function() {
										topwindow.removeWindow();
									}
								}]
							});
				    	});
					} else {
						drawingManager.open();
			    		disableEditPolygon();
			    		$("path, svg").css({"cursor":""});
			    		if(null != overlays[0] && 'new' == overlays[0].mapState) {
			    			map.removeOverlay(overlays[0]);
			    		}
			    		overlays.splice(0, 1);
					}
				}
	    	});
    	} else {
    		bootbox.dialog({
    			message: "目前存在正在进行画的网格，请点击”确认“清除正在画的网格,否则点击”取消“进行继续画网格后进行保存",  
		    	title: "确认提示",
		    	buttons: {
		    		OK: {
		    			label: "确认",
		    			className: "btn-primary",  
		    			callback: function () {
		    				// 清除当前marker，下面表格清空，上面表格重新加载
		    				map.removeOverlay(marker);
		    				// 重新初始化下面的表格
		                	$("#AddcountryMapTable").jqGrid("clearGridData");
		                	SearchFunction();
		                	// 清空数组  
		                	countryArr = []; 
		                	addCountryNum = 0;
		                	for(var name in countryArrMarker) {
		                		map.removeOverlay(countryArrMarker[name]);
		                		delete countryArrMarker[name];
		                	}
		                	
		        	    	$.ajax({
		        				url: $.cxt + "/map/getErrChannelNum", 
		        				data: {orgId: nowOrgId},
		        				type: "POST",
		        				success: function(data) {
		        					if(data > 0) {
		        						var message = "当前区县下有<a id='errChannelBtn' style='cursor: pointer;'>" + data + "</a>个渠道没有经纬度信息，故未在地图上展现，是否继续划分网格?";
		        						bootbox.dialog({  
		        							message: message,  
		        						   	title: "确认提示",  
		        						   	buttons: {  
		        						    	OK: {  
		        						    		label: "确认",  
		        						           	className: "btn-primary",  
		        						           	callback: function () {  
		        						            	drawingManager.open();
		        								    	disableEditPolygon();
		        								    	$("path, svg").css({"cursor":""});
	        								    		if(null != overlays[0] && 'new' == overlays[0].mapState) {
	        								    			map.removeOverlay(overlays[0]);
	        								    		}
	        								    		overlays.splice(0, 1);
		        						           	}
		        						    	},
	        						            Cancel: {
	        						                label: "取消",  
	        						                className: "btn-default" 
	        						            }
		        							}
		        						});

		        						$("#errChannelBtn").unbind("click");
		        				    	$("#errChannelBtn").click(function() {
		        				    		topwindow.i = 1100;
		        				    		topwindow.showWindow({
		        								title: '渠道异常信息',
		        								data: {orgId: nowOrgId},
	        									url: $.cxt + "/pages/gis/indexPage/errChannel.jsp",
	        									bottons: [{
	        										title: "关闭" ,
	        										fun: function() {
	        											topwindow.removeWindow();
	        										}
	        									}]
	        								});
	        				    		});
	        						} else {
		        						drawingManager.open();
		        			    		disableEditPolygon();
		        			    		$("path, svg").css({"cursor":""});
		        			    		if(null != overlays[0] && 'new' == overlays[0].mapState) {
		        			    			map.removeOverlay(overlays[0]);
		        			    		}
		        			    		overlays.splice(0, 1);
		        					}
		        				}
		        	    	});
		    			}
		    		},
		    		Cancel: {
		    			label: "取消",  
		                className: "btn-default",
		                callback: function () {
		                	drawingManager.open();
    			    		disableEditPolygon();
		                	return;
		                }
		    		}
		    	}
    		});
    	}
    });
    
	$("#submit").click(function () {
		showLoading();
		window.setTimeout(doSubmit, 100);
	});
	
	function doSubmit() {
		var flagCommunity = $("#checkCommunityManager").val();
    	// 选择小区管理画图功能
    	if(flagCommunity == "true") {
    		// 定义uid，小区的编码
    		var cellId = "";
    		// 存储
    		var pointArray = [];
    		completePology = [];
        	if(null != overlays[0]) {
        		if('new' == overlays[0].mapState) {
        			gridCode = "";
        		} else {
        			cellId = overlays[0].orgId;
        		}
        		var data_b = overlays[0].getPath();
        		// 转成JSON格式
        		var polygon_b = JSON.stringify(data_b);
        		var areaLayerListLength = areaLayerList.length;
        		for(var i = 0; i < areaLayerListLength; i++) {
        			var data_a = areaLayerList[i].getPath();
        			// 转成JSON格式
        			var polygon_a = JSON.stringify(data_a);
        			// 异步判断是否有重复跨区域的判断
        			$.ajax ({
        				url: $.cxt + "/gridCommon/intersectCommunity",
    					data: {polygon_a: polygon_a, polygon_b: polygon_b, orgId: nowOrgId, cellId: cellId},
    					type: "POST",
    					loading: true,
    					async: false,
    				    success: function (data) {
    				    	for(var i = 0; i < data.length; i++) {
    				    		completePology.push(data[i]);
    				    	}
    					}
        			});
        		}
        		if(completePology.length > 1) {
        			hideLoading();
        			messageAlert("所画小区已经跨区域了请继续修改!");
        			completePology = [];
    				// map.removeOverlay(overlays[0]);
        			return;
        		}
        		if(completePology.length == 0) {
        			hideLoading();
        			messageAlert("所画小区不符合要求，请继续修改!");
        			completePology = [];
    				// map.removeOverlay(overlays[0]);
        			return;
    			} else {
    				var completePologyArr = completePology[0];
    				for(var i = 0; i < completePologyArr.length; i++) {
    					pointArray.push(new BMap.Point(completePologyArr[i].lng, completePologyArr[i].lat));
    				}
    				overlays[0].setPath(pointArray);
    			}
    			$("#addressCommunity").val(JSON.stringify(overlays[0].getPath()));
    			$("#shape").val(JSON.stringify(overlays[0].getPath()));
        		
        		$("path, svg").css({"cursor":""});
    			if('new' == overlays[0].mapState) {
            		createCommunityModel();
    			} else {
    				editCommunityModel();
    			}
    		} else {
    			hideLoading();
    			messageAlert("没有可保存的小区！");
        	}
    	} else {
    		var gridCode = "";
    		var pointArray = [];
    		completePology = [];
        	if(null != overlays[0]) {
        		if('new' == overlays[0].mapState) {
        			gridCode = "";
        		} else {
        			gridCode = overlays[0].orgId;
        		}
        		var data_b = overlays[0].getPath();
        		// 转成JSON格式
        		var polygon_b = JSON.stringify(data_b);
        		var areaLayerListLength = areaLayerList.length;
        		for(var i = 0; i < areaLayerListLength; i++) {
        			var data_a = areaLayerList[i].getPath();
        			// 转成JSON格式
        			var polygon_a = JSON.stringify(data_a);
        			$.ajax ({
        				url: $.cxt + "/gridCommon/intersect",
    					data: {polygon_a: polygon_a, polygon_b: polygon_b, orgId: nowOrgId, gridCode: gridCode},
    					type: "POST",
    					loading: true,
    					async: false,
    				    success: function (data) {
    				    	for(var i = 0; i < data.length; i++) {
    				    		completePology.push(data[i]);
    				    	}
    					}
        			});
        		}
        		if(completePology.length > 1) {
        			/* var pp1 = new Array();
        			var pp2 = new Array();
        			var s1 = completePology[0];
    				// map.clearOverlays();
        			var s2 = completePology[1];
        			for(var i=0;i<s1.length;i++ ){
        				pp1.push(new BMap.Point( s1[i].lng, s1[i].lat ));
        				var marker = new BMap.Marker(new BMap.Point( s1[i].lng, s1[i].lat ));
        				map.addOverlay(marker)
        			}
    			  	for(var i=0;i<s2.length;i++ ){
    				  	pp2.push(new BMap.Point( s2[i].lng, s2[i].lat ));
    			  	}
    			  	var po1 = new BMap.Polygon(pp1);
    			  	var po2 = new BMap.Polygon(pp2);
        				  
    			  	po1.setFillColor("black");
    			  	po2.setFillColor("green");
        				
    				// map.addOverlay(po1)
    				// map.addOverlay(po2)*/
        			hideLoading();
        			messageAlert("所画网格已经跨区域了请继续修改!");
        			completePology = [];
    				// map.removeOverlay(overlays[0]);
        			return;
        		}
        		if(completePology.length == 0) {
        			hideLoading();
        			messageAlert("所画网格不符合要求，请继续修改!");
        			completePology = [];
    				// map.removeOverlay(overlays[0]);
        			return;
    			} else {
    				var completePologyArr = completePology[0];
    				for(var i = 0; i < completePologyArr.length; i++) {
    					pointArray.push(new BMap.Point(completePologyArr[i].lng, completePologyArr[i].lat));
    				}
    				overlays[0].setPath(pointArray);
    			}
    			$("#address").val(JSON.stringify(overlays[0].getPath()));
        		
        		$("path, svg").css({"cursor":""});
    			if('new' == overlays[0].mapState) {
            		createModel();
    			} else {
    				editModel();
    			}
    		} else {
    			hideLoading();
    			messageAlert("没有可保存的网格！");
        	}
    	}
	}

	$("#edit").click(function() {
 		$("path, svg").css({"cursor": ""});
 		if(editnum) {
    		flag = 1;
    	} else {
    		flag = 0;
    		editnum = false;
    		disableEditPolygon();
			messageAlert("修改功能已取消，如需再修改网格，则请再次点击修改按钮！");
			// messageAlert("存在正在修改的网格,请进行保存后再继续进行修改");
    	}
	});

	$("#delete").click(function() {
		
		disableEditPolygon();
		flag = 2;
		$("path, svg").css({"cursor": "url(" + $.cxt + "/pages/images/gis/delect.ico), auto"});
	})

	$("#complete").click(function(){
		messageAlert("功能暂未开放！");
//    	bootbox.dialog({
//    		message: "是否确定该区县内网格已经划分完毕,保存后再规定时间内无法进行修改!!!",
//			title: "提示信息",
//			buttons: {
//				OK: {
//					label: "确认",
//					className: "btn-primary",
//					callback: function () {
//						$.ajax({
//							url: $.cxt + "/map/complete",
//						 	type: "POST",
//						 	data: {orgId: nowOrgId},
//						 	success: function(json) {
//							 	messageAlert("保存成功!");
//							 	$("#submit").unbind("click");
//								$("#submit").click(function() {
//									messageAlert("该区县无法划分网格");
//								});
//							 	$("#edit").unbind("click");
//						    	$("#edit").click(function() {
//						    		messageAlert("该区县无法划分网格");
//							 	});
//								$("#delete").unbind("click");
//							 	$("#delete").click(function() {
//							 		messageAlert("该区县无法划分网格");
//							 	});
//							 	$("#complete").unbind("click");
//						    	$("#complete").click(function() {
//						    		messageAlert("该区县无法划分网格");
//							 	});
//								$("#polygon").unbind("click");
//								/* $("#polygon").click(function(){
//								 	messageAlert("该网格信息已经保存无法进行画图");
//								});*/
//						 	}
//						});
//					}
//				},
//				Cancel: {
//					label: "取消",
//					className: "btn-default",
//					callback: function () {
//					}
//				}
//			}
//    	});
	});

	$(".menuAreaList").each(function(index, ele) {
		$(this).click(function() {
			$(".menuAreaList").css({"color": "#d9e6f2", "background": "rgba(3, 36, 62, 0.8)"});
			$(".menuAreaList").eq(index).css({"color": "#ab8a2d", "background": "rgba(3, 36, 62, 0.8)"});
		});
	});
	
	$('body').mousedown(function(e) { 
    	if(3 == e.which){ 
    		$(".menuAreaList").each(function(index, ele){
    			$(".menuAreaList").css({"color": "#d9e6f2", "background": "rgba(3, 36, 62, 0.8)"});
    		})
    		$("path, svg").css({"cursor": ""});
    		if(flag == 1) {
    			disableEditPolygon();
    			editModel();
    		} else {
    			disableEditPolygon();
    		}
    	}
	});
}
  
var overlaycomplete = function(e) {
	var pointArray = [];
	completePology = [];
	e.overlay.mapState = "new";
	e.overlay.addEventListener('click', editPolygon);
	var data_b = e.overlay.getPath();
	// 转成JSON格式
	var polygon_b = JSON.stringify(data_b);
	var areaLayerListLength = areaLayerList.length;
	for(var i=0; i < areaLayerListLength; i++) {
		var data_a = areaLayerList[i].getPath();
		// 转成JSON格式
		var polygon_a = JSON.stringify(data_a);
		$.ajax ({
			url: $.cxt + "/gridCommon/intersect",  
			data: {polygon_a: polygon_a, polygon_b: polygon_b, orgId: nowOrgId, gridCode: ""},
			type: "POST",
			async: false,
			success: function (data) {
		    	for(var i = 0; i < data.length; i++) {
		    		completePology.push(data[i])    	 
		    	}
			}
		});
	}
	if(completePology.length > 1) {
		messageAlert("所画网格已经跨区域了请重新画！");
		completePology = [];
		map.removeOverlay(e.overlay);
		return;
	} else if(completePology.length == 0) {
		messageAlert("所画网格不符合要求，请重新画！");
		completePology = [];
		map.removeOverlay(e.overlay);
		return;
	} else {
		var completePologyArr = completePology[0];
		for(var i = 0; i < completePologyArr.length; i++) {
			pointArray.push(new BMap.Point(completePologyArr[i].lng, completePologyArr[i].lat));
		}
		e.overlay.setPath(pointArray);
	}
	overlays.push(e.overlay);
	$(".menuAreaList").each(function(index, ele){
		$(".menuAreaList").css({"color": "#d9e6f2", "background": "rgba(3,36,62,0.8)"});
	})
	$("#address").val(JSON.stringify(overlays[0].getPath()));
	// createModel();
};

function clearAll() {
	for(var i = 0; i < overlays.length; i++) {
		map.removeOverlay(overlays[i]);
	}
	overlays.length = 0;
}

var editPolygon = function(e) {
	var overlay = this;
	if(flag == 1 && overlay.mapState == "edit") {
		if(null != overlays[0] && 'new' == overlays[0].mapState) {
			// 判断 如果overlays
			map.removeOverlay(overlays[0]);     
		}
    		// 异步判断是否有重复跨区域的判断
    			$.ajax ({
    				url: $.cxt + "/gridCommon/isChanged",
					data: { orgId: overlay.orgId},
					type: "POST",
					loading: true,
					async: true,
				    success: function (data) {
				    	data=JSON.parse(data);
				    	if(data.code=="0"){
				    		if(data.data.length==0){
				    			messageAlert("该网格暂时不能修改！");
				    			return;
				    		}else{
				    			// tempoverlays.push(overlays[0]);
				    			// 删除数组中
				    			overlays.splice(0, 1);
				    			disableEditPolygon();
				    			flag == 1;
				    			overlay.enableEditing();
				    			editnum = false;
				    			overlays.splice(0, 1);
				    			overlays.push(overlay);
				    		}
				    		
				    	}
					}
    			});
		
	} else if(flag == 1 && overlay.mapState == "new") {	  
		// tempoverlays.push(overlays[0]);
		disableEditPolygon();
		flag == 1;
		overlay.enableEditing();
		editnum = false;
	  	overlays.splice(0, 1);
	 	overlays.push(overlay);
	} else if(flag == 2) {
		$('#confirmModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});
		$('#confirmBtnModal').off("click");
		$('#confirmBtnModal').on("click", function() {
			map.removeOverlay(overlay);
			overlays.splice(0, 1);
			if(overlay.orgId) {
				$.ajax({
					url: $.cxt + "/map/delete", 
					data: {orgId: overlay.orgId},
					type: "POST",
					success: function(data) {
						messageAlert("删除成功！");
					}
				});
			}
			$('#confirmModal').modal('hide');
			$("path, svg").css({"cursor": ""});
			$(".menuAreaList").each(function(index, ele) {
				$(".menuAreaList").css({"color": "#d9e6f2", "background": "rgba(3,36,62,0.8)"});
			});
			flag = 0;
		});
		$('#cancelBtnModal').off("click");
		$('#cancelBtnModal').on("click", function() {
			$('#confirmModal').modal('hide');
			$("path, svg").css({"cursor": ""});
			flag = 0;
		});
	}
};
  
var disableEditPolygon = function() {
	for(var i = 0; i < overlays.length; i++) {
		overlays[i].disableEditing();
	}
	flag = 0;
	editnum = true;
}

$('#resetButton').on('click', function() {
	document.getElementById("mapForm").reset();
	$('#imgSelMam').val('');
	$("#imgSelMam").trigger('chosen:updated');
	$("#color").val('');
	// 网格经理
	$('#mapManager').val('');
	$("#mapManager").trigger('chosen:updated');
	// 营业部
	// $('#busiManager').val('');
	// $("#busiManager").trigger('chosen:updated');
	// CD政企经理
	$('#cdManager').val('');
	$("#cdManager").trigger('chosen:updated');		
	$('#heapManager').val('');
	$("#heapManager").trigger('chosen:updated');
	$('#directManager').val('');
	$("#directManager").trigger('chosen:updated');
	$('#direct_sale_user_info').val('');
	$("#direct_sale_user_info").trigger('chosen:updated');
	$("#ul_id").empty();
	$("#market_ul_id").empty();
	creatArr = [];
	MarketArr = [];
	num = 0;
	othernum = 0;
	resetFontVal();
});

// 保存小区网格信息
$("#submitCommunityBtn").click(initCommunityForm);
function initCommunityForm() {
	var param = $("#mapCommunityForm").serializeObject();
	param.shape = $("#addressCommunity").val();
	$.ajax({
		url: $.cxt + "/map/createOrUpdateCommunity",
		type: "post",
		data: param,
		success: function(result) {
			var pointArray = [];
			var points = JSON.parse($('#mapCommunityForm input[name=addressCommunity]').val());
			for(var j = 0; j < points.length; j++) {
				pointArray.push(new BMap.Point(points[j].lng,points[j].lat));
			}
			// 创建多边形
			var polygon = new BMap.Polygon(pointArray, 
				{strokeColor: "blue", fillColor: "#BA55D3", 
				strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.5, strokeStyle: 'solid'});
			polygon.uid = $("#uid").val();
			polygon.mapColor = "#BA55D3";
			polygon.mapAddress = $('#mapCommunityForm input[name=addressCommunity]').val();
			polygon.mapState = "edit";
			map.removeOverlay(overlays[0]);
			overlays = [];
			polygon.setFillColor("#BA55D3");
			map.addOverlay(polygon);
			polygon.addEventListener('click', editPolygon);
			$('#modal-map-community').modal('hide');
			editnum = true;
			disableEditPolygon();
			// 清除地图坐标点
			map.removeOverlay(marker);
			// 清除地图五角星
			$(".BMap_Marker").remove();
			messageAlert("保存成功！");
			$("#uid").val('');
        	$("#cellId").val('');
		}
	});
}

// 保存基站网格信息
$("#submitStationBtn").click(initStationForm);
function initStationForm() {
	var gridName = $("#gridName option:selected").text();
	
	// 提示必须选择网格信息
	if(null == gridName || "" == gridName || "请选择" == gridName) {
		messageAlert("必须选择归属网格！");
		return;
	}
	if($('#mapManagers').val() == null) {
		messageAlert("必须填写网格经理！");
		return;
	}
	$('#mapForms input[name=orgOldId]').val(nowOrgId);
	$("#gridName option:selected").remove();
	
	// 获取form表单的所有内容
	var param = $("#mapForms").serializeObject();
	param.gridName = gridName;

	// CD政企客户经理
	var cdManagerlist = param.cdManagers;
	param.cdManagerlist = "";
	if(typeof(cdManagerlist) == "object") {
		cdManagerlist = "A:" + cdManagerlist.join(",")
		param.cdManagerlist = cdManagerlist;
	} else if(typeof(cdManagerlist) == "string") {
		cdManagerlist = cdManagerlist;
		param.cdManagerlist = cdManagerlist;
	} else {
		cdManagerlist = "";
		param.cdManagerlist = cdManagerlist;
	}

	// 网格经理
	var mapManagerlist = param.mapManagers;
	param.mapManagerlist = "";
	if(typeof(mapManagerlist) == "object") {
		mapManagerlist = "A:" + mapManagerlist.join(",");
		param.mapManagerlist = mapManagerlist;
	} else if(typeof(mapManagerlist) == "string") {
		mapManagerlist = mapManagerlist;
		param.mapManagerlist = mapManagerlist;
	} else {
		mapManagerlist = "";
		param.mapManagerlist = mapManagerlist;
	}

	// 社会渠道经理
	var heapManagerlist = param.heapManagers;
	param.heapManagerlist = '';
	if(typeof(heapManagerlist) == "object") {
		heapManagerlist = "A:" + heapManagerlist.join(",");
		param.heapManagerlist = heapManagerlist;
	} else if(typeof(heapManagerlist) == "string") {
		heapManagerlist = heapManagerlist;
		param.heapManagerlist = heapManagerlist;
	} else {
		heapManagerlist = "";
		param.heapManagerlist = heapManagerlist;
	}
	
	var directManagerlist = param.directManagers;
		
	param.directManagerlist = "";
	if(typeof(directManagerlist) == "object") {
		directManagerlist = "A:" + directManagerlist.join(",");
		param.directManagerlist = directManagerlist;
	} else if(typeof(directManagerlist) == "string") {
		directManagerlist = directManagerlist;
		param.directManagerlist = directManagerlist;
	} else {
		directManagerlist = "";
		param.directManagerlist = directManagerlist;
	}
		
	var MarketList = [];
	for(var marId in MarketArr) {
		// 对象转换为字符串
		var aToStr = JSON.stringify(MarketArr[marId]);
		MarketList.push(aToStr);
	}
	param.MarketManagerList = MarketList.join("-");
	
	var CreateList = [];
	for(var marId in creatArr) {
		// 对象转换为字符串
		var aToStr = JSON.stringify(creatArr[marId]);
		CreateList.push(aToStr);
	}
	param.societyManagerlist = CreateList.join("-");
	
	var gridInfos = $("#gridName option").text();
	
	$.ajax({
		url: $.cxt + "/map/stationCreate",
		data: param, // 识别name 标签
		type: "POST",
		success: function(json) {
			var pointArray = [];
			var points = JSON.parse(json.split("&")[1]);
			for(var j = 0; j < points.length; j++) {
				pointArray.push(new BMap.Point(points[j].lng,points[j].lat));
			}
			// 创建多边形
			var polygon = new BMap.Polygon(pointArray, 
				{strokeColor: "blue", fillColor: $('#mapForms input[name=color]').val(), 
				strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.5, strokeStyle: 'solid'});
			polygon.orgId = json.split("&")[0];
			polygon.mapName = $('#mapForms input[name=mapName]').val();
			polygon.mapType = $('#mapForms select[name=mapType]').val();
			// 网格经理
			polygon.mapUser = $('#mapForms select[name=mapManagers]').val();
			// CD政企客户经理
			polygon.cdManager = $('#mapForms select[name=cdManagers]').val();
			// 直销渠道经理
			polygon.heapManager = $('#mapForms select[name=heapManagers]').val();
			// 社会渠道经理
			polygon.directManager = $('#mapForms select[name=directManagers]').val();
			// 直销人员
			polygon.direct_sale_user_info = $('#mapForms select[name=direct_sale_user_info]').val();
			polygon.mapColor = $('#mapForms input[name=color]').val("#995cb0");
			polygon.mapAddress = json.split("&")[1];
			polygon.mapState = "edit";
			map.removeOverlay(overlays[0]);
			overlays = [];
			polygon.setFillColor("#995cb0");
        
			map.addOverlay(polygon);
			polygon.addEventListener('click', editPolygon);
          	if("请选择" == gridInfos) {
              	$('#modal-station').modal('hide');
    			editnum = true;
    			disableEditPolygon();
    			messageAlert("保存成功！");
          	}
		}
	});

	$('#mapManagers').val('');
	$("#mapManagers").trigger('chosen:updated');
	$('#cdManagers').val('');
	$("#cdManagers").trigger('chosen:updated');
	$('#heapManagers').val('');
	$("#heapManagers").trigger('chosen:updated');
	$('#directManagers').val('');
	$("#directManagers").trigger('chosen:updated');
	$('#direct_sale_user_infos').empty();
	$("#ul_ids").empty();
	$("#market_ul_ids").empty();
	// 如果原来有基站信息，则先删除
	$(".stationInfos").remove();
	Tipped.create("#imgSelMam_chosen", function(elm) {
		return createTippedFonts($(this.element));
  	},
  	{
		position: 'right',
		skin: 'purple',
		radius: true,
		size: 'large'
	});
	$("#modal-station").on("hidden.bs.modal", function() {
	});
	$(".menuAreaList").each(function(index,ele) {
		$(".menuAreaList").css({"color": "#d9e6f2", "background": "rgba(3, 36, 62, 0.8)"});
	});
}

// 保存村镇划分网格信息
$("#submitBtn").click(initForm);
function initForm() {
	if($("#mapName").val() == "") {
		messageAlert("请填写网格名称");
		return;
	}
	if($('#mapManager').val() == null) {
		messageAlert("必须填写网格经理！");
		return;
	}
	var url;
	if(1 == edit) {
		url = "/map/edit";
	} else {
		url = "/map/create";
	}
	$("#mapFoem input[name=mapName]").val($("#mapName").val());
	$('#mapForm input[name=color]').val($("#mapType option:selected").attr("color"));
	$('#mapForm input[name=orgOldId]').val(nowOrgId);
	$('#mapForm input[name=maxLng]').val(overlays[0].getBounds().getNorthEast().lng);
	$('#mapForm input[name=maxLat]').val(overlays[0].getBounds().getNorthEast().lat);
	$('#mapForm input[name=minLng]').val(overlays[0].getBounds().getSouthWest().lng);
	$('#mapForm input[name=minLat]').val(overlays[0].getBounds().getSouthWest().lat);

	var param = $("#mapForm").serializeObject();
	var cdManagerlist = param.cdManager;

	param.cdManagerlist = "";
	if(typeof(cdManagerlist) == "object") {
		cdManagerlist = "A:" + cdManagerlist.join(",")
		param.cdManagerlist = cdManagerlist;
	} else if(typeof(cdManagerlist) == "string") {
		cdManagerlist = cdManagerlist;
		param.cdManagerlist = cdManagerlist;
	} else {
		cdManagerlist = "";
		param.cdManagerlist = cdManagerlist;
	}

	var mapManagerlist = param.mapManager;
	param.mapManagerlist = "";
	
	if(typeof(mapManagerlist) == "object") {
		mapManagerlist = "A:" + mapManagerlist.join(",");
		param.mapManagerlist = mapManagerlist;
	} else if(typeof(mapManagerlist) == "string") {
		mapManagerlist = mapManagerlist;
		param.mapManagerlist = mapManagerlist;
	} else {
		mapManagerlist = "";
		param.mapManagerlist = mapManagerlist;
	}
	
	var heapManagerlist = param.heapManager;
	param.heapManagerlist='';
	
	if(typeof(heapManagerlist) == "object") {
		heapManagerlist = "A:" + heapManagerlist.join(",");
		param.heapManagerlist = heapManagerlist;
	}else if(typeof(heapManagerlist) == "string") {
		heapManagerlist = heapManagerlist;
		param.heapManagerlist = heapManagerlist;
	} else {
		heapManagerlist = "";
		param.heapManagerlist = heapManagerlist;
	}
	
	var directManagerlist = param.directManager;
		
	param.directManagerlist = "";
	if(typeof(directManagerlist) == "object"){
		directManagerlist = "A:" + directManagerlist.join(",");
		param.directManagerlist = directManagerlist;
	} else if(typeof(directManagerlist) == "string") {
		directManagerlist = directManagerlist;
		param.directManagerlist = directManagerlist;
	} else {
		directManagerlist="";
		param.directManagerlist = directManagerlist;
	}
		
	var direct_sale_user_infolist = param.direct_sale_user_info;
	param.direct_sale_user_infolist = "";
	
	if(typeof(direct_sale_user_infolist) == "object") {
		direct_sale_user_infolist = "A:" + direct_sale_user_infolist.join(",");
		param.direct_sale_user_infolist = direct_sale_user_infolist;
	} else if(typeof(direct_sale_user_infolist) == "string") {
		direct_sale_user_infolist = direct_sale_user_infolist;
		param.direct_sale_user_infolist = direct_sale_user_infolist;
	} else {
		direct_sale_user_infolist = "";
		param.direct_sale_user_infolist = direct_sale_user_infolist;
	}
	
	param.poiList = poiList.join(",");
	param.channelList = channelList.join(",");
	param.stationList = stationList.join(",");

	var MarketList = [];
	for(var marId in MarketArr) {
		// 对象转换为字符串
		var aToStr = JSON.stringify(MarketArr[marId]); 
		MarketList.push(aToStr);
	}
	var CreateList = [];
	for(var marId in creatArr) {
		// 对象转换为字符串
		var aToStr = JSON.stringify(creatArr[marId]); 
		CreateList.push(aToStr);
	}
	param.societyManagerlist = CreateList.join("-");
	param.MarketManagerList = MarketList.join("-");

	param.dayCost = dayCost;
	param.villageCost = villageCost;
	param.customCost = customCost;
	param.groupCost = groupCost;
	param.channelCost=channelCost;
	param.stationCost = stationCost;

	$.ajax({
		url: $.cxt + url,
		data: param, // 识别name标签
		type: "POST",
		success: function(json) {	
			var pointArray = [];
			var points = JSON.parse($('#mapForm input[name=address]').val());
			for(var j = 0; j < points.length; j++) {
				pointArray.push(new BMap.Point(points[j].lng,points[j].lat));
			}
			// 创建多边形
			var polygon = new BMap.Polygon(pointArray, 
				{strokeColor: "blue", fillColor: $('#mapForm input[name=color]').val(), 
				strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.5, strokeStyle: 'solid'});  
			polygon.orgId = json;
			polygon.mapName = $('#mapForm input[name=mapName]').val();
			polygon.mapType = $('#mapForm select[name=mapType]').val();
			// 网格经理
			polygon.mapUser = $('#mapForm select[name=mapManager]').val();
			// 营业负责人
			// polygon.busiManager = $('#mapForm select[name=busiManager]').val(); 
			// CD政企客户经理
			polygon.cdManager = $('#mapForm select[name=cdManager]').val();
			// 直销渠道经理
			polygon.heapManager = $('#mapForm select[name=heapManager]').val();
			// 社会渠道经理
			polygon.directManager = $('#mapForm select[name=directManager]').val();
			// 直销人员
			polygon.direct_sale_user_info = $('#mapForm select[name=direct_sale_user_info]').val();
			// 装维人员
			// polygon.societyManager = $('#mapForm div[name=societyManager]').val();
			polygon.mapColor = $('#mapForm input[name=color]').val("#995cb0");
			polygon.mapAddress = $('#mapForm input[name=address]').val();
			polygon.mapState = "edit";
			map.removeOverlay(overlays[0]);
			overlays = [];
			polygon.setFillColor("#995cb0");
			map.addOverlay(polygon);
			polygon.addEventListener('click', editPolygon);
			$('#modal-map').modal('hide');
			editnum = true;
			disableEditPolygon();
			// 清除地图坐标点
			map.removeOverlay(marker);
			// 清除地图五角星
			$(".BMap_Marker").remove();
			messageAlert("保存成功！");
		}
	});

	Tipped.create("#imgSelMam_chosen", function(elm) {
		return createTippedFonts($(this.element));
  	},
  	{
		position: 'right',
		skin: 'purple',
		radius: true,
		size: 'large'
	});

	$("#modal-map").on("hidden.bs.modal", function() {
		// $("#mapForm").data('bootstrapValidator').resetForm();
	});
	$(".menuAreaList").each(function(index, ele) {
		$(".menuAreaList").css({"color": "#d9e6f2", "background": "rgba(3,36,62,0.8)"});
	});
}

function resetFontVal() {
	$("#imgSelMam_chosen").remove();
	$("#imgSelMam").remove();
	$("#imgSelMamSpan").prepend(
		$("<select></select>")
		.addClass("chosen-select")
		.attr("id", "imgSelMam")
		.attr("multiple", "")
		.attr("data-placeholder", "选择图标...")
		.attr("title", "字体图标")
	);
	$("#imgSelMam").chosen({width: "100%", disable_search_threshold: 7});
	Tipped.create("#imgSelMam_chosen", function(elm) {
		return createTippedFonts($(this.element));
	}, {
		position: 'right',
		skin: 'purple',
		radius: true,
		size: 'large'
	});
}

function createTippedFonts(elm) {
	var ulObj = $("<ul></ul>").addClass("icon-ul");
	var faArrays = [
		"#2798ca",
		"#0eac91",
		"#72c7f3",
		"#1a6f9e",
		"#1fc069",
		"#995cb0",
		"#ef6e44",
		"#666666",
		"#cdcd66",
		"#20bead"
	];
	for(var index in faArrays) {
		ulObj.append($("<li style='background: " + faArrays[index] + "; width: 40px; margin-right: 5px; margin-bottom: 5px'></li>").attr("onclick", "setFontVal('" + faArrays[index] + "')"));
	}
	$(".tpd-content").slimscroll({
		height: "60px",
		alwaysVisible: true	
	});
	return $("<div><div>").append(ulObj).html();
}

function setFontVal(value) {
	$("#color").val(value);
	$("#imgSelMam_chosen").empty();
	$("#imgSelMam_chosen").append(
		$("<ul></ul>").addClass("chosen-choices").append($("<li style='background: " + value 
			+ "; width: 30px; height: 30px; border-radius: 5px; margin: 0 auto;'></li>").addClass("search-choice")));
}

function resetFontVal() {
	$("#imgSelMam_chosen").remove();
	$("#imgSelMam").remove();
	$("#imgSelMamSpan").prepend(
		$("<select></select>")
		.addClass("chosen-select")
		.attr("id", "imgSelMam")
		.attr("multiple", "")
		.attr("data-placeholder", "选择颜色...")
		.attr("title", "图标颜色")
	);
	$("#imgSelMam").chosen({width: "100%", disable_search_threshold: 7});
	Tipped.create("#imgSelMam_chosen", function(elm) {
		return createTippedFonts($(this.element));
	},
	{
		position: 'right',
		skin: 'purple',
		radius: true,
		size: 'large'
	});
}
	
function messageAlert(message) {
	bootbox.dialog({
		message: "<span style=\"color:#000\">" + message + "</span>",
		title: "消息提示",
		buttons: {
			OK: {
				label: "确定",
				className: "btn-success"
			}
		}
	});
}

// 基站销售经理添加按钮
function initButtonMarketStation() {
	$("#addmarketManagers").click(function() {	
		$("#inputNameMarkets").val("");
		$("#inputPhoneMarkets").val("");
	});
	
	// 弹出表单
	$("#inputPhoneMarket").focus(function() {
		$("#msgTitleMarkets").hide();
	});
	
	$("#confirm_btn_Market_Station").click(function() {	
		if(validate2()) {
			name  = $("#inputNameMarkets").val();
			phone = $("#inputPhoneMarkets").val();
			var m = $('<li class="search-choice"><span  value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
			var liLength = $("#market_ul_ids li").length;
			var a = $('<a class="search-choice-close markt" data-option-array-index=\"' + (liLength + 1) + '\"></a>');
			m.append(a);
			var arval = new Object();
			arval.name = name;
			arval.phone = phone;
			MarketArr["market" + othernum] = arval;
			$("#market_ul_ids").append(m);
			othernum++;
			$('#myFormInlineMarkets').modal('hide');
			$(".market").unbind("click");
			$(".market").click(function() {
				var tm = $(this).parent();
				var mm = tm.children("span").attr("value");
				tm.remove();
				delete MarketArr[mm];
			});
		} else {
			$("#msgTitleMarkets").show();
		}
	});
}

// 网格划分添加销售经理信息
function initButtonMarket() {
	$("#addmarketManager").click(function() {	
		$("#inputNameMarket").val("");
		$("#inputPhoneMarket").val("");
	});
	
	// 弹出表单
	$("#inputPhoneMarket").focus(function() {
		$("#msgTitleMarket").hide();
	});
	
	$("#confirm_btn_Market").click(function() {	
		if(validate1()) {
			name = $("#inputNameMarket").val();
			phone = $("#inputPhoneMarket").val();
			var m = $('<li class="search-choice"><span  value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
			var liLength = $("#market_ul_id li").length;
			var a = $('<a class="search-choice-close markt" data-option-array-index=\"'+ (liLength + 1) + '\"></a>');
			m.append(a);
			var arval = new Object();
			arval.name = name;
			arval.phone = phone;
			MarketArr["market" + othernum] = arval;
			$("#market_ul_id").append(m);
			othernum++;
			$('#myFormInlineMarket').modal('hide');
			$(".market").unbind("click");
			$(".market").click(function() {
				var tm = $(this).parent();
				var mm = tm.children("span").attr("value");
				tm.remove();
				delete MarketArr[mm];
			});
		} else {
			$("#msgTitleMarket").show();
		}
	});
}

// 基站添加装维人员信息
function initStationButton() {
	$("#addsocietyManagers").click(function() {	
		$("#inputNames").val("");
		$("#inputPhones").val("");
	});
	
	// 弹出表单
	$("#inputPhones").focus(function() {
		$("#msgTitles").hide();
	});
	
	$("#confirm_btn_station").click(function() {	
		if(validate3()) {
			name  = $("#inputNames").val();
			phone = $("#inputPhones").val();
			var m = $('<li class="search-choice pull-left"><span  value="society' + num + '">' + name + "[" + phone + "]" + ' </span></li>');
			var liLength = $("#ul_ids li").length;
			var a = $('<a class="search-choice-close society" data-option-array-index=\"' + (liLength + 1) + '\"></a>');
			m.append(a);
			var arval = new Object();
			arval.name = name;
			arval.phone = phone;
			creatArr["society" + num] = arval;
			$("#ul_ids").append(m);
			num++;
			$('#myFormInlines').modal('hide');
			$(".society").unbind("click");
			$(".society").click(function() {
				var tm = $(this).parent();
				var mm = tm.children("span").attr("value");
				tm.remove();
				delete creatArr[mm];
			});
		} else {
			$("#msgTitles").show();
		}
	});
}

// 网格划分添加装维人员信息
function initButton() {
	$("#addsocietyManager").click(function() {	
		$("#inputName").val("");
		$("#inputPhone").val("");
	});
	
	// 弹出表单
	$("#inputPhone").focus(function() {
		$("#msgTitle").hide();
	});
	
	$("#confirm_btn").click(function() {
		if(validate()) {
			name  = $("#inputName").val();
			phone = $("#inputPhone").val();
			var m = $('<li class="search-choice pull-left"><span  value="society' + num + '">' + name + "[" + phone + "]" + ' </span></li>');
			var liLength = $("#ul_id li").length;
			var a = $('<a class="search-choice-close society" data-option-array-index=\"' + (liLength + 1) + '\"></a>');
			m.append(a);	
			var arval = new Object();
			arval.name = name;
			arval.phone = phone;
			creatArr["society" + num] = arval;
			$("#ul_id").append(m);
			num++;
			$('#myFormInline').modal('hide');
			$(".society").unbind("click");
			$(".society").click(function() {
				var tm = $(this).parent();
				var mm = tm.children("span").attr("value");
				tm.remove();
				delete creatArr[mm];
			});
		} else {
			$("#msgTitle").show();
		}
	});
}

// 显示小区信息保存弹出框
function createCommunityModel() {
	hideLoading();
	edit = 0;
	$('#modal-map-community .modal-title').empty();
	$('#modal-map-community .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("小区信息保存");
	$('#modal-map-community').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
	// 根据UID查询小区信息，并将小区信息赋值到弹出面板中
	var uid = $("#uid").val();
	$.ajax({
		url: $.cxt + "/map/selectCommunityCreateByCellId",
		type: "post",
		data: {cellId: uid},
		success: function(result) {
			result = eval('(' + result + ')');
			$("#cityName").val(result.CITYNAME);
			$("#cityCode").val(result.CITYCODE);
			$("#areaType").val(result.AREATYPE);
			$("#cntyId").val(result.CNTYID);
			$("#countyName").val(result.COUNTYNAME);
			$("#villId").val(result.VILLID);
			$("#villName").val(result.VILLNAME);
			$("#cellId").val(result.CELLID);
			$("#cellName").val(result.CELLNAME);
			$("#bsId").val(result.BSID);
			$("#cellType").val(result.CELLTYPE);
			$("#cellLongitude").val(result.CELLLONGITUDE == null || result.CELLLONGITUDE == '' ? 0 : result.CELLLONGITUDE);
			$("#cellLatitude").val(result.CELLLATITUDE == null || result.CELLLATITUDE == '' ? 0 : result.CELLLATITUDE);
			$("#cellPrc").val(result.CELLPRC == null ? "0.0" : result.CELLPRC);
			$("#cellOccupyArea").val(result.CELLOCCUPYAREA == null || result.CELLOCCUPYAREA == '' ? "0.0" : result.CELLOCCUPYAREA);
			$("#cellBuildArea").val(result.CELLBUILDAREA == null || result.CELLBUILDAREA == '' ? "0.0" : result.CELLBUILDAREA);
			$("#cellCnt").val(result.CELLCNT == null || result.CELLCNT == '' ? 0 : result.CELLCNT);
			$("#cellUserCnt").val(result.CELLUSERCNT == null || result.CELLUSERCNT == '' ? 0 : result.CELLUSERCNT);
			$("#cellInUserCnt").val(result.CELLINUSERCNT == null || result.CELLINUSERCNT == '' ? 0 : result.CELLINUSERCNT);
			$("#cellAddr").val(result.CELLADDR);
			$("#popuScale").val(result.POPUSCALE);
			$("#isNotBuiltCell").val(result.ISNOTBUILTCELL);
			$("#buildMode").val(result.BUILDMODE);
			$("#portCnt").val(result.PORTCNT == null || result.PORTCNT == '' ? 0 : result.PORTCNT);
			$("#usePortCnt").val(result.USEPORTCNT == null || result.USEPORTCNT == '' ? 0 : result.USEPORTCNT);
			$("#portRatio").val(result.PORTRATIO);
			$("#isTeleCover").val(result.ISTELCOVER);
			$("#isUnicomCover").val(result.ISUNICOMCOVER);
			$("#isBroAdCastCover").val(result.ISBROADCASTCOVER);
			$("#tranResFlag").val(result.TRANRESFLAG);
			$("#difficultyLvl").val(result.DIFFICULTYLVL);
			$("#acessType").val(result.ACESSTYPE);
			$("#isSole").val(result.ISSOLE);
			$("#teleUserCnt").val(result.TELEUSERCNT == null || result.TELEUSERCNT == '' ? 0 : result.TELEUSERCNT);
			$("#unicomUserCnt").val(result.UNICOMUSERCNT == null || result.UNICOMUSERCNT == '' ? 0 : result.UNICOMUSERCNT);
			$("#broAdCaseUserCnt").val(result.BROADCASEUSERCNT == null || result.BROADCASEUSERCNT == '' ? 0 : result.BROADCASEUSERCNT);
			$("#mobileUserRatio").val(result.MOBILEUSERRATIO == null || result.MOBILEUSERRATIO == '' ? "0.0" : result.MOBILEUSERRATIO);
			$("#competProd").val(result.COMPETPROD);
			$("#competProm").val(result.COMPETPROM);
			$("#propertyCompany").val(result.PROPERTYCOMPANY);
			$("#propertyTel").val(result.PROPERTYTEL);
			$("#propertyAddr").val(result.PROPERTYADDR);
			$("#keyMan").val(result.KEYMAN);
			$("#keyManPost").val(result.KEYMANPOST);
			$("#keyManTel").val(result.KEYMANTEL);
			$("#propertyContName").val(result.PROPERTYCONTNAME);
			$("#propertyContPost").val(result.PROPERTYCONTPOST);
			$("#propertyContTel").val(result.PROPERTYCONTEL);
			$("#builderName").val(result.builderName);
			$("#builderContName").val(result.BUILDERCONTNAME);
			$("#builderContTel").val(result.BUILDERCONTTEL);
			$("#builderTel").val(result.BUILDERTEL);
			$("#sex").val(result.SEX);
			$("#kdUserCnt").val(result.KDUSERCNT == null || result.KDUSERCNT == '' ? 0 : result.KDUSERCNT);
			$("#kdExpUserCnt").val(result.KDEXPUSERCNT == null || result.KDEXPUSERCNT == '' ? 0 : result.KDEXPUSERCNT);
			$("#cellValue").val(result.CELLVALUE);
			$("#coverFlag").val(result.COVERFLAG);
			$("#kdInc").val(result.KDINC == null || result.KDINC == '' ? "0.0"  : result.KDINC);
			$("#coverType").val(result.COVERTYPE);
			$("#resSaturatedRatio").val(result.RESSATURATEDRATIO == null || result.RESSATURATEDRATIO == '' ? "0.0" : result.RESSATURATEDRATIO);
			$("#potentialCnclRatio").val(result.POTENTIALCNCLRATIO == null || result.POTENTIALCNCLRATIO == '' ? "0.0" : result.POTENTIALCNCLRATIO);
			$("#potentialUserRatio").val(result.POTENTIALUSERRATIO == null || result.POTENTIALUSERRATIO == '' ? "0.0" : result.POTENTIALUSERRATIO);
			$("#cnclRatio").val(result.CNCLRATIO == null || result.CNCLRATIO == '' ? "0.0" : result.CNCLRATIO);
			$("#regionType").val(result.REGIONTYPE);
			$("#potentialUserCnt").val(result.POTENTIALUSERCNT == null || result.POTENTIALUSERCNT == '' ? 0 : result.POTENTIALUSERCNT);
			$("#shape").val($("#addressCommunity").val());
		}
	});
//	document.getElementById("mapCommunityForm").reset();
}

// 显示网格信息保存弹出框
function createModel() {
	// 获取个位置的下拉框的内容
	initGridSelect();
	hideLoading();
	edit = 0;
	$('#modal-map .modal-title').empty();
	$('#modal-map .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("网格信息保存");
	$('#modal-map').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
	document.getElementById("mapForm").reset();
	$('#color').val('');
	$('#orgId').val('');
	// mapManager
	$('#userId').val('');
	$('#busiId').val('');
	$('#cdId').val('');
	$('#heapId').val('');
	$('#directId').val('');
	$('#direct_sale_user_infoId').val('');
	$('#societyId').val('');	
	$('#mapName').val('');
	$('#mapManager').val('');
	$("#mapManager").trigger('chosen:updated');
	$('#busiManager').val('');
	$("#busiManager").trigger('chosen:updated');
	$('#cdManager').val('');
	$("#cdManager").trigger('chosen:updated');
	$('#heapManager').val('');
	$("#heapManager").trigger('chosen:updated');
	$('#directManager').val('');
	$("#directManager").trigger('chosen:updated');
	$('#direct_sale_user_info').val('');
	$("#direct_sale_user_info").trigger('chosen:updated');
	// $('#societyManager').val('');
	$("#societyManager").trigger('chosen:updated'); //$("#societyManager").trigger('chosen:updated'); 动态更新select下的选项*/
	$('#imgSelMam').val('');
	$("#imgSelMam").trigger('chosen:updated');
	$("#color").val('#995cb0');
	$('#mapType').val('1');
	$("#ul_id").val("");
	resetFontVal();
}

// 查询小区信息（修改）
function editCommunityModel() {
	document.getElementById("mapCommunityForm").reset();
	$('#addressCommunity').val(JSON.stringify(overlays[0].getPath()));
	$("#shape").val(JSON.stringify(overlays[0].getPath()));
	// 根据UID查询小区信息，并将小区信息赋值到弹出面板中
	var uid = $("#uid").val();
	hideLoading();
	edit = 1;
	$('#modal-map-community .modal-title').empty();
	$('#modal-map-community .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("小区信息修改");
	$('#modal-map-community').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
	$.ajax({
		url: $.cxt + "/map/selectCommunityEditByCellId",
		type: "post",
		data: {cellId: uid},
		success: function(result) {
			result = eval('(' + result + ')');
			$("#cityName").val(result.CITYNAME);
			$("#cityCode").val(result.CITYCODE);
			$("#areaType").val(result.AREATYPE);
			$("#cntyId").val(result.CNTYID);
			$("#countyName").val(result.COUNTYNAME);
			$("#villId").val(result.VILLID);
			$("#villIdGxh").val(result.VILLIDGXH);
			$("#villName").val(result.VILLNAME);
			$("#villNameGxh").val(result.VILLNAMEGXH);
			$("#cellId").val(result.CELLID);
			$("#cellIdGxh").val(result.CELLIDGXH);
			$("#cellName").val(result.CELLNAME);
			$("#cellNameGxh").val(result.CELLNAMEGXH);
			$("#bsId").val(result.BSID);
			$("#bsIdGxh").val(result.BSIDGXH);
			$("#cellType").val(result.CELLTYPE);
			$("#cellTypeGxh").val(result.CELLTYPEGXH);
			$("#cellLongitude").val(result.CELLLONGITUDE == null || result.CELLLONGITUDE == '' ? 0 : result.CELLLONGITUDE);
			$("#cellLongitudeGxh").val(result.CELLLONGITUDEGXH == null || result.CELLLONGITUDEGXH == '' ? 0 : result.CELLLONGITUDEGXH);
			$("#cellLatitude").val(result.CELLLATITUDE == null || result.CELLLATITUDE == '' ? 0 : result.CELLLATITUDE);
			$("#cellLatitudeGxh").val(result.CELLLATITUDEGXH == null || result.CELLLATITUDEGXH == '' ? 0 : result.CELLLATITUDEGXH);
			$("#cellPrc").val(result.CELLPRC == null ? "0.0" : result.CELLPRC);
			$("#cellPrcGxh").val(result.CELLPRCGXH == null ? "0.0" : result.CELLPRCGXH);
			$("#cellOccupyArea").val(result.CELLOCCUPYAREA == null || result.CELLOCCUPYAREA == '' ? "0.0" : result.CELLOCCUPYAREA);
			$("#cellOccupyAreaGxh").val(result.CELLOCCUPYAREAGXH == null || result.CELLOCCUPYAREAGXH == '' ? "0.0" : result.CELLOCCUPYAREAGXH);
			$("#cellBuildArea").val(result.CELLBUILDAREA == null || result.CELLBUILDAREA == '' ? "0.0" : result.CELLBUILDAREA);
			$("#cellBuildAreaGxh").val(result.CELLBUILDAREAGXH == null || result.CELLBUILDAREAGXH == '' ? "0.0" : result.CELLBUILDAREAGXH);
			$("#cellCnt").val(result.CELLCNT == null || result.CELLCNT == '' ? 0 : result.CELLCNT);
			$("#cellCntGxh").val(result.CELLCNTGXH == null || result.CELLCNTGXH == '' ? 0 : result.CELLCNTGXH);
			$("#cellUserCnt").val(result.CELLUSERCNT == null || result.CELLUSERCNT == '' ? 0 : result.CELLUSERCNT);
			$("#cellUserCntGxh").val(result.CELLUSERCNTGXH == null || result.CELLUSERCNTGXH == '' ? 0 : result.CELLUSERCNTGXH);
			$("#cellInUserCnt").val(result.CELLINUSERCNT == null || result.CELLINUSERCNT == '' ? 0 : result.CELLINUSERCNT);
			$("#cellInUserCntGxh").val(result.CELLINUSERCNTGXH == null || result.CELLINUSERCNTGXH == '' ? 0 : result.CELLINUSERCNTGXH);
			$("#cellAddr").val(result.CELLADDR);
			$("#cellAddrGxh").val(result.CELLADDRGXH);
			$("#popuScale").val(result.POPUSCALE);
			$("#popuScaleGxh").val(result.POPUSCALEGXH);
			$("#isNotBuiltCell").val(result.ISNOTBUILTCELL);
			$("#isNotBuiltCellGxh").val(result.ISNOTBUILTCELLGXH);
			$("#buildMode").val(result.BUILDMODE);
			$("#buildModeGxh").val(result.BUILDMODEGXH);
			$("#portCnt").val(result.PORTCNT == null || result.PORTCNT == '' ? 0 : result.PORTCNT);
			$("#portCntGxh").val(result.PORTCNTGXH == null || result.PORTCNTGXH == '' ? 0 : result.PORTCNTGXH);
			$("#usePortCnt").val(result.USEPORTCNT == null || result.USEPORTCNT == '' ? 0 : result.USEPORTCNT);
			$("#usePortCntGxh").val(result.USEPORTCNTGXH == null || result.USEPORTCNTGXH == '' ? 0 : result.USEPORTCNTGXH);
			$("#portRatio").val(result.PORTRATIO);
			$("#portRatioGxh").val(result.PORTRATIOGXH);
			$("#isTeleCover").val(result.ISTELCOVER);
			$("#isTeleCoverGxh").val(result.ISTELCOVERGXH);
			$("#isUnicomCover").val(result.ISUNICOMCOVER);
			$("#isUnicomCoverGxh").val(result.ISUNICOMCOVERGXH);
			$("#isBroAdCastCover").val(result.ISBROADCASTCOVER);
			$("#isBroAdCastCoverGxh").val(result.ISBROADCASTCOVERGXH);
			$("#tranResFlag").val(result.TRANRESFLAG);
			$("#tranResFlagGxh").val(result.TRANRESFLAGGXH);
			$("#difficultyLvl").val(result.DIFFICULTYLVL);
			$("#difficultyLvlGxh").val(result.DIFFICULTYLVLGXH);
			$("#acessType").val(result.ACESSTYPE);
			$("#acessTypeGxh").val(result.ACESSTYPEGXH);
			$("#isSole").val(result.ISSOLE);
			$("#isSoleGxh").val(result.ISSOLEGXH);
			$("#teleUserCnt").val(result.TELEUSERCNT == null || result.TELEUSERCNT == '' ? 0 : result.TELEUSERCNT);
			$("#teleUserCntGxh").val(result.TELEUSERCNTGXH == null || result.TELEUSERCNTGXH == '' ? 0 : result.TELEUSERCNTGXH);
			$("#unicomUserCnt").val(result.UNICOMUSERCNT == null || result.UNICOMUSERCNT == '' ? 0 : result.UNICOMUSERCNT);
			$("#unicomUserCntGxh").val(result.UNICOMUSERCNTGXH == null || result.UNICOMUSERCNTGXH == '' ? 0 : result.UNICOMUSERCNTGXH);
			$("#broAdCaseUserCnt").val(result.BROADCASEUSERCNT == null || result.BROADCASEUSERCNT == '' ? 0 : result.BROADCASEUSERCNT);
			$("#broAdCaseUserCntGxh").val(result.BROADCASEUSERCNTGXH == null || result.BROADCASEUSERCNTGXH == '' ? 0 : result.BROADCASEUSERCNTGXH);
			$("#mobileUserRatio").val(result.MOBILEUSERRATIO == null || result.MOBILEUSERRATIO == '' ? "0.0" : result.MOBILEUSERRATIO);
			$("#mobileUserRatioGxh").val(result.MOBILEUSERRATIOGXH == null || result.MOBILEUSERRATIOGXH == '' ? "0.0" : result.MOBILEUSERRATIOGXH);
			$("#competProd").val(result.COMPETPROD);
			$("#competProdGxh").val(result.COMPETPRODGXH);
			$("#competProm").val(result.COMPETPROM);
			$("#competPromGxh").val(result.COMPETPROMGXH);
			$("#propertyCompany").val(result.PROPERTYCOMPANY);
			$("#propertyCompanyGxh").val(result.PROPERTYCOMPANYGXH);
			$("#propertyTel").val(result.PROPERTYTEL);
			$("#propertyTelGxh").val(result.PROPERTYTELGXH);
			$("#propertyAddr").val(result.PROPERTYADDR);
			$("#propertyAddrGxh").val(result.PROPERTYADDRGXH);
			$("#keyMan").val(result.KEYMAN);
			$("#keyManGxh").val(result.KEYMANGXH);
			$("#keyManPost").val(result.KEYMANPOST);
			$("#keyManPostGxh").val(result.KEYMANPOSTGXH);
			$("#keyManTel").val(result.KEYMANTEL);
			$("#keyManTelGxh").val(result.KEYMANTELGXH);
			$("#propertyContName").val(result.PROPERTYCONTNAME);
			$("#propertyContNameGxh").val(result.PROPERTYCONTNAMEGXH);
			$("#propertyContPost").val(result.PROPERTYCONTPOST);
			$("#propertyContPostGxh").val(result.PROPERTYCONTPOSTGXH);
			$("#propertyContTel").val(result.PROPERTYCONTEL);
			$("#propertyContTelGxh").val(result.PROPERTYCONTELGXH);
			$("#builderName").val(result.builderName);
			$("#builderNameGxh").val(result.builderNameGXH);
			$("#builderContName").val(result.BUILDERCONTNAME);
			$("#builderContNameGxh").val(result.BUILDERCONTNAMEGXH);
			$("#builderContTel").val(result.BUILDERCONTTEL);
			$("#builderContTelGxh").val(result.BUILDERCONTTELGXH);
			$("#builderTel").val(result.BUILDERTEL);
			$("#builderTelGxh").val(result.BUILDERTELGXH);
			$("#sex").val(result.SEX);
			$("#sexGxh").val(result.SEXGXH);
			$("#kdUserCnt").val(result.KDUSERCNT == null || result.KDUSERCNT == '' ? 0 : result.KDUSERCNT);
			$("#kdUserCntGxh").val(result.KDUSERCNTGXH == null || result.KDUSERCNTGXH == '' ? 0 : result.KDUSERCNTGXH);
			$("#kdExpUserCnt").val(result.KDEXPUSERCNT == null || result.KDEXPUSERCNT == '' ? 0 : result.KDEXPUSERCNT);
			$("#kdExpUserCntGxh").val(result.KDEXPUSERCNTGXH == null || result.KDEXPUSERCNTGXH == '' ? 0 : result.KDEXPUSERCNTGXH);
			$("#cellValue").val(result.CELLVALUE);
			$("#cellValueGxh").val(result.CELLVALUEGXH);
			$("#coverFlag").val(result.COVERFLAG);
			$("#coverFlagGxh").val(result.COVERFLAGGXH);
			$("#kdInc").val(result.KDINC == null || result.KDINC == '' ? "0.0"  : result.KDINC);
			$("#kdIncGxh").val(result.KDINCGXH == null || result.KDINCGXH == '' ? "0.0"  : result.KDINCGxh);
			$("#coverType").val(result.COVERTYPE);
			$("#coverTypeGxh").val(result.COVERTYPEGXH);
			$("#resSaturatedRatio").val(result.RESSATURATEDRATIO == null || result.RESSATURATEDRATIO == '' ? "0.0" : result.RESSATURATEDRATIO);
			$("#resSaturatedRatioGxh").val(result.RESSATURATEDRATIOGXH == null || result.RESSATURATEDRATIOGXH == '' ? "0.0" : result.RESSATURATEDRATIOGXH);
			$("#potentialCnclRatio").val(result.POTENTIALCNCLRATIO == null || result.POTENTIALCNCLRATIO == '' ? "0.0" : result.POTENTIALCNCLRATIO);
			$("#potentialCnclRatioGxh").val(result.POTENTIALCNCLRATIOGXH == null || result.POTENTIALCNCLRATIOGXH == '' ? "0.0" : result.POTENTIALCNCLRATIOGXH);
			$("#potentialUserRatio").val(result.POTENTIALUSERRATIO == null || result.POTENTIALUSERRATIO == '' ? "0.0" : result.POTENTIALUSERRATIO);
			$("#potentialUserRatioGxh").val(result.POTENTIALUSERRATIOGXH == null || result.POTENTIALUSERRATIOGXH == '' ? "0.0" : result.POTENTIALUSERRATIOGXH);
			$("#cnclRatio").val(result.CNCLRATIO == null || result.CNCLRATIO == '' ? "0.0" : result.CNCLRATIO);
			$("#cnclRatioGxh").val(result.CNCLRATIOGXH == null || result.CNCLRATIOGXH == '' ? "0.0" : result.CNCLRATIOGXH);
			$("#regionType").val(result.REGIONTYPE);
			$("#regionTypeGxh").val(result.REGIONTYPEGXH);
			$("#potentialUserCnt").val(result.POTENTIALUSERCNT == null || result.POTENTIALUSERCNT == '' ? 0 : result.POTENTIALUSERCNT);
			$("#potentialUserCntGxh").val(result.POTENTIALUSERCNTGXH == null || result.POTENTIALUSERCNTGXH == '' ? 0 : result.POTENTIALUSERCNTGXH);
			$("#shape").val($("#addressCommunity").val());
			$("#shapeGxh").val(result.SHAPEGXH);
		}
	});
	
}

function editModel() {
	// 清空数组
	initGridSelect();
	hideLoading();
	edit = 1;
	$('#modal-map .modal-title').empty();
	$('#modal-map .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("网格保存");
	$('#modal-map').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
	document.getElementById("mapForm").reset();
	$('#color').val(overlays[0].mapColor);
	$('#pid').val(nowOrgId);
	$('#address').val(JSON.stringify(overlays[0].getPath()));
	$('#orgId').val(overlays[0].orgId);
	// 填写的网格名称
	$('#mapName').val(overlays[0].mapName);

	// 网格经理
	$.ajax({
		url: $.cxt + "/map/editUser",  
		data: {orgId: overlays[0].orgId, userType: 3},
		type: "POST",
		async: false,
		success: function(data) {
			var arr = new Array();
			var arrs = "";
			for(var i = 0; i < data.length; i++) {
			if(data[i] == ""){return;}
				arr[i] = data[i].OA_ID;
				arrs += data[i].OA_ID + ","		
			}
			$('#mapManager').val(arr);
			$("#mapManager").trigger('chosen:updated');
			$('#userId').val(arrs);
		}
	});
	
	// CD政企客户经理
	$.ajax({
		url: $.cxt + "/map/editUser",
		data: {orgId: overlays[0].orgId, userType: 2},
		type: "POST",
		async: false,
		success: function(data) {
			var arr = new Array();
			var arrs = "";
			for(var i = 0;i < data.length; i++) {
				if(data[i] == ""){return;}
				arr[i] = data[i].OA_ID;
				arrs += data[i].OA_ID + ","		
			}
			$('#cdManager').val(arr);
			$("#cdManager").trigger('chosen:updated');
			$('#cdId').val(arrs);
		}
	});
	
	// 社会销经理
	$.ajax({
		url: $.cxt + "/map/editHeapDirect",  
		data: {orgId: overlays[0].orgId, userType: 1},
		type: "POST",
		async: false,
		success: function(data) {
			var arr = new Array();
			var arrs = "";
			for(var i = 0; i < data.length; i++) {
				if(data[i] == ""){return;}
				arr[i] = data[i].OA_ID;
				arrs += data[i].OA_ID + ","
			}
			$('#heapManager').val(arr);
			$("#heapManager").trigger('chosen:updated');
			$('#heapId').val(arrs);
		}
	});

	// 直销渠道经理
	$.ajax({
		url: $.cxt + "/map/editHeapDirect",
		data: {orgId: overlays[0].orgId, userType: 4},
		type: "POST",
		async: false,
		success: function(data) {
			var arr = new Array();
			var arrs = "";
			for(var i = 0; i < data.length; i++) {
				if(data[i] == "") {return;}
				arr[i] = data[i].OA_ID;
				arrs += data[i].OA_ID + ",";
			}
			$('#directManager').val(arr);
			$("#directManager").trigger('chosen:updated');
			$('#directId').val(arrs);
		}
	});
	
	// 直销人员
	$.ajax({
		url: $.cxt + "/map/edit_sale_user",
		data: {areaid: nowOrgId, orgId: overlays[0].orgId, userType: 6},
		type: "POST",
		async: false,
		success: function(data) {
			var arr = new Array();
			var arrs = "";
			var html = "";
			for(var i = 0;i < data.length; i++) {
				if(data[i] == "") {return;}
				arr[i] = data[i].UID;		
				arrs += data[i].UID + ","
			}
			$('#direct_sale_user_info').val(arr);
			$("#direct_sale_user_info").trigger('chosen:updated');
			$('#direct_sale_user_infoId').val(arrs);
		}
	});
	
	// 装维人员
	$.ajax({
		url: $.cxt + "/map/editHeapDirect", 
		data: {orgId: overlays[0].orgId, userType: 7},
		type: "POST",
		async: false,
		success: function(data) {
			for(var i = 0;i < data.length; i++) {
				if(data[i] == "") {return;};
				name  =  data[i].NAME;
				phone =  data[i].PHONE;
				var m = $('<li class="search-choice"><span value="society' + num + '">' + name + "[" + phone + "]" + '</span></li>');
				var liLength = $("#ul_id li").length
				var a = $('<a class="search-choice-close society" data-option-array-index=\"' + (liLength + 1) + '\"></a>');
				m.append(a);
				var arval = new Object();
				arval.name = name;
				arval.phone = phone;
				creatArr["society" + num] = arval;		
				$("#ul_id").append(m);	
				$(".society").unbind("click");
				$(".society").click(function() {	
					var tm = $(this).parent();
					var mm = tm.children("span").attr("value");
					tm.remove();
					delete creatArr[mm];
				});
				num++;
			}
		}
	});
	
	// 销售经理人员
	$.ajax({
		url: $.cxt + "/map/editHeapDirect", 
		data: {orgId: overlays[0].orgId, userType: 8},
		type: "POST",
		async: false,
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i] == "") {return;}
				name  =  data[i].NAME;
				phone =  data[i].PHONE;
				var m = $('<li class="search-choice"><span  value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
				var liLength = $("#market_ul_id li").length
				var a = $('<a class="search-choice-close market" data-option-array-index=\"' + (liLength + 1) + '\"></a>');
				m.append(a);
				var arval = new Object();
				arval.name = name;
				arval.phone = phone;
				MarketArr["market" + othernum] = arval;
				$("#market_ul_id").append(m);
				$(".market").unbind("click");
				$(".market").click(function() {
					var tm = $(this).parent();
					var mm = tm.children("span").attr("value");
					tm.remove();
					delete MarketArr[mm];
				});
				othernum++;
			}
		}
	});
	$('#mapType').val(overlays[0].mapType);
	$("#mapType").trigger('chosen:updated');
	resetFontVal();
	setFontVal(overlays[0].mapColor);
}
	
function initGridSelect () {
	// 清空数组
	countryArr = [];
	countryArrMarker = [];
	addCountryNum = 0;

	$("#ul_id").empty();
	$("#market_ul_id").empty();
	creatArr = [];
	MarketArr = [];
	num = 0;
	othernum = 0;
	$.ajax({
		url: $.cxt + "/map/initName",
		data: {orgId: nowOrgId},
		async: false,
		success: function(json) {
			var Name = json[0].MYNAME;
			$("#Sname").html(Name);
		}
	});

	// CD政企客户经理
	$.ajax({
		url: $.cxt + "/map/initUser",  //LOGIN_ID AS OA_ID  GRID_USER_SELECT
		async: false,
		data: {userType: "2", orgId: nowOrgId},
		success: function(json) {
			var html = "<option value='mr'></option>";
			for(var i = 0; i < json.length; i++) {
				var temp = json[i]
				html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME + "[" + temp.OA_ID + "]" + "</option>";
			}
			$("#cdManager").html(html);
		}
	});
	
	// 网格经理
	$.ajax({
		url: $.cxt + "/map/initUser",
		async: false,
		data: {userType: "2", orgId: nowOrgId},
		success: function(json) {
			var html = "<option value='mr'></option>";
			var temp = null;
			for(var i = 0; i < json.length; i++) {
				temp = json[i];
				html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME + "[" + temp.OA_ID + "]" + "</option>";
			}
			$("#mapManager").html(html);
		}
	});

	// 社会渠道经理
	$.ajax({
		url: $.cxt + "/map/initUser",
		async: false,
		data: {userType: "1", orgId: nowOrgId},
		success: function(json) {
			var html = "";
			for(var i = 0; i < json.length; i++) {
				var temp = json[i]
				html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME + "[" + temp.OA_ID + "]" + "</option>";
			}
			$("#heapManager").html(html);
		}
	});
	
	// 直销渠道经理 （多选）
	$.ajax({
		url: $.cxt + "/map/initUser",
		async: false,
		data: {userType: "1", orgId: nowOrgId},
		success: function(json) {
			var html = "";
			for(var i = 0; i < json.length; i++) {
				var temp = json[i]
				html += "<option value=\"" + temp.OA_ID + "\">" + temp.USER_NAME + "[" + temp.OA_ID + "]" + "</option>";
			}
			$("#directManager").html(html);
		}
	});
	
	// 直销人员
	$.ajax({
		url: $.cxt + "/map/initsale_user", // 从直销人员表//i
		async: false,
		data: {userType: "6", orgId: nowOrgId},
		success: function(json) {
			var html = "";
			var temp = null;
			for(var i = 0; i < json.length; i++) {
				temp = json[i]
				html += "<option value=\"" + temp.UID + "\">" + temp.USER_NAME + "[" + temp.USER_NUMBER + "]" + "</option>";
			}
			/* $("#direct_sale_user_info").html(html);*/
		}
	});
	
	var reloadJqGrid = function(flag) {
		if(undefined == flag) {
			// 新增和修改的时候清空查询条件
			topclear('gridSearch');
		}
		$("#grid-table").jqGrid('setGridParam', {
	        postData: topgetObjByObj($("#gridSearch .searchField")),
	        page: 1
	    }).trigger("reloadGrid");
	}

	$.ajax({
		url: $.cxt + "/map/initType",
		async: false,
		type: "POST",
		success: function(json) {
			var html = "";
			var temp = null;
			for(var i = 0; i < json.length; i++) {
				temp = json[i];
				html += "<option value=\"" + temp.TYPE_ID + "\" color=\"" + temp.COLOR + "\">" + temp.TYPE_NAME + "</option>";
			}
			$("#mapType").html(html);
		}
	});
	
	// 弹出框
	$(".chosen-select").chosen();
	$(window).off('resize.chosen').on('resize.chosen', function() {
		$('.chosen-select').each(function() {
			var $this = $(this);
			$this.next().css({'width': $this.parent().width()});
		})
	}).trigger('resize.chosen');

	$.ajax({
		url: $.cxt + "/map/initData",
		data: {
			maxLng: overlays[0].getBounds().getNorthEast().lng,
			maxLat: overlays[0].getBounds().getNorthEast().lat,
			minLng: overlays[0].getBounds().getSouthWest().lng,
			minLat: overlays[0].getBounds().getSouthWest().lat,
			sharp: JSON.stringify(overlays[0].getPath()),
			orgId: nowOrgId
		},
		async: false,
		type: "POST",
		success: function(json) {
			dayCost = json.dayCost;
			customCost = json.customCost;
			villageCost = json.villageCost;
			groupCost = json.groupCost;
			channelCost = json.channelCost;
			stationCost	= json.stationCost;

			// 收入规模
			$('#dayCost').html(json.dayCost);
			// 客户规模
			$('#customCost').html( json.customCost);
			// 小区规模
			$('#villageCost').html(json.villageCost);
			// 集团规模
			$('#groupCost').html(json.groupCost);
			// 渠道规模
			$('#channelCost').html(json.channelCost);
			// 基站规模
			$('#stationCost').html(json.stationCost);

			poiList = json.poiList;
			channelList = json.channelList;
			stationList = json.stationList;

			var dayCostList = [];
			for(var i = 0, n = channelList.length; i < n; i++) {
				dayCostList.push(channelList[i]);
			}
			for(var i = 0, n = stationList.length; i < n; i++) {
				dayCostList.push(stationList[i]);
			}
			$('#dayCost').unbind("click");
			$('#dayCost').click(function() {
				topwindow.showWindow({
					title: '收入规模',
					data: {uids: dayCostList.join(",")},
					url: $.cxt + "/pages/gis/indexPage/dayCost.jsp",
					bottons: []
				})
			});
			$('#customCost').unbind("click");
			$('#customCost').click(function() {
				topwindow.showWindow({
					title: '客户规模',
					data: {uids: dayCostList.join(",")},
					url: $.cxt + "/pages/gis/indexPage/customCost.jsp",
					bottons: [{
						title : "关闭",
						fun: function() {
							topwindow.removeWindow();
						}
					}]
				});
			}) ;

			$('#villageCost').unbind("click");
	 		$('#villageCost').click(function() {
			topwindow.showWindow({
				title: '小区规模',
				data: {uids: poiList.join(",")},
					url: $.cxt + "/pages/gis/indexPage/villageCost.jsp",
					bottons: [{
						title: "关闭" ,
						fun: function() {
							topwindow.removeWindow();
						}
					}]
				});
	 		});

	 		$('#groupCost').unbind("click");
			$('#groupCost').click(function() {
				topwindow.showWindow({
					title: '集团规模',
					data: {uids: poiList.join(",")},
					url: $.cxt + "/pages/gis/indexPage/groupCost.jsp",
					bottons: [{
						title: "关闭" ,
						fun: function() {
							topwindow.removeWindow();
						}
					}]
				});
			});

			$('#channelCost').unbind("click");
	        $('#channelCost').click(function() {
				topwindow.showWindow({
					title: '渠道规模',
					data: {uids: channelList.join(",")},
					url: $.cxt + "/pages/gis/indexPage/channelCost.jsp",
					bottons: [{
						title: "关闭",
						fun: function() {
							topwindow.removeWindow();
						}
					}]
				});
			});

	        $('#stationCost').unbind("click");
	        $('#stationCost').click(function() {
				topwindow.showWindow({
					title: '基站规模',
					data: {uids: stationList.join(",")},
					url: $.cxt + "/pages/gis/indexPage/stationCost.jsp",
					bottons: [{
						title: "关闭" ,
						fun: function() {
							topwindow.removeWindow();
						}
					}]
				});
	        });
		}
	});
}

function showLoading() {
	$("#loadingDiv").show();
}

function initLoading() {
	var bodyHeight = $(window).height();	        					
	var loading="<div class='modal-backdrop fade in' id='loadingDiv' style='display: none; height: " + bodyHeight + "px; width: 100%; position: fixed; z-index: 99999; text-align: center; line-height: " + bodyHeight + "px;'></div>";
	$("body").append(loading);
	$.fn.spin = function(opts) {
		this.each(function() {
			var $this = $(this),
			data = $this.data();
			data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
		});
		return this;
	};
    $("#loadingDiv").spin({
    	lines: 12,      
        length: 7,           
        width: 5
    })    			  
}

function validate() {
	phone = $("#inputPhone").val();
	if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
		return true;
	} else {
		return false;
	}
}

function validate1() {
	phone = $("#inputPhoneMarket").val()
	if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
		return true;
	} else {
		return false;
	}
}

function validate2() {
	phone = $("#inputPhoneMarkets").val();
	if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
		return true;
	} else {
		return false;
	}
}

function validate3() {
	phone = $("#inputPhones").val();
	if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
		return true;
	} else {
		return false;
	}
}

// 基站导出模板-基站信息json封装
$("#stationExport").on("click", stationExport);
function stationExport() {
	// 拼接到一个text标签中
	var html = "<input type='text' value='" + $("#stationInputId").val() +"' name='stationName' />";
	// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
	$('<form method="POST" action="' + $.cxt + '/map/addStationInfo">' + html + '</form>').appendTo('body').submit().remove();
}

// 导出渠道模板
$("#addChannel_info").on("click", addChannel_info);
function addChannel_info() {
	window.location.href = $.cxt + "/map/addChannelInfo";
}

// 导出直销人员模板
$("#addDirect_user").on("click", addDirect_user);
$("#addDirect_users").on("click", addDirect_user);
function addDirect_user() {
	window.location.href = $.cxt + "/map/downDirect_user";
}
// 导出直销经理模板
$("#addMarketManager").on("click", addMarketManager);
$("#addMarketManagers").on("click", addMarketManager);
function addMarketManager() {
	window.location.href = $.cxt + "/map/downMarketManager";
}

// 导出经理模板
$("#addSocietyManager").on("click", addSocietyManager);
$("#addSocietyManagers").on("click", addSocietyManager);
function addSocietyManager() {
	window.location.href = $.cxt + "/map/downSocietyManager";
}

// 导入基站excel文件，到后台数据库进行匹配基站，返回数据库存在的基站信息，调用凸包算法把基站信息画起来
$("#improtexcelDirStation").on("click", improtexcelDirStation);
function improtexcelDirStation() {
	var param = {};
	// 提示没有选择文件
	if($("#stationFileDir").val() == "") {
  		messageAlert("请选择上传的数据文件");
  		return;
  	}
  	var fileExtension = $("#stationFileDir").val().split('.').pop().toLowerCase();
  	// 提示选择文件大小不能超过30M
  	if(getFileSize("stationFileDir") > 30) {
  		messageAlert("数据文件不能大于30M");
  		return;
  	}
  	// 提示选择文件类型
  	if(fileExtension != "xls") {
  		messageAlert("请选择2003版excel");
  		return;
  	}
	$('#mapManagers').val('');
	$("#mapManagers").trigger('chosen:updated');
	$('#cdManagers').val('');
	$("#cdManagers").trigger('chosen:updated');
	$('#heapManagers').val('');
	$("#heapManagers").trigger('chosen:updated');
	$('#directManagers').val('');
	$("#directManagers").trigger('chosen:updated');
	$('#direct_sale_user_info').empty();
	$("#ul_id").empty();
	$("#market_ul_id").empty();
	// 如果原来有基站信息，则先删除
	$(".stationInfos").remove();
	$("#upformStation").submit();
	return;
}

// 基站导入excel直销人员信息
$("#improtexcelStationDir").on("click", improtexcelStationDir);
function improtexcelStationDir() {
	var param = {};
	if($("#kpiStationFileDir").val() == "") {
		messageAlert("请选择上传的数据文件");
		return;
	}	
	var fileExtension = $("#kpiStationFileDir").val().split('.').pop().toLowerCase();
	if(getFileSize("kpiStationFileDir") > 30) {
		messageAlert("数据文件不能大于30M");
		return;
	}
	if(fileExtension != "xls") {
		messageAlert("请选择2003版excel");
		return ;
	}
    $("#upformDirStation").submit();
    return;
}

// 直销人员Excel导入
$("#improtexcelDir").on("click", improtexcelDir);
function improtexcelDir() {
	var param = {};
	if($("#kpiFileDir").val() == "") {
		messageAlert("请选择上传的数据文件");
		return;
	}
	var fileExtension = $("#kpiFileDir").val().split('.').pop().toLowerCase();
	if(getFileSize("kpiFileDir") > 30) {
		messageAlert("数据文件不能大于30M");
		return;
	}
	if(fileExtension != "xls") {
		messageAlert("请选择2003版excel");
		return ;
	}
    $("#upformDir").submit();
    return;
}

// 基站导入excel销售经理信息
$("#improtexcelStationMarket").on("click", improtexcelStationMarket);
function improtexcelStationMarket() {
	var param = {};
	if($("#kpiFileStationMarket").val() == "") {
 		messageAlert("请选择上传的数据文件");
 		return;
 	}
 	var fileExtension = $("#kpiFileStationMarket").val().split('.').pop().toLowerCase();
 	if(getFileSize("kpiFileStationMarket") > 30) {
 		messageAlert("数据文件不能大于30M");
 		return;
	}
 	if(fileExtension != "xls") {
 		messageAlert("请选择2003版excel");
 		return ;
 	}
	$("#upformStationMatket").submit();
    return;
}

// 销售经理Excel导入
$("#improtexcelMarket").on("click", improtexcelMarket);
function improtexcelMarket() {
	var param = {};
	if($("#kpiFileMarket").val() == "") {
 		messageAlert("请选择上传的数据文件");
 		return;
 	}
 	var fileExtension = $("#kpiFileMarket").val().split('.').pop().toLowerCase();
 	if(getFileSize("kpiFileMarket") > 30) {
 		messageAlert("数据文件不能大于30M");
 		return;
	} 
 	if(fileExtension != "xls") {
 		messageAlert("请选择2003版excel");
 		return ;
 	}
	$("#upformMatket").submit();
    return;
}

// 基站导入excel装维人员信息
$("#improtexcelStationSoc").on("click", improtexcelStationSoc);
function improtexcelStationSoc() {
	var param = {};
	if($("#kpiFileStationSoc").val() == "") {
		messageAlert("请选择上传的数据文件");
		return;
	}
 	var fileExtension = $("#kpiFileStationSoc").val().split('.').pop().toLowerCase();
 	if(getFileSize("kpiFileStationSoc") > 30) {
 		messageAlert("数据文件不能大于30M");
 		return;
	}
 	if(fileExtension != "xls") {
 		messageAlert("请选择2003版excel");
 		return ;
 	}
	$("#upformStationDSoc").submit();
    return;
}

// 网格划分导入excel装维人员信息
$("#improtexcelSoc").on("click", improtexcelSoc);
function improtexcelSoc() {
	var param = {};
	if($("#kpiFileSoc").val() == "") {
		messageAlert("请选择上传的数据文件");
		return;
	}
 	var fileExtension = $("#kpiFileSoc").val().split('.').pop().toLowerCase();
 	if(getFileSize("kpiFileSoc") > 30) {
 		messageAlert("数据文件不能大于30M");
 		return;
	}
	if(fileExtension != "xls") {
 		messageAlert("请选择2003版excel");
 		return ;
 	}
	$("#upformDSoc").submit();
    return;
}

// 基站导入excel销售经理信息
function getJspStationMarketDate(obj) {
	for (var username in obj) {
		if(username != "") {
			var arval = new Object();
			var name = '';
			var phone = '';
			phone = obj[username];
			name = username;
			arval.name = username;
			arval.phone = phone;
			var m = $('<li class="search-choice"><span  value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
			var liLength = $("#market_ul_ids li").length;
			var a = $('<a class="search-choice-close markt" data-option-array-index=\"'+ (liLength + 1) + '\"></a>');
			MarketArr["market" + othernum] = arval;
			m.append(a);
			$("#market_ul_ids").append(m);
			othernum++;
		}
		$(".markt").unbind("click");
		$(".markt").click(function() {
			var tm = $(this).parent();
			var mm = tm.children("span").attr("value");
			tm.remove();
			delete MarketArr[mm];
		});
	}
}

// 网格划分导入excel销售经理信息
function getJspDat(obj) {
	for(var username in obj) {
		if(username != "") {
			var arval = new Object();
			var name = '';
			var phone = '';
			phone = obj[username];
			name = username;
			arval.name = username;
			arval.phone = phone;
			var m = $('<li class="search-choice"><span  value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
			var liLength = $("#market_ul_id li").length;
			var a = $('<a class="search-choice-close markt" data-option-array-index=\"'+ (liLength + 1) + '\"></a>');
			MarketArr["market" + othernum] = arval;
			m.append(a);
			$("#market_ul_id").append(m);
			othernum++;
		}
		$(".markt").unbind("click");
		$(".markt").click(function() {
			var tm = $(this).parent();
			var mm = tm.children("span").attr("value");
			tm.remove();
			delete MarketArr[mm];
		});
	}
}

// 基站导入excel直销人员信息
function getJspStationDateDir(obj) {
	for(var username in obj) {
		if(username != "") {
			var arval = new Object();
			var name = '';
			var phone = '';
			phone = obj[username];
			name = username;
			arval.name = username;
			arval.phone = phone;
			var m = $('<li class="search-choice"><span value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
			var liLength = $("#direct_sale_user_infos li").length;
			var a = $('<a class="search-choice-close markt" data-option-array-index=\"'+ (liLength + 1) + '\"></a>');
			MarketArr["market" + othernum] = arval;
			m.append(a);
			$("#direct_sale_user_infos").append(m);
			othernum++;
		}
		$(".markt").unbind("click");
		$(".markt").click(function() {
			var tm = $(this).parent();
			var mm = tm.children("span").attr("value");
			tm.remove();
			delete MarketArr[mm];
		});
	}
}

// 网格划分导入excel直销人员信息
function getJspDateDir(obj) {
	for(var username in obj) {
		if(username != "") {
			var arval = new Object();
			var name = '';
			var phone = '';
			phone = obj[username];
			name = username;
			arval.name = username;
			arval.phone = phone;
			var m = $('<li class="search-choice"><span value="market' + othernum + '">' + name + "[" + phone + "]" + '</span></li>');
			var liLength = $("#direct_sale_user_info li").length;
			var a = $('<a class="search-choice-close markt" data-option-array-index=\"'+ (liLength + 1) + '\"></a>');
			MarketArr["market" + othernum] = arval;
			m.append(a);
			$("#direct_sale_user_info").append(m);
			othernum++;
		}
		$(".markt").unbind("click");
		$(".markt").click(function() {
			var tm = $(this).parent();
			var mm = tm.children("span").attr("value");
			tm.remove();
			delete MarketArr[mm];
		});
	}
}

// 	直销人员之前是多选下拉框，现在不用了，用上面那个
//	function getJspDateDir (obj){
//		var arr = [];
//		var arrB =   $('#direct_sale_user_info').attr("value");
//		arr[0]=arrB;
//		$('#direct_sale_user_info').val("");
//		var numpp=1;
//	 	
//		for(var uid in obj){
//			arr[numpp]=uid;
//			numpp++;
//		}
///*	 	  $('#direct_sale_user_info').html(html);
// * 		
//*/	 	  
//		$('#direct_sale_user_info').val(arr);
//		$("#direct_sale_user_info").trigger('liszt:updated');
//		$("#direct_sale_user_info").chosen();
//	}

// 读取excel文件后，传回来的网格信息，基站信息进行封装，展示到界面
function getJspDateStation(obj, gridObj, errorMsg, message) {
	if("SUCCESS" != message) {
		if("GRID_REPEAT" == message) 
			messageAlert("导入的Excel归属网格：【" + errorMsg.gridName + "】已存在，请重新导入！");
		else if("GRID_NONE" == message)
			messageAlert("导入的Excel没有填写归属网格信息，请重新导入！");
		else if("STATION_REPEAT" == message)
			messageAlert("导入的Excel基站信息：【" + errorMsg.stationName + "[" + errorMsg.stationCode + "]】已有归属网格，请重新导入！");
		else 
			messageAlert("导入的Excel没有基站信息，请重新导入！");
		return;
	}
	// 拼接网格选择下拉框
	var gridHtml = "<option value=''>请选择</option>";
	for(var i = 0; i < gridObj.length; i++) {
		gridHtml += "<option value='" + gridObj[i].gridName + "'>" + gridObj[i].gridName + "</option>";
	}
	$("#gridName").html(gridHtml);

	// 将基站信息封装成json字符串，保存到一个隐藏标签中
	var stationInfoList = "[";
	for(var i = 0; i < obj.length; i++) {
		if(i != obj.length - 1) {
			stationInfoList += "{\"stationCode\":\"" + obj[i].stationCode + "\", \"stationName\":\"" + obj[i].stationName + "\", \"stationLon\":\"" 
				+ obj[i].stationLon + "\", \"stationLat\":\"" + obj[i].stationLat + "\", \"gridName\":\"" + obj[i].gridName + "\"},";
		} else {

			stationInfoList += "{\"stationCode\":\"" + obj[i].stationCode + "\", \"stationName\":\"" + obj[i].stationName + "\", \"stationLon\":\"" 
				+ obj[i].stationLon + "\", \"stationLat\":\"" + obj[i].stationLat + "\", \"gridName\":\"" + obj[i].gridName + "\"}";
		}
	}
	stationInfoList += "]";
	$("#stationInfoList").val(stationInfoList);
	var areaLayer = new BMapLib.AreaLayer(nowOrgId);  
	map.addOverlay(areaLayer);
	areaLayerList = areaLayer.getOverlayList();
	showLoading();
	window.setTimeout(doSubmit,100);
	function doSubmit() {
		createStationModel();
	}
}

// 下拉框改变，读取封装在隐藏标签中的基站信息，将基站信息以table形式展示出来
$("#gridName").on("change", changeGridInfo);
function changeGridInfo() {
	// 如果原来有基站信息，则先删除
	$(".stationInfos").remove();
	// 获取基站信息封装在隐藏标签中的值
	var stationInfoList = JSON.parse($("#stationInfoList").val());
	// 获取网格信息下拉框选中的值
	var gridName = $("#gridName option:selected").text();
	var stationInfoHtml = "";
	// 开始拼接所属网格的基站信息
	for(var i=0;i<stationInfoList.length;i++) {
		if(gridName == stationInfoList[i].gridName) {
			stationInfoHtml += "<tr class='stationInfos'><td>" + stationInfoList[i].stationCode + "</td>";
			stationInfoHtml += "<td>" + stationInfoList[i].stationName + "</td></tr>";
		}
	}
	// 封装完成，将基站信息放到table中展示
	$("#stationTitleInfo").html(stationInfoHtml);
	$('#mapManagers').val('');
	$("#mapManagers").trigger('chosen:updated');
	$('#cdManagers').val('');
	$("#cdManagers").trigger('chosen:updated');
	$('#heapManagers').val('');
	$("#heapManagers").trigger('chosen:updated');
	$('#directManagers').val('');
	$("#directManagers").trigger('chosen:updated');
	$("#direct_sale_user_infos").val('');
	$("#market_ul_ids").val('');
	$("#ul_ids").val('');
}

// 初始化CD政企客户经理、网格经理、社会渠道经理、直销渠道经理多选下拉框组件
function initGridManagerSelect() {
	// CD政企客户经理
	$.ajax({
		url: $.cxt + "/map/initUser",
		async: false,
		data: {userType: "2", orgId: nowOrgId},
		success: function(json) {
			var html = "<option value='mr'></option>";
			for(var i = 0; i < json.length; i++) {
				html += "<option value=\"" + json[i].OA_ID + "\">" + json[i].USER_NAME + "[" + json[i].OA_ID + "]" + "</option>";
			}
			$("#cdManagers").html(html);
		}
	})
	// 网格经理
	$.ajax({
		url: $.cxt + "/map/initUser",
		async: false,
		data: {userType: "2", orgId: nowOrgId},
		success: function(json) {
			var html = "<option value='mr'></option>";
			for(var i = 0; i < json.length; i++) {
				html += "<option value=\"" + json[i].OA_ID + "\">" + json[i].USER_NAME + "[" + json[i].OA_ID + "]" + "</option>";
			}
			$("#mapManagers").html(html);
		}
	});
	// 社会渠道经理
	$.ajax({
		url: $.cxt + "/map/initUser",
		async: false,
		data: {userType: "1", orgId: nowOrgId},
		success: function(json) {
			var html = "";
			for(var i = 0; i < json.length; i++) {
				html += "<option value=\"" + json[i].OA_ID + "\">" + json[i].USER_NAME + "[" + json[i].OA_ID + "]" + "</option>";
			}
			$("#heapManagers").html(html);
		}
	});
	// 直销渠道经理 （多选）
	$.ajax({
		url: $.cxt + "/map/initUser",
		async: false,
		data: {userType: "1", orgId: nowOrgId},
		success: function(json) {
			var html = "";
			for(var i = 0; i < json.length; i++) {
				html += "<option value=\"" + json[i].OA_ID + "\">" + json[i].USER_NAME + "[" + json[i].OA_ID + "]" + "</option>";
			}
			$("#directManagers").html(html);
		
		}
	});
	var reloadJqGrid = function(flag) {
		if(flag == undefined) {
			//新增和修改的时候清空查询条件
			topclear('gridSearch');
		}
		$("#grid-table").jqGrid('setGridParam',{
	        postData: topgetObjByObj($("#gridSearch .searchField")),
	        page: 1
	    }).trigger("reloadGrid");
	}
	//弹出框
	$(".chosen-select").chosen();
	$(window).off('resize.chosen').on('resize.chosen', function() {
		$('.chosen-select').each(function() {
			var $this = $(this);
			$this.next().css({'width': $this.parent().width()});
		});
	}).trigger('resize.chosen');
}

// 将弹出框给展示出来，将里面的字段进行初始化
function createStationModel() {
	// 获取个位置的下拉框的内容
	initGridManagerSelect();
	hideLoading();
	edit = 0;
	$('#modal-station .modal-title').empty();
	$('#modal-station .modal-title').append($('<i></i>').addClass("ace-icon fa fa-users")).append("基站归属网格信息保存");
	$('#modal-station').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
	document.getElementById("mapForm").reset();
	$('#orgId').val('');	
	$('#userId').val('');
	$('#busiId').val('');
	$('#cdId').val('');
	$('#heapId').val('');
	$('#directId').val('');
	$('#direct_sale_user_infoId').val('');
	$('#societyId').val('');
	$('#mapManagers').val('');
	$("#mapManagers").trigger('chosen:updated');
	$('#cdManagers').val('');
	$("#cdManagers").trigger('chosen:updated');
	$('#heapManagers').val('');
	$("#heapManagers").trigger('chosen:updated');
	$('#directManagers').val('');
	$("#directManagers").trigger('chosen:updated');
	$("#color").val('#995cb0');
	$('#mapType').val('1');
	resetFontVal();
}

// 基站导入excel装维人员信息
function getJspDateStationSoc(obj) {
	for(var username in obj) {
		if(username != "") {
			var arval = new Object();
			var name = '';
			var phone = '';
			phone = obj[username];
			name = username;
			arval.name = username;
			arval.phone = phone;
			var m = $('<li class="search-choice pull-left"><span  value="society' + num + '">' + name + "[" + phone + "]" + ' </span></li>');
			var liLength = $("#ul_ids li").length;
			var a = $('<a class="search-choice-close society" data-option-array-index=\"' + (liLength + 1) + '\"></a>');
			m.append(a);
			var arval = new Object();
			arval.name = name;
			arval.phone = phone;
			creatArr["society" + num] = arval;
			$("#ul_ids").append(m);
			num++;
		}
		$(".society").unbind("click");
		$(".society").click(function() {
			var tm = $(this).parent();
			var mm = tm.children("span").attr("value");
			tm.remove();
			delete creatArr[mm];
		});
	}
}

// 网格划分导入excel装维人员信息
function getJspDateSoc(obj) {
	for(var username in obj) {
		if(username != "") {
			var arval = new Object();
			var name = '';
			var phone = '';
			phone = obj[username];
			name = username;
			arval.name = username;
			arval.phone = phone;
			var m = $('<li class="search-choice pull-left"><span  value="society' + num + '">' + name + "[" + phone + "]" + ' </span></li>');
			var liLength = $("#ul_id li").length;
			var a = $('<a class="search-choice-close society" data-option-array-index=\"' + (liLength + 1) + '\"></a>');
			m.append(a);
			var arval = new Object();
			arval.name = name;
			arval.phone = phone;
			creatArr["society" + num] = arval;
			$("#ul_id").append(m);
			num++;
		}
		$(".society").unbind("click");
		$(".society").click(function() {
			var tm = $(this).parent();
			var mm = tm.children("span").attr("value");
			tm.remove();
			delete creatArr[mm];
		});
	}
}

function getFileSize(eleId) {
	try {
		var size = 0;
		// byte
		size = $('#' + eleId)[0].files[0].size;
		// kb
		size = size / 1024;
		// mb
		size = size / 1024;
		return size;
	} catch (e) {
		alert("错误：" + e);
		return -1;
	}
}

function hideLoading() {
	$("#loadingDiv").hide();
}

// 点击村镇网格^收缩，把基站和村镇的收缩的div显示出来
$("#upToggle").on("click", upToggle);
function upToggle() {
	$("#clearfixInfo").toggle("blind", null, 0);
	$("#gridContainerAdd").toggle("blind", null, 0);
	$("#downToggleDiv").css("display", "block");
	$("#downStationToggleDiv").css("display", "block");
	$("#downExportToggleDiv").css("display", "block");
	$("#stationDiv").css("display", "none");
	$("#exportDiv").css("display", "none");
}

// 点击村镇网格v伸展，把基站信息显示，还要单独设置一些grid的样式
$("#downToggle").on('click', downToggle);
function downToggle() {
	$("#clearfixInfo").toggle("blind", null, 0);
	$("#gridContainerAdd").toggle("blind", null, 0);
	$("#downToggleDiv").css("display", "none");
	$("#downStationToggleDiv").css("display", "none");
	$("#downExportToggleDiv").css("display", "none");
	$("#stationDiv").css("display", "none");
	$("#exportDiv").css("display", "none");
	$(".ui-jqgrid-bdiv").removeAttr("id");
	$(".ui-jqgrid-bdiv").attr("id", "ui-jqgrid-bdiv-infos");
	$("#ui-jqgrid-bdiv-infos").css('height', '81%');
	$("#AddcountryMapTable").parent().parent().css("height", "59.7%");
}

// 点击基站网格^收缩，把基站和村镇的收缩的div显示出来
$("#upStationToggle").on("click", upStationToggle);
function upStationToggle() {
	$("#stationDiv").toggle("blind", null, 0);
	$("#clearfixInfo").css("display", "none");
	$("#gridContainerAdd").css("display", "none");
	$("#downToggleDiv").css("display", "block");
	$("#downStationToggleDiv").css("display", "block");
	$("#downExportToggleDiv").css("display", "block");
	$("#stationDiv").css("display", "none");
	$("#exportDiv").css("display", "none");
}

// 点击基站网格v伸展，把基站信息显示，还要单独设置一些grid的样式
$("#downStationToggle").on("click", downStationToggle);
function downStationToggle() {
	$("#stationDiv").toggle("blind", null, 0);
	$("#clearfixInfo").css("display", "none");
	$("#exportDiv").css("display", "none");
	$("#gridContainerAdd").css("display", "none");
	$("#downToggleDiv").css("display", "none");
	$("#downStationToggleDiv").css("display", "none");
	$("#downExportToggleDiv").css("display", "none");
	$(".ui-jqgrid-bdiv").removeAttr("id");
	$(".ui-jqgrid-bdiv").attr("id", "ui-jqgrid-bdiv-infos");
	$("#ui-jqgrid-bdiv-infos").css('height', '90.2%');
}

// 点击基站网格^收缩，把基站和村镇的收缩的div显示出来
$("#upExportToggle").on("click", upExportToggle);
function upExportToggle() {
	$("#exportDiv").toggle("blind", null, 0);
	$("#clearfixInfo").css("display", "none");
	$("#gridContainerAdd").css("display", "none");
	$("#downToggleDiv").css("display", "block");
	$("#downStationToggleDiv").css("display", "block");
	$("#downExportToggleDiv").css("display", "block");
	$("#stationDiv").css("display", "none");
}

// 点击基站网格v伸展，把基站信息显示，还要单独设置一些grid的样式
$("#downExportToggle").on("click", downExportToggle);
function downExportToggle() {
	$("#exportDiv").toggle("blind", null, 0);
	$("#clearfixInfo").css("display", "none");
	$("#stationDiv").css("display", "none");
	$("#gridContainerAdd").css("display", "none");
	$("#downToggleDiv").css("display", "none");
	$("#downStationToggleDiv").css("display", "none");
	$("#downExportToggleDiv").css("display", "none");
	$(".ui-jqgrid-bdiv").removeAttr("id");
	$(".ui-jqgrid-bdiv").attr("id", "ui-jqgrid-bdiv-infos");
	$("#ui-jqgrid-bdiv-infos").css('height', '90.2%');
}

// 点击基础周边的按钮事件
$(".poiSpan").on("click", poiSpan);
function poiSpan() {
	// 定义颜色组进行判断
	var colorSpan = ['#AD7AE1', '#DAA520', '#5BBAD3', '#FA6467', '#69C260', '#FD8A58', '#27AFFF'];
	// 获取选择的周边基础单元
	var hiddenValue = $(this).find("input:hidden").val();
	// 获取选择的周边基础单元名称
	var poiName = hiddenValue.split("_")[0];
	// 获取选择的周边基础单元下标，供颜色选择使用
	var poiNum = hiddenValue.split("_")[1];
	// 定义周边基础单元的渲染对象
	var poiInfo = null;
	// 判断是否隐藏
	if($(this).find("font").is(':hidden')) {
		// 隐藏了则显示
		$(this).find("font").css("display", "block");
		$(this).css("background-color", colorSpan[poiNum]);
		if(poiName == "channel") {
			// 把周边渠道的样式给还原
			$("#allChannelPoiFont").css("display", "none");
			$("#allChannelPoiSpan").css("background-color", "#FFEFD5");
			// 根据渠道开关，显示设置范围内的渠道信息
			poiInfo = new BMapLib.ChannelLayer($("#setRange").val(), $("#poiUId").val(), poiName, "PART", null);
		} else if(poiName == "station") {
			// 把周边渠道的样式给还原
			$("#allStationPoiFont").css("display", "none");
			$("#allStationPoiSpan").css("background-color", "#FFEFD5");
			// 根据基站开关，显示设置范围内的基站信息
			poiInfo = new BMapLib.StationLayer($("#setRange").val(), $("#poiUId").val(), poiName, "PART", null);
		} else if(poiName == "mall") {
			// 根据商场开关，显示设置范围内的商场信息
			poiInfo = new BMapLib.MallLayer($("#setRange").val(), $("#poiUId").val(), poiName, null);
		} else if(poiName == "school") {
			// 根据学校开关，显示设置范围内的学校信息
			poiInfo = new BMapLib.NewSchoolLayer($("#setRange").val(), $("#poiUId").val(), poiName, null);
		} else if(poiName == "village") {
			// 根据村庄开关，显示设置范围内的村庄镇信息
			poiInfo = new BMapLib.VillageLayer($("#setRange").val(), $("#poiUId").val(), poiName, null);
		} else if(poiName == "town") {
			// 根据乡镇开关，显示设置范围内的乡镇信息
			poiInfo = new BMapLib.TownLayer($("#setRange").val(), $("#poiUId").val(), poiName, null);
		} else if(poiName == "market") {
			// 根据市场开关，显示设置范围内的市场信息
			poiInfo = new BMapLib.MarketLayer($("#setRange").val(), $("#poiUId").val(), poiName, null);
		} else if(poiName == "allChannel") {
			// 把周边渠道的样式给还原
			$("#channelPoiFont").css("display", "none");
			$("#channelPoiSpan").css("background-color", "#FFEFD5");
			// 根据渠道开关，显示设置范围内的渠道信息
			poiInfo = new BMapLib.ChannelLayer(null, null, poiName, "ALL_CHANNEL", null);
		} else if(poiName == "allStation") {
			// 把周边基站的样式给还原
			$("#stationPoiFont").css("display", "none");
			$("#stationPoiSpan").css("background-color", "#FFEFD5");
			// 根据基站开关，显示设置范围内的基站信息
			poiInfo = new BMapLib.StationLayer(null, null, poiName, "ALL_STATION", null);
		} else if(poiName == "allBroadband") {
			
		}
	} else {
		// 显示则隐藏
		$(this).find("font").css("display", "none");
		$(this).css("background-color", "#FFEFD5");
		if(poiName == "channel") {
			// 根据渠道开关，隐藏渠道信息
			poiInfo = new BMapLib.ChannelLayer(null, null, null, "PART", null);
		} else if(poiName == "station") {
			// 根据基站开关，隐藏基站信息
			poiInfo = new BMapLib.StationLayer(null, null, null, "PART", null);
		} else if(poiName == "mall") {
			// 根据商场开关，隐藏商场信息
			poiInfo = new BMapLib.MallLayer(null, null, null, null);
		}  else if(poiName == "school") {
			// 根据学校开关，隐藏学校信息
			poiInfo = new BMapLib.NewSchoolLayer(null, null, null, null);
		} else if(poiName == "village") {
			// 根据村庄开关，隐藏村庄信息
			poiInfo = new BMapLib.VillageLayer(null, null, null, null);
		} else if(poiName == "town") {
			// 根据乡镇开关，隐藏乡镇信息
			poiInfo = new BMapLib.TownLayer(null, null, null, null);
		} else if(poiName == "market") {
			// 根据市场开关，隐藏市场信息
			poiInfo = new BMapLib.MarketLayer(null, null, null, null);
		} else if(poiName == "allChannel") {
			// 根据渠道开关，隐藏渠道信息
			poiInfo = new BMapLib.ChannelLayer(null, null, null, "ALL_CHANNEL", null);
		} else if(poiName == "allStation") {
			// 根据基站开关，隐藏基站信息
			poiInfo = new BMapLib.StationLayer(null, null, null, "ALL_STATION", null);
		}
	}
	// 将周边基础单元的渲染对象放入map中
	map.addOverlay(poiInfo);
}

//百度地图搜索框搜索出内容，点击事件（该做法为先有事件，后有节点操作，否则直接用$(".addrssList").onclick(function(){});这种方式没有响应）
$('body').on('click', '.addressList', initClickInfo);
function initClickInfo() {
	$("#poiUId").val("");
	// 获取地图左表的UID
	var uId = ($(this).find("span").attr("id") || "").split("_")[1];
	$("#poiUId").val(uId);
	var poiInfo = "";
	var num = 0;
	// 获取到所有的选择了的基础单元信息
	$.each($(".poiAreaList"), function() {
		if(!$(this).find("font").is(':hidden')) {
			poiInfo += $(this).find("input:hidden").val().split("_")[0] + ",";
		}
	});
	// 三目非空判断
	poiInfo = "" != poiInfo ? poiInfo.substring(0, poiInfo.length - 1) : "";
	// 获取"范围设置"的值
	var setRange = $("#setRange").val();
	// 三目非空判断
	var poiInfos = "" != poiInfo ? poiInfo.split(",") : "";
	// 判断是否有选择周边基础单元
	if(null != poiInfos && "" != poiInfos && poiInfos.length > 0) {
		for(var i = 0; i < poiInfos.length; i++) {
			// 判断是否渠道
			if("channel" == poiInfos[i]) {
				// 将渠道信息在地图上展现出来
				var channelLayer = new BMapLib.ChannelLayer(setRange, uId, poiInfos[i], "PART", null);
				map.addOverlay(channelLayer);
			}
			// 判断是否基站
			if("station" == poiInfos[i]) {
				// 将基站信息在地图上展现出来
				var stationLayer = new BMapLib.StationLayer(setRange, uId, poiInfos[i], "PART", null);
				map.addOverlay(stationLayer);
			}
			// 判断是否商场（超市，商铺）
			if("mall" == poiInfos[i]) {
				// 将商场信息在地图上展现出来
				var mallLayer = new BMapLib.MallLayer(setRange, uId, poiInfos[i], null);
				map.addOverlay(mallLayer);
			}
			// 判断是否小区
			if("community" == poiInfos[i]) {
				// 将小区信息在地图上展现出来
			}
			// 判断是否校园
			if("school" == poiInfos[i]) {
				// 将校园信息在地图上展现出来
				var schoolLayer = new BMapLib.NewSchoolLayer(setRange, uId, poiInfos[i], null);
				map.addOverlay(schoolLayer);
			}
			// 判断是否村庄
			if("village" == poiInfos[i]) {
				// 将村庄信息在地图上展现出来
				var villageLayer = new BMapLib.VillageLayer(setRange, uId, poiInfos[i], null);
				map.addOverlay(villageLayer);
			}
			// 判断是否乡镇
			if("town" == poiInfos[i]) {
				// 将乡镇信息在地图上展现出来
				var townLayer = new BMapLib.TownLayer(setRange, uId, poiInfos[i], null);
				map.addOverlay(townLayer);
			}
			// 判断是否聚类市场
			if("market" == poiInfos[i]) {
				// 将聚类市场在地图上展现出来
				var marketLayer = new BMapLib.MarketLayer(setRange, uId, poiInfos[i], null);
				map.addOverlay(marketLayer);
			}
		}
	}
}

$("#checkAllPoiInfo").on("change", checkAllPoiInfo);
function checkAllPoiInfo() {
	if ($("#checkAllPoiInfo").prop("checked")) { 
		// 全选
        $("input[type='checkbox'][name='exportInfos']").prop("checked",true);
    } else { 
    	// 取消全选     
        $("input[type='checkbox'][name='exportInfos']").prop("checked",false);
    }  
}

// 网格导出功能
$("#exportGridInfo").on("click", exportGridInfo);
function exportGridInfo() {
	var gridInfos = [];
	var gridCode = $("#gridInfos option:selected").val();
	var gridName = $("#gridInfos option:selected").text();
	// 循环遍历复选框的值
	$.each($('input[name="exportInfos"]:checked'),function(i){
		gridInfos[i] = $(this).val();
    });
	// 判断是否有选择基础单元信息，没有选择则提示选择
	if(null == gridInfos || gridInfos.length == 0 || undefined == gridInfos) {
		messageAlert("请选择要导出的基础单元!");
	} else {
		// 拼接到一个text标签中
		var html = "<input type='text' value='" + gridInfos +"' name='gridInfos' />";
		html += "<input type='text' value='" + gridCode + "' name='gridCode' />";
		html += "<input type='text' value='" + gridName + "' name='gridName' />";
		// 封装一个form表单，将上面的text标签给放进去，以POST方式提交，这样无论json串有多长，都可以进行提交，不会报request提交的字符串太长，最后在调用remove()方法移除这个form表单
		$('<form method="POST" action="' + $.cxt + '/map/exportGridInfo">' + html + '</form>').appendTo('body').submit().remove();
	}
}

// 小区管理
$("#communityManagerSpan").on("click", communityManagerSpan);
function communityManagerSpan() {
	if($(this).find("font").is(':hidden')) {
		// 把周边基站的样式给还原
		$(this).find("font").css("display", "block");
		$(this).css("background-color", "#7A67EE");
		// 获取所有的地图覆盖物
		var allOverlay = map.getOverlays();
		// 判断是否是选择的基础单元，然后先将整个基础单元的信息给移除，再新增加周边基础单元信息
		for(var i = 0; i < allOverlay.length; i++) {
	    	if(null != allOverlay[i].mapName || null != allOverlay[i].layer || null != allOverlay[i].canvas) {
	    		map.removeOverlay(allOverlay[i]);
	    	}
	    }
		// 把右侧基站、乡镇、导出基础单元隐藏
		$("#downStationToggleDiv").css("display", "none");
		$("#downToggleDiv").css("display", "none");
		$("#downExportToggleDiv").css("display", "none");
		$("#checkCommunityManager").val("true");
		// 小区边界信息
		var poiLayer = new BMapLib.PoiLayer(nowOrgId, "true");
		map.addOverlay(poiLayer);
		
		// 小区坐标点信息
		var poiCommunityLayer = new BMapLib.PoiCommunityLayer(nowOrgId, "true");
		map.addOverlay(poiCommunityLayer);
		
		// 加载小区轮廓信息
		$("#pids").val(nowOrgId);
		$.ajax({
			url: $.cxt + "/map/initCommunityMap",
			data: {pid: nowOrgId},
			type: "POST",
			success: function(data) {
				if(null != data && data.length > 0) {
					for(var i = 0, n = data.length; i < n; i++) {
						var temp = data[i];
						var pointArray = [];
						var points = JSON.parse(temp.shape);
						for(var j = 0; j < points.length; j++) {
							var point = new BMap.Point(points[j].lng, points[j].lat);
							pointArray.push(point);
						}

						// 创建多边形
						var polygon = new BMap.Polygon(pointArray, 
							{strokeColor: "blue", fillColor: '#BA55D3', strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.5, strokeStyle: 'solid'});
						polygon.orgId = temp.orgId;
						polygon.mapName = temp.name;
						polygon.mapType = temp.typeId;
						polygon.orgOldId = temp.orgId;
						polygon.mapColor = "#BA55D3";
						polygon.mapAddress = temp.shape;
						polygon.mapState = "edit";
		            	map.addOverlay(polygon);
		            	polygon.addEventListener('click', editCommunityPolygon);
		            	showText(polygon, temp.name);
					}
				}
			}
		});
		
		//显示信息
		function showText(polygon, pName) { 
			// 或的多边形的所有顶点
			var point = getCenterPoint(polygon.getPath());
			// 获得中心点
			var label = new BMap.Label(pName, {offset: new BMap.Size(-40, -25), position: point});
			// 对label样式隐藏
			label.setStyle({color : "#000", fontSize : "14px", backgroundColor :"0.05", border :"0", fontWeight :"bold" });
			polygon.addEventListener('mouseover', function() {map.addOverlay(label)});
			polygon.addEventListener('mouseout', function() {map.removeOverlay(label)});
		} 
		
		// 获得图形的中心点
		function getCenterPoint(path) {
			var x = 0.0;
			var y = 0.0;
			for(var i = 0; i < path.length; i++) {
				x = x + parseFloat(path[i].lng);
		  		y = y + parseFloat(path[i].lat);
			}
			x = x / path.length;
			y = y / path.length;
			return new BMap.Point(x, y);
		}
		var styleOptions = {
			strokeColor: "blue",  // 边线颜色。
			fillColor: "#A7C0E0", // 填充颜色。当参数为空时，圆形将没有填充效果。
	        strokeWeight: 2,      // 边线的宽度，以像素为单位。
	        strokeOpacity: 0.5,   // 边线透明度，取值范围0 - 1。
	        fillOpacity: 0.5,     // 填充的透明度，取值范围0 - 1。
	        strokeStyle: 'solid'  // 边线的样式，solid或dashed。
		}
		 // 实例化鼠标绘制工具
	    var drawingManager = new BMapLib.DrawingManager(map, {
	    	isOpen: false,                     // 是否开启绘制模式
	        enableDrawingTool: true,           // 是否显示工具栏
	        drawingToolOptions: {
	        	anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
	            offset: new BMap.Size(5, 5),   // 偏离值
	        },
	        circleOptions: styleOptions,       // 圆的样式
	        polylineOptions: styleOptions,     // 线的样式
	        polygonOptions: styleOptions,      // 多边形的样式
	        rectangleOptions: styleOptions     // 矩形的样式
	    });
		// 添加鼠标绘制工具监听事件，用于获取绘制结果
		drawingManager.addEventListener('overlaycomplete', overlayCommunityComplete);
	    
		// 画矩形
		drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
		$("#polygonCommunity").css("display", "block");
		$("#polygon").css("display", "none");

	    $("#polygonCommunity").click(function() {
    		/*
        	 * 点击画图
        	 * 判断是否存在正在画却没有进行保存的覆盖物
        	 * 清除当前marker点
        	 */
        	if(!editnum) {
        		messageAlert("存在正在修改的小区,请进行保存后再继续进行修改");
        		return;
        	}
        	if(null == $("#uid").val() || "" == $("#uid").val() || undefined == $("#uid")) {
        		messageAlert("请选择一个小区，并画小区的轮廓！");
        		return;
        	}
        	if(overlays.length == 0) {
        		$.ajax({
    				url: $.cxt + "/map/getErrChannelNum", 
    				data: {orgId: nowOrgId},
    				type: "POST",
    				success: function(data) {
						drawingManager.open();
			    		disableCommunityEditPolygon();
			    		$("path, svg").css({"cursor":""});
			    		if(null != overlays[0] && 'new' == overlays[0].mapState) {
			    			map.removeOverlay(overlays[0]);
			    		}
			    		overlays.splice(0, 1);
    				}
    	    	});
        	} else {
        		bootbox.dialog({
        			message: "目前存在正在进行画的小区，请点击”确认“清除正在画的小区,否则点击”取消“进行继续画小区后进行保存",  
    		    	title: "确认提示",
    		    	buttons: {
    		    		OK: {
    		    			label: "确认",
    		    			className: "btn-primary",  
    		    			callback: function () {
    		    				// 清除当前marker，下面表格清空，上面表格重新加载
    		    				map.removeOverlay(marker);
    		    				drawingManager.open();
        			    		disableCommunityEditPolygon();
        			    		$("path, svg").css({"cursor":""});
        			    		if(null != overlays[0] && 'new' == overlays[0].mapState) {
        			    			map.removeOverlay(overlays[0]);
        			    		}
        			    		overlays.splice(0, 1);
    		    			}
    		    		},
    		    		Cancel: {
    		    			label: "取消",  
    		                className: "btn-default",
    		                callback: function () {
    		                	drawingManager.open();
        			    		disableCommunityEditPolygon();
    		                	return;
    		                }
    		    		}
    		    	}
        		});
        	}
	    });

    	$("#editCommunity").css("display", "block");
		$("#edit").css("display", "none");
    	$("#editCommunity").click(function() {
 
    		var uid = $("#uid").val();
    		if(null == uid || "" == uid || undefined == uid) {
    			messageAlert("请选择一个小区进行修改！");
    			return;
    		}
     		$("path, svg").css({"cursor": ""});
     		if(editnum) {
        		flag = 1;
        	} else {
        		flag = 0;
        		editnum = false;
        		disableCommunityEditPolygon();
    			messageAlert("修改功能已取消，如需再修改网格，则请再次点击修改按钮！");
        	}
    	});
	} else {
		// 显示则隐藏
		$(this).find("font").css("display", "none");
		$(this).css("background-color", "#FFEFD5");
		$("#downStationToggleDiv").css("display", "block");
		$("#downToggleDiv").css("display", "block");
		$("#downExportToggleDiv").css("display", "block");
		$("#checkCommunityManager").val("false");
		map.clearOverlays();
		// 还原网格地图
		initParam();
	}
}

var editCommunityPolygon = function(e) {
	var overlay = this;
	if(flag == 1 && overlay.mapState == "edit") {
		if(null != overlays[0] && 'new' == overlays[0].mapState) {
			// 判断如果overlays
			map.removeOverlay(overlays[0]);     
		}
		// 删除数组中
		overlays.splice(0, 1);
		disableCommunityEditPolygon();
		flag == 1;
		overlay.enableEditing();
		editnum = false;
		overlays.splice(0, 1);
		overlays.push(overlay);
	} else if(flag == 1 && overlay.mapState == "new") {	  
		disableCommunityEditPolygon();
		flag == 1;
		overlay.enableEditing();
		editnum = false;
	  	overlays.splice(0, 1);
	 	overlays.push(overlay);
	} else if(flag == 2) {
		if(null == $("#uid").val() || "" == $("#uid").val()) {
			messageAlert("请选择要删除的小区");
			return;
		}
		$('#confirmModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});
		$('#confirmBtnModal').off("click");
		$('#confirmBtnModal').on("click", function() {
			map.removeOverlay(overlay);
			overlays.splice(0, 1);
			if(overlay.orgId) {
				$.ajax({
					url: $.cxt + "/map/deleteCommunity", 
					data: {cellId: overlay.orgId},
					type: "POST",
					success: function(data) {
						messageAlert("删除成功！");
					}
				});
			}
			$('#confirmModal').modal('hide');
			$("path, svg").css({"cursor": ""});
			flag = 0;
		});
		$('#cancelBtnModal').off("click");
		$('#cancelBtnModal').on("click", function() {
			$('#confirmModal').modal('hide');
			$("path, svg").css({"cursor": ""});
			flag = 0;
		});
	}
};
  
var disableCommunityEditPolygon = function() {
	for(var i = 0; i < overlays.length; i++) {
		overlays[i].disableEditing();
	}
	flag = 0;
	editnum = true;
}

var overlayCommunityComplete = function(e) {
	var pointArray = [];
	completePology = [];
	e.overlay.mapState = "new";
	e.overlay.addEventListener('click', editCommunityPolygon);
	var data_b = e.overlay.getPath();
	// 转成JSON格式
	var polygon_b = JSON.stringify(data_b);
	var areaLayerListLength = areaLayerList.length;
	for(var i = 0; i < areaLayerListLength; i++) {
		var data_a = areaLayerList[i].getPath();
		// 转成JSON格式
		var polygon_a = JSON.stringify(data_a);
		$.ajax ({
			url: $.cxt + "/gridCommon/intersectCommunity",  
			data: {polygon_a: polygon_a, polygon_b: polygon_b, orgId: nowOrgId, cellId: ""},
			type: "POST",
			async: false,
			success: function (data) {
		    	for(var i = 0; i < data.length; i++) {
		    		completePology.push(data[i])    	 
		    	}
			}
		});
	}
	if(completePology.length > 1) {
		messageAlert("所画小区已经跨区域了请重新画！");
		completePology = [];
		map.removeOverlay(e.overlay);
		return;
	} else if(completePology.length == 0) {
		messageAlert("所画小区不符合要求，请重新画！");
		completePology = [];
		map.removeOverlay(e.overlay);
		return;
	} else {
		var completePologyArr = completePology[0];
		for(var i = 0; i < completePologyArr.length; i++) {
			pointArray.push(new BMap.Point(completePologyArr[i].lng, completePologyArr[i].lat));
		}
		e.overlay.setPath(pointArray);
	}
	overlays.push(e.overlay);
	$("#addressCommunity").val(JSON.stringify(overlays[0].getPath()));
	$("#shape").val(JSON.stringify(overlays[0].getPath()));
};