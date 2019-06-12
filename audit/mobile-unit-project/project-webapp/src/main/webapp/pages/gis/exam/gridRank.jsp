<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>网格排名</title>
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
.tab-pane>div{
	margin-bottom:10px;
}
label{
	width:80px;
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
		<div class="tab-pane" id="gridInfoList">
		<input class="orgId" type="hidden" value="<%=orgId %>" />
			<div class="grid-search-div clearfix no-padding">
					<div class="pull-left">
						<label><font color=#FFFFFF>地&nbsp;&nbsp;&nbsp;&nbsp;市&nbsp;&nbsp;&nbsp;:</font></label>
						<select id="girdCityCompany" style="width:150px;margin-right:10px;" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="pull-left">
		    			<label ><font color = #FFFFFF>区&nbsp;&nbsp;&nbsp;&nbsp;县&nbsp;&nbsp;&nbsp;:</font></label>
						<select  id="girdAreaCompany" style="width:150px;margin-right:10px;" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="pull-left">
		    			<label><font color = #FFFFFF>营业部:</font></label>
						<select id="girdSaleDept" style="width:150px;margin-right:10px;" onchange="changeSelectOrg(this)">
						</select>
					</div>
				</div>
			</div>
			<div class="grid-search-div clearfix no-padding">
				<div class="pull-left no-padding">
					<label><font color = #FFFFFF>网格名称:</font></label>
					<select id="gridName"  style="width:150px;margin-right:10px;"  onchange="changeSelectOrg(this)">
					</select>
	    		</div>
				<div class="pull-left no-padding">
	    			<label class=""><font color = #FFFFFF>周期类型:</font></label>
					<select style="width:150px;margin-right:10px;"  id="cycleType">
					</select>
				</div>
				<div class="pull-left no-padding" style="margin-right:10px;">
	    			<label><font color = #FFFFFF>排名类型：</font></label>
					<input type="radio"  class="searchField " value="0" id="radio1">&nbsp;<font color=	#FFFFFF>单指标排名</font>&nbsp;&nbsp;&nbsp;
					<input type="radio"  class="searchField " value="1" id="radio2">&nbsp;<font color=	#FFFFFF>总得分排名</font>
				</div>
			</div>
			<div class="grid-search-div clearfix no-padding">
				<div class="pull-left">
	    			<label><font color = #FFFFFF>考核周期:</font></label>
					<select style="width:150px;margin-right:10px;"  id="evaluateCycle">
					</select>
				</div>
	    		<div class="no-padding pull-left">
		    		<div id="selectHidden">
		    			<label><font color = #FFFFFF>单项指标:</font></label>
						<select style="width:150px;margin-right:10px;" id="kpiName">
						</select>
					</div>
				</div>
				<div class="pull-left no-padding">
					<button class="btn btn-primary" style="margin-right:10px;" id="searchList">查询</button>
					<button  class="btn btn-primary" id="reset">重置</button>
				</div>
			</div>
			<div class="grid infoList" style="margin-top: 10px">
	            <table id="gridInfoListGrid"></table>
	            <div id="gridInfoListPagers"></div> 
	        </div>
	   </div>
	 </div>
 </div>
 <%-- <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/gridRank.js"></script> --%>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/gridRankModify.js"></script>
</body>
</html>