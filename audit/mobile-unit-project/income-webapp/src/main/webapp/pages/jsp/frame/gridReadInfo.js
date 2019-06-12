$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/gridReadInfo/selectpagelistByReadStatus",
		datatype : "json",
		mtype : "POST",
		autowidth : true,
		colNames : [ '事项类型','已阅', '阅读人', '阅读时间'],
		colModel : [ 
		      {name : 'contentName',align : 'center',formatter : function(cellvalue, options, cell){
		    	  var html = "<a onclick=\"showGridReadInfoForm('" + cell.url + "')\" href=\"#\">"+cell.contentName+"</a>&nbsp;&nbsp;&nbsp;&nbsp;";
		    		console.log(cell);
		    		return html;
		      }}, 
		      {name : 'readStatus',align : 'center'}, 
		      {name : 'reader',align : 'center'}, 
		      {name : 'readDate',align : 'center'}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		loadComplete : topjqGridLoadComplete
	});
	
})

var showGridReadInfoForm = function(url) {
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
}
