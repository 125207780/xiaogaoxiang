<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/echarts.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/jquery-ui.js"></script>
<link href='<%=request.getContextPath()%>/pages/css/gis/mapSearchControl.css' rel='stylesheet'></link>
<!-- 本地调试时候用这个百度地图的插件 
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=74af171e2b27ee021ed33e549a9d3fb9"></script>-->
<!-- 部署到服务器线上后，把这个平台提供的百度地图js开放出来，本地调试时候给关闭-->
<script src="http://10.154.144.169:7007/portal/map-sdk/libs/baidu/baidumap.js"></script> 
<script src="<%=request.getContextPath()%>/pages/js/mapv.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/GeoUtils.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapSearchControl.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapPoiLayer.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapChannelLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapStationLayer.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapAreaLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapSchoolLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapSearchSchoolControl.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapCityLayer.js"></script>

<script src="<%=request.getContextPath()%>/pages/js/bmap.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/common/emap.js"></script>
