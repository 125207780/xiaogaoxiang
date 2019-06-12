<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/firstPage_one.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/echarts4.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/echarts-gl.js"></script> --%>
<title>首页</title>
<style type="text/css">
	.portraitFirstType option:hover{
		background: radial-gradient(circle, #005C7E, #10214B);
	}
</style>
</head>
<script type="text/javascript">
	<% 
	String orgId = request.getParameter("orgId");
	if(orgId == null) {
		// 获取当前登录用户
		SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
   		orgId = sysUser.getOrgId();
	}
	%>
	$(function() {
		$("#portraitFirstType").css("background-color", "rgba(32,28,72,1)");
		$("#portraitSecondType").css("background-color", "rgba(32,28,72,1)");
	});
</script>
<body>
	<input value="<%=orgId%>" type="hidden" class="orgId"/>
	<div class="firstPage-left">
		<div class="portrait-top">
			<div class='topTitle'>画像分析</div>
			<div class="doubleSelect">
				<div class="leftSelect">
					<span>画像类型：</span>
					<select id="portraitFirstType">
						<option>用户画像</option>
						<option>渠道画像</option>
						<option>网格画像</option>
					</select>
				</div>
				<div class="leftSelect" id="secondSelect">
					<span>二级分类：</span>
					<select id="portraitSecondType">
						<option>其他用户</option>
						<option>校园用户</option>
					</select>
				</div>
			</div>
		</div>
		
		<div class="portrait-buttom">
			<div class="areaAge-arpu">
				<div class="area-age">
					<div class="areaAgeTop">
						<span>年龄占比&性别分布</span>
					</div>
					<div id="areaAge"></div>
				</div>
				<div class="arpu-bar">
					<div class="arpuBarTop">
						<span>用户ARPU消费情况</span>
					</div>
					<div id="arpuBar"></div>
				</div>
			</div>
			<div class="dou-mou">
				<div class="dou-echarts">
					<div class="douEchartsTop">
						<span>用户DOU使用情况</span>
					</div>
					<div id="douEcharts"></div>
				</div>
				<div class="mou-echarts">
					<div class="mouEchartsTop">
						<span>用户MOU使用情况</span>
					</div>
					<div id="mouEcharts"></div>
				</div>
			</div>
			<div class="preference-app">
				<div class="preference-echarts">
					<div class="preferenceEchartsTop">
						<span>常驻用户偏好终端品牌</span>
					</div>
					<div id="preferenceEcharts"></div>
				</div>
				<div class="app-echarts">
					<div class="appEchartsTop">
						<span>区域用户APP使用次数</span>
					</div>
					<div id="appEcharts"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="firstPage-middle">
		<div class="account-top">
			<div class='topTitle'>规模统计</div>
			<div class="middle-button">
				<div class="middleButton">
					<span style="color: red; font-weight: bold;" id="income">收入规模</span>
					<div id="incomeScale" style="color: red; font-weight: bold;"></div>
				</div>
				<div class="middleButton">
					<span id="customer">客户规模</span>
					<div id="customerScale"></div>
				</div>
				<div class="middleButton">
					<span id="cell_num">小区规模</span>
					<div id="cellScale"></div>
				</div>
				<div class="middleButton">
					<span id="group_num">集团规模</span>
					<div id="groupScale"></div>
				</div>
				<div class="middleButton">
					<span id="chnl_num">渠道规模</span>
					<div id="chnlScale"></div>
				</div>
			</div>
		</div>
		<div class="middle-map">
			<div id="mainOrg">
			
			</div>
		</div>
		<div class="middle-line">
			<div class="echartsLineTop">
				<span>新业务趋势</span>
				<div class="lineDayMonth">
					<span id="lineDay" class="lineDate" lineId="day">日</span>
					<span>|</span>
					<span id="lineMonth" class="lineDate" lineId="month">月</span>
				</div>
			</div>
			<div class="echartsLine" id="echartsLine"></div>
		</div>
	</div>
	<div class="firstPage-right">
		<div class="account-top">
			<div class='topTitle'>规模占比</div>
			<div class="right-button">
				<!-- <div class="rightButton">
					<span id="incomeRight">收入规模</span>
					<div>20%</div>
				</div>
				<div class="rightButton">
					<span id="customerRight">客户规模</span>
					<div>20%</div>
				</div>
				<div class="rightButton">
					<span id="villageRight">小区规模</span>
					<div>20%</div>
				</div>
				<div class="rightButton">
					<span id="groupRight">集团规模</span>
					<div>20%</div>
				</div>
				<div class="rightButton">
					<span id="channelRight">渠道规模</span>
					<div>20%</div>
				</div> -->
			</div>
		</div>
		<div class="right-Pie">
			<div class="rightPieTop"><span>业务规模占比</span></div>
			<div class="rightPieComtent">
				<div id="rightPie"></div>
				<div class="grid">
					<table id="businessScale" data-option="fitColumns: true, scrollbarSize: 0,"></table>
				</div>
			</div>
		</div>
		<div class="right-Bar">
			<div class="rightBarTop"><span>各归属业务规模排名</span></div>
			<div id="rightBar"></div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPage_one.js"></script>
</html>