<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<% 
String orgId = request.getParameter("orgId");
if(orgId ==null){
	SysUser sysUser = (SysUser)session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
   orgId= sysUser.getOrgId();
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/gis/dataVisualization2.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<title>数据可视化</title>
</head>
<style>

.modal-footer{
	background:no-repeat !important
}
</style>
<body>
	<input value="<%=orgId %>" type="hidden" class="orgId"/>
	<div class="right-top">
		<div class="view-top">
			<span>数据视图</span>
		</div>
		<div class="view-down">
			<div class="option-top">
				<div style="border: 1px solid #00e1fd;width: 150px; height: 27px;display: block;float: left;">
					<input type="text" id="findBytableName" style="width: 120px;height: 27px;border: none;">
					<span class="glyphicon glyphicon-search" id="searchList" style="cursor: pointer;"></span>
				</div>
				<button class="btn btn-primary" id="assetButton" style="margin-left: 1%;">资产录入</button>
				<button class="btn btn-primary" id="extportTableInfo">导出</button>	
				<!-- <button class="btn btn-primary" id="searchList">查询</button>	 -->
			</div>
			<div class="visualRight" style="height: 87%;margin-top: 1%;">
	            <table id="tableInfoListGrid"></table>
	            <div id="grid-pager2"></div> 
			</div>
		</div>
	</div>
	<div class="right-down">
		<div class="sum-top">
			<span>汇总信息</span>
		</div>
		<div class="sum-down">
			<div class="sumRight">
				<div class="org-select">
					<span>地市：</span>
					<select class="orgSelect" id="sumCity"></select>
				</div>
				<div class="org-select">
					<span>区县：</span>
					<select class="orgSelect" id="sumArea"></select>
				</div>
				<div class="org-select">
					<span>营业部：</span>
					<select class="orgSelect" id="sumDept"></select>
				</div>
				<div class="org-select">
					<span>网格：</span>
					<select class="orgSelect" id="sumGrid"></select>
				</div>
			</div>
			<iframe id="HideFrm" style="display: none"></iframe>
			<div class="TabelColumnName" id="tabelColumnName">
	            <table id="tableColumnNameListGrid"></table>
	            <div id="grid-pager3"></div> 
			</div>
		</div>
	</div>
	
	<!-- 资产录入模态框 -->
	<div class="modal fade" id="assetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 30"> 
		<div class="modal-dialog" style="width: 500px;">
			<div class="modal-content clearfix" style="margin:0 auto;">
				<div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	            </div>
	            <div class="modal-body clearfix" style="border-radius: 0px 0px 5px 5px;background: no-repeat !important;height: 235px;">
	            	<form class="form-horizontal clearfix col-xs-12 col-sm-12 no-padding" role="form" id="mapForm">
	            		
	            		<table class="table table-bordered">
							<tbody id="tablebody">
								<tr class="tr-shadow">
									<td>表名称</td>
									<td colspan="5">
										<div  style="width:100px;BACKGROUND-COLOR: transparent;">
											<input  class="column" type="text" id="tableName" placeholder="请输入表名称" name="tableName" onKeyUp="value=value.replace(/[^a-zA-Z_]/g,'')" style="width:351%;" >
										</div>
									</td>
								</tr>
								<tr class="tr-shadow">
									<td>模式名</td>
									<td colspan="5">
										<div  style="width:100px;BACKGROUND-COLOR: transparent;">
											<input  class="column" type="text" id="tabschema" placeholder="请输入模式名" name="tabschema"  onkeyup="this.value=this.value.replace(/[^\w_]/g,'')"  style="width:351%;" >
										</div>
									</td>
								</tr>
								<tr class="tr-shadow">
									<td>表备注</td>
									<td colspan="5">
										<div  style="width:100px;BACKGROUND-COLOR: transparent;">
											<input  class="column" type="text" id="tableRemake" placeholder="请输入表备注" name="tableRemake"  style="width:351%;" >
										</div>
									</td>
								</tr>
								<tr class="tr-shadow">
									<td>字段名称</td>
									<td>字段类型</td>
									<td>字段大小</td>
									<td>备注</td>
									<td><span class="glyphicon glyphicon-plus"></span></td>
								</tr>
								<tr class="tr-shadow shadowLength" columnId="1">
									<td>
										<div  style="width:100px;BACKGROUND-COLOR: transparent;">
											<input  class="column" type="text" id="columnName" placeholder="请输入字段名称" name="columnName0"  onKeyUp="value=value.replace(/[^a-zA-Z_]/g,'')" style="width:107%;" >
										</div>
									</td>
									<td> 
										<div  style="width:100px;BACKGROUND-COLOR: transparent;">
											<select  class="column" data-placeholder="请选择字段类型" id="columnType"  name="columnType0" style="width:107%; padding: 3px 12px;">
												<option>BIGINT</option>
												<option>TIME</option>
												<option>VARCHAR</option>
												<option>CLOB</option>
												<option>INTEGER</option>
												<option>TIMESTAMP</option>
												<option>DECIMAL</option>
												<option>DOUBLE</option>
											</select>
										</div>
									</td>
									<td>
										<div  style="width:100px;BACKGROUND-COLOR: transparent;">
											<input  class="column" type="text" id="columnSize" placeholder="请输入字段大小" name="columnSize0"  onkeyup = "value=value.replace(/[^\d]/g,'')" style="width:107%;" >
										</div>
									</td>
									<td>
										<div  style="width:100px;BACKGROUND-COLOR: transparent;">
											<input  class="column" type="text" id="columnRemake" placeholder="请输入备注" name="columnRemake0" style="width:107%;" >
										</div>
									</td>
									<td><span class="glyphicon glyphicon-minus"></span></td>
								</tr>
							</tbody>
						</table>
						<div class="clearfix modal-footer" >
							<div class='pull-right'>
								<button class="btn btn-primary" type="button" id="submitBtn">确定</button>
							</div>
						</div> 
					</form>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
	
</body>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/gis/dataVisualization/visualRight.js"></script>
</html>