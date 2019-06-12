<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.bean.IncomeUser" %>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	/* SysUser sysUser = (SysUser)session.getAttribute("incomeUser");//获取当前登录用户
	String oaId  = sysUser.getOaId(); */
	  IncomeUser incomeUser = (IncomeUser) session.getAttribute("incomeUser");
	String oaId = incomeUser.getUserId(); 
	/* String oaId = "RENFENG"; */
	
	
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
</style>
</head>
<body class="clearfix" style="background: none; position: relative">
		 <div class="tab-pane " id="helpCenter">
			 <div style="width: 50%;float: left;height: 584px;">
				 <div class="helpCenterLeft">
				 <button  class="btn btn-primary" id="uploadEntry" data-toggle="modal"
									data-target="#myModal1" style="margin-left: 82%">上传</button>
				 </div>
				
				<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
						aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<!-- <button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button> -->
								<h4 class="modal-title" id="myModalLabel">文件名称</h4>
							</div>
							<div class="modal-body">
							<div style="display: none">
							<iframe id="uploadFrame" name="uploadFrame"></iframe>
							</div>
								<!-- 多选框 -->
								 <form  target="uploadFrame" id="upform" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/getReportForm/uploadFile" method="post">
		                              <div class="form-group">
								           <div class="col-xs-12">
									         <input type="file" id="helpCenterFile" name="helpCenterFile"/>
								           </div>
							           </div>
								</form>
								<div style="text-align: right;">
									<button id="improtFile" type="button" class="btn btn-primary" 
										>确定</button>
									<button type="button" class="btn btn-primary" id = "myModal1Close"
										>关闭</button>
								</div>
								
							</div>
						</div>
					</div>
				</div>
				
				<div class="page-content clearfix">
					<div class="col-sm-12 grid-full">
						<!-- 列表div -->
						<table id="fileInfoListGrid"></table>
						<div id="fileInfoListPagers"></div>
					</div>
				</div>
			 </div>
			 <div style="width: 50%;float: right;height: 300px;">
			 	<h3 id = "contacts" style="color:white ">联系人:任凤</h3>
			 	<h3 id = "contactNumber" style="color:white ">联系电话:1111111</h3>
			 	<h3 id = "artisan" style="color:white ">技术人员:任凤</h3>
			 	<h3 id = "artisanNumber" style="color:white ">联系电话:1111111</h3>
			 </div>
		 </div>
		
</body>
<script type="text/javascript">
	var orgId = "1";
 	var currentOaId = "<%=oaId%>"; 
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/school/helpCenter.js"></script>
</html>
