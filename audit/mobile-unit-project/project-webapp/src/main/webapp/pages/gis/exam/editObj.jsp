<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String id = request.getParameter("id");
%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<script type="text/javascript">
var id= "<%=id%>";
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
<input type="hidden" id="orgId" name="orgId" value="A31K" />
<div style="width: 100%">
	<div style="margin-bottom:10px">
		<!--周期类型  add_cycleType-->
		<label>周期类型：</label> 
		<select  id="add_cycleType" style="width:200px;">
			<option value="month">月度考核</option>
			<option value="quarter">季度考核</option>
			<option value="year">年度考核</option>	
		</select>
		<!-- 考核周期  add_startDate-->
		&nbsp;&nbsp;&nbsp;&nbsp;
		<label>考核周期：</label> 
		<input style="width:200px; display: inline-block;" class="form-control date-picker" id="add_startDate" type="text" data-date-format="yyyy-mm" > 
		<span id="add_endDateDiv" style="display: none;">~
			<input type="text" class="form-control"style="width: 200px; display: inline-block;" disabled="disabled" id="add_endDate"></input>
		</span>
		<!-- 选择指标  selectIndexBtn-->
		<button style="float: right;" type="button" class="btn btn-primary"  id="selectIndexBtn">选择指标</button>		
	</div>
	<div style="margin-bottom:10px">
		 <label>对象类型：</label>
		 <select id="add_objectType"  style="width:200px;">
			<option value="gridLevel1">一类网格</option>
			<option value="gridLevel2">二类网格</option>
			<option value="gridLevel3">三类网格</option>
			<option value="gridManager">网格经理</option>
			<option value="cdManager">CD政企客户经理</option>
			<option value="directManager">直销渠道经理</option>
			<option value="societyManager">社会渠道经理</option>
		 </select>	
		 <span id="add_gridNameDiv" style="display: none"> <label>网格名称：</label>
			<select id="add_gridName" class="chosen-select"></select>
		 </span>	
		 &nbsp;&nbsp;&nbsp;&nbsp;	
		<label>对象名称：</label>
		<select multiple="" style="width: 420px;" id="add_objectName"
			data-placeholder="请选择..."></select>
	</div>
	<div style="margin-bottom:10px">
			<!--模板描述  Template_description-->
		<label>模板描述：</label>
		<input type="text" class="form-control" style="display: inline-block;width:200px;" id="desc">
	</div>
</div>
<table id="add_indexTable"></table>
<div id="grid-pager"></div>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/exam/editObj.js" >	