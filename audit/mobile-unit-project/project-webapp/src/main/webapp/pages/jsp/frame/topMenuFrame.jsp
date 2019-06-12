<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="java.util.*"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysRoleUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	String loginRoleId = request.getParameter("loginRoleId");//获取当前登录角色id
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
	List<SysRoleUser> sysRoleUserList = sysUser.getSysRoleUserList();//获取当前用户所有角色
	for(SysRoleUser sysRoleUser : sysRoleUserList) {
		if(sysRoleUser.getRoleId().equals(loginRoleId)) {
			sysUser.setLoginSysRoleUser(sysRoleUser);//设置当前登陆角色
			break;
		}
	}
	session.setAttribute(CST.SESSION_SYS_USER_INFO, sysUser);//往session里set当前登录用户
	String orgId = request.getParameter("orgId");
	String orgLevel = request.getParameter("orgLevel");
	if(orgId ==null){
	   orgId= sysUser.getOrgId();
	   orgLevel=sysUser.getOrgLevel().toString();
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/topMenuFrame.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/index/dist/echarts.min.js"></script>
<title>网格化智慧管理支撑平台</title>
<style type="text/css">
html,body{
    height:100%;
    overflow: hidden;
}
.ui-jqgrid tr.ui-row-ltr td, .ui-jqgrid tr.ui-row-rtl td {
    border-color: #ddd !important;
    color: #fff !important;
}
.ui-jqgrid-btable .ui-widget-content.ui-state-highlight td{
     color: #333 !important;
}
.ui-jqgrid-btable .ui-widget-content.ui-state-hover td{
 color: #333 !important;
}
.directSaleBtn {
	vertical-align: top;
	border-radius: 0px;
	width: 17%;
	height: 30px;
	text-align: center;
	font-size: 10px;
	position: relative;
	background: #3385FE;
	border-color: #3385FE;
	color: white;
}
</style>
</head>
<body >
	<input type="hidden" value="" id="hiddenOrgId" />
	<!-- 顶部导航栏开始 -->
	<div class="myHeaders clearfix" style="background:#fff;" >
		<div class="top-logo pull-left" >
			<img src="../../images/top-frame-logo.png">全省网格化运营管理平台
		</div>
        <div class="headmiddle pull-left">
			<div class="middle1 pull-left" id="middle1" ></div>
			<div class="middle3 pull-left" id="middle3"></div>
		</div>
		<div class="headright pull-right" >
			<ul class="clearfix">
				<li class="transparent">
					<a href="#">
						<span class="user-wel">
							<font style='font-size: 10px'>你好，<%=sysUser.getLoginSysRoleUser().getRoleName() %><%=sysUser.getOrgName() %>(<%=sysUser.getUserName() %>)</font>
						</span>
					</a>
				</li>
				<li class="transparent">
					<a class="exit-out"  href="#" onclick="doLoginOut()" data-toggle="tooltip" data-placement="bottom" title="退出">
						<i class="fa fa-sign-out"></i>&nbsp;退出
					</a>
				</li>
				<% if(sysRoleUserList.size()>1){ %>
					<li class="transparent">
						<a  class="toggle-role" href="#" onclick="doLoginRole()" data-toggle="tooltip" data-placement="bottom" title="切换">
							<i class="fa fa-exchange"></i>&nbsp;切换
						</a>
					</li>
				<%} %>
			</ul>
		</div>
	</div>
	<!-- 顶部导航结束 -->
	<!--主体部分-->
	<div class="main-container" id="main-container">
		<!-- 导航列表 -->
		<!-- 右侧内容区域-->
		<div class="main-content">
			<!-- 页面内容区域-->
			<div class="breadcrumbs" id="breadcrumbs" style="display:none;">
				<ul class="breadcrumb"></ul>
			</div>
			<!-- 页面内容区域-->
			<div class="page-content">
			<!-- iframe引入页面 -->
				<iframe id="contentLoader" src='' name="ifrmname" width="100%"   frameborder="0" style="overflow:auto;"></iframe>
			</div>
		</div>
	</div>
	<div id="chooseSysRoleUserFullBackground" class="fullBackground" style="display: none;"></div>
	<div id="chooseSysRoleUser" style="z-index: 1;display: none;">
		<div class="mailtop"></div>
		<div class="align-center">
			请选择角色<i class="fa fa-check red"></i>
		</div>
	</div>
</body>
<script type="text/javascript">
var orgId = "<%=orgId%>";
var orgLevel ="<%=orgLevel%>";
$( function() {
	$(".event-info").click(function(){
		var msg = $(this).text();
		 gridIWindow(orgId,msg);
	});
	
	//网格信息窗口
	var gridIWindow = function(orgId,msg){
		topwindow.showWindow({
			   title : msg,
			   data:{},
				url : $.cxt + "/pages/jsp/frame/gridItemInfo.jsp?orgId="+orgId,
				/* bottons : [{
					title : "关闭" ,
					fun : function() {
						topwindow.removeWindow();
					}
				}]  */
		   })
	}
});
$( function() {
	var orgId ="<%=orgId%>";
	$(".event-info1").click(function(){
		var msg = $(this).text();
		 gridIWindow(orgId,msg);
	});
	
	//网格信息窗口
	var gridIWindow = function(orgId,msg){
		topwindow.showWindow({
			   title : msg,
			   data:{},
				url : $.cxt + "/pages/jsp/frame/gridItemFinishInfo.jsp?orgId="+orgId,
				/* bottons : [{
					title : "关闭" ,
					fun : function() {
						topwindow.removeWindow();
					}
				}]  */
		   })
	}
});
$( function() {
	var orgId = "<%=orgId%>";
	$(".event-info2").click(function(){
		var msg = $(this).text();
		 gridIWindow(orgId,msg);
	});
	
	//网格信息窗口
	var gridIWindow = function(orgId,msg){
		topwindow.showWindow({
			   title : msg,
			   data:{},
				url : $.cxt + "/pages/jsp/frame/gridPendingInfo.jsp?orgId="+orgId,
				/* bottons : [{
					title : "关闭" ,
					fun : function() {
						topwindow.removeWindow();
					}
				}]  */
		   })
	}
});
$( function() {
	var orgId = "<%=orgId%>";
	$(".event-info3").click(function(){
		var msg = $(this).text();
		 gridIWindow(orgId,msg);
	});
	
	//网格信息窗口
	var gridIWindow = function(orgId,msg){
		topwindow.showWindow({
			   title : msg,
			   data:{},
				url : $.cxt + "/pages/jsp/frame/gridReadInfo.jsp?orgId="+orgId,
				/* bottons : [{
					title : "关闭" ,
					fun : function() {
						topwindow.removeWindow();
					}
				}]  */
		   })
	}
});
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/frame/topMenuFrame.js"></script>
</html>
