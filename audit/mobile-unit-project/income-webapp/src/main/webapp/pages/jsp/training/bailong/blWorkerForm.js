$(function() {		//选择按钮js动作
	$("#workerShowOrgWin").click(function(){
		topgetSysOrgTreeWindow({
			orgName : "treeCode",
			orgId : "treeCode",
			width : 400,
			height : 500
		})
	});
})

//myWorkOrderForm.js

$(function(){
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

/*
// 根据员工id获取简历名
function getFileName(id) {
	var filename = "";
	$.ajax({
		url : $.cxt + '/worker/getFileName',
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
*/