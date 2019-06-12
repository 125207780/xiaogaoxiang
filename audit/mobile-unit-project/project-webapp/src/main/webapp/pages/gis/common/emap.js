/**
 * 需要有百度地图JS，echarts jquery js支撑
 */
var mapdata=[];
var colordata=[];
function showEmap(orgId, divId, callback, mark, eOption, opOption) {
	$("#" + divId).empty();
	var thisEmap = this;
	this.mainDiv = $("#" + divId);
	this.divArr = [];
	this.callback = callback;
	this.nowClick = null;
	this.eOption = eOption || {};
	this.next = function(nowOrgLevel, isDrilDown) {
		return show(this.nowClick, nowOrgLevel, isDrilDown);
	}
	var fn_append = this.mainDiv.append;
	this.mainDiv.fn_append = fn_append;
	this.mainDiv.append = function(obj, flag) {
		obj = $(obj);
		this.fn_append(obj);
		if(flag) {
		} else {
			thisEmap.divArr.push(obj);
		}
	}
	
	this.opOption = {
		"PoiLayer": BMapLib.PoiLayer,
		"ChannelLayer": BMapLib.ChannelLayer,
		"StationLayer": BMapLib.StationLayer,
		"AreaLayer": BMapLib.AreaLayer,
		"SearchControl": BMapLib.SearchControl,
		"PeripheryControl": BMapLib.PeripheryControl,
		"MenuControl": BMapLib.MenuControl,
		"GridLayer": true
	}
	
	if(opOption) {
		if(opOption.PoiLayer != undefined) {
			this.opOption.PoiLayer = opOption.PoiLayer;
		}
		if(opOption.ChannelLayer != undefined) {
			this.opOption.ChannelLayer = opOption.ChannelLayer;
		}
		if(opOption.StationLayer != undefined) {
			this.opOption.StationLayer = opOption.StationLayer;
		}
		if(opOption.AreaLayer != undefined) {
			this.opOption.AreaLayer = opOption.AreaLayer;
		}
		if(opOption.SearchControl != undefined) {
			this.opOption.SearchControl = opOption.SearchControl;
		}
		if(opOption.PeripheryControl != undefined) {
			this.opOption.PeripheryControl = opOption.PeripheryControl;
		}
		if(opOption.GridLayer != undefined) {
			this.opOption.GridLayer = opOption.GridLayer;
		}
		if(opOption.MenuControl != undefined) {
			this.opOption.MenuControl = opOption.MenuControl;
		}
	}

	var menuList = $('<div style="margin-right: 30px; z-index: 10; float: right; position: absolute; right: 30px;top:20px;"></div>');
	this.mainDiv.css("position", "relative");
	this.mainDiv.append(menuList,true);
	$.ajax({
		url: $.cxt + "/gridCommon/getAreaMenu", 
		data: {orgId: orgId},
		type: "POST",
		success: function(list) {
			var sysorg = list[0];
			if(sysorg.orgLevel == "4") {
				show(sysorg.orgId);
			} else {
				call(sysorg.orgId, sysorg.orgLevel);
			}
		}
	});
	
	function showAreaMenu(_orgId, isDrilDown) {
		menuList.empty();
		$.ajax({
			url: $.cxt + "/gridCommon/getAreaMenu", 
			data: {orgId: _orgId},
			type: "POST",
			success: function (list) {
				var len = list.length;
				while(len--) {
					var sysorg = list[len];
					var areaClassName = "areaMenuLevel" + sysorg.orgLevel; 
					var ifa = (len == list.length-1) ? '' : '<i class="fa fa-angle-double-right" aria-hidden="true"></i>';
					var menu = $('<span class="' + areaClassName + '" style="color: #108DEC; cursor: pointer; padding-right: 3px; font-size: 16px;" >' +
						ifa + sysorg.name + '</span>');
					menu.orgId = sysorg.orgId;
					menuList.append(menu);
					menu.on("click", null, sysorg, function(arg) {
						call(arg.data.orgId, arg.data.orgLevel);
					});
				}
			}
		});
	}

	function call(_orgId, _orgLevel) {
		this.nowClick = _orgId;
		// 在报表资源信息里增加下钻地图，返回按钮
		$("#menuInfoPrevTwo").remove();
		$("#menuInfoPrevThree").remove();
		if (_orgLevel == "1" || _orgLevel == "2") {
			var menuInfo = "<div id='menuInfoPrevTwo' style='width: 850px; height: 30px; top: 50px;  left: 10px; cursor: pointer; position: absolute; z-index: 1;'>";
			menuInfo += "<span id='backInfoOne' style='width: 100px; height: 30px; background: #4598F9; float: left; text-align: center; padding-top: 5px; cursor: pointer; color: #FFFFFF;'>返回</span>";
			$("#showMapInfo").append(menuInfo);
			$("#menuInfoPrevTwo").on("click", menuInfoPrevTwo);
			function menuInfoPrevTwo() {
				$("#mainBody").toggle("blind", {direction:'right'});
				$("#showMapInfo").css("display", "none");
			}
		} else if(_orgLevel == "3") {
			var menuInfo = "<div id='menuInfoPrevThree' style='width: 100px; height: 30px; top: 50px;  left: 780px; background: #3D3D3C; cursor: pointer; position: absolute; z-index: 1;'>";
			menuInfo += "<span id='backInfoTwo' style='width: 100px; height: 30px; background: #4598F9; float: left; text-align: center; padding-top: 5px; cursor: pointer; color: #FFFFFF;'>返回</span>";
			$("#showMapInfo").append(menuInfo);
			$("#menuInfoPrevThree").on("click", menuInfoPrevThree);
			function menuInfoPrevThree() {
				$("#mainBody").toggle("blind", {direction: 'right'});
				$("#showMapInfo").css("display", "none");
			}
		}
		if(this.callback) {
			this.callback.call(this, _orgId, _orgLevel);
		}
	}

	function copyOption(fromOp, toOp) {
		if(fromOp && typeof fromOp == "object") {
			for(var o in fromOp) {
				if(toOp[o] && typeof toOp[o] == "object") {
					copyOption(fromOp[o], toOp[o]);
				} else {
					toOp[o] = fromOp[o];
				}
			}
		} 
	}

	function show(_orgId, nowOrgLevel, isDrilDown) {
		showAreaMenu(_orgId, isDrilDown);

		if(undefined == isDrilDown) {
			var len = this.divArr.length;
			while(len--) {
				this.divArr[len].remove();
			}
			this.divArr = [];
			
			var resultObj ;
			$.ajax({
				url: $.cxt + "/gridCommon/getEmap", 
				data: {orgId: _orgId},
				type: "POST",
				async: false,
				success: function(result) {
					var info = result.info;
					var mapObj = result.mapObj;
					var mapId = 'mapObj' + _orgId;
					echarts.registerMap(mapId, mapObj);
					var div = $('<div style="width: 100%; height: 100%"></div>');
					 
					this.mainDiv.append(div);
					div.orgId = _orgId;
					var peripheryDiv = this.mainDiv;
					var menuDiv = this.mainDiv;
					// 百度
					if(info.orgLevel == "3" || info.orgLevel == "4") {
						if(info.orgLevel == "4") {
							// call(info.orgId, info.orgLevel);
							_orgId = info.pid;
						}  
						var cp = result.cp;
						var ecmap = echarts.init(div[0]);
						ecmap.setOption({
							bmap: {
								center: [cp.cplng, cp.cplat],
								zoom: 11,
								roam: true,
							},
							series: [ ]
						});
						var bdmap = ecmap.getModel().getComponent('bmap').getBMap();
						// var centerPoint = new BMap.Point(cp.cplng, cp.cplat);
						// 设置地图中心，显示层级
						// bdmap.centerAndZoom(centerPoint, 15);
						// 地图可以滚轮放大缩小
						// bdmap.enableScrollWheelZoom(true);
						// bdmap.enableDragging();
						bdmap.addEventListener("click",function(e){
							$('#datashow').empty();
							$('#datashow').text(e.point.lng + "," + e.point.lat);
							
						});
						var navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});  
						bdmap.addControl(navigation);      
						var flag = true;
						bdmap.addEventListener("tilesloaded", function() {
							if(flag) {
								flag = false;
								if(info.orgLevel == "3") {
//									if(thisEmap.opOption.PoiLayer) {
//										// 小区边框图层
//										var poiLayer = new thisEmap.opOption.PoiLayer(_orgId);
//										bdmap.addOverlay(poiLayer);
//									}
//									if(thisEmap.opOption.ChannelLayer) {
//										var channelLayer = new thisEmap.opOption.ChannelLayer(_orgId); 
//										bdmap.addOverlay(channelLayer);
//									}
//									if(thisEmap.opOption.StationLayer) {
//										var stationLayer = new thisEmap.opOption.StationLayer(_orgId); 
//										bdmap.addOverlay(stationLayer);
//									}
									if(thisEmap.opOption.AreaLayer) {
										var areaLayer = new thisEmap.opOption.AreaLayer(_orgId);  
										bdmap.addOverlay(areaLayer);
									}
									if(thisEmap.opOption.SearchControl) {
										var searchControl = new thisEmap.opOption.SearchControl(_orgId);  
										bdmap.addControl(searchControl); 
									}
									if(thisEmap.opOption.PeripheryControl) {
										var peripheryControl = new thisEmap.opOption.PeripheryControl(_orgId, menuDiv);
										bdmap.addControl(peripheryControl); 
										$(".poiInfo").attr("data-display", "none");
										$(".poiInfo").css("display", "none");
									}
									if(thisEmap.opOption.MenuControl) {
										var menuControl = new thisEmap.opOption.MenuControl(_orgId, menuDiv);
										bdmap.addControl(menuControl); 
									}
								}
							} 
						});

						if(thisEmap.opOption.GridLayer) {
							var gridlist = mapObj.features;
							var gridArr = [];
							for(var i = 0, n = gridlist.length; i < n; i++) {
								var grid = gridlist[i];
								var color = grid.properties.color;
								if(null == color || "" == color) {
									color = "#BA55D3";
								}
								var colorRgba = "rgba(" + parseInt("0x" + color.slice(1, 3)) + "," + parseInt("0x" + color.slice(3, 5)) + "," + parseInt("0x" + color.slice(5, 7)) + "," + 0.7 + ")";
								grid.fillStyle = colorRgba;
								
								var pointArray = [];
								var points = JSON.parse(grid.shape);
								for(var j = 0; j < points.length; j++) {
									var point = new BMap.Point(points[j].lng, points[j].lat);
									pointArray.push(point);
								}
								
								// 显示网格名称 start
								var polygon = new BMap.Polygon(pointArray, 
									{strokeColor: "blue", fillColor: grid.color, strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.5, strokeStyle: 'solid'});
								polygon.orgId = grid.properties.id;
								polygon.mapName = grid.properties.name;
								polygon.mapType = grid.typeId;
								polygon.mapColor = grid.properties.color;
								polygon.mapAddress = grid.shape;
								bdmap.addOverlay(polygon);
								showText(polygon, polygon.mapName, bdmap);
								// 显示网格名称 end
							}
							var dataSet = new mapv.DataSet(gridlist);
							var showInfoFlag = true;
					        var options = {
					        	lineWidth: 1,
					        	strokeStyle: 'blue',
					        	methods: {
//					        		click: function(item) {
//					        			if(item) {
//					        				call(item.properties.id, item.properties.orgLevel);
//					        			}
//					        		},
					        		mousemove: function(item) {
					        			if(item && showInfoFlag) {
					        				$("#gridInfoDiv").remove();
					        				var label = new BMap.Label(item.properties.name, {offset: new BMap.Size(-40, -25), position: item.properties.cp});
					        				label.setStyle({color: "#000", fontSize: "14px", backgroundColor: "0.05", border:"0", fontWeight:"bold"});
					        				bdmap.addOverlay(label);
					        				var isShowGridInfo = $("#showGridInfoDiv").attr("attr-data");
				        					var htmltv = "<div id='gridInfoDiv'>";
					        				if(isShowGridInfo == "true") {
//						        				htmltv += "<div id='gridNameInfo' style='font-size: 16px; margin-top: 5px; margin-left: 10px;color: #000000;'><font id='gridNameInfoFont'>///</font>" + item.properties.name + "</div>";
//						        				$.ajax({
//						        					url: $.cxt + "/compositeView/gridInfos",
//						        					data: {orgId: item.properties.id},
//						        					type: "POST",
//						        					async: false,
//						        					success: function(result) {
//						        						var json = JSON.parse(result);
//						        						var GRID_NAME="";
//						        						if(json.data.GRID_NAME!=undefined){
//						        							GRID_NAME=json.data.GRID_NAME;
//						        						}
//						        						var GRID_TYPE="";
//						        						if(json.data.GRID_TYPE!=undefined){
//						        							GRID_TYPE=json.data.GRID_TYPE;
//						        						}
//						        						var CHNL_COUNT="";
//						        						if(json.data.CHNL_COUNT!=undefined){
//						        							CHNL_COUNT=json.data.CHNL_COUNT;
//						        						}
//						        						var STATION_COUNT="";
//						        						if(json.data.STATION_COUNT!=undefined){
//						        							STATION_COUNT=json.data.STATION_COUNT;
//						        						}
//						        						var CELL_COUNT="";
//						        						if(json.data.CELL_COUNT!=undefined){
//						        							CELL_COUNT=json.data.CELL_COUNT;
//						        						}
//						        						var ZDCELL_COUNT="";
//						        						if(json.data.ZDCELL_COUNT!=undefined){
//						        							ZDCELL_COUNT=json.data.ZDCELL_COUNT;
//						        						}
//						        						var HIGHVALUE_CELL_COUNT="";
//						        						if(json.data.HIGHVALUE_CELL_COUNT!=undefined){
//						        							HIGHVALUE_CELL_COUNT=json.data.HIGHVALUE_CELL_COUNT;
//						        						}
//						        						var AB_JT_COUNT="";
//						        						if(json.data.AB_JT_COUNT!=undefined){
//						        							AB_JT_COUNT=json.data.AB_JT_COUNT;
//						        						}
//						        						var CD_JT_COUNT="";
//						        						if(json.data.CD_JT_COUNT!=undefined){
//						        							CD_JT_COUNT=json.data.CD_JT_COUNT;
//						        						}
//						        						var PORT_COUNT="";
//						        						if(json.data.PORT_COUNT!=undefined){
//						        							PORT_COUNT=json.data.PORT_COUNT;
//						        						}
//						        						var ADDR9_COUNT="";
//						        						if(json.data.ADDR9_COUNT!=undefined){
//						        							ADDR9_COUNT=json.data.ADDR9_COUNT;
//						        						}
//						        						var INCOME="";
//						        						if(json.data.INCOME!=undefined){
//						        							INCOME=json.data.INCOME;
//						        						}
//						        						var TELE_COUNT="";
//						        						if(json.data.TELE_COUNT!=undefined){
//						        							TELE_COUNT=json.data.TELE_COUNT;
//						        						}
//						        						var BRO_ADD_COUNT="";
//						        						if(json.data.BRO_ADD_COUNT!=undefined){
//						        							BRO_ADD_COUNT=json.data.BRO_ADD_COUNT;
//						        						}
//						        						var TERMINAL_COUNT="";
//						        						if(json.data.TERMINAL_COUNT!=undefined){
//						        							TERMINAL_COUNT=json.data.TERMINAL_COUNT;
//						        						}
//						        						var HOMENET_ADD_COUNT="";
//						        						if(json.data.HOMENET_ADD_COUNT!=undefined){
//						        							HOMENET_ADD_COUNT=json.data.HOMENET_ADD_COUNT;
//						        						}
//						        						var CELLRATE_ADD_SUM="";
//						        						if(json.data.CELLRATE_ADD_SUM!=undefined){
//						        							CELLRATE_ADD_SUM=json.data.CELLRATE_ADD_SUM;
//						        						}
//						        						var ADD_VALUE_COUNT="";
//						        						if(json.data.ADD_VALUE_COUNT!=undefined){
//						        							ADD_VALUE_COUNT=json.data.ADD_VALUE_COUNT;
//						        						}
//						        						var FUSE_RATE="";
//						        						if(json.data.FUSE_RATE!=undefined){
//						        							FUSE_RATE=json.data.FUSE_RATE;
//						        						}
//						        						var ENCLOSURE_COUNT="";
//						        						if(json.data.ENCLOSURE_COUNT!=undefined){
//						        							ENCLOSURE_COUNT=json.data.ENCLOSURE_COUNT;
//						        						}
//						        						
//						        						
//						        						
//						        						htmltv += "<table id='gridMainInfo'>";
//						        						htmltv += "<tr><td style='width: 130px; color: #000000' align='left'>网格名称：" + GRID_NAME + "</td>";
//						        						htmltv += "<td style='width: 150px; color: #000000' align='left'>网格类型：" + GRID_TYPE + "</td></tr>";
//						        						htmltv += "<tr align='left'><td style='color: #000000'>渠道数：" + CHNL_COUNT + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>基站数：" + STATION_COUNT + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>小区数：" + CELL_COUNT + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>重点小区数：" + ZDCELL_COUNT + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>高价值低占小区数：" + HIGHVALUE_CELL_COUNT + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>AB集团数：" + AB_JT_COUNT + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>CD集团数：" + CD_JT_COUNT + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>端口数：" + PORT_COUNT + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>九级地址数：" + ADDR9_COUNT + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>个人客户总计费收入(万元)：" + INCOME + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>放号量(户)：" + TELE_COUNT + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>新增宽带(户)：" + BRO_ADD_COUNT + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>终端合约(台)：" + TERMINAL_COUNT + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>家庭网新增(户)：" + HOMENET_ADD_COUNT + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>高价低占小区宽带新增(户)：" + CELLRATE_ADD_SUM + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>90后客户规模提升(个)：" + ADD_VALUE_COUNT + "</td></tr>";
//						        						htmltv += "<tr><td style='color: #000000' align='left'>头部客户宽带新增(户)：" + FUSE_RATE + "</td>";
//						        						htmltv += "<td style='color: #000000' align='left'>商客拓展(个)：" + ENCLOSURE_COUNT + "</td></tr>";
//						        						htmltv += "</table>";
//						        						htmltv += "</div>";
//						        					}
//						        				});
					        					$.ajax({
					        						url : $.cxt + "/compositeView/cityInfos",
					        					 	type : "POST",
					        					 	data : {'orgId':item.properties.id,
					        					 		    'orgLevel':4
					        					 		    },
					        					 	success : function(data){
					        					 		var data = JSON.parse(data);
					        					 		var json = data.data;
					        					 		var ORG_NAME="";
					        							if(json.ORG_NAME!=undefined){
					        								ORG_NAME=json.ORG_NAME;
					        							}
					        							$('#gridInfoName').html(ORG_NAME);
					        							var GRID_COUNT="";
					        							if(json.GRID_COUNT!=undefined){
					        								GRID_COUNT=json.GRID_COUNT;
					        							}
					        							var GRID_TYPE1="";
					        							if(json.GRID_TYPE1_COUNT!=undefined){
					        								GRID_TYPE1=json.GRID_TYPE1_COUNT;
					        							}
					        							var GRID_TYPE2="";
					        							if(json.GRID_TYPE2_COUNT!=undefined){
					        								GRID_TYPE2=json.GRID_TYPE2_COUNT;
					        							}
					        							var GRID_TYPE3="";
					        							if(json.GRID_TYPE3_COUNT!=undefined){
					        								GRID_TYPE3=json.GRID_TYPE3_COUNT;
					        							}
					        							var CHNL_COUNT="";
					        							if(json.CHNL_COUNT!=undefined){
					        								CHNL_COUNT=json.CHNL_COUNT;
					        							}
					        							var CHNL_WG_COUNT="";
					        							if(json.CHNL_WG_COUNT!=undefined){
					        								CHNL_WG_COUNT=json.CHNL_WG_COUNT;
					        							}
					        							var STATION_COUNT="";
					        							if(json.STATION_COUNT!=undefined){
					        								STATION_COUNT=json.STATION_COUNT;
					        							}
					        							var STATION_WG_COUNT="";
					        							if(json.STATION_WG_COUNT!=undefined){
					        								STATION_WG_COUNT=json.STATION_WG_COUNT;
					        							}
					        							var STATION_CELL_COUNT="";
					        							if(json.STATION_CELL_COUNT!=undefined){
					        								STATION_CELL_COUNT=json.STATION_CELL_COUNT;
					        							}
					        							var STATION_CELL_WG_COUNT="";
					        							if(json.STATION_CELL_WG_COUNT!=undefined){
					        								STATION_CELL_WG_COUNT=json.STATION_CELL_WG_COUNT;
					        							}
					        							
					        							var CELL_COUNT="";
					        							if(json.CELL_COUNT!=undefined){
					        								CELL_COUNT=json.CELL_COUNT;
					        							}
					        							var CELL_WG_COUNT="";
					        							if(json.CELL_WG_COUNT!=undefined){
					        								CELL_WG_COUNT=json.CELL_WG_COUNT;
					        							}
					        							var AB_JT_COUNT="";
					        							if(json.AB_JT_COUNT!=undefined){
					        								AB_JT_COUNT=json.AB_JT_COUNT;
					        							}
					        							var ABJT_WG_COUNT="";
					        							if(json.ABJT_WG_COUNT!=undefined){
					        								ABJT_WG_COUNT=json.ABJT_WG_COUNT;
					        							}
					        							var CD_JT_COUNT="";
					        							if(json.CD_JT_COUNT!=undefined){
					        								CD_JT_COUNT=json.CD_JT_COUNT;
					        							}
					        							var CDJT_WG_COUNT="";
					        							if(json.CDJT_WG_COUNT!=undefined){
					        								CDJT_WG_COUNT=json.CDJT_WG_COUNT;
					        							}
					        							var GJDZ_CELL_COUNT="";
					        							if(json.GJDZ_CELL_COUNT!=undefined){
					        								GJDZ_CELL_COUNT=json.GJDZ_CELL_COUNT;
					        							}
					        							
					        							var GJDZ_CELL_WG_COUNT="";
					        							if(json.GJDZ_CELL_WG_COUNT!=undefined){
					        								GJDZ_CELL_WG_COUNT=json.GJDZ_CELL_WG_COUNT;
					        							}
					        							
					        							var CUS_INCOME="";
					        							if(json.CUS_INCOME!=undefined){
					        								CUS_INCOME=json.CUS_INCOME;
					        							}
					        							
					        							var TELE_COUNT="";
					        							if(json.TELE_COUNT!=undefined){
					        								TELE_COUNT=json.TELE_COUNT;
					        							}
					        							var BRO_ADD_COUNT="";
					        							if(json.BRO_ADD_COUNT!=undefined){
					        								BRO_ADD_COUNT=json.BRO_ADD_COUNT;
					        							}
					        							var TERMINAL_COUNT="";
					        							if(json.TERMINAL_COUNT!=undefined){
					        								TERMINAL_COUNT=json.TERMINAL_COUNT;
					        							}
					        							var HOMENET_ADD_COUNT="";
					        							if(json.HOMENET_ADD_COUNT!=undefined){
					        								HOMENET_ADD_COUNT=json.HOMENET_ADD_COUNT;
					        							}
					        							var GJDZ_ADD_COUNT="";
					        							if(json.GJDZ_ADD_COUNT!=undefined){
					        								GJDZ_ADD_COUNT=json.GJDZ_ADD_COUNT;
					        							}
					        							var AFTER90_COUNT="";
					        							if(json.AFTER90_COUNT!=undefined){
					        								AFTER90_COUNT=json.AFTER90_COUNT;
					        							}
					        							var FUSEUSR_COUNT="";
					        							if(json.FUSEUSR_COUNT!=undefined){
					        								FUSEUSR_COUNT=json.FUSEUSR_COUNT;
					        							}
					        							var ENCLOSURE_COUNT="";
					        							if(json.ENCLOSURE_COUNT!=undefined){
					        								ENCLOSURE_COUNT=json.ENCLOSURE_COUNT;
					        							}
					        							var CUS_DVP_COUNT="";
					        							if(json.CUS_DVP_COUNT!=undefined){
					        								CUS_DVP_COUNT=json.CUS_DVP_COUNT;
					        							}
					        							
					        							var KD_ADD_COUNT="";
					        							if(json.KD_ADD_COUNT!=undefined){
					        								KD_ADD_COUNT=json.KD_ADD_COUNT;
					        							}
					        							var CONTRACT_INT_COUNT="";
					        							if(json.CONTRACT_INT_COUNT!=undefined){
					        								CONTRACT_INT_COUNT=json.CONTRACT_INT_COUNT;
					        							}
					        							
					        							var PORT_COUNT="";
					        							if(json.PORT_COUNT!=undefined){
					        								PORT_COUNT=json.PORT_COUNT;
					        							}
					        							
					        							var ADDR9_COUNT="";
					        							if(json.ADDR9_COUNT!=undefined){
					        								ADDR9_COUNT=json.ADDR9_COUNT;
					        							}
					        							
					        							var PORT_FEE_COUNT="";
					        							if(json.PORT_FEE_COUNT!=undefined){
					        								PORT_FEE_COUNT=json.PORT_FEE_COUNT;
					        							}
					        							
					        							var BUILDING_COUNT="";
					        							if(json.BUILDING_COUNT!=undefined){
					        								BUILDING_COUNT=json.BUILDING_COUNT;
					        							}
					        							
					        							var GXX_COUNT="";
					        							if(json.GXX_COUNT!=undefined){
					        								GXX_COUNT=json.GXX_COUNT;
					        							}
					        							
					        							var FXX_COUNT="";
					        							if(json.FXX_COUNT!=undefined){
					        								FXX_COUNT=json.FXX_COUNT;
					        							}
					        					 		$("#GRID_COUNT").html(GRID_COUNT);
					        					 		$("#GRID_TYPE1").html(GRID_TYPE1);
					        					 		$("#GRID_TYPE2").html(GRID_TYPE2);
					        					 		$("#GRID_TYPE3").html(GRID_TYPE3);
					        					 		$("#CHNL_COUNT").html(CHNL_COUNT);
					        					 		$("#CHNL_WG_COUNT").html(CHNL_WG_COUNT);
					        					 		$("#STATION_COUNT").html(STATION_COUNT);
					        					 		$("#STATION_WG_COUNT").html(STATION_WG_COUNT);
					        					 		$("#STATION_CELL_COUNT").html(STATION_CELL_COUNT);
					        					 		$("#STATION_CELL_WG_COUNT").html(STATION_CELL_WG_COUNT);
					        					 		$("#CELL_COUNT").html(CELL_COUNT);
					        					 		$("#CELL_WG_COUNT").html(CELL_WG_COUNT);
					        					 		$("#AB_JT_COUNT").html(AB_JT_COUNT);
					        					 		$("#ABJT_WG_COUNT").html(ABJT_WG_COUNT);
					        					 		$("#CD_JT_COUNT").html(CD_JT_COUNT);
					        					 		$("#CDJT_WG_COUNT").html(CDJT_WG_COUNT);
					        					 		$("#GJDZ_CELL_COUNT").html(GJDZ_CELL_COUNT);
					        					 		$("#GJDZ_CELL_WG_COUNT").html(GJDZ_CELL_WG_COUNT);
					        					 		$("#CUS_INCOME").html(CUS_INCOME);
					        					 		$("#TELE_COUNT").html(TELE_COUNT);
					        					 		$("#BRO_ADD_COUNT").html(BRO_ADD_COUNT);
					        					 		$("#TERMINAL_COUNT").html(TERMINAL_COUNT);
					        					 		$("#HOMENET_ADD_COUNT").html(HOMENET_ADD_COUNT);
					        					 		$("#GJDZ_ADD_COUNT").html(GJDZ_ADD_COUNT);
					        					 		$("#AFTER90_COUNT").html(AFTER90_COUNT);
					        					 		$("#FUSEUSR_COUNT").html(FUSEUSR_COUNT);
					        					 		$("#ENCLOSURE_COUNT").html(ENCLOSURE_COUNT);
					        					 		$("#CUS_DVP_COUNT").html(CUS_DVP_COUNT);
					        					 		$("#KD_ADD_COUNT").html(KD_ADD_COUNT);
					        					 		$("#CONTRACT_INT_COUNT").html(CONTRACT_INT_COUNT);
					        					 		$("#PORT_COUNT").html(PORT_COUNT);
					        					 		$("#ADDR9_COUNT").html(ADDR9_COUNT);
					        					 		$("#PORT_FEE_COUNT").html(PORT_FEE_COUNT);
					        					 		$("#BUILDING_COUNT").html(BUILDING_COUNT);
					        					 		$("#GXX_COUNT").html(GXX_COUNT);
					        					 		$("#FXX_COUNT").html(FXX_COUNT);
					        						 }
					        					});
					        					  
					        					
						        				//mainDiv.append(htmltv);
//					        					$("#gridInfoDiv").css({
//					        			            "top": 45,
//					        			            "right": 63,
//					        			            "display": "block"
//					        			        });
					        					$("#closeTab").on("click", function(){
							        				$("#gridInfoDivId").remove();
					        					});
					        				}
					        			} 
//					        			else {
//					        				$("#gridInfoDivId").remove();
//					        			}
					        		},
//					        		mouseout: function(item) {
//					        			if(item) {
//					        				$("#gridInfoDivId").remove();
//					        				var label = new BMap.Label(item.properties.name, {offset: new BMap.Size(-40, -25), position: item.properties.cp});
//					        				label.setStyle({color: "#000", fontSize: "14px", backgroundColor: "0.05", border: "0", fontWeight: "bold"});
//					        				bdmap.removeOverlay(label);
//					        			}
//					        		}
					        	}
					        }
					        var gridLayer = new mapv.baiduMapLayer(bdmap, dataSet, options);
					        gridLayer.showInfo = function() {
					        	showInfoFlag = true;
					        }
					        gridLayer.hideInfo = function() {
					        	showInfoFlag = false;
					        }
					        
					        bdmap.gridLayer = gridLayer;
					        
					        bdmap.addEventListener("zoomend", function() {
					        	 
					        	var curZoom = bdmap.getZoom();
					        	var fillOpacity = 0.7;
					        	if(curZoom > 13) {
					        		fillOpacity = 0.2;
					        	}
					        	for(var i = 0, n = gridlist.length; i < n; i++) {
					        		var colorRgba = gridlist[i].fillStyle;
					        		var c = colorRgba.replace(/(?:\(|\)|rgba)*/g, "").split(",");
					        		var gOpacity = parseInt(c[3]);
					        		if(gOpacity == fillOpacity) {
					        			break;
					        		}
					        		gridlist[i].fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + fillOpacity + ")";
					        	}
					        	bdmap.gridLayer.dataSet.set(gridlist);
					        });
						}
						ecmap.mapId = mapId;
						resultObj = ecmap; 
						resultObj.objType = "BMap";
						thisEmap.mapObj = resultObj;
						if(info.orgLevel == "4") {
							// call(info.orgId,info.orgLevel);
							// bdmap.addEventListener("tilesloaded", tl);
							// bdmap.removeEventListener("tilesloaded", tl);
							// function tl() {
							call(info.orgId, info.orgLevel);
							// } 
						}  
					} else {
						var geolist = mapObj.features;
						if(mark == "report"){
							$("#hiddenOrgId").val(info.orgId);
							$("#hiddenOrgLevel").val(info.orgLevel);
							conditionOne();
							var regionscolor={"<20%":"#2EFEF7","20-40%":"#2EFE2E","40-60%":"#F4FA58","60-80%":"#FE9A2E","80-100%":"#FE2E2E"};
							for(var i = 0, n = geolist.length; i < n; i++) {
								if(mapdata != null || mapdata != undefined) {
								   for(var j = 0;j<mapdata.length; j++){
									   if(geolist[i].properties.id==mapdata[j].orgId){
										   if(mapdata[j].rate<=20){
											  
											   geolist[i].properties.color==regionscolor['<20%'];
											 
										   }else if(mapdata[j].rate>20&&mapdata[j].rate<=40){
										
										   geolist[i].properties.color==regionscolor['20-40%'];
										  
									   }else if(mapdata[j].rate>40&&mapdata[j].rate<=60){
										
										   colordata.push({orgId:mapdata[j].orgId,color:regionscolor['40-60%']});
									   geolist[i].properties.color==regionscolor['40-60%'];
									  
								   }else if(mapdata[j].rate>60&&mapdata[j].rate<=80){
								 
								   geolist[i].properties.color==regionscolor['60-80%'];
								  
							   }else if(mapdata[j].rate>80&&mapdata[j].rate<100){
								  
								   geolist[i].properties.color==regionscolor['60-80%'];
								  
							   }
								   }
								}
						}
							}
						}
						var regions = [];
						for(var i = 0, n = geolist.length; i < n; i++) {
							var color="#77D7FF";
							if(geolist[i].properties.id=="18411"){
								for(var j=0;j<colordata.length;j++){
									if(colordata[j]["orgId"]==geolist[i].properties.id){
										color=colordata[j]["color"];
									}
								}
							}
							regions.push({  
								name: geolist[i].properties.name,
								itemStyle: {  
									normal: {  
										areaColor: color,//geolist[i].properties.color,
										// 设置行政边界线的边界颜色
										borderColor: '#fff',
										// 设置行政边界线的宽度
										borderWidth: '1.2',
										color: geolist[i].properties.color,
										opacity: '1'
									}
								}
							});
						}
						//console.log(regions);
						var ecmap = echarts.init(div[0]);
						ecmap.mapId = mapId;
						var option = {
							legend: {
							    type: "plain",
								show: true,
								orient: 'vertical',
								top: 'middle',
								left: 'left',
								data: ['<20%','20-40%','40-60%','60-80%','>80%']
							},
							geo: {
								map: 'mapObj' + _orgId,
								label: {
									normal: {
										show: true,
										color:"#fff"
									},
									emphasis: {
										show: true,
										areaColor: '#eee'
									}
								},
								regions: regions
							},
							series: [{
								type: 'scatter',  
								coordinateSystem: 'geo',  
							}]
						};
						if(this.eOption) {
							copyOption(this.eOption,option);
						}
						ecmap.setOption(option);
						ecmap.on('click', function(params) {
							var objlist = echarts.getMap('mapObj' + _orgId).geoJson.features;
							var len = objlist.length;
							while(len--) {
								if(params.name == objlist[len].properties.name) {
									var obj = objlist[len];
									call(obj.properties.id, obj.properties.orgLevel);
									break;
								}
							}
						});
						resultObj = ecmap;
						resultObj.objType = "Echarts";
						thisEmap.mapObj = resultObj;
					}
				}
			});
		}
		return resultObj;
	}

	//显示信息
	function showText(polygon, pName, bdmap) { 
		// 或的多边形的所有顶点
		var point = getCenterPoint(polygon.getPath());
		// 获得中心点
		var label = new BMap.Label(pName, {offset: new BMap.Size(-40, -25), position: point});
		// 对label样式隐藏
		label.setStyle({color : "#000", fontSize : "14px", backgroundColor :"0.05", border :"0", fontWeight :"bold" });
		polygon.addEventListener('mousemove', function(e) {
			bdmap.addOverlay(label);
		});
		polygon.addEventListener('mouseout', function() {
			bdmap.removeOverlay(label);
		});
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
	
	return thisEmap;
}


