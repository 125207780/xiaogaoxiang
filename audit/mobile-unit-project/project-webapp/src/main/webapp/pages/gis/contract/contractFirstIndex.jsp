<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	// 获取当前登录用户
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);
	SysOrg sysOrg =sysUser.getSysOrg();
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
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/contract/contractFirstIndex.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
</head>
<body>
	<div id="topDiv">
		<h2>小区包保</h2>
	</div>
	<div id="middleDiv">
		<div id="importFileDiv">
			<div style="height:5px;width:50px;display:none;" >
				<iframe style="height: 36px;" id="uploadFrame" name="uploadFrame"></iframe>
			</div>
			<form target="uploadFrame" id="upformContract" enctype="multipart/form-data" encoding="multipart/form-data"  method="post">
				<div class="form-group">
					<div class="col-xs-12">
						<input type="file" id="contractFileDir" name="contractFileDir"/>
					</div>
				</div>
			</form>
			<button class="firstBtn btn btn-sm btn-linear-blue" id='uploadModel'>导入</button>
		</div>
		<div id="exportFileDiv">
			<button class="firstBtn btn btn-sm btn-linear-blue" id='downloadModel'>模板下载</button>
			<button class="firstBtn btn btn-sm btn-linear-blue" id='exportContractInfo'>导出包保明细</button>
		</div>
	</div>
	<div id="bottomDiv">
		<div id="bottomConditionDiv">
			<div>
				<div class="conditionDiv">
					<font>地市：</font>
					<select id="city"></select>
				</div>
				<div class="conditionDiv">
					<font>区县：</font>
					<select id="cnty"></select>
				</div>
				<div class="conditionDiv">
					<font>网格：</font>
					<select id="grid"></select>
				</div>
				<div class="conditionDiv">
					<font>渠道名称：</font>
					<input type="text" placeholder="请输入渠道名称" id="channelName" />
				</div>
				<div class="conditionDiv">
					<font>小区名称：</font>
					<input type="text" placeholder="请输入小区名称" id="communityName" />
				</div>
				<div class="conditionDiv">
					<button class="firstBtn btn btn-sm btn-linear-blue" id='search'>查询</button>
					<button class="firstBtn btn btn-sm btn-linear-blue" id='exportContractDetail'>导出</button>
				</div>
			</div>
		</div>
		<div id="bottomListDiv">
			<table id="idx_table"></table>
			<div id="idx_grid-pager"></div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var nowOrgId = "<%=orgId%>";
	var nowOrgLevel = "<%=orgLevel%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/contract/contractFirstIndex.js"></script>
</html>