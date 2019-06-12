<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="sysMenuOperationForm">
	<div class="widget-box widget-color-blue">
		<div class="widget-header">
			<h5 class="widget-title">权限表单</h5>
			<button class="widget-title-btn btn-sm btn-primary pull-right" type="button" id="createBtn1">添加</button>
		</div>
		<div class="widget-body">
			<input type="hidden" class="formField" id="menuId" name="menuId" value="${menuId }">
			<div class="clearfix formGroup">
				<label class="col-sm-2 labelForm">权限编码：</label> 
				<div class="col-sm-4">
					<input type="text" placeholder="权限编码" class="formField required" id="operationCode" name="operationCode" onlyUrl="/sysmenuoperation/check,menuId">
				</div>
				<label class="col-sm-2 labelForm">权限名称：</label> 
				<div class="col-sm-4">
					<input type="text" placeholder="权限名称" class="formField required" id="operationName" name="operationName">
				</div>
			</div>
		</div>
	</div>
	<div id="gridContainer">
		<table id="grid-table1"></table>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/system/sysmenuoperation/sysMenuOperationForm.js"></script>