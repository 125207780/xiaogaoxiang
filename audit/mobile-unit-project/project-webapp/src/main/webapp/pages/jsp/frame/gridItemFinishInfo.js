$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/gridItemInfo/selectpagelistByFinishStatus",
		datatype : "json",
		mtype : "POST",
		autowidth : true,
		colNames : [ '事项名称','事项状态', '事项内容', '办理人','办理时间'],
		colModel : [ 
		      {name : 'itemName',align : 'center'}, 
		      {name : 'itemStatus',align : 'center'}, 
		      {name : 'itemContent',align : 'center'}, 
		      {name : 'itemHandler',align : 'center'},
		      {name : 'handleDate',align : 'center'}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		loadComplete : topjqGridLoadComplete
	});
	
})
/*var operation = function(cellvalue, options, cell) {
	var html = "<a onclick=\"showGridFinishInfoForm('" + cell.url + "')\" href=\"#\">"+cell.itemName+"</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	console.log(cell);
	return html;
}
var showGridFinishInfoForm = function(url) {
	topwindow.showWindow({
		//窗口名称
		title : "事项明细",
		//参数
		//url
		url : $.cxt + "/pages/jsp/frame/gridReadInfoForm.jsp?url="+url,
		bottons : [{
			title : "确认",
			fun : function() {
				topwindow.removeWindow();
			}
		}]
	});
}*/
