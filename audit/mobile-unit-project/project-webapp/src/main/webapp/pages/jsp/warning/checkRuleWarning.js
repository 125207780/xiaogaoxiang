$(function(){
	checkRuleWarning();
	selectObjectNameAndId();
})

function checkRuleWarning(){
	$.ajax({
		url : $.cxt + "/warning/checkRuleWarning",
		type: "POST",
		data:{
			warnId:warnId
		},
		success : function(json) {
			var data  = JSON.parse(json)
			if(data.code == '0'){
				$("#crw_cityCompany").val(data.data[0].CITY_NAME);
				$("#crw_areaCompany").val(data.data[0].AREA_NAME);
				$("#crw_saleDept").val(data.data[0].SALE_DEPT_NAME);
				if(data.data[0].SCOPE==0){
					$("#crw_range").val("网格");
					$("#crw_channel").parent().hide();
				}else if(data.data[0].SCOPE==1){
					$("#crw_range").val("渠道");
					$("#crw_channel").parent().show();
				}
				$("#crw_gridAll").val(data.data[0].GRID_NAME);
				$("#crw_channel").val(data.data[0].CHNLORSTATION_NAME);
				if(data.data[0].WARN_WAY == 0){
					$("#crw_warnWay").val("系统告警");
				}else if(data.data[0].WARN_WAY == 1){
					$("#crw_warnWay").val("短信告警");
				}else if(data.data[0].WARN_WAY == 2){
					$("#crw_warnWay").val("邮件告警");
				}
				$("#crw_warnCycle").val(data.data[0].WARN_CYCLE);
				if(data.data[0].WARN_TYPE ==0){
					$("#crw_warnType").val("预算预警");
				}else if(data.data[0].WARN_TYPE == 1){
					$("#crw_warnType").val("资源预警");
				}else if(data.data[0].WARN_TYPE == 2){
					$("#crw_warnType").val("关键指标预警");
				}
				//$("#crw_noticeUser").val(data.data[0].NOTICE_USER);
				$("#crw_warnKpiName").val(data.data[0].WARN_KPI_NAME);
				$("#crw_listValue").val(data.data[0].LIST_VALUE);
				$("#crw_warnValue").val(data.data[0].WARN_VALUE);
				$("#crw_remark").val(data.data[0].REMARK);
				
			}
		}
	})
}
function selectObjectNameAndId(){
	$.ajax({
		url : $.cxt + "/warning/selectObjectNameAndId",
		type: "POST",
		data:{
			warnId:warnId
		},
		success : function(json) {
			var data  = JSON.parse(json)
			if(data.code == '0'){
				var html = "";
				for(var i=0;i<data.data.length;i++){
					html +=data.data[i].USER_NAME+"("+data.data[i].LOGIN_ID +")"+" ";
					$("#crw_noticeUser").val(html);
				}
				
				
			}
		}
	})
}