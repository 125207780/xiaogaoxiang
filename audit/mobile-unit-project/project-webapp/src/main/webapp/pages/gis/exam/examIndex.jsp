<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<cxt:commonLinks />
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/examIndex.css" />
<script type="text/javascript">
		<%-- 
		
		SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
		String orgId= sysUser.getOrgId(); 
	
		var orgId = "<%=orgId%>"; 
--%>
</script>	
</head>
<body>
	<div class="exam">
		<input type="hidden" id="page" name="page" value="1" />
		<input type="hidden" id="rows" name="rows" value="9" />
		<div class="add">
			<button class="btn btn-primary" type="button" id="btnAdd" >新增</button>
		</div>
		<div class="exam-left">
			<div class="exam-title">
				考核模板查找
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>

			<div class="templateName">
				<span>模板描述 :</span> <input type="text" id="context"
					class="tempClass" name="tempName" />
				<button class="btn btn-primary" type="button" onclick="findByContext()">搜索</button>
			</div>
			
			<div class="kind">
				<label><input type="checkbox" name="checkName" id="check" value="gridLevel1" /><span class="span1">一类网格</span></label><br /> 
				<label><input type="checkbox" name="checkName" id="check" value="gridLevel2" /><span class="span2">二类网格</span></label><br />
				<label><input type="checkbox" name="checkName" id="check" value="gridLevel3" /><span class="span3">三类网格</span></label><br /> 
				<label><input type="checkbox" name="checkName" id="check" value="gridManager" /><span class="span4">网络经理</span></label><br /> 
				<label><input type="checkbox" name="checkName" id="check" value="cdManager" /><span class="span5">CD政企客户经理</span></label><br /> 
				<!-- <label><input type="checkbox" name="checkName" id="check" value="busiManager" /><span class="span6">营业部负责人</span></label><br /> -->
				<label><input type="checkbox" name="checkName" id="check" value="directManager" /><span class="span6">直销渠道经理</span></label><br />
				<label><input type="checkbox" name="checkName" id="check" value="societyManager" /><span class="span6">社会渠道经理</span></label><br />
			</div>
			
		</div>

		<div class="exam-right">
			<table style="width: 100%;" id="dataTable">
			</table>
			<div class="under" id="pageDiv">
			</div>
		</div>

	</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/examIndex.js"></script>

</body>
</html>