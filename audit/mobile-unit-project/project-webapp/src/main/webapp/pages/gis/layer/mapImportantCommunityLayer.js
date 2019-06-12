/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
	/** 
	 * @exports ImportantCommunityLayeras BMapLib.ImportantCommunityLayer
	 */
	var ImportantCommunityLayer = BMapLib.ImportantCommunityLayer = function(setRange, uId, poiInfo, orgId) {
    	this.conf = {};
    	this.overlayList = [];
    	this.setRange = setRange;
    	this.uId = uId;
    	this.poiInfo = poiInfo;
    	this.orgId = orgId;
    }

	ImportantCommunityLayer.prototype = new BMap.Overlay();

	ImportantCommunityLayer.prototype.initialize = function(map) {
    	this._map = map;
    	var me = this;
    	var el = document.createElement("div");
    	// 获取所有的地图覆盖物
    	var allOverlay = map.getOverlays();
    	// 判断是否是选择的基础单元，然后先将整个基础单元的信息给移除，再新增加周边基础单元信息
		for(var i = 0; i < allOverlay.length; i++) {
 	    	if("importantCommunity" == allOverlay[i].poiInfo) {
 	    		map.removeOverlay(allOverlay[i]);
 	    		// 这里一定要继续删除下一个！不然是不能把图标给删除的！至于什么原因，打印一下allOverlay即可明了
 	    		map.removeOverlay(allOverlay[i+1]);
 	    	}
 	    }
		$.ajax({
			url: $.cxt + "/gridCommon/selectAllImportantCommunityByOrgId", 
			data: {setRange: this.setRange, uId: this.uId, poiInfo: this.poiInfo, orgId: this.orgId},
			type: "POST",
			loading: false,
			success: function(list) {
				var img = new Image();
				img.src = $.cxt + "/pages/gis/layer/town.png";
				if(null != list && list.length > 0) {
					var len = list.length;
					while(len--) {
						try {
							var lng = list[len].lng;
							var lat = list[len].lat;
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
										title: '包保小区信息',
										data: {uid: item.uid},
										url: $.cxt + "/pages/gis/layer/communityInfo.jsp",
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
    
    ImportantCommunityLayer.prototype.draw = function() {
    	this.drawOverlay();
    }
    
	ImportantCommunityLayer.prototype.drawOverlay = function() {
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
	BMapLib.ImportantCommunityLayer = ImportantCommunityLayer;
})()
