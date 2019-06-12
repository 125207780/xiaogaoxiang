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
%>
<!DOCTYPE html>
<html>
<head>
	<cxt:commonLinks />
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/frame.css" />
	<title>东方国信-移动事业部</title>
</head>
<body style="overflow-y:hidden">
	<!-- 顶部导航栏开始 -->
	<div id="navbar" class="navbar navbar-default">
		<!-- 顶部导航内容区域-->
		<div class="navbar-container" id="navbar-container">
			<!-- 顶部标题 -->
			<div class="navbar-header pull-left ">
				<a href="#" class="navbar-brand" style="padding:0px;">
					<img src="<%=request.getContextPath()%>/pages/images/login-bg.png" style="margin-top: 7px;margin-left:30px; height: 30px;">
				</a>
			</div>
			<!-- 菜单控制按钮 -->
			<div class="menuControl pull-left">
				<button class="btn btn-primary" data-toggle="tooltip" data-placement="bottom" title="点击切换菜单">
					<i class="fa fa-bars"></i>
				</button>
			</div>
			<!-- 顶部标题结束 -->
			<div class="navbar-buttons navbar-header pull-right" role="navigation">
				<ul class="nav ace-nav" o="" style="margin-right:0px;">
					<li class="transparent">
						<a href="#" data-toggle="tooltip" data-placement="bottom" title="查看消息">
							<i class="ace-icon fa fa-bell icon-animated-bell">
							</i>
							<span class="badge badge- badge-danger">
								5
							</span>
						</a>
					</li>					
					<li class="transparent">
						<a href="#">
							<span  style="line-height:32px;">
								<small>
									您好，<%=sysUser.getLoginSysRoleUser().getRoleName() %> --- <%=sysUser.getOrgName() %> --- <%=sysUser.getUserName() %>
								</small>
							</span>
						</a>
					</li>
					<li class="transparent">
						<a href="#" onclick="doLoginOut()">
							<i class="ace-icon fa fa-power-off"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 顶部导航结束 -->
	<!--主体部分-->
	<div class="main-container" id="main-container">
		<!-- 导航列表 -->
		<div id="sidebar" class="sidebar">
			<!-- 菜单结束 -->
		</div>
		<!-- 右侧内容区域-->
		<div class="main-content">
			<div class="breadcrumbs" id="breadcrumbs">
				<ul class="breadcrumb">
				</ul>
			</div>
			<!-- 页面内容区域-->
			<div class="page-content">
				<!-- iframe引入页面 -->
				<iframe id="contentLoader" name="ifrmname" width="100%" frameborder="0" style="overflow:hidden;">
				</iframe>
			</div>
		</div>
		<!--底部 -->
		<div class="footer" style="padding-top:0px;">
			<div class="footer-inner">
				<div class="footer-content">
					<span class="grey bigger">
						北京东方国信科技股份有限公司 移动事业部&copy; 2017
					</span>
				</div>
			</div>
		</div>
	</div>
	<!-- 主体部分结束 -->
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/frame/frame.js"></script>
</html>
