<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 编辑表单div -->
<div id="sysOrgForm">
	<input type="hidden" class="formField" name="orgId" value="${vo.orgId }">
	<input type="hidden" class="formField" name="orgLevel" value="${vo.orgLevel }">
	<input type="hidden" class="formField" name="tenantId" value="${vo.tenantId }">
	<!-- 父机构信息 -->
	<div class="clearfix formGroup">
		<input type="hidden" class="formField" name="pid" value="${vo.parent.orgId }">
		<label class="col-sm-2 labelForm">父机构名称：</label> 
		<div class="col-sm-4">
			<label class="labelForm">${vo.parent.name }</label>
		</div>
		<label class="col-sm-2 labelForm">父机构级别：</label> 
		<div class="col-sm-4">
			<label class="labelForm">${vo.parent.orgLevel }</label>
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">机构名称：</label> 
		<div class="col-sm-4">
			<input value="${vo.name }" type="text" placeholder="机构名称" class="formField required" id="name" name="name">
		</div>
		<label class="col-sm-2 labelForm">排序：</label>
		<div class="col-sm-4">
			<input value="${vo.displayOrder }" type="text" placeholder="排序" class="formField required isNum" id="displayOrder" name="displayOrder">
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/system/sysorg/sysOrgForm.js"></script>
