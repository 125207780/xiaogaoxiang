 
 
/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};


(function() {
    /** 
     * @exports CityLayeras BMapLib.CityLayer
     */
    var CityLayer  = 
    

    BMapLib.CityLayer=  function(orgId) {
        this.conf = {};
  			this.overlayList = [];
     
       this.orgId=orgId;
       
    }

    CityLayer.prototype = new BMap.Overlay();

    CityLayer.prototype.initialize = function(map) {
        this._map = map;
        var me=this;
        var el = document.createElement("div");
        $.ajax({
			url : $.cxt + "/gridCommon/selectCityShape", 
			data : {orgId:this.orgId},
			type: "POST",
			loading:false,
			success : function(list) {
			   var len=list.length;
			   while(len--){
				   var o = me.transform(list[len].shape);
				   map.addOverlay(o);
				   me.overlayList.push(o);
			   }
					 
					 
			 
			}})	
       
        
        return el;
    }
    CityLayer.prototype.draw = function(){
       
    }
    CityLayer.prototype.getOverlayList =function (){
    	return this.overlayList;
    }
    
    CityLayer.prototype.transform = function(shapeStr){
    	  var ps=	JSON.parse(shapeStr);
    	    var points =[];
    	    var len =ps.length;
    	    while(len--){
    	    	points.push(new BMap.Point(ps[len].lng,ps[len].lat));
    	    }
    	    	 var polygon = new BMap.Polygon(points, 
    						{strokeColor:"rgb(3,36,62)", fillColor:'', strokeWeight:2, strokeOpacity:0.7,fillOpacity: 0.0,strokeStyle: 'solid'});  //创建多边形
    	    return polygon;
 }
 
    BMapLib.CityLayer= CityLayer; // 向命名空间注册.
})()
