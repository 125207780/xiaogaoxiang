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
	if(orgId ==null){
	   orgId= sysUser.getOrgId();
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
#chooseSysRoleUser{
	width: 200px;
	background:#fff;
	position: absolute;
	top: 45%;
	left: 50%;
	margin-left:-100px;
	z-index: 1001;
	display: none;
	padding: 12px;
}
 
.submenu{
		/* width: 95px !important; */
	}
.transparent > a:hover{
	color: #8bb8ff !important;
}
  
.bootbox-message{
	margin-top: 8px;   
}
.twoLeve > a {
 	padding-left: 18px !important;
}
.ace-nav > li{
	height: 26px !important;
}
.ace-nav > li:hover{
	border-bottom:2px solid #629cc9 !important;
}
.fa.fa-angle-double-right {
	padding-top:4px;
}
.btn.btn-primary,.btn.btn-default,.btn.btn-info{
	height:28px;
	vertical-align:top;
	padding:0 15px;
	border-radius:3px;
}
.left .inner{
	text-align:center;
}
.left .nav{
	/* display:inline-block; */
	margin:0 auto;
	border-bottom: 2px solid #081c43;
}
.left .nav>li{
	width:100px;
	text-align:center;
}
</style>
</head>
<body style="overflow:hidden;background:url(../../images/frameBg.png) no-repeat;background-size:100%;padding-bottom:10px !important;">
	<!-- 顶部导航栏开始 -->
	<%-- <div id="navbar" class="navbar navbar-default" style="height:60px;background:#080d73;z-index: 999;border-bottom: 2px solid #3d4eba;">
		<!-- 顶部导航内容区域-->
		<div class="navbar-container" id="navbar-container">
			<!-- 顶部标题 -->
			<div class="navbar-header pull-left ">
				<a href="#" class="navbar-brand" style="position: relative;padding:0px;">
					<img src="<%=request.getContextPath()%>/pages/images/login-bg.png" style="margin-top: 14px; height: 30px;float:left;">
					<span class="titles">网格化营销管理支撑系统</span>
				</a>
			</div>
			<!-- 顶部标题结束 -->
			<div class="navbar-buttons navbar-header pull-right" role="navigation">
				<ul class="nav ace-nav" o="" style="margin-right:0px;">
					<li class="transparent">
						<a href="#">
							<i class="ace-icon fa fa-bell icon-animated-bell"></i><span style="padding-left:12px;">公告</span>
							<span class="badge badge- badge-danger">
								5
							</span>
						</a>
					</li>					
					<li class="transparent">
						<a href="#">
							<span class="user-info" style="line-height:32px;">
								<%=sysUser.getLoginSysRoleUser().getRoleName() %> --- <%=sysUser.getOrgName() %> ---<%=sysUser.getUserName() %>
							</span>
							
						</a>
					</li>
					<li class="transparent">
						<a  href="#" onclick="doLoginOut()" data-toggle="tooltip" data-placement="bottom" title="退出">
							<i class="ace-icon fa fa-power-off">
							</i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div> --%>
	<input class="orgIdInput" type="hidden" value="<%=orgId %>">
	<div class="myHeaders clearfix">
		 <div class="left">
		    <div class="inner">
		       	<ul class="nav ace-nav clearfix" id="info">
					<li class="transparent text-center">
						<a href="#">
							<span class="event-info" style="">
							待办事项
							</span>
							
						</a>
					</li>
					<li class="transparent text-center">
						<a href="#">
							<span class="event-info1" style="">
							已办事项
							</span>
							
						</a>
					</li>
					<!-- <li class="transparent" style="margin:0 15px;">
						<a href="#">
							<span class="event-info2" style="line-height:32px;">
							待阅信息
							</span>
							
						</a>
					</li>
					<li class="transparent" style="margin:0 15px;">
						<a href="#">
							<span class="event-info3" style="line-height:32px;">
							已阅信息
							</span>
							
						</a>
					</li> -->
				</ul>
		    	<%-- <ul class="">
		    		<li class="listTitle">
		    			<img src="<%=request.getContextPath()%>/pages/images/login-bg.png">
		    			<span>数据资产管理</span>
		    		</li>
		    		<li class="listInfo">
			    		<div>
			    			<!-- <i class="fa fa-icon fa-user"></i> -->
			    			<span style="margin:0px 10px;"> admin </span>
			    		</div>
		    		</li>
		    		<div class="modalDownBtn" title="点击">
		    			<i class="fa fa-angle-double-down"></i>
		    		</div>
		    		<div class="modalDownCon">
		    			<div class="modals">
		    				<div class="orners orners1"></div>
		    				<div class="orners orners2"></div>
		    				<div class="modalTitle clearfix">
		    					<div class="modalTitles">市场</div>
		    					<div class="modalTips"></div>
		    				</div>
		    				<div class="modalCons clearfix">
		    					<div class="modalLeft">
		    						<ul class="modalLeftUl">
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">移动日通份额</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">联通日通份额</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">电信日通份额</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">日通份额月环比</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    						</ul>
		    					</div>
		    					<div class="modalRight">
		    						<div id="superMarkedChart">
		    							
		    						</div>
		    					</div>
		    				</div>
		    			</div>
		    			<div class="modals">
		    				<div class="modalTitle clearfix">
		    					<div class="modalTitles">4G</div>
		    					<div class="modalTips"></div>
		    				</div>
		    				<div class="orners orners1"></div>
		    				<div class="orners orners2"></div>
		    				<div class="modalCons clearfix">
		    					<div class="modalLeft">
		    						<ul class="modalLeftUl">
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">4G客户</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">4G渗透率</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">VOLTE渗透率</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    						</ul>
		    					</div>
		    					<div class="modalRight">
		    						<div id="fourGChart">
		    							
		    						</div>
		    					</div>
		    				</div>
		    			</div>
		    			<div class="modals">
		    				<div class="modalTitle clearfix">
		    					<div class="modalTitles">加宽</div>
		    					<div class="modalTips"></div>
		    				</div>
		    				<div class="orners orners1"></div>
		    				<div class="orners orners2"></div>
		    				<div class="modalCons clearfix">
		    					<div class="modalLeft">
		    						<ul class="modalLeftUl">
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">和慧眼用户数</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">有线宽带到达</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">宽带电视渗透率</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    						</ul>
		    					</div>
		    					<div class="modalRight">
		    						<div id="jkChart">
		    							
		    						</div>
		    					</div>
		    				</div>
		    			</div>
		    			<div class="modals">
		    				<div class="modalTitle clearfix">
		    					<div class="modalTitles">渠道</div>
		    					<div class="modalTips"></div>
		    				</div>
		    				<div class="orners orners1"></div>
		    				<div class="orners orners2"></div>
		    				<div class="modalCons clearfix">
		    					<div class="modalLeft">
		    						<ul class="modalLeftUl">
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">渠道可控比</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">签约</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">加盟厅</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">电信</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    						</ul>
		    					</div>
		    					<div class="modalRight" style="width: 50%;">
		    						<ul class="modalLeftUl">
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">渠道有效可控比</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">营业厅</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">直供渠道</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    							<li class="modalLeftli clearfix">
		    								<div class="modalLeftliTitle">联通</div>
		    								<div class="modalLeftliNums">75.54%</div>
		    							</li>
		    						</ul>
		    					</div>
		    				</div>
		    			</div>
		    		</div>
		    	</ul> --%>
		    	
		    </div>
		</div> 
		<div class="left1" style="height: 35px;
							    position: absolute;
							    top: 28px;
							    width: 25%;
							    left: 2%;
							    background: url(../../images/topFrame/img_logo.png) no-repeat;
							    background-size: 100% 100%;">
		</div>
		<div class="left1" style="height: 25px;
							    position: absolute;
							    top: 62px;
							    width: 33.8%;
							    left: 1.5%;
							    background: url(../../images/topFrame/navigation.png) no-repeat;
							    background-size: 100% 100%;">
		</div>
		<!-- <div style="height: 51px;
					border-left: 2px solid #007284;
					position: absolute;
					top: 49px;">
		    
		</div> -->
		<div class="center">
		    <div class="titleText">
		    </div>
		</div>
		<div class="right">
		    <div class="inner">
		    	<ul class="nav ace-nav pull-right clearfix">
					<li class="transparent">
						<a href="#">
							<span class="user-info">
								你好，<%=sysUser.getLoginSysRoleUser().getRoleName() %><%=sysUser.getOrgName() %> ---<%=sysUser.getUserName() %>
							</span>
							
						</a>
					</li>
					<li class="transparent">
						<a  href="#" onclick="doLoginOut()" data-toggle="tooltip" data-placement="bottom" title="退出">
							<div class="exit">
							</div>
						</a>
					</li>
					<% if(sysRoleUserList.size()>1){ %>
						<li class="transparent">
							<a  href="#" onclick="doLoginRole()" data-toggle="tooltip" data-placement="bottom" title="切换">
								<div class="switch">
								</div>
							</a>
						</li>
					<%} %>
				</ul>
		    </div>
		</div>
		<div class="right" style="border-top:2px solid #081c43;border-bottom: 1px solid #1895b4;height: 37px;">
			<div class="inner" style="border:none;">
				<div id="sidebar" class="sidebar h-sidebar responsive">
				</div>
			</div>
		</div>
		<!-- <div style="height: 51px;
					border-left: 2px solid #007284;
					position: absolute;
					top: 49px;
					right: 10px;">
		    
		</div> -->
		
	</div>
	<!-- 顶部导航结束 -->
	<!--主体部分-->
	
	<div class="main-container" id="main-container" >
		<!-- 导航列表 -->
		
		<!-- 右侧内容区域-->
		<div class="main-content">
			<!-- 页面内容区域-->
			<div class="breadcrumbs" id="breadcrumbs" style="display:none;">
				<ul class="breadcrumb">
				</ul>
			</div>
			<!-- 页面内容区域-->
			<div class="page-content">
				<!-- iframe引入页面 -->
				<iframe id="contentLoader" src=''  name="ifrmname" width="100%" frameborder="0" style="overflow:hidden;">
				</iframe>
			</div>
		</div>
		<!--底部 -->
		<%--<div class="footer" style="padding-top:0px;">--%>
			<%--<div class="footer-inner">--%>
				<%--<div class="footer-content">--%>
					<%--<span class="grey bigger">--%>
						<%--北京东方国信科技股份有限公司 移动事业部&copy; 2017--%>
					<%--</span>--%>
				<%--</div>--%>
			<%--</div>--%>
		<%--</div>--%>
	</div>
	
	<div id="chooseSysRoleUserFullBackground" class="fullBackground" style="z-index: 1000;display: none;"></div>
	<div id="chooseSysRoleUser">
		<div class="mailtop"></div>
		<div class="align-center">
			请选择角色<i class="fa fa-check red"></i>
		</div>
	</div>
</body>
<script type="text/javascript">

$( function() {
	var orgId = "<%=orgId%>";
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
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/frame/topMenuFrame.js"></script>
</html>
