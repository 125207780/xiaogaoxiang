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
    <div  style="height: 100%;width: 100%;text-align: center;"><font color="#fffff" size="5">存量校园客户保有情况日报表</font></div>
    <div style="height: 100%;width: 100%;" id="pp">
       <div class="grid-search-div clearfix no-padding">
             <div class="pull-left" style="margin-left: 60%;margin-top: 7px;"> 
               <font color=#FFFFFF> 日&nbsp;&nbsp;&nbsp;&nbsp;期：</font>
           		<input type="text" class="form-control" id="dailyAccountPeriod5"  placeholder="请输入日期" style="width: 54%;top: -20px;left: 72px;height:25px;" data-date-format="yyyy-mm-dd" >
            </div>
            <div style="width:auto;top: 11%;right:23%;position: absolute;">
            	<button class="btn btn-primary" id="dailySearchList5">查询</button>
            </div>
            
        </div>
        <div class="left">
            <table id="dailyReportForm5InfoListGrid"></table>
	         <div id="dailyReportForm5InfoListPagers"></div> 
        </div>
    </div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/dailyReportForm5.js"></script>
</html>