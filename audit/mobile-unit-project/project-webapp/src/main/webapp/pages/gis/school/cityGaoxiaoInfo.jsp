<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
#topwindow102context{
	background: url(../../images/frameBg.png) center !important;
}

#topwindow102context>.modal-body{
	border:none;
	background: none !important;
}
#topwindow102context>.modal-bottom{
	display: block !important;
	height: 15px !important;
	border:none;
	background: none !important;	
}
</style>
</head>
<body>
	<div class="page-content clearfix">
		<div class="col-sm-12 grid-full">
			<!-- 列表div -->
			<table id="cityGaoxiaoInfoListGrid"></table>
			<div id="cityGaoxiaoInfoListPagers"></div>
		</div>
	</div>
</body>
<script src="<%=request.getContextPath()%>/pages/gis/school/cityGaoxiaoInfo.js"></script>
<script type="text/javascript">
$(function(){
	
	cityGaoxiaoLeft("<%=request.getParameter("mapOrgId")%>","<%=request.getParameter("lastMonth")%>");
	initGridTable()
	
})

</script>
</html>