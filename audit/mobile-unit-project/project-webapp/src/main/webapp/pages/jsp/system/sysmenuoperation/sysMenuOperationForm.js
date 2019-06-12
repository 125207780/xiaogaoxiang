$(function(){
	$('#grid-table1').jqGrid({//加载表格
		url : $.cxt + "/sysmenuoperation/selectlistbymenuid",
		datatype : "json",
		postData : {menuId : $("#menuId").val()},
		mtype : "POST",
		autowidth : true,
		height : 180,
		colNames : [ 'id', '权限编码','权限名称','操作'],
		colModel : [ 
		      {name : 'id',hidden : true}, 
		      {name : 'operationCode',align : 'center'}, 
		      {name : 'operationName',align : 'center'},
		      {name : 'operation',align : 'center', formatter : function(cellvalue, options, cell) {
		    	  var html = ""
		    	  html += "<a onclick=\"deleteSysMenuOperation('" + cell.id + "')\" href=\"#\">删除</a>"
		    	  return html
		      }}
		],
		caption : "权限列表",
		loadComplete : styleCheckbox
	});
	$("#createBtn1").click(function(){
		if(topcheckoutForm("sysMenuOperationForm")){//校验，参数为表单父级id
			$.ajax({
				url : $.cxt + "/sysmenuoperation/insertsysmenuoperation", 
				data : topgetObjByObj($("#sysMenuOperationForm .formField")),
				type: "POST",
				success : function(data) {
					reloadJqGrid1();//重新加载表格
					topshowAlertSuccessDiv();//操作提示
					clearForm();//清空表单
				}
			});
		}
	})
})
//重新加载表格
var reloadJqGrid1 = function() {
	$("#grid-table1").jqGrid('setGridParam').trigger("reloadGrid"); 
}
var clearForm = function() {
	$("#operationCode").val("");
	$("#operationName").val("");
}
var deleteSysMenuOperation = function(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/sysmenuoperation/deletesysmenuoperationbyid", 
			data : {id : id},
			type: "POST",
			success : function(data) {
				reloadJqGrid1();//重新加载表格
				topshowAlertSuccessDiv();//操作提示
			}
		})
	})
}