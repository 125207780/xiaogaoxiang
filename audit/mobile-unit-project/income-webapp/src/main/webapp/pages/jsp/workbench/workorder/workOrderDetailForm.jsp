<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单 -->
<div id="workOrderDetailForm">
	<div class="widget-box widget-color-blue" id="workorderHandle">
		<div class="widget-header">
			<h5 class="widget-title">工单办理</h5>
			<button class="widget-title-btn btn-sm btn-primary pull-right" type="button" id="approvalTask">办理</button>
		</div>
		<div class="widget-body">
			<input type="hidden" class="formField" id="id" name="id" value="${vo.id }">
			<input type="hidden" class="formField" id="procId" name="procId" value="${vo.procId }">
			<input type="hidden" class="formField" id="hiddenPageType" name="hiddenPageType" value="${pageType }">
			<div class="clearfix formGroup">
				<label class="col-sm-2 labelForm">办理结论：</label> 
				<div class="col-sm-4">
					<input type="radio" value="1" class="formField required" id="complete" name="approval"/><span>同意</span>
					<input type="radio" value="2" class="formField required" id="rollback" name="approval"/><span>退回</span>
				</div>
				<label class="col-sm-2 labelForm">上传附件：</label> 
				<div class="col-sm-4">
					<input type="file" id="uploadFile" name="uploadFile">
					<script>
						$('#uploadFile').ace_file_input({
							no_file:'无',
							btn_choose:'选择文件',
							btn_change:'更改文件',
							droppable:false,
							onchange:null,
							thumbnail:false, //| true | large
							icon_remove:null
						});
					</script>
				</div>
				<div class="clearfix"></div>
				<label class="col-sm-2 labelForm">办理意见：</label> 
				<div class="col-sm-10">
					<textarea class="formField required" id="reason" name="reason" rows="3"></textarea>
				</div>
			</div>
		</div>
	</div>

	<div class="widget-box widget-color-blue">
		<div class="widget-header">
			<h5 class="widget-title">工单详情</h5>
		</div>
		<div class="widget-body">
			<div class="clearfix formGroup">
				<label class="col-sm-2 labelForm">工单名称：</label> 
				<div class="col-sm-4">
					<label id="woName" name="woName" class="labelForm">${vo.workOrderName }</label>
				</div>
				<label class="col-sm-2 labelForm">办理人：</label> 
				<div class="col-sm-4">
					<label id="assignee" name="assignee" class="labelForm"></label>
					<input type="hidden" id="hiddenAssigneeId" name="hiddenAssigneeId" value="${vo.assigneeId }" />
				</div>
				<div class="clearfix"></div>
				<label class="col-sm-2 labelForm">备注：</label> 
				<div class="col-sm-4">
					<label class="labelForm">${vo.comments }</label>
				</div>
				<label class="col-sm-2 labelForm">上传附件：</label> 
				<div class="col-sm-4">
					<label class="labelForm"><a class="blue" style="cursor:pointer !important;" id="workorderFile"></a></label>
				</div>
			</div>
		</div>
	</div>

	<div id="gridContainer">
		<table id="grid-table1"></table>
	</div>
	<!-- 文件下载用form -->
	<form id="downloadFile" type="hidden" method="post"></form>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/workbench/workorder/workOrderDetailForm.js"></script>
