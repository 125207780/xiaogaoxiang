<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Title</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
    <style>
        html,body{
            height: 100%;
            width:100%;
        }
        
    </style>

</head>
<body>
    <div  style="height: 100%;width: 100%;text-align: center;"><font color="#fffff" size="5">校园基站报表</font></div>
    <div style="height: 100%;width: 100%;" id="pp2">
       <div class="grid-search-div clearfix no-padding">
            
        </div>
        <div class="left">
            <table id="reportForm2InfoListGrid"></table>
	         <div id="reportForm2InfoListPagers"></div> 
        </div>
    </div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/stationReportForm.js"></script>
</html>