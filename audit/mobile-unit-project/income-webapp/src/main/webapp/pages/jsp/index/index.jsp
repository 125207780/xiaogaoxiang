<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<cxt:commonLinks />
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/index/dist/echarts.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/index/index.js"></script>
</head>
<body style="background:#e5e5e7" class="clearfix">
	<div class="col-xs-12 no-padding">
		<div class="col-xs-12">
			<div class="col-xs-8 no-padding-left">
				<div class="col-xs-12 doubleLineBar clearfix">
					<div class="btnGroup clearfix">
						<div class="pull-left">
							<h4>
								<i class="fa fa-flag bigger-40" aria-hidden="true"></i></span>
								地图
							</h4>
						</div>
					</div>
					<div id="map" style="width:100%;height:800px;">
					</div>
				</div>
     		</div>
		</div>
	</div>
</body>
</html>