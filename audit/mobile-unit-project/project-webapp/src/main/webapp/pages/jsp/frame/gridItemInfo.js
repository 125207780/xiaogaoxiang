$(function() {
	$('#grid-table').jqGrid({
		url : $.cxt + "/gridItemInfo/selectpagelist",
		datatype : "json",
		mtype : "POST",
		autowidth : true,
		colNames : [ '事项名称','事项状态', '事项说明', '发送人','发送时间'],
		colModel : [ 
		      {name : 'itemName',align : 'center',formatter : function(cellvalue, options, cell){
		    	  var html = "<a onclick=\"showGridItemInfoForm('" + cell.itemContent + "','"+ cell.itemCode+"')\" href=\"#\">"+cell.itemName+"</a>&nbsp;&nbsp;&nbsp;&nbsp;";
		    		console.log(cell);
		    		return html; 
		      }}, 
		      {name : 'itemStatus',align : 'center'}, 
		      {name : 'itemDesc',align : 'center'}, 
		      {name : 'itemIssueder',align : 'center'},
		      {name : 'issuedDate',align : 'center'}],
		viewrecords : true,
		rownumbers: true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#grid-pager',
		loadComplete : topjqGridLoadComplete
	});
	
})

var showGridItemInfoForm = function(itemContent,itemCode) {
	bootbox.dialog({
		message: itemContent,
		title: "待办事项明细",
		buttons: {
			OK: {
				label: "办理",
				className: "btn-primary",
				callback: function () {
					bootbox.dialog({
						message:  "<div class='bootbox-message' style='text-align: center'><font color='white'>是否确认办理</font></div>", 
						title: "提示信息",
						buttons: {
							OK: {
								label: "是",
								className: "btn-primary",
								callback: function () {
									$.ajax({
										url : $.cxt + "/gridItemInfo/updateByToDoStatus", 
										data : {
											itemCode : itemCode
										},
										type: "POST",
										success : function(data) {
											console.log(data)
											//重新加载表格
											$('#grid-table').trigger("reloadGrid");
											/*//关闭窗口
											topwindow.removeWindow();*/
											//操作提示
											topshowAlertSuccessDiv();
										}
									});
								}
							},
							Cancel: {
								label: "否",
								className: "btn-default",
								callback: function () {
									
								}
							}
						}
					});
				}
			},
			Cancel: {
				label: "取消",
				className: "btn-default",
				callback: function () {
					
				}
			}
		}
	});
}