//if(mark=="report"){
//for(var i = 0, n = geolist.length; i < n; i++) {
//	if(mapdata!=null||mapdata!=undefined){
//	   for(var j = 0;j<mapdata.length; j++){
//		   if(geolist[i].properties.orgId==mapdata[j].orgId){
//			   if(mapdata[j].rate<=20){
//				   alert(geolist[i].properties.color);
//				   geolist[i].properties.color==regionscolor['<20%'];
//				   alert(geolist[i].properties.color);
//			   }else if(mapdata[j].rate>20&&mapdata[j].rate<=40){
//			   alert(geolist[i].properties.color);
//			   geolist[i].properties.color==regionscolor['20-40%'];
//			   alert(geolist[i].properties.color);
//		   }else if(mapdata[j].rate>40&&mapdata[j].rate<=60){
//		   alert(geolist[i].properties.color);
//		   geolist[i].properties.color==regionscolor['40-60%'];
//		   alert(geolist[i].properties.color);
//	   }else if(mapdata[j].rate>60&&mapdata[j].rate<=80){
//	   alert(geolist[i].properties.color);
//	   geolist[i].properties.color==regionscolor['60-80%'];
//	   alert(geolist[i].properties.color);
//   }else if(mapdata[j].rate>80&&mapdata[j].rate<100){
//	   alert(geolist[i].properties.color);
//	   geolist[i].properties.color==regionscolor['60-80%'];
//	   alert(geolist[i].properties.color);
//   }
//	   }
//	}