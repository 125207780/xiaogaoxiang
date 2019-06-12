/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
	/** 
	 * @exports ChannelLayeras BMapLib.ChannelLayer
	 */
	var ChannelLayer = BMapLib.ChannelLayer = function(setRange, uId, poiInfo, rangeInfo, orgId) {
		this.conf = {};
		this.overlayList = [];
    	this.setRange = setRange;
    	this.uId = uId;
    	this.poiInfo = poiInfo;
    	this.rangeInfo = rangeInfo;
    	this.orgId = orgId;
	}

	ChannelLayer.prototype = new BMap.Overlay();

	ChannelLayer.prototype.initialize = function(map) {
    	this._map = map;
    	var me = this;
    	var el = document.createElement("div");
    	// 获取所有的地图覆盖物
    	var allOverlay = map.getOverlays();
    	// 判断是否是选择的基础单元，然后先将整个基础单元的信息给移除，再新增加周边基础单元信息
		for(var i = 0; i < allOverlay.length; i++) {
 	    	if("channel" == allOverlay[i].poiInfo || "allChannel" == allOverlay[i].poiInfo || "ALL_CHANNEL" == allOverlay[i].rangeInfo) {
 	    		map.removeOverlay(allOverlay[i]);
 	    		// 这里一定要继续删除下一个！不然是不能把图标给删除的！至于什么原因，打印一下allOverlay即可明了
 	    		map.removeOverlay(allOverlay[i+1]);
 	    	}
 	    }
		$.ajax({
			url: $.cxt + "/gridCommon/selectAllChannelByOrgId", 
			data: {setRange: this.setRange, uId: this.uId, poiInfo: this.poiInfo, rangeInfo: this.rangeInfo, orgId: this.orgId},
			type: "POST",
			loading: false,
			// async:false,
			success: function(list) {
				// bd 1 start
				// var myIcon = new BMap.Icon($.cxt+"/pages/gis/layer/channel.png", new BMap.Size(15, 15));
				// myIcon.imageSize = new BMap.Size(15, 15)
				// bd 1 end
				var img = new Image();
				img.src = $.cxt + "/pages/gis/layer/channel.png";
				if(null != list && list.length > 0) {
					var len = list.length;
					while(len--) {
						try {
							var lng = list[len].lng;
							var lat = list[len].lat;
							// bd 2 start
//							var point = new BMap.Point(lng, lat);
//							var marker = new BMap.Marker(point, {icon: myIcon}); 
//							marker.uid = list[len].uid;
//							marker.ucode = list[len].ucode;
//							var circle = new BMap.Circle(point, 1000, {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.2, fillColor: "red", fillOpacity: 0.2}); 
//							marker.circle =circle;
//							marker.addEventListener('click', function(obj) {
//								topwindow.showWindow({
//									title: '渠道信息',
//									data: {uid: this.uid},
//									url: $.cxt + "/pages/gis/layer/channelInfo.jsp",
//									bottons: [{
//										title: "关闭" ,
//										fun: function() {
//											topwindow.removeWindow();
//										}
//									}] 
//								});
//	                		});
//							marker.addEventListener('mouseover', function(obj) {
//							 	if(me._map.getZoom() < 17) {
//									me._map.addOverlay(this.circle);
//								}
//							});
//							marker.addEventListener('mouseout', function(obj) {
//								me._map.removeOverlay(this.circle);
//							});
//							me.overlayList.push(marker);
							// bd 2 end
							var point = new BMap.Point(lng, lat);
							var circle = new BMap.Circle(point, 1000, {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.2, fillColor: "red", fillOpacity: 0.2});
							var marker = {
			                	geometry: {
			                    	type: 'Point',
			                    	coordinates: [lng, lat]
			                	},
			                	uid: list[len].uid,
			                	icon: img
							}
							marker.circle = circle;
							me.overlayList.push(marker);
						} catch(e) {
						}
					}
					var options = {
						draw: 'icon',
						width: 30,
						height: 30,
			         	methods: {
				        	click: function(item) {
				            	if(item && me._map.getZoom() > 10) {
				                	topwindow.showWindow({
				                		k: item.uid,
										title: '渠道信息',
										data: {uid: item.uid},
										url: $.cxt + "/pages/gis/layer/channelInfo.jsp",
										bottons: [{
											title: "关闭" ,
											fun: function() {
												topwindow.removeWindow();
											}
										}]
				                	});
				            	}
				        	}
		         		}
					}
					if(me._map.getZoom() >= 10) {
						var dataSet = new mapv.DataSet(me.overlayList);
						me.layer= new mapv.baiduMapLayer(me._map, dataSet, options);
						me.layer.show();
					}
				}
			}
		});
		return el;
	}
    
    ChannelLayer.prototype.draw = function() {
    	this.drawOverlay();
    }
    
	ChannelLayer.prototype.drawOverlay = function() {
		if(this.layer) {
			if(this._map.getZoom() < 10) {    
				this.layer.hide();
			} else {
				this.layer.show();
			}
		}
		return;
		var currentBounds = this._map.getBounds();
		// var minlng = currentBounds.getSouthWest().lng;
		// var maxlng = currentBounds.getNorthEast().lng;
		// var minlat = currentBounds.getSouthWest().lat;
		// var maxlat = currentBounds.getNorthEast().lat;
        var len = this.overlayList.length;
        while(len--) {
        	if(this._map.getZoom() < 10) {
        		this._map.removeOverlay(this.overlayList[len]);
        		continue;
        	}
        	// var lng = this.overlayList[len].centerPoint.lng;
        	// var lat = this.overlayList[len].centerPoint.lat;
        	// if(lng >= minlng && minlng <= maxlng && lat >= minlat && lat <= maxlat) {
        	if(currentBounds.containsPoint(this.overlayList[len].getPosition())) {
        		this._map.addOverlay(this.overlayList[len]);
        	} else {
        		this._map.removeOverlay(this.overlayList[len]);
        	}
        }
	}

	// 向命名空间注册.
	BMapLib.ChannelLayer = ChannelLayer;
})()
