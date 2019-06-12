<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<%
String id = request.getParameter("id");
String endDate = request.getParameter("endDate");
String startDate = request.getParameter("startDate");
String cycleType = request.getParameter("cycleType");
%>

<script type="text/javascript">
var id= "<%=id%>";
var startDate= "<%=startDate%>";
var endDate= "<%=endDate%>";
var cycleType= "<%=cycleType%>";
</script>

<style>
label{
	color:#fff;
}
input.form-control{
	height:28px !important;
	line-height:28px;
	padding-bottom:0;
}
.chosen-container-multi .chosen-choices{
	border-color: #008fa7;
}
.chosen-container-multi .chosen-choices li.search-choice{
	border-color:#00e1fd;
	color:#fff;
}
</style>
<div style="width: 100%">
	<div style="margin-bottom:10px">
		<!--周期类型  add_cycleType-->
		<label>周期类型：</label> 
		<select  id="add_cycleType" style="width:200px;" disabled="disabled">
			<option value="month">月度考核</option>
			<option value="quarter">季度考核</option>
			<option value="year">年度考核</option>	
		</select>
		<!-- 考核周期  add_startDate-->
		&nbsp;&nbsp;&nbsp;&nbsp;
		<label>考核周期：</label> 
		<input style="width:200px; display: inline-block;" class="form-control date-picker" readonly="true" id="add_startDate" type="text" data-date-format="yyyy-mm" > 
		<span id="add_endDateDiv" style="display: none;">~
			<input type="text" class="form-control"style="width: 200px; display: inline-block;" disabled="disabled" id="add_endDate"></input>
		</span>
	</div>
	
	
</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/reuse.js" />	
