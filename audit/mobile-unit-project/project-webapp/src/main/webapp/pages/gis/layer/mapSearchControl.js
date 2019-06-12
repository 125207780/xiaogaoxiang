/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
    /** 
     * @exports SearchControlas BMapLib.SearchControl
     */
	var SearchControl = BMapLib.SearchControl = function(orgId) {
    	this.orgId=orgId;
	}

	SearchControl.prototype = new BMap.Control();

	SearchControl.prototype.initialize = function(map) {
		this._map = map;
		var me=this;
		var style = $("<link href='" + $.cxt + "/pages/css/gis/mapSearchControl.css' rel='stylesheet'></link>");
		var searchArr =[];
        var  redIcon = new BMap.Icon($.cxt+"/pages/images/gis/red.png", new BMap.Size(21, 33));
        var blueIcon = new BMap.Icon($.cxt+"/pages/images/gis/blue.png", new BMap.Size(21, 33));
        // 创建一个DOM元素
        var div =$("<div style='display: inline-block; left: 10px; top: 10px; right: auto; bottom: auto; position: absolute; -ms-text-size-adjust: none; z-index: 2;' ></div>");
        var textInput = $('<input class="msc_input"  type="text" style="width: 210px !important;">');
        div.append(textInput);
        var inputDiv = $('<span id="msc_input_div"></span>');
        div.append(inputDiv);
        var clearBtn = $('<span class="msc_clearBtn" title="清除" >✖</span>');
        div.append(clearBtn);

        var searchBtn = $('<button style="margin-bottom: 8px; height: 25px !important; width: 42px !important;" class="btn btn-info msc_serchBtn" title="搜索"><i style="margin-left: 0px; margin-top: -7px;" class="fa fa-search"></i></button>')
        div.append(searchBtn);

        var resultlist = $('<ul  class="map_search_addressUL" ></ul>');
        div.append(resultlist);

        var totalDiv = $('<div  class="map_search_totalDiv" ></div>');
        div.append(totalDiv);

        textInput.bind('keypress', function(event) {
	        if(event.keyCode == "13") {
	        	var v = $.trim(textInput.val());
	        	if(v != "") {
	        		search(v, 1);
	        	}
	        }
		}); 

	    /* $.ajax({
			url: $.cxt + "/gridCommon/initSearchName", 
			data: {orgId:this.orgId},
			type: "POST",
			loading: false,
			success: function(data) {
				textInput.autocomplete({
					appendTo: inputDiv,
					source: function(request, response) {
				   		var results = $.ui.autocomplete.filter(data, $.trim(request.term));
				  		response(results.slice(0, 5));
			   		},
					select: function( event, ui ) {
			    		search( ui.item.value,1);  
			     	}
				});
			}
		});*/
  	 
        // 这一段是地图左上角文本框输入的时候，点击一下，交互一下，使用非常不方便，先注释
//		var getData = [] ;
//		textInput.autocomplete({
//			appendTo: inputDiv,
//			source: function(request, response) {
//				console.log(me.orgId);
//				console.log(request);
//				if(request.term != "") {
//					$.ajax({
//						url: $.cxt + "/gridCommon/initSearchPlaceName",
//						data: {orgId: me.orgId, paramPlace: request.term},
//						type: "POST",
//						success: function(data) {
//		    				getData = [];
//		    				for(var i = 0; i < data.length; i++) {
//		    					getData.push(data[i]);
//		    				}
//		    				response(getData);
//						}
//					});
//		    	} else {
//		    		response([]);
//		    	}
//			},
//			select: function(event, ui) {
//				search(ui.item.value, 1);  
//	     	}
//		});
	
		totalDiv.on("mouseover", function() {
			totalDiv.hide();
			resultlist.show();
		});
		
		map.addEventListener('click', function() {
			showTotalDiv();
		});
		
		map.addEventListener('zoomstart', function() {
			showTotalDiv();
		});
	
		map.addEventListener('dragstart', function() {
			showTotalDiv();
		});
		
	  	searchBtn.click(function() {
	  		var v = $.trim(textInput.val());
	  		if(v != "") {
	  			search(v, 1);
	  		}
	  	});
	
	  	clearBtn.click(function() {
	  		clearBtn.hide();
	  		resultlist.hide();
	  		totalDiv.hide();
	  		textInput.val('');
	  		for(var i = 0, n = searchArr.length; i < n; i++) {
	  			map.removeOverlay(searchArr[i]);
	  		}
		});
	  	
		function showTotalDiv() {
			if(!resultlist.is(':hidden')) {
				totalDiv.show();
				resultlist.hide();
			}
		}
	  	
		function getNumberLabel(number) {
			var offsetSize = new BMap.Size(0, 0);
			var labelStyle = {
				color: "#fff",
				backgroundColor: "0.05",
				border: "0"
			};
	
	        //不同数字长度需要设置不同的样式。
			switch((number + '').length) {
				case 1:
					labelStyle.fontSize = "14px";
					offsetSize = new BMap.Size(4, 2);
					break;
	            case 2:
	                labelStyle.fontSize = "12px";
	                offsetSize = new BMap.Size(2, 4);
	                break;
	            case 3:
	                labelStyle.fontSize = "10px";
	                offsetSize = new BMap.Size(-2, 4);
	                break;
	            default:
	                break;
	        }
	
	        var label = new BMap.Label(number, {
	        	offset: offsetSize
	        });
	        label.setStyle(labelStyle);
	        return label;
	    }
	    
		function getSearchOverlay(uid) {
			for(var i = 0, n = searchArr.length; i < n; i++) {
				if(searchArr[i].uid == uid){
					return searchArr[i];
				}
			}
		}
		
		function transform(shapeStr) {
			var ps = JSON.parse(shapeStr);
			var points = [];
			var len = ps.length;
			while(len--) {
				points.push(new BMap.Point(ps[len].lng, ps[len].lat));
			}
			// 创建多边形
			var polygon = new BMap.Polygon(points, 
				{strokeColor: "rgb(3,36,62)", fillColor: '', strokeWeight: 2, strokeOpacity: 0.7, fillOpacity: 0.0, strokeStyle: 'solid'});
			return polygon;
		}
	
		function search(keyword, page) { 
			clearBtn.show();
			textInput.blur();
			totalDiv.hide();
			for(var i = 0, n = searchArr.length; i < n; i++) {
				map.removeOverlay(searchArr[i]);
			}
			searchArr=[];
			$.ajax({
				url: $.cxt + "/gridCommon/selectSearchList", 
	  			data: {name: keyword, orgId: me.orgId, page: page, rows: 10},
	  			type: "POST",
	  			success: function(json) {
	  				var maxh = map.getSize().height - 75;
	  				resultlist.css("max-height", maxh + "px");
	  				resultlist.show();
	  				resultlist.empty();
	
	  				var object = $.parseJSON(json);
	  				var data = object.rows;
	  				var total = object.total;
	  			    var records = object.records;
	  				totalDiv.empty();
	
	  				totalDiv.append("共找到<span>" + records + "</span>个搜索结果");
	  				if(null != data && 0 != data.length) {
	  					for(var i = 0; i < data.length; i++) {
	  						var obj = data[i];
	  						var uid = obj.uid;
	  						var lng = obj.lng;
	  						var lat = obj.lat;
	  						var point = new BMap.Point(lng, lat);
	  						var marker = new BMap.Marker(point, {icon: redIcon, title: obj.name});
	  						marker.setLabel(getNumberLabel(i + 1));
	  						marker.uid = uid;
	  						marker.indexNum = obj.indexNum;
	  						marker.type = obj.type;
	  						if(obj.shape&&obj.shape != "") {
	  							marker.shape = transform(obj.shape);
	  						}
	  						map.addOverlay(marker);
	  						searchArr.push(marker);
	  						marker.addEventListener("mouseover", function(e) {
	  							var me = e.target;
	  							me.setIcon(blueIcon)
	  							$("#nm_" + me.uid).css("background", "url(" + $.cxt + "/pages/images/gis/blue.png) no-repeat top center");
	  							if(me.shape) {
	  								map.addOverlay(me.shape);
	  							}
	  						});
	  						marker.addEventListener("mouseout", function(e) {
	  							var me = e.target;
	  							me.setIcon(redIcon)
	  							$("#nm_" + me.uid).css("background", "url(" + $.cxt + "/pages/images/gis/red.png) no-repeat top center")
	  							if(me.shape) {
	  								map.removeOverlay(me.shape);
	  							}
	  						});
	  						marker.addEventListener("click", function(e) {
	  							var me = e.target;
	  							if(me.type == 'CHANNEL') {
	  								topwindow.showWindow({
	  									title: '渠道信息',
	  									data: {uid: me.uid},
	 									url: $.cxt + "/pages/gis/layer/channelInfo.jsp",
	 									bottons: [{
	 										title: "关闭" ,
	 										fun: function() {
	 											topwindow.removeWindow();
	 										}
	 									}] 
	  								});
	  							} else if(me.type == 'STATION') {
	  								topwindow.showWindow({
	  									title: '基站信息',
	  									data: {uid: me.uid},
	  									url: $.cxt + "/pages/gis/layer/stationInfo.jsp",
	 									bottons: [{
	 										title: "关闭" ,
	 										fun: function() {
	 											topwindow.removeWindow();
	 										}
	 									}] 
	  								});
	  							} else if(me.type == 'POI' && me.indexNum > 0) {
	  								topwindow.showWindow({
	  									title: '基础单元',
										data: {physicalId: me.uid},
										url: $.cxt + "/gridCommon/selectSchoolOrHouse",
										bottons: [{
											title: "关闭" ,
											fun: function() {
												topwindow.removeWindow();
											}
										}] 
									});
	  							}
	  						});
	  						
	  						var li = $("<li></li>");
	  					    li.on("mouseover", function() {
	  					    	var o = getSearchOverlay(this.firstChild.id.substring(3));
	  					    	o.dispatchEvent("mouseover");
	  					    	// o.setIcon(blueIcon);
	  					    	// $(this.firstChild).css("background","url("+$.cxt+"/pages/images/gis/blue.png) no-repeat top center")
	  					    });
	  					    li.on("mouseout", function() {
	  					    	var o = getSearchOverlay(this.firstChild.id.substring(3));
	  					    	o.dispatchEvent("mouseout");
	  					    });
	  					    li.on("click", function() {
	  					    	var o = getSearchOverlay(this.firstChild.id.substring(3));
	  					    	var p = o.getPosition();
	  					    	focusMap(p.lng, p.lat);
	  					    });
	
	  					    resultlist.append(
	  							li.addClass("addressList")
	  								.append(
	  									$("<span id='nm_" + uid + "'></span>").addClass("addressNum").append(i+1))
	  								.append(
	  									$("<span style='float:left'></span>") 
	  										.append(
	  											$("<p></p>").addClass("nameInfo").append(obj.name))
	  											.append(
	  													$("<p></p>").addClass("addrInfo").append(obj.addr)))
	  								/*.append(
	  									$("<image class='addrImg' src='"+$.cxt+"/pages/gis/images/default.jpg'></image>").addClass("addrImg")
									)*/
	  						);
	  					}
	  					var p0 = searchArr[0].getPosition();
	  					focusMap(p0.lng, p0.lat);
	  					if(records > 10) {
	  						var beforeBtn = $("<span>上一页</span>");
	  						var nextBtn = $("<span>下一页<span>");
	  						if(page != 1) {
	  							 beforeBtn.click(function() {
	  								search(keyword, --page);
	  							 });
	  							beforeBtn.addClass("pageBtn");
	  						} else {
	  							beforeBtn.addClass("pageNoBtn");
	  						}
	  						if(page < total) {
	  							nextBtn.click(function() {
	  								search(keyword, ++page);
	  							});
	  							nextBtn.addClass("pageBtn");
	  						} else {
	  							nextBtn.addClass("pageNoBtn");
	  						}
	  						var pageLi = $("<li  class='pageLi'></li>");
	  						pageLi.append(beforeBtn).append(nextBtn);
	  						resultlist.append(pageLi);
	  					}
	  				} else {
	  					resultlist.append("<li>没有搜索结果！</li>");
	  				}
	  			}
			});
		}
	
		function focusMap(lng, lat) { 
			var centerPoint = new BMap.Point(lng, lat);
			var zoom = map.getZoom();
			zoom =Math.max(zoom, 17);
			map.centerAndZoom(centerPoint, zoom);
		}
		
		// 添加DOM元素到地图中
		$(map.getContainer()).parent().append(div);
		// 将DOM元素返回
		return null;
	}
    
	// 向命名空间注册.
	BMapLib.SearchControl= SearchControl;
})()
