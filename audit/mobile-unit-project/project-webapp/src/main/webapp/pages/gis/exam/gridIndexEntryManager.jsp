<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<%@ page import="com.bonc.system.dao.entity.SysUser"%>
<%@ page import="com.bonc.common.cst.CST"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<cxt:commonLinks />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/pages/js/niceScroll/jquery.nicescroll.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/pages/js/scrollBar/scrollBar.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>指标录入</title>
<style>
.chosen-container-multi .chosen-choices,.chosen-choices .search-choice, .chosen-choices .search-choice{
	border: 1px solid #00e1fd;
}
.chosen-choices .search-choice, .chosen-choices .search-choice span {
	color: #fff;
	border: 1px solid #00e1fd;
}
.chosen-container.chosen-container-multi, .chosen-container.chosen-container-multi .search-field,
	.chosen-container.chosen-container-multi .search-field input {
	width: 400px !important;
}
.modal-footer{
	background:transparent !important;
}
.bootbox-body,.bootbox-body span{
	color:#fff !important;
}
.modal-content{
		border: 1px solid #014e83;
}
</style>
<script type="text/javascript">
<%String orgId = request.getParameter("orgId");
			if (orgId == null) {
				SysUser sysUser = (SysUser) session.getAttribute(CST.SESSION_SYS_USER_INFO);//获取当前登录用户
				orgId= sysUser.getOrgId();
				
			}%>
</script>
<script type="text/javascript">
	var orgId = "<%=orgId%>";
</script>

<style type="text/css">
#topwindow101context {
	background: url(../../images/frameBg.png) repeat !important;
}

.modal-body {
	background: none;
}

.modal-bottom {
	display: none !important;
}

.ui-jqgrid-labels {
	background: transparent !important;
}

.btn.btn-primary {
	padding: 0 15px;
	height: 28px !important;
	border-radius: 3px;
}
#btnRigthFloat {
    padding: 0 !important;
    Float: right;
}
</style>
</head>

<body>
	<div class="mainContent clearfix">
		<div>
			<div class="tab-pane " id="gridInfoList">
				<div class="grid-search-div clearfix no-padding" style="margin-top:1%;">
					<div class="no-padding">
						<div class="pull-left">
							<label><font color=#FFFFFF>周期类型:</font></label> <select
								id="girdDateType" style="width: 140px; margin-right: 10px;">
							</select>
						</div>
						<div class="pull-left">
							<label><font color=#FFFFFF>指标名称:</font></label> <input
								type="text" id="girdIndex"
								style="width: 140px; margin-right: 10px; height: 28px; padding-bottom: 0;">
						</div>
						<div class="pull-left">
							<label><font color=#FFFFFF>录入状态:</font></label> <select
								id="girdStatus" style="width: 140px; margin-right: 10px;">
							</select>
						</div>
						<div class="pull-left">
							<button class="btn btn-primary" style="margin-right: 10px;"
								id="searchList">查询</button>
							<!-- <button class="btn btn-primary" id="submit">同意</button> -->
							<button class="btn btn-primary" id="remind" data-toggle="modal"
								data-target="#myModal">补充录入</button>
							<!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
						</div>
					</div>
				</div>
			</div>
			<div class="grid infoList" style="margin-top: 10px">
				<table id="gridInfoListGrid"></table>
				<div id="gridInfoListPagers"></div>
			</div>
			<div class="grid-search-div clearfix no-padding" id="btnRigthFloat">
				<div class="no-padding">
				    <button class="btn btn-primary" id="submit">同意</button>
					<button class="btn btn-primary" id="reject">驳回</button>
					<button class="btn btn-primary" id="change">修改目标值</button>
				</div>
			</div>
		</div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button> -->
						<h4 class="modal-title" id="myModalLabel">指标名称</h4>
					</div>
					<div class="modal-body">
						<!-- 多选框 -->

						<span style="color: #fff;">指标名称：</span> <select
							style="width: 400px !important;" multiple=""
							class="chosen-select" id="form-field-select-4"
							data-placeholder="请选择指标名称">
							<!-- <option value="AL">北京</option>
							<option value="AK">天津</option> -->
						</select> <br>
						<div style="text-align: right;">
							<button id="adc" type="button" class="btn btn-primary"
								>确定</button>
							<button type="button" class="btn btn-primary" id="myModalClose"
								>关闭</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal -->
			</div>
		</div>

	</div>
	<script type="text/javascript">
		$(function() {
			/* 初始化select框 */
			$(".chosen-select").chosen();
			$('.chosen-select').chosen({
				allow_single_deselect : true
			});
			//resize the chosen on window resize

			$(window).off('resize.chosen').on('resize.chosen', function() {
				$('.chosen-select').each(function() {
					var $this = $(this);
					$this.next().css({
						'width' : $this.parent().width()
					});
				})
			}).trigger('resize.chosen');

		})
	</script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/pages/gis/exam/gridIndexEntryManager.js"></script>
</body>
</html>