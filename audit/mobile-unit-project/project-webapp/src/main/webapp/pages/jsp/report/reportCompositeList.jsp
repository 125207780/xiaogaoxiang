<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	// 获取当前登录用户
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
	SysOrg sysOrg =sysUser.getSysOrg();
	String orgId = sysUser.getOrgId();
	String nowOrgLevel = sysOrg.getOrgLevel();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/report/reportCompositeList.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<style type="text/css">
		.ui-state-default.ui-jqgrid-hdiv tr th {
			border: 1px #F9F9FE solid ! important;
		}
		.ui-jqgrid tr.ui-row-ltr td, .ui-jqgrid tr.ui-row-rtl td {
		    border-color: #F9F9FE;
		    border-left: 0px solid #F9F9FE;
		}
		.ui-jqgrid .ui-jqgrid-bdiv{
			border-bottom: 1px #F9F9FE solid; 
			border-left: 1px #F9F9FE solid; 
			border-right: 1px #F9F9FE solid; 
		}
	</style>
</head>
<body class="clearfix" style="background: none; overflow: hidden;">
	<input type="hidden" id="hiddenOrgId" value="" />
	<input type="hidden" id="hiddenOldOrgId" value="" />
	<input type="hidden" id="hiddenOrgLevel" value="" />
	<input type="hidden" id="hiddenOldOrgLevel" value="" />
	<input type="hidden" id="hiddenGridOrgId" value="" />
	<div id="mainBody">
		<div id="leftPanel">
			<div id="topPanel">
				<div id="countOne">
				<font class='tjInfo' id='tjInfoOne'>汇总一：</font>
				<span id="numberOne" style="color:chartreuse;font-size: 30px;font-weight: bold;">0</span>
				</div>
				<div id="countOne">
				<font class='tjInfo' id='tjInfoTwo'>汇总二：</font>
				<span id="numberTwo" style="color:chartreuse;font-size: 30px;font-weight: bold;">0</span>
					<!-- <table>
						<tr>
							<td style="text-align:right;">
								<font class='tjInfo' id='tjInfoOne'>汇总一：</font>
							</td>
							<td>
								<span id="numberOne" style="color:chartreuse;font-size: 32px;font-weight: bold;">0</span>
							</td>
						</tr>
						<tr>
							<td style="text-align:right;">
								<font class='tjInfo' id='tjInfoTwo'>汇总二：</font>
							</td>
							<td>
								<span id="numberTwo" style="color:chartreuse;font-size: 32px;font-weight: bold;">0</span>
							</td>
						</tr>
					</table>  -->
				</div> 
				<div id="countTwo">
				</div> 
			</div>
			<!-- <div id="main"></div> -->
		</div>
		<!-- <i id="resbtn" class="fa fa-angle-double-right"></i> -->
		<div id='rightPanel'>
			<div id="conditionDivFour">
				<div id="conditionDivFourInfoDiv">
					<select id="citySelect11" style="width: 145px; border: 1px #F9F9FE solid;" onchange="selectLoad('cntySelect11');">
						<option value="">---地市---</option>
					</select> 
					<select id="cntySelect11" style="width: 145px; border: 1px #F9F9FE solid;" onchange="selectLoad('gridSelect11');">
						<option value="">---区县---</option>
					</select> 
					<select id="gridSelect11" style="width: 145px; border: 1px #F9F9FE solid;" onchange="selectLoad('chnlSelect11');">
						<option value="">---网格---</option>
					</select> 
				</div>
			</div>
			<div id="conditionDiv">
				<div id="conditionInfoDiv">
					<span class="conditionSpan" id="conditionSpanOne">
						<label class="conditionLabel"> 一级分类：</label>
						<select style="width: 145px; border: 1px #F9F9FE solid;" id="conditionOne">
							<option value="FH">放号</option>
							<option value="XZKD">新增宽带</option>
							<option value="ZDHY">终端合约</option>
							<option value="JTWXZ">家庭网新增</option>
							<option value="GJZDZXQSTTS">高价值低占小区渗透提升</option>
							<option value="XZJZWC">新增价值洼地</option>
							<option value="TBKHGYRHL">头部客户固移融合率</option>
							<option value="ZXWQYQDXD">中小微企业圈地行动</option>
							<option value="GRKHZJFSR">个人客户总计费收入</option>
							<option value="XZKHZJFSR">新增客户总计费收入</option>
							<option value="TBKHZTQK">头部客户整体情况</option>
							<option value="XWSC">小微市场</option>
							<option value="XYKH">校园客户</option>
						</select>
					</span>
					<span class="conditionSpan" id="conditionSpanTwo" style="margin-left: 20px;">
						<label class="conditionLabel">二级分类：</label>
						<select style="width: 145px; border: 1px #F9F9FE solid;"  id="conditionTwo">
							<option value="day">当日</option>
							<option value="month">当月</option>
						</select>
					</span>
					<span class="conditionSpan" id="conditionSpanTwoXWSC" style="margin-left:20px; display:none">
						<label class="conditionLabel">二级分类：</label>
						<select style="width: 145px; border: 1px #F9F9FE solid;"  id="conditionTwoXWSC">
							<option value=""></option>
							<option value="1">酒店宾馆</option>
							<option value="2">楼宇园区</option>
							<option value="3">沿街商铺</option>
						</select>
					</span>
				</div>
			</div>
			<div id="conditionDivThree">
				<span class="conditionSpan" id="conditionSpanThree" style="display: none;">
				</span>
			</div>
			<div id="conditionDivFive">
				<label class="conditionLabel">账期：</label> 
				<input class="form-control date-picker " value="" id="dv_date" type="text" />
			</div>
			<div id="importReportDiv">
				<button id='importReportBtn btn btn-sm btn-linead-blue'>导出</button>
			</div>
			<div id="reportDiv" style="border-radius: 0px 0px 5px 5px; background: no-repeat !important;">
				<div id="backUpInfo btn btn-sm btn-linead-blue" style="display: none;">返回</div>
				<div id="channelStationInfoGrids" class="more">
					<table id="idx_table" data-option="fitColumns: true, scrollbarSize: 0" style="width: 29px; color: #fff; 
						overflow-x: auto; border-collapse: separate; border-spacing: 0px 0px;"></table>
					<div id="idx_grid-pager"></div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		var nowOrgId = "<%=orgId%>";
		var nowOrgLevel = "<%=nowOrgLevel%>";
	</script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/report/reportCompositeList.js"></script>
</body>
</html>
