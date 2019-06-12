<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
	// 获取当前登录用户
	SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);
	SysOrg sysOrg = sysUser.getSysOrg();
	String orgId = sysUser.getOrgId();
	Integer orgLevel = sysUser.getOrgLevel();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<cxt:commonLinks />
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gridInfo/gridUsrInfo.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/jsp/index/dist/echarts.min.js"></script>
</head>
<body>
<div class="box">
	<ul>
		<li>
			<input type="radio" name="check" id="activeOne" class="tabInput" checked>
			<label for="activeOne">网格总监信息维护</label>
			<div class="activeDIV">
                <div class="oneBottomDiv"> 
					<div id="oneBottomConditionDiv">    
	                	<div id="oneMiddleConditionDiv">
	                		<div id="importDirectFileDiv">
								<div style="height:5px;width:50px;display:none;" >
									<iframe style="height: 36px;" id="uploadFrame" name="uploadFrame"></iframe>
								</div>
								<form  target="uploadFrame" id="upformDirectInfo" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/gridDirectInfo/uploadDirectInfoFiles" method="post">
				                	<div class="form-group">
										<div class="col-xs-12">
											<input type="file" id="directInfoFileDir" name="directInfoFileDir"/>
										</div>
							   		</div>
								</form>
								<button class="firstBtn btn btn-sm btn-linear-blue" id='uploadDirectModel'>导入</button>
							</div>
							<div id="exportDirectFileDiv">
								<button class="firstBtn btn btn-sm btn-linear-blue" id='downloadDirectModel'>模板下载</button>
							</div>
							<div id="exportDirectFileDiv">
								<button class="firstBtn btn btn-sm btn-linear-blue" id='downloadNetResourceModel'>组织机构下载</button>
							</div>
	                	</div>
					</div>
                </div>
                <div id="oneMiddleDiv">
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
						<button class="firstBtn btn btn-sm btn-linear-blue" id='searchDirectInfo'>查询</button>
						<button class="firstBtn btn btn-sm btn-linear-blue" id='exportDirectInfoDetail'>导出</button>
					</div>
                </div>
                <div id="oneBottomListDiv">
	               	<table id="idx_table"></table>
					<div id="idx_grid-pager"></div>
                </div>
			</div>
		</li>
		<li>
			<input type="radio" name="check" id="activeTwo" class="tabInput">
			<label for="activeTwo">网格内人员信息维护</label>
			<div class="activeDIV">
				<div id="twoBottomDiv">
					<div id="twoBottomConditionDiv">
						<div id="twoMiddleConditionDiv">
	                		<div id="importGridUsrFileDiv">
								<div style="height:5px;width:50px;display:none;" >
									<iframe style="height: 36px;" id="uploadFrameTwo" name="uploadFrameTwo"></iframe>
								</div>
								<form  target="uploadFrameTwo" id="upformGridUsrInfo" enctype="multipart/form-data" encoding="multipart/form-data" action="<%=request.getContextPath() %>/gridDirectInfo/uploadGridUsrInfoFiles" method="post">
				                	<div class="form-group">
										<div class="col-xs-12">
											<input type="file" id="gridUsrInfoFileDir" name="gridUsrInfoFileDir"/>
										</div>
							   		</div>
								</form>
								<button class="firstBtn btn btn-sm btn-linear-blue" id='uploadGridUsrModel'>导入</button>
							</div>
							<div id="exportGridUsrFileDiv">
								<button class="firstBtn btn btn-sm btn-linear-blue" id='downloadGridUsrModel'>模板下载</button>
							</div>
							<div id="exportDirectFileDiv">
								<button class="firstBtn btn btn-sm btn-linear-blue" id='downloadNetResourceModel1'>组织机构下载</button>
							</div>
	                	</div>
					</div>
					<div id="twoMiddleDiv">
                	<div class="conditionDiv">
						<font>地市：</font>
						<select id="cityTwo"></select>
					</div>
					<div class="conditionDiv">
						<font>区县：</font>
						<select id="cntyTwo"></select>
					</div>
					<div class="conditionDiv">
						<font>网格：</font>
						<select id="gridTwo"></select>
					</div>
					<div class="conditionDiv">
						<button class="firstBtn btn btn-sm btn-linear-blue" id='searchGridUsrInfo'>查询</button>
						<button class="firstBtn btn btn-sm btn-linear-blue" id='exportGridUsrInfoDetail'>导出</button>
					</div>
                </div>
					<div id="twoBottomListDiv">
						<table id="idx_table1"></table>
						<div id="idx_grid-pager1"></div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
</body>
<script type="text/javascript">
	var nowOrgId = "<%=orgId%>";
	var nowOrgLevel = "<%=orgLevel%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/gridInfo/gridUsrInfo.js"></script>
</html>