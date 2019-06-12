<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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
    <div  style="height: 100%;width: 100%;text-align: center;"><font color="#fffff" size="5">高校市场份额月报表</font></div>
    <div style="height: 100%;width: 100%;" id="momthReport2">
       <div class="grid-search-div clearfix no-padding">
             <div class="pull-left" style="margin-left: 0%;margin-top: 12px;"> 
               <font color=#FFFFFF> 日&nbsp;&nbsp;&nbsp;&nbsp;期：</font>
           		<input type="text" class="form-control" id="monthAccountPeriod5"  placeholder="请输入日期" style="width: 140px;top: -20px;left: 50px;height:25px;" data-date-format="yyyy-mm" >
            </div>
            <div style="width:auto;top: 11.4%;right:81%;position: absolute;">
            	<button class="btn btn-primary" id="monthSearchList5">查询</button>
            </div>
             <div style="width:auto;top: 11.4%;right:76%;position: absolute;">
            	<button class="btn btn-primary" id="getReportForm13Export">导出</button>
            </div>
        </div>
        <div class="left">
            <table id="monthReportForm5InfoListGrid"></table>
	         <div id="monthReportForm5InfoListPagers"></div> 
        </div>
    </div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/monthReportForm5.js"></script>
</html>