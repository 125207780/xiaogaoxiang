/**
 * 
 */
$(function(){
	$("input[type=text].formField").css("width","220px");
	var inputWidth=$("input[type=text].formField").css("width");
	// 获取下拉框的值
	var assigneeId = $("input[name=hiddenAssigneeId]").val();
	// 初始化下拉框
	initChoosen(assigneeId,'#assigneeId'," --- 选择办理人 --- ");
	
	var id = "";
	var fileName = "无";
	// 编辑时初始化文件上传框的信息
	if ((id=$("#id").val())!="") {
		fileName = getFileName(id);
	}
	$('#uploadFile').ace_file_input({
		no_file:fileName,
		btn_choose:'选择文件',
		btn_change:'更改文件',
		droppable:false,
		onchange:null,
		thumbnail:false, //| true | large
		icon_remove:null
	});
	$(".ace-file-container").css("width",inputWidth);
	$("#assigneeId").css("width",inputWidth);
	$("#comments").css("width",inputWidth);
});

/**
 * 初始化下拉框
 * @param selectedValue
 * @param id
 * @param defaultTitle
 */
function initChoosen(selectedValue,id,defaultTitle){
	$(id).empty();
	$.ajax({
		url : $.cxt + '/workOrder/getAssignList',
		type : "POST",
		async: false,
		success : function(json) {
			var data = $.parseJSON(json);
			if (data.code == "0") {
				$(id).append($("<option></option>").attr("value","").append(defaultTitle));
				var options=data.data;
   			    for (var i in options) {
					var key=options[i].userId;
					var value=options[i].userName;
					$(id).append($("<option></option>").attr("value",key).append(value));
				} 
			} else{
				//操作提示
				topshowAlertErrorDiv();
			}
		}
	});
	// 如果是编辑，手动给下拉框赋值
	if (selectedValue!="") {
		$('#workOrderForm select[name=assigneeId]').val(selectedValue).trigger("chosen:updated");
	}
}

// 根据工单id获取文件名
function getFileName(id) {
	var filename = "";
	$.ajax({
		url : $.cxt + '/workOrder/getFileName',
		type : "POST",
		async : false,
		dataType: "json",
		data: {"id":id},
		success: function(data){
			filename = data;
		}
	});
	return filename;
}
