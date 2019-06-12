<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% String gridCode = request.getParameter("gridCode");
%>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style>
ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
}
li{
    line-height:30px;
    font-size:16px;
    padding:5px 10px;
}
li.current{
    background:#CCCCCC;
    color:#0000FF;
    cursor: pointer;
}
li:hover{
    background:#CCCCCC;
    color:#0000FF;
    cursor: pointer;
}
label{
	color:#fff;
}
.form-control{
	display:inline-block;
	width:150px;
	height:28px;
	padding-bottom:0;
}
</style>
</head>
<script src="<%=request.getContextPath()%>/resource/ace/js/jquery-ui.js"></script>
<body>
<input value="<%=gridCode%>" id ="gridCode"  type="hidden" />
<div>	
<label>社会渠道经理：</label>
<input type="text" class=" form-control" id="txt" />
<span id="msc_input_div"></span>
<button  class="btn btn-primary" id="btn" >查询</button>
<div class="box" id="box">
   <ul></ul>
</div><br>
<table id="MainGridTable"></table>
<div  id="MainGridPage"></div>		
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/channelMaintenance/ChannelManager.js"></script>		
</body>
</html>