<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
     <link rel="stylesheet" href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/gridRelationship.css" />
	<title>基站关系维护</title>
<style type="text/css">
.grid-no-right{
		width: 73% !important;
		white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;
		overflow: hidden;
}
</style>
	</head>
</html>
<%
String orgId = request.getParameter("orgId");
if(orgId ==null){
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
   orgId= sysUser.getOrgId();
}
%>
<body>
<input class="orgId" type="hidden" value="<%=orgId %>" />
<div class="mainContent clearfix">
	<div class="pull-left infoTree" id="infoTree">
		<div class="business-list">网格列表</div>
		<div class="grid-search-div" id="gridSearch">
			<div class="business-listname">名称：</div>
			<input type="text" placeholder="查询" class="searchField input-md" id="gridName" name="gridName">
			<button class="btn btn-primary" type="button" id="searchGirdList">查询</button>
		</div>
		
		<div class="business-content">
			<ul class="org-gridInfo">
				
			</ul>
		</div>
	</div>
	<div class="infoDetail">
		<div class="grid-relationship">
			<div class="view-title">
				已加入基站
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>
			<div class="grid-search-div" id="gridSearch">
				<div class="business-listname">名称：</div>
				<input type="text" placeholder="移除" class="searchField input-md" name="StationName" id="searchGridStation">
				<button class="btn btn-primary" type="button" id="removeAllGrid">移除</button>
				<button  class="btn btn-primary" id="entry" data-toggle="modal"
								data-target="#myModal1">录入</button>
			</div>
					<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button> -->
						<h4 class="modal-title" id="myModalLabel">基站名称</h4>
					</div>
					<div class="modal-body">
					<div style="display: none">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
					</div>
						<!-- 多选框 -->
						 <form  target="uploadFrame" id="upform" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/gridStation/upload" method="post">
                              <div class="form-group">
						           <div class="col-xs-12">
							         <input type="file" id="stationFile" name="stationFile"/>
						           </div>
					           </div>
						</form>
						<div style="text-align: right;">
							 <button class="btn btn-primary" style="margin-right:10px;" id="download">下载模板</button>
							<button id="improtexcel" type="button" class="btn btn-primary" 
								>确定</button>
							<button type="button" class="btn btn-primary" id = "myModal1Close"
								>关闭</button>
						</div>
						
					</div>
					<!-- /.modal-content -->
				</div>
			<!-- 	<div id="loading" style="display:none;position: absolute;top:0px;left:0px;right:0px;bottom: 0px;z-index: 999999;background-color:#F7F9FC;filter: alpha(opacity=70); opacity: 0.7;">
	<i  style="position: absolute;top: 50%;left:50%;font-size: 50px;color: #00001F" class="fa fa-spinner fa-pulse"></i>
</div> -->
				<!-- /.modal -->
			</div>
		</div>
			<div class="scrollBar">
				
			</div>
		</div>
		<div class="grid-no">
			<div class="view-title">
				未加入基站
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>
			<div class="grid-search-div" id="gridSearch">
				<div class="business-listname">名称：</div>
				<input type="text" placeholder="加入" class="searchField input-md" name="stationName" id="searchNoGridStation">
				<button class="btn btn-primary" type="button" id="addAllGrid">加入</button>
			</div>
<%-- 			<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button> -->
						<h4 class="modal-title" id="myModalLabel">基站名称</h4>
					</div>
					<div class="modal-body">
					<div style="display: none">
					<iframe id="uploadFrame" name="uploadFrame"></iframe>
					</div>
						<!-- 多选框 -->
						 <form  target="uploadFrame" id="upform" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/gridStation/upload" method="post">
                              <div class="form-group">
						           <div class="col-xs-12">
							         <input type="file" id="stationFile" name="stationFile"/>
						           </div>
					           </div>
						</form>
						<div style="text-align: right;">
							 <button class="btn btn-primary" style="margin-right:10px;" id="download">下载模板</button>
							<button id="improtexcel" type="button" class="btn btn-primary" 
								>确定</button>
							<button type="button" class="btn btn-primary" id = "myModal1Close"
								>关闭</button>
						</div>
						
					</div>
					<!-- /.modal-content -->
				</div>
			<!-- 	<div id="loading" style="display:none;position: absolute;top:0px;left:0px;right:0px;bottom: 0px;z-index: 999999;background-color:#F7F9FC;filter: alpha(opacity=70); opacity: 0.7;">
	<i  style="position: absolute;top: 50%;left:50%;font-size: 50px;color: #00001F" class="fa fa-spinner fa-pulse"></i>
</div> -->
				<!-- /.modal -->
			</div>
		</div> --%>
			<div class="grid-add-reletionship">
				<div class="scrollBar1">
					<!-- <div class="grid-back">
						<div class="grid-back-content">
							<div>
								<div class="grid-no-left">拥有网络：</div>
								<div class="grid-no-right">AA网格</div>
							</div>
							<div>
								<div class="grid-no-left">网格类型：</div>
								<div class="grid-no-right">一类</div>
							</div>
							<a href="#">加入</a>
						</div>
					</div>
					<div class="grid-back">
						<div class="grid-back-content">
							<div>
								<div class="grid-no-left">拥有网络：</div>
								<div class="grid-no-right">AA网格</div>
							</div>
							<div>
								<div class="grid-no-left">网格类型：</div>
								<div class="grid-no-right">一类</div>
							</div>
							<a href="#">加入</a>
						</div>
					</div>
					<div class="grid-back">
						<div class="grid-back-content">
							<div>
								<div class="grid-no-left">拥有网络：</div>
								<div class="grid-no-right">AA网格</div>
							</div>
							<div>
								<div class="grid-no-left">网格类型：</div>
								<div class="grid-no-right">一类</div>
							</div>
							<a href="#">加入</a>
						</div>
					</div>
					<div class="grid-back">
						<div class="grid-back-content">
							<div>
								<div class="grid-no-left">拥有网络：</div>
								<div class="grid-no-right">AA网格</div>
							</div>
							<div>
								<div class="grid-no-left">网格类型：</div>
								<div class="grid-no-right">一类</div>
							</div>
							<a href="#">加入</a>
						</div>
					</div>
					<div class="grid-back">
						<div class="grid-back-content">
							<div>
								<div class="grid-no-left">拥有网络：</div>
								<div class="grid-no-right">AA网格</div>
							</div>
							<div>
								<div class="grid-no-left">网格类型：</div>
								<div class="grid-no-right">一类</div>
							</div>
							<a href="#">加入</a>
						</div>
					</div>
					<div class="grid-back">
						<div class="grid-back-content">
							<div>
								<div class="grid-no-left">拥有网络：</div>
								<div class="grid-no-right">AA网格</div>
							</div>
							<div>
								<div class="grid-no-left">网格类型：</div>
								<div class="grid-no-right">一类</div>
							</div>
							<a href="#">加入</a>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridStationRelationship.js"></script>
<script type="text/javascript" src="jquery.easyui.min.js"></script>
</body>