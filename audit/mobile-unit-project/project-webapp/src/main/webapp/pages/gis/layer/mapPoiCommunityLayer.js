/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function() {
	/** 
     * @exports PoiLayeras BMapLib.PoiLayer
     */
    var PoiCommunityLayer = BMapLib.PoiCommunityLayer = function(orgId, flag) {
    	this.conf = {};
    	this.overlayList = [];
    	this.overlayMarkerList = [];
    	this.cpList = [];
    	this.initFlag = false;
    	this.orgId = orgId;
    	this.flag = flag;
	}

    PoiCommunityLayer.prototype = new BMap.Overlay();

    PoiCommunityLayer.prototype.initialize = function(map) {
		this._map = map;
		var me = this;
		var el = document.createElement("div");
		$.ajax({
        	url: $.cxt + "/gridCommon/selectAllPoiByOrgId",
			data: {orgId: this.orgId, flag: this.flag},
			type: "POST",
			loading: false,
			success: function(list) {
				if(null != list && list.length > 0) {
					var len = list.length;
					var img = new Image();
					// 小区图标
					img.src = $.cxt + "/pages/gis/layer/poi.png";
					// 循环遍历，将小区图标赋值到地图上，并给点击事件
					while(len--) {
						try {
							var lng = list[len].lng;
							var lat = list[len].lat;
							// 设置坐标点
							var point = new BMap.Point(lng, lat);
							// 设置图标覆盖物的属性
							var marker = {
			                	geometry: {
			                    	type: 'Point',
			                    	coordinates: [lng, lat]
			                	},
			                	uid: list[len].uid,
			                	cellId: list[len].cellId,
			                	name: list[len].name,
			                	icon: img
							}
							// 设置圆形
							var circle = new BMap.Circle(point, 1000, {strokeColor: "red", strokeWeight: 12, strokeOpacity: 1, fillColor: "red", fillOpacity: 1}); 
							marker.circle = circle;
							// 把图标存放到集合中，统一调用展示方法
							me.overlayMarkerList.push(marker);
						} catch(e) {}
					}
					// 设置小区图标的点击事件，里面以后专门的属性设置
					var options = {
						// 设置图标
						draw: 'icon',
						// 设置图标宽度
						width: 15,
						// 设置图标高度
						height: 15,
						// 给图标点击事件
			         	methods: {
				        	click: function(item) {
				        		if(null != item && null != item.name && null != item.cellId) {
					            	messageAlert("定位到：" + item.name + "小区，编码为：" + item.cellId);
					            	$("#uid").val(item.cellId);
					            	$("#cellId").val(item.cellId);
				        		}
				        	}
		         		}
					}
					// 将图标信息放到对象中
					var dataSet = new mapv.DataSet(me.overlayMarkerList);
					// 加载到地图上
					me.layer = new mapv.baiduMapLayer(me._map, dataSet, options);
					// 先隐藏，到>15层级之后，才显示
					me.layer.hide();
				}
			}
		});
        return el;
	}
	
    // 画图实际方法
    PoiCommunityLayer.prototype.draw = function() {
        this.drawOverlay();
	}
	
    // 画图方法
    PoiCommunityLayer.prototype.drawOverlay = function() {
		if(this.layer) {
			if(this._map.getZoom() < 15) {    
				this.layer.hide();
			} else {
				this.layer.show();
			}
		}
		var currentBounds = this._map.getBounds();
		// var minlng = currentBounds.getSouthWest().lng;
		// var maxlng = currentBounds.getNorthEast().lng;
		// var minlat = currentBounds.getSouthWest().lat;
		// var maxlat = currentBounds.getNorthEast().lat;
		currentBounds.containsPoint
        var len = this.cpList.length;
        while(len--) {
        	if(this._map.getZoom() < 15) {
        		this._map.removeOverlay(this.cpList[len]);
        		continue;
        	}
        	// var lng = this.overlayList[len].centerPoint.lng;
        	// var lat = this.overlayList[len].centerPoint.lat;
        	// if(lng>= minlng&& minlng<=maxlng&&lat>=minlat&&lat<=maxlat){
        	if(currentBounds.containsPoint(this.cpList[len].getPosition()))	{
        		this._map.addOverlay(this.cpList[len]);
        	} else {
        		this._map.removeOverlay(this.cpList[len]);
        	}
        }
	}
	
    // 定义点击事件
    PoiCommunityLayer.prototype.addEventListener = function(event, fun) {
		this._div['on' + event] = fun;
	}
	
    PoiCommunityLayer.prototype.intersects = function(aBounds, bBounds) {
		var aMinlng = aBounds.getSouthWest().lng;
		var aMaxlng = aBounds.getNorthEast().lng;
		var aMinlat = aBounds.getSouthWest().lat;
		var aMaxlat = aBounds.getNorthEast().lat;
		var bMinlng = bBounds.getSouthWest().lng;
		var bMaxlng = bBounds.getNorthEast().lng;
	 	var bMinlat = bBounds.getSouthWest().lat;
	 	var bMaxlat = bBounds.getNorthEast().lat;
	 	var minlng = Math.max(aMinlng, bMinlng);
	 	var maxlng =  Math.min(aMaxlng, bMaxlng);
	 	var minlat = Math.max(aMinlat, bMinlat);
	 	var maxlat =  Math.min(aMaxlat, bMaxlat);
	 	if(minlng > maxlng || minlat > maxlat) {
	 		return false;
	 	} else {
	 		return true;
	 	}
	}
    
    PoiCommunityLayer.prototype.transform = function(shape) {
    	var points = [];
    	var ps = JSON.parse(shape);
    	for(var i = 0, n = ps.length; i < n; i++) {
    		points.push(new BMap.Point(ps[i].lng, ps[i].lat));
    	}
    	//创建多边形
    	var polygon = new BMap.Polygon(points, 
    		{strokeColor: "rgb(145, 174, 233)", fillColor: '', strokeWeight: 2, strokeOpacity: 0.5, fillOpacity: 0.0, strokeStyle: 'solid'}); 
    	return polygon;
	}
	
    PoiCommunityLayer.prototype.getOverlayList = function () {
    	return this.overlayList;
    }
	
    PoiCommunityLayer.prototype.transformVMap = function(shape) {
		var points =[];
    	var ps = JSON.parse(shape);
    	var coordinates = [];
    	for(var i = 0, n = ps.length; i < n; i++) {
    		var li = [ps[i].lng, ps[i].lat];
    		coordinates.push(li);
    	}
    	var polygon = {
    		geometry: {
            	type: 'Polygon',
            	coordinates: [
            		coordinates
            	]
    		}
    	};
    	return polygon;
	}
    
	// 向命名空间注册.
	BMapLib.PoiCommunityLayer = PoiCommunityLayer; 
})()
