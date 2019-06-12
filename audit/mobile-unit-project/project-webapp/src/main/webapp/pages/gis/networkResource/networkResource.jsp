<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.common.cst.CST"%>
<cxt:commonLinks />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
 
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/gridInfo.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
	<title>网格信息</title>
	</head>
</html>
<style>
	/* #topwindow101context{
		overflow: hidden;
	    background: url(../../images/frameBg.png) repeat !important;;
	} */
	#infoTree{
		height: 548px !important;
		width: 170px !important;
	} 
	.infoDetail{
		margin-left: 180px;
	}
	.ztree li span.button.root_open {
   		background: url(../../images/table/ztreeSelectDown.png) no-repeat center !important;
	}
	.ztree li span.button.root_close{
		background: url(../../images/table/ztreeSelectRight.png) no-repeat center !important;
	}
	.ztree li span.button.center_open, .ztree li span.button.bottom_open{
		background: url(../../images/table/ztreeSelectDown.png) no-repeat center !important;
	}
	.ztree li span.button.center_close, .ztree li span.button.bottom_close{
		background: url(../../images/table/ztreeSelectRight.png) no-repeat center !important;
	}

</style>
<body>
<div class="mainContent clearfix">
<div class="pull-left infoTree ztree" id="infoTree" >
		
	</div>
</div>
<%
SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
SysOrg sysOrg =sysUser.getSysOrg();
String orgId = sysUser.getOrgId();
%>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/networkResource/networkResource.js"></script>
</body>
