<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
    	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
    <style>
        html,body{
            height: 100%;
            width:100%;
        }
        
    </style>

</head>
<body>
    <div  style="height: 100%;width: 100%;text-align: center;"><font color="#fffff" size="5">校园一经 周报表</font></div>
    <div style="height: 100%;width: 100%;" id="momthReport1">
       <div class="grid-search-div clearfix no-padding">
             <div class="pull-left" style="margin-left: 0%;margin-top: 7px;"> 
               <font color=#FFFFFF> 日&nbsp;&nbsp;&nbsp;&nbsp;期：</font>
           		<input type="text" class="form-control" id="oneAccountPeriod2"  placeholder="请输入日期" style="width: 140px;top: -20px;left: 50px;height:25px;" data-date-format="yyyy-mm-dd" >
            </div>
            <div style="width:auto;top: 10.5%;right:81%;position: absolute;">
            	<button class="btn btn-primary" id="oneSearchList2">查询</button>
            </div>
             <div style="width:auto;top: 10.5%;right:76%;position: absolute;">
            	<button class="btn btn-primary" id="getReportForm12Export">导出</button>
            </div>
        </div>
        <div class="left">
            <table id="oneStatement2InfoListGrid"></table>
	         <div id="oneStatement2InfoListPagers"></div> 
        </div>
    </div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/oneStatement2.js"></script>
</html>