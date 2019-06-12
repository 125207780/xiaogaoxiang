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
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/dataVisualization2.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<title>数据可视化</title>
</head>
<body>
	<input value="<%=orgId %>" type="hidden" class="orgId"/>
	<div class="visual-left">
		<div class="left-up">
			<div class="grid-scale">
				<div class="scale-top">
					<span class="topScale">网格规模</span>
				</div>
				<div class="scale-down">
					<div class="scaleType">
						<div class="scaleTypeName" smallScaleId="1" id='grid'>一类网格</div>
						<div class="scaleNum" id="firstTypeGrid" gridTypeId="1"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="2" id='grid'>二类网格</div>
						<div class="scaleNum" id="secondTypeGrid" gridTypeId="2"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="3" id='grid'>三类网格</div>
						<div class="scaleNum" id="thirdTypeGrid" gridTypeId="3"></div>
					</div>
				</div>
			</div>
			<div class="grid-scale">
				<div class="scale-top">
					<span class="topScale">渠道规模</span>
				</div>
				<div class="scale-down">
					<div class="scaleType">
						<div class="scaleTypeName" smallScaleId="1" id='chnl'>实体渠道</div>
						<div id="stqd" class="scaleNum"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="2" id='chnl'>直销渠道</div>
						<div id="zxqd" class="scaleNum"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="3" id='chnl'>分销渠道</div>
						<div id="fxqd" class="scaleNum"></div>
					</div>
				</div>
			</div>
			<div class="grid-scale">
				<div class="scale-top">
					<span class="topScale">基站规模</span>
				</div>
				<div class="scale-down">
					<div class="scaleType">
						<div class="scaleTypeName" smallScaleId="1" id='stat'>2G基站</div>
						<div id="statG2" class="scaleNum"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="2" id='stat'>3G基站</div>
						<div id="statG3" class="scaleNum"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="3" id='stat'>4G基站</div>
						<div id="statG4" class="scaleNum"></div>
					</div>
				</div>
			</div>
			<div class="grid-scale">
				<div class="scale-top">
					<span class="topScale" id="voice">语音用户规模</span>
				</div>
				<div class="scale-down">
					<div class="scaleType">
						<div class="scaleTypeName" smallScaleId="1" id='voice'>期末通话客户数</div>
						<div id="voice23"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="2" id='voice'>新增通话客户数</div>
						<div id="voiceNa"></div>
					</div>
					<div class="scaleType" id="scaleType">
						<div class="scaleTypeName" smallScaleId="3" id='voice'>净增通话客户数</div>
						<div id="voiceNg"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="left-down">
			<div class="flow-scale">
				<div class="flow-top">
					<span>流量用户规模</span>
				</div>
				<div class="flow-down">
					<!-- <div class="flowContent">
						<div class="flowLeftUp"></div>
						<div class="flowLeftDown"></div>
						<div class="flowRightUp"></div>
						<div class="flowRightDown"></div>
						
						<div class="flow-content">
							<div class="contentImg1"></div>
							<div class="downContent">
								<span>2G流量用户数</span>
								<div id="flow2"></div>
							</div>
						</div>
					</div>
					<div class="flowContent">
						<div class="flowLeftUp"></div>
						<div class="flowLeftDown"></div>
						<div class="flowRightUp"></div>
						<div class="flowRightDown"></div>
						
						<div class="flow-content">
							<div class="contentImg2"></div>
							<div class="downContent">
								<span>3G流量用户数</span>
								<div id="flow3"></div>
							</div>
						</div>
					</div>
					<div class="flowContent">
						<div class="flowLeftUp"></div>
						<div class="flowLeftDown"></div>
						<div class="flowRightUp"></div>
						<div class="flowRightDown"></div>
						
						<div class="flow-content">
							<div class="contentImg3"></div>
							<div class="downContent">
								<span>4G流量用户数</span>
								<div id="flow4"></div>
							</div>
						</div>
					</div>
					<div class="flowContent">
						<div class="flowLeftUp"></div>
						<div class="flowLeftDown"></div>
						<div class="flowRightUp"></div>
						<div class="flowRightDown"></div>
						
						<div class="flow-content">
							<div class="contentImg4"></div>
							<div class="downContent">
								<span>魔百和用户数</span>
								<div id="floww"></div>
							</div>
						</div>
					</div>
					<div class="flowContent">
						<div class="flowLeftUp"></div>
						<div class="flowLeftDown"></div>
						<div class="flowRightUp"></div>
						<div class="flowRightDown"></div>
						
						<div class="flow-content">
							<div class="contentImg5"></div>
							<div class="downContent">
								<span>家庭宽带用户数</span>
								<div id="flowb"></div>
							</div>
						</div>
					</div>
					<div class="flowContent">
						<div class="flowLeftUp"></div>
						<div class="flowLeftDown"></div>
						<div class="flowRightUp"></div>
						<div class="flowRightDown"></div>
						
						<div class="flow-content">
							<div class="contentImg6"></div>
							<div class="downContent">
								<span>集客专线用户数</span>
								<div id="flowc"></div>
							</div>
						</div>
					</div> -->
					<div class="flow-all">
						<div class="flow-content1">
							<div class="image1"></div>
							<div id="content1">2/3G流量用户数</div>
							<div id="flow1"></div>
						</div>
						<div class="flow-content2">
							<div class="image2"></div>
							<div id="content2">4G流量用户数</div>
							<div id="flow2"></div>
						</div>
						<div class="flow-content3">
							<div class="image3"></div>
							<div id="content3">和掌柜数</div>
							<div id="flow3"></div>
						</div>
						<div class="flow-content4">
							<div class="image4"></div>
							<div id="content4">魔百和用户数</div>
							<div id="flow4"></div>
						</div>
						<div class="flow-content5">
							<div class="image5"></div>
							<div id="content5">家庭宽带用户数</div>
							<div id="flow5"></div>
						</div>
						<div class="flow-content6">
							<div class="image6"></div>
							<div id="content6">集客专线用户数</div>
							<div id="flow6"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="visual-middle">
		<div class="middle-up">
			<div id="mainMap"></div>
		</div>
		<div class="middle-down">
			<div class="sum-top">
				<span>汇总信息</span>
			</div>
			<div class="sum-down">
				<div class="sum-select">
					<div class="sumSelect">
						<span>一类：</span>
						<select id="bigType">
						</select>
					</div>
					<div class="sumSelect">
						<span>二类：</span>
						<select id="smallType">
						</select>
					</div>
					  	 <div style="width: 40%;float:left;height:100%; " id="dv_TableDiv">
     						<label style="font-size: 12px;">账期：</label><input class="form-control date-picker " style="width: 67px;display: inline-block;padding:0 0;height: 23px" id="dv_date" type="text"   />
     						<button id="newsSelect" class="btn btn-primary" style="height:23px;">查询</button>
     					</div>
				</div>
				<div class="rate-radio">
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
				<div class="twotype-grid">
					<table id="twoTypeTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            	<div id="grid-pager1"></div>
				</div>
			</div>
		</div>
		<input id="hiddenOrgId" type="hidden"   />
	</div>
	<div class="visual-right">
		<jsp:include page="visualRight.jsp"></jsp:include>
		<!-- <div class="right-top">
			<div class="view-top">
				<span>数据视图</span>
			</div>
			<div class="view-down">
				<div class="option-top">
					<input type="text"><span class="glyphicon glyphicon-search"></span></input>
					<button class="btn btn-primary" id="assetButton">资产录入</button>
					<button class="btn btn-primary">导出</button>	
				</div>
			</div>
		</div>
		<div class="right-down">
			<div class="sum-top">
				<span>汇总信息</span>
			</div>
			<div class="sum-down">
				<div class="sumRight">
					<div class="org-select">
						<span>地市：</span>
						<select class="orgSelect" id="sumCity"></select>
					</div>
					<div class="org-select">
						<span>区县：</span>
						<select class="orgSelect" id="sumArea"></select>
					</div>
					<div class="org-select">
						<span>网格：</span>
						<select class="orgSelect" id="sumGrid"></select>
					</div>
				</div>
			</div>
		</div> -->
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
	            			<div class="modal-select" style="width:21%;">
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
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
	
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/dataVisualization/dataVisualization2.js"></script>
</html>