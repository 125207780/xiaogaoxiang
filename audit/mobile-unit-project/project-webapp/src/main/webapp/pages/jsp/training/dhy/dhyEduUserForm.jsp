<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="dhyEduUserForm">
	<input type="hidden" class="formField" name="userId" value="${vo.userId }">
	<input type="hidden" class="formField" name="orgId" id="orgId" value="${vo.orgId }">
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">用户代码：</label> 
		<div class="col-sm-4">
			<input value="${vo.loginId }" type="text" placeholder="用户代码" onlyUrl="/dhyedusysuser/dhyeducheck,userId" class="formField required" id="loginId" name="loginId" />
		</div>
		<label class="col-sm-2 labelForm">用户姓名：</label> 
		<div class="col-sm-4">
			<input value="${vo.userName }" type="text" placeholder="用户姓名" onlyUrl="/sysuser/check,userId" class="formField required" id="userName" name="userName" >
		</div>	
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">联系电话测试：</label> 
		<div class="col-sm-4">
			<input value="${vo.userMobile }" type="text" placeholder="联系电话" class="formField required isMobilephone" id="userMobile" name="userMobile">
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/training/dhy/dhyEduUserForm.js"></script>
