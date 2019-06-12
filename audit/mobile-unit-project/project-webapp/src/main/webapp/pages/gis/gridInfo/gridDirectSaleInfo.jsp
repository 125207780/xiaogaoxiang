<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	// 获取当前登录用户
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
	SysOrg sysOrg = sysUser.getSysOrg();
	String orgId = sysUser.getOrgId();
	Integer orgLevel = sysUser.getOrgLevel();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<cxt:commonLinks />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gridInfo/gridDirectSaleInfo.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
</head>
<body> 
	<!-- 基站直销经理弹出框 start -->
	<input type="hidden" value="" id="hiddenOrgId" />
	<input type="hidden" value="" id="hiddenOrgLevel" />
	<div id="topDiv">
		<h2>直销人员信息</h2>
	</div>
	<div id="middleDiv">
		<div id="importFileDiv">
			<form target="uploadFrame" id="upformDirDirectSale" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/map/uploadDirectSaleFiles" method="post">
				<div class="form-group">
					<div class="col-xs-12">
						<input type="file" id="directSaleFileDir" name="directSaleFileDir"/>
					</div>
				</div>
			</form>
			<button class="firstBtn btn btn-sm btn-linear-blue" id='improtDirectSaleInfo'>导入</button>
		</div>
		<div id="exportFileDiv">
			<button class="firstBtn btn btn-sm btn-linear-blue" style="float: left; margin-right: 10px;" id='exportDirectSaleInfo'>模板下载</button>
			<button class="firstBtn btn btn-sm btn-linear-blue" style="display: none" id='directSaleViewBtn'>查看</button>
			<button class="firstBtn btn btn-sm btn-linear-blue" id='directSaleMaintainBtn'>维护</button>
		</div>
	</div>
	<div id="bottomDiv">
		<div id="viewTable">
			<table id="scaleTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
			<div id="grid-pager4"></div> 
		</div>
		<div id="whTable" style="display: none;">
			<div id="bottomConditionDiv">
				<div>
					<input type="radio" name="gridSelect" value="0" /><font color="#000000">未入网格</font>
					<input type="radio" name="gridSelect" value="1" checked="checked" /><font color="#000000">已入网格</font>
					<button class="firstBtn btn btn-sm btn-linear-blue" onclick="queryDirectSaleInfo()">查询</button>
					<button class="firstBtn btn btn-sm btn-linear-blue" onclick="selectChannel()">更新渠道</button>
				</div>
			</div>
			<div id="bottomListDiv">
				<table id="modifyTable"></table>
				<div id="grid-pager5"></div>
			</div>
		</div>
	</div>	
	<!-- 网格选择框 -->
	<div class="modal fade" id="channelSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 629px;">
			<div class="modal-content clearfix" style="margin:0 auto;background: #FFFFFF !important;background-size: 100% 100% !important;">		
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 440px;">	         
	            	<div class="grid-type-all">
	            		<div class="scale-table" style="margin-top: 10px;">
	            			<table id="channelSelectTable" data-option="fitColumns:true,scrollbarSize:0,"></table>
	            			<div id="grid-pager6"></div> 
	            			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position: absolute !important; bottom: 0px !important; left: 48% !important; width: 4.5%; height: 7%;"></button>
	            			<div>
	            				<center>
									<button class="firstBtn btn btn-sm btn-linear-blue" onclick="sureSelectGrid()">确认选择</button>
	            					<input type="hidden" id="selectedOfficeids">
	            				</center>
	            			</div>
	            		</div>
	            	</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var nowOrgId = "<%=orgId%>";
	var nowOrgLevel = "<%=orgLevel%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridDirectSaleInfo.js"></script>
</html>
