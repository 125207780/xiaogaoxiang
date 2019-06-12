<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="activitiModelForm">
	<input type="hidden" class="formField" name="hdnType" id="hdnType">
	<input type="hidden" class="formField" name="hdnTenantId" id="hdnTenantId">
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">流程主键：</label> 
		<div class="col-sm-8">
			<input type="text" placeholder="流程主键" onlyUrl="/ActivitiCore/check,key" class="formField required" id="key" name="key" />
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">流程名称：</label> 
		<div class="col-sm-8">
			<input type="text" placeholder="流程名称" class="formField required" id="name" name="name" />
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">流程描述：</label> 
		<div class="col-sm-8">
			<input type="text" placeholder="流程描述" class="formField" id="description" name="description" />
		</div>
	</div>
</div>
