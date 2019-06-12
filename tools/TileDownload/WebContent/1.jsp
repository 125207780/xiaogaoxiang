<%@ page language="java" import="java.util.*" pageEncoding="Utf-8"%>
<!DOCTYPE html>
 
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	</style>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=jWK9pF6AOfNER0SbZStYjyO0"></script>
	<title>添加行政区划</title>
</head>
<body>
	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
	map.enableScrollWheelZoom();

	function getBoundary(){       
		var bdary = new BMap.Boundary();
		bdary.get("太原市小店区", function(rs){       //获取行政区域
			map.clearOverlays();        //清除地图覆盖物       
			var count = rs.boundaries.length; //行政区域的点有多少个
			if (count === 0) {
				alert('未能获取当前输入行政区域');
				return ;
			}
          	var pointArray = [];
			for (var i = 0; i < count; i++) {
				console.log(rs.boundaries[i]);
				var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
				map.addOverlay(ply);  //添加覆盖物
				pointArray = pointArray.concat(ply.getPath());
			}    
			map.setViewport(pointArray);    //调整视野  
			var marker = new BMap.Circle(new BMap.Point(112.5770165,37.71866768),2000,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); 
			
	 	map.addOverlay(marker);    
	 	console.log(JSON.stringify(marker.getBounds().getSouthWest()));
	 	console.log(JSON.stringify(marker.getBounds().getNorthEast()));
	 	addlabel();
		});   
	}

	setTimeout(function(){
		getBoundary();
	}, 2000);
	function addlabel() {
	    var pointArray = [
	      new BMap.Point(112.55430614946806,37.71866768),
	      new BMap.Point(112.5770165,37.700703241700296),
	      new BMap.Point(112.59972685053192,37.71866768)];
	    var optsArray = [{},{},{}];
	    var labelArray = [];
	    var contentArray = [
	      "台湾是中国的！",
	      "南海是中国的！",
	      "钓鱼岛是中国的！"];
	    for(var i = 0;i < pointArray.length; i++) {
	      optsArray[i].position = pointArray[i];
	      labelArray[i] = new BMap.Label(contentArray[i],optsArray[i]);
	      labelArray[i].setStyle({
			color : "red",
			fontSize : "12px",
				 height : "20px",
				 lineHeight : "20px",
				 fontFamily:"微软雅黑"
			 });
	      map.addOverlay(labelArray[i]);
	    }	  
	}
</script>
