<%@ page language="java" import="java.util.*" pageEncoding="Utf-8"%>
<!DOCTYPE html>
<html>
<% String path = request.getContextPath(); %>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
	body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	
	</style>
	
	<script type="text/javascript" src="<%=path %>/baidumap_offline_v2_load.js"></script>
	
	<!-- script type="text/javascript" src="<%=path %>/?http://api.map.baidu.com/api?v=2.0&ak=jWK9pF6AOfNER0SbZStYjyO0"></script -->
	
	<title>地图展示</title>
</head>
<body>

	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
 
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.400244,39.92556);
	map.centerAndZoom(point, 15);
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地图中
	marker.addEventListener("click",getAttr);
	map.enableScrollWheelZoom(true);     
	function getAttr(){
		var p = marker.getPosition();       //获取marker的位置
		alert("marker的位置是" + p.lng + "," + p.lat);   
		map.openInfoWindow(infoWindow,pStart);
	}
	
		var pStart = new BMap.Point(116.392214,39.918985);
	var pEnd = new BMap.Point(116.41478,39.911901);
	var rectangle = new BMap.Polygon([
		new BMap.Point(pStart.lng,pStart.lat),
		new BMap.Point(pEnd.lng,pStart.lat),
		new BMap.Point(pEnd.lng,pEnd.lat),
		new BMap.Point(pStart.lng,pEnd.lat)
	], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});  //创建矩形
	
	map.addOverlay(rectangle);         //增加矩形
 	rectangle.enableEditing();
	var sContent =
	"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + 
	 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
	"</div>";
	
	var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
	
	rectangle.addEventListener("click", function(){  
		alert(1)        
	   map.openInfoWindow(infoWindow,pStart);
	   alert(2)     
	   //图片加载完毕重绘infowindow
	    
	});
	
	
</script>