<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 编辑表单div -->
<form id="sysHelpForm" enctype="multipart/form-data" action="<%=request.getContextPath()%>/syshelp/insertOrUpdateSysHelp" method="post">
	 <input type="hidden" class="formField" name="id" value="${vo.id }">
	<input type="hidden" class="formField" name="state" value="${vo.state }">
	<input type="hidden" class="formField" name="helpFileName" value="${vo.helpFileName }">


	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">帮助标题：</label> 
		<div class="col-sm-6">
			<input value="${vo.helpName }" type="text" placeholder="帮助标题" class="formField required" id="helpName" name="helpName">
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">帮助url：</label> 
		<div class="col-sm-10">
			<input value="${vo.textRoad }" type="text" placeholder="帮忙文档存储路径" class="input-xxlarge formField required" id="textRoad" name="textRoad">
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">帮助内容：</label> 
		<div class="col-sm-10">
			<input value="${vo.helpCont }" type="text" placeholder="帮助文档内容" class="input-xxlarge formField required" id="helpCont" name="helpCont">
		</div>
	</div> 
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">帮助文档：</label>
		<div class="col-sm-4">
			<div class="col-sm-4">
			<input type="file" id = "file" name="file">
			</div>
		</div>
	</div>
	<div>
	<button id = "improtGovBusInfo" type="button" class="btn btn-primary" style="float:right">确定</button>
	<!-- <input id = "improtGovBusInfo" value ="确定"  type="submit" class="btn btn-primary" style="float:right"/> -->
	</div>
</form>
<script src="<%=request.getContextPath()%>/pages/jsp/system/syshelp/sysHelpForm.js"></script>
