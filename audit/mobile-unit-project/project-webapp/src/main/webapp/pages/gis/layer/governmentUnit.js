$(function(){
	getStationInfo();//渠道基础信息
	OverContent();
})

function getStationInfo(){
	var stationId = $("#physicCode").text();
	$("#CITY_CODE").empty();
	$("#CITY_NAME").empty();
	$("#CNTY_CODE").empty();
	$("#CNTY_NAME").empty();
	$("#GRID_CODE").empty();
	$("#GRID_NAME").empty();
	$("#ENTER_GRID").empty();
	$("#PHYSIC_TYPE").empty();
	$("#PHYSIC_CODE").empty();
	$("#PHYSIC_NAME").empty();
	$("#PHYSIC_ADDR").empty();
	$("#PHYSIC_LON").empty();
	$("#PHYSIC_LAT").empty();
	$.ajax({
		url : $.cxt + '/officeBuildingAndGovernmentUnit/getOfficeBuilding',
		data : {stationId : stationId},
		type : "POST",
		success : function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				$("#CITY_CODE").append(data.data.CITY_CODE);
				$("#CITY_NAME").append(data.data.CITY_NAME);
				$("#CNTY_CODE").append(data.data.CNTY_CODE);
				$("#CNTY_NAME").append(data.data.CNTY_NAME);
				$("#GRID_CODE").append(data.data.GRID_CODE);
				$("#GRID_NAME").append(data.data.GRID_NAME);
				$("#PHYSIC_TYPE").append(data.data.PHYSIC_TYPE);
				$("#PHYSIC_CODE").append(data.data.PHYSIC_CODE);
				$("#PHYSIC_NAME").append(data.data.PHYSIC_NAME);
				if(data.data.ENTER_GRID=="1")
				{
					$("#ENTER_GRID").append("是");
				}	else{
					$("#ENTER_GRID").append("否");
				}	
				$("#PHYSIC_ADDR").append(data.data.PHYSIC_ADDR);
				$("#PHYSIC_LON").append(data.data.PHYSIC_LON);
				$("#PHYSIC_LAT").append(data.data.PHYSIC_LAT);		
			}
		}
	})
}
function OverContent(){
	$(".channelBaseInfoR").hover(function(){
		var content = $(this).text();
		var contentLength = $(this).text().length;
		if(contentLength > 15 ){
			$(this).attr("title", content);
		}
	})
	
	
}