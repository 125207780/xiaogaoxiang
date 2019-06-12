<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单 -->
<div id="workOrderForm">
	<input type="hidden" class="formField" name="hdnType" id="hdnType">
	<input type="hidden" class="formField" name="id" id="id" value="${vo.id }">
	<input type="hidden" name="hdnWorkOrderType" value="3"/>
	<input type="hidden" name="hdnTaskType" value="draft"/>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">工单名称：</label>
		<div class="col-sm-8">
		<input type="text" class="formField" name="workOrderName" id="workOrderName" value="${vo.workOrderName }" placeholder="工单名称" />
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">接单人：</label>
		<div class="col-sm-8">
		<select class="formField required" name="assigneeId" id="assigneeId" ></select>
		<input type="hidden" name="hiddenAssigneeId" id="hiddenAssigneeId" value="${vo.assigneeId }" />
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">上传文件：</label>
		<div class="col-sm-8">
			<input type="file" id="uploadFile" name="uploadFile">
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">备注：</label> 
		<div class="col-sm-8">
			<textarea class="formField required" id="comments" name="comments" rows="3">${vo.comments }</textarea>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/workbench/workorder/myWorkOrderForm.js"></script>