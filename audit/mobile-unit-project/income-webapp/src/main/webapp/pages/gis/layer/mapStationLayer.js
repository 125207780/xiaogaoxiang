 
 
/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};


(function() {
    /** 
     * @exports StationLayeras BMapLib.StationLayer
     */
    var StationLayer  = 
    

    BMapLib.StationLayer=  function(orgId) {
        this.conf = {};
  			this.overlayList = [];
     
       this.orgId=orgId;
    }

    StationLayer.prototype = new BMap.Overlay();

    StationLayer.prototype.initialize = function(map) {
        this._map = map;
        var me=this;
        var el = document.createElement("div");
        $.ajax({
			url : $.cxt + "/gridCommon/selectAllStationByOrgId", 
			data : {orgId:this.orgId},
			type: "POST",
			loading:false,
			success : function(list) {
//				var myIcon = new BMap.Icon( $.cxt+"/pages/gis/layer/station.png", new BMap.Size(15,15));
//				myIcon.imageSize = new BMap.Size(15,15)
				
				 var img = new Image();
			        img.src = $.cxt+"/pages/gis/layer/station.png";
				if(list.length>0){
					var len = list.length;
					while(len--){
//						try{
//						var lng = list[len].lng;
//						var lat = list[len].lat;
//						var point = new BMap.Point(lng, lat);
//						
//						var marker = new BMap.Marker(point,{icon:myIcon}); 
//						marker.uid=list[len].uid;
						 
//						marker.addEventListener('click', function(obj){
//						 
//							topwindow.showWindow({
//								   title : '基站信息',
//								   data:{uid:this.uid},
//									url : $.cxt + "/pages/gis/layer/stationInfo.jsp",
//									bottons : [{
//										title : "关闭" ,
//										fun : function() {
//											topwindow.removeWindow();
//										}
//									}] 
//							   })
//	                	});
//						 
//						polygon.centerPoint =   JSON.parse(list[len].point);
//						me.overlayList.push(marker);
//						
//						}catch(e){
//							
//						}
						var lng = list[len].lng;
						var lat = list[len].lat;	
					
						var point = new BMap.Point(lng, lat);
						var marker = {
			                    geometry: {
			                        type: 'Point',
			                        coordinates: [lng, lat]
			                    },
			                    uid: list[len].uid ,
			                    icon: img
			                }
						me.overlayList.push(marker);
					}
					
					

					 var options = {
							 draw: 'icon',
							 width: 15,
			                  height: 15,
			                  methods: {
				                  click: function (item) {
				                	  return;
				                	  if(item){
				                		  topwindow.showWindow({
											   title : '基站信息',
											   data:{uid:item.uid},
												url : $.cxt + "/pages/gis/layer/stationInfo.jsp",
												bottons : [{
													title : "关闭" ,
													fun : function() {
														topwindow.removeWindow();
													}
												}] 
										   })
				                	  }
				                      
				                  },
				                  mousemove : function(item){
				                	 if(item&&me._map.getZoom()<17){
				                			 me._map.setDefaultCursor("pointer");
									 }else{
										 me._map.setDefaultCursor("default");
				                	 } 
				                 } 
				                 
				              }      
				         }
					   var dataSet = new mapv.DataSet(me.overlayList);
					   me.layer= new mapv.baiduMapLayer(me._map, dataSet,options);
					   me.layer.hide();
				}
			}})	
       
        
        return el;
    }
    StationLayer.prototype.draw = function(){
        this.drawOverlay();
}
 StationLayer.prototype.drawOverlay = function() {
	 
	 if(this.layer){
		  if(this._map.getZoom()<15){    
			  this.layer.hide();
		  }else{
			  this.layer.show();
		  }
	  }
      return;
        var currentBounds = this._map.getBounds();
//        var minlng = currentBounds.getSouthWest().lng;
//   		var maxlng = currentBounds.getNorthEast().lng;
//   		var minlat = currentBounds.getSouthWest().lat;
//   		var maxlat = currentBounds.getNorthEast().lat;
        var len = this.overlayList.length;
        while(len--){
        	 if(this._map.getZoom()<15){
        		 this._map.removeOverlay(this.overlayList[len]);
        		 continue;
             }
//        	var lng = this.overlayList[len].centerPoint.lng;
//        	var lat = this.overlayList[len].centerPoint.lat;
        	//if(lng>= minlng&& minlng<=maxlng&&lat>=minlat&&lat<=maxlat){
        	 
        	if(currentBounds.containsPoint(this.overlayList[len].getPosition()))	{
        		this._map.addOverlay(this.overlayList[len]);
        		 
        	}else{
        		this._map.removeOverlay(this.overlayList[len]);
        	}
   		     
     	 }
 }
 
    BMapLib.StationLayer= StationLayer; // 向命名空间注册.
})()
