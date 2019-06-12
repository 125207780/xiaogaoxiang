<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<cxt:commonLinks />
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/echarts.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/login/index.js"></script>
</head>
<body style="background:#e5e5e7" class="clearfix">
	<div class="col-xs-12 no-padding">
		<div class="col-xs-12 colorBlock clearfix">
			<div class="col-xs-3 no-padding-left">
				<div class="col-xs-12 block1 ">
					<div class="col-xs-12 chartName no-padding">
						<div class="pull-left">
							<h4>1233</h4>
							<span>月当前指标</span>
						</div>
						<h6  class="pull-right"><i class="fa fa-pie-chart"></i></h6></br>
					</div>
					<div id="lineBar" style="width:100%;height:80px;">
					</div>
				</div>
			</div>
			<div class="col-xs-3 no-padding-left">
				<div class="col-xs-12 block2">
					<div class="col-xs-12 chartName no-padding">
						<h4 class="pull-left">80</h4>
						<h6  class="pull-right"><i class="fa  fa-user-plus"></i></h6>
					</div>
					<div id="pieChart" style="width:100%;height:80px;">
						<!--进度条仪表盘2-->
					</div>
				</div>
			</div>
			<div class="col-xs-3 no-padding">
				<div class="col-xs-12 block3">
					<div class="col-xs-12 chartName no-padding">
						<h4 class="pull-left">1200</h4>
						<h6 class="pull-right"><i class="fa fa-cloud-upload"></i></h6>
					</div>
					<div id="rangChart" style="width:100%;height:80px;">
								
					</div>
				</div>
			</div>
			<div class="col-xs-3 no-padding-right">
				<div class="col-xs-12 block4">
					<div class="col-xs-12 chartName no-padding">
						<h4 class="pull-left">12</h4>
						<h6  class="pull-right"><i class="fa fa-cog"></i></h6>
					</div>
					
					<div id="barCharts" style="width:100%;height:80px;">
								
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12">
			<div class="col-xs-8 no-padding-left">
				<div class="col-xs-12 doubleLineBar clearfix">
					<div class="btnGroup clearfix">
						<div class="pull-left">
							<h4>
								<i class="fa fa-flag bigger-40" aria-hidden="true"></i></span>
								指标
							</h4>
						</div>
					</div>
					<div id="doubleBar" style="width:100%;height:300px;">
					</div>
				</div>
     		</div>
			<div class="col-xs-4 no-padding">
				<div class="col-xs-12 pull-right  doubleLineBar">
					<div id="lineBar1" style="width:100%;height:85px;">
								
					</div>
					<div id="lineBar2" style="width:100%;height:85px">
								
					</div>
					<div id="lineBar3" style="width:100%;height:85px">
								
					</div>
					<div id="lineBar4" style="width:100%;height:84px">
								
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12">
			<div class="col-xs-3 no-padding-left clearfix">
				<div class="col-xs-12 cardList clearfix">
					<div class="col-xs-4 cardIcon cardIcon1">
						<i class="fa fa-cubes"></i> 
					</div>
					<div class="col-xs-8">
						<h5>
							沙盒数量
						</h5>
						<h6>
							1234
						</h6>
					</div>
				</div>
			</div>
			<div class="col-xs-3 no-padding-left clearfix">
				<div class="col-xs-12 cardList clearfix">
					<div class="col-xs-4 cardIcon cardIcon2">
						<i class="fa fa-camera"></i>
					</div>
					<div class="col-xs-8">
						<h5>
							沙盒数量
						<h5>
						<h6>
							1234
						</h6>
					</div>
				</div>
			</div>
			<div class="col-xs-3 no-padding clearfix">
				<div class="col-xs-12 cardList clearfix">
					<div class="col-xs-4 cardIcon cardIcon3">
						<i class="fa fa-user"></i>
					</div>
					<div class="col-xs-8">
						<h5>
							沙盒数量
						</h5>
						<h6>
							1234
						</h6>
					</div>
				</div>
			</div>
			<div class="col-xs-3 no-padding-right clearfix">
				<div class="col-xs-12 cardList clearfix">
					<div class="col-xs-4 cardIcon cardIcon4">
						<i class="fa fa-cloud-upload"></i>
					</div>
					<div class="col-xs-8">
						<h5>
							沙盒数量
						</h5>
						<h6>
							1234
						</h6>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>