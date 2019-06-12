$(function(){
	selectAll();
	initKpiList();
})

function clickAddKpi(option){
	var color = $(option).css('color');
	if(color == 'rgb(255, 0, 0)'){
		$(option).css("color",'#fff').css("font-weight",'normal');
	}else{
		$(option).css("color",'red').css("font-weight",'bold');
	}
}

function initKpiList(){
	var paramKpi = '{';
	if($(".kpi-addKpi > .kpi-select > select").length > 0){
		$(".kpi-addKpi > .kpi-select > select").find("option:selected").each(function(index){
			var screenName = $(this).text();
			var listValue = $(this).parent().attr('id')
			if(screenName == '请选择...'){
				screenName = '';
			}
			if(index == $(".kpi-addKpi > .kpi-select > select").length - 1){
				paramKpi += '\"'+listValue + '\":\"'+ screenName + '\"}'
			}else{
				paramKpi += '\"'+listValue + '\":\"' + screenName + '\",'
			}
		})
	}else{
		paramKpi += '}'
	}
	
	$.ajax({
		url : $.cxt + "/kpi/initKpiIndex", 
		type: "POST",
		data: JSON.parse(paramKpi),
		success : function(data) {
			var json  = JSON.parse(data);
			if(json.code == '0'){
				for(var i=0;i<json.data.length;i++){
					$(".addKpiCheck").append(
						$("<div></div>").addClass("addKpi-list").append(
								$("<div></div>").addClass("addKpi-name").append(
										json.data[i].kpiName).attr('name',json.data[i].kpiCode).attr('onclick','clickAddKpi(this)')
						)
					)
						
				}
			}
			
		}
	})
}

function selectAll(){
	var flag = true;
	$("#selectAddKpi").click(function(){
		if(flag == true){
			$(".addKpi-list input:checkbox").prop("checked", true);
			flag = false;
		}else{
			$(".addKpi-list input:checkbox").prop("checked", false);
			flag = true;
		}
	})
}