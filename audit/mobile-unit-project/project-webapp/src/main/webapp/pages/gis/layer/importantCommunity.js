$(function(){
	getStationInfo();//渠道基础信息
	OverContent();
})

function getStationInfo(){
	
	var importantId = $("#importantId").text();
	$("#importantAreaNameId").empty();
	$("#channelNameId").empty();
	$("#areaDirectorNameId").empty();
	$("#areaDirectorNumberId").empty();
	$.ajax({
		url : $.cxt + '/stationInfo/getImportantAreaInfo',
		data : {importantId : importantId},
		type : "POST",
		success : function(json){
			$("#importantAreaNameId").html(json.CELL_NAME);
			$("#channelNameId").html(json.CHNL_NAME);
			$("#areaDirectorNameId").html(json.NAME);
			$("#areaDirectorNumberId").html(json.PHONE);
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
