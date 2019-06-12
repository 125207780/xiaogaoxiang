<%@ tag language="java" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/bootstrap.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/font-awesome.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/jquery-ui.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/jquery-ui.custom.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/datepicker.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/select2.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/chosen.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/ui.jqgrid.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/tipped.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/ace-fonts.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/ace-skins.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/ace.css" class="ace-main-stylesheet" id="main-ace-style">
<!--[if lte IE 9]>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/ace-part2.css" class="ace-main-stylesheet" />
<![endif]-->
<!--[if lte IE 9]>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/ace/css/ace-ie.css" />
<![endif]-->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/bootstrapvalidator/css/bootstrapValidator.css">
<script src="<%=request.getContextPath()%>/resource/ace/js/ace-extra.js"></script>
<!--[if lte IE 8]>
	<script src="<%=request.getContextPath()%>/resource/ace/js/html5shiv.js"></script>
	<script src="<%=request.getContextPath()%>/resource/ace/js/respond.js"></script>
<![endif]-->
<!--[if !IE]> -->
<script src="<%=request.getContextPath()%>/resource/ace/js/jquery.js"></script>
<!-- <![endif]-->

<!--[if IE]>
<script type="text/javascript">
	window.jQuery || document.write("<script src='<%=request.getContextPath()%>/resource/ace/js/jquery1x.js'>"+"<"+"/script>");
</script>
<![endif]-->
<script src="<%=request.getContextPath()%>/resource/ace/js/chosen.jquery.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/jquery.slimscroll.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/bootstrap.js"></script>
<!--[if lte IE 8]>
	<script src="<%=request.getContextPath()%>/resource/ace/js/excanvas.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/resource/ace/js/select2.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/jqGrid/jquery.jqGrid.src.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/jqGrid/i18n/grid.locale-cn.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace-elements.js"></script>



<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.scroller.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.colorpicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.fileinput.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.typeahead.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.wysiwyg.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.spinner.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.treeview.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.wizard.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/elements.aside.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.ajax-content.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.touch-drag.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.sidebar.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.sidebar-scroll-1.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.submenu-hover.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.widget-box.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.settings.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.settings-rtl.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.settings-skin.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.widget-on-reload.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.searchbox-autocomplete.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/bootstrap-wysiwyg.js"></script>

<script src="<%=request.getContextPath()%>/resource/ace/js/spin.js"></script>
<script src="<%=request.getContextPath()%>/resource/bonc/js/base.js"></script>
<script src="<%=request.getContextPath()%>/resource/bootstrapvalidator/js/bootstrapValidator.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/dataTables/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/dataTables/jquery.dataTables.bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datepicker.zh-CN.min.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/daterangepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/moment.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/date-time/bootstrap-datetimepicker.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/tipped.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/bootbox.js"></script>
<script src="<%=request.getContextPath()%>/resource/ace/js/ace/ace.sidebar-scroll-1.js"></script>
<script src="<%=request.getContextPath()%>/resource/bonc/js/browser.js"></script>
<script src="<%=request.getContextPath()%>/resource/base64/jquery.base64.js"></script>
<script src="<%=request.getContextPath()%>/resource/bonc/js/md5.js"></script>

<!-- ztree -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/zTree/js/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/zTree/js/jquery.ztree.exedit-3.5.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/zTree/js/jquery.ztree.excheck-3.5.js"></script>
<script src="<%=request.getContextPath()%>/pages/js/common/common-ztree.js"></script>

<!-- my js -->
<script src="<%=request.getContextPath()%>/pages/js/common/common.js"></script>
<script src="<%=request.getContextPath()%>/pages/js/common/window.js"></script>
<script src="<%=request.getContextPath()%>/pages/js/common/check.js"></script>
<script src="<%=request.getContextPath()%>/pages/js/common/leftRight.js"></script>
<!-- my css -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/pages/css/common.css" />

