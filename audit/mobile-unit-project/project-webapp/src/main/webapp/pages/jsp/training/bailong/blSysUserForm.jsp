<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="testSysUserForm">
	<input type="hidden" class="formField" name="userId" value="${vo.userId }">
	<input type="hidden" class="formField" name="orgId" id="orgId" value="${vo.orgId }">
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">员工编号1：</label> 
		<div class="col-sm-4">
			<input value="${vo.loginId }" type="text" placeholder="员工编号" onlyUrl="/sysuser/check,userId" class="formField required" id="loginId" name="loginId" />
		</div>
		<c:if test="${empty vo.userId }">
			<label class="col-sm-2 labelForm">密码1：</label>
			<div class="col-sm-4">
				<input value="${vo.loginId }" type="text" placeholder="密码" class="formField required" id="password" name="password" />
			</div>
		</c:if>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">员工姓名1：</label> 
		<div class="col-sm-4">
			<input value="${vo.userName }" type="text" placeholder="员工姓名" onlyUrl="/sysuser/check,userId" class="formField required" id="userName" name="userName" >
		</div>
		<label class="col-sm-2 labelForm">性别1：</label> 
		<div class="col-sm-4">
			<cxt:CodeSelectTlb name="userSex" codeType="sex" defaultyn="n" cssClass="formField"></cxt:CodeSelectTlb>
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">联系电话1：</label> 
		<div class="col-sm-4">
			<input value="${vo.userMobile }" type="text" placeholder="联系电话" class="formField required isMobilephone" id="userMobile" name="userMobile">
		</div>
		<label class="col-sm-2 labelForm">组织机构1：</label>
		<div class="col-sm-4">
			<input value="${vo.orgName }" type="text" placeholder="组织机构" class="formField required" id="orgName" name="orgName" disabled="disabled">
			<button class="btn btn-primary" id="testShowOrgWin">选择1</button>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/training/bailong/blSysUserForm.js"></script>
