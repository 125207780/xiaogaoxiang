<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<cxt:commonLinks />
<%
	String id = request.getParameter("SIGNING_ID");
    String id1 = request.getParameter("PHYSICAL_ID");
%>
<script type="text/javascript">
     var SIGNING_ID="<%=id%>"
     var PHYSICAL_ID="<%=id1%>"
</script>
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<style>
	
</style>
</head>
<body  class="clearfix" style="background:none;">
<div class="col-sm-8">
	<table style="margin:0;" class="table table-bordered" >
		<tr>
			<td style="background:yellow" align="center">规范要求</td>
			<td style="background:yellow" align="center"><center>条件</center>	</td>
		</tr>
		<tr>
			<td rowspan="7" align="center" style="vertical-align:middle;text-align:center;">基本要求</td>
			<td>（1）实体渠道</td>
		</tr>
		<tr>
			<td >（2）专营移动事务</td>
		</tr>
		<tr>
			<td >（3）门店有魔百和电视体验区;</td>
		</tr>
		<tr>
			<td >（4）智慧家庭体验区;</td>
		</tr>
		<tr>
			<td >（5）网格内渠道优先;</td>
		</tr>
		<tr>
			<td >（6）具有良好的物业维系和协调能力;</td>
		</tr>
		<tr>
			<td >（7）具备场地租赁及提供场地租赁服务资质</td>
		</tr>
		<tr>
			<td rowspan='2' align="center" style="vertical-align:middle;text-align:center;">人员达标要求</td>
			<td>（1）直销经理配置不低于3人，门店至少1人，合计至少4人</td>					
		</tr>
		<tr>
			<td>（2）所有员工认可移动公司文化</td>
		</tr>
		<tr>
			<td  align="center" style="vertical-align:middle;text-align:center;">业务量</td>
			<td>网格包保要求17年10月~18年3月均业务量在30户及以上（不含校园业务）</td>
		</tr>
		<tr>
			<td  align="center" style="vertical-align:middle;text-align:center;">能力要求</td>
			<td>具备宽带网络知识，简单网络故障处理能力</td>
		</tr>
	</table>
</div>
<div class="col-sm-4">
	<textArea class="form-control" rows="10" cols="30" id="agency_textarea" style="height:445px;" readonly="readonly">sdfe</textArea>
</div>	
<div class="col-sm-12" >
	<h3 style="color:red;">注:未选择的基础单元视为退回</h3> 
</div>	

	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/layer/mapManagerConfirmPop.js"></script> 
</body>
</html>