<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="flowManagerForm">
	<input type="hidden" class="formField" name="appid" id="appId" value="${vo.appid }">
	<input type="hidden" class="formField" name="processname" id="processName" value="${vo.processname }">
	<input type="hidden" class="formField" name="deployid" id="deployId" value="${vo.deployid }">
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">完整路径：</label> 
		<div class="col-sm-8">
			<input type="text" placeholder="完整路径" class="formField required" onlyUrl="/flowManager/check,appid" id="appClassName" name="appclassname" value="${vo.appclassname }" />
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">业务说明：</label> 
		<div class="col-sm-8">
			<input type="text" placeholder="业务说明" class="formField required" id="memo" name="memo" value="${vo.memo }" />
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">关联流程：</label> 
		<div class="col-sm-8">
			<select class="formField required" id="processSelect" name="processid" data-placeholder="关联流程" value="${vo.processid }">
			<input type="hidden" class="formField" name="processidHidden" value="${vo.processid }">
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/activiti/flowManagerForm.js"></script>
