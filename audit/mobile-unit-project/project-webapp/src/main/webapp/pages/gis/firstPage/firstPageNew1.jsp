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
	<jsp:include page="/pages/gis/common/mapjs.jsp"/>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/firstPageNew.css" />	
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/dataVisualization2.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<title>网格化智慧管理支撑平台</title>
	<style type="text/css">
		.topValue{
			text-align: left;
		}
		.node_name{
			color: #00E1FD;
		}
		#pg_grid-pager5.ui-pager-control{
			margin-right: 26%;
		}
	</style>
</head>
<body >
	 <div class="outerDiv">
		<div style="width: 100%;height: 100%;">
			<input value="<%=orgId %>" type="hidden" class="orgId"/>
			<!-- <div style="width: 100%;height: 7%;">
				<div class="headlogo">
				</div>
				<div class="headRight">
					<span>综合指标视图</span>
				</div>
			</div> -->
			<div class="firstPage-left">
				<div class="flex titleLeveL1">
					网格资源概况
				</div>
				<div class="titleLevel1Content">
					<!-- 网格信息概述 -->
					<div class="gridInfo">
						<div class="gridTitle">
							<span>网格信息概述</span>
						</div>
						<div class="gridRow3Cell3">
							<div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="" bigScaleType="grid">网格总数</div>
									<div class="cellContent scaleNum" id="gridTotal"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="1" bigScaleType="grid">一类网格数</div>
									<div class="cellContent scaleNum" id="gridType1Count"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="2" bigScaleType="grid">二类网格数</div>
									<div class="cellContent scaleNum" id="gridType2Count"></div>
								</div>
							</div>
							<div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="3" bigScaleType="grid">三类网格数</div>
									<div class="cellContent scaleNum" id="gridType3Count"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="3" bigScaleType="staff">网格经理数</div>
									<div class="cellContent scaleNum" id="gridManagerCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="1" bigScaleType="staff">渠道经理数</div>
									<div class="cellContent scaleNum" id="channelManagerCount"></div>
								</div>
							</div>
							<div class="clearBorderBottom">
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="6" bigScaleType="staff">直销人员数</div>
									<div class="cellContent scaleNum" id="directSalesStaffCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="7" bigScaleType="staff">装维人员数</div>
									<div class="cellContent scaleNum" id="maintenanceStaffCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
								</div>
							</div>
						</div>
					</div>
					
					<!-- 网格分类规模 -->
					<div class="gridClass">
						<div class="gridTitle">
							<span>网格分类规模</span>
						</div>
						<div class="gridRow2Cell3">
							<div>
								<div class="cell3">
									<div class="cellTitle">收入规模</div>
									<div class="cellContent" id="incomeScale"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle">CD集团客户规模</div>
									<div class="cellContent" id="groupCustomerSize"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle">小区规模</div>
									<div class="cellContent" id="communitySize"></div>
								</div>
							</div>
							<div class="clearBorderBottom">
								<div class="cell3">
									<div class="cellTitle">渠道规模</div>
									<div class="cellContent" id="channelSize"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle">客户规模</div>
									<div class="cellContent" id="clientSize"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
								</div>
							</div>
						</div>
					</div>
					<!-- 渠道基站信息 -->
					<div class="channelStation">
						<div class="gridTitle">
							<span>渠道基站信息</span>
						</div>
						<div class="gridRow3Cell3">
							<div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="" bigScaleType="chnl">渠道总数</div>
									<div class="cellContent scaleNum" id="channelTotal"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="1" bigScaleType="chnl">实体渠道</div>
									<div class="cellContent scaleNum" id="physicalChannelCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="2" bigScaleType="chnl">直销渠道</div>
									<div class="cellContent scaleNum" id="directSalesChannelCount"></div>
								</div>
							</div>
							<div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="3" bigScaleType="chnl">分销渠道</div>
									<div class="cellContent scaleNum" id="distributionChannelCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="1" bigScaleType="chnlLevel1">代理/加盟厅</div>
									<div class="cellContent scaleNum" id="proxyCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="2" bigScaleType="chnlLevel1">自有厅</div>
									<div class="cellContent scaleNum" id="ownHallCount"></div>
								</div>
							</div>
							<div class="clearBorderBottom">
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="" bigScaleType="stat">基站总数</div>
									<div class="cellContent scaleNum" id="baseStationTotal"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="1" bigScaleType="stat">2/3G基站数</div>
									<div class="cellContent scaleNum" id="baseStation2_3GCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="3" bigScaleType="stat">4G基站个数</div>
									<div class="cellContent scaleNum" id="baseStation4GCount"></div>
								</div>
							</div>
						</div>
					</div>
					
					<!-- 用户规模概览 -->
					<div class="userSize clearMarginBottom">
						<div class="gridTitle">
							<span>用户规模概览</span>
						</div>
						<div class="gridRow2Cell3">
							<div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="1" bigScaleType="voice">期末通话客户数</div>
									<div class="cellContent" id="finalCallsCustomerCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="2" bigScaleType="voice">新增通话客户数</div>
									<div class="cellContent" id="addCallsCustomerCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle scaleTypeName" smallScaleType="3" bigScaleType="voice">净增通话客户数</div>
									<div class="cellContent" id="netIncreCallsCustomer"></div>
								</div>
							</div>
							<div class="clearBorderBottom">
								<div class="cell3">
									<div class="cellTitle">2/3G流量客户数</div>
									<div class="cellContent" id="traffic23GCustomerCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle">4G流量客户数</div>
									<div class="cellContent" id="traffic4GCustomerCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell3">
									<div class="cellTitle">家庭宽带用户数</div>
									<div class="cellContent" id="homeBroadbandUserCount"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="firstPage-middle">
				<div class="flex titleLeveL1">
					指标资源概况
				</div>
				<div class="titleLevel1Content">
					<div style="width: 100%;height: 79.5%;">
						<div class="targetResourceList">
							<div class="ellipse">
								<span class="ellipseTitle">收入</span>
								<span id="incomeCount"></span>
							</div>
							<div class="ellipse">
								<span class="ellipseTitle">宽带</span>
								<span id="broadbandCount"></span>
							</div>
							<div class="ellipse">
								<span class="ellipseTitle">政企</span>
								<span id="governmentCompanyCount"></span>
							</div>
							<div class="ellipse">
								<span class="ellipseTitle">新增</span>
								<span id="increament"></span>
							</div>
							<div class="ellipse">
								<span class="ellipseTitle">放号量</span>
								<span id="putNumberCount"></span>
							</div>
							<div class="ellipse">
								<span class="ellipseTitle">4G</span>
								<span id="4GCount"></span>
							</div>
						</div>
						<div class="middle-up" style="width: 100%;height: 80%;">
							<div id="mainMap" style="width: 100%;height: 100%;"></div>
						</div>
					</div>
					<!-- 运营监控一览 -->
					<div class="operateMonitor clearMarginBottom">
						<div class="gridTitle">
							<span>运营监控一览</span>
						</div>
						<div class="gridRow2Cell6">
							<div>
								<div class="cell6">
									<div class="cellTitle">区域总监登陆系统次数</div>
									<div class="cellContent" id="regionalDirectorLoginCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">渠道包保数</div>
									<div class="cellContent" id="channelGuaranteeCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">包保基础单元数</div>
									<div class="cellContent" id="guaranteeBasicUnitCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">任务工单派发数</div>
									<div class="cellContent" id="TaskOrderDistributeCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">任务工单完成数</div>
									<div class="cellContent" id="TaskOrderCompleteCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">任务工单警告数</div>
									<div class="cellContent" id="TaskOrderAlarmCount"></div>
								</div>
							</div>
							<div class="clearBorderBottom">
								<div class="cell6">
									<div class="cellTitle">小区总数</div>
									<div class="cellContent" id="communityCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">高校总数</div>
									<div class="cellContent" id="shoolCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">沿街商铺数</div>
									<div class="cellContent" id="streetShopsCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">宽带小区数</div>
									<div class="cellContent" id="broadbandCommunityCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">聚类市场数</div>
									<div class="cellContent" id="clusterMarketCount"></div>
								</div>
								<div class="cellDividLine"></div>
								<div class="cell6">
									<div class="cellTitle">商圈数</div>
									<div class="cellContent" id="businessDistrictCount"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="firstPage-right">
				<div class="flex titleLeveL1">
					任务资源概况
				</div>
				<div class="titleLevel1Content">
					<div class="taskBody">
						<div class="taskList">
							<div class="taskEllipse">
								<span class="taskEllipseTitle">收入类完成进度</span>
								<span style="display: block;">100万</span>
								<span>83%</span>
							</div>
							<div class="taskEllipse">
								<span class="taskEllipseTitle">重点业务办理量完成进度</span>
								<span style="display: block;">100万</span>
								<span>83%</span>
							</div>
							<div class="taskEllipse">
								<span class="taskEllipseTitle">重点工作完成进度</span>
								<span style="display: block;">100万</span>
								<span>83%</span>
							</div>
						</div>
						
						
						<div class="assessScore">
							<div class="gridTitle">
								<span>考核得分(单位:分)</span>
							</div>
							<div class="assessScoreContent" id="assessScoreContent"  style="width:100%;float:right;height:88%;padding-left:20px;">
								
							</div>
						</div>
						
						<div class="monthAssess">
							<div class="monthAssessTitle">省公司月度考核指标完成情况</div>
							<div class="monthAssessCondition">
								<span>账&nbsp;&nbsp;期</span>
								<input type="text" class="date-picker" id="accountMonth"/>
							</div>
							<div class="monthAssessCondition">
								<span>一&nbsp;&nbsp;类</span>
								<select id="bigType">
								</select>
							</div>
							<div class="monthAssessCondition">
								<span>二&nbsp;&nbsp;类</span>
								<select id="smallType">
								</select>
							</div>
							<div class="monthAssessCondition">
							</div>
							
							<div class="rate-radio" style="width: 94%;">
								<div class="rateRadio"> 
									<input type="radio" rangeId="F"/>
									<span>&gt;40%</span>
								</div>
								<div class="rateRadio"> 
									<input type="radio" rangeId="E" />
									<span>35%-40%</span>
								</div>
								<div class="rateRadio"> 
									<input type="radio"  rangeId="D" />
									<span>30%-35%</span>
								</div>
								<div class="rateRadio"> 
									<input type="radio" rangeId="C" />
									<span>25%-30%</span>
								</div>
								<div class="rateRadio"> 
									<input type="radio"  rangeId="B" />
									<span>20%-25%</span>
								</div>
								<div class="rateRadio"> 
									<input type="radio" rangeId="A"/>
									<span>&lt;20%</span>
								</div>
							</div>
							<div class="twotype-grid" style="height: 88%; width:98%; padding-top: 17.5%; margin: 0 1%;">
								<table id="twoTypeTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
				            	<div id="grid-pager1"></div>
							</div>
							<!-- <div id="tableData">
							
							</div> -->
						</div>
						<input id="hiddenOrgId" type="hidden"   />
					</div>
				</div>
			</div>
			<!-- 规模模态框 -->
			<div class="modal fade" id="scaleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
				<div class="modal-dialog" style="width: 800px;">
					<div class="modal-content clearfix" style="margin:0 auto;background: url(../../images/gis/dataVisual/u372.png) !important;background-size: 100% 100% !important;">
						<div class="modal-header" style="display: none;">
			                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			            </div>
			            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">
			            	<div class="grid-type-all">
			            		<div class="org-modal">
			            			<input type="hidden" id="scaleTypeHidden" />
			            			<input type="hidden" id="smallScaleIdHidden" />
			            			<input type="hidden" id="orgIdHidden" />
			            			<div class="modal-select">
			            				<span>地市：</span>
			            				<select id="cityWindow1" class="orgWindow1"></select>
			            			</div>
			            			<div class="modal-select">
			            				<span>区县：</span>
			            				<select id="areaWindow1" class="orgWindow1"></select>
			            			</div>
			            			<div class="modal-select" style="width:21%;display: none;">
			            				<span>营业部：</span>
			            				<select id="deptWindow1" class="orgWindow1"></select>
			            			</div>
			            			<div class="modal-select">
			            				<span>网格：</span>
			            				<select id="gridWindow1" class="orgWindow1"></select>
			            			</div>
			            			<div class="modal-select" style="width:9%;">
			            				<button class="btn btn-primary" id="exportTable">导出</button>
			            			</div>
			            		</div>
			            		<div class="scale-table">
			            			<table id="scaleTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
			            			<div id="grid-pager4"></div> 
			            		</div>
			            		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="    position: absolute !important;
							    bottom: 0px !important;
							    left: 48% !important;
							    width: 4.5%;
							    height: 7%;"></button>
			            	</div>
			            	
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
 <script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/firstPage/firstPageNew.js"></script> 
</body>
</html>
