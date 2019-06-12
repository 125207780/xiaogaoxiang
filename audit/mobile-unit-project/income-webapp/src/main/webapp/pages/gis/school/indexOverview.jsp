<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.bean.IncomeUser" %>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	/* SysUser sysUser = (SysUser)session.getAttribute("incomeUser");//获取当前登录用户
	String oaId  = sysUser.getOaId(); */
	/* IncomeUser incomeUser = (IncomeUser) session.getAttribute("incomeUser");
	String oaId = incomeUser.getUserId();  */ 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>

<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp" />
<style type="text/css">
html, body {
	width: 100%;
	height: 100%;
}
body{
	background:url(<%=request.getContextPath()%>/pages/images/frameBg.png) no-repeat !important;
	background-size:100% 100% !important;
}
#main {
	height: 100%;
	float: left;
	width: 50%;
	position: relative;
}

#rightpanel {
	width: 25%;
	height: 100%;
	float: right;
	position: relative;
	border: 1px solid rgb(0, 158, 188);
}

#leftpanel {
	width: 25%;
	height: 100%;
	float: left;
	position: relative;
	border: 1px solid rgb(0, 158, 188);
}

.areaMenuLevel3 {
	display: none
}
#leftpanel td{
	color:#009ebc;
	padding-top: 2px;
}
.infoDetail{
	height: 100%;
}
#indexOverview{
	height: 100%;
}
.gridClick:hover {
	background:#8cb4bb;color:000;
	cursor: pointer;
}
#schP_gaoxiao:hover {
	background:#8cb4bb;color:000;
	cursor: pointer;
}
.areaMenuLevel3,.areaMenuLevel2,.areaMenuLevel1 {
	font-weight: bold;
}
.areaMenuLevel3 {
	display: block;
	float: right;
}
</style>
</head>
<body class="clearfix" style="background: none; position: relative">
			<div class="tab-pane in active clearfix" id="indexOverview" >
				<div id='leftpanel'>
				 <div class="pull-left" style="margin-left: 28px;margin-top: 7px;"> 
	               <font color=#FFFFFF> 月&nbsp;&nbsp;&nbsp;&nbsp;份：</font>
	           		<input type="text" class="form-control" id="AccountPeriod"  placeholder="请输入日期" style="width: 45%;top: -20px;left: 72px;height:25px;" data-date-format="yyyy-mm" >
	            </div>
					<table >
						<tr>
							<td >高校</td>
							<td >本科</td>
							<td >专科</td>
							<td>中专及其他</td>
						</tr>
						<tr>
							<td  id="schP_gaoxiao">&nbsp;</td>
							<td  id="schP_benke">&nbsp;</td>
							<td  id="schP_zhuanke">&nbsp;</td>
							<td  id="schP_zhongzhuan">&nbsp;</td>
						</tr>
						
						<tr>
							<td id="sch_user_num"></td>
							<td></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_user">
							<td  id="cmcc_user"></td>
							<td  id="cmcc_rate"></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="unit_sch_user">
							<td  id="UNI_SCH_USERS"></td>
							<td  id="uni_rate"></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="tele_sch_user">
							<td  id="tele_user"></td>
							<td  id="tele_rate"></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_kd">
							<td  id="cmcc_kd_user"></td>
							<td  id="cmcc_kd_rate"></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_unlim">
							<td  id="cmcc_unlim_user"></td>
							<td  id="cmcc_unlim_rate"></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_hy">
							<td  id="cmcc_hy_user"></td>
							<td  id="cmcc_hy_rate"></td>
							<td></td>
						</tr>
						<tr class="gridClick" id="cmcc_sch_v">
							<td  id="cmcc_v_user"></td>
							<td  id="cmcc_v_rate"></td>
							<td></td>
						</tr>
						<tr>
							<td  id="arpu"></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="mou"></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="dou"></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_del"></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_unlim"></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_kd"></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td  id="this_month_hy"></td>
							<td></td>
							<td></td>
						</tr>
					</table>
					</br>
			
				</div>
			
				<div id="main"></div>
				<div id='rightpanel'>
					<div class="grid infoList" style="margin-top: 10px">
						<table id="gridInfoListGrid"></table>
						<div id="gridInfoListPagers"></div>
					</div>
				</div>
			</div>
		
</body>
<script type="text/javascript">
	var orgId = "1";
 	<%-- var currentOaId = "<%=oaId%>"; --%>
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/indexOverview.js"></script>
</html>
