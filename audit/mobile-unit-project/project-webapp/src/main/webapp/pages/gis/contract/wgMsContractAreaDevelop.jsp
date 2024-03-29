<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<title>包保区域业务发展</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
<style type="text/css">
#topwindow101context{
	background: url(../../images/frameBg.png) repeat !important;
}

.modal-bottom{
	display: none !important;
}
.grid-search-div{
	margin-bottom:10px;
}
#topwindow101modal-body {
	height: 400px !important;
	overflow-x: hidden !important;
}
#gview_wgMsContractAreaDevelopListGrid{
	height: auto;
}
</style>
</head>
<script type="text/javascript">
<% 
String orgId = request.getParameter("orgId");
if(orgId ==null){
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
   orgId= sysUser.getOrgId();
}
%>
</script>
<script type="text/javascript">
	var orgId = "<%=orgId%>"; 
</script>
<body>
<div class="mainContent clearfix" style="margin-top:1%;">
	<div>
		<div class="tab-pane " id="gridInfoList">
		<input class="orgId" type="hidden" value="<%=orgId %>" />
			<div class="grid-search-div clearfix no-padding">
				<div class="no-padding">
					<div class="pull-left">
						<label><font color=#FFFFFF>地&nbsp;&nbsp;&nbsp;&nbsp;市&nbsp;&nbsp;&nbsp;:</font></label>
						<select id="girdCityCompany" style="width:140px;margin-right:10px;" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="pull-left">
		    			<label ><font color = #FFFFFF>区&nbsp;&nbsp;&nbsp;&nbsp;县&nbsp;&nbsp;&nbsp;:</font></label>
						<select  id="girdAreaCompany" style="width:140px;margin-right:10px;" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="pull-left">
		    			<label><font color = #FFFFFF>营业部&nbsp;&nbsp;&nbsp;:</font></label>
						<select id="girdSaleDept" style="width:140px;margin-right:10px;" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="pull-left">
		    			<label><font color = #FFFFFF>网格名称:</font></label>
						<select id="gridName" style="width:140px;margin-right:8px;" onchange="changeSelectOrg(this)">
						</select>
					</div>
				</div>
			</div>
	   		<div class="grid-search-div clearfix no-padding">
				<div class="no-padding">
					<div class="pull-left">
		    			<label><font color = #FFFFFF>一类类型:</font></label>
						<select style="width:140px;margin-right:10px;" id="bigType">
						</select>
					</div>
					<div class="pull-left">
		    			<label><font color = #FFFFFF>二类类型:</font></label>
						<select style="width:140px;margin-right:10px;" id="smallType">
						</select>
					</div>
					<div class="pull-left">
		    			<label><font color = #FFFFFF>账&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;&nbsp;&nbsp;:</font></label>
						<input type="text" class="form-control" id="AccountPeriod" style="width:140px;margin-right:10px;display:inline-block;height:28px;padding:0 16px;" placeholder="请输入日期">
					</div>
					<div class="pull-left">
		    			<button class="btn btn-primary" id="searchList">查询</button>
						<button  class="btn btn-primary" id="reset">重置</button>
						<button  class="btn btn-primary" id="export">导出</button>
					</div>
				</div>
			</div>
			<div class="grid infoList" style="margin-top: 10px;position: absolute;width: 97%;">
	            <table id="wgMsContractAreaDevelopListGrid"></table>
	            <div id="wgMsContractAreaDevelopPagers"></div> 
	        </div>
	   </div>
	 </div>
 </div>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/contract/wgMsContractAreaDevelop.js"></script>
</body>
