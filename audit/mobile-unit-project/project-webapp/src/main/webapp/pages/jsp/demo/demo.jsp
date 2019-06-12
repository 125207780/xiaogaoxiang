<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<cxt:commonLinks />
	<script src="<%=request.getContextPath()%>/pages/js/ztree/jquery.ztree.core.js"></script>
	<script src="<%=request.getContextPath()%>/pages/js/ztree/jquery.ztree.excheck.js"></script>
	<script src="<%=request.getContextPath()%>/pages/js/ztree/jquery.ztree.exedit.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-timepicker.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/bootstrap-timepicker.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/bootstrap-datetimepicker.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/daterangepicker.css" />
	<title>页面样式规范</title>
</head>
<body>
	<div class="page-content">
		<!-- 头部文字 -->
		<div class="page-header">
			<h1>
				布局及组件
				<small>
					<i class="ace-icon fa fa-angle-double-right"></i>
					常见的组件和布局
				</small>
			</h1>
		</div>
		
		<div class="col-xs-12 clearfix">
			<div class="col-xs-12 clearfix">
				<div class="col-xs-12 clearfix">
					<h5 class="label label-danger arrowed-in">表单布局 </h5>
				</div>
				<div class="col-xs-12">
					<!-- 内联表单 -->
					<form class="form-inline">
						<input type="text" class="input-small" placeholder="用户名" />
						<input type="password" class="input-small" placeholder="电话号码" />
						<button type="button" class="btn btn-info">
							确认
						</button>
					</form>
				</div>
			</div>
			<div class="col-xs-12 clearfix">
				<div class="col-xs-12 clearfix">
					<h5 class="label label-danger arrowed-in">弹出框里的表单</h5>
				</div>
				<div class="col-xs-12">
					<button class="btn btn-primary" data-toggle="modal" data-target="#myFormInline">点击弹出（内联表单）</button>
					<button class="btn btn-primary">点击弹出（垂直表单）</button>
				</div>
			</div>
			<div class="col-xs-12 clearfix">
				<div class="col-xs-12 clearfix">
					<h5 class="label label-danger arrowed-in">表单组件</h5>
				</div>
				<div class="col-xs-12 clearfix">
					<div class="col-sm-4">
						<div class="widget-box">
							<div class="widget-header">
								<h4 class="widget-title">日期选择（Date Picker）</h4>
								<span class="widget-toolbar">
									<a href="#" data-action="settings">
										<i class="ace-icon fa fa-cog"></i>
									</a>
									<a href="#" data-action="reload">
										<i class="ace-icon fa fa-refresh"></i>
									</a>
									<a href="#" data-action="collapse">
										<i class="ace-icon fa fa-chevron-up"></i>
									</a>
									<a href="#" data-action="close">
										<i class="ace-icon fa fa-times"></i>
									</a>
								</span>
							</div>
							<div class="widget-body">
								<div class="widget-main">
									<label for="id-date-picker-1">日期选择器</label>
									<div class="row">
										<div class="col-xs-8 col-sm-11">
											<!-- #section:plugins/date-time.datepicker -->
											<div class="input-group">
												<input class="form-control date-picker" id="id-date-picker-1" type="text" data-date-format="dd-mm-yyyy" />
												<span class="input-group-addon">
													<i class="fa fa-calendar bigger-110"></i>
												</span>
											</div>
										</div>
									</div>
									<hr />
									<label for="id-date-range-picker-1">日期范围选择器</label>
									<div class="row">
										<div class="col-xs-8 col-sm-11">
											<!-- #section:plugins/date-time.daterangepicker -->
											<div class="input-group">
												<span class="input-group-addon">
													<i class="fa fa-calendar bigger-110"></i>
												</span>
		
												<input class="form-control" type="text" name="date-range-picker" id="id-date-range-picker-1" />
											</div>
		
											<!-- /section:plugins/date-time.daterangepicker -->
										</div>
									</div>
									<hr />
									<label for="timepicker1">时间选择器</label>
									<!-- #section:plugins/date-time.timepicker -->
									<div class="input-group bootstrap-timepicker">
										<input id="timepicker1" type="text" class="form-control" />
										<span class="input-group-addon">
											<i class="fa fa-clock-o bigger-110"></i>
										</span>
									</div>
		
									<!-- /section:plugins/date-time.timepicker -->
									<hr />
									<label for="date-timepicker1">日期/时间选择器</label>
		
									<!-- #section:plugins/date-time.datetimepicker -->
									<div class="input-group">
										<input id="date-timepicker1" type="text" class="form-control" />
										<span class="input-group-addon">
											<i class="fa fa-clock-o bigger-110"></i>
										</span>
									</div>
		
									<!-- /section:plugins/date-time.datetimepicker -->
								</div>
							</div>
						</div>
					</div>
					<!-- 栅格化布局，超小屏幕及中等屏幕 -->
					<div class="col-xs-12 col-sm-4">
						<!-- 卡片 -->
						<div class="widget-box">
							<!-- 卡片的头部 -->
							<div class="widget-header">
								<!-- 卡片标题 -->
								<h4 class="widget-title">文本区域</h4>
								<!-- 卡片操作区按钮 -->
								<div class="widget-toolbar">
									<a href="#" data-action="collapse">
										<i class="ace-icon fa fa-chevron-up"></i>
									</a>
		
									<a href="#" data-action="close">
										<i class="ace-icon fa fa-times"></i>
									</a>
								</div>
							</div>
							<div class="widget-body">
								<div class="widget-main">
									<div>
										<label for="form-field-7">默认</label>
										<textarea class="form-control" id="form-field-7" placeholder="默认文本"></textarea>
									</div>
									<hr />
									<!-- #输入框限制 -->
									<div>
										<label for="form-field-9">字符限制 maxlength="50"</label>
										<textarea class="form-control limited" id="form-field-9" maxlength="50"></textarea>
									</div><!-- /输入框限制 -->
									<hr />
									<!-- #自适应尺寸 -->
									<div>
										<label for="form-field-11">自适应尺寸</label>
										<textarea id="form-field-11" class="autosize-transition form-control"></textarea>
									</div>
									<!-- /自适应尺寸-->
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-4">
						<div class="widget-box">
							<div class="widget-header">
								<h4 class="widget-title">下拉选框（Select Box）</h4>
									<span class="widget-toolbar">
										<a href="#" data-action="settings">
											<i class="ace-icon fa fa-cog"></i>
										</a>
										<a href="#" data-action="reload">
											<i class="ace-icon fa fa-refresh"></i>
										</a>
										<a href="#" data-action="collapse">
											<i class="ace-icon fa fa-chevron-up"></i>
										</a>
										<a href="#" data-action="close">
											<i class="ace-icon fa fa-times"></i>
										</a>
									</span>
								</div>
									<div class="widget-body">
									<div class="widget-main">
										<div>
											<label for="form-field-select-1">默认</label>
											<select class="form-control" id="form-field-select-1">
												<option value=""></option>
												<option value="AL">北京</option>
												<option value="AK">天津</option>
											</select>
										</div>
										<hr />
										<div>
											<div class="row">
												<div class="col-sm-12">
													<span class="bigger-110">多选</span>
												</div>
											</div>
											<select multiple="" class="chosen-select" id="form-field-select-4" data-placeholder="Choose a State...">
												<option value="AL">北京</option>
												<option value="AK">天津</option>
											</select>
										</div>
									<hr />
									<!-- #section:plugins/input.chosen -->
									<div>
										<label for="form-field-select-3">Chosen</label>
		
										<br />
										<select class="chosen-select tag-input-style" id="form-field-select-3" data-placeholder="选择地区...">
											<option value="">  </option>
											<option value="AL">北京</option>
											<option value="AK">大连</option>
											<option value="AZ">天津</option>
										</select>
									</div>
									<hr />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12 clearfix">
			<div class="col-xs-12 clearfix">
				<h5 class="label label-danger arrowed-in">文件上传</h5>
			</div>
			<div class="col-xs-12">
				<div class="form-group">
					<div class="col-xs-12">
						<!-- #section:custom/file-input -->
						<input type="file" id="id-input-file-2" />
					</div>
				</div>
				<div class="form-group">
					<div class="col-xs-12">
						<input multiple type="file" id="id-input-file-3" />

						<!-- /section:custom/file-input -->
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	
<script>
$(function(){
	/* 初始化select框 */
	$(".chosen-select").chosen();
	$('.chosen-select').chosen({allow_single_deselect:true}); 
	//resize the chosen on window resize

	$(window)
	.off('resize.chosen')
	.on('resize.chosen', function() {
		$('.chosen-select').each(function() {
			 var $this = $(this);
			 $this.next().css({'width': $this.parent().width()});
		})
	}).trigger('resize.chosen');
	
	
	$('.date-picker').datepicker({
		autoclose: true,
		todayHighlight: true
	});
	
	
	$('input[name=date-range-picker]').daterangepicker({
		'applyClass' : 'btn-sm btn-primary',
		'cancelClass' : 'btn-sm btn-default',
		locale: {
			applyLabel: '确定',
			cancelLabel: '取消',
		}
	})
	.prev().on(ace.click_event, function(){
		$(this).next().focus();
	});
	
	
	$('#timepicker1').timepicker({
		minuteStep: 1,
		showSeconds: true,
		showMeridian: false
	}).next().on(ace.click_event, function(){
		$(this).prev().focus();
	});
	
	
	$('#date-timepicker1').datetimepicker().next().on(ace.click_event, function(){
		$(this).prev().focus();
	});
	
	//文件上传
	$('#id-input-file-2').ace_file_input({
		no_file:'没有文件 ...',
		btn_choose:'选择',
		btn_change:'转换',
		droppable:false,
		//onchange:null,
		thumbnail:false //| true | large
		//whitelist:'gif|png|jpg|jpeg'
		//blacklist:'exe|php'
		//onchange:''
		//
	}).on('change', function(){
		//console.log($(this).data('ace_input_files'));
		//console.log($(this).data('ace_input_method'));
		alert(1);
	});
	
	//文件拖拽上传
	$('#id-input-file-3').ace_file_input({
		style:'well',
		btn_choose:'把文件拖到此处或点击此处选择文件',
		btn_change:null,
		no_icon:'ace-icon fa fa-cloud-upload',
		droppable:true,
		thumbnail:'small'//large | fit
		//,icon_remove:null//set null, to hide remove/reset button
		/**,before_change:function(files, dropped) {
			//Check an example below
			//or examples/file-upload.html
			return true;
		}*/
		/**,before_remove : function() {
			return true;
		}*/
		,
		preview_error : function(filename, error_code) {
			//name of the file that failed
			//error_code values
			//1 = 'FILE_LOAD_FAILED',
			//2 = 'IMAGE_LOAD_FAILED',
			//3 = 'THUMBNAIL_FAILED'
			//alert(error_code);
		}

	}).on('change', function(){
		//console.log($(this).data('ace_input_files'));
		//console.log($(this).data('ace_input_method'));
	});
});
</script>
<script type="text/javascript"
		src="<%=request.getContextPath()%>/pages/gis/exam/jquery-form.js"></script>
</body>
</html>