<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg" %>
<%@ page import="com.bonc.gridinfo.dao.entity.StationInfo"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.math.BigDecimal"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="org.json.JSONArray"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
<script type="text/javascript">
<% 
	String message = (String) request.getAttribute("message");
	List<StationInfo> json = (List<StationInfo>) request.getAttribute("stationInfoJson");
	String gridMapJson = (String) request.getAttribute("gridInfoJson");
	String errorMsgJson = (String) request.getAttribute("errorMsg");
	String stationMapJson = null;
	if(null!=json) {
		stationMapJson = "[";
		for(int i = 0;i < json.size(); i++){
			String stationCode = json.get(i).getStationCode();
			String stationName = json.get(i).getStationName();
			String gridName = json.get(i).getGridCode();
			BigDecimal stationLon = json.get(i).getStationLon();
			BigDecimal stationLat = json.get(i).getStationLat();
			if(i!=json.size()-1) {
				stationMapJson += "{\"stationCode\":\"" + stationCode + "\", \"stationName\":\"" + stationName + "\", \"stationLon\":\"" 
					+ stationLon + "\", \"stationLat\":\"" + stationLat + "\", \"gridName\":\"" + gridName + "\"},";
			} else {
				stationMapJson += "{\"stationCode\":\"" + stationCode + "\", \"stationName\":\"" + stationName + "\", \"stationLon\":\"" 
					+ stationLon + "\", \"stationLat\":\"" + stationLat + "\", \"gridName\":\"" + gridName + "\"}";
			}
		}
		stationMapJson += "]";
	}
	JSONArray jsonObject = stationMapJson==null?null:new JSONArray(stationMapJson);
	JSONArray gridJsonObject = gridMapJson==null?null:new JSONArray(gridMapJson);
	JSONObject errorJsonObject = errorMsgJson==null?null:new JSONObject(errorMsgJson);
%>
</script>
<script type="text/javascript">
	var message1 = "<%=message%>";
	var errorMsg = null;
	var obj = null;
	var gridObj = null;
	if("SUCCESS"==message1) {
		obj = JSON.parse('<%=jsonObject%>')
		gridObj = JSON.parse('<%=gridMapJson%>');
		parent.getJspDateStation(obj, gridObj, errorMsg, message1);
	} else {
		errorMsg = JSON.parse('<%=errorJsonObject%>');
		parent.getJspDateStation(obj, gridObj, errorMsg, message1);
	}
</script>

<style type="text/css">
#topwindow101context{
  background: url(../../images/frameBg.png) repeat !important;
}
.modal-body{
	background:none;
}
.modal-bottom{
	display: none !important;
}
.ui-jqgrid-labels{
	background:transparent !important;
}
.btn.btn-primary{
	padding:0 15px;
	height:28px !important;
	border-radius:3px;
}
.modal-footer,.modal-bottom{
	background:transparent !important;
}
.bootbox-body,.bootbox-body span{
	color:#fff !important;
}
</style>
</head>

<body>
	<div>
	</div>
</body>
</html>