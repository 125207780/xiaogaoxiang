$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/gridReadInfo/selectpagelistPendingStatus",
		datatype : "json",
		mtype : "POST",
		autowidth : true,
		colNames : [ '待阅事项类型','状态', '发送人', '发送时间'],
		colModel : [ 
		      {name : 'contentName',align : 'center',formatter : function(cellvalue, options, cell){
		    	  var html = "<a onclick=\"showGridPendingInfoForm('" +cell.url+"','"+cell.contentCode+"')\" href=\"#\">"+cell.contentName+"</a>&nbsp;&nbsp;&nbsp;&nbsp;";
		    	  return html;
		      }}, 
		      {name : 'readStatus',align : 'center'}, 
		      {name : 'sender',align : 'center'}, 
		      {name : 'senderDate',align : 'center'}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		loadComplete : topjqGridLoadComplete
	});
	
})

/*var operation = function(cellvalue, options, cell) {
	var html = "<a onclick=\"showGridPendingInfoForm('" +cell.url+"','"+cell.contentCode+"')\" href=\"#\">"+cell.contentName+"</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	return html;
}*/

var showGridPendingInfoForm = function(url,contentCode) {
	topwindow.showWindow({
		//窗口名称
		title : "事项明细",
		//参数
		//url
		url : $.cxt + "/pages/jsp/frame/gridPendingInfoForm.jsp?url="+url,
		bottons : [{
			title : "确认",
			fun : function() {
				$.ajax({
					url : $.cxt + "/gridReadInfo/updateByReadStatus", 
					data : {
						contentCode : contentCode
					},
					type: "POST",
					success : function(data) {
						console.log(data)
						//重新加载表格
						$('#grid-table').trigger("reloadGrid");
						//关闭窗口
						topwindow.removeWindow();
						//操作提示
						topshowAlertSuccessDiv();
					}
				});
			}
		}]
	});
}

