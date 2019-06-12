<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<% 
String orgId = request.getParameter("orgId");
if(orgId ==null){
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
   orgId= sysUser.getOrgId();
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/dataVisualization.css" />
<script type="text/javascript" src="http://api.map.baidu.com/library/RichMarker/1.2/src/RichMarker_min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<title>数据可视化</title>
</head>
<body>
	<input value="<%=orgId %>" type="hidden" class="orgId"/>
	<div class="visual-left">
		<div class="kpi-configure">
			<div class="modalTitle clearfix">
				<div class="modalTitles">指标大类</div>
				<div class="modalTips"></div>
			</div>
			<div class="orners orners1"></div>
			<div class="orners orners2"></div>
			
			<div class="kpi-checkbox">
				<div class="kpiCheckbox">
					<input type="radio" id="T1106        ">
					<span>收入</span>
				</div>
				<div class="kpiCheckbox">
					<input type="radio" id="T1107        ">
					<span>客户</span>
				</div>
				<div class="kpiCheckbox">
					<input type="radio" id="T1108        ">
					<span>存量</span>
				</div>
				<div class="kpiCheckbox">
					<input type="radio" id="T1109        ">
					<span>4G</span>
				</div>
				<div class="kpiCheckbox">
					<input type="radio" id="T1110        ">
					<span>流量</span>
				</div>
				<div class="kpiCheckbox">
					<input type="radio" id="T1111">
					<span>宽带</span>
				</div>
				<div class="kpiCheckbox">
					<input type="radio" id="T1112">
					<span>政企业务</span>
				</div>
				<div class="kpiCheckbox">
					<input type="radio" id="T1113">
					<span>新业务</span>
				</div>
			</div>
			
			<div id="bigType" class="pieType"></div>
			<div id="samllType" class="pieType"></div>
			
		</div>
		<div class="visual-1">
			<div class="modalTitle clearfix">
				<div class="modalTitles">指标环比</div>
				<div class="modalTips"></div>
			</div>
			<div class="orners orners1"></div>
			<div class="orners orners2"></div>
			
			<div class="leftBar" id="leftBar"></div>
		</div>
	</div>
	<div class="visual-middle">
		<div class="map-all">
			<div id="mainMap"></div>
		</div>
	</div>
	<div class="visual-right">
		<div class="kpi-configure">
			<div class="modalTitle clearfix">
				<div class="modalTitles">总指标量</div>
				<div class="modalTips"></div>
			</div>
			<div class="orners orners1"></div>
			<div class="orners orners2"></div>
			<div class="rightPie" id="rightTotalPie"></div>
		</div>
		<div class="visual-1">
			<div class="modalTitle clearfix">
				<div class="modalTitles">总指标排名</div>
				<div class="modalTips"></div>
			</div>
			<div class="orners orners1"></div>
			<div class="orners orners2"></div>
			
			<div class="rightBar" id="rightBar"></div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/dataVisualization/dataVisualization.js"></script>
</html>