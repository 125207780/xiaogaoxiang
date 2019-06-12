<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<cxt:commonLinks />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>指标录入</title>
<style>
.modal-bottom {
	height: 0;
} 
.modal-bottom button {
	display: none;
} 
.modal-content {
	border: 1px solid red;
}
.modal-content {
	border: 1px solid #014e83;
}
</style>
<script type="text/javascript">
<% 
String orgId = request.getParameter("orgId");
if(orgId == null) {
	// 获取当前登录用户
	SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
    orgId = sysUser.getOrgId();
}
%>
</script>
<script type="text/javascript">
	var orgId = "<%=orgId%>";
</script>
<style type="text/css">
#topwindow101context {
  background: url(../../images/frameBg.png) repeat !important;
}
.modal-body {
	background: none;
}
.modal-bottom {
	display: none !important;
}
.ui-jqgrid-labels {
	background: transparent !important;
}
.btn.btn-primary {
	padding: 0 15px;
	height: 28px !important;
	border-radius: 3px;
}
.modal-footer,.modal-bottom {
	background: transparent !important;
}
.bootbox-body,.bootbox-body span {
	color: #fff !important;
}
#btnRigthFloat {
    padding: 0 !important;
    Float: right;
}
</style>
</head>

<body>
<div class="mainContent clearfix">
	<div>
		<div class="tab-pane " id="gridInfoList">
			<div class="grid-search-div clearfix no-padding" style="margin-top:1%;">
				<div class="no-padding">
					<div class="pull-left">
						<label><font color=#FFFFFF>周期类型:</font></label>
						<select id="girdDateType" style="width:90px;margin-right:10px;" >
						</select>
					</div>
					<div class="pull-left">
		    			<label ><font color = #FFFFFF>指标名称:</font></label>
						<input type="text" id="girdIndex" style="width:90px;margin-right:10px;height:28px;padding-bottom:0;" >
						
					</div>
					<div class="pull-left">
		    			<label><font color = #FFFFFF>录入状态:</font></label>
						<select id="girdStatus" style="width:90px;margin-right:10px;" >
						</select>
					</div>
					<div class="pull-left">
						<button class="btn btn-primary style="margin-right:10px;" id="searchList">查询</button>
						<button  class="btn btn-primary" id="reset">重置</button>
						<button  class="btn btn-primary" id="entry" data-toggle="modal"
								data-target="#myModal1">录入</button>
						<button  class="btn btn-primary" id="remind" data-toggle="modal"
								data-target="#myModal">补充指标提醒</button>
					</div>
				</div>
			</div>

			<div class="grid infoList" style="margin-top: 10px">
	            <table id="gridInfoListGrid"></table>
	            <div id="gridInfoListPagers"></div> 
	        </div>
	        
	        <div class="grid-search-div clearfix no-padding">
				<div class="no-padding" id="btnRigthFloat">
					<button class="btn btn-primary" style="margin-right:10px;" id="delete">删除</button>
					<button  class="btn btn-primary" id="submit">提交</button>
				</div>
			</div>
			
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="myModalLabel">指标名称</h4>
						</div>
						<div class="modal-body" id="modelbody">
						</div>
						<div style="text-align: right;">
				        	<button type="button" class="btn btn-primary" id = "myModalClose">关闭</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="myModalLabel">指标名称</h4>
						</div>
						<div class="modal-body">
						<div style="display: none">
						<iframe id="uploadFrame" name="uploadFrame"></iframe>
						</div>
							<!-- 多选框 -->
							<form target="uploadFrame" id="upform" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/firstPage/upload" method="post">
	                         	<div class="form-group">
							    	<div class="col-xs-12">
								  		<input type="file" id="kpiFile" name="kpiFile"/>
							    	</div>
						    	</div>
							</form>
							<div style="text-align: right;">
							    <button class="btn btn-primary" style="margin-right:10px;" id="download">下载模板</button>
								<button id="improtexcel" type="button" class="btn btn-primary">确定</button>
								<button type="button" class="btn btn-primary" id = "myModal1Close">关闭</button>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/gridIndexEntry.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/jquery-form.js"></script>
</body>
</html>