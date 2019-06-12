

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
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/kpi/kpiManager.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<title>指标管理</title>
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
<body>
	<div class="kpi">
		<input class="orgId" type="hidden" value="<%=orgId %>" />
		<div class="kpi-left">
			<div class="kpiSearch">
				<div class="view-title">
					查询条件
					<div class="myOrners myOrner1"></div>
					<div class="myOrners myOrner2"></div>
					<div class="myOrners myOrner3"></div>
					<div class="myOrners myOrner4"></div>
				</div>
				<div class="kpi-index">
					<div class="kpi-select">
						<span>地市：</span>
						<select class="kpiSelect" id="cityCompany" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="kpi-select">
						<span>区县：</span>
						<select class="kpiSelect"  id="areaCompany" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="kpi-select">
						<span>营业部：</span>
						<select class="kpiSelect"  id="saleDept" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="kpi-select">
						<span>网格：</span>
						<select class="kpiSelect"  id="gridAll" onchange="changeSelectOrg(this)">
						</select>
					</div>
					<div class="orgClass">
					</div>
					<div class="kpi-select">
						<span><i>*</i>统计周期：</span>
						<select class="kpiSelect" id="countPeriod">
						</select>
					</div>
					<div class="kpi-select">
						<span><i>*</i>账期：</span>
						<input type="text" id="AccountPeriod">
						<!-- <div class="glyphicon glyphicon-calendar"></div> -->
					</div>
					<div class="kpi-addKpi">
						
					</div>
				</div>
				<div class="kpi-name">
					<span>指标名称：</span>
					<div class="kpiName-content">
						
					</div>
					<div class="kpi-button">
						<button class="btn btn-primary" type="button" id="screenButton">筛选</button>
						<button class="btn btn-primary" type="button" id="addButton">添加</button>
					</div>
				</div>
			</div>
			<div class="kpiView">
				<div class="view-title">
					指标展现
					<div class="myOrners myOrner1"></div>
					<div class="myOrners myOrner2"></div>
					<div class="myOrners myOrner3"></div>
					<div class="myOrners myOrner4"></div>
				</div>
				<div class="grid">
		            <table id="kpiResultGrid"></table>
		            <div id="grid-pager"></div>
			    </div>
			</div>
		</div>
		<div class="kpi-middle">
			<h5>指标情况概览</h5>
			<div class="kpi-situation">
				<div class="middle-select">
					<span>地市：</span>
					<select class="middleSelect" id="cityCompanyMiddle" onchange="changeSelectOrgMiddle(this)">
					</select>
				</div>
				<div class="middle-select">
					<span>区县：</span>
					<select class="middleSelect" id="areaCompanyMiddle" onchange="changeSelectOrgMiddle(this)">
					</select>
				</div>
				<div class="middle-select">
					<span>营业部：</span>
					<select class="middleSelect" id="saleDeptMiddle" onchange="changeSelectOrgMiddle(this)">
					</select>
				</div>
				<div class="middle-select">
					<span>网格：</span>
					<select class="middleSelect" id="gridAllMiddle" onchange="changeSelectOrgMiddle(this)">
					</select>
				</div>
				<div class="orgClassMiddle"></div>
			</div>
			<div class="middle-input">
				
			</div>
			<hr/>
			<div class="middle-map">
				<!-- <iframe id="contentLoader" src='/project-webapp/pages/jsp/kpi/KpiMap.jsp'  name="ifrmname" height="304px" width="100%" frameborder="0" style="overflow:hidden;">
				</iframe> -->
				<!-- <table class="mapTable">
				 <tr>
				 	<td>
				 		<div id="smallMap">
				 		</div>
				  	</td>
				 </tr> -->
				 <div class="openMap">
					 <div id="smallMap"></div>
					<!-- <div id="piecesBtns"></div>  -->
				 </div>
				 </table>
			</div>
		</div>
		<div class="kpi-right">
			<div class="rightTop">
				<div class="middle-select">
					<span>地市：</span>
					<select class="middleSelect" id="cityCompanyRight" onchange="changeSelectOrgRight(this)">
					</select>
				</div>
				<div class="middle-select">
					<span>区县：</span>
					<select class="middleSelect" id="areaCompanyRight" onchange="changeSelectOrgRight(this)">
					</select>
				</div>
				<div class="middle-select">
					<span>营业部：</span>
					<select class="middleSelect"  id="saleDeptRight" onchange="changeSelectOrgRight(this)">
					</select>
				</div>
				<div class="middle-select">
					<span>网格：</span>
					<select class="middleSelect"  id="gridAllRight" onchange="changeSelectOrgRight(this)">
					</select>
				</div>
				<div class="orgClassRight"></div>
			</div>
			<div class="right-input">
				
			</div>
			<div class="kpi-buttonRight">
				<button class="btn btn-primary" type="button" id="addButtonRight">添加</button>
			</div>
			<hr/>
			<div class="echartsRightButton">
				<span class="ranking">排名</span>
				<span class="trend">走势</span>
			</div>
			<div class="right-echarts">
				<div  id="right-echarts"></div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/kpi/kpiManager.js"></script>
<script type="text/javascript">
	$(function(){
		var orgLevel = '';
		var orgId = "<%=orgId%>"
		$.ajax({
			url : $.cxt + '/kpi/getOrgLevelAndLevelMax',
			data : {orgId : orgId},
			type : 'POST',
			async : false,
			success : function(data){
				var json = JSON.parse(data)
				if(json.code == '0'){
					orgLevel = json.data.orgLevel
				}
			}
		})
		window.onload = initResultMsg(orgLevel,null);
		window.onload = doubleLine(orgId);//echarts图
	})
</script>
</html>

