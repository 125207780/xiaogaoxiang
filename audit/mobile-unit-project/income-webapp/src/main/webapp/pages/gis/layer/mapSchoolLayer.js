 
 
/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};


(function() {
    /** 
     * @exports SchoolLayeras BMapLib.SchoolLayer
     */
    var SchoolLayer  = 
    

    BMapLib.SchoolLayer=  function(orgId) {
        this.conf = {};
  			this.overlayList = [];
       this.cpList = [];
       this.initFlag = false;
       this.orgId=orgId;
    }

    SchoolLayer.prototype = new BMap.Overlay();

    SchoolLayer.prototype.initialize = function(map) {
        this._map = map;
        var me=this;
        var el = document.createElement("div");
        $.ajax({
			url : $.cxt + "/gridCommon/selectAllSchoolPoiByOrgId", 
			data : {orgId:this.orgId},
			type: "POST",
			loading:false,
			success : function(list) {
				if(list.length>0){
					var len = list.length;
					while(len--){
						try{
						var shape = list[len].shape;
						if(shape!=""){
							var polygon = me.transformVMap(shape);
							me.overlayList.push(polygon);
						}
						
//						polygon.centerPoint =   JSON.parse(list[len].point);
						
//						polygon.uid=list[len].uid;
					 
							var myIcon = new BMap.Icon( $.cxt+"/pages/gis/layer/poi.png", new BMap.Size(15,15));
							myIcon.imageSize = new BMap.Size(15,15)
							var point = new BMap.Point(list[len].lng,list[len].lat);
							var marker = new BMap.Marker(point,{icon:myIcon,title:list[len].name}); 
							marker.uid=list[len].uid;
							
							me.cpList.push(marker);
							me._map.addOverlay(marker);
							marker.addEventListener('click', function(obj){
								topwindow.showWindow({
									   title : '学校信息',
									   data:{physicalId:this.uid,level:"2"},
										url : $.cxt + "/pages/gis/school/schoolIndex.jsp",
										bottons : [{
											title : "关闭" ,
											fun : function() {
												topwindow.removeWindow();
											}
										}] 
								   })
		                	});
						}catch(e){
							
						}
					}
					 var options = {
				                fillStyle: 'rgba(145,174,233, 0)',
				                strokeStyle: 'rgba(145,174,233, 0.8)',
				              
				                lineWidth: 2,
				                 
				            }
					   var dataSet = new mapv.DataSet(me.overlayList);
					   me.layer= new mapv.baiduMapLayer(me._map, dataSet,options);
					   me.layer.show();
					 
				}
			}})	
       
        
        return el;
    }
    SchoolLayer.prototype.draw = function(){
        this.drawOverlay();
}
 SchoolLayer.prototype.drawOverlay = function() {
	
		  if(this.layer){
			  if(this._map.getZoom()<10){    
				  this.layer.hide();
			  }else{
				  this.layer.show();
			  }
		  }
		 
	  
        var currentBounds = this._map.getBounds();
//        var minlng = currentBounds.getSouthWest().lng;
//   		var maxlng = currentBounds.getNorthEast().lng;
//   		var minlat = currentBounds.getSouthWest().lat;
//   		var maxlat = currentBounds.getNorthEast().lat;
        
        currentBounds.containsPoint
        var len = this.cpList.length;
        while(len--){
        	 if(this._map.getZoom()<10){
        		 this._map.removeOverlay(this.cpList[len]);
        		 
        		 continue;
             }
//        	var lng = this.overlayList[len].centerPoint.lng;
//        	var lat = this.overlayList[len].centerPoint.lat;
        	//if(lng>= minlng&& minlng<=maxlng&&lat>=minlat&&lat<=maxlat){
        		if(currentBounds.containsPoint(this.cpList[len].getPosition()))	{
            		this._map.addOverlay(this.cpList[len]);
            		 
            	}else{
            		this._map.removeOverlay(this.cpList[len]);
            	}
        	 
   		     
     	 }
 }
 SchoolLayer.prototype.intersects=function(aBounds,bBounds){
	 var aMinlng = aBounds.getSouthWest().lng;
	 var aMaxlng = aBounds.getNorthEast().lng;
	 var aMinlat = aBounds.getSouthWest().lat;
	 var aMaxlat = aBounds.getNorthEast().lat;
	 var bMinlng = bBounds.getSouthWest().lng;
	 var bMaxlng = bBounds.getNorthEast().lng;
	 var bMinlat = bBounds.getSouthWest().lat;
	 var bMaxlat = bBounds.getNorthEast().lat;
	 var minlng = Math.max(aMinlng,bMinlng);
	 var maxlng =  Math.min(aMaxlng,bMaxlng);
	 var minlat = Math.max(aMinlat,bMinlat);
	 var maxlat =  Math.min(aMaxlat,bMaxlat);
	 if(minlng>maxlng || minlat>maxlat){
		 return false;
	 }else{
		 return true;
	 }
	 
 }
    SchoolLayer.prototype.transform = function(shape){
    	var points =[];
    	var ps = JSON.parse(shape);
    	for(var i=0,n=ps.length;i<n;i++){
    		points.push(new BMap.Point(ps[i].lng,ps[i].lat));
    	}
    	 var polygon = new BMap.Polygon(points, 
					{strokeColor:"rgb(145,174,233)", fillColor:'', strokeWeight:2, strokeOpacity:0.5,fillOpacity: 0.0,strokeStyle: 'solid'});  //创建多边形
       return polygon;
  }
    SchoolLayer.prototype.transformVMap = function(shape){
    	var points =[];
    	var ps = JSON.parse(shape);
    	var coordinates =[];
    	for(var i=0,n=ps.length;i<n;i++){
    		var li = [ps[i].lng,ps[i].lat];
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
    
    BMapLib.SchoolLayer= SchoolLayer; // 向命名空间注册.
})()
