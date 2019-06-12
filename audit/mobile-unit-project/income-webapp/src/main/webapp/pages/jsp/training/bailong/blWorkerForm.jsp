<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cxt" uri="http://www.bonc.com.cn/common/tag/cxt"%>
<!-- 编辑表单div -->
<div id="workerForm">
	<!-- <input type="hidden" class="formField" name="workerNum" id="workerNum" value="${vo.workerNum }"> -->
	<input type="hidden" class="formField" name="workerId" id="workerId" value="${vo.workerId }">
	
	<div class="clearfix formGroup"> 
		<label class="col-sm-2 labelForm">员工编号：</label> 
		<div class="col-sm-4"> 
		<!--  onlyUrl="/work/check,workerNum" onlyUrl="/work/check,workerId" 校验重复暂时不用-->
			<input value="${vo.workerNum }" type="text" placeholder="员工编号" onlyUrl="/worker/check,workerId" class="formField required" id="workerNum" name="workerNum" />
		</div>
		<label class="col-sm-2 labelForm">职位：</label>
		<div class="col-sm-4">
			<input value="${vo.workerPosition }" type="text" placeholder="职位" class="formField required" id="workerPosition" name="workerPosition" />
		</div>
		
	</div>
	
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">员工姓名：</label> 
		<div class="col-sm-4">
			<input value="${vo.workerName }" type="text" placeholder="员工姓名" class="formField required" id="workerName" name="workerName" >
		</div>
		<label class="col-sm-2 labelForm">所属部门：</label>
		<div class="col-sm-4">
			<input value="${vo.treeCode }" type="text" placeholder="部门ID" class="formField required" id="treeCode" name="treeCode" disabled="disabled"><!-- disabled="disabled">  -->
			<button class="btn btn-primary" id="workerShowOrgWin">选择</button>
		</div>
		
	</div>
	
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">员工性别：</label> 
		<div class="col-sm-4">
			<cxt:CodeSelectTlb name="workerSex" codeType="sex" defaultyn="n" cssClass="formField"></cxt:CodeSelectTlb>
		</div>
		<label class="col-sm-2 labelForm">直属领导：</label>
		<div class="col-sm-4">
			<input value="${vo.workerLeader }" type="text" placeholder="直属领导" class="formField required" id="workerLeader" name="workerLeader" />
		</div>			
	</div>
	
	<div class="clearfix formGroup">
	<label class="col-sm-2 labelForm">联系电话：</label> 
		<div class="col-sm-4">
			<input value="${vo.workerTel }" type="text" placeholder="联系电话" class="formField required isMobilephone" id="workerTel" name="workerTel">
		</div>
	<label class="col-sm-2 labelForm">家庭住址：</label>
		<div class="col-sm-4">
			<input value="${vo.workerHomeplace }" type="text" placeholder="家庭住址" class="formField required" id="workerHomeplace" name="workerHomeplace" />
		</div>
	</div>
	<div class="clearfix formGroup" >	
		<label class="col-sm-2 labelForm">籍贯：</label>
		<div class="col-sm-4">
			<input value="${vo.workerNativePlace }" type="text" placeholder="籍贯" class="formField required" id="workerNativePlace" name="workerNativePlace" />
		</div>
		
	</div>
	
	<div class="clearfix formGroup">
		<label class="col-sm-2 labelForm">自我评价：</label>
		<div class="col-sm-4">
			<input value="${vo.workerSelfEvaluation }" style="height:100px;width:557px;" type="text" placeholder="自我评价少于五百字" class="formField required" id="workerSelfEvaluation" name="workerSelfEvaluation" />
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/pages/jsp/training/bailong/blWorkerForm.js"></script>
