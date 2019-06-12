<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/echarts.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/jquery-ui.js"></script>
<link href='<%=request.getContextPath()%>/pages/css/gis/mapSearchControl.css' rel='stylesheet'></link>
<!-- 本地调试时候用这个百度地图的插件-->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=74af171e2b27ee021ed33e549a9d3fb9"></script>
<!-- 部署到服务器线上后，把这个平台提供的百度地图js开放出来，本地调试时候给关闭
<script src="http://10.154.144.169:7007/portal/map-sdk/libs/baidu/baidumap.js"></script>-->
 
<script src="<%=request.getContextPath()%>/pages/js/mapv.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/GeoUtils.js"></script>
<!-- local用本地的基站和渠道  -->
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapSearchControl.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapPoiLayer.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapPoiCommunityLayer.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapChannelLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapStationLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapNonStationLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapNonCommunityLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapNonChannelLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapOfficeBuildingLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapGovernmentUnitLayer.js"></script>
<!-- inter 用服务器上的搜索和基础单元
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapSearchControlInter.js"></script> -->
<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapPoiLayerInter.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapChannelLayerInter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapStationLayerInter.js"></script> --%> 

<link href='<%=request.getContextPath()%>/pages/css/gis/mapPeriphery.css' rel='stylesheet'></link>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapPeriphery.js"></script>

<!-- 地图页菜单 start -->
<link href='<%=request.getContextPath()%>/pages/css/gis/mapMenuLayer.css' rel='stylesheet'></link>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapMenuLayer.js"></script>
<!-- 地图页菜单 end -->

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapAreaLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapSchoolLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapGridSchoolLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapSearchSchoolControl.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapCityLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapMallLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapNewSchoolLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapVillageLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapTownLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapMarketLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapAbGroupLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapCdGroupLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapCommunityLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapNonAbGroupLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapNonCdGroupLayer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapImportantCommunityLayer.js"></script>

<script src="<%=request.getContextPath()%>/pages/js/bmap.js"></script>
 
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/common/emap.js"></script>
