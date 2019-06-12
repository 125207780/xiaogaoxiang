/**
 * 
 */
$(function(){
	inputWidth = $("input[type=text].formField").css("width");
	// 获取下拉框的值
	var processid = $("input[name=processidHidden]").val();
	// 初始化下拉框
	initProcessChoosen(processid,'#processSelect',"请选择流程...");
	$("#processSelect").css("width",inputWidth);
});

/**
 * 初始化下拉框
 * @param selectedValue
 * @param id
 * @param defaultTitle
 */
function initProcessChoosen(selectedValue,id,defaultTitle){
	$(id).empty();
	$.ajax({
		url : $.cxt + '/ActivitiCore/getAllProcess',
		type : "POST",
		async: false,
		success : function(json) {
			var data = $.parseJSON(json);
			if (data.code == "0") {
				$(id).append($("<option></option>").attr("value","").append(defaultTitle));
				var options=data.data;
   			    for (var i in options) {
					var key=options[i].processId;
					var value=options[i].name;
					var deployId=options[i].deployId;
					$(id).append($("<option></option>").attr("value",key).attr("deployId",deployId).append(value));
				} 
			} else{
				//操作提示
				topshowAlertErrorDiv();
			}
		}
	});
	$(id).on('change', function(e, params) {
		$("#flowManagerForm input[name=processname]").val($(id+' option:selected').text());
		$("#flowManagerForm input[name=deployid]").val($(id+' option:selected').attr("deployId"));
	});
	// 如果是编辑，手动给下拉框赋值
	if (selectedValue!="") {
		$('#flowManagerForm select[name=processid]').val(selectedValue).trigger("chosen:updated");
	}
}