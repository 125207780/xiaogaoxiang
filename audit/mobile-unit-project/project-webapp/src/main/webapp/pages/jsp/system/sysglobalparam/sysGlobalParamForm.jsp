<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="sysGlobalParamForm">
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">参数名称：</label>
		<div class="col-sm-8">
			<input value="${vo.paramName}" type="text" placeholder="参数名称" class="formField required" id="paramName" name="paramName" <c:if test="${!empty vo.paramName}">disabled="disabled"</c:if>/>
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">参数值：</label>
		<div class="col-sm-8">
			<input value="${vo.paramValue}" type="text" placeholder="参数值" class="formField required" id="paramValue" name="paramValue" >
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-4 labelForm">参数描述：</label>
		<div class="col-sm-8">
			<input value="${vo.paramDescription}" type="text" placeholder="参数描述" class="formField required" id="paramDescription" name="paramDescription">
		</div>
	</div>
</div>
