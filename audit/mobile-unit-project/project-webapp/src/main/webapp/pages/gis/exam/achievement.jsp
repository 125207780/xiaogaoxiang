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
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/pages/css/common.css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/pages/css/gis/examIndex.css" />
	<style>
		p{
			margin: 2px 5px 5px 39px !important;
		}
		.btn{
			margin: 3px !important;
    		float: right !important;
			
		}
		.exam-left .xuanxiang>span{
			color:#fff;
		}
		.xuanxiang{
			margin-top: 6px;
		}
		#infoTree{
			width: 100%;
		    height: 72%;
		    overflow-y: auto;
		}
		#pageDiv{
			bottom:0;
		}
		#pageDiv>.pageBtn,#pageDiv>.pageNoBtn{
			cursor: pointer;
		}
	</style>
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
		<%-- <input type="hidden" id="orgId" name="orgId" value="<%=orgId%>"/> --%>
	
		
		<div class="exam-left">
			<div class="exam-title">
				考核模板查找
				<div class="myOrners myOrner1"></div>
				<div class="myOrners myOrner2"></div>
				<div class="myOrners myOrner3"></div>
				<div class="myOrners myOrner4"></div>
			</div>

			<div class="xuanxiang">
				<span>模板名称 :</span> <input type="text" id="context"
					class="tempClass" name="tempName" />
			</div>
			<div class="xuanxiang">
				<span>网格名称 :</span> <input type="text" id="gridName"
					class="tempClass" name="tempName" />
			</div>
			<div class="xuanxiang">
				<span>周期类型 :</span> <input type="text" id="CycleType"
					class="tempClass" name="tempName" />
			</div>
			<button id = "search" class="btn btn-primary">查找</button>
			<button id = "research" class="btn btn-primary">重置</button>
			<div class="pull-left infoTree ztree" id="infoTree"></div>
		</div>

		<div class="exam-right">
			<table style="width: 100%;" id="dataTable">
			</table>
			<div class="under" id="pageDiv">
			</div>
		</div>

	</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/achievement.js"></script>

</body>
</html>
