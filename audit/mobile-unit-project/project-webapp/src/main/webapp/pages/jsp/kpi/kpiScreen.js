$(function(){
	selectAll();
	initKpiList();
	
})

function initKpiList(){
	$.ajax({
		url : $.cxt + "/kpi/initKpiInfo", 
		type: "POST",
		data:{},
		success : function(data) {
			var json  = JSON.parse(data);
			if(json.code == '0'){
				for(var i=0;i<json.data.length;i++){
					$(".kpiScreenCheck").append(
						$("<div></div>").addClass("kpiScreen-list").append(
								$("<input />").attr('type','checkbox').attr('id',json.data[i].listValue).attr('name',json.data[i].listValue)
						).append(
								$("<div></div>").addClass("kpiScreen-name").append(json.data[i].listType)
						)
					)
						
				}
			}
			
		}
	})
}

function selectAll(){
	var flag = true;
	$("#selectAll").click(function(){
		if(flag == true){
			$(".kpiScreen-list input:checkbox").prop("checked", true);
			flag = false;
		}else{
			$(".kpiScreen-list input:checkbox").prop("checked", false);
			flag = true;
		}
	})
}