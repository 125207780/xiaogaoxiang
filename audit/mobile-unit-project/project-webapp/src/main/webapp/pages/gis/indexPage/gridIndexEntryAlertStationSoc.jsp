<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.map.dao.entity.MarketManager"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
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
	String message = (String)request.getAttribute("message");
	List<MarketManager> json = (List<MarketManager>)request.getAttribute("json");
	Map <String,String> map = new HashMap<String,String>();
	for(int i =0 ;i<json.size();i++){
		String name = json.get(i).getUserName();
		String phone = json.get(i).getUserNumber();
		map.put(name, phone);
	}
	JSONObject jsonObject =new JSONObject(map);
%>
</script>
<script type="text/javascript">
	var message1="<%=message%>";
	var obj = JSON.parse('<%=jsonObject%>')
	parent.getJspDateStationSoc(obj)
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
</body>
</html>