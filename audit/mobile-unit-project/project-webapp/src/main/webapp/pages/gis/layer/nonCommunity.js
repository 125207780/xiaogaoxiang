$(function(){
	getStationInfo();//未入格小区信息
	OverContent();
})

function getStationInfo(){
	var CELL_ID = $("#CELLID").text();
	$("#CELL_NAME").empty();
	$("#CELL_CODE").empty();
	$("#AREA_NAME").empty();
	$("#CNTY_NAME").empty();
	$("#AREA_NAME_GRID").empty();
	$("#CNTY_NAME_GRID").empty();
	$("#GRID_NAME").empty();
	$("#CELL_ADDR").empty();
	$("#CELL_LONGITUDE").empty();
	$("#CELL_LATITUDE").empty();
	$("#TYPE").empty();
	$("#REMARK").empty();
	
	$.ajax({
		url : $.cxt + '/nonCommunity/getNonCommunity',
		data : {cellId : CELL_ID},
		type : "POST",
		success : function(json){
			var data = JSON.parse(json);
			if(data.code == '0'){
				if(data.data!=null&&data.data!=undefined){
					$("#CELL_NAME").append(data.data[0].CELL_NAME);
					$("#CELL_ID").append(data.data[0].CELL_ID);
					$("#AREA_NAME").append(data.data[0].AREA_NAME);
					$("#CNTY_NAME").append(data.data[0].CNTY_NAME);
					$("#AREA_NAME_GRID").append(data.data[0].AREA_NAME_GRID);
					$("#CNTY_NAME_GRID").append(data.data[0].CNTY_NAME_GRID);
					$("#GRID_NAME").append(data.data[0].GRID_NAME)
					$("#CELL_ADDR").append(data.data[0].CELL_ADDR);
					$("#CELL_LONGITUDE").append(data.data[0].CELL_LONGITUDE);
					$("#CELL_LATITUDE").append(data.data[0].CELL_LATITUDE);
					$("#TYPE").append(data.data[0].TYPE);
					$("#REMARK").append(data.data[0].REMARK);
				}			
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
