$(function() {
	$('#grid-table').jqGrid({
				url : $.cxt + "/logManage/getLogList",
				datatype : "json",
				mtype : "POST",
				height : 400,
				width:$(".page-content").width()-20,
				colNames : [ '日志ID', '操作人', 'IP地址', '操作模块', '操作描述', '操作时间', '是否成功' ],
				colModel : [ 
				      {name : 'id',align : 'center',index : 'id',editable : false,hidden : true},
				      {name : 'userName',align : 'center',index : 'userName',editable : false},
				      {name : 'userIp',align : 'center',index : 'userIp',editable : false},
				      {name : 'actionName',align : 'center',index : 'actionName',editable : false},
				      {name : 'methodName',align : 'center',index : 'methodName',editable : false},
				      {name : 'opTime',align : 'center',index : 'opTime',editable : false},
				      {name : 'success',align : 'center',index : 'success',editable : false,formatter : successFormat}],
				viewrecords : true,
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#grid-pager',
				altRows : true,
				rownumbers : true,
				multiselect : false,
				multiboxonly : false,
				loadComplete : function() {
					var table = this;
					setTimeout(function() {
						styleCheckbox(table);
						updatePagerIcons(table);
						enableTooltips(table);
					}, 0);
				},
				caption : "操作日志列表"
			});
	$(window).triggerHandler('resize.jqGrid');
	$("td").css("text-align", "center");
	//grid宽度随div宽度改变
	$(function(){
        setInterval(function(){
        	$("#grid-table").setGridWidth($(".page-content").width()-20);
        },0);     
	});
	$('#grid-table').jqGrid('navGrid', '#grid-pager', {
		edit : false,
		editicon : 'ace-icon fa fa-pencil blue',
		add : false,
		addicon : 'ace-icon fa fa-plus-circle purple',
		del : false,
		delicon : 'ace-icon fa fa-trash-o red',
		search : false,
		searchicon : 'ace-icon fa fa-search orange',
		refresh : true,
		refreshicon : 'ace-icon fa fa-refresh green',
		view : false,
		viewicon : 'ace-icon fa fa-search-plus grey'
	})
	$(document).one('ajaxloadstart.page', function(e) {
		$('#grid-table').jqGrid('GridUnload');
		$('.ui-jqdialog').remove();
	});

	// 初始化搜索按钮
	$('#searchLog').bind('click', function() {
		doSearch();
	});
});

/**
 * 
 * @param cellvalue
 * @returns
 */
function successFormat(cellvalue) {
	if(cellvalue == '1'){
		return '成功';
	}else if(cellvalue == '0'){
		return '失败';
	}
}

/**
 * 
 * @param table
 */
function styleCheckbox(table) {
	$('.ui-jqgrid-sortable').css("text-align", "center");
}

/**
 * 
 * @param table
 */
function updatePagerIcons(table) {
	var replacement = {
		'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
		'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
		'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon')
			.each(function() {
				var icon = $(this);
				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

				if ($class in replacement)
					icon.attr('class', 'ui-icon ' + replacement[$class]);
			})
}

/**
 * 
 * @param table
 */
function enableTooltips(table) {
	$('.navtable .ui-pg-button').tooltip({
		container : 'body'
	});
	$(table).find('.ui-pg-div').tooltip({
		container : 'body'
	});
}

/**
 * 检索
 */
function doSearch() {
	$("#grid-table").jqGrid('setGridParam', {
		url : $.cxt + "/logManage/getLogList",
		datatype : 'json',
		postData : {
			"json" : JSON.stringify($('#searchLogForm').serializeObject())
		}
	}).trigger('reloadGrid');
}