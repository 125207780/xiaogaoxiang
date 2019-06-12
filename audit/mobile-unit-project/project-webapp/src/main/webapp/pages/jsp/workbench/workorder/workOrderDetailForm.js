/**
 * 
 */
$(function(){
	var HANDLE_PAGE_TYPE = "handle";
	// 取得初始化字段
	var id = $("#id").val();
	var procId = $("#procId").val();
	var assigneeId = $("#hiddenAssigneeId").val();
	//页面初始化
	initFile(id);
	initAssignee(assigneeId);
	initDataGrid(procId);
	initTextAreaWidth("#reason");
	// 如果不是办理页面，则不显示办理表单
	if ($("#hiddenPageType").val()!=HANDLE_PAGE_TYPE) {
		$("#workorderHandle").css("display", "none");
	}
	
	$("#approvalTask").bind("click", function(){
		submitTask(id, procId);
	});
});

function initTextAreaWidth(id) {
	$(id).css("width","100%");
}

// 根据工单id初始化文件信息
function initFile(id) {
	$.ajax({
		url : $.cxt + '/workOrder/getFileByTableId',
		type : "POST",
		async : false,
		dataType: "json",
		data: {id : id},
		success : function(data) {
			var data = $.parseJSON(data);
			if (data.code=="0") {
				var files = data.data;
				var file = files[0];
				$("#workorderFile").text(file.realName).attr("onclick", "downloadReport('" + file.id + "')");
			}
		}
	});
}

// 根据办理人id获取办理人姓名（多条）
function initAssignee(assigneeId) {
	var assigneeIds = assigneeId.split(",");
	var assigneeIdsStr = assigneeIds.join(",");
	$.ajax({
		url : $.cxt + '/workOrder/getAssigneeByIds',
		type : "POST",
		async : false,
		dataType: "json",
		data: {"assigneeIds" : assigneeIdsStr},
		success : function(data) {
			var data = $.parseJSON(data);
			if (data.code=="0") {
				sysusers = data.data;
				var assignee = "";
				$.each(sysusers, function(i,item){
					assignee+=item.userName+",";
				});
				assignee = assignee.substring(0,assignee.length-1);
				$("#assignee").text(assignee);
			}
		}
	});
}

function initDataGrid(procId){
	$('#grid-table1').jqGrid({
		url : $.cxt + "/workOrder/proc",
		datatype : "json",
		postData : {procId : procId},
		mtype : "POST",
		autowidth : true,
		height : 180,
		hiddengrid : true,
		colNames: ['工单环节','接单机构','经办人','办理时间','处理结果','','','','','','','','','','',''],
		colModel: [
			{name : 'ACT_ID_', hidden: true, align : 'center', index : 'ACT_ID_', width : 130, editable : false},
			{name : 'NAME', hidden: true, align : 'center', index : 'NAME', width : 130, editable : false},
			{name : 'ASSIGNEE_', align : 'center', index : 'ASSIGNEE_', width : 130, editable : false},
			{name : 'END_TIME_', align : 'center', index : 'END_TIME_', width : 160, editable : false, formatter: endTimeTrans},
			{name : 'result', align : 'center', index : 'result', width : 300, editable : false, formatter:resultTrans},
			{name : 'TASK_ID_', hidden: true, align : 'center', index : 'TASK_ID_', width : 230, editable : false},
			{name : 'APPROVAL', hidden: true, align : 'center', index : 'APPROVAL', width : 230, editable : false},
			{name : 'REASON', hidden: true, align : 'center', index : 'REASON', width : 230, editable : false},
			{name : 'RECTIFYINFO', hidden: true, align : 'center', index : 'RECTIFYINFO', width : 230, editable : false},
			{name : 'IMPROVEINFO', hidden: true, align : 'center', index : 'IMPROVEINFO', width : 230, editable : false},
			{name : 'FILENAME', hidden: true, align : 'center', index : 'FILENAME', width : 230, editable : false},
			{name : 'URL', hidden: true, align : 'center', index : 'URL', width : 230, editable : false},
			{name : 'IGNOREINFO', hidden: true, align : 'center', index : 'IGNOREINFO', width : 230, editable : false},
			{name : 'AUDITINFO', hidden: true, align : 'center', index : 'AUDITINFO', width : 230, editable : false},
			{name : 'ORGID', hidden: true, align : 'center', index : 'ORGID', width : 230, editable : false},
			{name : 'ROLLBACKINFO', hidden: true, align : 'center', index : 'ROLLBACKINFO', width : 230, editable : false}
			],
		caption : "流程历史",
		loadComplete : styleCheckbox
	});
}

function styleCheckbox(table){
	$('.ui-jqgrid-sortable').css("text-align", "center");
}

function endTimeTrans(cellvalue, options, cell) {
	if (cell.END_TIME_==null||cell.END_TIME_=="") {
		return "进行中";
	}
	else {
		return cell.END_TIME_;
	}
}

function resultTrans(cellvalue, options, cell) {
	var result = "";
	switch(cell.APPROVAL) {
	case "1":
		result = "通过";
		break;
	case "2":
		result = "退回";
		break;
	default:
		return "无";
	}
	return $("<span style='text-align:left'></span>")
	.append(
			$("<span>处理结果：</span>"))
	.append(
			$("<span class='blue'>"+result+"</span>"))
	.append(
			$("</br>"))
	.append(
			$("<span>处理意见：</span>"))
	.append(
			$("<span>"+(cell.REASON==null?"无":cell.REASON)+"</span>"))
	.append(
			$("</br>"))
	.append(
			$("<span>上传文件：</span>"))
	.append(
			cell.FILENAME==null||cell.FILENAME==undefined?
				$("<a></a>").text("无"):$("<a class='blue'></a>").attr("style","cursor:pointer !important;").text(cell.FILENAME).attr("onclick", "downloadReport('" + cell.URL + "')"))
	.html();
}

// 文件下载
function downloadReport(attachId, type) {
	downloadFile.action = $.cxt + '/workOrder/download?attchId='+attachId;
	downloadFile.method = "post";
	downloadFile.submit();
}

var submitTask = function(id, procId) {
	// 封装数据
	var approval = $("input[name=approval]:checked").val();
	var reason = $("#reason").val();
	var formData = new FormData();
	var json = {};
	json.workOrderId = id;
	json.procId = procId;
	json.approval = approval;
	json.reason = reason;
	formData.append("file", $("#uploadFile")[0].files[0]);
	formData.append("json",JSON.stringify(json));
	$.ajax({
		url : $.cxt + '/workOrder/approvalTask',
		type : "POST",
		async : false,
		dataType: "json",
		data: formData,
		cache : false,  
        contentType : false,
        processData : false,
		success : function(data) {
			var data = $.parseJSON(data);
			if (data.code=="0") {
				//重新加载表格
				reloadJqGrid();
				//关闭窗口
				topwindow.removeWindow();
				//操作提示
				topshowAlertSuccessDiv();
			}
		}
	});
}