<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>结果发布</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
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
.grid-search-div{
	margin-bottom:10px;
}
.ui-jqgrid-htable{
	width:100%!important;
}
.modal-dialog{
width:64%!important;
}
#gridInfoListGrid{
	width:100% !important;
}
.modal-content{
		border: 1px solid #014e83;
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
<div class="mainContent clearfix">
	<div> 
		<div class="tab-pane " id="gridInfoList">
		<input class="orgId" type="hidden" value="<%=orgId %>" />
			<div class="grid-search-div clearfix no-padding">
				<div class="no-padding">
					<div  class="pull-left">
						<!--周期类型  add_cycleType-->
						<label>周期类型：</label> 
						<select  id="add_cycleType" style="width:150px;">
							<option value="month">月度考核</option>
							<option value="quarter">季度考核</option>
							<option value="year">年度考核</option>	
						</select>
						<!-- 考核周期  add_startDate-->
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label>考核周期：</label> 
						<input style="width:150px; display: inline-block;" class="form-control date-picker" id="add_startDate" type="text" data-date-format="yyyy-mm" > 
						<span id="add_endDateDiv" style="display: none;">~
							<input type="text" class="form-control"style="width: 150px; display: inline-block;" disabled="disabled" id="add_endDate"></input>
						</span>					
					</div>
					<div class="pull-right">
						<button class="btn btn-info" style="margin-right:10px;" id="searchList">查询</button>
						<button  class="btn btn-info" id="reset">重置</button>
						<button  class="btn btn-info" style="margin-left: 8px;"  id="release">发布</button>
					</div>
				</div>
				</div>
			</div>
			<div class="grid infoList" style="margin-top: 10px">
	            <table id="gridInfoListGrid"></table>
	            <div id="gridInfoListPagers"></div> 
	        </div>
	   </div>
	 </div>
 </div>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/resultRelease.js"></script>
</body>
</html>