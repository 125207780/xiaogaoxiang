<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.system.dao.entity.SysOrg"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
SysOrg sysOrg =sysUser.getSysOrg();
if(!sysOrg.getOrgLevel().equals("3")){}
String orgId = sysUser.getOrgId();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />
<cxt:commonLinks />
<jsp:include page="/pages/gis/common/mapjs.jsp"/>
<style>
.styp label {
    width: 70px;
    text-align:right;
}


.btnGroup{
	color:#00BFB2;
}
html,body {
	width:100%;height: 100%;
}
#main{
	width :65%;height:100%;float:left;position: relative;
}
#rightpanel{
	 width:35%; height:97%;
	 margin-top:1%;
	 float:right;
	 position: relative;
	 border: 1px solid  rgb(0,158,188);
}
#resbtn {
 	position: absolute;top: 50%;z-index:10;right:35%;
 	color:rgb(0,217,243);
 	font-size: 24px;
 	cursor: pointer;
 	width: 24px;
}
.btn {
	/* margin-left: 8px; */
}
.styp label{
	width:70px;
}
.chosen-container-multi .chosen-choices,.chosen-container-multi .chosen-choices .search-choice{
	border:1px solid #008fa7;
	color:#fff;
}
#gbox_channelTable .slimScrollDiv{
  		height:405px !important;
  	}
  	#gbox_channelTable .slimScrollDiv .ui-jqgrid-bdiv{
  		height:100% !important;
  		width: auto;
    	overflow: hidden;
  	}
  	
  	#gview_pane_grid_table .slimScrollDiv{
  		height:400px !important;
  	}
  	#gview_pane_grid_table .slimScrollDiv .ui-jqgrid-bdiv{
		height:100% !important;
  		width: auto;
    	overflow: hidden;  
   	}
   		#gview_idx_table .slimScrollDiv{
  		height:405px !important;
  	}
  	#gview_idx_table .slimScrollDiv .ui-jqgrid-bdiv{
		height:100% !important;
  		width: auto;
    	overflow: hidden;  
   	}
   	#jqgh_idx_table_cb input{
   		margin-top:50%;
   	}
   	#idx_detailBtn {
   		width: 51px;
	    height: 25px;
	    font-size: 12px;
	    text-align: center;
	    padding: 5px 2px;
   	}
   	#baobao,#reset,#delete {
   		width: 40px;
	    height: 25px;
	    padding: 1px;
	    margin: 4px;
   	}
   	#signing {
   		width: 51px;
	    height: 25px;
	    font-size: 12px;
	    text-align: center;
	    padding: 5px 2px;
   	}
   	#topwindow102contextBtn0,#topwindow102contextBtn1 {
   		width: 40px !important;
    	padding: 8px !important;
   	}
</style>
</head>
<body  class="clearfix" style="background: none;">
	<div id="main"></div>
	<i id="resbtn" class="fa fa-angle-double-right"></i>  
	<div id ='rightpanel' style="color:#fff;padding:10px;">
		<p class='styp'>
			<label>网格名称：</label><select style="width: 145px"  id="idx_gridName"  ></select>
			<label>网格类型：</label><select style="width: 145px"  id="idx_gridType"  disabled="true"></select>
		</p>
		<p class='styp'>
			<label>渠道名称：</label><select class="chosen-select" style="width: 145px" id="idx_chnlName"></select>
			<label>状&nbsp;&nbsp;&nbsp;&nbsp;态：</label><select style="width: 145px" class="chosen-select" multiple="multiple" id="idx_status"  data-placeholder="选择状态..."></select>
			<button class="btn btn-primary" id="idx_detailBtn">详细信息</button>
		</p>
		<table id="idx_table"></table>
		<div id="idx_grid-pager"></div>
		<div class="fun" style="text-align:right;">
			<button class="btn btn-primary" type="button" id="baobao">包保</button>
			<button class="btn btn-primary" type="button" id="reset">重置</button>
			<button class="btn btn-primary" type="button" id="delete">删除</button>
			<button class="btn btn-primary" type="button" id="signing">发起签约</button>
		</div>  
	</div>
	<script type="text/javascript">
		var nowOrgId = "<%=orgId%>";
	</script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/contract/contractIndex.js"></script>
</body>
</html>