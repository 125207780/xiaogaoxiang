<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="studentForm">
	<input type="hidden" class="formField" name="studentId" value="${vo.studentId }">
<%-- 	<input type="hidden" class="formField" name="studentId" value="${vo.studentId }">
	<input type="hidden" class="formField" name="orgId" id="orgId" value="${vo.orgId }"> --%>
	
	
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">用户编号：</label> 
		<div class="col-sm-4">
			<input value="${vo.studentId }" type="text" placeholder="用户代码" onlyUrl="/student/check,studentId"class="formField required" id="studentId" name="studentId" />
		</div>
		<label class="col-sm-2 labelForm">用户姓名：</label> 
		<div class="col-sm-4">
			<input value="${vo.studentName }" type="text" placeholder="用户姓名" onlyUrl="/student/check,studentName" class="formField required" id="studentName" name="studentName" >
		</div>	
	</div>
	
	
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">毕业院校：</label>
		<div class="col-sm-4">
			<input style="height:30px;width:400px;" value="${vo.studentSchool }" type="text" placeholder="最高毕业院校" class="formField required" id="studentSchool" name="studentSchool" />
		</div>
	</div>
	
	
		<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">就读时间：</label>
		<div class="col-sm-4">
			<input style="height:30px;width:400px;" value="${vo.studentTime }" type="text"  placeholder="起止时间（****.**-****.**）"  class="formField required" id="studentTime" name="studentTime" />
		</div>
	</div>
	
	
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/training/dhy/dhyStudent.js"></script>
