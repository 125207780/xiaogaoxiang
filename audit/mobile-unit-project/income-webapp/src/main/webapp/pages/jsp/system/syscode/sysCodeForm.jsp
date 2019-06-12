<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 编辑表单div -->
<div id="sysCodeForm">
	<input type="hidden" class="formField" name="id" value="${vo.id }">
	<input type="hidden" class="formField" name="treeLevel" value="${vo.treeLevel }">
	<input type="hidden" class="formField" name="treeCode" value="${vo.treeCode }">
	<!-- 父机构信息 -->
	<div class="clearfix formGroup">
		<input type="hidden" class="formField" name="parentId" value="${vo.parent.id }">
		<label class="col-sm-2 labelForm">父菜单名称：</label> 
		<div class="col-sm-4">
			<label class="labelForm">${vo.parent.codeValue }</label>
		</div>
		<label class="col-sm-2 labelForm">父菜单级别：</label> 
		<div class="col-sm-4">
			<label class="labelForm">${vo.parent.treeLevel }</label>
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">字典类型：</label> 
		<div class="col-sm-4">
			<input value="${vo.codeType }" type="text" placeholder="字典类型" class="formField required" id="codeType" name="codeType" onlyUrl="/syscode/check,id,treeLevel" <c:if test="${!empty vo.codeType }">disabled="disabled"</c:if>>
		</div>
		<label class="col-sm-2 labelForm"></label>
		<div class="col-sm-4">
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">字典key：</label> 
		<div class="col-sm-4">
			<input value="${vo.codeKey }" type="text" placeholder="字典key" class="formField required" id="codeKey" name="codeKey">
		</div>
		<label class="col-sm-2 labelForm">字典value：</label>
		<div class="col-sm-4">
			<input value="${vo.codeValue }" type="text" placeholder="字典value" class="formField required" id="codeValue" name="codeValue">
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/system/sysmenu/sysMenuForm.js"></script>
