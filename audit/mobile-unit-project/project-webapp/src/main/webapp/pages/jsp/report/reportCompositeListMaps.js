
var myChart = echarts.init(document.getElementById('main'));
myChart.showLoading();
var cityname=[];
var orgLevel='1';
$(function() {
	loadMap('1',orgLevel,true);
});
var resultObj ;
var data;
var divArr = [];
var mainDiv = $("#main");
var thisEmap=this;
var menuList="";
//clickMap true 点击地图，false，点击选择框
function loadMap(_orgId,orgLevel,clickMap){
	
	if(clickMap==true){
		conditionOne();
	}
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
			$('#main').append(div);
			div.orgId = _orgId;
			this.divArr.push(div);
			var peripheryDiv = this.mainDiv;
			var menuDiv = this.mainDiv;
			//加载右上角层级
			 menuList = $('<div style="margin-right: 30px; z-index: 10; float: right; position: absolute; right: 30px;"></div>');
			this.mainDiv.css("position", "relative");
			this.mainDiv.append(menuList);
			showAreaMenu(_orgId);
			//
			var geolist = mapObj.features;
			myChart.hideLoading();
			//查询条件
			var conditionOne=$("#conditionOne option:selected").val();
			var conditionTwo = $("#conditionTwo option:selected").val();
			var orgId = "";
			var orgLevel = "";
			if(null != $("#hiddenOldOrgId").val() && "" != $("#hiddenOldOrgId").val()) {
				orgId = $("#hiddenOldOrgId").val();
			} else {
				orgId = $("#hiddenOrgId").val();
			}
			// 当前地图层级
			if(null != $("#hiddenOldOrgLevel").val() && "" != $("#hiddenOldOrgId").val()) {
				orgLevel = $("#hiddenOldOrgLevel").val();
			} else {
				orgLevel = $("#hiddenOrgLevel").val();
			}
			var data = {
				orgId: orgId,
				orgLevel: orgLevel,
				conditionOne: $("#conditionOne option:selected").val(),
				conditionTwo: conditionTwo,
			};
			
			var xdata=[];
			$.ajax({
				url: $.cxt + "/rptcomposite/allList",
				data: {
					json: JSON.stringify(data)
				},
				type: "POST",
				async: false,
				success: function(result) {
					if(result!=null){
						for(var i=0;i<result.length;i++){
							if(data.conditionOne=="XZJZWC"||data.conditionOne=="GJZDZXQSTTS"||data.conditionOne=="TBKHGYRHL"||data.conditionOne=="GRKHZJFSR"||data.conditionOne=="XZKHZJFSR"){
								if(data.orgLevel=="1"){
									xdata.push({name:result[i].CITY_NAME,value:result[i].RATE*100});	
									}
								if(data.orgLevel=="2"){
									xdata.push({name:result[i].CNTY_NAME,value:result[i].RATE*100});	
									}
								if(data.orgLevel=="3"){
									xdata.push({name:result[i].GRID_NAME,value:result[i].RATE*100});	
									}
							}else{
								if(data.conditionTwo=="day"){
									if(data.orgLevel=="1"){
										xdata.push({name:result[i].CITY_NAME,value:result[i].RATE_D*100});	
										}
									if(data.orgLevel=="2"){
										xdata.push({name:result[i].CNTY_NAME,value:result[i].RATE_D*100});	
										}
									if(data.orgLevel=="3"){
										xdata.push({name:result[i].GRID_NAME,value:result[i].RATE_D*100});	
										}
								}else if(data.conditionTwo=="month"){
									if(data.orgLevel=="1"){
										xdata.push({name:result[i].CITY_NAME,value:result[i].RATE_M*100});	
										}
									if(data.orgLevel=="2"){
										xdata.push({name:result[i].CNTY_NAME,value:result[i].RATE_M*100});	
										}
									if(data.orgLevel=="3"){
										xdata.push({name:result[i].GRID_NAME,value:result[i].RATE_M*100});	
										}
								}
								
							}
							
						}
					}
				}
			});
			
	if(orgLevel=="3"||orgLevel=="4"){
		if(orgLevel == "4") {
			// call(info.orgId, info.orgLevel);
			_orgId=info.pid;
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
				if(orgLevel == "3") {
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
	        var options = {
	        	lineWidth: 1,
	        	strokeStyle: 'blue',
	        	methods: {
	        		mousemove: function(item) {
	        			if(item) {
	        				$("#gridInfoDiv").remove();
	        				var label = new BMap.Label(item.properties.name, {offset: new BMap.Size(-40, -25), position: item.properties.cp});
	        				label.setStyle({color: "#000", fontSize: "14px", backgroundColor: "0.05", border:"0", fontWeight:"bold"});
	        				bdmap.addOverlay(label);
	        				var htmltv = "<div id='gridInfoDiv'>";
	        				htmltv += "<div id='gridNameInfo'>" + item.properties.name + "</div>";
	        				$.ajax({
	        					url: $.cxt + "/compositeView/gridInfos",
	        					data: {orgId: item.properties.id},
	        					type: "POST",
	        					async: false,
	        					success: function(result) {
	        						var json = JSON.parse(result);
	        						htmltv += "<table id='gridMainInfo'>";
	        						htmltv += "<tr><td style='width: 130px;' align='right'>网格名称：</td><td align='center'>" + json.data.GRIDNAME + "</td>";
	        						htmltv += "<td style='width: 150px;' align='right'>客户数：</td><td align='center'>" + json.data.CUSTOMERSCALE + "</td></tr>";
	        						htmltv += "<tr align='right'><td>收入：</td><td align='center'>" + json.data.INCOME.toFixed(2) + "</td>";
	        						htmltv += "<td align='right'>渠道数：</td><td align='center'>" + json.data.CHNLNUM + "</td></tr>";
	        						htmltv += "<tr><td align='right'>基站数：</td><td align='center'>" + json.data.STATIONNUM + "</td>";
	        						htmltv += "<td align='right'>小区数：</td><td align='center'>" + json.data.CELLNUM + "</td></tr>";
	        						htmltv += "<tr><td align='right'>AB集团数：</td><td align='center'>" + json.data.ABJTNUM + "</td>";
	        						htmltv += "<td align='right'>CD集团数：</td><td align='center'>" + json.data.CDJTNUM + "</td></tr>";
	        						htmltv += "<tr><td align='right'>重点小区数：</td><td align='center'>" + json.data.ZDCELLNUM + "</td>";
	        						htmltv += "<td align='right'>端口数：</td><td align='center'>" + json.data.PORTSUM + "</td></tr>";
	        						htmltv += "<tr><td align='right'>端口占用数：</td><td align='center'>" + json.data.PORTUSE + "</td>";
	        						htmltv += "<td align='right'>端口数利用率：</td><td align='center'>" + (json.data.PORTRATE*100).toFixed(2) + "%</td></tr>";
	        						htmltv += "<tr><td align='right'>当月放号量：</td><td align='center'>" + json.data.COL1 + "</td>";
	        						htmltv += "<td align='right'>当月宽带新增：</td><td align='center'>" + json.data.COL2 + "</td></tr>";
	        						htmltv += "<tr><td align='right'>当月放号完成情况：</td><td align='center'>" + json.data.COL3 + "</td>";
	        						htmltv += "<td align='right'>当月宽带新增完成情况：</td><td align='center'>" + json.data.COL4 + "</td></tr>";
	        						htmltv += "<tr><td align='right'>高价值低占小区数：</td><td align='center'>" + json.data.COL5 + "</td></tr>";
	        						htmltv += "</table>";
	        						htmltv += "</div>";
	        					}
	        				});
	        				mainDiv.append(htmltv);
        					$("#gridInfoDiv").css({
        			            "top": 30,
        			            "right": 63,
        			            "display": "block"
        			        });
        					$("#closeTab").on("click", function(){
		        				$("#gridInfoDiv").remove();
        					});
	        			} else {
	        				$("#gridInfoDiv").remove();
	        			}
	        		},
	        		mouseout: function(item) {
	        			if(item) {
	        				$("#gridInfoDiv").remove();
	        				var label = new BMap.Label(item.properties.name, {offset: new BMap.Size(-40, -25), position: item.properties.cp});
	        				label.setStyle({color: "#000", fontSize: "14px", backgroundColor:"0.05", border:"0", fontWeight:"bold"});
	        				bdmap.removeOverlay(label);
	        			}
	        		}
	        	}
	        }
	        var gridLayer = new mapv.baiduMapLayer(bdmap, dataSet, options);
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
	}else{
		
		        var regions = [];
				for(var i = 0, n = geolist.length; i < n; i++) {
						var color="transparent";
						regions.push({  
						name: geolist[i].properties.name,
						itemStyle: {  
						normal: {  
						areaColor: color,//geolist[i].properties.color,
						// 设置行政边界线的边界颜色
						borderColor: '#6AF3ED',
						// 设置行政边界线的宽度
						borderWidth: '1.2',
						color: geolist[i].properties.color,
						opacity: '1'
										}
									}
								});
							}
		    myChart.setOption(option = {
		        // backgroundColor: '#021926',
//		        title: {
//		            text: '2015年中国地级市单位土地产出',
//		            left: 'center',
//		        },
		        visualMap: {
		        show: true,
		        type:'piecewise',
		        pieces:[
		            {min: 80},
		            {min: 60, max: 80},
		            {min: 40, max:60},
		            {min:20,max: 40},
		            {max:20}// 不指定 min，表示 min 为无限大（-Infinity）。
		        ],
		        showLabel:true,
		        left: 'right',
		        top: 'bottom',
		        text: ['高    (百分比/进度)', '低    (百分比/进度)'], // 文本，默认为数值文本
		        calculable: true,
		        inRange: {
		            // color: ['#3B5077', '#031525'] // 蓝黑
		            // color: ['#ffc0cb', '#800080'] // 红紫
		            // color: ['#3C3B3F', '#605C3C'] // 黑绿
		            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
		            // color: ['#23074d', '#cc5333'] // 紫红
		            color:['#3C3B3F','red']//蓝红
		            // color: ['#00467F', '#A5CC82'] // 蓝绿
		            // color: ['white','#1488CC', '#2B32B2'] // 浅蓝
		            // color: ['#00467F', '#A5CC82'] // 蓝绿
		            // color: ['#00467F', '#A5CC82'] // 蓝绿
		            // color: ['#00467F', '#A5CC82'] // 蓝绿
		            // color: ['#00467F', '#A5CC82'] // 蓝绿

		            }
		        },
		        tooltip: {
		            trigger: 'item',
		            formatter: '{b}<br/>{c} (进度)'
		        },
//		        toolbox: {
//		            show: true,
//		            feature: {
//		                dataView: {
//		                    readOnly: false
//		                },
//		                restore: {},
//		                saveAsImage: {
//		                    pixelRatio: 4
//		                }
//		            }
//		        },
		        geo: {
		        	 map: 'mapObj' + _orgId,
		             label: {
		                 emphasis: {
		                     show: true
		                 }
		             } ,
		             regions: regions,
		             roam:true,
		             itemStyle: {
		                 normal: {
		                     areaColor: '#45c8ff',
		                     borderColor: '#fff'
		                 },
		                 emphasis: {
		                     areaColor: '#00aeee'
		                 }
		             } 
		         },
		        series: [{
		                name: '进度',
		                type: 'map',
		                mapType: mapId,
		                label: {
		                    normal: {
		                        show: false
		                    }
		                },
		                roam:true,
		                data: xdata
		
		            },

		        ]
		    });
		    myChart.on('click', function(params) {
				var objlist = echarts.getMap('mapObj' + _orgId).geoJson.features;
				var len = objlist.length;
				while(len--) {
					if(params.name == objlist[len].properties.name) {
						var obj = objlist[len];
						orgLevel++;
						$("#hiddenOldOrgId").val(obj.properties.id);
				    	$("#hiddenOldOrgLevel").val(orgLevel);
						loadMap(obj.properties.id,orgLevel,true);
						break;
					}
				}
			});
		    resultObj = myChart;
			resultObj.objType = "Echarts";
			thisEmap.mapObj = resultObj;
		}
		
	}
	});
}

function showAreaMenu(_orgId) {
	
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
				var menu = $('<span class="' + areaClassName + '" style="color: #00BFB2; cursor: pointer; padding-right: 3px; font-size: 16px;" >' + 
					ifa + sysorg.name + '</span>');
				menu.orgId = sysorg.orgId;
				menuList.append(menu);
				menu.on("click", null, sysorg, function(arg) {
					loadMap(arg.data.orgId,arg.data.orgLevel,true);
				});
			}
		}
	});
}
