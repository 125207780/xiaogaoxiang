<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="UserForm">
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">密码：</label>
		<div class="col-sm-4">
			<input  type="text" placeholder="密码"
				class="formField required" id="password" name="user_Password" />
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">员工姓名：</label>
		<div class="col-sm-4">
			<input type="text" placeholder="员工姓名"
				class="formField required" id="user_Name" name="user_Name">
		</div>
		<label class="col-sm-2 labelForm">性别：</label>
		<div class="col-sm-4">
			<cxt:CodeSelectTlb name="user_Sex" codeType="sex" defaultyn="n"
				cssClass="formField"></cxt:CodeSelectTlb>
		</div>
	</div>
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">住址：</label>
		<div class="col-sm-4">
			<input  type="text" placeholder="住址"
				class="formField required" id="user_Address" name="user_Address">
		</div>
	</div>
</div>
