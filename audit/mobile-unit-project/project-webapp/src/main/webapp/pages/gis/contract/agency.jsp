<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String unitArr = request.getParameter("unitIdArr");
	String grid_code = request.getParameter("gridCode");
	String chnlNameCode = request.getParameter("chnlNameCode");
	String objType = request.getParameter("objType");
%>
<script type="text/javascript">
var JsonArrphysical= '<%=unitArr%>';
var gridCode= "<%=grid_code%>";
var chnl_code= "<%=chnlNameCode%>";
var objType= "<%=objType%>";
</script>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <style>
 .btn{
    background-color: ##333333 !important;
    height: 27px;
    border-color: none;
}
 
TextArea{
	background-color:#d6ecf0;
	color:#3d3b4f;
	}
	tr td{
		color:#fff;
	}
	#agency_define{
		float: right;
		margin-right: 30px;
		padding: 8px 8px;
    	font-size: 12px;
	} 
	
 </style>
 </head>
<body>
	
<div id style="float:left;">
		<table width="500" border="1">
				<tr>
					<td style="background:#d6ecf0;color:#3d3b4f">规范要求</td>
					<td style="background:#d6ecf0;color:#3d3b4f"><center>条件</center>	</td>
				</tr>
				<tr>
					<td rowspan="7" >基本要求</td>
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
					<td rowspan='2'>人员达标要求</td>
					<td>（1）直销经理配置不低于3人，门店至少1人，合计至少4人</td>					
				</tr>
				<tr>
					<td>（2）所有员工认可移动公司文化</td>
				</tr>
				<tr>
					<td>业务量</td>
					<td>网格包保要求17年10月~18年3月均业务量在30户及以上（不含校园业务）</td>
				</tr>
				<tr>
					<td>能力要求</td>
					<td>具备宽带网络知识，简单网络故障处理能力</td>
				</tr>
		</table>
	</div>
	
	<div id style="float:left;padding-left:88px;padding-bottom:27px;">
		<TextArea rows="10" cols="30" id="agency_textarea" placeholder="请填写要求..."></TextArea>
	</div>	
	<div style="width:100%">
			<button class="btn btn-primary" id="agency_define"> 确认</button>
	</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/contract/agency.js"></script>	
</body>
</html>
