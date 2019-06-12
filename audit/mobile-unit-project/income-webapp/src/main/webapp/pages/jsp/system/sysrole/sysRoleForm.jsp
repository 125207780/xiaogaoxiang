<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="sysRoleForm">
	<input type="hidden" class="formField" name="createId" value="${vo.createId }">
	<input type="hidden" class="formField" name="createTime" value="${vo.roleId }">
	<input type="hidden" class="formField" name="roleId" value="${vo.roleId }">
	<input type="hidden" class="formField" name="memo" value="${vo.memo }">
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">角色名称：</label> 
		<div class="col-sm-4">
			<input value="${vo.roleName }" type="text" placeholder="角色名称" onlyUrl="/sysrole/check,roleId" class="formField required" id="roleName" name="roleName" />
		</div>
		<label class="col-sm-2 labelForm"></label> 
		<div class="col-sm-4">
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/system/sysrole/sysRoleForm.js"></script>
