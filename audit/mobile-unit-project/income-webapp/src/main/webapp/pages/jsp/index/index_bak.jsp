<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<cxt:commonLinks />
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
	<script type="text/JavaScript" src="<%=request.getContextPath()%>/pages/jsp/index/dist/citys/hunan.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/index/dist/echarts.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/index/index_bak.js"></script>
	<style>
		.btnGroup{
			color:#00BFB2;
		}
	</style>
</head>
<body  class="clearfix" style="background: none;">
	<div class="col-xs-12 no-padding">
		<div class="col-xs-12">
			<div class="col-xs-12 no-padding-left">
				<div class="col-xs-12 clearfix" >
					<div class="btnGroup clearfix">
						<div class="pull-left">
							<h4>
								<i class="fa fa-flag bigger-40" aria-hidden="true"></i></span>
								湖南省主要城市（区县）地图
							</h4>
						</div>
						<div class="pull-right">
							<h5 style="color:#00BFB2;cursor:pointer;" id="return">
								<i class="fa fa-backward" aria-hidden="true"></i></span>
								返回
							</h5>
						</div>
					</div>
					<div id="map" style="width:100%;">
					</div>
				</div>
     		</div>
		</div>
	</div>
</body>
</html>