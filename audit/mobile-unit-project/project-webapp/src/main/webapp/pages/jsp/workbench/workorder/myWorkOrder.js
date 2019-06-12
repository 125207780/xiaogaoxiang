$(function(){
	/* 初始化JQGrid */
	initDataGrid("send",detailOperation,{
		curAssignee: true,
		duration: true
	});
	$('#createWorkOrderBtn').bind('click', function() {
		showWorkOrderForm();		
	});
	$("#searchWorkOrderList").bind("click", function() {
		reloadJqGrid('search');
	});
});

/**
 * 渲染操作列
 */
function detailOperation(cellvalue, options, cell){
	
	var cellStr = JSON.stringify(cell);
	var div = $("<div></div>")
	.append(
		$("<a></a>")
		.css({"width":"33%","cursor":"pointer"})
		.addClass("pull-left text-center")
		.attr("onclick", "editWorkOrder('" + cell.id + "')")
		.prop("top-do-role","update")
		.text("编辑")
		.attr("title","编辑")
	).append(
		$("<a></a>")
		.css({"width":"33%","cursor":"pointer"})
		.addClass("pull-left text-center")
		.attr("onclick", "sendWorkOrder('" + cell.id + "')")
		.attr("id", cell.workOrderId)
		.prop("top-do-role","add")
		.text("发送")
		.attr("title","发送")
	).append(
		$("<a></a>")
		.css({"width":"33%","cursor":"pointer"})
		.addClass("pull-left text-center")
		.attr("onclick", "deleteWorkOrder('" + cell.id + "')")
		.prop("top-do-role","delete")
		.text("删除")
		.attr("title","删除")
	);
	return div.html();
}

//弹出窗口
var showWorkOrderForm = function(id) {
	topwindow.showWindow({
		//窗口名称
		title : "工单编辑",
		//参数
		data : {id : id},
		//url
		url : $.cxt + "/workOrder/showWorkOrderForm",
		width : 500,
		height : 370,
		bottons : [{
			title : "确认",
			fun : function() {
				//校验，参数为表单父级id
				if(topcheckoutForm("workOrderForm")){
					
					// formData封装数据
					var formData = new FormData();
					formData.append("file", $("#uploadFile")[0].files[0]);
					formData.append("json", JSON.stringify(topgetObjByObj($("#workOrderForm .formField"))));
					$.ajax({
						url : $.cxt + "/workOrder/insertOrUpdate", 
						
						data : formData,
						type: "POST",
						cache : false,  
				        contentType : false,
				        processData : false,
						success : function(data) {
							//重新加载表格
							reloadJqGrid();
							//关闭窗口
							topwindow.removeWindow();
							//操作提示
							topshowAlertSuccessDiv();
						}
					});
				}
			}
		}]
	});
}

/**
 * 发送工单
 */
function sendWorkOrder(id) {
	$.ajax({
		url : $.cxt + '/workOrder/startSendFlow',
		type : "POST",
		async : false,
		dataType: "json",
		data: {"id":id},
		success: function(data){
			//重新加载表格
			reloadJqGrid();
			//操作提示
			topshowAlertSuccessDiv();
		}
	});
}

/**
 * 编辑工单
 */
function editWorkOrder(id) {
	showWorkOrderForm(id);
}

/**
 * 删除工单
 */
function deleteWorkOrder(id) {
	topshowdialog("确认删除？", function(){
		$.ajax({
			url : $.cxt + "/workOrder/deleteInfo", 
			data : {id : id},
			type: "POST",
			success : function(data) {
				//重新加载表格
				reloadJqGrid();
				//操作提示
				topshowAlertSuccessDiv();
			}
		})
	});
}
