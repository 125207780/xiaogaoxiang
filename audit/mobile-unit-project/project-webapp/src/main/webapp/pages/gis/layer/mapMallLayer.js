/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
	/** 
	 * @exports MallLayer as BMapLib.MallLayer
     */
	var MallLayer = BMapLib.MallLayer = function(setRange, uId, poiInfo, orgId) {
    	this.conf = {};
    	this.overlayList = [];
    	this.setRange = setRange;
    	this.uId = uId;
    	this.poiInfo = poiInfo;
    	this.orgId = orgId;
    }

	MallLayer.prototype = new BMap.Overlay();

	MallLayer.prototype.initialize = function(map) {
		this._map = map;
		var me = this;
		var el = document.createElement("div");
 	    // 获取所有的地图覆盖物
    	var allOverlay = map.getOverlays();
    	// 判断是否是选择的基础单元，然后先将整个基础单元的信息给移除，再新增加周边基础单元信息
 	    for(var i = 0; i < allOverlay.length; i++) {
 	    	if("mall" == allOverlay[i].poiInfo) {
 	    		map.removeOverlay(allOverlay[i]);
 	    		// 这里一定要继续删除下一个！不然是不能把图标给删除的！至于什么原因，打印一下allOverlay即可明了
    			map.removeOverlay(allOverlay[i+1]);
 	    	}
 	    }
		$.ajax({
			url: $.cxt + "/gridCommon/selectAllMallByOrgId", 
			data: {setRange: this.setRange, uId: this.uId, poiInfo: this.poiInfo, orgId: this.orgId},
			type: "POST",
			loading: false,
			success: function(list) {
				var img = new Image();
				img.src = $.cxt + "/pages/gis/layer/mall.png";
				if(null != list && list.length > 0) {
					var len = list.length;
					while(len--) {
						var lng = list[len].lng;
						var lat = list[len].lat;	
						var point = new BMap.Point(lng, lat);
						var marker = {
							geometry: {
								type: 'Point',
								coordinates: [lng, lat]
							},
							uid: list[len].uid,
							icon: img
						}
						me.overlayList.push(marker);
					}
					var options = {
						draw: 'icon',
						width: 15,
						height: 15,
			         	methods: {
				        	click: function(item) {
				            	if(item && me._map.getZoom() > 15) {
				                	topwindow.showWindow({
				                		k: item.uid,
										title: '商场信息',
										data: {uid: item.uid},
										url: $.cxt + "/pages/gis/layer/mallInfo.jsp",
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
					if(me._map.getZoom() >= 15) {
						var dataSet = new mapv.DataSet(me.overlayList);
						me.layer= new mapv.baiduMapLayer(me._map, dataSet, options);
						me.layer.show();
					}
				}
			}
		});
        return el;
	}

	MallLayer.prototype.draw = function() {
        this.drawOverlay();
	}

	MallLayer.prototype.drawOverlay = function() {
	 	if(this.layer) {
		  	if(this._map.getZoom() < 15) {    
			  	this.layer.hide();
			} else {
				this.layer.show();
			}
		}
	 	return;
		var currentBounds = this._map.getBounds();
		var len = this.overlayList.length;
		while(len--) {
			if(this._map.getZoom() < 15) {
				this._map.removeOverlay(this.overlayList[len]);
	        	continue;
	     	}
			if(currentBounds.containsPoint(this.overlayList[len].getPosition())) {
				this._map.addOverlay(this.overlayList[len]);
	    	} else {
	        	this._map.removeOverlay(this.overlayList[len]);
	     	}
	  	}
	}
	
	// 向命名空间注册.
	BMapLib.MallLayer = MallLayer; 
})()
